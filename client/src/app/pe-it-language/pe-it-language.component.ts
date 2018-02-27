import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InfLanguage } from '../shared/sdk/models/InfLanguage';
import { InfEntityProjectRel } from '../shared/sdk/models/InfEntityProjectRel';
import { ActiveProjectService } from '../shared/services/active-project.service';

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
  @Input() language:InfLanguage;
  @Input() peItLangState:string;

  /**
  * Outputs
  */
  @Output() readyToCreate: EventEmitter<InfLanguage> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<InfLanguage> = new EventEmitter();


  /**
  * Properties
  */

  // for add-pe-it state the language to add to project
  langToAdd:InfLanguage;

  constructor(
    private activeProjectService: ActiveProjectService,
  ) {
  }

  ngOnInit() {
    if (this.peItLangState === 'add-pe-it') {

      //emit it
      this.readyToAdd.emit(this.language);

    }

    this.readyToAdd.emit(this.language);

  }


  languageChange(language:InfLanguage){
    const lang = new InfLanguage(language);

    if(lang && lang.pk_entity){
      this.readyToCreate.emit(lang);
    }
    else {
      this.notReadyToCreate.emit();
    }
  }

}
