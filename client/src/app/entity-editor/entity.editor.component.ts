import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersistentItem } from '../shared/sdk/models/PersistentItem';
import { PersistentItemApi } from '../shared/sdk/services/custom/PersistentItem';
import { PropertyPipe } from '../shared/pipes/property';
import { Appellation } from '../shared/sdk/models/Appellation';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';
import { EntityEditorState } from '../shared/classes/entity-editor-state.class';


@Component({
  selector: 'gv-entity-editor',
  templateUrl: './entity.editor.component.html',
  styleUrls: ['./entity.editor.component.scss']
})
export class EntityEditorComponent implements OnInit {

  id; // id from url parameter id, representing the pk_persistent_item
  projectId;
  loading;

  persistentItem:PersistentItem;

  names:Array<InformationRole>=[]

  standardName:string;

  entityEditorState = new EntityEditorState();

  private _communityDataView:boolean;

  set communityDataView(bool:boolean){
    this._communityDataView = bool;
    if(this._communityDataView === true){
      this.entityEditorState.state = 'communityDataView';
    }
    else if (this.communityDataView === false){
      this.entityEditorState.state = 'edit';
    }
  }

  get communityDataView():boolean{
    return this._communityDataView;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private persistentItemApi: PersistentItemApi,
    private propertyPipe: PropertyPipe
  ) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.projectId = this.activatedRoute.snapshot.parent.params['id'];

    this.communityDataView = false;

    this.loading = true;

    const filter = {
      "include": {
        "relation": "roles",
        "scope": {
          "include": [
            {
              "relation": "temporal_entity",
              "scope": {
                "include": {
                  "relation": "roles",
                  "scope": {
                    "include": ["language", "appellation"]
                  }
                }
              }
            },
            {
              "relation": "entity_project_rels"
              // ,
              // "where": {
              //   "fk_project": this.projectId
              // }
            }
          ]
        }
      }
    }

    this.persistentItemApi.findById(this.id, filter).subscribe(
      (persistentItem: PersistentItem) => {

        this.persistentItem = persistentItem;

        this.setNames(this.persistentItem);

        this.loading = false;

      });
    }

    setNames(persistentItem:PersistentItem){
      this.names = this.persistentItem.roles.filter(role => role.fk_property === 'R63');
    }

    setStandardName(string){
      this.standardName = string;
    }

  }


