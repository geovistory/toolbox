import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CdkPortal, DomPortalHost } from '@angular/cdk/portal';
import { ApplicationRef, Component, ComponentFactoryResolver, Directive, HostBinding, Injector, Input, OnChanges, OnDestroy, QueryList, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { ActiveProjectService, Tab } from 'app/core';
import { Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';


@Component({
  selector: 'gv-tab-body',
  template: `
    <ng-container *cdkPortal>
      <ng-content> </ng-content>
    </ng-container>
  `,
})
export class TabBodyComponent implements OnChanges, OnDestroy {
  @Input() active: boolean;
  @Input() panelIndex: number;

  @ViewChild(CdkPortal) portal;
  private host: DomPortalHost;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {
  }

  ngOnChanges(): void {
    if (this.active) {

      const ele = document.querySelector('#panel_' + this.panelIndex);
      if (!ele) console.error('no ele')
      this.host = new DomPortalHost(
        ele, // TODO: maybe replace this by some angular way of selecting an element
        this.componentFactoryResolver,
        this.applicationRef,
        this.injector
      );
      this.host.attach(this.portal);
    } else if (this.host && this.host.hasAttached) {
      this.host.detach();
    }

  }

  ngOnDestroy(): void {
    if (this.host) this.host.detach();
  }

}


@Component({
  selector: 'gv-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent {

  @HostBinding('class.gv-full') full = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  allTabs$: Observable<Tab[]>;
  highlightPanel = {};
  tabDragging = false;

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
      panels.forEach((panel, index) => {
        allTabs = [...allTabs, ...panel.tabs.map(tab => {
          tab.panelIndex = panel.id;
          return tab
        })]
      })
      return allTabs
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

  closeList() {
    let urlTree = this.router.parseUrl(this.router.url);

    this.p.pkProject$.pipe(
      first(item => !!item),
      take(1)
    ).subscribe(p => {
      urlTree = {
        ...urlTree,
        root: new UrlSegmentGroup(
          urlTree.root.segments,
          {
            primary: new UrlSegmentGroup(
              [
                new UrlSegment('projects', {}),
                new UrlSegment(p.toString(), {}),
                new UrlSegment('edit', {})
              ],
              {
                detail: urlTree.root.children.primary.children.detail
              }
            )
          }
        )
      }
      const newUrl = this.router.serializeUrl(urlTree)
      this.router.navigateByUrl(newUrl)
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
}
