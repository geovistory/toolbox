/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/services/information-pipes.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
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
import * as i0 from "@angular/core";
import * as i1 from "./information-basic-pipes.service";
import * as i2 from "./active-project-pipes.service";
import * as i3 from "./schema-selectors.service";
import * as i4 from "./configuration-pipes.service";
import * as i5 from "@kleiolab/lib-utils";
import * as i6 from "@angular-redux/store";
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
    // @spyTag
    /**
     * ******************************************************************
     * Pipe the project entities
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeListLength = /**
     * ******************************************************************
     * Pipe the project entities
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    // @spyTag
    /**
     * @param {?} l
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeList = 
    // @spyTag
    /**
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
    // @spyTag
    // @spyTag
    /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    InformationPipesService.prototype.pipeListBasicStatementItems = 
    // @spyTag
    /**
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
    // @spyTag
    /**
     * Pipe the items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeListAppellation = /**
     * Pipe the items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeListEntityPreview = /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    // @spyTag
    /**
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeListLanguage = 
    // @spyTag
    /**
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
    // @spyTag
    /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeListPlace = /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeListDimension = /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipe the items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeListLangString = /**
     * Pipe the items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
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
     * pipe the project relation of given statment, if the scope of this page is inProject
     * @param stmt InfStatement to be completed with projRel
     * @param page page for which we are piping this stuff
     */
    /**
     * pipe the project relation of given statment, if the scope of this page is inProject
     * @param {?} stmt InfStatement to be completed with projRel
     * @param {?} page page for which we are piping this stuff
     * @return {?}
     */
    InformationPipesService.prototype.pipeProjRelOfStatement = /**
     * pipe the project relation of given statment, if the scope of this page is inProject
     * @param {?} stmt InfStatement to be completed with projRel
     * @param {?} page page for which we are piping this stuff
     * @return {?}
     */
    function (stmt, page) {
        if (page.scope.inProject) {
            return this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$
                .key(page.scope.inProject + '_' + stmt.pk_entity).pipe(map((/**
             * @param {?} projRel
             * @return {?}
             */
            function (projRel) { return ({
                projRel: projRel,
                ordNum: page.isOutgoing ? projRel.ord_num_of_range : projRel.ord_num_of_domain
            }); })));
        }
    };
    /**
     * pipe the target of given statment
     * @param stmt InfStatement to be completed with target
     * @param page page for which we are piping this stuff
     * @param subfieldType type of subfield for which we pipe this stupp
     */
    /**
     * pipe the target of given statment
     * @param {?} stmt InfStatement to be completed with target
     * @param {?} page page for which we are piping this stuff
     * @param {?} subfieldType type of subfield for which we pipe this stupp
     * @return {?}
     */
    InformationPipesService.prototype.pipeTargetOfStatement = /**
     * pipe the target of given statment
     * @param {?} stmt InfStatement to be completed with target
     * @param {?} page page for which we are piping this stuff
     * @param {?} subfieldType type of subfield for which we pipe this stupp
     * @return {?}
     */
    function (stmt, page, subfieldType) {
        /** @type {?} */
        var isOutgoing = page.isOutgoing;
        /** @type {?} */
        var targetInfo = isOutgoing ? stmt.fk_object_info : stmt.fk_subject_info;
        // here you could add targetData or targetCell
        if (subfieldType.appellation) {
            return this.s.inf$.appellation$.by_pk_entity$.key(targetInfo).pipe(map((/**
             * @param {?} appellation
             * @return {?}
             */
            function (appellation) {
                /** @type {?} */
                var stmtTarget = {
                    statement: stmt,
                    isOutgoing: isOutgoing,
                    targetLabel: appellation.string,
                    targetClass: appellation.fk_class,
                    target: {
                        appellation: appellation
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.temporalEntity) {
            // pipe the subfields of the temporalEntity class
            // if the subfieldTypes of these are temporalEntity again, replace it with entityPreview
            // in order to prevent infinit cycle
            // for each of these subfields
            // - create page:GvSubfieldPage
            // - call this.pipeSubfieldPage(page, subfieldType)
        }
        throw new Error("No implementation found for subfieldType " + JSON.stringify(subfieldType));
    };
    /**
     * pipe target and projRel of the given statement
     */
    /**
     * pipe target and projRel of the given statement
     * @param {?} stmt
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    InformationPipesService.prototype.pipeStatementWithTarget = /**
     * pipe target and projRel of the given statement
     * @param {?} stmt
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    function (stmt, page, subfieldType) {
        return combineLatest(this.pipeTargetOfStatement(stmt, page, subfieldType), this.pipeProjRelOfStatement(stmt, page)).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), target = _b[0], projRel = _b[1];
            return (tslib_1.__assign({}, target, projRel));
        })));
    };
    /**
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    InformationPipesService.prototype.pipeSubfieldPage = /**
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    function (page, subfieldType) {
        var _this = this;
        // get the statments of that page
        return this.s.inf$.statement$.pagination$.pipePage(page)
            .pipe(switchMap((/**
         * @param {?} pkStmts
         * @return {?}
         */
        function (pkStmts) { return combineLatestOrEmpty(pkStmts.map((/**
         * @param {?} pkStmt
         * @return {?}
         */
        function (pkStmt) { return _this.s.inf$.statement$.by_pk_entity$.key(pkStmt)
            // for each statement, depending on the subfieldType, load the corresponding target
            .pipe(switchMap((/**
         * @param {?} stmt
         * @return {?}
         */
        function (stmt) { return _this.pipeStatementWithTarget(stmt, page, subfieldType); }))); }))); })));
    };
    // pipeStatementListPage(
    //   paginateBy: PaginateByParam[],
    //   limit: number,
    //   offset: number,
    //   pkProject: number,
    //   listDefinition: Subfield,
    //   alternative = false): Observable<EntityPreviewItem[]> {
    //   // prepare page loader
    //   const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
    //   // prepare basic statement item loader
    //   const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
    //     return alternative ?
    //       this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
    //       this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    //   }
    //   const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)
    //   return paginatedStatementPks$.pipe(
    //     switchMap((paginatedStatementPks) => combineLatestOrEmpty(
    //       paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
    //         .pipe(
    //           filter(x => !!x),
    //           switchMap(x => this.p.streamEntityPreview(x.isOutgoing ? x.statement.fk_object_info : x.statement.fk_subject_info)
    //             .pipe(
    //               map((preview) => {
    //                 const item: EntityPreviewItem = {
    //                   ...x,
    //                   preview,
    //                   fkClass: preview.fk_class
    //                 }
    //                 return item;
    //               })
    //             )
    //           ))
    //       )
    //     )
    //     ))
    // }
    /**
     * Pipe the temporal entities connected to given entity by statements that are in the current project
     */
    // @spyTag
    // pipeTemporalEntityTableRows(
    //   paginateBy: PaginateByParam[],
    //   limit: number,
    //   offset: number,
    //   pkProject: number,
    //   listDefinition: Subfield,
    //   fieldDefinitions: Field[],
    //   alternative = false): Observable<TemporalEntityItem[]> {
    //   // const propertyItemType = this.propertyItemType(fieldDefinitions)
    //   const targetEntityOfStatementItem = (r: BasicStatementItem) => r.isOutgoing ? r.statement.fk_object_info : r.statement.fk_subject_info;
    //   // prepare page loader
    //   const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
    //   // prepare basic statement item loader
    //   const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
    //     return alternative ?
    //       this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
    //       this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    //   }
    //   // prepare TeEnRow loader
    //   const rowLoader = (targetEntityPk, fieldDef, pkProj) => {
    //     return alternative ?
    //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, null, true) :
    //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, pkProj, false)
    //   }
    //   const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)
    //   const rows$ = paginatedStatementPks$.pipe(
    //     switchMap((paginatedStatementPks) => combineLatestOrEmpty(
    //       paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
    //         .pipe(filter(x => !!x))
    //       )
    //     )
    //       .pipe(
    //         switchMap((teEnStatement) => combineLatestOrEmpty(
    //           teEnStatement.map((basicStatementItem) => {
    //             const pkTeEn = targetEntityOfStatementItem(basicStatementItem);
    //             return combineLatest(
    //               rowLoader(
    //                 pkTeEn,
    //                 fieldDefinitions,
    //                 // propertyItemType,
    //                 pkProject
    //               ),
    //               this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + pkTeEn)
    //             ).pipe(
    //               map(([row, teEnProjRel]) => {
    //                 const item: TemporalEntityItem = {
    //                   ...basicStatementItem,
    //                   row,
    //                   pkEntity: pkTeEn,
    //                   teEnProjRel
    //                 };
    //                 return item
    //               })
    //             )
    //           })
    //         )),
    //       )),
    //   )
    //   return rows$
    // }
    // @spyTag
    // pipeStatementListPage(
    //   paginateBy: PaginateByParam[],
    //   limit: number,
    //   offset: number,
    //   pkProject: number,
    //   listDefinition: Subfield,
    //   alternative = false): Observable<EntityPreviewItem[]> {
    //   // prepare page loader
    //   const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
    //   // prepare basic statement item loader
    //   const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
    //     return alternative ?
    //       this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
    //       this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    //   }
    //   const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)
    //   return paginatedStatementPks$.pipe(
    //     switchMap((paginatedStatementPks) => combineLatestOrEmpty(
    //       paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
    //         .pipe(
    //           filter(x => !!x),
    //           switchMap(x => this.p.streamEntityPreview(x.isOutgoing ? x.statement.fk_object_info : x.statement.fk_subject_info)
    //             .pipe(
    //               map((preview) => {
    //                 const item: EntityPreviewItem = {
    //                   ...x,
    //                   preview,
    //                   fkClass: preview.fk_class
    //                 }
    //                 return item;
    //               })
    //             )
    //           ))
    //       )
    //     )
    //     ))
    // }
    /**
     * Pipe the temporal entities connected to given entity by statements that are in the current project
     * @param {?} pkEntity
     * @param {?} fieldDefinitions
     * @param {?} pkProject
     * @param {?} repo
     * @return {?}
     */
    // @spyTag
    // pipeTemporalEntityTableRows(
    //   paginateBy: PaginateByParam[],
    //   limit: number,
    //   offset: number,
    //   pkProject: number,
    //   listDefinition: Subfield,
    //   fieldDefinitions: Field[],
    //   alternative = false): Observable<TemporalEntityItem[]> {
    //   // const propertyItemType = this.propertyItemType(fieldDefinitions)
    //   const targetEntityOfStatementItem = (r: BasicStatementItem) => r.isOutgoing ? r.statement.fk_object_info : r.statement.fk_subject_info;
    //   // prepare page loader
    //   const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
    //   // prepare basic statement item loader
    //   const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
    //     return alternative ?
    //       this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
    //       this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    //   }
    //   // prepare TeEnRow loader
    //   const rowLoader = (targetEntityPk, fieldDef, pkProj) => {
    //     return alternative ?
    //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, null, true) :
    //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, pkProj, false)
    //   }
    //   const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)
    //   const rows$ = paginatedStatementPks$.pipe(
    //     switchMap((paginatedStatementPks) => combineLatestOrEmpty(
    //       paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
    //         .pipe(filter(x => !!x))
    //       )
    //     )
    //       .pipe(
    //         switchMap((teEnStatement) => combineLatestOrEmpty(
    //           teEnStatement.map((basicStatementItem) => {
    //             const pkTeEn = targetEntityOfStatementItem(basicStatementItem);
    //             return combineLatest(
    //               rowLoader(
    //                 pkTeEn,
    //                 fieldDefinitions,
    //                 // propertyItemType,
    //                 pkProject
    //               ),
    //               this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + pkTeEn)
    //             ).pipe(
    //               map(([row, teEnProjRel]) => {
    //                 const item: TemporalEntityItem = {
    //                   ...basicStatementItem,
    //                   row,
    //                   pkEntity: pkTeEn,
    //                   teEnProjRel
    //                 };
    //                 return item
    //               })
    //             )
    //           })
    //         )),
    //       )),
    //   )
    //   return rows$
    // }
    // @spyTag
    InformationPipesService.prototype.pipeItemTeEnRow = 
    // pipeStatementListPage(
    //   paginateBy: PaginateByParam[],
    //   limit: number,
    //   offset: number,
    //   pkProject: number,
    //   listDefinition: Subfield,
    //   alternative = false): Observable<EntityPreviewItem[]> {
    //   // prepare page loader
    //   const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
    //   // prepare basic statement item loader
    //   const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
    //     return alternative ?
    //       this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
    //       this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    //   }
    //   const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)
    //   return paginatedStatementPks$.pipe(
    //     switchMap((paginatedStatementPks) => combineLatestOrEmpty(
    //       paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
    //         .pipe(
    //           filter(x => !!x),
    //           switchMap(x => this.p.streamEntityPreview(x.isOutgoing ? x.statement.fk_object_info : x.statement.fk_subject_info)
    //             .pipe(
    //               map((preview) => {
    //                 const item: EntityPreviewItem = {
    //                   ...x,
    //                   preview,
    //                   fkClass: preview.fk_class
    //                 }
    //                 return item;
    //               })
    //             )
    //           ))
    //       )
    //     )
    //     ))
    // }
    /**
     * Pipe the temporal entities connected to given entity by statements that are in the current project
     * @param {?} pkEntity
     * @param {?} fieldDefinitions
     * @param {?} pkProject
     * @param {?} repo
     * @return {?}
     */
    // @spyTag
    // pipeTemporalEntityTableRows(
    //   paginateBy: PaginateByParam[],
    //   limit: number,
    //   offset: number,
    //   pkProject: number,
    //   listDefinition: Subfield,
    //   fieldDefinitions: Field[],
    //   alternative = false): Observable<TemporalEntityItem[]> {
    //   // const propertyItemType = this.propertyItemType(fieldDefinitions)
    //   const targetEntityOfStatementItem = (r: BasicStatementItem) => r.isOutgoing ? r.statement.fk_object_info : r.statement.fk_subject_info;
    //   // prepare page loader
    //   const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
    //   // prepare basic statement item loader
    //   const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
    //     return alternative ?
    //       this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
    //       this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    //   }
    //   // prepare TeEnRow loader
    //   const rowLoader = (targetEntityPk, fieldDef, pkProj) => {
    //     return alternative ?
    //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, null, true) :
    //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, pkProj, false)
    //   }
    //   const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)
    //   const rows$ = paginatedStatementPks$.pipe(
    //     switchMap((paginatedStatementPks) => combineLatestOrEmpty(
    //       paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
    //         .pipe(filter(x => !!x))
    //       )
    //     )
    //       .pipe(
    //         switchMap((teEnStatement) => combineLatestOrEmpty(
    //           teEnStatement.map((basicStatementItem) => {
    //             const pkTeEn = targetEntityOfStatementItem(basicStatementItem);
    //             return combineLatest(
    //               rowLoader(
    //                 pkTeEn,
    //                 fieldDefinitions,
    //                 // propertyItemType,
    //                 pkProject
    //               ),
    //               this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + pkTeEn)
    //             ).pipe(
    //               map(([row, teEnProjRel]) => {
    //                 const item: TemporalEntityItem = {
    //                   ...basicStatementItem,
    //                   row,
    //                   pkEntity: pkTeEn,
    //                   teEnProjRel
    //                 };
    //                 return item
    //               })
    //             )
    //           })
    //         )),
    //       )),
    //   )
    //   return rows$
    // }
    // @spyTag
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
    // @spyTag
    // @spyTag
    /**
     * @private
     * @param {?} r
     * @param {?} pkProject
     * @param {?} propIsOutgoing
     * @return {?}
     */
    InformationPipesService.prototype.pipeItem = 
    // @spyTag
    /**
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
            }
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} listDef
     * @param {?} fkEntity
     * @param {?=} limit
     * @return {?}
     */
    InformationPipesService.prototype.pipeEntityProperties = 
    // @spyTag
    /**
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
    // @spyTag
    // @spyTag
    /**
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeTemporalEntityRemoveProperties = 
    // @spyTag
    /**
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
    // @spyTag
    /**
     * Pipe time span item in version of project
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeItemTimeSpan = /**
     * Pipe time span item in version of project
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemAppellation = 
    // @spyTag
    /**
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
    // @spyTag
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemLanguage = 
    // @spyTag
    /**
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
    // @spyTag
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemPlace = 
    // @spyTag
    /**
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
    // @spyTag
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemDimension = 
    // @spyTag
    /**
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
    // @spyTag
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemLangString = 
    // @spyTag
    /**
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
    // @spyTag
    // @spyTag
    /**
     * @param {?} statement
     * @param {?} isOutgoing
     * @return {?}
     */
    InformationPipesService.prototype.pipeItemEntityPreview = 
    // @spyTag
    /**
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
    // @spyTag
    /**
     * @param {?} statement
     * @param {?} pkProject
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeItemTimePrimitive = /**
     * @param {?} statement
     * @param {?} pkProject
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * ******************************************************************
     * Pipe alternatives (not in project)
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListLength = /**
     * ******************************************************************
     * Pipe alternatives (not in project)
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    // @spyTag
    /**
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeAltList = 
    // @spyTag
    /**
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
    // @spyTag
    // @spyTag
    /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationPipesService.prototype.pipeAltListStatements = 
    // @spyTag
    /**
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
    // @spyTag
    /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListEntityPreview = /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipe the alternative items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListPlace = /**
     * Pipe the alternative items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipe the alternative items in dimension list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListDimension = /**
     * Pipe the alternative items in dimension list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipe the alternative items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListLangString = /**
     * Pipe the alternative items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipe the alternative items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListAppellation = /**
     * Pipe the alternative items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipe the alternative items in language field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeAltListLanguage = /**
     * Pipe the alternative items in language field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
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
    // @spyTag
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
    // @spyTag
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
    // @spyTag
    /**
     * Pipe language list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeRepoListLanguage = /**
     * Pipe language list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeRepoListPlace = /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeRepoListDimension = /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipe the items in entity preview field, connected by community favorite statements
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeRepoListEntityPreview = /**
     * Pipe the items in entity preview field, connected by community favorite statements
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipe repo time span item
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeRepoItemTimeSpan = /**
     * Pipe repo time span item
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipes the label of given entity
     * This will use entity previews for getting strings of related temporal entities
     * So this may take a little while
     * @param {?} fkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeLabelOfEntity = /**
     * Pipes the label of given entity
     * This will use entity previews for getting strings of related temporal entities
     * So this may take a little while
     * @param {?} fkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipes the class label of given entity
     * @param {?} fkEntity
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeClassLabelOfEntity = /**
     * Pipes the class label of given entity
     * @param {?} fkEntity
     * @return {?}
     */
    // @spyTag
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
    // @spyTag
    /**
     * Pipes the pk_entity of the type of an entity
     * @param {?} pkEntity
     * @param {?} hasTypeProperty
     * @param {?} isOutgoing
     * @return {?}
     */
    // @spyTag
    InformationPipesService.prototype.pipeTypeOfEntity = /**
     * Pipes the pk_entity of the type of an entity
     * @param {?} pkEntity
     * @param {?} hasTypeProperty
     * @param {?} isOutgoing
     * @return {?}
     */
    // @spyTag
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
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
    /** @nocollapse */ InformationPipesService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function InformationPipesService_Factory() { return new InformationPipesService(i0.ɵɵinject(i1.InformationBasicPipesService), i0.ɵɵinject(i2.ActiveProjectPipesService), i0.ɵɵinject(i3.SchemaSelectorsService), i0.ɵɵinject(i4.ConfigurationPipesService), i0.ɵɵinject(i5.TimePrimitivePipe), i0.ɵɵinject(i5.TimeSpanPipe), i0.ɵɵinject(i6.NgRedux)); }, token: InformationPipesService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy8iLCJzb3VyY2VzIjpbImxpYi9xdWVyaWVzL3NlcnZpY2VzL2luZm9ybWF0aW9uLXBpcGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBSWpELE9BQU8sRUFBZ0Isb0JBQW9CLEVBQWUsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuTCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDckUsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUEwQmhFLE9BQU8sRUFBZ0IsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckUs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UUFGQyxNQUFNO1FBQ04sS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7OytFQUsxQjtJQUlEO1FBRkMsTUFBTTtRQUNOLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7O2dEQUMrRCxVQUFVO3dFQWdDbkc7SUEwQkQ7UUFEQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OztnREFDd0IsVUFBVTtpRkE2QzVEO0lBR0Q7UUFEQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OztnREFDdUMsVUFBVTt1RkFTM0U7a0NBdDVDSDtDQTI3Q0MsQUF4NENELElBdzRDQztTQXgzQ1ksdUJBQXVCOzs7SUFFbEMsMENBQXFCOzs7OztJQUduQixvQ0FBdUM7Ozs7O0lBQ3ZDLG9DQUFvQzs7Ozs7SUFDcEMsb0NBQWlDOzs7OztJQUNqQyxvQ0FBb0M7O0lBQ3BDLG9EQUEyQzs7Ozs7SUFDM0MsK0NBQWtDOzs7Ozs7O0FBZzNDdEMsTUFBTSxVQUFVLHNCQUFzQixDQUFDLFVBQWtCLEVBQUUsVUFBbUI7SUFDNUUsT0FBTyxHQUFHLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGZoQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBJbmZTdGF0ZW1lbnQgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgR3ZTdWJmaWVsZFBhZ2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJUeXBlLCBjb21iaW5lTGF0ZXN0T3JFbXB0eSwgR3JhbnVsYXJpdHksIGxpbWl0VG8sIHNvcnRBYmMsIHN3aXRjaE1hcE9yLCBUaW1lUHJpbWl0aXZlLCBUaW1lUHJpbWl0aXZlUGlwZSwgVGltZVNwYW5QaXBlLCBUaW1lU3BhblV0aWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IGVxdWFscywgZmxhdHRlbiwgZ3JvdXBCeSwgcGljaywgdW5pcSwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBlbXB0eSwgaWlmLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFnIH0gZnJvbSAncnhqcy1zcHkvb3BlcmF0b3JzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhY2hlLCBzcHlUYWcgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IHRpbWVTcGFuSXRlbVRvVGltZVNwYW4gfSBmcm9tICcuLi9mdW5jdGlvbnMvZnVuY3Rpb25zJztcbmltcG9ydCB7IEFwcGVsbGF0aW9uSXRlbSB9IGZyb20gJy4uL21vZGVscy9BcHBlbGxhdGlvbkl0ZW0nO1xuaW1wb3J0IHsgQmFzaWNTdGF0ZW1lbnRJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0Jhc2ljU3RhdGVtZW50SXRlbSc7XG5pbXBvcnQgeyBDbGFzc0FuZFR5cGVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL0NsYXNzQW5kVHlwZU5vZGUnO1xuaW1wb3J0IHsgQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwnO1xuaW1wb3J0IHsgQ3RybFRpbWVTcGFuRGlhbG9nUmVzdWx0IH0gZnJvbSAnLi4vbW9kZWxzL0N0cmxUaW1lU3BhbkRpYWxvZ1Jlc3VsdCc7XG5pbXBvcnQgeyBEaW1lbnNpb25JdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0RpbWVuc2lvbkl0ZW0nO1xuaW1wb3J0IHsgRW50aXR5UHJldmlld0l0ZW0gfSBmcm9tICcuLi9tb2RlbHMvRW50aXR5UHJldmlld0l0ZW0nO1xuaW1wb3J0IHsgRW50aXR5UHJvcGVydGllcyB9IGZyb20gJy4uL21vZGVscy9FbnRpdHlQcm9wZXJ0aWVzJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL0ZpZWxkJztcbmltcG9ydCB7IEl0ZW1MaXN0IH0gZnJvbSAnLi4vbW9kZWxzL0l0ZW1MaXN0JztcbmltcG9ydCB7IExhbmdTdHJpbmdJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0xhbmdTdHJpbmdJdGVtJztcbmltcG9ydCB7IExhbmd1YWdlSXRlbSB9IGZyb20gJy4uL21vZGVscy9MYW5ndWFnZUl0ZW0nO1xuaW1wb3J0IHsgUGxhY2VJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1BsYWNlSXRlbSc7XG5pbXBvcnQgeyBQcm9wZXJ0eU9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9Qcm9wZXJ0eU9wdGlvbic7XG5pbXBvcnQgeyBQcm9wZXJ0eVNlbGVjdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL1Byb3BlcnR5U2VsZWN0TW9kZWwnO1xuaW1wb3J0IHsgU3RhdGVtZW50SXRlbSB9IGZyb20gJy4uL21vZGVscy9TdGF0ZW1lbnRJdGVtJztcbmltcG9ydCB7IFN0YXRlbWVudFByb2pSZWwsIFN0YXRlbWVudFRhcmdldCwgU3RhdGVtZW50V2l0aFRhcmdldCB9IGZyb20gJy4uL21vZGVscy9TdGF0ZW1lbnRXaXRoVGFyZ2V0JztcbmltcG9ydCB7IFN1YmZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL1N1YmZpZWxkJztcbmltcG9ydCB7IFN1YmZpZWxkVHlwZSB9IGZyb20gJy4uL21vZGVscy9TdWJmaWVsZFR5cGUnO1xuaW1wb3J0IHsgVGVtcG9yYWxFbnRpdHlDZWxsIH0gZnJvbSAnLi4vbW9kZWxzL1RlbXBvcmFsRW50aXR5Q2VsbCc7XG5pbXBvcnQgeyBUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMgfSBmcm9tICcuLi9tb2RlbHMvVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzJztcbmltcG9ydCB7IFRlbXBvcmFsRW50aXR5Um93IH0gZnJvbSAnLi4vbW9kZWxzL1RlbXBvcmFsRW50aXR5Um93JztcbmltcG9ydCB7IFRpbWVQcmltaXRpdmVJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1RpbWVQcmltaXRpdmVJdGVtJztcbmltcG9ydCB7IFRpbWVTcGFuSXRlbSB9IGZyb20gJy4uL21vZGVscy9UaW1lU3Bhbkl0ZW0nO1xuaW1wb3J0IHsgVGltZVNwYW5Qcm9wZXJ0eSB9IGZyb20gJy4uL21vZGVscy9UaW1lU3BhblByb3BlcnR5JztcbmltcG9ydCB7IEluZk1vZGVsTmFtZSwgSW5mU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvaW5mLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSB9IGZyb20gJy4vYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5mb3JtYXRpb25CYXNpY1BpcGVzU2VydmljZSB9IGZyb20gJy4vaW5mb3JtYXRpb24tYmFzaWMtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zY2hlbWEtc2VsZWN0b3JzLnNlcnZpY2UnO1xuXG5cblxuXG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbi8qKlxuICogVGhpcyBTZXJ2aWNlIHByb3ZpZGVzIGEgY29sbGVjaW9uIG9mIHBpcGVzIHRoYXQgYWdncmVnYXRlIG9yIHRyYW5zZm9ybSBpbmZvcm1hdGlvbi5cbiAqIEZvciBFeGFtcGxlXG4gKiAtIHRoZSBsaXN0cyBvZiB0ZXh0IHByb3BlcnRpZXMsIGFwcGVsbGFpdG9ucywgcGxhY2VzLCB0aW1lLXByaW1pdGl2ZXMgLyB0aW1lLXNwYW5zIGV0Yy5cbiAqIC0gdGhlIGxhYmVsIG9mIHRlbXBvcmFsIGVudGl0eSBvciBwZXJzaXN0ZW50IGl0ZW1cbiAqXG4gKiBUaGlzIG1haW5seSBzZWxlY3RzIGRhdGEgZnJvbSB0aGUgaW5mb3JtYXRpb24gc2NoZW1hIGFuZCB0aGUgcmVsYXRpb24gdG8gcHJvamVjdHMuXG4gKiBJdCBjb21iaW5lcyBwaXBlcyBzZWxlY3RpbmcgZGF0YSBmcm9tIHRoZVxuICogLSBhY3RpdmF0ZWQgcHJvamVjdFxuICogLSBhbHRlcm5hdGl2ZXMgKG5vdCBpbiBwcm9qZWN0IGJ1dCBpbiBvdGhlcnMpXG4gKiAtIHJlcG9cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZvcm1hdGlvblBpcGVzU2VydmljZSB7XG5cbiAgaW5mUmVwbzogSW5mU2VsZWN0b3I7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBiOiBJbmZvcm1hdGlvbkJhc2ljUGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcDogQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSxcbiAgICBwcml2YXRlIHM6IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjOiBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlLFxuICAgIHB1YmxpYyB0aW1lUHJpbWl0aXZlUGlwZTogVGltZVByaW1pdGl2ZVBpcGUsXG4gICAgcHJpdmF0ZSB0aW1lU3BhblBpcGU6IFRpbWVTcGFuUGlwZSxcbiAgICBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT5cbiAgKSB7XG4gICAgdGhpcy5pbmZSZXBvID0gbmV3IEluZlNlbGVjdG9yKG5nUmVkdXgsIG9mKCdyZXBvJykpXG4gIH1cblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogUGlwZSB0aGUgcHJvamVjdCBlbnRpdGllc1xuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RMZW5ndGgobDogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHN3aXRjaCAobC5saXN0VHlwZSkge1xuICAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAgICAgY2FzZSAnZW50aXR5LXByZXZpZXcnOlxuICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgY2FzZSAncGxhY2UnOlxuICAgICAgY2FzZSAnZGltZW5zaW9uJzpcbiAgICAgIGNhc2UgJ2xhbmdTdHJpbmcnOlxuICAgICAgY2FzZSAndGVtcG9yYWwtZW50aXR5JzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3QobCwgcGtFbnRpdHkpLnBpcGUobWFwKGl0ZW1zID0+IGl0ZW1zLmxlbmd0aCkpXG5cbiAgICAgIGNhc2UgJ3RpbWUtc3Bhbic6XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MiwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MSwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTAsIHBrRW50aXR5KSxcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUxLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MiwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTMsIHBrRW50aXR5KVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgdGFwKCh4KSA9PiB7XG5cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBtYXAoaXRlbXMgPT4gaXRlbXMuZmlsdGVyKHggPT4geC5sZW5ndGggPiAwKS5sZW5ndGgpKVxuXG4gICAgICAvLyBjYXNlICd0ZXh0LXByb3BlcnR5JzpcbiAgICAgIC8vICAgcmV0dXJuIHRoaXMucGlwZUxpc3RUZXh0UHJvcGVydHkobCwgcGtFbnRpdHkpLnBpcGUobWFwKGl0ZW1zID0+IGl0ZW1zLmxlbmd0aCkpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICAgICAgICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgICB9XG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0KGw6IFN1YmZpZWxkLCBwa0VudGl0eSwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEl0ZW1MaXN0PiB7XG4gICAgaWYgKGwubGlzdFR5cGUuYXBwZWxsYXRpb24pIHJldHVybiB0aGlzLnBpcGVMaXN0QXBwZWxsYXRpb24obCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZW50aXR5UHJldmlldykgcmV0dXJuIHRoaXMucGlwZUxpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmd1YWdlKSByZXR1cm4gdGhpcy5waXBlTGlzdExhbmd1YWdlKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnBsYWNlKSByZXR1cm4gdGhpcy5waXBlTGlzdFBsYWNlKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmRpbWVuc2lvbikgcmV0dXJuIHRoaXMucGlwZUxpc3REaW1lbnNpb24obCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ1N0cmluZykgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5nU3RyaW5nKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnRlbXBvcmFsRW50aXR5KSByZXR1cm4gdGhpcy5waXBlTGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUudGltZVNwYW4pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtVGltZVNwYW4ocGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIG1hcCgodHMpID0+IFt0c10uZmlsdGVyKGkgPT4gaS5wcm9wZXJ0aWVzLmxlbmd0aCA+IDApKVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdEJhc2ljU3RhdGVtZW50SXRlbXMobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBwa1Byb2plY3Q6IG51bWJlcik6IE9ic2VydmFibGU8QmFzaWNTdGF0ZW1lbnRJdGVtW10+IHtcbiAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ0Jhc2ljU3RhdGVtZW50SXRlbXNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5LCBwa1Byb2plY3QpIDpcbiAgICAgIHRoaXMuYi5waXBlSW5nb2luZ0Jhc2ljU3RhdGVtZW50SXRlbXNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5LCBwa1Byb2plY3QpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGl0ZW1zIGluIGFwcGVsbGF0aW9uIGZpZWxkXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gKiBQaXBlIHRoZSBpdGVtcyBpbiBlbnRpdHkgcHJldmlldyBmaWVsZFxuICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhZyhgYmVmb3JlLSR7cGtFbnRpdHl9LSR7bGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eX0tJHtsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzc31gKSxcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEub3JkTnVtID4gYi5vcmROdW0gPyAxIDogLTEpLFxuICAgICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pXG4gICAgICAgICAgICApXG4gICAgICAgIH0pLFxuICAgICAgICB0YWcoYGFmdGVyLSR7cGtFbnRpdHl9LSR7bGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eX0tJHtsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzc31gKSxcbiAgICAgIClcblxuICB9XG5cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgaXRlbXMgaW4gcGxhY2UgbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdFBsYWNlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbVBsYWNlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGl0ZW1zIGluIHBsYWNlIGxpc3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3REaW1lbnNpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICogUGlwZSB0aGUgaXRlbXMgaW4gbGFuZ1N0cmluZyBsaXN0XG4gKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdExhbmdTdHJpbmc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5nU3RyaW5nKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuXG4gIH1cblxuICAvKipcbiAgICogcGlwZSB0aGUgcHJvamVjdCByZWxhdGlvbiBvZiBnaXZlbiBzdGF0bWVudCwgaWYgdGhlIHNjb3BlIG9mIHRoaXMgcGFnZSBpcyBpblByb2plY3RcbiAgICogQHBhcmFtIHN0bXQgSW5mU3RhdGVtZW50IHRvIGJlIGNvbXBsZXRlZCB3aXRoIHByb2pSZWxcbiAgICogQHBhcmFtIHBhZ2UgcGFnZSBmb3Igd2hpY2ggd2UgYXJlIHBpcGluZyB0aGlzIHN0dWZmXG4gICAqL1xuICBwaXBlUHJvalJlbE9mU3RhdGVtZW50KHN0bXQ6IEluZlN0YXRlbWVudCwgcGFnZTogR3ZTdWJmaWVsZFBhZ2UpOiBPYnNlcnZhYmxlPFN0YXRlbWVudFByb2pSZWw+IHtcbiAgICBpZiAocGFnZS5zY29wZS5pblByb2plY3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkXG4gICAgICAgIC5rZXkocGFnZS5zY29wZS5pblByb2plY3QgKyAnXycgKyBzdG10LnBrX2VudGl0eSkucGlwZShcbiAgICAgICAgICBtYXAoXG4gICAgICAgICAgICBwcm9qUmVsID0+ICh7XG4gICAgICAgICAgICAgIHByb2pSZWwsXG4gICAgICAgICAgICAgIG9yZE51bTogcGFnZS5pc091dGdvaW5nID8gcHJvalJlbC5vcmRfbnVtX29mX3JhbmdlIDogcHJvalJlbC5vcmRfbnVtX29mX2RvbWFpblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIHBpcGUgdGhlIHRhcmdldCBvZiBnaXZlbiBzdGF0bWVudFxuICAgKiBAcGFyYW0gc3RtdCBJbmZTdGF0ZW1lbnQgdG8gYmUgY29tcGxldGVkIHdpdGggdGFyZ2V0XG4gICAqIEBwYXJhbSBwYWdlIHBhZ2UgZm9yIHdoaWNoIHdlIGFyZSBwaXBpbmcgdGhpcyBzdHVmZlxuICAgKiBAcGFyYW0gc3ViZmllbGRUeXBlIHR5cGUgb2Ygc3ViZmllbGQgZm9yIHdoaWNoIHdlIHBpcGUgdGhpcyBzdHVwcFxuICAgKi9cbiAgcGlwZVRhcmdldE9mU3RhdGVtZW50KHN0bXQ6IEluZlN0YXRlbWVudCwgcGFnZTogR3ZTdWJmaWVsZFBhZ2UsIHN1YmZpZWxkVHlwZTogU3ViZmllbGRUeXBlKTogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRUYXJnZXQ+IHtcbiAgICBjb25zdCBpc091dGdvaW5nID0gcGFnZS5pc091dGdvaW5nXG4gICAgY29uc3QgdGFyZ2V0SW5mbyA9IGlzT3V0Z29pbmcgPyBzdG10LmZrX29iamVjdF9pbmZvIDogc3RtdC5ma19zdWJqZWN0X2luZm87XG4gICAgLy8gaGVyZSB5b3UgY291bGQgYWRkIHRhcmdldERhdGEgb3IgdGFyZ2V0Q2VsbFxuXG4gICAgaWYgKHN1YmZpZWxkVHlwZS5hcHBlbGxhdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmFwcGVsbGF0aW9uJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICBtYXAoYXBwZWxsYXRpb24gPT4ge1xuICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICB0YXJnZXRMYWJlbDogYXBwZWxsYXRpb24uc3RyaW5nLFxuICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IGFwcGVsbGF0aW9uLmZrX2NsYXNzLFxuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgIGFwcGVsbGF0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eSkge1xuICAgICAgLy8gcGlwZSB0aGUgc3ViZmllbGRzIG9mIHRoZSB0ZW1wb3JhbEVudGl0eSBjbGFzc1xuICAgICAgLy8gaWYgdGhlIHN1YmZpZWxkVHlwZXMgb2YgdGhlc2UgYXJlIHRlbXBvcmFsRW50aXR5IGFnYWluLCByZXBsYWNlIGl0IHdpdGggZW50aXR5UHJldmlld1xuICAgICAgLy8gaW4gb3JkZXIgdG8gcHJldmVudCBpbmZpbml0IGN5Y2xlXG5cbiAgICAgIC8vIGZvciBlYWNoIG9mIHRoZXNlIHN1YmZpZWxkc1xuICAgICAgLy8gLSBjcmVhdGUgcGFnZTpHdlN1YmZpZWxkUGFnZVxuICAgICAgLy8gLSBjYWxsIHRoaXMucGlwZVN1YmZpZWxkUGFnZShwYWdlLCBzdWJmaWVsZFR5cGUpXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBpbXBsZW1lbnRhdGlvbiBmb3VuZCBmb3Igc3ViZmllbGRUeXBlICR7SlNPTi5zdHJpbmdpZnkoc3ViZmllbGRUeXBlKX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwaXBlIHRhcmdldCBhbmQgcHJvalJlbCBvZiB0aGUgZ2l2ZW4gc3RhdGVtZW50XG4gICAqL1xuICBwaXBlU3RhdGVtZW50V2l0aFRhcmdldChzdG10OiBJbmZTdGF0ZW1lbnQsIHBhZ2U6IEd2U3ViZmllbGRQYWdlLCBzdWJmaWVsZFR5cGU6IFN1YmZpZWxkVHlwZSk6IE9ic2VydmFibGU8U3RhdGVtZW50V2l0aFRhcmdldD4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlVGFyZ2V0T2ZTdGF0ZW1lbnQoc3RtdCwgcGFnZSwgc3ViZmllbGRUeXBlKSxcbiAgICAgIHRoaXMucGlwZVByb2pSZWxPZlN0YXRlbWVudChzdG10LCBwYWdlKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW3RhcmdldCwgcHJvalJlbF0pID0+ICh7IC4uLnRhcmdldCwgLi4ucHJvalJlbCB9KSlcbiAgICApXG4gIH1cblxuICBwaXBlU3ViZmllbGRQYWdlKHBhZ2U6IEd2U3ViZmllbGRQYWdlLCBzdWJmaWVsZFR5cGU6IFN1YmZpZWxkVHlwZSk6IE9ic2VydmFibGU8U3RhdGVtZW50V2l0aFRhcmdldFtdPiB7XG4gICAgLy8gZ2V0IHRoZSBzdGF0bWVudHMgb2YgdGhhdCBwYWdlXG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQucGlwZVBhZ2UocGFnZSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoXG4gICAgICAgICAgcGtTdG10cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgICAgIHBrU3RtdHMubWFwKHBrU3RtdCA9PiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3BrX2VudGl0eSQua2V5KHBrU3RtdClcbiAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggc3RhdGVtZW50LCBkZXBlbmRpbmcgb24gdGhlIHN1YmZpZWxkVHlwZSwgbG9hZCB0aGUgY29ycmVzcG9uZGluZyB0YXJnZXRcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKHN0bXQgPT4gdGhpcy5waXBlU3RhdGVtZW50V2l0aFRhcmdldChzdG10LCBwYWdlLCBzdWJmaWVsZFR5cGUpKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gIH1cblxuICAvLyBwaXBlU3RhdGVtZW50TGlzdFBhZ2UoXG4gIC8vICAgcGFnaW5hdGVCeTogUGFnaW5hdGVCeVBhcmFtW10sXG4gIC8vICAgbGltaXQ6IG51bWJlcixcbiAgLy8gICBvZmZzZXQ6IG51bWJlcixcbiAgLy8gICBwa1Byb2plY3Q6IG51bWJlcixcbiAgLy8gICBsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsXG4gIC8vICAgYWx0ZXJuYXRpdmUgPSBmYWxzZSk6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gIC8vICAgLy8gcHJlcGFyZSBwYWdlIGxvYWRlclxuICAvLyAgIGNvbnN0IHBhZ2VMb2FkZXIkID0gYWx0ZXJuYXRpdmUgPyB0aGlzLmluZlJlcG8uc3RhdGVtZW50JC5wYWdpbmF0aW9uJCA6IHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQ7XG5cbiAgLy8gICAvLyBwcmVwYXJlIGJhc2ljIHN0YXRlbWVudCBpdGVtIGxvYWRlclxuICAvLyAgIGNvbnN0IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlciA9IChwa1N0YXRlbWVudCwgaXNPdXRnb2luZywgcGtQcm9qKSA9PiB7XG4gIC8vICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAvLyAgICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1N0YXRlbWVudCwgaXNPdXRnb2luZykgOlxuICAvLyAgICAgICB0aGlzLmIucGlwZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtQcm9qLCBwa1N0YXRlbWVudCwgaXNPdXRnb2luZylcbiAgLy8gICB9XG5cbiAgLy8gICBjb25zdCBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkID0gcGFnZUxvYWRlciQucGlwZVBhZ2UocGFnaW5hdGVCeSwgbGltaXQsIG9mZnNldClcblxuICAvLyAgIHJldHVybiBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAoKHBhZ2luYXRlZFN0YXRlbWVudFBrcykgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gIC8vICAgICAgIHBhZ2luYXRlZFN0YXRlbWVudFBrcy5tYXAocGtTdGF0ZW1lbnQgPT4gYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyKHBrU3RhdGVtZW50LCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLCBwa1Byb2plY3QpXG4gIC8vICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAvLyAgICAgICAgICAgc3dpdGNoTWFwKHggPT4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoeC5pc091dGdvaW5nID8geC5zdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8gOiB4LnN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pXG4gIC8vICAgICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICAgIG1hcCgocHJldmlldykgPT4ge1xuICAvLyAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogRW50aXR5UHJldmlld0l0ZW0gPSB7XG4gIC8vICAgICAgICAgICAgICAgICAgIC4uLngsXG4gIC8vICAgICAgICAgICAgICAgICAgIHByZXZpZXcsXG4gIC8vICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IHByZXZpZXcuZmtfY2xhc3NcbiAgLy8gICAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAvLyAgICAgICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICAgIClcbiAgLy8gICAgICAgICAgICkpXG5cbiAgLy8gICAgICAgKVxuICAvLyAgICAgKVxuICAvLyAgICAgKSlcblxuICAvLyB9XG5cblxuICAvKipcbiAgICogUGlwZSB0aGUgdGVtcG9yYWwgZW50aXRpZXMgY29ubmVjdGVkIHRvIGdpdmVuIGVudGl0eSBieSBzdGF0ZW1lbnRzIHRoYXQgYXJlIGluIHRoZSBjdXJyZW50IHByb2plY3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgLy8gcGlwZVRlbXBvcmFsRW50aXR5VGFibGVSb3dzKFxuICAvLyAgIHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLFxuICAvLyAgIGxpbWl0OiBudW1iZXIsXG4gIC8vICAgb2Zmc2V0OiBudW1iZXIsXG4gIC8vICAgcGtQcm9qZWN0OiBudW1iZXIsXG4gIC8vICAgbGlzdERlZmluaXRpb246IFN1YmZpZWxkLFxuICAvLyAgIGZpZWxkRGVmaW5pdGlvbnM6IEZpZWxkW10sXG4gIC8vICAgYWx0ZXJuYXRpdmUgPSBmYWxzZSk6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlJdGVtW10+IHtcblxuICAvLyAgIC8vIGNvbnN0IHByb3BlcnR5SXRlbVR5cGUgPSB0aGlzLnByb3BlcnR5SXRlbVR5cGUoZmllbGREZWZpbml0aW9ucylcblxuICAvLyAgIGNvbnN0IHRhcmdldEVudGl0eU9mU3RhdGVtZW50SXRlbSA9IChyOiBCYXNpY1N0YXRlbWVudEl0ZW0pID0+IHIuaXNPdXRnb2luZyA/IHIuc3RhdGVtZW50LmZrX29iamVjdF9pbmZvIDogci5zdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvO1xuXG4gIC8vICAgLy8gcHJlcGFyZSBwYWdlIGxvYWRlclxuICAvLyAgIGNvbnN0IHBhZ2VMb2FkZXIkID0gYWx0ZXJuYXRpdmUgPyB0aGlzLmluZlJlcG8uc3RhdGVtZW50JC5wYWdpbmF0aW9uJCA6IHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQ7XG5cbiAgLy8gICAvLyBwcmVwYXJlIGJhc2ljIHN0YXRlbWVudCBpdGVtIGxvYWRlclxuICAvLyAgIGNvbnN0IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlciA9IChwa1N0YXRlbWVudCwgaXNPdXRnb2luZywgcGtQcm9qKSA9PiB7XG4gIC8vICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAvLyAgICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1N0YXRlbWVudCwgaXNPdXRnb2luZykgOlxuICAvLyAgICAgICB0aGlzLmIucGlwZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtQcm9qLCBwa1N0YXRlbWVudCwgaXNPdXRnb2luZylcbiAgLy8gICB9XG5cbiAgLy8gICAvLyBwcmVwYXJlIFRlRW5Sb3cgbG9hZGVyXG4gIC8vICAgY29uc3Qgcm93TG9hZGVyID0gKHRhcmdldEVudGl0eVBrLCBmaWVsZERlZiwgcGtQcm9qKSA9PiB7XG4gIC8vICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAvLyAgICAgICB0aGlzLnBpcGVJdGVtVGVFblJvdyh0YXJnZXRFbnRpdHlQaywgZmllbGREZWYsIG51bGwsIHRydWUpIDpcbiAgLy8gICAgICAgdGhpcy5waXBlSXRlbVRlRW5Sb3codGFyZ2V0RW50aXR5UGssIGZpZWxkRGVmLCBwa1Byb2osIGZhbHNlKVxuICAvLyAgIH1cblxuICAvLyAgIGNvbnN0IHBhZ2luYXRlZFN0YXRlbWVudFBrcyQgPSBwYWdlTG9hZGVyJC5waXBlUGFnZShwYWdpbmF0ZUJ5LCBsaW1pdCwgb2Zmc2V0KVxuXG4gIC8vICAgY29uc3Qgcm93cyQgPSBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAoKHBhZ2luYXRlZFN0YXRlbWVudFBrcykgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gIC8vICAgICAgIHBhZ2luYXRlZFN0YXRlbWVudFBrcy5tYXAocGtTdGF0ZW1lbnQgPT4gYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyKHBrU3RhdGVtZW50LCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLCBwa1Byb2plY3QpXG4gIC8vICAgICAgICAgLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgLy8gICAgICAgKVxuICAvLyAgICAgKVxuICAvLyAgICAgICAucGlwZShcbiAgLy8gICAgICAgICBzd2l0Y2hNYXAoKHRlRW5TdGF0ZW1lbnQpID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAvLyAgICAgICAgICAgdGVFblN0YXRlbWVudC5tYXAoKGJhc2ljU3RhdGVtZW50SXRlbSkgPT4ge1xuICAvLyAgICAgICAgICAgICBjb25zdCBwa1RlRW4gPSB0YXJnZXRFbnRpdHlPZlN0YXRlbWVudEl0ZW0oYmFzaWNTdGF0ZW1lbnRJdGVtKTtcbiAgLy8gICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gIC8vICAgICAgICAgICAgICAgcm93TG9hZGVyKFxuICAvLyAgICAgICAgICAgICAgICAgcGtUZUVuLFxuICAvLyAgICAgICAgICAgICAgICAgZmllbGREZWZpbml0aW9ucyxcbiAgLy8gICAgICAgICAgICAgICAgIC8vIHByb3BlcnR5SXRlbVR5cGUsXG4gIC8vICAgICAgICAgICAgICAgICBwa1Byb2plY3RcbiAgLy8gICAgICAgICAgICAgICApLFxuICAvLyAgICAgICAgICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHBrVGVFbilcbiAgLy8gICAgICAgICAgICAgKS5waXBlKFxuICAvLyAgICAgICAgICAgICAgIG1hcCgoW3JvdywgdGVFblByb2pSZWxdKSA9PiB7XG4gIC8vICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBUZW1wb3JhbEVudGl0eUl0ZW0gPSB7XG4gIC8vICAgICAgICAgICAgICAgICAgIC4uLmJhc2ljU3RhdGVtZW50SXRlbSxcbiAgLy8gICAgICAgICAgICAgICAgICAgcm93LFxuICAvLyAgICAgICAgICAgICAgICAgICBwa0VudGl0eTogcGtUZUVuLFxuICAvLyAgICAgICAgICAgICAgICAgICB0ZUVuUHJvalJlbFxuICAvLyAgICAgICAgICAgICAgICAgfTtcbiAgLy8gICAgICAgICAgICAgICAgIHJldHVybiBpdGVtXG4gIC8vICAgICAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICAgICAgKVxuICAvLyAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICApKSxcbiAgLy8gICAgICAgKSksXG5cbiAgLy8gICApXG4gIC8vICAgcmV0dXJuIHJvd3MkXG4gIC8vIH1cblxuXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVRlRW5Sb3cocGtFbnRpdHk6IG51bWJlciwgZmllbGREZWZpbml0aW9uczogRmllbGRbXSwgcGtQcm9qZWN0OiBudW1iZXIsIHJlcG86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFRlbXBvcmFsRW50aXR5Um93PiB7XG5cbiAgICAvLyBwaXBlIG91dGdvaW5nIHN0YXRlbWVudHNcbiAgICBjb25zdCBvdXRnb2luZ1N0YXRlbWVudHMkID0gcmVwbyA/IHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSkgOiB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk7XG4gICAgLy8gcGlwZSBpbmdvaW5nIHN0YXRlbWVudHNcbiAgICBjb25zdCBpbmdvaW5nU3RhdGVtZW50cyQgPSByZXBvID8gdGhpcy5iLnBpcGVSZXBvSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpIDogdGhpcy5iLnBpcGVJbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk7XG5cblxuICAgIC8vIHBpcGUgYWxsIHN0YXRlbWVudHMgd2l0aCBpbmZvcm1hdGlvbiBsZWFmIGl0ZW1zXG5cbiAgICBjb25zdCBvdXRnb2luZ0l0ZW1zJDogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRJdGVtW10+ID0gb3V0Z29pbmdTdGF0ZW1lbnRzJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIHN0YXRlbWVudHNcbiAgICAgICAgICAuZmlsdGVyKHN0YXRlbWVudCA9PiAhIXN0YXRlbWVudC5ma19vYmplY3RfaW5mbykgLy8gcmVtb3ZlIHN0YXRlbWVudHMgbm90IHBvaW50aW5nIHRvIGluZm9ybWF0aW9uXG4gICAgICAgICAgLm1hcChzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzT3V0Z29pbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW0ocywgcGtQcm9qZWN0LCBpc091dGdvaW5nKTtcbiAgICAgICAgICB9KVxuICAgICAgKSlcblxuICAgIClcbiAgICBjb25zdCBpbmdvaW5nSXRlbXMkOiBPYnNlcnZhYmxlPFN0YXRlbWVudEl0ZW1bXT4gPSBpbmdvaW5nU3RhdGVtZW50cyQucGlwZShcbiAgICAgIHN3aXRjaE1hcChzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBzdGF0ZW1lbnRzXG4gICAgICAgICAgLmZpbHRlcihzdGF0ZW1lbnQgPT4gISFzdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKSAvLyByZW1vdmUgc3RhdGVtZW50cyBub3QgcG9pbnRpbmcgdG8gaW5mb3JtYXRpb25cbiAgICAgICAgICAubWFwKHMgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNPdXRnb2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW0ocywgcGtQcm9qZWN0LCBpc091dGdvaW5nKTtcbiAgICAgICAgICB9KVxuICAgICAgKSlcblxuICAgIClcblxuICAgIGNvbnN0IHNvcnRJdGVtcyA9IHJlcG8gP1xuICAgICAgKGl0ZW06IFN0YXRlbWVudEl0ZW1bXSkgPT4gaXRlbS5zb3J0KChhLCBiKSA9PiBhLnN0YXRlbWVudC5pc19pbl9wcm9qZWN0X2NvdW50ID4gYi5zdGF0ZW1lbnQuaXNfaW5fcHJvamVjdF9jb3VudCA/IDEgOiAtMSkgOlxuICAgICAgKGl0ZW06IFN0YXRlbWVudEl0ZW1bXSkgPT4gaXRlbTtcblxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qob3V0Z29pbmdJdGVtcyQsIGluZ29pbmdJdGVtcyQpLnBpcGUoXG5cbiAgICAgIG1hcCgoW291dGdvaW5nSXRlbXMsIGluZ29pbmdJdGVtc10pID0+IHtcbiAgICAgICAgY29uc3QgZ3JvdXBlZE91dCA9IGdyb3VwQnkoKGkpID0+IChpICYmIGkuc3RhdGVtZW50ID8gaS5zdGF0ZW1lbnQuZmtfcHJvcGVydHkudG9TdHJpbmcoKSA6IHVuZGVmaW5lZCksIG91dGdvaW5nSXRlbXMpO1xuICAgICAgICBjb25zdCBncm91cGVkSW4gPSBncm91cEJ5KChpKSA9PiAoaSAmJiBpLnN0YXRlbWVudCA/IGkuc3RhdGVtZW50LmZrX3Byb3BlcnR5LnRvU3RyaW5nKCkgOiB1bmRlZmluZWQpLCBpbmdvaW5nSXRlbXMpO1xuICAgICAgICByZXR1cm4geyBncm91cGVkT3V0LCBncm91cGVkSW4gfVxuICAgICAgfSksXG4gICAgICAvLyBhdWRpdFRpbWUoMTApLFxuICAgICAgbWFwKChkKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdzogVGVtcG9yYWxFbnRpdHlSb3cgPSB7fVxuXG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbnMuZm9yRWFjaChmaWVsZERlZmluaXRpb24gPT4ge1xuXG4gICAgICAgICAgbGV0IGNlbGw6IFRlbXBvcmFsRW50aXR5Q2VsbDtcbiAgICAgICAgICBmaWVsZERlZmluaXRpb24ubGlzdERlZmluaXRpb25zLmZvckVhY2gobGlzdERlZmluaXRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKGxpc3REZWZpbml0aW9uLmxpc3RUeXBlLnRpbWVTcGFuKSB7XG5cbiAgICAgICAgICAgICAgY29uc3QgdCA9IHBpY2soWyc3MScsICc3MicsICcxNTAnLCAnMTUxJywgJzE1MicsICcxNTMnXSwgZC5ncm91cGVkT3V0KTtcbiAgICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHQpO1xuICAgICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ID0ga2V5cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgbGV0IGxhYmVsO1xuICAgICAgICAgICAgICBpZiAoaXRlbXNDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lU3BhbktleXM6IEN0cmxUaW1lU3BhbkRpYWxvZ1Jlc3VsdCA9IHt9XG4gICAgICAgICAgICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiB7IHRpbWVTcGFuS2V5c1trZXldID0gdFtrZXldWzBdLnRpbWVQcmltaXRpdmUgfSlcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lU3BhbiA9IFRpbWVTcGFuVXRpbC5mcm9tVGltZVNwYW5EaWFsb2dEYXRhKHRpbWVTcGFuS2V5cyk7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLnRpbWVTcGFuUGlwZS50cmFuc2Zvcm0odGltZVNwYW4pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZzogbGlzdERlZmluaXRpb24uaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICBpdGVtc0NvdW50LFxuICAgICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICAgIGVudGl0eVByZXZpZXc6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaXNUaW1lU3BhbjogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5ncm91cGVkT3V0W2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IHNvcnRJdGVtcyhkLmdyb3VwZWRPdXRbbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pXG4gICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgICAgICAgIGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zQ291bnQ6IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogKChmaXJzdEl0ZW0gfHwge30pIGFzIEVudGl0eVByZXZpZXdJdGVtKS5wcmV2aWV3LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmlyc3RJdGVtLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgICBmaXJzdEl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChkLmdyb3VwZWRJbltsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBzb3J0SXRlbXMoZC5ncm91cGVkSW5bbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pXG4gICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgICAgICAgIGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zQ291bnQ6IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogKChmaXJzdEl0ZW0gfHwge30pIGFzIEVudGl0eVByZXZpZXdJdGVtKS5wcmV2aWV3LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmlyc3RJdGVtLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgICBmaXJzdEl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9KVxuXG5cbiAgICAgICAgICByb3dbZmllbGREZWZpbml0aW9uLmxhYmVsXSA9IGNlbGw7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByb3dcbiAgICAgIH0pXG5cblxuICAgIClcbiAgfVxuXG5cblxuICAvLyBAc3B5VGFnXG4gIHByaXZhdGUgcGlwZUl0ZW0ocjogSW5mU3RhdGVtZW50LCBwa1Byb2plY3Q6IG51bWJlciwgcHJvcElzT3V0Z29pbmc6IGJvb2xlYW4pIHtcblxuICAgIGNvbnN0IHRhcmdldEVudGl0eSA9IHByb3BJc091dGdvaW5nID8gci5ma19vYmplY3RfaW5mbyA6IHIuZmtfc3ViamVjdF9pbmZvO1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5nZXRNb2RlbE9mRW50aXR5JCh0YXJnZXRFbnRpdHkpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAobSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsTmFtZTogSW5mTW9kZWxOYW1lID0gbSA/IG0ubW9kZWxOYW1lIDogdW5kZWZpbmVkO1xuICAgICAgICBzd2l0Y2ggKG1vZGVsTmFtZSkge1xuICAgICAgICAgIGNhc2UgJ2FwcGVsbGF0aW9uJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocik7XG4gICAgICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKTtcbiAgICAgICAgICBjYXNlICdwbGFjZSc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVBsYWNlKHIpO1xuICAgICAgICAgIGNhc2UgJ2RpbWVuc2lvbic6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKTtcbiAgICAgICAgICBjYXNlICdsYW5nX3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocik7XG4gICAgICAgICAgY2FzZSAndGltZV9wcmltaXRpdmUnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1UaW1lUHJpbWl0aXZlKHIsIHBrUHJvamVjdCk7IC8vIFRPRE86IGVtaXRzIHR3aWNlXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBwcm9wSXNPdXRnb2luZyk7XG4gICAgICAgIH1cblxuXG4gICAgICB9KVxuICAgIClcblxuXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUVudGl0eVByb3BlcnRpZXMobGlzdERlZjogU3ViZmllbGQsIGZrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxFbnRpdHlQcm9wZXJ0aWVzPiB7XG5cbiAgICBpZiAobGlzdERlZi5saXN0VHlwZS5hcHBlbGxhdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RBcHBlbGxhdGlvbihsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmxhbmd1YWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdExhbmd1YWdlKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUucGxhY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0UGxhY2UobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5kaW1lbnNpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0RGltZW5zaW9uKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUubGFuZ1N0cmluZykge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5nU3RyaW5nKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuXG5cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmVudGl0eVByZXZpZXcgfHwgbGlzdERlZi5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RFbnRpdHlQcmV2aWV3KGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUudGltZVNwYW4pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtVGltZVNwYW4oZmtFbnRpdHkpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGl0ZW1zID0gaXRlbS5wcm9wZXJ0aWVzLmZpbmQocCA9PiBwLml0ZW1zLmxlbmd0aCA+IDApID8gW3tcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVTcGFuUGlwZS50cmFuc2Zvcm0odGltZVNwYW5JdGVtVG9UaW1lU3BhbihpdGVtKSksXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSAvLyBUT0RPIGNoZWNrIGlmIHRoZSBwcm9wZXJ0aWVzIG9yIHRoZSBpdGVtIGFyZSByZWFsbHkgbm90IG5lZWRlZFxuICAgICAgICAgIH1dIDogW11cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGlzdERlZmluaXRpb246IGxpc3REZWYsXG4gICAgICAgICAgICBpdGVtc1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIG9mKG51bGwpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuaW5mJC50ZW1wb3JhbF9lbnRpdHkkLmJ5X3BrX2VudGl0eV9rZXkkKHBrRW50aXR5KSxcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdCQoeyBma19zdWJqZWN0X2luZm86IHBrRW50aXR5IH0pLFxuICAgICAgdGhpcy5zLmluZiQudGV4dF9wcm9wZXJ0eSQuYnlfZmtfY29uY2VybmVkX2VudGl0eV9pbmRleGVkJChwa0VudGl0eSlcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFt0ZW1wb3JhbEVudGl0eSwgc3RhdGVtZW50cywgdGV4dFByb3BlcnRpZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlczogVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzID0ge1xuICAgICAgICAgIHRlbXBvcmFsRW50aXR5LFxuICAgICAgICAgIHN0YXRlbWVudHM6IHN0YXRlbWVudHMsXG4gICAgICAgICAgdGV4dFByb3BlcnRpZXM6IHZhbHVlcyh0ZXh0UHJvcGVydGllcylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIGdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBpdGVtcyk6IEVudGl0eVByb3BlcnRpZXMge1xuICAgIHJldHVybiB7XG4gICAgICBsaXN0RGVmaW5pdGlvbixcbiAgICAgIGl0ZW1zLFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRpbWUgc3BhbiBpdGVtIGluIHZlcnNpb24gb2YgcHJvamVjdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVRpbWVTcGFuKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxUaW1lU3Bhbkl0ZW0+IHtcblxuICAgIHJldHVybiB0aGlzLnAucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmMucGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKFxuICAgICAgICAgIERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU5cbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChmaWVsZERlZnMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoZmllbGREZWZzLm1hcChmaWVsZERlZiA9PiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICAgICAgICAgIGZrX3Byb3BlcnR5OiBmaWVsZERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXBPcihbXSwgc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgICAgc3RhdGVtZW50cy5tYXAoc3RhdGVtZW50ID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHN0YXRlbWVudC5wa19lbnRpdHkpXG4gICAgICAgICAgICAgICAgICApLnBpcGUobWFwKChbaW5mVGltZVByaW1pdGl2ZSwgcHJvalJlbF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgICAgICAgICAgICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxlbmRhcjogKChwcm9qUmVsLmNhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgIHByb2pSZWwsXG4gICAgICAgICAgICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSksXG4gICAgICAgICAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlczogVGltZVNwYW5Qcm9wZXJ0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb246IGZpZWxkRGVmLmxpc3REZWZpbml0aW9uc1swXSwgaXRlbXNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKS5waXBlKFxuICAgICAgICAgICAgICBtYXAoKHByb3BlcnRpZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXMuZmlsdGVyKHAgPT4gcC5pdGVtcy5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lc3Bhbml0ZW06IFRpbWVTcGFuSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lc3Bhbml0ZW1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbUFwcGVsbGF0aW9uKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuYXBwZWxsYXRpb24kLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBtYXAoYXBwZWxsYXRpb24gPT4ge1xuICAgICAgICBpZiAoIWFwcGVsbGF0aW9uKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3Qgbm9kZTogQXBwZWxsYXRpb25JdGVtID0ge1xuICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgbGFiZWw6IGFwcGVsbGF0aW9uLnN0cmluZyxcbiAgICAgICAgICBma0NsYXNzOiBhcHBlbGxhdGlvbi5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1MYW5ndWFnZShzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgbWFwKGxhbmd1YWdlID0+IHtcbiAgICAgICAgaWYgKCFsYW5ndWFnZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG5vZGU6IExhbmd1YWdlSXRlbSA9IHtcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgIGxhYmVsOiBsYW5ndWFnZS5ub3RlcyxcbiAgICAgICAgICBma0NsYXNzOiBsYW5ndWFnZS5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1QbGFjZShzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8UGxhY2VJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnBsYWNlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgbWFwKHBsYWNlID0+IHtcbiAgICAgICAgaWYgKCFwbGFjZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG5vZGU6IFBsYWNlSXRlbSA9IHtcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgIGxhYmVsOiAnV0dTODQ6ICcgKyBwbGFjZS5sYXQgKyAnwrAsICcgKyBwbGFjZS5sb25nICsgJ8KwJyxcbiAgICAgICAgICBma0NsYXNzOiBwbGFjZS5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1EaW1lbnNpb24oc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuZGltZW5zaW9uJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgc3dpdGNoTWFwKChkaW1lbnNpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KGRpbWVuc2lvbi5ma19tZWFzdXJlbWVudF91bml0KVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKHByZXZpZXcgPT4ge1xuXG4gICAgICAgICAgICAgIGNvbnN0IG5vZGU6IERpbWVuc2lvbkl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICBsYWJlbDogYCR7ZGltZW5zaW9uLm51bWVyaWNfdmFsdWV9ICR7cHJldmlldy5lbnRpdHlfbGFiZWx9YCxcbiAgICAgICAgICAgICAgICBma0NsYXNzOiBkaW1lbnNpb24uZmtfY2xhc3MsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1MYW5nU3RyaW5nKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxMYW5nU3RyaW5nSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5nX3N0cmluZyQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKFxuICAgICAgICAobGFuZ1N0cmluZykgPT4ge1xuICAgICAgICAgIGlmICghbGFuZ1N0cmluZykgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3QobnVsbClcbiAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KGxhbmdTdHJpbmcuZmtfbGFuZ3VhZ2UpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKGxhbmd1YWdlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWxhbmd1YWdlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWwgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAobGFuZ1N0cmluZy5zdHJpbmcpIGxhYmVsID0gbGFuZ1N0cmluZy5zdHJpbmdcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsYW5nU3RyaW5nLnF1aWxsX2RvYyAmJiBsYW5nU3RyaW5nLnF1aWxsX2RvYy5vcHMgJiYgbGFuZ1N0cmluZy5xdWlsbF9kb2Mub3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgbGFiZWwgPSBsYW5nU3RyaW5nLnF1aWxsX2RvYy5vcHMubWFwKG9wID0+IG9wLmluc2VydCkuam9pbignJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGU6IExhbmdTdHJpbmdJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGxhbmdTdHJpbmcuZmtfY2xhc3MsXG4gICAgICAgICAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgIGZrTGFuZ3VhZ2U6IGxhbmdTdHJpbmcuZmtfbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHN0YXRlbWVudDogSW5mU3RhdGVtZW50LCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldygoaXNPdXRnb2luZyA/IHN0YXRlbWVudC5ma19vYmplY3RfaW5mbyA6IHN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pKS5waXBlKFxuICAgICAgLy8gZmlsdGVyKHByZXZpZXcgPT4gIXByZXZpZXcubG9hZGluZyAmJiAhIXByZXZpZXcgJiYgISFwcmV2aWV3LmVudGl0eV90eXBlKSxcbiAgICAgIG1hcChwcmV2aWV3ID0+IHtcbiAgICAgICAgaWYgKCFwcmV2aWV3KSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9kZTogRW50aXR5UHJldmlld0l0ZW0gPSB7XG4gICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICBwcmV2aWV3LFxuICAgICAgICAgIGxhYmVsOiBwcmV2aWV3LmVudGl0eV9sYWJlbCB8fCAnJyxcbiAgICAgICAgICBma0NsYXNzOiBwcmV2aWV3LmZrX2NsYXNzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwa1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVRpbWVQcmltaXRpdmUoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQsIHBrUHJvamVjdCk6IE9ic2VydmFibGU8VGltZVByaW1pdGl2ZUl0ZW0+IHtcbiAgICBpZiAocGtQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgdGhpcy5zLmluZiQudGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgc3RhdGVtZW50LnBrX2VudGl0eSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXAoKFtpbmZUaW1lUHJpbWl0aXZlLCBwcm9qUmVsXSkgPT4ge1xuICAgICAgICAgIGlmICghaW5mVGltZVByaW1pdGl2ZSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgY2FsZW5kYXI6ICgocHJvalJlbC5jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnN0IG5vZGU6IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9KSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW5mUmVwby50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLnBpcGUoXG4gICAgICAgIG1hcChpbmZUaW1lUHJpbWl0aXZlID0+IHtcbiAgICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICBjYWxlbmRhcjogKChzdGF0ZW1lbnQuY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc3Qgbm9kZTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICB9XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICogUGlwZSBhbHRlcm5hdGl2ZXMgKG5vdCBpbiBwcm9qZWN0KVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RMZW5ndGgobDogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHN3aXRjaCAobC5saXN0VHlwZSkge1xuICAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAgICAgY2FzZSAnZW50aXR5LXByZXZpZXcnOlxuICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgY2FzZSAncGxhY2UnOlxuICAgICAgY2FzZSAnbGFuZ1N0cmluZyc6XG4gICAgICBjYXNlICd0ZW1wb3JhbC1lbnRpdHknOlxuICAgICAgY2FzZSAndGltZS1zcGFuJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RTdGF0ZW1lbnRzKGwsIHBrRW50aXR5KS5waXBlKG1hcChpdGVtcyA9PiBpdGVtcy5sZW5ndGgpKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdChsOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEl0ZW1MaXN0PiB7XG4gICAgaWYgKGwubGlzdFR5cGUuYXBwZWxsYXRpb24pIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0QXBwZWxsYXRpb24obCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5lbnRpdHlQcmV2aWV3KSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5ndWFnZSkgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RMYW5ndWFnZShsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnBsYWNlKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdFBsYWNlKGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdERpbWVuc2lvbihsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmdTdHJpbmcpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0TGFuZ1N0cmluZyhsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnRlbXBvcmFsRW50aXR5KSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUluZ29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICogUGlwZSB0aGUgaXRlbXMgaW4gZW50aXR5IHByZXZpZXcgZmllbGRcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdEVudGl0eVByZXZpZXc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpIDpcbiAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpKSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlc1xuICAgICAgICAgICAgICAuZmlsdGVyKG5vZGUgPT4gISFub2RlKVxuICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5vcmROdW0gPiBiLm9yZE51bSA/IDEgOiAtMSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgfSkpXG5cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBwbGFjZSBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1QbGFjZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGRpbWVuc2lvbiBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0RGltZW5zaW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGxhbmdTdHJpbmcgbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdExhbmdTdHJpbmc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gYXBwZWxsYXRpb24gZmllbGRcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RBcHBlbGxhdGlvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGxhbmd1YWdlIGZpZWxkXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogUGlwZSByZXBvIHZpZXdzIChjb21tdW5pdHkgZmF2b3JpdGVzLCB3aGVyZSByZXN0cmljdGVkIGJ5IHF1YW50aWZpZXJzKVxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8qKlxuICAgKiBQaXBlIHJlcG9zaXRvcnkgdGVtcG9yYWwgZW50aXR5IGl0ZW0gaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIFBpcGUgYXBwZWxsYXRpb24gbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgbGFuZ3VhZ2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3RMYW5ndWFnZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgcGxhY2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1QbGFjZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgcGxhY2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3REaW1lbnNpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG4gIC8qKlxuICAqIFBpcGUgdGhlIGl0ZW1zIGluIGVudGl0eSBwcmV2aWV3IGZpZWxkLCBjb25uZWN0ZWQgYnkgY29tbXVuaXR5IGZhdm9yaXRlIHN0YXRlbWVudHNcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gICAgICB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gICAgICB0aGlzLmIucGlwZVJlcG9JbmdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSkpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICAgIC8vIC5zb3J0KChhLCBiKSA9PiBhLm9yZE51bSA+IGIub3JkTnVtID8gMSA6IC0xKVxuICAgICAgICAgICAgKSlcbiAgICAgIH0pLFxuICAgICAgc3RhcnRXaXRoKFtdKVxuICAgIClcblxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSByZXBvIHRpbWUgc3BhbiBpdGVtXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvSXRlbVRpbWVTcGFuKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxUaW1lU3Bhbkl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5wLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jLnBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKFxuICAgICAgICAgIERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU5cbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChmaWVsZERlZmluaXRpb25zID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoZmllbGREZWZpbml0aW9ucy5tYXAoZmllbGREZWYgPT5cbiAgICAgICAgICAgICAgdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShmaWVsZERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcE9yKFtdLCBzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PlxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mUmVwby50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKChpbmZUaW1lUHJpbWl0aXZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXI6ICgoc3RhdGVtZW50LmNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzOiBUaW1lU3BhblByb3BlcnR5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uOiBmaWVsZERlZi5saXN0RGVmaW5pdGlvbnNbMF0sIGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBzdGFydFdpdGgoeyBsaXN0RGVmaW5pdGlvbjogZmllbGREZWYubGlzdERlZmluaXRpb25zWzBdLCBpdGVtczogW10gfSBhcyBUaW1lU3BhblByb3BlcnR5KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgocHJvcGVydGllcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuaXRlbTogVGltZVNwYW5JdGVtID0ge1xuICAgICAgICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllcy5maWx0ZXIocHJvcHMgPT4gcHJvcHMuaXRlbXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVzcGFuaXRlbVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG5cbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgbGFiZWwgb2YgZ2l2ZW4gZW50aXR5XG4gICAqIFRoaXMgd2lsbCB1c2UgZW50aXR5IHByZXZpZXdzIGZvciBnZXR0aW5nIHN0cmluZ3Mgb2YgcmVsYXRlZCB0ZW1wb3JhbCBlbnRpdGllc1xuICAgKiBTbyB0aGlzIG1heSB0YWtlIGEgbGl0dGxlIHdoaWxlXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMYWJlbE9mRW50aXR5KGZrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmIucGlwZUNsYXNzT2ZFbnRpdHkoZmtFbnRpdHkpLnBpcGUoXG5cbiAgICAgIC8vIGdldCB0aGUgZGVmaW5pdGlvbiBvZiB0aGUgZmlyc3QgZmllbGRcbiAgICAgIHN3aXRjaE1hcChma0NsYXNzID0+IHRoaXMuYy5waXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhma0NsYXNzKS5waXBlKFxuICAgICAgICAvLyBnZXQgdGhlIGZpcnN0IGl0ZW0gb2YgdGhhdCBmaWVsZFxuICAgICAgICBzd2l0Y2hNYXAoZmllbGREZWYgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgICAgZmllbGREZWYgJiYgZmllbGREZWYubGVuZ3RoID9cbiAgICAgICAgICAgIGZpZWxkRGVmWzBdLmxpc3REZWZpbml0aW9ucy5tYXAobGlzdERlZiA9PiB0aGlzLnBpcGVFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGZrRW50aXR5LCAxKSkgOlxuICAgICAgICAgICAgW11cbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcChwcm9wcyA9PiB7XG4gICAgICAgICAgICBwcm9wcyA9IHByb3BzLmZpbHRlcihwcm9wID0+IHByb3AuaXRlbXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIGlmIChwcm9wcy5sZW5ndGggJiYgcHJvcHNbMF0uaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9wc1swXS5pdGVtc1swXS5sYWJlbFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICcnXG4gICAgICAgICAgfSlcbiAgICAgICAgKSkpXG4gICAgICApKVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIGNsYXNzIGxhYmVsIG9mIGdpdmVuIGVudGl0eVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQ2xhc3NMYWJlbE9mRW50aXR5KGZrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmIucGlwZUNsYXNzT2ZFbnRpdHkoZmtFbnRpdHkpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtDbGFzcyA9PiB0aGlzLmMucGlwZUNsYXNzTGFiZWwocGtDbGFzcykpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBwa19lbnRpdHkgb2YgdGhlIHR5cGUgb2YgYW4gZW50aXR5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVUeXBlT2ZFbnRpdHkocGtFbnRpdHk6IG51bWJlciwgaGFzVHlwZVByb3BlcnR5OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudD4ge1xuICAgIGlmIChpc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7IGZrX3Byb3BlcnR5OiBoYXNUeXBlUHJvcGVydHksIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHkgfSkucGlwZShtYXAoaXRlbXMgPT4ge1xuICAgICAgICBpZiAoIWl0ZW1zIHx8IE9iamVjdC5rZXlzKGl0ZW1zKS5sZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBlbHNlIHJldHVybiB2YWx1ZXMoaXRlbXMpWzBdXG4gICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoeyBma19wcm9wZXJ0eTogaGFzVHlwZVByb3BlcnR5LCBma19vYmplY3RfaW5mbzogcGtFbnRpdHkgfSkucGlwZShcbiAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICBpZiAoIWl0ZW1zIHx8IE9iamVjdC5rZXlzKGl0ZW1zKS5sZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlcyhpdGVtcylbMF1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlQ2xhc3Nlc0FuZFR5cGVzKGVuYWJsZWRJbjogJ2VudGl0aWVzJyB8ICdzb3VyY2VzJykge1xuICAgIHJldHVybiB0aGlzLmMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXMoZW5hYmxlZEluKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGl0ZW1zID0+IHRoaXMucGlwZUNsYXNzQW5kVHlwZU5vZGVzKGl0ZW1zKSksXG4gICAgKVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzZXNBbmRUeXBlc09mQ2xhc3NlcyhjbGFzc2VzOiBudW1iZXJbXSkge1xuICAgIHJldHVybiB0aGlzLmMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXNPZlR5cGVkQ2xhc3NlcyhjbGFzc2VzKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGl0ZW1zID0+IHRoaXMucGlwZUNsYXNzQW5kVHlwZU5vZGVzKGl0ZW1zKSksXG4gICAgKVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzQW5kVHlwZU5vZGVzKHR5cGVBbmRUeXBlZENsYXNzZXM6IHsgdHlwZWRDbGFzczogbnVtYmVyOyB0eXBlQ2xhc3M6IG51bWJlcjsgfVtdKTogT2JzZXJ2YWJsZTxDbGFzc0FuZFR5cGVOb2RlW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICB0eXBlQW5kVHlwZWRDbGFzc2VzLm1hcChpdGVtID0+IHRoaXMuYy5waXBlQ2xhc3NMYWJlbChpdGVtLnR5cGVkQ2xhc3MpLnBpcGUoXG4gICAgICAgIG1hcChsYWJlbCA9PiAoe1xuICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgIGRhdGE6IHsgcGtDbGFzczogaXRlbS50eXBlZENsYXNzLCBwa1R5cGU6IG51bGwgfVxuICAgICAgICB9IGFzIENsYXNzQW5kVHlwZU5vZGUpKSxcbiAgICAgICAgc3dpdGNoTWFwKG5vZGUgPT4gaWlmKFxuICAgICAgICAgICgpID0+ICEhaXRlbS50eXBlQ2xhc3MsXG4gICAgICAgICAgdGhpcy5iLnBpcGVQZXJzaXN0ZW50SXRlbVBrc0J5Q2xhc3MoaXRlbS50eXBlQ2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAodHlwZVBrcyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgICAgICAgdHlwZVBrcy5tYXAocGtUeXBlID0+IHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KHBrVHlwZSkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAocHJldmlldyA9PiAoe1xuICAgICAgICAgICAgICAgICAgbGFiZWw6IHByZXZpZXcuZW50aXR5X2xhYmVsLFxuICAgICAgICAgICAgICAgICAgZGF0YTogeyBwa0NsYXNzOiBpdGVtLnR5cGVkQ2xhc3MsIHBrVHlwZSB9XG4gICAgICAgICAgICAgICAgfSBhcyBDbGFzc0FuZFR5cGVOb2RlKSlcbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgc29ydEFiYyhuID0+IG4ubGFiZWwpLFxuICAgICAgICAgICAgKSksXG4gICAgICAgICAgICBtYXAoY2hpbGRyZW4gPT4ge1xuICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuID0gY2hpbGRyZW5cbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSxcbiAgICAgICAgICBvZih7IC4uLm5vZGUsIGNoaWxkcmVuOiBbXSB9IGFzIENsYXNzQW5kVHlwZU5vZGUpXG4gICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKSlcbiAgICApLnBpcGUoXG4gICAgICBzb3J0QWJjKChub2RlKSA9PiBub2RlLmxhYmVsKSxcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhcnJheSBvZiBwa19jbGFzcyBvZiBhbGwgY2xhc3NlcyBhbmQgdHlwZWQgY2xhc3Nlcy5cbiAgICogQHBhcmFtIGNsYXNzZXNBbmRUeXBlcyBhIG9iamVjdCBjb250YWluaW5nIHtjbGFzc2VzOiBbXSwgdHlwZXNbXX1cbiAgICovXG4gIHBpcGVDbGFzc2VzRnJvbUNsYXNzZXNBbmRUeXBlcyhjbGFzc2VzQW5kVHlwZXM6IENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIGNvbnN0IHR5cGVkQ2xhc3NlcyQgPSAoIWNsYXNzZXNBbmRUeXBlcyB8fCAhY2xhc3Nlc0FuZFR5cGVzLnR5cGVzIHx8ICFjbGFzc2VzQW5kVHlwZXMudHlwZXMubGVuZ3RoKSA/XG4gICAgICBvZihbXSBhcyBudW1iZXJbXSkgOlxuICAgICAgdGhpcy5iLnBpcGVDbGFzc2VzT2ZQZXJzaXN0ZW50SXRlbXMoY2xhc3Nlc0FuZFR5cGVzLnR5cGVzKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKHBrcykgPT4gISFwa3MpLFxuICAgICAgICAgIHN3aXRjaE1hcCh0eXBlQ2xhc3NlcyA9PiB0aGlzLmMucGlwZVR5cGVkQ2xhc3Nlc09mVHlwZUNsYXNzZXModHlwZUNsYXNzZXMpKVxuICAgICAgICApXG4gICAgcmV0dXJuIHR5cGVkQ2xhc3NlcyQucGlwZShcbiAgICAgIG1hcCh0eXBlZENsYXNzZXMgPT4gdW5pcShbLi4udHlwZWRDbGFzc2VzLCAuLi4oKGNsYXNzZXNBbmRUeXBlcyB8fCB7IGNsYXNzZXM6IFtdIH0pLmNsYXNzZXMgfHwgW10pXSkpXG4gICAgKTtcbiAgfVxuXG4gIHBpcGVQcm9wZXJ0eU9wdGlvbnNGcm9tQ2xhc3Nlc0FuZFR5cGVzKGNsYXNzZXNBbmRUeXBlczogQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwpOiBPYnNlcnZhYmxlPFByb3BlcnR5T3B0aW9uW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlQ2xhc3Nlc0Zyb21DbGFzc2VzQW5kVHlwZXMoY2xhc3Nlc0FuZFR5cGVzKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGNsYXNzZXMgPT4gdGhpcy5waXBlUHJvcGVydHlPcHRpb25zRm9ybUNsYXNzZXMoY2xhc3NlcykpXG4gICAgKVxuICB9XG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVQcm9wZXJ0eU9wdGlvbnNGb3JtQ2xhc3NlcyhjbGFzc2VzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8UHJvcGVydHlPcHRpb25bXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShjbGFzc2VzLm1hcChwa0NsYXNzID0+IHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLnBpcGUoXG4gICAgICBtYXAoYyA9PiBjLmJhc2ljX3R5cGUgPT09IDkpLFxuICAgICAgc3dpdGNoTWFwKGlzVGVFbiA9PiB0aGlzLmMucGlwZVNwZWNpZmljQW5kQmFzaWNGaWVsZHMocGtDbGFzcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGNsYXNzRmllbGRzID0+IGNsYXNzRmllbGRzXG4gICAgICAgICAgICAuZmlsdGVyKGYgPT4gISFmLnByb3BlcnR5LnBrUHJvcGVydHkpXG4gICAgICAgICAgICAubWFwKGYgPT4gKHtcbiAgICAgICAgICAgICAgaXNPdXRnb2luZzogZi5pc091dGdvaW5nLFxuICAgICAgICAgICAgICBma1Byb3BlcnR5RG9tYWluOiBmLmlzT3V0Z29pbmcgPyBmLnNvdXJjZUNsYXNzIDogbnVsbCxcbiAgICAgICAgICAgICAgZmtQcm9wZXJ0eVJhbmdlOiBmLmlzT3V0Z29pbmcgPyBudWxsIDogZi5zb3VyY2VDbGFzcyxcbiAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogZi5wcm9wZXJ0eS5wa1Byb3BlcnR5XG4gICAgICAgICAgICB9KSkpLFxuICAgICAgICAgIHN3aXRjaE1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICBpZiAoaXNUZUVuKSB7XG4gICAgICAgICAgICAgIC8vIGFkZCB0aW1lIHByb3BlcnRpZXMgKGF0IHNvbWUgdGltZSB3aXRoaW4sIC4uLilcbiAgICAgICAgICAgICAgRGZoQ29uZmlnLlBST1BFUlRZX1BLU19XSEVSRV9USU1FX1BSSU1JVElWRV9JU19SQU5HRS5tYXAocGtQcm9wZXJ0eSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgZmtQcm9wZXJ0eURvbWFpbjogcGtDbGFzcyxcbiAgICAgICAgICAgICAgICAgIGZrUHJvcGVydHlSYW5nZTogRGZoQ29uZmlnLkNMQVNTX1BLX1RJTUVfUFJJTUlUSVZFLFxuICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShpdGVtcy5tYXAoaXRlbSA9PiB0aGlzLmMucGlwZUZpZWxkTGFiZWwoXG4gICAgICAgICAgICAgIGl0ZW0ucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgaXRlbS5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICAgICAgICBpdGVtLmZrUHJvcGVydHlSYW5nZSxcbiAgICAgICAgICAgICkucGlwZShtYXAobGFiZWwgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc091dGdvaW5nID0gaXRlbS5pc091dGdvaW5nO1xuICAgICAgICAgICAgICBjb25zdCBvOiBQcm9wZXJ0eU9wdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICAgIHBrOiBpdGVtLnBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgcHJvcGVydHlGaWVsZEtleTogcHJvcGVydHlPcHRpb25GaWVsZEtleShpdGVtLnBrUHJvcGVydHksIGlzT3V0Z29pbmcpXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgfSkpKSk7XG4gICAgICAgICAgfSkpKVxuICAgIClcblxuXG4gICAgKSkucGlwZShtYXAoeSA9PiBmbGF0dGVuPFByb3BlcnR5T3B0aW9uPih5KSkpO1xuICB9XG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVQa0NsYXNzZXNGcm9tUHJvcGVydHlTZWxlY3RNb2RlbChtb2RlbDogUHJvcGVydHlTZWxlY3RNb2RlbCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICBbXG4gICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5vdXRnb2luZ1Byb3BlcnRpZXMsIHRydWUpLFxuICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwuaW5nb2luZ1Byb3BlcnRpZXMsIGZhbHNlKSxcbiAgICAgIF1cbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFtvdXQsIGluZ10pID0+IHVuaXEoWy4uLm91dCwgLi4uaW5nXSkpXG4gICAgKVxuICB9XG5cbiAgZ2V0UGtDbGFzc2VzRnJvbVByb3BlcnR5U2VsZWN0TW9kZWwkKG1vZGVsJDogT2JzZXJ2YWJsZTxQcm9wZXJ0eVNlbGVjdE1vZGVsPik6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gbW9kZWwkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAobW9kZWwgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIFtcbiAgICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwub3V0Z29pbmdQcm9wZXJ0aWVzLCB0cnVlKSxcbiAgICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwuaW5nb2luZ1Byb3BlcnRpZXMsIGZhbHNlKSxcbiAgICAgICAgXVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXAoKFtvdXQsIGluZ10pID0+IHVuaXEoWy4uLm91dCwgLi4uaW5nXSkpXG4gICAgICApKVxuICAgIClcbiAgfVxuXG5cblxuICBnZXRQcm9wZXJ0eU9wdGlvbnMkKGNsYXNzVHlwZXMkOiBPYnNlcnZhYmxlPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsPik6IE9ic2VydmFibGU8UHJvcGVydHlPcHRpb25bXT4ge1xuICAgIHJldHVybiBjbGFzc1R5cGVzJC5waXBlPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsLCBQcm9wZXJ0eU9wdGlvbltdPihcbiAgICAgIC8vIG1ha2Ugc3VyZSBvbmx5IGl0IHBhc3NlcyBvbmx5IGlmIGRhdGEgb2YgdGhlIGFycmF5Q2xhc3NlcyBhcmUgY2hhbmdlZCAobm90IGNoaWxkcmVuKVxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQ8Q2xhc3NBbmRUeXBlU2VsZWN0TW9kZWw+KChhLCBiKSA9PiB7XG4gICAgICAgIHJldHVybiBlcXVhbHMoYSwgYik7XG4gICAgICB9KSxcbiAgICAgIHN3aXRjaE1hcCgoeCkgPT4gIXggPyBlbXB0eSgpIDogdGhpcy5iLnBpcGVDbGFzc2VzT2ZQZXJzaXN0ZW50SXRlbXMoeC50eXBlcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChwa3MpID0+ICEhcGtzKSxcbiAgICAgICAgICBzd2l0Y2hNYXAodHlwZUNsYXNzZXMgPT4gdGhpcy5jLnBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHR5cGVDbGFzc2VzKS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKHR5cGVkQ2xhc3NlcyA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSB1bmlxKFsuLi50eXBlZENsYXNzZXMsIC4uLih4LmNsYXNzZXMgfHwgW10pXSk7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVQcm9wZXJ0eU9wdGlvbnNGb3JtQ2xhc3NlcyhjbGFzc2VzKVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eU9wdGlvbkZpZWxkS2V5KGZrUHJvcGVydHk6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IHN0cmluZyB7XG4gIHJldHVybiAnXycgKyBma1Byb3BlcnR5ICsgJ18nICsgKGlzT3V0Z29pbmcgPyAnb3V0Z29pbmcnIDogJ2luZ29pbmcnKTtcbn1cblxuIl19