import {
  bind, Binding,
  BindingScope, Component,
  config,
  ContextTags,
  ProviderMap
} from '@loopback/core';
import {JWTBindings, JWTService} from '../jwt';
import {TokenType} from './security.spec';


export type ExpiresIn = {
  [key in TokenType]: string
}

export type JWTComponentConfig = {
  secret: string,
  expiresIn: ExpiresIn
};

@bind({tags: {[ContextTags.KEY]: JWTBindings.COMPONENT}})
export class JWTComponent implements Component {
  providers: ProviderMap;
  bindings: Binding<unknown>[];

  constructor(
    @config() conf: JWTComponentConfig,
  ) {
    this.setupBindings(conf);
  }

  private setupBindings(conf: JWTComponentConfig) {
    this.bindings = [
      Binding.bind(JWTBindings.TOKEN_SECRET).to(conf.secret),
      Binding.bind(JWTBindings.TOKEN_EXPIRES_IN).to(conf.expiresIn),
      Binding.bind(JWTBindings.TOKEN_SERVICE).toClass(JWTService).inScope(BindingScope.SINGLETON),
    ];
  }
}
