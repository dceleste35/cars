import { Body, Controller, Post } from '@nestjs/common';
import UserDTO from 'src/dtos/UserDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Post('/signup')
    createUser(@Body() body: UserDTO){
        return this.userService.create(body.email, body.password);
    }
}
