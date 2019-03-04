import { Component, OnInit, Input, Query, Output, EventEmitter, HostBinding } from '@angular/core';
import { of, Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { TreeNode } from 'app/shared/components/tree-checklist/tree-checklist.component';
import { FilterTree, FilterTreeData } from '../../containers/query-detail/query-detail.component';
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
  @HostBinding('class.d-flex') dflex = true;

  /**
   * The tree data
   */
  selectOptionsTree$ = of([]);

  @Input() pkClasses$: Observable<number[]>;
  @Input() qtree: FilterTree;
  @Input() showRemoveBtn = true;

  @Output() remove = new EventEmitter<void>();
  @Output() validChanged = new EventEmitter<boolean>();
  @Output() filterTreeDataChange = new EventEmitter<FilterTreeData>();

  valid = false;

  selected: TreeNode<TreeNodeData>[]
  constructor(private p: ActiveProjectService) {
  }

  ngOnInit() {

    if (this.qtree.data) {
      this.selected = [
        ...(this.qtree.data.classes || []).map(pk => new TreeNode<TreeNodeData>({
          id: 'class_' + pk,
          label: ''
        })),
        ...(this.qtree.data.types || []).map(pk => new TreeNode<TreeNodeData>({
          id: 'type_' + pk,
          label: ''
        }))
      ];
    }
    
    this.selectOptionsTree$ = this.pkClasses$.pipe(
      filter(pks => pks !== undefined),
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

  selectionChange(val: TreeNode<TreeNodeData>[]) {
    this.qtree.data = {
      classes: val.filter(v => v.data.pkClass).map(v => v.data.pkClass),
      types: val.filter(v => v.data.pkType).map(v => v.data.pkType),
    }
    this.filterTreeDataChange.emit(this.qtree.data);
    this.setValid()
  }

  setValid() {
    this.valid = [
      ...(this.qtree.data.classes || []),
    ].length > 0;
    this.validChanged.emit(this.valid)
  }


}
