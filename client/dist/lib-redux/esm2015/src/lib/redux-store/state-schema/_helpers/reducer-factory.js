/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/reducer-factory.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL19oZWxwZXJzL3JlZHVjZXItZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBVyxNQUFNLE9BQU8sQ0FBQztBQUVqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFFMUQsTUFBTSxPQUFPLG1CQUFtQixHQUFHLGtCQUFrQjs7Ozs7QUFDckQseUNBR0M7OztJQUZDLHdDQUFxQjs7SUFDckIsc0NBQWU7Ozs7O0FBR2pCLDZDQUVDOzs7O0FBRUQsbUNBWUM7OztJQVZDLG9DQUFxQjs7SUFDckIsZ0NBR0U7O0lBQ0YsZ0NBR0k7O0lBQ0osK0JBQWtDOzs7Ozs7QUFHcEMsMEJBQTREOzs7SUFBN0IscUJBQWU7O0lBQUMsa0JBQVc7OztBQUcxRCxNQUFNLE9BQU8sRUFBRTs7OztBQUFHLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBOzs7Ozs7QUFPaEQsTUFBTSxPQUFPLFVBQVUsR0FBRyxrQkFBa0I7Ozs7OztBQUU1QyxNQUFNLFVBQVUsU0FBUyxDQUFDLEtBQWEsRUFBRSxNQUFjO0lBQ3JELE9BQU8sUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMvRCxD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RUFBQyxDQUFBO1FBQ0YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQUtPLGlCQUFpQixDQUFDLFNBQWdDLEVBQUUsSUFBUzs7WUFDL0QsUUFBUTtRQUNaLElBQUk7WUFDRixRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO1FBQUMsT0FBTyxLQUFLLEVBQUU7U0FFZjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Q0FDRjs7O0lBcFJDLG9DQUFzRDs7SUFDdEQsb0NBQXNEOztJQUN0RCxvQ0FBc0Q7O0lBclAxQyxzQ0FBMkI7O0lBQUUsaUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcG9zZVJlZHVjZXJzIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvZm9ybSc7XG5pbXBvcnQgeyBVIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBlcXVhbHMsIGluZGV4QnksIGtleXMsIG9taXQsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycywgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IExvYWRQYWdlTWV0YSwgTG9hZFBhZ2VTdWNjZWVkZWRNZXRhIH0gZnJvbSAnLi9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcbmltcG9ydCB7IHN1YmZpZWxkSWRUb1N0cmluZyB9IGZyb20gJy4vc3ViZmllbGRJZFRvU3RyaW5nJztcblxuZXhwb3J0IGNvbnN0IFBSX0VOVElUWV9NT0RFTF9NQVAgPSAncGtFbnRpdHlNb2RlbE1hcCdcbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5TW9kZWxBbmRDbGFzczxNb2RlbE5hbWU+IHtcbiAgbW9kZWxOYW1lOiBNb2RlbE5hbWUsXG4gIGZrQ2xhc3M6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIHtcbiAgW2tleTogc3RyaW5nXTogUmVkdWNlckNvbmZpZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlZHVjZXJDb25maWcge1xuICAvLyB3cmFwcyBldmVyeXRoaW5nIGluIGZhY2V0dGUgbmFtZWQgYnkgZmFjZXR0ZUJ5UGsgYW5kIGdyb3VwZWQgYnkgYWN0aW9uLm1ldGEucGtcbiAgZmFjZXR0ZUJ5UGs/OiBzdHJpbmcsXG4gIGluZGV4Qnk/OiB7XG4gICAga2V5SW5TdG9yZTogc3RyaW5nO1xuICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IHN0cmluZztcbiAgfSxcbiAgZ3JvdXBCeT86IHtcbiAgICBrZXlJblN0b3JlOiBzdHJpbmc7XG4gICAgZ3JvdXBCeUZuOiAoaXRlbSkgPT4gc3RyaW5nO1xuICB9W10sXG4gIGVxdWFscz86IChpdGVtQSwgaXRlbUIpID0+IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXRhPE1vZGVsPiB7IGl0ZW1zOiBNb2RlbFtdLCBwaz86IG51bWJlciB9XG5cblxuZXhwb3J0IGNvbnN0IGJ5ID0gKG5hbWU6IHN0cmluZykgPT4gJ2J5XycgKyBuYW1lO1xuLy8gZXhwb3J0IGNvbnN0IHBhZ2luYXRlTmFtZSA9IChwYWdCeTogUGFnaW5hdGVCeVBhcmFtW10pID0+IHBhZ0J5Lm1hcChwID0+IE9iamVjdC5rZXlzKHApWzBdKS5qb2luKCdfXycpO1xuXG4vLyBleHBvcnQgY29uc3QgcGFnID0gKG5hbWU6IHN0cmluZykgPT4gJ3BhZ18nICsgbmFtZTtcbi8vIGV4cG9ydCBjb25zdCBwYWdpbmF0ZWRCeSA9IChuYW1lOiBzdHJpbmcpID0+IHBhZyhieShuYW1lKSk7XG5cbi8vIGV4cG9ydCBjb25zdCBwYWdpbmF0ZUtleSA9IChwYWdCeTogUGFnaW5hdGVCeVBhcmFtW10pID0+IHBhZ0J5Lm1hcChwID0+IHZhbHVlcyhwKVswXSkuam9pbignXycpO1xuZXhwb3J0IGNvbnN0IHBhZ2luYXRlQnkgPSAnYnlfc3ViZmllbGRfcGFnZSdcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZyb21UbyhsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xuICByZXR1cm4gZ2V0U3RhcnQobGltaXQsIG9mZnNldCkgKyAnXycgKyBnZXRFbmQobGltaXQsIG9mZnNldCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmQobGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpIHtcbiAgcmV0dXJuIGdldFN0YXJ0KGxpbWl0LCBvZmZzZXQpICsgbGltaXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydChsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xuICByZXR1cm4gb2Zmc2V0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgc3RhbmRhcmQgcmVkdWNlcnMgZm9yIHRoZSBnaXZlbiBtb2RlbC5cbiAqXG4gKiBBZGRzIGluZGV4ZXMgYWNjb3JkaW5nIHRvIGNvbmZpZy5cbiAqXG4gKiBTOiBJbnRlcmZhY2Ugb2YgdGhlIHN0YXRlIChzbGljZSBvZiBzdG9yZSlcbiAqL1xuZXhwb3J0IGNsYXNzIFJlZHVjZXJGYWN0b3J5PFBheWxvYWQsIE1vZGVsPiB7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGFjdGlvblByZWZpeDogc3RyaW5nLCBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24pIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVSZWR1Y2VycygpIHtcblxuICAgIGNvbnN0IHJlZHVjZXJzID0ge31cbiAgICBVLm9iajJLZXlWYWx1ZUFycih0aGlzLmNvbmZpZ3MpLmZvckVhY2goeCA9PiB7XG4gICAgICByZWR1Y2Vyc1t4LmtleV0gPSB0aGlzLmNyZWF0ZU1vZGVsUmVkdWNlcnMoeC5rZXksIHgudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZW50aXR5TW9kZWxNYXBSZWR1Y2VycyA9IGtleXModGhpcy5jb25maWdzKS5tYXAobW9kZWxOYW1lID0+IHRoaXMuY3JlYXRlRW50aXR5TW9kZWxNYXBSZWR1Y2Vycyhtb2RlbE5hbWUpKVxuICAgIHJlZHVjZXJzW1BSX0VOVElUWV9NT0RFTF9NQVBdID0gY29tcG9zZVJlZHVjZXJzKC4uLmVudGl0eU1vZGVsTWFwUmVkdWNlcnMpXG5cbiAgICByZXR1cm4gY29tYmluZVJlZHVjZXJzKHJlZHVjZXJzKVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNb2RlbFJlZHVjZXJzKG1vZGVsTmFtZSwgY29uZmlnOiBSZWR1Y2VyQ29uZmlnKSB7XG4gICAgY29uc3QgYWN0aW9uUHJlZml4ID0gdGhpcy5hY3Rpb25QcmVmaXg7XG4gICAgY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IHt9LCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNZXRhPE1vZGVsPj4pID0+IHtcblxuICAgICAgY29uc3QgZmFjZXR0ZSA9IHRoaXMuZmFjZXR0ZShtb2RlbE5hbWUsIGNvbmZpZylcblxuICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpMT0FEJykge1xuXG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAvLyBUT0RPIHJlZmFjdG9yIHRoaXMgZm9yIHBhcnRpYWwgbG9kaW5nc1xuICAgICAgICAgIC4uLm9taXQoW2J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXSwgaW5uZXJTdGF0ZSksXG4gICAgICAgICAgbG9hZGluZzogdHJ1ZVxuICAgICAgICB9KSk7XG5cbiAgICAgIH1cblxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6TE9BRF9TVUNDRUVERUQnKSB7XG4gICAgICAgIC8vIElmIGFjdGlvbiBzdGF0ZSBkaWZmZXJzIGZyb21cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoXG4gICAgICAgICAge1xuICAgICAgICAgICAgLi4udGhpcy5tZXJnZUl0ZW1zSW5TdGF0ZShjb25maWcsIGlubmVyU3RhdGUsIGFjdGlvbiksXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgIH0pKVxuICAgICAgfVxuXG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpVUFNFUlQnKSB7XG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi5pbm5lclN0YXRlLFxuICAgICAgICAgIFt0aGlzLnVwZGF0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldOiB0aGlzLmluZGV4S2V5T2JqZWN0KGFjdGlvbiwgY29uZmlnKVxuICAgICAgICB9KSlcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OlVQU0VSVF9TVUNDRUVERUQnKSB7XG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi4gdGhpcy5tZXJnZUl0ZW1zSW5TdGF0ZShjb25maWcsIGlubmVyU3RhdGUsIGFjdGlvblxuICAgICAgICAgICAgLy8gLCB0cnVlXG4gICAgICAgICAgKSxcbiAgICAgICAgICBbdGhpcy51cGRhdGluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXTpcbiAgICAgICAgICAgIG9taXQodmFsdWVzKHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpKSwgaW5uZXJTdGF0ZVt0aGlzLnVwZGF0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldKVxuICAgICAgICB9KSlcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkRFTEVURScpIHtcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3RoaXMuZGVsZXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV06IHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpXG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkRFTEVURV9TVUNDRUVERUQnKSB7XG5cbiAgICAgICAgY29uc3QgZGVsZXRpbmdLZXkgPSB0aGlzLmRlbGV0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSlcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiB7XG4gICAgICAgICAgaW5uZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZGVsZXRlSXRlbXNGcm9tU3RhdGUoY29uZmlnLCBhY3Rpb24sIGlubmVyU3RhdGUpLFxuICAgICAgICAgICAgW2RlbGV0aW5nS2V5XTogb21pdCh2YWx1ZXModGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZykpLCBpbm5lclN0YXRlW3RoaXMuZGVsZXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghT2JqZWN0LmtleXMoaW5uZXJTdGF0ZVtkZWxldGluZ0tleV0pLmxlbmd0aCkgaW5uZXJTdGF0ZSA9IG9taXQoW2RlbGV0aW5nS2V5XSwgaW5uZXJTdGF0ZSk7XG4gICAgICAgICAgcmV0dXJuIGlubmVyU3RhdGU7XG4gICAgICAgIH0pXG5cbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OlJFTU9WRScpIHtcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3RoaXMucmVtb3ZpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV06IHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpXG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OlJFTU9WRV9TVUNDRUVERUQnKSB7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZpbmdLZXkgPSB0aGlzLnJlbW92aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSlcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiB7XG4gICAgICAgICAgaW5uZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZGVsZXRlSXRlbXNGcm9tU3RhdGUoY29uZmlnLCBhY3Rpb24sIGlubmVyU3RhdGUpLFxuICAgICAgICAgICAgW3JlbW92aW5nS2V5XTogb21pdCh2YWx1ZXModGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZykpLCBpbm5lclN0YXRlW3RoaXMucmVtb3ZpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghT2JqZWN0LmtleXMoaW5uZXJTdGF0ZVtyZW1vdmluZ0tleV0pLmxlbmd0aCkgaW5uZXJTdGF0ZSA9IG9taXQoW3JlbW92aW5nS2V5XSwgaW5uZXJTdGF0ZSk7XG4gICAgICAgICAgcmV0dXJuIGlubmVyU3RhdGU7XG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpGQUlMRUQnKSB7XG5cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgLi4ub21pdChbYnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldLCBpbm5lclN0YXRlKSxcbiAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICB9KSk7XG5cbiAgICAgIH1cblxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6TE9BRF9QQUdFJykge1xuICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGEgYXMgYW55IGFzIExvYWRQYWdlTWV0YTtcbiAgICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKG1ldGEucGFnZSlcbiAgICAgICAgY29uc3QgZnJvbVRvID0gZ2V0RnJvbVRvKG1ldGEucGFnZS5saW1pdCwgbWV0YS5wYWdlLm9mZnNldCk7XG5cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3BhZ2luYXRlQnldOiB7XG4gICAgICAgICAgICAuLi5pbm5lclN0YXRlW3BhZ2luYXRlQnldLFxuICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgLi4uKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IHtcbiAgICAgICAgICAgICAgICAuLi4oKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0gfHwge30pLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgW2Zyb21Ub106IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkxPQURfUEFHRV9GQUlMRUQnKSB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YSBhcyBhbnkgYXMgTG9hZFBhZ2VNZXRhO1xuXG4gICAgICAgIGNvbnN0IGtleSA9IHN1YmZpZWxkSWRUb1N0cmluZyhtZXRhLnBhZ2UpXG4gICAgICAgIGNvbnN0IGZyb21UbyA9IGdldEZyb21UbyhtZXRhLnBhZ2UubGltaXQsIG1ldGEucGFnZS5vZmZzZXQpO1xuXG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi5pbm5lclN0YXRlLFxuICAgICAgICAgIFtwYWdpbmF0ZUJ5XToge1xuICAgICAgICAgICAgLi4uaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSxcbiAgICAgICAgICAgIFtrZXldOiB7XG4gICAgICAgICAgICAgIC4uLihpbm5lclN0YXRlW3BhZ2luYXRlQnldIHx8IHt9KVtrZXldLFxuICAgICAgICAgICAgICBsb2FkaW5nOiB7XG4gICAgICAgICAgICAgICAgLi4uKChpbm5lclN0YXRlW3BhZ2luYXRlQnldIHx8IHt9KVtrZXldIHx8IHt9KS5sb2FkaW5nLFxuICAgICAgICAgICAgICAgIFtmcm9tVG9dOiBmYWxzZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpMT0FEX1BBR0VfU1VDQ0VFREVEJykge1xuICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGEgYXMgYW55IGFzIExvYWRQYWdlU3VjY2VlZGVkTWV0YTtcbiAgICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKG1ldGEucGFnZSlcbiAgICAgICAgY29uc3QgZnJvbVRvID0gZ2V0RnJvbVRvKG1ldGEucGFnZS5saW1pdCwgbWV0YS5wYWdlLm9mZnNldCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gZ2V0U3RhcnQobWV0YS5wYWdlLmxpbWl0LCBtZXRhLnBhZ2Uub2Zmc2V0KTtcblxuICAgICAgICBjb25zdCByb3dzID0ge31cbiAgICAgICAgaWYgKG1ldGEucGtzKSB7XG4gICAgICAgICAgbWV0YS5wa3MuZm9yRWFjaCgocGssIGkpID0+IHtcbiAgICAgICAgICAgIHJvd3Nbc3RhcnQgKyBpXSA9IHBrO1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3BhZ2luYXRlQnldOiB7XG4gICAgICAgICAgICAuLi5pbm5lclN0YXRlW3BhZ2luYXRlQnldLFxuICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgLi4uKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0sXG4gICAgICAgICAgICAgIGNvdW50OiBtZXRhLmNvdW50IHx8IDAsXG4gICAgICAgICAgICAgIHJvd3M6IHtcbiAgICAgICAgICAgICAgICAuLi4oKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0gfHwge30pLnJvd3MsXG4gICAgICAgICAgICAgICAgLi4ucm93c1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsb2FkaW5nOiB7XG4gICAgICAgICAgICAgICAgLi4uKChpbm5lclN0YXRlW3BhZ2luYXRlQnldIHx8IHt9KVtrZXldIHx8IHt9KS5sb2FkaW5nLFxuICAgICAgICAgICAgICAgIFtmcm9tVG9dOiBmYWxzZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG5cblxuICAgIHJldHVybiByZWR1Y2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gbWFwIGZvciBwa19lbnRpdHkgLT4gbW9kZWxOYW1lIG9uIHRoZSBsZXZlbCBvZiB0aGUgc2NoZW1hOlxuICAgKiBleGFtcGxlOlxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVFbnRpdHlNb2RlbE1hcFJlZHVjZXJzKG1vZGVsTmFtZSk6IFJlZHVjZXI8dW5rbm93biwgRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1ldGE8TW9kZWw+Pj4ge1xuICAgIGNvbnN0IGFjdGlvblByZWZpeCA9IHRoaXMuYWN0aW9uUHJlZml4O1xuICAgIGNvbnN0IHJlZHVjZXIgPSAoc3RhdGUgPSB7fSwgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWV0YTxNb2RlbD4+KSA9PiB7XG4gICAgICBjb25zdCBtb2RlbFBhdGggPSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWU7XG5cbiAgICAgIGlmICghYWN0aW9uIHx8ICFhY3Rpb24ubWV0YSB8fCAhYWN0aW9uLm1ldGEuaXRlbXMgfHwgIWFjdGlvbi5tZXRhLml0ZW1zLmxlbmd0aCkgcmV0dXJuIHN0YXRlO1xuICAgICAgY29uc3QgaXRlbXMgPSBhY3Rpb24ubWV0YS5pdGVtcztcblxuICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIG1vZGVsUGF0aCArICc6OkxPQURfU1VDQ0VFREVEJzpcbiAgICAgICAgY2FzZSBtb2RlbFBhdGggKyAnOjpVUFNFUlRfU1VDQ0VFREVEJzpcbiAgICAgICAgICBjb25zdCBpZHggPSB7fVxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpXSBhcyBhbnk7XG4gICAgICAgICAgICBpZiAoaXRlbS5wa19lbnRpdHkpIHtcbiAgICAgICAgICAgICAgaWR4W2l0ZW0ucGtfZW50aXR5XSA9IHtcbiAgICAgICAgICAgICAgICBtb2RlbE5hbWUsXG4gICAgICAgICAgICAgICAgZmtDbGFzczogaXRlbS5ma19jbGFzc1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAuLi5pZHhcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBtb2RlbFBhdGggKyAnOjpERUxFVEVfU1VDQ0VFREVEJzpcbiAgICAgICAgY2FzZSBtb2RlbFBhdGggKyAnOjpSRU1PVkVfU1VDQ0VFREVEJzpcbiAgICAgICAgICBjb25zdCBwa0VudGl0aWVzID0gW11cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNbaV0gYXMgYW55O1xuICAgICAgICAgICAgaWYgKGl0ZW0ucGtfZW50aXR5KSB7XG4gICAgICAgICAgICAgIHBrRW50aXRpZXMucHVzaChpdGVtLnBrX2VudGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YXRlID0gb21pdChwa0VudGl0aWVzLCBzdGF0ZSlcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG4gICAgcmV0dXJuIHJlZHVjZXI7XG4gIH1cblxuXG4gIHVwZGF0aW5nQnkgPSAobmFtZTogc3RyaW5nKSA9PiAndXBkYXRpbmdfJyArIGJ5KG5hbWUpO1xuICBkZWxldGluZ0J5ID0gKG5hbWU6IHN0cmluZykgPT4gJ2RlbGV0aW5nXycgKyBieShuYW1lKTtcbiAgcmVtb3ZpbmdCeSA9IChuYW1lOiBzdHJpbmcpID0+ICdyZW1vdmluZ18nICsgYnkobmFtZSk7XG5cblxuXG4gIHByaXZhdGUgZmFjZXR0ZShtb2RlbE5hbWU6IGFueSwgY29uZmlnOiBSZWR1Y2VyQ29uZmlnKSB7XG4gICAgcmV0dXJuIChhY3Rpb24sIHN0YXRlLCBjYjogKGlubmVyU3RhdGUpID0+IGFueSkgPT4ge1xuICAgICAgbGV0IG91dGVyU3RhdGU7XG4gICAgICAoeyBvdXRlclN0YXRlLCBzdGF0ZSB9ID0gdGhpcy5kZUZhY2V0dGUobW9kZWxOYW1lLCBjb25maWcsIGFjdGlvbiwgb3V0ZXJTdGF0ZSwgc3RhdGUpKTtcbiAgICAgIGNvbnN0IGlubmVyU3RhdGUgPSBjYihzdGF0ZSk7XG4gICAgICByZXR1cm4gdGhpcy5lbkZhY2V0dGUobW9kZWxOYW1lLCBjb25maWcsIGFjdGlvbiwgaW5uZXJTdGF0ZSwgb3V0ZXJTdGF0ZSk7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZGVGYWNldHRlKG1vZGVsTmFtZTogc3RyaW5nLCBjb25maWc6IFJlZHVjZXJDb25maWcsIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHsgaXRlbXM6IE1vZGVsW107IHBrPzogbnVtYmVyOyB9Piwgb3V0ZXJTdGF0ZTogYW55LCBzdGF0ZToge30pIHtcbiAgICBpZiAodGhpcy5pc0ZhY2V0dGVCeVBrKGNvbmZpZywgYWN0aW9uKSkge1xuICAgICAgLy8gb3V0ZXJTdGF0ZSA9IGNsb25lKHN0YXRlKTtcbiAgICAgIGNvbnN0IHBrID0gYWN0aW9uLm1ldGEucGsgfHwgJ3JlcG8nXG4gICAgICAvLyBzdGF0ZSA9ICFzdGF0ZVtjb25maWcuZmFjZXR0ZUJ5UGtdID8ge30gOiBzdGF0ZVtjb25maWcuZmFjZXR0ZUJ5UGtdW3BrXSB8fCB7fTtcbiAgICAgIGNvbnN0IGlubmVyU3RhdGUgPSAhc3RhdGVbY29uZmlnLmZhY2V0dGVCeVBrXSA/IHt9IDogc3RhdGVbY29uZmlnLmZhY2V0dGVCeVBrXVtwa10gfHwge307XG4gICAgICByZXR1cm4ge1xuICAgICAgICBvdXRlclN0YXRlOiBzdGF0ZSxcbiAgICAgICAgc3RhdGU6IGlubmVyU3RhdGVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgb3V0ZXJTdGF0ZSwgc3RhdGUgfTtcbiAgfVxuXG4gIHByaXZhdGUgZW5GYWNldHRlKG1vZGVsTmFtZTogc3RyaW5nLCBjb25maWc6IFJlZHVjZXJDb25maWcsIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHsgaXRlbXM6IE1vZGVsW107IHBrPzogbnVtYmVyOyB9Piwgc3RhdGU6IHt9LCBvdXRlclN0YXRlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc0ZhY2V0dGVCeVBrKGNvbmZpZywgYWN0aW9uKSkge1xuICAgICAgY29uc3QgcGsgPSBhY3Rpb24ubWV0YS5wayB8fCAncmVwbydcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5vdXRlclN0YXRlLFxuICAgICAgICBbY29uZmlnLmZhY2V0dGVCeVBrXToge1xuICAgICAgICAgIC4uLm91dGVyU3RhdGVbY29uZmlnLmZhY2V0dGVCeVBrXSxcbiAgICAgICAgICBbcGtdOiBzdGF0ZVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuXG4gIHByaXZhdGUgaXNGYWNldHRlQnlQayhjb25maWc6IFJlZHVjZXJDb25maWcsIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHsgaXRlbXM6IE1vZGVsW107IHBrPzogbnVtYmVyOyB9Pikge1xuICAgIGlmIChjb25maWcuZmFjZXR0ZUJ5UGspIHtcbiAgICAgIGlmICghYWN0aW9uLm1ldGEgfHwgYWN0aW9uLm1ldGEucGsgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ0ZhY2V0dGUgYWN0aW9uwqBtdXN0IHByb3ZpZGUgcGsgZm9yIGZhY2V0dGUnKTtcbiAgICAgIGVsc2UgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxuXG4gIGRlbGV0ZUl0ZW1zRnJvbVN0YXRlKGNvbmZpZzogUmVkdWNlckNvbmZpZywgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgfT4sIHN0YXRlKSB7XG4gICAgY29uc3QgaXRlbXMgPSBhY3Rpb24ubWV0YS5pdGVtcztcbiAgICAvLyBsZXQgc3RhdGUgPSB7fVxuICAgIGNvbnN0IGdyb3VwQnlzID0gIShjb25maWcuZ3JvdXBCeSAmJiBjb25maWcuZ3JvdXBCeS5sZW5ndGgpID8gW10gOiBjb25maWcuZ3JvdXBCeTtcbiAgICBjb25zdCBncm91cHMgPSBncm91cEJ5cy5tYXAoaSA9PiAoe1xuICAgICAgZ3JvdXBCeUtleTogYnkoaS5rZXlJblN0b3JlKSxcbiAgICAgIGdyb3VwQnlGbjogaS5ncm91cEJ5Rm4sXG4gICAgfSkpXG4gICAgY29uc3QgbWFpbkluZGV4S2V5ID0gYnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSk7IC8vIGZpcnN0IHNlZ21lbnQgZS5nLiAnYnlfcGtfZW50aXR5J1xuXG4gICAgaXRlbXMuZm9yRWFjaCgocmVtb3ZlZEl0ZW0pID0+IHtcbiAgICAgIC8vIGdldCBwYXRoIHNlZ21lbnRzIG9mIG5ldyBpdGVtXG4gICAgICBjb25zdCBpdGVtS2V5ID0gY29uZmlnLmluZGV4QnkuaW5kZXhCeUZuKHJlbW92ZWRJdGVtKTsgLy8gc2Vjb25kIHNlZ21lbnQgZS5nLiAnODA3MDYwJ1xuXG4gICAgICAvLyBnZXQgb2xkIGl0ZW0sIGlmIGV4aXN0c1xuICAgICAgY29uc3Qgb2xkSXRlbSA9IHN0YXRlW21haW5JbmRleEtleV0gPyBzdGF0ZVttYWluSW5kZXhLZXldW2l0ZW1LZXldIDogdW5kZWZpbmVkO1xuXG4gICAgICAvLyBROiBEb2VzIHRoZSBpdGVtIGV4aXN0cz9cbiAgICAgIGlmIChvbGRJdGVtKSB7XG4gICAgICAgIC8vIEE6IFllcy4gdXNlIG9sZCBpdGVtIGRvZXMgZXhpc3RcblxuICAgICAgICAvLyByZW1vdmUgdGhlIHJlbW92ZWRJdGVtIGF0IHBhdGggaW4gbWFpbiBpbmRleFxuICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBbbWFpbkluZGV4S2V5XToge1xuICAgICAgICAgICAgLi4ub21pdChbaXRlbUtleV0sIHN0YXRlW21haW5JbmRleEtleV0pLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlbGV0ZSB0aGUgcmVtb3ZlZEl0ZW0gYXQgcGF0aCBpbiB0aGUgZ3JvdXAgaW5kZXhcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goZyA9PiB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBLZXkgPSB0aGlzLmdldEdyb3VwS2V5T2ZJdGVtKGcuZ3JvdXBCeUZuLCByZW1vdmVkSXRlbSlcbiAgICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgW2cuZ3JvdXBCeUtleV06IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGVbZy5ncm91cEJ5S2V5XSxcbiAgICAgICAgICAgICAgW2dyb3VwS2V5XToge1xuICAgICAgICAgICAgICAgIC4uLm9taXQoW2l0ZW1LZXldLCAoc3RhdGVbZy5ncm91cEJ5S2V5XSB8fCB7fSlbZ3JvdXBLZXldKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIC8vIGNsZWFudXAgcGFnaW5hdGlvbnNcbiAgICAgICAgICAvLyBzdGF0ZSA9IHRoaXMucmVzZXRQYWdpbmF0aW9uc0J5R3JvdXAoZy5ncm91cEJ5S2V5LCBzdGF0ZSwgZ3JvdXBLZXkpO1xuXG4gICAgICAgIH0pXG4gICAgICB9XG5cblxuICAgIH0pXG5cbiAgICAvLyBjbGVhbnVwIG1haW4gaW5kZXhcbiAgICBpZiAoT2JqZWN0LmtleXMoc3RhdGVbbWFpbkluZGV4S2V5XSkubGVuZ3RoIDwgMSkge1xuICAgICAgc3RhdGUgPSB7IC4uLm9taXQoW21haW5JbmRleEtleV0sIHN0YXRlKSB9XG4gICAgfVxuICAgIC8vIGNsZWFudXAgZ3JvdXAgaW5kaWNlc1xuICAgIGdyb3Vwcy5mb3JFYWNoKGcgPT4ge1xuXG4gICAgICAvLyBjbGVhbnVwIGdyb3VwcyBpbiBncm91cCBpbmRleFxuICAgICAgT2JqZWN0LmtleXMoc3RhdGVbZy5ncm91cEJ5S2V5XSkuZm9yRWFjaChncm91cEtleSA9PiB7XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHN0YXRlW2cuZ3JvdXBCeUtleV1bZ3JvdXBLZXldKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIFtnLmdyb3VwQnlLZXldOiBvbWl0KFtncm91cEtleV0sIHN0YXRlW2cuZ3JvdXBCeUtleV0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLyBjbGVhbnVwIGdyb3VwIGluZGV4XG4gICAgICBpZiAoT2JqZWN0LmtleXMoc3RhdGVbZy5ncm91cEJ5S2V5XSkubGVuZ3RoIDwgMSkge1xuICAgICAgICBzdGF0ZSA9IHsgLi4ub21pdChbZy5ncm91cEJ5S2V5XSwgc3RhdGUpIH1cbiAgICAgIH1cbiAgICB9KVxuXG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBtZXJnZUl0ZW1zSW5TdGF0ZShjb25maWc6IFJlZHVjZXJDb25maWcsIHN0YXRlLCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7IGl0ZW1zOiBNb2RlbFtdOyB9PlxuICAgIC8vICwgcmVzZXRQYWdpbmF0aW9ucyA9IGZhbHNlXG4gICkge1xuICAgIGNvbnN0IGl0ZW1zID0gYWN0aW9uLm1ldGEuaXRlbXM7XG4gICAgY29uc3QgZ3JvdXBCeXMgPSAhKGNvbmZpZy5ncm91cEJ5ICYmIGNvbmZpZy5ncm91cEJ5Lmxlbmd0aCkgPyBbXSA6IGNvbmZpZy5ncm91cEJ5O1xuICAgIGNvbnN0IGdyb3VwcyA9IGdyb3VwQnlzLm1hcChpID0+ICh7XG4gICAgICBncm91cEJ5S2V5OiBieShpLmtleUluU3RvcmUpLFxuICAgICAgZ3JvdXBCeUZuOiBpLmdyb3VwQnlGbixcbiAgICB9KSlcblxuICAgIGNvbnN0IG1haW5JbmRleEtleSA9IGJ5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpOyAvLyBmaXJzdCBzZWdtZW50IGUuZy4gJ2J5X3BrX2VudGl0eSdcblxuICAgIGl0ZW1zLmZvckVhY2goKG5ld0l0ZW0pID0+IHtcbiAgICAgIC8vIGdldCBwYXRoIHNlZ21lbnRzIG9mIG5ldyBpdGVtXG4gICAgICBjb25zdCBpdGVtS2V5ID0gY29uZmlnLmluZGV4QnkuaW5kZXhCeUZuKG5ld0l0ZW0pOyAvLyBzZWNvbmQgc2VnbWVudCBlLmcuICc4MDcwNjAnXG5cbiAgICAgIC8vIGdldCBvbGQgaXRlbSwgaWYgZXhpc3RzXG4gICAgICBjb25zdCBvbGRJdGVtID0gc3RhdGVbbWFpbkluZGV4S2V5XSA/IHN0YXRlW21haW5JbmRleEtleV1baXRlbUtleV0gOiB1bmRlZmluZWQ7XG5cbiAgICAgIGxldCBpdGVtVG9TZXQ7XG5cbiAgICAgIC8vIFE6IERvZXMgdGhlIGl0ZW0gZXhpc3RzLCBhbmQgaXMgaXQgZGVlcGx5LWVxdWFsIHRvIHRoZSBuZXcgaXRlbT9cbiAgICAgIGNvbnN0IGVxdWFsc0ZuID0gY29uZmlnLmVxdWFscyB8fCBlcXVhbHNcbiAgICAgIGlmIChvbGRJdGVtICYmIGVxdWFsc0ZuKG5ld0l0ZW0sIG9sZEl0ZW0pKSB7XG4gICAgICAgIC8vIEE6IFllcy4gdXNlIG9sZCBpdGVtIGFzIGl0ZW1Ub1NldFxuICAgICAgICBpdGVtVG9TZXQgPSBvbGRJdGVtO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIEE6IE5vLiB1c2UgbmV3IGl0ZW0gYXMgaXRlbVRvU2V0XG4gICAgICAgIGl0ZW1Ub1NldCA9IG5ld0l0ZW07XG5cbiAgICAgICAgLy8gcHV0IHRoZSBpdGVtVG9TZXQgYXQgcGF0aCBpbiBtYWluIGluZGV4XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIFttYWluSW5kZXhLZXldOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZVttYWluSW5kZXhLZXldLFxuICAgICAgICAgICAgW2l0ZW1LZXldOiBpdGVtVG9TZXRcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGdyb3VwIGluZGV4ZXNcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goZyA9PiB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBvbGRJdGVtIGZyb20gYWxsIGdyb3VwIGluZGV4ZXNcbiAgICAgICAgICBjb25zdCBvbGRHcm91cEtleSA9IHRoaXMuZ2V0R3JvdXBLZXlPZkl0ZW0oZy5ncm91cEJ5Rm4sIG9sZEl0ZW0pXG4gICAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIFtnLmdyb3VwQnlLZXldOiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlW2cuZ3JvdXBCeUtleV0sXG4gICAgICAgICAgICAgIFtvbGRHcm91cEtleV06IHtcbiAgICAgICAgICAgICAgICAuLi5vbWl0KFtpdGVtS2V5XSwgKHN0YXRlW2cuZ3JvdXBCeUtleV0gfHwge30pW29sZEdyb3VwS2V5XSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGFkZCB0aGUgaXRlbVRvU2V0IHRvIGFsbCBncm91cCBpbmRleGVzLCBpZiBub3QgdW5kZWZpbmVkXG4gICAgICAgICAgY29uc3QgbmV3R3JvdXBLZXkgPSB0aGlzLmdldEdyb3VwS2V5T2ZJdGVtKGcuZ3JvdXBCeUZuLCBpdGVtVG9TZXQpXG4gICAgICAgICAgaWYgKG5ld0dyb3VwS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgW2cuZ3JvdXBCeUtleV06IHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZVtnLmdyb3VwQnlLZXldLFxuICAgICAgICAgICAgICAgIFtuZXdHcm91cEtleV06IHtcbiAgICAgICAgICAgICAgICAgIC4uLihzdGF0ZVtnLmdyb3VwQnlLZXldIHx8IHt9KVtuZXdHcm91cEtleV0sXG4gICAgICAgICAgICAgICAgICBbaXRlbUtleV06IGl0ZW1Ub1NldFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG5cbiAgLy8gLyoqXG4gIC8vICAqIHJlc2V0cyBwYWdpbmF0aW9uIHdpdGhpbiBhIGdyb3VwLCBlLmcuICdwYWdfYnlfZmtfcHJvcGVydHknXG4gIC8vICAqIFRPRE86IGNoZWNrIGlmIGNhbiBiZSBkZWxldGVkXG4gIC8vICAqL1xuICAvLyBwcml2YXRlIHJlc2V0UGFnaW5hdGlvbnNCeUdyb3VwKGdyb3VwQnlLZXk6IHN0cmluZywgc3RhdGU6IGFueSwgZ3JvdXBLZXk6IGFueSwgaXNVcHNlcnQgPSBmYWxzZSkge1xuICAvLyAgIGNvbnN0IHBhZ2luYXRlQnkgPSBwYWcoZ3JvdXBCeUtleSk7XG4gIC8vICAgaWYgKHN0YXRlW3BhZ2luYXRlQnldICYmIHN0YXRlW3BhZ2luYXRlQnldW2dyb3VwS2V5XSAmJiBzdGF0ZVtwYWdpbmF0ZUJ5XVtncm91cEtleV0uY291bnQgIT09IHVuZGVmaW5lZCkge1xuICAvLyAgICAgc3RhdGUgPSB7XG4gIC8vICAgICAgIC4uLnN0YXRlLFxuICAvLyAgICAgICBbcGFnaW5hdGVCeV06IHtcbiAgLy8gICAgICAgICAuLi5zdGF0ZVtwYWdpbmF0ZUJ5XSxcbiAgLy8gICAgICAgICBbZ3JvdXBLZXldOiB7XG4gIC8vICAgICAgICAgICAuLi5zdGF0ZVtwYWdpbmF0ZUJ5XVtncm91cEtleV0sXG4gIC8vICAgICAgICAgICAuLi4oIWlzVXBzZXJ0ID8ge30gOiB7IGNvdW50OiBzdGF0ZVtwYWdpbmF0ZUJ5XVtncm91cEtleV0uY291bnQgKyAxIH0pLFxuICAvLyAgICAgICAgICAgcm93czoge30sXG4gIC8vICAgICAgICAgICBsb2FkaW5nOiB7fVxuICAvLyAgICAgICAgIH1cbiAgLy8gICAgICAgfVxuICAvLyAgICAgfTtcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuIHN0YXRlO1xuICAvLyB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgb2JqZWN0IHdoZXJlIHRoZSBrZXkgcmV0dXJuZWQgYnkgdGhlIGNvbmZpZ3VyZWQgaW5kZXhCeUZuXG4gICAqL1xuICBwcml2YXRlIGluZGV4S2V5T2JqZWN0KGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHsgaXRlbXM6IE1vZGVsW107IH0+LCBjb25maWc6IFJlZHVjZXJDb25maWcpIHtcbiAgICByZXR1cm4gaW5kZXhCeSgoaSkgPT4gKGkpLCBhY3Rpb24ubWV0YS5pdGVtc1xuICAgICAgLy8gZmlsdGVyIGl0ZW1zIHRoYXQgYXJlIG5vdCAoeWV0KSBpbmRleGFibGUuIFRoaXMgaXMgbm9ybWFsbHkgdGhlIGNhc2UsIHdoZW4gY3JlYXRpbmcgbmV3IGl0ZW1zIHRoYXQgaGF2ZSBubyBwayB5ZXQuXG4gICAgICAuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbmZpZy5pbmRleEJ5LmluZGV4QnlGbihpdGVtKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAubWFwKGl0ZW0gPT4gY29uZmlnLmluZGV4QnkuaW5kZXhCeUZuKGl0ZW0pKSk7XG4gIH1cblxuICBncm91cEJ5KGl0ZW1zOiBhbnlbXSwgZ3JvdXBCeUZuOiAoaXRlbSkgPT4gc3RyaW5nLCBpbmRleEJ5Rm46IChpdGVtKSA9PiBzdHJpbmcpIHtcbiAgICBjb25zdCBncm91cHMgPSB7fVxuICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAvLyBpZiB0aGUgZ3JvdXAgYnkga2V5IGlzIG5vdCBwb3NzaWJsZSB0byBjcmVhdGUsIHRoZSBpdGVtIHdvbid0IGJlIGFkZGVkIHRvIHRoZSBpbmRleFxuICAgICAgY29uc3QgZ3JvdXBLZXkgPSB0aGlzLmdldEdyb3VwS2V5T2ZJdGVtKGdyb3VwQnlGbiwgaXRlbSk7XG5cbiAgICAgIGlmIChncm91cEtleSkge1xuICAgICAgICBjb25zdCBpbmRleEtleSA9IGluZGV4QnlGbihpdGVtKTtcbiAgICAgICAgZ3JvdXBzW2dyb3VwS2V5XSA9IHsgLi4uZ3JvdXBzW2dyb3VwS2V5XSwgLi4ueyBbaW5kZXhLZXldOiBpdGVtIH0gfVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGdyb3VwcztcbiAgfVxuXG5cblxuXG4gIHByaXZhdGUgZ2V0R3JvdXBLZXlPZkl0ZW0oZ3JvdXBCeUZuOiAoaXRlbTogYW55KSA9PiBzdHJpbmcsIGl0ZW06IGFueSk6IHN0cmluZyB7XG4gICAgbGV0IGdyb3VwS2V5XG4gICAgdHJ5IHtcbiAgICAgIGdyb3VwS2V5ID0gZ3JvdXBCeUZuKGl0ZW0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cbiAgICB9XG4gICAgcmV0dXJuIGdyb3VwS2V5O1xuICB9XG59XG4iXX0=