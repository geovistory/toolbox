/**
 * @fileoverview added by tsickle
 * Generated from: selectors/inf.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { getFromTo, indexStatementByObject, indexStatementByObjectProperty, indexStatementBySubject, indexStatementBySubjectProperty, infDefinitions, infRoot, paginatedBy, paginateKey, paginateName, PR_ENTITY_MODEL_MAP } from '@kleiolab/lib-redux';
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
        var all$ = this.pkProject$.pipe(switchMap((/**
         * @param {?} pk
         * @return {?}
         */
        function (pk) {
            /** @type {?} */
            var path;
            if (_this.configs[_this.model].facetteByPk) {
                path = [infRoot, _this.model, _this.configs[_this.model].facetteByPk, pk, indexKey];
            }
            else {
                path = [infRoot, _this.model, indexKey];
            }
            return _this.ngRedux.select(path);
        })));
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return _this.pkProject$.pipe(switchMap((/**
             * @param {?} pk
             * @return {?}
             */
            function (pk) {
                /** @type {?} */
                var path;
                if (_this.configs[_this.model].facetteByPk) {
                    path = [infRoot, _this.model, _this.configs[_this.model].facetteByPk, pk, indexKey, x];
                }
                else {
                    path = [infRoot, _this.model, indexKey, x];
                }
                return _this.ngRedux.select(path);
            })));
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
         * @param {?} by
         * @param {?} limit
         * @param {?} offset
         * @return {?}
         */
        function (by, limit, offset) { return _this.pkProject$.pipe(switchMap((/**
         * @param {?} pk
         * @return {?}
         */
        function (pk) {
            /** @type {?} */
            var path;
            /** @type {?} */
            var pagBy = paginatedBy(paginateName(by));
            /** @type {?} */
            var key = paginateKey(by);
            if (_this.configs[_this.model].facetteByPk) {
                path = [infRoot, _this.model, _this.configs[_this.model].facetteByPk, pk, pagBy, key];
            }
            else {
                path = [infRoot, _this.model, pagBy, key];
            }
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
                var start = offset;
                /** @type {?} */
                var end = count <= (start + limit) ? count : (start + limit);
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
        }))); });
        /** @type {?} */
        var pipePageLoadNeeded = (/**
         * @param {?} by
         * @param {?} limit
         * @param {?} offset
         * @param {?=} trigger$
         * @return {?}
         */
        function (by, limit, offset, trigger$) { return _this.pkProject$.pipe(switchMap((/**
         * @param {?} pk
         * @return {?}
         */
        function (pk) {
            /** @type {?} */
            var path;
            /** @type {?} */
            var pagBy = paginatedBy(paginateName(by));
            /** @type {?} */
            var key = paginateKey(by);
            if (_this.configs[_this.model].facetteByPk) {
                path = [infRoot, _this.model, _this.configs[_this.model].facetteByPk, pk, pagBy, key];
            }
            else {
                path = [infRoot, _this.model, pagBy, key];
            }
            return trigger$.pipe(switchMap((/**
             * @return {?}
             */
            function () { return _this.ngRedux.select(tslib_1.__spread(path, ['loading', getFromTo(limit, offset)]))
                .pipe(first(), map((/**
             * @param {?} loading
             * @return {?}
             */
            function (loading) { return !loading; }))); })));
        }))); });
        /** @type {?} */
        var pipeCount = (/**
         * @param {?} by
         * @return {?}
         */
        function (by) { return _this.pkProject$.pipe(switchMap((/**
         * @param {?} pk
         * @return {?}
         */
        function (pk) {
            /** @type {?} */
            var path;
            /** @type {?} */
            var pagBy = paginatedBy(paginateName(by));
            /** @type {?} */
            var key = paginateKey(by);
            if (_this.configs[_this.model].facetteByPk) {
                path = [infRoot, _this.model, _this.configs[_this.model].facetteByPk, pk, pagBy, key];
            }
            else {
                path = [infRoot, _this.model, pagBy, key];
            }
            return _this.ngRedux.select(tslib_1.__spread(path, ['count']));
        }))); });
        return { pipePage: pipePage, pipePageLoadNeeded: pipePageLoadNeeded, pipeCount: pipeCount };
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
        _this._by_pk_entity$ = _this.selector('by_pk_entity');
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
    /**
     * @type {?}
     * @private
     */
    InfStatementSelections.prototype._by_pk_entity$;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL2luZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBNkIsU0FBUyxFQUFxQyxzQkFBc0IsRUFBa0MsOEJBQThCLEVBQTJCLHVCQUF1QixFQUFtQywrQkFBK0IsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFtQixXQUFXLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBMkIsTUFBTSxxQkFBcUIsQ0FBQztBQUUxYixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQzVCLE9BQU8sRUFBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUcvRDtJQUNFLGtCQUNTLE9BQTJCLEVBQzNCLFVBQXVDLEVBQ3ZDLE9BQWdDLEVBQ2hDLEtBQWE7UUFIYixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixlQUFVLEdBQVYsVUFBVSxDQUE2QjtRQUN2QyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQ2xCLENBQUM7Ozs7OztJQUVMLDJCQUFROzs7OztJQUFSLFVBQVksUUFBZ0I7UUFBNUIsaUJBK0JDOztZQTdCTyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQy9CLFNBQVM7Ozs7UUFBQyxVQUFBLEVBQUU7O2dCQUNOLElBQVc7WUFDZixJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcs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Q0FBb0c7O0lBQ3BHLG1DQUEwRzs7SUFDMUcsNkJBQXdGOztJQUN4RixxQ0FBK0c7O0lBQy9HLG1DQUF5Rzs7SUFDekcsc0NBQWtIOztJQUNsSCxnQ0FBaUc7O0lBQ2pHLGlDQUFvRzs7SUFFcEcsd0NBQXdFOztJQUU1RCw4QkFBa0M7O0lBQUUsaUNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEJ5UGssIEVudGl0eU1vZGVsQW5kQ2xhc3MsIGdldEZyb21UbywgSUFwcFN0YXRlLCBJbmRleFN0YXRlbWVudEJ5T2JqZWN0LCBpbmRleFN0YXRlbWVudEJ5T2JqZWN0LCBJbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIGluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eSwgSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QsIGluZGV4U3RhdGVtZW50QnlTdWJqZWN0LCBJbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBpbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBpbmZEZWZpbml0aW9ucywgaW5mUm9vdCwgUGFnaW5hdGVCeVBhcmFtLCBwYWdpbmF0ZWRCeSwgcGFnaW5hdGVLZXksIHBhZ2luYXRlTmFtZSwgUFJfRU5USVRZX01PREVMX01BUCwgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IEluZkFwcGVsbGF0aW9uLCBJbmZEaW1lbnNpb24sIEluZkxhbmdTdHJpbmcsIEluZkxhbmd1YWdlLCBJbmZQZXJzaXN0ZW50SXRlbSwgSW5mUGxhY2UsIEluZlN0YXRlbWVudCwgSW5mVGVtcG9yYWxFbnRpdHksIEluZlRleHRQcm9wZXJ0eSwgSW5mVGltZVByaW1pdGl2ZSwgUHJvSW5mb1Byb2pSZWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdE9yRW1wdHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IHZhbHVlcyB9IGZyb20gJ2QzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBwaXBlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmV4cG9ydCB0eXBlIEluZk1vZGVsTmFtZSA9ICdwZXJzaXN0ZW50X2l0ZW0nIHwgJ3RlbXBvcmFsX2VudGl0eScgfCAnc3RhdGVtZW50JyB8ICd0ZXh0X3Byb3BlcnR5JyB8ICdhcHBlbGxhdGlvbicgfCAnbGFuZ3VhZ2UnIHwgJ3BsYWNlJyB8ICdkaW1lbnNpb24nIHwgJ2xhbmdfc3RyaW5nJyB8ICd0aW1lX3ByaW1pdGl2ZSc7XG5cbmNsYXNzIFNlbGVjdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgfVxuXG4gIHNlbGVjdG9yPE0+KGluZGV4S2V5OiBzdHJpbmcpOiB7IGFsbCQ6IE9ic2VydmFibGU8QnlQazxNPj4sIGtleTogKHgpID0+IE9ic2VydmFibGU8TT4gfSB7XG5cbiAgICBjb25zdCBhbGwkID0gdGhpcy5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGsgPT4ge1xuICAgICAgICBsZXQgcGF0aDogYW55W107XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3NbdGhpcy5tb2RlbF0uZmFjZXR0ZUJ5UGspIHtcbiAgICAgICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHRoaXMuY29uZmlnc1t0aGlzLm1vZGVsXS5mYWNldHRlQnlQaywgcGssIGluZGV4S2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxCeVBrPE0+PihwYXRoKVxuICAgICAgfSlcbiAgICApXG5cblxuICAgIGNvbnN0IGtleSA9ICh4KTogT2JzZXJ2YWJsZTxNPiA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5wa1Byb2plY3QkLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChwayA9PiB7XG4gICAgICAgICAgbGV0IHBhdGg6IGFueVtdO1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZ3NbdGhpcy5tb2RlbF0uZmFjZXR0ZUJ5UGspIHtcbiAgICAgICAgICAgIHBhdGggPSBbaW5mUm9vdCwgdGhpcy5tb2RlbCwgdGhpcy5jb25maWdzW3RoaXMubW9kZWxdLmZhY2V0dGVCeVBrLCBwaywgaW5kZXhLZXksIHhdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5LCB4XTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4ocGF0aClcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgIH1cblxuICAgIHJldHVybiB7IGFsbCQsIGtleSB9XG4gIH1cblxuICBwYWdpbmF0aW9uU2VsZWN0b3I8TT4oKSB7XG5cbiAgICBjb25zdCBwaXBlUGFnZSA9IChieTogUGFnaW5hdGVCeVBhcmFtW10sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKTogT2JzZXJ2YWJsZTxNW10+ID0+IHRoaXMucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrID0+IHtcbiAgICAgICAgbGV0IHBhdGg6IGFueVtdO1xuICAgICAgICBjb25zdCBwYWdCeSA9IHBhZ2luYXRlZEJ5KHBhZ2luYXRlTmFtZShieSkpXG4gICAgICAgIGNvbnN0IGtleSA9IHBhZ2luYXRlS2V5KGJ5KVxuICAgICAgICBpZiAodGhpcy5jb25maWdzW3RoaXMubW9kZWxdLmZhY2V0dGVCeVBrKSB7XG4gICAgICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCB0aGlzLmNvbmZpZ3NbdGhpcy5tb2RlbF0uZmFjZXR0ZUJ5UGssIHBrLCBwYWdCeSwga2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHBhZ0J5LCBrZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PG51bWJlcj4oWy4uLnBhdGgsICdjb3VudCddKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGNvdW50ID0+IGNvdW50ICE9PSB1bmRlZmluZWQpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKGNvdW50ID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBvZmZzZXQ7XG4gICAgICAgICAgICAgIGNvbnN0IGVuZCA9IGNvdW50IDw9IChzdGFydCArIGxpbWl0KSA/IGNvdW50IDogKHN0YXJ0ICsgbGltaXQpO1xuICAgICAgICAgICAgICBjb25zdCBvYnMkOiBPYnNlcnZhYmxlPE0+W10gPSBbXTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvYnMkLnB1c2goXG4gICAgICAgICAgICAgICAgICB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFsuLi5wYXRoLCAncm93cycsIGldKS5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShvYnMkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICB9KVxuICAgIClcblxuICAgIGNvbnN0IHBpcGVQYWdlTG9hZE5lZWRlZCA9IChieTogUGFnaW5hdGVCeVBhcmFtW10sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCB0cmlnZ2VyJD86IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8Ym9vbGVhbj4gPT4gdGhpcy5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGsgPT4ge1xuICAgICAgICBsZXQgcGF0aDogYW55W107XG4gICAgICAgIGNvbnN0IHBhZ0J5ID0gcGFnaW5hdGVkQnkocGFnaW5hdGVOYW1lKGJ5KSlcbiAgICAgICAgY29uc3Qga2V5ID0gcGFnaW5hdGVLZXkoYnkpXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3NbdGhpcy5tb2RlbF0uZmFjZXR0ZUJ5UGspIHtcbiAgICAgICAgICBwYXRoID0gW2luZlJvb3QsIHRoaXMubW9kZWwsIHRoaXMuY29uZmlnc1t0aGlzLm1vZGVsXS5mYWNldHRlQnlQaywgcGssIHBhZ0J5LCBrZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhdGggPSBbaW5mUm9vdCwgdGhpcy5tb2RlbCwgcGFnQnksIGtleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJpZ2dlciQucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbLi4ucGF0aCwgJ2xvYWRpbmcnLCBnZXRGcm9tVG8obGltaXQsIG9mZnNldCldKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGZpcnN0KCksXG4gICAgICAgICAgICAgIG1hcChsb2FkaW5nID0+ICFsb2FkaW5nKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICkpXG5cbiAgICAgIH0pXG4gICAgKVxuXG4gICAgY29uc3QgcGlwZUNvdW50ID0gKGJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSk6IE9ic2VydmFibGU8bnVtYmVyIHwgdW5kZWZpbmVkPiA9PiB0aGlzLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwayA9PiB7XG4gICAgICAgIGxldCBwYXRoOiBhbnlbXTtcbiAgICAgICAgY29uc3QgcGFnQnkgPSBwYWdpbmF0ZWRCeShwYWdpbmF0ZU5hbWUoYnkpKVxuICAgICAgICBjb25zdCBrZXkgPSBwYWdpbmF0ZUtleShieSlcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnc1t0aGlzLm1vZGVsXS5mYWNldHRlQnlQaykge1xuICAgICAgICAgIHBhdGggPSBbaW5mUm9vdCwgdGhpcy5tb2RlbCwgdGhpcy5jb25maWdzW3RoaXMubW9kZWxdLmZhY2V0dGVCeVBrLCBwaywgcGFnQnksIGtleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGF0aCA9IFtpbmZSb290LCB0aGlzLm1vZGVsLCBwYWdCeSwga2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxudW1iZXI+KFsuLi5wYXRoLCAnY291bnQnXSlcbiAgICAgIH0pXG4gICAgKVxuXG4gICAgcmV0dXJuIHsgcGlwZVBhZ2UsIHBpcGVQYWdlTG9hZE5lZWRlZCwgcGlwZUNvdW50IH1cblxuICB9XG5cblxuICBwaXBlSXRlbXNJblByb2plY3Q8TT4ocGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LCBnZXRGa0VudGl0eTogKGl0ZW06IE0pID0+IG51bWJlcikge1xuICAgIHJldHVybiBwaXBlKFxuICAgICAgc3dpdGNoTWFwKChpdGVtczogQnlQazxNPikgPT4ge1xuICAgICAgICByZXR1cm4gcGtQcm9qZWN0JC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvUmVsc0FuZEtleSQ6IE9ic2VydmFibGU8eyBrZXk6IHN0cmluZywgcmVsOiBQcm9JbmZvUHJvalJlbCB9PltdID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGsgaW4gaXRlbXMpIHtcbiAgICAgICAgICAgICAgaWYgKGl0ZW1zLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2tdO1xuICAgICAgICAgICAgICAgIHByb1JlbHNBbmRLZXkkLnB1c2goXG4gICAgICAgICAgICAgICAgICB0aGlzLm5nUmVkdXguc2VsZWN0PFByb0luZm9Qcm9qUmVsPihbJ3BybycsICdpbmZvX3Byb2pfcmVsJywgJ2J5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eScsIHBrUHJvamVjdCArICdfJyArIGdldEZrRW50aXR5KGl0ZW0pXSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKHJlbCA9PiAoeyBrZXk6IGssIHJlbCB9KSkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkocHJvUmVsc0FuZEtleSQpLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChwcm9SZWxzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtc0luUHJvamVjdDogQnlQazxNPiA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvUmVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcHJvUmVsID0gcHJvUmVsc1tpXTtcbiAgICAgICAgICAgICAgICAgIGlmIChwcm9SZWwucmVsICYmIHByb1JlbC5yZWwuaXNfaW5fcHJvamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc0luUHJvamVjdFtwcm9SZWwua2V5XSA9IGl0ZW1zW3Byb1JlbC5rZXldXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtc0luUHJvamVjdDtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG5cbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgcGlwZUl0ZW1JblByb2plY3Q8TT4ocGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LCBnZXRGa0VudGl0eTogKGl0ZW06IE0pID0+IG51bWJlcikge1xuICAgIHJldHVybiBwaXBlKFxuICAgICAgc3dpdGNoTWFwKChpdGVtOiBNKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XG4gICAgICAgIHJldHVybiBwa1Byb2plY3QkLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9SZWwkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxQcm9JbmZvUHJvalJlbD4oWydwcm8nLCAnaW5mb19wcm9qX3JlbCcsICdieV9ma19wcm9qZWN0X19ma19lbnRpdHknLCBwa1Byb2plY3QgKyAnXycgKyBnZXRGa0VudGl0eShpdGVtKV0pXG4gICAgICAgICAgICByZXR1cm4gcHJvUmVsJC5waXBlKFxuICAgICAgICAgICAgICAvLyBmaWx0ZXIocHJvUmVsID0+IHByb1JlbC5pc19pbl9wcm9qZWN0ID09IHRydWUpLFxuICAgICAgICAgICAgICBtYXAoKHByb1JlbCkgPT4gcHJvUmVsICYmIHByb1JlbC5pc19pbl9wcm9qZWN0ID09IHRydWUgPyBpdGVtIDogdW5kZWZpbmVkKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cbmNsYXNzIEluZlBlcnNpc3RlbnRJdGVtU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHJpdmF0ZSBfYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mUGVyc2lzdGVudEl0ZW0+KCdieV9wa19lbnRpdHknKVxuICBwcml2YXRlIF9ieV9ma19jbGFzcyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8SW5mUGVyc2lzdGVudEl0ZW0+PignYnlfZmtfY2xhc3MnKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuICBieV9wa19lbnRpdHlfYWxsJChvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQuYWxsJFxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbiAgYnlfZmtfY2xhc3Nfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9ma19jbGFzcyQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG59XG5cbmNsYXNzIEluZlRlbXBvcmFsRW50aXR5U2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHJpdmF0ZSBfYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mVGVtcG9yYWxFbnRpdHk+KCdieV9wa19lbnRpdHknKVxuICAvLyBwdWJsaWMgYnlfZmtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlRlbXBvcmFsRW50aXR5Pj4oJ2J5X2ZrX2NsYXNzJylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBwa1Byb2plY3QkLCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGJ5X3BrX2VudGl0eV9rZXkkKGtleTogc3RyaW5nIHwgbnVtYmVyLCBvZlByb2plY3QgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuX2J5X3BrX2VudGl0eSQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1JblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaSkgPT4gaS5wa19lbnRpdHkpKVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cbn1cblxuXG5jbGFzcyBJbmZTdGF0ZW1lbnRTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuXG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlN0YXRlbWVudD4oJ2J5X3BrX2VudGl0eScpXG4gIHB1YmxpYyBieV9ma19zdWJqZWN0X2RhdGEkID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9ma19zdWJqZWN0X2RhdGEnKVxuXG4gIHB1YmxpYyBwYWdpbmF0aW9uJCA9IHRoaXMucGFnaW5hdGlvblNlbGVjdG9yPG51bWJlcj4oKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgYnlfcGtfZW50aXR5X2tleSQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5fYnlfcGtfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHJldHVybiBzZWxlY3Rpb24kLnBpcGUodGhpcy5waXBlSXRlbUluUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpKSA9PiBpLnBrX2VudGl0eSkpXG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG4gIGJ5X3N1YmplY3QkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5U3ViamVjdCwgb2ZQcm9qZWN0ID0gdHJ1ZSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5U3ViamVjdChmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfc3ViamVjdCcpLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgICAgdGhpcy5waXBlSXRlbXNJblByb2plY3QodGhpcy5wa1Byb2plY3QkLCAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkpLFxuICAgICAgICBtYXAoaXRlbXMgPT4gdmFsdWVzKGl0ZW1zKSlcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiQucGlwZShcbiAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICk7XG4gIH1cblxuICBieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYnlfc3ViamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoZm9yZWlnbktleXMsIG9mUHJvamVjdCkucGlwZShcbiAgICAgIG1hcChzdGF0ZW1lbnRJZHggPT4gdmFsdWVzKHN0YXRlbWVudElkeCkpXG4gICAgKVxuICB9XG4gIGJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5LCBvZlByb2plY3QgPSB0cnVlKTogT2JzZXJ2YWJsZTxCeVBrPEluZlN0YXRlbWVudD4+IHtcbiAgICBjb25zdCBrZXkgPSBpbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5KGZvcmVpZ25LZXlzKTtcbiAgICBjb25zdCBzZWxlY3Rpb24kID0gdGhpcy5zZWxlY3RvcjxCeVBrPEluZlN0YXRlbWVudD4+KCdieV9zdWJqZWN0K3Byb3BlcnR5Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSlcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG4gIGJ5X29iamVjdCQoZm9yZWlnbktleXM6IEluZGV4U3RhdGVtZW50QnlPYmplY3QsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgY29uc3Qga2V5ID0gaW5kZXhTdGF0ZW1lbnRCeU9iamVjdChmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfb2JqZWN0Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICAgIG1hcChpdGVtcyA9PiB2YWx1ZXMoaXRlbXMpKVxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgbWFwKGl0ZW1zID0+IHZhbHVlcyhpdGVtcykpXG4gICAgKTtcbiAgfVxuXG4gIGJ5X29iamVjdF9hbmRfcHJvcGVydHkkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJChmb3JlaWduS2V5cywgb2ZQcm9qZWN0KS5waXBlKFxuICAgICAgbWFwKHN0YXRlbWVudElkeCA9PiB2YWx1ZXMoc3RhdGVtZW50SWR4KSlcbiAgICApXG4gIH1cblxuICBieV9vYmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKGZvcmVpZ25LZXlzOiBJbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHksIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mU3RhdGVtZW50Pj4ge1xuICAgIGNvbnN0IGtleSA9IGluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eShmb3JlaWduS2V5cyk7XG4gICAgY29uc3Qgc2VsZWN0aW9uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZTdGF0ZW1lbnQ+PignYnlfb2JqZWN0K3Byb3BlcnR5Jykua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxufVxuXG5cbmNsYXNzIEluZlRleHRQcm9wZXJ0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHByaXZhdGUgX2J5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEluZlRleHRQcm9wZXJ0eT4oJ2J5X3BrX2VudGl0eScpXG4gIHByaXZhdGUgX2J5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfX2ZrX2NsYXNzX2ZpZWxkJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZUZXh0UHJvcGVydHk+PignYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGQnKVxuICBwcml2YXRlIF9ieV9ma19jb25jZXJuZWRfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxJbmZUZXh0UHJvcGVydHk+PignYnlfZmtfY29uY2VybmVkX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cblxuICBieV9wa19lbnRpdHlfa2V5JChrZXk6IHN0cmluZyB8IG51bWJlciwgb2ZQcm9qZWN0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9wa19lbnRpdHkkLmtleShrZXkpXG4gICAgaWYgKG9mUHJvamVjdCkgcmV0dXJuIHNlbGVjdGlvbiQucGlwZSh0aGlzLnBpcGVJdGVtSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGkpID0+IGkucGtfZW50aXR5KSlcbiAgICByZXR1cm4gc2VsZWN0aW9uJFxuICB9XG5cbiAgYnlfZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGRfaW5kZXhlZCQoa2V5OiBzdHJpbmcsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9ma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZCQua2V5KGtleSlcbiAgICBpZiAob2ZQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uJC5waXBlKFxuICAgICAgICB0aGlzLnBpcGVJdGVtc0luUHJvamVjdCh0aGlzLnBrUHJvamVjdCQsIChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eSksXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rpb24kXG4gIH1cblxuXG4gIGJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfaW5kZXhlZCQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIG9mUHJvamVjdCA9IHRydWUpOiBPYnNlcnZhYmxlPEJ5UGs8SW5mVGV4dFByb3BlcnR5Pj4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiQgPSB0aGlzLl9ieV9ma19jb25jZXJuZWRfZW50aXR5JC5rZXkoa2V5KVxuICAgIGlmIChvZlByb2plY3QpIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24kLnBpcGUoXG4gICAgICAgIHRoaXMucGlwZUl0ZW1zSW5Qcm9qZWN0KHRoaXMucGtQcm9qZWN0JCwgKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5KSxcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHNlbGVjdGlvbiRcbiAgfVxuXG59XG5cblxuY2xhc3MgSW5mQXBwZWxsYXRpb25TZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mQXBwZWxsYXRpb24+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZkxhbmdTdHJpbmdTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mTGFuZ1N0cmluZz4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mUGxhY2VTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mUGxhY2U+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZlRpbWVQcmltaXRpdmVTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mVGltZVByaW1pdGl2ZT4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXIgfCBzdHJpbmc+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgcGtQcm9qZWN0JCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgSW5mTGFuZ3VhZ2VTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8SW5mTGFuZ3VhZ2U+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIEluZkRpbWVuc2lvblNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxJbmZEaW1lbnNpb24+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyIHwgc3RyaW5nPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIHBrUHJvamVjdCQsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cblxuZXhwb3J0IGNsYXNzIEluZlNlbGVjdG9yIHtcblxuICBwZXJzaXN0ZW50X2l0ZW0kID0gbmV3IEluZlBlcnNpc3RlbnRJdGVtU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdwZXJzaXN0ZW50X2l0ZW0nKTtcbiAgdGVtcG9yYWxfZW50aXR5JCA9IG5ldyBJbmZUZW1wb3JhbEVudGl0eVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAndGVtcG9yYWxfZW50aXR5Jyk7XG4gIHN0YXRlbWVudCQgPSBuZXcgSW5mU3RhdGVtZW50U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdzdGF0ZW1lbnQnKTtcbiAgYXBwZWxsYXRpb24kID0gbmV3IEluZkFwcGVsbGF0aW9uU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRoaXMucGtQcm9qZWN0JCwgaW5mRGVmaW5pdGlvbnMsICdhcHBlbGxhdGlvbicpO1xuICBwbGFjZSQgPSBuZXcgSW5mUGxhY2VTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3BsYWNlJyk7XG4gIHRleHRfcHJvcGVydHkkID0gbmV3IEluZlRleHRQcm9wZXJ0eVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAndGV4dF9wcm9wZXJ0eScpO1xuICBsYW5nX3N0cmluZyQgPSBuZXcgSW5mTGFuZ1N0cmluZ1NlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnbGFuZ19zdHJpbmcnKTtcbiAgdGltZV9wcmltaXRpdmUkID0gbmV3IEluZlRpbWVQcmltaXRpdmVTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ3RpbWVfcHJpbWl0aXZlJyk7XG4gIGxhbmd1YWdlJCA9IG5ldyBJbmZMYW5ndWFnZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0aGlzLnBrUHJvamVjdCQsIGluZkRlZmluaXRpb25zLCAnbGFuZ3VhZ2UnKTtcbiAgZGltZW5zaW9uJCA9IG5ldyBJbmZEaW1lbnNpb25TZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgdGhpcy5wa1Byb2plY3QkLCBpbmZEZWZpbml0aW9ucywgJ2RpbWVuc2lvbicpO1xuXG4gIHBrRW50aXR5TW9kZWxNYXAkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdChbaW5mUm9vdCwgUFJfRU5USVRZX01PREVMX01BUF0pO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlciB8IHN0cmluZz4pIHsgfVxuXG4gIGdldE1vZGVsT2ZFbnRpdHkkKHBrRW50aXR5OiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxFbnRpdHlNb2RlbEFuZENsYXNzPEluZk1vZGVsTmFtZT4+KFtpbmZSb290LCBQUl9FTlRJVFlfTU9ERUxfTUFQLCBwa0VudGl0eV0pO1xuICB9XG59XG4iXX0=