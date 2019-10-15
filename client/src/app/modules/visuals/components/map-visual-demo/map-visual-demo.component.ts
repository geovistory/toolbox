import { Component, OnInit } from '@angular/core';
import { MapVisualSettings } from '../map-settings/map-settings.component';
import { of, BehaviorSubject } from 'rxjs';



const fiveRows = [
  { 'Entity': { 'pk_entity': 81921, 'time_span': { 'p81a': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2446067 }, 'p81b': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2447893 } }, 'type_label': null, 'class_label': 'Membership', 'entity_type': 'teEn', 'entity_label': 'Université d\'Angers' }, 'Entity Label': 'Université d\'Angers', 'Class Label': 'Membership', 'Type Label': null, 'Place of University': [{ 'pk_entity': 81809, 'presences': [{ 'was_at': { 'lat': 47.468889, 'long': -0.531389 }, 'fk_class': 84, 'pk_entity': 81824, 'time_span': { 'p81a': { 'calendar': 'julian', 'duration': '1 year', 'julianDay': 1684899 } }, 'fk_project': 27 }], 'time_span': null, 'type_label': 'Stadt', 'class_label': 'Geographical Place', 'entity_type': 'peIt', 'entity_label': 'Angers' }] },
  { 'Entity': { 'pk_entity': 82077, 'time_span': { 'p81a': { 'calendar': 'julian', 'duration': '1 day', 'julianDay': 2323822 }, 'p81b': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2329190 } }, 'type_label': null, 'class_label': 'Membership', 'entity_type': 'teEn', 'entity_label': 'Université d\'Angers' }, 'Entity Label': 'Université d\'Angers', 'Class Label': 'Membership', 'Type Label': null, 'Place of University': [{ 'pk_entity': 81809, 'presences': [{ 'was_at': { 'lat': 47.468889, 'long': -0.531389 }, 'fk_class': 84, 'pk_entity': 81824, 'time_span': { 'p81a': { 'calendar': 'julian', 'duration': '1 year', 'julianDay': 1684899 } }, 'fk_project': 27 }], 'time_span': null, 'type_label': 'Stadt', 'class_label': 'Geographical Place', 'entity_type': 'peIt', 'entity_label': 'Angers' }] },
  { 'Entity': { 'pk_entity': 82282, 'time_span': { 'p81a': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2429630 }, 'p81b': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2433283 } }, 'type_label': null, 'class_label': 'Membership', 'entity_type': 'teEn', 'entity_label': 'Université d\'Angers' }, 'Entity Label': 'Université d\'Angers', 'Class Label': 'Membership', 'Type Label': null, 'Place of University': [{ 'pk_entity': 81809, 'presences': [{ 'was_at': { 'lat': 47.468889, 'long': -0.531389 }, 'fk_class': 84, 'pk_entity': 81824, 'time_span': { 'p81a': { 'calendar': 'julian', 'duration': '1 year', 'julianDay': 1684899 } }, 'fk_project': 27 }], 'time_span': null, 'type_label': 'Stadt', 'class_label': 'Geographical Place', 'entity_type': 'peIt', 'entity_label': 'Angers' }] },
  { 'Entity': { 'pk_entity': 82491, 'time_span': { 'p82a': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2444240 }, 'p82b': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2459216 } }, 'type_label': null, 'class_label': 'Membership', 'entity_type': 'teEn', 'entity_label': 'université Paris Ouest Nanterre La Défense' }, 'Entity Label': 'université Paris Ouest Nanterre La Défense', 'Class Label': 'Membership', 'Type Label': null, 'Place of University': [] },
  { 'Entity': { 'pk_entity': 82522, 'time_span': { 'p81a': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2415021 }, 'p81b': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2416847 } }, 'type_label': null, 'class_label': 'Membership', 'entity_type': 'teEn', 'entity_label': 'Université Sorbonne' }, 'Entity Label': 'Université Sorbonne', 'Class Label': 'Membership', 'Type Label': null, 'Place of University': [] },
]


@Component({
  selector: 'gv-map-visual-demo',
  templateUrl: './map-visual-demo.component.html',
  styleUrls: ['./map-visual-demo.component.scss']
})
export class MapVisualDemoComponent implements OnInit {

  queryPk = 633
  queryVersion = 1
  settingsTemporal: MapVisualSettings = {
    queryLayers: [{ 'color': '#EE1690', 'geoCol': 'Place of University', 'queryPk': this.queryPk, 'temporalCol': 'Entity', 'queryVersion': this.queryVersion, 'entityPreviewCol': 'Entity' }],
    backgroundLayer: {}
  }

  settingsNoTemporal: MapVisualSettings = {
    queryLayers: [{ 'color': '#EE1690', 'geoCol': 'Place of University', 'queryPk': this.queryPk, 'temporalCol': null, 'queryVersion': this.queryVersion, 'entityPreviewCol': 'Entity' }],

    backgroundLayer: {}
  }

  queryRes$ = new BehaviorSubject(undefined)
  settings$ = new BehaviorSubject(undefined)

  get key() {
    return `${this.queryPk}_${this.queryVersion}`
  }

  constructor() { }

  ngOnInit() {
    this.settings$.next(this.settingsTemporal)
  }

  set5() {
    this.queryRes$.next(this.createQueryRes(fiveRows))
  }
  add1000() {
    let rows = this.getRows(this.queryRes$.value);
    for (let i = 0; i < 200; i++) {
      rows = [...rows, ...fiveRows]
    }
    this.queryRes$.next(this.createQueryRes(rows))
  }
  add10000() {
    let rows = this.getRows(this.queryRes$.value);
    for (let i = 0; i < 2000; i++) {
      rows = [...rows, ...fiveRows]
    }
    this.queryRes$.next(this.createQueryRes(rows))
  }
  add100000() {
    let rows = this.getRows(this.queryRes$.value);
    for (let i = 0; i < 20000; i++) {
      rows = [...rows, ...fiveRows]
    }
    this.queryRes$.next(this.createQueryRes(rows))
  }
  setSettingsTemporal() {
    this.settings$.next(this.settingsTemporal)
  }
  setSettingsNoTemporal() {
    this.settings$.next(this.settingsNoTemporal)
  }

  createQueryRes(rows) {
    return { [this.key]: rows }
  }

  getRows(queryRes) {
    return queryRes[this.key]
  }

}

