import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        private jwtService : JwtService 
    ){}

    async signUp(authDto:AuthDto):Promise<void>{
        return this.userRepository.signUp(authDto);
    }

    async signIn(authDto:AuthDto):Promise<{accessToken:string}>{
        const username = await this.userRepository.signIn(authDto);
        if(!username){
            throw new UnauthorizedException();
        }
        const payload : Payload = {username};
        const accessToken = await this.jwtService.sign(payload);
        return {accessToken};
    }
}
