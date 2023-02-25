import { ValidationError, validate, IsString, IsNotEmpty, IsOptional } from "class-validator";
import { BadRequestError } from "../../../../exceptions";
import {Request} from "express"
import { ModelObject } from "../../../../src/utils/types";
import { TemplateModel } from "../template.model";
import { plainToClass } from "class-transformer";
import { BaseDto } from "../../../../src/shared/base/dto";

export class TemplateDTO extends BaseDto{

    constructor(){
        super();
    }

    static New( newInstanceCreate:ModelObject<TemplateModel>){
       return plainToClass(this,newInstanceCreate)
    }

    @IsString()
    @IsNotEmpty()
    userName:string;

    @IsOptional()
    status:string;
}
