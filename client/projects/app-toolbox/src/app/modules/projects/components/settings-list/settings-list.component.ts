import { Component, HostBinding, OnInit } from '@angular/core';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Observable } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'gv-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // used to creat list of controlled vocabularies
  typeClasses$: Observable<{ label: string, pkClass: number }[]>

  categories$: Observable<any>;

  constructor(
    private p: ActiveProjectService,
    private c: ConfigurationPipesService
  ) {

    this.typeClasses$ = this.c.pipeTypeClassesEnabledByProjectProfiles().pipe(
      switchMap(klasses => combineLatestOrEmpty(klasses
        .filter(klass => !klass.restrictedToOtherProjects)
        .map(klass => this.c.pipeClassLabel(klass.dfhClass.pk_class).pipe(
          map(label => ({
            label,
            pkClass: klass.dfhClass.pk_class
          }))
        ))))
    )

  }

  ngOnInit() {


  }

  ngAfterViewInit() {

    this.categories$ = this.typeClasses$.pipe(
      delay(0),
      map(typeClass => {
        return [
          {
            title: 'General',
            items: [
              {
                onClickFnName: 'comingSoon',
                label: 'Project Profile'
              }
            ]
          },
          {
            title: 'Ontology Settings (advanced)',
            items: [
              {
                onClickFnName: 'openOntomeProfileSettings',
                label: 'OntoMe Profiles'
              },
              {
                onClickFnName: 'openClassesSettings',
                label: 'Classes'
              }
            ]
          },
          {
            title: 'Controlled Vocabularies',
            items: typeClass.map(prop => ({
              onClickFnName: 'openContrVocabSettings',
              param: prop.pkClass,
              label: prop.label
            }))
          },
          {
            title: 'Team',
            items: [
              {
                onClickFnName: 'teamSizeAlert',
                label: 'Collaborators'
              }
            ]
          }
        ]
      })
    )
  }

  onClick(fnName: string, param) {
    this[fnName](param);
  }

  openOntomeProfileSettings() {
    this.p.addTab({
      active: true,
      component: 'ontome-profiles-settings',
      icon: 'settings',
      pathSegment: 'ontomeProfilesSettings'
    })
  }

  openClassesSettings() {
    this.p.addTab({
      active: true,
      component: 'classes-settings',
      icon: 'settings',
      pathSegment: 'classesSettings'
    })
  }

  openContrVocabSettings(pkClass) {
    this.p.addTab({
      active: true,
      component: 'contr-vocab-settings',
      icon: 'settings',
      pathSegment: 'contrVocabSettings',
      data: { pkClass }
    })
  }

  comingSoon() {
    alert('Coming soon.')
  }
  teamSizeAlert() {
    alert('If you want to add more team members to the project, please contact us: info@kleiolab.ch')
  }

}
