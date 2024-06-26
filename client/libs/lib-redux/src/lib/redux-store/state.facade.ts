import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { DataFacade } from './data/data.facade';
import { stateActions } from './state.actions';
import { IAppState } from './state.model';
import { UiFacade } from './ui/ui.facade';

@Injectable({
  providedIn: 'root'
})
export class StateFacade {
  private state: IAppState;
  state$ = this.store.select(s => s)
  pkProject$ = this.ui.activeProject.projectId$;
  pkProject: number;

  constructor(
    private store: Store<IAppState>,
    public data: DataFacade,
    public ui: UiFacade,
  ) {
    this.store.pipe().subscribe(s => {
      this.state = s
      this.pkProject = s?.ui?.activeProject?.pk_project;
    });
  }
  public setState = (state: IAppState) => this.store.dispatch(stateActions.setState({ state }))

  async getStateAsync() {
    return firstValueFrom(this.store.select(s => s))
  }

  /**
  * access latest state synchronously
  * use with care! you should know when to access state synchronously
  */
  public getState() {
    return this.state
  }


}
