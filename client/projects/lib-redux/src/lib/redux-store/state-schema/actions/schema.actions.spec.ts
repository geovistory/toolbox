import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { SdkLb3Module } from '@kleiolab/lib-sdk-lb3';
import { GvSchemaObject, PaginatedStatementsControllerService, SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { InfAppellationMock } from 'projects/__test__/data/auto-gen/InfAppellationMock';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/InfLanguageMock';
import { InfStatementMock } from 'projects/__test__/data/auto-gen/InfStatementMock';
import { GvLoadSubfieldPageReqMock } from 'projects/__test__/data/GvLoadSubfieldPageReq';
import { MockPaginatedStatementsControllerService } from 'projects/__test__/mock-services/MockPaginatedStatementsControllerService';
import { BehaviorSubject } from 'rxjs';
import { IAppState, ReduxModule } from '../../public-api';
import { createPaginateByKey } from '../_helpers/createPaginateByKey';
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
        { provide: PaginatedStatementsControllerService, useClass: MockPaginatedStatementsControllerService }
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
      const req = GvLoadSubfieldPageReqMock.appeTeEnHasAppeVt
      actions.loadGvPaginationObject(req)
      const paginationInfo = ngRedux.getState().inf
        .statement
        .by_subfield_page[createPaginateByKey(req.page)]

      expect(paginationInfo.count).toEqual(1)
      expect(paginationInfo.loading['0_7']).toEqual(false)
      expect(paginationInfo.rows[0]).toEqual(InfStatementMock.NAME_1_TO_APPE.pk_entity)

      const appellation = ngRedux.getState().inf.appellation.by_pk_entity[InfAppellationMock.JACK_THE_FOO.pk_entity]
      expect(appellation.fk_class).toEqual(InfAppellationMock.JACK_THE_FOO.fk_class)
    });
  })

});
