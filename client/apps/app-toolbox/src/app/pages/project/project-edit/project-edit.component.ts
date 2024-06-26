
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListType, StateFacade } from '@kleiolab/lib-redux';
import { AngularSplitModule } from 'angular-split';
import { indexBy } from 'ramda';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, map, shareReplay, takeUntil } from 'rxjs/operators';
import { OntomeProfilesSettingsComponent } from '../../../components/configuration/ontome-profiles-settings/ontome-profiles-settings.component';
import { ProjectSettingsDataComponent } from '../../../components/configuration/project-settings-data/project-settings-data.component';
import { RamFormComponent } from '../../../components/editor/ram-form/ram-form.component';
import { AnalysisListComponent } from '../../../components/layout/left-drawer/components/analysis-list/analysis-list.component';
import { DigitalsListComponent } from '../../../components/layout/left-drawer/components/digitals-list/digitals-list.component';
import { EntityListComponent } from '../../../components/layout/left-drawer/components/entity-list/entity-list.component';
import { SettingsListComponent } from '../../../components/layout/left-drawer/components/settings-list/settings-list.component';
import { SourceListComponent } from '../../../components/layout/left-drawer/components/source-list/source-list.component';
import { NavbarComponent } from '../../../components/layout/navbar/navbar.component';
import { AnalysisDetailComponent } from '../../../components/layout/tab-bodies/analysis-detail/analysis-detail.component';
import { EntityDetailComponent } from '../../../components/layout/tab-bodies/entity-detail/entity-detail.component';
import { TableDetailComponent } from '../../../components/layout/tab-bodies/table-detail/table-detail.component';
import { TextDetailComponent } from '../../../components/layout/tab-bodies/text-detail/text-detail.component';
import { TypesComponent } from '../../../components/layout/tab-bodies/types/types.component';
import { TabBodyComponent } from '../../../components/layout/tab-layout/tab-body/tab-body.component';
import { TabHandleComponent } from '../../../components/layout/tab-layout/tab-handle/tab-handle.component';
import { OnActivateTabDirective } from '../../../directives/on-activate-tab.directive';
import { PanelBodyDirective } from '../../../directives/panel-body.directive';
import { TabBody } from '../../../lib/types/TabBody';
import { ActiveProjectService } from '../../../services/active-project.service';
import { BasicService } from '../../../services/basic.service';



@Component({
  selector: 'gv-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ActiveProjectService],
  standalone: true,
  imports: [NavbarComponent, RouterLink, NgIf, MatButtonModule, MatSidenavModule, NgClass, MatIconModule, DigitalsListComponent, SourceListComponent, EntityListComponent, AnalysisListComponent, SettingsListComponent, CdkDropListGroup, AngularSplitModule, NgFor, CdkDropList, TabHandleComponent, CdkDrag, PanelBodyDirective, TabBodyComponent, TextDetailComponent, OnActivateTabDirective, TableDetailComponent, EntityDetailComponent, AnalysisDetailComponent, ProjectSettingsDataComponent, OntomeProfilesSettingsComponent, TypesComponent, RamFormComponent, AsyncPipe]
})
export class ProjectEditComponent implements OnInit, OnDestroy, AfterViewInit {

  @HostBinding('class.gv-full') full = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  @ViewChildren(PanelBodyDirective) panelBodies !: QueryList<PanelBodyDirective>;
  @ViewChild('list', { static: true }) list: MatDrawer;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  beforeDestroy$ = new Subject<boolean>();

  allTabs$: Observable<TabBody<any>[]>;
  tabBodiesByKey$: Observable<{ [key: string]: TabBody<any> }>;
  highlightPanel = {};
  tabDragging = false;
  panelBodies$ = new BehaviorSubject<PanelBodyDirective[]>([]);

  projectId: number;
  projectLabel$: Observable<string>;

  btn1Label$: Observable<string>
  btn1Url$: Observable<string>
  btn2Label$: Observable<string>
  btn2Url$: Observable<string>

