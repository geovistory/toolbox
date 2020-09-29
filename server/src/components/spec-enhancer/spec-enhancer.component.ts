import {bind, Binding, Component, ContextTags, createBindingFromClass, ProviderMap} from '@loopback/core';
import {SpecEnhancerBindings} from './keys';
import {ModelSpecEnhancer} from './model.spec.enhancer';

@bind({tags: {[ContextTags.KEY]: SpecEnhancerBindings.COMPONENT}})
export class SpecEnhancerComponent implements Component {
  providers: ProviderMap;
  bindings: Binding<unknown>[];

  constructor(
  ) {
    this.setupBindings();
  }

  private setupBindings() {
    this.bindings = [
      createBindingFromClass(ModelSpecEnhancer),
    ];
  }
}
