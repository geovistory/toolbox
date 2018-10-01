import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IAppState, InfPersistentItem, PeItDetail } from 'app/core';
import { SubstoreComponent } from 'app/core/state/models/substore-component';
import { RootEpics } from 'app/core/store/epics';
import { Observable, Subject } from 'rxjs';
import { TypeEditFormAPIActions } from './api/type-edit-form.actions';
import { TypeEditFormAPIEpics } from './api/type-edit-form.epics';
import { TypeEditForm } from './api/type-edit-form.models';
import { typeEditFormReducer } from './api/type-edit-form.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: typeEditFormReducer
})
@Component({
  selector: 'gv-type-edit-form',
  templateUrl: './type-edit-form.component.html',
  styleUrls: ['./type-edit-form.component.css']
})
export class TypeEditFormComponent extends TypeEditFormAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TypeEditForm>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() peItDetail$: Observable<InfPersistentItem>;

  // the state object of the child components
  peItDetail: PeItDetail;

  constructor(
    protected rootEpics: RootEpics,
    private epics: TypeEditFormAPIEpics,
    protected ngRedux: NgRedux<IAppState>
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, typeEditFormReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
    // this.peIt$.pipe(first(p => !(!p)), takeUntil(this.destroy$)).subscribe(peIt => {
    //   this.peItDetail = this.peItDetailService.createState({}, peIt, this.ngRedux.getState().activeProject.crm)
    // })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
