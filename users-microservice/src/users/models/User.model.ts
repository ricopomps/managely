import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User{

        @PrimaryGeneratedColumn('uuid')
        id: string;

        @IsNotEmpty()
        @IsString()
        @MaxLength(32)
        username: string;
    
        @IsNotEmpty()
        @IsString()
        @MinLength(6)
        @MaxLength(32)
        @Column()
        password: string;
    
        @IsOptional()
        @IsString()
        @MaxLength(64)
        @Column({nullable : true})
        displayName?: string;

        @IsNotEmpty()
        @IsEmail()
        @Column({unique : true})
        email: string;  

}