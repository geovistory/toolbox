import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IAppState, SubstoreComponent } from 'app/core';
import { TypeDetail } from 'app/core/state/models/type-detail';
import { RootEpics } from 'app/core/store/epics';
import { Observable, Subject } from 'rxjs';
import { TypeAPIActions } from './api/type.actions';
import { TypeAPIEpics } from './api/type.epics';
import { typeReducer } from './api/type.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: typeReducer
})
@Component({
  selector: 'gv-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent extends TypeAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TypeDetail>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() label$: Observable<string>;
  @select() editing$: Observable<boolean>;

  @ViewChild('modalContent') modalContent: ElementRef;

  constructor(
    protected rootEpics: RootEpics,
    private epics: TypeAPIEpics,
    protected ngRedux: NgRedux<IAppState>
  ) {
    super()

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, typeReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
