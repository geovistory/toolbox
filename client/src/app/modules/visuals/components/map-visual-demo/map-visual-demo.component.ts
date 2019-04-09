import { Component, OnInit } from '@angular/core';
import { MapSettings } from '../map-settings/map-settings.component';
import { of, BehaviorSubject } from 'rxjs';



const queryRes: { [key: string]: any[] } = {
  '633_6': [
    {
      'Entity': {
        'pk_entity': 25764,
        'time_span': null,
        'type_label': null,
        'class_label': 'Person',
        'entity_type': 'peIt',
        'entity_label': 'Dieter Posch'
      },
      'Entity Label': 'Dieter Posch',
      'Class Label': 'Person',
      'Type Label': null,
      'Place of birth': [
        {
          'pk_entity': 25774,
          'presences': [
            {
              'was_at': [
                {
                  'lat': 48.20849,
                  'long': 16.37208
                }
              ],
              'fk_class': 84,
              'pk_entity': 80363,
              'time_span': null,
              'fk_project': 9
            },
            {
              'was_at': [
                {
                  'lat': 48.2,
                  'long': 16.3
                }
              ],
              'fk_class': 84,
              'pk_entity': 82315,
              'time_span': {
                'p81a': {
                  'calendar': 'julian',
                  'duration': '1 year',
                  'julianDay': 1903683
                },
                'p81b': {
                  'calendar': 'julian',
                  'duration': '1 year',
                  'julianDay': 2086308
                }
              },
              'fk_project': 9
            }
          ],
          'time_span': null,
          'type_label': 'Stadt',
          'class_label': 'Geographical Place',
          'entity_type': 'peIt',
          'entity_label': 'Wien'
        }
      ]
    },
    {
      'Entity': {
        'pk_entity': 25791,
        'time_span': null,
        'type_label': null,
        'class_label': 'Person',
        'entity_type': 'peIt',
        'entity_label': 'Kühne-Hörmann Eva'
      },
      'Entity Label': 'Kühne-Hörmann Eva',
      'Class Label': 'Person',
      'Type Label': null,
      'Place of birth': [
        {
          'pk_entity': 25774,
          'presences': [
            {
              'was_at': [
                {
                  'lat': 48.20849,
                  'long': 16.37208
                }
              ],
              'fk_class': 84,
              'pk_entity': 80363,
              'time_span': null,
              'fk_project': 9
            },
            {
              'was_at': [
                {
                  'lat': 48.2,
                  'long': 16.3
                }
              ],
              'fk_class': 84,
              'pk_entity': 82315,
              'time_span': {
                'p81a': {
                  'calendar': 'julian',
                  'duration': '1 year',
                  'julianDay': 1903683
                },
                'p81b': {
                  'calendar': 'julian',
                  'duration': '1 year',
                  'julianDay': 2086308
                }
              },
              'fk_project': 9
            }
          ],
          'time_span': null,
          'type_label': 'Stadt',
          'class_label': 'Geographical Place',
          'entity_type': 'peIt',
          'entity_label': 'Wien'
        }
      ]
    },
    {
      'Entity': {
        'pk_entity': 25972,
        'time_span': null,
        'type_label': null,
        'class_label': 'Person',
        'entity_type': 'peIt',
        'entity_label': 'Camille Mandrillon'
      },
      'Entity Label': 'Camille Mandrillon',
      'Class Label': 'Person',
      'Type Label': null,
      'Place of birth': []
    },
    {
      'Entity': {
        'pk_entity': 25997,
        'time_span': null,
        'type_label': null,
        'class_label': 'Person',
        'entity_type': 'peIt',
        'entity_label': 'Jean Ier de Bourgogne'
      },
      'Entity Label': 'Jean Ier de Bourgogne',
      'Class Label': 'Person',
      'Type Label': null,
      'Place of birth': []
    },
    {
      'Entity': {
        'pk_entity': 26004,
        'time_span': null,
        'type_label': null,
        'class_label': 'Person',
        'entity_type': 'peIt',
        'entity_label': 'Hans Bühler'
      },
      'Entity Label': 'Hans Bühler',
      'Class Label': 'Person',
      'Type Label': null,
      'Place of birth': []
    },
    {
      'Entity': {
        'pk_entity': 26335,
        'time_span': null,
        'type_label': null,
        'class_label': 'Person',
        'entity_type': 'peIt',
        'entity_label': 'Jean Daniel Abraham Davel'
      },
      'Entity Label': 'Jean Daniel Abraham Davel',
      'Class Label': 'Person',
      'Type Label': null,
      'Place of birth': []
    },
    {
      'Entity': {
        'pk_entity': 80332,
        'time_span': null,
        'type_label': null,
        'class_label': 'Person',
        'entity_type': 'peIt',
        'entity_label': 'Lars Barfoed'
      },
      'Entity Label': 'Lars Barfoed',
      'Class Label': 'Person',
      'Type Label': null,
      'Place of birth': []
    },
    {
      'Entity': {
        'pk_entity': 81710,
        'time_span': null,
        'type_label': null,
        'class_label': 'Person',
        'entity_type': 'peIt',
        'entity_label': 'Ray, Jean-Emmanuel'
      },
      'Entity Label': 'Ray, Jean-Emmanuel',
      'Class Label': 'Person',
      'Type Label': null,
      'Place of birth': [
        {
          'pk_entity': 81770,
          'presences': [
            {
              'was_at': [
                {
                  'lat': 48.853333,
                  'long': 2.348611
                }
              ],
              'fk_class': 84,
              'pk_entity': 81785,
              'time_span': {
                'p81a': {
                  'calendar': 'julian',
                  'duration': '1 year',
                  'julianDay': 1702431
                }
              },
              'fk_project': 9
            }
          ],
          'time_span': null,
          'type_label': 'Stadt',
          'class_label': 'Geographical Place',
          'entity_type': 'peIt',
          'entity_label': 'Paris'
        }
      ]
    }
  ]
}




