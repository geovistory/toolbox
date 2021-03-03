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
import { subfieldIdToString } from './subfieldIdToString';
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
                var key_1 = subfieldIdToString(meta.page);
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
                var key_2 = subfieldIdToString(meta.page);
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
                var key_3 = subfieldIdToString(meta_1.page);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL19oZWxwZXJzL3JlZHVjZXItZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQVcsTUFBTSxPQUFPLENBQUM7QUFFakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBRTFELE1BQU0sS0FBTyxtQkFBbUIsR0FBRyxrQkFBa0I7Ozs7O0FBQ3JELHlDQUdDOzs7SUFGQyx3Q0FBcUI7O0lBQ3JCLHNDQUFlOzs7OztBQUdqQiw2Q0FFQzs7OztBQUVELG1DQVlDOzs7SUFWQyxvQ0FBcUI7O0lBQ3JCLGdDQUdFOztJQUNGLGdDQUdJOztJQUNKLCtCQUFrQzs7Ozs7O0FBR3BDLDBCQUE0RDs7O0lBQTdCLHFCQUFlOztJQUFDLGtCQUFXOzs7QUFHMUQsTUFBTSxLQUFPLEVBQUU7Ozs7QUFBRyxVQUFDLElBQVksSUFBSyxPQUFBLEtBQUssR0FBRyxJQUFJLEVBQVosQ0FBWSxDQUFBOzs7Ozs7QUFPaEQsTUFBTSxLQUFPLFVBQVUsR0FBRyxrQkFBa0I7Ozs7OztBQUU1QyxNQUFNLFVBQVUsU0FBUyxDQUFDLEtBQWEsRUFBRSxNQUFjO0lBQ3JELE9BQU8sUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztB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LENBQUMsT0FBTzs7OztRQUFDLFVBQUEsSUFBSTs7OztnQkFFVixRQUFRLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7WUFFeEQsSUFBSSxRQUFRLEVBQUU7O29CQUNOLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDLHdCQUFRLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBTyxHQUFDLFFBQVEsSUFBRyxJQUFJLE1BQUksQ0FBQTthQUNwRTtRQUNILENBQUMsRUFBQyxDQUFBO1FBQ0YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQUtPLDBDQUFpQjs7Ozs7O0lBQXpCLFVBQTBCLFNBQWdDLEVBQUUsSUFBUzs7WUFDL0QsUUFBUTtRQUNaLElBQUk7WUFDRixRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO1FBQUMsT0FBTyxLQUFLLEVBQUU7U0FFZjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUF6Z0JELElBeWdCQzs7Ozs7Ozs7Ozs7O0lBcFJDLG9DQUFzRDs7SUFDdEQsb0NBQXNEOztJQUN0RCxvQ0FBc0Q7O0lBclAxQyxzQ0FBMkI7O0lBQUUsaUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcG9zZVJlZHVjZXJzIH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvZm9ybSc7XG5pbXBvcnQgeyBVIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBlcXVhbHMsIGluZGV4QnksIGtleXMsIG9taXQsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycywgUmVkdWNlciB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IExvYWRQYWdlTWV0YSwgTG9hZFBhZ2VTdWNjZWVkZWRNZXRhIH0gZnJvbSAnLi9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcbmltcG9ydCB7IHN1YmZpZWxkSWRUb1N0cmluZyB9IGZyb20gJy4vc3ViZmllbGRJZFRvU3RyaW5nJztcblxuZXhwb3J0IGNvbnN0IFBSX0VOVElUWV9NT0RFTF9NQVAgPSAncGtFbnRpdHlNb2RlbE1hcCdcbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5TW9kZWxBbmRDbGFzczxNb2RlbE5hbWU+IHtcbiAgbW9kZWxOYW1lOiBNb2RlbE5hbWUsXG4gIGZrQ2xhc3M6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIHtcbiAgW2tleTogc3RyaW5nXTogUmVkdWNlckNvbmZpZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlZHVjZXJDb25maWcge1xuICAvLyB3cmFwcyBldmVyeXRoaW5nIGluIGZhY2V0dGUgbmFtZWQgYnkgZmFjZXR0ZUJ5UGsgYW5kIGdyb3VwZWQgYnkgYWN0aW9uLm1ldGEucGtcbiAgZmFjZXR0ZUJ5UGs/OiBzdHJpbmcsXG4gIGluZGV4Qnk/OiB7XG4gICAga2V5SW5TdG9yZTogc3RyaW5nO1xuICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IHN0cmluZztcbiAgfSxcbiAgZ3JvdXBCeT86IHtcbiAgICBrZXlJblN0b3JlOiBzdHJpbmc7XG4gICAgZ3JvdXBCeUZuOiAoaXRlbSkgPT4gc3RyaW5nO1xuICB9W10sXG4gIGVxdWFscz86IChpdGVtQSwgaXRlbUIpID0+IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXRhPE1vZGVsPiB7IGl0ZW1zOiBNb2RlbFtdLCBwaz86IG51bWJlciB9XG5cblxuZXhwb3J0IGNvbnN0IGJ5ID0gKG5hbWU6IHN0cmluZykgPT4gJ2J5XycgKyBuYW1lO1xuLy8gZXhwb3J0IGNvbnN0IHBhZ2luYXRlTmFtZSA9IChwYWdCeTogUGFnaW5hdGVCeVBhcmFtW10pID0+IHBhZ0J5Lm1hcChwID0+IE9iamVjdC5rZXlzKHApWzBdKS5qb2luKCdfXycpO1xuXG4vLyBleHBvcnQgY29uc3QgcGFnID0gKG5hbWU6IHN0cmluZykgPT4gJ3BhZ18nICsgbmFtZTtcbi8vIGV4cG9ydCBjb25zdCBwYWdpbmF0ZWRCeSA9IChuYW1lOiBzdHJpbmcpID0+IHBhZyhieShuYW1lKSk7XG5cbi8vIGV4cG9ydCBjb25zdCBwYWdpbmF0ZUtleSA9IChwYWdCeTogUGFnaW5hdGVCeVBhcmFtW10pID0+IHBhZ0J5Lm1hcChwID0+IHZhbHVlcyhwKVswXSkuam9pbignXycpO1xuZXhwb3J0IGNvbnN0IHBhZ2luYXRlQnkgPSAnYnlfc3ViZmllbGRfcGFnZSdcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZyb21UbyhsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xuICByZXR1cm4gZ2V0U3RhcnQobGltaXQsIG9mZnNldCkgKyAnXycgKyBnZXRFbmQobGltaXQsIG9mZnNldCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmQobGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpIHtcbiAgcmV0dXJuIGdldFN0YXJ0KGxpbWl0LCBvZmZzZXQpICsgbGltaXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGFydChsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xuICByZXR1cm4gb2Zmc2V0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgc3RhbmRhcmQgcmVkdWNlcnMgZm9yIHRoZSBnaXZlbiBtb2RlbC5cbiAqXG4gKiBBZGRzIGluZGV4ZXMgYWNjb3JkaW5nIHRvIGNvbmZpZy5cbiAqXG4gKiBTOiBJbnRlcmZhY2Ugb2YgdGhlIHN0YXRlIChzbGljZSBvZiBzdG9yZSlcbiAqL1xuZXhwb3J0IGNsYXNzIFJlZHVjZXJGYWN0b3J5PFBheWxvYWQsIE1vZGVsPiB7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGFjdGlvblByZWZpeDogc3RyaW5nLCBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24pIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVSZWR1Y2VycygpIHtcblxuICAgIGNvbnN0IHJlZHVjZXJzID0ge31cbiAgICBVLm9iajJLZXlWYWx1ZUFycih0aGlzLmNvbmZpZ3MpLmZvckVhY2goeCA9PiB7XG4gICAgICByZWR1Y2Vyc1t4LmtleV0gPSB0aGlzLmNyZWF0ZU1vZGVsUmVkdWNlcnMoeC5rZXksIHgudmFsdWUpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZW50aXR5TW9kZWxNYXBSZWR1Y2VycyA9IGtleXModGhpcy5jb25maWdzKS5tYXAobW9kZWxOYW1lID0+IHRoaXMuY3JlYXRlRW50aXR5TW9kZWxNYXBSZWR1Y2Vycyhtb2RlbE5hbWUpKVxuICAgIHJlZHVjZXJzW1BSX0VOVElUWV9NT0RFTF9NQVBdID0gY29tcG9zZVJlZHVjZXJzKC4uLmVudGl0eU1vZGVsTWFwUmVkdWNlcnMpXG5cbiAgICByZXR1cm4gY29tYmluZVJlZHVjZXJzKHJlZHVjZXJzKVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVNb2RlbFJlZHVjZXJzKG1vZGVsTmFtZSwgY29uZmlnOiBSZWR1Y2VyQ29uZmlnKSB7XG4gICAgY29uc3QgYWN0aW9uUHJlZml4ID0gdGhpcy5hY3Rpb25QcmVmaXg7XG4gICAgY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IHt9LCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNZXRhPE1vZGVsPj4pID0+IHtcblxuICAgICAgY29uc3QgZmFjZXR0ZSA9IHRoaXMuZmFjZXR0ZShtb2RlbE5hbWUsIGNvbmZpZylcblxuICAgICAgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpMT0FEJykge1xuXG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAvLyBUT0RPIHJlZmFjdG9yIHRoaXMgZm9yIHBhcnRpYWwgbG9kaW5nc1xuICAgICAgICAgIC4uLm9taXQoW2J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXSwgaW5uZXJTdGF0ZSksXG4gICAgICAgICAgbG9hZGluZzogdHJ1ZVxuICAgICAgICB9KSk7XG5cbiAgICAgIH1cblxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6TE9BRF9TVUNDRUVERUQnKSB7XG4gICAgICAgIC8vIElmIGFjdGlvbiBzdGF0ZSBkaWZmZXJzIGZyb21cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoXG4gICAgICAgICAge1xuICAgICAgICAgICAgLi4udGhpcy5tZXJnZUl0ZW1zSW5TdGF0ZShjb25maWcsIGlubmVyU3RhdGUsIGFjdGlvbiksXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICAgIH0pKVxuICAgICAgfVxuXG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpVUFNFUlQnKSB7XG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi5pbm5lclN0YXRlLFxuICAgICAgICAgIFt0aGlzLnVwZGF0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldOiB0aGlzLmluZGV4S2V5T2JqZWN0KGFjdGlvbiwgY29uZmlnKVxuICAgICAgICB9KSlcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OlVQU0VSVF9TVUNDRUVERUQnKSB7XG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi4gdGhpcy5tZXJnZUl0ZW1zSW5TdGF0ZShjb25maWcsIGlubmVyU3RhdGUsIGFjdGlvblxuICAgICAgICAgICAgLy8gLCB0cnVlXG4gICAgICAgICAgKSxcbiAgICAgICAgICBbdGhpcy51cGRhdGluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXTpcbiAgICAgICAgICAgIG9taXQodmFsdWVzKHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpKSwgaW5uZXJTdGF0ZVt0aGlzLnVwZGF0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldKVxuICAgICAgICB9KSlcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkRFTEVURScpIHtcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3RoaXMuZGVsZXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV06IHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpXG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkRFTEVURV9TVUNDRUVERUQnKSB7XG5cbiAgICAgICAgY29uc3QgZGVsZXRpbmdLZXkgPSB0aGlzLmRlbGV0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSlcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiB7XG4gICAgICAgICAgaW5uZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZGVsZXRlSXRlbXNGcm9tU3RhdGUoY29uZmlnLCBhY3Rpb24sIGlubmVyU3RhdGUpLFxuICAgICAgICAgICAgW2RlbGV0aW5nS2V5XTogb21pdCh2YWx1ZXModGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZykpLCBpbm5lclN0YXRlW3RoaXMuZGVsZXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghT2JqZWN0LmtleXMoaW5uZXJTdGF0ZVtkZWxldGluZ0tleV0pLmxlbmd0aCkgaW5uZXJTdGF0ZSA9IG9taXQoW2RlbGV0aW5nS2V5XSwgaW5uZXJTdGF0ZSk7XG4gICAgICAgICAgcmV0dXJuIGlubmVyU3RhdGU7XG4gICAgICAgIH0pXG5cbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OlJFTU9WRScpIHtcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3RoaXMucmVtb3ZpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV06IHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpXG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OlJFTU9WRV9TVUNDRUVERUQnKSB7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZpbmdLZXkgPSB0aGlzLnJlbW92aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSlcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiB7XG4gICAgICAgICAgaW5uZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMuZGVsZXRlSXRlbXNGcm9tU3RhdGUoY29uZmlnLCBhY3Rpb24sIGlubmVyU3RhdGUpLFxuICAgICAgICAgICAgW3JlbW92aW5nS2V5XTogb21pdCh2YWx1ZXModGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZykpLCBpbm5lclN0YXRlW3RoaXMucmVtb3ZpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghT2JqZWN0LmtleXMoaW5uZXJTdGF0ZVtyZW1vdmluZ0tleV0pLmxlbmd0aCkgaW5uZXJTdGF0ZSA9IG9taXQoW3JlbW92aW5nS2V5XSwgaW5uZXJTdGF0ZSk7XG4gICAgICAgICAgcmV0dXJuIGlubmVyU3RhdGU7XG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpGQUlMRUQnKSB7XG5cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgLi4ub21pdChbYnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldLCBpbm5lclN0YXRlKSxcbiAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgICAgICB9KSk7XG5cbiAgICAgIH1cblxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6TE9BRF9QQUdFJykge1xuICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGEgYXMgYW55IGFzIExvYWRQYWdlTWV0YTtcbiAgICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKG1ldGEucGFnZSlcbiAgICAgICAgY29uc3QgZnJvbVRvID0gZ2V0RnJvbVRvKG1ldGEucGFnZS5saW1pdCwgbWV0YS5wYWdlLm9mZnNldCk7XG5cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3BhZ2luYXRlQnldOiB7XG4gICAgICAgICAgICAuLi5pbm5lclN0YXRlW3BhZ2luYXRlQnldLFxuICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgLi4uKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0sXG4gICAgICAgICAgICAgIGxvYWRpbmc6IHtcbiAgICAgICAgICAgICAgICAuLi4oKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0gfHwge30pLmxvYWRpbmcsXG4gICAgICAgICAgICAgICAgW2Zyb21Ub106IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkxPQURfUEFHRV9GQUlMRUQnKSB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YSBhcyBhbnkgYXMgTG9hZFBhZ2VNZXRhO1xuXG4gICAgICAgIGNvbnN0IGtleSA9IHN1YmZpZWxkSWRUb1N0cmluZyhtZXRhLnBhZ2UpXG4gICAgICAgIGNvbnN0IGZyb21UbyA9IGdldEZyb21UbyhtZXRhLnBhZ2UubGltaXQsIG1ldGEucGFnZS5vZmZzZXQpO1xuXG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi5pbm5lclN0YXRlLFxuICAgICAgICAgIFtwYWdpbmF0ZUJ5XToge1xuICAgICAgICAgICAgLi4uaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSxcbiAgICAgICAgICAgIFtrZXldOiB7XG4gICAgICAgICAgICAgIC4uLihpbm5lclN0YXRlW3BhZ2luYXRlQnldIHx8IHt9KVtrZXldLFxuICAgICAgICAgICAgICBsb2FkaW5nOiB7XG4gICAgICAgICAgICAgICAgLi4uKChpbm5lclN0YXRlW3BhZ2luYXRlQnldIHx8IHt9KVtrZXldIHx8IHt9KS5sb2FkaW5nLFxuICAgICAgICAgICAgICAgIFtmcm9tVG9dOiBmYWxzZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpMT0FEX1BBR0VfU1VDQ0VFREVEJykge1xuICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGEgYXMgYW55IGFzIExvYWRQYWdlU3VjY2VlZGVkTWV0YTtcbiAgICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKG1ldGEucGFnZSlcbiAgICAgICAgY29uc3QgZnJvbVRvID0gZ2V0RnJvbVRvKG1ldGEucGFnZS5saW1pdCwgbWV0YS5wYWdlLm9mZnNldCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gZ2V0U3RhcnQobWV0YS5wYWdlLmxpbWl0LCBtZXRhLnBhZ2Uub2Zmc2V0KTtcblxuICAgICAgICBjb25zdCByb3dzID0ge31cbiAgICAgICAgaWYgKG1ldGEucGtzKSB7XG4gICAgICAgICAgbWV0YS5wa3MuZm9yRWFjaCgocGssIGkpID0+IHtcbiAgICAgICAgICAgIHJvd3Nbc3RhcnQgKyBpXSA9IHBrO1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3BhZ2luYXRlQnldOiB7XG4gICAgICAgICAgICAuLi5pbm5lclN0YXRlW3BhZ2luYXRlQnldLFxuICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgLi4uKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0sXG4gICAgICAgICAgICAgIGNvdW50OiBtZXRhLmNvdW50IHx8IDAsXG4gICAgICAgICAgICAgIHJvd3M6IHtcbiAgICAgICAgICAgICAgICAuLi4oKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0gfHwge30pLnJvd3MsXG4gICAgICAgICAgICAgICAgLi4ucm93c1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsb2FkaW5nOiB7XG4gICAgICAgICAgICAgICAgLi4uKChpbm5lclN0YXRlW3BhZ2luYXRlQnldIHx8IHt9KVtrZXldIHx8IHt9KS5sb2FkaW5nLFxuICAgICAgICAgICAgICAgIFtmcm9tVG9dOiBmYWxzZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG5cblxuICAgIHJldHVybiByZWR1Y2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gbWFwIGZvciBwa19lbnRpdHkgLT4gbW9kZWxOYW1lIG9uIHRoZSBsZXZlbCBvZiB0aGUgc2NoZW1hOlxuICAgKiBleGFtcGxlOlxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVFbnRpdHlNb2RlbE1hcFJlZHVjZXJzKG1vZGVsTmFtZSk6IFJlZHVjZXI8dW5rbm93biwgRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1ldGE8TW9kZWw+Pj4ge1xuICAgIGNvbnN0IGFjdGlvblByZWZpeCA9IHRoaXMuYWN0aW9uUHJlZml4O1xuICAgIGNvbnN0IHJlZHVjZXIgPSAoc3RhdGUgPSB7fSwgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWV0YTxNb2RlbD4+KSA9PiB7XG4gICAgICBjb25zdCBtb2RlbFBhdGggPSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWU7XG5cbiAgICAgIGlmICghYWN0aW9uIHx8ICFhY3Rpb24ubWV0YSB8fCAhYWN0aW9uLm1ldGEuaXRlbXMgfHwgIWFjdGlvbi5tZXRhLml0ZW1zLmxlbmd0aCkgcmV0dXJuIHN0YXRlO1xuICAgICAgY29uc3QgaXRlbXMgPSBhY3Rpb24ubWV0YS5pdGVtcztcblxuICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIG1vZGVsUGF0aCArICc6OkxPQURfU1VDQ0VFREVEJzpcbiAgICAgICAgY2FzZSBtb2RlbFBhdGggKyAnOjpVUFNFUlRfU1VDQ0VFREVEJzpcbiAgICAgICAgICBjb25zdCBpZHggPSB7fVxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpXSBhcyBhbnk7XG4gICAgICAgICAgICBpZiAoaXRlbS5wa19lbnRpdHkpIHtcbiAgICAgICAgICAgICAgaWR4W2l0ZW0ucGtfZW50aXR5XSA9IHtcbiAgICAgICAgICAgICAgICBtb2RlbE5hbWUsXG4gICAgICAgICAgICAgICAgZmtDbGFzczogaXRlbS5ma0NsYXNzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIC4uLmlkeFxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIG1vZGVsUGF0aCArICc6OkRFTEVURV9TVUNDRUVERUQnOlxuICAgICAgICBjYXNlIG1vZGVsUGF0aCArICc6OlJFTU9WRV9TVUNDRUVERUQnOlxuICAgICAgICAgIGNvbnN0IHBrRW50aXRpZXMgPSBbXVxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpXSBhcyBhbnk7XG4gICAgICAgICAgICBpZiAoaXRlbS5wa19lbnRpdHkpIHtcbiAgICAgICAgICAgICAgcGtFbnRpdGllcy5wdXNoKGl0ZW0ucGtfZW50aXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhdGUgPSBvbWl0KHBrRW50aXRpZXMsIHN0YXRlKVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcbiAgICByZXR1cm4gcmVkdWNlcjtcbiAgfVxuXG5cbiAgdXBkYXRpbmdCeSA9IChuYW1lOiBzdHJpbmcpID0+ICd1cGRhdGluZ18nICsgYnkobmFtZSk7XG4gIGRlbGV0aW5nQnkgPSAobmFtZTogc3RyaW5nKSA9PiAnZGVsZXRpbmdfJyArIGJ5KG5hbWUpO1xuICByZW1vdmluZ0J5ID0gKG5hbWU6IHN0cmluZykgPT4gJ3JlbW92aW5nXycgKyBieShuYW1lKTtcblxuXG5cbiAgcHJpdmF0ZSBmYWNldHRlKG1vZGVsTmFtZTogYW55LCBjb25maWc6IFJlZHVjZXJDb25maWcpIHtcbiAgICByZXR1cm4gKGFjdGlvbiwgc3RhdGUsIGNiOiAoaW5uZXJTdGF0ZSkgPT4gYW55KSA9PiB7XG4gICAgICBsZXQgb3V0ZXJTdGF0ZTtcbiAgICAgICh7IG91dGVyU3RhdGUsIHN0YXRlIH0gPSB0aGlzLmRlRmFjZXR0ZShtb2RlbE5hbWUsIGNvbmZpZywgYWN0aW9uLCBvdXRlclN0YXRlLCBzdGF0ZSkpO1xuICAgICAgY29uc3QgaW5uZXJTdGF0ZSA9IGNiKHN0YXRlKTtcbiAgICAgIHJldHVybiB0aGlzLmVuRmFjZXR0ZShtb2RlbE5hbWUsIGNvbmZpZywgYWN0aW9uLCBpbm5lclN0YXRlLCBvdXRlclN0YXRlKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBkZUZhY2V0dGUobW9kZWxOYW1lOiBzdHJpbmcsIGNvbmZpZzogUmVkdWNlckNvbmZpZywgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgcGs/OiBudW1iZXI7IH0+LCBvdXRlclN0YXRlOiBhbnksIHN0YXRlOiB7fSkge1xuICAgIGlmICh0aGlzLmlzRmFjZXR0ZUJ5UGsoY29uZmlnLCBhY3Rpb24pKSB7XG4gICAgICAvLyBvdXRlclN0YXRlID0gY2xvbmUoc3RhdGUpO1xuICAgICAgY29uc3QgcGsgPSBhY3Rpb24ubWV0YS5wayB8fCAncmVwbydcbiAgICAgIC8vIHN0YXRlID0gIXN0YXRlW2NvbmZpZy5mYWNldHRlQnlQa10gPyB7fSA6IHN0YXRlW2NvbmZpZy5mYWNldHRlQnlQa11bcGtdIHx8IHt9O1xuICAgICAgY29uc3QgaW5uZXJTdGF0ZSA9ICFzdGF0ZVtjb25maWcuZmFjZXR0ZUJ5UGtdID8ge30gOiBzdGF0ZVtjb25maWcuZmFjZXR0ZUJ5UGtdW3BrXSB8fCB7fTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG91dGVyU3RhdGU6IHN0YXRlLFxuICAgICAgICBzdGF0ZTogaW5uZXJTdGF0ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBvdXRlclN0YXRlLCBzdGF0ZSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBlbkZhY2V0dGUobW9kZWxOYW1lOiBzdHJpbmcsIGNvbmZpZzogUmVkdWNlckNvbmZpZywgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgcGs/OiBudW1iZXI7IH0+LCBzdGF0ZToge30sIG91dGVyU3RhdGU6IGFueSkge1xuICAgIGlmICh0aGlzLmlzRmFjZXR0ZUJ5UGsoY29uZmlnLCBhY3Rpb24pKSB7XG4gICAgICBjb25zdCBwayA9IGFjdGlvbi5tZXRhLnBrIHx8ICdyZXBvJ1xuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLm91dGVyU3RhdGUsXG4gICAgICAgIFtjb25maWcuZmFjZXR0ZUJ5UGtdOiB7XG4gICAgICAgICAgLi4ub3V0ZXJTdGF0ZVtjb25maWcuZmFjZXR0ZUJ5UGtdLFxuICAgICAgICAgIFtwa106IHN0YXRlXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBpc0ZhY2V0dGVCeVBrKGNvbmZpZzogUmVkdWNlckNvbmZpZywgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgcGs/OiBudW1iZXI7IH0+KSB7XG4gICAgaWYgKGNvbmZpZy5mYWNldHRlQnlQaykge1xuICAgICAgaWYgKCFhY3Rpb24ubWV0YSB8fCBhY3Rpb24ubWV0YS5wayA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignRmFjZXR0ZSBhY3Rpb27CoG11c3QgcHJvdmlkZSBwayBmb3IgZmFjZXR0ZScpO1xuICAgICAgZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG5cbiAgZGVsZXRlSXRlbXNGcm9tU3RhdGUoY29uZmlnOiBSZWR1Y2VyQ29uZmlnLCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7IGl0ZW1zOiBNb2RlbFtdOyB9Piwgc3RhdGUpIHtcbiAgICBjb25zdCBpdGVtcyA9IGFjdGlvbi5tZXRhLml0ZW1zO1xuICAgIC8vIGxldCBzdGF0ZSA9IHt9XG4gICAgY29uc3QgZ3JvdXBCeXMgPSAhKGNvbmZpZy5ncm91cEJ5ICYmIGNvbmZpZy5ncm91cEJ5Lmxlbmd0aCkgPyBbXSA6IGNvbmZpZy5ncm91cEJ5O1xuICAgIGNvbnN0IGdyb3VwcyA9IGdyb3VwQnlzLm1hcChpID0+ICh7XG4gICAgICBncm91cEJ5S2V5OiBieShpLmtleUluU3RvcmUpLFxuICAgICAgZ3JvdXBCeUZuOiBpLmdyb3VwQnlGbixcbiAgICB9KSlcbiAgICBjb25zdCBtYWluSW5kZXhLZXkgPSBieShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKTsgLy8gZmlyc3Qgc2VnbWVudCBlLmcuICdieV9wa19lbnRpdHknXG5cbiAgICBpdGVtcy5mb3JFYWNoKChyZW1vdmVkSXRlbSkgPT4ge1xuICAgICAgLy8gZ2V0IHBhdGggc2VnbWVudHMgb2YgbmV3IGl0ZW1cbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBjb25maWcuaW5kZXhCeS5pbmRleEJ5Rm4ocmVtb3ZlZEl0ZW0pOyAvLyBzZWNvbmQgc2VnbWVudCBlLmcuICc4MDcwNjAnXG5cbiAgICAgIC8vIGdldCBvbGQgaXRlbSwgaWYgZXhpc3RzXG4gICAgICBjb25zdCBvbGRJdGVtID0gc3RhdGVbbWFpbkluZGV4S2V5XSA/IHN0YXRlW21haW5JbmRleEtleV1baXRlbUtleV0gOiB1bmRlZmluZWQ7XG5cbiAgICAgIC8vIFE6IERvZXMgdGhlIGl0ZW0gZXhpc3RzP1xuICAgICAgaWYgKG9sZEl0ZW0pIHtcbiAgICAgICAgLy8gQTogWWVzLiB1c2Ugb2xkIGl0ZW0gZG9lcyBleGlzdFxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgcmVtb3ZlZEl0ZW0gYXQgcGF0aCBpbiBtYWluIGluZGV4XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIFttYWluSW5kZXhLZXldOiB7XG4gICAgICAgICAgICAuLi5vbWl0KFtpdGVtS2V5XSwgc3RhdGVbbWFpbkluZGV4S2V5XSksXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVsZXRlIHRoZSByZW1vdmVkSXRlbSBhdCBwYXRoIGluIHRoZSBncm91cCBpbmRleFxuICAgICAgICBncm91cHMuZm9yRWFjaChnID0+IHtcbiAgICAgICAgICBjb25zdCBncm91cEtleSA9IHRoaXMuZ2V0R3JvdXBLZXlPZkl0ZW0oZy5ncm91cEJ5Rm4sIHJlbW92ZWRJdGVtKVxuICAgICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBbZy5ncm91cEJ5S2V5XToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZVtnLmdyb3VwQnlLZXldLFxuICAgICAgICAgICAgICBbZ3JvdXBLZXldOiB7XG4gICAgICAgICAgICAgICAgLi4ub21pdChbaXRlbUtleV0sIChzdGF0ZVtnLmdyb3VwQnlLZXldIHx8IHt9KVtncm91cEtleV0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gLy8gY2xlYW51cCBwYWdpbmF0aW9uc1xuICAgICAgICAgIC8vIHN0YXRlID0gdGhpcy5yZXNldFBhZ2luYXRpb25zQnlHcm91cChnLmdyb3VwQnlLZXksIHN0YXRlLCBncm91cEtleSk7XG5cbiAgICAgICAgfSlcbiAgICAgIH1cblxuXG4gICAgfSlcblxuICAgIC8vIGNsZWFudXAgbWFpbiBpbmRleFxuICAgIGlmIChPYmplY3Qua2V5cyhzdGF0ZVttYWluSW5kZXhLZXldKS5sZW5ndGggPCAxKSB7XG4gICAgICBzdGF0ZSA9IHsgLi4ub21pdChbbWFpbkluZGV4S2V5XSwgc3RhdGUpIH1cbiAgICB9XG4gICAgLy8gY2xlYW51cCBncm91cCBpbmRpY2VzXG4gICAgZ3JvdXBzLmZvckVhY2goZyA9PiB7XG5cbiAgICAgIC8vIGNsZWFudXAgZ3JvdXBzIGluIGdyb3VwIGluZGV4XG4gICAgICBPYmplY3Qua2V5cyhzdGF0ZVtnLmdyb3VwQnlLZXldKS5mb3JFYWNoKGdyb3VwS2V5ID0+IHtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoc3RhdGVbZy5ncm91cEJ5S2V5XVtncm91cEtleV0pLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgW2cuZ3JvdXBCeUtleV06IG9taXQoW2dyb3VwS2V5XSwgc3RhdGVbZy5ncm91cEJ5S2V5XSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIGNsZWFudXAgZ3JvdXAgaW5kZXhcbiAgICAgIGlmIChPYmplY3Qua2V5cyhzdGF0ZVtnLmdyb3VwQnlLZXldKS5sZW5ndGggPCAxKSB7XG4gICAgICAgIHN0YXRlID0geyAuLi5vbWl0KFtnLmdyb3VwQnlLZXldLCBzdGF0ZSkgfVxuICAgICAgfVxuICAgIH0pXG5cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIG1lcmdlSXRlbXNJblN0YXRlKGNvbmZpZzogUmVkdWNlckNvbmZpZywgc3RhdGUsIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHsgaXRlbXM6IE1vZGVsW107IH0+XG4gICAgLy8gLCByZXNldFBhZ2luYXRpb25zID0gZmFsc2VcbiAgKSB7XG4gICAgY29uc3QgaXRlbXMgPSBhY3Rpb24ubWV0YS5pdGVtcztcbiAgICBjb25zdCBncm91cEJ5cyA9ICEoY29uZmlnLmdyb3VwQnkgJiYgY29uZmlnLmdyb3VwQnkubGVuZ3RoKSA/IFtdIDogY29uZmlnLmdyb3VwQnk7XG4gICAgY29uc3QgZ3JvdXBzID0gZ3JvdXBCeXMubWFwKGkgPT4gKHtcbiAgICAgIGdyb3VwQnlLZXk6IGJ5KGkua2V5SW5TdG9yZSksXG4gICAgICBncm91cEJ5Rm46IGkuZ3JvdXBCeUZuLFxuICAgIH0pKVxuXG4gICAgY29uc3QgbWFpbkluZGV4S2V5ID0gYnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSk7IC8vIGZpcnN0IHNlZ21lbnQgZS5nLiAnYnlfcGtfZW50aXR5J1xuXG4gICAgaXRlbXMuZm9yRWFjaCgobmV3SXRlbSkgPT4ge1xuICAgICAgLy8gZ2V0IHBhdGggc2VnbWVudHMgb2YgbmV3IGl0ZW1cbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBjb25maWcuaW5kZXhCeS5pbmRleEJ5Rm4obmV3SXRlbSk7IC8vIHNlY29uZCBzZWdtZW50IGUuZy4gJzgwNzA2MCdcblxuICAgICAgLy8gZ2V0IG9sZCBpdGVtLCBpZiBleGlzdHNcbiAgICAgIGNvbnN0IG9sZEl0ZW0gPSBzdGF0ZVttYWluSW5kZXhLZXldID8gc3RhdGVbbWFpbkluZGV4S2V5XVtpdGVtS2V5XSA6IHVuZGVmaW5lZDtcblxuICAgICAgbGV0IGl0ZW1Ub1NldDtcblxuICAgICAgLy8gUTogRG9lcyB0aGUgaXRlbSBleGlzdHMsIGFuZCBpcyBpdCBkZWVwbHktZXF1YWwgdG8gdGhlIG5ldyBpdGVtP1xuICAgICAgY29uc3QgZXF1YWxzRm4gPSBjb25maWcuZXF1YWxzIHx8IGVxdWFsc1xuICAgICAgaWYgKG9sZEl0ZW0gJiYgZXF1YWxzRm4obmV3SXRlbSwgb2xkSXRlbSkpIHtcbiAgICAgICAgLy8gQTogWWVzLiB1c2Ugb2xkIGl0ZW0gYXMgaXRlbVRvU2V0XG4gICAgICAgIGl0ZW1Ub1NldCA9IG9sZEl0ZW07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gQTogTm8uIHVzZSBuZXcgaXRlbSBhcyBpdGVtVG9TZXRcbiAgICAgICAgaXRlbVRvU2V0ID0gbmV3SXRlbTtcblxuICAgICAgICAvLyBwdXQgdGhlIGl0ZW1Ub1NldCBhdCBwYXRoIGluIG1haW4gaW5kZXhcbiAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgW21haW5JbmRleEtleV06IHtcbiAgICAgICAgICAgIC4uLnN0YXRlW21haW5JbmRleEtleV0sXG4gICAgICAgICAgICBbaXRlbUtleV06IGl0ZW1Ub1NldFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgZ3JvdXAgaW5kZXhlc1xuICAgICAgICBncm91cHMuZm9yRWFjaChnID0+IHtcbiAgICAgICAgICAvLyByZW1vdmUgdGhlIG9sZEl0ZW0gZnJvbSBhbGwgZ3JvdXAgaW5kZXhlc1xuICAgICAgICAgIGNvbnN0IG9sZEdyb3VwS2V5ID0gdGhpcy5nZXRHcm91cEtleU9mSXRlbShnLmdyb3VwQnlGbiwgb2xkSXRlbSlcbiAgICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgW2cuZ3JvdXBCeUtleV06IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGVbZy5ncm91cEJ5S2V5XSxcbiAgICAgICAgICAgICAgW29sZEdyb3VwS2V5XToge1xuICAgICAgICAgICAgICAgIC4uLm9taXQoW2l0ZW1LZXldLCAoc3RhdGVbZy5ncm91cEJ5S2V5XSB8fCB7fSlbb2xkR3JvdXBLZXldKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gYWRkIHRoZSBpdGVtVG9TZXQgdG8gYWxsIGdyb3VwIGluZGV4ZXMsIGlmIG5vdCB1bmRlZmluZWRcbiAgICAgICAgICBjb25zdCBuZXdHcm91cEtleSA9IHRoaXMuZ2V0R3JvdXBLZXlPZkl0ZW0oZy5ncm91cEJ5Rm4sIGl0ZW1Ub1NldClcbiAgICAgICAgICBpZiAobmV3R3JvdXBLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICBbZy5ncm91cEJ5S2V5XToge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlW2cuZ3JvdXBCeUtleV0sXG4gICAgICAgICAgICAgICAgW25ld0dyb3VwS2V5XToge1xuICAgICAgICAgICAgICAgICAgLi4uKHN0YXRlW2cuZ3JvdXBCeUtleV0gfHwge30pW25ld0dyb3VwS2V5XSxcbiAgICAgICAgICAgICAgICAgIFtpdGVtS2V5XTogaXRlbVRvU2V0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcblxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cblxuICAvLyAvKipcbiAgLy8gICogcmVzZXRzIHBhZ2luYXRpb24gd2l0aGluIGEgZ3JvdXAsIGUuZy4gJ3BhZ19ieV9ma19wcm9wZXJ0eSdcbiAgLy8gICogVE9ETzogY2hlY2sgaWYgY2FuIGJlIGRlbGV0ZWRcbiAgLy8gICovXG4gIC8vIHByaXZhdGUgcmVzZXRQYWdpbmF0aW9uc0J5R3JvdXAoZ3JvdXBCeUtleTogc3RyaW5nLCBzdGF0ZTogYW55LCBncm91cEtleTogYW55LCBpc1Vwc2VydCA9IGZhbHNlKSB7XG4gIC8vICAgY29uc3QgcGFnaW5hdGVCeSA9IHBhZyhncm91cEJ5S2V5KTtcbiAgLy8gICBpZiAoc3RhdGVbcGFnaW5hdGVCeV0gJiYgc3RhdGVbcGFnaW5hdGVCeV1bZ3JvdXBLZXldICYmIHN0YXRlW3BhZ2luYXRlQnldW2dyb3VwS2V5XS5jb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gIC8vICAgICBzdGF0ZSA9IHtcbiAgLy8gICAgICAgLi4uc3RhdGUsXG4gIC8vICAgICAgIFtwYWdpbmF0ZUJ5XToge1xuICAvLyAgICAgICAgIC4uLnN0YXRlW3BhZ2luYXRlQnldLFxuICAvLyAgICAgICAgIFtncm91cEtleV06IHtcbiAgLy8gICAgICAgICAgIC4uLnN0YXRlW3BhZ2luYXRlQnldW2dyb3VwS2V5XSxcbiAgLy8gICAgICAgICAgIC4uLighaXNVcHNlcnQgPyB7fSA6IHsgY291bnQ6IHN0YXRlW3BhZ2luYXRlQnldW2dyb3VwS2V5XS5jb3VudCArIDEgfSksXG4gIC8vICAgICAgICAgICByb3dzOiB7fSxcbiAgLy8gICAgICAgICAgIGxvYWRpbmc6IHt9XG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICB9XG4gIC8vICAgICB9O1xuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gc3RhdGU7XG4gIC8vIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBvYmplY3Qgd2hlcmUgdGhlIGtleSByZXR1cm5lZCBieSB0aGUgY29uZmlndXJlZCBpbmRleEJ5Rm5cbiAgICovXG4gIHByaXZhdGUgaW5kZXhLZXlPYmplY3QoYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgfT4sIGNvbmZpZzogUmVkdWNlckNvbmZpZykge1xuICAgIHJldHVybiBpbmRleEJ5KChpKSA9PiAoaSksIGFjdGlvbi5tZXRhLml0ZW1zXG4gICAgICAvLyBmaWx0ZXIgaXRlbXMgdGhhdCBhcmUgbm90ICh5ZXQpIGluZGV4YWJsZS4gVGhpcyBpcyBub3JtYWxseSB0aGUgY2FzZSwgd2hlbiBjcmVhdGluZyBuZXcgaXRlbXMgdGhhdCBoYXZlIG5vIHBrIHlldC5cbiAgICAgIC5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uZmlnLmluZGV4QnkuaW5kZXhCeUZuKGl0ZW0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5tYXAoaXRlbSA9PiBjb25maWcuaW5kZXhCeS5pbmRleEJ5Rm4oaXRlbSkpKTtcbiAgfVxuXG4gIGdyb3VwQnkoaXRlbXM6IGFueVtdLCBncm91cEJ5Rm46IChpdGVtKSA9PiBzdHJpbmcsIGluZGV4QnlGbjogKGl0ZW0pID0+IHN0cmluZykge1xuICAgIGNvbnN0IGdyb3VwcyA9IHt9XG4gICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIC8vIGlmIHRoZSBncm91cCBieSBrZXkgaXMgbm90IHBvc3NpYmxlIHRvIGNyZWF0ZSwgdGhlIGl0ZW0gd29uJ3QgYmUgYWRkZWQgdG8gdGhlIGluZGV4XG4gICAgICBjb25zdCBncm91cEtleSA9IHRoaXMuZ2V0R3JvdXBLZXlPZkl0ZW0oZ3JvdXBCeUZuLCBpdGVtKTtcblxuICAgICAgaWYgKGdyb3VwS2V5KSB7XG4gICAgICAgIGNvbnN0IGluZGV4S2V5ID0gaW5kZXhCeUZuKGl0ZW0pO1xuICAgICAgICBncm91cHNbZ3JvdXBLZXldID0geyAuLi5ncm91cHNbZ3JvdXBLZXldLCAuLi57IFtpbmRleEtleV06IGl0ZW0gfSB9XG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZ3JvdXBzO1xuICB9XG5cblxuXG5cbiAgcHJpdmF0ZSBnZXRHcm91cEtleU9mSXRlbShncm91cEJ5Rm46IChpdGVtOiBhbnkpID0+IHN0cmluZywgaXRlbTogYW55KTogc3RyaW5nIHtcbiAgICBsZXQgZ3JvdXBLZXlcbiAgICB0cnkge1xuICAgICAgZ3JvdXBLZXkgPSBncm91cEJ5Rm4oaXRlbSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgIH1cbiAgICByZXR1cm4gZ3JvdXBLZXk7XG4gIH1cbn1cbiJdfQ==