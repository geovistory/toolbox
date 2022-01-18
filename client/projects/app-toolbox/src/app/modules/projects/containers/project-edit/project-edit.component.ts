
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { ListType, PanelTab } from '@kleiolab/lib-redux';
import { SDKStorage } from '@kleiolab/lib-sdk-lb3';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BasicService } from 'projects/app-toolbox/src/app/core/basic/basic.service';
import { indexBy } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, map, shareReplay, takeUntil } from 'rxjs/operators';
import { PanelBodyDirective } from '../../directives/panel-body.directive';




export interface TabBody extends PanelTab<any> {
  panelId: number;
  panelIndex: number;
  tabIndex: number;
}

export const getTabBodyKey = (b: TabBody) => b.path.join('');

@Component({
  selector: 'gv-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectEditComponent implements OnDestroy, AfterViewInit {

  @HostBinding('class.gv-full') full = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  @ViewChildren(PanelBodyDirective) panelBodies !: QueryList<PanelBodyDirective>;
  @ViewChild('list', { static: true }) list: MatDrawer;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();
  beforeDestroy$ = new Subject<boolean>();

  allTabs$: Observable<TabBody[]>;
  tabBodiesByKey$: Observable<{ [key: string]: TabBody }>;
  highlightPanel = {};
  tabDragging = false;
  panelBodies$ = new BehaviorSubject<PanelBodyDirective[]>([]);


  constructor(
    public p: ActiveProjectService,
    private activatedRoute: ActivatedRoute,
    private sdkStorage: SDKStorage,
    private basic: BasicService, // this initiates the question if geolocalization is allowed
  ) {

    const id = this.activatedRoute.snapshot.params['pkActiveProject'];
    const storagePrefix = 'Geovistory-Panels-Project-';

    // Get last panel state of this project from local storage and put it to store
    const x = this.sdkStorage.get(storagePrefix + id) || [];
    setTimeout(() => {
      if (typeof x.panels !== 'object' || typeof x.uiIdSerial !== 'number' || typeof x.panelSerial !== 'number' || typeof x.focusedPanel !== 'number') {
        this.sdkStorage.remove(storagePrefix + id)
      } else {

        // TODO uncomment the following line in order to activate restoring of tabs from last session.
        // this.p.setPanels(x.panels, x.uiIdSerial, x.panelSerial, x.focusedPanel)
      }
    })

    // Subscribe to the panels until just before the project edit is destroyed
    combineLatest(
      this.p.panels$, this.p.uiIdSerial$, this.p.panelSerial$, this.p.focusedPanel$
    ).pipe(takeUntil(this.beforeDestroy$)).subscribe(([panels, uiIdSerial, panelSerial, focusedPanel]) => {
      // Set the panels in local storage
      this.sdkStorage.set(storagePrefix + id, { panels, uiIdSerial, panelSerial, focusedPanel })
    })

    this.p.initProject(id);
    this.p.initProjectConfigData(id);

    this.allTabs$ = this.p.panels$.pipe(map(panels => {
      let allTabs: TabBody[] = []
      panels.forEach((panel, panelIndex) => {
        allTabs = [...allTabs, ...[...panel.tabs].map((tab, tabIndex) => {
          const tabBody: TabBody = {
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

  ngAfterViewInit() {
    this.panelBodies.changes.pipe(takeUntil(this.destroy$))
      .subscribe(a => {
        const b = this.panelBodies.toArray()
        this.panelBodies$.next(b)
      })

    this.list._closedStream.pipe(takeUntil(this.destroy$)).subscribe(e => {
      this.p.setListType('')
    })


    // DEV: For development of a component in a specific Tab uncomment and modify the following
    // this.p.addEntityTab(4025, 9901)
    // this.p.addEntityTab(90962, 9904)
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  trackByPath(index, item: TabBody) {
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

