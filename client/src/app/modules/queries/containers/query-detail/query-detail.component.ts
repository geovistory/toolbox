import { Component, OnDestroy, Input, OnInit, HostBinding } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, ActiveProjectService } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { QueryDetail } from './api/query-detail.models';
import { QueryDetailAPIEpics } from './api/query-detail.epics';
import { QueryDetailAPIActions } from './api/query-detail.actions';
import { queryDetailReducer } from './api/query-detail.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first, takeUntil } from 'rxjs/operators';
import { TreeNode } from 'app/shared/components/tree-checklist/tree-checklist.component';

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

  displayedColumns: string[] = ['label', 'geburten'];






  // Query
  /**
   * The tree data
   */
  treeData = of([
    new TreeNode('Simulation', [
      new TreeNode('Factorio'),
      new TreeNode('Oxygen not included'),
    ]),
    new TreeNode('Indie', [
      new TreeNode(`Don't Starve`, [
        new TreeNode(`Region of Giants`),
        new TreeNode(`Together`),
        new TreeNode(`Shipwrecked`)
      ]),
      new TreeNode('Terraria'),
      new TreeNode('Starbound'),
      new TreeNode('Dungeon of the Endless')
    ]),
    new TreeNode('Action', [
      new TreeNode('Overcooked')
    ]),
    new TreeNode('Strategy', [
      new TreeNode('Rise to ruins')
    ]),
    new TreeNode('RPG', [
      new TreeNode('Magicka', [
        new TreeNode('Magicka 1'),
        new TreeNode('Magicka 2')
      ])
    ])
  ]);






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
      this.run(pk);
      this.showRightArea();
    })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
