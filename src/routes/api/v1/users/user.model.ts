import { Expose, plainToClass } from "class-transformer";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { Entity, Column, DeepPartial } from "typeorm";
import { BaseModel } from "../../../../shared/base/model";
import { ModelObject } from "../../../../utils/types";

@Entity('user')
export class UserModel extends BaseModel {

    static New(data:DeepPartial<UserModel>|DeepPartial<UserModel>[]){
        return plainToClass(UserModel,data,{excludeExtraneousValues:true})
    }

    @Column({name:"user_name"})
    @IsString()
    @Expose()
    userName:string;

    @Column({name:"password"})
    @IsString()
    @Expose()
    password:string;

    @Column({name:"is_active",default:1,type:"enum",enum:[1,0]})
    @IsEnum([1,0])
    @Expose()
    @IsOptional()
    isActive?:1|0;


    sanitize(){
        delete this.id;
        delete this.password;
        return this
    }

    insertSanitize(){
        delete this.id;
        delete this.uuid;
        delete this.createdAt;
        this.cleanBodyParams()
        return this
    }

    updateSanitize(){
        delete this.id;
        delete this.uuid;
        return this;
    }

}


