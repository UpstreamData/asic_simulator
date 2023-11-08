from __future__ import annotations

from dataclasses import dataclass, field

from asic_simulator.backend.data.hashrate import Hashrate, HashUnit


@dataclass
class BoardInfo:
    ideal_chips: int = 63
    chips: int = 63
    ideal_hashrate: Hashrate = Hashrate(4, HashUnit.TH)
    hashrate: Hashrate = Hashrate(4, HashUnit.TH)
    board_temp: float = 60
    chip_temp: float = 80


@dataclass
class BoardSimulator:
    info: BoardInfo
    _chips: int = None
    chips: int = field(init=False)
    _hashrate: Hashrate = None
    # can't define this or calling .into() on Hashrate will fail.
    # usually defined for compatibility with fields()
    # hashrate: Hashrate = field(init=False)
    mining: bool = True
    working: bool = True

    @property
    def hashrate(self) -> Hashrate:
        if self.mining and self.working:
            if self._hashrate is not None:
                return self._hashrate
            return self.info.ideal_hashrate
        return Hashrate(0)

    @hashrate.setter
    def hashrate(self, val: Hashrate):
        self._hashrate = val

    @property
    def chips(self) -> int:
        if self.working:
            if self._chips is not None:
                return self._chips
            return self.info.ideal_chips
        return 0

    @chips.setter
    def chips(self, val: Hashrate):
        self._hashrate = val
