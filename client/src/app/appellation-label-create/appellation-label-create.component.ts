import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';

@Component({
  selector: 'gv-appellation-label-create',
  templateUrl: './appellation-label-create.component.html',
  styleUrls: ['./appellation-label-create.component.scss']
})
export class AppellationLabelCreateComponent implements OnInit {

  /**
  * Outputs
  */

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter();

  @Output() readyToCreate: EventEmitter<AppellationLabel> = new EventEmitter();


  /**
  * Properties
  */
  appellationLabel: AppellationLabel;

  isValid: boolean;

  constructor() { }

  ngOnInit() {
    this.appellationLabel = new AppellationLabel();
  }


  onReadyToCreate(appellationLabel: AppellationLabel) {
    this.isValid = true;
    this.readyToCreate.emit(this.appellationLabel);
  }

  onNotReadyToCreate(appellationLabel: AppellationLabel) {
    this.isValid = false;
    this.notReadyToCreate.emit();

  }

}
