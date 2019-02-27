import { Component, OnInit, Input, Query, Output, EventEmitter } from '@angular/core';
import { of, Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { TreeNode } from 'app/shared/components/tree-checklist/tree-checklist.component';
import { QueryTree, QueryTreeData } from '../../containers/query-detail/query-detail.component';
import { ActiveProjectService } from 'app/core';
import { map, mergeMap, filter, tap, distinct } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material';

export interface TreeNodeData {
  id: string // id of the node
  label: string
  pkClass?: number
  pkType?: number
}


@Component({
  selector: 'gv-class-and-type-select',
  templateUrl: './class-and-type-select.component.html',
  styleUrls: ['./class-and-type-select.component.scss']
})
export class ClassAndTypeSelectComponent implements OnInit {
  /**
   * The tree data
   */
  selectOptionsTree$ = of([]);
  options: TreeNode<TreeNodeData>[] = [];

  @Input() pkClasses$: Observable<number[]>;
  @Input() qtree: QueryTree;
  @Input() showRemoveBtn = true;

  @Output() remove = new EventEmitter<void>();

  data$ = new BehaviorSubject<QueryTreeData>({});

  constructor(private p: ActiveProjectService) {



  }

  ngOnInit() {
    // create
    this.pkClasses$.subscribe(pkClasses => {

    });

    // this.pkClasses$.pipe(
    //   mergeMap(pks => combineLatest(
    //     this.p.streamTypePreviewsByClass(pks),
    //     combineLatest(pks.map(pk => this.p.getClassConfig(pk)))
    //       .filter(d => d.every(x => !!x.dfh_pk_class))
    //   ))
    // ).subscribe(pkClasses => {

    // });


    this.selectOptionsTree$ = this.pkClasses$.pipe(
      distinct((pk) => pk),
      tap(pks => {
        console.log('Pks: ', pks);
      }),
      mergeMap((pks) => {
        return pks.length ?
          combineLatest(
            // get all type previews
            this.p.streamTypePreviewsByClass(pks)
              .pipe(
                tap(previews => {
                  console.log('previews: ', previews);

                })),
            // get class configs
            combineLatest(pks.map(pk => this.p.getClassConfig(pk)))
              .pipe(
                tap(classConfigs => {
                  console.log('classConfigs: ', classConfigs);
                }),
                filter(d => d.every(x => !!x.dfh_pk_class))
              )
          )
            // add type previews to class configs
            .pipe(
              map(([a, b]) => b.map(classConfig => ({
                ...classConfig,
                types: a[classConfig.dfh_pk_class] || []
              }))
              )
            ) :
          new BehaviorSubject([])
      }),
      map(classesWithTypes => classesWithTypes.map(c => new TreeNode<TreeNodeData>(
        {
          id: 'class_' + c.dfh_pk_class,
          label: c.label,
          pkClass: c.dfh_pk_class
        },
        [
          ...c.types.map(type => new TreeNode<TreeNodeData>({
            id: 'type_' + type.pk_entity,
            label: type.entity_label,
            pkType: type.pk_entity
          }))
        ]
      ))
      ),
      tap(x => {
      })

    )

  }

  trackByFn(index, item: TreeNode<TreeNodeData>) {
    return item.data.id;
  }
  optionsChange(e: TreeNode<TreeNodeData>[]) {
    this.options = e;
  }

  selectionChange(val: TreeNode<TreeNodeData>[]) {
    this.qtree.data = {
      classes: val.filter(v => v.data.pkClass).map(v => v.data.pkClass),
      types: val.filter(v => v.data.pkType).map(v => v.data.pkType),
    }
    this.data$.next(this.qtree.data);
    console.log('Selected: ', this.qtree.data);
  }

  addChild() {
    this.qtree.children.push(new QueryTree())
  }

  removeChild(i) {
    this.qtree.children.splice(i, 1)
  }

}
