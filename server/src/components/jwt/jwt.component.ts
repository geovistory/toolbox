import {
  bind, Binding,
  BindingScope, Component,
  config,
  ContextTags,

  createBindingFromClass, ProviderMap
} from '@loopback/core';
import {JWTBindings, JWTService} from '../jwt';
import {SecuritySpecEnhancer} from './security.spec.enhancer';


export type ExpiresIn = string;

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
      createBindingFromClass(SecuritySpecEnhancer),
    ];
  }
}
