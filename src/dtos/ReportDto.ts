import { Expose, Transform } from 'class-transformer';

export class ReportDto {

    @Expose()
    price: number;
    @Expose()
    year: number;
    @Expose()
    lgn: number;
    @Expose()
    lat: number;
    @Expose()
    make: string;
    @Expose()
    model: string;
    @Expose()
    mileage: number;
    @Transform(({ obj }) => obj.user.id)
    userId: number;
}
