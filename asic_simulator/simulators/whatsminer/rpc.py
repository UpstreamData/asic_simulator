import asyncio
import base64
import binascii
import datetime
import hashlib
import json
import secrets
import re

from passlib.handlers.md5_crypt import md5_crypt
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

from asic_simulator import log
from asic_simulator.backend import MinerSimulatorBackend, HashUnit


def _add_to_16(string: str) -> bytes:
    """Add null bytes to a string until the length is a multiple 16

    Parameters:
        string: The string to lengthen to a multiple of 16 and encode.

    Returns:
        The input string as bytes with a multiple of 16 as the length.
    """
    while len(string) % 16 != 0:
        string += "\0"
    return str.encode(string)  # return bytes


def _crypt(word: str, salt: str) -> str:
    """Encrypts a word with a salt, using a standard salt format.

    Encrypts a word using a salt with the format
    '\s*\$(\d+)\$([\w\./]*)\$'.  If this format is not used, a
    ValueError is raised.

    Parameters:
        word: The word to be encrypted.
        salt: The salt to encrypt the word.

    Returns:
        An MD5 hash of the word with the salt.
    """
    # compile a standard format for the salt
    standard_salt = re.compile("\s*\$(\d+)\$([\w\./]*)\$")
    # check if the salt matches
    match = standard_salt.match(salt)
    # if the matching fails, the salt is incorrect
    if not match:
        raise ValueError("Salt format is not correct.")
    # save the matched salt in a new variable
    new_salt = match.group(2)
    # encrypt the word with the salt using md5
    result = md5_crypt.hash(word, salt=new_salt)
    return result


