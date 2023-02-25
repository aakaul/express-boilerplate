import { HttpError, InternalServerError } from "routing-controllers";

export const TryCatch = (errorType?: any, handler?: HandlerFunction) => {
    return (target: Object, propertyKey: String, descriptor: any) => {
      const temp =  descriptor.value;
  
      descriptor.value = function (...args:[]){
        try{
          const result = temp.apply(this, args)
  
          if(result && result instanceof Promise){
            return result.catch(error=>_handleError(this, errorType, handler,error));
          }
  
          return result;
        }
        catch(error){
          _handleError(this, errorType, handler, error);
        }
      }
    }
  }
  
  type HandlerFunction = (error: Error, ctx: any) => void;
  
  function _handleError(ctx: any, errorType: any, handler: HandlerFunction, error: Error) {
    // Check if error is instance of given error type
    if (error instanceof HttpError) {
      throw error
    } else {
      if (typeof handler === 'function' && error instanceof errorType) {
        handler.call(null, error, ctx);
      } else {
        throw new InternalServerError("Something Went Wrong")
      }
    }
  }