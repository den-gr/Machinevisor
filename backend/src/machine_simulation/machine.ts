
import { io, Socket, connect, SocketOptions, ManagerOptions } from "socket.io-client";
// CommonJS

enum Modality{
    wow
}



export class MachineSimulation{
    private socket: Socket;
    private static OPTIONS: Partial<SocketOptions & ManagerOptions> = { 
        rejectUnauthorized : false,
        transports: ["websocket"],
        path: "/socket.io"
    }


    constructor(serverURL: string){
        this.socket = io(serverURL,  MachineSimulation.OPTIONS);

        console.log("constructor ciao")
        this.socket.on("error", (error) => {
            console.error(error);
        });
        this.socket.on("connect", () => {
            console.log("Connected"); 
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected"); // undefined
        });

        this.socket.on('pingpong', (msg) => {
            console.log("receive:", msg )
            this.socket.emit("pingpong","machine pong")
        })
    }
}