import { Injectable} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon  from "argon2";


@Injectable()
export class AuthService{
    constructor(private prisma : PrismaService){} 
    
   async signup(dto :AuthDto){
    // genrate pass hash
        const hash=await argon.hash(dto.password);

    // save new user to db
        const user= await this.prisma.user.create({
            data :{
                email :dto.email,
                hash :hash
            }
        });
        console.log(hash)
        console.log(dto.email)

        // return ssaved user
         return user;
    }

    signin(){
        return {msg: 'I am signed In'};
    }
}