import { Component, OnDestroy, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SubstoreComponent } from 'app/core/models/substore-component';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { TypeAddForm } from './api/type-add-form.models';
import { TypeAddFormAPIEpics } from './api/type-add-form.epics';
import { TypeAddFormAPIActions } from './api/type-add-form.actions';
import { typeAddFormReducer } from './api/type-add-form.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: typeAddFormReducer
})
@Component({
  selector: 'gv-type-add-form',
  templateUrl: './type-add-form.component.html',
  styleUrls: ['./type-add-form.component.css']
})
export class TypeAddFormComponent extends TypeAddFormAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TypeAddForm>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;

  // Emitted when user clicks cancel
  @Output() cancel = new EventEmitter<void>();

  // Model of the form
  model: {
    label?: string,
    description?: string
  } = {};



  constructor(
    protected rootEpics: RootEpics,
    private epics: TypeAddFormAPIEpics,
    protected ngRedux: NgRedux<IAppState>
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, typeAddFormReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
