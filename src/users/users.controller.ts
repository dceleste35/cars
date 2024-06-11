import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import createUserDto from 'src/dtos/createUserDto';
import updateUserDto from 'src/dtos/updateUserDto';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Post('/signup')
    async createUser(@Body() body: createUserDto) {
        return await this.userService.create(body.email, body.password);
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: number, @Body() body: updateUserDto) {
        return await this.userService.update(id, body);
    }

    @Get('/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    async findById(@Param('id') id: number) {
        return await this.userService.findById(id);
    }

    @Get('/email/:email')
    async findByEmail(@Param('email') email: string) {
        return await this.userService.findByEmail(email);
    }

    @Get('/')
    async findAll() {
        return await this.userService.findAll();
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number) {
        return await this.userService.delete(id);
    }
}
