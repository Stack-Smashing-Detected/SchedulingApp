import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findByUsername(username);

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        // generate payload, generating random UserID in the process
        const payload = {
            sub: user._id.toString(),
            username: user.username
        }
        // process JWT token
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

