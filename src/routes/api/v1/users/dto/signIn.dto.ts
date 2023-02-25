import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";


@Exclude()
export class SignInDto {

	@IsString()
	@Expose()
	userName:string;

	@IsString()
	@Expose()
	password:string;
}