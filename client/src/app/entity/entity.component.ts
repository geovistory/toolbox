import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersistentItem } from '../shared/sdk/models/PersistentItem';
import { PersistentItemApi } from '../shared/sdk/services/custom/PersistentItem';
import { PropertyPipe } from '../shared/pipes/property';
import { Appellation } from '../shared/sdk/models/Appellation';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';

@Component({
  selector: 'gv-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {

  id; // id from url parameter id, representing the pk_persistent_item
  loading;
  persistentItem:PersistentItem;

  appellationUsages:Array<TemporalEntity>=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private persistentItemApi: PersistentItemApi,
    private propertyPipe: PropertyPipe
  ) {
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loading = true;

    const filter = {
      "include": {
        "relation": "roles",
        "scope": {
          "include": {
            "relation": "temporal_entity",
            "scope": {
              "include": {
                "relation": "roles",
                "scope": {
                  "include": ["language", "appellation"]
                }
              }
            }
          }
        }
      }
    }

    this.persistentItemApi.findById(this.id, filter).subscribe(
      (persistentItem: PersistentItem) => {

        this.persistentItem = persistentItem;

        this.setAppellationUsages(this.persistentItem);

        this.loading = false;

      });
    }

    setAppellationUsages(persistentItem:PersistentItem){
      const rolesR63: Array<InformationRole> = this.persistentItem.roles.filter(role => role.fk_property === 'R63');
      this.appellationUsages = rolesR63.map(role => {return role.temporal_entity});
    }

  }


