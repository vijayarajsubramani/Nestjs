import { Controller, Post, Body, Res, Request, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto, LoginDto,ForgotPasswordDto, ChangePasswordDto } from './dto/singup.dto';
import { loginSchema, registerSchema ,forgotPasswordSchema, changePasswordSchema} from './validation/validation'
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/public.decorator';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService,private authservice:AuthService) { }
  @Public()
  @Post('/register')
  async signup(@Body() req: SignupDto, @Res() res: any) {
    try {
      await registerSchema.validateAsync(req)
      return await this.usersService.singup(req, res);
    }
    catch (error: any) {
      return res.send({ statusCode: 500, status: 'error', message: error.message })
    }
  }
  @Public()
  @Post('/login')
  async login(@Body() req: LoginDto, @Res() res: any) {
    try {
      await loginSchema.validateAsync(req)
      return await this.usersService.login(req, res);
    }
    catch (error: any) {
      return res.send({ statusCode: 500, status: 'error', message: error.message })
    }
  }
  @Public()
  @Post('/forgotpassword')
  async forgotPassword(@Body() req: ForgotPasswordDto, @Res() res: any) {
    try {
      await forgotPasswordSchema.validateAsync(req)
      return await this.usersService.forgotPassword(req, res);
    }
    catch (error: any) {
      return res.send({ statusCode: 500, status: 'error', message: error.message })
    }
  }
  @Post('/changepassword')
  async changePassword(@Body() req: ChangePasswordDto, @Res() res: any,@Request() request,) {
    console.log('request',request.user)
    try {
      await changePasswordSchema.validateAsync(req)
      return await this.usersService.changePassword(req, res);
    }
    catch (error: any) {
      return res.send({ statusCode: 500, status: 'error', message: error.message })
    }
  }
}
