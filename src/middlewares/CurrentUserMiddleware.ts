import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "src/users/users.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private userService: UsersService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};

        if (userId) {
            const user = await this.userService.findById(userId);
            // @ts-ignore
            req.currentUser = user;
        }

        next();
    }

}
