import { BindingKey } from '@loopback/core'
import {
  AuthorizationPolicyComponent
} from '../authorization';
import { Authorizer } from '@loopback/authorization';

export namespace AuthorizationPolicyBindings {
  export const PROVIDER = BindingKey.create<Authorizer>('authorization-policy.provider');
  export const COMPONENT = BindingKey
    .create<AuthorizationPolicyComponent>('components.AuthorizationPolicyComponent');
}

export enum Roles {
  SYS_ADMIN = 'SYS_ADMIN',
  PROJECT_MEMBER = 'PROJECT_MEMBER',
  NAMESPACE_MEMBER = 'NAMESPACE_MEMBER',
}
