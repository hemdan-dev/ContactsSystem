import dotenv from 'dotenv';
import { Server } from './server/server';
import "reflect-metadata";
dotenv.config();

(async () => {
    //create a new instance of the server
    const server: Server = new Server();
    //listen on the server
    await server.listen();
})();