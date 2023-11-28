import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { SocketsModule } from '@kleiolab/lib-sockets';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { firstValueFrom, of, shareReplay } from 'rxjs';
import { InfLanguageMock } from '../../_helpers/data/auto-gen/gvDB/InfLanguageMock';
import { GvSchemaObjectMock } from '../../_helpers/data/GvSchemaObjectMock';
import { IAppState } from '../state.model';
import { schemaModifierActions, setDataState } from './data.actions';
import { DataFacade } from './data.facade';
import { DataModule } from './data.module';


describe('Data Facade', () => {
  let facade: DataFacade;
  let store: Store<IAppState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot(),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        EffectsModule.forRoot(),
        DataModule,
        SocketsModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    facade = TestBed.inject(DataFacade);
    store = TestBed.inject(Store);
  });
  describe('> Schema Modifier Load Succeeded >', () => {
    const payload: GvSchemaModifier = {
      positive: {
        inf: { language: [InfLanguageMock.GERMAN] }
      }
    }
    it('should put language of object into store', async () => {
      store.dispatch(schemaModifierActions.succeeded({ payload }))
      const res = await firstValueFrom(facade.inf.language.getLanguage.byPkEntity$(InfLanguageMock.GERMAN.pk_entity))
      expect(res.pk_entity).toEqual(InfLanguageMock.GERMAN.pk_entity)
    })

    it('should put klasses into store', async () => {
      store.dispatch(schemaModifierActions.succeeded({ payload: { positive: GvSchemaObjectMock.basicClassesAndProperties } }))
      const res = await firstValueFrom(facade.dfh.klass.dfhClass$)
      expect(Object.keys(res).length).toBeGreaterThan(0);
    });
  })

  describe('> Effects >', () => {

    it('should load schema modifier with mapper, reduce and select data', async () => {
      const m: GvSchemaModifier = { positive: { inf: { appellation: [{ string: 'A', pk_entity: 123, fk_class: 1 }] } } }
      const apiCall$ = of({ 'foo': 'bar', m })
      const mapper = (data) => data.m;
      const addPending = 'id123'
      const $ = apiCall$.pipe(shareReplay())
      store.dispatch(schemaModifierActions.loadWithMapper({
        meta: { addPending },
        data$: $,
        mapper
      }))
      const res = await firstValueFrom(facade.inf.appellation.getAppellation.byPkEntity$(123))
      expect(res.string).toEqual('A')
    })

  })

  it('should reduce and select from child module datChunk ', async () => {
    facade.dat.chunk.upsertSucceeded([{ pk_entity: 11, string: 'A', fk_entity_version: 1, fk_namespace: 1, fk_text: 1 }], '')
    const res = await firstValueFrom(facade.dat.chunk.getChunk.byPkEntity$(11))

    expect(res.pk_entity).toEqual(11)
  })



  it('should set the entire data state', async () => {
    store.dispatch(setDataState({ data: { inf: { appellation: { by_pk_entity: { 1: { fk_class: 123 } } } } } }))
    const res = await firstValueFrom(facade.inf.appellation.getAppellation.byPkEntity$(1))

    expect(res.fk_class).toEqual(123)
  })

  it('should select the project language', async () => {
    store.dispatch(setDataState({ data: { inf: { appellation: { by_pk_entity: { 1: { fk_class: 123 } } } } } }))
    facade.pro.project.loadSucceeded([{ pk_entity: 1, fk_language: 123 }], '')
    facade.inf.language.loadSucceeded([{ pk_entity: 123, notes: 'my lang' }], '')
    const res = await firstValueFrom(facade.getProjectLanguage(1))
    expect(res.notes).toEqual('my lang')
  })

  it('should select the project language label', async () => {
    store.dispatch(setDataState({ data: { inf: { appellation: { by_pk_entity: { 1: { fk_class: 123 } } } } } }))
    facade.pro.project.loadSucceeded([{ pk_entity: 1, fk_language: 123 }], '')
    facade.inf.language.loadSucceeded([{ pk_entity: 123, notes: 'my lang' }], '')
    const res = await firstValueFrom(facade.getProjectLanguageLabel(1))
    expect(res).toEqual('my lang')
  })

});
