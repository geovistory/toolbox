import { Component, OnInit, Input } from '@angular/core';
import { PersistentItemVersion } from '../shared/sdk/models/PersistentItemVersion';
import { InformationLanguage } from '../shared/sdk/models/InformationLanguage';
import { Appellation } from '../shared/sdk/models/Appellation';

export enum PeItStates {
  view = "view",
  viewVersions = "viewVersions",
  viewCommunity = "viewCommunity",
  edit = "edit",
  select = "select"
}

@Component({
  selector: 'gv-pe-it',
  templateUrl: './pe-it.component.html',
  styleUrls: ['./pe-it.component.scss']
})
export class PeItComponent implements OnInit {


  /**
  * Inputs
  */

  @Input() pkEntity:number;
  @Input() appellation:Appellation;
  @Input() language:InformationLanguage;

  /**
  * Properties
  */
  state:PeItStates;

  constructor(
  ) { }


  /**
  * Methods
  */

  ngOnInit() {
  }

  get isAppellation() {
    return (this.appellation.pk_entity);
  }

  get isLanguage() {
    return (this.language.pk_entity);
  }

  get peItPreviewNeeded() {
    return !(this.appellation.pk_entity || this.language.pk_entity);
  }


  setState(state:string){
    this.state = PeItStates[state];
  }


}
