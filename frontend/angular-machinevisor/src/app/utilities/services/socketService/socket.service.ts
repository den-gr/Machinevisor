import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;
  isSubscribed = false;

  constructor(private authService: AuthService) {  }

  public getSocket(){
    return this.socket;
  }

  public getIsSubscribed(){
    return this.isSubscribed;
  }

  public disconnect(){
    this.socket.disconnect();
  }

  public unsubscribe(){
    this.isSubscribed = false;
    this.socket.emit("machines/unsubscribe", "")
  }

  public setMachinePeriod(machine_id:any, period:any){
    console.log("cambia periodo");
    this.socket.emit("machines/period", JSON.stringify({machine_id: machine_id, period: period}))
  }

  public getPeriod(machine_id: any){
    this.socket.emit("machines/periodRequest", JSON.stringify({machine_id: machine_id}))
  }

  public connect(){
    let auth = {
      type: "client",
      token: this.authService.getToken()
    }

    this.socket = io(environment.apiUrl, { transports: ["websocket"], auth });
  }

  public subscribe(machine_id:any){
    this.isSubscribed = true;
    console.log("subscribe");
    this.socket.emit("machines/subscribe", JSON.stringify({machine_id: machine_id}))
  }

  public setModality(machine_id:any, mod:any){
    console.log("cambia mode");
    this.socket.emit("machines/modality", JSON.stringify({machine_id: machine_id, modality: mod}))
  }

  public setState(machine_id:any, state:any){
    this.socket.emit("machines/state", JSON.stringify({machine_id: machine_id, state: state}))
  }
}
