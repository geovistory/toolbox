import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { SDKBrowserModule } from "app/core/sdk";
import { ProClassFieldConfig } from "app/core/sdk";
import { APP_INITIAL_STATE } from 'app/core/redux-store/redux-store.module';
import { SchemaObjectService } from 'app/core/redux-store/schema-object.service';
import { first, toArray, take } from 'rxjs/operators';
import { ReduxQueriesModule } from '../redux-queries.module';
import { ConfigurationPipesService, DfhPropertyStatus } from './configuration-pipes.service';
import { IAppStateMock } from '__tests__/helpers/data/IAppStateMock';
import { GvSchemaObject } from 'app/core/sdk-lb4/model/gvSchemaObject';
import { of, BehaviorSubject } from 'rxjs';
import { ProClassFieldConfigMock } from '__tests__/helpers/data/auto-gen/ProClassFieldConfigMock';
import { setAppState } from '__tests__/helpers/set-app-state';
import { PK_DEFAULT_CONFIG_PROJECT } from '__tests__/helpers/data/auto-gen/local-model.helpers';
import { DfhApiClassMock } from '__tests__/helpers/data/auto-gen/DfhApiClassMock';
import { Field } from 'app/modules/base/components/properties-tree/properties-tree.models';
import { DfhApiPropertyMock } from '__tests__/helpers/data/auto-gen/DfhApiPropertyMock';
import { transformDfhApiPropertyToDfhProperty } from '__tests__/helpers/data/transformers';
import { fieldsOfManifestationSingleton } from '__tests__/helpers/data/positive-schema-objects/fields-of-manifestation-singleton';
import { project1 } from '__tests__/helpers/data/positive-schema-objects/project-1';
import { IAppState } from 'app/core/redux-store/model';

describe('ConfigurationPipeService', () => {
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
  describe('#pipeClassFieldConfigs', () => {


    it('should return class config for class C365_NAMING', (done) => {
      setAppState(ngRedux, IAppStateMock.state1)
      // seeding data
      const gvSchemaObj: GvSchemaObject = { pro: { class_field_config: [ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME] } }
      schemaObjServcie.storeGv(new BehaviorSubject(gvSchemaObj), PK_DEFAULT_CONFIG_PROJECT)


      // using pipe
      const q$ = service.pipeFieldConfigs(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME.fk_domain_class)

      // testing pipe
      const expectedSequence = [[ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);

    });




  })

  describe('#pipeFields', () => {

    it('should return correct fields of manifestation singleton', (done) => {
      setAppState(ngRedux, IAppStateMock.state1)
      schemaObjServcie.storeGv(new BehaviorSubject({
        ...project1,
        ...fieldsOfManifestationSingleton
      }), PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeFields(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            console.log('Hi')
            console.log(actualSequence)
            expect(actualSequence[0].length).toEqual(4)
          },
          null,
          done);

    });
  })
  describe('#pipeBasicAndSpecificFields', () => {
    it('should return correct fields of temporal entity', (done) => {
      // setAppState(ngRedux, IAppStateMock.state2)
      // const x = ngRedux.getState()

      // // using pipe
      // const q$ = service.pipeClassFieldConfigs(21)

      // // testing pipe
      // const expectedSequence = [[ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME]]

      // q$.pipe(first(), toArray())
      //   .subscribe(
      //     actualSequence => {
      //       expect(actualSequence).toEqual(expectedSequence)
      //     },
      //     null,
      //     done);

    });
    it('should return correct fields of manifestation singleton', (done) => {
      setAppState(ngRedux, IAppStateMock.state1)
      schemaObjServcie.storeGv(new BehaviorSubject(fieldsOfManifestationSingleton), PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      const q$ = service.pipeBasicAndSpecificFields(DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class)

      // testing pipe
      const expectedSequence: Field[][] = [[]]

      q$.pipe(first(), toArray())
        .subscribe(
          actualSequence => {
            console.log(actualSequence)
            expect(actualSequence).toEqual(expectedSequence)
          },
          null,
          done);

    });


  })


});
