import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SignupDto, LoginDto, ForgotPasswordDto, ChangePasswordDto } from './dto/singup.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './interface/user.interface';
import { EmailTemplate } from '../config/template'
import { sendEmail } from 'src/emailservices/email.service';
import { AuthService } from 'src/auth/auth.service';
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private userModal: Model<Users>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) { }
  async findOne(username: string) {
    const user = await this.userModal.findOne({ mobile: '1234567890' });
    return user;
  }
  async singup(reqbody: SignupDto, res: any): Promise<void> {
    try {
      let user = new this.userModal(reqbody);
      const hashpassword = reqbody.password ? await bcrypt.hash(reqbody.password, 5) : '';
      if (reqbody.mobile && await this.userModal.findOne({ mobile: reqbody.mobile })) {
        return res.send({ statusCode: 400, status: 'error', message: 'Mobile number already added' })
      }
      if (reqbody.email && await this.userModal.findOne({ email: reqbody.email })) {
        return res.send({ statusCode: 400, status: 'error', message: 'Email already added' })
      }
      user.password = hashpassword
      await user.save()
      return res.send({ statusCode: 200, status: 'success', message: 'Successfully register' })
    } catch (error: any) {
      return res.send({ statusCode: 500, status: 'error', message: 'something went wrong' })
    }
  }
  async login(reqbody: LoginDto, res: any): Promise<void> {
    try {
      let user = await this.userModal.findOne({ $or: [{ 'mobile': reqbody.name }, { 'email': reqbody.name }] });
      if (!user) {
        return res.send({ statusCode: 400, status: 'error', message: 'User not Register' })
      }
      if (user.isActive === false) {
        return res.send({ statusCode: 400, status: 'error', message: 'User is In-Active Status' })
      }
      if (!user || !(await bcrypt.compare(reqbody.password, user.password))) {
        return res.send({ statusCode: 400, status: 'error', message: 'Incorrect username or password' })
      }
      let userdetails = await this.userModal.aggregate([{ $match: { $or: [{ mobile: reqbody.name }, { email: reqbody.name }] } }])
      const token = this.authService.getJWT_Token(userdetails[0])

      return res.send({ statusCode: 200, status: 'success', message: 'User logged in Successfully', data: userdetails[0], token: (await token).token })
    } catch {
      return res.send({ statusCode: 500, status: 'error', message: 'something went wrong' })
    }
  }
  async forgotPassword(reqbody: ForgotPasswordDto, res: any): Promise<void> {
    try {
      let user = await this.userModal.findOne({ $or: [{ email: reqbody.email }] })
      if (!user) {
        return res.send({ statusCode: 400, status: 'error', message: 'User not Found' })
      }
      const emailObj = {
        email: user.email,
        subject: EmailTemplate.FORGOTPASSWORD
      }
      await sendEmail(emailObj)
      return res.send({ statusCode: 200, status: 'success', message: 'Successfully send Email' })
    }
    catch {
      return res.send({ statusCode: 500, status: 'error', message: 'something went wrong' })
    }
  }
  async changePassword(reqbody: ChangePasswordDto, res: any): Promise<void> {
    try {
      let user = await this.userModal.findOne({ $or: [{ email: reqbody.email }] })
      const hashedpassword = await bcrypt.hash(reqbody.password, 5)
      if (!user) {
        return res.send({ statusCode: 400, status: 'error', message: 'Incorrect credentials provided. Please check and try again' })
      }
      if ((await bcrypt.compare(reqbody.password, user.password))) {
        return res.send({ statusCode: 400, status: 'error', message: 'This is your previous password' })
      }
      let additionalSellerDetails = { password: hashedpassword.toString() }
      Object.assign(user, additionalSellerDetails);
      await user.save();
      return res.send({ statusCode: 200, status: 'success', message: 'Your password has been reset successfully, Please sign in' })
    }
    catch {
      return res.send({ statusCode: 500, status: 'error', message: 'something went wrong' })
    }
  }
}
