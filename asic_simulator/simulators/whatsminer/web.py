import os
import socket

import hypercorn
from fastapi import FastAPI, APIRouter
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from fastapi.responses import FileResponse
from hypercorn.asyncio import serve

from asic_simulator import log
from asic_simulator.backend import MinerSimulatorBackend, HashUnit
from asic_simulator.settings import SSL_PUBLIC_KEY, SSL_PRIVATE_KEY


class WhatsminerWebHandler:
    def __init__(self, backend: MinerSimulatorBackend = None, hr_unit: HashUnit = None):
        self.web_dir = os.path.join(os.path.dirname(__file__), "web_files")
        self.router = APIRouter()
        self.router.add_api_route(
            "/", lambda: FileResponse(os.path.join(self.web_dir, "index.html"))
        )
        self.router.add_api_route("/cgi-bin/{path}", self.html_pages)
        self.router.add_api_route("/luci-static/{path:path}", self.luci_static)

    def html_pages(self, path: str):
        return FileResponse(os.path.join(self.web_dir, path + ".html"))

    def luci_static(self, path: str):
        return FileResponse(
            os.path.join(self.web_dir, "luci-static", *os.path.split(path))
        )

    async def run(self):
        app = FastAPI()
        app.add_middleware(HTTPSRedirectMiddleware)
        app.include_router(self.router)

        host = os.getenv("ASIC_WEB_HOST", "0.0.0.0")
        http_port = int(os.getenv("ASIC_WEB_PORT", "80"))
        https_port = int(os.getenv("ASIC_WEB_TLS_PORT", "443"))

        def _reserve(target_host: str, target_port: int):
            try:
                with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                    sock.bind((target_host, target_port))
                    sock.listen(1)
                    return sock.getsockname()[:2]
            except OSError as exc:
                log.failure("WEB", f"bind {target_host}:{target_port} failed ({exc})")
                return None

        http_target = _reserve(host, http_port)
        https_target = _reserve(host, https_port)
        if not http_target or not https_target:
            log.failure("WEB", "web UI disabled in this environment")
            return

        http_host, http_bind_port = http_target
        https_host, https_bind_port = https_target

        cfg = hypercorn.Config()
        cfg.bind = [f"{https_host}:{https_bind_port}"]
        cfg.insecure_bind = [f"{http_host}:{http_bind_port}"]
        cfg.keyfile = SSL_PRIVATE_KEY
        cfg.certfile = SSL_PUBLIC_KEY
        cfg.loglevel = "ERROR"

        try:
            await serve(app, cfg)
        except Exception as exc:
            log.failure("WEB", f"web UI failed to start ({exc}); web UI disabled")


if __name__ == "__main__":
    server = WhatsminerWebHandler()
    server.run()
