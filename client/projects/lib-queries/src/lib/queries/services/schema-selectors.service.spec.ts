import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { ByPk, IAppState, SchemaService } from '@kleiolab/lib-redux';
import { GvPositiveSchemaObject, ProClassFieldConfig } from '@kleiolab/lib-sdk-lb4';
import { moduleImports } from 'projects/lib-queries/src/__tests__/helpers/module-imports';
import { ProClassFieldConfigMock } from 'projects/__test__/data/auto-gen/gvDB/ProClassFieldConfigMock';
import { BehaviorSubject } from 'rxjs';
import { first, toArray } from 'rxjs/operators';
import { SchemaSelectorsService } from './schema-selectors.service';


describe('SchemaSelectorsService', () => {
  let ngRedux: NgRedux<IAppState>;
  let service: SchemaSelectorsService;
  let schemaObjService: SchemaService;

  const gvSchemaObj: GvPositiveSchemaObject = {
    pro: {
      class_field_config: [ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME]
    }
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: moduleImports
    })
    service = TestBed.get(SchemaSelectorsService);
    schemaObjService = TestBed.get(SchemaService);
    ngRedux = TestBed.get(NgRedux);

    schemaObjService.storeGv(new BehaviorSubject(gvSchemaObj), 100)
  });
  describe('Service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })
  describe('.pro', () => {
    describe('.class_field_config', () => {
      describe('.by_pk_entity$.key()', () => {
        it('should get item', (done) => {
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
      })
      describe('.by_fk_project__fk_class$.key()', () => {
        it('should get item', (done) => {
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
      })
    })
  })



});
