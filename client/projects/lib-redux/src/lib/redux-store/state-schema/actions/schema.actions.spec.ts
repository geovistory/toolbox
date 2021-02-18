import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { SdkLb3Module } from '@kleiolab/lib-sdk-lb3';
import { GvPaginationObject, GvSchemaObject, SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { InfAppellationMock } from 'projects/lib-queries/src/__tests__/helpers/data/auto-gen/InfAppellationMock';
import { InfLanguageMock } from 'projects/lib-queries/src/__tests__/helpers/data/auto-gen/InfLanguageMock';
import { InfStatementMock } from 'projects/lib-queries/src/__tests__/helpers/data/auto-gen/InfStatementMock';
import { BehaviorSubject } from 'rxjs';
import { IAppState, ReduxModule } from '../../public-api';
import { GvSchemaActions } from './schema.actions';


describe('ReduxModule', () => {
  let actions: GvSchemaActions;
  let ngRedux: NgRedux<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReduxModule,
        SdkLb3Module.forRoot(), // lib-sdk-lb3
        SdkLb4Module
      ]
    })
    actions = TestBed.get(GvSchemaActions);
    ngRedux = TestBed.get(NgRedux);
  });
  describe('.loadGvSchemaObject()', () => {
    it('should put parts of object into store', () => {
      const apiCall$ = new BehaviorSubject<GvSchemaObject>({
        inf: { language: [InfLanguageMock.GERMAN] }
      })
      actions.loadGvSchemaObject(apiCall$)
      const expectedLanguage = ngRedux.getState().inf.language.by_pk_entity[InfLanguageMock.GERMAN.pk_entity]
      expect(expectedLanguage.pk_entity).toEqual(InfLanguageMock.GERMAN.pk_entity)
    });
  })

  describe('.loadGvPaginationObject()', () => {
    it('should put paginated statements of subfield Appelation for language -> refers to name -> appellation ', () => {
      const apiCall$ = new BehaviorSubject<GvPaginationObject>({
        count: 1,
        paginatedStatements: [
          InfStatementMock.NAME_1_TO_APPE.pk_entity
        ],
        schemas: {
          inf: {
            statement: [
              InfStatementMock.NAME_1_TO_APPE
            ],
            appellation: [
              InfAppellationMock.JACK_THE_FOO
            ]
          }
        }
      })
      actions.loadGvPaginationObject(apiCall$, {
        pkSourceEntity: InfStatementMock.NAME_1_TO_APPE.fk_subject_info,
        pkProperty: InfStatementMock.NAME_1_TO_APPE.fk_property,
        isOutgoing: true,
        fkTargetClass: InfAppellationMock.JACK_THE_FOO.fk_class,
        alternatives: false,
        limit: 7,
        offset: 0
      })
      const paginationInfo = ngRedux.getState().inf
        .statement
        .pag_by_fk_property__fk_target_class__fk_subject_info__ofProject['1113_40_4001_false']

      expect(paginationInfo.count).toEqual(1)
      expect(paginationInfo.loading['0_7']).toEqual(false)
      expect(paginationInfo.rows[0]).toEqual(InfStatementMock.NAME_1_TO_APPE.pk_entity)

      const appellation = ngRedux.getState().inf.appellation.by_pk_entity[InfAppellationMock.JACK_THE_FOO.pk_entity]
      expect(appellation.fk_class).toEqual(InfAppellationMock.JACK_THE_FOO.fk_class)
    });
  })

});
