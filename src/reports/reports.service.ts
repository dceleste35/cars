import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import createReportDto from 'src/dtos/createReportDto';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {}

    async findById(id: number) {
        const report = await this.reportRepository.findOneBy({ id });

        return report;
    }

    async update(id: number, body: Partial<Report>) {
        const report = await this.findById(id);
        Object.assign(report, body);

        return this.reportRepository.save(report);
    }

    async create(reportDto: createReportDto, user: User) {
        const report = await this.reportRepository.create(reportDto);
        report.user = user;

        return this.reportRepository.save(report);
    }
}
