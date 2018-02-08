import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';

@Component({
  selector: 'gv-appellation-label-editor',
  templateUrl: './appellation-label-editor.component.html',
  styleUrls: ['./appellation-label-editor.component.scss']
})
export class AppellationLabelEditorComponent implements OnInit {

  @Input() appellationLabel: AppellationLabel;

  @Output() readyToCreate: EventEmitter<AppellationLabel> = new EventEmitter();

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if(
      this.appellationLabel &&
      this.appellationLabel.tokens &&
      this.appellationLabel.tokens.length
    ){
      const lastItemIndex = (this.appellationLabel.tokens.length - 1);
      this.appellationLabel.tokens[lastItemIndex].autofocus = true;
    }
  }

  labelChange(appeLabel: AppellationLabel) {
    if(appeLabel){
      this.appellationLabel = appeLabel;

      if (
        this.appellationLabel.tokens.length === 1
        && this.appellationLabel.tokens[0].string === ''
      )
      this.notReadyToCreate.emit()
      else
      this.readyToCreate.emit(this.appellationLabel);
    }
  }
}
