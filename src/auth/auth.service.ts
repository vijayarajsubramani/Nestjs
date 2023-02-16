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
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password);
            if (!isMatch) { return null }
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

}