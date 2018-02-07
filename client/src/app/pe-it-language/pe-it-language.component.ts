import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InformationLanguage } from '../shared/sdk/models/InformationLanguage';

@Component({
  selector: 'gv-pe-it-language',
  templateUrl: './pe-it-language.component.html',
  styleUrls: ['./pe-it-language.component.scss']
})
export class PeItLanguageComponent implements OnInit {


  /**
  * Inputs
  */

  // the language
  @Input() language:InformationLanguage;
  @Input() peItLangState:string;

  /**
  * Outputs
  */
  @Output() readyToCreate: EventEmitter<InformationLanguage> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;


  constructor() {
  }

  ngOnInit() {
  }


  languageChange(language:InformationLanguage){
    const lang = new InformationLanguage(language);

    if(lang && lang.pk_entity){
      this.readyToCreate.emit(lang);
    }
    else {
      this.notReadyToCreate.emit();
    }
  }

}
