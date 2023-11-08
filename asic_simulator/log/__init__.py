import logging

try:
    import colorama
    from rich.logging import RichHandler, Console

    COLOR = True
    logging.basicConfig(
        level=logging.INFO,
        format="%(message)s",
        handlers=[
            RichHandler(
                show_time=False,
                show_level=False,
                show_path=False,
                markup=True,
                console=Console(color_system="windows"),
            )
        ],
    )
except ImportError:
    COLOR = False
    logging.basicConfig(level=logging.INFO, format="%(message)s")


def success(fn_type: str, message: str):
    if COLOR:
        logging.info(
            f"[[bold white]MinerSimulator[/]][[bold green]{fn_type} - ✓[/]]: [italic blue]{message}[/]"
        )
    else:
        logging.info(f"[MinerSimulator][{fn_type} - ✓]: {message}")


def failure(fn_type: str, message: str):
    if COLOR:
        logging.info(
            f"[[bold white]MinerSimulator[/]][[bold red]{fn_type} - ✗[/]]: [italic blue]{message}[/]"
        )
    else:
        logging.info(f"[MinerSimulator][{fn_type} - ✗]: {message}")


def startup(message: str):
    if COLOR:
        logging.info(
            f"[[bold white]MinerSimulator[/]][[bold yellow]STARTUP[/]]: [italic blue]{message}[/]"
        )
    else:
        logging.info(f"[MinerSimulator][STARTUP]: {message}")
