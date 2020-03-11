import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter, Inject, HostBinding } from '@angular/core';
import { IAppState, InfPersistentItem, PeItDetail } from 'app/core';
import { SubstoreComponent } from 'app/core/state/models/substore-component';
import { RootEpics } from 'app/core/store/epics';
import { Observable, Subject } from 'rxjs';
import { TypeEditFormAPIActions } from './api/type-edit-form.actions';
import { TypeEditFormAPIEpics } from './api/type-edit-form.epics';
import { TypeEditForm } from './api/type-edit-form.models';
import { typeEditFormReducer } from './api/type-edit-form.reducer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TypeEditFormData {
  basePath: string[];
}

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

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<TypeEditForm>;


  // select observables of substore properties
  @select() peItDetail$: Observable<InfPersistentItem>;

  // the state object of the child components
  peItDetail: PeItDetail;

  // Emitted when user clicks close
  @Output() close = new EventEmitter<void>();

  constructor(
    protected rootEpics: RootEpics,
    private epics: TypeEditFormAPIEpics,
    protected ngRedux: NgRedux<IAppState>,
    public dialogRef: MatDialogRef<TypeEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TypeEditFormData
  ) {
    super()
  }

  getBasePath = () => this.data.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.data.basePath, typeEditFormReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
