import { Component, Input, OnInit } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'gv-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  @Input() fkProject: number

  @Input() fkClass: number
  @Input() fkProperty: number
  @Input() isOutgoing: boolean
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
    private state: StateFacade
  ) {
  }

  ngOnInit() {
    this.languageIsEnglish$ = this.state.data.getProjectLanguage(this.state.pkProject).pipe(
      map(lang => lang.pk_entity === 18889)
    )
    this.languageLabel$ = this.state.data.getProjectLanguage(this.state.pkProject).pipe(
      map(lang => lang.notes)
    )
    const textProperties$ = this.state.data.getProjectLanguage(this.state.pkProject).pipe(
      switchMap(language => this.c.pipeLabels({
        pkClass: this.fkClass,
        fkProperty: this.fkProperty,
        fkPropertyDomain: this.fkPropertyDomain,
        fkPropertyRange: this.fkPropertyRange,
        fkProject: this.fkProject,
        language,
        type: this.isOutgoing === false ? 'inverse_label' : 'label'
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
