from asic_simulator.simulators import MINER_SIMULATORS

if __name__ == "__main__":
    sim = MINER_SIMULATORS["antminer"]["stock"]["S19j"]
    # sim = MINER_SIMULATORS["whatsminer"]["stock"]["M30SVG10"]

    sim.run()
