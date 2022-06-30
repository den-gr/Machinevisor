import { MachineSimulation } from "./machine";
import { Modality } from "../utils/utils";

const HOST = "https://localhost:8080";

let id = 1;
let machineModalitiesType_1: Modality[] = [Modality.SLEEP_MODE, Modality.PRODUCTION_MODE, Modality.ENERGY_ECONOMY_PRODUCTION_MODE]

const mach: MachineSimulation = new MachineSimulation(HOST, id, machineModalitiesType_1);
// const mach2: MachineSimulation = new MachineSimulation("https://localhost:8080", 2);