  constructor(
    public p: ActiveProjectService,
    public state: StateFacade,
    private activatedRoute: ActivatedRoute,
    basic: BasicService, // this initiates the question if geolocalization is allowed
  ) {

    this.projectId = parseInt(this.activatedRoute.snapshot.params['pkActiveProject']);
    this.btn1Label$ = this.state.data.pro.textProperty.getProjectBtn1Label(this.projectId);
    this.btn1Url$ = this.state.data.pro.textProperty.getProjectBtn1Url(this.projectId);
    this.btn2Label$ = this.state.data.pro.textProperty.getProjectBtn2Label(this.projectId);
    this.btn2Url$ = this.state.data.pro.textProperty.getProjectBtn2Url(this.projectId);

    // const storagePrefix = 'Geovistory-Panels-Project-';

    // // Get last panel state of this project from local storage and put it to store
    // const x = this.sdkStorage.get(storagePrefix + this.projectId) || [];
    // setTimeout(() => {
    //   if (typeof x.panels !== 'object' || typeof x.uiIdSerial !== 'number' || typeof x.panelSerial !== 'number' || typeof x.focusedPanel !== 'number') {
    //     this.sdkStorage.remove(storagePrefix + this.projectId)
    //   } else {

    //     // TODO uncomment the following line in order to activate restoring of tabs from last session.
    //     // this.p.setPanels(x.panels, x.uiIdSerial, x.panelSerial, x.focusedPanel)
    //   }
    // })

    // // Subscribe to the panels until just before the project edit is destroyed
    // combineLatest(
    //   this.state.ui.activeProject.panels$, this.p.uiIdSerial$, this.p.panelSerial$, this.p.focusedPanel$
    // ).pipe(takeUntil(this.beforeDestroy$)).subscribe(([panels, uiIdSerial, panelSerial, focusedPanel]) => {
    //   // Set the panels in local storage
    //   this.sdkStorage.set(storagePrefix + this.projectId, { panels, uiIdSerial, panelSerial, focusedPanel })
    // })

    this.p.initProject(this.projectId);
    this.p.initProjectConfigData(this.projectId);

    this.allTabs$ = this.state.ui.activeProject.panels$.pipe(map(panels => {
      let allTabs: TabBody<any>[] = []
      panels.forEach((panel, panelIndex) => {
        allTabs = [...allTabs, ...[...panel.tabs].map((tab, tabIndex) => {
          const tabBody: TabBody<any> = {
            ...tab,
            panelId: panel.id,
            tabIndex,
            panelIndex
          }
          return tabBody
        })]
      })
      return allTabs
    }))

    this.tabBodiesByKey$ = this.allTabs$.pipe(
      map(tabs => indexBy(tab => tab.id, tabs)),
      shareReplay({ refCount: true, bufferSize: 1 })
    )


  }
  ngOnInit(): void {
    this.projectLabel$ = this.state.data.pro.textProperty.getProjectLabel(this.projectId)
  }

  ngAfterViewInit() {
    this.panelBodies.changes.pipe(takeUntil(this.destroy$))
      .subscribe(a => {
        const b = this.panelBodies.toArray()
        this.panelBodies$.next(b)
      })

    this.list._closedStream.pipe(takeUntil(this.destroy$)).subscribe(e => {
      this.state.ui.activeProject.setListType('')
    })
  }

  trackByFn(index, item) {
    return index;
  }

  trackByPath(index, item: TabBody<any>) {
    return item.id;
  }

  setHighlightPanel(i: number, area: string) {
    this.highlightPanel[i.toString()] = area;
  }
  unsetHighlightPanel(i?: number, area?: string) {
    if (i === undefined && area === undefined) {
      this.highlightPanel = {}
    } else if (this.highlightPanel[i.toString()] === area) {
      delete this.highlightPanel[i.toString()];
    }
  }

  tabDragEnded() {
    this.unsetHighlightPanel()
    this.tabDragging = false;
  }

  tabDragStarted() {
    this.tabDragging = true;
  }

  setList(list: ListType) {
    this.state.ui.activeProject.listType$.pipe(first(), takeUntil(this.destroy$)).subscribe(previousList => {
      if (previousList === list || list === '') {
        // close the drawe
        this.list.close()
      } else {
        // open the panel
        this.state.ui.activeProject.setListType(list)
      }
    })
  }


  dropTab(event: CdkDragDrop<number>) {
    // .data contains the panelIndex
    this.state.ui.activeProject.moveTab(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }

  splitPanel(newPanelIndex: number, event: CdkDragDrop<any>) {
    // .data contains the panelIndex
    this.state.ui.activeProject.splitPanel(event.item.data.panelIndex, event.item.data.tabIndex, newPanelIndex);
  }

  ngOnDestroy() {
    this.beforeDestroy$.next(true)
    this.state.ui.activeProject.destroy()
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

