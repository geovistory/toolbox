import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InfStatement } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule } from '@ngrx/store';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { infRoot } from '../inf.config';
import { InfState } from '../inf.models';
import { InfStatementFacade, PROJECT_ID$ } from './inf-statement.facade';
import { infStatementReducers } from './inf-statement.reducer';

fdescribe('InfStatement Facade', () => {
  let facade: InfStatementFacade;
  let store: Store<InfState>;
  let fkProject: Observable<number>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(infRoot, infStatementReducers),
      ],
      providers: [
        InfStatementFacade,
        { provide: PROJECT_ID$, useValue: new BehaviorSubject(1) }
      ]
    })
    class CustomFeatureModule { }

    @NgModule({
      imports: [
        StoreModule.forRoot({}),
        CustomFeatureModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    facade = TestBed.inject(InfStatementFacade);
    store = TestBed.inject(Store);
  });

  fit('should init undefined', async () => {
    const res = await firstValueFrom(facade.statementsPkEntityIdx$)
    expect(res).toBe(undefined)
  });

  fit('should reduce and find item by pkEntity', async () => {
    const input: InfStatement = { fk_property: 1, pk_entity: 11, fk_subject_info: 123 };
    facade.loadSucceeded([input], "")
    const res = await firstValueFrom(facade.getOne.byPkEntity$(11, false))
    expect(res).toEqual(input)
  });
  fit('should reduce and find item by subject', async () => {
    const input: InfStatement = { fk_property: 1, pk_entity: 11, fk_subject_info: 123 };
    const input2: InfStatement = { fk_property: 2, pk_entity: 12, fk_subject_info: 123 };
    const input3: InfStatement = { fk_property: 2, pk_entity: 13, fk_subject_info: 456 };
    facade.loadSucceeded([input, input2, input3], "")
    const res = await firstValueFrom(facade.getMany.by_subject$({ fk_subject_info: 123 }, false))
    expect(res).toEqual([input, input2])
  });
  fit('should reduce and find item by subject and property', async () => {
    const input: InfStatement = { fk_property: 1, pk_entity: 11, fk_subject_info: 123 };
    const input2: InfStatement = { fk_property: 2, pk_entity: 12, fk_subject_info: 123 };
    const input3: InfStatement = { fk_property: 2, pk_entity: 13, fk_subject_info: 456 };
    facade.loadSucceeded([input, input2, input3], "")
    const res = await firstValueFrom(facade.getMany.by_subject_and_property$({ fk_subject_info: 123, fk_property: 2 }, false))
    expect(res).toEqual([input2])
  });
  fit('should reduce and find item by object', async () => {
    const input: InfStatement = { fk_property: 1, pk_entity: 11, fk_object_info: 123 };
    const input2: InfStatement = { fk_property: 2, pk_entity: 12, fk_object_info: 123 };
    const input3: InfStatement = { fk_property: 2, pk_entity: 13, fk_object_info: 456 };
    facade.loadSucceeded([input, input2, input3], "")
    const res = await firstValueFrom(facade.getMany.by_object$({ fk_object_info: 123 }, false))
    expect(res).toEqual([input, input2])
  });

  fit('should reduce and find item by object and property', async () => {
    const input: InfStatement = { fk_property: 1, pk_entity: 11, fk_object_info: 123 };
    const input2: InfStatement = { fk_property: 2, pk_entity: 12, fk_object_info: 123 };
    const input3: InfStatement = { fk_property: 2, pk_entity: 13, fk_object_info: 456 };
    facade.loadSucceeded([input, input2, input3], "")
    const res = await firstValueFrom(facade.getMany.by_object_and_property$({ fk_object_info: 123, fk_property: 2 }, false))
    expect(res).toEqual([input2])
  });

  // TODO add tests for project filter, setting ofProject=true in: facade.getMany.by_subject$({ fk_subject_info: 123 }, <ofProject>)
  // this is only possible when pro facade is ready

  // TODO add tests for pagination

})
