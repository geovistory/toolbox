/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/services/information-pipes.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { InfStatement } from '@kleiolab/lib-sdk-lb3';
import { combineLatestOrEmpty, limitTo, sortAbc, switchMapOr, TimePrimitive, TimePrimitivePipe, TimeSpanPipe, TimeSpanUtil } from '@kleiolab/lib-utils';
import { equals, flatten, groupBy, pick, uniq, values } from 'ramda';
import { BehaviorSubject, combineLatest, empty, iif, Observable, of } from 'rxjs';
import { tag } from 'rxjs-spy/operators';
import { distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { cache, spyTag } from '../decorators/method-decorators';
import { timeSpanItemToTimeSpan } from '../functions/functions';
import { InfSelector } from '../selectors/inf.service';
import { ActiveProjectPipesService } from './active-project-pipes.service';
import { ConfigurationPipesService } from './configuration-pipes.service';
import { InformationBasicPipesService } from './information-basic-pipes.service';
import { SchemaSelectorsService } from './schema-selectors.service';
var InformationPipesService = /** @class */ (function () {
    function InformationPipesService(b, p, s, c, timePrimitivePipe, timeSpanPipe, ngRedux) {
        this.b = b;
        this.p = p;
        this.s = s;
        this.c = c;
        this.timePrimitivePipe = timePrimitivePipe;
        this.timeSpanPipe = timeSpanPipe;
        this.infRepo = new InfSelector(ngRedux, of('repo'));
    }
    /*********************************************************************
     * Pipe the project entities
     *********************************************************************/
    /**
     * ******************************************************************
     * Pipe the project entities
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeListLength = /**
     * ******************************************************************
     * Pipe the project entities
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    function (l, pkEntity) {
        switch (l.listType) {
            case 'appellation':
            case 'entity-preview':
            case 'language':
            case 'place':
            case 'dimension':
            case 'langString':
            case 'temporal-entity':
                return this.pipeList(l, pkEntity).pipe(map((/**
                 * @param {?} items
                 * @return {?}
                 */
                function (items) { return items.length; })));
            case 'time-span':
                return combineLatest(this.b.pipeOutgoingStatementsByProperty(72, pkEntity), this.b.pipeOutgoingStatementsByProperty(71, pkEntity), this.b.pipeOutgoingStatementsByProperty(150, pkEntity), this.b.pipeOutgoingStatementsByProperty(151, pkEntity), this.b.pipeOutgoingStatementsByProperty(152, pkEntity), this.b.pipeOutgoingStatementsByProperty(153, pkEntity)).pipe(tap((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) {
                })), map((/**
                 * @param {?} items
                 * @return {?}
                 */
                function (items) { return items.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return x.length > 0; })).length; })));
            // case 'text-property':
            //   return this.pipeListTextProperty(l, pkEntity).pipe(map(items => items.length))
            default:
                console.warn('unsupported listType');
                return new BehaviorSubject(0);
        }
    };
    /**
     * @param {?} l
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeList = /**
     * @param {?} l
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    function (l, pkEntity, limit) {
        if (l.listType.appellation)
            return this.pipeListAppellation(l, pkEntity, limit);
        else if (l.listType.entityPreview)
            return this.pipeListEntityPreview(l, pkEntity, limit);
        else if (l.listType.language)
            return this.pipeListLanguage(l, pkEntity, limit);
        else if (l.listType.place)
            return this.pipeListPlace(l, pkEntity, limit);
        else if (l.listType.dimension)
            return this.pipeListDimension(l, pkEntity, limit);
        else if (l.listType.langString)
            return this.pipeListLangString(l, pkEntity, limit);
        else if (l.listType.temporalEntity)
            return this.pipeListEntityPreview(l, pkEntity, limit);
        else if (l.listType.timeSpan) {
            return this.pipeItemTimeSpan(pkEntity).pipe(map((/**
             * @param {?} ts
             * @return {?}
             */
            function (ts) { return [ts].filter((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return i.properties.length > 0; })); })));
        }
        else
            console.warn('unsupported listType');
    };
    /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    InformationPipesService.prototype.pipeListBasicStatementItems = /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    function (listDefinition, pkEntity, pkProject) {
        return (listDefinition.isOutgoing ?
            this.b.pipeOutgoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject) :
            this.b.pipeIngoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject));
    };
    /**
     * Pipe the items in appellation field
     */
    /**
     * Pipe the items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeListAppellation = /**
     * Pipe the items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    function (listDefinition, pkEntity, limit) {
        var _this = this;
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemAppellation(r); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), limitTo(limit), startWith([]));
        })));
    };
    /**
   * Pipe the items in entity preview field
   */
    /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeListEntityPreview = /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    function (listDefinition, pkEntity, limit) {
        var _this = this;
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(tag("before-" + pkEntity + "-" + listDefinition.property.pkProperty + "-" + listDefinition.targetClass), switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemEntityPreview(r, listDefinition.isOutgoing); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; }))
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a.ordNum > b.ordNum ? 1 : -1; })); }), limitTo(limit)), startWith([]));
        })), tag("after-" + pkEntity + "-" + listDefinition.property.pkProperty + "-" + listDefinition.targetClass));
    };
    /**
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeListLanguage = /**
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    function (listDefinition, pkEntity, limit) {
        var _this = this;
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemLanguage(r); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), limitTo(limit), startWith([]));
        })));
    };
    /**
     * Pipe the items in place list
     */
    /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeListPlace = /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    function (listDefinition, pkEntity, limit) {
        var _this = this;
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemPlace(r); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), limitTo(limit), startWith([]));
        })));
    };
    /**
     * Pipe the items in place list
     */
    /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeListDimension = /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    function (listDefinition, pkEntity, limit) {
        var _this = this;
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemDimension(r); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), limitTo(limit), startWith([]));
        })));
    };
    /**
   * Pipe the items in langString list
   */
    /**
     * Pipe the items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeListLangString = /**
     * Pipe the items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    function (listDefinition, pkEntity, limit) {
        var _this = this;
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemLangString(r); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), limitTo(limit), startWith([]));
        })));
    };
    /**
     * @param {?} paginateBy
     * @param {?} limit
     * @param {?} offset
     * @param {?} pkProject
     * @param {?} listDefinition
     * @param {?=} alternative
     * @return {?}
     */
    InformationPipesService.prototype.pipeStatementListPage = /**
     * @param {?} paginateBy
     * @param {?} limit
     * @param {?} offset
     * @param {?} pkProject
     * @param {?} listDefinition
     * @param {?=} alternative
     * @return {?}
     */
    function (paginateBy, limit, offset, pkProject, listDefinition, alternative) {
        var _this = this;
        if (alternative === void 0) { alternative = false; }
        // prepare page loader
        /** @type {?} */
        var pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
        // prepare basic statement item loader
        /** @type {?} */
        var basicStatementItemLoader = (/**
         * @param {?} pkStatement
         * @param {?} isOutgoing
         * @param {?} pkProj
         * @return {?}
         */
        function (pkStatement, isOutgoing, pkProj) {
            return alternative ?
                _this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
                _this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing);
        });
        /** @type {?} */
        var paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset);
        return paginatedStatementPks$.pipe(switchMap((/**
         * @param {?} paginatedStatementPks
         * @return {?}
         */
        function (paginatedStatementPks) { return combineLatestOrEmpty(paginatedStatementPks.map((/**
         * @param {?} pkStatement
         * @return {?}
         */
        function (pkStatement) { return basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; })), switchMap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.p.streamEntityPreview(x.isOutgoing ? x.statement.fk_object_info : x.statement.fk_subject_info)
            .pipe(map((/**
         * @param {?} preview
         * @return {?}
         */
        function (preview) {
            /** @type {?} */
            var item = tslib_1.__assign({}, x, { preview: preview, fkClass: preview.fk_class });
            return item;
        }))); }))); }))); })));
    };
    /**
     * Pipe the temporal entities connected to given entity by statements that are in the current project
     */
    /**
     * Pipe the temporal entities connected to given entity by statements that are in the current project
     * @param {?} paginateBy
     * @param {?} limit
     * @param {?} offset
     * @param {?} pkProject
     * @param {?} listDefinition
     * @param {?} fieldDefinitions
     * @param {?=} alternative
     * @return {?}
     */
    InformationPipesService.prototype.pipeTemporalEntityTableRows = /**
     * Pipe the temporal entities connected to given entity by statements that are in the current project
     * @param {?} paginateBy
     * @param {?} limit
     * @param {?} offset
     * @param {?} pkProject
     * @param {?} listDefinition
     * @param {?} fieldDefinitions
     * @param {?=} alternative
     * @return {?}
     */
    function (paginateBy, limit, offset, pkProject, listDefinition, fieldDefinitions, alternative) {
        // const propertyItemType = this.propertyItemType(fieldDefinitions)
        var _this = this;
        if (alternative === void 0) { alternative = false; }
        // const propertyItemType = this.propertyItemType(fieldDefinitions)
        /** @type {?} */
        var targetEntityOfStatementItem = (/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return r.isOutgoing ? r.statement.fk_object_info : r.statement.fk_subject_info; });
        // prepare page loader
        /** @type {?} */
        var pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
        // prepare basic statement item loader
        /** @type {?} */
        var basicStatementItemLoader = (/**
         * @param {?} pkStatement
         * @param {?} isOutgoing
         * @param {?} pkProj
         * @return {?}
         */
        function (pkStatement, isOutgoing, pkProj) {
            return alternative ?
                _this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
                _this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing);
        })
        // prepare TeEnRow loader
        ;
        // prepare TeEnRow loader
        /** @type {?} */
        var rowLoader = (/**
         * @param {?} targetEntityPk
         * @param {?} fieldDef
         * @param {?} pkProj
         * @return {?}
         */
        function (targetEntityPk, fieldDef, pkProj) {
            return alternative ?
                _this.pipeItemTeEnRow(targetEntityPk, fieldDef, null, true) :
                _this.pipeItemTeEnRow(targetEntityPk, fieldDef, pkProj, false);
        });
        /** @type {?} */
        var paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset);
        /** @type {?} */
        var rows$ = paginatedStatementPks$.pipe(switchMap((/**
         * @param {?} paginatedStatementPks
         * @return {?}
         */
        function (paginatedStatementPks) { return combineLatestOrEmpty(paginatedStatementPks.map((/**
         * @param {?} pkStatement
         * @return {?}
         */
        function (pkStatement) { return basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; }))); })))
            .pipe(switchMap((/**
         * @param {?} teEnStatement
         * @return {?}
         */
        function (teEnStatement) { return combineLatestOrEmpty(teEnStatement.map((/**
         * @param {?} basicStatementItem
         * @return {?}
         */
        function (basicStatementItem) {
            /** @type {?} */
            var pkTeEn = targetEntityOfStatementItem(basicStatementItem);
            return combineLatest(rowLoader(pkTeEn, fieldDefinitions, 
            // propertyItemType,
            pkProject), _this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + pkTeEn)).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = tslib_1.__read(_a, 2), row = _b[0], teEnProjRel = _b[1];
                /** @type {?} */
                var item = tslib_1.__assign({}, basicStatementItem, { row: row, pkEntity: pkTeEn, teEnProjRel: teEnProjRel });
                return item;
            })));
        }))); }))); })));
        return rows$;
    };
    /**
     * @param {?} pkEntity
     * @param {?} fieldDefinitions
     * @param {?} pkProject
     * @param {?} repo
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemTeEnRow = /**
     * @param {?} pkEntity
     * @param {?} fieldDefinitions
     * @param {?} pkProject
     * @param {?} repo
     * @return {?}
     */
    function (pkEntity, fieldDefinitions, pkProject, repo) {
        var _this = this;
        // pipe outgoing statements
        /** @type {?} */
        var outgoingStatements$ = repo ? this.b.pipeRepoOutgoingStatements(pkEntity) : this.b.pipeOutgoingStatements(pkEntity);
        // pipe ingoing statements
        /** @type {?} */
        var ingoingStatements$ = repo ? this.b.pipeRepoIngoingStatements(pkEntity) : this.b.pipeIngoingStatements(pkEntity);
        // pipe all statements with information leaf items
        /** @type {?} */
        var outgoingItems$ = outgoingStatements$.pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) { return combineLatestOrEmpty(statements
            .filter((/**
         * @param {?} statement
         * @return {?}
         */
        function (statement) { return !!statement.fk_object_info; })) // remove statements not pointing to information
            .map((/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            /** @type {?} */
            var isOutgoing = true;
            return _this.pipeItem(s, pkProject, isOutgoing);
        }))); })));
        /** @type {?} */
        var ingoingItems$ = ingoingStatements$.pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) { return combineLatestOrEmpty(statements
            .filter((/**
         * @param {?} statement
         * @return {?}
         */
        function (statement) { return !!statement.fk_subject_info; })) // remove statements not pointing to information
            .map((/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            /** @type {?} */
            var isOutgoing = false;
            return _this.pipeItem(s, pkProject, isOutgoing);
        }))); })));
        /** @type {?} */
        var sortItems = repo ?
            (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a.statement.is_in_project_count > b.statement.is_in_project_count ? 1 : -1; })); }) :
            (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item; });
        return combineLatest(outgoingItems$, ingoingItems$).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), outgoingItems = _b[0], ingoingItems = _b[1];
            /** @type {?} */
            var groupedOut = groupBy((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return (i && i.statement ? i.statement.fk_property.toString() : undefined); }), outgoingItems);
            /** @type {?} */
            var groupedIn = groupBy((/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return (i && i.statement ? i.statement.fk_property.toString() : undefined); }), ingoingItems);
            return { groupedOut: groupedOut, groupedIn: groupedIn };
        })), 
        // auditTime(10),
        map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            var row = {};
            fieldDefinitions.forEach((/**
             * @param {?} fieldDefinition
             * @return {?}
             */
            function (fieldDefinition) {
                /** @type {?} */
                var cell;
                fieldDefinition.listDefinitions.forEach((/**
                 * @param {?} listDefinition
                 * @return {?}
                 */
                function (listDefinition) {
                    if (listDefinition.listType.timeSpan) {
                        /** @type {?} */
                        var t_1 = pick(['71', '72', '150', '151', '152', '153'], d.groupedOut);
                        /** @type {?} */
                        var keys = Object.keys(t_1);
                        /** @type {?} */
                        var itemsCount = keys.length;
                        /** @type {?} */
                        var label = void 0;
                        if (itemsCount > 0) {
                            /** @type {?} */
                            var timeSpanKeys_1 = {};
                            keys.forEach((/**
                             * @param {?} key
                             * @return {?}
                             */
                            function (key) { timeSpanKeys_1[key] = t_1[key][0].timePrimitive; }));
                            /** @type {?} */
                            var timeSpan = TimeSpanUtil.fromTimeSpanDialogData(timeSpanKeys_1);
                            label = _this.timeSpanPipe.transform(timeSpan);
                        }
                        cell = {
                            isOutgoing: listDefinition.isOutgoing,
                            itemsCount: itemsCount,
                            label: label,
                            entityPreview: undefined,
                            pkProperty: undefined,
                            isTimeSpan: true
                        };
                    }
                    else {
                        if (listDefinition.isOutgoing) {
                            if (d.groupedOut[listDefinition.property.pkProperty]) {
                                /** @type {?} */
                                var items = sortItems(d.groupedOut[listDefinition.property.pkProperty]);
                                /** @type {?} */
                                var firstItem = items[0];
                                cell = {
                                    isOutgoing: listDefinition.isOutgoing,
                                    itemsCount: items.length,
                                    entityPreview: ((/** @type {?} */ ((firstItem || {})))).preview,
                                    label: firstItem.label,
                                    pkProperty: listDefinition.property.pkProperty,
                                    firstItem: firstItem,
                                    items: items
                                };
                            }
                        }
                        else {
                            if (d.groupedIn[listDefinition.property.pkProperty]) {
                                /** @type {?} */
                                var items = sortItems(d.groupedIn[listDefinition.property.pkProperty]);
                                /** @type {?} */
                                var firstItem = items[0];
                                cell = {
                                    isOutgoing: listDefinition.isOutgoing,
                                    itemsCount: items.length,
                                    entityPreview: ((/** @type {?} */ ((firstItem || {})))).preview,
                                    label: firstItem.label,
                                    pkProperty: listDefinition.property.pkProperty,
                                    firstItem: firstItem,
                                    items: items
                                };
                            }
                        }
                    }
                }));
                row[fieldDefinition.label] = cell;
            }));
            return row;
        })));
    };
    /**
     * @private
     * @param {?} r
     * @param {?} pkProject
     * @param {?} propIsOutgoing
     * @return {?}
     */
    InformationPipesService.prototype.pipeItem = /**
     * @private
     * @param {?} r
     * @param {?} pkProject
     * @param {?} propIsOutgoing
     * @return {?}
     */
    function (r, pkProject, propIsOutgoing) {
        var _this = this;
        /** @type {?} */
        var targetEntity = propIsOutgoing ? r.fk_object_info : r.fk_subject_info;
        return this.s.inf$.getModelOfEntity$(targetEntity).pipe(switchMap((/**
         * @param {?} m
         * @return {?}
         */
        function (m) {
            /** @type {?} */
            var modelName = m ? m.modelName : undefined;
            switch (modelName) {
                case 'appellation':
                    return _this.pipeItemAppellation(r);
                case 'language':
                    return _this.pipeItemLanguage(r);
                case 'place':
                    return _this.pipeItemPlace(r);
                case 'dimension':
                    return _this.pipeItemDimension(r);
                case 'lang_string':
                    return _this.pipeItemLangString(r);
                case 'time_primitive':
                    return _this.pipeItemTimePrimitive(r, pkProject); // TODO: emits twice
                default:
                    return _this.pipeItemEntityPreview(r, propIsOutgoing);
                    break;
            }
        })));
    };
    /**
     * @param {?} listDef
     * @param {?} fkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeEntityProperties = /**
     * @param {?} listDef
     * @param {?} fkEntity
     * @param {?=} limit
     * @return {?}
     */
    function (listDef, fkEntity, limit) {
        var _this = this;
        if (listDef.listType.appellation) {
            return this.pipeListAppellation(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.getEntityProperties(listDef, items); })));
        }
        else if (listDef.listType.language) {
            return this.pipeListLanguage(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.getEntityProperties(listDef, items); })));
        }
        else if (listDef.listType.place) {
            return this.pipeListPlace(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.getEntityProperties(listDef, items); })));
        }
        else if (listDef.listType.dimension) {
            return this.pipeListDimension(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.getEntityProperties(listDef, items); })));
        }
        else if (listDef.listType.langString) {
            return this.pipeListLangString(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.getEntityProperties(listDef, items); })));
        }
        else if (listDef.listType.entityPreview || listDef.listType.temporalEntity) {
            return this.pipeListEntityPreview(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this.getEntityProperties(listDef, items); })));
        }
        else if (listDef.listType.timeSpan) {
            return this.pipeItemTimeSpan(fkEntity)
                .pipe(map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                /** @type {?} */
                var items = item.properties.find((/**
                 * @param {?} p
                 * @return {?}
                 */
                function (p) { return p.items.length > 0; })) ? [{
                        label: _this.timeSpanPipe.transform(timeSpanItemToTimeSpan(item)),
                        properties: [] // TODO check if the properties or the item are really not needed
                    }] : [];
                return {
                    listDefinition: listDef,
                    items: items
                };
            })));
        }
        else
            return of(null);
    };
    /**
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeTemporalEntityRemoveProperties = /**
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return combineLatest(this.s.inf$.temporal_entity$.by_pk_entity_key$(pkEntity), this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity }), this.s.inf$.text_property$.by_fk_concerned_entity_indexed$(pkEntity)).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 3), temporalEntity = _b[0], statements = _b[1], textProperties = _b[2];
            /** @type {?} */
            var res = {
                temporalEntity: temporalEntity,
                statements: statements,
                textProperties: values(textProperties)
            };
            return res;
        })));
    };
    /**
     * @param {?} listDefinition
     * @param {?} items
     * @return {?}
     */
    InformationPipesService.prototype.getEntityProperties = /**
     * @param {?} listDefinition
     * @param {?} items
     * @return {?}
     */
    function (listDefinition, items) {
        return {
            listDefinition: listDefinition,
            items: items,
        };
    };
    /**
     * Pipe time span item in version of project
     */
    /**
     * Pipe time span item in version of project
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemTimeSpan = /**
     * Pipe time span item in version of project
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        var _this = this;
        return this.p.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            return _this.c.pipeSpecificFieldOfClass(DfhConfig.ClASS_PK_TIME_SPAN).pipe(switchMap((/**
             * @param {?} fieldDefs
             * @return {?}
             */
            function (fieldDefs) {
                return combineLatest(fieldDefs.map((/**
                 * @param {?} fieldDef
                 * @return {?}
                 */
                function (fieldDef) { return _this.s.inf$.statement$.by_subject_and_property$({
                    fk_property: fieldDef.property.pkProperty,
                    fk_subject_info: pkEntity
                })
                    .pipe(switchMapOr([], (/**
                 * @param {?} statements
                 * @return {?}
                 */
                function (statements) { return combineLatest(statements.map((/**
                 * @param {?} statement
                 * @return {?}
                 */
                function (statement) { return combineLatest(_this.s.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))), _this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity)).pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = tslib_1.__read(_a, 2), infTimePrimitive = _b[0], projRel = _b[1];
                    /** @type {?} */
                    var timePrimitive = new TimePrimitive({
                        julianDay: infTimePrimitive.julian_day,
                        calendar: ((/** @type {?} */ ((projRel.calendar || 'gregorian')))),
                        duration: ((/** @type {?} */ (infTimePrimitive.duration)))
                    });
                    /** @type {?} */
                    var item = {
                        statement: statement,
                        ordNum: undefined,
                        projRel: projRel,
                        timePrimitive: timePrimitive,
                        label: _this.timePrimitivePipe.transform(timePrimitive),
                        fkClass: infTimePrimitive.fk_class
                    };
                    return item;
                }))); }))); })), map((/**
                 * @param {?} items
                 * @return {?}
                 */
                function (items) {
                    /** @type {?} */
                    var res = {
                        listDefinition: fieldDef.listDefinitions[0], items: items
                    };
                    return res;
                }))); }))).pipe(map((/**
                 * @param {?} properties
                 * @return {?}
                 */
                function (properties) {
                    /** @type {?} */
                    var props = properties.filter((/**
                     * @param {?} p
                     * @return {?}
                     */
                    function (p) { return p.items.length > 0; }));
                    /** @type {?} */
                    var timespanitem = {
                        label: '',
                        properties: props
                    };
                    return timespanitem;
                })));
            })));
        })));
    };
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemAppellation = /**
     * @param {?} statement
     * @return {?}
     */
    function (statement) {
        return this.s.inf$.appellation$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; })), map((/**
         * @param {?} appellation
         * @return {?}
         */
        function (appellation) {
            if (!appellation)
                return null;
            /** @type {?} */
            var node = {
                ordNum: undefined,
                projRel: undefined,
                statement: statement,
                label: appellation.string,
                fkClass: appellation.fk_class
            };
            return node;
        })));
    };
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemLanguage = /**
     * @param {?} statement
     * @return {?}
     */
    function (statement) {
        return this.s.inf$.language$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; })), map((/**
         * @param {?} language
         * @return {?}
         */
        function (language) {
            if (!language)
                return null;
            /** @type {?} */
            var node = {
                ordNum: undefined,
                projRel: undefined,
                statement: statement,
                label: language.notes,
                fkClass: language.fk_class
            };
            return node;
        })));
    };
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemPlace = /**
     * @param {?} statement
     * @return {?}
     */
    function (statement) {
        return this.s.inf$.place$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; })), map((/**
         * @param {?} place
         * @return {?}
         */
        function (place) {
            if (!place)
                return null;
            /** @type {?} */
            var node = {
                ordNum: undefined,
                projRel: undefined,
                statement: statement,
                label: 'WGS84: ' + place.lat + '°, ' + place.long + '°',
                fkClass: place.fk_class
            };
            return node;
        })));
    };
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemDimension = /**
     * @param {?} statement
     * @return {?}
     */
    function (statement) {
        var _this = this;
        return this.s.inf$.dimension$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; })), switchMap((/**
         * @param {?} dimension
         * @return {?}
         */
        function (dimension) {
            return _this.p.streamEntityPreview(dimension.fk_measurement_unit)
                .pipe(map((/**
             * @param {?} preview
             * @return {?}
             */
            function (preview) {
                /** @type {?} */
                var node = {
                    ordNum: undefined,
                    projRel: undefined,
                    statement: statement,
                    label: dimension.numeric_value + " " + preview.entity_label,
                    fkClass: dimension.fk_class,
                };
                return node;
            })));
        })));
    };
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemLangString = /**
     * @param {?} statement
     * @return {?}
     */
    function (statement) {
        var _this = this;
        return this.s.inf$.lang_string$.by_pk_entity$.key(statement.fk_object_info).pipe(switchMap((/**
         * @param {?} langString
         * @return {?}
         */
        function (langString) {
            if (!langString)
                return new BehaviorSubject(null);
            return _this.s.inf$.language$.by_pk_entity$.key(langString.fk_language)
                .pipe(map((/**
             * @param {?} language
             * @return {?}
             */
            function (language) {
                if (!language)
                    return null;
                /** @type {?} */
                var label = '';
                if (langString.string)
                    label = langString.string;
                else if (langString.quill_doc && langString.quill_doc.ops && langString.quill_doc.ops.length) {
                    label = langString.quill_doc.ops.map((/**
                     * @param {?} op
                     * @return {?}
                     */
                    function (op) { return op.insert; })).join('');
                }
                /** @type {?} */
                var node = {
                    ordNum: undefined,
                    projRel: undefined,
                    statement: statement,
                    label: label,
                    fkClass: langString.fk_class,
                    language: language,
                    fkLanguage: langString.fk_language
                };
                return node;
            })));
        })));
    };
    /**
     * @param {?} statement
     * @param {?} isOutgoing
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemEntityPreview = /**
     * @param {?} statement
     * @param {?} isOutgoing
     * @return {?}
     */
    function (statement, isOutgoing) {
        return this.p.streamEntityPreview((isOutgoing ? statement.fk_object_info : statement.fk_subject_info)).pipe(
        // filter(preview => !preview.loading && !!preview && !!preview.entity_type),
        map((/**
         * @param {?} preview
         * @return {?}
         */
        function (preview) {
            if (!preview) {
                return null;
            }
            /** @type {?} */
            var node = {
                ordNum: undefined,
                projRel: undefined,
                statement: statement,
                preview: preview,
                label: preview.entity_label || '',
                fkClass: preview.fk_class
            };
            return node;
        })));
    };
    /**
     * @param pk
     */
    /**
     * @param {?} statement
     * @param {?} pkProject
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemTimePrimitive = /**
     * @param {?} statement
     * @param {?} pkProject
     * @return {?}
     */
    function (statement, pkProject) {
        var _this = this;
        if (pkProject) {
            return combineLatest(this.s.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; })))).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = tslib_1.__read(_a, 2), infTimePrimitive = _b[0], projRel = _b[1];
                if (!infTimePrimitive)
                    return null;
                /** @type {?} */
                var timePrimitive = new TimePrimitive({
                    julianDay: infTimePrimitive.julian_day,
                    calendar: ((/** @type {?} */ ((projRel.calendar || 'gregorian')))),
                    duration: ((/** @type {?} */ (infTimePrimitive.duration)))
                });
                /** @type {?} */
                var node = {
                    ordNum: undefined,
                    projRel: undefined,
                    statement: statement,
                    timePrimitive: timePrimitive,
                    label: _this.timePrimitivePipe.transform(timePrimitive),
                    fkClass: infTimePrimitive.fk_class
                };
                return node;
            })));
        }
        else {
            return this.infRepo.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))).pipe(map((/**
             * @param {?} infTimePrimitive
             * @return {?}
             */
            function (infTimePrimitive) {
                /** @type {?} */
                var timePrimitive = new TimePrimitive({
                    julianDay: infTimePrimitive.julian_day,
                    calendar: ((/** @type {?} */ ((statement.community_favorite_calendar || 'gregorian')))),
                    duration: ((/** @type {?} */ (infTimePrimitive.duration)))
                });
                /** @type {?} */
                var node = {
                    ordNum: undefined,
                    projRel: undefined,
                    statement: statement,
                    timePrimitive: timePrimitive,
                    label: _this.timePrimitivePipe.transform(timePrimitive),
                    fkClass: infTimePrimitive.fk_class
                };
                return node;
            })));
        }
    };
    /*********************************************************************
    * Pipe alternatives (not in project)
    *********************************************************************/
    /**
     * ******************************************************************
     * Pipe alternatives (not in project)
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeAltListLength = /**
     * ******************************************************************
     * Pipe alternatives (not in project)
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    function (l, pkEntity) {
        switch (l.listType) {
            case 'appellation':
            case 'entity-preview':
            case 'language':
            case 'place':
            case 'langString':
            case 'temporal-entity':
            case 'time-span':
                return this.pipeAltListStatements(l, pkEntity).pipe(map((/**
                 * @param {?} items
                 * @return {?}
                 */
                function (items) { return items.length; })));
            default:
                console.warn('unsupported listType');
                break;
        }
    };
    /**
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeAltList = /**
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    function (l, pkEntity) {
        if (l.listType.appellation)
            return this.pipeAltListAppellation(l, pkEntity);
        else if (l.listType.entityPreview)
            return this.pipeAltListEntityPreview(l, pkEntity);
        else if (l.listType.language)
            return this.pipeAltListLanguage(l, pkEntity);
        else if (l.listType.place)
            return this.pipeAltListPlace(l, pkEntity);
        else if (l.listType.dimension)
            return this.pipeAltListDimension(l, pkEntity);
        else if (l.listType.langString)
            return this.pipeAltListLangString(l, pkEntity);
        else if (l.listType.temporalEntity)
            return this.pipeAltListEntityPreview(l, pkEntity);
        else
            console.warn('unsupported listType');
    };
    /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeAltListStatements = /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        return (listDefinition.isOutgoing ?
            this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity) :
            this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity));
    };
    /**
    * Pipe the items in entity preview field
    */
    /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeAltListEntityPreview = /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        var _this = this;
        return (listDefinition.isOutgoing ?
            this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity) :
            this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity)).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemEntityPreview(r, listDefinition.isOutgoing); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes
                .filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node; }))
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a.ordNum > b.ordNum ? 1 : -1; })); })), startWith([]));
        })));
    };
    /**
     * Pipe the alternative items in place list
     */
    /**
     * Pipe the alternative items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeAltListPlace = /**
     * Pipe the alternative items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemPlace(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
     * Pipe the alternative items in dimension list
     */
    /**
     * Pipe the alternative items in dimension list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeAltListDimension = /**
     * Pipe the alternative items in dimension list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemDimension(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
     * Pipe the alternative items in langString list
     */
    /**
     * Pipe the alternative items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeAltListLangString = /**
     * Pipe the alternative items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemLangString(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
     * Pipe the alternative items in appellation field
     */
    /**
     * Pipe the alternative items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeAltListAppellation = /**
     * Pipe the alternative items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemAppellation(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
     * Pipe the alternative items in language field
     */
    /**
     * Pipe the alternative items in language field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeAltListLanguage = /**
     * Pipe the alternative items in language field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemLanguage(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /*********************************************************************
     * Pipe repo views (community favorites, where restricted by quantifiers)
     *********************************************************************/
    /**
     * Pipe repository temporal entity item in the way it is defined by the repository
     */
    /**
     * Pipe appellation list in the way it is defined by the repository
     */
    /*********************************************************************
       * Pipe repo views (community favorites, where restricted by quantifiers)
       *********************************************************************/
    /**
       * Pipe repository temporal entity item in the way it is defined by the repository
       */
    /**
     * Pipe appellation list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeRepoListAppellation = /*********************************************************************
       * Pipe repo views (community favorites, where restricted by quantifiers)
       *********************************************************************/
    /**
       * Pipe repository temporal entity item in the way it is defined by the repository
       */
    /**
     * Pipe appellation list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemAppellation(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
    * Pipe language list in the way it is defined by the repository
    */
    /**
     * Pipe language list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeRepoListLanguage = /**
     * Pipe language list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemLanguage(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
     * Pipe place list in the way it is defined by the repository
     */
    /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeRepoListPlace = /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemPlace(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
    * Pipe place list in the way it is defined by the repository
    */
    /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeRepoListDimension = /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        var _this = this;
        if (listDefinition.isOutgoing) {
            return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            function (statements) {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                function (r, i) { return _this.pipeItemDimension(r); })))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) { return nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })), startWith([]));
            })));
        }
    };
    /**
    * Pipe the items in entity preview field, connected by community favorite statements
    */
    /**
     * Pipe the items in entity preview field, connected by community favorite statements
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeRepoListEntityPreview = /**
     * Pipe the items in entity preview field, connected by community favorite statements
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        var _this = this;
        return (listDefinition.isOutgoing ?
            this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity) :
            this.b.pipeRepoIngoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity)).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            function (r, i) { return _this.pipeItemEntityPreview(r, listDefinition.isOutgoing); })))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return !!node && node.fkClass === listDefinition.targetClass; })); })));
        })), startWith([]));
    };
    /**
     * Pipe repo time span item
     */
    /**
     * Pipe repo time span item
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeRepoItemTimeSpan = /**
     * Pipe repo time span item
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        var _this = this;
        return this.p.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) {
            return _this.c.pipeBasicAndSpecificFields(DfhConfig.ClASS_PK_TIME_SPAN).pipe(switchMap((/**
             * @param {?} fieldDefinitions
             * @return {?}
             */
            function (fieldDefinitions) {
                return combineLatest(fieldDefinitions.map((/**
                 * @param {?} fieldDef
                 * @return {?}
                 */
                function (fieldDef) {
                    return _this.b.pipeRepoOutgoingStatementsByProperty(fieldDef.property.pkProperty, pkEntity)
                        .pipe(switchMapOr([], (/**
                     * @param {?} statements
                     * @return {?}
                     */
                    function (statements) { return combineLatest(statements.map((/**
                     * @param {?} statement
                     * @return {?}
                     */
                    function (statement) {
                        return _this.infRepo.time_primitive$.by_pk_entity$.key(statement.fk_object_info)
                            .pipe(map((/**
                         * @param {?} infTimePrimitive
                         * @return {?}
                         */
                        function (infTimePrimitive) {
                            /** @type {?} */
                            var timePrimitive = new TimePrimitive({
                                julianDay: infTimePrimitive.julian_day,
                                calendar: ((/** @type {?} */ ((statement.community_favorite_calendar || 'gregorian')))),
                                duration: ((/** @type {?} */ (infTimePrimitive.duration)))
                            });
                            /** @type {?} */
                            var item = {
                                statement: statement,
                                ordNum: undefined,
                                projRel: undefined,
                                timePrimitive: timePrimitive,
                                label: _this.timePrimitivePipe.transform(timePrimitive),
                                fkClass: infTimePrimitive.fk_class
                            };
                            return item;
                        })));
                    }))); })), map((/**
                     * @param {?} items
                     * @return {?}
                     */
                    function (items) {
                        /** @type {?} */
                        var res = {
                            listDefinition: fieldDef.listDefinitions[0], items: items
                        };
                        return res;
                    })), startWith((/** @type {?} */ ({ listDefinition: fieldDef.listDefinitions[0], items: [] }))));
                }))).pipe(map((/**
                 * @param {?} properties
                 * @return {?}
                 */
                function (properties) {
                    /** @type {?} */
                    var timespanitem = {
                        label: '',
                        properties: properties.filter((/**
                         * @param {?} props
                         * @return {?}
                         */
                        function (props) { return props.items.length > 0; }))
                    };
                    return timespanitem;
                })));
            })));
        })));
    };
    /**
     * Pipes the label of given entity
     * This will use entity previews for getting strings of related temporal entities
     * So this may take a little while
     */
    /**
     * Pipes the label of given entity
     * This will use entity previews for getting strings of related temporal entities
     * So this may take a little while
     * @param {?} fkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeLabelOfEntity = /**
     * Pipes the label of given entity
     * This will use entity previews for getting strings of related temporal entities
     * So this may take a little while
     * @param {?} fkEntity
     * @return {?}
     */
    function (fkEntity) {
        var _this = this;
        return this.b.pipeClassOfEntity(fkEntity).pipe(
        // get the definition of the first field
        switchMap((/**
         * @param {?} fkClass
         * @return {?}
         */
        function (fkClass) { return _this.c.pipeBasicAndSpecificFields(fkClass).pipe(
        // get the first item of that field
        switchMap((/**
         * @param {?} fieldDef
         * @return {?}
         */
        function (fieldDef) { return combineLatestOrEmpty(fieldDef && fieldDef.length ?
            fieldDef[0].listDefinitions.map((/**
             * @param {?} listDef
             * @return {?}
             */
            function (listDef) { return _this.pipeEntityProperties(listDef, fkEntity, 1); })) :
            []).pipe(map((/**
         * @param {?} props
         * @return {?}
         */
        function (props) {
            props = props.filter((/**
             * @param {?} prop
             * @return {?}
             */
            function (prop) { return prop.items.length > 0; }));
            if (props.length && props[0].items.length) {
                return props[0].items[0].label;
            }
            return '';
        }))); }))); })));
    };
    /**
     * Pipes the class label of given entity
     */
    /**
     * Pipes the class label of given entity
     * @param {?} fkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeClassLabelOfEntity = /**
     * Pipes the class label of given entity
     * @param {?} fkEntity
     * @return {?}
     */
    function (fkEntity) {
        var _this = this;
        return this.b.pipeClassOfEntity(fkEntity).pipe(switchMap((/**
         * @param {?} pkClass
         * @return {?}
         */
        function (pkClass) { return _this.c.pipeClassLabel(pkClass); })));
    };
    /**
     * Pipes the pk_entity of the type of an entity
     */
    /**
     * Pipes the pk_entity of the type of an entity
     * @param {?} pkEntity
     * @param {?} hasTypeProperty
     * @param {?} isOutgoing
     * @return {?}
     */
    InformationPipesService.prototype.pipeTypeOfEntity = /**
     * Pipes the pk_entity of the type of an entity
     * @param {?} pkEntity
     * @param {?} hasTypeProperty
     * @param {?} isOutgoing
     * @return {?}
     */
    function (pkEntity, hasTypeProperty, isOutgoing) {
        if (isOutgoing) {
            return this.s.inf$.statement$.by_subject_and_property_indexed$({ fk_property: hasTypeProperty, fk_subject_info: pkEntity }).pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) {
                if (!items || Object.keys(items).length < 1)
                    return undefined;
                else
                    return values(items)[0];
            })));
        }
        else {
            return this.s.inf$.statement$.by_object_and_property_indexed$({ fk_property: hasTypeProperty, fk_object_info: pkEntity }).pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) {
                if (!items || Object.keys(items).length < 1)
                    return undefined;
                else
                    return values(items)[0];
            })));
        }
    };
    /**
     * @param {?} enabledIn
     * @return {?}
     */
    InformationPipesService.prototype.pipeClassesAndTypes = /**
     * @param {?} enabledIn
     * @return {?}
     */
    function (enabledIn) {
        var _this = this;
        return this.c.pipeTypeAndTypedClasses(enabledIn).pipe(switchMap((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return _this.pipeClassAndTypeNodes(items); })));
    };
    /**
     * @param {?} classes
     * @return {?}
     */
    InformationPipesService.prototype.pipeClassesAndTypesOfClasses = /**
     * @param {?} classes
     * @return {?}
     */
    function (classes) {
        var _this = this;
        return this.c.pipeTypeAndTypedClassesOfTypedClasses(classes).pipe(switchMap((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return _this.pipeClassAndTypeNodes(items); })));
    };
    /**
     * @param {?} typeAndTypedClasses
     * @return {?}
     */
    InformationPipesService.prototype.pipeClassAndTypeNodes = /**
     * @param {?} typeAndTypedClasses
     * @return {?}
     */
    function (typeAndTypedClasses) {
        var _this = this;
        return combineLatestOrEmpty(typeAndTypedClasses.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.c.pipeClassLabel(item.typedClass).pipe(map((/**
         * @param {?} label
         * @return {?}
         */
        function (label) { return ((/** @type {?} */ ({
            label: label,
            data: { pkClass: item.typedClass, pkType: null }
        }))); })), switchMap((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return iif((/**
         * @return {?}
         */
        function () { return !!item.typeClass; }), _this.b.pipePersistentItemPksByClass(item.typeClass).pipe(switchMap((/**
         * @param {?} typePks
         * @return {?}
         */
        function (typePks) { return combineLatestOrEmpty(typePks.map((/**
         * @param {?} pkType
         * @return {?}
         */
        function (pkType) { return _this.p.streamEntityPreview(pkType).pipe(map((/**
         * @param {?} preview
         * @return {?}
         */
        function (preview) { return ((/** @type {?} */ ({
            label: preview.entity_label,
            data: { pkClass: item.typedClass, pkType: pkType }
        }))); }))); }))).pipe(sortAbc((/**
         * @param {?} n
         * @return {?}
         */
        function (n) { return n.label; }))); })), map((/**
         * @param {?} children
         * @return {?}
         */
        function (children) {
            node.children = children;
            return node;
        }))), of((/** @type {?} */ (tslib_1.__assign({}, node, { children: [] }))))); }))); }))).pipe(sortAbc((/**
         * @param {?} node
         * @return {?}
         */
        function (node) { return node.label; })));
    };
    /**
     * returns array of pk_class of all classes and typed classes.
     * @param classesAndTypes a object containing {classes: [], types[]}
     */
    /**
     * returns array of pk_class of all classes and typed classes.
     * @param {?} classesAndTypes a object containing {classes: [], types[]}
     * @return {?}
     */
    InformationPipesService.prototype.pipeClassesFromClassesAndTypes = /**
     * returns array of pk_class of all classes and typed classes.
     * @param {?} classesAndTypes a object containing {classes: [], types[]}
     * @return {?}
     */
    function (classesAndTypes) {
        var _this = this;
        /** @type {?} */
        var typedClasses$ = (!classesAndTypes || !classesAndTypes.types || !classesAndTypes.types.length) ?
            of((/** @type {?} */ ([]))) :
            this.b.pipeClassesOfPersistentItems(classesAndTypes.types)
                .pipe(filter((/**
             * @param {?} pks
             * @return {?}
             */
            function (pks) { return !!pks; })), switchMap((/**
             * @param {?} typeClasses
             * @return {?}
             */
            function (typeClasses) { return _this.c.pipeTypedClassesOfTypeClasses(typeClasses); })));
        return typedClasses$.pipe(map((/**
         * @param {?} typedClasses
         * @return {?}
         */
        function (typedClasses) { return uniq(tslib_1.__spread(typedClasses, ((classesAndTypes || { classes: [] }).classes || []))); })));
    };
    /**
     * @param {?} classesAndTypes
     * @return {?}
     */
    InformationPipesService.prototype.pipePropertyOptionsFromClassesAndTypes = /**
     * @param {?} classesAndTypes
     * @return {?}
     */
    function (classesAndTypes) {
        var _this = this;
        return this.pipeClassesFromClassesAndTypes(classesAndTypes).pipe(switchMap((/**
         * @param {?} classes
         * @return {?}
         */
        function (classes) { return _this.pipePropertyOptionsFormClasses(classes); })));
    };
    /**
     * @param {?} classes
     * @return {?}
     */
    InformationPipesService.prototype.pipePropertyOptionsFormClasses = /**
     * @param {?} classes
     * @return {?}
     */
    function (classes) {
        var _this = this;
        return combineLatestOrEmpty(classes.map((/**
         * @param {?} pkClass
         * @return {?}
         */
        function (pkClass) { return _this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.basic_type === 9; })), switchMap((/**
         * @param {?} isTeEn
         * @return {?}
         */
        function (isTeEn) { return _this.c.pipeSpecificAndBasicFields(pkClass)
            .pipe(map((/**
         * @param {?} classFields
         * @return {?}
         */
        function (classFields) { return classFields
            .filter((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return !!f.property.pkProperty; }))
            .map((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return ({
            isOutgoing: f.isOutgoing,
            fkPropertyDomain: f.isOutgoing ? f.sourceClass : null,
            fkPropertyRange: f.isOutgoing ? null : f.sourceClass,
            pkProperty: f.property.pkProperty
        }); })); })), switchMap((/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            if (isTeEn) {
                // add time properties (at some time within, ...)
                DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.map((/**
                 * @param {?} pkProperty
                 * @return {?}
                 */
                function (pkProperty) {
                    items.push({
                        pkProperty: pkProperty,
                        fkPropertyDomain: pkClass,
                        fkPropertyRange: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
                        isOutgoing: true
                    });
                }));
            }
            return combineLatestOrEmpty(items.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this.c.pipeFieldLabel(item.pkProperty, item.fkPropertyDomain, item.fkPropertyRange).pipe(map((/**
             * @param {?} label
             * @return {?}
             */
            function (label) {
                /** @type {?} */
                var isOutgoing = item.isOutgoing;
                /** @type {?} */
                var o = {
                    isOutgoing: isOutgoing,
                    label: label,
                    pk: item.pkProperty,
                    propertyFieldKey: propertyOptionFieldKey(item.pkProperty, isOutgoing)
                };
                return o;
            }))); })));
        }))); }))); }))).pipe(map((/**
         * @param {?} y
         * @return {?}
         */
        function (y) { return flatten(y); })));
    };
    /**
     * @param {?} model
     * @return {?}
     */
    InformationPipesService.prototype.pipePkClassesFromPropertySelectModel = /**
     * @param {?} model
     * @return {?}
     */
    function (model) {
        return combineLatestOrEmpty([
            this.c.pipeTargetClassesOfProperties(model.outgoingProperties, true),
            this.c.pipeTargetClassesOfProperties(model.ingoingProperties, false),
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), out = _b[0], ing = _b[1];
            return uniq(tslib_1.__spread(out, ing));
        })));
    };
    /**
     * @param {?} model$
     * @return {?}
     */
    InformationPipesService.prototype.getPkClassesFromPropertySelectModel$ = /**
     * @param {?} model$
     * @return {?}
     */
    function (model$) {
        var _this = this;
        return model$.pipe(switchMap((/**
         * @param {?} model
         * @return {?}
         */
        function (model) { return combineLatestOrEmpty([
            _this.c.pipeTargetClassesOfProperties(model.outgoingProperties, true),
            _this.c.pipeTargetClassesOfProperties(model.ingoingProperties, false),
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), out = _b[0], ing = _b[1];
            return uniq(tslib_1.__spread(out, ing));
        }))); })));
    };
    /**
     * @param {?} classTypes$
     * @return {?}
     */
    InformationPipesService.prototype.getPropertyOptions$ = /**
     * @param {?} classTypes$
     * @return {?}
     */
    function (classTypes$) {
        var _this = this;
        return classTypes$.pipe(
        // make sure only it passes only if data of the arrayClasses are changed (not children)
        distinctUntilChanged((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
            return equals(a, b);
        })), switchMap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !x ? empty() : _this.b.pipeClassesOfPersistentItems(x.types)
            .pipe(filter((/**
         * @param {?} pks
         * @return {?}
         */
        function (pks) { return !!pks; })), switchMap((/**
         * @param {?} typeClasses
         * @return {?}
         */
        function (typeClasses) { return _this.c.pipeTypedClassesOfTypeClasses(typeClasses).pipe(switchMap((/**
         * @param {?} typedClasses
         * @return {?}
         */
        function (typedClasses) {
            /** @type {?} */
            var classes = uniq(tslib_1.__spread(typedClasses, (x.classes || [])));
            return _this.pipePropertyOptionsFormClasses(classes);
        }))); }))); })));
    };
    InformationPipesService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    InformationPipesService.ctorParameters = function () { return [
        { type: InformationBasicPipesService },
        { type: ActiveProjectPipesService },
        { type: SchemaSelectorsService },
        { type: ConfigurationPipesService },
        { type: TimePrimitivePipe },
        { type: TimeSpanPipe },
        { type: NgRedux }
    ]; };
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeListLength", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeList", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeListBasicStatementItems", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeListAppellation", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeListEntityPreview", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeListLanguage", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeListPlace", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeListDimension", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeListLangString", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array, Number, Number, Number, Object, Array, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeTemporalEntityTableRows", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Array, Number, Boolean]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeItemTeEnRow", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [InfStatement, Number, Boolean]),
        tslib_1.__metadata("design:returntype", void 0)
    ], InformationPipesService.prototype, "pipeItem", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeEntityProperties", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeTemporalEntityRemoveProperties", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeItemTimeSpan", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [InfStatement]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeItemAppellation", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [InfStatement]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeItemLanguage", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [InfStatement]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeItemPlace", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [InfStatement]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeItemDimension", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [InfStatement]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeItemLangString", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [InfStatement, Boolean]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeItemEntityPreview", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [InfStatement, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeItemTimePrimitive", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeAltListLength", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeAltList", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeAltListStatements", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeAltListEntityPreview", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeAltListPlace", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeAltListDimension", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeAltListLangString", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeAltListAppellation", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeAltListLanguage", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeRepoListAppellation", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeRepoListLanguage", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeRepoListPlace", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeRepoListDimension", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeRepoListEntityPreview", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeRepoItemTimeSpan", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeLabelOfEntity", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeClassLabelOfEntity", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Number, Boolean]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeTypeOfEntity", null);
    tslib_1.__decorate([
        spyTag,
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], InformationPipesService.prototype, "pipeClassesAndTypes", null);
    tslib_1.__decorate([
        spyTag,
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array]),
        tslib_1.__metadata("design:returntype", void 0)
    ], InformationPipesService.prototype, "pipeClassesAndTypesOfClasses", null);
    tslib_1.__decorate([
        spyTag,
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipeClassAndTypeNodes", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipePropertyOptionsFormClasses", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationPipesService.prototype, "pipePkClassesFromPropertySelectModel", null);
    return InformationPipesService;
}());
export { InformationPipesService };
if (false) {
    /** @type {?} */
    InformationPipesService.prototype.infRepo;
    /**
     * @type {?}
     * @private
     */
    InformationPipesService.prototype.b;
    /**
     * @type {?}
     * @private
     */
    InformationPipesService.prototype.p;
    /**
     * @type {?}
     * @private
     */
    InformationPipesService.prototype.s;
    /**
     * @type {?}
     * @private
     */
    InformationPipesService.prototype.c;
    /** @type {?} */
    InformationPipesService.prototype.timePrimitivePipe;
    /**
     * @type {?}
     * @private
     */
    InformationPipesService.prototype.timeSpanPipe;
}
/**
 * @param {?} fkProperty
 * @param {?} isOutgoing
 * @return {?}
 */
