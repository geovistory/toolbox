/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/reducer-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { composeReducers } from '@angular-redux/form';
import { U } from '@kleiolab/lib-utils';
import { equals, indexBy, keys, omit, values } from 'ramda';
import { combineReducers } from 'redux';
import { subfieldIdToString } from './subfieldIdToString';
/** @type {?} */
export const PR_ENTITY_MODEL_MAP = 'pkEntityModelMap';
/**
 * @record
 * @template ModelName
 */
export function EntityModelAndClass() { }
if (false) {
    /** @type {?} */
    EntityModelAndClass.prototype.modelName;
    /** @type {?} */
    EntityModelAndClass.prototype.fkClass;
}
/**
 * @record
 */
export function ReducerConfigCollection() { }
/**
 * @record
 */
export function ReducerConfig() { }
if (false) {
    /** @type {?|undefined} */
    ReducerConfig.prototype.facetteByPk;
    /** @type {?|undefined} */
    ReducerConfig.prototype.indexBy;
    /** @type {?|undefined} */
    ReducerConfig.prototype.groupBy;
    /** @type {?|undefined} */
    ReducerConfig.prototype.equals;
}
/**
 * @record
 * @template Model
 */
export function Meta() { }
if (false) {
    /** @type {?} */
    Meta.prototype.items;
    /** @type {?|undefined} */
    Meta.prototype.pk;
}
/** @type {?} */
export const by = (/**
 * @param {?} name
 * @return {?}
 */
(name) => 'by_' + name);
// export const paginateName = (pagBy: PaginateByParam[]) => pagBy.map(p => Object.keys(p)[0]).join('__');
// export const pag = (name: string) => 'pag_' + name;
// export const paginatedBy = (name: string) => pag(by(name));
// export const paginateKey = (pagBy: PaginateByParam[]) => pagBy.map(p => values(p)[0]).join('_');
/** @type {?} */
export const paginateBy = 'by_subfield_page';
/**
 * @param {?} limit
 * @param {?} offset
 * @return {?}
 */
export function getFromTo(limit, offset) {
    return getStart(limit, offset) + '_' + getEnd(limit, offset);
}
/**
 * @param {?} limit
 * @param {?} offset
 * @return {?}
 */
export function getEnd(limit, offset) {
    return getStart(limit, offset) + limit;
}
/**
 * @param {?} limit
 * @param {?} offset
 * @return {?}
 */
export function getStart(limit, offset) {
    return offset;
}
/**
 * Creates standard reducers for the given model.
 *
 * Adds indexes according to config.
 *
 * S: Interface of the state (slice of store)
 * @template Payload, Model
 */
