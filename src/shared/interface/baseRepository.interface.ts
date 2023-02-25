import { DeepPartial, FindConditions, ObjectLiteral, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IRepository<T>{
    getAll(data:  FindConditions<T>[] | FindConditions<T> | ObjectLiteral, withDeletedAt?:boolean):Promise<T[]>;

    get(data: FindConditions<T>|FindConditions<T>[],select?:(keyof T)[] , withDeletedAt?:boolean):Promise<T[]>;

	getOne(data: FindConditions<T>,select?: (keyof T)[],  withDeletedAt?:boolean):Promise<T>

    
    save(data: DeepPartial<T> | DeepPartial<T>[]): Promise<(DeepPartial<T> & T)[]>

    update(data: QueryDeepPartialEntity<T>, cond: FindConditions<T>): Promise<UpdateResult>

    softDelete(uuid: string|string[]): Promise<UpdateResult>
}


