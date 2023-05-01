import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
    login(body: AuthDto) {
        return {username: body.username, password: body.password}
    }

    signup(body: AuthDto) {
        return {username: body.username, password: body.password}
    }
}
