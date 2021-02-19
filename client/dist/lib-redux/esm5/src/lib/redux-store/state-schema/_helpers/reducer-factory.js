/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/reducer-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { composeReducers } from '@angular-redux/form';
import { U } from '@kleiolab/lib-utils';
import { equals, indexBy, keys, omit, values } from 'ramda';
import { combineReducers } from 'redux';
import { createPaginateByKey } from './createPaginateByKey';
/** @type {?} */
export var PR_ENTITY_MODEL_MAP = 'pkEntityModelMap';
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
export var by = (/**
 * @param {?} name
 * @return {?}
 */
function (name) { return 'by_' + name; });
// export const paginateName = (pagBy: PaginateByParam[]) => pagBy.map(p => Object.keys(p)[0]).join('__');
// export const pag = (name: string) => 'pag_' + name;
// export const paginatedBy = (name: string) => pag(by(name));
// export const paginateKey = (pagBy: PaginateByParam[]) => pagBy.map(p => values(p)[0]).join('_');
/** @type {?} */
export var paginateBy = 'by_subfield_page';
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
var /**
 * Creates standard reducers for the given model.
 *
 * Adds indexes according to config.
 *
 * S: Interface of the state (slice of store)
 * @template Payload, Model
 */
ReducerFactory = /** @class */ (function () {
    function ReducerFactory(actionPrefix, configs) {
        this.actionPrefix = actionPrefix;
        this.configs = configs;
        this.updatingBy = (/**
         * @param {?} name
         * @return {?}
         */
        function (name) { return 'updating_' + by(name); });
        this.deletingBy = (/**
         * @param {?} name
         * @return {?}
         */
        function (name) { return 'deleting_' + by(name); });
        this.removingBy = (/**
         * @param {?} name
         * @return {?}
         */
        function (name) { return 'removing_' + by(name); });
    }
    /**
     * @return {?}
     */
    ReducerFactory.prototype.createReducers = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var reducers = {};
        U.obj2KeyValueArr(this.configs).forEach((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            reducers[x.key] = _this.createModelReducers(x.key, x.value);
        }));
        /** @type {?} */
        var entityModelMapReducers = keys(this.configs).map((/**
         * @param {?} modelName
         * @return {?}
         */
        function (modelName) { return _this.createEntityModelMapReducers(modelName); }));
        reducers[PR_ENTITY_MODEL_MAP] = composeReducers.apply(void 0, tslib_1.__spread(entityModelMapReducers));
        return combineReducers(reducers);
    };
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @return {?}
     */
    ReducerFactory.prototype.createModelReducers = /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @return {?}
     */
    function (modelName, config) {
        var _this = this;
        /** @type {?} */
        var actionPrefix = this.actionPrefix;
        /** @type {?} */
        var reducer = (/**
         * @param {?=} state
         * @param {?=} action
         * @return {?}
         */
        function (state, action) {
            if (state === void 0) { state = {}; }
            /** @type {?} */
            var facette = _this.facette(modelName, config);
            if (action.type === actionPrefix + '.' + modelName + '::LOAD') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) { return (tslib_1.__assign({}, omit([by(config.indexBy.keyInStore)], innerState), { loading: true })); }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_SUCCEEDED') {
                // If action state differs from
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) { return (tslib_1.__assign({}, _this.mergeItemsInState(config, innerState, action), { loading: false })); }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::UPSERT') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a;
                    return (tslib_1.__assign({}, innerState, (_a = {}, _a[_this.updatingBy(config.indexBy.keyInStore)] = _this.indexKeyObject(action, config), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::UPSERT_SUCCEEDED') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a;
                    return (tslib_1.__assign({}, _this.mergeItemsInState(config, innerState, action
                    // , true
                    ), (_a = {}, _a[_this.updatingBy(config.indexBy.keyInStore)] = omit(values(_this.indexKeyObject(action, config)), innerState[_this.updatingBy(config.indexBy.keyInStore)]), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::DELETE') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a;
                    return (tslib_1.__assign({}, innerState, (_a = {}, _a[_this.deletingBy(config.indexBy.keyInStore)] = _this.indexKeyObject(action, config), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::DELETE_SUCCEEDED') {
                /** @type {?} */
                var deletingKey_1 = _this.deletingBy(config.indexBy.keyInStore);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a;
                    innerState = tslib_1.__assign({}, _this.deleteItemsFromState(config, action, innerState), (_a = {}, _a[deletingKey_1] = omit(values(_this.indexKeyObject(action, config)), innerState[_this.deletingBy(config.indexBy.keyInStore)]), _a));
                    if (!Object.keys(innerState[deletingKey_1]).length)
                        innerState = omit([deletingKey_1], innerState);
                    return innerState;
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::REMOVE') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a;
                    return (tslib_1.__assign({}, innerState, (_a = {}, _a[_this.removingBy(config.indexBy.keyInStore)] = _this.indexKeyObject(action, config), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::REMOVE_SUCCEEDED') {
                /** @type {?} */
                var removingKey_1 = _this.removingBy(config.indexBy.keyInStore);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a;
                    innerState = tslib_1.__assign({}, _this.deleteItemsFromState(config, action, innerState), (_a = {}, _a[removingKey_1] = omit(values(_this.indexKeyObject(action, config)), innerState[_this.removingBy(config.indexBy.keyInStore)]), _a));
                    if (!Object.keys(innerState[removingKey_1]).length)
                        innerState = omit([removingKey_1], innerState);
                    return innerState;
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::FAILED') {
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) { return (tslib_1.__assign({}, innerState, omit([by(config.indexBy.keyInStore)], innerState), { loading: false })); }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE') {
                /** @type {?} */
                var meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                var key_1 = createPaginateByKey(meta.page);
                /** @type {?} */
                var fromTo_1 = getFromTo(meta.page.limit, meta.page.offset);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a, _b, _c;
                    return (tslib_1.__assign({}, innerState, (_a = {}, _a[paginateBy] = tslib_1.__assign({}, innerState[paginateBy], (_b = {}, _b[key_1] = tslib_1.__assign({}, (innerState[paginateBy] || {})[key_1], { loading: tslib_1.__assign({}, ((innerState[paginateBy] || {})[key_1] || {}).loading, (_c = {}, _c[fromTo_1] = true, _c)) }), _b)), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE_FAILED') {
                /** @type {?} */
                var meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                var key_2 = createPaginateByKey(meta.page);
                /** @type {?} */
                var fromTo_2 = getFromTo(meta.page.limit, meta.page.offset);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a, _b, _c;
                    return (tslib_1.__assign({}, innerState, (_a = {}, _a[paginateBy] = tslib_1.__assign({}, innerState[paginateBy], (_b = {}, _b[key_2] = tslib_1.__assign({}, (innerState[paginateBy] || {})[key_2], { loading: tslib_1.__assign({}, ((innerState[paginateBy] || {})[key_2] || {}).loading, (_c = {}, _c[fromTo_2] = false, _c)) }), _b)), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE_SUCCEEDED') {
                /** @type {?} */
                var meta_1 = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                var key_3 = createPaginateByKey(meta_1.page);
                /** @type {?} */
                var fromTo_3 = getFromTo(meta_1.page.limit, meta_1.page.offset);
                /** @type {?} */
                var start_1 = getStart(meta_1.page.limit, meta_1.page.offset);
                /** @type {?} */
                var rows_1 = {};
                if (meta_1.pks) {
                    meta_1.pks.forEach((/**
                     * @param {?} pk
                     * @param {?} i
                     * @return {?}
                     */
                    function (pk, i) {
                        rows_1[start_1 + i] = pk;
                    }));
                }
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a, _b, _c;
                    return (tslib_1.__assign({}, innerState, (_a = {}, _a[paginateBy] = tslib_1.__assign({}, innerState[paginateBy], (_b = {}, _b[key_3] = tslib_1.__assign({}, (innerState[paginateBy] || {})[key_3], { count: meta_1.count || 0, rows: tslib_1.__assign({}, ((innerState[paginateBy] || {})[key_3] || {}).rows, rows_1), loading: tslib_1.__assign({}, ((innerState[paginateBy] || {})[key_3] || {}).loading, (_c = {}, _c[fromTo_3] = false, _c)) }), _b)), _a)));
                }));
            }
            return state;
        });
        return reducer;
    };
    /**
     * Creates an map for pk_entity -> modelName on the level of the schema:
     * example:
     */
    /**
     * Creates an map for pk_entity -> modelName on the level of the schema:
     * example:
     * @private
     * @param {?} modelName
     * @return {?}
     */
    ReducerFactory.prototype.createEntityModelMapReducers = /**
     * Creates an map for pk_entity -> modelName on the level of the schema:
     * example:
     * @private
     * @param {?} modelName
     * @return {?}
     */
    function (modelName) {
        /** @type {?} */
        var actionPrefix = this.actionPrefix;
        /** @type {?} */
        var reducer = (/**
         * @param {?=} state
         * @param {?=} action
         * @return {?}
         */
        function (state, action) {
            if (state === void 0) { state = {}; }
            /** @type {?} */
            var modelPath = actionPrefix + '.' + modelName;
            if (!action || !action.meta || !action.meta.items || !action.meta.items.length)
                return state;
            /** @type {?} */
            var items = action.meta.items;
            switch (action.type) {
                case modelPath + '::LOAD_SUCCEEDED':
                case modelPath + '::UPSERT_SUCCEEDED':
                    /** @type {?} */
                    var idx = {};
                    for (var i = 0; i < items.length; i++) {
                        /** @type {?} */
                        var item = (/** @type {?} */ (items[i]));
                        if (item.pk_entity) {
                            idx[item.pk_entity] = {
                                modelName: modelName,
                                fkClass: item.fkClass
                            };
                        }
                    }
                    state = tslib_1.__assign({}, state, idx);
                    break;
                case modelPath + '::DELETE_SUCCEEDED':
                case modelPath + '::REMOVE_SUCCEEDED':
                    /** @type {?} */
                    var pkEntities = [];
                    for (var i = 0; i < items.length; i++) {
                        /** @type {?} */
                        var item = (/** @type {?} */ (items[i]));
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
    };
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @return {?}
     */
    ReducerFactory.prototype.facette = /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @return {?}
     */
    function (modelName, config) {
        var _this = this;
        return (/**
         * @param {?} action
         * @param {?} state
         * @param {?} cb
         * @return {?}
         */
        function (action, state, cb) {
            var _a;
            /** @type {?} */
            var outerState;
            (_a = _this.deFacette(modelName, config, action, outerState, state), outerState = _a.outerState, state = _a.state);
            /** @type {?} */
            var innerState = cb(state);
            return _this.enFacette(modelName, config, action, innerState, outerState);
        });
    };
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @param {?} action
     * @param {?} outerState
     * @param {?} state
     * @return {?}
     */
    ReducerFactory.prototype.deFacette = /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @param {?} action
     * @param {?} outerState
     * @param {?} state
     * @return {?}
     */
    function (modelName, config, action, outerState, state) {
        if (this.isFacetteByPk(config, action)) {
            // outerState = clone(state);
            /** @type {?} */
            var pk = action.meta.pk || 'repo'
            // state = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
            ;
            // state = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
            /** @type {?} */
            var innerState = !state[config.facetteByPk] ? {} : state[config.facetteByPk][pk] || {};
            return {
                outerState: state,
                state: innerState
            };
        }
        return { outerState: outerState, state: state };
    };
    /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @param {?} action
     * @param {?} state
     * @param {?} outerState
     * @return {?}
     */
    ReducerFactory.prototype.enFacette = /**
     * @private
     * @param {?} modelName
     * @param {?} config
     * @param {?} action
     * @param {?} state
     * @param {?} outerState
     * @return {?}
     */
    function (modelName, config, action, state, outerState) {
        var _a, _b;
        if (this.isFacetteByPk(config, action)) {
            /** @type {?} */
            var pk = action.meta.pk || 'repo';
            state = tslib_1.__assign({}, outerState, (_a = {}, _a[config.facetteByPk] = tslib_1.__assign({}, outerState[config.facetteByPk], (_b = {}, _b[pk] = state, _b)), _a));
        }
        return state;
    };
    /**
     * @private
     * @param {?} config
     * @param {?} action
     * @return {?}
     */
    ReducerFactory.prototype.isFacetteByPk = /**
     * @private
     * @param {?} config
     * @param {?} action
     * @return {?}
     */
    function (config, action) {
        if (config.facetteByPk) {
            if (!action.meta || action.meta.pk === undefined)
                throw Error('Facette action must provide pk for facette');
            else
                return true;
        }
        else
            return false;
    };
    /**
     * @param {?} config
     * @param {?} action
     * @param {?} state
     * @return {?}
     */
    ReducerFactory.prototype.deleteItemsFromState = /**
     * @param {?} config
     * @param {?} action
     * @param {?} state
     * @return {?}
     */
    function (config, action, state) {
        var _this = this;
        /** @type {?} */
        var items = action.meta.items;
        // let state = {}
        /** @type {?} */
        var groupBys = !(config.groupBy && config.groupBy.length) ? [] : config.groupBy;
        /** @type {?} */
        var groups = groupBys.map((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return ({
            groupByKey: by(i.keyInStore),
            groupByFn: i.groupByFn,
        }); }));
        /** @type {?} */
        var mainIndexKey = by(config.indexBy.keyInStore);
        items.forEach((/**
         * @param {?} removedItem
         * @return {?}
         */
        function (removedItem) {
            var _a;
            // get path segments of new item
            /** @type {?} */
            var itemKey = config.indexBy.indexByFn(removedItem);
            // second segment e.g. '807060'
            // get old item, if exists
            /** @type {?} */
            var oldItem = state[mainIndexKey] ? state[mainIndexKey][itemKey] : undefined;
            // Q: Does the item exists?
            if (oldItem) {
                // A: Yes. use old item does exist
                // remove the removedItem at path in main index
                state = tslib_1.__assign({}, state, (_a = {}, _a[mainIndexKey] = tslib_1.__assign({}, omit([itemKey], state[mainIndexKey])), _a));
                // delete the removedItem at path in the group index
                groups.forEach((/**
                 * @param {?} g
                 * @return {?}
                 */
                function (g) {
                    var _a, _b;
                    /** @type {?} */
                    var groupKey = _this.getGroupKeyOfItem(g.groupByFn, removedItem);
                    state = tslib_1.__assign({}, state, (_a = {}, _a[g.groupByKey] = tslib_1.__assign({}, state[g.groupByKey], (_b = {}, _b[groupKey] = tslib_1.__assign({}, omit([itemKey], (state[g.groupByKey] || {})[groupKey])), _b)), _a));
                    // // cleanup paginations
                    // state = this.resetPaginationsByGroup(g.groupByKey, state, groupKey);
                }));
            }
        }));
        // cleanup main index
        if (Object.keys(state[mainIndexKey]).length < 1) {
            state = tslib_1.__assign({}, omit([mainIndexKey], state));
        }
        // cleanup group indices
        groups.forEach((/**
         * @param {?} g
         * @return {?}
         */
        function (g) {
            // cleanup groups in group index
            Object.keys(state[g.groupByKey]).forEach((/**
             * @param {?} groupKey
             * @return {?}
             */
            function (groupKey) {
                var _a;
                if (Object.keys(state[g.groupByKey][groupKey]).length < 1) {
                    state = tslib_1.__assign({}, state, (_a = {}, _a[g.groupByKey] = omit([groupKey], state[g.groupByKey]), _a));
                }
            }));
            // cleanup group index
            if (Object.keys(state[g.groupByKey]).length < 1) {
                state = tslib_1.__assign({}, omit([g.groupByKey], state));
            }
        }));
        return state;
    };
    /**
     * @param {?} config
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    ReducerFactory.prototype.mergeItemsInState = /**
     * @param {?} config
     * @param {?} state
     * @param {?} action
     * @return {?}
     */
    function (config, state, action
    // , resetPaginations = false
    ) {
        var _this = this;
        /** @type {?} */
        var items = action.meta.items;
        /** @type {?} */
        var groupBys = !(config.groupBy && config.groupBy.length) ? [] : config.groupBy;
        /** @type {?} */
        var groups = groupBys.map((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return ({
            groupByKey: by(i.keyInStore),
            groupByFn: i.groupByFn,
        }); }));
        /** @type {?} */
        var mainIndexKey = by(config.indexBy.keyInStore);
        items.forEach((/**
         * @param {?} newItem
         * @return {?}
         */
        function (newItem) {
            var _a, _b;
            // get path segments of new item
            /** @type {?} */
            var itemKey = config.indexBy.indexByFn(newItem);
            // second segment e.g. '807060'
            // get old item, if exists
            /** @type {?} */
            var oldItem = state[mainIndexKey] ? state[mainIndexKey][itemKey] : undefined;
            /** @type {?} */
            var itemToSet;
            // Q: Does the item exists, and is it deeply-equal to the new item?
            /** @type {?} */
            var equalsFn = config.equals || equals;
            if (oldItem && equalsFn(newItem, oldItem)) {
                // A: Yes. use old item as itemToSet
                itemToSet = oldItem;
            }
            else {
                // A: No. use new item as itemToSet
                itemToSet = newItem;
                // put the itemToSet at path in main index
                state = tslib_1.__assign({}, state, (_a = {}, _a[mainIndexKey] = tslib_1.__assign({}, state[mainIndexKey], (_b = {}, _b[itemKey] = itemToSet, _b)), _a));
                // iterate over the group indexes
                groups.forEach((/**
                 * @param {?} g
                 * @return {?}
                 */
                function (g) {
                    var _a, _b, _c, _d, _e;
                    // remove the oldItem from all group indexes
                    /** @type {?} */
                    var oldGroupKey = _this.getGroupKeyOfItem(g.groupByFn, oldItem);
                    state = tslib_1.__assign({}, state, (_a = {}, _a[g.groupByKey] = tslib_1.__assign({}, state[g.groupByKey], (_b = {}, _b[oldGroupKey] = tslib_1.__assign({}, omit([itemKey], (state[g.groupByKey] || {})[oldGroupKey])), _b)), _a));
                    // add the itemToSet to all group indexes, if not undefined
                    /** @type {?} */
                    var newGroupKey = _this.getGroupKeyOfItem(g.groupByFn, itemToSet);
                    if (newGroupKey !== undefined) {
                        state = tslib_1.__assign({}, state, (_c = {}, _c[g.groupByKey] = tslib_1.__assign({}, state[g.groupByKey], (_d = {}, _d[newGroupKey] = tslib_1.__assign({}, (state[g.groupByKey] || {})[newGroupKey], (_e = {}, _e[itemKey] = itemToSet, _e)), _d)), _c));
                    }
                }));
            }
        }));
        return state;
    };
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
    ReducerFactory.prototype.indexKeyObject = 
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
    function (action, config) {
        return indexBy((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return (i); }), action.meta.items
            // filter items that are not (yet) indexable. This is normally the case, when creating new items that have no pk yet.
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
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
        function (item) { return config.indexBy.indexByFn(item); })));
    };
    /**
     * @param {?} items
     * @param {?} groupByFn
     * @param {?} indexByFn
     * @return {?}
     */
    ReducerFactory.prototype.groupBy = /**
     * @param {?} items
     * @param {?} groupByFn
     * @param {?} indexByFn
     * @return {?}
     */
    function (items, groupByFn, indexByFn) {
        var _this = this;
        /** @type {?} */
        var groups = {};
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            var _a;
            // if the group by key is not possible to create, the item won't be added to the index
            /** @type {?} */
            var groupKey = _this.getGroupKeyOfItem(groupByFn, item);
            if (groupKey) {
                /** @type {?} */
                var indexKey = indexByFn(item);
                groups[groupKey] = tslib_1.__assign({}, groups[groupKey], (_a = {}, _a[indexKey] = item, _a));
            }
        }));
        return groups;
    };
    /**
     * @private
     * @param {?} groupByFn
     * @param {?} item
     * @return {?}
     */
    ReducerFactory.prototype.getGroupKeyOfItem = /**
     * @private
     * @param {?} groupByFn
     * @param {?} item
     * @return {?}
     */
    function (groupByFn, item) {
        /** @type {?} */
        var groupKey;
        try {
            groupKey = groupByFn(item);
        }
        catch (error) {
        }
        return groupKey;
    };
    return ReducerFactory;
}());
/**
 * Creates standard reducers for the given model.
 *
 * Adds indexes according to config.
 *
 * S: Interface of the state (slice of store)
 * @template Payload, Model
 */
export { ReducerFactory };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL19oZWxwZXJzL3JlZHVjZXItZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQVcsTUFBTSxPQUFPLENBQUM7QUFDakQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRzVELE1BQU0sS0FBTyxtQkFBbUIsR0FBRyxrQkFBa0I7Ozs7O0FBQ3JELHlDQUdDOzs7SUFGQyx3Q0FBcUI7O0lBQ3JCLHNDQUFlOzs7OztBQUdqQiw2Q0FFQzs7OztBQUVELG1DQVlDOzs7SUFWQyxvQ0FBcUI7O0lBQ3JCLGdDQUdFOztJQUNGLGdDQUdJOztJQUNKLCtCQUFrQzs7Ozs7O0FBR3BDLDBCQUE0RDs7O0lBQTdCLHFCQUFlOztJQUFDLGtCQUFXOzs7QUFHMUQsTUFBTSxLQUFPLEVBQUU7Ozs7QUFBRyxVQUFDLElBQVksSUFBSyxPQUFBLEtBQUssR0FBRyxJQUFJLEVBQVosQ0FBWSxDQUFBOzs7Ozs7QUFPaEQsTUFBTSxLQUFPLFVBQVUsR0FBRyxrQkFBa0I7Ozs7OztBQUU1QyxNQUFNLFVBQVUsU0FBUyxDQUFDLEtBQWEsRUFBRSxNQUFjO0lBQ3JELE9BQU8sUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztB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LENBQUMsT0FBTzs7OztRQUFDLFVBQUEsSUFBSTs7OztnQkFFVixRQUFRLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7WUFFeEQsSUFBSSxRQUFRLEVBQUU7O29CQUNOLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDLHdCQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBTyxHQUFDLFFBQVEsSUFBRyxJQUFJLE1BQUksQ0FBQTthQUNwRTtRQUNILENBQUMsRUFBQyxDQUFBO1FBQ0YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQUtPLDBDQUFpQjs7Ozs7O0lBQXpCLFVBQTBCLFNBQWdDLEVBQUUsSUFBUzs7WUFDL0QsUUFBUTtRQUNaLElBQUk7WUFDRixRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO1FBQUMsT0FBTyxLQUFLLEVBQUU7U0FFZjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUF6Z0JELElBeWdCQzs7Ozs7Ozs7Ozs7O0lBcFJDLG9DQUFzRDs7SUFDdEQsb0NBQXNEOztJQUN0RCxvQ0FBc0Q7O0lBclAxQyxzQ0FBMkI7O0lBQUUsaUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcG9zZVJlZHVjZXJzIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvZm9ybSc7XG5pbXBvcnQgeyBVIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBlcXVhbHMsIGluZGV4QnksIGtleXMsIG9taXQsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycywgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNyZWF0ZVBhZ2luYXRlQnlLZXkgfSBmcm9tICcuL2NyZWF0ZVBhZ2luYXRlQnlLZXknO1xuaW1wb3J0IHsgTG9hZFBhZ2VNZXRhLCBMb2FkUGFnZVN1Y2NlZWRlZE1ldGEgfSBmcm9tICcuL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG5leHBvcnQgY29uc3QgUFJfRU5USVRZX01PREVMX01BUCA9ICdwa0VudGl0eU1vZGVsTWFwJ1xuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlNb2RlbEFuZENsYXNzPE1vZGVsTmFtZT4ge1xuICBtb2RlbE5hbWU6IE1vZGVsTmFtZSxcbiAgZmtDbGFzczogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24ge1xuICBba2V5OiBzdHJpbmddOiBSZWR1Y2VyQ29uZmlnXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVkdWNlckNvbmZpZyB7XG4gIC8vIHdyYXBzIGV2ZXJ5dGhpbmcgaW4gZmFjZXR0ZSBuYW1lZCBieSBmYWNldHRlQnlQayBhbmQgZ3JvdXBlZCBieSBhY3Rpb24ubWV0YS5wa1xuICBmYWNldHRlQnlQaz86IHN0cmluZyxcbiAgaW5kZXhCeT86IHtcbiAgICBrZXlJblN0b3JlOiBzdHJpbmc7XG4gICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4gc3RyaW5nO1xuICB9LFxuICBncm91cEJ5Pzoge1xuICAgIGtleUluU3RvcmU6IHN0cmluZztcbiAgICBncm91cEJ5Rm46IChpdGVtKSA9PiBzdHJpbmc7XG4gIH1bXSxcbiAgZXF1YWxzPzogKGl0ZW1BLCBpdGVtQikgPT4gYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1ldGE8TW9kZWw+IHsgaXRlbXM6IE1vZGVsW10sIHBrPzogbnVtYmVyIH1cblxuXG5leHBvcnQgY29uc3QgYnkgPSAobmFtZTogc3RyaW5nKSA9PiAnYnlfJyArIG5hbWU7XG4vLyBleHBvcnQgY29uc3QgcGFnaW5hdGVOYW1lID0gKHBhZ0J5OiBQYWdpbmF0ZUJ5UGFyYW1bXSkgPT4gcGFnQnkubWFwKHAgPT4gT2JqZWN0LmtleXMocClbMF0pLmpvaW4oJ19fJyk7XG5cbi8vIGV4cG9ydCBjb25zdCBwYWcgPSAobmFtZTogc3RyaW5nKSA9PiAncGFnXycgKyBuYW1lO1xuLy8gZXhwb3J0IGNvbnN0IHBhZ2luYXRlZEJ5ID0gKG5hbWU6IHN0cmluZykgPT4gcGFnKGJ5KG5hbWUpKTtcblxuLy8gZXhwb3J0IGNvbnN0IHBhZ2luYXRlS2V5ID0gKHBhZ0J5OiBQYWdpbmF0ZUJ5UGFyYW1bXSkgPT4gcGFnQnkubWFwKHAgPT4gdmFsdWVzKHApWzBdKS5qb2luKCdfJyk7XG5leHBvcnQgY29uc3QgcGFnaW5hdGVCeSA9ICdieV9zdWJmaWVsZF9wYWdlJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnJvbVRvKGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gIHJldHVybiBnZXRTdGFydChsaW1pdCwgb2Zmc2V0KSArICdfJyArIGdldEVuZChsaW1pdCwgb2Zmc2V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZChsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xuICByZXR1cm4gZ2V0U3RhcnQobGltaXQsIG9mZnNldCkgKyBsaW1pdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0KGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gIHJldHVybiBvZmZzZXQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBzdGFuZGFyZCByZWR1Y2VycyBmb3IgdGhlIGdpdmVuIG1vZGVsLlxuICpcbiAqIEFkZHMgaW5kZXhlcyBhY2NvcmRpbmcgdG8gY29uZmlnLlxuICpcbiAqIFM6IEludGVyZmFjZSBvZiB0aGUgc3RhdGUgKHNsaWNlIG9mIHN0b3JlKVxuICovXG5leHBvcnQgY2xhc3MgUmVkdWNlckZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+IHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWN0aW9uUHJlZml4OiBzdHJpbmcsIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbikgeyB9XG5cbiAgcHVibGljIGNyZWF0ZVJlZHVjZXJzKCkge1xuXG4gICAgY29uc3QgcmVkdWNlcnMgPSB7fVxuICAgIFUub2JqMktleVZhbHVlQXJyKHRoaXMuY29uZmlncykuZm9yRWFjaCh4ID0+IHtcbiAgICAgIHJlZHVjZXJzW3gua2V5XSA9IHRoaXMuY3JlYXRlTW9kZWxSZWR1Y2Vycyh4LmtleSwgeC52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBlbnRpdHlNb2RlbE1hcFJlZHVjZXJzID0ga2V5cyh0aGlzLmNvbmZpZ3MpLm1hcChtb2RlbE5hbWUgPT4gdGhpcy5jcmVhdGVFbnRpdHlNb2RlbE1hcFJlZHVjZXJzKG1vZGVsTmFtZSkpXG4gICAgcmVkdWNlcnNbUFJfRU5USVRZX01PREVMX01BUF0gPSBjb21wb3NlUmVkdWNlcnMoLi4uZW50aXR5TW9kZWxNYXBSZWR1Y2VycylcblxuICAgIHJldHVybiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1vZGVsUmVkdWNlcnMobW9kZWxOYW1lLCBjb25maWc6IFJlZHVjZXJDb25maWcpIHtcbiAgICBjb25zdCBhY3Rpb25QcmVmaXggPSB0aGlzLmFjdGlvblByZWZpeDtcbiAgICBjb25zdCByZWR1Y2VyID0gKHN0YXRlID0ge30sIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1ldGE8TW9kZWw+PikgPT4ge1xuXG4gICAgICBjb25zdCBmYWNldHRlID0gdGhpcy5mYWNldHRlKG1vZGVsTmFtZSwgY29uZmlnKVxuXG4gICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkxPQUQnKSB7XG5cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC8vIFRPRE8gcmVmYWN0b3IgdGhpcyBmb3IgcGFydGlhbCBsb2RpbmdzXG4gICAgICAgICAgLi4ub21pdChbYnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldLCBpbm5lclN0YXRlKSxcbiAgICAgICAgICBsb2FkaW5nOiB0cnVlXG4gICAgICAgIH0pKTtcblxuICAgICAgfVxuXG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpMT0FEX1NVQ0NFRURFRCcpIHtcbiAgICAgICAgLy8gSWYgYWN0aW9uIHN0YXRlIGRpZmZlcnMgZnJvbVxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+IChcbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi50aGlzLm1lcmdlSXRlbXNJblN0YXRlKGNvbmZpZywgaW5uZXJTdGF0ZSwgYWN0aW9uKSxcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgICAgfSkpXG4gICAgICB9XG5cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OlVQU0VSVCcpIHtcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3RoaXMudXBkYXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV06IHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpXG4gICAgICAgIH0pKVxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6VVBTRVJUX1NVQ0NFRURFRCcpIHtcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLiB0aGlzLm1lcmdlSXRlbXNJblN0YXRlKGNvbmZpZywgaW5uZXJTdGF0ZSwgYWN0aW9uXG4gICAgICAgICAgICAvLyAsIHRydWVcbiAgICAgICAgICApLFxuICAgICAgICAgIFt0aGlzLnVwZGF0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldOlxuICAgICAgICAgICAgb21pdCh2YWx1ZXModGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZykpLCBpbm5lclN0YXRlW3RoaXMudXBkYXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV0pXG4gICAgICAgIH0pKVxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6REVMRVRFJykge1xuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbdGhpcy5kZWxldGluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXTogdGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZylcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6REVMRVRFX1NVQ0NFRURFRCcpIHtcblxuICAgICAgICBjb25zdCBkZWxldGluZ0tleSA9IHRoaXMuZGVsZXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKVxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+IHtcbiAgICAgICAgICBpbm5lclN0YXRlID0ge1xuICAgICAgICAgICAgLi4udGhpcy5kZWxldGVJdGVtc0Zyb21TdGF0ZShjb25maWcsIGFjdGlvbiwgaW5uZXJTdGF0ZSksXG4gICAgICAgICAgICBbZGVsZXRpbmdLZXldOiBvbWl0KHZhbHVlcyh0aGlzLmluZGV4S2V5T2JqZWN0KGFjdGlvbiwgY29uZmlnKSksIGlubmVyU3RhdGVbdGhpcy5kZWxldGluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhpbm5lclN0YXRlW2RlbGV0aW5nS2V5XSkubGVuZ3RoKSBpbm5lclN0YXRlID0gb21pdChbZGVsZXRpbmdLZXldLCBpbm5lclN0YXRlKTtcbiAgICAgICAgICByZXR1cm4gaW5uZXJTdGF0ZTtcbiAgICAgICAgfSlcblxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6UkVNT1ZFJykge1xuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbdGhpcy5yZW1vdmluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXTogdGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZylcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6UkVNT1ZFX1NVQ0NFRURFRCcpIHtcblxuICAgICAgICBjb25zdCByZW1vdmluZ0tleSA9IHRoaXMucmVtb3ZpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKVxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+IHtcbiAgICAgICAgICBpbm5lclN0YXRlID0ge1xuICAgICAgICAgICAgLi4udGhpcy5kZWxldGVJdGVtc0Zyb21TdGF0ZShjb25maWcsIGFjdGlvbiwgaW5uZXJTdGF0ZSksXG4gICAgICAgICAgICBbcmVtb3ZpbmdLZXldOiBvbWl0KHZhbHVlcyh0aGlzLmluZGV4S2V5T2JqZWN0KGFjdGlvbiwgY29uZmlnKSksIGlubmVyU3RhdGVbdGhpcy5yZW1vdmluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhpbm5lclN0YXRlW3JlbW92aW5nS2V5XSkubGVuZ3RoKSBpbm5lclN0YXRlID0gb21pdChbcmVtb3ZpbmdLZXldLCBpbm5lclN0YXRlKTtcbiAgICAgICAgICByZXR1cm4gaW5uZXJTdGF0ZTtcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkZBSUxFRCcpIHtcblxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICAuLi5vbWl0KFtieShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV0sIGlubmVyU3RhdGUpLFxuICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgIH0pKTtcblxuICAgICAgfVxuXG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpMT0FEX1BBR0UnKSB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YSBhcyBhbnkgYXMgTG9hZFBhZ2VNZXRhO1xuICAgICAgICBjb25zdCBrZXkgPSBjcmVhdGVQYWdpbmF0ZUJ5S2V5KG1ldGEucGFnZSlcbiAgICAgICAgY29uc3QgZnJvbVRvID0gZ2V0RnJvbVRvKG1ldGEucGFnZS5saW1pdCwgbWV0YS5wYWdlLm9mZnNldCk7XG5cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3BhZ2luYXRlQnldOiB7XG4gICAgICAgICAgICAuLi5pbm5lclN0YXRlW3BhZ2luYXRlQnldLFxuICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgLi4uKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IHtcbiAgICAgICAgICAgICAgICAuLi4oKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0gfHwge30pLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgW2Zyb21Ub106IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkxPQURfUEFHRV9GQUlMRUQnKSB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YSBhcyBhbnkgYXMgTG9hZFBhZ2VNZXRhO1xuXG4gICAgICAgIGNvbnN0IGtleSA9IGNyZWF0ZVBhZ2luYXRlQnlLZXkobWV0YS5wYWdlKVxuICAgICAgICBjb25zdCBmcm9tVG8gPSBnZXRGcm9tVG8obWV0YS5wYWdlLmxpbWl0LCBtZXRhLnBhZ2Uub2Zmc2V0KTtcblxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbcGFnaW5hdGVCeV06IHtcbiAgICAgICAgICAgIC4uLmlubmVyU3RhdGVbcGFnaW5hdGVCeV0sXG4gICAgICAgICAgICBba2V5XToge1xuICAgICAgICAgICAgICAuLi4oaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSxcbiAgICAgICAgICAgICAgbG9hZGluZzoge1xuICAgICAgICAgICAgICAgIC4uLigoaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSB8fCB7fSkubG9hZGluZyxcbiAgICAgICAgICAgICAgICBbZnJvbVRvXTogZmFsc2VcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6TE9BRF9QQUdFX1NVQ0NFRURFRCcpIHtcbiAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhIGFzIGFueSBhcyBMb2FkUGFnZVN1Y2NlZWRlZE1ldGE7XG4gICAgICAgIGNvbnN0IGtleSA9IGNyZWF0ZVBhZ2luYXRlQnlLZXkobWV0YS5wYWdlKVxuICAgICAgICBjb25zdCBmcm9tVG8gPSBnZXRGcm9tVG8obWV0YS5wYWdlLmxpbWl0LCBtZXRhLnBhZ2Uub2Zmc2V0KTtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBnZXRTdGFydChtZXRhLnBhZ2UubGltaXQsIG1ldGEucGFnZS5vZmZzZXQpO1xuXG4gICAgICAgIGNvbnN0IHJvd3MgPSB7fVxuICAgICAgICBpZiAobWV0YS5wa3MpIHtcbiAgICAgICAgICBtZXRhLnBrcy5mb3JFYWNoKChwaywgaSkgPT4ge1xuICAgICAgICAgICAgcm93c1tzdGFydCArIGldID0gcGs7XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbcGFnaW5hdGVCeV06IHtcbiAgICAgICAgICAgIC4uLmlubmVyU3RhdGVbcGFnaW5hdGVCeV0sXG4gICAgICAgICAgICBba2V5XToge1xuICAgICAgICAgICAgICAuLi4oaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSxcbiAgICAgICAgICAgICAgY291bnQ6IG1ldGEuY291bnQgfHwgMCxcbiAgICAgICAgICAgICAgcm93czoge1xuICAgICAgICAgICAgICAgIC4uLigoaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSB8fCB7fSkucm93cyxcbiAgICAgICAgICAgICAgICAuLi5yb3dzXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IHtcbiAgICAgICAgICAgICAgICAuLi4oKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0gfHwge30pLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgW2Zyb21Ub106IGZhbHNlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHJlZHVjZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBtYXAgZm9yIHBrX2VudGl0eSAtPiBtb2RlbE5hbWUgb24gdGhlIGxldmVsIG9mIHRoZSBzY2hlbWE6XG4gICAqIGV4YW1wbGU6XG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUVudGl0eU1vZGVsTWFwUmVkdWNlcnMobW9kZWxOYW1lKTogUmVkdWNlcjx1bmtub3duLCBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWV0YTxNb2RlbD4+PiB7XG4gICAgY29uc3QgYWN0aW9uUHJlZml4ID0gdGhpcy5hY3Rpb25QcmVmaXg7XG4gICAgY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IHt9LCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNZXRhPE1vZGVsPj4pID0+IHtcbiAgICAgIGNvbnN0IG1vZGVsUGF0aCA9IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZTtcblxuICAgICAgaWYgKCFhY3Rpb24gfHwgIWFjdGlvbi5tZXRhIHx8ICFhY3Rpb24ubWV0YS5pdGVtcyB8fCAhYWN0aW9uLm1ldGEuaXRlbXMubGVuZ3RoKSByZXR1cm4gc3RhdGU7XG4gICAgICBjb25zdCBpdGVtcyA9IGFjdGlvbi5tZXRhLml0ZW1zO1xuXG4gICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgbW9kZWxQYXRoICsgJzo6TE9BRF9TVUNDRUVERUQnOlxuICAgICAgICBjYXNlIG1vZGVsUGF0aCArICc6OlVQU0VSVF9TVUNDRUVERUQnOlxuICAgICAgICAgIGNvbnN0IGlkeCA9IHt9XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldIGFzIGFueTtcbiAgICAgICAgICAgIGlmIChpdGVtLnBrX2VudGl0eSkge1xuICAgICAgICAgICAgICBpZHhbaXRlbS5wa19lbnRpdHldID0ge1xuICAgICAgICAgICAgICAgIG1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICBma0NsYXNzOiBpdGVtLmZrQ2xhc3NcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgLi4uaWR4XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgbW9kZWxQYXRoICsgJzo6REVMRVRFX1NVQ0NFRURFRCc6XG4gICAgICAgIGNhc2UgbW9kZWxQYXRoICsgJzo6UkVNT1ZFX1NVQ0NFRURFRCc6XG4gICAgICAgICAgY29uc3QgcGtFbnRpdGllcyA9IFtdXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldIGFzIGFueTtcbiAgICAgICAgICAgIGlmIChpdGVtLnBrX2VudGl0eSkge1xuICAgICAgICAgICAgICBwa0VudGl0aWVzLnB1c2goaXRlbS5wa19lbnRpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzdGF0ZSA9IG9taXQocGtFbnRpdGllcywgc3RhdGUpXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9O1xuICAgIHJldHVybiByZWR1Y2VyO1xuICB9XG5cblxuICB1cGRhdGluZ0J5ID0gKG5hbWU6IHN0cmluZykgPT4gJ3VwZGF0aW5nXycgKyBieShuYW1lKTtcbiAgZGVsZXRpbmdCeSA9IChuYW1lOiBzdHJpbmcpID0+ICdkZWxldGluZ18nICsgYnkobmFtZSk7XG4gIHJlbW92aW5nQnkgPSAobmFtZTogc3RyaW5nKSA9PiAncmVtb3ZpbmdfJyArIGJ5KG5hbWUpO1xuXG5cblxuICBwcml2YXRlIGZhY2V0dGUobW9kZWxOYW1lOiBhbnksIGNvbmZpZzogUmVkdWNlckNvbmZpZykge1xuICAgIHJldHVybiAoYWN0aW9uLCBzdGF0ZSwgY2I6IChpbm5lclN0YXRlKSA9PiBhbnkpID0+IHtcbiAgICAgIGxldCBvdXRlclN0YXRlO1xuICAgICAgKHsgb3V0ZXJTdGF0ZSwgc3RhdGUgfSA9IHRoaXMuZGVGYWNldHRlKG1vZGVsTmFtZSwgY29uZmlnLCBhY3Rpb24sIG91dGVyU3RhdGUsIHN0YXRlKSk7XG4gICAgICBjb25zdCBpbm5lclN0YXRlID0gY2Ioc3RhdGUpO1xuICAgICAgcmV0dXJuIHRoaXMuZW5GYWNldHRlKG1vZGVsTmFtZSwgY29uZmlnLCBhY3Rpb24sIGlubmVyU3RhdGUsIG91dGVyU3RhdGUpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGRlRmFjZXR0ZShtb2RlbE5hbWU6IHN0cmluZywgY29uZmlnOiBSZWR1Y2VyQ29uZmlnLCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7IGl0ZW1zOiBNb2RlbFtdOyBwaz86IG51bWJlcjsgfT4sIG91dGVyU3RhdGU6IGFueSwgc3RhdGU6IHt9KSB7XG4gICAgaWYgKHRoaXMuaXNGYWNldHRlQnlQayhjb25maWcsIGFjdGlvbikpIHtcbiAgICAgIC8vIG91dGVyU3RhdGUgPSBjbG9uZShzdGF0ZSk7XG4gICAgICBjb25zdCBwayA9IGFjdGlvbi5tZXRhLnBrIHx8ICdyZXBvJ1xuICAgICAgLy8gc3RhdGUgPSAhc3RhdGVbY29uZmlnLmZhY2V0dGVCeVBrXSA/IHt9IDogc3RhdGVbY29uZmlnLmZhY2V0dGVCeVBrXVtwa10gfHwge307XG4gICAgICBjb25zdCBpbm5lclN0YXRlID0gIXN0YXRlW2NvbmZpZy5mYWNldHRlQnlQa10gPyB7fSA6IHN0YXRlW2NvbmZpZy5mYWNldHRlQnlQa11bcGtdIHx8IHt9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb3V0ZXJTdGF0ZTogc3RhdGUsXG4gICAgICAgIHN0YXRlOiBpbm5lclN0YXRlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IG91dGVyU3RhdGUsIHN0YXRlIH07XG4gIH1cblxuICBwcml2YXRlIGVuRmFjZXR0ZShtb2RlbE5hbWU6IHN0cmluZywgY29uZmlnOiBSZWR1Y2VyQ29uZmlnLCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7IGl0ZW1zOiBNb2RlbFtdOyBwaz86IG51bWJlcjsgfT4sIHN0YXRlOiB7fSwgb3V0ZXJTdGF0ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuaXNGYWNldHRlQnlQayhjb25maWcsIGFjdGlvbikpIHtcbiAgICAgIGNvbnN0IHBrID0gYWN0aW9uLm1ldGEucGsgfHwgJ3JlcG8nXG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4ub3V0ZXJTdGF0ZSxcbiAgICAgICAgW2NvbmZpZy5mYWNldHRlQnlQa106IHtcbiAgICAgICAgICAuLi5vdXRlclN0YXRlW2NvbmZpZy5mYWNldHRlQnlQa10sXG4gICAgICAgICAgW3BrXTogc3RhdGVcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cblxuICBwcml2YXRlIGlzRmFjZXR0ZUJ5UGsoY29uZmlnOiBSZWR1Y2VyQ29uZmlnLCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7IGl0ZW1zOiBNb2RlbFtdOyBwaz86IG51bWJlcjsgfT4pIHtcbiAgICBpZiAoY29uZmlnLmZhY2V0dGVCeVBrKSB7XG4gICAgICBpZiAoIWFjdGlvbi5tZXRhIHx8IGFjdGlvbi5tZXRhLnBrID09PSB1bmRlZmluZWQpIHRocm93IEVycm9yKCdGYWNldHRlIGFjdGlvbsKgbXVzdCBwcm92aWRlIHBrIGZvciBmYWNldHRlJyk7XG4gICAgICBlbHNlIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG5cblxuICBkZWxldGVJdGVtc0Zyb21TdGF0ZShjb25maWc6IFJlZHVjZXJDb25maWcsIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHsgaXRlbXM6IE1vZGVsW107IH0+LCBzdGF0ZSkge1xuICAgIGNvbnN0IGl0ZW1zID0gYWN0aW9uLm1ldGEuaXRlbXM7XG4gICAgLy8gbGV0IHN0YXRlID0ge31cbiAgICBjb25zdCBncm91cEJ5cyA9ICEoY29uZmlnLmdyb3VwQnkgJiYgY29uZmlnLmdyb3VwQnkubGVuZ3RoKSA/IFtdIDogY29uZmlnLmdyb3VwQnk7XG4gICAgY29uc3QgZ3JvdXBzID0gZ3JvdXBCeXMubWFwKGkgPT4gKHtcbiAgICAgIGdyb3VwQnlLZXk6IGJ5KGkua2V5SW5TdG9yZSksXG4gICAgICBncm91cEJ5Rm46IGkuZ3JvdXBCeUZuLFxuICAgIH0pKVxuICAgIGNvbnN0IG1haW5JbmRleEtleSA9IGJ5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpOyAvLyBmaXJzdCBzZWdtZW50IGUuZy4gJ2J5X3BrX2VudGl0eSdcblxuICAgIGl0ZW1zLmZvckVhY2goKHJlbW92ZWRJdGVtKSA9PiB7XG4gICAgICAvLyBnZXQgcGF0aCBzZWdtZW50cyBvZiBuZXcgaXRlbVxuICAgICAgY29uc3QgaXRlbUtleSA9IGNvbmZpZy5pbmRleEJ5LmluZGV4QnlGbihyZW1vdmVkSXRlbSk7IC8vIHNlY29uZCBzZWdtZW50IGUuZy4gJzgwNzA2MCdcblxuICAgICAgLy8gZ2V0IG9sZCBpdGVtLCBpZiBleGlzdHNcbiAgICAgIGNvbnN0IG9sZEl0ZW0gPSBzdGF0ZVttYWluSW5kZXhLZXldID8gc3RhdGVbbWFpbkluZGV4S2V5XVtpdGVtS2V5XSA6IHVuZGVmaW5lZDtcblxuICAgICAgLy8gUTogRG9lcyB0aGUgaXRlbSBleGlzdHM/XG4gICAgICBpZiAob2xkSXRlbSkge1xuICAgICAgICAvLyBBOiBZZXMuIHVzZSBvbGQgaXRlbSBkb2VzIGV4aXN0XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoZSByZW1vdmVkSXRlbSBhdCBwYXRoIGluIG1haW4gaW5kZXhcbiAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgW21haW5JbmRleEtleV06IHtcbiAgICAgICAgICAgIC4uLm9taXQoW2l0ZW1LZXldLCBzdGF0ZVttYWluSW5kZXhLZXldKSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZWxldGUgdGhlIHJlbW92ZWRJdGVtIGF0IHBhdGggaW4gdGhlIGdyb3VwIGluZGV4XG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKGcgPT4ge1xuICAgICAgICAgIGNvbnN0IGdyb3VwS2V5ID0gdGhpcy5nZXRHcm91cEtleU9mSXRlbShnLmdyb3VwQnlGbiwgcmVtb3ZlZEl0ZW0pXG4gICAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIFtnLmdyb3VwQnlLZXldOiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlW2cuZ3JvdXBCeUtleV0sXG4gICAgICAgICAgICAgIFtncm91cEtleV06IHtcbiAgICAgICAgICAgICAgICAuLi5vbWl0KFtpdGVtS2V5XSwgKHN0YXRlW2cuZ3JvdXBCeUtleV0gfHwge30pW2dyb3VwS2V5XSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyAvLyBjbGVhbnVwIHBhZ2luYXRpb25zXG4gICAgICAgICAgLy8gc3RhdGUgPSB0aGlzLnJlc2V0UGFnaW5hdGlvbnNCeUdyb3VwKGcuZ3JvdXBCeUtleSwgc3RhdGUsIGdyb3VwS2V5KTtcblxuICAgICAgICB9KVxuICAgICAgfVxuXG5cbiAgICB9KVxuXG4gICAgLy8gY2xlYW51cCBtYWluIGluZGV4XG4gICAgaWYgKE9iamVjdC5rZXlzKHN0YXRlW21haW5JbmRleEtleV0pLmxlbmd0aCA8IDEpIHtcbiAgICAgIHN0YXRlID0geyAuLi5vbWl0KFttYWluSW5kZXhLZXldLCBzdGF0ZSkgfVxuICAgIH1cbiAgICAvLyBjbGVhbnVwIGdyb3VwIGluZGljZXNcbiAgICBncm91cHMuZm9yRWFjaChnID0+IHtcblxuICAgICAgLy8gY2xlYW51cCBncm91cHMgaW4gZ3JvdXAgaW5kZXhcbiAgICAgIE9iamVjdC5rZXlzKHN0YXRlW2cuZ3JvdXBCeUtleV0pLmZvckVhY2goZ3JvdXBLZXkgPT4ge1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhzdGF0ZVtnLmdyb3VwQnlLZXldW2dyb3VwS2V5XSkubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBbZy5ncm91cEJ5S2V5XTogb21pdChbZ3JvdXBLZXldLCBzdGF0ZVtnLmdyb3VwQnlLZXldKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gY2xlYW51cCBncm91cCBpbmRleFxuICAgICAgaWYgKE9iamVjdC5rZXlzKHN0YXRlW2cuZ3JvdXBCeUtleV0pLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgc3RhdGUgPSB7IC4uLm9taXQoW2cuZ3JvdXBCeUtleV0sIHN0YXRlKSB9XG4gICAgICB9XG4gICAgfSlcblxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgbWVyZ2VJdGVtc0luU3RhdGUoY29uZmlnOiBSZWR1Y2VyQ29uZmlnLCBzdGF0ZSwgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgfT5cbiAgICAvLyAsIHJlc2V0UGFnaW5hdGlvbnMgPSBmYWxzZVxuICApIHtcbiAgICBjb25zdCBpdGVtcyA9IGFjdGlvbi5tZXRhLml0ZW1zO1xuICAgIGNvbnN0IGdyb3VwQnlzID0gIShjb25maWcuZ3JvdXBCeSAmJiBjb25maWcuZ3JvdXBCeS5sZW5ndGgpID8gW10gOiBjb25maWcuZ3JvdXBCeTtcbiAgICBjb25zdCBncm91cHMgPSBncm91cEJ5cy5tYXAoaSA9PiAoe1xuICAgICAgZ3JvdXBCeUtleTogYnkoaS5rZXlJblN0b3JlKSxcbiAgICAgIGdyb3VwQnlGbjogaS5ncm91cEJ5Rm4sXG4gICAgfSkpXG5cbiAgICBjb25zdCBtYWluSW5kZXhLZXkgPSBieShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKTsgLy8gZmlyc3Qgc2VnbWVudCBlLmcuICdieV9wa19lbnRpdHknXG5cbiAgICBpdGVtcy5mb3JFYWNoKChuZXdJdGVtKSA9PiB7XG4gICAgICAvLyBnZXQgcGF0aCBzZWdtZW50cyBvZiBuZXcgaXRlbVxuICAgICAgY29uc3QgaXRlbUtleSA9IGNvbmZpZy5pbmRleEJ5LmluZGV4QnlGbihuZXdJdGVtKTsgLy8gc2Vjb25kIHNlZ21lbnQgZS5nLiAnODA3MDYwJ1xuXG4gICAgICAvLyBnZXQgb2xkIGl0ZW0sIGlmIGV4aXN0c1xuICAgICAgY29uc3Qgb2xkSXRlbSA9IHN0YXRlW21haW5JbmRleEtleV0gPyBzdGF0ZVttYWluSW5kZXhLZXldW2l0ZW1LZXldIDogdW5kZWZpbmVkO1xuXG4gICAgICBsZXQgaXRlbVRvU2V0O1xuXG4gICAgICAvLyBROiBEb2VzIHRoZSBpdGVtIGV4aXN0cywgYW5kIGlzIGl0IGRlZXBseS1lcXVhbCB0byB0aGUgbmV3IGl0ZW0/XG4gICAgICBjb25zdCBlcXVhbHNGbiA9IGNvbmZpZy5lcXVhbHMgfHwgZXF1YWxzXG4gICAgICBpZiAob2xkSXRlbSAmJiBlcXVhbHNGbihuZXdJdGVtLCBvbGRJdGVtKSkge1xuICAgICAgICAvLyBBOiBZZXMuIHVzZSBvbGQgaXRlbSBhcyBpdGVtVG9TZXRcbiAgICAgICAgaXRlbVRvU2V0ID0gb2xkSXRlbTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBBOiBOby4gdXNlIG5ldyBpdGVtIGFzIGl0ZW1Ub1NldFxuICAgICAgICBpdGVtVG9TZXQgPSBuZXdJdGVtO1xuXG4gICAgICAgIC8vIHB1dCB0aGUgaXRlbVRvU2V0IGF0IHBhdGggaW4gbWFpbiBpbmRleFxuICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBbbWFpbkluZGV4S2V5XToge1xuICAgICAgICAgICAgLi4uc3RhdGVbbWFpbkluZGV4S2V5XSxcbiAgICAgICAgICAgIFtpdGVtS2V5XTogaXRlbVRvU2V0XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIHRoZSBncm91cCBpbmRleGVzXG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKGcgPT4ge1xuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgb2xkSXRlbSBmcm9tIGFsbCBncm91cCBpbmRleGVzXG4gICAgICAgICAgY29uc3Qgb2xkR3JvdXBLZXkgPSB0aGlzLmdldEdyb3VwS2V5T2ZJdGVtKGcuZ3JvdXBCeUZuLCBvbGRJdGVtKVxuICAgICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBbZy5ncm91cEJ5S2V5XToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZVtnLmdyb3VwQnlLZXldLFxuICAgICAgICAgICAgICBbb2xkR3JvdXBLZXldOiB7XG4gICAgICAgICAgICAgICAgLi4ub21pdChbaXRlbUtleV0sIChzdGF0ZVtnLmdyb3VwQnlLZXldIHx8IHt9KVtvbGRHcm91cEtleV0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBhZGQgdGhlIGl0ZW1Ub1NldCB0byBhbGwgZ3JvdXAgaW5kZXhlcywgaWYgbm90IHVuZGVmaW5lZFxuICAgICAgICAgIGNvbnN0IG5ld0dyb3VwS2V5ID0gdGhpcy5nZXRHcm91cEtleU9mSXRlbShnLmdyb3VwQnlGbiwgaXRlbVRvU2V0KVxuICAgICAgICAgIGlmIChuZXdHcm91cEtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgIFtnLmdyb3VwQnlLZXldOiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGVbZy5ncm91cEJ5S2V5XSxcbiAgICAgICAgICAgICAgICBbbmV3R3JvdXBLZXldOiB7XG4gICAgICAgICAgICAgICAgICAuLi4oc3RhdGVbZy5ncm91cEJ5S2V5XSB8fCB7fSlbbmV3R3JvdXBLZXldLFxuICAgICAgICAgICAgICAgICAgW2l0ZW1LZXldOiBpdGVtVG9TZXRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuXG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuXG4gIC8vIC8qKlxuICAvLyAgKiByZXNldHMgcGFnaW5hdGlvbiB3aXRoaW4gYSBncm91cCwgZS5nLiAncGFnX2J5X2ZrX3Byb3BlcnR5J1xuICAvLyAgKiBUT0RPOiBjaGVjayBpZiBjYW4gYmUgZGVsZXRlZFxuICAvLyAgKi9cbiAgLy8gcHJpdmF0ZSByZXNldFBhZ2luYXRpb25zQnlHcm91cChncm91cEJ5S2V5OiBzdHJpbmcsIHN0YXRlOiBhbnksIGdyb3VwS2V5OiBhbnksIGlzVXBzZXJ0ID0gZmFsc2UpIHtcbiAgLy8gICBjb25zdCBwYWdpbmF0ZUJ5ID0gcGFnKGdyb3VwQnlLZXkpO1xuICAvLyAgIGlmIChzdGF0ZVtwYWdpbmF0ZUJ5XSAmJiBzdGF0ZVtwYWdpbmF0ZUJ5XVtncm91cEtleV0gJiYgc3RhdGVbcGFnaW5hdGVCeV1bZ3JvdXBLZXldLmNvdW50ICE9PSB1bmRlZmluZWQpIHtcbiAgLy8gICAgIHN0YXRlID0ge1xuICAvLyAgICAgICAuLi5zdGF0ZSxcbiAgLy8gICAgICAgW3BhZ2luYXRlQnldOiB7XG4gIC8vICAgICAgICAgLi4uc3RhdGVbcGFnaW5hdGVCeV0sXG4gIC8vICAgICAgICAgW2dyb3VwS2V5XToge1xuICAvLyAgICAgICAgICAgLi4uc3RhdGVbcGFnaW5hdGVCeV1bZ3JvdXBLZXldLFxuICAvLyAgICAgICAgICAgLi4uKCFpc1Vwc2VydCA/IHt9IDogeyBjb3VudDogc3RhdGVbcGFnaW5hdGVCeV1bZ3JvdXBLZXldLmNvdW50ICsgMSB9KSxcbiAgLy8gICAgICAgICAgIHJvd3M6IHt9LFxuICAvLyAgICAgICAgICAgbG9hZGluZzoge31cbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH07XG4gIC8vICAgfVxuICAvLyAgIHJldHVybiBzdGF0ZTtcbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIG9iamVjdCB3aGVyZSB0aGUga2V5IHJldHVybmVkIGJ5IHRoZSBjb25maWd1cmVkIGluZGV4QnlGblxuICAgKi9cbiAgcHJpdmF0ZSBpbmRleEtleU9iamVjdChhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7IGl0ZW1zOiBNb2RlbFtdOyB9PiwgY29uZmlnOiBSZWR1Y2VyQ29uZmlnKSB7XG4gICAgcmV0dXJuIGluZGV4QnkoKGkpID0+IChpKSwgYWN0aW9uLm1ldGEuaXRlbXNcbiAgICAgIC8vIGZpbHRlciBpdGVtcyB0aGF0IGFyZSBub3QgKHlldCkgaW5kZXhhYmxlLiBUaGlzIGlzIG5vcm1hbGx5IHRoZSBjYXNlLCB3aGVuIGNyZWF0aW5nIG5ldyBpdGVtcyB0aGF0IGhhdmUgbm8gcGsgeWV0LlxuICAgICAgLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25maWcuaW5kZXhCeS5pbmRleEJ5Rm4oaXRlbSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLm1hcChpdGVtID0+IGNvbmZpZy5pbmRleEJ5LmluZGV4QnlGbihpdGVtKSkpO1xuICB9XG5cbiAgZ3JvdXBCeShpdGVtczogYW55W10sIGdyb3VwQnlGbjogKGl0ZW0pID0+IHN0cmluZywgaW5kZXhCeUZuOiAoaXRlbSkgPT4gc3RyaW5nKSB7XG4gICAgY29uc3QgZ3JvdXBzID0ge31cbiAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgLy8gaWYgdGhlIGdyb3VwIGJ5IGtleSBpcyBub3QgcG9zc2libGUgdG8gY3JlYXRlLCB0aGUgaXRlbSB3b24ndCBiZSBhZGRlZCB0byB0aGUgaW5kZXhcbiAgICAgIGNvbnN0IGdyb3VwS2V5ID0gdGhpcy5nZXRHcm91cEtleU9mSXRlbShncm91cEJ5Rm4sIGl0ZW0pO1xuXG4gICAgICBpZiAoZ3JvdXBLZXkpIHtcbiAgICAgICAgY29uc3QgaW5kZXhLZXkgPSBpbmRleEJ5Rm4oaXRlbSk7XG4gICAgICAgIGdyb3Vwc1tncm91cEtleV0gPSB7IC4uLmdyb3Vwc1tncm91cEtleV0sIC4uLnsgW2luZGV4S2V5XTogaXRlbSB9IH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBncm91cHM7XG4gIH1cblxuXG5cblxuICBwcml2YXRlIGdldEdyb3VwS2V5T2ZJdGVtKGdyb3VwQnlGbjogKGl0ZW06IGFueSkgPT4gc3RyaW5nLCBpdGVtOiBhbnkpOiBzdHJpbmcge1xuICAgIGxldCBncm91cEtleVxuICAgIHRyeSB7XG4gICAgICBncm91cEtleSA9IGdyb3VwQnlGbihpdGVtKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgfVxuICAgIHJldHVybiBncm91cEtleTtcbiAgfVxufVxuIl19