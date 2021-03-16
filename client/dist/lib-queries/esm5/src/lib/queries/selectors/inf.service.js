/**
 * @fileoverview added by tsickle
 * Generated from: selectors/inf.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { getFromTo, indexStatementByObject, indexStatementByObjectProperty, indexStatementBySubject, indexStatementBySubjectProperty, infDefinitions, infRoot, paginateBy, PR_ENTITY_MODEL_MAP, subfieldIdToString } from '@kleiolab/lib-redux';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { values } from 'd3';
import { equals } from 'ramda';
import { of, pipe } from 'rxjs';
import { filter, first, map, switchMap, throttleTime } from 'rxjs/operators';
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
            // REMARK: 'equals' comparator is very very important for performance !
            return _this.ngRedux.select([infRoot, _this.model, indexKey, x], equals);
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
            var fromToString = getFromTo(page.limit, page.offset)
            // return this.ngRedux.select<boolean>([...path, 'loading', fromToString])
            //   .pipe(
            //     // map(loading => !loading),
            //     switchMap((loading) => {
            //       if (loading) return of(false)
            //       else return trigger$.pipe(mapTo(true))
            //     }),
            //     // first(),
            //   )
            ;
            // return this.ngRedux.select<boolean>([...path, 'loading', fromToString])
            //   .pipe(
            //     // map(loading => !loading),
            //     switchMap((loading) => {
            //       if (loading) return of(false)
            //       else return trigger$.pipe(mapTo(true))
            //     }),
            //     // first(),
            //   )
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
                return combineLatestOrEmpty(proRelsAndKey$).pipe(throttleTime(0), map((/**
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
    /** @type {?} */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL2luZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBNkIsU0FBUyxFQUFxQyxzQkFBc0IsRUFBa0MsOEJBQThCLEVBQTJCLHVCQUF1QixFQUFtQywrQkFBK0IsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBMkIsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUdqYSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc3RTtJQUNFLGtCQUNTLE9BQTJCLEVBQzNCLFVBQXVDLEVBQ3ZDLE9BQWdDLEVBQ2hDLEtBQWE7UUFIYixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixlQUFVLEdBQVYsVUFBVSxDQUE2QjtRQUN2QyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQ2xCLENBQUM7Ozs7OztJQUVMLDJCQUFROzs7OztJQUFSLFVBQVksUUFBZ0I7UUFBNUIsaUJBUUM7O1lBTk8sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7O1lBQ3BF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QyxDQUFDO1FBQ2pHLGVBQVUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFcEcsc0JBQWlCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBQzBCLENBQUM7Ozs7O0lBRW5HLHVDQUFpQjs7OztJQUFqQixVQUFrQixRQUFnQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFvQyxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7Ozs7SUFqQkMsdUNBQXFIOztJQUNySCx1Q0FBcUg7O0lBQ3JILGlDQUFvRzs7SUFDcEcsbUNBQTBHOztJQUMxRyw2QkFBd0Y7O0lBQ3hGLHFDQUErRzs7SUFDL0csbUNBQXlHOztJQUN6RyxzQ0FBa0g7O0lBQ2xILGdDQUFpRzs7SUFDakcsaUNBQW9HOztJQUVwRyx3Q0FBd0U7O0lBQzVELDhCQUFrQzs7SUFBRSxpQ0FBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgQnlQaywgRW50aXR5TW9kZWxBbmRDbGFzcywgZ2V0RnJvbVRvLCBJQXBwU3RhdGUsIEluZGV4U3RhdGVtZW50QnlPYmplY3QsIGluZGV4U3RhdGVtZW50QnlPYmplY3QsIEluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eSwgaW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBJbmRleFN0YXRlbWVudEJ5U3ViamVjdCwgaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QsIEluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHksIGluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHksIGluZkRlZmluaXRpb25zLCBpbmZSb290LCBwYWdpbmF0ZUJ5LCBQUl9FTlRJVFlfTU9ERUxfTUFQLCBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiwgc3ViZmllbGRJZFRvU3RyaW5nIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBJbmZBcHBlbGxhdGlvbiwgSW5mRGltZW5zaW9uLCBJbmZMYW5nU3RyaW5nLCBJbmZMYW5ndWFnZSwgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlBsYWNlLCBJbmZTdGF0ZW1lbnQsIEluZlRlbXBvcmFsRW50aXR5LCBJbmZUZXh0UHJvcGVydHksIEluZlRpbWVQcmltaXRpdmUsIFByb0luZm9Qcm9qUmVsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEd2RmllbGRJZCwgR3ZGaWVsZFBhZ2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdE9yRW1wdHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2QzJztcbmltcG9ydCB7IGVxdWFscyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBwaXBlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCBtYXAsIHN3aXRjaE1hcCwgdGhyb3R0bGVUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuZXhwb3J0IHR5cGUgSW5mTW9kZWxOYW1lID0gJ3BlcnNpc3RlbnRfaXRlbScgfCAndGVtcG9yYWxfZW50aXR5JyB8ICdzdGF0ZW1lbnQnIHwgJ3RleHRfcHJvcGVydHknIHwgJ2FwcGVsbGF0aW9uJyB8ICdsYW5ndWFnZScgfCAncGxhY2UnIHwgJ2RpbWVuc2lvbicgfCAnbGFuZ19zdHJpbmcnIHwgJ3RpbWVfcHJpbWl0aXZlJztcblxuY2xhc3MgU2VsZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyB9XG5cbiAgc2VsZWN0b3I8TT4oaW5kZXhLZXk6IHN0cmluZyk6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeCkgPT4gT2JzZXJ2YWJsZTxNPiB9IHtcblxuICAgIGNvbnN0IGFsbCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PEJ5UGs8TT4+KFtpbmZSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleV0pXG4gICAgY29uc3Qga2V5ID0gKHgpOiBPYnNlcnZhYmxlPE0+ID0+IHtcbiAgICAgIC8vIFJFTUFSSzogJ2VxdWFscycgY29tcGFyYXRvciBpcyB2ZXJ5IHZlcnkgaW1wb3J0YW50IGZvciBwZXJmb3JtYW5jZSAhXG4gICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxNPihbaW5mUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXksIHhdLCBlcXVhbHMpXG4gICAgfVxuICAgIHJldHVybiB7IGFsbCQsIGtleSB9XG4gIH1cblxuICBwYWdpbmF0aW9uU2VsZWN0b3I8TT4oKSB7XG5cbiAgICBjb25zdCBwaXBlUGFnZSA9IChwYWdlOiBHdkZpZWxkUGFnZSk6IE9ic2VydmFibGU8TVtdPiA9PiB7XG4gICAgICBsZXQgcGF0aDogYW55W107XG4gICAgICBjb25zdCBwYWdCeSA9IHBhZ2luYXRlQnlcbiAgICAgIGNvbnN0IGtleSA9IHN1YmZpZWxkSWRUb1N0cmluZyhwYWdlKVxuICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCBwYWdCeSwga2V5XTtcbiAgICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PG51bWJlcj4oWy4uLnBhdGgsICdjb3VudCddKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoY291bnQgPT4gY291bnQgIT09IHVuZGVmaW5lZCksXG4gICAgICAgICAgc3dpdGNoTWFwKGNvdW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gcGFnZS5vZmZzZXQ7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSBjb3VudCA8PSAoc3RhcnQgKyBwYWdlLmxpbWl0KSA/IGNvdW50IDogKHN0YXJ0ICsgcGFnZS5saW1pdCk7XG4gICAgICAgICAgICBjb25zdCBvYnMkOiBPYnNlcnZhYmxlPE0+W10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICAgICAgICAgIG9icyQucHVzaChcbiAgICAgICAgICAgICAgICB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFsuLi5wYXRoLCAncm93cycsIGldKS5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShvYnMkKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICB9XG5cblxuICAgIGNvbnN0IHBpcGVQYWdlTG9hZE5lZWRlZCA9IChwYWdlOiBHdkZpZWxkUGFnZSwgdHJpZ2dlciQ6IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8Ym9vbGVhbj4gPT4ge1xuICAgICAgbGV0IHBhdGg6IGFueVtdO1xuICAgICAgY29uc3QgcGFnQnkgPSBwYWdpbmF0ZUJ5XG4gICAgICBjb25zdCBrZXkgPSBzdWJmaWVsZElkVG9TdHJpbmcocGFnZSlcblxuICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCBwYWdCeSwga2V5XTtcbiAgICAgIGNvbnN0IGZyb21Ub1N0cmluZyA9IGdldEZyb21UbyhwYWdlLmxpbWl0LCBwYWdlLm9mZnNldClcbiAgICAgIC8vIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsuLi5wYXRoLCAnbG9hZGluZycsIGZyb21Ub1N0cmluZ10pXG4gICAgICAvLyAgIC5waXBlKFxuICAgICAgLy8gICAgIC8vIG1hcChsb2FkaW5nID0+ICFsb2FkaW5nKSxcbiAgICAgIC8vICAgICBzd2l0Y2hNYXAoKGxvYWRpbmcpID0+IHtcbiAgICAgIC8vICAgICAgIGlmIChsb2FkaW5nKSByZXR1cm4gb2YoZmFsc2UpXG4gICAgICAvLyAgICAgICBlbHNlIHJldHVybiB0cmlnZ2VyJC5waXBlKG1hcFRvKHRydWUpKVxuICAgICAgLy8gICAgIH0pLFxuICAgICAgLy8gICAgIC8vIGZpcnN0KCksXG4gICAgICAvLyAgIClcblxuICAgICAgcmV0dXJuIHRyaWdnZXIkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsuLi5wYXRoLCAnbG9hZGluZycsIGZyb21Ub1N0cmluZ10pXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaXJzdCgpLFxuICAgICAgICAgICAgbWFwKGxvYWRpbmcgPT4gIWxvYWRpbmcpXG4gICAgICAgICAgKVxuICAgICAgICApKVxuXG4gICAgfVxuXG5cbiAgICBjb25zdCBwaXBlQ291bnQgPSAocGFnZTogR3ZGaWVsZElkKTogT2JzZXJ2YWJsZTxudW1iZXIgfCB1bmRlZmluZWQ+ID0+IHtcbiAgICAgIGxldCBwYXRoOiBhbnlbXTtcbiAgICAgIGNvbnN0IHBhZ0J5ID0gcGFnaW5hdGVCeVxuICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKHBhZ2UpXG5cbiAgICAgIHBhdGggPSBbaW5mUm9vdCwgdGhpcy5tb2RlbCwgcGFnQnksIGtleV07XG4gICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxudW1iZXI+KFsuLi5wYXRoLCAnY291bnQnXSlcbiAgICB9XG5cblxuICAgIHJldHVybiB7IHBpcGVQYWdlLCBwaXBlQ291bnQsIHBpcGVQYWdlTG9hZE5lZWRlZCB9XG5cbiAgfVxuXG5cbiAgcGlwZUl0ZW1zSW5Qcm9qZWN0PE0+KHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPiwgZ2V0RmtFbnRpdHk6IChpdGVtOiBNKSA9PiBudW1iZXIpIHtcblxuICAgIHJldHVybiBwaXBlKFxuICAgICAgc3dpdGNoTWFwKChpdGVtczogQnlQazxNPikgPT4ge1xuICAgICAgICByZXR1cm4gcGtQcm9qZWN0JC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvUmVsc0FuZEtleSQ6IE9ic2VydmFibGU8eyBrZXk6IHN0cmluZywgcmVsOiBQcm9JbmZvUHJvalJlbCB9PltdID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGsgaW4gaXRlbXMpIHtcbiAgICAgICAgICAgICAgaWYgKGl0ZW1zLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2tdO1xuICAgICAgICAgICAgICAgIHByb1JlbHNBbmRLZXkkLnB1c2goXG4gICAgICAgICAgICAgICAgICB0aGlzLm5nUmVkdXguc2VsZWN0PFByb0luZm9Qcm9qUmVsPihbJ3BybycsICdpbmZvX3Byb2pfcmVsJywgJ2J5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eScsIHBrUHJvamVjdCArICdfJyArIGdldEZrRW50aXR5KGl0ZW0pXSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKHJlbCA9PiAoeyBrZXk6IGssIHJlbCB9KSkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkocHJvUmVsc0FuZEtleSQpLnBpcGUoXG4gICAgICAgICAgICAgIHRocm90dGxlVGltZSgwKSxcbiAgICAgICAgICAgICAgbWFwKHByb1JlbHMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zSW5Qcm9qZWN0OiBCeVBrPE0+ID0ge307XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9SZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwcm9SZWwgPSBwcm9SZWxzW2ldO1xuICAgICAgICAgICAgICAgICAgaWYgKHByb1JlbC5yZWwgJiYgcHJvUmVsLnJlbC5pc19pbl9wcm9qZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zSW5Qcm9qZWN0W3Byb1JlbC5rZXldID0gaXRlbXNbcHJvUmVsLmtleV1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zSW5Qcm9qZWN0O1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcblxuICAgICAgfSlcbiAgICApXG5cbiAgfVxuXG4gIHBpcGVJdGVtSW5Qcm9qZWN0PE0+KHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPiwgZ2V0RmtFbnRpdHk6IChpdGVtOiBNKSA9PiBudW1iZXIpIHtcbiAgICByZXR1cm4gcGlwZShcbiAgICAgIHN3aXRjaE1hcCgoaXRlbTogTSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4gcGtQcm9qZWN0JC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvUmVsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8UHJvSW5mb1Byb2pSZWw+KFsncHJvJywgJ2luZm9fcHJval9yZWwnLCAnYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JywgcGtQcm9qZWN0ICsgJ18nICsgZ2V0RmtFbnRpdHkoaXRlbSldKVxuICAgICAgICAgICAgcmV0dXJuIHByb1JlbCQucGlwZShcbiAgICAgICAgICAgICAgLy8gZmlsdGVyKHByb1JlbCA9PiBwcm9SZWwuaXNfaW5fcHJvamVjdCA9PSB0cnVlKSxcbiAgICAgICAgICAgICAgbWFwKChwcm9SZWwpID0+IHByb1JlbCAmJiBwcm9SZWwuaXNfaW5fcHJvamVjdCA9PSB0cnVlID8gaXRlbSA6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBJbmZQZXJzaXN0ZW50SXRlbVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlBlcnNpc3RlbnRJdGVtPignYnlfcGtfZW50aXR5JylcbiAgcHJpdmF0ZSBfYnlfZmtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlBlcnNpc3RlbnRJdGVtPj4oJ2J5X2ZrX2NsYXNzJylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbiAgYnlfcGtfZW50aXR5X2FsbCQob2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmFsbCRcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG4gIGJ5X2ZrX2NsYXNzX2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfZmtfY2xhc3MkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxufVxuXG5jbGFzcyBJbmZUZW1wb3JhbEVudGl0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIF9ieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZUZW1wb3JhbEVudGl0eT4oJ2J5X3BrX2VudGl0eScpXG4gIC8vIHB1YmxpYyBieV9ma19jbGFzcyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mVGVtcG9yYWxFbnRpdHk+PignYnlfZmtfY2xhc3MnKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxufVxuXG5cbmNsYXNzIEluZlN0YXRlbWVudFNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG5cbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlN0YXRlbWVudD4oJ2J5X3BrX2VudGl0eScpXG4gIHB1YmxpYyBieV9ma19zdWJqZWN0X2RhdGEkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9ma19zdWJqZWN0X2RhdGEnKVxuXG4gIHB1YmxpYyBwYWdpbmF0aW9uJCA9IHRoaXMucGFnaW5hdGlvblNlbGVjdG9yPG51bWJlcj4oKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5ieV9wa19lbnRpdHkkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbiAgYnlfc3ViamVjdCQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlTdWJqZWN0LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIGNvbnN0IGtleSA9IGluZGV4U3RhdGVtZW50QnlTdWJqZWN0KGZvcmVpZ25LZXlzKTtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9zdWJqZWN0Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgbWFwKGl0ZW1zID0+IHZhbHVlcyhpdGVtcykpXG4gICAgKTtcbiAgfVxuXG4gIGJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5JChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5cywgb2ZQcm9qZWN0KS5waXBlKFxuICAgICAgbWFwKHN0YXRlbWVudElkeCA9PiB2YWx1ZXMoc3RhdGVtZW50SWR4KSlcbiAgICApXG4gIH1cbiAgYnlfc3ViamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mU3RhdGVtZW50Pj4ge1xuICAgIGNvbnN0IGtleSA9IGluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHkoZm9yZWlnbktleXMpO1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mU3RhdGVtZW50Pj4oJ2J5X3N1YmplY3QrcHJvcGVydHknKS5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbiAgYnlfb2JqZWN0JChmb3JlaWduS2V5czogSW5kZXhTdGF0ZW1lbnRCeU9iamVjdCwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5T2JqZWN0KGZvcmVpZ25LZXlzKTtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9vYmplY3QnKS5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgICAgbWFwKGl0ZW1zID0+IHZhbHVlcyhpdGVtcykpXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICApO1xuICB9XG5cbiAgYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eSQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eSwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5ieV9vYmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzLCBvZlByb2plY3QpLnBpcGUoXG4gICAgICBtYXAoc3RhdGVtZW50SWR4ID0+IHZhbHVlcyhzdGF0ZW1lbnRJZHgpKVxuICAgIClcbiAgfVxuXG4gIGJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eSwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8QnlQazxJbmZTdGF0ZW1lbnQ+PiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5KGZvcmVpZ25LZXlzKTtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9vYmplY3QrcHJvcGVydHknKS5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG59XG5cblxuY2xhc3MgSW5mVGV4dFByb3BlcnR5U2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHJpdmF0ZSBfYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mVGV4dFByb3BlcnR5PignYnlfcGtfZW50aXR5JylcbiAgcHJpdmF0ZSBfYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGQkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlRleHRQcm9wZXJ0eT4+KCdieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZCcpXG4gIHByaXZhdGUgX2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlRleHRQcm9wZXJ0eT4+KCdieV9ma19jb25jZXJuZWRfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuICBieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZF9pbmRleGVkJChrZXk6IHN0cmluZywgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8QnlQazxJbmZUZXh0UHJvcGVydHk+PiB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkJC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG5cbiAgYnlfZmtfY29uY2VybmVkX2VudGl0eV9pbmRleGVkJChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8QnlQazxJbmZUZXh0UHJvcGVydHk+PiB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHkkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbn1cblxuXG5jbGFzcyBJbmZBcHBlbGxhdGlvblNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZBcHBlbGxhdGlvbj4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mTGFuZ1N0cmluZ1NlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZMYW5nU3RyaW5nPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZQbGFjZVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZQbGFjZT4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mVGltZVByaW1pdGl2ZVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZUaW1lUHJpbWl0aXZlPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBJbmZMYW5ndWFnZVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZMYW5ndWFnZT4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mRGltZW5zaW9uU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZkRpbWVuc2lvbj4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuZXhwb3J0IGNsYXNzIEluZlNlbGVjdG9yIHtcblxuICBwZXJzaXN0ZW50X2l0ZW0kID0gbmV3IEluZlBlcnNpc3RlbnRJdGVtU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdwZXJzaXN0ZW50X2l0ZW0nKTtcbiAgdGVtcG9yYWxfZW50aXR5JCA9IG5ldyBJbmZUZW1wb3JhbEVudGl0eVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAndGVtcG9yYWxfZW50aXR5Jyk7XG4gIHN0YXRlbWVudCQgPSBuZXcgSW5mU3RhdGVtZW50U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdzdGF0ZW1lbnQnKTtcbiAgYXBwZWxsYXRpb24kID0gbmV3IEluZkFwcGVsbGF0aW9uU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdhcHBlbGxhdGlvbicpO1xuICBwbGFjZSQgPSBuZXcgSW5mUGxhY2VTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3BsYWNlJyk7XG4gIHRleHRfcHJvcGVydHkkID0gbmV3IEluZlRleHRQcm9wZXJ0eVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAndGV4dF9wcm9wZXJ0eScpO1xuICBsYW5nX3N0cmluZyQgPSBuZXcgSW5mTGFuZ1N0cmluZ1NlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnbGFuZ19zdHJpbmcnKTtcbiAgdGltZV9wcmltaXRpdmUkID0gbmV3IEluZlRpbWVQcmltaXRpdmVTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3RpbWVfcHJpbWl0aXZlJyk7XG4gIGxhbmd1YWdlJCA9IG5ldyBJbmZMYW5ndWFnZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnbGFuZ3VhZ2UnKTtcbiAgZGltZW5zaW9uJCA9IG5ldyBJbmZEaW1lbnNpb25TZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ2RpbWVuc2lvbicpO1xuXG4gIHBrRW50aXR5TW9kZWxNYXAkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdChbaW5mUm9vdCwgUFJfRU5USVRZX01PREVMX01BUF0pO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LCBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+KSB7IH1cblxuICBnZXRNb2RlbE9mRW50aXR5JChwa0VudGl0eTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8RW50aXR5TW9kZWxBbmRDbGFzczxJbmZNb2RlbE5hbWU+PihbaW5mUm9vdCwgUFJfRU5USVRZX01PREVMX01BUCwgcGtFbnRpdHldKTtcbiAgfVxufVxuIl19