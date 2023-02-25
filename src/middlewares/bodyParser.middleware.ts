import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import { Service } from 'typedi';

@Middleware({
    type: 'before',
    priority: 100
})
@Service()
export class BodyParser implements ExpressMiddlewareInterface {

    private jsonBodyParser;

    constructor() {
        this.jsonBodyParser = bodyParser.json();
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.jsonBodyParser(req, res, next);
    }
}