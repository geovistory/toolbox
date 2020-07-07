import {TokenService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {verify, sign} from 'jsonwebtoken';
import {ExpiresIn} from './jwt.component';
import {JWTBindings} from './keys';
import ms from 'ms';



export class JWTService implements TokenService {
  constructor(
    @inject(JWTBindings.TOKEN_SECRET) private jwtSecret: string,
    @inject(JWTBindings.TOKEN_EXPIRES_IN) private jwtExpiresIn: ExpiresIn,
  ) {}

  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      );
    }

    let userProfile: UserProfile;

    try {
      // decode user profile from token
      const decodedToken = verify(token, this.jwtSecret) as UserProfile;
      // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
      userProfile = Object.assign(
        {[securityId]: '', name: ''},
        {
          [securityId]: decodedToken.id,
          name: decodedToken.name,
          id: decodedToken.id,
        },
      );
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : ${error.message}`,
      );
    }
    return userProfile;
  }

  async generateToken(userProfile: UserProfile): Promise<string> {
    const {token} = this.generate(userProfile);
    return token;
  }

  async generateTokenWithExpire(userProfile: UserProfile): Promise<{token: string, expiresInMs: number}> {
    const {token, expiresInMs} = this.generate(userProfile);
    return {token, expiresInMs};
  }

  private generate(userProfile: UserProfile) {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : userProfile is null');
    }
    const userInfoForToken = {
      id: userProfile[securityId],
      name: userProfile.name,
      email: userProfile.email,
    };
    // Generate a JSON Web Token
    let token: string;
    const expiresInMs = ms(this.jwtExpiresIn);
    try {
      token = sign(userInfoForToken, this.jwtSecret, {expiresIn: expiresInMs});
    }
    catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }
    return {token, expiresInMs};
  }
}
