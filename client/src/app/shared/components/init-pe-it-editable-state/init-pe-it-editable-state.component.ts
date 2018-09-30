import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {  Information } from 'app/modules/information/information.models';
import { StateCreatorService } from 'app/modules/information/shared/state-creator.service';
import { NgRedux, ObservableStore } from '@angular-redux/store';
import { IAppState, PeItDetail, StateSettings } from 'app/core';
import { Action } from 'redux';

const PE_IT_EDITABLE_INITIALIZED = 'PE_IT_EDITABLE_INITIALIZED'
const PE_IT_ADD_FORM_INITIALIZED = 'PE_IT_ADD_FORM_INITIALIZED'
const PE_IT_CREATE_FORM_INITIALIZED = 'PE_IT_CREATE_FORM_INITIALIZED'

const reducer = (state: Information = {}, a: Action): Information => {

  const action = a as any;

  switch (action.type) {
    case PE_IT_ADD_FORM_INITIALIZED:
      state = {
        _peIt_add_form: action.payload
      };
      break;

    case PE_IT_EDITABLE_INITIALIZED:
      state = {
        _peIt_editable: action.payload
      };
      break;

    case PE_IT_CREATE_FORM_INITIALIZED:
      state = {
        _peIt_create_form: action.payload
      };
      break;
  }


  return state;
};


@Component({
  selector: 'gv-init-pe-it-editable-state',
  templateUrl: './init-pe-it-editable-state.component.html',
  styleUrls: ['./init-pe-it-editable-state.component.scss']
})
export class InitPeItEditableStateComponent implements OnInit, OnDestroy {



  // editable or select
  @Input() pkProject: number;
  @Input() pkEntity: number;

  // create
  @Input() fkClass: number;
  @Input() label: string;

  @Input() settings: StateSettings;
  @Output() stateCreated: EventEmitter<PeItDetail> = new EventEmitter();

  localStore: ObservableStore<Information>;
  basePath: ['information', '']

  constructor(
    private stateCreator: StateCreatorService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {

    this.localStore = this.ngRedux.configureSubStore(this.basePath, reducer)

    if (this.settings.isCreateMode) {
      this.stateCreator.initializePeItToCreate(this.fkClass, 'Max').subscribe(peItDetail => {
        this.localStore.dispatch({
          type: PE_IT_CREATE_FORM_INITIALIZED,
          payload: peItDetail
        })

        this.stateCreated.emit(peItDetail);
      })

    }
    else {
      this.stateCreator.initializePeItState(this.pkEntity, this.pkProject, this.settings).subscribe(peItDetail => {

        if (this.settings.isAddMode)
          this.localStore.dispatch({
            type: PE_IT_ADD_FORM_INITIALIZED,
            payload: peItDetail
          })
        else
          this.localStore.dispatch({
            type: PE_IT_EDITABLE_INITIALIZED,
            payload: peItDetail
          })

        this.stateCreated.emit(peItDetail);
      })
    }

  }


  ngOnDestroy() {

  }



}
