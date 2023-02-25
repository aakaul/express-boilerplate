import jwt from "jsonwebtoken";
import config from "../../config/auth.config";

export class Token {
    constructor(public token?: string) { }

    verifyToken(token: string) {
        return (jwt.verify(token, config.secret) as any);
    }

    isValid() {
        return this.verifyToken(this.token);
    }

    registerToken(payload: {[key:string]:any}) {
        this.token = jwt.sign(
            payload,
            config.secret,
            this.getTokenSigningOptions(),
        );
        return this.token;
    }


    private getTokenSigningOptions(exp?: string | number): jwt.SignOptions {
		return { expiresIn: exp || config.tokenExpiry };
	}
}
