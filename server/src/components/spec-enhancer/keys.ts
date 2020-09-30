import {SpecEnhancerComponent} from './spec-enhancer.component';
import {BindingKey} from '@loopback/core';

export namespace SpecEnhancerBindings {
  export const COMPONENT = BindingKey.create<SpecEnhancerComponent>('components.SpecEnhancerComponent');
}
