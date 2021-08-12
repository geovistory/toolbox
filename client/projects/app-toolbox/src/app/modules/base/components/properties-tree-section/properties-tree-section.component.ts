import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ConfigurationPipesService, DisplayType, Field, SectionName } from '@kleiolab/lib-queries';
import { GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { PropertiesTreeService } from './properties-tree.service';

@Component({
  selector: 'gv-properties-tree-section',
  templateUrl: './properties-tree-section.component.html',
  styleUrls: ['./properties-tree-section.component.scss'],
  providers: [
    PropertiesTreeService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesTreeSectionComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @HostBinding('class.mat-typography') true;

  @Input() source: GvFieldSourceEntity
  @Input() pkClass$: Observable<number>
  @Input() showOntoInfo$: Observable<boolean>;
  @Input() readonly$ = new BehaviorSubject(false);
  @Input() section: SectionName;

  tree$: Observable<Field[]>
  treeControl = new NestedTreeControl<Field>(node => ([]));
  dataSource = new MatTreeNestedDataSource<Field>();
  showEmptyFields = false;

  constructor(
    public t: PropertiesTreeService,
    public c: ConfigurationPipesService,
    public p: ActiveProjectService
  ) { }
  ngOnInit() {

    combineLatest(this.pkClass$).pipe(first(x => !x.includes(undefined)), takeUntil(this.destroy$))
      .subscribe(([pkClass]) => {
        this.tree$ = this.c.pipeSection(pkClass, DisplayType.view, this.section);
        this.tree$.pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.dataSource.data = data;
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

  toPascalCase(str: string) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

}
