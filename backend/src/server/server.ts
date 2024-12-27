import express, { Express } from 'express';
import { ControllersFinder, DatabaseInitializer, RouterProcessor } from './utils';
import http, { Server as HttpServer} from 'http';
import { WebsocketServer } from '../modules/websocket';
import cors from "cors";

export class Server {
    private app: Express;
    private port: number = +(process.env.PORT ?? 3000);
    private httpServer: HttpServer;
    
    constructor() {
        //create the express app
        this.app = express();
        //create the http server
        this.httpServer = http.createServer(this.app);
        //enable cors
        this.app.use(cors());
        //load the json body parser
        this.app.use(express.json());
        //init the controllers folder to init the controllers decorators
        const findControllers = new ControllersFinder();
        findControllers.searchControllers().forEach((controllerPath) => {
            require(controllerPath);
        });
    }

    initDatabase(){
        return DatabaseInitializer.initDatabase();
    }
    
    async listen() {
        //init the database
        await this.initDatabase();
        //get the router processor instance
        const routerProcessor = RouterProcessor.getInstance();
        //register the routes
        routerProcessor.registerRoutes();
        //start the router
        this.app.use(routerProcessor.getRouter());
        //add health check
        this.app.get('/health', (req, res) => {
            res.status(200).json({ running: true });
        });
        //create the socket.io server
        new WebsocketServer(this.httpServer, { cors: { origin: "*" } });
        //start the server
        this.httpServer.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}