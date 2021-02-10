import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InformationPipesService } from '../../../../core/redux-queries/services/information-pipes.service';
import { ClassAndTypePk } from '../add-or-create-entity-dialog/add-or-create-entity-dialog.component';


export interface ClassAndTypeNode {
  label: string;
  data: ClassAndTypePk
  children?: ClassAndTypeNode[];
}


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
export class ClassesAndTypesSelectComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  // On user select class or type
  @Input() enabledIn: 'entities' | 'sources';
  @Output() select = new EventEmitter<ClassAndTypePk>();


  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    (node: ClassAndTypeNode, level: number): ExampleFlatNode => {
      return {
        expandable: !!node.children && node.children.length > 0,
        label: node.label,
        data: node.data,
        level: level,
      };
    }, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  data$: Observable<ClassAndTypeNode[]>

  constructor(
    private i: InformationPipesService,
  ) { }

  // private _transformer =

  ngOnInit() {
    if (!this.enabledIn) throw new Error('You must provide enabledIn input');

    this.data$ = this.i.pipeClassesAndTypes(this.enabledIn)

    this.data$.pipe(takeUntil(this.destroy$)).subscribe(d => {
      this.dataSource.data = d;
      // this.treeControl.expandAll()
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
