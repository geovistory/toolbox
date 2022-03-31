
import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IAppState, PanelTab, TabBase } from '@kleiolab/lib-redux';
import { ClassConfig } from '@kleiolab/lib-sdk-lb4';
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
  svgIcon: string
  colorClass: string

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

    this.svgIcon = `gv:outlined-gv-${this.tab.icon}`;
    this.colorClass = this.getColorClass()

  }
  getColorClass() {
    switch (this.tab.icon) {
      case ClassConfig.IconEnum.Text:
      case ClassConfig.IconEnum.Table:
        return 'gv-digitals-primary-color'

      case ClassConfig.IconEnum.Source:
      case ClassConfig.IconEnum.Expression:
      case ClassConfig.IconEnum.Section:
        return 'gv-sources-primary-color'


      case ClassConfig.IconEnum.PersistentItem:
      case ClassConfig.IconEnum.TemporalEntity:
        return 'gv-entities-primary-color'

      case ClassConfig.IconEnum.Analysis:
        return 'gv-analysis-primary-color'

      case ClassConfig.IconEnum.Value:
      case ClassConfig.IconEnum.Settings:
        return 'gv-values-primary-color'

      case ClassConfig.IconEnum.Story:
        return 'gv-stories-primary-color'



      default:
        break;
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
