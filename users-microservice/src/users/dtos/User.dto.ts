import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export default class UpdateUserDto{

    @IsOptional()
    @IsString()
    @MaxLength(32)
    username?: string;

    @IsOptional()
    @IsString()
    @MaxLength(64)
    displayName?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}