import { Server, ServerOptions } from 'socket.io';
import {Server as HttpServer} from "http";
import { WebsocketController } from './controllers';

export class WebsocketServer{
    private websocketServer: Server;
    private sessionsControllers = new Map<string, WebsocketController>();

    constructor(httpServer: HttpServer, opts?: Partial<ServerOptions>){
        this.websocketServer = new Server(httpServer, opts);
        //start listenening
        this.websocketServer.on('connection', (socket) => {
            //create a new controller for every new connection
            const sessionController = new WebsocketController(socket, this.websocketServer);
            //store the controller in the map
            this.sessionsControllers.set(socket.id, sessionController);

            socket.on('disconnect', () => {
                console.log('user disconnected');
                //remove the controller from the map
                this.sessionsControllers.delete(socket.id);
            });
        });
    }
}