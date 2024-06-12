import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReportsService } from './reports.service';
import updateReportDto from 'src/dtos/updateReportDto';
import createReportDto from 'src/dtos/createReportDto';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CurrentUser } from 'src/users/decorators/current-user-decorator';
import { User } from 'src/users/users.entity';
import { SerializeInterceptor } from 'src/interceptors/SerializeInterceptor';
import { ReportDto } from 'src/dtos/ReportDto';
import { approuveReportDto } from 'src/dtos/approveReportDto';
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

    @Patch('/:id/approve')
    async approveReport(@Param('id') id: number, @Body() body: approuveReportDto) {
        return await this.reportService.changeApproval(id, body.approved);
    }


    @Post('/create')
    @UseGuards(AuthGuard)
    @UseInterceptors(new SerializeInterceptor(ReportDto))
    async createReport(@Body() body: createReportDto, @CurrentUser() user: User) {
        const report = await this.reportService.create(body, user);

        return report;
    }

}
