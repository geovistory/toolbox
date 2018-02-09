import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersistentItemVersion } from '../shared/sdk/models/PersistentItemVersion';
import { InformationLanguage } from '../shared/sdk/models/InformationLanguage';
import { Appellation } from '../shared/sdk/models/Appellation';
import { UtilitiesService } from '../shared/services/utilities.service';
import { KeyboardService } from '../shared/services/keyboard.service';
import { EntitiesToCreate } from '../shared/interfaces/entities-to-create';
import { AppellationStdBool } from '../role/role.component';

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

  @Input() pkEntity: number;
  @Input() fkClass: string;
  @Input() appellation: Appellation;
  @Input() language: InformationLanguage;
  @Input() peItState: string;

  /**
  * Outputs
  */

  @Output() readyToCreate: EventEmitter<EntitiesToCreate> = new EventEmitter;

  @Output() notReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() peItReadyToCreate: EventEmitter<PersistentItemVersion> = new EventEmitter;

  @Output() peItNotReadyToCreate: EventEmitter<void> = new EventEmitter;

  @Output() created: EventEmitter<any> = new EventEmitter;

  @Output() appeChange: EventEmitter<AppellationStdBool> = new EventEmitter;


  /**
  * Properties
  */

  // state of child components to view and edit values like e.g. appellations
  valueEntitiesState:string;

  constructor(
    private util: UtilitiesService,
    public keyboard: KeyboardService
  ) { }


  /**
  * Methods
  */

  ngOnInit() {

    this.valueEntitiesState = this.peItState;

    if (this.peItState === 'edit') {
      this.valueEntitiesState = 'view'
    }

    if (this.peItState === 'create') {

      if (this.fkClass === 'E56') {

        this.language = new InformationLanguage()

        this.language.fk_class = this.fkClass;

      }

      if (['E82', 'E41'].indexOf(this.fkClass) > -1) {

        this.appellation = new Appellation()

        this.appellation.fk_class = this.fkClass;

      }

      // if (this.fkClass === 'E52'){
      //   this.timeSpan = new TimeSpan with fk_class 
      // }
    }

  }


  /**
   * get showAppellationUI - return true if this peIt is an appellation
   *
   * @return {boolean}  true = this peIt is an appellation
   */
  get showAppellationUI(): boolean {
    return (this.util.get(this, 'appellation.fk_class'));
  }

  /**
   * get showLanguageUI - return true if this peIt is a language
   *
   * @return {boolean}  true = this peIt is a language
   */
  get showLanguageUI() {
    return (this.util.get(this, 'language.fk_class'));
  }

  /**
   * get showEntityUI - return true if this is not a "value"-entity
   *
   * @return {boolean}  true = this peIt is none of the above
   */
  get showEntityUI() {
    return !(this.showAppellationUI || this.showLanguageUI);
  }



  /**
   * Methods specific to create state
   */

  emitReadyToCreate(entity) {
    this.readyToCreate.emit(entity)
  }


  emitNotReadyToCreate(entities: EntitiesToCreate) {
    this.notReadyToCreate.emit()
  }


  emitPeItReadyToCreate(peIt: PersistentItemVersion) {
    this.peItReadyToCreate.emit(peIt)
  }


  emitPeItNotReadyToCreate(entities: EntitiesToCreate) {

    this.peItNotReadyToCreate.emit()

  }


  emitCreated(entity) {
    this.created.emit(entity)
  }

  /**
   * Methods for event bubbeling
   */

  emitAppeChange(appeStd: AppellationStdBool) {
    this.appeChange.emit(appeStd)
  }

}
