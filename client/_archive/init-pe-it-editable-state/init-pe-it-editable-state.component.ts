import { NgRedux, ObservableStore } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IAppState, InfPersistentItem, PeItDetail } from 'app/core';
import { createPeItDetail, isCreateContext, StateSettings } from 'app/core/state/services/state-creator';
import { INIT_SANDBOX_STATE, sandboxStateReducer } from 'app/core/store/reducers';
import { Information } from 'app/modules/information/containers/entity-list/api/entity-list.models';
import { PeItService } from 'app/modules/information/shared/pe-it.service';


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
  basePath: ['sandboxState']

  constructor(
    private peItService: PeItService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {

    this.localStore = this.ngRedux.configureSubStore(['sandboxState'], sandboxStateReducer)


    if (isCreateContext(this.settings.pkUiContext)) {

      const peItDetail = createPeItDetail({}, new InfPersistentItem({ fk_class: this.fkClass }), this.ngRedux.getState().activeProject.crm, this.settings);

      this.localStore.dispatch({
        type: INIT_SANDBOX_STATE,
        payload: {
          _peIt_create_form: peItDetail
        }
      })

      this.stateCreated.emit(peItDetail);

    } else {

      this.peItService.getNestedObject(this.pkEntity, this.pkProject).subscribe(infPeIt => {

        const peItDetail = createPeItDetail({}, infPeIt, this.ngRedux.getState().activeProject.crm, this.settings);

        this.localStore.dispatch({
          type: INIT_SANDBOX_STATE,
          payload: {
            _peIt_editable: peItDetail
          }
        })

        this.stateCreated.emit(peItDetail);
      })
    }

  }


  ngOnDestroy() {

  }



}