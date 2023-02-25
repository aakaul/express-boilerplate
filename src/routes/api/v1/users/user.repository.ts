import { Service } from "typedi";
import {FindManyOptions, getRepository} from "typeorm"
import { BaseRepository } from "../../../../shared/base/repository";
import { ModelObject } from "../../../../utils/types";
import { UserModel } from "./user.model";

@Service()
export class UserRepository  extends BaseRepository<UserModel> {
    protected repo =  getRepository(UserModel)
}


