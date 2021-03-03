/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/inf.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { getFromTo, indexStatementByObject, indexStatementByObjectProperty, indexStatementBySubject, indexStatementBySubjectProperty, infDefinitions, infRoot, paginateBy, PR_ENTITY_MODEL_MAP, subfieldIdToString } from '@kleiolab/lib-redux';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { values } from 'd3';
import { of, pipe } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
var Selector = /** @class */ (function () {
    function Selector(ngRedux, pkProject$, configs, model) {
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.configs = configs;
        this.model = model;
    }
    /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    Selector.prototype.selector = /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    function (indexKey) {
        var _this = this;
        /** @type {?} */
        var all$ = this.ngRedux.select([infRoot, this.model, indexKey]);
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return _this.ngRedux.select([infRoot, _this.model, indexKey, x]);
        });
        return { all$: all$, key: key };
    };
    /**
     * @template M
     * @return {?}
     */
    Selector.prototype.paginationSelector = /**
     * @template M
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var pipePage = (/**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            /** @type {?} */
            var path;
            /** @type {?} */
            var pagBy = paginateBy;
            /** @type {?} */
            var key = subfieldIdToString(page);
            path = [infRoot, _this.model, pagBy, key];
            return _this.ngRedux.select(tslib_1.__spread(path, ['count']))
                .pipe(filter((/**
             * @param {?} count
             * @return {?}
             */
            function (count) { return count !== undefined; })), switchMap((/**
             * @param {?} count
             * @return {?}
             */
            function (count) {
                /** @type {?} */
                var start = page.offset;
                /** @type {?} */
                var end = count <= (start + page.limit) ? count : (start + page.limit);
                /** @type {?} */
                var obs$ = [];
                for (var i = start; i < end; i++) {
                    obs$.push(_this.ngRedux.select(tslib_1.__spread(path, ['rows', i])).pipe(filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return !!x; }))));
                }
                return combineLatestOrEmpty(obs$);
            })));
        });
        /** @type {?} */
        var pipePageLoadNeeded = (/**
         * @param {?} page
         * @param {?} trigger$
         * @return {?}
         */
        function (page, trigger$) {
            /** @type {?} */
            var path;
            /** @type {?} */
            var pagBy = paginateBy;
            /** @type {?} */
            var key = subfieldIdToString(page);
            path = [infRoot, _this.model, pagBy, key];
            /** @type {?} */
            var fromToString = getFromTo(page.limit, page.offset);
            return trigger$.pipe(switchMap((/**
             * @return {?}
             */
            function () { return _this.ngRedux.select(tslib_1.__spread(path, ['loading', fromToString]))
                .pipe(first(), map((/**
             * @param {?} loading
             * @return {?}
             */
            function (loading) { return !loading; }))); })));
        });
        /** @type {?} */
        var pipeCount = (/**
         * @param {?} page
         * @return {?}
         */
        function (page) {
            /** @type {?} */
            var path;
            /** @type {?} */
            var pagBy = paginateBy;
            /** @type {?} */
            var key = subfieldIdToString(page);
            path = [infRoot, _this.model, pagBy, key];
            return _this.ngRedux.select(tslib_1.__spread(path, ['count']));
        });
        return { pipePage: pipePage, pipeCount: pipeCount, pipePageLoadNeeded: pipePageLoadNeeded };
    };
    /**
     * @template M
     * @param {?} pkProject$
     * @param {?} getFkEntity
     * @return {?}
     */
    Selector.prototype.pipeItemsInProject = /**
     * @template M
     * @param {?} pkProject$
     * @param {?} getFkEntity
     * @return {?}
     */
    function (pkProject$, getFkEntity) {
        var _this = this;
        return pipe(switchMap((/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            return pkProject$.pipe(switchMap((/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var proRelsAndKey$ = [];
                var _loop_1 = function (k) {
                    if (items.hasOwnProperty(k)) {
                        /** @type {?} */
                        var item = items[k];
                        proRelsAndKey$.push(_this.ngRedux.select(['pro', 'info_proj_rel', 'by_fk_project__fk_entity', pkProject + '_' + getFkEntity(item)])
                            .pipe(map((/**
                         * @param {?} rel
                         * @return {?}
                         */
                        function (rel) { return ({ key: k, rel: rel }); }))));
                    }
                };
                for (var k in items) {
                    _loop_1(k);
                }
                return combineLatestOrEmpty(proRelsAndKey$).pipe(map((/**
                 * @param {?} proRels
                 * @return {?}
                 */
                function (proRels) {
                    /** @type {?} */
                    var itemsInProject = {};
                    for (var i = 0; i < proRels.length; i++) {
                        /** @type {?} */
                        var proRel = proRels[i];
                        if (proRel.rel && proRel.rel.is_in_project) {
                            itemsInProject[proRel.key] = items[proRel.key];
                        }
                    }
                    return itemsInProject;
                })));
            })));
        })));
    };
    /**
     * @template M
     * @param {?} pkProject$
     * @param {?} getFkEntity
     * @return {?}
     */
    Selector.prototype.pipeItemInProject = /**
     * @template M
     * @param {?} pkProject$
     * @param {?} getFkEntity
     * @return {?}
     */
    function (pkProject$, getFkEntity) {
        var _this = this;
        return pipe(switchMap((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!item)
                return of(undefined);
            return pkProject$.pipe(switchMap((/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var proRel$ = _this.ngRedux.select(['pro', 'info_proj_rel', 'by_fk_project__fk_entity', pkProject + '_' + getFkEntity(item)]);
                return proRel$.pipe(
                // filter(proRel => proRel.is_in_project == true),
                map((/**
                 * @param {?} proRel
                 * @return {?}
                 */
                function (proRel) { return proRel && proRel.is_in_project == true ? item : undefined; })));
            })));
        })));
    };
    return Selector;
}());
if (false) {
    /** @type {?} */
    Selector.prototype.ngRedux;
    /** @type {?} */
    Selector.prototype.pkProject$;
    /** @type {?} */
    Selector.prototype.configs;
    /** @type {?} */
    Selector.prototype.model;
}
var InfPersistentItemSelections = /** @class */ (function (_super) {
    tslib_1.__extends(InfPersistentItemSelections, _super);
    function InfPersistentItemSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this._by_pk_entity$ = _this.selector('by_pk_entity');
        _this._by_fk_class$ = _this.selector('by_fk_class');
        return _this;
    }
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfPersistentItemSelections.prototype.by_pk_entity_key$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.pk_entity; })));
        return selection$;
    };
    /**
     * @param {?=} ofProject
     * @return {?}
     */
    InfPersistentItemSelections.prototype.by_pk_entity_all$ = /**
     * @param {?=} ofProject
     * @return {?}
     */
    function (ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_pk_entity$.all$;
        if (ofProject)
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.pk_entity; })));
        return selection$;
    };
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfPersistentItemSelections.prototype.by_fk_class_key$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_fk_class$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.pk_entity; })));
        return selection$;
    };
    return InfPersistentItemSelections;
}(Selector));
if (false) {
    /**
     * @type {?}
     * @private
     */
    InfPersistentItemSelections.prototype._by_pk_entity$;
    /**
     * @type {?}
     * @private
     */
    InfPersistentItemSelections.prototype._by_fk_class$;
    /** @type {?} */
    InfPersistentItemSelections.prototype.ngRedux;
    /** @type {?} */
    InfPersistentItemSelections.prototype.pkProject$;
    /** @type {?} */
    InfPersistentItemSelections.prototype.configs;
    /** @type {?} */
    InfPersistentItemSelections.prototype.model;
}
var InfTemporalEntitySelections = /** @class */ (function (_super) {
    tslib_1.__extends(InfTemporalEntitySelections, _super);
    // public by_fk_class$ = this.selector<ByPk<InfTemporalEntity>>('by_fk_class')
    function InfTemporalEntitySelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this._by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfTemporalEntitySelections.prototype.by_pk_entity_key$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.pk_entity; })));
        return selection$;
    };
    return InfTemporalEntitySelections;
}(Selector));
if (false) {
    /**
     * @type {?}
     * @private
     */
    InfTemporalEntitySelections.prototype._by_pk_entity$;
    /** @type {?} */
    InfTemporalEntitySelections.prototype.ngRedux;
    /** @type {?} */
    InfTemporalEntitySelections.prototype.pkProject$;
    /** @type {?} */
    InfTemporalEntitySelections.prototype.configs;
    /** @type {?} */
    InfTemporalEntitySelections.prototype.model;
}
var InfStatementSelections = /** @class */ (function (_super) {
    tslib_1.__extends(InfStatementSelections, _super);
    function InfStatementSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_subject_data$ = _this.selector('by_fk_subject_data');
        _this.pagination$ = _this.paginationSelector();
        return _this;
    }
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_pk_entity_key$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this.by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.pk_entity; })));
        return selection$;
    };
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_subject$ = /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    function (foreignKeys, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var key = indexStatementBySubject(foreignKeys);
        /** @type {?} */
        var selection$ = this.selector('by_subject').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.pk_entity; })), map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return values(items); })));
        }
        return selection$.pipe(map((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return values(items); })));
    };
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_subject_and_property$ = /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    function (foreignKeys, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        return this.by_subject_and_property_indexed$(foreignKeys, ofProject).pipe(map((/**
         * @param {?} statementIdx
         * @return {?}
         */
        function (statementIdx) { return values(statementIdx); })));
    };
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_subject_and_property_indexed$ = /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    function (foreignKeys, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var key = indexStatementBySubjectProperty(foreignKeys);
        /** @type {?} */
        var selection$ = this.selector('by_subject+property').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.pk_entity; })));
        }
        return selection$;
    };
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_object$ = /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    function (foreignKeys, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var key = indexStatementByObject(foreignKeys);
        /** @type {?} */
        var selection$ = this.selector('by_object').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.pk_entity; })), map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return values(items); })));
        }
        return selection$.pipe(map((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return values(items); })));
    };
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_object_and_property$ = /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    function (foreignKeys, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        return this.by_object_and_property_indexed$(foreignKeys, ofProject).pipe(map((/**
         * @param {?} statementIdx
         * @return {?}
         */
        function (statementIdx) { return values(statementIdx); })));
    };
    /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    InfStatementSelections.prototype.by_object_and_property_indexed$ = /**
     * @param {?} foreignKeys
     * @param {?=} ofProject
     * @return {?}
     */
    function (foreignKeys, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var key = indexStatementByObjectProperty(foreignKeys);
        /** @type {?} */
        var selection$ = this.selector('by_object+property').key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.pk_entity; })));
        }
        return selection$;
    };
    return InfStatementSelections;
}(Selector));
if (false) {
    /** @type {?} */
    InfStatementSelections.prototype.by_pk_entity$;
    /** @type {?} */
    InfStatementSelections.prototype.by_fk_subject_data$;
    /** @type {?} */
    InfStatementSelections.prototype.pagination$;
    /** @type {?} */
    InfStatementSelections.prototype.ngRedux;
    /** @type {?} */
    InfStatementSelections.prototype.pkProject$;
    /** @type {?} */
    InfStatementSelections.prototype.configs;
    /** @type {?} */
    InfStatementSelections.prototype.model;
}
var InfTextPropertySelections = /** @class */ (function (_super) {
    tslib_1.__extends(InfTextPropertySelections, _super);
    function InfTextPropertySelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this._by_pk_entity$ = _this.selector('by_pk_entity');
        _this._by_fk_concerned_entity__fk_class_field$ = _this.selector('by_fk_concerned_entity__fk_class_field');
        _this._by_fk_concerned_entity$ = _this.selector('by_fk_concerned_entity');
        return _this;
    }
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfTextPropertySelections.prototype.by_pk_entity_key$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_pk_entity$.key(key);
        if (ofProject)
            return selection$.pipe(this.pipeItemInProject(this.pkProject$, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.pk_entity; })));
        return selection$;
    };
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfTextPropertySelections.prototype.by_fk_concerned_entity__fk_class_field_indexed$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_fk_concerned_entity__fk_class_field$.key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.pk_entity; })));
        }
        return selection$;
    };
    /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    InfTextPropertySelections.prototype.by_fk_concerned_entity_indexed$ = /**
     * @param {?} key
     * @param {?=} ofProject
     * @return {?}
     */
    function (key, ofProject) {
        if (ofProject === void 0) { ofProject = true; }
        /** @type {?} */
        var selection$ = this._by_fk_concerned_entity$.key(key);
        if (ofProject) {
            return selection$.pipe(this.pipeItemsInProject(this.pkProject$, (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.pk_entity; })));
        }
        return selection$;
    };
    return InfTextPropertySelections;
}(Selector));
if (false) {
    /**
     * @type {?}
     * @private
     */
    InfTextPropertySelections.prototype._by_pk_entity$;
    /**
     * @type {?}
     * @private
     */
    InfTextPropertySelections.prototype._by_fk_concerned_entity__fk_class_field$;
    /**
     * @type {?}
     * @private
     */
    InfTextPropertySelections.prototype._by_fk_concerned_entity$;
    /** @type {?} */
    InfTextPropertySelections.prototype.ngRedux;
    /** @type {?} */
    InfTextPropertySelections.prototype.pkProject$;
    /** @type {?} */
    InfTextPropertySelections.prototype.configs;
    /** @type {?} */
    InfTextPropertySelections.prototype.model;
}
var InfAppellationSelections = /** @class */ (function (_super) {
    tslib_1.__extends(InfAppellationSelections, _super);
    function InfAppellationSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return InfAppellationSelections;
}(Selector));
if (false) {
    /** @type {?} */
    InfAppellationSelections.prototype.by_pk_entity$;
    /** @type {?} */
    InfAppellationSelections.prototype.ngRedux;
    /** @type {?} */
    InfAppellationSelections.prototype.pkProject$;
    /** @type {?} */
    InfAppellationSelections.prototype.configs;
    /** @type {?} */
    InfAppellationSelections.prototype.model;
}
var InfLangStringSelections = /** @class */ (function (_super) {
    tslib_1.__extends(InfLangStringSelections, _super);
    function InfLangStringSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return InfLangStringSelections;
}(Selector));
if (false) {
    /** @type {?} */
    InfLangStringSelections.prototype.by_pk_entity$;
    /** @type {?} */
    InfLangStringSelections.prototype.ngRedux;
    /** @type {?} */
    InfLangStringSelections.prototype.pkProject$;
    /** @type {?} */
    InfLangStringSelections.prototype.configs;
    /** @type {?} */
    InfLangStringSelections.prototype.model;
}
var InfPlaceSelections = /** @class */ (function (_super) {
    tslib_1.__extends(InfPlaceSelections, _super);
    function InfPlaceSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return InfPlaceSelections;
}(Selector));
if (false) {
    /** @type {?} */
    InfPlaceSelections.prototype.by_pk_entity$;
    /** @type {?} */
    InfPlaceSelections.prototype.ngRedux;
    /** @type {?} */
    InfPlaceSelections.prototype.pkProject$;
    /** @type {?} */
    InfPlaceSelections.prototype.configs;
    /** @type {?} */
    InfPlaceSelections.prototype.model;
}
var InfTimePrimitiveSelections = /** @class */ (function (_super) {
    tslib_1.__extends(InfTimePrimitiveSelections, _super);
    function InfTimePrimitiveSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return InfTimePrimitiveSelections;
}(Selector));
if (false) {
    /** @type {?} */
    InfTimePrimitiveSelections.prototype.by_pk_entity$;
    /** @type {?} */
    InfTimePrimitiveSelections.prototype.ngRedux;
    /** @type {?} */
    InfTimePrimitiveSelections.prototype.pkProject$;
    /** @type {?} */
    InfTimePrimitiveSelections.prototype.configs;
    /** @type {?} */
    InfTimePrimitiveSelections.prototype.model;
}
var InfLanguageSelections = /** @class */ (function (_super) {
    tslib_1.__extends(InfLanguageSelections, _super);
    function InfLanguageSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return InfLanguageSelections;
}(Selector));
if (false) {
    /** @type {?} */
    InfLanguageSelections.prototype.by_pk_entity$;
    /** @type {?} */
    InfLanguageSelections.prototype.ngRedux;
    /** @type {?} */
    InfLanguageSelections.prototype.pkProject$;
    /** @type {?} */
    InfLanguageSelections.prototype.configs;
    /** @type {?} */
    InfLanguageSelections.prototype.model;
}
var InfDimensionSelections = /** @class */ (function (_super) {
    tslib_1.__extends(InfDimensionSelections, _super);
    function InfDimensionSelections(ngRedux, pkProject$, configs, model) {
        var _this = _super.call(this, ngRedux, pkProject$, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.pkProject$ = pkProject$;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return InfDimensionSelections;
}(Selector));
if (false) {
    /** @type {?} */
    InfDimensionSelections.prototype.by_pk_entity$;
    /** @type {?} */
    InfDimensionSelections.prototype.ngRedux;
    /** @type {?} */
    InfDimensionSelections.prototype.pkProject$;
    /** @type {?} */
    InfDimensionSelections.prototype.configs;
    /** @type {?} */
    InfDimensionSelections.prototype.model;
}
var InfSelector = /** @class */ (function () {
    function InfSelector(ngRedux, pkProject$) {
        this.ngRedux = ngRedux;
        this.pkProject$ = pkProject$;
        this.persistent_item$ = new InfPersistentItemSelections(this.ngRedux, this.pkProject$, infDefinitions, 'persistent_item');
        this.temporal_entity$ = new InfTemporalEntitySelections(this.ngRedux, this.pkProject$, infDefinitions, 'temporal_entity');
        this.statement$ = new InfStatementSelections(this.ngRedux, this.pkProject$, infDefinitions, 'statement');
        this.appellation$ = new InfAppellationSelections(this.ngRedux, this.pkProject$, infDefinitions, 'appellation');
        this.place$ = new InfPlaceSelections(this.ngRedux, this.pkProject$, infDefinitions, 'place');
        this.text_property$ = new InfTextPropertySelections(this.ngRedux, this.pkProject$, infDefinitions, 'text_property');
        this.lang_string$ = new InfLangStringSelections(this.ngRedux, this.pkProject$, infDefinitions, 'lang_string');
        this.time_primitive$ = new InfTimePrimitiveSelections(this.ngRedux, this.pkProject$, infDefinitions, 'time_primitive');
        this.language$ = new InfLanguageSelections(this.ngRedux, this.pkProject$, infDefinitions, 'language');
        this.dimension$ = new InfDimensionSelections(this.ngRedux, this.pkProject$, infDefinitions, 'dimension');
        this.pkEntityModelMap$ = this.ngRedux.select([infRoot, PR_ENTITY_MODEL_MAP]);
    }
    /**
     * @param {?} pkEntity
     * @return {?}
     */
    InfSelector.prototype.getModelOfEntity$ = /**
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.ngRedux.select([infRoot, PR_ENTITY_MODEL_MAP, pkEntity]);
    };
    return InfSelector;
}());
export { InfSelector };
if (false) {
    /** @type {?} */
    InfSelector.prototype.persistent_item$;
    /** @type {?} */
    InfSelector.prototype.temporal_entity$;
    /** @type {?} */
    InfSelector.prototype.statement$;
    /** @type {?} */
    InfSelector.prototype.appellation$;
    /** @type {?} */
    InfSelector.prototype.place$;
    /** @type {?} */
    InfSelector.prototype.text_property$;
    /** @type {?} */
    InfSelector.prototype.lang_string$;
    /** @type {?} */
    InfSelector.prototype.time_primitive$;
    /** @type {?} */
    InfSelector.prototype.language$;
    /** @type {?} */
    InfSelector.prototype.dimension$;
    /** @type {?} */
    InfSelector.prototype.pkEntityModelMap$;
    /** @type {?} */
    InfSelector.prototype.ngRedux;
    /** @type {?} */
    InfSelector.prototype.pkProject$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvaW5mLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUE2QixTQUFTLEVBQXFDLHNCQUFzQixFQUFrQyw4QkFBOEIsRUFBMkIsdUJBQXVCLEVBQW1DLCtCQUErQixFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUEyQixrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR2phLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDNUIsT0FBTyxFQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRy9EO0lBQ0Usa0JBQ1MsT0FBMkIsRUFDM0IsVUFBdUMsRUFDdkMsT0FBZ0MsRUFDaEMsS0FBYTtRQUhiLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLGVBQVUsR0FBVixVQUFVLENBQTZCO1FBQ3ZDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7SUFDbEIsQ0FBQzs7Ozs7O0lBRUwsMkJBQVE7Ozs7O0lBQVIsVUFBWSxRQUFnQjtRQUE1QixpQkFPQzs7WUFMTyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7WUFDcEUsR0FBRzs7OztRQUFHLFVBQUMsQ0FBQztZQUNaLE9BQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQyxN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LENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDOzs7O0lBbEJDLHVDQUFxSDs7SUFDckgsdUNBQXFIOztJQUNySCxpQ0FBb0c7O0lBQ3BHLG1DQUEwRzs7SUFDMUcsNkJBQXdGOztJQUN4RixxQ0FBK0c7O0lBQy9HLG1DQUF5Rzs7SUFDekcsc0NBQWtIOztJQUNsSCxnQ0FBaUc7O0lBQ2pHLGlDQUFvRzs7SUFFcEcsd0NBQXdFOztJQUU1RCw4QkFBa0M7O0lBQUUsaUNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEJ5UGssIEVudGl0eU1vZGVsQW5kQ2xhc3MsIGdldEZyb21UbywgSUFwcFN0YXRlLCBJbmRleFN0YXRlbWVudEJ5T2JqZWN0LCBpbmRleFN0YXRlbWVudEJ5T2JqZWN0LCBJbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIGluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eSwgSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QsIGluZGV4U3RhdGVtZW50QnlTdWJqZWN0LCBJbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBpbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBpbmZEZWZpbml0aW9ucywgaW5mUm9vdCwgcGFnaW5hdGVCeSwgUFJfRU5USVRZX01PREVMX01BUCwgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sIHN1YmZpZWxkSWRUb1N0cmluZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgSW5mQXBwZWxsYXRpb24sIEluZkRpbWVuc2lvbiwgSW5mTGFuZ1N0cmluZywgSW5mTGFuZ3VhZ2UsIEluZlBlcnNpc3RlbnRJdGVtLCBJbmZQbGFjZSwgSW5mU3RhdGVtZW50LCBJbmZUZW1wb3JhbEVudGl0eSwgSW5mVGV4dFByb3BlcnR5LCBJbmZUaW1lUHJpbWl0aXZlLCBQcm9JbmZvUHJvalJlbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBHdlN1YmZpZWxkSWQsIEd2U3ViZmllbGRQYWdlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3RPckVtcHR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyB2YWx1ZXMgfSBmcm9tICdkMyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgcGlwZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBmaXJzdCwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5leHBvcnQgdHlwZSBJbmZNb2RlbE5hbWUgPSAncGVyc2lzdGVudF9pdGVtJyB8ICd0ZW1wb3JhbF9lbnRpdHknIHwgJ3N0YXRlbWVudCcgfCAndGV4dF9wcm9wZXJ0eScgfCAnYXBwZWxsYXRpb24nIHwgJ2xhbmd1YWdlJyB8ICdwbGFjZScgfCAnZGltZW5zaW9uJyB8ICdsYW5nX3N0cmluZycgfCAndGltZV9wcmltaXRpdmUnO1xuXG5jbGFzcyBTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IH1cblxuICBzZWxlY3RvcjxNPihpbmRleEtleTogc3RyaW5nKTogeyBhbGwkOiBPYnNlcnZhYmxlPEJ5UGs8TT4+LCBrZXk6ICh4KSA9PiBPYnNlcnZhYmxlPE0+IH0ge1xuXG4gICAgY29uc3QgYWxsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8QnlQazxNPj4oW2luZlJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5XSlcbiAgICBjb25zdCBrZXkgPSAoeCk6IE9ic2VydmFibGU8TT4gPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oW2luZlJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5LCB4XSlcbiAgICB9XG4gICAgcmV0dXJuIHsgYWxsJCwga2V5IH1cbiAgfVxuXG4gIHBhZ2luYXRpb25TZWxlY3RvcjxNPigpIHtcblxuICAgIGNvbnN0IHBpcGVQYWdlID0gKHBhZ2U6IEd2U3ViZmllbGRQYWdlKTogT2JzZXJ2YWJsZTxNW10+ID0+IHtcbiAgICAgIGxldCBwYXRoOiBhbnlbXTtcbiAgICAgIGNvbnN0IHBhZ0J5ID0gcGFnaW5hdGVCeVxuICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKHBhZ2UpXG4gICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHBhZ0J5LCBrZXldO1xuICAgICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8bnVtYmVyPihbLi4ucGF0aCwgJ2NvdW50J10pXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcihjb3VudCA9PiBjb3VudCAhPT0gdW5kZWZpbmVkKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoY291bnQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBwYWdlLm9mZnNldDtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IGNvdW50IDw9IChzdGFydCArIHBhZ2UubGltaXQpID8gY291bnQgOiAoc3RhcnQgKyBwYWdlLmxpbWl0KTtcbiAgICAgICAgICAgIGNvbnN0IG9icyQ6IE9ic2VydmFibGU8TT5bXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgICAgb2JzJC5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oWy4uLnBhdGgsICdyb3dzJywgaV0pLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KG9icyQpXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgIH1cblxuXG4gICAgY29uc3QgcGlwZVBhZ2VMb2FkTmVlZGVkID0gKHBhZ2U6IEd2U3ViZmllbGRQYWdlLCB0cmlnZ2VyJDogT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxib29sZWFuPiA9PiB7XG4gICAgICBsZXQgcGF0aDogYW55W107XG4gICAgICBjb25zdCBwYWdCeSA9IHBhZ2luYXRlQnlcbiAgICAgIGNvbnN0IGtleSA9IHN1YmZpZWxkSWRUb1N0cmluZyhwYWdlKVxuXG4gICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHBhZ0J5LCBrZXldO1xuICAgICAgY29uc3QgZnJvbVRvU3RyaW5nID0gZ2V0RnJvbVRvKHBhZ2UubGltaXQsIHBhZ2Uub2Zmc2V0KVxuICAgICAgcmV0dXJuIHRyaWdnZXIkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsuLi5wYXRoLCAnbG9hZGluZycsIGZyb21Ub1N0cmluZ10pXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaXJzdCgpLFxuICAgICAgICAgICAgbWFwKGxvYWRpbmcgPT4gIWxvYWRpbmcpXG4gICAgICAgICAgKVxuICAgICAgICApKVxuXG4gICAgfVxuXG5cbiAgICBjb25zdCBwaXBlQ291bnQgPSAocGFnZTogR3ZTdWJmaWVsZElkKTogT2JzZXJ2YWJsZTxudW1iZXIgfCB1bmRlZmluZWQ+ID0+IHtcbiAgICAgIGxldCBwYXRoOiBhbnlbXTtcbiAgICAgIGNvbnN0IHBhZ0J5ID0gcGFnaW5hdGVCeVxuICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKHBhZ2UpXG5cbiAgICAgIHBhdGggPSBbaW5mUm9vdCwgdGhpcy5tb2RlbCwgcGFnQnksIGtleV07XG4gICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxudW1iZXI+KFsuLi5wYXRoLCAnY291bnQnXSlcbiAgICB9XG5cblxuICAgIHJldHVybiB7IHBpcGVQYWdlLCBwaXBlQ291bnQsIHBpcGVQYWdlTG9hZE5lZWRlZCB9XG5cbiAgfVxuXG5cbiAgcGlwZUl0ZW1zSW5Qcm9qZWN0PE0+KHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPiwgZ2V0RmtFbnRpdHk6IChpdGVtOiBNKSA9PiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGlwZShcbiAgICAgIHN3aXRjaE1hcCgoaXRlbXM6IEJ5UGs8TT4pID0+IHtcbiAgICAgICAgcmV0dXJuIHBrUHJvamVjdCQucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb1JlbHNBbmRLZXkkOiBPYnNlcnZhYmxlPHsga2V5OiBzdHJpbmcsIHJlbDogUHJvSW5mb1Byb2pSZWwgfT5bXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrIGluIGl0ZW1zKSB7XG4gICAgICAgICAgICAgIGlmIChpdGVtcy5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1trXTtcbiAgICAgICAgICAgICAgICBwcm9SZWxzQW5kS2V5JC5wdXNoKFxuICAgICAgICAgICAgICAgICAgdGhpcy5uZ1JlZHV4LnNlbGVjdDxQcm9JbmZvUHJvalJlbD4oWydwcm8nLCAnaW5mb19wcm9qX3JlbCcsICdieV9ma19wcm9qZWN0X19ma19lbnRpdHknLCBwa1Byb2plY3QgKyAnXycgKyBnZXRGa0VudGl0eShpdGVtKV0pXG4gICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcChyZWwgPT4gKHsga2V5OiBrLCByZWwgfSkpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KHByb1JlbHNBbmRLZXkkKS5waXBlKFxuICAgICAgICAgICAgICBtYXAocHJvUmVscyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXNJblByb2plY3Q6IEJ5UGs8TT4gPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb1JlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHByb1JlbCA9IHByb1JlbHNbaV07XG4gICAgICAgICAgICAgICAgICBpZiAocHJvUmVsLnJlbCAmJiBwcm9SZWwucmVsLmlzX2luX3Byb2plY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNJblByb2plY3RbcHJvUmVsLmtleV0gPSBpdGVtc1twcm9SZWwua2V5XVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXNJblByb2plY3Q7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIHBpcGVJdGVtSW5Qcm9qZWN0PE0+KHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPiwgZ2V0RmtFbnRpdHk6IChpdGVtOiBNKSA9PiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGlwZShcbiAgICAgIHN3aXRjaE1hcCgoaXRlbTogTSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4gcGtQcm9qZWN0JC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvUmVsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8UHJvSW5mb1Byb2pSZWw+KFsncHJvJywgJ2luZm9fcHJval9yZWwnLCAnYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JywgcGtQcm9qZWN0ICsgJ18nICsgZ2V0RmtFbnRpdHkoaXRlbSldKVxuICAgICAgICAgICAgcmV0dXJuIHByb1JlbCQucGlwZShcbiAgICAgICAgICAgICAgLy8gZmlsdGVyKHByb1JlbCA9PiBwcm9SZWwuaXNfaW5fcHJvamVjdCA9PSB0cnVlKSxcbiAgICAgICAgICAgICAgbWFwKChwcm9SZWwpID0+IHByb1JlbCAmJiBwcm9SZWwuaXNfaW5fcHJvamVjdCA9PSB0cnVlID8gaXRlbSA6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBJbmZQZXJzaXN0ZW50SXRlbVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlBlcnNpc3RlbnRJdGVtPignYnlfcGtfZW50aXR5JylcbiAgcHJpdmF0ZSBfYnlfZmtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlBlcnNpc3RlbnRJdGVtPj4oJ2J5X2ZrX2NsYXNzJylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbiAgYnlfcGtfZW50aXR5X2FsbCQob2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmFsbCRcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG4gIGJ5X2ZrX2NsYXNzX2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY2xhc3MkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxufVxuXG5jbGFzcyBJbmZUZW1wb3JhbEVudGl0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlRlbXBvcmFsRW50aXR5PignYnlfcGtfZW50aXR5JylcbiAgLy8gcHVibGljIGJ5X2ZrX2NsYXNzJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZUZW1wb3JhbEVudGl0eT4+KCdieV9ma19jbGFzcycpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cblxuICBieV9wa19lbnRpdHlfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG59XG5cblxuY2xhc3MgSW5mU3RhdGVtZW50U2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcblxuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mU3RhdGVtZW50PignYnlfcGtfZW50aXR5JylcbiAgcHVibGljIGJ5X2ZrX3N1YmplY3RfZGF0YSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X2ZrX3N1YmplY3RfZGF0YScpXG5cbiAgcHVibGljIHBhZ2luYXRpb24kID0gdGhpcy5wYWdpbmF0aW9uU2VsZWN0b3I8bnVtYmVyPigpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cblxuICBieV9wa19lbnRpdHlfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLmJ5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuICBieV9zdWJqZWN0JChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X3N1YmplY3QnKS5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgICAgbWFwKGl0ZW1zID0+IHZhbHVlcyhpdGVtcykpXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICApO1xuICB9XG5cbiAgYnlfc3ViamVjdF9hbmRfcHJvcGVydHkkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzLCBvZlByb2plY3QpLnBpcGUoXG4gICAgICBtYXAoc3RhdGVtZW50SWR4ID0+IHZhbHVlcyhzdGF0ZW1lbnRJZHgpKVxuICAgIClcbiAgfVxuICBieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8QnlQazxJbmZTdGF0ZW1lbnQ+PiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eShmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfc3ViamVjdCtwcm9wZXJ0eScpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSkpXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuICBieV9vYmplY3QkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5T2JqZWN0LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIGNvbnN0IGtleSA9IGluZGV4U3RhdGVtZW50QnlPYmplY3QoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X29iamVjdCcpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICk7XG4gIH1cblxuICBieV9vYmplY3RfYW5kX3Byb3BlcnR5JChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLmJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoZm9yZWlnbktleXMsIG9mUHJvamVjdCkucGlwZShcbiAgICAgIG1hcChzdGF0ZW1lbnRJZHggPT4gdmFsdWVzKHN0YXRlbWVudElkeCkpXG4gICAgKVxuICB9XG5cbiAgYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlN0YXRlbWVudD4+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHkoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X29iamVjdCtwcm9wZXJ0eScpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbn1cblxuXG5jbGFzcyBJbmZUZXh0UHJvcGVydHlTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwcml2YXRlIF9ieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZUZXh0UHJvcGVydHk+KCdieV9wa19lbnRpdHknKVxuICBwcml2YXRlIF9ieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4oJ2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkJylcbiAgcHJpdmF0ZSBfYnlfZmtfY29uY2VybmVkX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4oJ2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG4gIGJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkX2luZGV4ZWQkKGtleTogc3RyaW5nLCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlRleHRQcm9wZXJ0eT4+IHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGQkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cblxuICBieV9ma19jb25jZXJuZWRfZW50aXR5X2luZGV4ZWQkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlRleHRQcm9wZXJ0eT4+IHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY29uY2VybmVkX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxufVxuXG5cbmNsYXNzIEluZkFwcGVsbGF0aW9uU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkFwcGVsbGF0aW9uPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZMYW5nU3RyaW5nU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkxhbmdTdHJpbmc+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZlBsYWNlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlBsYWNlPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZUaW1lUHJpbWl0aXZlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlRpbWVQcmltaXRpdmU+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZkxhbmd1YWdlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkxhbmd1YWdlPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZEaW1lbnNpb25TZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mRGltZW5zaW9uPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5mU2VsZWN0b3Ige1xuXG4gIHBlcnNpc3RlbnRfaXRlbSQgPSBuZXcgSW5mUGVyc2lzdGVudEl0ZW1TZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3BlcnNpc3RlbnRfaXRlbScpO1xuICB0ZW1wb3JhbF9lbnRpdHkkID0gbmV3IEluZlRlbXBvcmFsRW50aXR5U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICd0ZW1wb3JhbF9lbnRpdHknKTtcbiAgc3RhdGVtZW50JCA9IG5ldyBJbmZTdGF0ZW1lbnRTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3N0YXRlbWVudCcpO1xuICBhcHBlbGxhdGlvbiQgPSBuZXcgSW5mQXBwZWxsYXRpb25TZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ2FwcGVsbGF0aW9uJyk7XG4gIHBsYWNlJCA9IG5ldyBJbmZQbGFjZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAncGxhY2UnKTtcbiAgdGV4dF9wcm9wZXJ0eSQgPSBuZXcgSW5mVGV4dFByb3BlcnR5U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICd0ZXh0X3Byb3BlcnR5Jyk7XG4gIGxhbmdfc3RyaW5nJCA9IG5ldyBJbmZMYW5nU3RyaW5nU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdsYW5nX3N0cmluZycpO1xuICB0aW1lX3ByaW1pdGl2ZSQgPSBuZXcgSW5mVGltZVByaW1pdGl2ZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAndGltZV9wcmltaXRpdmUnKTtcbiAgbGFuZ3VhZ2UkID0gbmV3IEluZkxhbmd1YWdlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdsYW5ndWFnZScpO1xuICBkaW1lbnNpb24kID0gbmV3IEluZkRpbWVuc2lvblNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnZGltZW5zaW9uJyk7XG5cbiAgcGtFbnRpdHlNb2RlbE1hcCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0KFtpbmZSb290LCBQUl9FTlRJVFlfTU9ERUxfTUFQXSk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPiwgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPikgeyB9XG5cbiAgZ2V0TW9kZWxPZkVudGl0eSQocGtFbnRpdHk6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PEVudGl0eU1vZGVsQW5kQ2xhc3M8SW5mTW9kZWxOYW1lPj4oW2luZlJvb3QsIFBSX0VOVElUWV9NT0RFTF9NQVAsIHBrRW50aXR5XSk7XG4gIH1cbn1cbiJdfQ==