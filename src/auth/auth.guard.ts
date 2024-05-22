import { 
  CanActivate, 
  ExecutionContext, 
  Injectable, 
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { TOKEN_SECRET } from 'src/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService:JwtService){}

  async canActivate(context: ExecutionContext):Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if(!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret:'MiSemillaSecreta'
        })
        request['user'] = payload;
        console.log(request)
    } catch (error) {
      throw new UnauthorizedException()
    }
    return true;
  }

  private extractTokenFromHeader(request:Request & { headers: { authorization?: string } }): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
