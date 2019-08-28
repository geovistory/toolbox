import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlatTreeControl } from '../../../../../../node_modules/@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '../../../../../../node_modules/@angular/material';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';
import { Observable, combineLatest, Subject } from '../../../../../../node_modules/rxjs';
import { switchMapOr, sortAbc, ActiveProjectService } from '../../../../core';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { InformationBasicPipesService } from '../../new-services/information-basic-pipes.service';
import { ClassAndTypePk } from '../../containers/class-and-type-selector/api/class-and-type-selector.models';
import { map, takeUntil, switchMap, tap } from '../../../../../../node_modules/rxjs/operators';
import { sort } from 'ramda';

export interface ClassAndTypeNode {
  label: string;
  data: ClassAndTypePk
  children?: ClassAndTypeNode[];
}


const TREE_DATA: ClassAndTypeNode[] = [
  {
    label: 'Fruit',
    data: {
      pkClass: 1,
      pkType: null
    },
    children: [
      {
        label: 'Apple',
        data: {
          pkClass: 1,
          pkType: null
        },
      },
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  label: string;
  data: ClassAndTypePk
  level: number;
}

@Component({
  selector: 'gv-classes-and-types-select',
  templateUrl: './classes-and-types-select.component.html',
  styleUrls: ['./classes-and-types-select.component.scss']
})
export class ClassesAndTypesSelectComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  // On user select class or type
  @Input() enabledIn: 'entities' | 'sources';
  @Output() select = new EventEmitter<ClassAndTypePk>();

  private _transformer = (node: ClassAndTypeNode, level: number): ExampleFlatNode => {
    return {
      expandable: !!node.children && node.children.length > 0,
      label: node.label,
      data: node.data,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  data$: Observable<ClassAndTypeNode[]>

  constructor(
    private c: ConfigurationPipesService,
    private i: InformationPipesService,
    private b: InformationBasicPipesService

  ) { }

  ngOnInit() {
    if (!this.enabledIn) throw 'You must provide enabledIn input';

    this.data$ = this.i.pipeClassesAndTypes(this.enabledIn)

    this.data$.pipe(takeUntil(this.destroy$)).subscribe(d => {
      this.dataSource.data = d;
      this.treeControl.expandAll()
    })
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onSelect(n: ClassAndTypeNode) {
    this.select.emit(n.data)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
