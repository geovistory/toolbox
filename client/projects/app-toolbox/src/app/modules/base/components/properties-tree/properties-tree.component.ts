import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ConfigurationPipesService, Field } from '@kleiolab/lib-queries';
import { GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { PropertiesTreeService } from './properties-tree.service';

@Component({
  selector: 'gv-properties-tree',
  templateUrl: './properties-tree.component.html',
  styleUrls: ['./properties-tree.component.scss'],
  providers: [
    PropertiesTreeService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesTreeComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @HostBinding('class.mat-typography') true;

  @Input() source: GvFieldSourceEntity
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  // @Input() appContext: number;
  @Input() readonly$ = new BehaviorSubject(false);

  generalTree$: Observable<Field[]>
  generalTreeControl = new NestedTreeControl<Field>(node => ([]));
  generalDataSource = new MatTreeNestedDataSource<Field>();
  generalShowEmptyFields = false;

  specificTree$: Observable<Field[]>
  specificTreeControl = new NestedTreeControl<Field>(node => ([]));
  specificDataSource = new MatTreeNestedDataSource<Field>();
  specificShowEmptyFields = true;

  constructor(
    public t: PropertiesTreeService,
    public c: ConfigurationPipesService,
    public p: ActiveProjectService
  ) { }

  ngOnInit() {
    // this.appContext = this.appContext || SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;

    combineLatest(this.pkClass$).pipe(first(x => !x.includes(undefined)), takeUntil(this.destroy$))
      .subscribe(([pkClass]) => {

        this.generalTree$ = this.c.pipeBasicFieldsOfClass(pkClass);
        this.generalTree$.pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.generalDataSource.data = data;
        })

        this.specificTree$ = this.c.pipeSpecificFieldOfClass(pkClass);
        this.specificTree$.pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.specificDataSource.data = data;
        })
      })
  }

  trackBy(_, f: Field) {
    return [f.sourceClass, f.property.fkProperty, f.property.fkPropertyOfProperty, f.isOutgoing].join('-')
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
