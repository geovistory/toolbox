import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';
import { EntityAddModalService } from '../shared/services/entity-add-modal.service';

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

  constructor(
    private entityAddModalService: EntityAddModalService
  ) { }

  ngOnInit() {
    // If we are adding a peIt and there is a search string defined
    if (this.entityAddModalService.searchString) {

      //Prefill the new appellation label with that string
      this.appellationLabel = new AppellationLabel(
        null,
        this.entityAddModalService.searchString
      );

    }
    //else the normal case
    else {
      this.appellationLabel = new AppellationLabel();
    }
  }


  onReadyToCreate(appellationLabel: AppellationLabel) {
    this.isValid = true;
    this.readyToCreate.emit(this.appellationLabel);
  }

  onNotReadyToCreate() {
    this.isValid = false;
    this.notReadyToCreate.emit();

  }

}
