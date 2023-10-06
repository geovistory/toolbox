import { TestBed } from '@angular/core/testing';
import { GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule, createReducer } from '@ngrx/store';
import { IAppStateMock } from 'projects/__test__/data/IAppStateMock';
import { PK_DEFAULT_CONFIG_PROJECT } from 'projects/__test__/data/auto-gen/gvDB/local-model.helpers';
import { moduleImports } from 'projects/lib-queries/src/__tests__/helpers/module-imports';
import { of } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { IAppState, SchemaService } from '../lib/redux-store/public-api';

describe('Select deep nested', () => {
  let store: Store<IAppState>;
  let schemaObjServcie: SchemaService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        ...moduleImports,
        StoreModule.forRoot(createReducer(IAppStateMock.stateProject1))],

    });
    schemaObjServcie = TestBed.inject(SchemaService);
    store = TestBed.inject(Store);
  });

  it('should emit 3 changes after deep change', (done) => {
    const q$ = store.select(s => s.pro.table_config.by_fk_digital);
    q$.pipe(take(3), toArray())
      .subscribe(
        actualSequence => {
          expect(actualSequence[0]).toBe(undefined)

          expect(actualSequence[1][100093][5091].config.columns[0].fkColumn).toBe(100094)
          expect(actualSequence[1][100093][5091].config.columns[0].visible).toBe(true)

          expect(actualSequence[2][100093][5091].config.columns[0].fkColumn).toBe(100094)
          expect(actualSequence[2][100093][5091].config.columns[0].visible).toBe(false)
        },
        null,
        done);

    // seeding data
    const gvSchemaObj: GvSchemaModifier = {
      'positive': {
        'pro': {
          'table_config': [
            {
              'pk_entity': 5091,
              'fk_project': 375232,
              'account_id': 1001,
              'fk_digital': 100093,
              'config': {
                'columns': [
                  { 'fkColumn': 100094, 'visible': true },
                  { 'fkColumn': 100095, 'visible': true }
                ]
              }
            }
          ]
        },
      }, 'negative': {}
    }
    schemaObjServcie.modifyGvSchema(of(gvSchemaObj), PK_DEFAULT_CONFIG_PROJECT)


    // modiying data
    const gvSchemaObj2: GvSchemaModifier = {
      'positive': {
        'pro': {
          'table_config': [
            {
              'pk_entity': 5091,
              'fk_project': 375232,
              'account_id': 1001,
              'fk_digital': 100093,
              'config': {
                'columns': [
                  { 'fkColumn': 100094, 'visible': false },
                  { 'fkColumn': 100095, 'visible': true }
                ]
              }
            }
          ]
        },
      }, 'negative': {}
    }
    schemaObjServcie.modifyGvSchema(of(gvSchemaObj2), PK_DEFAULT_CONFIG_PROJECT)
    // console.log(JSON.stringify(ngRedux.getState().pro.dfh_profile_proj_rel.by_fk_project__enabled))
    // using pipe


  });

  it('should emit 3 changes after deep change with more data', (done) => {
    const dat = { 'column': [{ 'pk_entity': 100094, 'fk_digital': 100093, 'is_imported': true, 'fk_data_type': 3292, 'fk_namespace': 1001, 'fk_column_content_type': 3291, 'fk_column_relationship_type': 3367 }, { 'pk_entity': 100095, 'fk_digital': 100093, 'is_imported': true, 'fk_data_type': 3292, 'fk_namespace': 1001, 'fk_column_content_type': 3291, 'fk_column_relationship_type': 3367 }, { 'pk_entity': 100096, 'fk_digital': 100093, 'is_imported': true, 'fk_data_type': 3292, 'fk_namespace': 1001, 'fk_column_content_type': 3291, 'fk_column_relationship_type': 3367 }, { 'pk_entity': 100097, 'fk_digital': 100093, 'is_imported': true, 'fk_data_type': 3292, 'fk_namespace': 1001, 'fk_column_content_type': 3291, 'fk_column_relationship_type': 3367 }, { 'pk_entity': 100098, 'fk_digital': 100093, 'is_imported': true, 'fk_data_type': 3292, 'fk_namespace': 1001, 'fk_column_content_type': 3291, 'fk_column_relationship_type': 3367 }], 'text_property': [{ 'string': '1', 'fk_entity': 100094, 'pk_entity': 100099, 'quill_doc': { 'ops': [{ 'insert': '1', 'attributes': { 'charid': '1' } }, { 'insert': '\n', 'attributes': { 'blockid': '2' } }], 'latestId': 2 }, 'fk_language': 18889, 'fk_namespace': 1001, 'fk_system_type': 3295 }, { 'string': '2', 'fk_entity': 100095, 'pk_entity': 100100, 'quill_doc': { 'ops': [{ 'insert': '2', 'attributes': { 'charid': '1' } }, { 'insert': '\n', 'attributes': { 'blockid': '2' } }], 'latestId': 2 }, 'fk_language': 18889, 'fk_namespace': 1001, 'fk_system_type': 3295 }, { 'string': '3', 'fk_entity': 100096, 'pk_entity': 100101, 'quill_doc': { 'ops': [{ 'insert': '3', 'attributes': { 'charid': '1' } }, { 'insert': '\n', 'attributes': { 'blockid': '2' } }], 'latestId': 2 }, 'fk_language': 18889, 'fk_namespace': 1001, 'fk_system_type': 3295 }, { 'string': '4', 'fk_entity': 100097, 'pk_entity': 100102, 'quill_doc': { 'ops': [{ 'insert': '4', 'attributes': { 'charid': '1' } }, { 'insert': '\n', 'attributes': { 'blockid': '2' } }], 'latestId': 2 }, 'fk_language': 18889, 'fk_namespace': 1001, 'fk_system_type': 3295 }, { 'string': '5', 'fk_entity': 100098, 'pk_entity': 100103, 'quill_doc': { 'ops': [{ 'insert': '5', 'attributes': { 'charid': '1' } }, { 'insert': '\n', 'attributes': { 'blockid': '2' } }], 'latestId': 2 }, 'fk_language': 18889, 'fk_namespace': 1001, 'fk_system_type': 3295 }] }
    const q$ = store.select(s => s.pro.table_config.by_fk_digital);
    q$.pipe(take(3), toArray())
      .subscribe(
        actualSequence => {
          expect(actualSequence[0]).toBe(undefined)

          expect(actualSequence[1][100093][5091].config.columns[0].fkColumn).toBe(100094)
          expect(actualSequence[1][100093][5091].config.columns[0].visible).toBe(true)

          expect(actualSequence[2][100093][5091].config.columns[0].fkColumn).toBe(100094)
          expect(actualSequence[2][100093][5091].config.columns[0].visible).toBe(false)
        },
        null,
        done);

    // seeding data
    const gvSchemaObj: GvSchemaModifier = {
      'positive': {
        'pro': {
          'table_config': [
            {
              'pk_entity': 5091,
              'fk_project': 375232,
              'account_id': 1001,
              'fk_digital': 100093,
              'config': {
                'columns': [
                  { 'fkColumn': 100094, 'visible': true },
                  { 'fkColumn': 100095, 'visible': true }
                ]
              }
            }
          ]
        },
        dat,
      }, 'negative': {}
    }
    schemaObjServcie.modifyGvSchema(of(gvSchemaObj), PK_DEFAULT_CONFIG_PROJECT)


    // modiying data
    const gvSchemaObj2: GvSchemaModifier = {
      'positive': {
        'pro': {
          'table_config': [
            {
              'pk_entity': 5091,
              'fk_project': 375232,
              'account_id': 1001,
              'fk_digital': 100093,
              'config': {
                'columns': [
                  { 'fkColumn': 100094, 'visible': false },
                  { 'fkColumn': 100095, 'visible': true }
                ]
              }
            }
          ]
        },
        dat,
      }, 'negative': {}
    }
    schemaObjServcie.modifyGvSchema(of(gvSchemaObj2), PK_DEFAULT_CONFIG_PROJECT)


  });


})
