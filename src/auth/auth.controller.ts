import { Controller, Post, Body, Res, HttpStatus, UnauthorizedException, Headers, Ip, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiHideProperty, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
import { ChangePasswordAuthDto } from './dto/change-password-auth.dto';




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @ApiTags('auth')
  @Post('register')
  registerUser(@Body() userObject: RegisterAuthDto) {
    return this.authService.register(userObject);
  }

  @ApiTags('auth')
  @Post('login')
  async loginUser(@Body() userObjectLogin: LoginAuthDto, @Res() res, @Req() req) {
    
    const token = await this.authService.login(userObjectLogin);
    
    // res.setHeader('Authorization', `Bearer ${token.token}`);
    req.headers.authorization = `Bearer ${token.token}`
    req.userId=''
    res.send({
      message: 'Logged in successfully',
      token: token.token
    });
  }

  @ApiTags('auth')
  @Post('changePassword')
  async changePasswordUser(@Body() userObjectChange: ChangePasswordAuthDto, @Res() res){
    await this.authService.changePassword(userObjectChange)
    res.send({
      message: 'change password successfully',
    });
  }

  @ApiHideProperty()
  @Post('logout')
  async logout(@Headers('authorization') token: string, @Res() res: Response) {
    try {
      if (!token) {
        throw new UnauthorizedException('Missing Authorization header');
      }
      const accessToken = token.split(' ')[1].trim();
      await this.authService.invalidateToken(accessToken);
      res.setHeader('Authorization', '');
      return res.status(HttpStatus.OK).json({ message: 'Logout successful' });
    } catch (err) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: err.message });
    }
  }
}
