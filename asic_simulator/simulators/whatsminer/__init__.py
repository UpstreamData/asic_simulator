import asyncio

from asic_simulator import log
from asic_simulator.backend import MinerSimulatorBackend
from asic_simulator.backend.data.hashrate import HashUnit
from asic_simulator.simulators.whatsminer.rpc import WhatsminerRPCHandler
from asic_simulator.simulators.whatsminer.web import WhatsminerWebHandler


class WhatsminerSimulator:
    def __init__(self, backend: MinerSimulatorBackend, hr_unit: HashUnit = HashUnit.MH):
        self.backend = backend
        self.rpc = WhatsminerRPCHandler(backend, hr_unit)
        self.web = WhatsminerWebHandler(backend, hr_unit)

    def run(self):
        log.startup(
            f"creating {self.backend.miner_info.make} {self.backend.miner_info.model}"
        )
        log.startup("startup complete")

        async def _run():
            await asyncio.gather(self.rpc.run(), self.web.run())

        asyncio.run(_run())
