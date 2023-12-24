import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VIEW_FIELD_DISPLAY_MODE, ViewFieldDisplayMode } from '../components/data/view-field/VIEW_FIELD_DISPLAY_MODE';

@Injectable({
  providedIn: 'root'
})
export class ViewFieldTreeNodeService {
  indentation$ = new BehaviorSubject(0);
  displayMode: ViewFieldDisplayMode = 'flat'

  constructor(
    @Optional() @Inject(VIEW_FIELD_DISPLAY_MODE) public displayModeOverride: ViewFieldDisplayMode,
    @Optional() @SkipSelf() public parentNode: ViewFieldTreeNodeService,
  ) {
    if (displayModeOverride) this.displayMode = displayModeOverride
    if (this.displayMode === 'tree' && parentNode?.displayMode === 'tree') {
      parentNode.indentation$.subscribe(val => {
        this.indentation$.next(val + 1)
      });
    }
  }
}
