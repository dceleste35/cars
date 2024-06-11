import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import createUserDto from 'src/dtos/createUserDto';
import updateUserDto from 'src/dtos/updateUserDto';
import { SerializeInterceptor } from 'src/interceptors/SerializeInterceptor';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Post('/signup')
    async createUser(@Body() body: createUserDto) {
        if(await this.userService.findByEmail(body.email))
            throw new BadRequestException(`User with email ${body.email} already exists`);

        return await this.userService.create(body.email, body.password);
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: number, @Body() body: updateUserDto) {
        if(!this.userService.findById(id))
            throw new NotFoundException(`User with id ${id} not found`);

        return await this.userService.update(id, body);
    }

    @Get('/:id')
    @UseInterceptors(SerializeInterceptor)
    async findById(@Param('id') id: number) {
        const user = await this.userService.findById(id)
        if(!user)
            throw new NotFoundException(`User with id ${id} not found`);

        return user;
    }

    @Get('/email/:email')
    async findByEmail(@Param('email') email: string) {
        const user = await this.userService.findByEmail(email);
        if(!user)
            throw new NotFoundException(`User with email ${email} not found`);

        return user;
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
