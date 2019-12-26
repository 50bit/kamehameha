import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcryptjs';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async signUp(authDto:AuthDto):Promise<void>{
        const {username , password } = authDto;
        const user = new User();
        user.username = username;
        let salt = await bcrypt.genSaltSync(10);
        let hash = await bcrypt.hashSync(password, salt);
        user.password = hash;

        //console.log(await bcrypt.compareSync(password, hash))
     
        try{
            await user.save();
        }catch(error){
            console.log(error.message)
        }
        
        
    }

}