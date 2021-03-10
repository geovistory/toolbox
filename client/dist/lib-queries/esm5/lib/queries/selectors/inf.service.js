/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/inf.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvaW5mLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUE2QixTQUFTLEVBQXFDLHNCQUFzQixFQUFrQyw4QkFBOEIsRUFBMkIsdUJBQXVCLEVBQW1DLCtCQUErQixFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUEyQixrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR2phLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDNUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzdFO0lBQ0Usa0JBQ1MsT0FBMkIsRUFDM0IsVUFBdUMsRUFDdkMsT0FBZ0MsRUFDaEMsS0FBYTtRQUhiLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLGVBQVUsR0FBVixVQUFVLENBQTZCO1FBQ3ZDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7SUFDbEIsQ0FBQzs7Ozs7O0lBRUwsMkJBQVE7Ozs7O0lBQVIsVUFBWSxRQUFnQjtRQUE1QixpQkFRQzs7WUFOTyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7WUFDcEUsR0FBRzs7OztRQUFHLFVBQUMsQ0FBQztZQUNaLHVFQUF1RTtZQUN2RSxPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFJLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzNFLENBQUMsQ0FBQTtRQUNELE9BQU8sRUFBRSxJQUFJLE1BQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFBO0lBQ3RCLENBQUM7Ozs7O0lBRUQscUNBQWtCOzs7O0lBQWxCO1FBQUEsaUJBaUVDOztZQS9ETyxRQUFROzs7O1FBQUcsVUFBQyxJQUFvQjs7Z0JBQ2hDLElBQVc7O2dCQUNULEtBQUssR0FBRyxVQUFVOztnQkFDbEIsR0FBRyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQztZQUNwQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDekMsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sa0JBQWEsSUFBSSxHQUFFLE9BQU8sR0FBRTtpQkFDbkQsSUFBSSxDQUNILE1BQU07Ozs7WUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssS0FBSyxTQUFTLEVBQW5CLENBQW1CLEVBQUMsRUFDcEMsU0FBUzs7OztZQUFDLFVBQUEsS0FBSzs7b0JBQ1AsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNOztvQkFDbkIsR0FBRyxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzs7b0JBQ2xFLElBQUksR0FBb0IsRUFBRTtnQkFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDaEMsSUFBSSxDQUFDLElBQUksQ0FDUCxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sa0JBQVEsSUFBSSxHQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztvQkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUgsQ0FBRyxFQUFDLENBQUMsQ0FDcEUsQ0FBQTtpQkFDRjtnQkFDRCxPQUFPLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ25DLENBQUMsRUFBQyxDQUNILENBQUE7UUFDTCxDQUFDLENBQUE7O1lBR0ssa0JBQWtCOzs7OztRQUFHLFVBQUMsSUFBb0IsRUFBRSxRQUF5Qjs7Z0JBQ3JFLElBQVc7O2dCQUNULEtBQUssR0FBRyxVQUFVOztnQkFDbEIsR0FBRyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQztZQUVwQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7O2dCQUNuQyxZQUFZLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2RCwwRUFBMEU7WUFDMUUsV0FBVztZQUNYLG1DQUFtQztZQUNuQywrQkFBK0I7WUFDL0Isc0NBQXNDO1lBQ3RDLCtDQUErQztZQUMvQyxVQUFVO1lBQ1Ysa0JBQWtCO1lBQ2xCLE1BQU07O1lBUk4sMEVBQTBFO1lBQzFFLFdBQVc7WUFDWCxtQ0FBbUM7WUFDbkMsK0JBQStCO1lBQy9CLHNDQUFzQztZQUN0QywrQ0FBK0M7WUFDL0MsVUFBVTtZQUNWLGtCQUFrQjtZQUNsQixNQUFNO1lBRU4sT0FBTyxRQUFRLENBQUMsSUFBSSxDQUNsQixTQUFTOzs7WUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLGtCQUFjLElBQUksR0FBRSxTQUFTLEVBQUUsWUFBWSxHQUFFO2lCQUM3RSxJQUFJLENBQ0gsS0FBSyxFQUFFLEVBQ1AsR0FBRzs7OztZQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsQ0FBQyxPQUFPLEVBQVIsQ0FBUSxFQUFDLENBQ3pCLEVBSmEsQ0FJYixFQUNGLENBQUMsQ0FBQTtRQUVOLENBQUMsQ0FBQTs7WUFHSyxTQUFTOzs7O1FBQUcsVUFBQyxJQUFrQjs7Z0JBQy9CLElBQVc7O2dCQUNULEtBQUssR0FBRyxVQUFVOztnQkFDbEIsR0FBRyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQztZQUVwQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDekMsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sa0JBQWEsSUFBSSxHQUFFLE9BQU8sR0FBRSxDQUFBO1FBQ3hELENBQUMsQ0FBQTtRQUdELE9BQU8sRUFBRSxRQUFRLFVBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxrQkFBa0Isb0JBQUEsRUFBRSxDQUFBO0lBRXBELENBQUM7Ozs7Ozs7SUFHRCxxQ0FBa0I7Ozs7OztJQUFsQixVQUFzQixVQUF1QyxFQUFFLFdBQWdDO1FBQS9GLGlCQW1DQztRQWpDQyxPQUFPLElBQUksQ0FDVCxTQUFTOzs7O1FBQUMsVUFBQyxLQUFjO1lBQ3ZCLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FDcEIsU0FBUzs7OztZQUFDLFVBQUEsU0FBUzs7b0JBQ1gsY0FBYyxHQUF1RCxFQUFFO3dDQUNsRSxDQUFDO29CQUNWLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTs7NEJBQ3JCLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixjQUFjLENBQUMsSUFBSSxDQUNqQixLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBaUIsQ0FBQyxLQUFLLEVBQUUsZUFBZSxFQUFFLDBCQUEwQixFQUFFLFNBQVMsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7NkJBQzNILElBQUksQ0FBQyxHQUFHOzs7O3dCQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxLQUFBLEVBQUUsQ0FBQyxFQUFqQixDQUFpQixFQUFDLENBQUMsQ0FDdkMsQ0FBQTtxQkFDRjs7Z0JBUEgsS0FBSyxJQUFNLENBQUMsSUFBSSxLQUFLOzRCQUFWLENBQUM7aUJBUVg7Z0JBQ0QsT0FBTyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQzlDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFDZixHQUFHOzs7O2dCQUFDLFVBQUEsT0FBTzs7d0JBQ0gsY0FBYyxHQUFZLEVBQUU7b0JBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzs0QkFDakMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLElBQUksTUFBTSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRTs0QkFDMUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO3lCQUMvQztxQkFDRjtvQkFDRCxPQUFPLGNBQWMsQ0FBQztnQkFDeEIsQ0FBQyxFQUFDLENBQ0gsQ0FBQTtZQUNILENBQUMsRUFBQyxDQUNILENBQUE7UUFFSCxDQUFDLEVBQUMsQ0FDSCxDQUFBO0lBRUgsQ0FBQzs7Ozs7OztJQUVELG9DQUFpQjs7Ozs7O0lBQWpCLFVBQXFCLFVBQXVDLEVBQUUsV0FBZ0M7UUFBOUYsaUJBZUM7UUFkQyxPQUFPLElBQUksQ0FDVCxTQUFTOzs7O1FBQUMsVUFBQyxJQUFPO1lBQ2hCLElBQUksQ0FBQyxJQUFJO2dCQUFFLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FDcEIsU0FBUzs7OztZQUFDLFVBQUEsU0FBUzs7b0JBQ1gsT0FBTyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFpQixDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsMEJBQTBCLEVBQUUsU0FBUyxHQUFHLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDOUksT0FBTyxPQUFPLENBQUMsSUFBSTtnQkFDakIsa0RBQWtEO2dCQUNsRCxHQUFHOzs7O2dCQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsTUFBTSxJQUFJLE1BQU0sQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBekQsQ0FBeUQsRUFBQyxDQUMzRSxDQUFBO1lBQ0gsQ0FBQyxFQUFDLENBQ0gsQ0FBQTtRQUNILENBQUMsRUFBQyxDQUNILENBQUE7SUFDSCxDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUEzSUQsSUEySUM7OztJQXpJRywyQkFBa0M7O0lBQ2xDLDhCQUE4Qzs7SUFDOUMsMkJBQXVDOztJQUN2Qyx5QkFBb0I7O0FBd0l4QjtJQUEwQyx1REFBUTtJQUloRCxxQ0FDUyxPQUEyQixFQUMzQixVQUF1QyxFQUN2QyxPQUFnQyxFQUNoQyxLQUFhO1FBSnRCLFlBS0ksa0JBQU0sT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLFNBQUU7UUFKdkMsYUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsZ0JBQVUsR0FBVixVQUFVLENBQTZCO1FBQ3ZDLGFBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFdBQUssR0FBTCxLQUFLLENBQVE7UUFQZCxvQkFBYyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQW9CLGNBQWMsQ0FBQyxDQUFBO1FBQ2pFLG1CQUFhLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBMEIsYUFBYSxDQUFDLENBQUE7O0lBTzlCLENBQUM7Ozs7OztJQUVoRCx1REFBaUI7Ozs7O0lBQWpCLFVBQWtCLEdBQW9CLEVBQUUsU0FBZ0I7UUFBaEIsMEJBQUEsRUFBQSxnQkFBZ0I7O1lBQ2hELFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDL0MsSUFBSSxTQUFTO1lBQUUsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVTs7OztZQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFNBQVMsRUFBWCxDQUFXLEVBQUMsQ0FBQyxDQUFBO1FBQ2xHLE9BQU8sVUFBVSxDQUFBO0lBQ25CLENBQUM7Ozs7O0lBQ0QsdURBQWlCOzs7O0lBQWpCLFVBQWtCLFNBQWdCO1FBQWhCLDBCQUFBLEVBQUEsZ0JBQWdCOztZQUMxQixVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJO1FBQzNDLElBQUksU0FBUztZQUFFLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVU7Ozs7WUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxTQUFTLEVBQVgsQ0FBVyxFQUFDLENBQUMsQ0FBQTtRQUNuRyxPQUFPLFVBQVUsQ0FBQTtJQUNuQixDQUFDOzs7Ozs7SUFDRCxzREFBZ0I7Ozs7O0lBQWhCLFVBQWlCLEdBQW9CLEVBQUUsU0FBZ0I7UUFBaEIsMEJBQUEsRUFBQSxnQkFBZ0I7O1lBQy9DLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDOUMsSUFBSSxTQUFTO1lBQUUsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVTs7OztZQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFNBQVMsRUFBWCxDQUFXLEVBQUMsQ0FBQyxDQUFBO1FBQ25HLE9BQU8sVUFBVSxDQUFBO0lBQ25CLENBQUM7SUFDSCxrQ0FBQztBQUFELENBQUMsQUExQkQsQ0FBMEMsUUFBUSxHQTBCakQ7Ozs7OztJQXpCQyxxREFBeUU7Ozs7O0lBQ3pFLG9EQUE2RTs7SUFHM0UsOENBQWtDOztJQUNsQyxpREFBOEM7O0lBQzlDLDhDQUF1Qzs7SUFDdkMsNENBQW9COztBQW9CeEI7SUFBMEMsdURBQVE7SUFFaEQsOEVBQThFO0lBRTlFLHFDQUNTLE9BQTJCLEVBQzNCLFVBQXVDLEVBQ3ZDLE9BQWdDLEVBQ2hDLEtBQWE7UUFKdEIsWUFLSSxrQkFBTSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsU0FBRTtRQUp2QyxhQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixnQkFBVSxHQUFWLFVBQVUsQ0FBNkI7UUFDdkMsYUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQVBkLG9CQUFjLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBb0IsY0FBYyxDQUFDLENBQUE7O0lBUTFCLENBQUM7Ozs7OztJQUVoRCx1REFBaUI7Ozs7O0lBQWpCLFVBQWtCLEdBQW9CLEVBQUUsU0FBZ0I7UUFBaEIsMEJBQUEsRUFBQSxnQkFBZ0I7O1lBQ2hELFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDL0MsSUFBSSxTQUFTO1lBQUUsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVTs7OztZQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFNBQVMsRUFBWCxDQUFXLEVBQUMsQ0FBQyxDQUFBO1FBQ2xHLE9BQU8sVUFBVSxDQUFBO0lBQ25CLENBQUM7SUFDSCxrQ0FBQztBQUFELENBQUMsQUFoQkQsQ0FBMEMsUUFBUSxHQWdCakQ7Ozs7OztJQWZDLHFEQUF5RTs7SUFJdkUsOENBQWtDOztJQUNsQyxpREFBOEM7O0lBQzlDLDhDQUF1Qzs7SUFDdkMsNENBQW9COztBQVd4QjtJQUFxQyxrREFBUTtJQU8zQyxnQ0FDUyxPQUEyQixFQUMzQixVQUF1QyxFQUN2QyxPQUFnQyxFQUNoQyxLQUFhO1FBSnRCLFlBS0ksa0JBQU0sT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLFNBQUU7UUFKdkMsYUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsZ0JBQVUsR0FBVixVQUFVLENBQTZCO1FBQ3ZDLGFBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFdBQUssR0FBTCxLQUFLLENBQVE7UUFUZixtQkFBYSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQWUsY0FBYyxDQUFDLENBQUE7UUFDM0QseUJBQW1CLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBcUIsb0JBQW9CLENBQUMsQ0FBQTtRQUU3RSxpQkFBVyxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsRUFBVSxDQUFBOztJQU9QLENBQUM7Ozs7OztJQUVoRCxrREFBaUI7Ozs7O0lBQWpCLFVBQWtCLEdBQW9CLEVBQUUsU0FBZ0I7UUFBaEIsMEJBQUEsRUFBQSxnQkFBZ0I7O1lBQ2hELFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDOUMsSUFBSSxTQUFTO1lBQUUsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVTs7OztZQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFNBQVMsRUFBWCxDQUFXLEVBQUMsQ0FBQyxDQUFBO1FBQ2xHLE9BQU8sVUFBVSxDQUFBO0lBQ25CLENBQUM7Ozs7OztJQUVELDRDQUFXOzs7OztJQUFYLFVBQVksV0FBb0MsRUFBRSxTQUFnQjtRQUFoQiwwQkFBQSxFQUFBLGdCQUFnQjs7WUFDMUQsR0FBRyxHQUFHLHVCQUF1QixDQUFDLFdBQVcsQ0FBQzs7WUFDMUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQXFCLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDM0UsSUFBSSxTQUFTLEVBQUU7WUFDYixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVTs7OztZQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLFNBQVMsRUFBZCxDQUFjLEVBQUMsRUFDbEUsR0FBRzs7OztZQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFiLENBQWEsRUFBQyxDQUM1QixDQUFBO1NBQ0Y7UUFDRCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQ3BCLEdBQUc7Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBYixDQUFhLEVBQUMsQ0FDNUIsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVELHlEQUF3Qjs7Ozs7SUFBeEIsVUFBeUIsV0FBNEMsRUFBRSxTQUFnQjtRQUFoQiwwQkFBQSxFQUFBLGdCQUFnQjtRQUNyRixPQUFPLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUN2RSxHQUFHOzs7O1FBQUMsVUFBQSxZQUFZLElBQUksT0FBQSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQXBCLENBQW9CLEVBQUMsQ0FDMUMsQ0FBQTtJQUNILENBQUM7Ozs7OztJQUNELGlFQUFnQzs7Ozs7SUFBaEMsVUFBaUMsV0FBNEMsRUFBRSxTQUFnQjtRQUFoQiwwQkFBQSxFQUFBLGdCQUFnQjs7WUFDdkYsR0FBRyxHQUFHLCtCQUErQixDQUFDLFdBQVcsQ0FBQzs7WUFDbEQsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQXFCLHFCQUFxQixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwRixJQUFJLFNBQVMsRUFBRTtZQUNiLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVU7Ozs7WUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxTQUFTLEVBQWQsQ0FBYyxFQUFDLENBQUMsQ0FBQTtTQUMzRjtRQUNELE9BQU8sVUFBVSxDQUFBO0lBQ25CLENBQUM7Ozs7OztJQUVELDJDQUFVOzs7OztJQUFWLFVBQVcsV0FBbUMsRUFBRSxTQUFnQjtRQUFoQiwwQkFBQSxFQUFBLGdCQUFnQjs7WUFDeEQsR0FBRyxHQUFHLHNCQUFzQixDQUFDLFdBQVcsQ0FBQzs7WUFDekMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQXFCLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDMUUsSUFBSSxTQUFTLEVBQUU7WUFDYixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVTs7OztZQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLFNBQVMsRUFBZCxDQUFjLEVBQUMsRUFDbEUsR0FBRzs7OztZQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFiLENBQWEsRUFBQyxDQUM1QixDQUFBO1NBQ0Y7UUFDRCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQ3BCLEdBQUc7Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBYixDQUFhLEVBQUMsQ0FDNUIsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVELHdEQUF1Qjs7Ozs7SUFBdkIsVUFBd0IsV0FBMkMsRUFBRSxTQUFnQjtRQUFoQiwwQkFBQSxFQUFBLGdCQUFnQjtRQUNuRixPQUFPLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUN0RSxHQUFHOzs7O1FBQUMsVUFBQSxZQUFZLElBQUksT0FBQSxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQXBCLENBQW9CLEVBQUMsQ0FDMUMsQ0FBQTtJQUNILENBQUM7Ozs7OztJQUVELGdFQUErQjs7Ozs7SUFBL0IsVUFBZ0MsV0FBMkMsRUFBRSxTQUFnQjtRQUFoQiwwQkFBQSxFQUFBLGdCQUFnQjs7WUFDckYsR0FBRyxHQUFHLDhCQUE4QixDQUFDLFdBQVcsQ0FBQzs7WUFDakQsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQXFCLG9CQUFvQixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNuRixJQUFJLFNBQVMsRUFBRTtZQUNiLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVOzs7O1lBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsU0FBUyxFQUFkLENBQWMsRUFBQyxDQUNuRSxDQUFBO1NBQ0Y7UUFDRCxPQUFPLFVBQVUsQ0FBQTtJQUNuQixDQUFDO0lBRUgsNkJBQUM7QUFBRCxDQUFDLEFBL0VELENBQXFDLFFBQVEsR0ErRTVDOzs7SUE3RUMsK0NBQWtFOztJQUNsRSxxREFBb0Y7O0lBRXBGLDZDQUFzRDs7SUFHcEQseUNBQWtDOztJQUNsQyw0Q0FBOEM7O0lBQzlDLHlDQUF1Qzs7SUFDdkMsdUNBQW9COztBQXVFeEI7SUFBd0MscURBQVE7SUFLOUMsbUNBQ1MsT0FBMkIsRUFDM0IsVUFBdUMsRUFDdkMsT0FBZ0MsRUFDaEMsS0FBYTtRQUp0QixZQUtJLGtCQUFNLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxTQUFFO1FBSnZDLGFBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLGdCQUFVLEdBQVYsVUFBVSxDQUE2QjtRQUN2QyxhQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxXQUFLLEdBQUwsS0FBSyxDQUFRO1FBUmQsb0JBQWMsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFrQixjQUFjLENBQUMsQ0FBQTtRQUMvRCw4Q0FBd0MsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUF3Qix3Q0FBd0MsQ0FBQyxDQUFBO1FBQ3pILDhCQUF3QixHQUFHLEtBQUksQ0FBQyxRQUFRLENBQXdCLHdCQUF3QixDQUFDLENBQUE7O0lBT2xELENBQUM7Ozs7OztJQUVoRCxxREFBaUI7Ozs7O0lBQWpCLFVBQWtCLEdBQW9CLEVBQUUsU0FBZ0I7UUFBaEIsMEJBQUEsRUFBQSxnQkFBZ0I7O1lBQ2hELFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDL0MsSUFBSSxTQUFTO1lBQUUsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVTs7OztZQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFNBQVMsRUFBWCxDQUFXLEVBQUMsQ0FBQyxDQUFBO1FBQ2xHLE9BQU8sVUFBVSxDQUFBO0lBQ25CLENBQUM7Ozs7OztJQUVELG1GQUErQzs7Ozs7SUFBL0MsVUFBZ0QsR0FBVyxFQUFFLFNBQWdCO1FBQWhCLDBCQUFBLEVBQUEsZ0JBQWdCOztZQUNyRSxVQUFVLEdBQUcsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDekUsSUFBSSxTQUFTLEVBQUU7WUFDYixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVTs7OztZQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLFNBQVMsRUFBZCxDQUFjLEVBQUMsQ0FDbkUsQ0FBQTtTQUNGO1FBQ0QsT0FBTyxVQUFVLENBQUE7SUFDbkIsQ0FBQzs7Ozs7O0lBR0QsbUVBQStCOzs7OztJQUEvQixVQUFnQyxHQUFvQixFQUFFLFNBQWdCO1FBQWhCLDBCQUFBLEVBQUEsZ0JBQWdCOztZQUM5RCxVQUFVLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDekQsSUFBSSxTQUFTLEVBQUU7WUFDYixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVTs7OztZQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLFNBQVMsRUFBZCxDQUFjLEVBQUMsQ0FDbkUsQ0FBQTtTQUNGO1FBQ0QsT0FBTyxVQUFVLENBQUE7SUFDbkIsQ0FBQztJQUVILGdDQUFDO0FBQUQsQ0FBQyxBQXZDRCxDQUF3QyxRQUFRLEdBdUMvQzs7Ozs7O0lBdENDLG1EQUF1RTs7Ozs7SUFDdkUsNkVBQWlJOzs7OztJQUNqSSw2REFBaUc7O0lBRy9GLDRDQUFrQzs7SUFDbEMsK0NBQThDOztJQUM5Qyw0Q0FBdUM7O0lBQ3ZDLDBDQUFvQjs7QUFpQ3hCO0lBQXVDLG9EQUFRO0lBRzdDLGtDQUNTLE9BQTJCLEVBQzNCLFVBQXVDLEVBQ3ZDLE9BQWdDLEVBQ2hDLEtBQWE7UUFKdEIsWUFLSSxrQkFBTSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsU0FBRTtRQUp2QyxhQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixnQkFBVSxHQUFWLFVBQVUsQ0FBNkI7UUFDdkMsYUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQU5mLG1CQUFhLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBaUIsY0FBYyxDQUFDLENBQUE7O0lBT3JCLENBQUM7SUFDbEQsK0JBQUM7QUFBRCxDQUFDLEFBVEQsQ0FBdUMsUUFBUSxHQVM5Qzs7O0lBUkMsaURBQW9FOztJQUdsRSwyQ0FBa0M7O0lBQ2xDLDhDQUE4Qzs7SUFDOUMsMkNBQXVDOztJQUN2Qyx5Q0FBb0I7O0FBSXhCO0lBQXNDLG1EQUFRO0lBRzVDLGlDQUNTLE9BQTJCLEVBQzNCLFVBQXVDLEVBQ3ZDLE9BQWdDLEVBQ2hDLEtBQWE7UUFKdEIsWUFLSSxrQkFBTSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsU0FBRTtRQUp2QyxhQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixnQkFBVSxHQUFWLFVBQVUsQ0FBNkI7UUFDdkMsYUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQU5mLG1CQUFhLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBZ0IsY0FBYyxDQUFDLENBQUE7O0lBT3BCLENBQUM7SUFDbEQsOEJBQUM7QUFBRCxDQUFDLEFBVEQsQ0FBc0MsUUFBUSxHQVM3Qzs7O0lBUkMsZ0RBQW1FOztJQUdqRSwwQ0FBa0M7O0lBQ2xDLDZDQUE4Qzs7SUFDOUMsMENBQXVDOztJQUN2Qyx3Q0FBb0I7O0FBSXhCO0lBQWlDLDhDQUFRO0lBR3ZDLDRCQUNTLE9BQTJCLEVBQzNCLFVBQXVDLEVBQ3ZDLE9BQWdDLEVBQ2hDLEtBQWE7UUFKdEIsWUFLSSxrQkFBTSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsU0FBRTtRQUp2QyxhQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixnQkFBVSxHQUFWLFVBQVUsQ0FBNkI7UUFDdkMsYUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQU5mLG1CQUFhLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBVyxjQUFjLENBQUMsQ0FBQTs7SUFPZixDQUFDO0lBQ2xELHlCQUFDO0FBQUQsQ0FBQyxBQVRELENBQWlDLFFBQVEsR0FTeEM7OztJQVJDLDJDQUE4RDs7SUFHNUQscUNBQWtDOztJQUNsQyx3Q0FBOEM7O0lBQzlDLHFDQUF1Qzs7SUFDdkMsbUNBQW9COztBQUl4QjtJQUF5QyxzREFBUTtJQUcvQyxvQ0FDUyxPQUEyQixFQUMzQixVQUF1QyxFQUN2QyxPQUFnQyxFQUNoQyxLQUFhO1FBSnRCLFlBS0ksa0JBQU0sT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLFNBQUU7UUFKdkMsYUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsZ0JBQVUsR0FBVixVQUFVLENBQTZCO1FBQ3ZDLGFBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFdBQUssR0FBTCxLQUFLLENBQVE7UUFOZixtQkFBYSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQW1CLGNBQWMsQ0FBQyxDQUFBOztJQU92QixDQUFDO0lBQ2xELGlDQUFDO0FBQUQsQ0FBQyxBQVRELENBQXlDLFFBQVEsR0FTaEQ7OztJQVJDLG1EQUFzRTs7SUFHcEUsNkNBQWtDOztJQUNsQyxnREFBOEM7O0lBQzlDLDZDQUF1Qzs7SUFDdkMsMkNBQW9COztBQUl4QjtJQUFvQyxpREFBUTtJQUcxQywrQkFDUyxPQUEyQixFQUMzQixVQUF1QyxFQUN2QyxPQUFnQyxFQUNoQyxLQUFhO1FBSnRCLFlBS0ksa0JBQU0sT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLFNBQUU7UUFKdkMsYUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsZ0JBQVUsR0FBVixVQUFVLENBQTZCO1FBQ3ZDLGFBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFdBQUssR0FBTCxLQUFLLENBQVE7UUFOZixtQkFBYSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQWMsY0FBYyxDQUFDLENBQUE7O0lBT2xCLENBQUM7SUFDbEQsNEJBQUM7QUFBRCxDQUFDLEFBVEQsQ0FBb0MsUUFBUSxHQVMzQzs7O0lBUkMsOENBQWlFOztJQUcvRCx3Q0FBa0M7O0lBQ2xDLDJDQUE4Qzs7SUFDOUMsd0NBQXVDOztJQUN2QyxzQ0FBb0I7O0FBSXhCO0lBQXFDLGtEQUFRO0lBRzNDLGdDQUNTLE9BQTJCLEVBQzNCLFVBQXVDLEVBQ3ZDLE9BQWdDLEVBQ2hDLEtBQWE7UUFKdEIsWUFLSSxrQkFBTSxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsU0FBRTtRQUp2QyxhQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixnQkFBVSxHQUFWLFVBQVUsQ0FBNkI7UUFDdkMsYUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQU5mLG1CQUFhLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBZSxjQUFjLENBQUMsQ0FBQTs7SUFPbkIsQ0FBQztJQUNsRCw2QkFBQztBQUFELENBQUMsQUFURCxDQUFxQyxRQUFRLEdBUzVDOzs7SUFSQywrQ0FBa0U7O0lBR2hFLHlDQUFrQzs7SUFDbEMsNENBQThDOztJQUM5Qyx5Q0FBdUM7O0lBQ3ZDLHVDQUFvQjs7QUFJeEI7SUFlRSxxQkFBbUIsT0FBMkIsRUFBUyxVQUF1QztRQUEzRSxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUFTLGVBQVUsR0FBVixVQUFVLENBQTZCO1FBYjlGLHFCQUFnQixHQUFHLElBQUksMkJBQTJCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JILHFCQUFnQixHQUFHLElBQUksMkJBQTJCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JILGVBQVUsR0FBRyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDcEcsaUJBQVksR0FBRyxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDMUcsV0FBTSxHQUFHLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN4RixtQkFBYyxHQUFHLElBQUkseUJBQXlCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMvRyxpQkFBWSxHQUFHLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN6RyxvQkFBZSxHQUFHLElBQUksMEJBQTBCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2xILGNBQVMsR0FBRyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakcsZUFBVSxHQUFHLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVwRyxzQkFBaUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7SUFFMEIsQ0FBQzs7Ozs7SUFFbkcsdUNBQWlCOzs7O0lBQWpCLFVBQWtCLFFBQWdCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQW9DLENBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQzs7OztJQWxCQyx1Q0FBcUg7O0lBQ3JILHVDQUFxSDs7SUFDckgsaUNBQW9HOztJQUNwRyxtQ0FBMEc7O0lBQzFHLDZCQUF3Rjs7SUFDeEYscUNBQStHOztJQUMvRyxtQ0FBeUc7O0lBQ3pHLHNDQUFrSDs7SUFDbEgsZ0NBQWlHOztJQUNqRyxpQ0FBb0c7O0lBRXBHLHdDQUF3RTs7SUFFNUQsOEJBQWtDOztJQUFFLGlDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBCeVBrLCBFbnRpdHlNb2RlbEFuZENsYXNzLCBnZXRGcm9tVG8sIElBcHBTdGF0ZSwgSW5kZXhTdGF0ZW1lbnRCeU9iamVjdCwgaW5kZXhTdGF0ZW1lbnRCeU9iamVjdCwgSW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5LCBpbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIEluZGV4U3RhdGVtZW50QnlTdWJqZWN0LCBpbmRleFN0YXRlbWVudEJ5U3ViamVjdCwgSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSwgaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSwgaW5mRGVmaW5pdGlvbnMsIGluZlJvb3QsIHBhZ2luYXRlQnksIFBSX0VOVElUWV9NT0RFTF9NQVAsIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLCBzdWJmaWVsZElkVG9TdHJpbmcgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IEluZkFwcGVsbGF0aW9uLCBJbmZEaW1lbnNpb24sIEluZkxhbmdTdHJpbmcsIEluZkxhbmd1YWdlLCBJbmZQZXJzaXN0ZW50SXRlbSwgSW5mUGxhY2UsIEluZlN0YXRlbWVudCwgSW5mVGVtcG9yYWxFbnRpdHksIEluZlRleHRQcm9wZXJ0eSwgSW5mVGltZVByaW1pdGl2ZSwgUHJvSW5mb1Byb2pSZWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgR3ZTdWJmaWVsZElkLCBHdlN1YmZpZWxkUGFnZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0T3JFbXB0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgdmFsdWVzIH0gZnJvbSAnZDMnO1xuaW1wb3J0IHsgZXF1YWxzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIHBpcGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZmlyc3QsIG1hcCwgc3dpdGNoTWFwLCB0aHJvdHRsZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5leHBvcnQgdHlwZSBJbmZNb2RlbE5hbWUgPSAncGVyc2lzdGVudF9pdGVtJyB8ICd0ZW1wb3JhbF9lbnRpdHknIHwgJ3N0YXRlbWVudCcgfCAndGV4dF9wcm9wZXJ0eScgfCAnYXBwZWxsYXRpb24nIHwgJ2xhbmd1YWdlJyB8ICdwbGFjZScgfCAnZGltZW5zaW9uJyB8ICdsYW5nX3N0cmluZycgfCAndGltZV9wcmltaXRpdmUnO1xuXG5jbGFzcyBTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IH1cblxuICBzZWxlY3RvcjxNPihpbmRleEtleTogc3RyaW5nKTogeyBhbGwkOiBPYnNlcnZhYmxlPEJ5UGs8TT4+LCBrZXk6ICh4KSA9PiBPYnNlcnZhYmxlPE0+IH0ge1xuXG4gICAgY29uc3QgYWxsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8QnlQazxNPj4oW2luZlJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5XSlcbiAgICBjb25zdCBrZXkgPSAoeCk6IE9ic2VydmFibGU8TT4gPT4ge1xuICAgICAgLy8gUkVNQVJLOiAnZXF1YWxzJyBjb21wYXJhdG9yIGlzIHZlcnkgdmVyeSBpbXBvcnRhbnQgZm9yIHBlcmZvcm1hbmNlICFcbiAgICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFtpbmZSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleSwgeF0sIGVxdWFscylcbiAgICB9XG4gICAgcmV0dXJuIHsgYWxsJCwga2V5IH1cbiAgfVxuXG4gIHBhZ2luYXRpb25TZWxlY3RvcjxNPigpIHtcblxuICAgIGNvbnN0IHBpcGVQYWdlID0gKHBhZ2U6IEd2U3ViZmllbGRQYWdlKTogT2JzZXJ2YWJsZTxNW10+ID0+IHtcbiAgICAgIGxldCBwYXRoOiBhbnlbXTtcbiAgICAgIGNvbnN0IHBhZ0J5ID0gcGFnaW5hdGVCeVxuICAgICAgY29uc3Qga2V5ID0gc3ViZmllbGRJZFRvU3RyaW5nKHBhZ2UpXG4gICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHBhZ0J5LCBrZXldO1xuICAgICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8bnVtYmVyPihbLi4ucGF0aCwgJ2NvdW50J10pXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcihjb3VudCA9PiBjb3VudCAhPT0gdW5kZWZpbmVkKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoY291bnQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBwYWdlLm9mZnNldDtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IGNvdW50IDw9IChzdGFydCArIHBhZ2UubGltaXQpID8gY291bnQgOiAoc3RhcnQgKyBwYWdlLmxpbWl0KTtcbiAgICAgICAgICAgIGNvbnN0IG9icyQ6IE9ic2VydmFibGU8TT5bXSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgICAgb2JzJC5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oWy4uLnBhdGgsICdyb3dzJywgaV0pLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KG9icyQpXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgIH1cblxuXG4gICAgY29uc3QgcGlwZVBhZ2VMb2FkTmVlZGVkID0gKHBhZ2U6IEd2U3ViZmllbGRQYWdlLCB0cmlnZ2VyJDogT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxib29sZWFuPiA9PiB7XG4gICAgICBsZXQgcGF0aDogYW55W107XG4gICAgICBjb25zdCBwYWdCeSA9IHBhZ2luYXRlQnlcbiAgICAgIGNvbnN0IGtleSA9IHN1YmZpZWxkSWRUb1N0cmluZyhwYWdlKVxuXG4gICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHBhZ0J5LCBrZXldO1xuICAgICAgY29uc3QgZnJvbVRvU3RyaW5nID0gZ2V0RnJvbVRvKHBhZ2UubGltaXQsIHBhZ2Uub2Zmc2V0KVxuICAgICAgLy8gcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWy4uLnBhdGgsICdsb2FkaW5nJywgZnJvbVRvU3RyaW5nXSlcbiAgICAgIC8vICAgLnBpcGUoXG4gICAgICAvLyAgICAgLy8gbWFwKGxvYWRpbmcgPT4gIWxvYWRpbmcpLFxuICAgICAgLy8gICAgIHN3aXRjaE1hcCgobG9hZGluZykgPT4ge1xuICAgICAgLy8gICAgICAgaWYgKGxvYWRpbmcpIHJldHVybiBvZihmYWxzZSlcbiAgICAgIC8vICAgICAgIGVsc2UgcmV0dXJuIHRyaWdnZXIkLnBpcGUobWFwVG8odHJ1ZSkpXG4gICAgICAvLyAgICAgfSksXG4gICAgICAvLyAgICAgLy8gZmlyc3QoKSxcbiAgICAgIC8vICAgKVxuXG4gICAgICByZXR1cm4gdHJpZ2dlciQucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWy4uLnBhdGgsICdsb2FkaW5nJywgZnJvbVRvU3RyaW5nXSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpcnN0KCksXG4gICAgICAgICAgICBtYXAobG9hZGluZyA9PiAhbG9hZGluZylcbiAgICAgICAgICApXG4gICAgICAgICkpXG5cbiAgICB9XG5cblxuICAgIGNvbnN0IHBpcGVDb3VudCA9IChwYWdlOiBHdlN1YmZpZWxkSWQpOiBPYnNlcnZhYmxlPG51bWJlciB8IHVuZGVmaW5lZD4gPT4ge1xuICAgICAgbGV0IHBhdGg6IGFueVtdO1xuICAgICAgY29uc3QgcGFnQnkgPSBwYWdpbmF0ZUJ5XG4gICAgICBjb25zdCBrZXkgPSBzdWJmaWVsZElkVG9TdHJpbmcocGFnZSlcblxuICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCBwYWdCeSwga2V5XTtcbiAgICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PG51bWJlcj4oWy4uLnBhdGgsICdjb3VudCddKVxuICAgIH1cblxuXG4gICAgcmV0dXJuIHsgcGlwZVBhZ2UsIHBpcGVDb3VudCwgcGlwZVBhZ2VMb2FkTmVlZGVkIH1cblxuICB9XG5cblxuICBwaXBlSXRlbXNJblByb2plY3Q8TT4ocGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LCBnZXRGa0VudGl0eTogKGl0ZW06IE0pID0+IG51bWJlcikge1xuXG4gICAgcmV0dXJuIHBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGl0ZW1zOiBCeVBrPE0+KSA9PiB7XG4gICAgICAgIHJldHVybiBwa1Byb2plY3QkLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9SZWxzQW5kS2V5JDogT2JzZXJ2YWJsZTx7IGtleTogc3RyaW5nLCByZWw6IFByb0luZm9Qcm9qUmVsIH0+W10gPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgayBpbiBpdGVtcykge1xuICAgICAgICAgICAgICBpZiAoaXRlbXMuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNba107XG4gICAgICAgICAgICAgICAgcHJvUmVsc0FuZEtleSQucHVzaChcbiAgICAgICAgICAgICAgICAgIHRoaXMubmdSZWR1eC5zZWxlY3Q8UHJvSW5mb1Byb2pSZWw+KFsncHJvJywgJ2luZm9fcHJval9yZWwnLCAnYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JywgcGtQcm9qZWN0ICsgJ18nICsgZ2V0RmtFbnRpdHkoaXRlbSldKVxuICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAocmVsID0+ICh7IGtleTogaywgcmVsIH0pKSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShwcm9SZWxzQW5kS2V5JCkucGlwZShcbiAgICAgICAgICAgICAgdGhyb3R0bGVUaW1lKDApLFxuICAgICAgICAgICAgICBtYXAocHJvUmVscyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXNJblByb2plY3Q6IEJ5UGs8TT4gPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb1JlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHByb1JlbCA9IHByb1JlbHNbaV07XG4gICAgICAgICAgICAgICAgICBpZiAocHJvUmVsLnJlbCAmJiBwcm9SZWwucmVsLmlzX2luX3Byb2plY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNJblByb2plY3RbcHJvUmVsLmtleV0gPSBpdGVtc1twcm9SZWwua2V5XVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXNJblByb2plY3Q7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuXG4gICAgICB9KVxuICAgIClcblxuICB9XG5cbiAgcGlwZUl0ZW1JblByb2plY3Q8TT4ocGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LCBnZXRGa0VudGl0eTogKGl0ZW06IE0pID0+IG51bWJlcikge1xuICAgIHJldHVybiBwaXBlKFxuICAgICAgc3dpdGNoTWFwKChpdGVtOiBNKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgICAgIHJldHVybiBwa1Byb2plY3QkLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9SZWwkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxQcm9JbmZvUHJvalJlbD4oWydwcm8nLCAnaW5mb19wcm9qX3JlbCcsICdieV9ma19wcm9qZWN0X19ma19lbnRpdHknLCBwa1Byb2plY3QgKyAnXycgKyBnZXRGa0VudGl0eShpdGVtKV0pXG4gICAgICAgICAgICByZXR1cm4gcHJvUmVsJC5waXBlKFxuICAgICAgICAgICAgICAvLyBmaWx0ZXIocHJvUmVsID0+IHByb1JlbC5pc19pbl9wcm9qZWN0ID09IHRydWUpLFxuICAgICAgICAgICAgICBtYXAoKHByb1JlbCkgPT4gcHJvUmVsICYmIHByb1JlbC5pc19pbl9wcm9qZWN0ID09IHRydWUgPyBpdGVtIDogdW5kZWZpbmVkKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cbmNsYXNzIEluZlBlcnNpc3RlbnRJdGVtU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHJpdmF0ZSBfYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mUGVyc2lzdGVudEl0ZW0+KCdieV9wa19lbnRpdHknKVxuICBwcml2YXRlIF9ieV9ma19jbGFzcyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mUGVyc2lzdGVudEl0ZW0+PignYnlfZmtfY2xhc3MnKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuICBieV9wa19lbnRpdHlfYWxsJChvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQuYWxsJFxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbiAgYnlfZmtfY2xhc3Nfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9ma19jbGFzcyQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG59XG5cbmNsYXNzIEluZlRlbXBvcmFsRW50aXR5U2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHJpdmF0ZSBfYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mVGVtcG9yYWxFbnRpdHk+KCdieV9wa19lbnRpdHknKVxuICAvLyBwdWJsaWMgYnlfZmtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlRlbXBvcmFsRW50aXR5Pj4oJ2J5X2ZrX2NsYXNzJylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbn1cblxuXG5jbGFzcyBJbmZTdGF0ZW1lbnRTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuXG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZTdGF0ZW1lbnQ+KCdieV9wa19lbnRpdHknKVxuICBwdWJsaWMgYnlfZmtfc3ViamVjdF9kYXRhJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfZmtfc3ViamVjdF9kYXRhJylcblxuICBwdWJsaWMgcGFnaW5hdGlvbiQgPSB0aGlzLnBhZ2luYXRpb25TZWxlY3RvcjxudW1iZXI+KClcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG4gIGJ5X3N1YmplY3QkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5U3ViamVjdCwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5U3ViamVjdChmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfc3ViamVjdCcpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICk7XG4gIH1cblxuICBieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYnlfc3ViamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoZm9yZWlnbktleXMsIG9mUHJvamVjdCkucGlwZShcbiAgICAgIG1hcChzdGF0ZW1lbnRJZHggPT4gdmFsdWVzKHN0YXRlbWVudElkeCkpXG4gICAgKVxuICB9XG4gIGJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlN0YXRlbWVudD4+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5KGZvcmVpZ25LZXlzKTtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9zdWJqZWN0K3Byb3BlcnR5Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSlcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG4gIGJ5X29iamVjdCQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlPYmplY3QsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeU9iamVjdChmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfb2JqZWN0Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgbWFwKGl0ZW1zID0+IHZhbHVlcyhpdGVtcykpXG4gICAgKTtcbiAgfVxuXG4gIGJ5X29iamVjdF9hbmRfcHJvcGVydHkkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5cywgb2ZQcm9qZWN0KS5waXBlKFxuICAgICAgbWFwKHN0YXRlbWVudElkeCA9PiB2YWx1ZXMoc3RhdGVtZW50SWR4KSlcbiAgICApXG4gIH1cblxuICBieV9vYmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mU3RhdGVtZW50Pj4ge1xuICAgIGNvbnN0IGtleSA9IGluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eShmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfb2JqZWN0K3Byb3BlcnR5Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxufVxuXG5cbmNsYXNzIEluZlRleHRQcm9wZXJ0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlRleHRQcm9wZXJ0eT4oJ2J5X3BrX2VudGl0eScpXG4gIHByaXZhdGUgX2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZUZXh0UHJvcGVydHk+PignYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGQnKVxuICBwcml2YXRlIF9ieV9ma19jb25jZXJuZWRfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZUZXh0UHJvcGVydHk+PignYnlfZmtfY29uY2VybmVkX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cblxuICBieV9wa19lbnRpdHlfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbiAgYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGRfaW5kZXhlZCQoa2V5OiBzdHJpbmcsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZCQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuXG4gIGJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfaW5kZXhlZCQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9ma19jb25jZXJuZWRfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG59XG5cblxuY2xhc3MgSW5mQXBwZWxsYXRpb25TZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mQXBwZWxsYXRpb24+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZkxhbmdTdHJpbmdTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mTGFuZ1N0cmluZz4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mUGxhY2VTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mUGxhY2U+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZlRpbWVQcmltaXRpdmVTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mVGltZVByaW1pdGl2ZT4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mTGFuZ3VhZ2VTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mTGFuZ3VhZ2U+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZkRpbWVuc2lvblNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZEaW1lbnNpb24+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbmZTZWxlY3RvciB7XG5cbiAgcGVyc2lzdGVudF9pdGVtJCA9IG5ldyBJbmZQZXJzaXN0ZW50SXRlbVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAncGVyc2lzdGVudF9pdGVtJyk7XG4gIHRlbXBvcmFsX2VudGl0eSQgPSBuZXcgSW5mVGVtcG9yYWxFbnRpdHlTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3RlbXBvcmFsX2VudGl0eScpO1xuICBzdGF0ZW1lbnQkID0gbmV3IEluZlN0YXRlbWVudFNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnc3RhdGVtZW50Jyk7XG4gIGFwcGVsbGF0aW9uJCA9IG5ldyBJbmZBcHBlbGxhdGlvblNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnYXBwZWxsYXRpb24nKTtcbiAgcGxhY2UkID0gbmV3IEluZlBsYWNlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdwbGFjZScpO1xuICB0ZXh0X3Byb3BlcnR5JCA9IG5ldyBJbmZUZXh0UHJvcGVydHlTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3RleHRfcHJvcGVydHknKTtcbiAgbGFuZ19zdHJpbmckID0gbmV3IEluZkxhbmdTdHJpbmdTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ2xhbmdfc3RyaW5nJyk7XG4gIHRpbWVfcHJpbWl0aXZlJCA9IG5ldyBJbmZUaW1lUHJpbWl0aXZlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICd0aW1lX3ByaW1pdGl2ZScpO1xuICBsYW5ndWFnZSQgPSBuZXcgSW5mTGFuZ3VhZ2VTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ2xhbmd1YWdlJyk7XG4gIGRpbWVuc2lvbiQgPSBuZXcgSW5mRGltZW5zaW9uU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdkaW1lbnNpb24nKTtcblxuICBwa0VudGl0eU1vZGVsTWFwJCA9IHRoaXMubmdSZWR1eC5zZWxlY3QoW2luZlJvb3QsIFBSX0VOVElUWV9NT0RFTF9NQVBdKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LCBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+KSB7IH1cblxuICBnZXRNb2RlbE9mRW50aXR5JChwa0VudGl0eTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8RW50aXR5TW9kZWxBbmRDbGFzczxJbmZNb2RlbE5hbWU+PihbaW5mUm9vdCwgUFJfRU5USVRZX01PREVMX01BUCwgcGtFbnRpdHldKTtcbiAgfVxufVxuIl19