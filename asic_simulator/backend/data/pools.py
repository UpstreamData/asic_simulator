from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class PoolInfo:
    url: str = "stratum.pool.io"
    port: int = 3333
    user: str = "pool_username.real_worker"
    pwd: str = "123"
    full_url: str = field(init=False)
    active: bool = field(init=False)

    @property
    def full_url(self):
        if not self.url == "":
            return f"stratum+tcp://{self.url}:{self.port}"
        return ""

    @full_url.setter
    def full_url(self, _):
        pass

    @property
    def active(self):
        return not any([self.url == "", self.user == ""])

    @active.setter
    def active(self, _):
        pass
