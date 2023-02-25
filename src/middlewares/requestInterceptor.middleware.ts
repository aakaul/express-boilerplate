import { Middleware, ExpressMiddlewareInterface, BadRequestError } from 'routing-controllers';
import { Service } from 'typedi';
import { customErrorHandler } from './ErrorMiddleware/error.middleware1';

@Middleware({ type: 'before',priority: 1 })
@Service()
export class RequestInterceptor implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): void {
    try {
      if(request?.body){
        if(request?.body?.data){
          request.body = request.body.data;
        }else{
          throw new BadRequestError("Invalid Request Body, Please Wrap Body in Data Key")
        }
      }
      next();
    } catch (error) {
      customErrorHandler(error, request, response, next);
    }
  }
}