import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActiveProjectService, SysConfig } from 'app/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { FieldDefinition } from './properties-tree.models';
import { InformationPipesService } from '../../new-services/information-pipes.service';
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

  @Input() pkEntity$: Observable<number>
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  @Input() appContext: number = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE
  @Input() readonly$ = new BehaviorSubject(false);

  tree$: Observable<FieldDefinition[]>

  treeControl = new NestedTreeControl<FieldDefinition>(node => ([]));
  dataSource = new MatTreeNestedDataSource<FieldDefinition>();

  constructor(
    public t: PropertiesTreeService,
    public c: ConfigurationPipesService,
    public p: ActiveProjectService
  ) { }

  ngOnInit() {

    combineLatest(this.pkClass$).pipe(first(x => !x.includes(undefined)), takeUntil(this.destroy$))
      .subscribe(([pkClass]) => {

        this.tree$ = this.c.pipeFieldDefinitions(pkClass, this.appContext)

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
