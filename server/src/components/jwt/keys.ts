import {BindingKey} from '@loopback/core';
import {ExpiresIn, JWTComponent, JWTService} from '../jwt';

export namespace JWTBindings {
  export const TOKEN_SECRET = BindingKey.create<string>('jwt.secret');
  export const TOKEN_EXPIRES_IN = BindingKey.create<ExpiresIn>('jwt.expiresIn');
  export const TOKEN_SERVICE = BindingKey.create<JWTService>('jwt.tokenservice');
  export const COMPONENT = BindingKey.create<JWTComponent>('components.JWTComponent');
}