export class ReducerFactory {
    /**
     * @param {?} actionPrefix
     * @param {?} configs
     */
    constructor(actionPrefix, configs) {
        this.actionPrefix = actionPrefix;
        this.configs = configs;
        this.updatingBy = (/**
         * @param {?} name
         * @return {?}
         */
        (name) => 'updating_' + by(name));
        this.deletingBy = (/**
         * @param {?} name
         * @return {?}
         */
        (name) => 'deleting_' + by(name));
        this.removingBy = (/**
         * @param {?} name
         * @return {?}
         */
        (name) => 'removing_' + by(name));
    }
    /**
     * @return {?}
     */
    createReducers() {
        /** @type {?} */
        const reducers = {};
        U.obj2KeyValueArr(this.configs).forEach((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            reducers[x.key] = this.createModelReducers(x.key, x.value);
        }));
        /** @type {?} */
        const entityModelMapReducers = keys(this.configs).map((/**
         * @param {?} modelName
         * @return {?}
         */
        modelName => this.createEntityModelMapReducers(modelName)));
        reducers[PR_ENTITY_MODEL_MAP] = composeReducers(...entityModelMapReducers);
        return combineReducers(reducers);
    }
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @return {?}
     */
    createModelReducers(modelName, config) {
        /** @type {?} */
        const actionPrefix = this.actionPrefix;
        /** @type {?} */
        const reducer = (/**
         * @param {?=} state
         * @param {?=} action
         * @return {?}
         */
        (state = {}, action) => {
            /** @type {?} */
            const facette = this.facette(modelName, config);
            if (action.type === actionPrefix + '.' + modelName + '::LOAD') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, omit([by(config.indexBy.keyInStore)], innerState), { loading: true }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_SUCCEEDED') {
                // If action state differs from
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, this.mergeItemsInState(config, innerState, action), { loading: false }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::UPSERT') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, { [this.updatingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config) }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::UPSERT_SUCCEEDED') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, this.mergeItemsInState(config, innerState, action
                // , true
                ), { [this.updatingBy(config.indexBy.keyInStore)]: omit(values(this.indexKeyObject(action, config)), innerState[this.updatingBy(config.indexBy.keyInStore)]) }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::DELETE') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, { [this.deletingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config) }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::DELETE_SUCCEEDED') {
                /** @type {?} */
                const deletingKey = this.deletingBy(config.indexBy.keyInStore);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => {
                    innerState = Object.assign({}, this.deleteItemsFromState(config, action, innerState), { [deletingKey]: omit(values(this.indexKeyObject(action, config)), innerState[this.deletingBy(config.indexBy.keyInStore)]) });
                    if (!Object.keys(innerState[deletingKey]).length)
                        innerState = omit([deletingKey], innerState);
                    return innerState;
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::REMOVE') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, { [this.removingBy(config.indexBy.keyInStore)]: this.indexKeyObject(action, config) }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::REMOVE_SUCCEEDED') {
                /** @type {?} */
                const removingKey = this.removingBy(config.indexBy.keyInStore);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => {
                    innerState = Object.assign({}, this.deleteItemsFromState(config, action, innerState), { [removingKey]: omit(values(this.indexKeyObject(action, config)), innerState[this.removingBy(config.indexBy.keyInStore)]) });
                    if (!Object.keys(innerState[removingKey]).length)
                        innerState = omit([removingKey], innerState);
                    return innerState;
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::FAILED') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, omit([by(config.indexBy.keyInStore)], innerState), { loading: false }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE') {
                /** @type {?} */
                const meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                const key = subfieldIdToString(meta.page);
                /** @type {?} */
                const fromTo = getFromTo(meta.page.limit, meta.page.offset);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, { [paginateBy]: Object.assign({}, innerState[paginateBy], { [key]: Object.assign({}, (innerState[paginateBy] || {})[key], { loading: Object.assign({}, ((innerState[paginateBy] || {})[key] || {}).loading, { [fromTo]: true }) }) }) }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE_FAILED') {
                /** @type {?} */
                const meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                const key = subfieldIdToString(meta.page);
                /** @type {?} */
                const fromTo = getFromTo(meta.page.limit, meta.page.offset);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, { [paginateBy]: Object.assign({}, innerState[paginateBy], { [key]: Object.assign({}, (innerState[paginateBy] || {})[key], { loading: Object.assign({}, ((innerState[paginateBy] || {})[key] || {}).loading, { [fromTo]: false }) }) }) }))));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE_SUCCEEDED') {
                /** @type {?} */
                const meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                const key = subfieldIdToString(meta.page);
                /** @type {?} */
                const fromTo = getFromTo(meta.page.limit, meta.page.offset);
                /** @type {?} */
                const start = getStart(meta.page.limit, meta.page.offset);
                /** @type {?} */
                const rows = {};
                if (meta.pks) {
                    meta.pks.forEach((/**
                     * @param {?} pk
                     * @param {?} i
                     * @return {?}
                     */
                    (pk, i) => {
                        rows[start + i] = pk;
                    }));
                }
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                (innerState) => (Object.assign({}, innerState, { [paginateBy]: Object.assign({}, innerState[paginateBy], { [key]: Object.assign({}, (innerState[paginateBy] || {})[key], { count: meta.count || 0, rows: Object.assign({}, ((innerState[paginateBy] || {})[key] || {}).rows, rows), loading: Object.assign({}, ((innerState[paginateBy] || {})[key] || {}).loading, { [fromTo]: false }) }) }) }))));
            }
            return state;
        });
        return reducer;
    }
    /**
     * Creates an map for pk_entity -> modelName on the level of the schema:
     * example:
     * @private
     * @param {?} modelName
     * @return {?}
     */
    createEntityModelMapReducers(modelName) {
        /** @type {?} */
        const actionPrefix = this.actionPrefix;
        /** @type {?} */
        const reducer = (/**
         * @param {?=} state
         * @param {?=} action
         * @return {?}
         */
        (state = {}, action) => {
            /** @type {?} */
            const modelPath = actionPrefix + '.' + modelName;
            if (!action || !action.meta || !action.meta.items || !action.meta.items.length)
                return state;
            /** @type {?} */
            const items = action.meta.items;
            switch (action.type) {
                case modelPath + '::LOAD_SUCCEEDED':
                case modelPath + '::UPSERT_SUCCEEDED':
                    /** @type {?} */
                    const idx = {};
                    for (let i = 0; i < items.length; i++) {
                        /** @type {?} */
                        const item = (/** @type {?} */ (items[i]));
                        if (item.pk_entity) {
                            idx[item.pk_entity] = {
                                modelName,
                                fkClass: item.fk_class
                            };
                        }
                    }
                    state = Object.assign({}, state, idx);
                    break;
                case modelPath + '::DELETE_SUCCEEDED':
                case modelPath + '::REMOVE_SUCCEEDED':
                    /** @type {?} */
                    const pkEntities = [];
                    for (let i = 0; i < items.length; i++) {
                        /** @type {?} */
                        const item = (/** @type {?} */ (items[i]));
                        if (item.pk_entity) {
                            pkEntities.push(item.pk_entity);
                        }
                    }
                    state = omit(pkEntities, state);
                    break;
                default:
                    break;
            }
            return state;
        });
        return reducer;
    }
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @return {?}
     */
    facette(modelName, config) {
        return (/**
         * @param {?} action
         * @param {?} state
         * @param {?} cb
         * @return {?}
         */
        (action, state, cb) => {
            /** @type {?} */
            let outerState;
            ({ outerState, state } = this.deFacette(modelName, config, action, outerState, state));
            /** @type {?} */
            const innerState = cb(state);
            return this.enFacette(modelName, config, action, innerState, outerState);
        });
    }
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @param {?} action
     * @param {?} outerState
     * @param {?} state
     * @return {?}
     */
    deFacette(modelName, config, action, outerState, state) {
        if (this.isFacetteByPk(config, action)) {
            // outerState = clone(state);
            /** @type {?} */
            const pk = action.meta.pk || 'repo'
            // state = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
            ;
            // state = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
            /** @type {?} */
            const innerState = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
            return {
                outerState: state,
                state: innerState
            };
        }
        return { outerState, state };
    }
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @param {?} action
     * @param {?} state
     * @param {?} outerState
     * @return {?}
     */
    enFacette(modelName, config, action, state, outerState) {
        if (this.isFacetteByPk(config, action)) {
            /** @type {?} */
            const pk = action.meta.pk || 'repo';
            state = Object.assign({}, outerState, { [config.facetteByPk]: Object.assign({}, outerState[config.facetteByPk], { [pk]: state }) });
        }
        return state;
    }
    /**
     * @private
     * @param {?} config
     * @param {?} action
     * @return {?}
     */
    isFacetteByPk(config, action) {
        if (config.facetteByPk) {
            if (!action.meta || action.meta.pk === undefined)
                throw Error('Facette action must provide pk for facette');
            else
                return true;
        }
        else
            return false;
    }
    /**
     * @param {?} config
     * @param {?} action
     * @param {?} state
     * @return {?}
     */
    deleteItemsFromState(config, action, state) {
        /** @type {?} */
        const items = action.meta.items;
        // let state = {}
        /** @type {?} */
        const groupBys = !(config.groupBy && config.groupBy.length) ? [] : config.groupBy;
        /** @type {?} */
        const groups = groupBys.map((/**
         * @param {?} i
         * @return {?}
         */
        i => ({
            groupByKey: by(i.keyInStore),
            groupByFn: i.groupByFn,
        })));
        /** @type {?} */
        const mainIndexKey = by(config.indexBy.keyInStore);
        items.forEach((/**
         * @param {?} removedItem
         * @return {?}
         */
        (removedItem) => {
            // get path segments of new item
            /** @type {?} */
            const itemKey = config.indexBy.indexByFn(removedItem);
            // second segment e.g. '807060'
            // get old item, if exists
            /** @type {?} */
            const oldItem = state[mainIndexKey] ? state[mainIndexKey][itemKey] : undefined;
            // Q: Does the item exists?
            if (oldItem) {
                // A: Yes. use old item does exist
                // remove the removedItem at path in main index
                state = Object.assign({}, state, { [mainIndexKey]: Object.assign({}, omit([itemKey], state[mainIndexKey])) });
                // delete the removedItem at path in the group index
                groups.forEach((/**
                 * @param {?} g
                 * @return {?}
                 */
                g => {
                    /** @type {?} */
                    const groupKey = this.getGroupKeyOfItem(g.groupByFn, removedItem);
                    state = Object.assign({}, state, { [g.groupByKey]: Object.assign({}, state[g.groupByKey], { [groupKey]: Object.assign({}, omit([itemKey], (state[g.groupByKey] || {})[groupKey])) }) });
                    // // cleanup paginations
                    // state = this.resetPaginationsByGroup(g.groupByKey, state, groupKey);
                }));
            }
        }));
        // cleanup main index
        if (Object.keys(state[mainIndexKey]).length < 1) {
            state = Object.assign({}, omit([mainIndexKey], state));
        }
        // cleanup group indices
        groups.forEach((/**
         * @param {?} g
         * @return {?}
         */
        g => {
            // cleanup groups in group index
            Object.keys(state[g.groupByKey]).forEach((/**
             * @param {?} groupKey
             * @return {?}
             */
            groupKey => {
                if (Object.keys(state[g.groupByKey][groupKey]).length < 1) {
                    state = Object.assign({}, state, { [g.groupByKey]: omit([groupKey], state[g.groupByKey]) });
                }
            }));
            // cleanup group index
            if (Object.keys(state[g.groupByKey]).length < 1) {
                state = Object.assign({}, omit([g.groupByKey], state));
            }
        }));
        return state;
    }
    /**
     * @param {?} config
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    mergeItemsInState(config, state, action
    // , resetPaginations = false
    ) {
        /** @type {?} */
        const items = action.meta.items;
        /** @type {?} */
        const groupBys = !(config.groupBy && config.groupBy.length) ? [] : config.groupBy;
        /** @type {?} */
        const groups = groupBys.map((/**
         * @param {?} i
         * @return {?}
         */
        i => ({
            groupByKey: by(i.keyInStore),
            groupByFn: i.groupByFn,
        })));
        /** @type {?} */
        const mainIndexKey = by(config.indexBy.keyInStore);
        items.forEach((/**
         * @param {?} newItem
         * @return {?}
         */
        (newItem) => {
            // get path segments of new item
            /** @type {?} */
            const itemKey = config.indexBy.indexByFn(newItem);
            // second segment e.g. '807060'
            // get old item, if exists
            /** @type {?} */
            const oldItem = state[mainIndexKey] ? state[mainIndexKey][itemKey] : undefined;
            /** @type {?} */
            let itemToSet;
            // Q: Does the item exists, and is it deeply-equal to the new item?
            /** @type {?} */
            const equalsFn = config.equals || equals;
            if (oldItem && equalsFn(newItem, oldItem)) {
                // A: Yes. use old item as itemToSet
                itemToSet = oldItem;
            }
            else {
                // A: No. use new item as itemToSet
                itemToSet = newItem;
                // put the itemToSet at path in main index
                state = Object.assign({}, state, { [mainIndexKey]: Object.assign({}, state[mainIndexKey], { [itemKey]: itemToSet }) });
                // iterate over the group indexes
                groups.forEach((/**
                 * @param {?} g
                 * @return {?}
                 */
                g => {
                    // remove the oldItem from all group indexes
                    /** @type {?} */
                    const oldGroupKey = this.getGroupKeyOfItem(g.groupByFn, oldItem);
                    state = Object.assign({}, state, { [g.groupByKey]: Object.assign({}, state[g.groupByKey], { [oldGroupKey]: Object.assign({}, omit([itemKey], (state[g.groupByKey] || {})[oldGroupKey])) }) });
                    // add the itemToSet to all group indexes, if not undefined
                    /** @type {?} */
                    const newGroupKey = this.getGroupKeyOfItem(g.groupByFn, itemToSet);
                    if (newGroupKey !== undefined) {
                        state = Object.assign({}, state, { [g.groupByKey]: Object.assign({}, state[g.groupByKey], { [newGroupKey]: Object.assign({}, (state[g.groupByKey] || {})[newGroupKey], { [itemKey]: itemToSet }) }) });
                    }
                }));
            }
        }));
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
     * @private
     * @param {?} action
     * @param {?} config
     * @return {?}
     */
    indexKeyObject(action, config) {
        return indexBy((/**
         * @param {?} i
         * @return {?}
         */
        (i) => (i)), action.meta.items
            // filter items that are not (yet) indexable. This is normally the case, when creating new items that have no pk yet.
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            try {
                config.indexBy.indexByFn(item);
                return true;
            }
            catch (error) {
                return false;
            }
        }))
            .map((/**
         * @param {?} item
         * @return {?}
         */
        item => config.indexBy.indexByFn(item))));
    }
    /**
     * @param {?} items
     * @param {?} groupByFn
     * @param {?} indexByFn
     * @return {?}
     */
    groupBy(items, groupByFn, indexByFn) {
        /** @type {?} */
        const groups = {};
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            // if the group by key is not possible to create, the item won't be added to the index
            /** @type {?} */
            const groupKey = this.getGroupKeyOfItem(groupByFn, item);
            if (groupKey) {
                /** @type {?} */
                const indexKey = indexByFn(item);
                groups[groupKey] = Object.assign({}, groups[groupKey], { [indexKey]: item });
            }
        }));
        return groups;
    }
    /**
     * @private
     * @param {?} groupByFn
     * @param {?} item
     * @return {?}
     */
    getGroupKeyOfItem(groupByFn, item) {
        /** @type {?} */
        let groupKey;
        try {
            groupKey = groupByFn(item);
        }
        catch (error) {
        }
        return groupKey;
    }
}
if (false) {
    /** @type {?} */
    ReducerFactory.prototype.updatingBy;
    /** @type {?} */
    ReducerFactory.prototype.deletingBy;
    /** @type {?} */
    ReducerFactory.prototype.removingBy;
    /** @type {?} */
    ReducerFactory.prototype.actionPrefix;
    /** @type {?} */
    ReducerFactory.prototype.configs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvX2hlbHBlcnMvcmVkdWNlci1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFXLE1BQU0sT0FBTyxDQUFDO0FBRWpELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUUxRCxNQUFNLE9BQU8sbUJBQW1CLEdBQUcsa0JBQWtCOzs7OztBQUNyRCx5Q0FHQzs7O0lBRkMsd0NBQXFCOztJQUNyQixzQ0FBZTs7Ozs7QUFHakIsNkNBRUM7Ozs7QUFFRCxtQ0FZQzs7O0lBVkMsb0NBQXFCOztJQUNyQixnQ0FHRTs7SUFDRixnQ0FHSTs7SUFDSiwrQkFBa0M7Ozs7OztBQUdwQywwQkFBNEQ7OztJQUE3QixxQkFBZTs7SUFBQyxrQkFBVzs7O0FBRzFELE1BQU0sT0FBTyxFQUFFOzs7O0FBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7Ozs7OztBQU9oRCxNQUFNLE9BQU8sVUFBVSxHQUFHLGtCQUFrQjs7Ozs7O0FBRTVDLE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBYSxFQUFFLE1BQWM7SUFDckQsT0FBTyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9ELENBQUM7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LENBQUE7UUFDRixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7Ozs7O0lBS08saUJBQWlCLENBQUMsU0FBZ0MsRUFBRSxJQUFTOztZQUMvRCxRQUFRO1FBQ1osSUFBSTtZQUNGLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7UUFBQyxPQUFPLEtBQUssRUFBRTtTQUVmO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGOzs7SUFwUkMsb0NBQXNEOztJQUN0RCxvQ0FBc0Q7O0lBQ3RELG9DQUFzRDs7SUFyUDFDLHNDQUEyQjs7SUFBRSxpQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wb3NlUmVkdWNlcnMgfSBmcm9tICdAYW5ndWxhci1yZWR1eC9mb3JtJztcbmltcG9ydCB7IFUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IGVxdWFscywgaW5kZXhCeSwga2V5cywgb21pdCwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzLCBSZWR1Y2VyIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgTG9hZFBhZ2VNZXRhLCBMb2FkUGFnZVN1Y2NlZWRlZE1ldGEgfSBmcm9tICcuL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuaW1wb3J0IHsgc3ViZmllbGRJZFRvU3RyaW5nIH0gZnJvbSAnLi9zdWJmaWVsZElkVG9TdHJpbmcnO1xuXG5leHBvcnQgY29uc3QgUFJfRU5USVRZX01PREVMX01BUCA9ICdwa0VudGl0eU1vZGVsTWFwJ1xuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlNb2RlbEFuZENsYXNzPE1vZGVsTmFtZT4ge1xuICBtb2RlbE5hbWU6IE1vZGVsTmFtZSxcbiAgZmtDbGFzczogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24ge1xuICBba2V5OiBzdHJpbmddOiBSZWR1Y2VyQ29uZmlnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVkdWNlckNvbmZpZyB7XG4gIC8vIHdyYXBzIGV2ZXJ5dGhpbmcgaW4gZmFjZXR0ZSBuYW1lZCBieSBmYWNldHRlQnlQayBhbmQgZ3JvdXBlZCBieSBhY3Rpb24ubWV0YS5wa1xuICBmYWNldHRlQnlQaz86IHN0cmluZyxcbiAgaW5kZXhCeT86IHtcbiAgICBrZXlJblN0b3JlOiBzdHJpbmc7XG4gICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4gc3RyaW5nO1xuICB9LFxuICBncm91cEJ5Pzoge1xuICAgIGtleUluU3RvcmU6IHN0cmluZztcbiAgICBncm91cEJ5Rm46IChpdGVtKSA9PiBzdHJpbmc7XG4gIH1bXSxcbiAgZXF1YWxzPzogKGl0ZW1BLCBpdGVtQikgPT4gYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1ldGE8TW9kZWw+IHsgaXRlbXM6IE1vZGVsW10sIHBrPzogbnVtYmVyIH1cblxuXG5leHBvcnQgY29uc3QgYnkgPSAobmFtZTogc3RyaW5nKSA9PiAnYnlfJyArIG5hbWU7XG4vLyBleHBvcnQgY29uc3QgcGFnaW5hdGVOYW1lID0gKHBhZ0J5OiBQYWdpbmF0ZUJ5UGFyYW1bXSkgPT4gcGFnQnkubWFwKHAgPT4gT2JqZWN0LmtleXMocClbMF0pLmpvaW4oJ19fJyk7XG5cbi8vIGV4cG9ydCBjb25zdCBwYWcgPSAobmFtZTogc3RyaW5nKSA9PiAncGFnXycgKyBuYW1lO1xuLy8gZXhwb3J0IGNvbnN0IHBhZ2luYXRlZEJ5ID0gKG5hbWU6IHN0cmluZykgPT4gcGFnKGJ5KG5hbWUpKTtcblxuLy8gZXhwb3J0IGNvbnN0IHBhZ2luYXRlS2V5ID0gKHBhZ0J5OiBQYWdpbmF0ZUJ5UGFyYW1bXSkgPT4gcGFnQnkubWFwKHAgPT4gdmFsdWVzKHApWzBdKS5qb2luKCdfJyk7XG5leHBvcnQgY29uc3QgcGFnaW5hdGVCeSA9ICdieV9zdWJmaWVsZF9wYWdlJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnJvbVRvKGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gIHJldHVybiBnZXRTdGFydChsaW1pdCwgb2Zmc2V0KSArICdfJyArIGdldEVuZChsaW1pdCwgb2Zmc2V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZChsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xuICByZXR1cm4gZ2V0U3RhcnQobGltaXQsIG9mZnNldCkgKyBsaW1pdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0KGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gIHJldHVybiBvZmZzZXQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBzdGFuZGFyZCByZWR1Y2VycyBmb3IgdGhlIGdpdmVuIG1vZGVsLlxuICpcbiAqIEFkZHMgaW5kZXhlcyBhY2NvcmRpbmcgdG8gY29uZmlnLlxuICpcbiAqIFM6IEludGVyZmFjZSBvZiB0aGUgc3RhdGUgKHNsaWNlIG9mIHN0b3JlKVxuICovXG5leHBvcnQgY2xhc3MgUmVkdWNlckZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+IHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWN0aW9uUHJlZml4OiBzdHJpbmcsIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbikgeyB9XG5cbiAgcHVibGljIGNyZWF0ZVJlZHVjZXJzKCkge1xuXG4gICAgY29uc3QgcmVkdWNlcnMgPSB7fVxuICAgIFUub2JqMktleVZhbHVlQXJyKHRoaXMuY29uZmlncykuZm9yRWFjaCh4ID0+IHtcbiAgICAgIHJlZHVjZXJzW3gua2V5XSA9IHRoaXMuY3JlYXRlTW9kZWxSZWR1Y2Vycyh4LmtleSwgeC52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBlbnRpdHlNb2RlbE1hcFJlZHVjZXJzID0ga2V5cyh0aGlzLmNvbmZpZ3MpLm1hcChtb2RlbE5hbWUgPT4gdGhpcy5jcmVhdGVFbnRpdHlNb2RlbE1hcFJlZHVjZXJzKG1vZGVsTmFtZSkpXG4gICAgcmVkdWNlcnNbUFJfRU5USVRZX01PREVMX01BUF0gPSBjb21wb3NlUmVkdWNlcnMoLi4uZW50aXR5TW9kZWxNYXBSZWR1Y2VycylcblxuICAgIHJldHVybiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1vZGVsUmVkdWNlcnMobW9kZWxOYW1lLCBjb25maWc6IFJlZHVjZXJDb25maWcpIHtcbiAgICBjb25zdCBhY3Rpb25QcmVmaXggPSB0aGlzLmFjdGlvblByZWZpeDtcbiAgICBjb25zdCByZWR1Y2VyID0gKHN0YXRlID0ge30sIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1ldGE8TW9kZWw+PikgPT4ge1xuXG4gICAgICBjb25zdCBmYWNldHRlID0gdGhpcy5mYWNldHRlKG1vZGVsTmFtZSwgY29uZmlnKVxuXG4gICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkxPQUQnKSB7XG5cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC8vIFRPRE8gcmVmYWN0b3IgdGhpcyBmb3IgcGFydGlhbCBsb2RpbmdzXG4gICAgICAgICAgLi4ub21pdChbYnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldLCBpbm5lclN0YXRlKSxcbiAgICAgICAgICBsb2FkaW5nOiB0cnVlXG4gICAgICAgIH0pKTtcblxuICAgICAgfVxuXG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpMT0FEX1NVQ0NFRURFRCcpIHtcbiAgICAgICAgLy8gSWYgYWN0aW9uIHN0YXRlIGRpZmZlcnMgZnJvbVxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+IChcbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi50aGlzLm1lcmdlSXRlbXNJblN0YXRlKGNvbmZpZywgaW5uZXJTdGF0ZSwgYWN0aW9uKSxcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgICAgfSkpXG4gICAgICB9XG5cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OlVQU0VSVCcpIHtcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3RoaXMudXBkYXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV06IHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpXG4gICAgICAgIH0pKVxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6VVBTRVJUX1NVQ0NFRURFRCcpIHtcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLiB0aGlzLm1lcmdlSXRlbXNJblN0YXRlKGNvbmZpZywgaW5uZXJTdGF0ZSwgYWN0aW9uXG4gICAgICAgICAgICAvLyAsIHRydWVcbiAgICAgICAgICApLFxuICAgICAgICAgIFt0aGlzLnVwZGF0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldOlxuICAgICAgICAgICAgb21pdCh2YWx1ZXModGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZykpLCBpbm5lclN0YXRlW3RoaXMudXBkYXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV0pXG4gICAgICAgIH0pKVxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6REVMRVRFJykge1xuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbdGhpcy5kZWxldGluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXTogdGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZylcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6REVMRVRFX1NVQ0NFRURFRCcpIHtcblxuICAgICAgICBjb25zdCBkZWxldGluZ0tleSA9IHRoaXMuZGVsZXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKVxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+IHtcbiAgICAgICAgICBpbm5lclN0YXRlID0ge1xuICAgICAgICAgICAgLi4udGhpcy5kZWxldGVJdGVtc0Zyb21TdGF0ZShjb25maWcsIGFjdGlvbiwgaW5uZXJTdGF0ZSksXG4gICAgICAgICAgICBbZGVsZXRpbmdLZXldOiBvbWl0KHZhbHVlcyh0aGlzLmluZGV4S2V5T2JqZWN0KGFjdGlvbiwgY29uZmlnKSksIGlubmVyU3RhdGVbdGhpcy5kZWxldGluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhpbm5lclN0YXRlW2RlbGV0aW5nS2V5XSkubGVuZ3RoKSBpbm5lclN0YXRlID0gb21pdChbZGVsZXRpbmdLZXldLCBpbm5lclN0YXRlKTtcbiAgICAgICAgICByZXR1cm4gaW5uZXJTdGF0ZTtcbiAgICAgICAgfSlcblxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6UkVNT1ZFJykge1xuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbdGhpcy5yZW1vdmluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXTogdGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZylcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6UkVNT1ZFX1NVQ0NFRURFRCcpIHtcblxuICAgICAgICBjb25zdCByZW1vdmluZ0tleSA9IHRoaXMucmVtb3ZpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKVxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+IHtcbiAgICAgICAgICBpbm5lclN0YXRlID0ge1xuICAgICAgICAgICAgLi4udGhpcy5kZWxldGVJdGVtc0Zyb21TdGF0ZShjb25maWcsIGFjdGlvbiwgaW5uZXJTdGF0ZSksXG4gICAgICAgICAgICBbcmVtb3ZpbmdLZXldOiBvbWl0KHZhbHVlcyh0aGlzLmluZGV4S2V5T2JqZWN0KGFjdGlvbiwgY29uZmlnKSksIGlubmVyU3RhdGVbdGhpcy5yZW1vdmluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhpbm5lclN0YXRlW3JlbW92aW5nS2V5XSkubGVuZ3RoKSBpbm5lclN0YXRlID0gb21pdChbcmVtb3ZpbmdLZXldLCBpbm5lclN0YXRlKTtcbiAgICAgICAgICByZXR1cm4gaW5uZXJTdGF0ZTtcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkZBSUxFRCcpIHtcblxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICAuLi5vbWl0KFtieShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV0sIGlubmVyU3RhdGUpLFxuICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgIH0pKTtcblxuICAgICAgfVxuXG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpMT0FEX1BBR0UnKSB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YSBhcyBhbnkgYXMgTG9hZFBhZ2VNZXRhO1xuICAgICAgICBjb25zdCBrZXkgPSBzdWJmaWVsZElkVG9TdHJpbmcobWV0YS5wYWdlKVxuICAgICAgICBjb25zdCBmcm9tVG8gPSBnZXRGcm9tVG8obWV0YS5wYWdlLmxpbWl0LCBtZXRhLnBhZ2Uub2Zmc2V0KTtcblxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbcGFnaW5hdGVCeV06IHtcbiAgICAgICAgICAgIC4uLmlubmVyU3RhdGVbcGFnaW5hdGVCeV0sXG4gICAgICAgICAgICBba2V5XToge1xuICAgICAgICAgICAgICAuLi4oaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSxcbiAgICAgICAgICAgICAgbG9hZGluZzoge1xuICAgICAgICAgICAgICAgIC4uLigoaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSB8fCB7fSkubG9hZGluZyxcbiAgICAgICAgICAgICAgICBbZnJvbVRvXTogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6TE9BRF9QQUdFX0ZBSUxFRCcpIHtcbiAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhIGFzIGFueSBhcyBMb2FkUGFnZU1ldGE7XG5cbiAgICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKG1ldGEucGFnZSlcbiAgICAgICAgY29uc3QgZnJvbVRvID0gZ2V0RnJvbVRvKG1ldGEucGFnZS5saW1pdCwgbWV0YS5wYWdlLm9mZnNldCk7XG5cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3BhZ2luYXRlQnldOiB7XG4gICAgICAgICAgICAuLi5pbm5lclN0YXRlW3BhZ2luYXRlQnldLFxuICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgLi4uKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IHtcbiAgICAgICAgICAgICAgICAuLi4oKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0gfHwge30pLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgW2Zyb21Ub106IGZhbHNlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkxPQURfUEFHRV9TVUNDRUVERUQnKSB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YSBhcyBhbnkgYXMgTG9hZFBhZ2VTdWNjZWVkZWRNZXRhO1xuICAgICAgICBjb25zdCBrZXkgPSBzdWJmaWVsZElkVG9TdHJpbmcobWV0YS5wYWdlKVxuICAgICAgICBjb25zdCBmcm9tVG8gPSBnZXRGcm9tVG8obWV0YS5wYWdlLmxpbWl0LCBtZXRhLnBhZ2Uub2Zmc2V0KTtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBnZXRTdGFydChtZXRhLnBhZ2UubGltaXQsIG1ldGEucGFnZS5vZmZzZXQpO1xuXG4gICAgICAgIGNvbnN0IHJvd3MgPSB7fVxuICAgICAgICBpZiAobWV0YS5wa3MpIHtcbiAgICAgICAgICBtZXRhLnBrcy5mb3JFYWNoKChwaywgaSkgPT4ge1xuICAgICAgICAgICAgcm93c1tzdGFydCArIGldID0gcGs7XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbcGFnaW5hdGVCeV06IHtcbiAgICAgICAgICAgIC4uLmlubmVyU3RhdGVbcGFnaW5hdGVCeV0sXG4gICAgICAgICAgICBba2V5XToge1xuICAgICAgICAgICAgICAuLi4oaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSxcbiAgICAgICAgICAgICAgY291bnQ6IG1ldGEuY291bnQgfHwgMCxcbiAgICAgICAgICAgICAgcm93czoge1xuICAgICAgICAgICAgICAgIC4uLigoaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSB8fCB7fSkucm93cyxcbiAgICAgICAgICAgICAgICAuLi5yb3dzXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IHtcbiAgICAgICAgICAgICAgICAuLi4oKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0gfHwge30pLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgW2Zyb21Ub106IGZhbHNlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHJlZHVjZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBtYXAgZm9yIHBrX2VudGl0eSAtPiBtb2RlbE5hbWUgb24gdGhlIGxldmVsIG9mIHRoZSBzY2hlbWE6XG4gICAqIGV4YW1wbGU6XG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUVudGl0eU1vZGVsTWFwUmVkdWNlcnMobW9kZWxOYW1lKTogUmVkdWNlcjx1bmtub3duLCBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWV0YTxNb2RlbD4+PiB7XG4gICAgY29uc3QgYWN0aW9uUHJlZml4ID0gdGhpcy5hY3Rpb25QcmVmaXg7XG4gICAgY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IHt9LCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNZXRhPE1vZGVsPj4pID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsUGF0aCA9IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZTtcblxuICAgICAgaWYgKCFhY3Rpb24gfHwgIWFjdGlvbi5tZXRhIHx8ICFhY3Rpb24ubWV0YS5pdGVtcyB8fCAhYWN0aW9uLm1ldGEuaXRlbXMubGVuZ3RoKSByZXR1cm4gc3RhdGU7XG4gICAgICBjb25zdCBpdGVtcyA9IGFjdGlvbi5tZXRhLml0ZW1zO1xuXG4gICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgbW9kZWxQYXRoICsgJzo6TE9BRF9TVUNDRUVERUQnOlxuICAgICAgICBjYXNlIG1vZGVsUGF0aCArICc6OlVQU0VSVF9TVUNDRUVERUQnOlxuICAgICAgICAgIGNvbnN0IGlkeCA9IHt9XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldIGFzIGFueTtcbiAgICAgICAgICAgIGlmIChpdGVtLnBrX2VudGl0eSkge1xuICAgICAgICAgICAgICBpZHhbaXRlbS5wa19lbnRpdHldID0ge1xuICAgICAgICAgICAgICAgIG1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICBma0NsYXNzOiBpdGVtLmZrX2NsYXNzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIC4uLmlkeFxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIG1vZGVsUGF0aCArICc6OkRFTEVURV9TVUNDRUVERUQnOlxuICAgICAgICBjYXNlIG1vZGVsUGF0aCArICc6OlJFTU9WRV9TVUNDRUVERUQnOlxuICAgICAgICAgIGNvbnN0IHBrRW50aXRpZXMgPSBbXVxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpXSBhcyBhbnk7XG4gICAgICAgICAgICBpZiAoaXRlbS5wa19lbnRpdHkpIHtcbiAgICAgICAgICAgICAgcGtFbnRpdGllcy5wdXNoKGl0ZW0ucGtfZW50aXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhdGUgPSBvbWl0KHBrRW50aXRpZXMsIHN0YXRlKVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcbiAgICByZXR1cm4gcmVkdWNlcjtcbiAgfVxuXG5cbiAgdXBkYXRpbmdCeSA9IChuYW1lOiBzdHJpbmcpID0+ICd1cGRhdGluZ18nICsgYnkobmFtZSk7XG4gIGRlbGV0aW5nQnkgPSAobmFtZTogc3RyaW5nKSA9PiAnZGVsZXRpbmdfJyArIGJ5KG5hbWUpO1xuICByZW1vdmluZ0J5ID0gKG5hbWU6IHN0cmluZykgPT4gJ3JlbW92aW5nXycgKyBieShuYW1lKTtcblxuXG5cbiAgcHJpdmF0ZSBmYWNldHRlKG1vZGVsTmFtZTogYW55LCBjb25maWc6IFJlZHVjZXJDb25maWcpIHtcbiAgICByZXR1cm4gKGFjdGlvbiwgc3RhdGUsIGNiOiAoaW5uZXJTdGF0ZSkgPT4gYW55KSA9PiB7XG4gICAgICBsZXQgb3V0ZXJTdGF0ZTtcbiAgICAgICh7IG91dGVyU3RhdGUsIHN0YXRlIH0gPSB0aGlzLmRlRmFjZXR0ZShtb2RlbE5hbWUsIGNvbmZpZywgYWN0aW9uLCBvdXRlclN0YXRlLCBzdGF0ZSkpO1xuICAgICAgY29uc3QgaW5uZXJTdGF0ZSA9IGNiKHN0YXRlKTtcbiAgICAgIHJldHVybiB0aGlzLmVuRmFjZXR0ZShtb2RlbE5hbWUsIGNvbmZpZywgYWN0aW9uLCBpbm5lclN0YXRlLCBvdXRlclN0YXRlKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBkZUZhY2V0dGUobW9kZWxOYW1lOiBzdHJpbmcsIGNvbmZpZzogUmVkdWNlckNvbmZpZywgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgcGs/OiBudW1iZXI7IH0+LCBvdXRlclN0YXRlOiBhbnksIHN0YXRlOiB7fSkge1xuICAgIGlmICh0aGlzLmlzRmFjZXR0ZUJ5UGsoY29uZmlnLCBhY3Rpb24pKSB7XG4gICAgICAvLyBvdXRlclN0YXRlID0gY2xvbmUoc3RhdGUpO1xuICAgICAgY29uc3QgcGsgPSBhY3Rpb24ubWV0YS5wayB8fCAncmVwbydcbiAgICAgIC8vIHN0YXRlID0gIXN0YXRlW2NvbmZpZy5mYWNldHRlQnlQa10gPyB7fSA6IHN0YXRlW2NvbmZpZy5mYWNldHRlQnlQa11bcGtdIHx8IHt9O1xuICAgICAgY29uc3QgaW5uZXJTdGF0ZSA9ICFzdGF0ZVtjb25maWcuZmFjZXR0ZUJ5UGtdID8ge30gOiBzdGF0ZVtjb25maWcuZmFjZXR0ZUJ5UGtdW3BrXSB8fCB7fTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG91dGVyU3RhdGU6IHN0YXRlLFxuICAgICAgICBzdGF0ZTogaW5uZXJTdGF0ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBvdXRlclN0YXRlLCBzdGF0ZSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBlbkZhY2V0dGUobW9kZWxOYW1lOiBzdHJpbmcsIGNvbmZpZzogUmVkdWNlckNvbmZpZywgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgcGs/OiBudW1iZXI7IH0+LCBzdGF0ZToge30sIG91dGVyU3RhdGU6IGFueSkge1xuICAgIGlmICh0aGlzLmlzRmFjZXR0ZUJ5UGsoY29uZmlnLCBhY3Rpb24pKSB7XG4gICAgICBjb25zdCBwayA9IGFjdGlvbi5tZXRhLnBrIHx8ICdyZXBvJ1xuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLm91dGVyU3RhdGUsXG4gICAgICAgIFtjb25maWcuZmFjZXR0ZUJ5UGtdOiB7XG4gICAgICAgICAgLi4ub3V0ZXJTdGF0ZVtjb25maWcuZmFjZXR0ZUJ5UGtdLFxuICAgICAgICAgIFtwa106IHN0YXRlXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBpc0ZhY2V0dGVCeVBrKGNvbmZpZzogUmVkdWNlckNvbmZpZywgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgcGs/OiBudW1iZXI7IH0+KSB7XG4gICAgaWYgKGNvbmZpZy5mYWNldHRlQnlQaykge1xuICAgICAgaWYgKCFhY3Rpb24ubWV0YSB8fCBhY3Rpb24ubWV0YS5wayA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignRmFjZXR0ZSBhY3Rpb27CoG11c3QgcHJvdmlkZSBwayBmb3IgZmFjZXR0ZScpO1xuICAgICAgZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG5cbiAgZGVsZXRlSXRlbXNGcm9tU3RhdGUoY29uZmlnOiBSZWR1Y2VyQ29uZmlnLCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7IGl0ZW1zOiBNb2RlbFtdOyB9Piwgc3RhdGUpIHtcbiAgICBjb25zdCBpdGVtcyA9IGFjdGlvbi5tZXRhLml0ZW1zO1xuICAgIC8vIGxldCBzdGF0ZSA9IHt9XG4gICAgY29uc3QgZ3JvdXBCeXMgPSAhKGNvbmZpZy5ncm91cEJ5ICYmIGNvbmZpZy5ncm91cEJ5Lmxlbmd0aCkgPyBbXSA6IGNvbmZpZy5ncm91cEJ5O1xuICAgIGNvbnN0IGdyb3VwcyA9IGdyb3VwQnlzLm1hcChpID0+ICh7XG4gICAgICBncm91cEJ5S2V5OiBieShpLmtleUluU3RvcmUpLFxuICAgICAgZ3JvdXBCeUZuOiBpLmdyb3VwQnlGbixcbiAgICB9KSlcbiAgICBjb25zdCBtYWluSW5kZXhLZXkgPSBieShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKTsgLy8gZmlyc3Qgc2VnbWVudCBlLmcuICdieV9wa19lbnRpdHknXG5cbiAgICBpdGVtcy5mb3JFYWNoKChyZW1vdmVkSXRlbSkgPT4ge1xuICAgICAgLy8gZ2V0IHBhdGggc2VnbWVudHMgb2YgbmV3IGl0ZW1cbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBjb25maWcuaW5kZXhCeS5pbmRleEJ5Rm4ocmVtb3ZlZEl0ZW0pOyAvLyBzZWNvbmQgc2VnbWVudCBlLmcuICc4MDcwNjAnXG5cbiAgICAgIC8vIGdldCBvbGQgaXRlbSwgaWYgZXhpc3RzXG4gICAgICBjb25zdCBvbGRJdGVtID0gc3RhdGVbbWFpbkluZGV4S2V5XSA/IHN0YXRlW21haW5JbmRleEtleV1baXRlbUtleV0gOiB1bmRlZmluZWQ7XG5cbiAgICAgIC8vIFE6IERvZXMgdGhlIGl0ZW0gZXhpc3RzP1xuICAgICAgaWYgKG9sZEl0ZW0pIHtcbiAgICAgICAgLy8gQTogWWVzLiB1c2Ugb2xkIGl0ZW0gZG9lcyBleGlzdFxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgcmVtb3ZlZEl0ZW0gYXQgcGF0aCBpbiBtYWluIGluZGV4XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIFttYWluSW5kZXhLZXldOiB7XG4gICAgICAgICAgICAuLi5vbWl0KFtpdGVtS2V5XSwgc3RhdGVbbWFpbkluZGV4S2V5XSksXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVsZXRlIHRoZSByZW1vdmVkSXRlbSBhdCBwYXRoIGluIHRoZSBncm91cCBpbmRleFxuICAgICAgICBncm91cHMuZm9yRWFjaChnID0+IHtcbiAgICAgICAgICBjb25zdCBncm91cEtleSA9IHRoaXMuZ2V0R3JvdXBLZXlPZkl0ZW0oZy5ncm91cEJ5Rm4sIHJlbW92ZWRJdGVtKVxuICAgICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBbZy5ncm91cEJ5S2V5XToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZVtnLmdyb3VwQnlLZXldLFxuICAgICAgICAgICAgICBbZ3JvdXBLZXldOiB7XG4gICAgICAgICAgICAgICAgLi4ub21pdChbaXRlbUtleV0sIChzdGF0ZVtnLmdyb3VwQnlLZXldIHx8IHt9KVtncm91cEtleV0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gLy8gY2xlYW51cCBwYWdpbmF0aW9uc1xuICAgICAgICAgIC8vIHN0YXRlID0gdGhpcy5yZXNldFBhZ2luYXRpb25zQnlHcm91cChnLmdyb3VwQnlLZXksIHN0YXRlLCBncm91cEtleSk7XG5cbiAgICAgICAgfSlcbiAgICAgIH1cblxuXG4gICAgfSlcblxuICAgIC8vIGNsZWFudXAgbWFpbiBpbmRleFxuICAgIGlmIChPYmplY3Qua2V5cyhzdGF0ZVttYWluSW5kZXhLZXldKS5sZW5ndGggPCAxKSB7XG4gICAgICBzdGF0ZSA9IHsgLi4ub21pdChbbWFpbkluZGV4S2V5XSwgc3RhdGUpIH1cbiAgICB9XG4gICAgLy8gY2xlYW51cCBncm91cCBpbmRpY2VzXG4gICAgZ3JvdXBzLmZvckVhY2goZyA9PiB7XG5cbiAgICAgIC8vIGNsZWFudXAgZ3JvdXBzIGluIGdyb3VwIGluZGV4XG4gICAgICBPYmplY3Qua2V5cyhzdGF0ZVtnLmdyb3VwQnlLZXldKS5mb3JFYWNoKGdyb3VwS2V5ID0+IHtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoc3RhdGVbZy5ncm91cEJ5S2V5XVtncm91cEtleV0pLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgW2cuZ3JvdXBCeUtleV06IG9taXQoW2dyb3VwS2V5XSwgc3RhdGVbZy5ncm91cEJ5S2V5XSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIGNsZWFudXAgZ3JvdXAgaW5kZXhcbiAgICAgIGlmIChPYmplY3Qua2V5cyhzdGF0ZVtnLmdyb3VwQnlLZXldKS5sZW5ndGggPCAxKSB7XG4gICAgICAgIHN0YXRlID0geyAuLi5vbWl0KFtnLmdyb3VwQnlLZXldLCBzdGF0ZSkgfVxuICAgICAgfVxuICAgIH0pXG5cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIG1lcmdlSXRlbXNJblN0YXRlKGNvbmZpZzogUmVkdWNlckNvbmZpZywgc3RhdGUsIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHsgaXRlbXM6IE1vZGVsW107IH0+XG4gICAgLy8gLCByZXNldFBhZ2luYXRpb25zID0gZmFsc2VcbiAgKSB7XG4gICAgY29uc3QgaXRlbXMgPSBhY3Rpb24ubWV0YS5pdGVtcztcbiAgICBjb25zdCBncm91cEJ5cyA9ICEoY29uZmlnLmdyb3VwQnkgJiYgY29uZmlnLmdyb3VwQnkubGVuZ3RoKSA/IFtdIDogY29uZmlnLmdyb3VwQnk7XG4gICAgY29uc3QgZ3JvdXBzID0gZ3JvdXBCeXMubWFwKGkgPT4gKHtcbiAgICAgIGdyb3VwQnlLZXk6IGJ5KGkua2V5SW5TdG9yZSksXG4gICAgICBncm91cEJ5Rm46IGkuZ3JvdXBCeUZuLFxuICAgIH0pKVxuXG4gICAgY29uc3QgbWFpbkluZGV4S2V5ID0gYnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSk7IC8vIGZpcnN0IHNlZ21lbnQgZS5nLiAnYnlfcGtfZW50aXR5J1xuXG4gICAgaXRlbXMuZm9yRWFjaCgobmV3SXRlbSkgPT4ge1xuICAgICAgLy8gZ2V0IHBhdGggc2VnbWVudHMgb2YgbmV3IGl0ZW1cbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBjb25maWcuaW5kZXhCeS5pbmRleEJ5Rm4obmV3SXRlbSk7IC8vIHNlY29uZCBzZWdtZW50IGUuZy4gJzgwNzA2MCdcblxuICAgICAgLy8gZ2V0IG9sZCBpdGVtLCBpZiBleGlzdHNcbiAgICAgIGNvbnN0IG9sZEl0ZW0gPSBzdGF0ZVttYWluSW5kZXhLZXldID8gc3RhdGVbbWFpbkluZGV4S2V5XVtpdGVtS2V5XSA6IHVuZGVmaW5lZDtcblxuICAgICAgbGV0IGl0ZW1Ub1NldDtcblxuICAgICAgLy8gUTogRG9lcyB0aGUgaXRlbSBleGlzdHMsIGFuZCBpcyBpdCBkZWVwbHktZXF1YWwgdG8gdGhlIG5ldyBpdGVtP1xuICAgICAgY29uc3QgZXF1YWxzRm4gPSBjb25maWcuZXF1YWxzIHx8IGVxdWFsc1xuICAgICAgaWYgKG9sZEl0ZW0gJiYgZXF1YWxzRm4obmV3SXRlbSwgb2xkSXRlbSkpIHtcbiAgICAgICAgLy8gQTogWWVzLiB1c2Ugb2xkIGl0ZW0gYXMgaXRlbVRvU2V0XG4gICAgICAgIGl0ZW1Ub1NldCA9IG9sZEl0ZW07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gQTogTm8uIHVzZSBuZXcgaXRlbSBhcyBpdGVtVG9TZXRcbiAgICAgICAgaXRlbVRvU2V0ID0gbmV3SXRlbTtcblxuICAgICAgICAvLyBwdXQgdGhlIGl0ZW1Ub1NldCBhdCBwYXRoIGluIG1haW4gaW5kZXhcbiAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgW21haW5JbmRleEtleV06IHtcbiAgICAgICAgICAgIC4uLnN0YXRlW21haW5JbmRleEtleV0sXG4gICAgICAgICAgICBbaXRlbUtleV06IGl0ZW1Ub1NldFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgZ3JvdXAgaW5kZXhlc1xuICAgICAgICBncm91cHMuZm9yRWFjaChnID0+IHtcbiAgICAgICAgICAvLyByZW1vdmUgdGhlIG9sZEl0ZW0gZnJvbSBhbGwgZ3JvdXAgaW5kZXhlc1xuICAgICAgICAgIGNvbnN0IG9sZEdyb3VwS2V5ID0gdGhpcy5nZXRHcm91cEtleU9mSXRlbShnLmdyb3VwQnlGbiwgb2xkSXRlbSlcbiAgICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgW2cuZ3JvdXBCeUtleV06IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGVbZy5ncm91cEJ5S2V5XSxcbiAgICAgICAgICAgICAgW29sZEdyb3VwS2V5XToge1xuICAgICAgICAgICAgICAgIC4uLm9taXQoW2l0ZW1LZXldLCAoc3RhdGVbZy5ncm91cEJ5S2V5XSB8fCB7fSlbb2xkR3JvdXBLZXldKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gYWRkIHRoZSBpdGVtVG9TZXQgdG8gYWxsIGdyb3VwIGluZGV4ZXMsIGlmIG5vdCB1bmRlZmluZWRcbiAgICAgICAgICBjb25zdCBuZXdHcm91cEtleSA9IHRoaXMuZ2V0R3JvdXBLZXlPZkl0ZW0oZy5ncm91cEJ5Rm4sIGl0ZW1Ub1NldClcbiAgICAgICAgICBpZiAobmV3R3JvdXBLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICBbZy5ncm91cEJ5S2V5XToge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlW2cuZ3JvdXBCeUtleV0sXG4gICAgICAgICAgICAgICAgW25ld0dyb3VwS2V5XToge1xuICAgICAgICAgICAgICAgICAgLi4uKHN0YXRlW2cuZ3JvdXBCeUtleV0gfHwge30pW25ld0dyb3VwS2V5XSxcbiAgICAgICAgICAgICAgICAgIFtpdGVtS2V5XTogaXRlbVRvU2V0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcblxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cblxuICAvLyAvKipcbiAgLy8gICogcmVzZXRzIHBhZ2luYXRpb24gd2l0aGluIGEgZ3JvdXAsIGUuZy4gJ3BhZ19ieV9ma19wcm9wZXJ0eSdcbiAgLy8gICogVE9ETzogY2hlY2sgaWYgY2FuIGJlIGRlbGV0ZWRcbiAgLy8gICovXG4gIC8vIHByaXZhdGUgcmVzZXRQYWdpbmF0aW9uc0J5R3JvdXAoZ3JvdXBCeUtleTogc3RyaW5nLCBzdGF0ZTogYW55LCBncm91cEtleTogYW55LCBpc1Vwc2VydCA9IGZhbHNlKSB7XG4gIC8vICAgY29uc3QgcGFnaW5hdGVCeSA9IHBhZyhncm91cEJ5S2V5KTtcbiAgLy8gICBpZiAoc3RhdGVbcGFnaW5hdGVCeV0gJiYgc3RhdGVbcGFnaW5hdGVCeV1bZ3JvdXBLZXldICYmIHN0YXRlW3BhZ2luYXRlQnldW2dyb3VwS2V5XS5jb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gIC8vICAgICBzdGF0ZSA9IHtcbiAgLy8gICAgICAgLi4uc3RhdGUsXG4gIC8vICAgICAgIFtwYWdpbmF0ZUJ5XToge1xuICAvLyAgICAgICAgIC4uLnN0YXRlW3BhZ2luYXRlQnldLFxuICAvLyAgICAgICAgIFtncm91cEtleV06IHtcbiAgLy8gICAgICAgICAgIC4uLnN0YXRlW3BhZ2luYXRlQnldW2dyb3VwS2V5XSxcbiAgLy8gICAgICAgICAgIC4uLighaXNVcHNlcnQgPyB7fSA6IHsgY291bnQ6IHN0YXRlW3BhZ2luYXRlQnldW2dyb3VwS2V5XS5jb3VudCArIDEgfSksXG4gIC8vICAgICAgICAgICByb3dzOiB7fSxcbiAgLy8gICAgICAgICAgIGxvYWRpbmc6IHt9XG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICB9XG4gIC8vICAgICB9O1xuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gc3RhdGU7XG4gIC8vIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBvYmplY3Qgd2hlcmUgdGhlIGtleSByZXR1cm5lZCBieSB0aGUgY29uZmlndXJlZCBpbmRleEJ5Rm5cbiAgICovXG4gIHByaXZhdGUgaW5kZXhLZXlPYmplY3QoYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgfT4sIGNvbmZpZzogUmVkdWNlckNvbmZpZykge1xuICAgIHJldHVybiBpbmRleEJ5KChpKSA9PiAoaSksIGFjdGlvbi5tZXRhLml0ZW1zXG4gICAgICAvLyBmaWx0ZXIgaXRlbXMgdGhhdCBhcmUgbm90ICh5ZXQpIGluZGV4YWJsZS4gVGhpcyBpcyBub3JtYWxseSB0aGUgY2FzZSwgd2hlbiBjcmVhdGluZyBuZXcgaXRlbXMgdGhhdCBoYXZlIG5vIHBrIHlldC5cbiAgICAgIC5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uZmlnLmluZGV4QnkuaW5kZXhCeUZuKGl0ZW0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5tYXAoaXRlbSA9PiBjb25maWcuaW5kZXhCeS5pbmRleEJ5Rm4oaXRlbSkpKTtcbiAgfVxuXG4gIGdyb3VwQnkoaXRlbXM6IGFueVtdLCBncm91cEJ5Rm46IChpdGVtKSA9PiBzdHJpbmcsIGluZGV4QnlGbjogKGl0ZW0pID0+IHN0cmluZykge1xuICAgIGNvbnN0IGdyb3VwcyA9IHt9XG4gICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIC8vIGlmIHRoZSBncm91cCBieSBrZXkgaXMgbm90IHBvc3NpYmxlIHRvIGNyZWF0ZSwgdGhlIGl0ZW0gd29uJ3QgYmUgYWRkZWQgdG8gdGhlIGluZGV4XG4gICAgICBjb25zdCBncm91cEtleSA9IHRoaXMuZ2V0R3JvdXBLZXlPZkl0ZW0oZ3JvdXBCeUZuLCBpdGVtKTtcblxuICAgICAgaWYgKGdyb3VwS2V5KSB7XG4gICAgICAgIGNvbnN0IGluZGV4S2V5ID0gaW5kZXhCeUZuKGl0ZW0pO1xuICAgICAgICBncm91cHNbZ3JvdXBLZXldID0geyAuLi5ncm91cHNbZ3JvdXBLZXldLCAuLi57IFtpbmRleEtleV06IGl0ZW0gfSB9XG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZ3JvdXBzO1xuICB9XG5cblxuXG5cbiAgcHJpdmF0ZSBnZXRHcm91cEtleU9mSXRlbShncm91cEJ5Rm46IChpdGVtOiBhbnkpID0+IHN0cmluZywgaXRlbTogYW55KTogc3RyaW5nIHtcbiAgICBsZXQgZ3JvdXBLZXlcbiAgICB0cnkge1xuICAgICAgZ3JvdXBLZXkgPSBncm91cEJ5Rm4oaXRlbSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgIH1cbiAgICByZXR1cm4gZ3JvdXBLZXk7XG4gIH1cbn1cbiJdfQ==