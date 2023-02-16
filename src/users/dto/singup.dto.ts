export class SignupDto {
    firstname:string;
    lastname:string;
    email:string;
    mobile:string;
    password:string;
    role:string;
    avatar:string
}
export class LoginDto{
    name:string;
    password:string;
}
export class ForgotPasswordDto{
    email:string;
}
export class ChangePasswordDto{
    email:string;
    password:string;
}

