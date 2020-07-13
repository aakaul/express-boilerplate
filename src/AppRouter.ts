import {Router} from 'express';

export class AppRouter{
    private static instance:Router;
    
    static get getInstance():Router{
        if (!AppRouter.instance) {
            AppRouter.instance = Router();
        }
        return AppRouter.instance;
    }
}