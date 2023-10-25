import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InfStatement, ProInfoProjRel, SdkLb4Module } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { keys } from 'ramda';
import { firstValueFrom } from 'rxjs';
import { StateFacade } from './state.facade';
import { IAppState } from './state.model';
import { StateModule } from './state.module';

describe('State Facade', () => {
  let facade: StateFacade;
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

    facade = TestBed.inject(StateFacade);
    store = TestBed.inject(Store);
  });

  it('should be able to use a ui facade', async () => {
    facade.ui.notifications.addToast({ options: { title: 'A' }, type: 'success' })
    const res = await firstValueFrom(facade.ui.notifications.toasts$)
    expect(res[0].type).toBe('success')
  });

  it('should reduce and find item by pkEntity and project 99', async () => {
    const input: InfStatement = { fk_property: 1, pk_entity: 11, fk_subject_info: 123 };
    const input2: InfStatement = { fk_property: 1, pk_entity: 12, fk_subject_info: 123 };
    facade.data.inf.statement.loadSucceeded([input, input2], "")
    const proRel: ProInfoProjRel = { fk_project: 99, pk_entity: 22, fk_entity: 11, is_in_project: true };
    const proRel2: ProInfoProjRel = { fk_project: 99, pk_entity: 23, fk_entity: 12, is_in_project: false };
    facade.data.pro.infoProjRel.loadSucceeded([proRel, proRel2], '')
    facade.ui.activeProject.loadProjectBasiscsSucceded(99);

    const res = await firstValueFrom(facade.data.inf.statement.getOne.byPkEntity$(11, true))
    expect(res).toEqual(input)
    const res2 = await firstValueFrom(facade.data.inf.statement.getMany.by_subject$({ fk_subject_info: 123 }, true))
    expect(keys(res2).length).toEqual(1)
    const res3 = await firstValueFrom(facade.data.inf.statement.getMany.by_subject$({ fk_subject_info: 123 }, false))
    expect(keys(res3).length).toEqual(2)
  });


  it('should reduce and select app state', async () => {
    facade.setState({
      data: { war: { entity_preview: { by_project_id__pk_entity: { 'a': { fk_class: 1, project_id: 1 } } } } },
      ui: { account: { account: { email: 'bar' } }, activeProject: {}, loadingBar: {}, notifications: [] }
    })
    const res = await firstValueFrom(facade.state$)
    expect(res.ui.account.account.email).toBe('bar')
    expect(res.data.war.entity_preview.by_project_id__pk_entity.a.fk_class).toBe(1)
  });


})
