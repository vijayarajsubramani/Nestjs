import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'freelancer',
    });
  }
  async validate(payload: any) {
    return { _id: payload._id, firstname: payload.firstname,email:payload.email,mobile:payload.mobile,role:payload.role }
  }
}