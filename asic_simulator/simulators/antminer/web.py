from __future__ import annotations

import datetime
import json
import os
import random
import secrets
import socket
from typing import Union

import hypercorn
from fastapi import APIRouter, HTTPException, FastAPI, Depends
from fastapi.requests import Request
from fastapi.responses import FileResponse, Response
from fastapi.security import HTTPDigest
from hypercorn.asyncio import serve

from asic_simulator import log
from asic_simulator.backend import MinerSimulatorBackend, HashUnit
from asic_simulator.backend.data import PoolInfo

security = HTTPDigest(realm="antMiner Configuration")
KEY = secrets.token_hex(32)


async def auth(
    request: Request,
    response: Response,
):
    # check for session
    if KEY == request.cookies.get("session"):
        return response

    # create digest auth dialog
    digest = await security(request)
    if digest is None:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated",
            headers=security._get_unauthorized_headers(request, stale=False),
        )

    # authenticate credentials
    if not await digest.authenticate("root", "root"):
        log.failure("WEB", "login")
        raise HTTPException(status_code=401)

    # set session
    response.set_cookie(key="session", value=KEY)
    return response


class AntminerWebHandler:
    def __init__(self, backend: MinerSimulatorBackend, hr_unit: HashUnit):
        self.backend = backend
        self.hr_unit = hr_unit
        self.router = APIRouter(dependencies=[Depends(auth)])
        self.get_commands = {
            "summary": self.summary,
            "get_miner_conf": self.get_miner_conf,
            "get_system_info": self.get_system_info,
            "get_network_info": self.get_network_info,
            "get_blink_status": self.get_blink_status,
            "chart": self.chart,
            "miner_type": self.miner_type,
            "stats": self.stats,
            "pools": self.pools,
            "log": self.log,
            "hlog": self.hlog,
            "dlog": self.dlog,
        }
        self.post_commands = {
            "blink": self.blink,
            "upgrade": self.upgrade,
            "upgrade_clear": self.upgrade_clear,
            "reboot": self.reboot,
            "reset_conf": self.reset_conf,
            "set_miner_conf": self.set_miner_conf,
            "set_network_conf": self.set_network_conf,
        }

        self.web_dir = os.path.join(os.path.dirname(__file__), "web_files")

        self.router.add_api_route("/{path}", self.html_pages, methods=["GET"])
        self.router.add_api_route("/", lambda: self.html_pages("index.html"))

        self.router.add_api_route("/js/{path}", self.js_files, methods=["GET"])
        self.router.add_api_route("/static/{path}", self.static_files, methods=["GET"])
        self.router.add_api_route(
            "/i18n/{path}", self.translation_files, methods=["GET"]
        )

        self.router.add_api_route(
            "/cgi-bin/{command}", self.handle_get_command, methods=["GET"]
        )
        self.router.add_api_route(
            "/cgi-bin/{command}", self.handle_post_command, methods=["POST"]
        )

    async def run(self):
        app = FastAPI()
        app.include_router(self.router)
        cfg = hypercorn.Config()
        cfg.bind = "0.0.0.0:80"

        cfg.loglevel = "ERROR"

        await serve(app, cfg)

    def html_pages(self, path: str):
        return FileResponse(os.path.join(self.web_dir, path))

    def js_files(self, path: str):
        return FileResponse(os.path.join(self.web_dir, "js", path))

    def static_files(self, path: str):
        return FileResponse(os.path.join(self.web_dir, "static", path))

    def translation_files(self, path: str):
        return FileResponse(os.path.join(self.web_dir, "i18n", path))

    async def handle_get_command(self, command: str):
        command = command.replace(".cgi", "")
        if command in self.get_commands:
            log.success("WEB", command)
            return self.get_commands[command]()
        log.failure("WEB", command)
        raise HTTPException(404)

    async def handle_post_command(self, request: Request, command: str):
        command = command.replace(".cgi", "")
        req_data = json.loads(await request.body())
        if command in self.post_commands:
            log.success("WEB", command)
            return self.post_commands[command](**req_data)
        log.failure("WEB", command)
        raise HTTPException(404)

    def blink(self, blink: Union[str, bool]):
        if blink == "true" or blink is True:
            self.backend.light = True
            return {"code": "B000"}
        if blink == "false" or blink is False:
            self.backend.light = False
            return {"code": "B100"}

    def summary(self):
        return {
            "STATUS": {
                "STATUS": "S",
                "when": datetime.datetime.now().timestamp(),
                "Msg": "summary",
                "api_version": "1.0.0",
            },
            "INFO": {
                "miner_version": "49.0.1.3",
                "CompileTime": "Fri Sep 15 14:39:20 CST 2023",
                "type": f"{self.backend.miner_info.make} {self.backend.miner_info.model}",
            },
            "SUMMARY": [
                {
                    "elapsed": self.backend.elapsed,
                    "rate_5s": round(
                        sum(
                            [
                                round(float(val.hashrate.into(self.hr_unit)), 2)
                                for val in self.backend.boards
                            ]
                        ),
                        2,
                    ),
                    "rate_30m": round(
                        sum(
                            [
                                round(float(val.hashrate.into(self.hr_unit)), 2)
                                for val in self.backend.boards
                            ]
                        ),
                        2,
                    ),
                    "rate_avg": round(
                        sum(
                            [
                                round(float(val.hashrate.into(self.hr_unit)), 2)
                                for val in self.backend.boards
                            ]
                        ),
                        2,
                    ),
                    "rate_ideal": round(
                        sum(
                            [
                                round(float(val.hashrate.into(self.hr_unit)), 2)
                                for val in self.backend.boards
                            ]
                        ),
                        2,
                    ),
                    "rate_unit": str(self.hr_unit),
                    "hw_all": 1598,
                    "bestshare": 10000000000,
                    "status": [
                        {
                            "type": "rate",
                            "status": "e",
                            "code": -1,
                            "msg": "Low hashrate",
                        }
                        if sum([float(b.hashrate) for b in self.backend.boards]) == 0
                        else {"type": "rate", "status": "s", "code": 0, "msg": ""},
                        {
                            "type": "network",
                            "status": "e",
                            "code": -1,
                            "msg": "Pool connection failed",
                        }
                        if any([p.url != "" for p in self.backend.pools]) == 0
                        else {"type": "network", "status": "s", "code": 0, "msg": ""},
                        {
                            "type": "fans",
                            "status": "e",
                            "code": -1,
                            "msg": "Fan speed low",
                        }
                        if any(not f.working for f in self.backend.fans)
                        else {"type": "fans", "status": "s", "code": 0, "msg": ""},
                        {"type": "temp", "status": "s", "code": 0, "msg": ""},
                    ],
                }
            ],
        }

    def get_miner_conf(self):
        return {
            "pools": [
                {
                    "url": p.full_url,
                    "user": p.user,
                    "pass": p.pwd,
                }
                for p in self.backend.pools
            ],
            "api-listen": True,
            "api-network": True,
            "api-groups": "A:stats:pools:devs:summary:version",
            "api-allow": "A:0/0,W:*",
            "bitmain-fan-ctrl": self.backend.miner_info.fan_manual,
            "bitmain-fan-pwm": str(self.backend.miner_info.fan_speed),
            "bitmain-use-vil": True,
            "bitmain-freq": "675",
            "bitmain-voltage": "1400",
            "bitmain-ccdelay": "0",
            "bitmain-pwth": "0",
            "bitmain-work-mode": "0",
            "bitmain-freq-level": "",
        }

    def get_blink_status(self):
        return {"blink": self.backend.light}

    def get_system_info(self):
        return {
            "minertype": f"{self.backend.miner_info.make} {self.backend.miner_info.model}",
            "nettype": "DHCP",
            "netdevice": "eth0",
            "macaddr": self.backend.miner_info.mac,
            "hostname": "Antminer",
            "ipaddress": socket.gethostbyname_ex(socket.gethostname())[-1][-1],
            "netmask": "255.255.255.0",
            "gateway": "",
            "dnsservers": "",
            "system_mode": "GNU/Linux",
            "system_kernel_version": "Linux 4.6.0-xilinx-g03c746f7 #2 SMP PREEMPT Mon Sep 21 11:50:03 CST 2020",
            "system_filesystem_version": "Fri Sep 15 14:39:20 CST 2023",
            "firmware_type": "Release",
        }

    def get_network_info(self):
        return {
            "nettype": "DHCP",
            "netdevice": "eth0",
            "macaddr": self.backend.miner_info.mac,
            "ipaddress": socket.gethostbyname_ex(socket.gethostname())[-1][-1],
            "netmask": "255.255.255.0",
            "conf_nettype": "DHCP",
            "conf_hostname": "Antminer",
            "conf_ipaddress": "",
            "conf_netmask": "",
            "conf_gateway": "",
            "conf_dnsservers": "",
        }

    def chart(self):
        return {
            "STATUS": {
                "STATUS": "S",
                "when": datetime.datetime.now().timestamp(),
                "Msg": "rate",
                "api_version": "1.0.0",
            },
            "INFO": {
                "miner_version": "49.0.1.3",
                "CompileTime": "Fri Sep 15 14:39:20 CST 2023",
                "type": f"{self.backend.miner_info.make} {self.backend.miner_info.model}",
            },
            "RATE": [
                {
                    "unit": str(self.hr_unit),
                    "xAxis": [f"{i}min" for i in range(15, 361, 15)],
                    "series": [
                        {
                            "name": f"chain{i}",
                            "data": [
                                round(float(val.hashrate.into(self.hr_unit)), 2)
                                for _ in range(24)
                            ],
                        }
                        for i, val in enumerate(self.backend.boards)
                    ],
                }
            ],
        }

    def miner_type(self):
        return {
            "miner_type": f"{self.backend.miner_info.make} {self.backend.miner_info.model}",
            "subtype": "AMLCtrl_BHB42601",
            "fw_version": "Fri Sep 15 14:39:20 CST 2023",
        }

    def pools(self):
        return {
            "STATUS": {
                "STATUS": "S",
                "when": datetime.datetime.now().timestamp(),
                "Msg": "pools",
                "api_version": "1.0.0",
            },
            "INFO": {
                "miner_version": "49.0.1.3",
                "CompileTime": "Fri Sep 15 14:39:20 CST 2023",
                "type": f"{self.backend.miner_info.make} {self.backend.miner_info.model}",
            },
            "POOLS": [
                {
                    "index": i,
                    "url": self.backend.pools[i].full_url,
                    "user": self.backend.pools[i].user,
                    "status": "Alive" if self.backend.pools[i].active else "Dead",
                    "priority": 0,
                    "getworks": 9000,
                    "accepted": 10000,
                    "rejected": 0,
                    "discarded": 100000,
                    "stale": 0,
                    "diff": "100K",
                    "diff1": 0,
                    "diffa": 1000000000,
                    "diffr": 1000000,
                    "diffs": 0,
                    "lsdiff": 100000,
                    "lstime": "0:00:02",
                }
                if len(self.backend.pools) > i
                else {
                    "index": i,
                    "url": "",
                    "user": "",
                    "status": "Dead",
                    "priority": 0,
                    "getworks": 0,
                    "accepted": 0,
                    "rejected": 0,
                    "discarded": 0,
                    "stale": 0,
                    "diff": "0K",
                    "diff1": 0,
                    "diffa": 0,
                    "diffr": 0,
                    "diffs": 0,
                    "lsdiff": 0,
                    "lstime": "0:00:00",
                }
                for i in range(3)
            ],
        }

    def stats(self):
        return {
            "STATUS": {
                "STATUS": "S",
                "when": datetime.datetime.now().timestamp(),
                "Msg": "stats",
                "api_version": "1.0.0",
            },
            "INFO": {
                "miner_version": "49.0.1.3",
                "CompileTime": "Fri Sep 15 14:39:20 CST 2023",
                "type": f"{self.backend.miner_info.make} {self.backend.miner_info.model}",
            },
            "STATS": [
                {
                    "elapsed": self.backend.elapsed,
                    "rate_5s": round(
                        sum(
                            [
                                round(float(val.hashrate.into(self.hr_unit)), 2)
                                for val in self.backend.boards
                            ]
                        ),
                        2,
                    ),
                    "rate_30m": round(
                        sum(
                            [
                                round(float(val.hashrate.into(self.hr_unit)), 2)
                                for val in self.backend.boards
                            ]
                        ),
                        2,
                    ),
                    "rate_avg": round(
                        sum(
                            [
                                round(float(val.hashrate.into(self.hr_unit)), 2)
                                for val in self.backend.boards
                            ]
                        ),
                        2,
                    ),
                    "rate_ideal": round(
                        sum(
                            [
                                round(
                                    random.uniform(
                                        float(
                                            val.info.ideal_hashrate.into(self.hr_unit)
                                        )
                                        * (1 - 0.025),
                                        float(
                                            val.info.ideal_hashrate.into(self.hr_unit)
                                        )
                                        * (1 + 0.025),
                                    ),
                                    2,
                                )
                                for val in self.backend.boards
                            ]
                        ),
                        2,
                    ),
                    "rate_unit": str(self.hr_unit),
                    "chain_num": len(self.backend.boards),
                    "fan_num": self.backend.miner_info.fan_count,
                    "fan": [fan.rpm for fan in self.backend.fans],
                    "hwp_total": 0.0,
                    "miner-mode": 0,
                    "freq-level": 100,
                    "chain": [
                        {
                            "index": i,
                            "freq_avg": 545,
                            "rate_ideal": float(
                                round(
                                    float(val.info.ideal_hashrate.into(self.hr_unit)), 2
                                )
                            ),
                            "rate_real": float(
                                round(float(val.hashrate.into(self.hr_unit)), 2)
                            ),
                            "asic_num": val.chips,
                            "asic": " ".join(
                                [
                                    "".join(["o" * val.chips])[i : i + 3]
                                    for i in range(0, val.chips, 3)
                                ]
                            ),
                            "temp_pic": [round(val.info.board_temp) for _ in range(4)],
                            "temp_pcb": [round(val.info.board_temp) for _ in range(4)],
                            "temp_chip": [round(val.info.chip_temp) for _ in range(4)],
                            "hw": 0,
                            "eeprom_loaded": True,
                            "sn": f"REALSERIALNUMBER{i}",
                            "hwp": 0.0,
                        }
                        for i, val in enumerate(self.backend.boards)
                    ],
                }
            ],
        }

    def log(self):
        pass

    def hlog(self):
        pass

    def dlog(self):
        pass

    def upgrade(self):
        pass

    def upgrade_clear(self):
        pass

    def reboot(self):
        pass

    def reset_conf(self):
        pass

    def set_miner_conf(self, **config):
        try:
            self.backend.pools = [
                PoolInfo(
                    url=""
                    if val["url"] == ""
                    else val["url"].split(":")[1].replace("//", ""),
                    user=val["user"],
                    pwd=val["pass"],
                    port="" if val["url"] == "" else val["url"].split(":")[2],
                )
                for val in config["pools"]
            ]
            self.backend.miner_info.fan_speed = config["bitmain-fan-pwm"]
            self.backend.miner_info.fan_manual = config["bitmain-fan-ctrl"]
        except json.JSONDecodeError:
            log.failure("WEB", "set_miner_conf DecodeError")
            return {"stats": "failure", "code": "M100", "msg": "Decode Error."}
        except LookupError:
            log.failure("WEB", "set_miner_conf LookupError")
            return {"stats": "failure", "code": "M100", "msg": "Lookup Error."}
        return {"stats": "success", "code": "M000", "msg": "OK!"}

    def set_network_conf(self):
        pass
