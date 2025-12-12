import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from './Permission.model';

@Entity('users')
export class User{

        @PrimaryGeneratedColumn('uuid')
        id: string;

        @IsNotEmpty()
        @IsString()
        @MaxLength(32)
        @Column({unique: true})
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

        @ManyToMany(() => Permission)
        @JoinTable({
          name: 'user_roles',
          joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
          },
          inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id',
          },
        })
        permissions: Permission[];
}