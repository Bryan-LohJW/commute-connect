import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto, SignupDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private config: ConfigService, private jwt: JwtService){

    }
    async login(body: AuthDto) {
        const user = await this.prisma.user.findUnique({where: {
            email: body.email
        }})
        if(!user) {
            throw new UnauthorizedException('Invalid Credentials')
        }
        const passwordMatch = argon.verify(user.hash, [body.password, this.config.get('SALT')].join(''))
        if(!passwordMatch) {
            throw new UnauthorizedException('Invalid Credentials')
        }
        const payload = {
            sub: user.id
        }
        const token = this.jwt.sign(payload, {expiresIn: '15m', secret: this.config.get('JWT_TOKEN_SECRET')})
        return token
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
