import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import createUserDto from 'src/dtos/createUserDto';
import updateUserDto from 'src/dtos/updateUserDto';
import { SerializeInterceptor } from 'src/interceptors/SerializeInterceptor';
import { AuthService } from './auth.service';
import loginUserDto from 'src/dtos/loginUserDto';
import { CurrentUser } from './decorators/current-user-decorator';
import { CurrentUserInterceptor } from 'src/interceptors/CurrentUserInterceptor';
import { AuthGuard } from 'src/guards/AuthGuard';
import { UserDTO } from 'src/dtos/UserDto';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

    @Post('/signup')
    async signup(@Body() body: createUserDto, @Session() session: any) {
        if(await this.userService.findByEmail(body.email))
            throw new BadRequestException(`User with email ${body.email} already exists`);

        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;

        return user;
    }

    @Post('/login')
    async login(@Body() body: loginUserDto, @Session() session: any){
        const user = await this.authService.login(body);
        session.userId = user.id;

        return user;
    }

    @Post('/logout')
    async logout(@Session() session: any) {
        if (session.userId == null)
            throw new BadRequestException(`User is not logged in`);

        session.userId = null;
    }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    async whoami(@CurrentUser() user: any) {
        if(!user)
            throw new BadRequestException(`User is not logged in`);

        return await this.userService.findById(user.id);
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: number, @Body() body: updateUserDto) {
        const user = await this.userService.findById(id)
        if(!user)
            throw new NotFoundException(`User with id ${id} not found`);

        return await this.userService.update(id, body);
    }

    @Get('/:id')
    @UseInterceptors(new SerializeInterceptor(UserDTO))
    async findById(@Param('id') id: number) {
        const user = await this.userService.findById(id)
        if(!user)
            throw new NotFoundException(`User with id ${id} not found`);

        return user;
    }

    @Get('/')
    @UseInterceptors(new SerializeInterceptor(UserDTO))
    async find(@Query('email') email: string) {
        if(email) {
            var user = await this.userService.findByEmail(email);
            return user;
        }

        return await this.userService.findAll();
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number) {
        return await this.userService.delete(id);
    }

    // @Get('/colors')
    // getColor(@Session() session: any) {
    //     return session.color;
    // }

    // @Get('/colors/:color')
    // setColor(@Param('color') color: string, @Session() session: any) {
    //     session.color = color;
    // }
}
