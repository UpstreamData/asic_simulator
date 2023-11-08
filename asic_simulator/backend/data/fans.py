from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class FanInfo:
    max_speed: int = 6000


@dataclass
class FanSimulator:
    info: FanInfo
    rpm: int = field(init=False)
    _rpm: int = 0
    working: bool = True

    @property
    def rpm(self):
        if self.working:
            return self._rpm
        return 0

    @rpm.setter
    def rpm(self, other: int):
        self._rpm = other