@Component({
  selector: 'gv-map-visual-demo',
  templateUrl: './map-visual-demo.component.html',
  styleUrls: ['./map-visual-demo.component.scss']
})
export class MapVisualDemoComponent implements OnInit {

  settings: MapSettings = {
    queryLayers: [
      // {
      //   queryPk: 633,
      //   queryVersion: 6,
      //   color: '#EE1690',
      //   geoCol: 'Place of birth',
      //   entityPreviewCol: 'Entity'
      // }
      {
        queryPk: 635,
        queryVersion: 1,
        color: "#EE1690",
        geoCol: "Place of Organization",
        entityPreviewCol: "Entity"
      }
    ],
    backgroundLayer: {}
  };

  queryRes$ = new BehaviorSubject({})

  constructor() { }

  ngOnInit() {
  }

  setData() {
    this.queryRes$.next(queryRes2)
  }
}


export const queryRes2 = {
  '635_1': [
    {
      "Entity": {
        "pk_entity": 81921,
        "time_span": {
          "p81a": {
            "calendar": "gregorian",
            "duration": "1 year",
            "julianDay": 2446067
          },
          "p81b": {
            "calendar": "gregorian",
            "duration": "1 year",
            "julianDay": 2447893
          }
        },
        "type_label": null,
        "class_label": "Membership",
        "entity_type": "teEn",
        "entity_label": "Université d'Angers"
      },
      "Entity Label": "Université d'Angers",
      "Class Label": "Membership",
      "Type Label": null,
      "Place of Organization": [
        {
          "pk_entity": 81809,
          "presences": [
            {
              "was_at": [
                {
                  "lat": 47.468889,
                  "long": -0.531389
                }
              ],
              "fk_class": 84,
              "pk_entity": 81824,
              "time_span": {
                "p81a": {
                  "calendar": "julian",
                  "duration": "1 year",
                  "julianDay": 1684899
                }
              },
              "fk_project": 9
            }
          ],
          "time_span": null,
          "type_label": "Stadt",
          "class_label": "Geographical Place",
          "entity_type": "peIt",
          "entity_label": "Angers"
        }
      ]
    },
    {
      "Entity": {
        "pk_entity": 82077,
        "time_span": {
          "p81a": {
            "calendar": "julian",
            "duration": "1 day",
            "julianDay": 2323822
          },
          "p81b": {
            "calendar": "gregorian",
            "duration": "1 year",
            "julianDay": 2329190
          }
        },
        "type_label": null,
        "class_label": "Membership",
        "entity_type": "teEn",
        "entity_label": "Université d'Angers"
      },
      "Entity Label": "Université d'Angers",
      "Class Label": "Membership",
      "Type Label": null,
      "Place of Organization": [
        {
          "pk_entity": 81809,
          "presences": [
            {
              "was_at": [
                {
                  "lat": 47.468889,
                  "long": -0.531389
                }
              ],
              "fk_class": 84,
              "pk_entity": 81824,
              "time_span": {
                "p81a": {
                  "calendar": "julian",
                  "duration": "1 year",
                  "julianDay": 1684899
                }
              },
              "fk_project": 9
            }
          ],
          "time_span": null,
          "type_label": "Stadt",
          "class_label": "Geographical Place",
          "entity_type": "peIt",
          "entity_label": "Angers"
        }
      ]
    },
    {
      "Entity": {
        "pk_entity": 82282,
        "time_span": {
          "p81a": {
            "calendar": "gregorian",
            "duration": "1 year",
            "julianDay": 2429630
          },
          "p81b": {
            "calendar": "gregorian",
            "duration": "1 year",
            "julianDay": 2433283
          }
        },
        "type_label": null,
        "class_label": "Membership",
        "entity_type": "teEn",
        "entity_label": "Université d'Angers"
      },
      "Entity Label": "Université d'Angers",
      "Class Label": "Membership",
      "Type Label": null,
      "Place of Organization": [
        {
          "pk_entity": 81809,
          "presences": [
            {
              "was_at": [
                {
                  "lat": 47.468889,
                  "long": -0.531389
                }
              ],
              "fk_class": 84,
              "pk_entity": 81824,
              "time_span": {
                "p81a": {
                  "calendar": "julian",
                  "duration": "1 year",
                  "julianDay": 1684899
                }
              },
              "fk_project": 9
            }
          ],
          "time_span": null,
          "type_label": "Stadt",
          "class_label": "Geographical Place",
          "entity_type": "peIt",
          "entity_label": "Angers"
        }
      ]
    },
    {
      "Entity": {
        "pk_entity": 82344,
        "time_span": {
          "p81a": {
            "calendar": "gregorian",
            "duration": "1 day",
            "julianDay": 2431517
          },
          "p81b": {
            "calendar": "gregorian",
            "duration": "1 day",
            "julianDay": 2435424
          }
        },
        "type_label": null,
        "class_label": "Membership",
        "entity_type": "teEn",
        "entity_label": "Université d'Angers"
      },
      "Entity Label": "Université d'Angers",
      "Class Label": "Membership",
      "Type Label": null,
      "Place of Organization": [
        {
          "pk_entity": 81809,
          "presences": [
            {
              "was_at": [
                {
                  "lat": 47.468889,
                  "long": -0.531389
                }
              ],
              "fk_class": 84,
              "pk_entity": 81824,
              "time_span": {
                "p81a": {
                  "calendar": "julian",
                  "duration": "1 year",
                  "julianDay": 1684899
                }
              },
              "fk_project": 9
            }
          ],
          "time_span": null,
          "type_label": "Stadt",
          "class_label": "Geographical Place",
          "entity_type": "peIt",
          "entity_label": "Angers"
        }
      ]
    }
  ]
}