import { Component, OnInit, Input } from '@angular/core';

import { Appellation } from '../shared/sdk/models/Appellation';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';


@Component({
  selector: 'gv-pe-it-appellation',
  templateUrl: './pe-it-appellation.component.html',
  styleUrls: ['./pe-it-appellation.component.scss']
})
export class PeItAppellationComponent implements OnInit {


  /**
  * Inputs
  */
  @Input() appellation:Appellation;


  /**
  * Properties
  */

  // TODO temporary
  appellationLabelString:string;

  public appeState = {
    state: 'view'
  };


  constructor() {
  }

  ngOnInit() {
    this.appeState.state = 'edit';
    this.appellationLabelString = new AppellationLabel(this.appellation.appellation_label).getString();
  }



  edit(){
    this.appeState.state = 'asda';
    console.log(this.appeState)
  }


}
