import { GenericService } from "./genericService";
import { Log } from "../models/log_schema";

export class OverviewService extends GenericService{
    public getMainOverviewValues(): Promise<any>{
        let query = [
            {$match: {timestamp:  {$gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 12)}}}, //ISODate().getTime()
            {$project: {
                y:{$year:"$timestamp"},
                m:{$month:"$timestamp"},
                d:{$dayOfMonth:"$timestamp"},
                h:{$hour:"$timestamp"},
                minute: {$minute: "$timestamp"},
                machine_id: 1,
                kWatt: 1,  
                allarm: 1 
            }},
            {$group:{ 
                _id:  {machine_id: "$machine_id", 
                    year:"$y",
                    month:"$m",
                    day:"$d",
                    hour:"$h"},
                allarms: { $sum: {$cond: [ { "$ifNull": ["$allarm", false] }, 1, 0 ]}},
                kWatt: {$avg: "$kWatt"},
                msgsForMinute: {$count: {}}
            }},
            {$group:{ 
                _id: null,
                allarms: {$sum: {$cond: [ { "$gt": ["$allarms", 0]}, 1, 0 ]}},
                kWattAvg: {$avg: "$kWatt"},
                msgsForMinute: {$sum: "$msgsForMinute"}
            }},
            {$project: {_id: 0,
                        kWattAvg: {$round: [{$multiply: ["$kWattAvg", 5]},2]},
                        msgsForMinute: {$round: [{$divide: ["$msgsForMinute", 12 * 60]}, 2]},
                        allarms: {$toInt: "$allarms"}
            }}
        ]
        return new Promise((resolve, reject) => {
            if(!this.isConnected()) reject(this.getErrorDBNotConnected());
            Log.aggregate(query).then(ris =>{
                resolve(ris)
            })
        }) 
    }   
}