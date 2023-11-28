import { FluxStandardAction } from 'flux-standard-action';
import { equals, indexBy, omit, values } from 'ramda';

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


export const by = (name: string) => 'by_' + name;



const updatingBy = (name: string) => 'updating_' + by(name);
const deletingBy = (name: string) => 'deleting_' + by(name);
const removingBy = (name: string) => 'removing_' + by(name);

function facetteFn<S, Payload, Model>(config: ReducerConfig) {
  return (action, state: S, cb: (innerState) => any) => {
    let outerState;
    ({ outerState, state } = deFacette(config, action, outerState, state));
    const innerState = cb(state);
    return enFacette(config, action, innerState, outerState);
  };
}

function deFacette<S, Payload, Model>(config: ReducerConfig, action: FluxStandardAction<Payload, { items: Model[]; pk?: number; }>, outerState: any, state: S) {
  if (isFacetteByPk(config, action)) {
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

function enFacette<S, Payload, Model>(config: ReducerConfig, action: FluxStandardAction<Payload, { items: Model[]; pk?: number; }>, state: S, outerState: any) {
  if (isFacetteByPk(config, action)) {
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


function isFacetteByPk<Payload, Model>(config: ReducerConfig, action: FluxStandardAction<Payload, { items: Model[]; pk?: number; }>) {
  if (config.facetteByPk) {
    if (!action.meta || action.meta.pk === undefined) throw Error('Facette action must provide pk for facette');
    else return true;
  }
  else return false;
}

/**
 * Creates object where the key returned by the configured indexByFn
 */
function indexKeyObject<Payload, Model>(action: FluxStandardAction<Payload, { items: Model[]; }>, config: ReducerConfig) {
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


export function addToEntityModelMap<Model>(items: Model[], modelName: any) {
  const idx = {};
  for (let i = 0; i < items.length; i++) {
    const item = items[i] as any;
    if (item.pk_entity) {
      idx[item.pk_entity] = {
        modelName,
        fkClass: item.fk_class
      };
    }
  }
  return idx;
}

export function getGroupKeyOfItem(groupByFn: (item: any) => string, item: any): string {
  let groupKey
  try {
    groupKey = groupByFn(item);
  } catch (error) {
    // console.warn(error)
  }
  return groupKey;
}
export function mergeItemsInState<Model>(config: ReducerConfig, state, items: Model[]) {
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
    const oldItem = state[mainIndexKey] ? state[mainIndexKey][itemKey] : undefined;

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
        const oldGroupKey = getGroupKeyOfItem(g.groupByFn, oldItem)
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
        const newGroupKey = getGroupKeyOfItem(g.groupByFn, itemToSet)
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

export function deleteItemsFromState<Model>(config: ReducerConfig, state, items: Model[]) {
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
    const oldItem = state[mainIndexKey] ? state[mainIndexKey][itemKey] : undefined;

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
        const groupKey = getGroupKeyOfItem(g.groupByFn, oldItem)
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
        // state = resetPaginationsByGroup(g.groupByKey, state, groupKey);

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


/**
 * Creates standard reducers for the given model.
 *
 * Adds indexes according to config.
 *
 * S: Interface of the state (slice of store)
 */

export function createModelReducers<S>(actionPrefix: string, modelName: string, config: ReducerConfig) {
  const reducer = (state: S, action: FluxStandardAction<any, Meta<any>>) => {

    if (!state) state = {} as S;
    const facette = facetteFn(config)

    if (action.type === actionPrefix + '.' + modelName + '::LOAD') {

      state = facette(action, state, (innerState) => ({
        // TODO refactor this for partial lodings
        ...omit([by(config.indexBy.keyInStore)], innerState),
        loading: true
      }));

    }

    else if (action.type === actionPrefix + '.' + modelName + '::LOAD_SUCCEEDED') {
      state = facette(action, state, (innerState) => (
        {
          ...mergeItemsInState(config, innerState, action.meta.items),
          loading: false
        }))
    }


    else if (action.type === actionPrefix + '.' + modelName + '::UPSERT') {
      state = facette(action, state, (innerState) => ({
        ...innerState,
        [updatingBy(config.indexBy.keyInStore)]: indexKeyObject(action, config)
      }))
    }

    else if (action.type === actionPrefix + '.' + modelName + '::UPSERT_SUCCEEDED') {
      state = facette(action, state, (innerState) => ({
        ...mergeItemsInState(config, innerState, action.meta.items
        ),
        [updatingBy(config.indexBy.keyInStore)]:
          omit(values(indexKeyObject(action, config)), innerState[updatingBy(config.indexBy.keyInStore)])
      }))
    }

    else if (action.type === actionPrefix + '.' + modelName + '::DELETE') {
      state = facette(action, state, (innerState) => ({
        ...innerState,
        [deletingBy(config.indexBy.keyInStore)]: indexKeyObject(action, config)
      }));
    }

    else if (action.type === actionPrefix + '.' + modelName + '::DELETE_SUCCEEDED') {

      const deletingKey = deletingBy(config.indexBy.keyInStore)
      state = facette(action, state, (innerState) => {
        innerState = {
          ...deleteItemsFromState(config, innerState, action.meta.items),
          [deletingKey]: omit(values(indexKeyObject(action, config)), innerState[deletingBy(config.indexBy.keyInStore)])
        }
        if (!Object.keys(innerState[deletingKey]).length) innerState = omit([deletingKey], innerState);
        return innerState;
      })

    }

    else if (action.type === actionPrefix + '.' + modelName + '::REMOVE') {
      state = facette(action, state, (innerState) => ({
        ...innerState,
        [removingBy(config.indexBy.keyInStore)]: indexKeyObject(action, config)
      }));
    }

    else if (action.type === actionPrefix + '.' + modelName + '::REMOVE_SUCCEEDED') {

      const removingKey = removingBy(config.indexBy.keyInStore)
      state = facette(action, state, (innerState) => {
        innerState = {
          ...deleteItemsFromState(config, innerState, action.meta.items),
          [removingKey]: omit(values(indexKeyObject(action, config)), innerState[removingBy(config.indexBy.keyInStore)])
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

    return state;
  };


  return reducer;
}
