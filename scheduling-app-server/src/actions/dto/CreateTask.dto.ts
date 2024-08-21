import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    taskName: string;

    @IsNotEmpty()
    @IsString()
    startTime: string;

    @IsNotEmpty()
    @IsString()
    endTime: string;
}