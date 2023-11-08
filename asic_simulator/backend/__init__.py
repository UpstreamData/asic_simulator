from asic_simulator.backend.data import (
    BoardInfo,
    MinerInfo,
    MinerSimulatorBackend,
)
from asic_simulator.backend.data.hashrate import HashUnit, Hashrate

MINER_INFO = {
    "antminer": {
        "stock": {
            "S19j Pro": MinerInfo(
                make="Antminer",
                model="S19j Pro",
                board_info=BoardInfo(
                    ideal_chips=126,
                    chips=126,
                    ideal_hashrate=Hashrate(34, HashUnit.TH),
                    hashrate=Hashrate(34, HashUnit.TH),
                ),
                fan_count=4,
            ),
            "S19": MinerInfo(
                make="Antminer",
                model="S19",
                board_info=BoardInfo(
                    ideal_chips=76,
                    chips=76,
                    ideal_hashrate=Hashrate(34, HashUnit.TH),
                    hashrate=Hashrate(34, HashUnit.TH),
                ),
                fan_count=4,
            ),
            "S19L": MinerInfo(
                make="Antminer",
                model="S19L",
                board_info=BoardInfo(
                    ideal_chips=76,
                    chips=76,
                    ideal_hashrate=Hashrate(34, HashUnit.TH),
                    hashrate=Hashrate(34, HashUnit.TH),
                ),
                fan_count=4,
            ),
            "S19 Pro": MinerInfo(
                make="Antminer",
                model="S19 Pro",
                board_info=BoardInfo(
                    ideal_chips=114,
                    chips=114,
                    ideal_hashrate=Hashrate(34, HashUnit.TH),
                    hashrate=Hashrate(34, HashUnit.TH),
                ),
                fan_count=4,
            ),
            "S19j": MinerInfo(
                make="Antminer",
                model="S19j",
                board_info=BoardInfo(
                    ideal_chips=114,
                    chips=114,
                    ideal_hashrate=Hashrate(34, HashUnit.TH),
                    hashrate=Hashrate(34, HashUnit.TH),
                ),
                fan_count=4,
            ),
            "S19 Pro+": MinerInfo(
                make="Antminer",
                model="S19Pro+",
                board_info=BoardInfo(
                    ideal_chips=120,
                    chips=120,
                    ideal_hashrate=Hashrate(34, HashUnit.TH),
                    hashrate=Hashrate(34, HashUnit.TH),
                ),
                fan_count=4,
            ),
            "S19 XP": MinerInfo(
                make="Antminer",
                model="S19 XP",
                board_info=BoardInfo(
                    ideal_chips=110,
                    chips=110,
                    ideal_hashrate=Hashrate(34, HashUnit.TH),
                    hashrate=Hashrate(34, HashUnit.TH),
                ),
                fan_count=4,
            ),
            "S19a": MinerInfo(
                make="Antminer",
                model="S19a",
                board_info=BoardInfo(
                    ideal_chips=72,
                    chips=72,
                    ideal_hashrate=Hashrate(34, HashUnit.TH),
                    hashrate=Hashrate(34, HashUnit.TH),
                ),
                fan_count=4,
            ),
            "S19a Pro": MinerInfo(
                make="Antminer",
                model="S19a Pro",
                board_info=BoardInfo(
                    ideal_chips=100,
                    chips=100,
                    ideal_hashrate=Hashrate(34, HashUnit.TH),
                    hashrate=Hashrate(34, HashUnit.TH),
                ),
                fan_count=4,
            ),
            "T19": MinerInfo(
                make="Antminer",
                model="T19",
                board_info=BoardInfo(
                    ideal_chips=76,
                    chips=76,
                    ideal_hashrate=Hashrate(34, HashUnit.TH),
                    hashrate=Hashrate(34, HashUnit.TH),
                ),
                fan_count=4,
            ),
        }
    },
    "whatsminer": {
        "stock": {
            "M30SVG10": MinerInfo(
                make="Whatsminer",
                model="M30SVG10",
                board_info=BoardInfo(
                    ideal_chips=66,
                    chips=66,
                    ideal_hashrate=Hashrate(28, HashUnit.TH),
                    hashrate=Hashrate(28, HashUnit.TH),
                ),
                fan_count=2,
            )
        }
    },
}
