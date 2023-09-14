import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { SysConfig } from '@kleiolab/lib-config';
import { IAppState, SchemaService } from '@kleiolab/lib-redux';
import { ProProject } from '@kleiolab/lib-sdk-lb4';
import { moduleImports } from 'projects/lib-queries/src/__tests__/helpers/module-imports';
import { setAppState } from 'projects/lib-queries/src/__tests__/helpers/set-app-state';
import { first } from 'rxjs/operators';
import { ActiveAccountPipes } from './active-account-pipes.service';


describe('ActiveAccountPipes', () => {
  let service: ActiveAccountPipes;
  let ngRedux: NgRedux<IAppState>;
  let schemaObjServcie: SchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: moduleImports
    })
    service = TestBed.inject(ActiveAccountPipes);
    ngRedux = TestBed.inject(NgRedux);
    schemaObjServcie = TestBed.inject(SchemaService);
  });

  describe('Service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })
  describe('getProjectsLatestFirst()', () => {
    it('should return projects sorted by latest first', async (done) => {
      setAppState(ngRedux, {})
      schemaObjServcie.schemaActions.storeGvSchemaModifier({
        positive: {
          pro: {
            project: [
              { fk_language: 1, pk_entity: 1, tmsp_last_modification: "2020-01-01T12:00:00.000Z" },
              { fk_language: 2, pk_entity: 2, tmsp_last_modification: "2020-01-01T13:00:00.000Z" },
            ]
          }
        }
      })

      const q = await service.getProjectsLatestFirst().pipe(first()).toPromise();
      expect(q[0].pk_entity).toEqual(2)
      done();
    });
  })

  describe('getProjectLabel()', () => {
    it('should return projects label', async (done) => {
      setAppState(ngRedux, {})
      schemaObjServcie.schemaActions.storeGvSchemaModifier({
        positive: {
          pro: {

            text_property: [
              { fk_project: 1, fk_language: 1, fk_system_type: SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL, string: 'Project 1', fk_pro_project: 1 },
            ]
          }

        }
      })
      const project: ProProject = { fk_language: 1, pk_entity: 1 };
      const q = await service.getProjectLabel(project).pipe(first()).toPromise();
      expect(q).toEqual('Project 1')
      done();
    });
  })

  describe('getProjectDescription()', () => {
    it('should return projects description', async (done) => {
      setAppState(ngRedux, {})
      schemaObjServcie.schemaActions.storeGvSchemaModifier({
        positive: {
          pro: {
            text_property: [
              { fk_project: 1, fk_language: 1, fk_system_type: SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION, string: 'Project 1 Description', fk_pro_project: 1 },
            ]
          }
        }
      })
      const project: ProProject = { fk_language: 1, pk_entity: 1 };
      const q = await service.getProjectDescription(project).pipe(first()).toPromise();
      expect(q).toEqual('Project 1 Description')
      done();
    });
  })

  describe('getProjectLanguageLabel()', () => {
    it('should return projects language', async (done) => {
      setAppState(ngRedux, {})
      schemaObjServcie.schemaActions.storeGvSchemaModifier({
        positive: {
          inf: {
            language: [
              { pk_entity: 1, notes: 'English' },
              { pk_entity: 2, notes: 'German' },
            ]
          }
        }
      })
      const project: ProProject = { fk_language: 1, pk_entity: 1 };
      const q = await service.getProjectLanguageLabel(project).pipe(first()).toPromise();
      expect(q).toEqual('English')
      done();
    });
  })
})

