import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {

    @UseGuards(JwtGuard)
    @Get('me')
    getme(@Req() req:Request & { user :any}){
        return req.user;
    }
}
