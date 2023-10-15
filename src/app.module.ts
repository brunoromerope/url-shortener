import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { UrlService } from './url/url.service';
import { UserSchema, Users } from './auth/schemas/user.schema';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UrlSchema, Urls } from './url/schemas/url.schema';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature([
      {
        name: Urls.name,
        schema: UrlSchema
      }
    ]),
    LoginModule,
    SignupModule,],
  controllers: [AppController],
  providers: [AppService, JwtService, UrlService, JwtStrategy],
})
export class AppModule {}
