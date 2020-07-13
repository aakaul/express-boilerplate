import 'reflect-metadata';
import { Methods,MetaDataKeys } from './enums';

function routeBinder(method:string) {
    return function (path:string) {
        return (target:any,key:string,desc:PropertyDescriptor)=>{
            Reflect.defineMetadata(MetaDataKeys.path,path,target,key)
            Reflect.defineMetadata(MetaDataKeys.method,method,target,key)
        }
    }
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const put = routeBinder(Methods.put);
export const patch = routeBinder(Methods.patch);