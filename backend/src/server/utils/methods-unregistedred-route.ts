import { HttpMethods } from "../interfaces";
import { RouterProcessor } from "./routers-processor";

export const AddMethodToUnregisteredRoutes = (method: HttpMethods, path: string, target: Object, descriptor: PropertyDescriptor, middleWare: any) => {
    //get the current handler
    const handler = descriptor.value;
    //get the controller
    const controllerConstructor = target.constructor;
    //get the router processor instance
    const routerProcessor = RouterProcessor.getInstance();
    //add the route to the unregistered routes
    routerProcessor.addToUnregsiteredRoutes(method, path, handler, controllerConstructor, middleWare);
};