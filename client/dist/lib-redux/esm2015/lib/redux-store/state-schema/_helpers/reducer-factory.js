/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/reducer-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { composeReducers } from '@angular-redux/form';
import { U } from '@kleiolab/lib-utils';
import { equals, indexBy, keys, omit, values } from 'ramda';
import { combineReducers } from 'redux';
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
/** @type {?} */
export const paginateName = (/**
 * @param {?} pagBy
 * @return {?}
 */
(pagBy) => pagBy.map((/**
 * @param {?} p
 * @return {?}
 */
p => Object.keys(p)[0])).join('__'));
/** @type {?} */
export const pag = (/**
 * @param {?} name
 * @return {?}
 */
(name) => 'pag_' + name);
/** @type {?} */
export const paginatedBy = (/**
 * @param {?} name
 * @return {?}
 */
(name) => pag(by(name)));
/** @type {?} */
export const paginateKey = (/**
 * @param {?} pagBy
 * @return {?}
 */
(pagBy) => pagBy.map((/**
 * @param {?} p
 * @return {?}
 */
p => values(p)[0])).join('_'));
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
                const paginateBy = paginatedBy(paginateName(meta.paginateBy));
                /** @type {?} */
                const key = meta.paginateBy.map((/**
                 * @param {?} p
                 * @return {?}
                 */
                p => values(p)[0])).join('_');
                /** @type {?} */
                const fromTo = getFromTo(meta.limit, meta.offset);
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
                const paginateBy = paginatedBy(paginateName(meta.paginateBy));
                /** @type {?} */
                const key = paginateKey(meta.paginateBy);
                /** @type {?} */
                const fromTo = getFromTo(meta.limit, meta.offset);
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
                const paginateBy = paginatedBy(paginateName(meta.paginateBy));
                /** @type {?} */
                const key = paginateKey(meta.paginateBy);
                /** @type {?} */
                const start = getStart(meta.limit, meta.offset);
                /** @type {?} */
                const fromTo = getFromTo(meta.limit, meta.offset);
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
                                fkClass: item.fkClass
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvX2hlbHBlcnMvcmVkdWNlci1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV4QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFXLE1BQU0sT0FBTyxDQUFDOztBQUdqRCxNQUFNLE9BQU8sbUJBQW1CLEdBQUcsa0JBQWtCOzs7OztBQUNyRCx5Q0FHQzs7O0lBRkMsd0NBQXFCOztJQUNyQixzQ0FBZTs7Ozs7QUFHakIsNkNBRUM7Ozs7QUFFRCxtQ0FZQzs7O0lBVkMsb0NBQXFCOztJQUNyQixnQ0FHRTs7SUFDRixnQ0FHSTs7SUFDSiwrQkFBa0M7Ozs7OztBQUdwQywwQkFBNEQ7OztJQUE3QixxQkFBZTs7SUFBQyxrQkFBVzs7O0FBRzFELE1BQU0sT0FBTyxFQUFFOzs7O0FBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7O0FBQ2hELE1BQU0sT0FBTyxZQUFZOzs7O0FBQUcsQ0FBQyxLQUF3QixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRzs7OztBQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTs7QUFFdEcsTUFBTSxPQUFPLEdBQUc7Ozs7QUFBRyxDQUFDLElBQVksRUFBRSxFQUFFLENB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dUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wb3NlUmVkdWNlcnMgfSBmcm9tICdAYW5ndWxhci1yZWR1eC9mb3JtJztcbmltcG9ydCB7IFUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IGVxdWFscywgaW5kZXhCeSwga2V5cywgb21pdCwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzLCBSZWR1Y2VyIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgTG9hZFBhZ2VNZXRhLCBMb2FkUGFnZVN1Y2NlZWRlZE1ldGEsIFBhZ2luYXRlQnlQYXJhbSB9IGZyb20gJy4vc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cbmV4cG9ydCBjb25zdCBQUl9FTlRJVFlfTU9ERUxfTUFQID0gJ3BrRW50aXR5TW9kZWxNYXAnXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eU1vZGVsQW5kQ2xhc3M8TW9kZWxOYW1lPiB7XG4gIG1vZGVsTmFtZTogTW9kZWxOYW1lLFxuICBma0NsYXNzOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiB7XG4gIFtrZXk6IHN0cmluZ106IFJlZHVjZXJDb25maWdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWR1Y2VyQ29uZmlnIHtcbiAgLy8gd3JhcHMgZXZlcnl0aGluZyBpbiBmYWNldHRlIG5hbWVkIGJ5IGZhY2V0dGVCeVBrIGFuZCBncm91cGVkIGJ5IGFjdGlvbi5tZXRhLnBrXG4gIGZhY2V0dGVCeVBrPzogc3RyaW5nLFxuICBpbmRleEJ5Pzoge1xuICAgIGtleUluU3RvcmU6IHN0cmluZztcbiAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiBzdHJpbmc7XG4gIH0sXG4gIGdyb3VwQnk/OiB7XG4gICAga2V5SW5TdG9yZTogc3RyaW5nO1xuICAgIGdyb3VwQnlGbjogKGl0ZW0pID0+IHN0cmluZztcbiAgfVtdLFxuICBlcXVhbHM/OiAoaXRlbUEsIGl0ZW1CKSA9PiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YTxNb2RlbD4geyBpdGVtczogTW9kZWxbXSwgcGs/OiBudW1iZXIgfVxuXG5cbmV4cG9ydCBjb25zdCBieSA9IChuYW1lOiBzdHJpbmcpID0+ICdieV8nICsgbmFtZTtcbmV4cG9ydCBjb25zdCBwYWdpbmF0ZU5hbWUgPSAocGFnQnk6IFBhZ2luYXRlQnlQYXJhbVtdKSA9PiBwYWdCeS5tYXAocCA9PiBPYmplY3Qua2V5cyhwKVswXSkuam9pbignX18nKTtcblxuZXhwb3J0IGNvbnN0IHBhZyA9IChuYW1lOiBzdHJpbmcpID0+ICdwYWdfJyArIG5hbWU7XG5leHBvcnQgY29uc3QgcGFnaW5hdGVkQnkgPSAobmFtZTogc3RyaW5nKSA9PiBwYWcoYnkobmFtZSkpO1xuXG5leHBvcnQgY29uc3QgcGFnaW5hdGVLZXkgPSAocGFnQnk6IFBhZ2luYXRlQnlQYXJhbVtdKSA9PiBwYWdCeS5tYXAocCA9PiB2YWx1ZXMocClbMF0pLmpvaW4oJ18nKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZyb21UbyhsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xuICByZXR1cm4gZ2V0U3RhcnQobGltaXQsIG9mZnNldCkgKyAnXycgKyBnZXRFbmQobGltaXQsIG9mZnNldCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmQobGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpIHtcbiAgcmV0dXJuIGdldFN0YXJ0KGxpbWl0LCBvZmZzZXQpICsgbGltaXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydChsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xuICByZXR1cm4gb2Zmc2V0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgc3RhbmRhcmQgcmVkdWNlcnMgZm9yIHRoZSBnaXZlbiBtb2RlbC5cbiAqXG4gKiBBZGRzIGluZGV4ZXMgYWNjb3JkaW5nIHRvIGNvbmZpZy5cbiAqXG4gKiBTOiBJbnRlcmZhY2Ugb2YgdGhlIHN0YXRlIChzbGljZSBvZiBzdG9yZSlcbiAqL1xuZXhwb3J0IGNsYXNzIFJlZHVjZXJGYWN0b3J5PFBheWxvYWQsIE1vZGVsPiB7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGFjdGlvblByZWZpeDogc3RyaW5nLCBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24pIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVSZWR1Y2VycygpIHtcblxuICAgIGNvbnN0IHJlZHVjZXJzID0ge31cbiAgICBVLm9iajJLZXlWYWx1ZUFycih0aGlzLmNvbmZpZ3MpLmZvckVhY2goeCA9PiB7XG4gICAgICByZWR1Y2Vyc1t4LmtleV0gPSB0aGlzLmNyZWF0ZU1vZGVsUmVkdWNlcnMoeC5rZXksIHgudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZW50aXR5TW9kZWxNYXBSZWR1Y2VycyA9IGtleXModGhpcy5jb25maWdzKS5tYXAobW9kZWxOYW1lID0+IHRoaXMuY3JlYXRlRW50aXR5TW9kZWxNYXBSZWR1Y2Vycyhtb2RlbE5hbWUpKVxuICAgIHJlZHVjZXJzW1BSX0VOVElUWV9NT0RFTF9NQVBdID0gY29tcG9zZVJlZHVjZXJzKC4uLmVudGl0eU1vZGVsTWFwUmVkdWNlcnMpXG5cbiAgICByZXR1cm4gY29tYmluZVJlZHVjZXJzKHJlZHVjZXJzKVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNb2RlbFJlZHVjZXJzKG1vZGVsTmFtZSwgY29uZmlnOiBSZWR1Y2VyQ29uZmlnKSB7XG4gICAgY29uc3QgYWN0aW9uUHJlZml4ID0gdGhpcy5hY3Rpb25QcmVmaXg7XG4gICAgY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IHt9LCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNZXRhPE1vZGVsPj4pID0+IHtcblxuICAgICAgY29uc3QgZmFjZXR0ZSA9IHRoaXMuZmFjZXR0ZShtb2RlbE5hbWUsIGNvbmZpZylcblxuICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpMT0FEJykge1xuXG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAvLyBUT0RPIHJlZmFjdG9yIHRoaXMgZm9yIHBhcnRpYWwgbG9kaW5nc1xuICAgICAgICAgIC4uLm9taXQoW2J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXSwgaW5uZXJTdGF0ZSksXG4gICAgICAgICAgbG9hZGluZzogdHJ1ZVxuICAgICAgICB9KSk7XG5cbiAgICAgIH1cblxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6TE9BRF9TVUNDRUVERUQnKSB7XG4gICAgICAgIC8vIElmIGFjdGlvbiBzdGF0ZSBkaWZmZXJzIGZyb21cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoXG4gICAgICAgICAge1xuICAgICAgICAgICAgLi4udGhpcy5tZXJnZUl0ZW1zSW5TdGF0ZShjb25maWcsIGlubmVyU3RhdGUsIGFjdGlvbiksXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgIH0pKVxuICAgICAgfVxuXG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpVUFNFUlQnKSB7XG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi5pbm5lclN0YXRlLFxuICAgICAgICAgIFt0aGlzLnVwZGF0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldOiB0aGlzLmluZGV4S2V5T2JqZWN0KGFjdGlvbiwgY29uZmlnKVxuICAgICAgICB9KSlcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OlVQU0VSVF9TVUNDRUVERUQnKSB7XG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi4gdGhpcy5tZXJnZUl0ZW1zSW5TdGF0ZShjb25maWcsIGlubmVyU3RhdGUsIGFjdGlvblxuICAgICAgICAgICAgLy8gLCB0cnVlXG4gICAgICAgICAgKSxcbiAgICAgICAgICBbdGhpcy51cGRhdGluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXTpcbiAgICAgICAgICAgIG9taXQodmFsdWVzKHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpKSwgaW5uZXJTdGF0ZVt0aGlzLnVwZGF0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldKVxuICAgICAgICB9KSlcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkRFTEVURScpIHtcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3RoaXMuZGVsZXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV06IHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpXG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkRFTEVURV9TVUNDRUVERUQnKSB7XG5cbiAgICAgICAgY29uc3QgZGVsZXRpbmdLZXkgPSB0aGlzLmRlbGV0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSlcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiB7XG4gICAgICAgICAgaW5uZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZGVsZXRlSXRlbXNGcm9tU3RhdGUoY29uZmlnLCBhY3Rpb24sIGlubmVyU3RhdGUpLFxuICAgICAgICAgICAgW2RlbGV0aW5nS2V5XTogb21pdCh2YWx1ZXModGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZykpLCBpbm5lclN0YXRlW3RoaXMuZGVsZXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghT2JqZWN0LmtleXMoaW5uZXJTdGF0ZVtkZWxldGluZ0tleV0pLmxlbmd0aCkgaW5uZXJTdGF0ZSA9IG9taXQoW2RlbGV0aW5nS2V5XSwgaW5uZXJTdGF0ZSk7XG4gICAgICAgICAgcmV0dXJuIGlubmVyU3RhdGU7XG4gICAgICAgIH0pXG5cbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OlJFTU9WRScpIHtcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3RoaXMucmVtb3ZpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV06IHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpXG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OlJFTU9WRV9TVUNDRUVERUQnKSB7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZpbmdLZXkgPSB0aGlzLnJlbW92aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSlcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiB7XG4gICAgICAgICAgaW5uZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZGVsZXRlSXRlbXNGcm9tU3RhdGUoY29uZmlnLCBhY3Rpb24sIGlubmVyU3RhdGUpLFxuICAgICAgICAgICAgW3JlbW92aW5nS2V5XTogb21pdCh2YWx1ZXModGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZykpLCBpbm5lclN0YXRlW3RoaXMucmVtb3ZpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghT2JqZWN0LmtleXMoaW5uZXJTdGF0ZVtyZW1vdmluZ0tleV0pLmxlbmd0aCkgaW5uZXJTdGF0ZSA9IG9taXQoW3JlbW92aW5nS2V5XSwgaW5uZXJTdGF0ZSk7XG4gICAgICAgICAgcmV0dXJuIGlubmVyU3RhdGU7XG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpGQUlMRUQnKSB7XG5cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgLi4ub21pdChbYnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldLCBpbm5lclN0YXRlKSxcbiAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICB9KSk7XG5cbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkxPQURfUEFHRScpIHtcbiAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhIGFzIGFueSBhcyBMb2FkUGFnZU1ldGE7XG4gICAgICAgIGNvbnN0IHBhZ2luYXRlQnkgPSBwYWdpbmF0ZWRCeShwYWdpbmF0ZU5hbWUobWV0YS5wYWdpbmF0ZUJ5KSlcbiAgICAgICAgY29uc3Qga2V5ID0gbWV0YS5wYWdpbmF0ZUJ5Lm1hcChwID0+IHZhbHVlcyhwKVswXSkuam9pbignXycpXG4gICAgICAgIGNvbnN0IGZyb21UbyA9IGdldEZyb21UbyhtZXRhLmxpbWl0LCBtZXRhLm9mZnNldCk7XG5cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3BhZ2luYXRlQnldOiB7XG4gICAgICAgICAgICAuLi5pbm5lclN0YXRlW3BhZ2luYXRlQnldLFxuICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgLi4uKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IHtcbiAgICAgICAgICAgICAgICAuLi4oKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0gfHwge30pLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgW2Zyb21Ub106IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkxPQURfUEFHRV9GQUlMRUQnKSB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YSBhcyBhbnkgYXMgTG9hZFBhZ2VNZXRhO1xuICAgICAgICBjb25zdCBwYWdpbmF0ZUJ5ID0gcGFnaW5hdGVkQnkocGFnaW5hdGVOYW1lKG1ldGEucGFnaW5hdGVCeSkpXG4gICAgICAgIGNvbnN0IGtleSA9IHBhZ2luYXRlS2V5KG1ldGEucGFnaW5hdGVCeSlcbiAgICAgICAgY29uc3QgZnJvbVRvID0gZ2V0RnJvbVRvKG1ldGEubGltaXQsIG1ldGEub2Zmc2V0KTtcblxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbcGFnaW5hdGVCeV06IHtcbiAgICAgICAgICAgIC4uLmlubmVyU3RhdGVbcGFnaW5hdGVCeV0sXG4gICAgICAgICAgICBba2V5XToge1xuICAgICAgICAgICAgICAuLi4oaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSxcbiAgICAgICAgICAgICAgbG9hZGluZzoge1xuICAgICAgICAgICAgICAgIC4uLigoaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSB8fCB7fSkubG9hZGluZyxcbiAgICAgICAgICAgICAgICBbZnJvbVRvXTogZmFsc2VcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6TE9BRF9QQUdFX1NVQ0NFRURFRCcpIHtcbiAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhIGFzIGFueSBhcyBMb2FkUGFnZVN1Y2NlZWRlZE1ldGE7XG4gICAgICAgIGNvbnN0IHBhZ2luYXRlQnkgPSBwYWdpbmF0ZWRCeShwYWdpbmF0ZU5hbWUobWV0YS5wYWdpbmF0ZUJ5KSlcbiAgICAgICAgY29uc3Qga2V5ID0gcGFnaW5hdGVLZXkobWV0YS5wYWdpbmF0ZUJ5KVxuICAgICAgICBjb25zdCBzdGFydCA9IGdldFN0YXJ0KG1ldGEubGltaXQsIG1ldGEub2Zmc2V0KTtcbiAgICAgICAgY29uc3QgZnJvbVRvID0gZ2V0RnJvbVRvKG1ldGEubGltaXQsIG1ldGEub2Zmc2V0KTtcbiAgICAgICAgY29uc3Qgcm93cyA9IHt9XG4gICAgICAgIGlmIChtZXRhLnBrcykge1xuICAgICAgICAgIG1ldGEucGtzLmZvckVhY2goKHBrLCBpKSA9PiB7XG4gICAgICAgICAgICByb3dzW3N0YXJ0ICsgaV0gPSBwaztcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi5pbm5lclN0YXRlLFxuICAgICAgICAgIFtwYWdpbmF0ZUJ5XToge1xuICAgICAgICAgICAgLi4uaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSxcbiAgICAgICAgICAgIFtrZXldOiB7XG4gICAgICAgICAgICAgIC4uLihpbm5lclN0YXRlW3BhZ2luYXRlQnldIHx8IHt9KVtrZXldLFxuICAgICAgICAgICAgICBjb3VudDogbWV0YS5jb3VudCB8fCAwLFxuICAgICAgICAgICAgICByb3dzOiB7XG4gICAgICAgICAgICAgICAgLi4uKChpbm5lclN0YXRlW3BhZ2luYXRlQnldIHx8IHt9KVtrZXldIHx8IHt9KS5yb3dzLFxuICAgICAgICAgICAgICAgIC4uLnJvd3NcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbG9hZGluZzoge1xuICAgICAgICAgICAgICAgIC4uLigoaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSB8fCB7fSkubG9hZGluZyxcbiAgICAgICAgICAgICAgICBbZnJvbVRvXTogZmFsc2VcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9O1xuXG5cbiAgICByZXR1cm4gcmVkdWNlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG1hcCBmb3IgcGtfZW50aXR5IC0+IG1vZGVsTmFtZSBvbiB0aGUgbGV2ZWwgb2YgdGhlIHNjaGVtYTpcbiAgICogZXhhbXBsZTpcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlRW50aXR5TW9kZWxNYXBSZWR1Y2Vycyhtb2RlbE5hbWUpOiBSZWR1Y2VyPHVua25vd24sIEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNZXRhPE1vZGVsPj4+IHtcbiAgICBjb25zdCBhY3Rpb25QcmVmaXggPSB0aGlzLmFjdGlvblByZWZpeDtcbiAgICBjb25zdCByZWR1Y2VyID0gKHN0YXRlID0ge30sIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1ldGE8TW9kZWw+PikgPT4ge1xuICAgICAgY29uc3QgbW9kZWxQYXRoID0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lO1xuXG4gICAgICBpZiAoIWFjdGlvbiB8fCAhYWN0aW9uLm1ldGEgfHwgIWFjdGlvbi5tZXRhLml0ZW1zIHx8ICFhY3Rpb24ubWV0YS5pdGVtcy5sZW5ndGgpIHJldHVybiBzdGF0ZTtcbiAgICAgIGNvbnN0IGl0ZW1zID0gYWN0aW9uLm1ldGEuaXRlbXM7XG5cbiAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBtb2RlbFBhdGggKyAnOjpMT0FEX1NVQ0NFRURFRCc6XG4gICAgICAgIGNhc2UgbW9kZWxQYXRoICsgJzo6VVBTRVJUX1NVQ0NFRURFRCc6XG4gICAgICAgICAgY29uc3QgaWR4ID0ge31cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNbaV0gYXMgYW55O1xuICAgICAgICAgICAgaWYgKGl0ZW0ucGtfZW50aXR5KSB7XG4gICAgICAgICAgICAgIGlkeFtpdGVtLnBrX2VudGl0eV0gPSB7XG4gICAgICAgICAgICAgICAgbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGl0ZW0uZmtDbGFzc1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAuLi5pZHhcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBtb2RlbFBhdGggKyAnOjpERUxFVEVfU1VDQ0VFREVEJzpcbiAgICAgICAgY2FzZSBtb2RlbFBhdGggKyAnOjpSRU1PVkVfU1VDQ0VFREVEJzpcbiAgICAgICAgICBjb25zdCBwa0VudGl0aWVzID0gW11cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNbaV0gYXMgYW55O1xuICAgICAgICAgICAgaWYgKGl0ZW0ucGtfZW50aXR5KSB7XG4gICAgICAgICAgICAgIHBrRW50aXRpZXMucHVzaChpdGVtLnBrX2VudGl0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YXRlID0gb21pdChwa0VudGl0aWVzLCBzdGF0ZSlcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG4gICAgcmV0dXJuIHJlZHVjZXI7XG4gIH1cblxuXG4gIHVwZGF0aW5nQnkgPSAobmFtZTogc3RyaW5nKSA9PiAndXBkYXRpbmdfJyArIGJ5KG5hbWUpO1xuICBkZWxldGluZ0J5ID0gKG5hbWU6IHN0cmluZykgPT4gJ2RlbGV0aW5nXycgKyBieShuYW1lKTtcbiAgcmVtb3ZpbmdCeSA9IChuYW1lOiBzdHJpbmcpID0+ICdyZW1vdmluZ18nICsgYnkobmFtZSk7XG5cblxuXG4gIHByaXZhdGUgZmFjZXR0ZShtb2RlbE5hbWU6IGFueSwgY29uZmlnOiBSZWR1Y2VyQ29uZmlnKSB7XG4gICAgcmV0dXJuIChhY3Rpb24sIHN0YXRlLCBjYjogKGlubmVyU3RhdGUpID0+IGFueSkgPT4ge1xuICAgICAgbGV0IG91dGVyU3RhdGU7XG4gICAgICAoeyBvdXRlclN0YXRlLCBzdGF0ZSB9ID0gdGhpcy5kZUZhY2V0dGUobW9kZWxOYW1lLCBjb25maWcsIGFjdGlvbiwgb3V0ZXJTdGF0ZSwgc3RhdGUpKTtcbiAgICAgIGNvbnN0IGlubmVyU3RhdGUgPSBjYihzdGF0ZSk7XG4gICAgICByZXR1cm4gdGhpcy5lbkZhY2V0dGUobW9kZWxOYW1lLCBjb25maWcsIGFjdGlvbiwgaW5uZXJTdGF0ZSwgb3V0ZXJTdGF0ZSk7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZGVGYWNldHRlKG1vZGVsTmFtZTogc3RyaW5nLCBjb25maWc6IFJlZHVjZXJDb25maWcsIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHsgaXRlbXM6IE1vZGVsW107IHBrPzogbnVtYmVyOyB9Piwgb3V0ZXJTdGF0ZTogYW55LCBzdGF0ZToge30pIHtcbiAgICBpZiAodGhpcy5pc0ZhY2V0dGVCeVBrKGNvbmZpZywgYWN0aW9uKSkge1xuICAgICAgLy8gb3V0ZXJTdGF0ZSA9IGNsb25lKHN0YXRlKTtcbiAgICAgIGNvbnN0IHBrID0gYWN0aW9uLm1ldGEucGsgfHwgJ3JlcG8nXG4gICAgICAvLyBzdGF0ZSA9ICFzdGF0ZVtjb25maWcuZmFjZXR0ZUJ5UGtdID8ge30gOiBzdGF0ZVtjb25maWcuZmFjZXR0ZUJ5UGtdW3BrXSB8fCB7fTtcbiAgICAgIGNvbnN0IGlubmVyU3RhdGUgPSAhc3RhdGVbY29uZmlnLmZhY2V0dGVCeVBrXSA/IHt9IDogc3RhdGVbY29uZmlnLmZhY2V0dGVCeVBrXVtwa10gfHwge307XG4gICAgICByZXR1cm4ge1xuICAgICAgICBvdXRlclN0YXRlOiBzdGF0ZSxcbiAgICAgICAgc3RhdGU6IGlubmVyU3RhdGVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgb3V0ZXJTdGF0ZSwgc3RhdGUgfTtcbiAgfVxuXG4gIHByaXZhdGUgZW5GYWNldHRlKG1vZGVsTmFtZTogc3RyaW5nLCBjb25maWc6IFJlZHVjZXJDb25maWcsIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHsgaXRlbXM6IE1vZGVsW107IHBrPzogbnVtYmVyOyB9Piwgc3RhdGU6IHt9LCBvdXRlclN0YXRlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc0ZhY2V0dGVCeVBrKGNvbmZpZywgYWN0aW9uKSkge1xuICAgICAgY29uc3QgcGsgPSBhY3Rpb24ubWV0YS5wayB8fCAncmVwbydcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICAuLi5vdXRlclN0YXRlLFxuICAgICAgICBbY29uZmlnLmZhY2V0dGVCeVBrXToge1xuICAgICAgICAgIC4uLm91dGVyU3RhdGVbY29uZmlnLmZhY2V0dGVCeVBrXSxcbiAgICAgICAgICBbcGtdOiBzdGF0ZVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuXG4gIHByaXZhdGUgaXNGYWNldHRlQnlQayhjb25maWc6IFJlZHVjZXJDb25maWcsIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHsgaXRlbXM6IE1vZGVsW107IHBrPzogbnVtYmVyOyB9Pikge1xuICAgIGlmIChjb25maWcuZmFjZXR0ZUJ5UGspIHtcbiAgICAgIGlmICghYWN0aW9uLm1ldGEgfHwgYWN0aW9uLm1ldGEucGsgPT09IHVuZGVmaW5lZCkgdGhyb3cgRXJyb3IoJ0ZhY2V0dGUgYWN0aW9uwqBtdXN0IHByb3ZpZGUgcGsgZm9yIGZhY2V0dGUnKTtcbiAgICAgIGVsc2UgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxuXG4gIGRlbGV0ZUl0ZW1zRnJvbVN0YXRlKGNvbmZpZzogUmVkdWNlckNvbmZpZywgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgfT4sIHN0YXRlKSB7XG4gICAgY29uc3QgaXRlbXMgPSBhY3Rpb24ubWV0YS5pdGVtcztcbiAgICAvLyBsZXQgc3RhdGUgPSB7fVxuICAgIGNvbnN0IGdyb3VwQnlzID0gIShjb25maWcuZ3JvdXBCeSAmJiBjb25maWcuZ3JvdXBCeS5sZW5ndGgpID8gW10gOiBjb25maWcuZ3JvdXBCeTtcbiAgICBjb25zdCBncm91cHMgPSBncm91cEJ5cy5tYXAoaSA9PiAoe1xuICAgICAgZ3JvdXBCeUtleTogYnkoaS5rZXlJblN0b3JlKSxcbiAgICAgIGdyb3VwQnlGbjogaS5ncm91cEJ5Rm4sXG4gICAgfSkpXG4gICAgY29uc3QgbWFpbkluZGV4S2V5ID0gYnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSk7IC8vIGZpcnN0IHNlZ21lbnQgZS5nLiAnYnlfcGtfZW50aXR5J1xuXG4gICAgaXRlbXMuZm9yRWFjaCgocmVtb3ZlZEl0ZW0pID0+IHtcbiAgICAgIC8vIGdldCBwYXRoIHNlZ21lbnRzIG9mIG5ldyBpdGVtXG4gICAgICBjb25zdCBpdGVtS2V5ID0gY29uZmlnLmluZGV4QnkuaW5kZXhCeUZuKHJlbW92ZWRJdGVtKTsgLy8gc2Vjb25kIHNlZ21lbnQgZS5nLiAnODA3MDYwJ1xuXG4gICAgICAvLyBnZXQgb2xkIGl0ZW0sIGlmIGV4aXN0c1xuICAgICAgY29uc3Qgb2xkSXRlbSA9IHN0YXRlW21haW5JbmRleEtleV0gPyBzdGF0ZVttYWluSW5kZXhLZXldW2l0ZW1LZXldIDogdW5kZWZpbmVkO1xuXG4gICAgICAvLyBROiBEb2VzIHRoZSBpdGVtIGV4aXN0cz9cbiAgICAgIGlmIChvbGRJdGVtKSB7XG4gICAgICAgIC8vIEE6IFllcy4gdXNlIG9sZCBpdGVtIGRvZXMgZXhpc3RcblxuICAgICAgICAvLyByZW1vdmUgdGhlIHJlbW92ZWRJdGVtIGF0IHBhdGggaW4gbWFpbiBpbmRleFxuICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBbbWFpbkluZGV4S2V5XToge1xuICAgICAgICAgICAgLi4ub21pdChbaXRlbUtleV0sIHN0YXRlW21haW5JbmRleEtleV0pLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlbGV0ZSB0aGUgcmVtb3ZlZEl0ZW0gYXQgcGF0aCBpbiB0aGUgZ3JvdXAgaW5kZXhcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goZyA9PiB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBLZXkgPSB0aGlzLmdldEdyb3VwS2V5T2ZJdGVtKGcuZ3JvdXBCeUZuLCByZW1vdmVkSXRlbSlcbiAgICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgW2cuZ3JvdXBCeUtleV06IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGVbZy5ncm91cEJ5S2V5XSxcbiAgICAgICAgICAgICAgW2dyb3VwS2V5XToge1xuICAgICAgICAgICAgICAgIC4uLm9taXQoW2l0ZW1LZXldLCAoc3RhdGVbZy5ncm91cEJ5S2V5XSB8fCB7fSlbZ3JvdXBLZXldKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIC8vIGNsZWFudXAgcGFnaW5hdGlvbnNcbiAgICAgICAgICAvLyBzdGF0ZSA9IHRoaXMucmVzZXRQYWdpbmF0aW9uc0J5R3JvdXAoZy5ncm91cEJ5S2V5LCBzdGF0ZSwgZ3JvdXBLZXkpO1xuXG4gICAgICAgIH0pXG4gICAgICB9XG5cblxuICAgIH0pXG5cbiAgICAvLyBjbGVhbnVwIG1haW4gaW5kZXhcbiAgICBpZiAoT2JqZWN0LmtleXMoc3RhdGVbbWFpbkluZGV4S2V5XSkubGVuZ3RoIDwgMSkge1xuICAgICAgc3RhdGUgPSB7IC4uLm9taXQoW21haW5JbmRleEtleV0sIHN0YXRlKSB9XG4gICAgfVxuICAgIC8vIGNsZWFudXAgZ3JvdXAgaW5kaWNlc1xuICAgIGdyb3Vwcy5mb3JFYWNoKGcgPT4ge1xuXG4gICAgICAvLyBjbGVhbnVwIGdyb3VwcyBpbiBncm91cCBpbmRleFxuICAgICAgT2JqZWN0LmtleXMoc3RhdGVbZy5ncm91cEJ5S2V5XSkuZm9yRWFjaChncm91cEtleSA9PiB7XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHN0YXRlW2cuZ3JvdXBCeUtleV1bZ3JvdXBLZXldKS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIFtnLmdyb3VwQnlLZXldOiBvbWl0KFtncm91cEtleV0sIHN0YXRlW2cuZ3JvdXBCeUtleV0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLyBjbGVhbnVwIGdyb3VwIGluZGV4XG4gICAgICBpZiAoT2JqZWN0LmtleXMoc3RhdGVbZy5ncm91cEJ5S2V5XSkubGVuZ3RoIDwgMSkge1xuICAgICAgICBzdGF0ZSA9IHsgLi4ub21pdChbZy5ncm91cEJ5S2V5XSwgc3RhdGUpIH1cbiAgICAgIH1cbiAgICB9KVxuXG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBtZXJnZUl0ZW1zSW5TdGF0ZShjb25maWc6IFJlZHVjZXJDb25maWcsIHN0YXRlLCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7IGl0ZW1zOiBNb2RlbFtdOyB9PlxuICAgIC8vICwgcmVzZXRQYWdpbmF0aW9ucyA9IGZhbHNlXG4gICkge1xuICAgIGNvbnN0IGl0ZW1zID0gYWN0aW9uLm1ldGEuaXRlbXM7XG4gICAgY29uc3QgZ3JvdXBCeXMgPSAhKGNvbmZpZy5ncm91cEJ5ICYmIGNvbmZpZy5ncm91cEJ5Lmxlbmd0aCkgPyBbXSA6IGNvbmZpZy5ncm91cEJ5O1xuICAgIGNvbnN0IGdyb3VwcyA9IGdyb3VwQnlzLm1hcChpID0+ICh7XG4gICAgICBncm91cEJ5S2V5OiBieShpLmtleUluU3RvcmUpLFxuICAgICAgZ3JvdXBCeUZuOiBpLmdyb3VwQnlGbixcbiAgICB9KSlcblxuICAgIGNvbnN0IG1haW5JbmRleEtleSA9IGJ5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpOyAvLyBmaXJzdCBzZWdtZW50IGUuZy4gJ2J5X3BrX2VudGl0eSdcblxuICAgIGl0ZW1zLmZvckVhY2goKG5ld0l0ZW0pID0+IHtcbiAgICAgIC8vIGdldCBwYXRoIHNlZ21lbnRzIG9mIG5ldyBpdGVtXG4gICAgICBjb25zdCBpdGVtS2V5ID0gY29uZmlnLmluZGV4QnkuaW5kZXhCeUZuKG5ld0l0ZW0pOyAvLyBzZWNvbmQgc2VnbWVudCBlLmcuICc4MDcwNjAnXG5cbiAgICAgIC8vIGdldCBvbGQgaXRlbSwgaWYgZXhpc3RzXG4gICAgICBjb25zdCBvbGRJdGVtID0gc3RhdGVbbWFpbkluZGV4S2V5XSA/IHN0YXRlW21haW5JbmRleEtleV1baXRlbUtleV0gOiB1bmRlZmluZWQ7XG5cbiAgICAgIGxldCBpdGVtVG9TZXQ7XG5cbiAgICAgIC8vIFE6IERvZXMgdGhlIGl0ZW0gZXhpc3RzLCBhbmQgaXMgaXQgZGVlcGx5LWVxdWFsIHRvIHRoZSBuZXcgaXRlbT9cbiAgICAgIGNvbnN0IGVxdWFsc0ZuID0gY29uZmlnLmVxdWFscyB8fCBlcXVhbHNcbiAgICAgIGlmIChvbGRJdGVtICYmIGVxdWFsc0ZuKG5ld0l0ZW0sIG9sZEl0ZW0pKSB7XG4gICAgICAgIC8vIEE6IFllcy4gdXNlIG9sZCBpdGVtIGFzIGl0ZW1Ub1NldFxuICAgICAgICBpdGVtVG9TZXQgPSBvbGRJdGVtO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIEE6IE5vLiB1c2UgbmV3IGl0ZW0gYXMgaXRlbVRvU2V0XG4gICAgICAgIGl0ZW1Ub1NldCA9IG5ld0l0ZW07XG5cbiAgICAgICAgLy8gcHV0IHRoZSBpdGVtVG9TZXQgYXQgcGF0aCBpbiBtYWluIGluZGV4XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIFttYWluSW5kZXhLZXldOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZVttYWluSW5kZXhLZXldLFxuICAgICAgICAgICAgW2l0ZW1LZXldOiBpdGVtVG9TZXRcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpdGVyYXRlIG92ZXIgdGhlIGdyb3VwIGluZGV4ZXNcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goZyA9PiB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBvbGRJdGVtIGZyb20gYWxsIGdyb3VwIGluZGV4ZXNcbiAgICAgICAgICBjb25zdCBvbGRHcm91cEtleSA9IHRoaXMuZ2V0R3JvdXBLZXlPZkl0ZW0oZy5ncm91cEJ5Rm4sIG9sZEl0ZW0pXG4gICAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIFtnLmdyb3VwQnlLZXldOiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlW2cuZ3JvdXBCeUtleV0sXG4gICAgICAgICAgICAgIFtvbGRHcm91cEtleV06IHtcbiAgICAgICAgICAgICAgICAuLi5vbWl0KFtpdGVtS2V5XSwgKHN0YXRlW2cuZ3JvdXBCeUtleV0gfHwge30pW29sZEdyb3VwS2V5XSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGFkZCB0aGUgaXRlbVRvU2V0IHRvIGFsbCBncm91cCBpbmRleGVzLCBpZiBub3QgdW5kZWZpbmVkXG4gICAgICAgICAgY29uc3QgbmV3R3JvdXBLZXkgPSB0aGlzLmdldEdyb3VwS2V5T2ZJdGVtKGcuZ3JvdXBCeUZuLCBpdGVtVG9TZXQpXG4gICAgICAgICAgaWYgKG5ld0dyb3VwS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgW2cuZ3JvdXBCeUtleV06IHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZVtnLmdyb3VwQnlLZXldLFxuICAgICAgICAgICAgICAgIFtuZXdHcm91cEtleV06IHtcbiAgICAgICAgICAgICAgICAgIC4uLihzdGF0ZVtnLmdyb3VwQnlLZXldIHx8IHt9KVtuZXdHcm91cEtleV0sXG4gICAgICAgICAgICAgICAgICBbaXRlbUtleV06IGl0ZW1Ub1NldFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG5cbiAgLy8gLyoqXG4gIC8vICAqIHJlc2V0cyBwYWdpbmF0aW9uIHdpdGhpbiBhIGdyb3VwLCBlLmcuICdwYWdfYnlfZmtfcHJvcGVydHknXG4gIC8vICAqIFRPRE86IGNoZWNrIGlmIGNhbiBiZSBkZWxldGVkXG4gIC8vICAqL1xuICAvLyBwcml2YXRlIHJlc2V0UGFnaW5hdGlvbnNCeUdyb3VwKGdyb3VwQnlLZXk6IHN0cmluZywgc3RhdGU6IGFueSwgZ3JvdXBLZXk6IGFueSwgaXNVcHNlcnQgPSBmYWxzZSkge1xuICAvLyAgIGNvbnN0IHBhZ2luYXRlQnkgPSBwYWcoZ3JvdXBCeUtleSk7XG4gIC8vICAgaWYgKHN0YXRlW3BhZ2luYXRlQnldICYmIHN0YXRlW3BhZ2luYXRlQnldW2dyb3VwS2V5XSAmJiBzdGF0ZVtwYWdpbmF0ZUJ5XVtncm91cEtleV0uY291bnQgIT09IHVuZGVmaW5lZCkge1xuICAvLyAgICAgc3RhdGUgPSB7XG4gIC8vICAgICAgIC4uLnN0YXRlLFxuICAvLyAgICAgICBbcGFnaW5hdGVCeV06IHtcbiAgLy8gICAgICAgICAuLi5zdGF0ZVtwYWdpbmF0ZUJ5XSxcbiAgLy8gICAgICAgICBbZ3JvdXBLZXldOiB7XG4gIC8vICAgICAgICAgICAuLi5zdGF0ZVtwYWdpbmF0ZUJ5XVtncm91cEtleV0sXG4gIC8vICAgICAgICAgICAuLi4oIWlzVXBzZXJ0ID8ge30gOiB7IGNvdW50OiBzdGF0ZVtwYWdpbmF0ZUJ5XVtncm91cEtleV0uY291bnQgKyAxIH0pLFxuICAvLyAgICAgICAgICAgcm93czoge30sXG4gIC8vICAgICAgICAgICBsb2FkaW5nOiB7fVxuICAvLyAgICAgICAgIH1cbiAgLy8gICAgICAgfVxuICAvLyAgICAgfTtcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuIHN0YXRlO1xuICAvLyB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgb2JqZWN0IHdoZXJlIHRoZSBrZXkgcmV0dXJuZWQgYnkgdGhlIGNvbmZpZ3VyZWQgaW5kZXhCeUZuXG4gICAqL1xuICBwcml2YXRlIGluZGV4S2V5T2JqZWN0KGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHsgaXRlbXM6IE1vZGVsW107IH0+LCBjb25maWc6IFJlZHVjZXJDb25maWcpIHtcbiAgICByZXR1cm4gaW5kZXhCeSgoaSkgPT4gKGkpLCBhY3Rpb24ubWV0YS5pdGVtc1xuICAgICAgLy8gZmlsdGVyIGl0ZW1zIHRoYXQgYXJlIG5vdCAoeWV0KSBpbmRleGFibGUuIFRoaXMgaXMgbm9ybWFsbHkgdGhlIGNhc2UsIHdoZW4gY3JlYXRpbmcgbmV3IGl0ZW1zIHRoYXQgaGF2ZSBubyBwayB5ZXQuXG4gICAgICAuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbmZpZy5pbmRleEJ5LmluZGV4QnlGbihpdGVtKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAubWFwKGl0ZW0gPT4gY29uZmlnLmluZGV4QnkuaW5kZXhCeUZuKGl0ZW0pKSk7XG4gIH1cblxuICBncm91cEJ5KGl0ZW1zOiBhbnlbXSwgZ3JvdXBCeUZuOiAoaXRlbSkgPT4gc3RyaW5nLCBpbmRleEJ5Rm46IChpdGVtKSA9PiBzdHJpbmcpIHtcbiAgICBjb25zdCBncm91cHMgPSB7fVxuICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAvLyBpZiB0aGUgZ3JvdXAgYnkga2V5IGlzIG5vdCBwb3NzaWJsZSB0byBjcmVhdGUsIHRoZSBpdGVtIHdvbid0IGJlIGFkZGVkIHRvIHRoZSBpbmRleFxuICAgICAgY29uc3QgZ3JvdXBLZXkgPSB0aGlzLmdldEdyb3VwS2V5T2ZJdGVtKGdyb3VwQnlGbiwgaXRlbSk7XG5cbiAgICAgIGlmIChncm91cEtleSkge1xuICAgICAgICBjb25zdCBpbmRleEtleSA9IGluZGV4QnlGbihpdGVtKTtcbiAgICAgICAgZ3JvdXBzW2dyb3VwS2V5XSA9IHsgLi4uZ3JvdXBzW2dyb3VwS2V5XSwgLi4ueyBbaW5kZXhLZXldOiBpdGVtIH0gfVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGdyb3VwcztcbiAgfVxuXG5cblxuXG4gIHByaXZhdGUgZ2V0R3JvdXBLZXlPZkl0ZW0oZ3JvdXBCeUZuOiAoaXRlbTogYW55KSA9PiBzdHJpbmcsIGl0ZW06IGFueSk6IHN0cmluZyB7XG4gICAgbGV0IGdyb3VwS2V5XG4gICAgdHJ5IHtcbiAgICAgIGdyb3VwS2V5ID0gZ3JvdXBCeUZuKGl0ZW0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG5cbiAgICB9XG4gICAgcmV0dXJuIGdyb3VwS2V5O1xuICB9XG59XG4iXX0=