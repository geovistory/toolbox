import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { IAppState, SDKBrowserModule, ProClassFieldConfig } from 'app/core';
import { APP_INITIAL_STATE } from 'app/core/redux-store/redux-store.module';
import { SchemaObjectService } from 'app/core/redux-store/schema-object.service';
import { first, toArray, take } from 'rxjs/operators';
import { ReduxQueriesModule } from '../redux-queries.module';
import { ConfigurationPipesService } from './configuration-pipes.service';
import { IAppStateMock } from 'app/__test__/helpers/data/IAppStateMock';
import { GvSchemaObject } from 'app/core/sdk-lb4/model/gvSchemaObject';
import { of, BehaviorSubject } from 'rxjs';
import { ProClassFieldConfigMock } from 'app/__test__/helpers/data/ProClassFieldConfigMock';

fdescribe('ConfigurationPipeService', () => {
  let ngRedux: NgRedux<IAppState>;
  let service: ConfigurationPipesService;
  let schemaObjServcie: SchemaObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SDKBrowserModule.forRoot(),
        ReduxQueriesModule
      ]
    });
    TestBed.overrideProvider(APP_INITIAL_STATE, {
      useValue: {
        ...IAppStateMock.state1,
      }
    })
    service = TestBed.get(ConfigurationPipesService);
    schemaObjServcie = TestBed.get(SchemaObjectService);
    ngRedux = TestBed.get(NgRedux);

  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('#pipeClassFieldConfigs should return class config for class 21 and project 100', (done) => {

    const gvSchemaObj: GvSchemaObject = { pro: { class_field_config: [ProClassFieldConfigMock.proClassFieldConfig] } }
    schemaObjServcie.storeGv(new BehaviorSubject(gvSchemaObj), 100)

    const q$ = service.pipeClassFieldConfigs(21)
    const expectedSequence = [[ProClassFieldConfigMock.proClassFieldConfig]]
    q$.pipe(first(), toArray())
      .subscribe(
        actualSequence => {
          expect(actualSequence).toEqual(expectedSequence)
        },
        null,
        done);

  });

});
