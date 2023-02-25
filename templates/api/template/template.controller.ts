import { Service } from "typedi";
import { ReqTryCatch } from "../../../shared/decorator/reqTryCatch";
import { Request, Response} from "express";
import { TemplateService } from "./template.service";
import { TemplateDTO } from "./dto/template.dto";
import { plainToClass } from "class-transformer";
import { TemplateModel } from "./template.model";
import { ModelObject } from "../../../src/utils/types";

@Service()
export class TemplateController {
    constructor(
        private templateService:TemplateService
    ){}

    @ReqTryCatch()
    async getAll(req:Request,res:Response){
        return this.templateService.getAll();
    }

    @ReqTryCatch()
    async get(req:Request,res:Response) {
        const id = req.params.id;
        return this.templateService.get(Number(id))
    }

    @ReqTryCatch()
    async save(req:Request,res:Response) {
        const data =  TemplateDTO.New({...req.body})
        if(data.isValid()){
            const transformedData = plainToClass(TemplateModel,data)
            return this.templateService.save(transformedData);
        } 
    }

    @ReqTryCatch()
    async update(req:Request,res:Response) {
        const id = req.params.id;
        const body = req.body as ModelObject<TemplateModel>
        const transformedData = plainToClass(TemplateModel,body)
        return this.templateService.update(transformedData,Number(id));
    }

    @ReqTryCatch()
    async patch(req:Request,res:Response) {
        const id = req.params.id;
        const body = req.body as ModelObject<Partial<TemplateModel>>
        const transformedData = plainToClass(TemplateModel,body)
        return this.templateService.patchUpdate(transformedData,Number(id));
    }

    @ReqTryCatch()
    async delete(req:Request,res:Response) {
        const id = req.params.id;
        return this.templateService.delete(Number(id))
    }
}