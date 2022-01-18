import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActiveProjectPipesService, InformationBasicPipesService, InformationPipesService } from '@kleiolab/lib-queries';
import { ReduxMainService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { TabLayout } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout';
import { TruncatePipe } from 'projects/app-toolbox/src/app/shared/pipes/truncate/truncate.pipe';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { TabLayoutComponentInterface } from '../../../projects/directives/on-activate-tab.directive';




@Component({
  selector: 'gv-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements OnInit, OnDestroy, TabLayoutComponentInterface {
  destroy$ = new Subject<boolean>();
  @Input() pkEntity: number
  @Input() basePath: string[]; // path to the substore
  @Input() filterOnRow: number;
  @Output() close = new EventEmitter<void>();

  t: TabLayout;

  readonly$ = new BehaviorSubject(false)
  showOntoInfo$ = new BehaviorSubject(false)

  scope$: Observable<GvFieldPageScope>
  fkClass$: Observable<number>;
  source: GvFieldSourceEntity


  constructor(
    public ref: ChangeDetectorRef,
    private b: InformationBasicPipesService,
    private ap: ActiveProjectPipesService,
    private dataService: ReduxMainService,
    private p: ActiveProjectService,
    private i: InformationPipesService,
    private truncatePipe: TruncatePipe,
  ) { }

  ngOnInit() {
    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);
    this.t.setLayoutMode('both')
    this.t.setTabLoading(true)

    this.source = { fkInfo: this.pkEntity }
    this.scope$ = this.p.pkProject$.pipe(first(), map(pkProject => ({ inProject: pkProject })));
    this.fkClass$ = this.b.pipeClassOfEntity(this.pkEntity)

    this.ap.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.dataService.loadInfResource(this.pkEntity, pkProject)
        .pipe(first(), takeUntil(this.destroy$)).subscribe(loaded => {
          this.t.setTabLoading(false)
        })
    })
    const preview$ = this.ap.streamEntityPreview(this.pkEntity, true)
    const classLabel$ = this.i.pipeClassLabelOfEntity(this.pkEntity)
    const tabTitle$ = combineLatest(preview$, classLabel$).pipe(
      map(([preview, classLabel]) => {
        const trucatedClassLabel = this.truncatePipe.transform(classLabel, ['7']);
        return [trucatedClassLabel, preview.entity_label].filter(i => !!i).join(' - ')
      })
    )
    tabTitle$.pipe(takeUntil(this.destroy$))
      .subscribe((tabTitle) => {
        this.t.setTabTitle(tabTitle)
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
