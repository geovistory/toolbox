import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InfLanguage, EntityEditorService, ActiveProjectService } from 'app/core';

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
  @Input() language: InfLanguage;
  @Input() peItLangState: string;

  /**
  * Outputs
  */
  @Output() readyToCreate: EventEmitter<InfLanguage> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() readyToAdd: EventEmitter<InfLanguage> = new EventEmitter();

  @Output() cancelEdit: EventEmitter<void> = new EventEmitter;


  /**
  * Properties
  */

  // for add-pe-it state the language to add to project
  langToAdd: InfLanguage;

  // for edit state, the new selected language
  newLang: InfLanguage;

  // initial language
  initLang: InfLanguage;

  constructor(
    public entityEditor: EntityEditorService,
    private activeProjectService: ActiveProjectService,
  ) {
  }

  ngOnInit() {
    this.initLang = new InfLanguage(this.language)

    if (this.peItLangState === 'add-pe-it') {

      //emit it
      this.readyToAdd.emit(this.language);

    }

    this.readyToAdd.emit(this.language);

  }


  languageChange(language: InfLanguage) {

    if (language && language.pk_entity) {
      this.newLang = new InfLanguage(language);
      this.readyToCreate.emit(this.newLang)
    }
    else {
      this.newLang = undefined;
      this.notReadyToCreate.emit();
    }
  }

  save() {
    if (this.newLang) this.readyToCreate.emit(this.newLang);
  }

  cancel() {
    this.cancelEdit.emit();
  }

}
