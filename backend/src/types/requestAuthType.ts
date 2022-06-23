import { Request } from "express"

declare module "express" { 
  export interface RequestAuth extends Request {
    headers: {
        authorization?: string
    }
  }
}