import { Component, OnInit, Input, Output, EventEmitter, HostBinding, OnDestroy } from '@angular/core';
import { of, Observable, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { TreeNodeData } from '../class-and-type-select/class-and-type-select.component';
import { FilterTree, FilterTreeData } from '../../containers/query-detail/query-detail.component';
import { ActiveProjectService } from 'app/core';
import { filter, distinct, tap, mergeMap, map, takeUntil } from 'rxjs/operators';
import { TreeNode } from 'app/shared/components/tree-checklist/tree-checklist.component';
import { PropertyOption } from '../property-select/property-select.component';
import { QueryService } from '../../services/query.service';

export interface ClassesAndTypes {
  classes: number[]
  types: number[]
}

@Component({
  selector: 'gv-class-and-type-filter',
  templateUrl: './class-and-type-filter.component.html',
  styleUrls: ['./class-and-type-filter.component.scss']
})
export class ClassAndTypeFilterComponent implements OnInit, OnDestroy {
  @HostBinding('class.d-flex') dflex = true;
  @HostBinding('class.flex-column') flexcolumn = true;
  destroy$ = new Subject<void>();

  @Input() pkClasses$: Observable<number[]>;
  @Input() qtree: FilterTree;
  @Input() showRemoveBtn = true;

  @Output() remove = new EventEmitter<void>();
  @Output() validChanged = new EventEmitter<boolean>();

  selectedClassesAndTypes$ = new BehaviorSubject<ClassesAndTypes | null>(null);

  // the propertyOptions get derived from the selectedClasses
  propertyOptions$ = new BehaviorSubject<PropertyOption[] | null>(null);

  get selectedClassesAndTypes() {
    return this.selectedClassesAndTypes$.value;
  }
  set selectedClassesAndTypes(val: ClassesAndTypes) {
    this.selectedClassesAndTypes$.next(val)
  }

  valid = false;

  selected: TreeNode<TreeNodeData>[]
  constructor(private p: ActiveProjectService, private q: QueryService) {
  }

  ngOnInit() {

    this.selectedClassesAndTypes$.pipe(
      this.q.propertiesOfClassesAndTypes(),
      takeUntil(this.destroy$)
    ).subscribe(propertyOptions => {
      this.propertyOptions$.next(propertyOptions)
    })

  }

  addChild() {
    this.qtree.children.push(new FilterTree({
      subgroup: 'property'
    }))
  }

  removeChild(i) {
    this.qtree.children.splice(i, 1)
  }

  setValid(valid) {
    this.valid = valid;
    this.validChanged.emit(this.valid)
  }

  treeDataChange(treeData: FilterTreeData) {
    this.selectedClassesAndTypes = {
      classes:  treeData.classes || [],
      types:  treeData.types || []
    };
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
