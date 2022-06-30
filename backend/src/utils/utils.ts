const isNumber = (number: any): boolean  => {
    return !isNaN(+number);
}

const makeErr = (error_name: string, message: string): Object => {
    return {error_name, message};
}
export {makeErr, isNumber }

//Possible machine work modality
export enum Modality{
    SLEEP_MODE,
    ENERGY_ECONOMY_PRODUCTION_MODE,
    PRODUCTION_MODE
}

//Possible machine state 
export enum State{
    OFFLINE,
    OFF,
    ON,
    ALLARM, 
}

//Machine state report
export interface Report{
    machine_id: number;
    state: string;
    modality: string;
    timestamp: Date;
    working_time?: number;
    temperature: number;
    kWatt: number;
}