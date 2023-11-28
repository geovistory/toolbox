import { FluxStandardAction } from 'flux-standard-action';
import { LoadPageMeta, LoadPageSucceededMeta } from '../../../_lib/crud-actions-factory';
import { getFromTo } from './getFromTo';
import { getStart } from './getStart';
import { subfieldIdToString } from './subfieldIdToString';
interface ReducerConfig {
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

interface Meta<Model> { items: Model[], pk?: number }

const paginateBy = 'by_subfield_page'

function facetteFn<S>(config: ReducerConfig) {
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
 * Creates pagination reducers for the given model.
 *
 * Adds indexes according to config.
 *
 * S: Interface of the state (slice of store)
 */

export function createPaginationReducers<S>(actionPrefix: string, modelName: string, config: ReducerConfig) {
  const reducer = (state: S, action: FluxStandardAction<any, Meta<any>>) => {

    if (!state) state = {} as S;
    const facette = facetteFn(config)



    if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE') {
      const meta = action.meta as any as LoadPageMeta;
      const key = subfieldIdToString(meta.page)
      const fromTo = getFromTo(meta.page.limit, meta.page.offset);

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

      const key = subfieldIdToString(meta.page)
      const fromTo = getFromTo(meta.page.limit, meta.page.offset);

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
      const key = subfieldIdToString(meta.page)
      const fromTo = getFromTo(meta.page.limit, meta.page.offset);
      const start = getStart(meta.page.limit, meta.page.offset);

      const rows = {}
      if (meta.statements) {
        meta.statements.forEach((stmt, i) => {
          rows[start + i] = stmt;
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
