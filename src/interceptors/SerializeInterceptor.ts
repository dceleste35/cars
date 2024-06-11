import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDTO } from 'src/dtos/UserDto';

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: any) => {
                return plainToClass(UserDTO, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}
