import { TestBed } from '@angular/core/testing';

import { SchemaSelectorsService } from './schema-selectors.service';
import { ReduxStoreModule } from 'projects/toolbox/src/app/core/redux-store/redux-store.module';
import { SDKBrowserModule, } from 'projects/toolbox/src/app/core/sdk';
import { ReduxQueriesModule } from '../redux-queries.module';
import { SchemaObjectService } from 'projects/toolbox/src/app/core/redux-store/schema-object.service';
import { NgRedux } from '@angular-redux/store';
import { ConfigurationPipesService } from './configuration-pipes.service';
import { GvSchemaObject, ProClassFieldConfig } from 'projects/toolbox/src/app/core/sdk-lb4';
import { BehaviorSubject } from 'rxjs';
import { first, toArray } from 'rxjs/operators';
import { ByPk, IAppState } from 'projects/toolbox/src/app/core/redux-store/model';
import { ProClassFieldConfigMock } from '__tests__/helpers/data/auto-gen/ProClassFieldConfigMock';

describe('SchemaSelectorsService', () => {
  let ngRedux: NgRedux<IAppState>;
  let service: SchemaSelectorsService;
  let schemaObjService: SchemaObjectService;

  const gvSchemaObj: GvSchemaObject = {
    pro: {
      class_field_config: [ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME]
    }
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SDKBrowserModule.forRoot(),
        ReduxQueriesModule
      ]
    })
    service = TestBed.get(SchemaSelectorsService);
    schemaObjService = TestBed.get(SchemaObjectService);
    ngRedux = TestBed.get(NgRedux);

    schemaObjService.storeGv(new BehaviorSubject(gvSchemaObj), 100)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('#pro.class_field_config.by_pk_entity$.key() should get item', (done) => {
    const x = ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME
    const key = x.pk_entity + ''

    const q$ = service.pro$.class_field_config$.by_pk_entity$.key(key)
    const expectedSequence: ProClassFieldConfig[] = [ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME]
    q$.pipe(first(), toArray())
      .subscribe(
        actualSequence => {
          expect(actualSequence).toEqual(expectedSequence)
        },
        null,
        done);
  });
  it('#pro.class_field_config.by_fk_project__fk_class$.key() should get item', (done) => {
    const x = ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME
    const key = x.fk_project + '_' + x.fk_domain_class
    const q$ = service.pro$.class_field_config$.by_fk_project__fk_class$.key(key)
    const expectedSequence: ByPk<ProClassFieldConfig>[] = [{ [x.pk_entity.toString()]: x }]
    q$.pipe(first(), toArray())
      .subscribe(
        actualSequence => {
          expect(actualSequence).toEqual(expectedSequence)
        },
        null,
        done);
  });

});
