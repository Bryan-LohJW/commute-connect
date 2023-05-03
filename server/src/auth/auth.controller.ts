import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards } from '@nestjs/common';
import { AuthDto, SignupDto } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() body: AuthDto) {
        return this.authService.login(body)
    }

    @Post('signup')
    signup(@Body() body: SignupDto) {
        return this.authService.signup(body)
    }

    @UseGuards(AuthGuard)
    @Get('protected')
    protected(){
        return {message: 'Success'}
    }
}
