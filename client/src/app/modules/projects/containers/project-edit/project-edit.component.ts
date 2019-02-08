import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CdkPortal, DomPortalHost } from '@angular/cdk/portal';
import { ApplicationRef, Component, ComponentFactoryResolver, Directive, HostBinding, Injector, Input, OnChanges, OnDestroy, QueryList, ViewChild, ViewChildren, AfterViewInit, SimpleChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { ActiveProjectService, Panel, Tab, ListType } from 'app/core';
import { Observable, Subject, BehaviorSubject, combineLatest, zip } from 'rxjs';
import { first, take, map, takeUntil } from 'rxjs/operators';
import { PanelBodyDirective } from '../../directives/panel-body.directive';
import { MatDrawer } from '@angular/material';


export interface TabBody extends Tab {
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

  @ViewChild(CdkPortal) portal: CdkPortal;
  private host: PanelBodyDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {
    combineLatest(this.active$, this.panelId$, this.bodies$).takeUntil(this.destroy$)
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
  @ViewChild('list') list: MatDrawer;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  allTabs$: Observable<TabBody[]>;
  highlightPanel = {};
  tabDragging = false;
  panelBodies$ = new BehaviorSubject<PanelBodyDirective[]>([]);


  constructor(
    public p: ActiveProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

    const id = activatedRoute.snapshot.params['pkActiveProject'];

    this.p.initProject(id);
    this.p.initProjectCrm(id);

    this.allTabs$ = this.p.panels$.map(panels => {
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
    })

  }

  ngAfterViewInit() {
    this.panelBodies.changes.takeUntil(this.destroy$)
      .subscribe(a => {
        const b = this.panelBodies.toArray()
        this.panelBodies$.next(b)
      })

    this.list._closedStream.takeUntil(this.destroy$).subscribe(e => {
      this.p.setListType('')
    })
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  trackByPath(index, item: Tab) {
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
    this.p.closeProject()
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
