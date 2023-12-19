import { AsyncPipe, NgFor } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { ConfigurationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { Observable } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { ListDrawerHeaderComponent } from '../list-drawer-header/list-drawer-header.component';

@Component({
  selector: 'gv-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss'],
  standalone: true,
  imports: [ListDrawerHeaderComponent, MatExpansionModule, NgFor, MatListModule, AsyncPipe]
})
export class SettingsListComponent {

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // used to creat list of controlled vocabularies
  typeClasses$: Observable<{ label: string, pkClass: number }[]>

  categories$: Observable<any>;

  constructor(
    private p: ActiveProjectService,
    private state: StateFacade,
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
    this.state.ui.activeProject.addTab({
      active: true,
      component: 'ontome-profiles-settings',
      icon: 'settings',
      pathSegment: 'ontomeProfilesSettings'
    })
  }

  openClassesSettings() {
    this.state.ui.activeProject.addTab({
      active: true,
      component: 'classes-settings',
      icon: 'settings',
      pathSegment: 'classesSettings'
    })
  }

  openContrVocabSettings(pkClass) {
    this.state.ui.activeProject.addTab({
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
