/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/reducer-factory.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL19oZWxwZXJzL3JlZHVjZXItZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBVyxNQUFNLE9BQU8sQ0FBQzs7QUFHakQsTUFBTSxPQUFPLG1CQUFtQixHQUFHLGtCQUFrQjs7Ozs7QUFDckQseUNBR0M7OztJQUZDLHdDQUFxQjs7SUFDckIsc0NBQWU7Ozs7O0FBR2pCLDZDQUVDOzs7O0FBRUQsbUNBWUM7OztJQVZDLG9DQUFxQjs7SUFDckIsZ0NBR0U7O0lBQ0YsZ0NBR0k7O0lBQ0osK0JBQWtDOzs7Ozs7QUFHcEMsMEJBQTREOzs7SUFBN0IscUJBQWU7O0lBQUMsa0JBQVc7OztBQUcxRCxNQUFNLE9BQU8sRUFBRTs7OztBQUFHLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBOztBQUNoRCxNQUFNLE9BQU8sWUFBWTs7OztBQUFHLENBQUMsS0FBd0IsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUc7Ozs7QUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7O0FBRXRHLE1BQU0sT0FBTyxHQUFHOzs7O0FBQUcsQ0FBQyxJQUFZLEVBQUUsRUFB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aUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcG9zZVJlZHVjZXJzIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvZm9ybSc7XG5pbXBvcnQgeyBVIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBlcXVhbHMsIGluZGV4QnksIGtleXMsIG9taXQsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycywgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IExvYWRQYWdlTWV0YSwgTG9hZFBhZ2VTdWNjZWVkZWRNZXRhLCBQYWdpbmF0ZUJ5UGFyYW0gfSBmcm9tICcuL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG5leHBvcnQgY29uc3QgUFJfRU5USVRZX01PREVMX01BUCA9ICdwa0VudGl0eU1vZGVsTWFwJ1xuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlNb2RlbEFuZENsYXNzPE1vZGVsTmFtZT4ge1xuICBtb2RlbE5hbWU6IE1vZGVsTmFtZSxcbiAgZmtDbGFzczogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24ge1xuICBba2V5OiBzdHJpbmddOiBSZWR1Y2VyQ29uZmlnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVkdWNlckNvbmZpZyB7XG4gIC8vIHdyYXBzIGV2ZXJ5dGhpbmcgaW4gZmFjZXR0ZSBuYW1lZCBieSBmYWNldHRlQnlQayBhbmQgZ3JvdXBlZCBieSBhY3Rpb24ubWV0YS5wa1xuICBmYWNldHRlQnlQaz86IHN0cmluZyxcbiAgaW5kZXhCeT86IHtcbiAgICBrZXlJblN0b3JlOiBzdHJpbmc7XG4gICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4gc3RyaW5nO1xuICB9LFxuICBncm91cEJ5Pzoge1xuICAgIGtleUluU3RvcmU6IHN0cmluZztcbiAgICBncm91cEJ5Rm46IChpdGVtKSA9PiBzdHJpbmc7XG4gIH1bXSxcbiAgZXF1YWxzPzogKGl0ZW1BLCBpdGVtQikgPT4gYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1ldGE8TW9kZWw+IHsgaXRlbXM6IE1vZGVsW10sIHBrPzogbnVtYmVyIH1cblxuXG5leHBvcnQgY29uc3QgYnkgPSAobmFtZTogc3RyaW5nKSA9PiAnYnlfJyArIG5hbWU7XG5leHBvcnQgY29uc3QgcGFnaW5hdGVOYW1lID0gKHBhZ0J5OiBQYWdpbmF0ZUJ5UGFyYW1bXSkgPT4gcGFnQnkubWFwKHAgPT4gT2JqZWN0LmtleXMocClbMF0pLmpvaW4oJ19fJyk7XG5cbmV4cG9ydCBjb25zdCBwYWcgPSAobmFtZTogc3RyaW5nKSA9PiAncGFnXycgKyBuYW1lO1xuZXhwb3J0IGNvbnN0IHBhZ2luYXRlZEJ5ID0gKG5hbWU6IHN0cmluZykgPT4gcGFnKGJ5KG5hbWUpKTtcblxuZXhwb3J0IGNvbnN0IHBhZ2luYXRlS2V5ID0gKHBhZ0J5OiBQYWdpbmF0ZUJ5UGFyYW1bXSkgPT4gcGFnQnkubWFwKHAgPT4gdmFsdWVzKHApWzBdKS5qb2luKCdfJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGcm9tVG8obGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpIHtcbiAgcmV0dXJuIGdldFN0YXJ0KGxpbWl0LCBvZmZzZXQpICsgJ18nICsgZ2V0RW5kKGxpbWl0LCBvZmZzZXQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5kKGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gIHJldHVybiBnZXRTdGFydChsaW1pdCwgb2Zmc2V0KSArIGxpbWl0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnQobGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpIHtcbiAgcmV0dXJuIG9mZnNldDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIHN0YW5kYXJkIHJlZHVjZXJzIGZvciB0aGUgZ2l2ZW4gbW9kZWwuXG4gKlxuICogQWRkcyBpbmRleGVzIGFjY29yZGluZyB0byBjb25maWcuXG4gKlxuICogUzogSW50ZXJmYWNlIG9mIHRoZSBzdGF0ZSAoc2xpY2Ugb2Ygc3RvcmUpXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWR1Y2VyRmFjdG9yeTxQYXlsb2FkLCBNb2RlbD4ge1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhY3Rpb25QcmVmaXg6IHN0cmluZywgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlUmVkdWNlcnMoKSB7XG5cbiAgICBjb25zdCByZWR1Y2VycyA9IHt9XG4gICAgVS5vYmoyS2V5VmFsdWVBcnIodGhpcy5jb25maWdzKS5mb3JFYWNoKHggPT4ge1xuICAgICAgcmVkdWNlcnNbeC5rZXldID0gdGhpcy5jcmVhdGVNb2RlbFJlZHVjZXJzKHgua2V5LCB4LnZhbHVlKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGVudGl0eU1vZGVsTWFwUmVkdWNlcnMgPSBrZXlzKHRoaXMuY29uZmlncykubWFwKG1vZGVsTmFtZSA9PiB0aGlzLmNyZWF0ZUVudGl0eU1vZGVsTWFwUmVkdWNlcnMobW9kZWxOYW1lKSlcbiAgICByZWR1Y2Vyc1tQUl9FTlRJVFlfTU9ERUxfTUFQXSA9IGNvbXBvc2VSZWR1Y2VycyguLi5lbnRpdHlNb2RlbE1hcFJlZHVjZXJzKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVSZWR1Y2VycyhyZWR1Y2VycylcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTW9kZWxSZWR1Y2Vycyhtb2RlbE5hbWUsIGNvbmZpZzogUmVkdWNlckNvbmZpZykge1xuICAgIGNvbnN0IGFjdGlvblByZWZpeCA9IHRoaXMuYWN0aW9uUHJlZml4O1xuICAgIGNvbnN0IHJlZHVjZXIgPSAoc3RhdGUgPSB7fSwgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWV0YTxNb2RlbD4+KSA9PiB7XG5cbiAgICAgIGNvbnN0IGZhY2V0dGUgPSB0aGlzLmZhY2V0dGUobW9kZWxOYW1lLCBjb25maWcpXG5cbiAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6TE9BRCcpIHtcblxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLy8gVE9ETyByZWZhY3RvciB0aGlzIGZvciBwYXJ0aWFsIGxvZGluZ3NcbiAgICAgICAgICAuLi5vbWl0KFtieShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV0sIGlubmVyU3RhdGUpLFxuICAgICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgICAgfSkpO1xuXG4gICAgICB9XG5cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkxPQURfU1VDQ0VFREVEJykge1xuICAgICAgICAvLyBJZiBhY3Rpb24gc3RhdGUgZGlmZmVycyBmcm9tXG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC4uLnRoaXMubWVyZ2VJdGVtc0luU3RhdGUoY29uZmlnLCBpbm5lclN0YXRlLCBhY3Rpb24pLFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgICB9KSlcbiAgICAgIH1cblxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6VVBTRVJUJykge1xuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbdGhpcy51cGRhdGluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXTogdGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZylcbiAgICAgICAgfSkpXG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpVUFNFUlRfU1VDQ0VFREVEJykge1xuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uIHRoaXMubWVyZ2VJdGVtc0luU3RhdGUoY29uZmlnLCBpbm5lclN0YXRlLCBhY3Rpb25cbiAgICAgICAgICAgIC8vICwgdHJ1ZVxuICAgICAgICAgICksXG4gICAgICAgICAgW3RoaXMudXBkYXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV06XG4gICAgICAgICAgICBvbWl0KHZhbHVlcyh0aGlzLmluZGV4S2V5T2JqZWN0KGFjdGlvbiwgY29uZmlnKSksIGlubmVyU3RhdGVbdGhpcy51cGRhdGluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXSlcbiAgICAgICAgfSkpXG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpERUxFVEUnKSB7XG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi5pbm5lclN0YXRlLFxuICAgICAgICAgIFt0aGlzLmRlbGV0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldOiB0aGlzLmluZGV4S2V5T2JqZWN0KGFjdGlvbiwgY29uZmlnKVxuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpERUxFVEVfU1VDQ0VFREVEJykge1xuXG4gICAgICAgIGNvbnN0IGRlbGV0aW5nS2V5ID0gdGhpcy5kZWxldGluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4ge1xuICAgICAgICAgIGlubmVyU3RhdGUgPSB7XG4gICAgICAgICAgICAuLi50aGlzLmRlbGV0ZUl0ZW1zRnJvbVN0YXRlKGNvbmZpZywgYWN0aW9uLCBpbm5lclN0YXRlKSxcbiAgICAgICAgICAgIFtkZWxldGluZ0tleV06IG9taXQodmFsdWVzKHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpKSwgaW5uZXJTdGF0ZVt0aGlzLmRlbGV0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIU9iamVjdC5rZXlzKGlubmVyU3RhdGVbZGVsZXRpbmdLZXldKS5sZW5ndGgpIGlubmVyU3RhdGUgPSBvbWl0KFtkZWxldGluZ0tleV0sIGlubmVyU3RhdGUpO1xuICAgICAgICAgIHJldHVybiBpbm5lclN0YXRlO1xuICAgICAgICB9KVxuXG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpSRU1PVkUnKSB7XG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi5pbm5lclN0YXRlLFxuICAgICAgICAgIFt0aGlzLnJlbW92aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldOiB0aGlzLmluZGV4S2V5T2JqZWN0KGFjdGlvbiwgY29uZmlnKVxuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpSRU1PVkVfU1VDQ0VFREVEJykge1xuXG4gICAgICAgIGNvbnN0IHJlbW92aW5nS2V5ID0gdGhpcy5yZW1vdmluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4ge1xuICAgICAgICAgIGlubmVyU3RhdGUgPSB7XG4gICAgICAgICAgICAuLi50aGlzLmRlbGV0ZUl0ZW1zRnJvbVN0YXRlKGNvbmZpZywgYWN0aW9uLCBpbm5lclN0YXRlKSxcbiAgICAgICAgICAgIFtyZW1vdmluZ0tleV06IG9taXQodmFsdWVzKHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpKSwgaW5uZXJTdGF0ZVt0aGlzLnJlbW92aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIU9iamVjdC5rZXlzKGlubmVyU3RhdGVbcmVtb3ZpbmdLZXldKS5sZW5ndGgpIGlubmVyU3RhdGUgPSBvbWl0KFtyZW1vdmluZ0tleV0sIGlubmVyU3RhdGUpO1xuICAgICAgICAgIHJldHVybiBpbm5lclN0YXRlO1xuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6RkFJTEVEJykge1xuXG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi5pbm5lclN0YXRlLFxuICAgICAgICAgIC4uLm9taXQoW2J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXSwgaW5uZXJTdGF0ZSksXG4gICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgfSkpO1xuXG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpMT0FEX1BBR0UnKSB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YSBhcyBhbnkgYXMgTG9hZFBhZ2VNZXRhO1xuICAgICAgICBjb25zdCBwYWdpbmF0ZUJ5ID0gcGFnaW5hdGVkQnkocGFnaW5hdGVOYW1lKG1ldGEucGFnaW5hdGVCeSkpXG4gICAgICAgIGNvbnN0IGtleSA9IG1ldGEucGFnaW5hdGVCeS5tYXAocCA9PiB2YWx1ZXMocClbMF0pLmpvaW4oJ18nKVxuICAgICAgICBjb25zdCBmcm9tVG8gPSBnZXRGcm9tVG8obWV0YS5saW1pdCwgbWV0YS5vZmZzZXQpO1xuXG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi5pbm5lclN0YXRlLFxuICAgICAgICAgIFtwYWdpbmF0ZUJ5XToge1xuICAgICAgICAgICAgLi4uaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSxcbiAgICAgICAgICAgIFtrZXldOiB7XG4gICAgICAgICAgICAgIC4uLihpbm5lclN0YXRlW3BhZ2luYXRlQnldIHx8IHt9KVtrZXldLFxuICAgICAgICAgICAgICBsb2FkaW5nOiB7XG4gICAgICAgICAgICAgICAgLi4uKChpbm5lclN0YXRlW3BhZ2luYXRlQnldIHx8IHt9KVtrZXldIHx8IHt9KS5sb2FkaW5nLFxuICAgICAgICAgICAgICAgIFtmcm9tVG9dOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpMT0FEX1BBR0VfRkFJTEVEJykge1xuICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGEgYXMgYW55IGFzIExvYWRQYWdlTWV0YTtcbiAgICAgICAgY29uc3QgcGFnaW5hdGVCeSA9IHBhZ2luYXRlZEJ5KHBhZ2luYXRlTmFtZShtZXRhLnBhZ2luYXRlQnkpKVxuICAgICAgICBjb25zdCBrZXkgPSBwYWdpbmF0ZUtleShtZXRhLnBhZ2luYXRlQnkpXG4gICAgICAgIGNvbnN0IGZyb21UbyA9IGdldEZyb21UbyhtZXRhLmxpbWl0LCBtZXRhLm9mZnNldCk7XG5cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3BhZ2luYXRlQnldOiB7XG4gICAgICAgICAgICAuLi5pbm5lclN0YXRlW3BhZ2luYXRlQnldLFxuICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgLi4uKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IHtcbiAgICAgICAgICAgICAgICAuLi4oKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0gfHwge30pLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgW2Zyb21Ub106IGZhbHNlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkxPQURfUEFHRV9TVUNDRUVERUQnKSB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YSBhcyBhbnkgYXMgTG9hZFBhZ2VTdWNjZWVkZWRNZXRhO1xuICAgICAgICBjb25zdCBwYWdpbmF0ZUJ5ID0gcGFnaW5hdGVkQnkocGFnaW5hdGVOYW1lKG1ldGEucGFnaW5hdGVCeSkpXG4gICAgICAgIGNvbnN0IGtleSA9IHBhZ2luYXRlS2V5KG1ldGEucGFnaW5hdGVCeSlcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBnZXRTdGFydChtZXRhLmxpbWl0LCBtZXRhLm9mZnNldCk7XG4gICAgICAgIGNvbnN0IGZyb21UbyA9IGdldEZyb21UbyhtZXRhLmxpbWl0LCBtZXRhLm9mZnNldCk7XG4gICAgICAgIGNvbnN0IHJvd3MgPSB7fVxuICAgICAgICBpZiAobWV0YS5wa3MpIHtcbiAgICAgICAgICBtZXRhLnBrcy5mb3JFYWNoKChwaywgaSkgPT4ge1xuICAgICAgICAgICAgcm93c1tzdGFydCArIGldID0gcGs7XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbcGFnaW5hdGVCeV06IHtcbiAgICAgICAgICAgIC4uLmlubmVyU3RhdGVbcGFnaW5hdGVCeV0sXG4gICAgICAgICAgICBba2V5XToge1xuICAgICAgICAgICAgICAuLi4oaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSxcbiAgICAgICAgICAgICAgY291bnQ6IG1ldGEuY291bnQgfHwgMCxcbiAgICAgICAgICAgICAgcm93czoge1xuICAgICAgICAgICAgICAgIC4uLigoaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSB8fCB7fSkucm93cyxcbiAgICAgICAgICAgICAgICAuLi5yb3dzXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IHtcbiAgICAgICAgICAgICAgICAuLi4oKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0gfHwge30pLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgW2Zyb21Ub106IGZhbHNlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHJlZHVjZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBtYXAgZm9yIHBrX2VudGl0eSAtPiBtb2RlbE5hbWUgb24gdGhlIGxldmVsIG9mIHRoZSBzY2hlbWE6XG4gICAqIGV4YW1wbGU6XG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUVudGl0eU1vZGVsTWFwUmVkdWNlcnMobW9kZWxOYW1lKTogUmVkdWNlcjx1bmtub3duLCBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWV0YTxNb2RlbD4+PiB7XG4gICAgY29uc3QgYWN0aW9uUHJlZml4ID0gdGhpcy5hY3Rpb25QcmVmaXg7XG4gICAgY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IHt9LCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNZXRhPE1vZGVsPj4pID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsUGF0aCA9IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZTtcblxuICAgICAgaWYgKCFhY3Rpb24gfHwgIWFjdGlvbi5tZXRhIHx8ICFhY3Rpb24ubWV0YS5pdGVtcyB8fCAhYWN0aW9uLm1ldGEuaXRlbXMubGVuZ3RoKSByZXR1cm4gc3RhdGU7XG4gICAgICBjb25zdCBpdGVtcyA9IGFjdGlvbi5tZXRhLml0ZW1zO1xuXG4gICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgbW9kZWxQYXRoICsgJzo6TE9BRF9TVUNDRUVERUQnOlxuICAgICAgICBjYXNlIG1vZGVsUGF0aCArICc6OlVQU0VSVF9TVUNDRUVERUQnOlxuICAgICAgICAgIGNvbnN0IGlkeCA9IHt9XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldIGFzIGFueTtcbiAgICAgICAgICAgIGlmIChpdGVtLnBrX2VudGl0eSkge1xuICAgICAgICAgICAgICBpZHhbaXRlbS5wa19lbnRpdHldID0ge1xuICAgICAgICAgICAgICAgIG1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICBma0NsYXNzOiBpdGVtLmZrQ2xhc3NcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgLi4uaWR4XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgbW9kZWxQYXRoICsgJzo6REVMRVRFX1NVQ0NFRURFRCc6XG4gICAgICAgIGNhc2UgbW9kZWxQYXRoICsgJzo6UkVNT1ZFX1NVQ0NFRURFRCc6XG4gICAgICAgICAgY29uc3QgcGtFbnRpdGllcyA9IFtdXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldIGFzIGFueTtcbiAgICAgICAgICAgIGlmIChpdGVtLnBrX2VudGl0eSkge1xuICAgICAgICAgICAgICBwa0VudGl0aWVzLnB1c2goaXRlbS5wa19lbnRpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzdGF0ZSA9IG9taXQocGtFbnRpdGllcywgc3RhdGUpXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9O1xuICAgIHJldHVybiByZWR1Y2VyO1xuICB9XG5cblxuICB1cGRhdGluZ0J5ID0gKG5hbWU6IHN0cmluZykgPT4gJ3VwZGF0aW5nXycgKyBieShuYW1lKTtcbiAgZGVsZXRpbmdCeSA9IChuYW1lOiBzdHJpbmcpID0+ICdkZWxldGluZ18nICsgYnkobmFtZSk7XG4gIHJlbW92aW5nQnkgPSAobmFtZTogc3RyaW5nKSA9PiAncmVtb3ZpbmdfJyArIGJ5KG5hbWUpO1xuXG5cblxuICBwcml2YXRlIGZhY2V0dGUobW9kZWxOYW1lOiBhbnksIGNvbmZpZzogUmVkdWNlckNvbmZpZykge1xuICAgIHJldHVybiAoYWN0aW9uLCBzdGF0ZSwgY2I6IChpbm5lclN0YXRlKSA9PiBhbnkpID0+IHtcbiAgICAgIGxldCBvdXRlclN0YXRlO1xuICAgICAgKHsgb3V0ZXJTdGF0ZSwgc3RhdGUgfSA9IHRoaXMuZGVGYWNldHRlKG1vZGVsTmFtZSwgY29uZmlnLCBhY3Rpb24sIG91dGVyU3RhdGUsIHN0YXRlKSk7XG4gICAgICBjb25zdCBpbm5lclN0YXRlID0gY2Ioc3RhdGUpO1xuICAgICAgcmV0dXJuIHRoaXMuZW5GYWNldHRlKG1vZGVsTmFtZSwgY29uZmlnLCBhY3Rpb24sIGlubmVyU3RhdGUsIG91dGVyU3RhdGUpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGRlRmFjZXR0ZShtb2RlbE5hbWU6IHN0cmluZywgY29uZmlnOiBSZWR1Y2VyQ29uZmlnLCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7IGl0ZW1zOiBNb2RlbFtdOyBwaz86IG51bWJlcjsgfT4sIG91dGVyU3RhdGU6IGFueSwgc3RhdGU6IHt9KSB7XG4gICAgaWYgKHRoaXMuaXNGYWNldHRlQnlQayhjb25maWcsIGFjdGlvbikpIHtcbiAgICAgIC8vIG91dGVyU3RhdGUgPSBjbG9uZShzdGF0ZSk7XG4gICAgICBjb25zdCBwayA9IGFjdGlvbi5tZXRhLnBrIHx8ICdyZXBvJ1xuICAgICAgLy8gc3RhdGUgPSAhc3RhdGVbY29uZmlnLmZhY2V0dGVCeVBrXSA/IHt9IDogc3RhdGVbY29uZmlnLmZhY2V0dGVCeVBrXVtwa10gfHwge307XG4gICAgICBjb25zdCBpbm5lclN0YXRlID0gIXN0YXRlW2NvbmZpZy5mYWNldHRlQnlQa10gPyB7fSA6IHN0YXRlW2NvbmZpZy5mYWNldHRlQnlQa11bcGtdIHx8IHt9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb3V0ZXJTdGF0ZTogc3RhdGUsXG4gICAgICAgIHN0YXRlOiBpbm5lclN0YXRlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IG91dGVyU3RhdGUsIHN0YXRlIH07XG4gIH1cblxuICBwcml2YXRlIGVuRmFjZXR0ZShtb2RlbE5hbWU6IHN0cmluZywgY29uZmlnOiBSZWR1Y2VyQ29uZmlnLCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7IGl0ZW1zOiBNb2RlbFtdOyBwaz86IG51bWJlcjsgfT4sIHN0YXRlOiB7fSwgb3V0ZXJTdGF0ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNGYWNldHRlQnlQayhjb25maWcsIGFjdGlvbikpIHtcbiAgICAgIGNvbnN0IHBrID0gYWN0aW9uLm1ldGEucGsgfHwgJ3JlcG8nXG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4ub3V0ZXJTdGF0ZSxcbiAgICAgICAgW2NvbmZpZy5mYWNldHRlQnlQa106IHtcbiAgICAgICAgICAuLi5vdXRlclN0YXRlW2NvbmZpZy5mYWNldHRlQnlQa10sXG4gICAgICAgICAgW3BrXTogc3RhdGVcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cblxuICBwcml2YXRlIGlzRmFjZXR0ZUJ5UGsoY29uZmlnOiBSZWR1Y2VyQ29uZmlnLCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7IGl0ZW1zOiBNb2RlbFtdOyBwaz86IG51bWJlcjsgfT4pIHtcbiAgICBpZiAoY29uZmlnLmZhY2V0dGVCeVBrKSB7XG4gICAgICBpZiAoIWFjdGlvbi5tZXRhIHx8IGFjdGlvbi5tZXRhLnBrID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdGYWNldHRlIGFjdGlvbsKgbXVzdCBwcm92aWRlIHBrIGZvciBmYWNldHRlJyk7XG4gICAgICBlbHNlIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG5cblxuICBkZWxldGVJdGVtc0Zyb21TdGF0ZShjb25maWc6IFJlZHVjZXJDb25maWcsIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHsgaXRlbXM6IE1vZGVsW107IH0+LCBzdGF0ZSkge1xuICAgIGNvbnN0IGl0ZW1zID0gYWN0aW9uLm1ldGEuaXRlbXM7XG4gICAgLy8gbGV0IHN0YXRlID0ge31cbiAgICBjb25zdCBncm91cEJ5cyA9ICEoY29uZmlnLmdyb3VwQnkgJiYgY29uZmlnLmdyb3VwQnkubGVuZ3RoKSA/IFtdIDogY29uZmlnLmdyb3VwQnk7XG4gICAgY29uc3QgZ3JvdXBzID0gZ3JvdXBCeXMubWFwKGkgPT4gKHtcbiAgICAgIGdyb3VwQnlLZXk6IGJ5KGkua2V5SW5TdG9yZSksXG4gICAgICBncm91cEJ5Rm46IGkuZ3JvdXBCeUZuLFxuICAgIH0pKVxuICAgIGNvbnN0IG1haW5JbmRleEtleSA9IGJ5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpOyAvLyBmaXJzdCBzZWdtZW50IGUuZy4gJ2J5X3BrX2VudGl0eSdcblxuICAgIGl0ZW1zLmZvckVhY2goKHJlbW92ZWRJdGVtKSA9PiB7XG4gICAgICAvLyBnZXQgcGF0aCBzZWdtZW50cyBvZiBuZXcgaXRlbVxuICAgICAgY29uc3QgaXRlbUtleSA9IGNvbmZpZy5pbmRleEJ5LmluZGV4QnlGbihyZW1vdmVkSXRlbSk7IC8vIHNlY29uZCBzZWdtZW50IGUuZy4gJzgwNzA2MCdcblxuICAgICAgLy8gZ2V0IG9sZCBpdGVtLCBpZiBleGlzdHNcbiAgICAgIGNvbnN0IG9sZEl0ZW0gPSBzdGF0ZVttYWluSW5kZXhLZXldID8gc3RhdGVbbWFpbkluZGV4S2V5XVtpdGVtS2V5XSA6IHVuZGVmaW5lZDtcblxuICAgICAgLy8gUTogRG9lcyB0aGUgaXRlbSBleGlzdHM/XG4gICAgICBpZiAob2xkSXRlbSkge1xuICAgICAgICAvLyBBOiBZZXMuIHVzZSBvbGQgaXRlbSBkb2VzIGV4aXN0XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoZSByZW1vdmVkSXRlbSBhdCBwYXRoIGluIG1haW4gaW5kZXhcbiAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgW21haW5JbmRleEtleV06IHtcbiAgICAgICAgICAgIC4uLm9taXQoW2l0ZW1LZXldLCBzdGF0ZVttYWluSW5kZXhLZXldKSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZWxldGUgdGhlIHJlbW92ZWRJdGVtIGF0IHBhdGggaW4gdGhlIGdyb3VwIGluZGV4XG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKGcgPT4ge1xuICAgICAgICAgIGNvbnN0IGdyb3VwS2V5ID0gdGhpcy5nZXRHcm91cEtleU9mSXRlbShnLmdyb3VwQnlGbiwgcmVtb3ZlZEl0ZW0pXG4gICAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIFtnLmdyb3VwQnlLZXldOiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlW2cuZ3JvdXBCeUtleV0sXG4gICAgICAgICAgICAgIFtncm91cEtleV06IHtcbiAgICAgICAgICAgICAgICAuLi5vbWl0KFtpdGVtS2V5XSwgKHN0YXRlW2cuZ3JvdXBCeUtleV0gfHwge30pW2dyb3VwS2V5XSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAvLyBjbGVhbnVwIHBhZ2luYXRpb25zXG4gICAgICAgICAgLy8gc3RhdGUgPSB0aGlzLnJlc2V0UGFnaW5hdGlvbnNCeUdyb3VwKGcuZ3JvdXBCeUtleSwgc3RhdGUsIGdyb3VwS2V5KTtcblxuICAgICAgICB9KVxuICAgICAgfVxuXG5cbiAgICB9KVxuXG4gICAgLy8gY2xlYW51cCBtYWluIGluZGV4XG4gICAgaWYgKE9iamVjdC5rZXlzKHN0YXRlW21haW5JbmRleEtleV0pLmxlbmd0aCA8IDEpIHtcbiAgICAgIHN0YXRlID0geyAuLi5vbWl0KFttYWluSW5kZXhLZXldLCBzdGF0ZSkgfVxuICAgIH1cbiAgICAvLyBjbGVhbnVwIGdyb3VwIGluZGljZXNcbiAgICBncm91cHMuZm9yRWFjaChnID0+IHtcblxuICAgICAgLy8gY2xlYW51cCBncm91cHMgaW4gZ3JvdXAgaW5kZXhcbiAgICAgIE9iamVjdC5rZXlzKHN0YXRlW2cuZ3JvdXBCeUtleV0pLmZvckVhY2goZ3JvdXBLZXkgPT4ge1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhzdGF0ZVtnLmdyb3VwQnlLZXldW2dyb3VwS2V5XSkubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBbZy5ncm91cEJ5S2V5XTogb21pdChbZ3JvdXBLZXldLCBzdGF0ZVtnLmdyb3VwQnlLZXldKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gY2xlYW51cCBncm91cCBpbmRleFxuICAgICAgaWYgKE9iamVjdC5rZXlzKHN0YXRlW2cuZ3JvdXBCeUtleV0pLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgc3RhdGUgPSB7IC4uLm9taXQoW2cuZ3JvdXBCeUtleV0sIHN0YXRlKSB9XG4gICAgICB9XG4gICAgfSlcblxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgbWVyZ2VJdGVtc0luU3RhdGUoY29uZmlnOiBSZWR1Y2VyQ29uZmlnLCBzdGF0ZSwgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgfT5cbiAgICAvLyAsIHJlc2V0UGFnaW5hdGlvbnMgPSBmYWxzZVxuICApIHtcbiAgICBjb25zdCBpdGVtcyA9IGFjdGlvbi5tZXRhLml0ZW1zO1xuICAgIGNvbnN0IGdyb3VwQnlzID0gIShjb25maWcuZ3JvdXBCeSAmJiBjb25maWcuZ3JvdXBCeS5sZW5ndGgpID8gW10gOiBjb25maWcuZ3JvdXBCeTtcbiAgICBjb25zdCBncm91cHMgPSBncm91cEJ5cy5tYXAoaSA9PiAoe1xuICAgICAgZ3JvdXBCeUtleTogYnkoaS5rZXlJblN0b3JlKSxcbiAgICAgIGdyb3VwQnlGbjogaS5ncm91cEJ5Rm4sXG4gICAgfSkpXG5cbiAgICBjb25zdCBtYWluSW5kZXhLZXkgPSBieShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKTsgLy8gZmlyc3Qgc2VnbWVudCBlLmcuICdieV9wa19lbnRpdHknXG5cbiAgICBpdGVtcy5mb3JFYWNoKChuZXdJdGVtKSA9PiB7XG4gICAgICAvLyBnZXQgcGF0aCBzZWdtZW50cyBvZiBuZXcgaXRlbVxuICAgICAgY29uc3QgaXRlbUtleSA9IGNvbmZpZy5pbmRleEJ5LmluZGV4QnlGbihuZXdJdGVtKTsgLy8gc2Vjb25kIHNlZ21lbnQgZS5nLiAnODA3MDYwJ1xuXG4gICAgICAvLyBnZXQgb2xkIGl0ZW0sIGlmIGV4aXN0c1xuICAgICAgY29uc3Qgb2xkSXRlbSA9IHN0YXRlW21haW5JbmRleEtleV0gPyBzdGF0ZVttYWluSW5kZXhLZXldW2l0ZW1LZXldIDogdW5kZWZpbmVkO1xuXG4gICAgICBsZXQgaXRlbVRvU2V0O1xuXG4gICAgICAvLyBROiBEb2VzIHRoZSBpdGVtIGV4aXN0cywgYW5kIGlzIGl0IGRlZXBseS1lcXVhbCB0byB0aGUgbmV3IGl0ZW0/XG4gICAgICBjb25zdCBlcXVhbHNGbiA9IGNvbmZpZy5lcXVhbHMgfHwgZXF1YWxzXG4gICAgICBpZiAob2xkSXRlbSAmJiBlcXVhbHNGbihuZXdJdGVtLCBvbGRJdGVtKSkge1xuICAgICAgICAvLyBBOiBZZXMuIHVzZSBvbGQgaXRlbSBhcyBpdGVtVG9TZXRcbiAgICAgICAgaXRlbVRvU2V0ID0gb2xkSXRlbTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBBOiBOby4gdXNlIG5ldyBpdGVtIGFzIGl0ZW1Ub1NldFxuICAgICAgICBpdGVtVG9TZXQgPSBuZXdJdGVtO1xuXG4gICAgICAgIC8vIHB1dCB0aGUgaXRlbVRvU2V0IGF0IHBhdGggaW4gbWFpbiBpbmRleFxuICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBbbWFpbkluZGV4S2V5XToge1xuICAgICAgICAgICAgLi4uc3RhdGVbbWFpbkluZGV4S2V5XSxcbiAgICAgICAgICAgIFtpdGVtS2V5XTogaXRlbVRvU2V0XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBncm91cCBpbmRleGVzXG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKGcgPT4ge1xuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgb2xkSXRlbSBmcm9tIGFsbCBncm91cCBpbmRleGVzXG4gICAgICAgICAgY29uc3Qgb2xkR3JvdXBLZXkgPSB0aGlzLmdldEdyb3VwS2V5T2ZJdGVtKGcuZ3JvdXBCeUZuLCBvbGRJdGVtKVxuICAgICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBbZy5ncm91cEJ5S2V5XToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZVtnLmdyb3VwQnlLZXldLFxuICAgICAgICAgICAgICBbb2xkR3JvdXBLZXldOiB7XG4gICAgICAgICAgICAgICAgLi4ub21pdChbaXRlbUtleV0sIChzdGF0ZVtnLmdyb3VwQnlLZXldIHx8IHt9KVtvbGRHcm91cEtleV0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBhZGQgdGhlIGl0ZW1Ub1NldCB0byBhbGwgZ3JvdXAgaW5kZXhlcywgaWYgbm90IHVuZGVmaW5lZFxuICAgICAgICAgIGNvbnN0IG5ld0dyb3VwS2V5ID0gdGhpcy5nZXRHcm91cEtleU9mSXRlbShnLmdyb3VwQnlGbiwgaXRlbVRvU2V0KVxuICAgICAgICAgIGlmIChuZXdHcm91cEtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgIFtnLmdyb3VwQnlLZXldOiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGVbZy5ncm91cEJ5S2V5XSxcbiAgICAgICAgICAgICAgICBbbmV3R3JvdXBLZXldOiB7XG4gICAgICAgICAgICAgICAgICAuLi4oc3RhdGVbZy5ncm91cEJ5S2V5XSB8fCB7fSlbbmV3R3JvdXBLZXldLFxuICAgICAgICAgICAgICAgICAgW2l0ZW1LZXldOiBpdGVtVG9TZXRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuXG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuXG4gIC8vIC8qKlxuICAvLyAgKiByZXNldHMgcGFnaW5hdGlvbiB3aXRoaW4gYSBncm91cCwgZS5nLiAncGFnX2J5X2ZrX3Byb3BlcnR5J1xuICAvLyAgKiBUT0RPOiBjaGVjayBpZiBjYW4gYmUgZGVsZXRlZFxuICAvLyAgKi9cbiAgLy8gcHJpdmF0ZSByZXNldFBhZ2luYXRpb25zQnlHcm91cChncm91cEJ5S2V5OiBzdHJpbmcsIHN0YXRlOiBhbnksIGdyb3VwS2V5OiBhbnksIGlzVXBzZXJ0ID0gZmFsc2UpIHtcbiAgLy8gICBjb25zdCBwYWdpbmF0ZUJ5ID0gcGFnKGdyb3VwQnlLZXkpO1xuICAvLyAgIGlmIChzdGF0ZVtwYWdpbmF0ZUJ5XSAmJiBzdGF0ZVtwYWdpbmF0ZUJ5XVtncm91cEtleV0gJiYgc3RhdGVbcGFnaW5hdGVCeV1bZ3JvdXBLZXldLmNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgLy8gICAgIHN0YXRlID0ge1xuICAvLyAgICAgICAuLi5zdGF0ZSxcbiAgLy8gICAgICAgW3BhZ2luYXRlQnldOiB7XG4gIC8vICAgICAgICAgLi4uc3RhdGVbcGFnaW5hdGVCeV0sXG4gIC8vICAgICAgICAgW2dyb3VwS2V5XToge1xuICAvLyAgICAgICAgICAgLi4uc3RhdGVbcGFnaW5hdGVCeV1bZ3JvdXBLZXldLFxuICAvLyAgICAgICAgICAgLi4uKCFpc1Vwc2VydCA/IHt9IDogeyBjb3VudDogc3RhdGVbcGFnaW5hdGVCeV1bZ3JvdXBLZXldLmNvdW50ICsgMSB9KSxcbiAgLy8gICAgICAgICAgIHJvd3M6IHt9LFxuICAvLyAgICAgICAgICAgbG9hZGluZzoge31cbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH07XG4gIC8vICAgfVxuICAvLyAgIHJldHVybiBzdGF0ZTtcbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIG9iamVjdCB3aGVyZSB0aGUga2V5IHJldHVybmVkIGJ5IHRoZSBjb25maWd1cmVkIGluZGV4QnlGblxuICAgKi9cbiAgcHJpdmF0ZSBpbmRleEtleU9iamVjdChhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7IGl0ZW1zOiBNb2RlbFtdOyB9PiwgY29uZmlnOiBSZWR1Y2VyQ29uZmlnKSB7XG4gICAgcmV0dXJuIGluZGV4QnkoKGkpID0+IChpKSwgYWN0aW9uLm1ldGEuaXRlbXNcbiAgICAgIC8vIGZpbHRlciBpdGVtcyB0aGF0IGFyZSBub3QgKHlldCkgaW5kZXhhYmxlLiBUaGlzIGlzIG5vcm1hbGx5IHRoZSBjYXNlLCB3aGVuIGNyZWF0aW5nIG5ldyBpdGVtcyB0aGF0IGhhdmUgbm8gcGsgeWV0LlxuICAgICAgLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25maWcuaW5kZXhCeS5pbmRleEJ5Rm4oaXRlbSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLm1hcChpdGVtID0+IGNvbmZpZy5pbmRleEJ5LmluZGV4QnlGbihpdGVtKSkpO1xuICB9XG5cbiAgZ3JvdXBCeShpdGVtczogYW55W10sIGdyb3VwQnlGbjogKGl0ZW0pID0+IHN0cmluZywgaW5kZXhCeUZuOiAoaXRlbSkgPT4gc3RyaW5nKSB7XG4gICAgY29uc3QgZ3JvdXBzID0ge31cbiAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgLy8gaWYgdGhlIGdyb3VwIGJ5IGtleSBpcyBub3QgcG9zc2libGUgdG8gY3JlYXRlLCB0aGUgaXRlbSB3b24ndCBiZSBhZGRlZCB0byB0aGUgaW5kZXhcbiAgICAgIGNvbnN0IGdyb3VwS2V5ID0gdGhpcy5nZXRHcm91cEtleU9mSXRlbShncm91cEJ5Rm4sIGl0ZW0pO1xuXG4gICAgICBpZiAoZ3JvdXBLZXkpIHtcbiAgICAgICAgY29uc3QgaW5kZXhLZXkgPSBpbmRleEJ5Rm4oaXRlbSk7XG4gICAgICAgIGdyb3Vwc1tncm91cEtleV0gPSB7IC4uLmdyb3Vwc1tncm91cEtleV0sIC4uLnsgW2luZGV4S2V5XTogaXRlbSB9IH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBncm91cHM7XG4gIH1cblxuXG5cblxuICBwcml2YXRlIGdldEdyb3VwS2V5T2ZJdGVtKGdyb3VwQnlGbjogKGl0ZW06IGFueSkgPT4gc3RyaW5nLCBpdGVtOiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCBncm91cEtleVxuICAgIHRyeSB7XG4gICAgICBncm91cEtleSA9IGdyb3VwQnlGbihpdGVtKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgfVxuICAgIHJldHVybiBncm91cEtleTtcbiAgfVxufVxuIl19