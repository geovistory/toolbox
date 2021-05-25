import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { SdkLb3Module } from '@kleiolab/lib-sdk-lb3';
import { GvPositiveSchemaObject, SdkLb4Module, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { GvFieldPageReqMock } from 'projects/__test__/data/auto-gen/api-requests/GvFieldPageReq';
import { InfAppellationMock } from 'projects/__test__/data/auto-gen/gvDB/InfAppellationMock';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/gvDB/InfLanguageMock';
import { InfStatementMock } from 'projects/__test__/data/auto-gen/gvDB/InfStatementMock';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { MockPaginatedStatementsControllerService } from 'projects/__test__/mock-services/MockPaginatedStatementsControllerService';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { IAppState, ReduxModule } from '../../public-api';
import { subfieldIdToString } from '../_helpers/subfieldIdToString';
import { GvSchemaActions } from './schema.actions';


describe('GvSchemaActions', () => {
  let actions: GvSchemaActions;
  let ngRedux: NgRedux<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReduxModule,
        SdkLb3Module.forRoot(), // lib-sdk-lb3
        SdkLb4Module
      ],
      providers: [
        { provide: SubfieldPageControllerService, useClass: MockPaginatedStatementsControllerService }
      ]
    })
    actions = TestBed.get(GvSchemaActions);
    ngRedux = TestBed.get(NgRedux);
  });
  describe('.loadGvSchemaObject()', () => {
    it('should put parts of object into store', () => {
      const apiCall$ = new BehaviorSubject<GvPositiveSchemaObject>({
        inf: { language: [InfLanguageMock.GERMAN] }
      })
      actions.loadGvSchemaObject(apiCall$)
      const expectedLanguage = ngRedux.getState().inf.language.by_pk_entity[InfLanguageMock.GERMAN.pk_entity]
      expect(expectedLanguage.pk_entity).toEqual(InfLanguageMock.GERMAN.pk_entity)

      const expectedClass = ngRedux.getState().inf.pkEntityModelMap[18605].fkClass
      expect(expectedClass).toEqual(InfLanguageMock.GERMAN.fk_class)

    });
    it('should put klasses into store', () => {
      const apiCall$ = new BehaviorSubject<GvPositiveSchemaObject>(GvSchemaObjectMock.basicClassesAndProperties)
      actions.loadGvSchemaObject(apiCall$)
      expect(Object.keys(ngRedux.getState().dfh.klass).length).toBeGreaterThan(0);

    });
  })

  describe('.loadGvPaginationObject()', () => {
    it('should put paginated statements of subfield Appelation for language -> refers to name -> appellation ', (done) => {
      const req = GvFieldPageReqMock.appeTeEnRefersToName
      actions.loadGvPaginationObject(req)

      const q$ = ngRedux.select(['inf', 'statement', 'by_subfield_page', subfieldIdToString(req.page)])
        .pipe(
          first((p: any) => (p && !!p.rows))
        )

      q$.subscribe(
        (paginationInfo: any) => {

          // const paginationInfo = ngRedux.getState().inf
          //   .statement
          //   .by_subfield_page[subfieldIdToString(req.page)]

          expect(paginationInfo.count).toEqual(1)
          expect(paginationInfo.loading['0_7']).toEqual(false)
          expect(paginationInfo.rows[0]).toEqual(InfStatementMock.NAME_1_TO_APPE.pk_entity)

          const appellation = ngRedux.getState().inf.appellation.by_pk_entity[InfAppellationMock.JACK_THE_FOO.pk_entity]
          expect(appellation.fk_class).toEqual(InfAppellationMock.JACK_THE_FOO.fk_class)
        },
        () => { },
        done
      )
    });
  })

});
