import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';
import { Service } from 'typedi';

@Interceptor()
@Service()
export class NameCorrectionInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {  
    return {
      data:content
    };
  }
}