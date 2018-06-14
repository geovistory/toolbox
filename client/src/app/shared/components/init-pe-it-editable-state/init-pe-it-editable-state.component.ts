import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PeItDetail } from 'app/modules/information2/information.models';
import { StateCreatorService, StateSettings } from 'app/modules/information2/shared/state-creator.service';

@Component({
  selector: 'gv-init-pe-it-editable-state',
  templateUrl: './init-pe-it-editable-state.component.html',
  styleUrls: ['./init-pe-it-editable-state.component.scss']
})
export class InitPeItEditableStateComponent implements OnInit {

  // editable or select
  @Input() pkProject: number;
  @Input() pkEntity: number;
  
  // create
  @Input() fkClass: number;
  @Input() label: string;

  @Input() settings: StateSettings;
  @Output() stateCreated: EventEmitter<PeItDetail> = new EventEmitter();
  

  constructor(private stateCreator: StateCreatorService) { }

  ngOnInit() {

    if (this.settings.isCreateMode) {
      this.stateCreator.initializePeItToCreate(this.fkClass, 'Max').subscribe(peItDetail => {
        this.stateCreated.emit(peItDetail);
      })

    }
    else {
      this.stateCreator.initializePeItState(this.pkEntity, this.pkProject, this.settings).subscribe(peItDetail => {
        this.stateCreated.emit(peItDetail);
      })
    }

  }
}
