import { Injectable } from '@angular/core';
import { IAppState } from '@kleiolab/lib-redux/public-api';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { DataFacade } from './data/data.facade';
import { getActiveProjectLanguage } from './state.selectors';
import { UiFacade } from './ui/ui.facade';

@Injectable({
  providedIn: 'root'
})
export class StateFacade {
  private state: IAppState;
  constructor(
    private store: Store<IAppState>,
    public data: DataFacade,
    public ui: UiFacade
  ) {
    this.store.pipe().subscribe(s => this.state = s);
  }
  /**
  * access latest state synchronously
  * use with care! you should know when to access state synchronously
  */
  getState = () => this.state

  async getStateAsync() {
    return firstValueFrom(this.store.select(s => s))
  }

  activeProjectLanguage$ = this.store.select(getActiveProjectLanguage)

}
