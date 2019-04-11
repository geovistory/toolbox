import { Component, OnInit } from '@angular/core';
import { MapVisualSettings } from '../map-settings/map-settings.component';
import { of, BehaviorSubject } from 'rxjs';





@Component({
  selector: 'gv-map-visual-demo',
  templateUrl: './map-visual-demo.component.html',
  styleUrls: ['./map-visual-demo.component.scss']
})
export class MapVisualDemoComponent implements OnInit {

  settingsTemporal: MapVisualSettings = {
    queryLayers: [
      {
        queryPk: 635,
        queryVersion: 2,
        color: "#EE1690",
        geoCol: "Place of Organization",
        entityPreviewCol: "Entity",
        temporalCol: "Entity"
      }
    ],
    backgroundLayer: {}
  }

  settingsNoTemporal: MapVisualSettings = {
    queryLayers: [
      {
        queryPk: 635,
        queryVersion: 2,
        color: "#EE1690",
        geoCol: "Place of Organization",
        entityPreviewCol: "Entity",
        temporalCol: null
      }
    ],
    backgroundLayer: {}
  }

  queryRes$ = new BehaviorSubject(undefined)
  settings$ = new BehaviorSubject(undefined)

  constructor() { }

  ngOnInit() {
  }

  setData() {
    this.queryRes$.next(queryRes2)
    this.setSettingsTemporal()
  }
  setSettingsTemporal() {
    this.settings$.next(this.settingsTemporal)
  }
  setSettingsNoTemporal() {
    this.settings$.next(this.settingsNoTemporal)
  }
}


export const queryRes2 = {
  '635_2': [
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
      ],
      "Joinings": []
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
      ],
      "Joinings": []
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
      ],
      "Joinings": []
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
      ],
      "Joinings": []
    },
    {
      "Entity": {
        "pk_entity": 82355,
        "time_span": {
          "p81a": {
            "calendar": "gregorian",
            "duration": "1 year",
            "julianDay": 2444240
          },
          "p81b": {
            "calendar": "gregorian",
            "duration": "1 year",
            "julianDay": 2446067
          }
        },
        "type_label": null,
        "class_label": "Membership",
        "entity_type": "teEn",
        "entity_label": "Université Sorbonne"
      },
      "Entity Label": "Université Sorbonne",
      "Class Label": "Membership",
      "Type Label": null,
      "Place of Organization": [
        {
          "pk_entity": 81770,
          "presences": [
            {
              "was_at": [
                {
                  "lat": 48.853333,
                  "long": 2.348611
                }
              ],
              "fk_class": 84,
              "pk_entity": 81785,
              "time_span": {
                "p81a": {
                  "calendar": "julian",
                  "duration": "1 year",
                  "julianDay": 1702431
                }
              },
              "fk_project": 9
            }
          ],
          "time_span": null,
          "type_label": "Stadt",
          "class_label": "Geographical Place",
          "entity_type": "peIt",
          "entity_label": "Paris"
        }
      ],
      "Joinings": []
    }

  ]
}