// @ts-nocheck

import { GenericService } from "./genericService";
import { Log } from "../models/log_schema";

export class ChartService extends GenericService{
    
    public getMachineCharts(machine_id: number, values: string[]): Promise<any[]>{
        return new Promise((resolve, reject) => {
            if(!this.isConnected()) reject(this.getErrorDBNotConnected());
            let gr: {[k: string]: any} = {}
            gr['_id'] = "$machine_id";
            values.forEach(e => gr[e] = {"$push": {value: ("$" + e), label: "$timestamp"}})
            let query = [
                {$match: {machine_id: machine_id}},
                {$sort: {timestamp: -1}},
                {$limit: 30},
                {$sort: {timestamp: 1}},
                {$group: gr},
                {$project: {_id: 0}}
            ]
            Log.aggregate(query).then(ris =>{
                resolve(ris)
            })
        })
    }

    public getMachinesAvgValues(): Promise<any> {
        let query = [
            {$project: {
                y:{$year:"$timestamp"},
                m:{$month:"$timestamp"},
                d:{$dayOfMonth:"$timestamp"},
                h:{$hour:"$timestamp"},
                temperature: 1,
                kWatt:1,
                timestamp: 1
            }},
            {$group:{ 
                _id:  {year:"$y",month:"$m",day:"$d",hour:"$h"},
                temperature: {$avg: "$temperature"},
                kWatt: { $avg: "$kWatt"},
                date: {$first: "$timestamp"}
            }},
            {$sort: {label: 1}},
            {$group: {
                _id: null,
                temperatures: {$push: "$temperature"},
                kWatts: {$push: "$kWatt"},
                dates: {$push: "$date"}
                
            }},
            {$project: {_id: 0, temperatures: 1, dates: 1, kWatts: 1}}
        ]

        return new Promise((resolve, reject) => {
            if(!this.isConnected()) reject(this.getErrorDBNotConnected());
            Log.aggregate(query).then(ris =>{
                resolve(ris)
            })
        })
        
    }


    
}