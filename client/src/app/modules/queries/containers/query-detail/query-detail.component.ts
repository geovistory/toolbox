import { Component, OnDestroy, Input, OnInit, HostBinding } from '@angular/core';
import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, ActiveProjectService } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { QueryDetail } from './api/query-detail.models';
import { QueryDetailAPIEpics } from './api/query-detail.epics';
import { QueryDetailAPIActions } from './api/query-detail.actions';
import { queryDetailReducer } from './api/query-detail.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first, takeUntil } from 'rxjs/operators';

export type SubGroupType = 'property' | 'classAndType'
export interface FilterTreeData {
  subgroup?: SubGroupType;
  classes?: number[]
  types?: number[]
  operator?: string;
  outgoingProperties?: number[]
  ingoingProperties?: number[]
}
export class FilterTree {

  constructor(public data: FilterTreeData = {}, public children: FilterTree[] = []) {

  }
}


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: queryDetailReducer
})
@Component({
  selector: 'gv-query-detail',
  templateUrl: './query-detail.component.html',
  styleUrls: ['./query-detail.component.css']
})
export class QueryDetailComponent extends QueryDetailAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<QueryDetail>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() showRightArea$: Observable<boolean>;
  @select() items$: Observable<boolean>;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  displayedColumns: string[] = ['label', 'class', 'type', 'geburten'];


  // Query
  filterQuery = new FilterTree();

  // TODO use the sekected classes from filter
  selectedClasses$ = new BehaviorSubject([21])

  constructor(
    protected rootEpics: RootEpics,
    private epics: QueryDetailAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private _formBuilder: FormBuilder,
    public p: ActiveProjectService
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, queryDetailReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      descriptionCtrl: [''],
    });
  }

  onRun() {
    this.p.pkProject$.pipe(first(p => !!p), takeUntil(this.destroy$)).subscribe(pk => {
      this.run(pk, {
        filter: this.filterQuery,
        columns: {},
        limit: 10,
        offset: 1
      });
      this.showRightArea();
    })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
