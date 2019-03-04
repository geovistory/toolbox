import { Component, OnInit, Input, EventEmitter, Output, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { FilterTree, FilterTreeData } from '../../containers/query-detail/query-detail.component';
import { Observable, merge, Subject, combineLatest, zip, BehaviorSubject } from 'rxjs';
import { ClassAndTypeSelectComponent } from '../class-and-type-select/class-and-type-select.component';
import { PropertySelectComponent } from '../property-select/property-select.component';
import { OperatorSelectComponent } from '../operator-select/operator-select.component';
import { takeUntil, map, mergeMap, switchMap } from 'rxjs/operators';
import { flatten } from 'ramda';

@Component({
  selector: 'gv-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.scss']
})
export class SubgroupComponent implements OnInit, OnDestroy, AfterViewInit {
  destroy$ = new Subject();
  @ViewChildren(SubgroupComponent) subgroups: QueryList<SubgroupComponent>;
  @ViewChildren(ClassAndTypeSelectComponent) classAndTypeSelects: QueryList<ClassAndTypeSelectComponent>;
  @ViewChildren(OperatorSelectComponent) operatorSelects: QueryList<OperatorSelectComponent>;

  @Input() qtree: FilterTree;
  @Input() parentData$: Observable<FilterTreeData>;
  @Input() pkClasses$: Observable<number[]>;
  @Input() hideParentLine = false;

  @Output() remove = new EventEmitter<void>();
  @Output() merge = new EventEmitter<FilterTree>();
  @Output() validChanged = new EventEmitter<boolean>();
  valid: boolean;

  get showAddSiblingBtn(): boolean {
    return this.valid;
  }

  constructor() { }

  ngOnInit() {
    this.qtree.data = {
      operator: 'AND',
      ...this.qtree.data,
    }
    if (this.qtree.children.length === 0) {
      this.qtree.children.push(new FilterTree())
    }
  }

  ngAfterViewInit() {

    // Observe if there is some invalid child components
    zip<QueryList<SubgroupComponent>, QueryList<ClassAndTypeSelectComponent>, QueryList<OperatorSelectComponent>>
      (
        new BehaviorSubject(this.subgroups).merge(this.subgroups.changes),
        new BehaviorSubject(this.classAndTypeSelects).merge(this.classAndTypeSelects.changes),
        new BehaviorSubject(this.operatorSelects).merge(this.operatorSelects.changes)
      ).pipe(
        mergeMap(qlists => {
          const validChangedEmitters = flatten(qlists.map((qlist: QueryList<any>) => qlist.map(a => new BehaviorSubject(a.valid).merge(a.validChanged))))
          return combineLatest(validChangedEmitters as any as Observable<boolean>[])
        }),
        takeUntil(this.destroy$)
      ).subscribe(x => {
        // if one of the child components is not true (=valid), set valid to false else to true
        this.setValid((x.filter(y => y !== true).length > 0 ? false : true))
      })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }

  addSubgroup(i) {
    const childCopy = this.qtree.children[i];
    this.qtree.children[i] = new FilterTree({
      subgroup: this.qtree.data.subgroup,
      operator: 'OR'
    }, [
        childCopy,
        new FilterTree()
      ])

  }

  addSibling() {
    this.qtree.children.push(new FilterTree())
  }

  removeChild(i) {
    this.qtree.children.splice(i, 1)

    if (this.qtree.children.length === 0) this.remove.emit();

    else if (this.qtree.children.length === 1) this.merge.emit(this.qtree.children[0]);
  }

  mergeChild(index: number, child: FilterTree) {
    this.qtree.children[index] = child;
  }

  setValid(valid: boolean) {
    this.valid = valid
    this.validChanged.emit(this.valid)
  }

}
