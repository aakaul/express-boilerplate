import { OkPacket } from "mysql";
import { Service } from "typedi";
import { InternalServerError } from "../../../exceptions";
import { MysqlRepo } from "../../../shared/base/mysql";
import { ModelObject } from "../../../src/utils/types";
import { TemplateModel } from "./template.model";


@Service()
export class TemplateRepository{
    mysql = new MysqlRepo<TemplateModel>(TemplateModel.TableName)
    constructor(){}

    async save(data:TemplateModel):Promise<number>{
        try {
            const dataInDbJson = TemplateModel.convertClassToDb(data)
            const res:OkPacket =  await this.mysql.insert().set(dataInDbJson).execute();
            return res.insertId||null;
        } catch (error) {
            throw new InternalServerError("could save template");
        }
    }

    async getAll(){
        try {
            const res =  await this.mysql.select(["*"]).execute<ModelObject<TemplateModel>[]>()
            if(res?.length&&res[0].status){
                return TemplateModel.convertDbToClass(res)
            }
            return null
        } catch (error) {
            throw new InternalServerError("could get all template");
        } 
    }

    async get(id:number):Promise<TemplateModel>{
        const data = await this.mysql.select().where({id}).execute<ModelObject<TemplateModel>>()
        return TemplateModel.convertDbToClass(data)[0]
    }
    
    async delete(id:number):Promise<boolean>{
        const data = await this.mysql.deleteEntry().where({id}).execute()
        return Boolean(data.affectedRows);
    }

    async update(data:{body:TemplateModel,id:number}):Promise<number>{

        const dbData = TemplateModel.convertClassToDb(data.body);

        const res = await  this.mysql
        .update()
        .set(dbData)
        .where({id:data.id})
        .execute();

        return res.affectedRows||null;
    }

    async patch(data:{body:Partial<TemplateModel>,id:number}):Promise<number>{

        const dbData = TemplateModel.convertClassToDb(data.body);

        const res = await  this.mysql
        .update()
        .set(dbData)
        .where({id:data.id})
        .execute();

        return res.affectedRows||null;
    }


}