import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => UsersService))private usersService: UsersService,private jwtService: JwtService) { }
    async getJWT_Token(user: any) {
        const payload = { _id: user._id, firstname: user.firstname,email:user.email,mobile:user.mobile,role:user.role };
        return { token: this.jwtService.sign(payload) };
    }
}