class WhatsminerRPCHandler:
    def __init__(
        self, backend: MinerSimulatorBackend, hash_unit: HashUnit = HashUnit.MH
    ):
        self.hash_unit = hash_unit
        self.backend = backend
        self.commands = {
            "get_token": self.get_token,
            "get_version": self.get_version,
            "devdetails": self.devdetails,
            "devs": self.devs,
            "edevs": self.devs,
            "get_psu": self.get_psu,
            "pools": self.pools,
        }
        self.pwd = "admin"
        self.salt = secrets.token_hex(8)
        self.newsalt = secrets.token_hex(8)
        self.salt_time = str(datetime.datetime.now().timestamp())[:-4]
        self.api_ver = "1.4"

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

        enc = True if "enc" in data else False
        command = data.get("command") if not enc else data.get("data")
        result = self.handle_command(command, enc=enc)

        writer.write(json.dumps(result).encode())
        await writer.drain()
        writer.close()

    @property
    def md5_pwd(self):
        return _crypt(self.pwd, "$1$" + self.salt + "$").split("$")[3]

    @property
    def host_sign(self):
        return _crypt(self.md5_pwd + self.salt_time, "$1$" + self.newsalt + "$").split(
            "$"
        )[3]

    def _encode(self, data: dict) -> dict:
        aeskey = hashlib.sha256(self.md5_pwd.encode()).hexdigest()
        # unhexlify the encoded host_passwd
        aeskey = binascii.unhexlify(aeskey.encode())
        # create a new AES key
        aes = Cipher(algorithms.AES(aeskey), modes.ECB())
        encryptor = aes.encryptor()
        # dump the command to json
        api_json_str = json.dumps(data)
        # encode the json command with the aes key
        api_json_str_enc = (
            base64.encodebytes(encryptor.update(_add_to_16(api_json_str)))
            .decode("utf-8")
            .replace("\n", "")
        )
        # label the data as being encoded
        data_enc = {"enc": api_json_str_enc}
        # dump the labeled data to json
        return data_enc

    def _decode(self, enc_data: str) -> dict:
        encrypted_data = base64.decodebytes(enc_data.encode("utf-8"))

        aeskey = hashlib.sha256(self.md5_pwd.encode()).hexdigest()
        aeskey = binascii.unhexlify(aeskey.encode())

        aes = Cipher(algorithms.AES(aeskey), modes.ECB())
        decryptor = aes.decryptor()

        decrypted_data = decryptor.update(encrypted_data) + decryptor.finalize()

        api_json_str = decrypted_data.rstrip(b"\0").decode("utf-8")
        return json.loads(api_json_str)

    def _check_token(self, val: str) -> bool:
        return val == self.host_sign

    def handle_command(self, command: str, enc: bool = False, **params):
        if enc:
            try:
                data = self._decode(command)
            except UnicodeDecodeError:
                log.failure("RPC", "encoded parse failed")
                return self._handle_failure("Invalid data")
            if not self._check_token(data.get("token")):
                log.failure("RPC", "token check failed")
                return self._handle_failure("Invalid token")
            command = data.get("cmd")

        if command in self.commands:
            log.success("RPC", command)
            if enc:
                return self._encode(self._handle_success(command, **params))
            return self._handle_success(command, **params)
        log.failure("RPC", command)
        return self._handle_failure()

    def _handle_failure(self, msg: str = "invalid cmd"):
        return {
            "STATUS": [
                {
                    "Code": 14,
                    "Description": f"whatsminer v{self.api_ver}",
                    "Msg": msg,
                    "STATUS": "E",
                    "When": round(datetime.datetime.now().timestamp()),
                }
            ],
            "id": 1,
        }

    def _handle_success(self, command: str, **params):
        if len(params) > 0:
            command_res = self.commands[command](**params)
        else:
            command_res = self.commands[command]()

        if command.startswith("get_"):
            # whatsminer only, weird format
            return {
                "STATUS": "S",
                "When": round(datetime.datetime.now().timestamp()),
                "Code": command_res["code"],
                "Msg": command_res["result"],
                "Description": f"whatsminer v{self.api_ver}",
            }
        return {
            "STATUS": [
                {
                    "Code": command_res["code"],
                    "Description": "cgminer 4.9.2",
                    "Msg": command_res["msg"],
                    "STATUS": "S",
                    "When": round(datetime.datetime.now().timestamp()),
                }
            ],
            **command_res["result"],
            "id": 1,
        }

    def get_token(self):
        return {
            "code": 134,
            "result": {
                "time": self.salt_time,
                "salt": self.salt,
                "newsalt": self.newsalt,
            },
        }

    def get_version(self):
        return {
            "code": 131,
            "result": {
                "api_ver": f"whatsminer v{self.api_ver}",
                "fw_ver": "20230925.13.REL",
            },
        }

    def devdetails(self):
        return {
            "code": 69,
            "msg": "Device Details",
            "result": {
                "DEVDETAILS": [
                    {
                        "DEVDETAILS": i,
                        "Name": "SM",
                        "ID": i,
                        "Driver": "bitmicro",
                        "Kernel": "",
                        "Model": self.backend.miner_info.model,
                    }
                    for i, board in enumerate(self.backend.boards)
                ]
            },
        }

    def devs(self):
        ts = round(datetime.datetime.now().timestamp())
        return {
            "code": 69,
            "msg": f"{len(self.backend.boards)} ASC(s)",
            "result": {
                "DEVS": [
                    {
                        "ASC": i,
                        "Name": "SM",
                        "ID": i,
                        "Slot": i,
                        "Enabled": "Y",
                        "Status": "Alive" if not board.hashrate == 0 else "Dead",
                        "Temperature": board.info.board_temp,
                        "Chip Frequency": 734,
                        "Fan Speed In": self.backend.fans[0].rpm
                        if len(self.backend.fans) > 0
                        else 0,
                        "Fan Speed Out": self.backend.fans[1].rpm
                        if len(self.backend.fans) > 1
                        else 0,
                        "MHS av": round(float(board.info.hashrate.into(self.hash_unit)), 2),
                        "MHS 5s": round(float(board.info.hashrate.into(self.hash_unit)), 2),
                        "MHS 1m": round(float(board.info.hashrate.into(self.hash_unit)), 2),
                        "MHS 5m": round(float(board.info.hashrate.into(self.hash_unit)), 2),
                        "MHS 15m": round(float(board.info.hashrate.into(self.hash_unit)), 2),
                        "Accepted": 10000,
                        "Rejected": 100,
                        "Hardware Errors": 100,
                        "Utility": 1.00,
                        "Last Share Pool": 0,
                        "Last Share Time": ts - 10,
                        "Total MH": 1000000000000.0,
                        "Diff1 Work": 1000000,
                        "Difficulty Accepted": 100000000.0,
                        "Difficulty Rejected": 100000.0,
                        "Last Share Difficulty": 100000.0,
                        "Last Valid Work": ts - 16,
                        "Device Hardware%": 0.01,
                        "Device Rejected%": 1.00,
                        "Device Elapsed": self.backend.elapsed,
                        "Upfreq Complete": 1,
                        "Effective Chips": board.chips,
                        "PCB SN": f"FAKE12AB34CD56EF78{i}",
                        "Chip Temp Min": board.info.chip_temp,
                        "Chip Temp Max": board.info.chip_temp,
                        "Chip Temp Avg": board.info.chip_temp,
                    }
                    for i, board in enumerate(self.backend.boards)
                ]
            },
        }

    def get_psu(self):
        return {
            "code": 131,
            "result": {
                "name": "P21",
                "hw_version": "",
                "model": "P21-12-3600-E",
                "sw_version": "092523.009",
            },
        }

    def pools(self):
        ts = round(datetime.datetime.now().timestamp())
        return {
            "code": 69,
            "msg": f"{len(self.backend.pools)} Pool(s)",
            "result": {
                "POOLS": [
                    {
                        "POOL": i,
                        "URL": p.full_url,
                        "Status": "Alive" if p.active else "Dead",
                        "Priority": 0,
                        "Quota": 1,
                        "Long Poll": "N",
                        "Getworks": 9000,
                        "Accepted": 10000,
                        "Rejected": 100,
                        "Works": 1000000000,
                        "Discarded": 100000,
                        "Stale": 0,
                        "Get Failures": 3,
                        "Remote Failures": 0,
                        "User": p.user,
                        "Last Share Time": ts - 2,
                        "Diff1 Shares": 0,
                        "Proxy Type": "",
                        "Proxy": "",
                        "Difficulty Accepted": 1000000000.0,
                        "Difficulty Rejected": 1000000.0,
                        "Difficulty Stale": 0.0,
                        "Last Share Difficulty": 100000.0,
                        "Work Difficulty": 0.0,
                        "Has Stratum": True,
                        "Stratum Active": True,
                        "Stratum URL": p.url,
                        "Stratum Difficulty": 100000.0,
                        "Has GBT": False,
                        "Best Share": 10000000000,
                        "Pool Rejected%": 0.0,
                        "Pool Stale%": 0.0,
                        "Bad Work": 0,
                        "Current Block Height": (ts - int("29AB5F49", 16))
                        // 1200,  # approx
                        "Current Block Version": 536870912,
                    }
                    for i, p in enumerate(self.backend.pools)
                ]
            },
        }
