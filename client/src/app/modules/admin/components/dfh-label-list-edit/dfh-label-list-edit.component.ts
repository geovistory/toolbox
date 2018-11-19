import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, DfhLabel } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { DfhLabelListEdit } from './api/dfh-label-list-edit.models';
import { DfhLabelListEditAPIEpics } from './api/dfh-label-list-edit.epics';
import { DfhLabelListEditAPIActions } from './api/dfh-label-list-edit.actions';
import { dfhLabelListEditReducer } from './api/dfh-label-list-edit.reducer';
import { indexBy } from 'ramda';
import { pkEntityKey } from 'app/core/state/services/state-creator';

export const createDfhLabelListEdit = (dfhLabels: DfhLabel[], comFkSystemType: number, infFkLanguage: number): DfhLabelListEdit => ({
  items: !dfhLabels ? undefined : indexBy(pkEntityKey, dfhLabels),
  comFkSystemType,
  infFkLanguage
})

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: dfhLabelListEditReducer
})
@Component({
  selector: 'gv-dfh-label-list-edit',
  templateUrl: './dfh-label-list-edit.component.html',
  styleUrls: ['./dfh-label-list-edit.component.css']
})
export class DfhLabelListEditComponent extends DfhLabelListEditAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<DfhLabelListEdit>;

  // path to the substore
  @Input() basePath: string[];
  @Input() dfhFkProperty: number;
  @Input() dfhFkClass: number;

  @select() infFkLanguage$: Observable<number>;
  @select() comFkSystemType$: Observable<number>;

  // select observables of substore properties
  @select() creating$: Observable<boolean>;
  @select() loading$: Observable<boolean>;
  @select() items$: Observable<{}>;

  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, item) {
    return _;
  }


  constructor(
    protected rootEpics: RootEpics,
    private epics: DfhLabelListEditAPIEpics,
    protected ngRedux: NgRedux<IAppState>
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, dfhLabelListEditReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

  }

  ngOnDestroy() {
    // this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onCreate(label: DfhLabel) {
    this.create(label);
  }

}
