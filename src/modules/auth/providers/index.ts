import { Injectable } from 'graphql-modules';
import jwt from 'jsonwebtoken';

import { environment } from '../../../environment';
import { MutationSignUpArgs } from '../../../graphql-codegen-types';
import Email from '../../../service/email';
import AuthProvider, { IAuthProvider } from '../models';

@Injectable()
export class Auth {
  async signUp(input: MutationSignUpArgs, request: any, response: any) {
    const auth = await AuthProvider.create(input);

    const url = `${request.protocol}://${request.get('host')}`;

    await new Email(auth, url).sendWelcome(auth.verifiedCode);
    return this.createSendToken(auth, response);
  }

  private signToken(id: string) {
    return jwt.sign({ id: id }, environment.jwtSecret, {
      expiresIn: environment.jwtExpires,
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
}