export function propertyOptionFieldKey(fkProperty, isOutgoing) {
    return '_' + fkProperty + '_' + (isOutgoing ? 'outgoing' : 'ingoing');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy8iLCJzb3VyY2VzIjpbImxpYi9xdWVyaWVzL3NlcnZpY2VzL2luZm9ybWF0aW9uLXBpcGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQWdCLG9CQUFvQixFQUFlLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkwsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBeUJoRSxP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RSxDQUFDOzs7Z0RBQ3dCLFVBQVU7aUZBNkM1RDtJQUdEO1FBREMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7Z0RBQ3VDLFVBQVU7dUZBUzNFO0lBcUNILDhCQUFDO0NBQUEsQUF6d0NELElBeXdDQztTQTN2Q1ksdUJBQXVCOzs7SUFFbEMsMENBQXFCOzs7OztJQUduQixvQ0FBdUM7Ozs7O0lBQ3ZDLG9DQUFvQzs7Ozs7SUFDcEMsb0NBQWlDOzs7OztJQUNqQyxvQ0FBb0M7O0lBQ3BDLG9EQUEyQzs7Ozs7SUFDM0MsK0NBQWtDOzs7Ozs7O0FBbXZDdEMsTUFBTSxVQUFVLHNCQUFzQixDQUFDLFVBQWtCLEVBQUUsVUFBbUI7SUFDNUUsT0FBTyxHQUFHLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGZoQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgSUFwcFN0YXRlLCBQYWdpbmF0ZUJ5UGFyYW0gfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IEluZlN0YXRlbWVudCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBDYWxlbmRhclR5cGUsIGNvbWJpbmVMYXRlc3RPckVtcHR5LCBHcmFudWxhcml0eSwgbGltaXRUbywgc29ydEFiYywgc3dpdGNoTWFwT3IsIFRpbWVQcmltaXRpdmUsIFRpbWVQcmltaXRpdmVQaXBlLCBUaW1lU3BhblBpcGUsIFRpbWVTcGFuVXRpbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgZXF1YWxzLCBmbGF0dGVuLCBncm91cEJ5LCBwaWNrLCB1bmlxLCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIGVtcHR5LCBpaWYsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWcgfSBmcm9tICdyeGpzLXNweS9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2FjaGUsIHNweVRhZyB9IGZyb20gJy4uL2RlY29yYXRvcnMvbWV0aG9kLWRlY29yYXRvcnMnO1xuaW1wb3J0IHsgdGltZVNwYW5JdGVtVG9UaW1lU3BhbiB9IGZyb20gJy4uL2Z1bmN0aW9ucy9mdW5jdGlvbnMnO1xuaW1wb3J0IHsgQXBwZWxsYXRpb25JdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0FwcGVsbGF0aW9uSXRlbSc7XG5pbXBvcnQgeyBCYXNpY1N0YXRlbWVudEl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvQmFzaWNTdGF0ZW1lbnRJdGVtJztcbmltcG9ydCB7IENsYXNzQW5kVHlwZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvQ2xhc3NBbmRUeXBlTm9kZSc7XG5pbXBvcnQgeyBDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCB9IGZyb20gJy4uL21vZGVscy9DbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCc7XG5pbXBvcnQgeyBDdHJsVGltZVNwYW5EaWFsb2dSZXN1bHQgfSBmcm9tICcuLi9tb2RlbHMvQ3RybFRpbWVTcGFuRGlhbG9nUmVzdWx0JztcbmltcG9ydCB7IERpbWVuc2lvbkl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvRGltZW5zaW9uSXRlbSc7XG5pbXBvcnQgeyBFbnRpdHlQcmV2aWV3SXRlbSB9IGZyb20gJy4uL21vZGVscy9FbnRpdHlQcmV2aWV3SXRlbSc7XG5pbXBvcnQgeyBFbnRpdHlQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vbW9kZWxzL0VudGl0eVByb3BlcnRpZXMnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9tb2RlbHMvRmllbGQnO1xuaW1wb3J0IHsgSXRlbUxpc3QgfSBmcm9tICcuLi9tb2RlbHMvSXRlbUxpc3QnO1xuaW1wb3J0IHsgTGFuZ1N0cmluZ0l0ZW0gfSBmcm9tICcuLi9tb2RlbHMvTGFuZ1N0cmluZ0l0ZW0nO1xuaW1wb3J0IHsgTGFuZ3VhZ2VJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0xhbmd1YWdlSXRlbSc7XG5pbXBvcnQgeyBQbGFjZUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvUGxhY2VJdGVtJztcbmltcG9ydCB7IFByb3BlcnR5T3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL1Byb3BlcnR5T3B0aW9uJztcbmltcG9ydCB7IFByb3BlcnR5U2VsZWN0TW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvUHJvcGVydHlTZWxlY3RNb2RlbCc7XG5pbXBvcnQgeyBTdGF0ZW1lbnRJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1N0YXRlbWVudEl0ZW0nO1xuaW1wb3J0IHsgU3ViZmllbGQgfSBmcm9tICcuLi9tb2RlbHMvU3ViZmllbGQnO1xuaW1wb3J0IHsgVGVtcG9yYWxFbnRpdHlDZWxsIH0gZnJvbSAnLi4vbW9kZWxzL1RlbXBvcmFsRW50aXR5Q2VsbCc7XG5pbXBvcnQgeyBUZW1wb3JhbEVudGl0eUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvVGVtcG9yYWxFbnRpdHlJdGVtJztcbmltcG9ydCB7IFRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcyB9IGZyb20gJy4uL21vZGVscy9UZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMnO1xuaW1wb3J0IHsgVGVtcG9yYWxFbnRpdHlSb3cgfSBmcm9tICcuLi9tb2RlbHMvVGVtcG9yYWxFbnRpdHlSb3cnO1xuaW1wb3J0IHsgVGltZVByaW1pdGl2ZUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvVGltZVByaW1pdGl2ZUl0ZW0nO1xuaW1wb3J0IHsgVGltZVNwYW5JdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1RpbWVTcGFuSXRlbSc7XG5pbXBvcnQgeyBUaW1lU3BhblByb3BlcnR5IH0gZnJvbSAnLi4vbW9kZWxzL1RpbWVTcGFuUHJvcGVydHknO1xuaW1wb3J0IHsgSW5mTW9kZWxOYW1lLCBJbmZTZWxlY3RvciB9IGZyb20gJy4uL3NlbGVjdG9ycy9pbmYuc2VydmljZSc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25QaXBlc1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24tcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbkJhc2ljUGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9pbmZvcm1hdGlvbi1iYXNpYy1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5cblxuXG5cblxuXG5cbkBJbmplY3RhYmxlKClcbi8qKlxuICogVGhpcyBTZXJ2aWNlIHByb3ZpZGVzIGEgY29sbGVjaW9uIG9mIHBpcGVzIHRoYXQgYWdncmVnYXRlIG9yIHRyYW5zZm9ybSBpbmZvcm1hdGlvbi5cbiAqIEZvciBFeGFtcGxlXG4gKiAtIHRoZSBsaXN0cyBvZiB0ZXh0IHByb3BlcnRpZXMsIGFwcGVsbGFpdG9ucywgcGxhY2VzLCB0aW1lLXByaW1pdGl2ZXMgLyB0aW1lLXNwYW5zIGV0Yy5cbiAqIC0gdGhlIGxhYmVsIG9mIHRlbXBvcmFsIGVudGl0eSBvciBwZXJzaXN0ZW50IGl0ZW1cbiAqXG4gKiBUaGlzIG1haW5seSBzZWxlY3RzIGRhdGEgZnJvbSB0aGUgaW5mb3JtYXRpb24gc2NoZW1hIGFuZCB0aGUgcmVsYXRpb24gdG8gcHJvamVjdHMuXG4gKiBJdCBjb21iaW5lcyBwaXBlcyBzZWxlY3RpbmcgZGF0YSBmcm9tIHRoZVxuICogLSBhY3RpdmF0ZWQgcHJvamVjdFxuICogLSBhbHRlcm5hdGl2ZXMgKG5vdCBpbiBwcm9qZWN0IGJ1dCBpbiBvdGhlcnMpXG4gKiAtIHJlcG9cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZvcm1hdGlvblBpcGVzU2VydmljZSB7XG5cbiAgaW5mUmVwbzogSW5mU2VsZWN0b3I7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBiOiBJbmZvcm1hdGlvbkJhc2ljUGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcDogQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSxcbiAgICBwcml2YXRlIHM6IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjOiBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlLFxuICAgIHB1YmxpYyB0aW1lUHJpbWl0aXZlUGlwZTogVGltZVByaW1pdGl2ZVBpcGUsXG4gICAgcHJpdmF0ZSB0aW1lU3BhblBpcGU6IFRpbWVTcGFuUGlwZSxcbiAgICBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT5cbiAgKSB7XG4gICAgdGhpcy5pbmZSZXBvID0gbmV3IEluZlNlbGVjdG9yKG5nUmVkdXgsIG9mKCdyZXBvJykpXG4gIH1cblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogUGlwZSB0aGUgcHJvamVjdCBlbnRpdGllc1xuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIEBzcHlUYWcgcGlwZUxpc3RMZW5ndGgobDogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHN3aXRjaCAobC5saXN0VHlwZSkge1xuICAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAgICAgY2FzZSAnZW50aXR5LXByZXZpZXcnOlxuICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgY2FzZSAncGxhY2UnOlxuICAgICAgY2FzZSAnZGltZW5zaW9uJzpcbiAgICAgIGNhc2UgJ2xhbmdTdHJpbmcnOlxuICAgICAgY2FzZSAndGVtcG9yYWwtZW50aXR5JzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3QobCwgcGtFbnRpdHkpLnBpcGUobWFwKGl0ZW1zID0+IGl0ZW1zLmxlbmd0aCkpXG5cbiAgICAgIGNhc2UgJ3RpbWUtc3Bhbic6XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MiwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MSwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTAsIHBrRW50aXR5KSxcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUxLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MiwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTMsIHBrRW50aXR5KVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgdGFwKCh4KSA9PiB7XG5cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBtYXAoaXRlbXMgPT4gaXRlbXMuZmlsdGVyKHggPT4geC5sZW5ndGggPiAwKS5sZW5ndGgpKVxuXG4gICAgICAvLyBjYXNlICd0ZXh0LXByb3BlcnR5JzpcbiAgICAgIC8vICAgcmV0dXJuIHRoaXMucGlwZUxpc3RUZXh0UHJvcGVydHkobCwgcGtFbnRpdHkpLnBpcGUobWFwKGl0ZW1zID0+IGl0ZW1zLmxlbmd0aCkpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICAgICAgICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgICB9XG4gIH1cblxuICBAc3B5VGFnIHBpcGVMaXN0KGw6IFN1YmZpZWxkLCBwa0VudGl0eSwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEl0ZW1MaXN0PiB7XG4gICAgaWYgKGwubGlzdFR5cGUuYXBwZWxsYXRpb24pIHJldHVybiB0aGlzLnBpcGVMaXN0QXBwZWxsYXRpb24obCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZW50aXR5UHJldmlldykgcmV0dXJuIHRoaXMucGlwZUxpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmd1YWdlKSByZXR1cm4gdGhpcy5waXBlTGlzdExhbmd1YWdlKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnBsYWNlKSByZXR1cm4gdGhpcy5waXBlTGlzdFBsYWNlKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmRpbWVuc2lvbikgcmV0dXJuIHRoaXMucGlwZUxpc3REaW1lbnNpb24obCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ1N0cmluZykgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5nU3RyaW5nKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnRlbXBvcmFsRW50aXR5KSByZXR1cm4gdGhpcy5waXBlTGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUudGltZVNwYW4pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtVGltZVNwYW4ocGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIG1hcCgodHMpID0+IFt0c10uZmlsdGVyKGkgPT4gaS5wcm9wZXJ0aWVzLmxlbmd0aCA+IDApKVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICB9XG5cbiAgQHNweVRhZyBwaXBlTGlzdEJhc2ljU3RhdGVtZW50SXRlbXMobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBwa1Byb2plY3Q6IG51bWJlcik6IE9ic2VydmFibGU8QmFzaWNTdGF0ZW1lbnRJdGVtW10+IHtcbiAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ0Jhc2ljU3RhdGVtZW50SXRlbXNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5LCBwa1Byb2plY3QpIDpcbiAgICAgIHRoaXMuYi5waXBlSW5nb2luZ0Jhc2ljU3RhdGVtZW50SXRlbXNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5LCBwa1Byb2plY3QpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGl0ZW1zIGluIGFwcGVsbGF0aW9uIGZpZWxkXG4gICAqL1xuICBAc3B5VGFnIHBpcGVMaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gKiBQaXBlIHRoZSBpdGVtcyBpbiBlbnRpdHkgcHJldmlldyBmaWVsZFxuICovXG4gIEBzcHlUYWcgcGlwZUxpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhZyhgYmVmb3JlLSR7cGtFbnRpdHl9LSR7bGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eX0tJHtsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzc31gKSxcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEub3JkTnVtID4gYi5vcmROdW0gPyAxIDogLTEpLFxuICAgICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pXG4gICAgICAgICAgICApXG4gICAgICAgIH0pLFxuICAgICAgICB0YWcoYGFmdGVyLSR7cGtFbnRpdHl9LSR7bGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eX0tJHtsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzc31gKSxcbiAgICAgIClcblxuICB9XG5cblxuICBAc3B5VGFnIHBpcGVMaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgaXRlbXMgaW4gcGxhY2UgbGlzdFxuICAgKi9cbiAgQHNweVRhZyBwaXBlTGlzdFBsYWNlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbVBsYWNlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGl0ZW1zIGluIHBsYWNlIGxpc3RcbiAgICovXG4gIEBzcHlUYWcgcGlwZUxpc3REaW1lbnNpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICogUGlwZSB0aGUgaXRlbXMgaW4gbGFuZ1N0cmluZyBsaXN0XG4gKi9cbiAgQHNweVRhZyBwaXBlTGlzdExhbmdTdHJpbmc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5nU3RyaW5nKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuXG4gIH1cblxuXG4gIHBpcGVTdGF0ZW1lbnRMaXN0UGFnZShcbiAgICBwYWdpbmF0ZUJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSxcbiAgICBsaW1pdDogbnVtYmVyLFxuICAgIG9mZnNldDogbnVtYmVyLFxuICAgIHBrUHJvamVjdDogbnVtYmVyLFxuICAgIGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCxcbiAgICBhbHRlcm5hdGl2ZSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgICAvLyBwcmVwYXJlIHBhZ2UgbG9hZGVyXG4gICAgY29uc3QgcGFnZUxvYWRlciQgPSBhbHRlcm5hdGl2ZSA/IHRoaXMuaW5mUmVwby5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kIDogdGhpcy5zLmluZiQuc3RhdGVtZW50JC5wYWdpbmF0aW9uJDtcblxuICAgIC8vIHByZXBhcmUgYmFzaWMgc3RhdGVtZW50IGl0ZW0gbG9hZGVyXG4gICAgY29uc3QgYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyID0gKHBrU3RhdGVtZW50LCBpc091dGdvaW5nLCBwa1Byb2opID0+IHtcbiAgICAgIHJldHVybiBhbHRlcm5hdGl2ZSA/XG4gICAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrU3RhdGVtZW50LCBpc091dGdvaW5nKSA6XG4gICAgICAgIHRoaXMuYi5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1Byb2osIHBrU3RhdGVtZW50LCBpc091dGdvaW5nKVxuICAgIH1cblxuICAgIGNvbnN0IHBhZ2luYXRlZFN0YXRlbWVudFBrcyQgPSBwYWdlTG9hZGVyJC5waXBlUGFnZShwYWdpbmF0ZUJ5LCBsaW1pdCwgb2Zmc2V0KVxuXG4gICAgcmV0dXJuIHBhZ2luYXRlZFN0YXRlbWVudFBrcyQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgocGFnaW5hdGVkU3RhdGVtZW50UGtzKSA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgcGFnaW5hdGVkU3RhdGVtZW50UGtzLm1hcChwa1N0YXRlbWVudCA9PiBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIocGtTdGF0ZW1lbnQsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsIHBrUHJvamVjdClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgICAgICBzd2l0Y2hNYXAoeCA9PiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyh4LmlzT3V0Z29pbmcgPyB4LnN0YXRlbWVudC5ma19vYmplY3RfaW5mbyA6IHguc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbylcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChwcmV2aWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBFbnRpdHlQcmV2aWV3SXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgLi4ueCxcbiAgICAgICAgICAgICAgICAgICAgcHJldmlldyxcbiAgICAgICAgICAgICAgICAgICAgZmtDbGFzczogcHJldmlldy5ma19jbGFzc1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSlcblxuICAgICAgICApXG4gICAgICApXG4gICAgICApKVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSB0ZW1wb3JhbCBlbnRpdGllcyBjb25uZWN0ZWQgdG8gZ2l2ZW4gZW50aXR5IGJ5IHN0YXRlbWVudHMgdGhhdCBhcmUgaW4gdGhlIGN1cnJlbnQgcHJvamVjdFxuICAgKi9cbiAgQHNweVRhZyBwaXBlVGVtcG9yYWxFbnRpdHlUYWJsZVJvd3MoXG4gICAgcGFnaW5hdGVCeTogUGFnaW5hdGVCeVBhcmFtW10sXG4gICAgbGltaXQ6IG51bWJlcixcbiAgICBvZmZzZXQ6IG51bWJlcixcbiAgICBwa1Byb2plY3Q6IG51bWJlcixcbiAgICBsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsXG4gICAgZmllbGREZWZpbml0aW9uczogRmllbGRbXSxcbiAgICBhbHRlcm5hdGl2ZSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxUZW1wb3JhbEVudGl0eUl0ZW1bXT4ge1xuXG4gICAgLy8gY29uc3QgcHJvcGVydHlJdGVtVHlwZSA9IHRoaXMucHJvcGVydHlJdGVtVHlwZShmaWVsZERlZmluaXRpb25zKVxuXG4gICAgY29uc3QgdGFyZ2V0RW50aXR5T2ZTdGF0ZW1lbnRJdGVtID0gKHI6IEJhc2ljU3RhdGVtZW50SXRlbSkgPT4gci5pc091dGdvaW5nID8gci5zdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8gOiByLnN0YXRlbWVudC5ma19zdWJqZWN0X2luZm87XG5cbiAgICAvLyBwcmVwYXJlIHBhZ2UgbG9hZGVyXG4gICAgY29uc3QgcGFnZUxvYWRlciQgPSBhbHRlcm5hdGl2ZSA/IHRoaXMuaW5mUmVwby5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kIDogdGhpcy5zLmluZiQuc3RhdGVtZW50JC5wYWdpbmF0aW9uJDtcblxuICAgIC8vIHByZXBhcmUgYmFzaWMgc3RhdGVtZW50IGl0ZW0gbG9hZGVyXG4gICAgY29uc3QgYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyID0gKHBrU3RhdGVtZW50LCBpc091dGdvaW5nLCBwa1Byb2opID0+IHtcbiAgICAgIHJldHVybiBhbHRlcm5hdGl2ZSA/XG4gICAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrU3RhdGVtZW50LCBpc091dGdvaW5nKSA6XG4gICAgICAgIHRoaXMuYi5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1Byb2osIHBrU3RhdGVtZW50LCBpc091dGdvaW5nKVxuICAgIH1cblxuICAgIC8vIHByZXBhcmUgVGVFblJvdyBsb2FkZXJcbiAgICBjb25zdCByb3dMb2FkZXIgPSAodGFyZ2V0RW50aXR5UGssIGZpZWxkRGVmLCBwa1Byb2opID0+IHtcbiAgICAgIHJldHVybiBhbHRlcm5hdGl2ZSA/XG4gICAgICAgIHRoaXMucGlwZUl0ZW1UZUVuUm93KHRhcmdldEVudGl0eVBrLCBmaWVsZERlZiwgbnVsbCwgdHJ1ZSkgOlxuICAgICAgICB0aGlzLnBpcGVJdGVtVGVFblJvdyh0YXJnZXRFbnRpdHlQaywgZmllbGREZWYsIHBrUHJvaiwgZmFsc2UpXG4gICAgfVxuXG4gICAgY29uc3QgcGFnaW5hdGVkU3RhdGVtZW50UGtzJCA9IHBhZ2VMb2FkZXIkLnBpcGVQYWdlKHBhZ2luYXRlQnksIGxpbWl0LCBvZmZzZXQpXG5cbiAgICBjb25zdCByb3dzJCA9IHBhZ2luYXRlZFN0YXRlbWVudFBrcyQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgocGFnaW5hdGVkU3RhdGVtZW50UGtzKSA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgcGFnaW5hdGVkU3RhdGVtZW50UGtzLm1hcChwa1N0YXRlbWVudCA9PiBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIocGtTdGF0ZW1lbnQsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsIHBrUHJvamVjdClcbiAgICAgICAgICAucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICAgICApXG4gICAgICApXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgodGVFblN0YXRlbWVudCkgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgICAgICB0ZUVuU3RhdGVtZW50Lm1hcCgoYmFzaWNTdGF0ZW1lbnRJdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHBrVGVFbiA9IHRhcmdldEVudGl0eU9mU3RhdGVtZW50SXRlbShiYXNpY1N0YXRlbWVudEl0ZW0pO1xuICAgICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgICAgICByb3dMb2FkZXIoXG4gICAgICAgICAgICAgICAgICBwa1RlRW4sXG4gICAgICAgICAgICAgICAgICBmaWVsZERlZmluaXRpb25zLFxuICAgICAgICAgICAgICAgICAgLy8gcHJvcGVydHlJdGVtVHlwZSxcbiAgICAgICAgICAgICAgICAgIHBrUHJvamVjdFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgcGtUZUVuKVxuICAgICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChbcm93LCB0ZUVuUHJvalJlbF0pID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRlbXBvcmFsRW50aXR5SXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYmFzaWNTdGF0ZW1lbnRJdGVtLFxuICAgICAgICAgICAgICAgICAgICByb3csXG4gICAgICAgICAgICAgICAgICAgIHBrRW50aXR5OiBwa1RlRW4sXG4gICAgICAgICAgICAgICAgICAgIHRlRW5Qcm9qUmVsXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICkpLFxuICAgICAgICApKSxcblxuICAgIClcbiAgICByZXR1cm4gcm93cyRcbiAgfVxuXG5cblxuICBAc3B5VGFnIHBpcGVJdGVtVGVFblJvdyhwa0VudGl0eTogbnVtYmVyLCBmaWVsZERlZmluaXRpb25zOiBGaWVsZFtdLCBwa1Byb2plY3Q6IG51bWJlciwgcmVwbzogYm9vbGVhbik6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlSb3c+IHtcblxuICAgIC8vIHBpcGUgb3V0Z29pbmcgc3RhdGVtZW50c1xuICAgIGNvbnN0IG91dGdvaW5nU3RhdGVtZW50cyQgPSByZXBvID8gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KSA6IHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTtcbiAgICAvLyBwaXBlIGluZ29pbmcgc3RhdGVtZW50c1xuICAgIGNvbnN0IGluZ29pbmdTdGF0ZW1lbnRzJCA9IHJlcG8gPyB0aGlzLmIucGlwZVJlcG9JbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSkgOiB0aGlzLmIucGlwZUluZ29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTtcblxuXG4gICAgLy8gcGlwZSBhbGwgc3RhdGVtZW50cyB3aXRoIGluZm9ybWF0aW9uIGxlYWYgaXRlbXNcblxuICAgIGNvbnN0IG91dGdvaW5nSXRlbXMkOiBPYnNlcnZhYmxlPFN0YXRlbWVudEl0ZW1bXT4gPSBvdXRnb2luZ1N0YXRlbWVudHMkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgc3RhdGVtZW50c1xuICAgICAgICAgIC5maWx0ZXIoc3RhdGVtZW50ID0+ICEhc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKSAvLyByZW1vdmUgc3RhdGVtZW50cyBub3QgcG9pbnRpbmcgdG8gaW5mb3JtYXRpb25cbiAgICAgICAgICAubWFwKHMgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNPdXRnb2luZyA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbShzLCBwa1Byb2plY3QsIGlzT3V0Z29pbmcpO1xuICAgICAgICAgIH0pXG4gICAgICApKVxuXG4gICAgKVxuICAgIGNvbnN0IGluZ29pbmdJdGVtcyQ6IE9ic2VydmFibGU8U3RhdGVtZW50SXRlbVtdPiA9IGluZ29pbmdTdGF0ZW1lbnRzJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIHN0YXRlbWVudHNcbiAgICAgICAgICAuZmlsdGVyKHN0YXRlbWVudCA9PiAhIXN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pIC8vIHJlbW92ZSBzdGF0ZW1lbnRzIG5vdCBwb2ludGluZyB0byBpbmZvcm1hdGlvblxuICAgICAgICAgIC5tYXAocyA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc091dGdvaW5nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbShzLCBwa1Byb2plY3QsIGlzT3V0Z29pbmcpO1xuICAgICAgICAgIH0pXG4gICAgICApKVxuXG4gICAgKVxuXG4gICAgY29uc3Qgc29ydEl0ZW1zID0gcmVwbyA/XG4gICAgICAoaXRlbTogU3RhdGVtZW50SXRlbVtdKSA9PiBpdGVtLnNvcnQoKGEsIGIpID0+IGEuc3RhdGVtZW50LmlzX2luX3Byb2plY3RfY291bnQgPiBiLnN0YXRlbWVudC5pc19pbl9wcm9qZWN0X2NvdW50ID8gMSA6IC0xKSA6XG4gICAgICAoaXRlbTogU3RhdGVtZW50SXRlbVtdKSA9PiBpdGVtO1xuXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChvdXRnb2luZ0l0ZW1zJCwgaW5nb2luZ0l0ZW1zJCkucGlwZShcblxuICAgICAgbWFwKChbb3V0Z29pbmdJdGVtcywgaW5nb2luZ0l0ZW1zXSkgPT4ge1xuICAgICAgICBjb25zdCBncm91cGVkT3V0ID0gZ3JvdXBCeSgoaSkgPT4gKGkgJiYgaS5zdGF0ZW1lbnQgPyBpLnN0YXRlbWVudC5ma19wcm9wZXJ0eS50b1N0cmluZygpIDogdW5kZWZpbmVkKSwgb3V0Z29pbmdJdGVtcyk7XG4gICAgICAgIGNvbnN0IGdyb3VwZWRJbiA9IGdyb3VwQnkoKGkpID0+IChpICYmIGkuc3RhdGVtZW50ID8gaS5zdGF0ZW1lbnQuZmtfcHJvcGVydHkudG9TdHJpbmcoKSA6IHVuZGVmaW5lZCksIGluZ29pbmdJdGVtcyk7XG4gICAgICAgIHJldHVybiB7IGdyb3VwZWRPdXQsIGdyb3VwZWRJbiB9XG4gICAgICB9KSxcbiAgICAgIC8vIGF1ZGl0VGltZSgxMCksXG4gICAgICBtYXAoKGQpID0+IHtcbiAgICAgICAgY29uc3Qgcm93OiBUZW1wb3JhbEVudGl0eVJvdyA9IHt9XG5cbiAgICAgICAgZmllbGREZWZpbml0aW9ucy5mb3JFYWNoKGZpZWxkRGVmaW5pdGlvbiA9PiB7XG5cbiAgICAgICAgICBsZXQgY2VsbDogVGVtcG9yYWxFbnRpdHlDZWxsO1xuICAgICAgICAgIGZpZWxkRGVmaW5pdGlvbi5saXN0RGVmaW5pdGlvbnMuZm9yRWFjaChsaXN0RGVmaW5pdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAobGlzdERlZmluaXRpb24ubGlzdFR5cGUudGltZVNwYW4pIHtcblxuICAgICAgICAgICAgICBjb25zdCB0ID0gcGljayhbJzcxJywgJzcyJywgJzE1MCcsICcxNTEnLCAnMTUyJywgJzE1MyddLCBkLmdyb3VwZWRPdXQpO1xuICAgICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModCk7XG4gICAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnQgPSBrZXlzLmxlbmd0aDtcblxuICAgICAgICAgICAgICBsZXQgbGFiZWw7XG4gICAgICAgICAgICAgIGlmIChpdGVtc0NvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVTcGFuS2V5czogQ3RybFRpbWVTcGFuRGlhbG9nUmVzdWx0ID0ge31cbiAgICAgICAgICAgICAgICBrZXlzLmZvckVhY2goa2V5ID0+IHsgdGltZVNwYW5LZXlzW2tleV0gPSB0W2tleV1bMF0udGltZVByaW1pdGl2ZSB9KVxuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVTcGFuID0gVGltZVNwYW5VdGlsLmZyb21UaW1lU3BhbkRpYWxvZ0RhdGEodGltZVNwYW5LZXlzKTtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IHRoaXMudGltZVNwYW5QaXBlLnRyYW5zZm9ybSh0aW1lU3Bhbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2VsbCA9IHtcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIGl0ZW1zQ291bnQsXG4gICAgICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHBrUHJvcGVydHk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBpc1RpbWVTcGFuOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgICAgICAgICAgIGlmIChkLmdyb3VwZWRPdXRbbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gc29ydEl0ZW1zKGQuZ3JvdXBlZE91dFtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSlcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgICAgICAgY2VsbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogbGlzdERlZmluaXRpb24uaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNDb3VudDogaXRlbXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcmV2aWV3OiAoKGZpcnN0SXRlbSB8fCB7fSkgYXMgRW50aXR5UHJldmlld0l0ZW0pLnByZXZpZXcsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmaXJzdEl0ZW0ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIHBrUHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0SXRlbSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuZ3JvdXBlZEluW2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IHNvcnRJdGVtcyhkLmdyb3VwZWRJbltsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSlcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgICAgICAgY2VsbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogbGlzdERlZmluaXRpb24uaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNDb3VudDogaXRlbXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcmV2aWV3OiAoKGZpcnN0SXRlbSB8fCB7fSkgYXMgRW50aXR5UHJldmlld0l0ZW0pLnByZXZpZXcsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmaXJzdEl0ZW0ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIHBrUHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0SXRlbSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pXG5cblxuICAgICAgICAgIHJvd1tmaWVsZERlZmluaXRpb24ubGFiZWxdID0gY2VsbDtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJvd1xuICAgICAgfSlcblxuXG4gICAgKVxuICB9XG5cblxuXG4gIEBzcHlUYWcgcHJpdmF0ZSBwaXBlSXRlbShyOiBJbmZTdGF0ZW1lbnQsIHBrUHJvamVjdDogbnVtYmVyLCBwcm9wSXNPdXRnb2luZzogYm9vbGVhbikge1xuXG4gICAgY29uc3QgdGFyZ2V0RW50aXR5ID0gcHJvcElzT3V0Z29pbmcgPyByLmZrX29iamVjdF9pbmZvIDogci5ma19zdWJqZWN0X2luZm87XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmdldE1vZGVsT2ZFbnRpdHkkKHRhcmdldEVudGl0eSkucGlwZShcbiAgICAgIHN3aXRjaE1hcChtID0+IHtcbiAgICAgICAgY29uc3QgbW9kZWxOYW1lOiBJbmZNb2RlbE5hbWUgPSBtID8gbS5tb2RlbE5hbWUgOiB1bmRlZmluZWQ7XG4gICAgICAgIHN3aXRjaCAobW9kZWxOYW1lKSB7XG4gICAgICAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKTtcbiAgICAgICAgICBjYXNlICdsYW5ndWFnZSc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpO1xuICAgICAgICAgIGNhc2UgJ3BsYWNlJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtUGxhY2Uocik7XG4gICAgICAgICAgY2FzZSAnZGltZW5zaW9uJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpO1xuICAgICAgICAgIGNhc2UgJ2xhbmdfc3RyaW5nJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtTGFuZ1N0cmluZyhyKTtcbiAgICAgICAgICBjYXNlICd0aW1lX3ByaW1pdGl2ZSc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVRpbWVQcmltaXRpdmUociwgcGtQcm9qZWN0KTsgLy8gVE9ETzogZW1pdHMgdHdpY2VcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIHByb3BJc091dGdvaW5nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cblxuICAgICAgfSlcbiAgICApXG5cblxuICB9XG5cblxuICBAc3B5VGFnIHBpcGVFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWY6IFN1YmZpZWxkLCBma0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8RW50aXR5UHJvcGVydGllcz4ge1xuXG4gICAgaWYgKGxpc3REZWYubGlzdFR5cGUuYXBwZWxsYXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0QXBwZWxsYXRpb24obGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5sYW5ndWFnZSkge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5ndWFnZShsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLnBsYWNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdFBsYWNlKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUuZGltZW5zaW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdERpbWVuc2lvbihsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmxhbmdTdHJpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ1N0cmluZyhsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cblxuXG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5lbnRpdHlQcmV2aWV3IHx8IGxpc3REZWYubGlzdFR5cGUudGVtcG9yYWxFbnRpdHkpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0RW50aXR5UHJldmlldyhsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLnRpbWVTcGFuKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVRpbWVTcGFuKGZrRW50aXR5KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCBpdGVtcyA9IGl0ZW0ucHJvcGVydGllcy5maW5kKHAgPT4gcC5pdGVtcy5sZW5ndGggPiAwKSA/IFt7XG4gICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lU3BhblBpcGUudHJhbnNmb3JtKHRpbWVTcGFuSXRlbVRvVGltZVNwYW4oaXRlbSkpLFxuICAgICAgICAgICAgcHJvcGVydGllczogW10gLy8gVE9ETyBjaGVjayBpZiB0aGUgcHJvcGVydGllcyBvciB0aGUgaXRlbSBhcmUgcmVhbGx5IG5vdCBuZWVkZWRcbiAgICAgICAgICB9XSA6IFtdXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxpc3REZWZpbml0aW9uOiBsaXN0RGVmLFxuICAgICAgICAgICAgaXRlbXNcbiAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgIH1cbiAgICBlbHNlIHJldHVybiBvZihudWxsKVxuICB9XG5cbiAgQHNweVRhZyBwaXBlVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzKHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPFRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcz4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLmluZiQudGVtcG9yYWxfZW50aXR5JC5ieV9wa19lbnRpdHlfa2V5JChwa0VudGl0eSksXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3QkKHsgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eSB9KSxcbiAgICAgIHRoaXMucy5pbmYkLnRleHRfcHJvcGVydHkkLmJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfaW5kZXhlZCQocGtFbnRpdHkpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbdGVtcG9yYWxFbnRpdHksIHN0YXRlbWVudHMsIHRleHRQcm9wZXJ0aWVzXSkgPT4ge1xuICAgICAgICBjb25zdCByZXM6IFRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcyA9IHtcbiAgICAgICAgICB0ZW1wb3JhbEVudGl0eSxcbiAgICAgICAgICBzdGF0ZW1lbnRzOiBzdGF0ZW1lbnRzLFxuICAgICAgICAgIHRleHRQcm9wZXJ0aWVzOiB2YWx1ZXModGV4dFByb3BlcnRpZXMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBnZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgaXRlbXMpOiBFbnRpdHlQcm9wZXJ0aWVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGlzdERlZmluaXRpb24sXG4gICAgICBpdGVtcyxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aW1lIHNwYW4gaXRlbSBpbiB2ZXJzaW9uIG9mIHByb2plY3RcbiAgICovXG4gIEBzcHlUYWcgcGlwZUl0ZW1UaW1lU3Bhbihwa0VudGl0eSk6IE9ic2VydmFibGU8VGltZVNwYW5JdGVtPiB7XG5cbiAgICByZXR1cm4gdGhpcy5wLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jLnBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhcbiAgICAgICAgICBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoZmllbGREZWZzID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KGZpZWxkRGVmcy5tYXAoZmllbGREZWYgPT4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgICAgICAgICBma19wcm9wZXJ0eTogZmllbGREZWYucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwT3IoW10sIHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnMuaW5mJC50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkLmtleShwa1Byb2plY3QgKyAnXycgKyBzdGF0ZW1lbnQucGtfZW50aXR5KVxuICAgICAgICAgICAgICAgICAgKS5waXBlKG1hcCgoW2luZlRpbWVQcmltaXRpdmUsIHByb2pSZWxdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXI6ICgocHJvalJlbC5jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICBwcm9qUmVsLFxuICAgICAgICAgICAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAgICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXM6IFRpbWVTcGFuUHJvcGVydHkgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uOiBmaWVsZERlZi5saXN0RGVmaW5pdGlvbnNbMF0sIGl0ZW1zXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSkucGlwZShcbiAgICAgICAgICAgICAgbWFwKChwcm9wZXJ0aWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcHMgPSBwcm9wZXJ0aWVzLmZpbHRlcihwID0+IHAuaXRlbXMubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZXNwYW5pdGVtOiBUaW1lU3Bhbkl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZXNwYW5pdGVtXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSlcblxuICAgIClcbiAgfVxuXG4gIEBzcHlUYWcgcGlwZUl0ZW1BcHBlbGxhdGlvbihzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmFwcGVsbGF0aW9uJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgbWFwKGFwcGVsbGF0aW9uID0+IHtcbiAgICAgICAgaWYgKCFhcHBlbGxhdGlvbikgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG5vZGU6IEFwcGVsbGF0aW9uSXRlbSA9IHtcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgIGxhYmVsOiBhcHBlbGxhdGlvbi5zdHJpbmcsXG4gICAgICAgICAgZmtDbGFzczogYXBwZWxsYXRpb24uZmtfY2xhc3NcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfSkpXG4gIH1cblxuICBAc3B5VGFnIHBpcGVJdGVtTGFuZ3VhZ2Uoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5ndWFnZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIG1hcChsYW5ndWFnZSA9PiB7XG4gICAgICAgIGlmICghbGFuZ3VhZ2UpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBub2RlOiBMYW5ndWFnZUl0ZW0gPSB7XG4gICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICBsYWJlbDogbGFuZ3VhZ2Uubm90ZXMsXG4gICAgICAgICAgZmtDbGFzczogbGFuZ3VhZ2UuZmtfY2xhc3NcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfSkpXG4gIH1cblxuICBAc3B5VGFnIHBpcGVJdGVtUGxhY2Uoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5wbGFjZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIG1hcChwbGFjZSA9PiB7XG4gICAgICAgIGlmICghcGxhY2UpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBub2RlOiBQbGFjZUl0ZW0gPSB7XG4gICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICBsYWJlbDogJ1dHUzg0OiAnICsgcGxhY2UubGF0ICsgJ8KwLCAnICsgcGxhY2UubG9uZyArICfCsCcsXG4gICAgICAgICAgZmtDbGFzczogcGxhY2UuZmtfY2xhc3NcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfSkpXG4gIH1cblxuICBAc3B5VGFnIHBpcGVJdGVtRGltZW5zaW9uKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmRpbWVuc2lvbiQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIHN3aXRjaE1hcCgoZGltZW5zaW9uKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhkaW1lbnNpb24uZmtfbWVhc3VyZW1lbnRfdW5pdClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChwcmV2aWV3ID0+IHtcblxuICAgICAgICAgICAgICBjb25zdCBub2RlOiBEaW1lbnNpb25JdGVtID0ge1xuICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGAke2RpbWVuc2lvbi5udW1lcmljX3ZhbHVlfSAke3ByZXZpZXcuZW50aXR5X2xhYmVsfWAsXG4gICAgICAgICAgICAgICAgZmtDbGFzczogZGltZW5zaW9uLmZrX2NsYXNzLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuICBAc3B5VGFnIHBpcGVJdGVtTGFuZ1N0cmluZyhzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ19zdHJpbmckLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgKGxhbmdTdHJpbmcpID0+IHtcbiAgICAgICAgICBpZiAoIWxhbmdTdHJpbmcpIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpXG4gICAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleShsYW5nU3RyaW5nLmZrX2xhbmd1YWdlKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChsYW5ndWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFsYW5ndWFnZSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGxhbmdTdHJpbmcuc3RyaW5nKSBsYWJlbCA9IGxhbmdTdHJpbmcuc3RyaW5nXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGFuZ1N0cmluZy5xdWlsbF9kb2MgJiYgbGFuZ1N0cmluZy5xdWlsbF9kb2Mub3BzICYmIGxhbmdTdHJpbmcucXVpbGxfZG9jLm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsID0gbGFuZ1N0cmluZy5xdWlsbF9kb2Mub3BzLm1hcChvcCA9PiBvcC5pbnNlcnQpLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBub2RlOiBMYW5nU3RyaW5nSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICAgICAgICBma0NsYXNzOiBsYW5nU3RyaW5nLmZrX2NsYXNzLFxuICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgICAgICAgICAgICBma0xhbmd1YWdlOiBsYW5nU3RyaW5nLmZrX2xhbmd1YWdlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuICBAc3B5VGFnIHBpcGVJdGVtRW50aXR5UHJldmlldyhzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoKGlzT3V0Z29pbmcgPyBzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8gOiBzdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKSkucGlwZShcbiAgICAgIC8vIGZpbHRlcihwcmV2aWV3ID0+ICFwcmV2aWV3LmxvYWRpbmcgJiYgISFwcmV2aWV3ICYmICEhcHJldmlldy5lbnRpdHlfdHlwZSksXG4gICAgICBtYXAocHJldmlldyA9PiB7XG4gICAgICAgIGlmICghcHJldmlldykge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vZGU6IEVudGl0eVByZXZpZXdJdGVtID0ge1xuICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgcHJldmlldyxcbiAgICAgICAgICBsYWJlbDogcHJldmlldy5lbnRpdHlfbGFiZWwgfHwgJycsXG4gICAgICAgICAgZmtDbGFzczogcHJldmlldy5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGtcbiAgICovXG4gIEBzcHlUYWcgcGlwZUl0ZW1UaW1lUHJpbWl0aXZlKHN0YXRlbWVudDogSW5mU3RhdGVtZW50LCBwa1Byb2plY3QpOiBPYnNlcnZhYmxlPFRpbWVQcmltaXRpdmVJdGVtPiB7XG4gICAgaWYgKHBrUHJvamVjdCkge1xuICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHN0YXRlbWVudC5wa19lbnRpdHkpLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICAgICkucGlwZShcbiAgICAgICAgbWFwKChbaW5mVGltZVByaW1pdGl2ZSwgcHJvalJlbF0pID0+IHtcbiAgICAgICAgICBpZiAoIWluZlRpbWVQcmltaXRpdmUpIHJldHVybiBudWxsO1xuICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgICAgICAgICAgIGNhbGVuZGFyOiAoKHByb2pSZWwuY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zdCBub2RlOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlKSxcbiAgICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgfSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmluZlJlcG8udGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShmaWx0ZXIoeCA9PiAhIXgpKS5waXBlKFxuICAgICAgICBtYXAoaW5mVGltZVByaW1pdGl2ZSA9PiB7XG4gICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgY2FsZW5kYXI6ICgoc3RhdGVtZW50LmNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnN0IG5vZGU6IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAqIFBpcGUgYWx0ZXJuYXRpdmVzIChub3QgaW4gcHJvamVjdClcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICBAc3B5VGFnIHBpcGVBbHRMaXN0TGVuZ3RoKGw6IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICBzd2l0Y2ggKGwubGlzdFR5cGUpIHtcbiAgICAgIGNhc2UgJ2FwcGVsbGF0aW9uJzpcbiAgICAgIGNhc2UgJ2VudGl0eS1wcmV2aWV3JzpcbiAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgICAgIGNhc2UgJ3BsYWNlJzpcbiAgICAgIGNhc2UgJ2xhbmdTdHJpbmcnOlxuICAgICAgY2FzZSAndGVtcG9yYWwtZW50aXR5JzpcbiAgICAgIGNhc2UgJ3RpbWUtc3Bhbic6XG4gICAgICAgIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0U3RhdGVtZW50cyhsLCBwa0VudGl0eSkucGlwZShtYXAoaXRlbXMgPT4gaXRlbXMubGVuZ3RoKSlcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIEBzcHlUYWcgcGlwZUFsdExpc3QobDogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJdGVtTGlzdD4ge1xuICAgIGlmIChsLmxpc3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEFwcGVsbGF0aW9uKGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZW50aXR5UHJldmlldykgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ3VhZ2UpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0TGFuZ3VhZ2UobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5wbGFjZSkgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RQbGFjZShsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmRpbWVuc2lvbikgcmV0dXJuIHRoaXMucGlwZUFsdExpc3REaW1lbnNpb24obCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5nU3RyaW5nKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdExhbmdTdHJpbmcobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5KVxuICAgIGVsc2UgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gIH1cblxuICBAc3B5VGFnIHBpcGVBbHRMaXN0U3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkgOlxuICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUluZ29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgdGhlIGl0ZW1zIGluIGVudGl0eSBwcmV2aWV3IGZpZWxkXG4gICovXG4gIEBzcHlUYWcgcGlwZUFsdExpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSkpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXNcbiAgICAgICAgICAgICAgLmZpbHRlcihub2RlID0+ICEhbm9kZSlcbiAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEub3JkTnVtID4gYi5vcmROdW0gPyAxIDogLTEpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgIH0pKVxuXG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gcGxhY2UgbGlzdFxuICAgKi9cbiAgQHNweVRhZyBwaXBlQWx0TGlzdFBsYWNlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtUGxhY2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBkaW1lbnNpb24gbGlzdFxuICAgKi9cbiAgQHNweVRhZyBwaXBlQWx0TGlzdERpbWVuc2lvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1EaW1lbnNpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBsYW5nU3RyaW5nIGxpc3RcbiAgICovXG4gIEBzcHlUYWcgcGlwZUFsdExpc3RMYW5nU3RyaW5nPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPExhbmdTdHJpbmdJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5nU3RyaW5nKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGFwcGVsbGF0aW9uIGZpZWxkXG4gICAqL1xuICBAc3B5VGFnIHBpcGVBbHRMaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBsYW5ndWFnZSBmaWVsZFxuICAgKi9cbiAgQHNweVRhZyBwaXBlQWx0TGlzdExhbmd1YWdlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIFBpcGUgcmVwbyB2aWV3cyAoY29tbXVuaXR5IGZhdm9yaXRlcywgd2hlcmUgcmVzdHJpY3RlZCBieSBxdWFudGlmaWVycylcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAvKipcbiAgICogUGlwZSByZXBvc2l0b3J5IHRlbXBvcmFsIGVudGl0eSBpdGVtIGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBQaXBlIGFwcGVsbGF0aW9uIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICAqL1xuICBAc3B5VGFnIHBpcGVSZXBvTGlzdEFwcGVsbGF0aW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEFwcGVsbGF0aW9uSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBQaXBlIGxhbmd1YWdlIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICovXG4gIEBzcHlUYWcgcGlwZVJlcG9MaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHBsYWNlIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICAqL1xuICBAc3B5VGFnIHBpcGVSZXBvTGlzdFBsYWNlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtUGxhY2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBQaXBlIHBsYWNlIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICovXG4gIEBzcHlUYWcgcGlwZVJlcG9MaXN0RGltZW5zaW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuICAvKipcbiAgKiBQaXBlIHRoZSBpdGVtcyBpbiBlbnRpdHkgcHJldmlldyBmaWVsZCwgY29ubmVjdGVkIGJ5IGNvbW11bml0eSBmYXZvcml0ZSBzdGF0ZW1lbnRzXG4gICovXG4gIEBzcHlUYWcgcGlwZVJlcG9MaXN0RW50aXR5UHJldmlldzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAgICAgdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkgOlxuICAgICAgdGhpcy5iLnBpcGVSZXBvSW5nb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZykpKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKVxuICAgICAgICAgICAgICAvLyAuc29ydCgoYSwgYikgPT4gYS5vcmROdW0gPiBiLm9yZE51bSA/IDEgOiAtMSlcbiAgICAgICAgICAgICkpXG4gICAgICB9KSxcbiAgICAgIHN0YXJ0V2l0aChbXSlcbiAgICApXG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgcmVwbyB0aW1lIHNwYW4gaXRlbVxuICAgKi9cbiAgQHNweVRhZyBwaXBlUmVwb0l0ZW1UaW1lU3Bhbihwa0VudGl0eSk6IE9ic2VydmFibGU8VGltZVNwYW5JdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucC5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYy5waXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhcbiAgICAgICAgICBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoZmllbGREZWZpbml0aW9ucyA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KGZpZWxkRGVmaW5pdGlvbnMubWFwKGZpZWxkRGVmID0+XG4gICAgICAgICAgICAgIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoZmllbGREZWYucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICBzd2l0Y2hNYXBPcihbXSwgc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzLm1hcChzdGF0ZW1lbnQgPT5cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZlJlcG8udGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcCgoaW5mVGltZVByaW1pdGl2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyOiAoKHN0YXRlbWVudC5jb21tdW5pdHlfZmF2b3JpdGVfY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApKSxcbiAgICAgICAgICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlczogVGltZVNwYW5Qcm9wZXJ0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbjogZmllbGREZWYubGlzdERlZmluaXRpb25zWzBdLCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKHsgbGlzdERlZmluaXRpb246IGZpZWxkRGVmLmxpc3REZWZpbml0aW9uc1swXSwgaXRlbXM6IFtdIH0gYXMgVGltZVNwYW5Qcm9wZXJ0eSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKS5waXBlKFxuICAgICAgICAgICAgICBtYXAoKHByb3BlcnRpZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lc3Bhbml0ZW06IFRpbWVTcGFuSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMuZmlsdGVyKHByb3BzID0+IHByb3BzLml0ZW1zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lc3Bhbml0ZW1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIGxhYmVsIG9mIGdpdmVuIGVudGl0eVxuICAgKiBUaGlzIHdpbGwgdXNlIGVudGl0eSBwcmV2aWV3cyBmb3IgZ2V0dGluZyBzdHJpbmdzIG9mIHJlbGF0ZWQgdGVtcG9yYWwgZW50aXRpZXNcbiAgICogU28gdGhpcyBtYXkgdGFrZSBhIGxpdHRsZSB3aGlsZVxuICAgKi9cbiAgQHNweVRhZyBwaXBlTGFiZWxPZkVudGl0eShma0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5iLnBpcGVDbGFzc09mRW50aXR5KGZrRW50aXR5KS5waXBlKFxuXG4gICAgICAvLyBnZXQgdGhlIGRlZmluaXRpb24gb2YgdGhlIGZpcnN0IGZpZWxkXG4gICAgICBzd2l0Y2hNYXAoZmtDbGFzcyA9PiB0aGlzLmMucGlwZUJhc2ljQW5kU3BlY2lmaWNGaWVsZHMoZmtDbGFzcykucGlwZShcbiAgICAgICAgLy8gZ2V0IHRoZSBmaXJzdCBpdGVtIG9mIHRoYXQgZmllbGRcbiAgICAgICAgc3dpdGNoTWFwKGZpZWxkRGVmID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICAgIGZpZWxkRGVmICYmIGZpZWxkRGVmLmxlbmd0aCA/XG4gICAgICAgICAgICBmaWVsZERlZlswXS5saXN0RGVmaW5pdGlvbnMubWFwKGxpc3REZWYgPT4gdGhpcy5waXBlRW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBma0VudGl0eSwgMSkpIDpcbiAgICAgICAgICAgIFtdXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAocHJvcHMgPT4ge1xuICAgICAgICAgICAgcHJvcHMgPSBwcm9wcy5maWx0ZXIocHJvcCA9PiBwcm9wLml0ZW1zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICBpZiAocHJvcHMubGVuZ3RoICYmIHByb3BzWzBdLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvcHNbMF0uaXRlbXNbMF0ubGFiZWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICAgIH0pXG4gICAgICAgICkpKVxuICAgICAgKSlcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBjbGFzcyBsYWJlbCBvZiBnaXZlbiBlbnRpdHlcbiAgICovXG4gIEBzcHlUYWcgcGlwZUNsYXNzTGFiZWxPZkVudGl0eShma0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5iLnBpcGVDbGFzc09mRW50aXR5KGZrRW50aXR5KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrQ2xhc3MgPT4gdGhpcy5jLnBpcGVDbGFzc0xhYmVsKHBrQ2xhc3MpKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgcGtfZW50aXR5IG9mIHRoZSB0eXBlIG9mIGFuIGVudGl0eVxuICAgKi9cbiAgQHNweVRhZyBwaXBlVHlwZU9mRW50aXR5KHBrRW50aXR5OiBudW1iZXIsIGhhc1R5cGVQcm9wZXJ0eTogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnQ+IHtcbiAgICBpZiAoaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoeyBma19wcm9wZXJ0eTogaGFzVHlwZVByb3BlcnR5LCBma19zdWJqZWN0X2luZm86IHBrRW50aXR5IH0pLnBpcGUobWFwKGl0ZW1zID0+IHtcbiAgICAgICAgaWYgKCFpdGVtcyB8fCBPYmplY3Qua2V5cyhpdGVtcykubGVuZ3RoIDwgMSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgZWxzZSByZXR1cm4gdmFsdWVzKGl0ZW1zKVswXVxuICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKHsgZmtfcHJvcGVydHk6IGhhc1R5cGVQcm9wZXJ0eSwgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5IH0pLnBpcGUoXG4gICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgaWYgKCFpdGVtcyB8fCBPYmplY3Qua2V5cyhpdGVtcykubGVuZ3RoIDwgMSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICBlbHNlIHJldHVybiB2YWx1ZXMoaXRlbXMpWzBdXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzZXNBbmRUeXBlcyhlbmFibGVkSW46ICdlbnRpdGllcycgfCAnc291cmNlcycpIHtcbiAgICByZXR1cm4gdGhpcy5jLnBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzKGVuYWJsZWRJbikucGlwZShcbiAgICAgIHN3aXRjaE1hcChpdGVtcyA9PiB0aGlzLnBpcGVDbGFzc0FuZFR5cGVOb2RlcyhpdGVtcykpLFxuICAgIClcbiAgfVxuXG4gIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVDbGFzc2VzQW5kVHlwZXNPZkNsYXNzZXMoY2xhc3NlczogbnVtYmVyW10pIHtcbiAgICByZXR1cm4gdGhpcy5jLnBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzT2ZUeXBlZENsYXNzZXMoY2xhc3NlcykucGlwZShcbiAgICAgIHN3aXRjaE1hcChpdGVtcyA9PiB0aGlzLnBpcGVDbGFzc0FuZFR5cGVOb2RlcyhpdGVtcykpLFxuICAgIClcbiAgfVxuXG4gIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVDbGFzc0FuZFR5cGVOb2Rlcyh0eXBlQW5kVHlwZWRDbGFzc2VzOiB7IHR5cGVkQ2xhc3M6IG51bWJlcjsgdHlwZUNsYXNzOiBudW1iZXI7IH1bXSk6IE9ic2VydmFibGU8Q2xhc3NBbmRUeXBlTm9kZVtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgdHlwZUFuZFR5cGVkQ2xhc3Nlcy5tYXAoaXRlbSA9PiB0aGlzLmMucGlwZUNsYXNzTGFiZWwoaXRlbS50eXBlZENsYXNzKS5waXBlKFxuICAgICAgICBtYXAobGFiZWwgPT4gKHtcbiAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICBkYXRhOiB7IHBrQ2xhc3M6IGl0ZW0udHlwZWRDbGFzcywgcGtUeXBlOiBudWxsIH1cbiAgICAgICAgfSBhcyBDbGFzc0FuZFR5cGVOb2RlKSksXG4gICAgICAgIHN3aXRjaE1hcChub2RlID0+IGlpZihcbiAgICAgICAgICAoKSA9PiAhIWl0ZW0udHlwZUNsYXNzLFxuICAgICAgICAgIHRoaXMuYi5waXBlUGVyc2lzdGVudEl0ZW1Qa3NCeUNsYXNzKGl0ZW0udHlwZUNsYXNzKS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKHR5cGVQa3MgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgICAgICAgIHR5cGVQa3MubWFwKHBrVHlwZSA9PiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhwa1R5cGUpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKHByZXZpZXcgPT4gKHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBwcmV2aWV3LmVudGl0eV9sYWJlbCxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IHsgcGtDbGFzczogaXRlbS50eXBlZENsYXNzLCBwa1R5cGUgfVxuICAgICAgICAgICAgICAgIH0gYXMgQ2xhc3NBbmRUeXBlTm9kZSkpXG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgIHNvcnRBYmMobiA9PiBuLmxhYmVsKSxcbiAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgbWFwKGNoaWxkcmVuID0+IHtcbiAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuXG4gICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgb2YoeyAuLi5ub2RlLCBjaGlsZHJlbjogW10gfSBhcyBDbGFzc0FuZFR5cGVOb2RlKVxuICAgICAgICApXG4gICAgICAgIClcbiAgICAgICkpXG4gICAgKS5waXBlKFxuICAgICAgc29ydEFiYygobm9kZSkgPT4gbm9kZS5sYWJlbCksXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYXJyYXkgb2YgcGtfY2xhc3Mgb2YgYWxsIGNsYXNzZXMgYW5kIHR5cGVkIGNsYXNzZXMuXG4gICAqIEBwYXJhbSBjbGFzc2VzQW5kVHlwZXMgYSBvYmplY3QgY29udGFpbmluZyB7Y2xhc3NlczogW10sIHR5cGVzW119XG4gICAqL1xuICBwaXBlQ2xhc3Nlc0Zyb21DbGFzc2VzQW5kVHlwZXMoY2xhc3Nlc0FuZFR5cGVzOiBDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICBjb25zdCB0eXBlZENsYXNzZXMkID0gKCFjbGFzc2VzQW5kVHlwZXMgfHwgIWNsYXNzZXNBbmRUeXBlcy50eXBlcyB8fCAhY2xhc3Nlc0FuZFR5cGVzLnR5cGVzLmxlbmd0aCkgP1xuICAgICAgb2YoW10gYXMgbnVtYmVyW10pIDpcbiAgICAgIHRoaXMuYi5waXBlQ2xhc3Nlc09mUGVyc2lzdGVudEl0ZW1zKGNsYXNzZXNBbmRUeXBlcy50eXBlcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChwa3MpID0+ICEhcGtzKSxcbiAgICAgICAgICBzd2l0Y2hNYXAodHlwZUNsYXNzZXMgPT4gdGhpcy5jLnBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHR5cGVDbGFzc2VzKSlcbiAgICAgICAgKVxuICAgIHJldHVybiB0eXBlZENsYXNzZXMkLnBpcGUoXG4gICAgICBtYXAodHlwZWRDbGFzc2VzID0+IHVuaXEoWy4uLnR5cGVkQ2xhc3NlcywgLi4uKChjbGFzc2VzQW5kVHlwZXMgfHwgeyBjbGFzc2VzOiBbXSB9KS5jbGFzc2VzIHx8IFtdKV0pKVxuICAgICk7XG4gIH1cblxuICBwaXBlUHJvcGVydHlPcHRpb25zRnJvbUNsYXNzZXNBbmRUeXBlcyhjbGFzc2VzQW5kVHlwZXM6IENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsKTogT2JzZXJ2YWJsZTxQcm9wZXJ0eU9wdGlvbltdPiB7XG4gICAgcmV0dXJuIHRoaXMucGlwZUNsYXNzZXNGcm9tQ2xhc3Nlc0FuZFR5cGVzKGNsYXNzZXNBbmRUeXBlcykucGlwZShcbiAgICAgIHN3aXRjaE1hcChjbGFzc2VzID0+IHRoaXMucGlwZVByb3BlcnR5T3B0aW9uc0Zvcm1DbGFzc2VzKGNsYXNzZXMpKVxuICAgIClcbiAgfVxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlUHJvcGVydHlPcHRpb25zRm9ybUNsYXNzZXMoY2xhc3NlczogbnVtYmVyW10pOiBPYnNlcnZhYmxlPFByb3BlcnR5T3B0aW9uW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoY2xhc3Nlcy5tYXAocGtDbGFzcyA9PiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKS5waXBlKFxuICAgICAgbWFwKGMgPT4gYy5iYXNpY190eXBlID09PSA5KSxcbiAgICAgIHN3aXRjaE1hcChpc1RlRW4gPT4gdGhpcy5jLnBpcGVTcGVjaWZpY0FuZEJhc2ljRmllbGRzKHBrQ2xhc3MpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChjbGFzc0ZpZWxkcyA9PiBjbGFzc0ZpZWxkc1xuICAgICAgICAgICAgLmZpbHRlcihmID0+ICEhZi5wcm9wZXJ0eS5wa1Byb3BlcnR5KVxuICAgICAgICAgICAgLm1hcChmID0+ICh7XG4gICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGYuaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgZmtQcm9wZXJ0eURvbWFpbjogZi5pc091dGdvaW5nID8gZi5zb3VyY2VDbGFzcyA6IG51bGwsXG4gICAgICAgICAgICAgIGZrUHJvcGVydHlSYW5nZTogZi5pc091dGdvaW5nID8gbnVsbCA6IGYuc291cmNlQ2xhc3MsXG4gICAgICAgICAgICAgIHBrUHJvcGVydHk6IGYucHJvcGVydHkucGtQcm9wZXJ0eVxuICAgICAgICAgICAgfSkpKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoaXRlbXMgPT4ge1xuICAgICAgICAgICAgaWYgKGlzVGVFbikge1xuICAgICAgICAgICAgICAvLyBhZGQgdGltZSBwcm9wZXJ0aWVzIChhdCBzb21lIHRpbWUgd2l0aGluLCAuLi4pXG4gICAgICAgICAgICAgIERmaENvbmZpZy5QUk9QRVJUWV9QS1NfV0hFUkVfVElNRV9QUklNSVRJVkVfSVNfUkFOR0UubWFwKHBrUHJvcGVydHkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgcGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgIGZrUHJvcGVydHlEb21haW46IHBrQ2xhc3MsXG4gICAgICAgICAgICAgICAgICBma1Byb3BlcnR5UmFuZ2U6IERmaENvbmZpZy5DTEFTU19QS19USU1FX1BSSU1JVElWRSxcbiAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoaXRlbXMubWFwKGl0ZW0gPT4gdGhpcy5jLnBpcGVGaWVsZExhYmVsKFxuICAgICAgICAgICAgICBpdGVtLnBrUHJvcGVydHksXG4gICAgICAgICAgICAgIGl0ZW0uZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgICAgICAgaXRlbS5ma1Byb3BlcnR5UmFuZ2UsXG4gICAgICAgICAgICApLnBpcGUobWFwKGxhYmVsID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNPdXRnb2luZyA9IGl0ZW0uaXNPdXRnb2luZztcbiAgICAgICAgICAgICAgY29uc3QgbzogUHJvcGVydHlPcHRpb24gPSB7XG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICBwazogaXRlbS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgIHByb3BlcnR5RmllbGRLZXk6IHByb3BlcnR5T3B0aW9uRmllbGRLZXkoaXRlbS5wa1Byb3BlcnR5LCBpc091dGdvaW5nKVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgIH0pKSkpO1xuICAgICAgICAgIH0pKSlcbiAgICApXG5cblxuICAgICkpLnBpcGUobWFwKHkgPT4gZmxhdHRlbjxQcm9wZXJ0eU9wdGlvbj4oeSkpKTtcbiAgfVxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlUGtDbGFzc2VzRnJvbVByb3BlcnR5U2VsZWN0TW9kZWwobW9kZWw6IFByb3BlcnR5U2VsZWN0TW9kZWwpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgW1xuICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwub3V0Z29pbmdQcm9wZXJ0aWVzLCB0cnVlKSxcbiAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLmluZ29pbmdQcm9wZXJ0aWVzLCBmYWxzZSksXG4gICAgICBdXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbb3V0LCBpbmddKSA9PiB1bmlxKFsuLi5vdXQsIC4uLmluZ10pKVxuICAgIClcbiAgfVxuXG4gIGdldFBrQ2xhc3Nlc0Zyb21Qcm9wZXJ0eVNlbGVjdE1vZGVsJChtb2RlbCQ6IE9ic2VydmFibGU8UHJvcGVydHlTZWxlY3RNb2RlbD4pOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIG1vZGVsJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKG1vZGVsID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBbXG4gICAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLm91dGdvaW5nUHJvcGVydGllcywgdHJ1ZSksXG4gICAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLmluZ29pbmdQcm9wZXJ0aWVzLCBmYWxzZSksXG4gICAgICAgIF1cbiAgICAgICkucGlwZShcbiAgICAgICAgbWFwKChbb3V0LCBpbmddKSA9PiB1bmlxKFsuLi5vdXQsIC4uLmluZ10pKVxuICAgICAgKSlcbiAgICApXG4gIH1cblxuXG5cbiAgZ2V0UHJvcGVydHlPcHRpb25zJChjbGFzc1R5cGVzJDogT2JzZXJ2YWJsZTxDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbD4pOiBPYnNlcnZhYmxlPFByb3BlcnR5T3B0aW9uW10+IHtcbiAgICByZXR1cm4gY2xhc3NUeXBlcyQucGlwZTxDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCwgUHJvcGVydHlPcHRpb25bXT4oXG4gICAgICAvLyBtYWtlIHN1cmUgb25seSBpdCBwYXNzZXMgb25seSBpZiBkYXRhIG9mIHRoZSBhcnJheUNsYXNzZXMgYXJlIGNoYW5nZWQgKG5vdCBjaGlsZHJlbilcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsPigoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gZXF1YWxzKGEsIGIpO1xuICAgICAgfSksXG4gICAgICBzd2l0Y2hNYXAoKHgpID0+ICF4ID8gZW1wdHkoKSA6IHRoaXMuYi5waXBlQ2xhc3Nlc09mUGVyc2lzdGVudEl0ZW1zKHgudHlwZXMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigocGtzKSA9PiAhIXBrcyksXG4gICAgICAgICAgc3dpdGNoTWFwKHR5cGVDbGFzc2VzID0+IHRoaXMuYy5waXBlVHlwZWRDbGFzc2VzT2ZUeXBlQ2xhc3Nlcyh0eXBlQ2xhc3NlcykucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCh0eXBlZENsYXNzZXMgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gdW5pcShbLi4udHlwZWRDbGFzc2VzLCAuLi4oeC5jbGFzc2VzIHx8IFtdKV0pO1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlUHJvcGVydHlPcHRpb25zRm9ybUNsYXNzZXMoY2xhc3NlcylcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvcGVydHlPcHRpb25GaWVsZEtleShma1Byb3BlcnR5OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBzdHJpbmcge1xuICByZXR1cm4gJ18nICsgZmtQcm9wZXJ0eSArICdfJyArIChpc091dGdvaW5nID8gJ291dGdvaW5nJyA6ICdpbmdvaW5nJyk7XG59XG5cbiJdfQ==