import { Router } from "express";
import { HttpMethods, MetaData } from "../interfaces";

export class RouterProcessor {
    private static instance: RouterProcessor;
    private router: Router;
    private unregisteredRoutes: Array<{
        method: HttpMethods;
        path: string;
        handler: any;
        controllerConstructor: Function;
        middleWare: any;
    }> = [];

    private constructor() {
        this.router = Router();
    }

    public addToUnregsiteredRoutes(
        method: HttpMethods,
        path: string,
        handler: any,
        controllerConstructor: Function,
        middleWare: any
    ): void {
        this.unregisteredRoutes.push({ method, path, handler, controllerConstructor, middleWare });
    }

    public registerRoutes(): void {
        this.unregisteredRoutes.forEach((route) => {
            const { method, path, handler, controllerConstructor, middleWare } = route;
            //get the class from refelctor metadata
            const controllerBasePath = Reflect.getMetadata(MetaData.controllerPath, controllerConstructor);
            //create the full path from the controller path and the method path
            let routePath = "";
            if (controllerBasePath) routePath += `/${controllerBasePath}`;
            routePath += `/${path}`;
            //define the list of handlers
            const handlers = [handler];
            //check if we have a middleware or not to add it to the first of the handlers
            if (middleWare) handlers.unshift(middleWare);
            //create the route
            this.router[method](routePath, handlers);
        });
    }

    getRouter(): Router {
        return this.router;
    }

    static getInstance(): RouterProcessor {
        if (!this.instance) {
            this.instance = new RouterProcessor();
        }
        return this.instance;
    }
}