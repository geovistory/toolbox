import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { Store, StoreModule } from '@ngrx/store';
import { InfLanguageMock } from 'projects/__test__/data/auto-gen/gvDB/InfLanguageMock';
import { GvSchemaObjectMock } from 'projects/__test__/data/GvSchemaObjectMock';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { IAppState } from '../root/models/model';
import { PROJECT_ID$ } from '../root/PROJECT_ID$';
import { schemaModifierActions } from './data.actions';
import { DataFacade } from './data.facade';
import { dataFeatureKey } from './data.feature.key';
import { dataReducer } from './data.reducer';


describe('Data Facade', () => {
  let facade: DataFacade;
  let store: Store<IAppState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(dataFeatureKey, dataReducer),
      ],
      providers: [
        DataFacade,
        { provide: PROJECT_ID$, useValue: new BehaviorSubject(1) }
      ]
    })
    class CustomFeatureModule { }

    @NgModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}),
        CustomFeatureModule
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
      const res = await firstValueFrom(facade.infFacade.languageFacade.getLanguage.byPkEntity$(InfLanguageMock.GERMAN.pk_entity))
      expect(res.pk_entity).toEqual(InfLanguageMock.GERMAN.pk_entity)
    })
    it('should put class of object into store', (done) => {
      store.dispatch(schemaModifierActions.succeeded({ payload }))
      store.select(s => s.data.inf.pkEntityModelMap[18605].fkClass).subscribe(fkClass => {
        expect(fkClass).toEqual(InfLanguageMock.GERMAN.fk_class)
        done()
      })
    });
    it('should put klasses into store', async () => {
      store.dispatch(schemaModifierActions.succeeded({ payload: { positive: GvSchemaObjectMock.basicClassesAndProperties } }))
      const res = await firstValueFrom(facade.dfhFacade.dfhClass.dfhClass$)
      expect(Object.keys(res).length).toBeGreaterThan(0);
    });
  })

});
