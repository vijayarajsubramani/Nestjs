import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt.auth.guard';


@Module({
    imports: [forwardRef(() => UsersModule), PassportModule, JwtModule.register({ secret: 'freelancer', signOptions: { expiresIn: '1d' }, }),],
    providers: [AuthService, LocalStrategy, JwtStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }],
    exports: [AuthService],
})
export class AuthModule { }
