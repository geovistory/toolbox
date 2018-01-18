import { Component, OnInit, Input } from '@angular/core';
import { PeItComponent } from '../pe-it/pe-it.component';
import { InformationLanguage } from '../shared/sdk/models/InformationLanguage';

@Component({
  selector: 'gv-pe-it-language',
  templateUrl: './pe-it-language.component.html',
  styleUrls: ['./pe-it-language.component.scss']
})
export class PeItLanguageComponent  extends PeItComponent implements OnInit {


  /**
  * Inputs
  */

  // the language
  @Input() language:InformationLanguage;
  @Input() state;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
