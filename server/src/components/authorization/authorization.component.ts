import {
  Binding,
  Component,
  ProviderMap,
  ContextTags,
  bind,
  config,
} from '@loopback/core';
import {
  AuthorizationPolicyBindings,
  AuthorizationProvider
} from '../authorization';
import { AuthorizationTags } from '@loopback/authorization';

export type AuthorizationConfig = {
};

@bind({ tags: { [ContextTags.KEY]: AuthorizationPolicyBindings.COMPONENT } })
export class AuthorizationPolicyComponent implements Component {
  providers: ProviderMap;
  bindings: Binding[];

  constructor(
    @config() conf: AuthorizationConfig,
  ) {
    this.setupBindings(conf);
  }

  private setupBindings(conf: AuthorizationConfig) {
    this.bindings = [
      Binding.bind(AuthorizationPolicyBindings.PROVIDER)
        .toProvider(AuthorizationProvider)
        .tag(AuthorizationTags.AUTHORIZER)
    ];
  }
}
