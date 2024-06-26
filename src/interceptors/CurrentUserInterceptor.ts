import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UsersService) {}

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session || {};

        if (!userId) {
            throw new NotFoundException("User not logged in");
        }

        const user = await this.userService.findById(userId);
        request.currentUser = user;

        return handler.handle();
    }
}
