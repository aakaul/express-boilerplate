import { Service } from "typedi";
import { BadRequestError, InternalServerError, NotFoundError } from "../../../exceptions";
import { TryCatch } from "../../../src/shared/decorator/tryCatch";
import { TemplateModel } from "./template.model";
import { TemplateRepository } from "./template.repository";

@Service()
export class TemplateService{
    constructor(
        private templateRepository:TemplateRepository
    ){}

    @TryCatch()
    async getAll(){
        return this.templateRepository.getAll()
    }

    @TryCatch()
    async save(data:TemplateModel){
        const insertid = await this.templateRepository.save(data)
        if(insertid){
            return this.get(insertid)
        }
        throw new BadRequestError("could not save data");
    }

    @TryCatch()
    async get(id:number){
        if (!id) {
            throw new BadRequestError("Need Id");
        }
        const data = await this.templateRepository.get(id)
        if(!data){
            throw new NotFoundError("template not found");
        }
        return data.sanitize();
    }

    @TryCatch()
    async delete(id:number){
        const data = await this.templateRepository.get(id)
        if(!data.id){
            throw new NotFoundError("template not found");
        }
        await this.templateRepository.delete(id)
        return data
    }

    @TryCatch()
    async update(body:TemplateModel,id:number){
        if(body.isValid()){
            const result = await this.templateRepository.update({body,id});
            if(result){
                return  this.get(id)
            }
            throw new InternalServerError("could not update data");
        }
    }

    @TryCatch()
    async patchUpdate(body:Partial<TemplateModel>,id:number){
        if(body.isValid({skipMissingProperties:true})){
            const result = await this.templateRepository.patch({body,id});
            if(result){
                return this.get(id)
            }
            throw new InternalServerError("could not update data");
        }
    }

}