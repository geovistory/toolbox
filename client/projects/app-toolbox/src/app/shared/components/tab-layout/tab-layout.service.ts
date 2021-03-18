import { Injectable, ChangeDetectorRef } from '@angular/core';
import { TabLayout } from './tab-layout';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabLayoutService {

  public t: TabLayout;
  constructor() { }

  create(uiId: string, ref: ChangeDetectorRef, destroy$: Subject<boolean>) {
    this.t = new TabLayout(uiId, ref, destroy$)
    return this.t;
  }

}
