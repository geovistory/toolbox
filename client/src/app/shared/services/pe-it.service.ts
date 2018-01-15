import { Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import { PersistentItemVersionApi } from '../sdk/services/custom/PersistentItemVersion';
import { PersistentItemVersion } from '../sdk/models/PersistentItemVersion';
import { TemporalEntity } from '../sdk/models/TemporalEntity';
import { Appellation } from '../sdk/models/Appellation';
import { InformationLanguage } from '../sdk/models/InformationLanguage';
import { TemporalEntityApi } from '../sdk/services/custom/TemporalEntity';
import { AppellationApi } from '../sdk/services/custom/Appellation';
import { InformationRoleApi } from '../sdk/services/custom/InformationRole';
import { InformationRole } from '../sdk/models/InformationRole';
import { InformationLanguageApi } from '../sdk/services/custom/InformationLanguage';


@Injectable()
export class PeItService {

  constructor(
    private persistentItemApi: PersistentItemVersionApi,
    private temporalEntityApi: TemporalEntityApi,
    private appellationApi: AppellationApi,
    private roleApi: InformationRoleApi,
    private languageApi: InformationLanguageApi
  ){

  }

  createPeItWithAppe(
    projectId?:number,
    peIt?:PersistentItemVersion,
    teEnt?:TemporalEntity,
    appe?:Appellation,
    lang?:InformationLanguage) {

      projectId=26;

      // create PeIt
      peIt = new PersistentItemVersion();
      peIt.fk_class = 'E21';

      // create TeEnt
      teEnt = new TemporalEntity();
      teEnt.fk_class = 'F52';

      // create Appe
      appe = new Appellation();
      appe.fk_class = 'E82';
      appe.appellation_label = {
        "tokens": [
          {
            "id": 0,
            "string": "David",
            "typeId": 1,
            "isSeparator": false
          },
          {
            "id": 1,
            "string": " ",
            "isSeparator": true
          },
          {
            "id": 2,
            "string": "Meier",
            "typeId": 3,
            "isSeparator": false
          }
        ],
        "latestTokenId": 4
      };

      // create Lang

      Observable.combineLatest(
        this.createPeIt(projectId, peIt),
        this.createTeEnt(projectId, teEnt),
        this.createAppe(projectId, appe),
        this.findLangByIso6392t('deu')
      )
      .subscribe(([newPeIt, newTeEnt, newAppe, returnedLang]) => {


        // prepare Role PeIt <> TeEnt

        let roleR63 = new InformationRole({
          fk_property: 'R63',
          fk_entity: newPeIt[0].pk_entity,
          fk_temporal_entity: newTeEnt[0].pk_entity
        });

        // prepare Role Appe <> TeEnt

        let roleR64 = new InformationRole({
          fk_property: 'R64',
          fk_entity: newAppe[0].pk_entity,
          fk_temporal_entity: newTeEnt[0].pk_entity
        });


        // prepare Role Lang <> TeEnt

        let roleR61 = new InformationRole({
          fk_property: 'R61',
          fk_entity: new InformationLanguage(returnedLang[0]).pk_entity,
          fk_temporal_entity: newTeEnt[0].pk_entity
        });

        Observable.combineLatest(
          this.createRole(projectId, roleR63),
          this.createRole(projectId, roleR64),
          this.createRole(projectId, roleR61)
        )
        .subscribe(
          ([r63,r64,r61]) => {
            console.log(r63,r64,r61);
          })
        })




        /**
        this.onAddNewPeIt.emit();
        this.activeModal.close('Close click');
        this.loading = false;
        */

      }

      createPeIt(projectId:number, peIt:PersistentItemVersion){
        return this.persistentItemApi.findOrCreatePeIt(projectId, peIt)
      }

      createTeEnt(projectId:number, teEnt:TemporalEntity){
        return this.temporalEntityApi.findOrCreateTemporalEntity(projectId, teEnt);
      }

      createAppe(projectId:number, appe:Appellation){
        return this.appellationApi.findOrCreateAppellation(projectId, appe);
      }

      createRole(projectId:number, role:InformationRole){
        return this.roleApi.findOrCreateInformationRole(projectId, role);
      }

      findLangByIso6392t(iso6392t){
        return this.languageApi.find({
          "where": {
            "iso6392t": iso6392t
          }
        });
      }



    }
