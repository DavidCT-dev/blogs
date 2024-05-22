import { HttpException, Injectable, NotFoundException, Res, } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { hash, compare, hashSync } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ChangePasswordAuthDto } from './dto/change-password-auth.dto';
import { JwtService } from '@nestjs/jwt'
import { Rol } from 'src/rol/schema/rol.schema';
import { CreateRolDto } from 'src/rol/dto/create-rol.dto';
import * as jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from 'src/config';


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtAuthService: JwtService,
    @InjectModel(Rol.name) private readonly rolModel: Model<CreateRolDto>,
  ) { }

  async register(userObject: RegisterAuthDto) {
    const { password, rol, name, email } = userObject;

    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash };

    const findUser = await this.userModel.findOne({ email: email })
    if (findUser) {
      if (email == findUser.email) throw new HttpException('USER_ALREADY_EXISTS', 409);
    }
    if (rol) {
      const foundRoles = await this.rolModel.find({ name: { $in: rol } });
      if (foundRoles.length <= 0) {
        throw new HttpException('ROL_NOT_FOUND', 404)
      }
      userObject.rol = foundRoles.map((role) => role._id.toString());

    } else {
      const role = await this.rolModel.findOne({ name: 'user' });
      userObject.rol = [role._id.toString()];
    }

    return await this.userModel.create(userObject);
  }


  async login(userObjectLogin: LoginAuthDto) {
    const { email, password, } = userObjectLogin
    const findUser = await this.userModel.findOne({ email: email }).populate('rol');
    
    if (!findUser) {
      throw new HttpException('USER_NOT_FOUND', 404);
    }

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) {
      throw new HttpException('PASSWORD_INCORRECT', 403);
    }
    const payload = { id: findUser._id, name: findUser.name }
    const token = await this.jwtAuthService.signAsync(payload);

    findUser.token = token;
    await findUser.save();

    const data = {
      user: findUser,
      token,
    };
    return data;
  }

  async changePassword( userObjectChange: ChangePasswordAuthDto) {
    const {email, password }= userObjectChange;
    const user = await this.userModel.findOne({email})
    if (!user){
      throw new NotFoundException('User not found')
    }
    const encryptedPassword = hashSync(password, 10);
    user.password = encryptedPassword;
    
    return await user.save();
    
  }



  async invalidateToken(token: string) {
    const decodedToken = jwt.verify(token, "MiSemillaSecreta") as jwt.JwtPayload;
    const { id } = decodedToken;
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('non-existent token');
    }
    user.token = null;
    await user.save();
  }


}

