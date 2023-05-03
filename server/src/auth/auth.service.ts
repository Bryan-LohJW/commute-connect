import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, SignupDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private config: ConfigService){

    }
    login(body: AuthDto) {
        return {}
    }

    async signup(body: SignupDto) {
        const hash = await argon.hash([body.password, this.config.get('SALT')].join(''))
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: body.email,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    role: 'user',
                    occupation: body.occupation,
                    about: body.about,
                    interests: body.interests,
                    hash: hash
                }
            })

            return user;
        } catch(error) {
            if(error.code === 'P2002') {
                throw new ForbiddenException("Credentials Taken");
            }
            throw error;
        }
    }
}
