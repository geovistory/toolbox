import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActiveProjectService, SysConfig } from 'app/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { FieldDefinition } from './properties-tree.models';
import { PropertiesTreeService } from './properties-tree.service';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';

@Component({
  selector: 'gv-properties-tree',
  templateUrl: './properties-tree.component.html',
  styleUrls: ['./properties-tree.component.scss'],
  providers: [
    PropertiesTreeService
  ]
})
export class PropertiesTreeComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @HostBinding('class.mat-typography') true;

  @Input() pkEntity$: Observable<number>
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  // @Input() appContext: number;
  @Input() readonly$ = new BehaviorSubject(false);

  generalTree$: Observable<FieldDefinition[]>
  generalTreeControl = new NestedTreeControl<FieldDefinition>(node => ([]));
  generalDataSource = new MatTreeNestedDataSource<FieldDefinition>();
  generalShowEmptyFields = false;

  specificTree$: Observable<FieldDefinition[]>
  specificTreeControl = new NestedTreeControl<FieldDefinition>(node => ([]));
  specificDataSource = new MatTreeNestedDataSource<FieldDefinition>();
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

        this.generalTree$ = this.c.pipeDefaultFieldDefinitions(pkClass);
        this.generalTree$.pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.generalDataSource.data = data;
        })

        this.specificTree$ = this.c.pipeSpecificFieldDefinitions(pkClass);
        this.specificTree$.pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.specificDataSource.data = data;
        })
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
