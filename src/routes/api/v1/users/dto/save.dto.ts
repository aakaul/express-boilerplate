import { Exclude, Expose } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsAlphanumeric, IsEnum } from "class-validator";
import { BaseDto } from "../../../../../shared/base/dto";


/**
 * @swagger
 * definitions:
 *   UserSaveRequest:
 *     type: object
 *     properties:
 *       userName:
 *         type: string
 *       status:
 *         type: string
 *
*/
@Exclude()
export class UserSaveDTO extends BaseDto{

    constructor(){
        super();
    }

    @Expose()
    @IsNotEmpty()
    @IsAlphanumeric()
    userName:string;

    @IsString()
    @Expose()
    @IsNotEmpty()
    password:string;

    @IsEnum([1,0])
    @Expose()
    @IsOptional()
    isActive?:1|0;
    
}
