import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  //ExecutionContext : gelen tum isteklerdir. basitce gelen tum istekler.  all incoming requests
  (data: never, context: ExecutionContext) => {
    //The type annotation of never means this value is never gonna be used accessed in any way shape or form
    const request = context.switchToHttp().getRequest();
    return request.CurrentUser;
  },
);
