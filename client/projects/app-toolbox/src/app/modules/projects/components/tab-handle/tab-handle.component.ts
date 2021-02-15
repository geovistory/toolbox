
import { takeUntil, map } from 'rxjs/operators';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PanelTab } from "@kleiolab/lib-redux";
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project/active-project.service";
import { Observable, Subject, combineLatest } from 'rxjs';

@Component({
  selector: 'gv-tab-handle',
  templateUrl: './tab-handle.component.html',
  styleUrls: ['./tab-handle.component.scss']
})
export class TabHandleComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() tab: PanelTab<any>;
  @Output() activateTab = new EventEmitter<void>()
  @Output() closeTab = new EventEmitter<void>()

  title$: Observable<string>
  tooltip$: Observable<string>
  loading$: Observable<boolean>

  constructor(public p: ActiveProjectService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.title$ = this.p.getTabTitle(this.tab.path)
    this.tooltip$ = combineLatest(this.p.getTabTooltip(this.tab.path), this.title$).pipe(
      map(([tooltip, title]) => tooltip ? tooltip : title)
    )
    this.loading$ = this.p.getTabLoading(this.tab.path)
    this.title$.pipe(takeUntil(this.destroy$)).subscribe(t => this.ref.detectChanges())
    this.loading$.pipe(takeUntil(this.destroy$)).subscribe(t => this.ref.detectChanges())
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
