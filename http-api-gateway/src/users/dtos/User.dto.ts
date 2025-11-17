import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export default class UserDto{

    @IsNotEmpty()
    @IsString()
    @MaxLength(32)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(32)
    password: string;

    @IsOptional()
    @IsString()
    @MaxLength(64)
    displayName?: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;  

}