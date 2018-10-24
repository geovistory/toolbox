import { Component, OnDestroy, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, InfPersistentItem, InfEntityAssociation, ClassConfig, InfEntityAssociationApi } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { entityAssociationReducer } from '../api/entity-association.reducer';
import { EntityAssociationAPIActions } from '../api/entity-association.actions';
import { EntityAssociationAPIEpics } from '../api/entity-association.epics';
import { EntityAssociationDetail } from 'app/core/state/models/entity-association-detail';
import { NgForm } from '@angular/forms';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: entityAssociationReducer
})
@Component({
  selector: 'gv-entity-association-create-or-add',
  templateUrl: './entity-association-create-or-add.component.html',
  styleUrls: ['./entity-association-create-or-add.component.css']
})
export class EntityAssociationCreateOrAddComponent extends EntityAssociationAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<EntityAssociationDetail>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() targetClassConfig$: Observable<ClassConfig>;

  // emits the nested peIt, no matter if created, added, opened or selected!
  @Output() done = new EventEmitter<InfEntityAssociation>();

  // on cancel
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('f') form: NgForm;

  constructor(
    protected rootEpics: RootEpics,
    private epics: EntityAssociationAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private eaApi: InfEntityAssociationApi
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

  onCreateNew(ea: InfEntityAssociation) {
    this.eaApi.findOrCreateInfEntityAssociation(this.ngRedux.getState().activeProject.pk_project, ea).subscribe(
      (eas) => { this.done.emit(eas[0]) }
    )
  }

  submitCreateForm() {
    if (this.form.form.valid) {
      this.onCreateNew(this.form.form.value.ea)
    }
  }


}
