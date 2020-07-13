import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods,MetaDataKeys } from './enums';
import { RequestHandler, NextFunction, Response, Request } from 'express';


function bodyValidator(keys:string[]):RequestHandler {
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!req.body)
            return res.status(422).send('Invalid Request')
        
        return keys.every(x=>req.body[x])?
        next():
        res.status(422).send('Invalid Request');
    }
}


export function controller(routePrefix:string) {
    return (target:Function)=>{
        const router = AppRouter.getInstance;
        for (const key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path:string = Reflect.getMetadata(MetaDataKeys.path,target.prototype,key);
            const method:Methods= Reflect.getMetadata(MetaDataKeys.method,target.prototype,key);
            const middlewares= Reflect.getMetadata(MetaDataKeys.middleware,target.prototype,key)||[];
            const bodyValidators= Reflect.getMetadata(MetaDataKeys.bodyValidator,target.prototype,key)||[];
            const validator= bodyValidator(bodyValidators)
            if (path && method) {
                router[method](routePrefix+path,[...middlewares,validator] ,routeHandler)
            }
        }
    }
}