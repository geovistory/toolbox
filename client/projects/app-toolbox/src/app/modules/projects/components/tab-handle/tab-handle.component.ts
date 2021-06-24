
import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IAppState, PanelTab, TabBase } from '@kleiolab/lib-redux';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Observable, Subject } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'gv-tab-handle',
  templateUrl: './tab-handle.component.html',
  styleUrls: ['./tab-handle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabHandleComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() tab: PanelTab<any>;
  @Output() activateTab = new EventEmitter<void>()
  @Output() closeTab = new EventEmitter<void>()

  title$: Observable<string>
  tooltip$: Observable<string>
  loading$: Observable<boolean>// = new BehaviorSubject(true)

  constructor(
    private ngRedux: NgRedux<IAppState>,
    public p: ActiveProjectService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {

    const x$ = this.ngRedux.select<TabBase>(['activeProject', 'tabLayouts', this.tab.path[2]])
      .pipe(delay(0))
    this.title$ = x$.pipe(map(x => x?.tabTitle ?? ''))
    this.tooltip$ = x$.pipe(map(x => x?.tabTooltip ?? ''))
    this.loading$ = x$.pipe(
      map(x => x?.loading === true ? true : false))
    // this.title$ = this.p.getTabTitle(this.tab.path)
    // this.tooltip$ = combineLatest(this.p.getTabTooltip(this.tab.path), this.title$).pipe(
    //   map(([tooltip, title]) => tooltip ? tooltip : title)
    // )
    // this.p.getTabLoading(this.tab.path).pipe(
    //   filter(x => x !== undefined),
    //   takeUntil(this.destroy$)
    // ).subscribe(l => {
    //   this.loading$.next(l)
    // })
    // this.title$.pipe(takeUntil(this.destroy$)).subscribe(t => this.ref.detectChanges())
    // this.loading$.pipe(takeUntil(this.destroy$)).subscribe(t => this.ref.detectChanges())
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
