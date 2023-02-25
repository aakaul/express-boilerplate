import { IResLocals } from "../shared/interface/resLocals.interface";

declare namespace Express {
	export interface Request {
		query:{[key:string]:any}
	}

	export interface Response {
		locals:IResLocals
	}
}
