import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { DataFacade } from './data/data.facade';
import { stateActions } from './state.actions';
import { IAppState } from './state.model';
import { getActiveProjectLanguage } from './state.selectors';
import { UiFacade } from './ui/ui.facade';

@Injectable({
  providedIn: 'root'
})
export class StateFacade {
  private state: IAppState;
  state$ = this.store.select(s => s)
  activeProjectLanguage$ = this.store.select(getActiveProjectLanguage)
  pkProject$ = this.ui.activeProject.projectId$;

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
  setState = (state: IAppState) => this.store.dispatch(stateActions.setState({ state }))

  async getStateAsync() {
    return firstValueFrom(this.store.select(s => s))
  }



}
