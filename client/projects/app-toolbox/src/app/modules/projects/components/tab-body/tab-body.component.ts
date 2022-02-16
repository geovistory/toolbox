import { CdkPortal } from '@angular/cdk/portal';
import { Component, ContentChild, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { getTabBodyKey, ProjectEditComponent, TabBody } from '../../containers/project-edit/project-edit.component';
import { OnActivateTabDirective } from '../../directives/on-activate-tab.directive';
import { PanelBodyDirective } from '../../directives/panel-body.directive';

@Component({
  selector: 'gv-tab-body',
  template: `
    <ng-container *cdkPortal>
      <ng-content> </ng-content>
    </ng-container>
  `,
})
export class TabBodyComponent implements OnChanges, OnDestroy, OnInit {
  @Input() tab: TabBody<any>;
  @Input() active: boolean;
  @Input() panelId: number;
  @Input() panelBodies$: Observable<PanelBodyDirective[]>;

  active$ = new Subject<boolean>();
  panelId$ = new Subject<number>();
  bodies$ = new Subject<PanelBodyDirective[]>();
  destroy$ = new Subject<boolean>();

  @ViewChild(CdkPortal, { static: true }) portal: CdkPortal;
  @ContentChild(OnActivateTabDirective) child: OnActivateTabDirective;

  private host: PanelBodyDirective;

  constructor(private projectEditComponent: ProjectEditComponent) {

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
    const key = getTabBodyKey(this.tab)
    const tabBody$ = this.projectEditComponent.tabBodiesByKey$
      .pipe(
        map(idxed => idxed[key])
      )
    // combineLatest([this.active$, this.panelId$, this.bodies$]).pipe(takeUntil(this.destroy$))
    //   .subscribe(([active, panelId, panelBodies]) => {
    combineLatest([tabBody$, this.bodies$]).pipe(takeUntil(this.destroy$))
      .subscribe(([tabBody, panelBodies]) => {
        const active = tabBody?.active
        const panelId = tabBody?.panelId
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
