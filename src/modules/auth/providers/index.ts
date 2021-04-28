import { Injectable } from 'graphql-modules';
import jwt from 'jsonwebtoken';

import { environment } from '../../../environment';
import { LoginInput, MutationSignUpArgs } from '../../../graphql-codegen-types';
import Email from '../../../service/email';
import { AppError } from '../../../utils';
import AuthProvider, { IAuthProvider } from '../models';
interface AuthModel {
  userName?: string;
  email?: string;
  password?: string;
  provider?: string;
  verifiedCode?: Number;
  verified?: Boolean;
  userId?: string;
  role?: string;
  passwordChangedAt?: number;
  passwordResetExpires?: number;
}

@Injectable({
  global: true,
})
export class Auth {
  async signUp(input: MutationSignUpArgs, request: any, response: any) {
    const auth = await AuthProvider.create(input);

    const url = `${request.protocol}://${request.get('host')}`;

    await new Email(auth, url).sendWelcome(auth.verifiedCode);
    return this.createSendToken(auth, response);
  }
  async verified(id: string) {
    return await this.update(id, { verified: true });
  }

  private signToken(id: string) {
    return jwt.sign({ id: id }, environment.jwtSecret, {
      expiresIn: environment.jwtExpires,
    });
  }

  async update(id: string, values: AuthModel) {
    return await AuthProvider.findByIdAndUpdate(id, values, {
      new: true,
    });
  }

  private createSendToken = (auth: IAuthProvider, res: any) => {
    const token = this.signToken(auth.id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + environment.jwtCookieExpires * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: false,
    };
    if (environment.env === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    return {
      token,
      auth,
    };
  };
  async login({ email, password }: LoginInput, response: any) {
    const user = await AuthProvider.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password)))
      return new AppError('Incorrect email or password', '401');

    if (user) return this.createSendToken(user, response);
  }
}
