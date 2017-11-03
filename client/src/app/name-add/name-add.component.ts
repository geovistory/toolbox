import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gv-name-add',
  templateUrl: './name-add.component.html',
  styleUrls: ['./name-add.component.scss']
})
export class NameAddComponent implements OnInit {

  @Output() onCancel = new EventEmitter();

  appellationUsages = [];
  selected:boolean=false;
  constructor() { }

  ngOnInit() {
  }

  cancel(){
    this.onCancel.emit();
  }

  searchSuggestions(pk_language){
    this.appellationUsages = [{
      "pk_temporal_entity": 2204,
      "pk_entity": 74894,
      "fk_class": "F52",
      "notes": "Name Use Activity",
      "roles": [{
        "pk_role": 5508,
        "fk_property": "R61",
        "fk_entity": 68018,
        "fk_temporal_entity": 2204,
        "notes": "Occured in kind of context",
        "language": {
          "pk_language": "deu",
          "pk_entity": 68018,
          "lang_type": "living",
          "scope": "individual",
          "iso6392b": "ger",
          "iso6392t": "deu",
          "iso6391": "de ",
          "notes": "German"
        }
      }, {
        "pk_role": 5509,
        "fk_property": "R64",
        "fk_entity": 74896,
        "fk_temporal_entity": 2204,
        "notes": "Used Name",
        "appellation": {
          "pk_appellation": 2204,
          "pk_entity": 74896,
          "appellation_label": {
            "tokens": [{
              "id": 0,
              "string": "Evita",
              "typeId": 1,
              "isSeparator": false
            }, {
              "id": 1,
              "string": " ",
              "isSeparator": true
            }, {
              "id": 2,
              "string": "Quinonez",
              "typeId": 3,
              "isSeparator": false
            }],
            "latestTokenId": 4
          },
          "fk_class": "E82",
          "notes": null
        }
      }, {
        "pk_role": 5510,
        "fk_property": "R63",
        "fk_entity": 74892,
        "fk_temporal_entity": 2204,
        "notes": "Named"
      }]
    }]
  }

}
