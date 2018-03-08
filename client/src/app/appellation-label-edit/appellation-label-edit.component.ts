import { Component, OnInit, Input, Output, EventEmitter,
ChangeDetectorRef } from '@angular/core';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';

@Component({
  selector: 'gv-appellation-label-edit',
  templateUrl: './appellation-label-edit.component.html',
  styleUrls: ['./appellation-label-edit.component.scss']
})
export class AppellationLabelEditComponent implements OnInit {

  /**
  * Inputs
  */
  @Input() appellationLabel: AppellationLabel;


  /**
  * Outputs
  */

  @Output() onCancel: EventEmitter<void> = new EventEmitter();

  @Output() onChange: EventEmitter<AppellationLabel> = new EventEmitter();


  /**
   * Properties
   */
  readyToSave: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (!this.appellationLabel) {
      this.appellationLabel = new AppellationLabel();
    }else{
      this.appellationLabel = new AppellationLabel(this.appellationLabel);
    }

  }

  get notEmptyAppellation(): boolean {
    if (
      this.appellationLabel.tokens.length === 1
      && this.appellationLabel.tokens[0].string === ''
    )
      return false;
    else
      return true;
  }

  cancel() {
    this.onCancel.emit();
  }

  save() {
    this.onChange.emit(this.appellationLabel);
  }

  labelReadToSave(appeLabel: AppellationLabel) {
    this.appellationLabel = appeLabel;
    this.readyToSave = true;
    this.changeDetector.detectChanges()
  }

  labelNotReadyToSave(){
    this.readyToSave = false;
    this.changeDetector.detectChanges()
  }

}
