import { PassportStrategy } from '@nestjs/passport';
import { Strategy , ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : 'c10h15n'
        });
    }

    async validate(payload:Payload){
        const {username} = payload;
        const user = await this.userRepository.findOne({username});

        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}