export interface Log {
    allarm: string[],
    machine_id: number,
    state: string,
    modality: string,
    timestamp: string,
    temperature: number,
    kWatt: number,
    working_time: number
}