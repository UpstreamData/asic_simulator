import asyncio
import logging
import sys

from asic_simulator.backend import MINER_INFO
from asic_simulator.backend.data import MinerSimulatorBackend

from .antminer import AntminerSimulator
from .whatsminer import WhatsminerSimulator

logging.basicConfig(
    level=logging.INFO, format="[MinerSimulator | %(levelname)s] - %(message)s"
)

# if the computer is windows, set the event loop policy to a WindowsSelector policy
# this fixes connections getting closed with ConnectionResetError occasionally
if (
    sys.version_info[0] == 3
    and sys.version_info[1] >= 8
    and sys.platform.startswith("win")
):
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())


MINER_SIMULATORS = {
    "antminer": {
        "stock": {
            "S19j Pro": AntminerSimulator(
                MinerSimulatorBackend(MINER_INFO["antminer"]["stock"]["S19j Pro"])
            ),
            "S19": AntminerSimulator(
                MinerSimulatorBackend(MINER_INFO["antminer"]["stock"]["S19"])
            ),
            "S19L": AntminerSimulator(
                MinerSimulatorBackend(MINER_INFO["antminer"]["stock"]["S19L"])
            ),
            "S19 Pro": AntminerSimulator(
                MinerSimulatorBackend(MINER_INFO["antminer"]["stock"]["S19 Pro"])
            ),
            "S19j": AntminerSimulator(
                MinerSimulatorBackend(MINER_INFO["antminer"]["stock"]["S19j"])
            ),
            "S19 Pro+": AntminerSimulator(
                MinerSimulatorBackend(MINER_INFO["antminer"]["stock"]["S19 Pro+"])
            ),
            "S19 XP": AntminerSimulator(
                MinerSimulatorBackend(MINER_INFO["antminer"]["stock"]["S19 XP"])
            ),
            "S19a": AntminerSimulator(
                MinerSimulatorBackend(MINER_INFO["antminer"]["stock"]["S19a"])
            ),
            "S19a Pro": AntminerSimulator(
                MinerSimulatorBackend(MINER_INFO["antminer"]["stock"]["S19a Pro"])
            ),
            "T19": AntminerSimulator(
                MinerSimulatorBackend(MINER_INFO["antminer"]["stock"]["T19"])
            ),
        }
    },
    "whatsminer": {
        "stock": {
            "M30SVG10": WhatsminerSimulator(
                MinerSimulatorBackend(MINER_INFO["whatsminer"]["stock"]["M30SVG10"])
            )
        }
    },
}
