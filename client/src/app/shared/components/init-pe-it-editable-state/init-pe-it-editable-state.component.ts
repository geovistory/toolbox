import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PeItDetail } from 'app/modules/information2/information.models';
import { StateCreatorService } from 'app/modules/information2/shared/state-creator.service';

@Component({
  selector: 'gv-init-pe-it-editable-state',
  templateUrl: './init-pe-it-editable-state.component.html',
  styleUrls: ['./init-pe-it-editable-state.component.scss']
})
export class InitPeItEditableStateComponent implements OnInit {

  @Input() pkProject: number;
  @Input() pkEntity: number;
  @Output() stateCreated: EventEmitter<PeItDetail> = new EventEmitter();


  constructor(private stateCreator: StateCreatorService) { }

  ngOnInit() {
    this.stateCreator.initializePeItState(this.pkEntity, this.pkProject).subscribe(peItDetail => {
      this.stateCreated.emit(peItDetail);
    })
  }
}
