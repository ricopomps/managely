import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export default class UpdateUserDto{

    @IsNotEmpty()
    @IsString()
    @MaxLength(32)
    username: string;

    @IsOptional()
    @IsString()
    @MaxLength(64)
    displayName?: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;  

}