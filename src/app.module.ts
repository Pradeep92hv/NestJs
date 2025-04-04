import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true       // to make congig module visible for all module, we using in prisma service
  }), 
    AuthModule, UserModule, BookmarkModule, PrismaModule],

})
export class AppModule {}
