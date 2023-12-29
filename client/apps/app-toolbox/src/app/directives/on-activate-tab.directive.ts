import { Directive, Input } from '@angular/core';
import { TabLayoutService } from '../services/tab-layout.service';

export interface TabLayoutComponentInterface {
  tabLayout: TabLayoutService
}

@Directive({
  selector: '[onActivateTab]',
  standalone: true
})
export class OnActivateTabDirective {
  @Input('onActivateTab') c: TabLayoutComponentInterface;

  onActivateTab() {
    this.c.tabLayout.t.onActivateTab()
  }
  beforeDeactivateTab() {
    this.c.tabLayout.t.beforeDeactivateTab()
  }
}
