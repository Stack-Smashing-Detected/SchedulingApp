import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsString()
    @IsOptional()
    displayname?: string;

    constructor(data: Partial<CreateUserDto>){
        Object.assign(this, data);
        if(!this.displayname){
            this.displayname = this.username;
        }
    }
}