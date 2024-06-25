import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom, timer } from 'rxjs';
import { IAppState } from '../../state.model';
import { NotificationFacade } from './notification.facade';
import { NotificationModule } from './notification.module';

describe('Notification Facade', () => {
  let facade: NotificationFacade;
  let store: Store<IAppState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        NotificationModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    facade = TestBed.inject(NotificationFacade);
    store = TestBed.inject(Store);
  });

  it('should add toast and remove it after default interval', async () => {
    const uid = facade.addToast({ type: 'info', options: { title: 'Hello', timeout: 10 } })
    const res = await firstValueFrom(facade.toasts$)
    expect(res[0].type).toBe('info')
    expect(res[0].uid).toBe(uid)

    // wait
    await firstValueFrom(timer(11));

    const res2 = await firstValueFrom(facade.toasts$)
    expect(res2.length).toBe(0)
  });


})
