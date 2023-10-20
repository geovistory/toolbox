import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InfStatement } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { GvPaginationObjectMock } from 'projects/__test__/data/auto-gen/api-responses/GvPaginationObjectMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';
import { keys } from 'ramda';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { PROJECT_ID$ } from "../../../PROJECT_ID$";
import { IAppState } from '../../../public-api';
import { dataFeatureKey } from '../../data.feature.key';
import { DataState } from '../../data.model';
import { infStatementActions } from './inf-statement.actions';
import { InfStatementFacade } from './inf-statement.facade';
import { infStatementReducers } from './inf-statement.reducer';

describe('InfStatement Facade', () => {
  let facade: InfStatementFacade;
  let store: Store<IAppState>;
  let projectId$: BehaviorSubject<number>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature<DataState>(dataFeatureKey, combineReducers({ inf: combineReducers({ statement: infStatementReducers }) })),

      ],
      providers: [
        InfStatementFacade,
        { provide: PROJECT_ID$, useValue: new BehaviorSubject(1) }
      ]
    })
    class CustomFeatureModule { }

    @NgModule({
      imports: [
        StoreModule.forRoot<IAppState>(),
        CustomFeatureModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    facade = TestBed.inject(InfStatementFacade);
    store = TestBed.inject(Store);
    projectId$ = TestBed.inject(PROJECT_ID$);
  });

  it('should init undefined', async () => {
    const res = await firstValueFrom(facade.statementsPkEntityIdx$)
    expect(res).toBe(undefined)
  });

  it('should reduce and find item by pkEntity', async () => {
    const input: InfStatement = { fk_property: 1, pk_entity: 11, fk_subject_info: 123 };
    facade.loadSucceeded([input], "")
    const res = await firstValueFrom(facade.getOne.byPkEntity$(11, false))
    expect(res).toEqual(input)
  });
  it('should reduce and find item by subject', async () => {
    const input: InfStatement = { fk_property: 1, pk_entity: 11, fk_subject_info: 123 };
    const input2: InfStatement = { fk_property: 2, pk_entity: 12, fk_subject_info: 123 };
    const input3: InfStatement = { fk_property: 2, pk_entity: 13, fk_subject_info: 456 };
    facade.loadSucceeded([input, input2, input3], "")
    const res = await firstValueFrom(facade.getMany.by_subject$({ fk_subject_info: 123 }, false))
    expect(res).toEqual([input, input2])
  });
  it('should reduce and find item by subject and property', async () => {
    const input: InfStatement = { fk_property: 1, pk_entity: 11, fk_subject_info: 123 };
    const input2: InfStatement = { fk_property: 2, pk_entity: 12, fk_subject_info: 123 };
    const input3: InfStatement = { fk_property: 2, pk_entity: 13, fk_subject_info: 456 };
    facade.loadSucceeded([input, input2, input3], "")
    const res = await firstValueFrom(facade.getMany.by_subject_and_property$({ fk_subject_info: 123, fk_property: 2 }, false))
    expect(res).toEqual([input2])
  });
  it('should reduce and find item by object', async () => {
    const input: InfStatement = { fk_property: 1, pk_entity: 11, fk_object_info: 123 };
    const input2: InfStatement = { fk_property: 2, pk_entity: 12, fk_object_info: 123 };
    const input3: InfStatement = { fk_property: 2, pk_entity: 13, fk_object_info: 456 };
    facade.loadSucceeded([input, input2, input3], "")
    const res = await firstValueFrom(facade.getMany.by_object$({ fk_object_info: 123 }, false))
    expect(res).toEqual([input, input2])
  });

  it('should reduce and find item by object and property', async () => {
    const input: InfStatement = { fk_property: 1, pk_entity: 11, fk_object_info: 123 };
    const input2: InfStatement = { fk_property: 2, pk_entity: 12, fk_object_info: 123 };
    const input3: InfStatement = { fk_property: 2, pk_entity: 13, fk_object_info: 456 };
    facade.loadSucceeded([input, input2, input3], "")
    const res = await firstValueFrom(facade.getMany.by_object_and_property$({ fk_object_info: 123, fk_property: 2 }, false))
    expect(res).toEqual([input2])
  });


  describe('should reduce and find field page', () => {
    it('should put paginated statements of subfield Appelation for language -> refers to name -> appellation ', async () => {
      const serverResponseMock = GvPaginationObjectMock.personHasAppeTeEn;
      serverResponseMock.subfieldPages.forEach(p =>
        store.dispatch(infStatementActions.loadPageSucceededAction(
          p.paginatedStatements, p.count, p.req.page, ProProjectMock.PROJECT_1.pk_entity
        )))

      const page = serverResponseMock.subfieldPages[0].req.page
      const paginationInfo = await firstValueFrom(facade.getPage.page(page));
      expect(paginationInfo.count).toEqual(1)
      expect(paginationInfo.loading['0_7']).toEqual(false)
      expect(keys(paginationInfo.rows).length).toEqual(1)
    });
  })

})
