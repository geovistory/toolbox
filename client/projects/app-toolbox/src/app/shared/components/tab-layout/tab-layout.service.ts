import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TabLayout } from './tab-layout';

@Injectable()
export class TabLayoutService {

  public t: TabLayout;
  constructor() { }

  create(uiId: string, ref: ChangeDetectorRef, destroy$: Subject<boolean>) {
    this.t = new TabLayout(uiId, ref, destroy$)
    return this.t;
  }

}
