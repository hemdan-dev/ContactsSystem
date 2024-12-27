import { HttpMethods } from "../../interfaces";
import { AddMethodToUnregisteredRoutes } from "../../utils";

export const Delete = (path: string, middleWare: any = undefined) => {
    return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        //add the method to the unregistered routes
        AddMethodToUnregisteredRoutes(HttpMethods.DELETE, path, target, descriptor, middleWare);
    };
}