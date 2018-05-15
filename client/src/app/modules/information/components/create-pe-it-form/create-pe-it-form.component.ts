import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ObservableStore, NgRedux } from '@angular-redux/store';
import { IEntityCreateNewState, EntityCreateNewState } from '../entity-add-create-new/entity-add-create-new.model';
import { entityCreateNewReducer } from '../entity-add-create-new/entity-add-create-new.reducer';
import { StateCreatorService } from '../../shared/state-creator.service';
import { Project } from 'app/core';
import { EntityCreateNewActions } from '../entity-add-create-new/entity-add-create-new.actions';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { IPeItState } from '../../containers/pe-it/pe-it.model';

@Component({
  selector: 'gv-create-pe-it-form',
  templateUrl: './create-pe-it-form.component.html',
  styleUrls: ['./create-pe-it-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePeItFormComponent implements OnInit {


  readonly basePath = ['information', 'entityCreateNew']
  getBasePath = () => this.basePath
  localStore: ObservableStore<IEntityCreateNewState>;

  dfhPkClass = 1;

  formGroup: FormGroup;

  formCtrlName = 'persistent_item';

  constructor(
    private fb: FormBuilder,
    private ngRedux: NgRedux<IEntityCreateNewState>,
    private stateCreator: StateCreatorService,
    private actions: EntityCreateNewActions,
    private ref: ChangeDetectorRef
  ) {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, entityCreateNewReducer);
    
    this.formGroup = this.fb.group({})
  }

  ngOnInit() {

    // Init the state
    this.stateCreator.initializePeItToCreate(this.dfhPkClass).subscribe(peItState => {

      let wrapper = new EntityCreateNewState({
        peItState: peItState
      });

      this.localStore.dispatch(this.actions.entityCreateNewInitialized(wrapper));
    })

    // wait for the peItState and activeProject to configure the form
    Observable.combineLatest(
      this.localStore.select<IPeItState>('peItState'),
      this.ngRedux.select<Project>('activeProject')
    ).subscribe(results => {
      const peItState = results[0], project = results[1];
      if(peItState){

        this.formGroup.addControl(this.formCtrlName, new FormControl(
          peItState.peIt,
          [
            Validators.required
          ]
        ))
        
        this.ref.detectChanges();
      }

      //TEMP
      // let epr = new  InfEntityProjectRel;
      // epr.fk_project = project.pk_project;
      // StateToDataService.peItStateToPeItToRelate(peItState, epr)

    })

  }

  submit(){
    console.log(this.formGroup.value)
  }

}
