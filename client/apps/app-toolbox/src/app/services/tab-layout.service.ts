import { ChangeDetectorRef, Injectable } from '@angular/core';
import { StateFacade } from '@kleiolab/lib-redux';
import { Subject } from 'rxjs';
import { TabLayout } from '../lib/classes/tab-layout';

@Injectable()
export class TabLayoutService {

  public t: TabLayout;
  constructor(protected state: StateFacade) { }

  create(uiId: string, ref: ChangeDetectorRef, destroy$: Subject<boolean>) {
    this.t = new TabLayout(this.state, uiId, ref, destroy$)
    return this.t;
  }

}
