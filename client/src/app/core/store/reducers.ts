import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { createAccountReducer } from 'app/modules/account/api/account.reducers';
import { informationReducer } from 'app/modules/information/containers/information/api/information.reducer';
import { sourceListReducer } from 'app/modules/sources/containers/source-list/api/source-list.reducer';
import { FluxStandardAction } from 'flux-standard-action';
import { indexBy, omit, groupBy, mergeDeepRight, values, clone } from 'ramda';
import { combineReducers } from 'redux';
import { backofficeReducer } from '../../modules/backoffice/backoffice.reducer';
import { createProjectsReducer } from '../../modules/projects/api/projects.reducers';
import { createActiveProjectReducer } from '../active-project/active-project.reducer';
import { createDfhReducer } from '../dfh/dfh.reducer';
import { loadingBarReducer } from '../loading-bar/api/loading-bar.reducer';
import { createSystemReducer } from '../system/system.reducer';



interface StandardReducerConfig {
  indexBy?: {
    keyInStore: string;
    indexByFn: (item) => string;
  },
  groupBy?: {
    keyInStore: string;
    groupByFn: (item) => string;
  }[]
}

/**
 * Creates standard reducers for the given model.
 * 
 * Adds indexes according to config.
 *  
 * S: Interface of the state (slice of store) 
 */
export class StandardReducerFactory<Payload, Model> {

  reducer;

  constructor(actionPrefix: string, modelName: string, config: StandardReducerConfig, INITIAL_STATE = {}) {
    this.reducer = (state = INITIAL_STATE, action: FluxStandardAction<Payload, { items: Model[] }>) => {


      switch (action.type) {
        case actionPrefix + '.' + modelName + '::LOAD':
          state = {
            // TODO refactor this for partial lodings
            ...omit([this.by(config.indexBy.keyInStore)], state),
            loading: true
          };
          break;


        case actionPrefix + '.' + modelName + '::LOAD_SUCCEEDED':
          state = {
            ...this.mergeItemsInState(config, state, action),
            loading: false
          }
          break;


        case actionPrefix + '.' + modelName + '::UPSERT':
          state = {
            ...state,
            [this.updatingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config)
          };
          break;

        case actionPrefix + '.' + modelName + '::UPSERT_SUCCEEDED':
          state = {
            ... this.mergeItemsInState(config, state, action),
            [this.updatingBy(config.indexBy.keyInStore)]:
              omit(values(this.indexKeyObject(action, config)), state[this.updatingBy(config.indexBy.keyInStore)])
          }
          break;

        case actionPrefix + '.' + modelName + '::DELETE':
          state = {
            ...state,
            [this.deletingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config)
          };
          break;

        case actionPrefix + '.' + modelName + '::DELETE_SUCCEEDED':

          const iKey = this.by(config.indexBy.keyInStore);
          const keysToOmit = action.meta.items.map(item => config.indexBy.indexByFn(item))
          state = {
            ...state,
            [iKey]: omit(keysToOmit, state[iKey])
          };

          if (config.groupBy && config.groupBy.length) {
            config.groupBy.forEach(i => {
              const gkey = this.by(i.keyInStore);
              const g = {};
              action.meta.items.forEach(item => { try { g[i.groupByFn(item)] = true } catch (e) { } })
              const groupsToClean = Object.keys(g);
              const gKey = clone(state[gkey])
              groupsToClean.forEach(group => {
                gKey[group] = omit(keysToOmit, gKey[group]);
                if (!Object.keys(gKey[group]).length) delete gKey[group];
              })
              state = {
                ...state,
                [gkey]: gKey
              };
            });
          }

          const deletingKey = this.deletingBy(config.indexBy.keyInStore)
          state = {
            ...state,
            [deletingKey]: omit(values(this.indexKeyObject(action, config)), state[this.deletingBy(config.indexBy.keyInStore)])
          }
          if (!Object.keys(state[deletingKey]).length) state = omit([deletingKey], state);

          break;

        case actionPrefix + '.' + modelName + '::FAILED':


          state = {
            ...state,
            ...omit([this.by(config.indexBy.keyInStore)], state),
            loading: false
          };

          break;

      }

      return state;
    };
  }

  by = (name: string) => 'by_' + name;
  updatingBy = (name: string) => 'updating_' + this.by(name);
  deletingBy = (name: string) => 'deleting_' + this.by(name);


  /**
   * This function is there to merge new items in the store including its indexes
   * 
   * It bundles the logic for storing the results of a find, update or insert requests
   */
  private mergeItemsInState(config: StandardReducerConfig, state: {}, action: FluxStandardAction<Payload, { items: Model[]; }>) {
    const key = this.by(config.indexBy.keyInStore);
    state = {
      ...state,
      [key]: mergeDeepRight(state[key], indexBy(config.indexBy.indexByFn, action.meta.items)),
    };
    if (config.groupBy && config.groupBy.length) {
      config.groupBy.forEach(i => {
        const key = this.by(i.keyInStore);
        state = {
          ...state,
          [key]: mergeDeepRight(state[key], this.groupBy(action.meta.items, i.groupByFn, config.indexBy.indexByFn)),
        };
      });
    }
    return state;
  }

  /**
   * Creates object where the key returned by the configured indexByFn
   * serves as keys and values:
   * `example: {'3324':3324, '89403': 89403}`
   */
  private indexKeyObject(action: FluxStandardAction<Payload, { items: Model[]; }>, config: StandardReducerConfig) {
    return indexBy((i) => (i), action.meta.items
      // filter items that are not (yet) indexable. This is normally the case, when creating new items that have no pk yet.
      .filter(item => {
        try {
          config.indexBy.indexByFn(item);
          return true;
        } catch (error) {
          return false;
        }
      })
      .map(item => config.indexBy.indexByFn(item)));
  }

  groupBy(items: any[], groupByFn: (item) => string, indexByFn: (item) => string) {
    const groups = {}
    items.forEach(item => {
      let groupKey;
      // if the group by key is not possible to create, the item won't be added to the index
      try {
        groupKey = groupByFn(item);
      } catch (error) { }

      if (groupKey) {
        const indexKey = indexByFn(item);
        groups[groupKey] = { ...groups[groupKey], ...{ [indexKey]: item } }
      }
    })
    return groups;
  }

}

export const INIT_SANDBOX_STATE = 'INIT_SANDBOX_STATE';
export const sandboxStateReducer = (lastState = {}, action: FluxStandardAction<any>) => {
  if (action.type === INIT_SANDBOX_STATE) {
    lastState = {
      ...lastState,
      ...action.payload
    };
  }
  return lastState;
};


export const pendingRequestReducer = (state = {}, action) => {

  if (action && action.meta && action.meta.addPending) {
    const uuid = action.meta.addPending;
    state = {
      ...state,
      [uuid]: true
    }
  }

  if (action && action.meta && action.meta.removePending) {
    const uuid = action.meta.removePending;
    state = {
      ...omit([uuid], state)
    }
  }
  return state;
}

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    account: createAccountReducer(),
    backoffice: backofficeReducer,
    loadingBar: loadingBarReducer,
    projects: createProjectsReducer(),
    system: createSystemReducer(),
    dfh: createDfhReducer(),
    activeProject: createActiveProjectReducer(),
    routes: routerReducer,
    information: informationReducer,
    sources: sourceListReducer,
    sandboxState: sandboxStateReducer,
    pending: pendingRequestReducer
  })
)
