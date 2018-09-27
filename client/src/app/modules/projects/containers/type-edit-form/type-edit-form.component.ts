import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SubstoreComponent } from 'app/core/models/substore-component';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { TypeEditForm } from './api/type-edit-form.models';
import { TypeEditFormAPIEpics } from './api/type-edit-form.epics';
import { TypeEditFormAPIActions } from './api/type-edit-form.actions';
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
export class TypeEditFormComponent  extends  TypeEditFormAPIActions  implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TypeEditForm>;

  // path to the substore
  @Input() basePath: string[];
  
  // select observables of substore properties
  @select() loading$: Observable<boolean>;

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
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
