/* eslint-disable @typescript-eslint/camelcase */
import {ProAnalysis, ColDefDefaultType} from '../../../../models';
import {PK_DEFAULT_CONFIG_PROJECT} from '../../../../warehouse/Warehouse';
import {SysConfig} from '../../../../lb3/common';
import {DfhApiClassMock} from './DfhApiClassMock';

/**
 * pk_entity prefix: 800
 */
export class ProAnalysisMock {


  static readonly TABLE_GEO_PLACES = new ProAnalysis({
    pk_entity: 8001,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_analysis_type: SysConfig.PK_ANALYSIS_TYPE__TABLE,
    analysis_definition: {
      queryDefinition: {
        columns: [
          {
            id: 'col1',
            ofRootTable: true,
            defaultType: ColDefDefaultType.entity_label,
            label: 'Geo-Places',
          }
        ],
        filter: {
          children: [],
          data: {}
        }
      }
    }
  })



  static readonly MAP_GEO_PLACES = new ProAnalysis({
    pk_entity: 8002,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_analysis_type: SysConfig.PK_ANALYSIS_TYPE__MAP_TIME_CONT,
    analysis_definition: {
      queryDefinition: {
        columns: [
          {
            id: 'col1',
            ofRootTable: true,
            defaultType: ColDefDefaultType.entity_label,
            label: 'Geo-Places',
          }
        ],
        filter: {
          children: [],
          data: {}
        }
      }
    }
  })

  static readonly TIME_BIRTHS = new ProAnalysis({
    pk_entity: 8003,
    fk_project: PK_DEFAULT_CONFIG_PROJECT,
    fk_analysis_type: SysConfig.PK_ANALYSIS_TYPE__TIME_CONT,
    analysis_definition: {
      queryDefinition: {
        columns: [
          {
            id: 'col_0',
            ofRootTable: true,
            preventGroupBy: true,
            defaultType: ColDefDefaultType.temporal_distribution
          }
        ],
        filter: {
          children: [],
          data: {
            classes: [
              DfhApiClassMock.EN_61_BIRTH.dfh_pk_class
            ]
          }
        }
      }
    }
  })


}
