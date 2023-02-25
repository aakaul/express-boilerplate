import { Service } from "typedi";
import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from "routing-controllers";
import { UserSaveDTO } from "./dto/save.dto";
import { UserModel } from "./user.model";
import { UserRepository } from "./user.repository";
import { Hash } from "../../../../utils/Hash";
import { SignInDto } from "./dto/signIn.dto";
import { Token } from "../../../../shared/token/Token";
import { PatchUpdateDTO } from "./dto/patchUpdate.dto";
import { PutUpdateDTO } from "./dto/putUpdate.dto";

@Service()
export class UserService{
    constructor(
        protected repository:UserRepository
    ){}

    async getAll(){
        return this.repository.getAll({})
    }

    async get(uuid:string){
        const result = await this.repository.getOne({uuid})
        return result.sanitize()
    }

    async save(data:UserSaveDTO){
        const userData = UserModel.New(data).insertSanitize();
        // userData.isValid();
        userData.password = await Hash.bcryptHash(userData.password)
        const result = await this.repository.save(userData);
        result.forEach(x=>x.sanitize())
        return result;
    }

    async update(data:UserUpdateDTO,uuid:string){
        const userData = UserModel.New(data);
        // userData.isValid();

        const dataCount = await this.repository.getOne({uuid},["id"]);
        if(!dataCount.id){
            throw new NotFoundError("Could not Get Data for this id")
        }
        userData.updateSanitize();
        if(data?.password){
            data.password = await Hash.bcryptHash(data.password)
        }
        const updateResult = await this.repository.update(userData,{uuid})
        if(updateResult.affected){
            return this.get(uuid)
        }
        
        throw new InternalServerError("Could not update data")
    }

    async signIn(data:SignInDto) {
        
		const user = await this.repository.getOne({ userName: data.userName });

        if(!user?.id){
            throw new UnauthorizedError("Credentials Mismatch")
        }
        
		const isPassValid = await Hash.compareBcryptHash(data.password,user.password)

		const tokenInstance = new Token()
		if(isPassValid){
			const refreshToken =  tokenInstance.registerToken({
					claims:{
						employeeId:user.id,
					}
			})
			return {
				token:refreshToken
			}
			
		}
        
		throw new UnauthorizedError("Credentials mismatch")
		
	}

  
    async delete(uuid:string){
        await this.repository.softDelete(uuid)
        const deletedData = await this.repository.getOne({uuid},null,true);
        return deletedData[0].sanitize()
    }   


}

type UserUpdateDTO = PutUpdateDTO | PatchUpdateDTO;