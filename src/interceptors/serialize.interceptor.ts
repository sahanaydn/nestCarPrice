import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
interface ClassConstructor {
  //this is an interface that means any class basically any class whatsoever as long as you give me class i will bw happy :)

  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //Run something before a request is handled by the request handler

    return next.handle().pipe(
      map((data: any) => {
        //run something before the response is sent out
        return plainToClass(this.dto, data, { excludeExtraneousValues: true });
        //excludeExtraneousValues : if we dont have that property on there then any other properties inside of our instance would be shared.
        // Shares only the data in the dto that has the expose decorate.
      }),
    );
  }
}
