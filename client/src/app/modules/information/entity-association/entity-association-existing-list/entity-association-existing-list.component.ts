import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IAppState, SubstoreComponent } from 'app/core';
import { EntityAssociationDetail } from 'app/core/state/models/entity-association-detail';
import { RootEpics } from 'app/core/store/epics';
import { Observable, Subject } from 'rxjs';
import { EntityAssociationAPIActions } from '../api/entity-association.actions';
import { EntityAssociationAPIEpics } from '../api/entity-association.epics';
import { entityAssociationReducer } from '../api/entity-association.reducer';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: entityAssociationReducer
})
@Component({
  selector: 'gv-entity-association-existing-list',
  templateUrl: './entity-association-existing-list.component.html',
  styleUrls: ['./entity-association-existing-list.component.css']
})
export class EntityAssociationExistingListComponent extends EntityAssociationAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<EntityAssociationDetail>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;

  constructor(
    protected rootEpics: RootEpics,
    private epics: EntityAssociationAPIEpics,
    public ngRedux: NgRedux<IAppState>
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, entityAssociationReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
