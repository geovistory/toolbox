import { Component, Input } from '@angular/core';

@Component({
  selector: 'gv-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {

  @Input() loading:boolean=false;

  constructor() { }

}
