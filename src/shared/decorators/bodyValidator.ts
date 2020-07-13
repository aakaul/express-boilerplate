import 'reflect-metadata';
import {MetaDataKeys} from './enums';


export function bodyValidator(...keys:string[]){
    return (target:any,key:string,desc:PropertyDescriptor)=>{
        Reflect.defineMetadata(MetaDataKeys.bodyValidator,keys,target,key)
    }
}