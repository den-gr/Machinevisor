// @ts-nocheck

import { GenericService } from "./genericService";
import { ILog, Log } from "../models/log_schema";

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
}