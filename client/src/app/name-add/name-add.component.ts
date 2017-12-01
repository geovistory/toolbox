import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { InformationLanguage } from '../shared/sdk/models/InformationLanguage';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { EntityProjectRel } from '../shared/sdk/models/EntityProjectRel';
import { EntityProjectRelApi } from '../shared/sdk/services/custom/EntityProjectRel';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gv-name-add',
  templateUrl: './name-add.component.html',
  styleUrls: ['./name-add.component.scss']
})
export class NameAddComponent implements OnInit {

  @Input() names:InformationRole[];
  namesNotInProject:InformationRole[];
  suggestedNames:InformationRole[];
  entProRels:EntityProjectRel[]=[];
  @Output() onCancel = new EventEmitter();
  language:InformationLanguage;
  selected:boolean=false;


  /**
  * Visibility logic
  */

  get addSelectedDisabled():boolean{
    const relsToAdd = this.entProRels.filter(epr=>epr.is_in_project);
    return relsToAdd.length ? false : true;
  }

  constructor(
    private entityProjectRelApi:EntityProjectRelApi,
    private activeProject: ActiveProjectService
  ) {
    this.language = new InformationLanguage(this.activeProject.project.default_language);
  }

  ngOnInit() {

  }

  cancel(){
    this.onCancel.emit();
  }

  updateLanguage(lang){
    if(lang){
      this.language = lang;

      // Make an array of names that are not in the project
      this.namesNotInProject = this.names.filter(name => {
        const epr = name.entity_project_rels.filter(epr=>{
          return epr.fk_project === this.activeProject.project.pk_project
        })[0];
        return !epr.is_in_project;
      });


      this.suggestedNames = this.namesNotInProject.filter(name=>{

        /** check if the language matches */
        const languageMaches = name.temporal_entity.roles.filter(role=>{
          return (
            role.fk_property === "R61"
            && role.language.pk_language === this.language.pk_language
          )
        })

        return languageMaches.length;
      })
    }
    else{
      this.language = undefined;
      this.suggestedNames = [];
    }
  }

  inProjectChange(entProRels){
    let _that = this;
    entProRels.forEach(function(newRel) {
      var existing = _that.entProRels.filter(function(v, i) {
        return (v.fk_entity === newRel.fk_entity && v.fk_project === newRel.fk_project);
      });
      if (existing.length) {
        var existingIndex = _that.entProRels.indexOf(existing[0]);
        _that.entProRels[existingIndex] = newRel;
      } else {
        _that.entProRels.push(newRel);
      }
    });

    console.log(this.entProRels);
  }

  addSelectedNames(){

    let apiCalls = [];
    this.entProRels.forEach(epr=> {
      apiCalls.push(this.entityProjectRelApi.replaceOrCreate(epr));
    })

    Observable.forkJoin(apiCalls)
    .subscribe(
      (response) => {
        this.cancel()
      },
      error => {
        this.cancel()

        // TODO: Alert
        error.error.details.messages;
      }
    )


  }

}
