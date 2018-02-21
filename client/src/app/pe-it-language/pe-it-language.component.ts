import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InformationLanguage } from '../shared/sdk/models/InformationLanguage';
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
  @Input() language:InformationLanguage;
  @Input() peItLangState:string;

  /**
  * Outputs
  */
  @Output() readyToCreate: EventEmitter<InformationLanguage> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<InformationLanguage> = new EventEmitter();


  /**
   * Properties
   */

   // for add-pe-it state the language to add to project
   langToAdd:InformationLanguage;

  constructor(
    private activeProjectService: ActiveProjectService,
  ) {
  }

  ngOnInit() {
    if (this.peItLangState === 'add-pe-it') {

      // make a copy
      this.langToAdd = new InformationLanguage(this.language);

      // add an epr
      this.langToAdd.entity_version_project_rels = [
        new InfEntityProjectRel({
          fk_project: this.activeProjectService.project.pk_project,
          is_in_project: true,
          fk_entity_version_concat: this.language.pk_entity_version_concat
        })
      ]

      //emit it
      this.readyToAdd.emit(this.language);
    }
  
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
