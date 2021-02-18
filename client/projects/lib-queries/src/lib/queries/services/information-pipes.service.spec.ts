import { NgRedux } from '@angular-redux/store';
import { TestBed } from '@angular/core/testing';
import { IAppState, SchemaService } from '@kleiolab/lib-redux';
import { GvSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { ProDfhProfileProjRelMock } from 'projects/lib-queries/src/__tests__/helpers/data/auto-gen/ProDfhProfileProjRelMock';
import { PK_DEFAULT_CONFIG_PROJECT } from '../../../__tests__/helpers/data/auto-gen/local-model.helpers';
import { IAppStateMock } from '../../../__tests__/helpers/data/IAppStateMock';
import { moduleImports } from '../../../__tests__/helpers/module-imports';
import { setAppState } from '../../../__tests__/helpers/set-app-state';
import { InformationPipesService } from './information-pipes.service';

describe('InformationPipesService', () => {
  let ngRedux: NgRedux<IAppState>;
  let service: InformationPipesService;
  let schemaObjServcie: SchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: moduleImports
    });
    service = TestBed.get(InformationPipesService);
    schemaObjServcie = TestBed.get(SchemaService);
    ngRedux = TestBed.get(NgRedux);
  });


  describe('Service', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })

  describe('.pipeSubfieldPage()', () => {
    it('should return ItemList with AppellationVT', async (done) => {
      setAppState(ngRedux, IAppStateMock.stateProject1)
      // seeding data
      const gvSchemaObj: GvSchemaObject = {
        pro: {
          dfh_profile_proj_rel: [
            ProDfhProfileProjRelMock.PROJ_1_PROFILE_12,
            ProDfhProfileProjRelMock.PROJ_1_PROFILE_4
          ]
        }
      }
      schemaObjServcie.storeSchemaObjectGv(gvSchemaObj, PK_DEFAULT_CONFIG_PROJECT)

      // using pipe
      // const q$ = service.pipeStatementListPage()

      // // testing pipe
      // const expectedSequence = [12, 4, 5]

      // q$.pipe(take(1), toArray())
      //   .subscribe(
      //     actualSequence => {
      //       expect(actualSequence[0]).toContain(12)
      //       expect(actualSequence[0]).toContain(4)
      //       expect(actualSequence[0]).toContain(5)
      //     },
      //     null,
      //     done);
    });



  })


});
