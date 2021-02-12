/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/reducer-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { composeReducers } from '@angular-redux/form';
import { U } from '@kleiolab/lib-utils';
import { equals, indexBy, keys, omit, values } from 'ramda';
import { combineReducers } from 'redux';
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
/** @type {?} */
export var paginateName = (/**
 * @param {?} pagBy
 * @return {?}
 */
function (pagBy) { return pagBy.map((/**
 * @param {?} p
 * @return {?}
 */
function (p) { return Object.keys(p)[0]; })).join('__'); });
/** @type {?} */
export var pag = (/**
 * @param {?} name
 * @return {?}
 */
function (name) { return 'pag_' + name; });
/** @type {?} */
export var paginatedBy = (/**
 * @param {?} name
 * @return {?}
 */
function (name) { return pag(by(name)); });
/** @type {?} */
export var paginateKey = (/**
 * @param {?} pagBy
 * @return {?}
 */
function (pagBy) { return pagBy.map((/**
 * @param {?} p
 * @return {?}
 */
function (p) { return values(p)[0]; })).join('_'); });
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
                var paginateBy_1 = paginatedBy(paginateName(meta.paginateBy));
                /** @type {?} */
                var key_1 = meta.paginateBy.map((/**
                 * @param {?} p
                 * @return {?}
                 */
                function (p) { return values(p)[0]; })).join('_');
                /** @type {?} */
                var fromTo_1 = getFromTo(meta.limit, meta.offset);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a, _b, _c;
                    return (tslib_1.__assign({}, innerState, (_a = {}, _a[paginateBy_1] = tslib_1.__assign({}, innerState[paginateBy_1], (_b = {}, _b[key_1] = tslib_1.__assign({}, (innerState[paginateBy_1] || {})[key_1], { loading: tslib_1.__assign({}, ((innerState[paginateBy_1] || {})[key_1] || {}).loading, (_c = {}, _c[fromTo_1] = true, _c)) }), _b)), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE_FAILED') {
                /** @type {?} */
                var meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                var paginateBy_2 = paginatedBy(paginateName(meta.paginateBy));
                /** @type {?} */
                var key_2 = paginateKey(meta.paginateBy);
                /** @type {?} */
                var fromTo_2 = getFromTo(meta.limit, meta.offset);
                state = facette(action, state, (/**
                 * @param {?} innerState
                 * @return {?}
                 */
                function (innerState) {
                    var _a, _b, _c;
                    return (tslib_1.__assign({}, innerState, (_a = {}, _a[paginateBy_2] = tslib_1.__assign({}, innerState[paginateBy_2], (_b = {}, _b[key_2] = tslib_1.__assign({}, (innerState[paginateBy_2] || {})[key_2], { loading: tslib_1.__assign({}, ((innerState[paginateBy_2] || {})[key_2] || {}).loading, (_c = {}, _c[fromTo_2] = false, _c)) }), _b)), _a)));
                }));
            }
            else if (action.type === actionPrefix + '.' + modelName + '::LOAD_PAGE_SUCCEEDED') {
                /** @type {?} */
                var meta_1 = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                /** @type {?} */
                var paginateBy_3 = paginatedBy(paginateName(meta_1.paginateBy));
                /** @type {?} */
                var key_3 = paginateKey(meta_1.paginateBy);
                /** @type {?} */
                var start_1 = getStart(meta_1.limit, meta_1.offset);
                /** @type {?} */
                var fromTo_3 = getFromTo(meta_1.limit, meta_1.offset);
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
                    return (tslib_1.__assign({}, innerState, (_a = {}, _a[paginateBy_3] = tslib_1.__assign({}, innerState[paginateBy_3], (_b = {}, _b[key_3] = tslib_1.__assign({}, (innerState[paginateBy_3] || {})[key_3], { count: meta_1.count || 0, rows: tslib_1.__assign({}, ((innerState[paginateBy_3] || {})[key_3] || {}).rows, rows_1), loading: tslib_1.__assign({}, ((innerState[paginateBy_3] || {})[key_3] || {}).loading, (_c = {}, _c[fromTo_3] = false, _c)) }), _b)), _a)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvX2hlbHBlcnMvcmVkdWNlci1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBVyxNQUFNLE9BQU8sQ0FBQzs7QUFHakQsTUFBTSxLQUFPLG1CQUFtQixHQUFHLGtCQUFrQjs7Ozs7QUFDckQseUNBR0M7OztJQUZDLHdDQUFxQjs7SUFDckIsc0NBQWU7Ozs7O0FBR2pCLDZDQUVDOzs7O0FBRUQsbUNBWUM7OztJQVZDLG9DQUFxQjs7SUFDckIsZ0NBR0U7O0lBQ0YsZ0NBR0k7O0lBQ0osK0JBQWtDOzs7Ozs7QUFHcEMsMEJBQTREOzs7SUFBN0IscUJBQWU7O0lBQUMsa0JBQVc7OztBQUcxRCxNQUFNLEtBQU8sRUFBRTs7OztBQUFHLFVBQUMsSUFBWSxJQUFLLE9BQUEsS0FBSyxHQUFHLElBQUksRUFBWixDQUFZLENBQUE7O0FBQ2hELE1BQU0sS0FBTyxZQUFZOzs7O0FBQUcsVUFBQyxLQUF3QixJQUFLLE9BQUEsS0FBSyxDQUFDLEdBQUc7Ozs7QUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQWpCLENBQWlCLEVBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQTVDLENBQTRDLENBQUE7O0FBRXRHLE1BQU0sS0FBTyxHQUFHOzs7O0FB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SUFBSSxNQUFJLENBQUE7YUFDcEU7UUFDSCxDQUFDLEVBQUMsQ0FBQTtRQUNGLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7Ozs7SUFLTywwQ0FBaUI7Ozs7OztJQUF6QixVQUEwQixTQUFnQyxFQUFFLElBQVM7O1lBQy9ELFFBQVE7UUFDWixJQUFJO1lBQ0YsUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjtRQUFDLE9BQU8sS0FBSyxFQUFFO1NBRWY7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBemdCRCxJQXlnQkM7Ozs7Ozs7Ozs7OztJQXBSQyxvQ0FBc0Q7O0lBQ3RELG9DQUFzRDs7SUFDdEQsb0NBQXNEOztJQXJQMUMsc0NBQTJCOztJQUFFLGlDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXBvc2VSZWR1Y2VycyB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L2Zvcm0nO1xuaW1wb3J0IHsgVSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgZXF1YWxzLCBpbmRleEJ5LCBrZXlzLCBvbWl0LCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMsIFJlZHVjZXIgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBMb2FkUGFnZU1ldGEsIExvYWRQYWdlU3VjY2VlZGVkTWV0YSwgUGFnaW5hdGVCeVBhcmFtIH0gZnJvbSAnLi9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuZXhwb3J0IGNvbnN0IFBSX0VOVElUWV9NT0RFTF9NQVAgPSAncGtFbnRpdHlNb2RlbE1hcCdcbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5TW9kZWxBbmRDbGFzczxNb2RlbE5hbWU+IHtcbiAgbW9kZWxOYW1lOiBNb2RlbE5hbWUsXG4gIGZrQ2xhc3M6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIHtcbiAgW2tleTogc3RyaW5nXTogUmVkdWNlckNvbmZpZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlZHVjZXJDb25maWcge1xuICAvLyB3cmFwcyBldmVyeXRoaW5nIGluIGZhY2V0dGUgbmFtZWQgYnkgZmFjZXR0ZUJ5UGsgYW5kIGdyb3VwZWQgYnkgYWN0aW9uLm1ldGEucGtcbiAgZmFjZXR0ZUJ5UGs/OiBzdHJpbmcsXG4gIGluZGV4Qnk/OiB7XG4gICAga2V5SW5TdG9yZTogc3RyaW5nO1xuICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IHN0cmluZztcbiAgfSxcbiAgZ3JvdXBCeT86IHtcbiAgICBrZXlJblN0b3JlOiBzdHJpbmc7XG4gICAgZ3JvdXBCeUZuOiAoaXRlbSkgPT4gc3RyaW5nO1xuICB9W10sXG4gIGVxdWFscz86IChpdGVtQSwgaXRlbUIpID0+IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXRhPE1vZGVsPiB7IGl0ZW1zOiBNb2RlbFtdLCBwaz86IG51bWJlciB9XG5cblxuZXhwb3J0IGNvbnN0IGJ5ID0gKG5hbWU6IHN0cmluZykgPT4gJ2J5XycgKyBuYW1lO1xuZXhwb3J0IGNvbnN0IHBhZ2luYXRlTmFtZSA9IChwYWdCeTogUGFnaW5hdGVCeVBhcmFtW10pID0+IHBhZ0J5Lm1hcChwID0+IE9iamVjdC5rZXlzKHApWzBdKS5qb2luKCdfXycpO1xuXG5leHBvcnQgY29uc3QgcGFnID0gKG5hbWU6IHN0cmluZykgPT4gJ3BhZ18nICsgbmFtZTtcbmV4cG9ydCBjb25zdCBwYWdpbmF0ZWRCeSA9IChuYW1lOiBzdHJpbmcpID0+IHBhZyhieShuYW1lKSk7XG5cbmV4cG9ydCBjb25zdCBwYWdpbmF0ZUtleSA9IChwYWdCeTogUGFnaW5hdGVCeVBhcmFtW10pID0+IHBhZ0J5Lm1hcChwID0+IHZhbHVlcyhwKVswXSkuam9pbignXycpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RnJvbVRvKGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gIHJldHVybiBnZXRTdGFydChsaW1pdCwgb2Zmc2V0KSArICdfJyArIGdldEVuZChsaW1pdCwgb2Zmc2V0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZChsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xuICByZXR1cm4gZ2V0U3RhcnQobGltaXQsIG9mZnNldCkgKyBsaW1pdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXJ0KGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gIHJldHVybiBvZmZzZXQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBzdGFuZGFyZCByZWR1Y2VycyBmb3IgdGhlIGdpdmVuIG1vZGVsLlxuICpcbiAqIEFkZHMgaW5kZXhlcyBhY2NvcmRpbmcgdG8gY29uZmlnLlxuICpcbiAqIFM6IEludGVyZmFjZSBvZiB0aGUgc3RhdGUgKHNsaWNlIG9mIHN0b3JlKVxuICovXG5leHBvcnQgY2xhc3MgUmVkdWNlckZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+IHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWN0aW9uUHJlZml4OiBzdHJpbmcsIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbikgeyB9XG5cbiAgcHVibGljIGNyZWF0ZVJlZHVjZXJzKCkge1xuXG4gICAgY29uc3QgcmVkdWNlcnMgPSB7fVxuICAgIFUub2JqMktleVZhbHVlQXJyKHRoaXMuY29uZmlncykuZm9yRWFjaCh4ID0+IHtcbiAgICAgIHJlZHVjZXJzW3gua2V5XSA9IHRoaXMuY3JlYXRlTW9kZWxSZWR1Y2Vycyh4LmtleSwgeC52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBlbnRpdHlNb2RlbE1hcFJlZHVjZXJzID0ga2V5cyh0aGlzLmNvbmZpZ3MpLm1hcChtb2RlbE5hbWUgPT4gdGhpcy5jcmVhdGVFbnRpdHlNb2RlbE1hcFJlZHVjZXJzKG1vZGVsTmFtZSkpXG4gICAgcmVkdWNlcnNbUFJfRU5USVRZX01PREVMX01BUF0gPSBjb21wb3NlUmVkdWNlcnMoLi4uZW50aXR5TW9kZWxNYXBSZWR1Y2VycylcblxuICAgIHJldHVybiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1vZGVsUmVkdWNlcnMobW9kZWxOYW1lLCBjb25maWc6IFJlZHVjZXJDb25maWcpIHtcbiAgICBjb25zdCBhY3Rpb25QcmVmaXggPSB0aGlzLmFjdGlvblByZWZpeDtcbiAgICBjb25zdCByZWR1Y2VyID0gKHN0YXRlID0ge30sIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1ldGE8TW9kZWw+PikgPT4ge1xuXG4gICAgICBjb25zdCBmYWNldHRlID0gdGhpcy5mYWNldHRlKG1vZGVsTmFtZSwgY29uZmlnKVxuXG4gICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkxPQUQnKSB7XG5cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC8vIFRPRE8gcmVmYWN0b3IgdGhpcyBmb3IgcGFydGlhbCBsb2RpbmdzXG4gICAgICAgICAgLi4ub21pdChbYnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldLCBpbm5lclN0YXRlKSxcbiAgICAgICAgICBsb2FkaW5nOiB0cnVlXG4gICAgICAgIH0pKTtcblxuICAgICAgfVxuXG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpMT0FEX1NVQ0NFRURFRCcpIHtcbiAgICAgICAgLy8gSWYgYWN0aW9uIHN0YXRlIGRpZmZlcnMgZnJvbVxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+IChcbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi50aGlzLm1lcmdlSXRlbXNJblN0YXRlKGNvbmZpZywgaW5uZXJTdGF0ZSwgYWN0aW9uKSxcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgICAgfSkpXG4gICAgICB9XG5cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OlVQU0VSVCcpIHtcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3RoaXMudXBkYXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV06IHRoaXMuaW5kZXhLZXlPYmplY3QoYWN0aW9uLCBjb25maWcpXG4gICAgICAgIH0pKVxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6VVBTRVJUX1NVQ0NFRURFRCcpIHtcbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLiB0aGlzLm1lcmdlSXRlbXNJblN0YXRlKGNvbmZpZywgaW5uZXJTdGF0ZSwgYWN0aW9uXG4gICAgICAgICAgICAvLyAsIHRydWVcbiAgICAgICAgICApLFxuICAgICAgICAgIFt0aGlzLnVwZGF0aW5nQnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSldOlxuICAgICAgICAgICAgb21pdCh2YWx1ZXModGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZykpLCBpbm5lclN0YXRlW3RoaXMudXBkYXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV0pXG4gICAgICAgIH0pKVxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6REVMRVRFJykge1xuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbdGhpcy5kZWxldGluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXTogdGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZylcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6REVMRVRFX1NVQ0NFRURFRCcpIHtcblxuICAgICAgICBjb25zdCBkZWxldGluZ0tleSA9IHRoaXMuZGVsZXRpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKVxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+IHtcbiAgICAgICAgICBpbm5lclN0YXRlID0ge1xuICAgICAgICAgICAgLi4udGhpcy5kZWxldGVJdGVtc0Zyb21TdGF0ZShjb25maWcsIGFjdGlvbiwgaW5uZXJTdGF0ZSksXG4gICAgICAgICAgICBbZGVsZXRpbmdLZXldOiBvbWl0KHZhbHVlcyh0aGlzLmluZGV4S2V5T2JqZWN0KGFjdGlvbiwgY29uZmlnKSksIGlubmVyU3RhdGVbdGhpcy5kZWxldGluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhpbm5lclN0YXRlW2RlbGV0aW5nS2V5XSkubGVuZ3RoKSBpbm5lclN0YXRlID0gb21pdChbZGVsZXRpbmdLZXldLCBpbm5lclN0YXRlKTtcbiAgICAgICAgICByZXR1cm4gaW5uZXJTdGF0ZTtcbiAgICAgICAgfSlcblxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6UkVNT1ZFJykge1xuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbdGhpcy5yZW1vdmluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXTogdGhpcy5pbmRleEtleU9iamVjdChhY3Rpb24sIGNvbmZpZylcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6UkVNT1ZFX1NVQ0NFRURFRCcpIHtcblxuICAgICAgICBjb25zdCByZW1vdmluZ0tleSA9IHRoaXMucmVtb3ZpbmdCeShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKVxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+IHtcbiAgICAgICAgICBpbm5lclN0YXRlID0ge1xuICAgICAgICAgICAgLi4udGhpcy5kZWxldGVJdGVtc0Zyb21TdGF0ZShjb25maWcsIGFjdGlvbiwgaW5uZXJTdGF0ZSksXG4gICAgICAgICAgICBbcmVtb3ZpbmdLZXldOiBvbWl0KHZhbHVlcyh0aGlzLmluZGV4S2V5T2JqZWN0KGFjdGlvbiwgY29uZmlnKSksIGlubmVyU3RhdGVbdGhpcy5yZW1vdmluZ0J5KGNvbmZpZy5pbmRleEJ5LmtleUluU3RvcmUpXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhpbm5lclN0YXRlW3JlbW92aW5nS2V5XSkubGVuZ3RoKSBpbm5lclN0YXRlID0gb21pdChbcmVtb3ZpbmdLZXldLCBpbm5lclN0YXRlKTtcbiAgICAgICAgICByZXR1cm4gaW5uZXJTdGF0ZTtcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09IGFjdGlvblByZWZpeCArICcuJyArIG1vZGVsTmFtZSArICc6OkZBSUxFRCcpIHtcblxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICAuLi5vbWl0KFtieShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKV0sIGlubmVyU3RhdGUpLFxuICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgIH0pKTtcblxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6TE9BRF9QQUdFJykge1xuICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGEgYXMgYW55IGFzIExvYWRQYWdlTWV0YTtcbiAgICAgICAgY29uc3QgcGFnaW5hdGVCeSA9IHBhZ2luYXRlZEJ5KHBhZ2luYXRlTmFtZShtZXRhLnBhZ2luYXRlQnkpKVxuICAgICAgICBjb25zdCBrZXkgPSBtZXRhLnBhZ2luYXRlQnkubWFwKHAgPT4gdmFsdWVzKHApWzBdKS5qb2luKCdfJylcbiAgICAgICAgY29uc3QgZnJvbVRvID0gZ2V0RnJvbVRvKG1ldGEubGltaXQsIG1ldGEub2Zmc2V0KTtcblxuICAgICAgICBzdGF0ZSA9IGZhY2V0dGUoYWN0aW9uLCBzdGF0ZSwgKGlubmVyU3RhdGUpID0+ICh7XG4gICAgICAgICAgLi4uaW5uZXJTdGF0ZSxcbiAgICAgICAgICBbcGFnaW5hdGVCeV06IHtcbiAgICAgICAgICAgIC4uLmlubmVyU3RhdGVbcGFnaW5hdGVCeV0sXG4gICAgICAgICAgICBba2V5XToge1xuICAgICAgICAgICAgICAuLi4oaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSxcbiAgICAgICAgICAgICAgbG9hZGluZzoge1xuICAgICAgICAgICAgICAgIC4uLigoaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSB8fCB7fSlba2V5XSB8fCB7fSkubG9hZGluZyxcbiAgICAgICAgICAgICAgICBbZnJvbVRvXTogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gYWN0aW9uUHJlZml4ICsgJy4nICsgbW9kZWxOYW1lICsgJzo6TE9BRF9QQUdFX0ZBSUxFRCcpIHtcbiAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhIGFzIGFueSBhcyBMb2FkUGFnZU1ldGE7XG4gICAgICAgIGNvbnN0IHBhZ2luYXRlQnkgPSBwYWdpbmF0ZWRCeShwYWdpbmF0ZU5hbWUobWV0YS5wYWdpbmF0ZUJ5KSlcbiAgICAgICAgY29uc3Qga2V5ID0gcGFnaW5hdGVLZXkobWV0YS5wYWdpbmF0ZUJ5KVxuICAgICAgICBjb25zdCBmcm9tVG8gPSBnZXRGcm9tVG8obWV0YS5saW1pdCwgbWV0YS5vZmZzZXQpO1xuXG4gICAgICAgIHN0YXRlID0gZmFjZXR0ZShhY3Rpb24sIHN0YXRlLCAoaW5uZXJTdGF0ZSkgPT4gKHtcbiAgICAgICAgICAuLi5pbm5lclN0YXRlLFxuICAgICAgICAgIFtwYWdpbmF0ZUJ5XToge1xuICAgICAgICAgICAgLi4uaW5uZXJTdGF0ZVtwYWdpbmF0ZUJ5XSxcbiAgICAgICAgICAgIFtrZXldOiB7XG4gICAgICAgICAgICAgIC4uLihpbm5lclN0YXRlW3BhZ2luYXRlQnldIHx8IHt9KVtrZXldLFxuICAgICAgICAgICAgICBsb2FkaW5nOiB7XG4gICAgICAgICAgICAgICAgLi4uKChpbm5lclN0YXRlW3BhZ2luYXRlQnldIHx8IHt9KVtrZXldIHx8IHt9KS5sb2FkaW5nLFxuICAgICAgICAgICAgICAgIFtmcm9tVG9dOiBmYWxzZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWUgKyAnOjpMT0FEX1BBR0VfU1VDQ0VFREVEJykge1xuICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGEgYXMgYW55IGFzIExvYWRQYWdlU3VjY2VlZGVkTWV0YTtcbiAgICAgICAgY29uc3QgcGFnaW5hdGVCeSA9IHBhZ2luYXRlZEJ5KHBhZ2luYXRlTmFtZShtZXRhLnBhZ2luYXRlQnkpKVxuICAgICAgICBjb25zdCBrZXkgPSBwYWdpbmF0ZUtleShtZXRhLnBhZ2luYXRlQnkpXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gZ2V0U3RhcnQobWV0YS5saW1pdCwgbWV0YS5vZmZzZXQpO1xuICAgICAgICBjb25zdCBmcm9tVG8gPSBnZXRGcm9tVG8obWV0YS5saW1pdCwgbWV0YS5vZmZzZXQpO1xuICAgICAgICBjb25zdCByb3dzID0ge31cbiAgICAgICAgaWYgKG1ldGEucGtzKSB7XG4gICAgICAgICAgbWV0YS5wa3MuZm9yRWFjaCgocGssIGkpID0+IHtcbiAgICAgICAgICAgIHJvd3Nbc3RhcnQgKyBpXSA9IHBrO1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUgPSBmYWNldHRlKGFjdGlvbiwgc3RhdGUsIChpbm5lclN0YXRlKSA9PiAoe1xuICAgICAgICAgIC4uLmlubmVyU3RhdGUsXG4gICAgICAgICAgW3BhZ2luYXRlQnldOiB7XG4gICAgICAgICAgICAuLi5pbm5lclN0YXRlW3BhZ2luYXRlQnldLFxuICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgLi4uKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0sXG4gICAgICAgICAgICAgIGNvdW50OiBtZXRhLmNvdW50IHx8IDAsXG4gICAgICAgICAgICAgIHJvd3M6IHtcbiAgICAgICAgICAgICAgICAuLi4oKGlubmVyU3RhdGVbcGFnaW5hdGVCeV0gfHwge30pW2tleV0gfHwge30pLnJvd3MsXG4gICAgICAgICAgICAgICAgLi4ucm93c1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsb2FkaW5nOiB7XG4gICAgICAgICAgICAgICAgLi4uKChpbm5lclN0YXRlW3BhZ2luYXRlQnldIHx8IHt9KVtrZXldIHx8IHt9KS5sb2FkaW5nLFxuICAgICAgICAgICAgICAgIFtmcm9tVG9dOiBmYWxzZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG5cblxuICAgIHJldHVybiByZWR1Y2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gbWFwIGZvciBwa19lbnRpdHkgLT4gbW9kZWxOYW1lIG9uIHRoZSBsZXZlbCBvZiB0aGUgc2NoZW1hOlxuICAgKiBleGFtcGxlOlxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVFbnRpdHlNb2RlbE1hcFJlZHVjZXJzKG1vZGVsTmFtZSk6IFJlZHVjZXI8dW5rbm93biwgRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1ldGE8TW9kZWw+Pj4ge1xuICAgIGNvbnN0IGFjdGlvblByZWZpeCA9IHRoaXMuYWN0aW9uUHJlZml4O1xuICAgIGNvbnN0IHJlZHVjZXIgPSAoc3RhdGUgPSB7fSwgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWV0YTxNb2RlbD4+KSA9PiB7XG4gICAgICBjb25zdCBtb2RlbFBhdGggPSBhY3Rpb25QcmVmaXggKyAnLicgKyBtb2RlbE5hbWU7XG5cbiAgICAgIGlmICghYWN0aW9uIHx8ICFhY3Rpb24ubWV0YSB8fCAhYWN0aW9uLm1ldGEuaXRlbXMgfHwgIWFjdGlvbi5tZXRhLml0ZW1zLmxlbmd0aCkgcmV0dXJuIHN0YXRlO1xuICAgICAgY29uc3QgaXRlbXMgPSBhY3Rpb24ubWV0YS5pdGVtcztcblxuICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIG1vZGVsUGF0aCArICc6OkxPQURfU1VDQ0VFREVEJzpcbiAgICAgICAgY2FzZSBtb2RlbFBhdGggKyAnOjpVUFNFUlRfU1VDQ0VFREVEJzpcbiAgICAgICAgICBjb25zdCBpZHggPSB7fVxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpXSBhcyBhbnk7XG4gICAgICAgICAgICBpZiAoaXRlbS5wa19lbnRpdHkpIHtcbiAgICAgICAgICAgICAgaWR4W2l0ZW0ucGtfZW50aXR5XSA9IHtcbiAgICAgICAgICAgICAgICBtb2RlbE5hbWUsXG4gICAgICAgICAgICAgICAgZmtDbGFzczogaXRlbS5ma0NsYXNzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIC4uLmlkeFxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIG1vZGVsUGF0aCArICc6OkRFTEVURV9TVUNDRUVERUQnOlxuICAgICAgICBjYXNlIG1vZGVsUGF0aCArICc6OlJFTU9WRV9TVUNDRUVERUQnOlxuICAgICAgICAgIGNvbnN0IHBrRW50aXRpZXMgPSBbXVxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpXSBhcyBhbnk7XG4gICAgICAgICAgICBpZiAoaXRlbS5wa19lbnRpdHkpIHtcbiAgICAgICAgICAgICAgcGtFbnRpdGllcy5wdXNoKGl0ZW0ucGtfZW50aXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhdGUgPSBvbWl0KHBrRW50aXRpZXMsIHN0YXRlKVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcbiAgICByZXR1cm4gcmVkdWNlcjtcbiAgfVxuXG5cbiAgdXBkYXRpbmdCeSA9IChuYW1lOiBzdHJpbmcpID0+ICd1cGRhdGluZ18nICsgYnkobmFtZSk7XG4gIGRlbGV0aW5nQnkgPSAobmFtZTogc3RyaW5nKSA9PiAnZGVsZXRpbmdfJyArIGJ5KG5hbWUpO1xuICByZW1vdmluZ0J5ID0gKG5hbWU6IHN0cmluZykgPT4gJ3JlbW92aW5nXycgKyBieShuYW1lKTtcblxuXG5cbiAgcHJpdmF0ZSBmYWNldHRlKG1vZGVsTmFtZTogYW55LCBjb25maWc6IFJlZHVjZXJDb25maWcpIHtcbiAgICByZXR1cm4gKGFjdGlvbiwgc3RhdGUsIGNiOiAoaW5uZXJTdGF0ZSkgPT4gYW55KSA9PiB7XG4gICAgICBsZXQgb3V0ZXJTdGF0ZTtcbiAgICAgICh7IG91dGVyU3RhdGUsIHN0YXRlIH0gPSB0aGlzLmRlRmFjZXR0ZShtb2RlbE5hbWUsIGNvbmZpZywgYWN0aW9uLCBvdXRlclN0YXRlLCBzdGF0ZSkpO1xuICAgICAgY29uc3QgaW5uZXJTdGF0ZSA9IGNiKHN0YXRlKTtcbiAgICAgIHJldHVybiB0aGlzLmVuRmFjZXR0ZShtb2RlbE5hbWUsIGNvbmZpZywgYWN0aW9uLCBpbm5lclN0YXRlLCBvdXRlclN0YXRlKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBkZUZhY2V0dGUobW9kZWxOYW1lOiBzdHJpbmcsIGNvbmZpZzogUmVkdWNlckNvbmZpZywgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgcGs/OiBudW1iZXI7IH0+LCBvdXRlclN0YXRlOiBhbnksIHN0YXRlOiB7fSkge1xuICAgIGlmICh0aGlzLmlzRmFjZXR0ZUJ5UGsoY29uZmlnLCBhY3Rpb24pKSB7XG4gICAgICAvLyBvdXRlclN0YXRlID0gY2xvbmUoc3RhdGUpO1xuICAgICAgY29uc3QgcGsgPSBhY3Rpb24ubWV0YS5wayB8fCAncmVwbydcbiAgICAgIC8vIHN0YXRlID0gIXN0YXRlW2NvbmZpZy5mYWNldHRlQnlQa10gPyB7fSA6IHN0YXRlW2NvbmZpZy5mYWNldHRlQnlQa11bcGtdIHx8IHt9O1xuICAgICAgY29uc3QgaW5uZXJTdGF0ZSA9ICFzdGF0ZVtjb25maWcuZmFjZXR0ZUJ5UGtdID8ge30gOiBzdGF0ZVtjb25maWcuZmFjZXR0ZUJ5UGtdW3BrXSB8fCB7fTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG91dGVyU3RhdGU6IHN0YXRlLFxuICAgICAgICBzdGF0ZTogaW5uZXJTdGF0ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBvdXRlclN0YXRlLCBzdGF0ZSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBlbkZhY2V0dGUobW9kZWxOYW1lOiBzdHJpbmcsIGNvbmZpZzogUmVkdWNlckNvbmZpZywgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgcGs/OiBudW1iZXI7IH0+LCBzdGF0ZToge30sIG91dGVyU3RhdGU6IGFueSkge1xuICAgIGlmICh0aGlzLmlzRmFjZXR0ZUJ5UGsoY29uZmlnLCBhY3Rpb24pKSB7XG4gICAgICBjb25zdCBwayA9IGFjdGlvbi5tZXRhLnBrIHx8ICdyZXBvJ1xuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLm91dGVyU3RhdGUsXG4gICAgICAgIFtjb25maWcuZmFjZXR0ZUJ5UGtdOiB7XG4gICAgICAgICAgLi4ub3V0ZXJTdGF0ZVtjb25maWcuZmFjZXR0ZUJ5UGtdLFxuICAgICAgICAgIFtwa106IHN0YXRlXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBpc0ZhY2V0dGVCeVBrKGNvbmZpZzogUmVkdWNlckNvbmZpZywgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgcGs/OiBudW1iZXI7IH0+KSB7XG4gICAgaWYgKGNvbmZpZy5mYWNldHRlQnlQaykge1xuICAgICAgaWYgKCFhY3Rpb24ubWV0YSB8fCBhY3Rpb24ubWV0YS5wayA9PT0gdW5kZWZpbmVkKSB0aHJvdyBFcnJvcignRmFjZXR0ZSBhY3Rpb27CoG11c3QgcHJvdmlkZSBwayBmb3IgZmFjZXR0ZScpO1xuICAgICAgZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG5cbiAgZGVsZXRlSXRlbXNGcm9tU3RhdGUoY29uZmlnOiBSZWR1Y2VyQ29uZmlnLCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7IGl0ZW1zOiBNb2RlbFtdOyB9Piwgc3RhdGUpIHtcbiAgICBjb25zdCBpdGVtcyA9IGFjdGlvbi5tZXRhLml0ZW1zO1xuICAgIC8vIGxldCBzdGF0ZSA9IHt9XG4gICAgY29uc3QgZ3JvdXBCeXMgPSAhKGNvbmZpZy5ncm91cEJ5ICYmIGNvbmZpZy5ncm91cEJ5Lmxlbmd0aCkgPyBbXSA6IGNvbmZpZy5ncm91cEJ5O1xuICAgIGNvbnN0IGdyb3VwcyA9IGdyb3VwQnlzLm1hcChpID0+ICh7XG4gICAgICBncm91cEJ5S2V5OiBieShpLmtleUluU3RvcmUpLFxuICAgICAgZ3JvdXBCeUZuOiBpLmdyb3VwQnlGbixcbiAgICB9KSlcbiAgICBjb25zdCBtYWluSW5kZXhLZXkgPSBieShjb25maWcuaW5kZXhCeS5rZXlJblN0b3JlKTsgLy8gZmlyc3Qgc2VnbWVudCBlLmcuICdieV9wa19lbnRpdHknXG5cbiAgICBpdGVtcy5mb3JFYWNoKChyZW1vdmVkSXRlbSkgPT4ge1xuICAgICAgLy8gZ2V0IHBhdGggc2VnbWVudHMgb2YgbmV3IGl0ZW1cbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBjb25maWcuaW5kZXhCeS5pbmRleEJ5Rm4ocmVtb3ZlZEl0ZW0pOyAvLyBzZWNvbmQgc2VnbWVudCBlLmcuICc4MDcwNjAnXG5cbiAgICAgIC8vIGdldCBvbGQgaXRlbSwgaWYgZXhpc3RzXG4gICAgICBjb25zdCBvbGRJdGVtID0gc3RhdGVbbWFpbkluZGV4S2V5XSA/IHN0YXRlW21haW5JbmRleEtleV1baXRlbUtleV0gOiB1bmRlZmluZWQ7XG5cbiAgICAgIC8vIFE6IERvZXMgdGhlIGl0ZW0gZXhpc3RzP1xuICAgICAgaWYgKG9sZEl0ZW0pIHtcbiAgICAgICAgLy8gQTogWWVzLiB1c2Ugb2xkIGl0ZW0gZG9lcyBleGlzdFxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgcmVtb3ZlZEl0ZW0gYXQgcGF0aCBpbiBtYWluIGluZGV4XG4gICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIFttYWluSW5kZXhLZXldOiB7XG4gICAgICAgICAgICAuLi5vbWl0KFtpdGVtS2V5XSwgc3RhdGVbbWFpbkluZGV4S2V5XSksXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVsZXRlIHRoZSByZW1vdmVkSXRlbSBhdCBwYXRoIGluIHRoZSBncm91cCBpbmRleFxuICAgICAgICBncm91cHMuZm9yRWFjaChnID0+IHtcbiAgICAgICAgICBjb25zdCBncm91cEtleSA9IHRoaXMuZ2V0R3JvdXBLZXlPZkl0ZW0oZy5ncm91cEJ5Rm4sIHJlbW92ZWRJdGVtKVxuICAgICAgICAgIHN0YXRlID0ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBbZy5ncm91cEJ5S2V5XToge1xuICAgICAgICAgICAgICAuLi5zdGF0ZVtnLmdyb3VwQnlLZXldLFxuICAgICAgICAgICAgICBbZ3JvdXBLZXldOiB7XG4gICAgICAgICAgICAgICAgLi4ub21pdChbaXRlbUtleV0sIChzdGF0ZVtnLmdyb3VwQnlLZXldIHx8IHt9KVtncm91cEtleV0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gLy8gY2xlYW51cCBwYWdpbmF0aW9uc1xuICAgICAgICAgIC8vIHN0YXRlID0gdGhpcy5yZXNldFBhZ2luYXRpb25zQnlHcm91cChnLmdyb3VwQnlLZXksIHN0YXRlLCBncm91cEtleSk7XG5cbiAgICAgICAgfSlcbiAgICAgIH1cblxuXG4gICAgfSlcblxuICAgIC8vIGNsZWFudXAgbWFpbiBpbmRleFxuICAgIGlmIChPYmplY3Qua2V5cyhzdGF0ZVttYWluSW5kZXhLZXldKS5sZW5ndGggPCAxKSB7XG4gICAgICBzdGF0ZSA9IHsgLi4ub21pdChbbWFpbkluZGV4S2V5XSwgc3RhdGUpIH1cbiAgICB9XG4gICAgLy8gY2xlYW51cCBncm91cCBpbmRpY2VzXG4gICAgZ3JvdXBzLmZvckVhY2goZyA9PiB7XG5cbiAgICAgIC8vIGNsZWFudXAgZ3JvdXBzIGluIGdyb3VwIGluZGV4XG4gICAgICBPYmplY3Qua2V5cyhzdGF0ZVtnLmdyb3VwQnlLZXldKS5mb3JFYWNoKGdyb3VwS2V5ID0+IHtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoc3RhdGVbZy5ncm91cEJ5S2V5XVtncm91cEtleV0pLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgW2cuZ3JvdXBCeUtleV06IG9taXQoW2dyb3VwS2V5XSwgc3RhdGVbZy5ncm91cEJ5S2V5XSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIC8vIGNsZWFudXAgZ3JvdXAgaW5kZXhcbiAgICAgIGlmIChPYmplY3Qua2V5cyhzdGF0ZVtnLmdyb3VwQnlLZXldKS5sZW5ndGggPCAxKSB7XG4gICAgICAgIHN0YXRlID0geyAuLi5vbWl0KFtnLmdyb3VwQnlLZXldLCBzdGF0ZSkgfVxuICAgICAgfVxuICAgIH0pXG5cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIG1lcmdlSXRlbXNJblN0YXRlKGNvbmZpZzogUmVkdWNlckNvbmZpZywgc3RhdGUsIGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIHsgaXRlbXM6IE1vZGVsW107IH0+XG4gICAgLy8gLCByZXNldFBhZ2luYXRpb25zID0gZmFsc2VcbiAgKSB7XG4gICAgY29uc3QgaXRlbXMgPSBhY3Rpb24ubWV0YS5pdGVtcztcbiAgICBjb25zdCBncm91cEJ5cyA9ICEoY29uZmlnLmdyb3VwQnkgJiYgY29uZmlnLmdyb3VwQnkubGVuZ3RoKSA/IFtdIDogY29uZmlnLmdyb3VwQnk7XG4gICAgY29uc3QgZ3JvdXBzID0gZ3JvdXBCeXMubWFwKGkgPT4gKHtcbiAgICAgIGdyb3VwQnlLZXk6IGJ5KGkua2V5SW5TdG9yZSksXG4gICAgICBncm91cEJ5Rm46IGkuZ3JvdXBCeUZuLFxuICAgIH0pKVxuXG4gICAgY29uc3QgbWFpbkluZGV4S2V5ID0gYnkoY29uZmlnLmluZGV4Qnkua2V5SW5TdG9yZSk7IC8vIGZpcnN0IHNlZ21lbnQgZS5nLiAnYnlfcGtfZW50aXR5J1xuXG4gICAgaXRlbXMuZm9yRWFjaCgobmV3SXRlbSkgPT4ge1xuICAgICAgLy8gZ2V0IHBhdGggc2VnbWVudHMgb2YgbmV3IGl0ZW1cbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBjb25maWcuaW5kZXhCeS5pbmRleEJ5Rm4obmV3SXRlbSk7IC8vIHNlY29uZCBzZWdtZW50IGUuZy4gJzgwNzA2MCdcblxuICAgICAgLy8gZ2V0IG9sZCBpdGVtLCBpZiBleGlzdHNcbiAgICAgIGNvbnN0IG9sZEl0ZW0gPSBzdGF0ZVttYWluSW5kZXhLZXldID8gc3RhdGVbbWFpbkluZGV4S2V5XVtpdGVtS2V5XSA6IHVuZGVmaW5lZDtcblxuICAgICAgbGV0IGl0ZW1Ub1NldDtcblxuICAgICAgLy8gUTogRG9lcyB0aGUgaXRlbSBleGlzdHMsIGFuZCBpcyBpdCBkZWVwbHktZXF1YWwgdG8gdGhlIG5ldyBpdGVtP1xuICAgICAgY29uc3QgZXF1YWxzRm4gPSBjb25maWcuZXF1YWxzIHx8IGVxdWFsc1xuICAgICAgaWYgKG9sZEl0ZW0gJiYgZXF1YWxzRm4obmV3SXRlbSwgb2xkSXRlbSkpIHtcbiAgICAgICAgLy8gQTogWWVzLiB1c2Ugb2xkIGl0ZW0gYXMgaXRlbVRvU2V0XG4gICAgICAgIGl0ZW1Ub1NldCA9IG9sZEl0ZW07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gQTogTm8uIHVzZSBuZXcgaXRlbSBhcyBpdGVtVG9TZXRcbiAgICAgICAgaXRlbVRvU2V0ID0gbmV3SXRlbTtcblxuICAgICAgICAvLyBwdXQgdGhlIGl0ZW1Ub1NldCBhdCBwYXRoIGluIG1haW4gaW5kZXhcbiAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgW21haW5JbmRleEtleV06IHtcbiAgICAgICAgICAgIC4uLnN0YXRlW21haW5JbmRleEtleV0sXG4gICAgICAgICAgICBbaXRlbUtleV06IGl0ZW1Ub1NldFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGl0ZXJhdGUgb3ZlciB0aGUgZ3JvdXAgaW5kZXhlc1xuICAgICAgICBncm91cHMuZm9yRWFjaChnID0+IHtcbiAgICAgICAgICAvLyByZW1vdmUgdGhlIG9sZEl0ZW0gZnJvbSBhbGwgZ3JvdXAgaW5kZXhlc1xuICAgICAgICAgIGNvbnN0IG9sZEdyb3VwS2V5ID0gdGhpcy5nZXRHcm91cEtleU9mSXRlbShnLmdyb3VwQnlGbiwgb2xkSXRlbSlcbiAgICAgICAgICBzdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgW2cuZ3JvdXBCeUtleV06IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGVbZy5ncm91cEJ5S2V5XSxcbiAgICAgICAgICAgICAgW29sZEdyb3VwS2V5XToge1xuICAgICAgICAgICAgICAgIC4uLm9taXQoW2l0ZW1LZXldLCAoc3RhdGVbZy5ncm91cEJ5S2V5XSB8fCB7fSlbb2xkR3JvdXBLZXldKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gYWRkIHRoZSBpdGVtVG9TZXQgdG8gYWxsIGdyb3VwIGluZGV4ZXMsIGlmIG5vdCB1bmRlZmluZWRcbiAgICAgICAgICBjb25zdCBuZXdHcm91cEtleSA9IHRoaXMuZ2V0R3JvdXBLZXlPZkl0ZW0oZy5ncm91cEJ5Rm4sIGl0ZW1Ub1NldClcbiAgICAgICAgICBpZiAobmV3R3JvdXBLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3RhdGUgPSB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICBbZy5ncm91cEJ5S2V5XToge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlW2cuZ3JvdXBCeUtleV0sXG4gICAgICAgICAgICAgICAgW25ld0dyb3VwS2V5XToge1xuICAgICAgICAgICAgICAgICAgLi4uKHN0YXRlW2cuZ3JvdXBCeUtleV0gfHwge30pW25ld0dyb3VwS2V5XSxcbiAgICAgICAgICAgICAgICAgIFtpdGVtS2V5XTogaXRlbVRvU2V0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcblxuXG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cblxuICAvLyAvKipcbiAgLy8gICogcmVzZXRzIHBhZ2luYXRpb24gd2l0aGluIGEgZ3JvdXAsIGUuZy4gJ3BhZ19ieV9ma19wcm9wZXJ0eSdcbiAgLy8gICogVE9ETzogY2hlY2sgaWYgY2FuIGJlIGRlbGV0ZWRcbiAgLy8gICovXG4gIC8vIHByaXZhdGUgcmVzZXRQYWdpbmF0aW9uc0J5R3JvdXAoZ3JvdXBCeUtleTogc3RyaW5nLCBzdGF0ZTogYW55LCBncm91cEtleTogYW55LCBpc1Vwc2VydCA9IGZhbHNlKSB7XG4gIC8vICAgY29uc3QgcGFnaW5hdGVCeSA9IHBhZyhncm91cEJ5S2V5KTtcbiAgLy8gICBpZiAoc3RhdGVbcGFnaW5hdGVCeV0gJiYgc3RhdGVbcGFnaW5hdGVCeV1bZ3JvdXBLZXldICYmIHN0YXRlW3BhZ2luYXRlQnldW2dyb3VwS2V5XS5jb3VudCAhPT0gdW5kZWZpbmVkKSB7XG4gIC8vICAgICBzdGF0ZSA9IHtcbiAgLy8gICAgICAgLi4uc3RhdGUsXG4gIC8vICAgICAgIFtwYWdpbmF0ZUJ5XToge1xuICAvLyAgICAgICAgIC4uLnN0YXRlW3BhZ2luYXRlQnldLFxuICAvLyAgICAgICAgIFtncm91cEtleV06IHtcbiAgLy8gICAgICAgICAgIC4uLnN0YXRlW3BhZ2luYXRlQnldW2dyb3VwS2V5XSxcbiAgLy8gICAgICAgICAgIC4uLighaXNVcHNlcnQgPyB7fSA6IHsgY291bnQ6IHN0YXRlW3BhZ2luYXRlQnldW2dyb3VwS2V5XS5jb3VudCArIDEgfSksXG4gIC8vICAgICAgICAgICByb3dzOiB7fSxcbiAgLy8gICAgICAgICAgIGxvYWRpbmc6IHt9XG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICB9XG4gIC8vICAgICB9O1xuICAvLyAgIH1cbiAgLy8gICByZXR1cm4gc3RhdGU7XG4gIC8vIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBvYmplY3Qgd2hlcmUgdGhlIGtleSByZXR1cm5lZCBieSB0aGUgY29uZmlndXJlZCBpbmRleEJ5Rm5cbiAgICovXG4gIHByaXZhdGUgaW5kZXhLZXlPYmplY3QoYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgeyBpdGVtczogTW9kZWxbXTsgfT4sIGNvbmZpZzogUmVkdWNlckNvbmZpZykge1xuICAgIHJldHVybiBpbmRleEJ5KChpKSA9PiAoaSksIGFjdGlvbi5tZXRhLml0ZW1zXG4gICAgICAvLyBmaWx0ZXIgaXRlbXMgdGhhdCBhcmUgbm90ICh5ZXQpIGluZGV4YWJsZS4gVGhpcyBpcyBub3JtYWxseSB0aGUgY2FzZSwgd2hlbiBjcmVhdGluZyBuZXcgaXRlbXMgdGhhdCBoYXZlIG5vIHBrIHlldC5cbiAgICAgIC5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uZmlnLmluZGV4QnkuaW5kZXhCeUZuKGl0ZW0pO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5tYXAoaXRlbSA9PiBjb25maWcuaW5kZXhCeS5pbmRleEJ5Rm4oaXRlbSkpKTtcbiAgfVxuXG4gIGdyb3VwQnkoaXRlbXM6IGFueVtdLCBncm91cEJ5Rm46IChpdGVtKSA9PiBzdHJpbmcsIGluZGV4QnlGbjogKGl0ZW0pID0+IHN0cmluZykge1xuICAgIGNvbnN0IGdyb3VwcyA9IHt9XG4gICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIC8vIGlmIHRoZSBncm91cCBieSBrZXkgaXMgbm90IHBvc3NpYmxlIHRvIGNyZWF0ZSwgdGhlIGl0ZW0gd29uJ3QgYmUgYWRkZWQgdG8gdGhlIGluZGV4XG4gICAgICBjb25zdCBncm91cEtleSA9IHRoaXMuZ2V0R3JvdXBLZXlPZkl0ZW0oZ3JvdXBCeUZuLCBpdGVtKTtcblxuICAgICAgaWYgKGdyb3VwS2V5KSB7XG4gICAgICAgIGNvbnN0IGluZGV4S2V5ID0gaW5kZXhCeUZuKGl0ZW0pO1xuICAgICAgICBncm91cHNbZ3JvdXBLZXldID0geyAuLi5ncm91cHNbZ3JvdXBLZXldLCAuLi57IFtpbmRleEtleV06IGl0ZW0gfSB9XG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZ3JvdXBzO1xuICB9XG5cblxuXG5cbiAgcHJpdmF0ZSBnZXRHcm91cEtleU9mSXRlbShncm91cEJ5Rm46IChpdGVtOiBhbnkpID0+IHN0cmluZywgaXRlbTogYW55KTogc3RyaW5nIHtcbiAgICBsZXQgZ3JvdXBLZXlcbiAgICB0cnkge1xuICAgICAgZ3JvdXBLZXkgPSBncm91cEJ5Rm4oaXRlbSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgIH1cbiAgICByZXR1cm4gZ3JvdXBLZXk7XG4gIH1cbn1cbiJdfQ==