import { U } from "projects/app-toolbox/src/app/core/util/util";
import { FluxStandardAction } from "flux-standard-action";
import { clone, equals, indexBy, omit, values, keys } from "ramda";
import { combineReducers, Reducer, AnyAction } from "redux";
import { LoadPageMeta, PaginateByParam, LoadPageSucceededMeta } from "./schema-actions-factory";
import { composeReducers } from '@angular-redux/form';

export const PR_ENTITY_MODEL_MAP = 'pkEntityModelMap'
export interface EntityModelAndClass<ModelName> {
  modelName: ModelName,
  fkClass: number
}

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
  }[],
  equals?: (itemA, itemB) => boolean
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

  constructor(public actionPrefix: string, public configs: ReducerConfigCollection) { }

  public createReducers() {

    const reducers = {}
    U.obj2KeyValueArr(this.configs).forEach(x => {
      reducers[x.key] = this.createModelReducers(x.key, x.value);
    });

    const entityModelMapReducers = keys(this.configs).map(modelName => this.createEntityModelMapReducers(modelName))
    reducers[PR_ENTITY_MODEL_MAP] = composeReducers(...entityModelMapReducers)

    return combineReducers(reducers)
  }

  private createModelReducers(modelName, config: ReducerConfig) {
    const actionPrefix = this.actionPrefix;
    const reducer = (state = {}, action: FluxStandardAction<Payload, Meta<Model>>) => {

      const facette = this.facette(modelName, config)

      if (action.type === actionPrefix + '.' + modelName + '::LOAD') {

        state = facette(action, state, (innerState) => ({
          // TODO refactor this for partial lodings
          ...omit([by(config.indexBy.keyInStore)], innerState),
          loading: true
        }));

      }


      else if (action.type === actionPrefix + '.' + modelName + '::LOAD_SUCCEEDED') {
        // If action state differs from
        state = facette(action, state, (innerState) => (
          {
            ...this.mergeItemsInState(config, innerState, action),
            loading: false
          }))
      }


      else if (action.type === actionPrefix + '.' + modelName + '::UPSERT') {
        state = facette(action, state, (innerState) => ({
          ...innerState,
          [this.updatingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config)
        }))
      }

      else if (action.type === actionPrefix + '.' + modelName + '::UPSERT_SUCCEEDED') {
        state = facette(action, state, (innerState) => ({
          ... this.mergeItemsInState(config, innerState, action
            // , true
          ),
          [this.updatingBy(config.indexBy.keyInStore)]:
            omit(values(this.indexKeyObject(action, config)), innerState[this.updatingBy(config.indexBy.keyInStore)])
        }))
      }

      else if (action.type === actionPrefix + '.' + modelName + '::DELETE') {
        state = facette(action, state, (innerState) => ({
          ...innerState,
          [this.deletingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config)
        }));
      }

      else if (action.type === actionPrefix + '.' + modelName + '::DELETE_SUCCEEDED') {

        const deletingKey = this.deletingBy(config.indexBy.keyInStore)
        state = facette(action, state, (innerState) => {
          innerState = {
            ...this.deleteItemsFromState(config, action, innerState),
            [deletingKey]: omit(values(this.indexKeyObject(action, config)), innerState[this.deletingBy(config.indexBy.keyInStore)])
          }
          if (!Object.keys(innerState[deletingKey]).length) innerState = omit([deletingKey], innerState);
          return innerState;
        })

      }

      else if (action.type === actionPrefix + '.' + modelName + '::REMOVE') {
        state = facette(action, state, (innerState) => ({
          ...innerState,
          [this.removingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config)
        }));
      }

      else if (action.type === actionPrefix + '.' + modelName + '::REMOVE_SUCCEEDED') {

        const removingKey = this.removingBy(config.indexBy.keyInStore)
        state = facette(action, state, (innerState) => {
          innerState = {
            ...this.deleteItemsFromState(config, action, innerState),
            [removingKey]: omit(values(this.indexKeyObject(action, config)), innerState[this.removingBy(config.indexBy.keyInStore)])
          }
          if (!Object.keys(innerState[removingKey]).length) innerState = omit([removingKey], innerState);
          return innerState;
        })
      }

      else if (action.type === actionPrefix + '.' + modelName + '::FAILED') {

        state = facette(action, state, (innerState) => ({
          ...innerState,
          ...omit([by(config.indexBy.keyInStore)], innerState),
          loading: false
        }));

      }

      else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE') {
        const meta = action.meta as any as LoadPageMeta;
        const paginateBy = paginatedBy(paginateName(meta.paginateBy))
        const key = meta.paginateBy.map(p => values(p)[0]).join('_')
        const fromTo = getFromTo(meta.limit, meta.offset);

        state = facette(action, state, (innerState) => ({
          ...innerState,
          [paginateBy]: {
            ...innerState[paginateBy],
            [key]: {
              ...(innerState[paginateBy] || {})[key],
              loading: {
                ...((innerState[paginateBy] || {})[key] || {}).loading,
                [fromTo]: true
              }
            }
          }
        }));
      }
      else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE_FAILED') {
        const meta = action.meta as any as LoadPageMeta;
        const paginateBy = paginatedBy(paginateName(meta.paginateBy))
        const key = paginateKey(meta.paginateBy)
        const fromTo = getFromTo(meta.limit, meta.offset);

        state = facette(action, state, (innerState) => ({
          ...innerState,
          [paginateBy]: {
            ...innerState[paginateBy],
            [key]: {
              ...(innerState[paginateBy] || {})[key],
              loading: {
                ...((innerState[paginateBy] || {})[key] || {}).loading,
                [fromTo]: false
              }
            }
          }
        }));
      }

      else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE_SUCCEEDED') {
        const meta = action.meta as any as LoadPageSucceededMeta;
        const paginateBy = paginatedBy(paginateName(meta.paginateBy))
        const key = paginateKey(meta.paginateBy)
        const start = getStart(meta.limit, meta.offset);
        const fromTo = getFromTo(meta.limit, meta.offset);
        const rows = {}
        if (meta.pks) {
          meta.pks.forEach((pk, i) => {
            rows[start + i] = pk;
          })
        }
        state = facette(action, state, (innerState) => ({
          ...innerState,
          [paginateBy]: {
            ...innerState[paginateBy],
            [key]: {
              ...(innerState[paginateBy] || {})[key],
              count: meta.count || 0,
              rows: {
                ...((innerState[paginateBy] || {})[key] || {}).rows,
                ...rows
              },
              loading: {
                ...((innerState[paginateBy] || {})[key] || {}).loading,
                [fromTo]: false
              }
            }
          }
        }));

      }

      return state;
    };


    return reducer;
  }

  /**
   * Creates an map for pk_entity -> modelName on the level of the schema:
   * example:
   */
  private createEntityModelMapReducers(modelName): Reducer<unknown, FluxStandardAction<Payload, Meta<Model>>> {
    const actionPrefix = this.actionPrefix;
    const reducer = (state = {}, action: FluxStandardAction<Payload, Meta<Model>>) => {
      const modelPath = actionPrefix + '.' + modelName;

      if (!action || !action.meta || !action.meta.items || !action.meta.items.length) return state;
      const items = action.meta.items;

      switch (action.type) {
        case modelPath + '::LOAD_SUCCEEDED':
        case modelPath + '::UPSERT_SUCCEEDED':
          const idx = {}
          for (let i = 0; i < items.length; i++) {
            const item = items[i] as any;
            if (item.pk_entity) {
              idx[item.pk_entity] = {
                modelName,
                fkClass: item.fkClass
              }
            }
          }
          state = {
            ...state,
            ...idx
          }
          break;

        case modelPath + '::DELETE_SUCCEEDED':
        case modelPath + '::REMOVE_SUCCEEDED':
          const pkEntities = []
          for (let i = 0; i < items.length; i++) {
            const item = items[i] as any;
            if (item.pk_entity) {
              pkEntities.push(item.pk_entity);
            }
          }
          state = omit(pkEntities, state)
          break;

        default:
          break;
      }
      return state;
    };
    return reducer;
  }


  updatingBy = (name: string) => 'updating_' + by(name);
  deletingBy = (name: string) => 'deleting_' + by(name);
  removingBy = (name: string) => 'removing_' + by(name);



  private facette(modelName: any, config: ReducerConfig) {
    return (action, state, cb: (innerState) => any) => {
      let outerState;
      ({ outerState, state } = this.deFacette(modelName, config, action, outerState, state));
      const innerState = cb(state);
      return this.enFacette(modelName, config, action, innerState, outerState);
    };
  }

  private deFacette(modelName: string, config: ReducerConfig, action: FluxStandardAction<Payload, { items: Model[]; pk?: number; }>, outerState: any, state: {}) {
    if (this.isFacetteByPk(config, action)) {
      // outerState = clone(state);
      const pk = action.meta.pk || 'repo'
      // state = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
      const innerState = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
      return {
        outerState: state,
        state: innerState
      }
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



  deleteItemsFromState(config: ReducerConfig, action: FluxStandardAction<Payload, { items: Model[]; }>, state) {
    const items = action.meta.items;
    // let state = {}
    const groupBys = !(config.groupBy && config.groupBy.length) ? [] : config.groupBy;
    const groups = groupBys.map(i => ({
      groupByKey: by(i.keyInStore),
      groupByFn: i.groupByFn,
    }))
    const mainIndexKey = by(config.indexBy.keyInStore); // first segment e.g. 'by_pk_entity'

    items.forEach((removedItem) => {
      // get path segments of new item
      const itemKey = config.indexBy.indexByFn(removedItem); // second segment e.g. '807060'

      // get old item, if exists
      let oldItem = state[mainIndexKey] ? state[mainIndexKey][itemKey] : undefined;

      // Q: Does the item exists?
      if (oldItem) {
        // A: Yes. use old item does exist

        // remove the removedItem at path in main index
        state = {
          ...state,
          [mainIndexKey]: {
            ...omit([itemKey], state[mainIndexKey]),
          }
        }

        // delete the removedItem at path in the group index
        groups.forEach(g => {
          const groupKey = this.getGroupKeyOfItem(g.groupByFn, removedItem)
          state = {
            ...state,
            [g.groupByKey]: {
              ...state[g.groupByKey],
              [groupKey]: {
                ...omit([itemKey], (state[g.groupByKey] || {})[groupKey])
              }
            }
          }
          // // cleanup paginations
          // state = this.resetPaginationsByGroup(g.groupByKey, state, groupKey);

        })
      }


    })

    // cleanup main index
    if (Object.keys(state[mainIndexKey]).length < 1) {
      state = { ...omit([mainIndexKey], state) }
    }
    // cleanup group indices
    groups.forEach(g => {

      // cleanup groups in group index
      Object.keys(state[g.groupByKey]).forEach(groupKey => {

        if (Object.keys(state[g.groupByKey][groupKey]).length < 1) {
          state = {
            ...state,
            [g.groupByKey]: omit([groupKey], state[g.groupByKey])
          }
        }
      })

      // cleanup group index
      if (Object.keys(state[g.groupByKey]).length < 1) {
        state = { ...omit([g.groupByKey], state) }
      }
    })


    return state;
  }

  mergeItemsInState(config: ReducerConfig, state, action: FluxStandardAction<Payload, { items: Model[]; }>
    // , resetPaginations = false
  ) {
    const items = action.meta.items;
    const groupBys = !(config.groupBy && config.groupBy.length) ? [] : config.groupBy;
    const groups = groupBys.map(i => ({
      groupByKey: by(i.keyInStore),
      groupByFn: i.groupByFn,
    }))

    const mainIndexKey = by(config.indexBy.keyInStore); // first segment e.g. 'by_pk_entity'

    items.forEach((newItem) => {
      // get path segments of new item
      const itemKey = config.indexBy.indexByFn(newItem); // second segment e.g. '807060'

      // get old item, if exists
      let oldItem = state[mainIndexKey] ? state[mainIndexKey][itemKey] : undefined;

      let itemToSet;

      // Q: Does the item exists, and is it deeply-equal to the new item?
      const equalsFn = config.equals || equals
      if (oldItem && equalsFn(newItem, oldItem)) {
        // A: Yes. use old item as itemToSet
        itemToSet = oldItem;
      }
      else {
        // A: No. use new item as itemToSet
        itemToSet = newItem;

        // put the itemToSet at path in main index
        state = {
          ...state,
          [mainIndexKey]: {
            ...state[mainIndexKey],
            [itemKey]: itemToSet
          }
        }

        // iterate over the group indexes
        groups.forEach(g => {
          // remove the oldItem from all group indexes
          const oldGroupKey = this.getGroupKeyOfItem(g.groupByFn, oldItem)
          state = {
            ...state,
            [g.groupByKey]: {
              ...state[g.groupByKey],
              [oldGroupKey]: {
                ...omit([itemKey], (state[g.groupByKey] || {})[oldGroupKey])
              }
            }
          }

          // add the itemToSet to all group indexes, if not undefined
          const newGroupKey = this.getGroupKeyOfItem(g.groupByFn, itemToSet)
          if (newGroupKey !== undefined) {
            state = {
              ...state,
              [g.groupByKey]: {
                ...state[g.groupByKey],
                [newGroupKey]: {
                  ...(state[g.groupByKey] || {})[newGroupKey],
                  [itemKey]: itemToSet
                }
              }
            }
          }

        })
      }
    })


    return state;
  }


  // /**
  //  * resets pagination within a group, e.g. 'pag_by_fk_property'
  //  * TODO: check if can be deleted
  //  */
  // private resetPaginationsByGroup(groupByKey: string, state: any, groupKey: any, isUpsert = false) {
  //   const paginateBy = pag(groupByKey);
  //   if (state[paginateBy] && state[paginateBy][groupKey] && state[paginateBy][groupKey].count !== undefined) {
  //     state = {
  //       ...state,
  //       [paginateBy]: {
  //         ...state[paginateBy],
  //         [groupKey]: {
  //           ...state[paginateBy][groupKey],
  //           ...(!isUpsert ? {} : { count: state[paginateBy][groupKey].count + 1 }),
  //           rows: {},
  //           loading: {}
  //         }
  //       }
  //     };
  //   }
  //   return state;
  // }

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
      // if the group by key is not possible to create, the item won't be added to the index
      const groupKey = this.getGroupKeyOfItem(groupByFn, item);

      if (groupKey) {
        const indexKey = indexByFn(item);
        groups[groupKey] = { ...groups[groupKey], ...{ [indexKey]: item } }
      }
    })
    return groups;
  }




  private getGroupKeyOfItem(groupByFn: (item: any) => string, item: any): string {
    let groupKey
    try {
      groupKey = groupByFn(item);
    }
    catch (error) { }
    return groupKey;
  }
}

export const by = (name: string) => 'by_' + name;
export const paginateName = (pagBy: PaginateByParam[]) => pagBy.map(p => Object.keys(p)[0]).join('__');

export const pag = (name: string) => 'pag_' + name;
export const paginatedBy = (name: string) => pag(by(name));

export const paginateKey = (pagBy: PaginateByParam[]) => pagBy.map(p => values(p)[0]).join('_');

export function getFromTo(limit: number, offset: number) {
  return getStart(limit, offset) + '_' + getEnd(limit, offset);
}

export function getEnd(limit: number, offset: number) {
  return getStart(limit, offset) + limit;
}

export function getStart(limit: number, offset: number) {
  return offset;
}
