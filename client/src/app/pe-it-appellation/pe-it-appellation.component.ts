import { Component, OnInit, Input } from '@angular/core';

import { Appellation } from '../shared/sdk/models/Appellation';
import { AppellationLabel } from '../shared/classes/appellation-label/appellation-label';
import { KeyboardService } from '../shared/services/keyboard.service';


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

  // @Input()
  peItAppeState:string;

  /**
  * Properties
  */

  /*
  * transform appellation label to a string and return it
  */
  get appellationLabelString():string{
    if(this.appellation.appellation_label)
    return  new AppellationLabel(this.appellation.appellation_label).getString();
    else
    return '';
  };


  constructor(
    public keyboard:KeyboardService
  ) {
  }

  ngOnInit() {
    this.peItAppeState = this.peItAppeState ? this.peItAppeState : 'view';
  }


  startEdit(){
    this.peItAppeState = 'edit'
    console.log(this.peItAppeState)
  }


  cancelEdit(){
    this.peItAppeState = 'view'
  }

}
