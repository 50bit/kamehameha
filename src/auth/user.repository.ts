import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcryptjs';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async signUp(authDto:AuthDto):Promise<User>{
        const {username , password } = authDto;
        const user = new User();
        user.username = username;
        let salt = await bcrypt.genSaltSync(10);
        let hash = await bcrypt.hashSync(password, salt);
        user.password = hash;

        //console.log(await bcrypt.compareSync(password, hash))
     
        try{
            await user.save();
            delete user.password;
            return user
        }catch(error){
            if(error.code === '23505') throw new ConflictException();
            else throw new InternalServerErrorException();
        }
    }

    async signIn(authDto:AuthDto):Promise<string>{
        const {username , password} = authDto ;
        
        const user = await this.findOne({username});
    
        if(user && this.validatePassword(password,user.password)){
            return username;
        }
        else{
            return "";
        }
        
       
    }

    async validatePassword(password , hash){
        return await bcrypt.compareSync(password, hash);
    }

}