import { U } from "app/core";
import { FluxStandardAction } from "flux-standard-action";
import { clone, indexBy, mergeDeepRight, omit, values } from "ramda";
import { combineReducers } from "redux";



export interface ReducerConfigCollection {
  [key: string]: ReducerConfig
}

export interface ReducerConfig {
  // wraps everything in facette named by facetteByPk and grouped by action.meta.pk
  facetteByPk?: string,
  indexBy?: {
    keyInStore: string;
    indexByFn: (item) => string;
  },
  groupBy?: {
    keyInStore: string;
    groupByFn: (item) => string;
  }[]
}

export interface Meta<Model> { items: Model[], pk?: number }

/**
 * Creates standard reducers for the given model.
 *
 * Adds indexes according to config.
 *
 * S: Interface of the state (slice of store)
 */
export class ReducerFactory<Payload, Model> {

  reducer;

  constructor(public actionPrefix: string, public configs: ReducerConfigCollection) { }

  public createReducers() {

    const reducers = {}
    U.obj2KeyValueArr(this.configs).forEach(x => {
      reducers[x.key] = this.createReducer(x.key, x.value);
    });
    return combineReducers(reducers)
  }

  private createReducer(modelName, config: ReducerConfig) {
    const actionPrefix = this.actionPrefix;
    const reducer = (state = {}, action: FluxStandardAction<Payload, Meta<Model>>) => {


      const facette = (action, state, cb: (innerState) => any) => {
        let outerState;
        ({ outerState, state } = this.deFacette(modelName, config, action, outerState, state));

        const innerState = cb(state)

        return this.enFacette(modelName, config, action, innerState, outerState);
      }

      switch (action.type) {
        case actionPrefix + '.' + modelName + '::LOAD':

          state = facette(action, state, (innerState) => ({
            // TODO refactor this for partial lodings
            ...omit([this.by(config.indexBy.keyInStore)], innerState),
            loading: true
          }));

          break;


        case actionPrefix + '.' + modelName + '::LOAD_SUCCEEDED':
          state = facette(action, state, (innerState) => (
            {
              ...this.mergeItemsInState(config, innerState, action),
              loading: false
            }))
          break;


        case actionPrefix + '.' + modelName + '::UPSERT':
          state = facette(action, state, (innerState) => ({
            ...innerState,
            [this.updatingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config)
          }))
          break;

        case actionPrefix + '.' + modelName + '::UPSERT_SUCCEEDED':
          state = facette(action, state, (innerState) => ({
            ... this.mergeItemsInState(config, innerState, action),
            [this.updatingBy(config.indexBy.keyInStore)]:
              omit(values(this.indexKeyObject(action, config)), innerState[this.updatingBy(config.indexBy.keyInStore)])
          }))
          break;

        case actionPrefix + '.' + modelName + '::DELETE':
          state = facette(action, state, (innerState) => ({
            ...innerState,
            [this.deletingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config)
          }));
          break;

        case actionPrefix + '.' + modelName + '::DELETE_SUCCEEDED':

          const deletingKey = this.deletingBy(config.indexBy.keyInStore)
          state = facette(action, state, (innerState) => {
            innerState = {
              ...this.deleteItemsFromState(config, action, innerState),
              [deletingKey]: omit(values(this.indexKeyObject(action, config)), innerState[this.deletingBy(config.indexBy.keyInStore)])
            }
            if (!Object.keys(innerState[deletingKey]).length) innerState = omit([deletingKey], innerState);
            return innerState;
          })

          break;

        case actionPrefix + '.' + modelName + '::REMOVE':
          state = facette(action, state, (innerState) => ({
            ...innerState,
            [this.removingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config)
          }));
          break;

        case actionPrefix + '.' + modelName + '::REMOVE_SUCCEEDED':

          const removingKey = this.removingBy(config.indexBy.keyInStore)
          state = facette(action, state, (innerState) => {
            innerState = {
              ...this.deleteItemsFromState(config, action, innerState),
              [removingKey]: omit(values(this.indexKeyObject(action, config)), innerState[this.removingBy(config.indexBy.keyInStore)])
            }
            if (!Object.keys(innerState[removingKey]).length) innerState = omit([removingKey], innerState);
            return innerState;
          })
          break;

        case actionPrefix + '.' + modelName + '::FAILED':


          state = facette(action, state, (innerState) => ({
            ...innerState,
            ...omit([this.by(config.indexBy.keyInStore)], innerState),
            loading: false
          }));

          break;

      }

      return state;
    };


    return reducer;
  }

  by = (name: string) => 'by_' + name;
  updatingBy = (name: string) => 'updating_' + this.by(name);
  deletingBy = (name: string) => 'deleting_' + this.by(name);
  removingBy = (name: string) => 'removing_' + this.by(name);


  private deFacette(modelName: string, config: ReducerConfig, action: FluxStandardAction<Payload, { items: Model[]; pk?: number; }>, outerState: any, state: {}) {
    if (this.isFacetteByPk(config, action)) {
      outerState = clone(state);
      const pk = action.meta.pk || 'repo'
      state = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
    }
    return { outerState, state };
  }

  private enFacette(modelName: string, config: ReducerConfig, action: FluxStandardAction<Payload, { items: Model[]; pk?: number; }>, state: {}, outerState: any) {
    if (this.isFacetteByPk(config, action)) {
      const pk = action.meta.pk || 'repo'
      state = {
        ...outerState,
        [config.facetteByPk]: {
          ...outerState[config.facetteByPk],
          [pk]: state
        }
      };
    }
    return state;
  }


  private isFacetteByPk(config: ReducerConfig, action: FluxStandardAction<Payload, { items: Model[]; pk?: number; }>) {
    if (config.facetteByPk) {
      if (!action.meta || action.meta.pk === undefined) throw Error('Facette action must provide pk for facette');
      else return true;
    }
    else return false;
  }

  private deleteItemsFromState(config: ReducerConfig, action: FluxStandardAction<Payload, { items: Model[]; }>, state: {}) {
    const iKey = this.by(config.indexBy.keyInStore);
    const keysToOmit = action.meta.items.map(item => config.indexBy.indexByFn(item));
    state = {
      ...state,
      [iKey]: omit(keysToOmit, state[iKey])
    };
    if (config.groupBy && config.groupBy.length) {
      config.groupBy.forEach(i => {
        const gkey = this.by(i.keyInStore);
        const g = {};
        action.meta.items.forEach(item => {
          try {
            g[i.groupByFn(item)] = true;
          }
          catch (e) { }
        });
        const groupsToClean = Object.keys(g);
        const gKey = clone(state[gkey]);
        groupsToClean.forEach(group => {
          gKey[group] = omit(keysToOmit, gKey[group]);
          if (!Object.keys(gKey[group]).length)
            delete gKey[group];
        });
        state = {
          ...state,
          [gkey]: gKey
        };
      });
    }
    return state;
  }

  /**
   * This function is there to merge new items in the store including its indexes
   *
   * It bundles the logic for storing the results of a find, update or insert requests
   */
  private mergeItemsInState(config: ReducerConfig, state: {}, action: FluxStandardAction<Payload, { items: Model[]; }>) {
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
   */
  private indexKeyObject(action: FluxStandardAction<Payload, { items: Model[]; }>, config: ReducerConfig) {
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
