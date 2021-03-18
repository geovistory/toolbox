
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CdkPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, ContentChild, Directive, HostBinding, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { ActiveProjectService, ListType, SDKStorage, Tab } from 'app/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { BasicService } from '../../../../core/basic/basic.service';
import { TabLayout } from '../../../../shared/components/tab-layout/tab-layout';
import { PanelBodyDirective } from '../../directives/panel-body.directive';


export interface TabLayoutComponentInterface {
  t: TabLayout
}

@Directive({
  selector: '[onActivateTab]'
})
export class OnActivateTabDirective {
  @Input('onActivateTab') c: TabLayoutComponentInterface;

  onActivateTab() {
    this.c.t.onActivateTab()
  }
  beforeDeactivateTab() {
    this.c.t.beforeDeactivateTab()
  }
}



export interface TabBody extends Tab<any> {
  panelId: number;
  panelIndex: number;
  tabIndex: number;
}

@Component({
  selector: 'gv-tab-body',
  template: `
    <ng-container *cdkPortal>
      <ng-content> </ng-content>
    </ng-container>
  `,
})
export class TabBodyComponent implements OnChanges, OnDestroy, OnInit {
  @Input() active: boolean;
  @Input() panelId: number;
  @Input() panelBodies$: Observable<PanelBodyDirective[]>;

  active$ = new Subject<boolean>();
  panelId$ = new Subject<number>();
  bodies$ = new Subject<PanelBodyDirective[]>();
  destroy$ = new Subject<boolean>();

  @ViewChild(CdkPortal, { static: true }) portal: CdkPortal;
  @ContentChild(OnActivateTabDirective, /* TODO: check correctness of static flag */ { static: false }) child: OnActivateTabDirective;

  private host: PanelBodyDirective;

  constructor() {
    combineLatest(this.active$, this.panelId$, this.bodies$).pipe(takeUntil(this.destroy$))
      .subscribe(([active, panelId, panelBodies]) => {
        // const oldHost = this.host;
        const newHost = panelBodies.find(item => item.gvPanelId === panelId)

        if (newHost && active) {
          if (newHost.portal !== this.portal) {
            // if host has attached detach it
            if (newHost.hasAttached()) newHost.detach();
            // if portal is attached detach it
            if (this.portal.isAttached) this.portal.detach();
            // attatch portal to new Host
            newHost.attach(this.portal);
            if (this.child) this.child.onActivateTab()
          }
        }

        if (!active && this.host && this.host.hasAttached() && this.host.portal === this.portal) {
          this.host.detach();
        }

        this.host = newHost;
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.active) {
      this.active$.next(changes.active.currentValue)
    }
    if (changes.panelId) {
      this.panelId$.next(changes.panelId.currentValue)
    }
  }
  ngOnInit() {
    this.panelBodies$.subscribe(d => {
      this.bodies$.next(d);
    })
  }


  ngOnDestroy(): void {
    if (this.host) this.host.detach();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}


@Component({
  selector: 'gv-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
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
  highlightPanel = {};
  tabDragging = false;
  panelBodies$ = new BehaviorSubject<PanelBodyDirective[]>([]);


  constructor(
    public p: ActiveProjectService,
    private activatedRoute: ActivatedRoute,
    private sdkStorage: SDKStorage,
    private basic: BasicService // this initiates the question if geolocalization is allowed
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
      let allTabs = []
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
    // this.p.addTableTab(2001)
    // this.p.addTableTab(100011)
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  trackByPath(index, item: Tab<any>) {
    return item.path.join('');
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

