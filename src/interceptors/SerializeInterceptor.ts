import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('I am running before the handler', context);

        return next.handle().pipe(
            map((data: any) => {
                console.log("I'm running before the response is sent out", data);

                return data;
            }),
        );
    }
}
