import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SysConfig } from "@kleiolab/lib-config";
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project/active-project.service";
import { ConfigurationPipesService } from "@kleiolab/lib-queries";
import { map, switchMap } from 'rxjs/operators';
import { ActiveProjectPipesService } from "@kleiolab/lib-queries";

@Component({
  selector: 'gv-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  @Input() fkProject: number

  @Input() fkClass: number
  @Input() fkProperty: number
  @Input() fkPropertyDomain: number
  @Input() fkPropertyRange: number

  labels$: Observable<{
    ofProjectInProjectLang: string,
    ofDefaultProjectInProjectLang: string,
    ofDefaultProjectInEnglish: string,
    ofOntoMeInProjectLang: string,
    ofOntoMeInEnglish: string,
  }>

  displayLabel$: Observable<string>

  languageLabel$: Observable<string>
  languageIsEnglish$: Observable<boolean>

  labelSysType = SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL;

  constructor(
    private c: ConfigurationPipesService,
    private a: ActiveProjectPipesService,
  ) {
  }

  ngOnInit() {
    this.languageIsEnglish$ = this.a.pipeActiveDefaultLanguage().pipe(
      map(lang => lang.pk_entity === 18889)
    )
    this.languageLabel$ = this.a.pipeActiveDefaultLanguage().pipe(
      map(lang => lang.notes)
    )
    const textProperties$ = this.a.pipeActiveDefaultLanguage().pipe(
      switchMap(language => this.c.pipeLabels({
        pkClass: this.fkClass,
        fkProperty: this.fkProperty,
        fkPropertyDomain: this.fkPropertyDomain,
        fkPropertyRange: this.fkPropertyRange,
        fkProject: this.fkProject,
        language,
        type: 'label'
      }))
    )
    this.labels$ = textProperties$.pipe(
      map((labels) => {
        return {
          ofProjectInProjectLang: labels[0] ? labels[0].text : null,
          ofDefaultProjectInProjectLang: labels[1] ? labels[1].text : null,
          ofDefaultProjectInEnglish: labels[2] ? labels[2].text : null,
          ofOntoMeInProjectLang: labels[3] ? labels[3].text : null,
          ofOntoMeInEnglish: labels[4] ? labels[4].text : null,
        }
      })
    )
    this.displayLabel$ = textProperties$.pipe(
      map(labels => (labels.find(l => !!l) || { text: '' }).text)
    )
  }

}
