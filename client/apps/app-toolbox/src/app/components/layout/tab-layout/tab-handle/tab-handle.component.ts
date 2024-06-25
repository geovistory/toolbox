
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PanelTab, StateFacade } from '@kleiolab/lib-redux';
import { ClassConfig } from '@kleiolab/lib-sdk-lb4';
import { Observable, Subject } from 'rxjs';
import { ActiveProjectService } from '../../../../services/active-project.service';

@Component({
  selector: 'gv-tab-handle',
  templateUrl: './tab-handle.component.html',
  styleUrls: ['./tab-handle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, MatIconModule, NgClass, MatTooltipModule, AsyncPipe]
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
    public p: ActiveProjectService,
    private state: StateFacade
  ) { }

  ngOnInit() {
    const tabId = this.tab.id;
    this.title$ = this.state.ui.activeProject.getTabTitle(tabId)
    this.tooltip$ = this.state.ui.activeProject.getTabTooltip(tabId)
    this.loading$ = this.state.ui.activeProject.getTabLoading(tabId)
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
        return '';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
