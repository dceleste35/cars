import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import updateUserDto from 'src/dtos/updateUserDto';
@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async create(email: string, password: string) {

        const user = await this.userRepository.create({ email, password });
        return this.userRepository.save(user);
    }

    async findById(id: number) {
        const user = await this.userRepository.findOneBy({ id });

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOneBy({ email });

        return user;
    }

    findAll() {
        return this.userRepository.find();
    }

    async update(id: number, body: Partial<User>) {
        const user = await this.findById(id);
        Object.assign(user, body);

        return this.userRepository.save(user);
    }

    async delete(id: number) {
        const user = await this.findById(id);
        await this.userRepository.remove(user);

        return `User ${id} deleted successfully`;
    }
}
