export interface MachineChart{
    type: string;
    values: ChartEntry[]
}

export interface ChartEntry{
    value: number;
    date: string;
}