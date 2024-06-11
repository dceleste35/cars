import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import UserDTO from 'src/dtos/UserDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Post('/signup')
    async createUser(@Body() body: UserDTO) {
        return this.userService.create(body.email, body.password);
    }

    @Get('/:id')
    async findById(@Param('id') id: number) {
        return await this.userService.findById(id);
    }

    @Get('/')
    findAll() {
        return this.userService.findAll();
    }
}
