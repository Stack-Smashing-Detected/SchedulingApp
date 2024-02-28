import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateActionDto {
    @IsNotEmpty()
    @IsString()
    actionName: string;

    @IsNumber()
    @IsNotEmpty()
    duration: number;
}

