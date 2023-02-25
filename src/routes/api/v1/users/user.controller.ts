import { Service } from "typedi";
import { UserService } from "./user.service";
import { UserSaveDTO } from "./dto/save.dto";
import {  Get, JsonController, Post,Body,Put, Param,Patch, Delete, Authorized } from "routing-controllers";
import { PutUpdateDTO } from "./dto/putUpdate.dto";
import { PatchUpdateDTO } from "./dto/patchUpdate.dto";
import { SignInDto } from "./dto/signIn.dto";

@JsonController("/v1/user")
@Service()
export class UserController {
    constructor(
        private userService:UserService
    ){}

    @Get()
    @Authorized(["youCanUseRolesHereInAuthMiddleware"])
    async getAll(){
        return this.userService.getAll();
    }


    @Get("/:uuid")
    @Authorized(["youCanUseRolesHereInAuthMiddleware"])
    async get(
        @Param("uuid") uuid:string
    ){
        return this.userService.get(uuid);
    }

    @Post()
    async save(
        @Body({ validate: true }) user: UserSaveDTO
    ){
        console.log("c")
        return this.userService.save(user)
    }

    @Post("/signIn")
    async signIn(
        @Body({ validate: true }) user: SignInDto
    ){
        return this.userService.signIn(user)
    }


    @Put('/:uuid')
    @Authorized(["youCanUseRolesHereInAuthMiddleware"])
    async update(
        @Body({ validate: true }) user: PutUpdateDTO,
        @Param("uuid") uuid:string
    ){
        return this.userService.update(user,uuid)
    }

    @Patch('/:uuid')
    @Authorized(["youCanUseRolesHereInAuthMiddleware"])
    async partialUpdate(
        @Body({ validate: true }) user: PatchUpdateDTO,
        @Param("uuid") uuid:string
    ){
        return this.userService.update(user,uuid)
    }


    @Delete("/:uuid")
    @Authorized(["youCanUseRolesHereInAuthMiddleware"])
    async delete(
        @Param("uuid") uuid:string
    ){
        return this.userService.delete(uuid);
    }

    
}