import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { DataFacade } from '../../redux-store/data/data.facade';
import { IAppState } from '../../redux-store/state.model';
import { StateModule } from '../../redux-store/state.module';
import { UiFacade } from '../../redux-store/ui/ui.facade';
import { ActiveProjectPipesService } from './active-project-pipes.service';

describe('ActiveProject Queries', () => {
  let uiFacade: UiFacade;
  let dataFacade: DataFacade;
  let activeProjectFacade: ActiveProjectPipesService;
  let store: Store<IAppState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        SdkLb4Module,
        StateModule,
        HttpClientModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    dataFacade = TestBed.inject(DataFacade);
    uiFacade = TestBed.inject(UiFacade);
    activeProjectFacade = TestBed.inject(ActiveProjectPipesService);
    store = TestBed.inject(Store);
  });

  it('should find active project language', async () => {
    uiFacade.activeProject.loadProjectBasiscsSucceded(11)
    dataFacade.pro.project.upsertSucceeded([{ fk_language: 123, pk_entity: 11 }], '')
    dataFacade.inf.language.upsertSucceeded([{ pk_entity: 123, notes: 'German' }], '')
    const res = await firstValueFrom(activeProjectFacade.language$)
    expect(res.notes).toBe('German')
  });


  it('should find active project namespaces', async () => {
    uiFacade.activeProject.loadProjectBasiscsSucceded(11)
    dataFacade.dat.namespace.upsertSucceeded([
      { pk_entity: 123, fk_project: 11, standard_label: 'a' },
      { pk_entity: 124, fk_project: 11, standard_label: 'b' },
      { pk_entity: 125, fk_project: 99, standard_label: 'c' }
    ], '')
    const res = await firstValueFrom(activeProjectFacade.namespaces$)
    expect(res[0].standard_label).toBe('a')
    expect(res[1].standard_label).toBe('b')
    expect(res.length).toBe(2)
  });

})
