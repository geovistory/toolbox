import { Component, OnInit, HostBinding } from '@angular/core';
import { ActiveProjectService, U } from '../../../../core';
import { Observable } from 'rxjs';
import { map, takeUntil, delay } from 'rxjs/operators';
import { HasTypePropertyReadable } from '../../../../core/state/models';
import { sortBy, compose, toLower, prop } from 'ramda';

@Component({
  selector: 'gv-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // used to creat list of controlled vocabularies
  hasTypeProps$: Observable<HasTypePropertyReadable[]>

  categories$: Observable<any>;

  constructor(private p: ActiveProjectService) {
    this.hasTypeProps$ = p.hasTypeProperties$.pipe(map(hasTypeProperties => sortBy(compose(toLower, prop('typed_class_label')))(U.objNr2Arr(hasTypeProperties))))
  }

  ngOnInit() {


  }

  ngAfterViewInit() {

    this.categories$ = this.hasTypeProps$.pipe(
      delay(0),
      map(props => {
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
            title: 'Ontology Settings',
            items: [
              {
                onClickFnName: 'openClassesSettings',
                label: 'Classes'
              }
            ]
          },
          {
            title: 'Controlled Vocabularies',
            items: props.map(prop => ({
              onClickFnName: 'openContrVocabSettings',
              param: prop.dfh_pk_property,
              label: prop.typed_class_label
            }))
          },
          {
            title: 'Team',
            items: [
              {
                onClickFnName: 'comingSoon',
                label: 'Collaborators'
              }
            ]
          }
        ]
      })
    )
  }

  onClick(fnName: string, param){
    this[fnName](param);
  }

  openClassesSettings() {
    this.p.addTab({
      active: true,
      component: 'classes-settings',
      icon: 'settings',
      pathSegment: 'classesSettings'
    })
  }

  openContrVocabSettings(pkProperty) {
    this.p.addTab({
      active: true,
      component: 'contr-vocab-settings',
      icon: 'settings',
      pathSegment: 'contrVocabSettings',
      data: { pkProperty }
    })
  }

  comingSoon() {
    alert('Coming soon.')
  }

}
