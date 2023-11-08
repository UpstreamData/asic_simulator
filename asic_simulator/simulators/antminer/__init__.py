import asyncio

from asic_simulator import log
from asic_simulator.backend import MinerSimulatorBackend, HashUnit
from asic_simulator.simulators.antminer.rpc import AntminerRPCHandler
from asic_simulator.simulators.antminer.web import AntminerWebHandler


class AntminerSimulator:
    def __init__(self, backend: MinerSimulatorBackend, hr_unit: HashUnit = HashUnit.GH):
        self.backend = backend
        self.rpc = AntminerRPCHandler(backend)
        self.web = AntminerWebHandler(backend, hr_unit)

    def run(self):
        log.startup(
            f"creating {self.backend.miner_info.make} {self.backend.miner_info.model}"
        )
        log.startup("startup complete")

        async def _run():
            await asyncio.gather(self.rpc.run(), self.web.run())

        asyncio.run(_run())
