import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from "passport-jwt";
import { TOKEN_SECRET } from "src/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ingnoreExpiration:false,
      secretOrKey: 'MiSemillaSecreta', 
    });
  }
  
  async validate(payload: any){ 
    return { 
      userId: payload.id,
      name: payload.name,
    }
  }
}