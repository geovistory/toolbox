import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, ConfigurationPipesService, Field, InformationBasicPipesService } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { TabLayout } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'gv-text-detail2',
  templateUrl: './text-detail2.component.html',
  styleUrls: ['./text-detail2.component.scss']
})
export class TextDetail2Component implements OnInit {
  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // path to the substore
  @Input() tabId: string;
  @Input() pkEntity: number;
  @Output() close = new EventEmitter<void>();

  t: TabLayout;
  readonly$ = new BehaviorSubject(false)
  showOntoInfo$ = new BehaviorSubject(false)

  scope$: Observable<GvFieldPageScope>
  fkClass$: Observable<number>;
  source: GvFieldSourceEntity

  hasValueVersionField$: Observable<Field>

  constructor(
    public ref: ChangeDetectorRef,
    private ap: ActiveProjectPipesService,
    private b: InformationBasicPipesService,
    private dataService: ReduxMainService,
    private c: ConfigurationPipesService
  ) { }

  ngOnInit(): void {
    this.t = new TabLayout(this.tabId, this.ref, this.destroy$);
    this.t.setLayoutMode('both')

    this.t.setTabLoading(true)

    this.source = { fkInfo: this.pkEntity }
    this.scope$ = this.ap.pkProject$.pipe(first(), map(pkProject => ({ inProject: pkProject })));
    this.fkClass$ = this.b.pipeClassOfEntity(this.pkEntity)

    this.ap.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.dataService.loadInfResource(this.pkEntity, pkProject)
        .pipe(first(), takeUntil(this.destroy$)).subscribe(loaded => {
          this.t.setTabLoading(false)
        })

    })
    this.hasValueVersionField$ = this.fkClass$.pipe(
      switchMap(pkClass => this.c.pipeFields(pkClass).pipe(
        map(fields => fields.find(field => field.isOutgoing && field.property?.fkProperty === DfhConfig.PROPERTY_PK_HAS_VALUE_VERSION))
      ))
    )

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
