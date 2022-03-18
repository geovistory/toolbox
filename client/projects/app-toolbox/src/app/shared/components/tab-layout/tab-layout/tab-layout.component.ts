import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, OnDestroy, OnInit, QueryList } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { IOutputData } from 'angular-split/lib/interface';
import { Subject } from 'rxjs';
import { TabLayoutService } from '../tab-layout.service';

@Component({
  selector: 'gv-tab-layout',
  templateUrl: './tab-layout.component.html',
  styleUrls: ['./tab-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabLayoutComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  // uuid of tab

  @ContentChildren(MatTabGroup, { descendants: true }) matTabGroups: QueryList<MatTabGroup>

  constructor(
    protected ref: ChangeDetectorRef,
    public service: TabLayoutService) { }

  ngOnInit(): void {
    if (!this.service.t) throw new Error('tab layout not properly initialized. Call this.service.create() on the provider component.')
    this.service.t.setLayoutMode('both')
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSplitAreaDragEnd(e: IOutputData) {
    this.service.t.onResizeArea(e)
    this.matTabGroups.forEach(item => item.realignInkBar())
  }
}
