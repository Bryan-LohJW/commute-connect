import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto, SignupDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() body: AuthDto) {
        return this.authService.login(body)
    }

    @Post('signup')
    signup(@Body() body: SignupDto) {
        return this.authService.signup(body)
    }
}
