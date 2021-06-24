import { Directive, Input } from '@angular/core';
import { TabLayout } from '../../../shared/components/tab-layout/tab-layout';

export interface TabLayoutComponentInterface {
  t: TabLayout
}

@Directive({
  selector: '[onActivateTab]'
})
export class OnActivateTabDirective {
  @Input('onActivateTab') c: TabLayoutComponentInterface;

  onActivateTab() {
    this.c.t.onActivateTab()
  }
  beforeDeactivateTab() {
    this.c.t.beforeDeactivateTab()
  }
}
