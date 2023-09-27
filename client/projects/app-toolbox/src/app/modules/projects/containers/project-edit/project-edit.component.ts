
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { ListType, PanelTab } from '@kleiolab/lib-redux';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BasicService } from 'projects/app-toolbox/src/app/core/basic/basic.service';
import { ActiveAccountPipes } from 'projects/lib-queries/src/lib/queries/services/active-account-pipes.service';
import { indexBy } from 'ramda';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, map, shareReplay, takeUntil } from 'rxjs/operators';
import { PanelBodyDirective } from '../../directives/panel-body.directive';




export interface TabBody<M> extends PanelTab<M> {
  panelId: number;
  panelIndex: number;
  tabIndex: number;
}

export const getTabBodyKey = <M>(b: TabBody<M>) => b.path.join('');

@Component({
  selector: 'gv-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  projectLabel$: Observable<String>;

  btn1Label$: Observable<string>
  btn1Url$: Observable<string>
  btn2Label$: Observable<string>
  btn2Url$: Observable<string>

  constructor(
    public p: ActiveProjectService,
    private a: ActiveAccountPipes,
    private activatedRoute: ActivatedRoute,
    basic: BasicService, // this initiates the question if geolocalization is allowed
  ) {

    this.projectId = parseInt(this.activatedRoute.snapshot.params['pkActiveProject']);
    this.btn1Label$ = this.a.getProjectBtn1Label(this.projectId);
    this.btn1Url$ = this.a.getProjectBtn1Url(this.projectId);
    this.btn2Label$ = this.a.getProjectBtn2Label(this.projectId);
    this.btn2Url$ = this.a.getProjectBtn2Url(this.projectId);

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
    //   this.p.panels$, this.p.uiIdSerial$, this.p.panelSerial$, this.p.focusedPanel$
    // ).pipe(takeUntil(this.beforeDestroy$)).subscribe(([panels, uiIdSerial, panelSerial, focusedPanel]) => {
    //   // Set the panels in local storage
    //   this.sdkStorage.set(storagePrefix + this.projectId, { panels, uiIdSerial, panelSerial, focusedPanel })
    // })

    this.p.initProject(this.projectId);
    this.p.initProjectConfigData(this.projectId);

    this.allTabs$ = this.p.panels$.pipe(map(panels => {
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
      map(tabs => indexBy(tab => getTabBodyKey(tab), tabs)),
      shareReplay({ refCount: true, bufferSize: 1 })
    )


  }
  ngOnInit(): void {
    this.projectLabel$ = this.a.getProjectLabel(this.projectId)
  }

  ngAfterViewInit() {
    this.panelBodies.changes.pipe(takeUntil(this.destroy$))
      .subscribe(a => {
        const b = this.panelBodies.toArray()
        this.panelBodies$.next(b)
      })

    this.list._closedStream.pipe(takeUntil(this.destroy$)).subscribe(e => {
      this.p.setListType('')
    })
  }

  trackByFn(index, item) {
    return index;
  }

  trackByPath(index, item: TabBody<any>) {
    return getTabBodyKey(item);
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
    this.p.list$.pipe(first(), takeUntil(this.destroy$)).subscribe(previousList => {
      if (previousList === list || list === '') {
        // close the drawe
        this.list.close()
      } else {
        // open the panel
        this.p.setListType(list)
      }
    })
  }


  dropTab(event: CdkDragDrop<number>) {
    // .data contains the panelIndex
    this.p.moveTab(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }

  splitPanel(newPanelIndex: number, event: CdkDragDrop<any>) {
    // .data contains the panelIndex
    this.p.splitPanel(event.item.data.panelIndex, event.item.data.tabIndex, newPanelIndex);
  }

  ngOnDestroy() {
    this.beforeDestroy$.next(true)
    this.p.closeProject()
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

