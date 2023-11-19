from __future__ import annotations

import random
from dataclasses import dataclass, field

from asic_simulator.backend.data.boards import BoardInfo
from asic_simulator.backend.data.fans import FanInfo


@dataclass
class MinerInfo:
    make: str = "Antminer"
    model: str = "S9"
    mac: str = ":".join([f"{random.randint(0, 255):02X}" for _ in range(6)])
    board_count: int = 3
    board_info: BoardInfo = field(default_factory=lambda: BoardInfo())
    fan_count: int = 2
    fan_info: FanInfo = field(default_factory=lambda: FanInfo())
    fan_manual: bool = False
    fan_speed: float = 100
