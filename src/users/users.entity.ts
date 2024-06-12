import { Exclude } from "class-transformer";
import { Report } from "src/reports/reports.entity";
import { AfterInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: false })
    admin: boolean;

    @OneToMany(() => Report, (report: Report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id: ', this.id);
    }
}
