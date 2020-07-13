import {
    NextFunction,
    Response,
    Request
} from 'express';

export function auth(req:Request,res:Response,next:NextFunction){
    if(req.session && req.session.loggedIn){
        return next();
    };
    return res.status(401).redirect('/auth/login')
}