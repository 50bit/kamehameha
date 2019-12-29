import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUesr } from './user.decoretor';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authDto:AuthDto):Promise<void>{
        return this.authService.signUp(authDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authDto:AuthDto):Promise<{accessToken:string}>{
        return this.authService.signIn(authDto);
    }

    @Post('/user')
    @UseGuards(AuthGuard())
    getUser(@GetUesr() user:User){
        return user ;
    }
}
