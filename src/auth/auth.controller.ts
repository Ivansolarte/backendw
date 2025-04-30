import { Request, Response } from 'express';
import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: loginDto, @Res() res: any) {
    try {
      const user = await this.authService.validateUser(body.email, body.password);
      const token = await this.authService.login(user);
      res.status(200).json({ token });
    } catch (err) {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  }
}
