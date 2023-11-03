import { HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SocketsModule } from '@kleiolab/lib-sockets';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { firstValueFrom } from 'rxjs';
import { IAppState } from '../state.model';
import { setUiState } from './ui.actions';
import { UiFacade } from './ui.facade';
import { UiModule } from './ui.module';


describe('Ui Facade', () => {
  let facade: UiFacade;
  let store: Store<IAppState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot(),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        EffectsModule.forRoot(),
        UiModule,
        SocketsModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    facade = TestBed.inject(UiFacade);
    store = TestBed.inject(Store);
  });


  it('should set the entire data state', async () => {
    store.dispatch(setUiState({ ui: { account: { account: { email: 'foo' } } } }))
    const res = await firstValueFrom(facade.account.account$)

    expect(res.email).toEqual('foo')
  })

});
