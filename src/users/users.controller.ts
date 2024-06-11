import { Body, Controller, Get, Param, Post, NotFoundException, BadRequestException } from '@nestjs/common';
import UserDTO from 'src/dtos/UserDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Post('/signup')
    async createUser(@Body() body: UserDTO){
        if(await this.userService.findByEmail(body.email))
            throw new BadRequestException('User already exists');

        return this.userService.create(body.email, body.password);
    }

    @Get('/:id')
    async findById(@Param('id') id: number) {
        if(! await this.userService.findById(id))
            throw new NotFoundException('User not found');

        return await this.userService.findById(id);
    }

    @Get('/')
    findAll() {
        return this.userService.findAll();
    }
}
