import { NgModule } from '@angular/core';
import { CoreTableFixedVirtualScrollDirective } from './virtual-scroll.directive';

const components = [CoreTableFixedVirtualScrollDirective];

@NgModule({
  declarations: components,
  exports: components,
})
export class CoreTableVirtualScrollModule {}
