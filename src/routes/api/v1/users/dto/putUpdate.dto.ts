import { Exclude, Expose } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
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
export class PutUpdateDTO extends UserSaveDTO{

    constructor(){
        super()
    }

    @IsString()
    @Expose()
    uuid:string;
}
