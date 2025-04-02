import { ForbiddenException, Injectable} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon  from "argon2";
import { emit } from "process";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


@Injectable()
export class AuthService{
    constructor(private prisma : PrismaService){} 
    
   async signup(dto :AuthDto){
    try{
        // genrate pass hash
        const hash=await argon.hash(dto.password);

    // save new user to db
        const user= await this.prisma.user.create({
            data :{
                email :dto.email,
                hash :hash
            }
        });
        const { hash: _, ...sanitizedUser } = user;      // deleted the hash for user obj

        // return saved user
        
         return sanitizedUser;
    }catch(erorr)
    {
        if(erorr instanceof PrismaClientKnownRequestError)
        {
            if(erorr.code === 'P2002'){
                throw new ForbiddenException('Credential taken')

            }
        }
        return erorr;
    }
    }

    async signin(dto: AuthDto){
        // find user by email

        const user =await this.prisma.user.findUnique(
           {
            where :{
                email : dto.email,
            }
           }
        )


        // if user not exist throw exception
        if (!user) throw new ForbiddenException ("Credentails incoorect");


        // compare pass
        const pwMatches = await argon.verify(user.hash, dto.password);
        // if pass incoorect throw execption

        if(!pwMatches) throw new ForbiddenException ("password incoorect");

        const { hash: _, ...sanitizedUser } = user;

        // return ssaved user
         return sanitizedUser;
    }
}