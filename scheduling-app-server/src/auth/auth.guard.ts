import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../publicAccess.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    //private read-only jwt secret key
    private readonly jwtSecret: string;

    constructor(private jwtService: JwtService, private configService: ConfigService, private reflector: Reflector) {
        this.jwtSecret = this.configService.get<string>('JWT_SECRET');
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // check if route has a public decorator
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]
        );

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.jwtSecret,
                }
            );
            //Assigning the object to the payload here.
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}