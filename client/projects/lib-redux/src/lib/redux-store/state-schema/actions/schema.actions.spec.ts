import { TestBed } from '@angular/core/testing';
import { GvPositiveSchemaObject, SdkLb4Module, SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { GvFieldPageReqMock } from 'projects/__test__/data/auto-gen/api-requests/GvFieldPageReq';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/gvDB/InfLanguageMock';
import { MockPaginatedStatementsControllerService } from 'projects/__test__/mock-services/MockPaginatedStatementsControllerService';
import { keys } from 'ramda';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { IAppState, ReduxMainService, ReduxModule } from '../../public-api';
import { subfieldIdToString } from '../_helpers/subfieldIdToString';
import { GvSchemaActions } from './schema.actions';


describe('GvSchemaActions', () => {
  let actions: GvSchemaActions;
  let main: ReduxMainService;
  let store: Store<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReduxModule,
        SdkLb4Module
      ],
      providers: [
        { provide: SubfieldPageControllerService, useClass: MockPaginatedStatementsControllerService }
      ]
    })
    actions = TestBed.inject(GvSchemaActions);
    main = TestBed.inject(ReduxMainService);
    store = TestBed.inject(Store);
  });
  describe('.loadGvSchemaObject()', () => {
    const apiCall$ = new BehaviorSubject<GvPositiveSchemaObject>({
      inf: { language: [InfLanguageMock.GERMAN] }
    })
    it('should put language of object into store', async (done) => {
      actions.loadGvSchemaObject(apiCall$)
      store.select(s => s.inf.language.by_pk_entity[InfLanguageMock.GERMAN.pk_entity]).subscribe(lang => {
        expect(lang.pk_entity).toEqual(InfLanguageMock.GERMAN.pk_entity)
        done()
      })
    })
    it('should put class of object into store', async (done) => {
      actions.loadGvSchemaObject(apiCall$)
      store.select(s => s.inf.pkEntityModelMap[18605].fkClass).subscribe(fkClass => {
        expect(fkClass).toEqual(InfLanguageMock.GERMAN.pk_entity)
        done()
      })
    });
    it('should put klasses into store', async (done) => {
      const apiCall$ = new BehaviorSubject<GvPositiveSchemaObject>(GvSchemaObjectMock.basicClassesAndProperties)
      actions.loadGvSchemaObject(apiCall$)
      store.select(s => s.dfh.klass).subscribe(classes => {
        expect(Object.keys(classes).length).toBeGreaterThan(0);
        done()
      })
    });
  })

  describe('.loadFieldPage()', () => {
    it('should put paginated statements of subfield Appelation for language -> refers to name -> appellation ', (done) => {

      main.loadFieldPage([GvFieldPageReqMock.appeTeEnRefersToName])

      const q$ = store.select(s => s.inf.statement.by_subfield_page?.[subfieldIdToString(GvFieldPageReqMock.appeTeEnRefersToName.page)])
        .pipe(
          first((p: any) => (p && !!p.rows))
        )

      q$.subscribe(
        (paginationInfo: any) => {
          expect(paginationInfo.count).toEqual(1)
          expect(paginationInfo.loading['0_7']).toEqual(false)
          console.log(paginationInfo.rows)
          expect(keys(paginationInfo.rows).length).toEqual(1)
        },
        () => { },
        done
      )
    });
  })

});
