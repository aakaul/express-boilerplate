import { Action } from "routing-controllers";
import { Service } from "typedi";
import { IResLocals } from "../shared/interface/resLocals.interface";
import { Token } from "../shared/token/Token";

@Service()
export class AuthMiddleware{

    constructor(){}

    async authorizedChecker(action:Action,roles:string[]){
        const authorizationHeader = action.request.headers['authorization'];
        if (!authorizationHeader) {
            return false;            
        }
        const tokenString = this.extractTokenFromHeader(authorizationHeader);
        const token = new Token(tokenString);
        const payload  = token.isValid()
        console.log(payload)
        if(payload){
            action.response.locals = payload as IResLocals;
        }else{
            return false;
        }
        return true;
    }


    
    extractTokenFromHeader(authHeader:string){
        if (authHeader) {
			const parts = authHeader.split(" ");
            if (parts.length == 2) {
                const scheme = parts[0];
                const token = parts[1];
                if (/^Bearer$/i.test(scheme)) {
                    return token;
                }
            }
		}
		return null;
    }
}
