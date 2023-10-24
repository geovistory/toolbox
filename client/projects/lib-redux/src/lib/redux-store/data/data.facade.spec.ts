import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { SocketsModule } from '@kleiolab/lib-sockets';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/gvDB/InfLanguageMock';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { firstValueFrom } from 'rxjs';
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
    // it('should put class of object into store', (done) => {
    //   store.dispatch(schemaModifierActions.succeeded({ payload }))
    //   store.select(s => s.data.inf.pkEntityModelMap[18605].fkClass).subscribe(fkClass => {
    //     expect(fkClass).toEqual(InfLanguageMock.GERMAN.fk_class)
    //     done()
    //   })
    // });
    it('should put klasses into store', async () => {
      store.dispatch(schemaModifierActions.succeeded({ payload: { positive: GvSchemaObjectMock.basicClassesAndProperties } }))
      const res = await firstValueFrom(facade.dfh.klass.dfhClass$)
      expect(Object.keys(res).length).toBeGreaterThan(0);
    });
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

});
