import { IAppState } from '@kleiolab/lib-redux';
import { schemaModifierActions } from '@kleiolab/lib-redux/lib/redux-store/data/data.actions';
import { dataRootReducers } from '@kleiolab/lib-redux/lib/redux-store/data/data.reducer';
import { ActiveProjectAction, ActiveProjectActions } from '@kleiolab/lib-redux/lib/redux-store/ui/active-project/active-project.action';
import { uiReducers } from '@kleiolab/lib-redux/lib/redux-store/ui/ui.reducers';
import { GvPositiveSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { combineReducers } from '@ngrx/store';

const rootReducer = combineReducers<IAppState>({
  data: dataRootReducers,
  ui: uiReducers
})
/**
 * Class to initialize a mock state, for testing and stories.
 *
 * Usage:
 * - create an instance: const mockStateFactory = new MockStateFactory();
 * - modify mockStateFactory.state by calling methods like mockStateFactory.setActiveProject
 * - get the state object: mockStateFactory.state
 *
 */
export class MockStateFactory {

  public state: IAppState = rootReducer({ ui: {}, data: {} }, { type: 'init' })

  /**
   * Set the active project id
   * @param id
   */
  public setActiveProject(id: number) {
    const action: ActiveProjectAction = {
      type: ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED,
      meta: { pk_project: id }
    }
    this.applyAction(action)
  }

  /**
   * Add data in the form of a schema object `{ inf: statement: [{...}] }`
   * to the state. This will create the necessary indexes.
   *
   * @param data
   */
  public addPositiveSchemaObject(data: GvPositiveSchemaObject) {
    this.applyAction(schemaModifierActions.succeeded({ payload: { positive: data } }))
  }

  private applyAction(action: any) {
    this.state = rootReducer(this.state, action)
  }
}
