from __future__ import annotations

import datetime

from asic_simulator.backend.data.boards import BoardInfo, BoardSimulator
from asic_simulator.backend.data.fans import FanSimulator, FanInfo
from asic_simulator.backend.data.miner import MinerInfo
from asic_simulator.backend.data.pools import PoolInfo


class MinerSimulatorBackend:
    def __init__(
        self, miner_info: MinerInfo = MinerInfo(), pools_info: list[PoolInfo] = None
    ):
        self.miner_info = miner_info
        self.pools = (
            pools if pools_info is not None else [PoolInfo(), PoolInfo(), PoolInfo()]
        )
        self.env_temp: float = 35
        self.init_time = round(datetime.datetime.now().timestamp())
        self.light = False
        self.mining = True
        self._fans = [
            FanSimulator(self.miner_info.fan_info)
            for _ in range(self.miner_info.fan_count)
        ]
        self._boards = [
            BoardSimulator(self.miner_info.board_info)
            for _ in range(self.miner_info.board_count)
        ]

    @property
    def boards(self) -> list[BoardInfo]:
        return [self.miner_info.board_info for _ in range(self.miner_info.board_count)]

    @property
    def elapsed(self) -> int:
        return 10000 + round(datetime.datetime.now().timestamp()) - self.init_time

    def _update_fans(self):
        if self.miner_info.fan_manual:
            for fan in self._fans:
                fan.rpm = round(
                    self.miner_info.fan_info.max_speed
                    * (self.miner_info.fan_speed / 100)
                )
        else:
            for fan in self._fans:
                fan.rpm = self.miner_info.fan_info.max_speed

    @property
    def fans(self) -> list[FanSimulator]:
        self._update_fans()
        return self._fans

    def _update_boards(self):
        for board in self._boards:
            board.mining = self.mining

    @property
    def boards(self) -> list[BoardSimulator]:
        self._update_boards()
        return self._boards
