import { createParamDecorator } from 'routing-controllers';

export function ResLocals() {
  return createParamDecorator({
    value: action => {
      return action.response.locals
    },
  });
}

