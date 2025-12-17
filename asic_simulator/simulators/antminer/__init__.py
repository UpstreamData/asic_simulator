import asyncio
import signal

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
            stop_event = asyncio.Event()
            loop = asyncio.get_running_loop()
            for sig in (signal.SIGINT, signal.SIGTERM):
                try:
                    loop.add_signal_handler(sig, stop_event.set)
                except NotImplementedError:
                    # Signals are not supported on some platforms/event loops.
                    pass

            tasks = [
                asyncio.create_task(self.rpc.run(), name="antminer-rpc"),
                asyncio.create_task(self.web.run(), name="antminer-web"),
            ]
            stop_task = asyncio.create_task(stop_event.wait(), name="antminer-stop")
            done, pending = await asyncio.wait(
                [*tasks, stop_task], return_when=asyncio.FIRST_COMPLETED
            )
            if stop_task in done:
                log.startup("shutdown requested")
            for task in tasks:
                if not task.done():
                    task.cancel()
            if not stop_task.done():
                stop_task.cancel()
            await asyncio.gather(*tasks, return_exceptions=True)

        asyncio.run(_run())
