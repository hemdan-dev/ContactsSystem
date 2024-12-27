import { MetaData } from "../interfaces";
import "reflect-metadata";

export const Controller = (param: string) => {
    return function (target: Function) {
        //set the controller in the reflector metadata
        Reflect.defineMetadata(MetaData.controllerPath, param, target);
    }
}