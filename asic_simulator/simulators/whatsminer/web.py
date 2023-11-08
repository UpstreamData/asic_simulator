import os

import hypercorn
from fastapi import FastAPI, APIRouter
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from fastapi.responses import FileResponse
from hypercorn.asyncio import serve

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

        cfg = hypercorn.Config()
        cfg.bind = "0.0.0.0:443"
        cfg.insecure_bind = "0.0.0.0:80"
        cfg.keyfile = SSL_PRIVATE_KEY
        cfg.certfile = SSL_PUBLIC_KEY
        cfg.loglevel = "ERROR"

        await serve(app, cfg)


if __name__ == "__main__":
    server = WhatsminerWebHandler()
    server.run()
