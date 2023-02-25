import { plainToClass } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { BaseModel } from "../../../src/shared/base/model";
import { ModelObject } from "../../../src/utils/types";

export class TemplateModel extends BaseModel{
    constructor(){
        super();
    }

    static TableName = "template"

    @IsNumber()
    id:number;

    @IsString()
    status:string;

    @IsString()
    userName:string;

    public static readonly dbClassMapper = {
        status:'status',
        user_name:"userName",
        id:"id"
    };

    public static calssDbMapper: any = BaseModel.classDbMapperBase(TemplateModel.dbClassMapper);

    public static convertDbToClass(data: ModelObject<TemplateModel>|ModelObject<TemplateModel>[]) {

        if (!Array.isArray(data)) {
            data = [data]
        }
        const result = []
        for (let i = 0; i < data.length; i++) {
            const el = data[i];
            const newItem = this.convertDbToClassBase(data, TemplateModel.dbClassMapper);
            result.push(plainToClass(TemplateModel, newItem));
        }
        return result;
        
    }

    sanitize(){
        delete this.id;
        return this
    }

    public static convertClassToDb(data: any) {
        return this.convertClassToDbBase(data, TemplateModel.dbClassMapper);
    }
    
}