import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { IAppState, SDKBrowserModule, ProClassFieldConfig } from 'app/core';
import { APP_INITIAL_STATE } from 'app/core/redux-store/redux-store.module';
import { SchemaObjectService } from 'app/core/redux-store/schema-object.service';
import { first, toArray, take } from 'rxjs/operators';
import { ReduxQueriesModule } from '../redux-queries.module';
import { ConfigurationPipesService } from './configuration-pipes.service';
import { IAppStateMock } from '__tests__/helpers/data/IAppStateMock';
import { GvSchemaObject } from 'app/core/sdk-lb4/model/gvSchemaObject';
import { of, BehaviorSubject } from 'rxjs';
import { ProClassFieldConfigMock } from '__tests__/helpers/data/ProClassFieldConfigMock';
import { setAppState } from '__tests__/helpers/set-app-state';

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
    service = TestBed.get(ConfigurationPipesService);
    schemaObjServcie = TestBed.get(SchemaObjectService);
    ngRedux = TestBed.get(NgRedux);


  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('#pipeClassFieldConfigs should return class config for class 21 and project 100', (done) => {
    setAppState(ngRedux, IAppStateMock.state1)
    // seeding data
    const gvSchemaObj: GvSchemaObject = { pro: { class_field_config: [ProClassFieldConfigMock.proClassFieldConfig] } }
    schemaObjServcie.storeGv(new BehaviorSubject(gvSchemaObj), 100)


    // using pipe
    const q$ = service.pipeClassFieldConfigs(21)

    // testing pipe
    const expectedSequence = [[ProClassFieldConfigMock.proClassFieldConfig]]

    q$.pipe(first(), toArray())
      .subscribe(
        actualSequence => {
          expect(actualSequence).toEqual(expectedSequence)
        },
        null,
        done);

  });



  it('#pipeClassFieldConfigs should return class config for class 21 and project 100', (done) => {
    setAppState(ngRedux, IAppStateMock.state2)
    const x = ngRedux.getState()

    // using pipe
    const q$ = service.pipeClassFieldConfigs(21)

    // testing pipe
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
