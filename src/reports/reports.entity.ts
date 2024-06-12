import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    lgn: number;

    @Column()
    lat: number;

    @Column()
    mileage: number;

    @ManyToOne(() => User, (user: User) => user.reports)
    user: User;
}
