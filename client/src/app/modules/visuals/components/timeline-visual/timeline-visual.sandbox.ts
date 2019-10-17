import { sandboxOf } from 'angular-playground';
import { BehaviorSubject } from 'rxjs';
import { VisualsModule } from '../../visuals.module';
import { TimelineVisualComponent, TimelineVisualSettings } from './timeline-visual.component';
const fiveRows = [
  { 'Entity': { 'pk_entity': 81921, 'time_span': { 'p81a': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2446067 }, 'p81b': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2447893 } }, 'type_label': null, 'class_label': 'Membership', 'entity_type': 'teEn', 'entity_label': 'Université d\'Angers' }, 'Entity Label': 'Université d\'Angers', 'Class Label': 'Membership', 'Type Label': null, 'Place of University': [{ 'pk_entity': 81809, 'presences': [{ 'was_at': { 'lat': 47.468889, 'long': -0.531389 }, 'fk_class': 84, 'pk_entity': 81824, 'time_span': { 'p81a': { 'calendar': 'julian', 'duration': '1 year', 'julianDay': 1684899 } }, 'fk_project': 27 }], 'time_span': null, 'type_label': 'Stadt', 'class_label': 'Geographical Place', 'entity_type': 'peIt', 'entity_label': 'Angers' }] },
  { 'Entity': { 'pk_entity': 82077, 'time_span': { 'p81a': { 'calendar': 'julian', 'duration': '1 day', 'julianDay': 2323822 }, 'p81b': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2329190 } }, 'type_label': null, 'class_label': 'Membership', 'entity_type': 'teEn', 'entity_label': 'Université d\'Angers' }, 'Entity Label': 'Université d\'Angers', 'Class Label': 'Membership', 'Type Label': null, 'Place of University': [{ 'pk_entity': 81809, 'presences': [{ 'was_at': { 'lat': 47.468889, 'long': -0.531389 }, 'fk_class': 84, 'pk_entity': 81824, 'time_span': { 'p81a': { 'calendar': 'julian', 'duration': '1 year', 'julianDay': 1684899 } }, 'fk_project': 27 }], 'time_span': null, 'type_label': 'Stadt', 'class_label': 'Geographical Place', 'entity_type': 'peIt', 'entity_label': 'Angers' }] },
  { 'Entity': { 'pk_entity': 82282, 'time_span': { 'p81a': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2429630 }, 'p81b': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2433283 } }, 'type_label': null, 'class_label': 'Membership', 'entity_type': 'teEn', 'entity_label': 'Université d\'Angers' }, 'Entity Label': 'Université d\'Angers', 'Class Label': 'Membership', 'Type Label': null, 'Place of University': [{ 'pk_entity': 81809, 'presences': [{ 'was_at': { 'lat': 47.468889, 'long': -0.531389 }, 'fk_class': 84, 'pk_entity': 81824, 'time_span': { 'p81a': { 'calendar': 'julian', 'duration': '1 year', 'julianDay': 1684899 } }, 'fk_project': 27 }], 'time_span': null, 'type_label': 'Stadt', 'class_label': 'Geographical Place', 'entity_type': 'peIt', 'entity_label': 'Angers' }] },
  { 'Entity': { 'pk_entity': 82491, 'time_span': { 'p82a': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2444240 }, 'p82b': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2459216 } }, 'type_label': null, 'class_label': 'Membership', 'entity_type': 'teEn', 'entity_label': 'université Paris Ouest Nanterre La Défense' }, 'Entity Label': 'université Paris Ouest Nanterre La Défense', 'Class Label': 'Membership', 'Type Label': null, 'Place of University': [] },
  { 'Entity': { 'pk_entity': 82522, 'time_span': { 'p81a': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2415021 }, 'p81b': { 'calendar': 'gregorian', 'duration': '1 year', 'julianDay': 2416847 } }, 'type_label': null, 'class_label': 'Membership', 'entity_type': 'teEn', 'entity_label': 'Université Sorbonne' }, 'Entity Label': 'Université Sorbonne', 'Class Label': 'Membership', 'Type Label': null, 'Place of University': [] },
]

const queryPk = 633
const queryVersion = 1
const key = `${queryPk}_${queryVersion}`
const settingsTemporal: TimelineVisualSettings = {
  dataSets: [{
    color: '#EE1690',
    queryPk: queryPk,
    temporalCol: 'Entity',
    queryVersion: queryVersion,
  }]
}

const settingsNoTemporal: TimelineVisualSettings = {
  dataSets: [
    {
      color: '#EE1690',
      queryPk: queryPk,
      temporalCol: null,
      queryVersion: queryVersion,
    }],

}
const createQueryRes = (rows) => {
  return { [key]: rows }
}
const getRows = (queryRes) => {
  return queryRes[key]
}
const data$ = new BehaviorSubject(createQueryRes(fiveRows));
const settings$ = new BehaviorSubject<TimelineVisualSettings>(settingsTemporal)

const add1000 = () => {
  const rows = getRows(data$.value);
  let newRows = []
  for (let i = 0; i < 200; i++) {
    newRows = [...newRows, ...fiveRows]
  }
  data$.next(createQueryRes([...rows, ...newRows]))
}
const add10000 = () => {
  const rows = getRows(data$.value);
  let newRows = []
  for (let i = 0; i < 2000; i++) {
    newRows = [...newRows, ...fiveRows]
  }
  data$.next(createQueryRes([...rows, ...newRows]))
}
const add100000 = () => {
  const rows = getRows(data$.value);
  let newRows = []
  for (let i = 0; i < 20000; i++) {
    newRows = [...newRows, ...fiveRows]
  }
  data$.next(createQueryRes([...rows, ...newRows]))
}
const setSettingsTemporal = () => {
  settings$.next(settingsTemporal)
}
const setSettingsNoTemporal = () => {
  settings$.next(settingsNoTemporal)
}



export default sandboxOf(TimelineVisualComponent, {
  declareComponent: false,
  imports: [
    VisualsModule,
  ]
})
  .add('TimeLineVisual | New ', {
    context: {
      data$,
      settings$,
      add1000,
      add10000,
      add100000,
      setSettingsTemporal,
      setSettingsNoTemporal,
      cursorPos: {}
    },
    template: `
      <p style="width: 800px; height: 400px; margin: 20px; padding: 5px; border: 1px dashed red;">
          <gv-timeline-visual [data$]="data$" [settings$]="settings$" (cursorChange)="cursorPos=$event"></gv-timeline-visual>
      </p>
      <p style="margin: 20px;">
        <button (click)="add1000()">Add 1000 rows </button>
        <button (click)="add10000()">Add 10.000 rows </button>
        <button (click)="add100000()">Add 100.000 rows </button>
        <button (click)="setSettingsTemporal()">With Temporal Information</button>
        <button (click)="setSettingsNoTemporal()">No Temporal Information</button>
      </p>
      <p style="margin: 20px;">
        {{cursorPos | json}}
      </p>

      `
  })
