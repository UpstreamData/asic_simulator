from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class HashUnit(Enum):
    H = 1
    KH = int(H) * 1000
    MH = int(KH) * 1000
    GH = int(MH) * 1000
    TH = int(GH) * 1000
    PH = int(TH) * 1000
    EH = int(PH) * 1000
    ZH = int(EH) * 1000

    def __str__(self):
        if self == HashUnit.H:
            return "H/s"
        if self == HashUnit.KH:
            return "KH/s"
        if self == HashUnit.MH:
            return "MH/s"
        if self == HashUnit.GH:
            return "GH/s"
        if self == HashUnit.TH:
            return "TH/s"
        if self == HashUnit.PH:
            return "PH/s"
        if self == HashUnit.EH:
            return "EH/s"
        if self == HashUnit.ZH:
            return "ZH/s"

    def __repr__(self):
        return str(self)


@dataclass
class Hashrate:
    hashrate: float
    unit: HashUnit = HashUnit.TH

    def __float__(self):
        return float(self.hashrate)

    def __int__(self):
        return int(self.hashrate)

    def __repr__(self):
        return f"{self.hashrate} {str(self.unit)}"

    def into(self, other: HashUnit) -> Hashrate:
        return Hashrate(
            hashrate=self.hashrate / (other.value / self.unit.value), unit=other
        )
