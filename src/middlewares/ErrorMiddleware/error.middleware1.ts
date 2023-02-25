import { ExpressErrorMiddlewareInterface, Middleware,HttpError } from "routing-controllers";
import { Request,Response,NextFunction } from "express";
import { Service } from "typedi";
import config from "config"
import {ValidationError} from "class-validator"

// if  you want to use custom error change the file name to error.middleware.ts and in server.ts set defaultErrorHandler:false
@Service()
@Middleware({ type: "after" })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
	async error(err: any, req: Request, res: Response, next:()=>Promise<any> ) {
		try {
			await next()
			
		} catch (error) {
			customErrorHandler(err, req, res, next)
		}
	}
}


export function customErrorHandler(err, req, res, next) {
    var isProduction = config.get('env') === 'production';

    if (req.method === 'POST') {

        if (res.headersSent) {
            return next(err) 
        }

        const responseObject = {} as any;
        console.error(err);

        if (Array.isArray(err) && err.every((element) => element instanceof ValidationError)) {
            res.status(400);
            responseObject.message = "You have an err in your request's body. Check 'errs' field for more details!";
            responseObject.errors = err;
        } else {
            if (err instanceof HttpError && err.httpCode) {
                res.status(err.httpCode);
            } else {
                res.status(404);
            }

            if (err instanceof Error) {
                const developmentMode: boolean = !isProduction;

                if (err.name && (developmentMode && err.message)) { 
                    responseObject.name = err.name;
                }
                if (err.message) {
                    responseObject.message = err.message;
                }
                if (err.stack && developmentMode) {
                    responseObject.stack = err.stack;
                }
            } else if (typeof err === "string") {
                responseObject.message = err;
            }
        }
        res.json(responseObject);
    } else if (req.method === 'GET') {
        if (err instanceof HttpError && err.httpCode) {
            res.status(err.httpCode);
        } else {
            res.status(404);
        }
        res.json({
            title  : err.message,
            message: err.message,
            status : err.status,
            stack  : isProduction || err.stack
        });
    }
}