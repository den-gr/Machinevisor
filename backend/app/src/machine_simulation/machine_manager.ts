import { MachineSimulation } from "./machine";
import { Modality } from "../utils/utils";

const HOST = "https://localhost:8080";

let machineModalitiesType_1: Modality[] = [Modality.SLEEP_MODE, Modality.PRODUCTION_MODE, Modality.ENERGY_ECONOMY_PRODUCTION_MODE]
let machineModalitiesType_2: Modality[] = [Modality.SLEEP_MODE, Modality.PRODUCTION_MODE]

new MachineSimulation(HOST, 1, machineModalitiesType_2, true);
new MachineSimulation(HOST, 2, machineModalitiesType_1, false);
new MachineSimulation(HOST, 3, machineModalitiesType_1, false);
new MachineSimulation(HOST, 4, machineModalitiesType_1, false);
new MachineSimulation(HOST, 5, machineModalitiesType_1, false);