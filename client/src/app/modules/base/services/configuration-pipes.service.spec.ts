import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { IAppState, SDKBrowserModule } from 'app/core';
import { ActiveProjectModule, ActiveProjectService } from 'app/core/active-project';
import { GvSchemaObject } from 'app/core/sdk-lb4/model/models';
import { ProClassFieldConfig } from 'app/core/sdk/models/ProClassFieldConfig';
import { INITIAL_STATE, StoreModule } from 'app/core/store/module';
import { SchemaObjectService } from 'app/core/store/schema-object.service';
import { of } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { ConfigurationPipesService } from './configuration-pipes.service';

describe('ConfigurationPipeService', () => {
  let ngRedux: NgRedux<IAppState>;
  let service: ConfigurationPipesService;
  let schemaObjServcie: SchemaObjectService;
  const initState: IAppState = {
    activeProject: {
      pk_project: 100,
      default_language: {
        notes: 'English',
        iso6391: 'en ',
        iso6392b: 'eng',
        iso6392t: 'eng',
        pk_entity: 18889,
        pk_language: 'eng',
        fk_class: 54,
        lang_type: '',
        scope: ''
      }
    },
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SDKBrowserModule.forRoot(),
        StoreModule,
        ActiveProjectModule
      ],
      providers: [
        // ConfigurationPipesService
      ],
    });
    TestBed.overrideProvider(INITIAL_STATE, {
      useValue: initState
    })
    service = TestBed.get(ConfigurationPipesService);
    schemaObjServcie = TestBed.get(SchemaObjectService);
    ngRedux = TestBed.get(NgRedux);

  });

  it('#getState should return app state', (done) => {

    const p = TestBed.get(ActiveProjectService);

    const s = p.pkProject$

    expect(s).toEqual(100)
  });
  // it('#pipeClassFieldConfigs should return app state', (done) => {
  //   const d = [{
  //     pk_entity: 4001,
  //     fk_project: 2,
  //     fk_domain_class: 1,
  //     fk_property: 1,
  //     ord_num: 1,
  //     fk_class_field: 2,
  //     fk_class_for_class_field: 2,
  //     fk_range_class: 1
  //   }]
  //   const gvSchemaObj: GvSchemaObject = {
  //     pro: {
  //       class_field_config: d
  //     }
  //   }
  //   schemaObjServcie.storeGv(of(gvSchemaObj), 1)
  //   const q$ = service.pipeClassFieldConfigs(21).pipe(take(2))
  //   const expectedSequence: ProClassFieldConfig[][] = [d]
  //   q$.pipe(toArray())
  //     .subscribe(
  //       actualSequence => {
  //         expect(actualSequence).toEqual(expectedSequence)
  //       },
  //       null,
  //       done);
  // });

});
