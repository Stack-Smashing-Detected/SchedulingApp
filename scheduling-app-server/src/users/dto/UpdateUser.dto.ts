import { IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
    // since we are updating we can set all parameters to optional,
    // any unfilled parameters will not be changed. 


    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    displayname?: string;

}