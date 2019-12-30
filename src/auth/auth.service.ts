import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        private jwtService : JwtService 
    ){}

    async signUp(authDto:AuthDto):Promise<User>{
        return await this.userRepository.signUp(authDto);
    }

    async signIn(authDto:AuthDto):Promise<{username:string,token:string}>{
        const username = await this.userRepository.signIn(authDto);
        if(!username){
            throw new UnauthorizedException();
        }
        const payload : Payload = {username};
        const token = await this.jwtService.sign(payload);
        return {username,token};
    }

    async users():Promise<User[]>{
        return await this.userRepository.find();
    }

    async getUserById(id:number):Promise<User>{
        return await this.userRepository.findOne(id);
    }
}
