import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReportsService } from './reports.service';
import updateReportDto from 'src/dtos/updateReportDto';
import createReportDto from 'src/dtos/createReportDto';
import { CurrentUserInterceptor } from 'src/interceptors/CurrentUserInterceptor';
import { AuthGuard } from 'src/guards/AuthGuard';
@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {

    constructor(private readonly reportService: ReportsService) {}

    @Get('/:id')
    async findById(@Param('id') id: number) {
        const user = await this.reportService.findById(id)
        if(!user)
            throw new NotFoundException(`Report with id ${id} not found`);

        return user;
    }

    @Patch('/:id')
    async updateReport(@Param('id') id: number, @Body() body: updateReportDto) {
        const report = await this.reportService.findById(id)
        if(!report)
            throw new NotFoundException(`Report with id ${id} not found`);

        return await this.reportService.update(id, body);
    }

    @Post('/create')
    async createReport(@Body() body: createReportDto) {
        const report = await this.reportService.create(body);

        return report;
    }

}
