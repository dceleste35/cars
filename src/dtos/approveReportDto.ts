import { IsBoolean } from "class-validator";

export class approuveReportDto {
    @IsBoolean()
    approved: boolean;
}
