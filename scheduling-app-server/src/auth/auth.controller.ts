import {
    Controller, Post, HttpCode, HttpStatus, Body, UsePipes,
    ValidationPipe, Get, Request, UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UsePipes(new ValidationPipe())
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('Profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
