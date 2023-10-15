import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users } from 'src/auth/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema
      }
    ]),
  ],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
