import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository
    ){}

    async signUp(authDto:AuthDto):Promise<void>{
        this.userRepository.signUp(authDto);
    }
}
