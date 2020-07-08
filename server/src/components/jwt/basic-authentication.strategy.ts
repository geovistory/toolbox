
import {asAuthStrategy, AuthenticationStrategy} from '@loopback/authentication/dist/types';
import {bind, inject} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import _ from 'lodash';
import {JWTBindings, JWTService} from '.';


@bind(asAuthStrategy)
export class BasicAuthenticationStrategy implements AuthenticationStrategy {
  name = 'basic';

  constructor(
    @inject(JWTBindings.TOKEN_SERVICE) private jwtService: JWTService,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = this.extractToken(request);
    const userProfile = await this.jwtService.verifyToken(token)
    return userProfile;
  }

  extractToken(request: Request): string {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }

    const token = _.replace(request.headers.authorization, 'Bearer ', '');

    return token;
  }


}
