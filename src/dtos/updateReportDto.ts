import { IsString, IsNotEmpty, IsEmail, IsHash, Max, Min, IsDecimal, IsLatitude, IsLongitude } from 'class-validator';

export default class updateReportDto {
    @IsDecimal()
    price: number;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @Min(2000)
    @Max(2023)
    year: number;

    @IsLongitude()
    lgn: number;

    @IsLatitude()
    lat: number;

    @Min(0)
    @Max(500000)
    mileage: number;
}
