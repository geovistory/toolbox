import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material';
import { SysConfig } from 'app/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { ListDefinition, ListType, FieldDefinition, ClassFieldConfig } from './properties-tree.models';
import { PropertyTreeService } from './properties-tree.service';
import { pathOr } from 'ramda';

@Component({
  selector: 'gv-properties-tree',
  templateUrl: './properties-tree.component.html',
  styleUrls: ['./properties-tree.component.scss'],
  providers: [
    PropertyTreeService
  ]
})
export class PropertiesTreeComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkEntity$: Observable<number>
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  @Input() appContext: number = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE
  @Input() readonly$ = new BehaviorSubject(false);

  tree$: Observable<FieldDefinition[]>

  treeControl = new NestedTreeControl<FieldDefinition>(node => ([]));
  dataSource = new MatTreeNestedDataSource<FieldDefinition>();

  constructor(
    public t: PropertyTreeService,
  ) {  }

  ngOnInit() {
    combineLatest(this.pkClass$, this.pkEntity$).pipe(first(x => !x.includes(undefined)), takeUntil(this.destroy$))
      .subscribe(([pkClass, pkEntity]) => {

        this.tree$ = this.t.pipeFieldDefinitions(pkClass, this.appContext)

        this.tree$.pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.dataSource.data = data;
        })

      })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
