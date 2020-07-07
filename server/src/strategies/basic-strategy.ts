
import {bind, inject} from '@loopback/core';
import {
  asSpecEnhancer,
  mergeSecuritySchemeToSpec,
  OASEnhancer,
  OpenApiSpec,
} from '@loopback/openapi-v3';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {asAuthStrategy, AuthenticationStrategy} from '@loopback/authentication/dist/types';
import {JWTBindings, JWTService} from '../components/jwt';
import _ from 'lodash';


@bind(asAuthStrategy, asSpecEnhancer)
export class BasicAuthenticationStrategy
  implements AuthenticationStrategy, OASEnhancer {
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

  modifySpec(spec: OpenApiSpec): OpenApiSpec {
    return mergeSecuritySchemeToSpec(spec, this.name, {
      type: 'http',
      scheme: 'basic',
    });
  }
}
