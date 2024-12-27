import { Server, Socket } from "socket.io";

export class WebsocketController{
    private socket: Socket;
    private websocketServer: Server;

    constructor(socket: Socket, server: Server){
        this.socket = socket;
        this.websocketServer = server;
        this.startListenOnEvents();
        console.log("WebsocketController created for socket id: ", socket.id);
    }

    startListenOnEvents(){
        this.socket.on('update-contact', async (data: any) => {
            //send the updated contact to all clients
            this.websocketServer.emit('contact-update', data);
        });
    }

    sendMessage(message: string){
        this.socket.emit('message', message);
    }
}