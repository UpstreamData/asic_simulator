import asyncio
import datetime
import json

from asic_simulator import log
from asic_simulator.backend import MinerSimulatorBackend, HashUnit


class AntminerRPCHandler:
    def __init__(
        self, backend: MinerSimulatorBackend, hash_unit: HashUnit = HashUnit.GH
    ):
        self.hash_unit = hash_unit
        self.backend = backend
        self.commands = {
            "devs": self.devs,
            "pools": self.pools,
            "stats": self.stats,
            "summary": self.summary,
            "version": self.version,
        }

    async def run(self):
        server = await asyncio.start_server(self._handle_client, "0.0.0.0", 4028)
        async with server:
            await server.serve_forever()

    async def _handle_client(
        self, reader: asyncio.StreamReader, writer: asyncio.StreamWriter
    ):
        raw_data = await reader.read(1000)
        str_data = raw_data.decode()
        try:
            data = json.loads(str_data)
        except json.JSONDecodeError:
            writer.write(json.dumps(self._handle_failure()).encode())
            await writer.drain()
            writer.close()
            return

        command = data.get("command")
        result = self.handle_command(command)

        writer.write(json.dumps(result).encode())
        await writer.drain()
        writer.close()

    def handle_command(self, command: str, **params):
        if command in self.commands:
            log.success("RPC", command)
            return self._handle_success(command, **params)
        log.failure("RPC", command)
        return self._handle_failure()

    def _handle_failure(self):
        return {
            "STATUS": [
                {
                    "Code": 14,
                    "Description": "cgminer 1.0.0",
                    "Msg": "Invalid command",
                    "STATUS": "E",
                    "When": round(datetime.datetime.now().timestamp()),
                }
            ],
            "id": 1,
        }

    def _handle_success(self, command, **params):
        if len(params) > 0:
            command_res = self.commands[command](**params)
        else:
            command_res = self.commands[command]()
        return {
            "STATUS": [
                {
                    "Code": command_res["code"],
                    "Description": "cgminer 1.0.0",
                    "Msg": command_res["msg"],
                    "STATUS": "S",
                    "When": round(datetime.datetime.now().timestamp()),
                }
            ],
            **command_res["result"],
            "id": 1,
        }

    def devs(self):
        ts = round(datetime.datetime.now().timestamp())
        return {
            "code": 9,
            "msg": "1 ASC(s)",
            "result": {
                "DEVS": [
                    {
                        "ASC": 0,
                        "Accepted": 10000,
                        "Device Elapsed": self.backend.elapsed,
                        "Device Hardware%": 1.0,
                        "Device Rejected": 0.0,
                        "Diff1 Work": 0,
                        "Difficulty Accepted": 1000000000,
                        "Difficulty Rejected": 1000000,
                        "Enabled": "Y",
                        "Hardware Errors": 1,
                        "ID": 0,
                        "Last Share Difficulty": ts
                        - 11,  # for some reason this is a timestamp
                        "Last Share Pool": 0,
                        "Last Share Time": ts - 10,
                        "Last Valid Work": ts - 11,
                        "MHS 5s": 0.0,  # not handled by devs
                        "MHS av": 0.0,  # not handled by devs
                        "Name": "BTM_SOC",
                        "Rejected": 100,
                        "Status": "Alive",
                        "Tenperature": 0.0,  # not handled by devs
                        "Total MH": 0.0,  # not handled by devs
                        "Utility": 0.0,
                    }
                ]
            },
        }

    def pools(self):
        return {
            "code": 7,
            "msg": f"{len(self.backend.pools)} Pool(s)",
            "result": {
                "POOLS": [
                    {
                        "Accepted": 10000,
                        "Best Share": 1000000000.0,
                        "Diff": "100K",
                        "Diff1 Shares": 0,
                        "Difficulty Accepted": 1000000000.0,
                        "Difficulty Rejected": 1000000.0,
                        "Difficulty Stale": 0.0,
                        "Discarded": 100000,
                        "Get Failures": 3,
                        "Getworks": 9000,
                        "Has GBT": False,
                        "Has Stratum": True,
                        "Last Share Difficulty": 100000.0,
                        "Last Share Time": "0:00:02",
                        "Long Poll": "N",
                        "POOL": i,
                        "Pool Rejected%": 0.0,
                        "Pool Stale%%": 0.0,
                        "Priority": 0,
                        "Proxy": "",
                        "Proxy Type": "",
                        "Quota": 1,
                        "Rejected": 100,
                        "Remote Failures": 0,
                        "Stale": 0,
                        "Status": "Alive" if p.active else "Dead",
                        "Stratum Active": True,
                        "Stratum URL": p.url,
                        "URL": p.full_url,
                        "User": p.user,
                    }
                    for i, p in enumerate(self.backend.pools)
                ],
            },
        }

    def stats(self):
        fan_data = {f"fan{i+1}": 0 for i in range(4)}
        for i, fan in enumerate(self.backend.fans):
            fan_data[f"fan{i+1}"] = fan.rpm

        board_data = {
            **{f"chain_acn{i+1}": 0 for i in range(4)},
            **{f"chain_acs{i+1}": "" for i in range(4)},
            **{f"chain_hw{i+1}": 0 for i in range(4)},
            **{f"chain_rate{i+1}": "" for i in range(4)},
            **{f"freq{i+1}": 0 for i in range(4)},
            **{f"temp{i+1}": 0 for i in range(4)},
            **{f"temp2_{i+1}": 0 for i in range(4)},
            **{f"temp_chip{i+1}": "0-0-0-0" for i in range(4)},
            **{f"temp_pcb{i+1}": "0-0-0-0" for i in range(4)},
            **{f"temp_pic{i+1}": "0-0-0-0" for i in range(4)},
        }
        for board in range(self.backend.miner_info.board_count):
            acs_str = "o" * self.backend.boards[board].chips
            board_data[f"chain_acn{board+1}"] = self.backend.boards[board].chips
            board_data[f"chain_acs{board+1}"] = " ".join(
                [acs_str[i : i + 3] for i in range(0, len(acs_str), 3)]
            )
            board_data[f"chain_hw{board+1}"] = 10
            board_data[f"chain_rate{board+1}"] = str(float(
                self.backend.boards[board].hashrate.into(self.hash_unit)
            ))
            board_data[f"freq{board+1}"] = 545
            board_data[f"temp{board+1}"] = self.backend.boards[board].info.board_temp
            board_data[f"temp2_{board+1}"] = self.backend.boards[board].info.chip_temp
            board_data[f"temp_chip{board+1}"] = "-".join(
                [str(self.backend.boards[board].info.chip_temp) for _ in range(4)]
            )
            board_data[f"temp_pcb{board+1}"] = "-".join(
                [str(self.backend.boards[board].info.board_temp) for _ in range(4)]
            )
            board_data[f"temp_pic{board+1}"] = "-".join(
                [str(self.backend.boards[board].info.board_temp) for _ in range(4)]
            )

        return {
            "code": 70,
            "msg": "CGMiner stats",
            "result": {
                "STATS": [
                    {
                        "BMMiner": "1.0.0",
                        "CompileTime": "Fri Sep 15 14:39:20 CST 2023",
                        "Miner": "uart_trans.1.3",
                        "Type": f"{self.backend.miner_info.make} {self.backend.miner_info.model}",
                    },
                    {
                        "Calls": 0,
                        "Elapsed": self.backend.elapsed,
                        "GHS 5s": round(
                            sum(
                                [
                                    float(b.hashrate.into(self.hash_unit))
                                    for b in self.backend.boards
                                ]
                            ),
                            2,
                        ),
                        "GHS av": round(
                            sum(
                                [
                                    float(b.hashrate.into(self.hash_unit))
                                    for b in self.backend.boards
                                ]
                            ),
                            2,
                        ),
                        "ID": "BTM_SOC0",
                        "Max": 0,
                        "Min": 99999999,
                        "Mode": 2,
                        "STATS": 0,
                        "Wait": 0,
                        "fan_num": self.backend.miner_info.fan_count,
                        "frequency": 545,
                        "miner_count": len(self.backend.boards),
                        "miner_id": "no miner id now",
                        "miner_version": "uart_trans.1.3",
                        "no_matching_work": 30,
                        "rate_30m": round(
                            sum(
                                [
                                    float(b.hashrate.into(self.hash_unit))
                                    for b in self.backend.boards
                                ]
                            ),
                            2,
                        ),
                        "rate_unit": "GH",
                        "temp_max": 0,
                        "temp_num": len(self.backend.boards),
                        "total rate": round(
                            sum(
                                [
                                    float(b.hashrate.into(self.hash_unit))
                                    for b in self.backend.boards
                                ]
                            ),
                            2,
                        ),
                        "total_acn": sum([b.chips for b in self.backend.boards]),
                        "total_freqavg": 545,
                        "total_rateideal": round(
                            sum(
                                [
                                    float(b.info.ideal_hashrate.into(self.hash_unit))
                                    for b in self.backend.boards
                                ]
                            ),
                            2,
                        ),
                        **fan_data,
                        **board_data,
                    },
                ],
            },
        }

    def summary(self):
        return {
            "code": 11,
            "msg": "Summary",
            "result": {
                "SUMMARY": [
                    {
                        "Accepted": 1000,
                        "Best Share": 1000000000,
                        "Device Hardware%": 1.0,
                        "Device Rejected%": 0.0,
                        "Difficulty Accepted": 1000000000.0,
                        "Difficulty Rejected": 1000000.0,
                        "Difficulty Stale": 0.0,
                        "Discarded": 100000,
                        "Elapsed": self.backend.elapsed,
                        "Found Blocks": 0,
                        "GHS 30m": round(
                            sum(
                                [
                                    float(b.hashrate.into(self.hash_unit))
                                    for b in self.backend.boards
                                ]
                            ),
                            2,
                        ),
                        "GHS 5s": round(
                            sum(
                                [
                                    float(b.hashrate.into(self.hash_unit))
                                    for b in self.backend.boards
                                ]
                            ),
                            2,
                        ),
                        "GHS av": round(
                            sum(
                                [
                                    float(b.hashrate.into(self.hash_unit))
                                    for b in self.backend.boards
                                ]
                            ),
                            2,
                        ),
                        "Get Failures": 3,
                        "Getwork": 9000,
                        "Hardware Errors": 1,
                        "Last getwork": 1000000000,
                        "Local Work": 100000,
                        "Network Blocks": 400,
                        "Pool Rejected%": 0.0,
                        "Pool Stale%": 0.0,
                        "Rejected": 100,
                        "Remote Failures": 0,
                        "Stale": 10,
                        "Total MH": 10000000000000.0,
                        "Utility": 10.00,
                        "Work Utility": 1000000.00,
                    }
                ]
            },
        }

    def version(self):
        return {
            "msg": "CGMiner versions",
            "code": 22,
            "result": {
                "VERSION": [
                    {
                        "API": "3.1",
                        "BMMiner": "1.0.0",
                        "CompileTime": "Fri Sep 15 14:39:20 CST 2023",
                        "Miner": "uart_trans.1.3",
                        "Type": f"{self.backend.miner_info.make} {self.backend.miner_info.model}",
                    }
                ]
            },
        }
