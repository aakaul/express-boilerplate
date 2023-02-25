import { Exclude, Expose } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsAlphanumeric, IsEnum } from "class-validator";
import { UserSaveDTO } from "./save.dto";


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
export class PatchUpdateDTO {

    constructor(){}

    @IsString()
    @Expose()
    uuid:string;

    @Expose()
    @IsOptional()
    @IsAlphanumeric()
    userName?:string;

    @IsString()
    @Expose()
    @IsOptional()
    password?:string;

    @IsEnum([1,0])
    @Expose()
    @IsOptional()
    isActive?:1|0;
}
