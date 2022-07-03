import { ChartConfiguration, ChartType } from "chart.js";

export interface MachineChart{
    type: string;
    values: ChartEntry[]
}

export interface ChartEntry{
    value: number;
    label: string;
}

export interface ChartTemplate{
    chartType: ChartType;
    options: ChartConfiguration["options"];
    data: ChartConfiguration['data'];
}

export interface ChartDefaultValues{
    temperatures: number[];
    kWatts: number[],
    dates: string[]
}

