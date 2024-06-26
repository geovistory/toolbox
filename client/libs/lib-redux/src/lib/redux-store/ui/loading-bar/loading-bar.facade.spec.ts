import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { IAppState } from '../../state.model';
import { LoadingBarFacade } from './loading-bar.facade';
import { LoadingBarModule } from './loading-bar.module';

describe('LoadingBar Facade', () => {
  let facade: LoadingBarFacade;
  let store: Store<IAppState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forRoot({}),
        LoadingBarModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    facade = TestBed.inject(LoadingBarFacade);
    store = TestBed.inject(Store);
  });

  it('should init running-jobs-count with 0', async () => {
    const res = await firstValueFrom(facade.loadingBarCount$)
    expect(res).toBe(0)
  });


  it('should increase and decrease the running-jobs-count', (done) => {

    facade.loadingBarCount$.pipe(take(5), toArray())
      .subscribe({
        next: actualSequence => {
          expect(actualSequence[0]).toBe(0)
          expect(actualSequence[1]).toBe(1)
          expect(actualSequence[2]).toBe(2)
          expect(actualSequence[3]).toBe(1)
          expect(actualSequence[4]).toBe(0)
        },
        complete: done
      });

    facade.addJob()
    facade.addJob()
    facade.removeJob()
    facade.removeJob()
  });


})
