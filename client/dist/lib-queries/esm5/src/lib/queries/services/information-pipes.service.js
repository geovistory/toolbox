/**
 * @fileoverview added by tsickle
 * Generated from: services/information-pipes.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbmZvcm1hdGlvbi1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlqRCxPQUFPLEVBQWdCLG9CQUFvQixFQUFlLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkwsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBMEJoRSxPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7OztBQVFwRTtJQW9CRSxpQ0FDVSxDQUErQixFQUMvQixDQUE0QixFQUM1QixDQUF5QixFQUN6QixDQUE0QixFQUM3QixpQkFBb0MsRUFDbkMsWUFBMEIsRUFDbEMsT0FBMkI7UUFObkIsTUFBQyxHQUFELENBQUMsQ0FBOEI7UUFDL0IsTUFBQyxHQUFELENBQUMsQ0FBMkI7UUFDNUIsTUFBQyxHQUFELENBQUMsQ0FBd0I7UUFDekIsTUFBQyxHQUFELENBQUMsQ0FBMkI7UUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUdsQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBR0Q7OzJFQUV1RTtJQUV2RSxVQUFVOzs7Ozs7Ozs7O0lBQ1YsZ0RBQWM7Ozs7Ozs7OztJQUFkLFVBQWUsQ0FBVyxFQUFFLFFBQWdCO1FBQzFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNsQixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLGdCQUFnQixDQUFDO1lBQ3RCLEtBQUssVUFBVSxDQUFDO1lBQ2hCLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxXQUFXLENBQUM7WUFDakIsS0FBSyxZQUFZLENBQUM7WUFDbEIsS0FBSyxpQkFBaUI7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7Z0JBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTSxFQUFaLENBQVksRUFBQyxDQUFDLENBQUE7WUFFcEUsS0FBSyxXQUFXO2dCQUNkLE9BQU8sYUFBYSxDQUNsQixJQUFJLENBQUMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsRUFDckQsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQ3JELElBQUksQ0FBQyxDQUFDLENBQUMsZ0NBQWdDLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUN0RCxJQUFJLENBQUMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsRUFDdEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQ3RELElBQUksQ0FBQyxDQUFDLENBQUMsZ0NBQWdDLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUN2RCxDQUFDLElBQUksQ0FDSixHQUFHOzs7O2dCQUFDLFVBQUMsQ0FBQztnQkFFTixDQUFDLEVBQUMsRUFDRixHQUFHOzs7O2dCQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE1BQU07Ozs7Z0JBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBWixDQUFZLEVBQUMsQ0FBQyxNQUFNLEVBQXRDLENBQXNDLEVBQUMsQ0FBQyxDQUFBO1lBRXpELHdCQUF3QjtZQUN4QixtRkFBbUY7WUFFbkY7Z0JBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO2dCQUNwQyxPQUFPLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELFVBQVU7Ozs7Ozs7O0lBQ1YsMENBQVE7Ozs7Ozs7O0lBQVIsVUFBUyxDQUFXLEVBQUUsUUFBUSxFQUFFLEtBQWM7UUFDNUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVc7WUFBRSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO2FBQzFFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhO1lBQUUsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTthQUNuRixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7YUFDekUsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTthQUNuRSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUztZQUFFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7YUFDM0UsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVU7WUFBRSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO2FBQzdFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjO1lBQUUsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTthQUNwRixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDekMsR0FBRzs7OztZQUFDLFVBQUMsRUFBRSxJQUFLLE9BQUEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQXZCLENBQXVCLEVBQUMsRUFBekMsQ0FBeUMsRUFBQyxDQUN2RCxDQUFBO1NBQ0Y7O1lBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFFRCxVQUFVOzs7Ozs7OztJQUNWLDZEQUEyQjs7Ozs7Ozs7SUFBM0IsVUFBNEIsY0FBd0IsRUFBRSxRQUFnQixFQUFFLFNBQWlCO1FBQ3ZGLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLENBQUMsQ0FBQyx5Q0FBeUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzRyxJQUFJLENBQUMsQ0FBQyxDQUFDLHdDQUF3QyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FDekcsQ0FBQTtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVU7Ozs7Ozs7Ozs7SUFDVixxREFBbUI7Ozs7Ozs7OztJQUFuQixVQUF1QixjQUF3QixFQUFFLFFBQWdCLEVBQUUsS0FBYztRQUFqRixpQkFVQztRQVRDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDO2FBQ3pELElBQUksQ0FDSCxTQUFTOzs7O1FBQUMsVUFBQyxVQUFVO1lBQ25CLE9BQU8sYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHOzs7OztZQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBM0IsQ0FBMkIsRUFBQyxDQUFDO2lCQUN4RSxJQUFJLENBQ0gsR0FBRzs7OztZQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE1BQU07Ozs7WUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxjQUFjLENBQUMsV0FBVyxFQUFyRCxDQUFxRCxFQUFDLEVBQTNFLENBQTJFLEVBQUMsRUFDekYsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUNkLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3BCLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDVCxDQUFDO0lBRUQ7O0tBRUM7SUFDRCxVQUFVOzs7Ozs7Ozs7O0lBQ1YsdURBQXFCOzs7Ozs7Ozs7SUFBckIsVUFBeUIsY0FBd0IsRUFBRSxRQUFnQixFQUFFLEtBQWM7UUFBbkYsaUJBa0JDO1FBaEJDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDO2FBQ3pELElBQUksQ0FDSCxHQUFHLENBQUMsWUFBVSxRQUFRLFNBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLFNBQUksY0FBYyxDQUFDLFdBQWEsQ0FBQyxFQUM3RixTQUFTOzs7O1FBQUMsVUFBQyxVQUFVO1lBQ25CLE9BQU8sYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHOzs7OztZQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUF4RCxDQUF3RCxFQUFDLENBQUM7aUJBQ3JHLElBQUksQ0FDSCxHQUFHOzs7O1lBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLGNBQWMsQ0FBQyxXQUFXLEVBQXJELENBQXFELEVBQUM7aUJBQ3JGLElBQUk7Ozs7O1lBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUE1QixDQUE0QixFQUFDLEVBRGxDLENBQ2tDLEdBQzdDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDZixFQUNELFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FDZCxDQUFBO1FBQ0wsQ0FBQyxFQUFDLEVBQ0YsR0FBRyxDQUFDLFdBQVMsUUFBUSxTQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxTQUFJLGNBQWMsQ0FBQyxXQUFhLENBQUMsQ0FDN0YsQ0FBQTtJQUVMLENBQUM7SUFHRCxVQUFVOzs7Ozs7Ozs7SUFDVixrREFBZ0I7Ozs7Ozs7OztJQUFoQixVQUFvQixjQUF3QixFQUFFLFFBQWdCLEVBQUUsS0FBYztRQUE5RSxpQkFXQztRQVRDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDO2FBQ3pELElBQUksQ0FDSCxTQUFTOzs7O1FBQUMsVUFBQyxVQUFVO1lBQ25CLE9BQU8sYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHOzs7OztZQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBeEIsQ0FBd0IsRUFBQyxDQUFDO2lCQUNyRSxJQUFJLENBQ0gsR0FBRzs7OztZQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE1BQU07Ozs7WUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxjQUFjLENBQUMsV0FBVyxFQUFyRCxDQUFxRCxFQUFDLEVBQTNFLENBQTJFLEVBQUMsRUFDekYsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUNkLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3BCLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDVCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVOzs7Ozs7Ozs7O0lBQ1YsK0NBQWE7Ozs7Ozs7OztJQUFiLFVBQWlCLGNBQXdCLEVBQUUsUUFBZ0IsRUFBRSxLQUFjO1FBQTNFLGlCQVdDO1FBVEMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUM7YUFDekQsSUFBSSxDQUNILFNBQVM7Ozs7UUFBQyxVQUFDLFVBQVU7WUFDbkIsT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUc7Ozs7O1lBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBckIsQ0FBcUIsRUFBQyxDQUFDO2lCQUNsRSxJQUFJLENBQ0gsR0FBRzs7OztZQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE1BQU07Ozs7WUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxjQUFjLENBQUMsV0FBVyxFQUFyRCxDQUFxRCxFQUFDLEVBQTNFLENBQTJFLEVBQUMsRUFDekYsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUNkLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3BCLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDVCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVOzs7Ozs7Ozs7O0lBQ1YsbURBQWlCOzs7Ozs7Ozs7SUFBakIsVUFBcUIsY0FBd0IsRUFBRSxRQUFnQixFQUFFLEtBQWM7UUFBL0UsaUJBV0M7UUFUQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQzthQUN6RCxJQUFJLENBQ0gsU0FBUzs7OztRQUFDLFVBQUMsVUFBVTtZQUNuQixPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRzs7Ozs7WUFBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQXpCLENBQXlCLEVBQUMsQ0FBQztpQkFDdEUsSUFBSSxDQUNILEdBQUc7Ozs7WUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssY0FBYyxDQUFDLFdBQVcsRUFBckQsQ0FBcUQsRUFBQyxFQUEzRSxDQUEyRSxFQUFDLEVBQ3pGLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFDZCxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNwQixDQUFDLEVBQUMsQ0FBQyxDQUFBO0lBQ1QsQ0FBQztJQUVEOztLQUVDO0lBQ0QsVUFBVTs7Ozs7Ozs7OztJQUNWLG9EQUFrQjs7Ozs7Ozs7O0lBQWxCLFVBQXNCLGNBQXdCLEVBQUUsUUFBZ0IsRUFBRSxLQUFjO1FBQWhGLGlCQVlDO1FBVkMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUM7YUFDekQsSUFBSSxDQUNILFNBQVM7Ozs7UUFBQyxVQUFDLFVBQVU7WUFDbkIsT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUc7Ozs7O1lBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxFQUExQixDQUEwQixFQUFDLENBQUM7aUJBQ3ZFLElBQUksQ0FDSCxHQUFHOzs7O1lBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLGNBQWMsQ0FBQyxXQUFXLEVBQXJELENBQXFELEVBQUMsRUFBM0UsQ0FBMkUsRUFBQyxFQUN6RixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQ2QsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxFQUFDLENBQUMsQ0FBQTtJQUVULENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsd0RBQXNCOzs7Ozs7SUFBdEIsVUFBdUIsSUFBa0IsRUFBRSxJQUFvQjtRQUM3RCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQ3hCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLHlCQUF5QjtpQkFDeEQsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUNwRCxHQUFHOzs7O1lBQ0QsVUFBQSxPQUFPLElBQUksT0FBQSxDQUFDO2dCQUNWLE9BQU8sU0FBQTtnQkFDUCxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCO2FBQy9FLENBQUMsRUFIUyxDQUdULEVBQ0gsQ0FDRixDQUFBO1NBQ0o7SUFDSCxDQUFDO0lBQ0Q7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gsdURBQXFCOzs7Ozs7O0lBQXJCLFVBQXNCLElBQWtCLEVBQUUsSUFBb0IsRUFBRSxZQUEwQjs7WUFDbEYsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVOztZQUM1QixVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZTtRQUMxRSw4Q0FBOEM7UUFFOUMsSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUNoRSxHQUFHOzs7O1lBQUMsVUFBQSxXQUFXOztvQkFDUCxVQUFVLEdBQW9CO29CQUNsQyxTQUFTLEVBQUUsSUFBSTtvQkFDZixVQUFVLFlBQUE7b0JBQ1YsV0FBVyxFQUFFLFdBQVcsQ0FBQyxNQUFNO29CQUMvQixXQUFXLEVBQUUsV0FBVyxDQUFDLFFBQVE7b0JBQ2pDLE1BQU0sRUFBRTt3QkFDTixXQUFXLGFBQUE7cUJBQ1o7aUJBQ0Y7Z0JBQ0QsT0FBTyxVQUFVLENBQUE7WUFDbkIsQ0FBQyxFQUFDLENBQ0gsQ0FBQTtTQUNGO2FBQ0ksSUFBSSxZQUFZLENBQUMsY0FBYyxFQUFFO1lBQ3BDLGlEQUFpRDtZQUNqRCx3RkFBd0Y7WUFDeEYsb0NBQW9DO1lBRXBDLDhCQUE4QjtZQUM5QiwrQkFBK0I7WUFDL0IsbURBQW1EO1NBQ3BEO1FBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBNEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUcsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRDs7T0FFRzs7Ozs7Ozs7SUFDSCx5REFBdUI7Ozs7Ozs7SUFBdkIsVUFBd0IsSUFBa0IsRUFBRSxJQUFvQixFQUFFLFlBQTBCO1FBQzFGLE9BQU8sYUFBYSxDQUNsQixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsRUFDcEQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FDeEMsQ0FBQyxJQUFJLENBQ0osR0FBRzs7OztRQUFDLFVBQUMsRUFBaUI7Z0JBQWpCLDBCQUFpQixFQUFoQixjQUFNLEVBQUUsZUFBTztZQUFNLE9BQUEsc0JBQU0sTUFBTSxFQUFLLE9BQU8sRUFBRztRQUEzQixDQUEyQixFQUFDLENBQ3hELENBQUE7SUFDSCxDQUFDOzs7Ozs7SUFFRCxrREFBZ0I7Ozs7O0lBQWhCLFVBQWlCLElBQW9CLEVBQUUsWUFBMEI7UUFBakUsaUJBZUM7UUFkQyxpQ0FBaUM7UUFDakMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDckQsSUFBSSxDQUNILFNBQVM7Ozs7UUFDUCxVQUFBLE9BQU8sSUFBSSxPQUFBLG9CQUFvQixDQUM3QixPQUFPLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsS0FBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1lBQ3BFLG1GQUFtRjthQUNsRixJQUFJLENBQ0gsU0FBUzs7OztRQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLEVBQXRELENBQXNELEVBQUMsQ0FDMUUsRUFKbUIsQ0FJbkIsRUFDRixDQUNGLEVBUFUsQ0FPVixFQUNGLENBQ0YsQ0FBQTtJQUNMLENBQUM7SUFFRCx5QkFBeUI7SUFDekIsbUNBQW1DO0lBQ25DLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsdUJBQXVCO0lBQ3ZCLDhCQUE4QjtJQUM5Qiw0REFBNEQ7SUFFNUQsMkJBQTJCO0lBQzNCLGdIQUFnSDtJQUVoSCwyQ0FBMkM7SUFDM0MsNEVBQTRFO0lBQzVFLDJCQUEyQjtJQUMzQix5RkFBeUY7SUFDekYsb0ZBQW9GO0lBQ3BGLE1BQU07SUFFTixtRkFBbUY7SUFFbkYsd0NBQXdDO0lBQ3hDLGlFQUFpRTtJQUNqRSw2SEFBNkg7SUFDN0gsaUJBQWlCO0lBQ2pCLDhCQUE4QjtJQUM5QiwrSEFBK0g7SUFDL0gscUJBQXFCO0lBQ3JCLG1DQUFtQztJQUNuQyxvREFBb0Q7SUFDcEQsMEJBQTBCO0lBQzFCLDZCQUE2QjtJQUM3Qiw4Q0FBOEM7SUFDOUMsb0JBQW9CO0lBQ3BCLCtCQUErQjtJQUMvQixtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFFZixVQUFVO0lBQ1YsUUFBUTtJQUNSLFNBQVM7SUFFVCxJQUFJO0lBR0o7O09BRUc7SUFDSCxVQUFVO0lBQ1YsK0JBQStCO0lBQy9CLG1DQUFtQztJQUNuQyxtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLHVCQUF1QjtJQUN2Qiw4QkFBOEI7SUFDOUIsK0JBQStCO0lBQy9CLDZEQUE2RDtJQUU3RCx3RUFBd0U7SUFFeEUsNElBQTRJO0lBRTVJLDJCQUEyQjtJQUMzQixnSEFBZ0g7SUFFaEgsMkNBQTJDO0lBQzNDLDRFQUE0RTtJQUM1RSwyQkFBMkI7SUFDM0IseUZBQXlGO0lBQ3pGLG9GQUFvRjtJQUNwRixNQUFNO0lBRU4sOEJBQThCO0lBQzlCLDhEQUE4RDtJQUM5RCwyQkFBMkI7SUFDM0IscUVBQXFFO0lBQ3JFLHNFQUFzRTtJQUN0RSxNQUFNO0lBRU4sbUZBQW1GO0lBRW5GLCtDQUErQztJQUMvQyxpRUFBaUU7SUFDakUsNkhBQTZIO0lBQzdILGtDQUFrQztJQUNsQyxVQUFVO0lBQ1YsUUFBUTtJQUNSLGVBQWU7SUFDZiw2REFBNkQ7SUFDN0Qsd0RBQXdEO0lBQ3hELDhFQUE4RTtJQUM5RSxvQ0FBb0M7SUFDcEMsMkJBQTJCO0lBQzNCLDBCQUEwQjtJQUMxQixvQ0FBb0M7SUFDcEMsdUNBQXVDO0lBQ3ZDLDRCQUE0QjtJQUM1QixtQkFBbUI7SUFDbkIsbUdBQW1HO0lBQ25HLHNCQUFzQjtJQUN0Qiw4Q0FBOEM7SUFDOUMscURBQXFEO0lBQ3JELDJDQUEyQztJQUMzQyx5QkFBeUI7SUFDekIsc0NBQXNDO0lBQ3RDLGdDQUFnQztJQUNoQyxxQkFBcUI7SUFDckIsOEJBQThCO0lBQzlCLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGNBQWM7SUFDZCxZQUFZO0lBRVosTUFBTTtJQUNOLGlCQUFpQjtJQUNqQixJQUFJO0lBSUosVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ1YsaURBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFmLFVBQWdCLFFBQWdCLEVBQUUsZ0JBQXlCLEVBQUUsU0FBaUIsRUFBRSxJQUFhO1FBQTdGLGlCQXFIQzs7O1lBbEhPLG1CQUFtQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUM7OztZQUVsSCxrQkFBa0IsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMseUJBQXlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDOzs7WUFLL0csY0FBYyxHQUFnQyxtQkFBbUIsQ0FBQyxJQUFJLENBQzFFLFNBQVM7Ozs7UUFBQyxVQUFBLFVBQVUsSUFBSSxPQUFBLG9CQUFvQixDQUMxQyxVQUFVO2FBQ1AsTUFBTTs7OztRQUFDLFVBQUEsU0FBUyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQTFCLENBQTBCLEVBQUMsQ0FBQyxnREFBZ0Q7YUFDaEcsR0FBRzs7OztRQUFDLFVBQUEsQ0FBQzs7Z0JBQ0UsVUFBVSxHQUFHLElBQUk7WUFDdkIsT0FBTyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxFQUFDLENBQ0wsRUFQdUIsQ0FPdkIsRUFBQyxDQUVIOztZQUNLLGFBQWEsR0FBZ0Msa0JBQWtCLENBQUMsSUFBSSxDQUN4RSxTQUFTOzs7O1FBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxvQkFBb0IsQ0FDMUMsVUFBVTthQUNQLE1BQU07Ozs7UUFBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUEzQixDQUEyQixFQUFDLENBQUMsZ0RBQWdEO2FBQ2pHLEdBQUc7Ozs7UUFBQyxVQUFBLENBQUM7O2dCQUNFLFVBQVUsR0FBRyxLQUFLO1lBQ3hCLE9BQU8sS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsRUFBQyxDQUNMLEVBUHVCLENBT3ZCLEVBQUMsQ0FFSDs7WUFFSyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7Ozs7O1lBQ3RCLFVBQUMsSUFBcUIsSUFBSyxPQUFBLElBQUksQ0FBQyxJQUFJOzs7OztZQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBMUUsQ0FBMEUsRUFBQyxFQUEvRixDQUErRixFQUFDLENBQUM7Ozs7O1lBQzVILFVBQUMsSUFBcUIsSUFBSyxPQUFBLElBQUksRUFBSixDQUFJLENBQUE7UUFHakMsT0FBTyxhQUFhLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FFdEQsR0FBRzs7OztRQUFDLFVBQUMsRUFBNkI7Z0JBQTdCLDBCQUE2QixFQUE1QixxQkFBYSxFQUFFLG9CQUFZOztnQkFDekIsVUFBVSxHQUFHLE9BQU87Ozs7WUFBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBbkUsQ0FBbUUsR0FBRSxhQUFhLENBQUM7O2dCQUMvRyxTQUFTLEdBQUcsT0FBTzs7OztZQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFuRSxDQUFtRSxHQUFFLFlBQVksQ0FBQztZQUNuSCxPQUFPLEVBQUUsVUFBVSxZQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsQ0FBQTtRQUNsQyxDQUFDLEVBQUM7UUFDRixpQkFBaUI7UUFDakIsR0FBRzs7OztRQUFDLFVBQUMsQ0FBQzs7Z0JBQ0UsR0FBRyxHQUFzQixFQUFFO1lBRWpDLGdCQUFnQixDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLGVBQWU7O29CQUVsQyxJQUF3QjtnQkFDNUIsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPOzs7O2dCQUFDLFVBQUEsY0FBYztvQkFDcEQsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTs7NEJBRTlCLEdBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7OzRCQUNoRSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUM7OzRCQUNyQixVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU07OzRCQUUxQixLQUFLLFNBQUE7d0JBQ1QsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFOztnQ0FDWixjQUFZLEdBQTZCLEVBQUU7NEJBQ2pELElBQUksQ0FBQyxPQUFPOzs7OzRCQUFDLFVBQUEsR0FBRyxJQUFNLGNBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFBLENBQUMsQ0FBQyxFQUFDLENBQUE7O2dDQUM5RCxRQUFRLEdBQUcsWUFBWSxDQUFDLHNCQUFzQixDQUFDLGNBQVksQ0FBQzs0QkFDbEUsS0FBSyxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUMvQzt3QkFDRCxJQUFJLEdBQUc7NEJBQ0wsVUFBVSxFQUFFLGNBQWMsQ0FBQyxVQUFVOzRCQUNyQyxVQUFVLFlBQUE7NEJBQ1YsS0FBSyxPQUFBOzRCQUNMLGFBQWEsRUFBRSxTQUFTOzRCQUN4QixVQUFVLEVBQUUsU0FBUzs0QkFDckIsVUFBVSxFQUFFLElBQUk7eUJBQ2pCLENBQUE7cUJBQ0Y7eUJBQ0k7d0JBQ0gsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFOzRCQUM3QixJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTs7b0NBQzlDLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztvQ0FDbkUsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQzFCLElBQUksR0FBRztvQ0FDTCxVQUFVLEVBQUUsY0FBYyxDQUFDLFVBQVU7b0NBQ3JDLFVBQVUsRUFBRSxLQUFLLENBQUMsTUFBTTtvQ0FDeEIsYUFBYSxFQUFFLENBQUMsbUJBQUEsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLEVBQXFCLENBQUMsQ0FBQyxPQUFPO29DQUMvRCxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7b0NBQ3RCLFVBQVUsRUFBRSxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVU7b0NBQzlDLFNBQVMsV0FBQTtvQ0FDVCxLQUFLLE9BQUE7aUNBQ04sQ0FBQTs2QkFDRjt5QkFDRjs2QkFBTTs0QkFDTCxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTs7b0NBQzdDLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztvQ0FDbEUsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQzFCLElBQUksR0FBRztvQ0FDTCxVQUFVLEVBQUUsY0FBYyxDQUFDLFVBQVU7b0NBQ3JDLFVBQVUsRUFBRSxLQUFLLENBQUMsTUFBTTtvQ0FDeEIsYUFBYSxFQUFFLENBQUMsbUJBQUEsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLEVBQXFCLENBQUMsQ0FBQyxPQUFPO29DQUMvRCxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7b0NBQ3RCLFVBQVUsRUFBRSxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVU7b0NBQzlDLFNBQVMsV0FBQTtvQ0FDVCxLQUFLLE9BQUE7aUNBQ04sQ0FBQTs2QkFDRjt5QkFDRjtxQkFDRjtnQkFFSCxDQUFDLEVBQUMsQ0FBQTtnQkFHRixHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNwQyxDQUFDLEVBQUMsQ0FBQTtZQUNGLE9BQU8sR0FBRyxDQUFBO1FBQ1osQ0FBQyxFQUFDLENBR0gsQ0FBQTtJQUNILENBQUM7SUFJRCxVQUFVOzs7Ozs7Ozs7SUFDRiwwQ0FBUTs7Ozs7Ozs7O0lBQWhCLFVBQWlCLENBQWUsRUFBRSxTQUFpQixFQUFFLGNBQXVCO1FBQTVFLGlCQTRCQzs7WUExQk8sWUFBWSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWU7UUFDMUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQ3JELFNBQVM7Ozs7UUFBQyxVQUFBLENBQUM7O2dCQUNILFNBQVMsR0FBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTO1lBQzNELFFBQVEsU0FBUyxFQUFFO2dCQUNqQixLQUFLLGFBQWE7b0JBQ2hCLE9BQU8sS0FBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxLQUFLLFVBQVU7b0JBQ2IsT0FBTyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUssT0FBTztvQkFDVixPQUFPLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEtBQUssV0FBVztvQkFDZCxPQUFPLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsS0FBSyxhQUFhO29CQUNoQixPQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsS0FBSyxnQkFBZ0I7b0JBQ25CLE9BQU8sS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtnQkFDdkU7b0JBQ0UsT0FBTyxLQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2FBQ3hEO1FBR0gsQ0FBQyxFQUFDLENBQ0gsQ0FBQTtJQUdILENBQUM7SUFHRCxVQUFVOzs7Ozs7OztJQUNWLHNEQUFvQjs7Ozs7Ozs7SUFBcEIsVUFBcUIsT0FBaUIsRUFBRSxRQUFnQixFQUFFLEtBQWM7UUFBeEUsaUJBMENDO1FBeENDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDaEMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7aUJBQ3RELElBQUksQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUF4QyxDQUF3QyxFQUFDLENBQUMsQ0FBQTtTQUNsRTthQUNJLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7aUJBQ25ELElBQUksQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUF4QyxDQUF3QyxFQUFDLENBQUMsQ0FBQTtTQUNsRTthQUNJLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDO2lCQUNoRCxJQUFJLENBQUMsR0FBRzs7OztZQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBeEMsQ0FBd0MsRUFBQyxDQUFDLENBQUE7U0FDbEU7YUFDSSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ25DLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDO2lCQUNwRCxJQUFJLENBQUMsR0FBRzs7OztZQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBeEMsQ0FBd0MsRUFBQyxDQUFDLENBQUE7U0FDbEU7YUFDSSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ3BDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDO2lCQUNyRCxJQUFJLENBQUMsR0FBRzs7OztZQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBeEMsQ0FBd0MsRUFBQyxDQUFDLENBQUE7U0FDbEU7YUFHSSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQzFFLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDO2lCQUN4RCxJQUFJLENBQUMsR0FBRzs7OztZQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBeEMsQ0FBd0MsRUFBQyxDQUFDLENBQUE7U0FDbEU7YUFDSSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztpQkFDbkMsSUFBSSxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFDLElBQUk7O29CQUNQLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUk7Ozs7Z0JBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQWxCLENBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0QsS0FBSyxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNoRSxVQUFVLEVBQUUsRUFBRSxDQUFDLGlFQUFpRTtxQkFDakYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNQLE9BQU87b0JBQ0wsY0FBYyxFQUFFLE9BQU87b0JBQ3ZCLEtBQUssT0FBQTtpQkFDTixDQUFBO1lBQ0gsQ0FBQyxFQUFDLENBQUMsQ0FBQTtTQUNOOztZQUNJLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3RCLENBQUM7SUFFRCxVQUFVOzs7Ozs7SUFDVixvRUFBa0M7Ozs7OztJQUFsQyxVQUFtQyxRQUFnQjtRQUNqRCxPQUFPLGFBQWEsQ0FDbEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQ3hELElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFDakUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLCtCQUErQixDQUFDLFFBQVEsQ0FBQyxDQUNyRSxDQUFDLElBQUksQ0FDSixHQUFHOzs7O1FBQUMsVUFBQyxFQUE0QztnQkFBNUMsMEJBQTRDLEVBQTNDLHNCQUFjLEVBQUUsa0JBQVUsRUFBRSxzQkFBYzs7Z0JBQ3hDLEdBQUcsR0FBbUM7Z0JBQzFDLGNBQWMsZ0JBQUE7Z0JBQ2QsVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLGNBQWMsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDO2FBQ3ZDO1lBQ0QsT0FBTyxHQUFHLENBQUE7UUFDWixDQUFDLEVBQUMsQ0FDSCxDQUFBO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQscURBQW1COzs7OztJQUFuQixVQUFvQixjQUF3QixFQUFFLEtBQUs7UUFDakQsT0FBTztZQUNMLGNBQWMsZ0JBQUE7WUFDZCxLQUFLLE9BQUE7U0FDTixDQUFBO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVTs7Ozs7OztJQUNWLGtEQUFnQjs7Ozs7O0lBQWhCLFVBQWlCLFFBQVE7UUFBekIsaUJBeURDO1FBdkRDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUMzQixTQUFTOzs7O1FBQUMsVUFBQSxTQUFTO1lBQ2pCLE9BQU8sS0FBSSxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FDcEMsU0FBUyxDQUFDLGtCQUFrQixDQUM3QixDQUFDLElBQUksQ0FDSixTQUFTOzs7O1lBQUMsVUFBQSxTQUFTO2dCQUNqQixPQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRzs7OztnQkFBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLEtBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQztvQkFDN0YsV0FBVyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVTtvQkFDekMsZUFBZSxFQUFFLFFBQVE7aUJBQzFCLENBQUM7cUJBQ0MsSUFBSSxDQUNILFdBQVcsQ0FBQyxFQUFFOzs7O2dCQUFFLFVBQUEsVUFBVSxJQUFJLE9BQUEsYUFBYSxDQUN6QyxVQUFVLENBQUMsR0FBRzs7OztnQkFBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLGFBQWEsQ0FDdkMsS0FBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O2dCQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQUMsQ0FBQyxFQUM5RixLQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUNoRyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O2dCQUFDLFVBQUMsRUFBMkI7d0JBQTNCLDBCQUEyQixFQUExQix3QkFBZ0IsRUFBRSxlQUFPOzt3QkFDOUIsYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDO3dCQUN0QyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsVUFBVTt3QkFDdEMsUUFBUSxFQUFFLENBQUMsbUJBQUEsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxFQUFnQixDQUFDO3dCQUM3RCxRQUFRLEVBQUUsQ0FBQyxtQkFBQSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQWUsQ0FBQztxQkFDckQsQ0FBQzs7d0JBQ0ksSUFBSSxHQUFzQjt3QkFDOUIsU0FBUyxXQUFBO3dCQUNULE1BQU0sRUFBRSxTQUFTO3dCQUNqQixPQUFPLFNBQUE7d0JBQ1AsYUFBYSxlQUFBO3dCQUNiLEtBQUssRUFBRSxLQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQzt3QkFDdEQsT0FBTyxFQUFFLGdCQUFnQixDQUFDLFFBQVE7cUJBQ25DO29CQUNELE9BQU8sSUFBSSxDQUFDO2dCQUNkLENBQUMsRUFBQyxDQUFDLEVBbEJ5QixDQWtCekIsRUFDRixDQUNGLEVBckI2QixDQXFCN0IsRUFBQyxFQUNGLEdBQUc7Ozs7Z0JBQUMsVUFBQSxLQUFLOzt3QkFDRCxHQUFHLEdBQXFCO3dCQUM1QixjQUFjLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLE9BQUE7cUJBQ25EO29CQUNELE9BQU8sR0FBRyxDQUFBO2dCQUNaLENBQUMsRUFBQyxDQUNILEVBakM0QyxDQWlDNUMsRUFDRixDQUFDLENBQUMsSUFBSSxDQUNMLEdBQUc7Ozs7Z0JBQUMsVUFBQyxVQUFVOzt3QkFDUCxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQU07Ozs7b0JBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQWxCLENBQWtCLEVBQUM7O3dCQUNsRCxZQUFZLEdBQWlCO3dCQUNqQyxLQUFLLEVBQUUsRUFBRTt3QkFDVCxVQUFVLEVBQUUsS0FBSztxQkFDbEI7b0JBQ0QsT0FBTyxZQUFZLENBQUE7Z0JBQ3JCLENBQUMsRUFBQyxDQUNILENBQUE7WUFDSCxDQUFDLEVBQUMsQ0FDSCxDQUFBO1FBQ0gsQ0FBQyxFQUFDLENBRUgsQ0FBQTtJQUNILENBQUM7SUFFRCxVQUFVOzs7Ozs7SUFDVixxREFBbUI7Ozs7OztJQUFuQixVQUFvQixTQUF1QjtRQUN6QyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQzlFLE1BQU07Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLEVBQUgsQ0FBRyxFQUFDLEVBQ2hCLEdBQUc7Ozs7UUFBQyxVQUFBLFdBQVc7WUFDYixJQUFJLENBQUMsV0FBVztnQkFBRSxPQUFPLElBQUksQ0FBQzs7Z0JBQ3hCLElBQUksR0FBb0I7Z0JBQzVCLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixPQUFPLEVBQUUsU0FBUztnQkFDbEIsU0FBUyxXQUFBO2dCQUNULEtBQUssRUFBRSxXQUFXLENBQUMsTUFBTTtnQkFDekIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxRQUFRO2FBQzlCO1lBQ0QsT0FBTyxJQUFJLENBQUE7UUFDYixDQUFDLEVBQUMsQ0FBQyxDQUFBO0lBQ1AsQ0FBQztJQUVELFVBQVU7Ozs7OztJQUNWLGtEQUFnQjs7Ozs7O0lBQWhCLFVBQWlCLFNBQXVCO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FDM0UsTUFBTTs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQUMsRUFDaEIsR0FBRzs7OztRQUFDLFVBQUEsUUFBUTtZQUNWLElBQUksQ0FBQyxRQUFRO2dCQUFFLE9BQU8sSUFBSSxDQUFDOztnQkFDckIsSUFBSSxHQUFpQjtnQkFDekIsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixTQUFTLFdBQUE7Z0JBQ1QsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO2dCQUNyQixPQUFPLEVBQUUsUUFBUSxDQUFDLFFBQVE7YUFDM0I7WUFDRCxPQUFPLElBQUksQ0FBQTtRQUNiLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDUCxDQUFDO0lBRUQsVUFBVTs7Ozs7O0lBQ1YsK0NBQWE7Ozs7OztJQUFiLFVBQWMsU0FBdUI7UUFDbkMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUN4RSxNQUFNOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFILENBQUcsRUFBQyxFQUNoQixHQUFHOzs7O1FBQUMsVUFBQSxLQUFLO1lBQ1AsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTyxJQUFJLENBQUM7O2dCQUNsQixJQUFJLEdBQWM7Z0JBQ3RCLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixPQUFPLEVBQUUsU0FBUztnQkFDbEIsU0FBUyxXQUFBO2dCQUNULEtBQUssRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHO2dCQUN2RCxPQUFPLEVBQUUsS0FBSyxDQUFDLFFBQVE7YUFDeEI7WUFDRCxPQUFPLElBQUksQ0FBQTtRQUNiLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDUCxDQUFDO0lBRUQsVUFBVTs7Ozs7O0lBQ1YsbURBQWlCOzs7Ozs7SUFBakIsVUFBa0IsU0FBdUI7UUFBekMsaUJBb0JDO1FBbkJDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FDNUUsTUFBTTs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQUMsRUFDaEIsU0FBUzs7OztRQUFDLFVBQUMsU0FBUztZQUNsQixPQUFPLEtBQUksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDO2lCQUM3RCxJQUFJLENBQ0gsR0FBRzs7OztZQUFDLFVBQUEsT0FBTzs7b0JBRUgsSUFBSSxHQUFrQjtvQkFDMUIsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLE9BQU8sRUFBRSxTQUFTO29CQUNsQixTQUFTLFdBQUE7b0JBQ1QsS0FBSyxFQUFLLFNBQVMsQ0FBQyxhQUFhLFNBQUksT0FBTyxDQUFDLFlBQWM7b0JBQzNELE9BQU8sRUFBRSxTQUFTLENBQUMsUUFBUTtpQkFDNUI7Z0JBQ0QsT0FBTyxJQUFJLENBQUE7WUFDYixDQUFDLEVBQUMsQ0FDSCxDQUFBO1FBQ0wsQ0FBQyxFQUFDLENBQ0gsQ0FBQTtJQUNILENBQUM7SUFHRCxVQUFVOzs7Ozs7SUFDVixvREFBa0I7Ozs7OztJQUFsQixVQUFtQixTQUF1QjtRQUExQyxpQkE0QkM7UUEzQkMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUM5RSxTQUFTOzs7O1FBQ1AsVUFBQyxVQUFVO1lBQ1QsSUFBSSxDQUFDLFVBQVU7Z0JBQUUsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNqRCxPQUFPLEtBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7aUJBQ25FLElBQUksQ0FDSCxHQUFHOzs7O1lBQUMsVUFBQSxRQUFRO2dCQUNWLElBQUksQ0FBQyxRQUFRO29CQUFFLE9BQU8sSUFBSSxDQUFDOztvQkFDdkIsS0FBSyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxVQUFVLENBQUMsTUFBTTtvQkFBRSxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQTtxQkFDM0MsSUFBSSxVQUFVLENBQUMsU0FBUyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDNUYsS0FBSyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUc7Ozs7b0JBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsTUFBTSxFQUFULENBQVMsRUFBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDaEU7O29CQUNLLElBQUksR0FBbUI7b0JBQzNCLE1BQU0sRUFBRSxTQUFTO29CQUNqQixPQUFPLEVBQUUsU0FBUztvQkFDbEIsU0FBUyxXQUFBO29CQUNULEtBQUssT0FBQTtvQkFDTCxPQUFPLEVBQUUsVUFBVSxDQUFDLFFBQVE7b0JBQzVCLFFBQVEsVUFBQTtvQkFDUixVQUFVLEVBQUUsVUFBVSxDQUFDLFdBQVc7aUJBQ25DO2dCQUNELE9BQU8sSUFBSSxDQUFBO1lBQ2IsQ0FBQyxFQUFDLENBQ0gsQ0FBQTtRQUNMLENBQUMsRUFBQyxDQUNMLENBQUE7SUFDSCxDQUFDO0lBR0QsVUFBVTs7Ozs7OztJQUNWLHVEQUFxQjs7Ozs7OztJQUFyQixVQUFzQixTQUF1QixFQUFFLFVBQW1CO1FBQ2hFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUN6Ryw2RUFBNkU7UUFDN0UsR0FBRzs7OztRQUFDLFVBQUEsT0FBTztZQUNULElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osT0FBTyxJQUFJLENBQUM7YUFDYjs7Z0JBQ0ssSUFBSSxHQUFzQjtnQkFDOUIsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixTQUFTLFdBQUE7Z0JBQ1QsT0FBTyxTQUFBO2dCQUNQLEtBQUssRUFBRSxPQUFPLENBQUMsWUFBWSxJQUFJLEVBQUU7Z0JBQ2pDLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUTthQUMxQjtZQUNELE9BQU8sSUFBSSxDQUFBO1FBQ2IsQ0FBQyxFQUFDLENBQUMsQ0FBQTtJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVU7Ozs7Ozs7SUFDVix1REFBcUI7Ozs7OztJQUFyQixVQUFzQixTQUF1QixFQUFFLFNBQVM7UUFBeEQsaUJBMkNDO1FBMUNDLElBQUksU0FBUyxFQUFFO1lBQ2IsT0FBTyxhQUFhLENBQ2xCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQUMsQ0FBQyxFQUM5RixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFILENBQUcsRUFBQyxDQUFDLENBQ3ZILENBQUMsSUFBSSxDQUNKLEdBQUc7Ozs7WUFBQyxVQUFDLEVBQTJCO29CQUEzQiwwQkFBMkIsRUFBMUIsd0JBQWdCLEVBQUUsZUFBTztnQkFDN0IsSUFBSSxDQUFDLGdCQUFnQjtvQkFBRSxPQUFPLElBQUksQ0FBQzs7b0JBQzdCLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQztvQkFDdEMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLFVBQVU7b0JBQ3RDLFFBQVEsRUFBRSxDQUFDLG1CQUFBLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsRUFBZ0IsQ0FBQztvQkFDN0QsUUFBUSxFQUFFLENBQUMsbUJBQUEsZ0JBQWdCLENBQUMsUUFBUSxFQUFlLENBQUM7aUJBQ3JELENBQUM7O29CQUNJLElBQUksR0FBc0I7b0JBQzlCLE1BQU0sRUFBRSxTQUFTO29CQUNqQixPQUFPLEVBQUUsU0FBUztvQkFDbEIsU0FBUyxXQUFBO29CQUNULGFBQWEsZUFBQTtvQkFDYixLQUFLLEVBQUUsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7b0JBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRO2lCQUNuQztnQkFDRCxPQUFPLElBQUksQ0FBQTtZQUNiLENBQUMsRUFBQyxDQUFDLENBQUE7U0FDTjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekcsR0FBRzs7OztZQUFDLFVBQUEsZ0JBQWdCOztvQkFDWixhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUM7b0JBQ3RDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO29CQUN0QyxRQUFRLEVBQUUsQ0FBQyxtQkFBQSxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsSUFBSSxXQUFXLENBQUMsRUFBZ0IsQ0FBQztvQkFDbEYsUUFBUSxFQUFFLENBQUMsbUJBQUEsZ0JBQWdCLENBQUMsUUFBUSxFQUFlLENBQUM7aUJBQ3JELENBQUM7O29CQUNJLElBQUksR0FBc0I7b0JBQzlCLE1BQU0sRUFBRSxTQUFTO29CQUNqQixPQUFPLEVBQUUsU0FBUztvQkFDbEIsU0FBUyxXQUFBO29CQUNULGFBQWEsZUFBQTtvQkFDYixLQUFLLEVBQUUsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7b0JBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRO2lCQUNuQztnQkFDRCxPQUFPLElBQUksQ0FBQTtZQUNiLENBQUMsRUFBQyxDQUNILENBQUE7U0FDRjtJQUNILENBQUM7SUFHRDs7MEVBRXNFO0lBQ3RFLFVBQVU7Ozs7Ozs7Ozs7SUFDVixtREFBaUI7Ozs7Ozs7OztJQUFqQixVQUFrQixDQUFXLEVBQUUsUUFBZ0I7UUFDN0MsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQ2xCLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssZ0JBQWdCLENBQUM7WUFDdEIsS0FBSyxVQUFVLENBQUM7WUFDaEIsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLFlBQVksQ0FBQztZQUNsQixLQUFLLGlCQUFpQixDQUFDO1lBQ3ZCLEtBQUssV0FBVztnQkFDZCxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7Z0JBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTSxFQUFaLENBQVksRUFBQyxDQUFDLENBQUE7WUFFakY7Z0JBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO2dCQUNwQyxNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBRUQsVUFBVTs7Ozs7OztJQUNWLDZDQUFXOzs7Ozs7O0lBQVgsVUFBWSxDQUFXLEVBQUUsUUFBUTtRQUMvQixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVztZQUFFLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTthQUN0RSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYTtZQUFFLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTthQUMvRSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTthQUNyRSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTthQUMvRCxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUztZQUFFLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTthQUN2RSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVTtZQUFFLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTthQUN6RSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYztZQUFFLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTs7WUFDaEYsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFFRCxVQUFVOzs7Ozs7O0lBQ1YsdURBQXFCOzs7Ozs7O0lBQXJCLFVBQXNCLGNBQXdCLEVBQUUsUUFBZ0I7UUFDOUQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FDdEYsQ0FBQTtJQUNILENBQUM7SUFFRDs7TUFFRTtJQUNGLFVBQVU7Ozs7Ozs7OztJQUNWLDBEQUF3Qjs7Ozs7Ozs7SUFBeEIsVUFBNEIsY0FBd0IsRUFBRSxRQUFRO1FBQTlELGlCQWdCQztRQWRDLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxDQUFDLENBQUMsZ0NBQWdDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQ3RGLENBQUMsSUFBSSxDQUNKLFNBQVM7Ozs7UUFBQyxVQUFDLFVBQVU7WUFDbkIsT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUc7Ozs7O1lBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQXhELENBQXdELEVBQUMsQ0FBQztpQkFDckcsSUFBSSxDQUNILEdBQUc7Ozs7WUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUs7aUJBQ2YsTUFBTTs7OztZQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBTixDQUFNLEVBQUM7aUJBQ3RCLElBQUk7Ozs7O1lBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUE1QixDQUE0QixFQUFDLEVBRmxDLENBRWtDLEVBQzlDLEVBQ0QsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxFQUFDLENBQUMsQ0FBQTtJQUVQLENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVU7Ozs7Ozs7OztJQUNWLGtEQUFnQjs7Ozs7Ozs7SUFBaEIsVUFBb0IsY0FBd0IsRUFBRSxRQUFRO1FBQXRELGlCQVdDO1FBVEMsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQ2hHLFNBQVM7Ozs7WUFBQyxVQUFDLFVBQVU7Z0JBQ25CLE9BQU8sYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHOzs7OztnQkFBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFyQixDQUFxQixFQUFDLENBQUM7cUJBQ2xFLElBQUksQ0FDSCxHQUFHOzs7O2dCQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE1BQU07Ozs7Z0JBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssY0FBYyxDQUFDLFdBQVcsRUFBckQsQ0FBcUQsRUFBQyxFQUEzRSxDQUEyRSxFQUFDLEVBQ3pGLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3BCLENBQUMsRUFBQyxDQUFDLENBQUE7U0FDTjtJQUNILENBQUM7SUFHRDs7T0FFRztJQUNILFVBQVU7Ozs7Ozs7OztJQUNWLHNEQUFvQjs7Ozs7Ozs7SUFBcEIsVUFBd0IsY0FBd0IsRUFBRSxRQUFRO1FBQTFELGlCQVdDO1FBVEMsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQ2hHLFNBQVM7Ozs7WUFBQyxVQUFDLFVBQVU7Z0JBQ25CLE9BQU8sYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHOzs7OztnQkFBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQXpCLENBQXlCLEVBQUMsQ0FBQztxQkFDdEUsSUFBSSxDQUNILEdBQUc7Ozs7Z0JBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTTs7OztnQkFBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxjQUFjLENBQUMsV0FBVyxFQUFyRCxDQUFxRCxFQUFDLEVBQTNFLENBQTJFLEVBQUMsRUFDekYsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDcEIsQ0FBQyxFQUFDLENBQUMsQ0FBQTtTQUNOO0lBQ0gsQ0FBQztJQUdEOztPQUVHO0lBQ0gsVUFBVTs7Ozs7Ozs7O0lBQ1YsdURBQXFCOzs7Ozs7OztJQUFyQixVQUF5QixjQUF3QixFQUFFLFFBQVE7UUFBM0QsaUJBV0M7UUFUQyxJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlDQUFpQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDaEcsU0FBUzs7OztZQUFDLFVBQUMsVUFBVTtnQkFDbkIsT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUc7Ozs7O2dCQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBMUIsQ0FBMEIsRUFBQyxDQUFDO3FCQUN2RSxJQUFJLENBQ0gsR0FBRzs7OztnQkFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxNQUFNOzs7O2dCQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLGNBQWMsQ0FBQyxXQUFXLEVBQXJELENBQXFELEVBQUMsRUFBM0UsQ0FBMkUsRUFBQyxFQUN6RixTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUNwQixDQUFDLEVBQUMsQ0FBQyxDQUFBO1NBQ047SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVOzs7Ozs7Ozs7SUFDVix3REFBc0I7Ozs7Ozs7O0lBQXRCLFVBQTBCLGNBQXdCLEVBQUUsUUFBUTtRQUE1RCxpQkFXQztRQVRDLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsaUNBQWlDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUNoRyxTQUFTOzs7O1lBQUMsVUFBQyxVQUFVO2dCQUNuQixPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRzs7Ozs7Z0JBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUEzQixDQUEyQixFQUFDLENBQUM7cUJBQ3hFLElBQUksQ0FDSCxHQUFHOzs7O2dCQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE1BQU07Ozs7Z0JBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssY0FBYyxDQUFDLFdBQVcsRUFBckQsQ0FBcUQsRUFBQyxFQUEzRSxDQUEyRSxFQUFDLEVBQ3pGLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3BCLENBQUMsRUFBQyxDQUFDLENBQUE7U0FDTjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVU7Ozs7Ozs7OztJQUNWLHFEQUFtQjs7Ozs7Ozs7SUFBbkIsVUFBdUIsY0FBd0IsRUFBRSxRQUFRO1FBQXpELGlCQVdDO1FBVEMsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQ2hHLFNBQVM7Ozs7WUFBQyxVQUFDLFVBQVU7Z0JBQ25CLE9BQU8sYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHOzs7OztnQkFBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQXhCLENBQXdCLEVBQUMsQ0FBQztxQkFDckUsSUFBSSxDQUNILEdBQUc7Ozs7Z0JBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTTs7OztnQkFBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxjQUFjLENBQUMsV0FBVyxFQUFyRCxDQUFxRCxFQUFDLEVBQTNFLENBQTJFLEVBQUMsRUFDekYsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDcEIsQ0FBQyxFQUFDLENBQUMsQ0FBQTtTQUNOO0lBQ0gsQ0FBQztJQUVEOzsyRUFFdUU7SUFFdkU7O09BRUc7SUFHSDs7T0FFRztJQUNILFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUNWLHlEQUF1Qjs7Ozs7Ozs7Ozs7Ozs7SUFBdkIsVUFBMkIsY0FBd0IsRUFBRSxRQUFRO1FBQTdELGlCQVdDO1FBVEMsSUFBSSxjQUFjLENBQUMsVUFBVSxFQUFFO1lBQzdCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQ25HLFNBQVM7Ozs7WUFBQyxVQUFDLFVBQVU7Z0JBQ25CLE9BQU8sYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHOzs7OztnQkFBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEVBQTNCLENBQTJCLEVBQUMsQ0FBQztxQkFDeEUsSUFBSSxDQUNILEdBQUc7Ozs7Z0JBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTTs7OztnQkFBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxjQUFjLENBQUMsV0FBVyxFQUFyRCxDQUFxRCxFQUFDLEVBQTNFLENBQTJFLEVBQUMsRUFDekYsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDcEIsQ0FBQyxFQUFDLENBQUMsQ0FBQTtTQUNOO0lBQ0gsQ0FBQztJQUVEOztNQUVFO0lBQ0YsVUFBVTs7Ozs7Ozs7O0lBQ1Ysc0RBQW9COzs7Ozs7OztJQUFwQixVQUF3QixjQUF3QixFQUFFLFFBQVE7UUFBMUQsaUJBV0M7UUFUQyxJQUFJLGNBQWMsQ0FBQyxVQUFVLEVBQUU7WUFDN0IsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLG9DQUFvQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDbkcsU0FBUzs7OztZQUFDLFVBQUMsVUFBVTtnQkFDbkIsT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUc7Ozs7O2dCQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBeEIsQ0FBd0IsRUFBQyxDQUFDO3FCQUNyRSxJQUFJLENBQ0gsR0FBRzs7OztnQkFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxNQUFNOzs7O2dCQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLGNBQWMsQ0FBQyxXQUFXLEVBQXJELENBQXFELEVBQUMsRUFBM0UsQ0FBMkUsRUFBQyxFQUN6RixTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUNwQixDQUFDLEVBQUMsQ0FBQyxDQUFBO1NBQ047SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVOzs7Ozs7Ozs7SUFDVixtREFBaUI7Ozs7Ozs7O0lBQWpCLFVBQXFCLGNBQXdCLEVBQUUsUUFBUTtRQUF2RCxpQkFXQztRQVRDLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsb0NBQW9DLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUNuRyxTQUFTOzs7O1lBQUMsVUFBQyxVQUFVO2dCQUNuQixPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRzs7Ozs7Z0JBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBckIsQ0FBcUIsRUFBQyxDQUFDO3FCQUNsRSxJQUFJLENBQ0gsR0FBRzs7OztnQkFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxNQUFNOzs7O2dCQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLGNBQWMsQ0FBQyxXQUFXLEVBQXJELENBQXFELEVBQUMsRUFBM0UsQ0FBMkUsRUFBQyxFQUN6RixTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUNwQixDQUFDLEVBQUMsQ0FBQyxDQUFBO1NBQ047SUFDSCxDQUFDO0lBRUQ7O01BRUU7SUFDRixVQUFVOzs7Ozs7Ozs7SUFDVix1REFBcUI7Ozs7Ozs7O0lBQXJCLFVBQXlCLGNBQXdCLEVBQUUsUUFBUTtRQUEzRCxpQkFXQztRQVRDLElBQUksY0FBYyxDQUFDLFVBQVUsRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsb0NBQW9DLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUNuRyxTQUFTOzs7O1lBQUMsVUFBQyxVQUFVO2dCQUNuQixPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRzs7Ozs7Z0JBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUF6QixDQUF5QixFQUFDLENBQUM7cUJBQ3RFLElBQUksQ0FDSCxHQUFHOzs7O2dCQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE1BQU07Ozs7Z0JBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssY0FBYyxDQUFDLFdBQVcsRUFBckQsQ0FBcUQsRUFBQyxFQUEzRSxDQUEyRSxFQUFDLEVBQ3pGLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3BCLENBQUMsRUFBQyxDQUFDLENBQUE7U0FDTjtJQUNILENBQUM7SUFDRDs7TUFFRTtJQUNGLFVBQVU7Ozs7Ozs7OztJQUNWLDJEQUF5Qjs7Ozs7Ozs7SUFBekIsVUFBNkIsY0FBd0IsRUFBRSxRQUFRO1FBQS9ELGlCQWdCQztRQWRDLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNGLElBQUksQ0FBQyxDQUFDLENBQUMsbUNBQW1DLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQ3pGLENBQUMsSUFBSSxDQUNKLFNBQVM7Ozs7UUFBQyxVQUFDLFVBQVU7WUFDbkIsT0FBTyxhQUFhLENBQUMsVUFBVSxDQUFDLEdBQUc7Ozs7O1lBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQXhELENBQXdELEVBQUMsQ0FBQztpQkFDckcsSUFBSSxDQUNILEdBQUc7Ozs7WUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssY0FBYyxDQUFDLFdBQVcsRUFBckQsQ0FBcUQsRUFBQyxFQUEzRSxDQUEyRSxFQUV2RixDQUFDLENBQUE7UUFDUixDQUFDLEVBQUMsRUFDRixTQUFTLENBQUMsRUFBRSxDQUFDLENBQ2QsQ0FBQTtJQUVILENBQUM7SUFHRDs7T0FFRztJQUNILFVBQVU7Ozs7Ozs7SUFDVixzREFBb0I7Ozs7OztJQUFwQixVQUFxQixRQUFRO1FBQTdCLGlCQXNEQztRQXJEQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDM0IsU0FBUzs7OztRQUFDLFVBQUEsU0FBUztZQUNqQixPQUFPLEtBQUksQ0FBQyxDQUFDLENBQUMsMEJBQTBCLENBQ3RDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FDN0IsQ0FBQyxJQUFJLENBQ0osU0FBUzs7OztZQUFDLFVBQUEsZ0JBQWdCO2dCQUV4QixPQUFPLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHOzs7O2dCQUFDLFVBQUEsUUFBUTtvQkFDaEQsT0FBQSxLQUFJLENBQUMsQ0FBQyxDQUFDLG9DQUFvQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQzt5QkFDaEYsSUFBSSxDQUNILFdBQVcsQ0FBQyxFQUFFOzs7O29CQUFFLFVBQUEsVUFBVSxJQUFJLE9BQUEsYUFBYSxDQUN6QyxVQUFVLENBQUMsR0FBRzs7OztvQkFBQyxVQUFBLFNBQVM7d0JBQ3RCLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDOzZCQUNyRSxJQUFJLENBQUMsR0FBRzs7Ozt3QkFBQyxVQUFDLGdCQUFnQjs7Z0NBQ25CLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQztnQ0FDdEMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLFVBQVU7Z0NBQ3RDLFFBQVEsRUFBRSxDQUFDLG1CQUFBLENBQUMsU0FBUyxDQUFDLDJCQUEyQixJQUFJLFdBQVcsQ0FBQyxFQUFnQixDQUFDO2dDQUNsRixRQUFRLEVBQUUsQ0FBQyxtQkFBQSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQWUsQ0FBQzs2QkFDckQsQ0FBQzs7Z0NBQ0ksSUFBSSxHQUFzQjtnQ0FDOUIsU0FBUyxXQUFBO2dDQUNULE1BQU0sRUFBRSxTQUFTO2dDQUNqQixPQUFPLEVBQUUsU0FBUztnQ0FDbEIsYUFBYSxlQUFBO2dDQUNiLEtBQUssRUFBRSxLQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztnQ0FDdEQsT0FBTyxFQUFFLGdCQUFnQixDQUFDLFFBQVE7NkJBQ25DOzRCQUNELE9BQU8sSUFBSSxDQUFDO3dCQUNkLENBQUMsRUFBQyxDQUFDO29CQWhCTCxDQWdCSyxFQUNOLENBQ0YsRUFwQjZCLENBb0I3QixFQUFDLEVBQ0YsR0FBRzs7OztvQkFBQyxVQUFBLEtBQUs7OzRCQUNELEdBQUcsR0FBcUI7NEJBQzVCLGNBQWMsRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBQTt5QkFDbkQ7d0JBQ0QsT0FBTyxHQUFHLENBQUE7b0JBQ1osQ0FBQyxFQUFDLEVBQ0YsU0FBUyxDQUFDLG1CQUFBLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFvQixDQUFDLENBQzFGO2dCQTlCSCxDQThCRyxFQUNKLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRzs7OztnQkFBQyxVQUFDLFVBQVU7O3dCQUNQLFlBQVksR0FBaUI7d0JBQ2pDLEtBQUssRUFBRSxFQUFFO3dCQUNULFVBQVUsRUFBRSxVQUFVLENBQUMsTUFBTTs7Ozt3QkFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBdEIsQ0FBc0IsRUFBQztxQkFDL0Q7b0JBQ0QsT0FBTyxZQUFZLENBQUE7Z0JBQ3JCLENBQUMsRUFBQyxDQUNILENBQUE7WUFDSCxDQUFDLEVBQUMsQ0FDSCxDQUFBO1FBQ0gsQ0FBQyxFQUFDLENBRUgsQ0FBQTtJQUNILENBQUM7SUFHRDs7OztPQUlHO0lBQ0gsVUFBVTs7Ozs7Ozs7O0lBQ1YsbURBQWlCOzs7Ozs7OztJQUFqQixVQUFrQixRQUFnQjtRQUFsQyxpQkFvQkM7UUFuQkMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUk7UUFFNUMsd0NBQXdDO1FBQ3hDLFNBQVM7Ozs7UUFBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxDQUFDLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSTtRQUNsRSxtQ0FBbUM7UUFDbkMsU0FBUzs7OztRQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsb0JBQW9CLENBQ3hDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0IsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBL0MsQ0FBK0MsRUFBQyxDQUFDLENBQUM7WUFDN0YsRUFBRSxDQUNMLENBQUMsSUFBSSxDQUNKLEdBQUc7Ozs7UUFBQyxVQUFBLEtBQUs7WUFDUCxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU07Ozs7WUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBckIsQ0FBcUIsRUFBQyxDQUFBO1lBQ25ELElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDekMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTthQUMvQjtZQUNELE9BQU8sRUFBRSxDQUFBO1FBQ1gsQ0FBQyxFQUFDLENBQ0gsRUFacUIsQ0FZckIsRUFBQyxDQUFDLEVBZGdCLENBY2hCLEVBQ0osQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUdEOztPQUVHO0lBQ0gsVUFBVTs7Ozs7OztJQUNWLHdEQUFzQjs7Ozs7O0lBQXRCLFVBQXVCLFFBQWdCO1FBQXZDLGlCQUlDO1FBSEMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FDNUMsU0FBUzs7OztRQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQTlCLENBQThCLEVBQUMsQ0FDckQsQ0FBQTtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVU7Ozs7Ozs7OztJQUNWLGtEQUFnQjs7Ozs7Ozs7SUFBaEIsVUFBaUIsUUFBZ0IsRUFBRSxlQUF1QixFQUFFLFVBQW1CO1FBQzdFLElBQUksVUFBVSxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0NBQWdDLENBQUMsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxLQUFLO2dCQUN4SSxJQUFJLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQUUsT0FBTyxTQUFTLENBQUM7O29CQUN6RCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM5QixDQUFDLEVBQUMsQ0FDRCxDQUFBO1NBQ0Y7YUFDSTtZQUNILE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLCtCQUErQixDQUFDLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQzVILEdBQUc7Ozs7WUFBQyxVQUFBLEtBQUs7Z0JBQ1AsSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUFFLE9BQU8sU0FBUyxDQUFDOztvQkFDekQsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDOUIsQ0FBQyxFQUFDLENBQ0gsQ0FBQTtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFJRCxxREFBbUI7Ozs7SUFBbkIsVUFBb0IsU0FBaUM7UUFGckQsaUJBTUM7UUFIQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUNuRCxTQUFTOzs7O1FBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLEVBQWpDLENBQWlDLEVBQUMsQ0FDdEQsQ0FBQTtJQUNILENBQUM7Ozs7O0lBSUQsOERBQTRCOzs7O0lBQTVCLFVBQTZCLE9BQWlCO1FBRjlDLGlCQU1DO1FBSEMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDL0QsU0FBUzs7OztRQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxFQUFqQyxDQUFpQyxFQUFDLENBQ3RELENBQUE7SUFDSCxDQUFDOzs7OztJQUlELHVEQUFxQjs7OztJQUFyQixVQUFzQixtQkFBaUU7UUFGdkYsaUJBa0NDO1FBL0JDLE9BQU8sb0JBQW9CLENBQ3pCLG1CQUFtQixDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQ3pFLEdBQUc7Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsbUJBQUE7WUFDWixLQUFLLE9BQUE7WUFDTCxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1NBQ2pELEVBQW9CLENBQUMsRUFIVCxDQUdTLEVBQUMsRUFDdkIsU0FBUzs7OztRQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsR0FBRzs7O1FBQ25CLGNBQU0sT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBaEIsQ0FBZ0IsR0FDdEIsS0FBSSxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUN0RCxTQUFTOzs7O1FBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxvQkFBb0IsQ0FDdkMsT0FBTyxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLEtBQUksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUMzRCxHQUFHOzs7O1FBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxDQUFDLG1CQUFBO1lBQ2QsS0FBSyxFQUFFLE9BQU8sQ0FBQyxZQUFZO1lBQzNCLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sUUFBQSxFQUFFO1NBQzNDLEVBQW9CLENBQUMsRUFIUCxDQUdPLEVBQUMsQ0FDeEIsRUFMcUIsQ0FLckIsRUFBQyxDQUNILENBQUMsSUFBSSxDQUNKLE9BQU87Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFLLEVBQVAsQ0FBTyxFQUFDLENBQ3RCLEVBVG9CLENBU3BCLEVBQUMsRUFDRixHQUFHOzs7O1FBQUMsVUFBQSxRQUFRO1lBQ1YsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7WUFDeEIsT0FBTyxJQUFJLENBQUE7UUFDYixDQUFDLEVBQUMsQ0FDSCxFQUNELEVBQUUsQ0FBQyx3Q0FBSyxJQUFJLElBQUUsUUFBUSxFQUFFLEVBQUUsS0FBc0IsQ0FBQyxDQUNsRCxFQW5CaUIsQ0FtQmpCLEVBQ0EsQ0FDRixFQTFCK0IsQ0EwQi9CLEVBQUMsQ0FDSCxDQUFDLElBQUksQ0FDSixPQUFPOzs7O1FBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLENBQVUsRUFBQyxDQUM5QixDQUFBO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsZ0VBQThCOzs7OztJQUE5QixVQUErQixlQUF3QztRQUF2RSxpQkFXQzs7WUFWTyxhQUFhLEdBQUcsQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkcsRUFBRSxDQUFDLG1CQUFBLEVBQUUsRUFBWSxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7aUJBQ3ZELElBQUksQ0FDSCxNQUFNOzs7O1lBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxDQUFDLENBQUMsR0FBRyxFQUFMLENBQUssRUFBQyxFQUN0QixTQUFTOzs7O1lBQUMsVUFBQSxXQUFXLElBQUksT0FBQSxLQUFJLENBQUMsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLFdBQVcsQ0FBQyxFQUFqRCxDQUFpRCxFQUFDLENBQzVFO1FBQ0wsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUN2QixHQUFHOzs7O1FBQUMsVUFBQSxZQUFZLElBQUksT0FBQSxJQUFJLGtCQUFLLFlBQVksRUFBSyxDQUFDLENBQUMsZUFBZSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQWhGLENBQWdGLEVBQUMsQ0FDdEcsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsd0VBQXNDOzs7O0lBQXRDLFVBQXVDLGVBQXdDO1FBQS9FLGlCQUlDO1FBSEMsT0FBTyxJQUFJLENBQUMsOEJBQThCLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUM5RCxTQUFTOzs7O1FBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsOEJBQThCLENBQUMsT0FBTyxDQUFDLEVBQTVDLENBQTRDLEVBQUMsQ0FDbkUsQ0FBQTtJQUNILENBQUM7Ozs7O0lBR0QsZ0VBQThCOzs7O0lBQTlCLFVBQStCLE9BQWlCO1FBRGhELGlCQThDQztRQTVDQyxPQUFPLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2xHLEdBQUc7Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FBQyxFQUFsQixDQUFrQixFQUFDLEVBQzVCLFNBQVM7Ozs7UUFBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLEtBQUksQ0FBQyxDQUFDLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDO2FBQzNELElBQUksQ0FDSCxHQUFHOzs7O1FBQUMsVUFBQSxXQUFXLElBQUksT0FBQSxXQUFXO2FBQzNCLE1BQU07Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBdkIsQ0FBdUIsRUFBQzthQUNwQyxHQUFHOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDO1lBQ1QsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVO1lBQ3hCLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDckQsZUFBZSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVc7WUFDcEQsVUFBVSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVTtTQUNsQyxDQUFDLEVBTFEsQ0FLUixFQUFDLEVBUGMsQ0FPZCxFQUFDLEVBQ04sU0FBUzs7OztRQUFDLFVBQUEsS0FBSztZQUNiLElBQUksTUFBTSxFQUFFO2dCQUNWLGlEQUFpRDtnQkFDakQsU0FBUyxDQUFDLDBDQUEwQyxDQUFDLEdBQUc7Ozs7Z0JBQUMsVUFBQSxVQUFVO29CQUNqRSxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUNULFVBQVUsWUFBQTt3QkFDVixnQkFBZ0IsRUFBRSxPQUFPO3dCQUN6QixlQUFlLEVBQUUsU0FBUyxDQUFDLHVCQUF1Qjt3QkFDbEQsVUFBVSxFQUFFLElBQUk7cUJBQ2pCLENBQUMsQ0FBQTtnQkFDSixDQUFDLEVBQUMsQ0FBQTthQUNIO1lBRUQsT0FBTyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsR0FBRzs7OztZQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQ2pFLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLGdCQUFnQixFQUNyQixJQUFJLENBQUMsZUFBZSxDQUNyQixDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxLQUFLOztvQkFDUixVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVU7O29CQUM1QixDQUFDLEdBQW1CO29CQUN4QixVQUFVLFlBQUE7b0JBQ1YsS0FBSyxPQUFBO29CQUNMLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDbkIsZ0JBQWdCLEVBQUUsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7aUJBQ3RFO2dCQUNELE9BQU8sQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxFQUFDLENBQUMsRUFiMkMsQ0FhM0MsRUFBQyxDQUFDLENBQUM7UUFDUixDQUFDLEVBQUMsQ0FBQyxFQXJDYSxDQXFDYixFQUFDLENBQ1QsRUF4Q2tELENBd0NsRCxFQUdBLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsT0FBTyxDQUFpQixDQUFDLENBQUMsRUFBMUIsQ0FBMEIsRUFBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFHRCxzRUFBb0M7Ozs7SUFBcEMsVUFBcUMsS0FBMEI7UUFDN0QsT0FBTyxvQkFBb0IsQ0FDekI7WUFDRSxJQUFJLENBQUMsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUM7WUFDcEUsSUFBSSxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDO1NBQ3JFLENBQ0YsQ0FBQyxJQUFJLENBQ0osR0FBRzs7OztRQUFDLFVBQUMsRUFBVTtnQkFBViwwQkFBVSxFQUFULFdBQUcsRUFBRSxXQUFHO1lBQU0sT0FBQSxJQUFJLGtCQUFLLEdBQUcsRUFBSyxHQUFHLEVBQUU7UUFBdEIsQ0FBc0IsRUFBQyxDQUM1QyxDQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxzRUFBb0M7Ozs7SUFBcEMsVUFBcUMsTUFBdUM7UUFBNUUsaUJBV0M7UUFWQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQ2hCLFNBQVM7Ozs7UUFBQyxVQUFBLEtBQUssSUFBSSxPQUFBLG9CQUFvQixDQUNyQztZQUNFLEtBQUksQ0FBQyxDQUFDLENBQUMsNkJBQTZCLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQztZQUNwRSxLQUFJLENBQUMsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUM7U0FDckUsQ0FDRixDQUFDLElBQUksQ0FDSixHQUFHOzs7O1FBQUMsVUFBQyxFQUFVO2dCQUFWLDBCQUFVLEVBQVQsV0FBRyxFQUFFLFdBQUc7WUFBTSxPQUFBLElBQUksa0JBQUssR0FBRyxFQUFLLEdBQUcsRUFBRTtRQUF0QixDQUFzQixFQUFDLENBQzVDLEVBUGtCLENBT2xCLEVBQUMsQ0FDSCxDQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFJRCxxREFBbUI7Ozs7SUFBbkIsVUFBb0IsV0FBZ0Q7UUFBcEUsaUJBa0JDO1FBakJDLE9BQU8sV0FBVyxDQUFDLElBQUk7UUFDckIsdUZBQXVGO1FBQ3ZGLG9CQUFvQjs7Ozs7UUFBMEIsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUNqRCxPQUFPLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxFQUFDLEVBQ0YsU0FBUzs7OztRQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDekUsSUFBSSxDQUNILE1BQU07Ozs7UUFBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLENBQUMsQ0FBQyxHQUFHLEVBQUwsQ0FBSyxFQUFDLEVBQ3RCLFNBQVM7Ozs7UUFBQyxVQUFBLFdBQVcsSUFBSSxPQUFBLEtBQUksQ0FBQyxDQUFDLENBQUMsNkJBQTZCLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUM3RSxTQUFTOzs7O1FBQUMsVUFBQSxZQUFZOztnQkFDZCxPQUFPLEdBQUcsSUFBSSxrQkFBSyxZQUFZLEVBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxFQUFFO1lBQzdELE9BQU8sS0FBSSxDQUFDLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3JELENBQUMsRUFBQyxDQUFDLEVBSm9CLENBSXBCLEVBQ0osQ0FDRixFQVRjLENBU2QsRUFDRixDQUNGLENBQUM7SUFDSixDQUFDOztnQkF0NENGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBWFEsNEJBQTRCO2dCQUY1Qix5QkFBeUI7Z0JBR3pCLHNCQUFzQjtnQkFGdEIseUJBQXlCO2dCQWxDc0UsaUJBQWlCO2dCQUFFLFlBQVk7Z0JBTjlILE9BQU87OztJQWt4Q2Q7UUFGQyxNQUFNO1FBQ04sS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7O3NFQUsxQjtJQUlEO1FBRkMsTUFBTTtRQUNOLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7OzsrRUFLMUI7SUFJRDtRQUZDLE1BQU07UUFDTixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OztnREFDK0QsVUFBVTt3RUFnQ25HO0lBMEJEO1FBREMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7Z0RBQ3dCLFVBQVU7aUZBNkM1RDtJQUdEO1FBREMsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7Z0RBQ3VDLFVBQVU7dUZBUzNFO2tDQXQ1Q0g7Q0EyN0NDLEFBeDRDRCxJQXc0Q0M7U0F4M0NZLHVCQUF1Qjs7O0lBRWxDLDBDQUFxQjs7Ozs7SUFHbkIsb0NBQXVDOzs7OztJQUN2QyxvQ0FBb0M7Ozs7O0lBQ3BDLG9DQUFpQzs7Ozs7SUFDakMsb0NBQW9DOztJQUNwQyxvREFBMkM7Ozs7O0lBQzNDLCtDQUFrQzs7Ozs7OztBQWczQ3RDLE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxVQUFrQixFQUFFLFVBQW1CO0lBQzVFLE9BQU8sR0FBRyxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaENvbmZpZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItY29uZmlnJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgSW5mU3RhdGVtZW50IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEd2U3ViZmllbGRQYWdlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IENhbGVuZGFyVHlwZSwgY29tYmluZUxhdGVzdE9yRW1wdHksIEdyYW51bGFyaXR5LCBsaW1pdFRvLCBzb3J0QWJjLCBzd2l0Y2hNYXBPciwgVGltZVByaW1pdGl2ZSwgVGltZVByaW1pdGl2ZVBpcGUsIFRpbWVTcGFuUGlwZSwgVGltZVNwYW5VdGlsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBlcXVhbHMsIGZsYXR0ZW4sIGdyb3VwQnksIHBpY2ssIHVuaXEsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgZW1wdHksIGlpZiwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhZyB9IGZyb20gJ3J4anMtc3B5L29wZXJhdG9ycyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjYWNoZSwgc3B5VGFnIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9tZXRob2QtZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyB0aW1lU3Bhbkl0ZW1Ub1RpbWVTcGFuIH0gZnJvbSAnLi4vZnVuY3Rpb25zL2Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBBcHBlbGxhdGlvbkl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvQXBwZWxsYXRpb25JdGVtJztcbmltcG9ydCB7IEJhc2ljU3RhdGVtZW50SXRlbSB9IGZyb20gJy4uL21vZGVscy9CYXNpY1N0YXRlbWVudEl0ZW0nO1xuaW1wb3J0IHsgQ2xhc3NBbmRUeXBlTm9kZSB9IGZyb20gJy4uL21vZGVscy9DbGFzc0FuZFR5cGVOb2RlJztcbmltcG9ydCB7IENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL0NsYXNzQW5kVHlwZVNlbGVjdE1vZGVsJztcbmltcG9ydCB7IEN0cmxUaW1lU3BhbkRpYWxvZ1Jlc3VsdCB9IGZyb20gJy4uL21vZGVscy9DdHJsVGltZVNwYW5EaWFsb2dSZXN1bHQnO1xuaW1wb3J0IHsgRGltZW5zaW9uSXRlbSB9IGZyb20gJy4uL21vZGVscy9EaW1lbnNpb25JdGVtJztcbmltcG9ydCB7IEVudGl0eVByZXZpZXdJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0VudGl0eVByZXZpZXdJdGVtJztcbmltcG9ydCB7IEVudGl0eVByb3BlcnRpZXMgfSBmcm9tICcuLi9tb2RlbHMvRW50aXR5UHJvcGVydGllcyc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL21vZGVscy9GaWVsZCc7XG5pbXBvcnQgeyBJdGVtTGlzdCB9IGZyb20gJy4uL21vZGVscy9JdGVtTGlzdCc7XG5pbXBvcnQgeyBMYW5nU3RyaW5nSXRlbSB9IGZyb20gJy4uL21vZGVscy9MYW5nU3RyaW5nSXRlbSc7XG5pbXBvcnQgeyBMYW5ndWFnZUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvTGFuZ3VhZ2VJdGVtJztcbmltcG9ydCB7IFBsYWNlSXRlbSB9IGZyb20gJy4uL21vZGVscy9QbGFjZUl0ZW0nO1xuaW1wb3J0IHsgUHJvcGVydHlPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvUHJvcGVydHlPcHRpb24nO1xuaW1wb3J0IHsgUHJvcGVydHlTZWxlY3RNb2RlbCB9IGZyb20gJy4uL21vZGVscy9Qcm9wZXJ0eVNlbGVjdE1vZGVsJztcbmltcG9ydCB7IFN0YXRlbWVudEl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvU3RhdGVtZW50SXRlbSc7XG5pbXBvcnQgeyBTdGF0ZW1lbnRQcm9qUmVsLCBTdGF0ZW1lbnRUYXJnZXQsIFN0YXRlbWVudFdpdGhUYXJnZXQgfSBmcm9tICcuLi9tb2RlbHMvU3RhdGVtZW50V2l0aFRhcmdldCc7XG5pbXBvcnQgeyBTdWJmaWVsZCB9IGZyb20gJy4uL21vZGVscy9TdWJmaWVsZCc7XG5pbXBvcnQgeyBTdWJmaWVsZFR5cGUgfSBmcm9tICcuLi9tb2RlbHMvU3ViZmllbGRUeXBlJztcbmltcG9ydCB7IFRlbXBvcmFsRW50aXR5Q2VsbCB9IGZyb20gJy4uL21vZGVscy9UZW1wb3JhbEVudGl0eUNlbGwnO1xuaW1wb3J0IHsgVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vbW9kZWxzL1RlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcyc7XG5pbXBvcnQgeyBUZW1wb3JhbEVudGl0eVJvdyB9IGZyb20gJy4uL21vZGVscy9UZW1wb3JhbEVudGl0eVJvdyc7XG5pbXBvcnQgeyBUaW1lUHJpbWl0aXZlSXRlbSB9IGZyb20gJy4uL21vZGVscy9UaW1lUHJpbWl0aXZlSXRlbSc7XG5pbXBvcnQgeyBUaW1lU3Bhbkl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvVGltZVNwYW5JdGVtJztcbmltcG9ydCB7IFRpbWVTcGFuUHJvcGVydHkgfSBmcm9tICcuLi9tb2RlbHMvVGltZVNwYW5Qcm9wZXJ0eSc7XG5pbXBvcnQgeyBJbmZNb2RlbE5hbWUsIEluZlNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2luZi5zZXJ2aWNlJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UgfSBmcm9tICcuL2FjdGl2ZS1wcm9qZWN0LXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvblBpcGVzU2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEluZm9ybWF0aW9uQmFzaWNQaXBlc1NlcnZpY2UgfSBmcm9tICcuL2luZm9ybWF0aW9uLWJhc2ljLXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NoZW1hU2VsZWN0b3JzU2VydmljZSB9IGZyb20gJy4vc2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlJztcblxuXG5cblxuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIFRoaXMgU2VydmljZSBwcm92aWRlcyBhIGNvbGxlY2lvbiBvZiBwaXBlcyB0aGF0IGFnZ3JlZ2F0ZSBvciB0cmFuc2Zvcm0gaW5mb3JtYXRpb24uXG4gKiBGb3IgRXhhbXBsZVxuICogLSB0aGUgbGlzdHMgb2YgdGV4dCBwcm9wZXJ0aWVzLCBhcHBlbGxhaXRvbnMsIHBsYWNlcywgdGltZS1wcmltaXRpdmVzIC8gdGltZS1zcGFucyBldGMuXG4gKiAtIHRoZSBsYWJlbCBvZiB0ZW1wb3JhbCBlbnRpdHkgb3IgcGVyc2lzdGVudCBpdGVtXG4gKlxuICogVGhpcyBtYWlubHkgc2VsZWN0cyBkYXRhIGZyb20gdGhlIGluZm9ybWF0aW9uIHNjaGVtYSBhbmQgdGhlIHJlbGF0aW9uIHRvIHByb2plY3RzLlxuICogSXQgY29tYmluZXMgcGlwZXMgc2VsZWN0aW5nIGRhdGEgZnJvbSB0aGVcbiAqIC0gYWN0aXZhdGVkIHByb2plY3RcbiAqIC0gYWx0ZXJuYXRpdmVzIChub3QgaW4gcHJvamVjdCBidXQgaW4gb3RoZXJzKVxuICogLSByZXBvXG4gKlxuICovXG5leHBvcnQgY2xhc3MgSW5mb3JtYXRpb25QaXBlc1NlcnZpY2Uge1xuXG4gIGluZlJlcG86IEluZlNlbGVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYjogSW5mb3JtYXRpb25CYXNpY1BpcGVzU2VydmljZSxcbiAgICBwcml2YXRlIHA6IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzOiBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgYzogQ29uZmlndXJhdGlvblBpcGVzU2VydmljZSxcbiAgICBwdWJsaWMgdGltZVByaW1pdGl2ZVBpcGU6IFRpbWVQcmltaXRpdmVQaXBlLFxuICAgIHByaXZhdGUgdGltZVNwYW5QaXBlOiBUaW1lU3BhblBpcGUsXG4gICAgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+XG4gICkge1xuICAgIHRoaXMuaW5mUmVwbyA9IG5ldyBJbmZTZWxlY3RvcihuZ1JlZHV4LCBvZigncmVwbycpKVxuICB9XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIFBpcGUgdGhlIHByb2plY3QgZW50aXRpZXNcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0TGVuZ3RoKGw6IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICBzd2l0Y2ggKGwubGlzdFR5cGUpIHtcbiAgICAgIGNhc2UgJ2FwcGVsbGF0aW9uJzpcbiAgICAgIGNhc2UgJ2VudGl0eS1wcmV2aWV3JzpcbiAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgICAgIGNhc2UgJ3BsYWNlJzpcbiAgICAgIGNhc2UgJ2RpbWVuc2lvbic6XG4gICAgICBjYXNlICdsYW5nU3RyaW5nJzpcbiAgICAgIGNhc2UgJ3RlbXBvcmFsLWVudGl0eSc6XG4gICAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0KGwsIHBrRW50aXR5KS5waXBlKG1hcChpdGVtcyA9PiBpdGVtcy5sZW5ndGgpKVxuXG4gICAgICBjYXNlICd0aW1lLXNwYW4nOlxuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoNzIsIHBrRW50aXR5KSxcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoNzEsIHBrRW50aXR5KSxcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUwLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MSwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTIsIHBrRW50aXR5KSxcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUzLCBwa0VudGl0eSlcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIHRhcCgoeCkgPT4ge1xuXG4gICAgICAgICAgfSksXG4gICAgICAgICAgbWFwKGl0ZW1zID0+IGl0ZW1zLmZpbHRlcih4ID0+IHgubGVuZ3RoID4gMCkubGVuZ3RoKSlcblxuICAgICAgLy8gY2FzZSAndGV4dC1wcm9wZXJ0eSc6XG4gICAgICAvLyAgIHJldHVybiB0aGlzLnBpcGVMaXN0VGV4dFByb3BlcnR5KGwsIHBrRW50aXR5KS5waXBlKG1hcChpdGVtcyA9PiBpdGVtcy5sZW5ndGgpKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgICAgICAgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gICAgfVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdChsOiBTdWJmaWVsZCwgcGtFbnRpdHksIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxJdGVtTGlzdD4ge1xuICAgIGlmIChsLmxpc3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm4gdGhpcy5waXBlTGlzdEFwcGVsbGF0aW9uKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmVudGl0eVByZXZpZXcpIHJldHVybiB0aGlzLnBpcGVMaXN0RW50aXR5UHJldmlldyhsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5ndWFnZSkgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5ndWFnZShsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5wbGFjZSkgcmV0dXJuIHRoaXMucGlwZUxpc3RQbGFjZShsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5kaW1lbnNpb24pIHJldHVybiB0aGlzLnBpcGVMaXN0RGltZW5zaW9uKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmdTdHJpbmcpIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ1N0cmluZyhsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkgcmV0dXJuIHRoaXMucGlwZUxpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnRpbWVTcGFuKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVRpbWVTcGFuKHBrRW50aXR5KS5waXBlKFxuICAgICAgICBtYXAoKHRzKSA9PiBbdHNdLmZpbHRlcihpID0+IGkucHJvcGVydGllcy5sZW5ndGggPiAwKSlcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RCYXNpY1N0YXRlbWVudEl0ZW1zKGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgcGtQcm9qZWN0OiBudW1iZXIpOiBPYnNlcnZhYmxlPEJhc2ljU3RhdGVtZW50SXRlbVtdPiB7XG4gICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdCYXNpY1N0YXRlbWVudEl0ZW1zQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSwgcGtQcm9qZWN0KSA6XG4gICAgICB0aGlzLmIucGlwZUluZ29pbmdCYXNpY1N0YXRlbWVudEl0ZW1zQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSwgcGtQcm9qZWN0KVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBpdGVtcyBpbiBhcHBlbGxhdGlvbiBmaWVsZFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdEFwcGVsbGF0aW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEFwcGVsbGF0aW9uSXRlbVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICogUGlwZSB0aGUgaXRlbXMgaW4gZW50aXR5IHByZXZpZXcgZmllbGRcbiAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0RW50aXR5UHJldmlldzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWcoYGJlZm9yZS0ke3BrRW50aXR5fS0ke2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHl9LSR7bGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3N9YCksXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKVxuICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLm9yZE51bSA+IGIub3JkTnVtID8gMSA6IC0xKSxcbiAgICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKVxuICAgICAgICAgICAgKVxuICAgICAgICB9KSxcbiAgICAgICAgdGFnKGBhZnRlci0ke3BrRW50aXR5fS0ke2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHl9LSR7bGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3N9YCksXG4gICAgICApXG5cbiAgfVxuXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdExhbmd1YWdlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGl0ZW1zIGluIHBsYWNlIGxpc3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RQbGFjZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxQbGFjZUl0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1QbGFjZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBpdGVtcyBpbiBwbGFjZSBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0RGltZW5zaW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1EaW1lbnNpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAqIFBpcGUgdGhlIGl0ZW1zIGluIGxhbmdTdHJpbmcgbGlzdFxuICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RMYW5nU3RyaW5nPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPExhbmdTdHJpbmdJdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ1N0cmluZyhyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcblxuICB9XG5cbiAgLyoqXG4gICAqIHBpcGUgdGhlIHByb2plY3QgcmVsYXRpb24gb2YgZ2l2ZW4gc3RhdG1lbnQsIGlmIHRoZSBzY29wZSBvZiB0aGlzIHBhZ2UgaXMgaW5Qcm9qZWN0XG4gICAqIEBwYXJhbSBzdG10IEluZlN0YXRlbWVudCB0byBiZSBjb21wbGV0ZWQgd2l0aCBwcm9qUmVsXG4gICAqIEBwYXJhbSBwYWdlIHBhZ2UgZm9yIHdoaWNoIHdlIGFyZSBwaXBpbmcgdGhpcyBzdHVmZlxuICAgKi9cbiAgcGlwZVByb2pSZWxPZlN0YXRlbWVudChzdG10OiBJbmZTdGF0ZW1lbnQsIHBhZ2U6IEd2U3ViZmllbGRQYWdlKTogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRQcm9qUmVsPiB7XG4gICAgaWYgKHBhZ2Uuc2NvcGUuaW5Qcm9qZWN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JFxuICAgICAgICAua2V5KHBhZ2Uuc2NvcGUuaW5Qcm9qZWN0ICsgJ18nICsgc3RtdC5wa19lbnRpdHkpLnBpcGUoXG4gICAgICAgICAgbWFwKFxuICAgICAgICAgICAgcHJvalJlbCA9PiAoe1xuICAgICAgICAgICAgICBwcm9qUmVsLFxuICAgICAgICAgICAgICBvcmROdW06IHBhZ2UuaXNPdXRnb2luZyA/IHByb2pSZWwub3JkX251bV9vZl9yYW5nZSA6IHByb2pSZWwub3JkX251bV9vZl9kb21haW5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBwaXBlIHRoZSB0YXJnZXQgb2YgZ2l2ZW4gc3RhdG1lbnRcbiAgICogQHBhcmFtIHN0bXQgSW5mU3RhdGVtZW50IHRvIGJlIGNvbXBsZXRlZCB3aXRoIHRhcmdldFxuICAgKiBAcGFyYW0gcGFnZSBwYWdlIGZvciB3aGljaCB3ZSBhcmUgcGlwaW5nIHRoaXMgc3R1ZmZcbiAgICogQHBhcmFtIHN1YmZpZWxkVHlwZSB0eXBlIG9mIHN1YmZpZWxkIGZvciB3aGljaCB3ZSBwaXBlIHRoaXMgc3R1cHBcbiAgICovXG4gIHBpcGVUYXJnZXRPZlN0YXRlbWVudChzdG10OiBJbmZTdGF0ZW1lbnQsIHBhZ2U6IEd2U3ViZmllbGRQYWdlLCBzdWJmaWVsZFR5cGU6IFN1YmZpZWxkVHlwZSk6IE9ic2VydmFibGU8U3RhdGVtZW50VGFyZ2V0PiB7XG4gICAgY29uc3QgaXNPdXRnb2luZyA9IHBhZ2UuaXNPdXRnb2luZ1xuICAgIGNvbnN0IHRhcmdldEluZm8gPSBpc091dGdvaW5nID8gc3RtdC5ma19vYmplY3RfaW5mbyA6IHN0bXQuZmtfc3ViamVjdF9pbmZvO1xuICAgIC8vIGhlcmUgeW91IGNvdWxkIGFkZCB0YXJnZXREYXRhIG9yIHRhcmdldENlbGxcblxuICAgIGlmIChzdWJmaWVsZFR5cGUuYXBwZWxsYXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5hcHBlbGxhdGlvbiQuYnlfcGtfZW50aXR5JC5rZXkodGFyZ2V0SW5mbykucGlwZShcbiAgICAgICAgbWFwKGFwcGVsbGF0aW9uID0+IHtcbiAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IGFwcGVsbGF0aW9uLnN0cmluZyxcbiAgICAgICAgICAgIHRhcmdldENsYXNzOiBhcHBlbGxhdGlvbi5ma19jbGFzcyxcbiAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICBhcHBlbGxhdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUudGVtcG9yYWxFbnRpdHkpIHtcbiAgICAgIC8vIHBpcGUgdGhlIHN1YmZpZWxkcyBvZiB0aGUgdGVtcG9yYWxFbnRpdHkgY2xhc3NcbiAgICAgIC8vIGlmIHRoZSBzdWJmaWVsZFR5cGVzIG9mIHRoZXNlIGFyZSB0ZW1wb3JhbEVudGl0eSBhZ2FpbiwgcmVwbGFjZSBpdCB3aXRoIGVudGl0eVByZXZpZXdcbiAgICAgIC8vIGluIG9yZGVyIHRvIHByZXZlbnQgaW5maW5pdCBjeWNsZVxuXG4gICAgICAvLyBmb3IgZWFjaCBvZiB0aGVzZSBzdWJmaWVsZHNcbiAgICAgIC8vIC0gY3JlYXRlIHBhZ2U6R3ZTdWJmaWVsZFBhZ2VcbiAgICAgIC8vIC0gY2FsbCB0aGlzLnBpcGVTdWJmaWVsZFBhZ2UocGFnZSwgc3ViZmllbGRUeXBlKVxuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihgTm8gaW1wbGVtZW50YXRpb24gZm91bmQgZm9yIHN1YmZpZWxkVHlwZSAke0pTT04uc3RyaW5naWZ5KHN1YmZpZWxkVHlwZSl9YCk7XG4gIH1cblxuICAvKipcbiAgICogcGlwZSB0YXJnZXQgYW5kIHByb2pSZWwgb2YgdGhlIGdpdmVuIHN0YXRlbWVudFxuICAgKi9cbiAgcGlwZVN0YXRlbWVudFdpdGhUYXJnZXQoc3RtdDogSW5mU3RhdGVtZW50LCBwYWdlOiBHdlN1YmZpZWxkUGFnZSwgc3ViZmllbGRUeXBlOiBTdWJmaWVsZFR5cGUpOiBPYnNlcnZhYmxlPFN0YXRlbWVudFdpdGhUYXJnZXQ+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZVRhcmdldE9mU3RhdGVtZW50KHN0bXQsIHBhZ2UsIHN1YmZpZWxkVHlwZSksXG4gICAgICB0aGlzLnBpcGVQcm9qUmVsT2ZTdGF0ZW1lbnQoc3RtdCwgcGFnZSlcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFt0YXJnZXQsIHByb2pSZWxdKSA9PiAoeyAuLi50YXJnZXQsIC4uLnByb2pSZWwgfSkpXG4gICAgKVxuICB9XG5cbiAgcGlwZVN1YmZpZWxkUGFnZShwYWdlOiBHdlN1YmZpZWxkUGFnZSwgc3ViZmllbGRUeXBlOiBTdWJmaWVsZFR5cGUpOiBPYnNlcnZhYmxlPFN0YXRlbWVudFdpdGhUYXJnZXRbXT4ge1xuICAgIC8vIGdldCB0aGUgc3RhdG1lbnRzIG9mIHRoYXQgcGFnZVxuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kLnBpcGVQYWdlKHBhZ2UpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKFxuICAgICAgICAgIHBrU3RtdHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgICAgICBwa1N0bXRzLm1hcChwa1N0bXQgPT4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9wa19lbnRpdHkkLmtleShwa1N0bXQpXG4gICAgICAgICAgICAgIC8vIGZvciBlYWNoIHN0YXRlbWVudCwgZGVwZW5kaW5nIG9uIHRoZSBzdWJmaWVsZFR5cGUsIGxvYWQgdGhlIGNvcnJlc3BvbmRpbmcgdGFyZ2V0XG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcChzdG10ID0+IHRoaXMucGlwZVN0YXRlbWVudFdpdGhUYXJnZXQoc3RtdCwgcGFnZSwgc3ViZmllbGRUeXBlKSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICB9XG5cbiAgLy8gcGlwZVN0YXRlbWVudExpc3RQYWdlKFxuICAvLyAgIHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLFxuICAvLyAgIGxpbWl0OiBudW1iZXIsXG4gIC8vICAgb2Zmc2V0OiBudW1iZXIsXG4gIC8vICAgcGtQcm9qZWN0OiBudW1iZXIsXG4gIC8vICAgbGlzdERlZmluaXRpb246IFN1YmZpZWxkLFxuICAvLyAgIGFsdGVybmF0aXZlID0gZmFsc2UpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAvLyAgIC8vIHByZXBhcmUgcGFnZSBsb2FkZXJcbiAgLy8gICBjb25zdCBwYWdlTG9hZGVyJCA9IGFsdGVybmF0aXZlID8gdGhpcy5pbmZSZXBvLnN0YXRlbWVudCQucGFnaW5hdGlvbiQgOiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kO1xuXG4gIC8vICAgLy8gcHJlcGFyZSBiYXNpYyBzdGF0ZW1lbnQgaXRlbSBsb2FkZXJcbiAgLy8gICBjb25zdCBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIgPSAocGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcsIHBrUHJvaikgPT4ge1xuICAvLyAgICAgcmV0dXJuIGFsdGVybmF0aXZlID9cbiAgLy8gICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcpIDpcbiAgLy8gICAgICAgdGhpcy5iLnBpcGVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrUHJvaiwgcGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcpXG4gIC8vICAgfVxuXG4gIC8vICAgY29uc3QgcGFnaW5hdGVkU3RhdGVtZW50UGtzJCA9IHBhZ2VMb2FkZXIkLnBpcGVQYWdlKHBhZ2luYXRlQnksIGxpbWl0LCBvZmZzZXQpXG5cbiAgLy8gICByZXR1cm4gcGFnaW5hdGVkU3RhdGVtZW50UGtzJC5waXBlKFxuICAvLyAgICAgc3dpdGNoTWFwKChwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MpID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAvLyAgICAgICBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MubWFwKHBrU3RhdGVtZW50ID0+IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlcihwa1N0YXRlbWVudCwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZywgcGtQcm9qZWN0KVxuICAvLyAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgLy8gICAgICAgICAgIHN3aXRjaE1hcCh4ID0+IHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KHguaXNPdXRnb2luZyA/IHguc3RhdGVtZW50LmZrX29iamVjdF9pbmZvIDogeC5zdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKVxuICAvLyAgICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgICBtYXAoKHByZXZpZXcpID0+IHtcbiAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IEVudGl0eVByZXZpZXdJdGVtID0ge1xuICAvLyAgICAgICAgICAgICAgICAgICAuLi54LFxuICAvLyAgICAgICAgICAgICAgICAgICBwcmV2aWV3LFxuICAvLyAgICAgICAgICAgICAgICAgICBma0NsYXNzOiBwcmV2aWV3LmZrX2NsYXNzXG4gIC8vICAgICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgLy8gICAgICAgICAgICAgICB9KVxuICAvLyAgICAgICAgICAgICApXG4gIC8vICAgICAgICAgICApKVxuXG4gIC8vICAgICAgIClcbiAgLy8gICAgIClcbiAgLy8gICAgICkpXG5cbiAgLy8gfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIHRlbXBvcmFsIGVudGl0aWVzIGNvbm5lY3RlZCB0byBnaXZlbiBlbnRpdHkgYnkgc3RhdGVtZW50cyB0aGF0IGFyZSBpbiB0aGUgY3VycmVudCBwcm9qZWN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIC8vIHBpcGVUZW1wb3JhbEVudGl0eVRhYmxlUm93cyhcbiAgLy8gICBwYWdpbmF0ZUJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSxcbiAgLy8gICBsaW1pdDogbnVtYmVyLFxuICAvLyAgIG9mZnNldDogbnVtYmVyLFxuICAvLyAgIHBrUHJvamVjdDogbnVtYmVyLFxuICAvLyAgIGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCxcbiAgLy8gICBmaWVsZERlZmluaXRpb25zOiBGaWVsZFtdLFxuICAvLyAgIGFsdGVybmF0aXZlID0gZmFsc2UpOiBPYnNlcnZhYmxlPFRlbXBvcmFsRW50aXR5SXRlbVtdPiB7XG5cbiAgLy8gICAvLyBjb25zdCBwcm9wZXJ0eUl0ZW1UeXBlID0gdGhpcy5wcm9wZXJ0eUl0ZW1UeXBlKGZpZWxkRGVmaW5pdGlvbnMpXG5cbiAgLy8gICBjb25zdCB0YXJnZXRFbnRpdHlPZlN0YXRlbWVudEl0ZW0gPSAocjogQmFzaWNTdGF0ZW1lbnRJdGVtKSA9PiByLmlzT3V0Z29pbmcgPyByLnN0YXRlbWVudC5ma19vYmplY3RfaW5mbyA6IHIuc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbztcblxuICAvLyAgIC8vIHByZXBhcmUgcGFnZSBsb2FkZXJcbiAgLy8gICBjb25zdCBwYWdlTG9hZGVyJCA9IGFsdGVybmF0aXZlID8gdGhpcy5pbmZSZXBvLnN0YXRlbWVudCQucGFnaW5hdGlvbiQgOiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kO1xuXG4gIC8vICAgLy8gcHJlcGFyZSBiYXNpYyBzdGF0ZW1lbnQgaXRlbSBsb2FkZXJcbiAgLy8gICBjb25zdCBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIgPSAocGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcsIHBrUHJvaikgPT4ge1xuICAvLyAgICAgcmV0dXJuIGFsdGVybmF0aXZlID9cbiAgLy8gICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcpIDpcbiAgLy8gICAgICAgdGhpcy5iLnBpcGVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrUHJvaiwgcGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcpXG4gIC8vICAgfVxuXG4gIC8vICAgLy8gcHJlcGFyZSBUZUVuUm93IGxvYWRlclxuICAvLyAgIGNvbnN0IHJvd0xvYWRlciA9ICh0YXJnZXRFbnRpdHlQaywgZmllbGREZWYsIHBrUHJvaikgPT4ge1xuICAvLyAgICAgcmV0dXJuIGFsdGVybmF0aXZlID9cbiAgLy8gICAgICAgdGhpcy5waXBlSXRlbVRlRW5Sb3codGFyZ2V0RW50aXR5UGssIGZpZWxkRGVmLCBudWxsLCB0cnVlKSA6XG4gIC8vICAgICAgIHRoaXMucGlwZUl0ZW1UZUVuUm93KHRhcmdldEVudGl0eVBrLCBmaWVsZERlZiwgcGtQcm9qLCBmYWxzZSlcbiAgLy8gICB9XG5cbiAgLy8gICBjb25zdCBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkID0gcGFnZUxvYWRlciQucGlwZVBhZ2UocGFnaW5hdGVCeSwgbGltaXQsIG9mZnNldClcblxuICAvLyAgIGNvbnN0IHJvd3MkID0gcGFnaW5hdGVkU3RhdGVtZW50UGtzJC5waXBlKFxuICAvLyAgICAgc3dpdGNoTWFwKChwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MpID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAvLyAgICAgICBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MubWFwKHBrU3RhdGVtZW50ID0+IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlcihwa1N0YXRlbWVudCwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZywgcGtQcm9qZWN0KVxuICAvLyAgICAgICAgIC5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gIC8vICAgICAgIClcbiAgLy8gICAgIClcbiAgLy8gICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgc3dpdGNoTWFwKCh0ZUVuU3RhdGVtZW50KSA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgLy8gICAgICAgICAgIHRlRW5TdGF0ZW1lbnQubWFwKChiYXNpY1N0YXRlbWVudEl0ZW0pID0+IHtcbiAgLy8gICAgICAgICAgICAgY29uc3QgcGtUZUVuID0gdGFyZ2V0RW50aXR5T2ZTdGF0ZW1lbnRJdGVtKGJhc2ljU3RhdGVtZW50SXRlbSk7XG4gIC8vICAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAvLyAgICAgICAgICAgICAgIHJvd0xvYWRlcihcbiAgLy8gICAgICAgICAgICAgICAgIHBrVGVFbixcbiAgLy8gICAgICAgICAgICAgICAgIGZpZWxkRGVmaW5pdGlvbnMsXG4gIC8vICAgICAgICAgICAgICAgICAvLyBwcm9wZXJ0eUl0ZW1UeXBlLFxuICAvLyAgICAgICAgICAgICAgICAgcGtQcm9qZWN0XG4gIC8vICAgICAgICAgICAgICAgKSxcbiAgLy8gICAgICAgICAgICAgICB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkLmtleShwa1Byb2plY3QgKyAnXycgKyBwa1RlRW4pXG4gIC8vICAgICAgICAgICAgICkucGlwZShcbiAgLy8gICAgICAgICAgICAgICBtYXAoKFtyb3csIHRlRW5Qcm9qUmVsXSkgPT4ge1xuICAvLyAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogVGVtcG9yYWxFbnRpdHlJdGVtID0ge1xuICAvLyAgICAgICAgICAgICAgICAgICAuLi5iYXNpY1N0YXRlbWVudEl0ZW0sXG4gIC8vICAgICAgICAgICAgICAgICAgIHJvdyxcbiAgLy8gICAgICAgICAgICAgICAgICAgcGtFbnRpdHk6IHBrVGVFbixcbiAgLy8gICAgICAgICAgICAgICAgICAgdGVFblByb2pSZWxcbiAgLy8gICAgICAgICAgICAgICAgIH07XG4gIC8vICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVxuICAvLyAgICAgICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICAgIClcbiAgLy8gICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgKSksXG4gIC8vICAgICAgICkpLFxuXG4gIC8vICAgKVxuICAvLyAgIHJldHVybiByb3dzJFxuICAvLyB9XG5cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1UZUVuUm93KHBrRW50aXR5OiBudW1iZXIsIGZpZWxkRGVmaW5pdGlvbnM6IEZpZWxkW10sIHBrUHJvamVjdDogbnVtYmVyLCByZXBvOiBib29sZWFuKTogT2JzZXJ2YWJsZTxUZW1wb3JhbEVudGl0eVJvdz4ge1xuXG4gICAgLy8gcGlwZSBvdXRnb2luZyBzdGF0ZW1lbnRzXG4gICAgY29uc3Qgb3V0Z29pbmdTdGF0ZW1lbnRzJCA9IHJlcG8gPyB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpIDogdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpO1xuICAgIC8vIHBpcGUgaW5nb2luZyBzdGF0ZW1lbnRzXG4gICAgY29uc3QgaW5nb2luZ1N0YXRlbWVudHMkID0gcmVwbyA/IHRoaXMuYi5waXBlUmVwb0luZ29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KSA6IHRoaXMuYi5waXBlSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpO1xuXG5cbiAgICAvLyBwaXBlIGFsbCBzdGF0ZW1lbnRzIHdpdGggaW5mb3JtYXRpb24gbGVhZiBpdGVtc1xuXG4gICAgY29uc3Qgb3V0Z29pbmdJdGVtcyQ6IE9ic2VydmFibGU8U3RhdGVtZW50SXRlbVtdPiA9IG91dGdvaW5nU3RhdGVtZW50cyQucGlwZShcbiAgICAgIHN3aXRjaE1hcChzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBzdGF0ZW1lbnRzXG4gICAgICAgICAgLmZpbHRlcihzdGF0ZW1lbnQgPT4gISFzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pIC8vIHJlbW92ZSBzdGF0ZW1lbnRzIG5vdCBwb2ludGluZyB0byBpbmZvcm1hdGlvblxuICAgICAgICAgIC5tYXAocyA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc091dGdvaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtKHMsIHBrUHJvamVjdCwgaXNPdXRnb2luZyk7XG4gICAgICAgICAgfSlcbiAgICAgICkpXG5cbiAgICApXG4gICAgY29uc3QgaW5nb2luZ0l0ZW1zJDogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRJdGVtW10+ID0gaW5nb2luZ1N0YXRlbWVudHMkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgc3RhdGVtZW50c1xuICAgICAgICAgIC5maWx0ZXIoc3RhdGVtZW50ID0+ICEhc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbykgLy8gcmVtb3ZlIHN0YXRlbWVudHMgbm90IHBvaW50aW5nIHRvIGluZm9ybWF0aW9uXG4gICAgICAgICAgLm1hcChzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzT3V0Z29pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtKHMsIHBrUHJvamVjdCwgaXNPdXRnb2luZyk7XG4gICAgICAgICAgfSlcbiAgICAgICkpXG5cbiAgICApXG5cbiAgICBjb25zdCBzb3J0SXRlbXMgPSByZXBvID9cbiAgICAgIChpdGVtOiBTdGF0ZW1lbnRJdGVtW10pID0+IGl0ZW0uc29ydCgoYSwgYikgPT4gYS5zdGF0ZW1lbnQuaXNfaW5fcHJvamVjdF9jb3VudCA+IGIuc3RhdGVtZW50LmlzX2luX3Byb2plY3RfY291bnQgPyAxIDogLTEpIDpcbiAgICAgIChpdGVtOiBTdGF0ZW1lbnRJdGVtW10pID0+IGl0ZW07XG5cblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KG91dGdvaW5nSXRlbXMkLCBpbmdvaW5nSXRlbXMkKS5waXBlKFxuXG4gICAgICBtYXAoKFtvdXRnb2luZ0l0ZW1zLCBpbmdvaW5nSXRlbXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IGdyb3VwZWRPdXQgPSBncm91cEJ5KChpKSA9PiAoaSAmJiBpLnN0YXRlbWVudCA/IGkuc3RhdGVtZW50LmZrX3Byb3BlcnR5LnRvU3RyaW5nKCkgOiB1bmRlZmluZWQpLCBvdXRnb2luZ0l0ZW1zKTtcbiAgICAgICAgY29uc3QgZ3JvdXBlZEluID0gZ3JvdXBCeSgoaSkgPT4gKGkgJiYgaS5zdGF0ZW1lbnQgPyBpLnN0YXRlbWVudC5ma19wcm9wZXJ0eS50b1N0cmluZygpIDogdW5kZWZpbmVkKSwgaW5nb2luZ0l0ZW1zKTtcbiAgICAgICAgcmV0dXJuIHsgZ3JvdXBlZE91dCwgZ3JvdXBlZEluIH1cbiAgICAgIH0pLFxuICAgICAgLy8gYXVkaXRUaW1lKDEwKSxcbiAgICAgIG1hcCgoZCkgPT4ge1xuICAgICAgICBjb25zdCByb3c6IFRlbXBvcmFsRW50aXR5Um93ID0ge31cblxuICAgICAgICBmaWVsZERlZmluaXRpb25zLmZvckVhY2goZmllbGREZWZpbml0aW9uID0+IHtcblxuICAgICAgICAgIGxldCBjZWxsOiBUZW1wb3JhbEVudGl0eUNlbGw7XG4gICAgICAgICAgZmllbGREZWZpbml0aW9uLmxpc3REZWZpbml0aW9ucy5mb3JFYWNoKGxpc3REZWZpbml0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChsaXN0RGVmaW5pdGlvbi5saXN0VHlwZS50aW1lU3Bhbikge1xuXG4gICAgICAgICAgICAgIGNvbnN0IHQgPSBwaWNrKFsnNzEnLCAnNzInLCAnMTUwJywgJzE1MScsICcxNTInLCAnMTUzJ10sIGQuZ3JvdXBlZE91dCk7XG4gICAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0KTtcbiAgICAgICAgICAgICAgY29uc3QgaXRlbXNDb3VudCA9IGtleXMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgIGxldCBsYWJlbDtcbiAgICAgICAgICAgICAgaWYgKGl0ZW1zQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZVNwYW5LZXlzOiBDdHJsVGltZVNwYW5EaWFsb2dSZXN1bHQgPSB7fVxuICAgICAgICAgICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4geyB0aW1lU3BhbktleXNba2V5XSA9IHRba2V5XVswXS50aW1lUHJpbWl0aXZlIH0pXG4gICAgICAgICAgICAgICAgY29uc3QgdGltZVNwYW4gPSBUaW1lU3BhblV0aWwuZnJvbVRpbWVTcGFuRGlhbG9nRGF0YSh0aW1lU3BhbktleXMpO1xuICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy50aW1lU3BhblBpcGUudHJhbnNmb3JtKHRpbWVTcGFuKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjZWxsID0ge1xuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgaXRlbXNDb3VudCxcbiAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICBlbnRpdHlQcmV2aWV3OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGlzVGltZVNwYW46IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuZ3JvdXBlZE91dFtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBzb3J0SXRlbXMoZC5ncm91cGVkT3V0W2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKVxuICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gaXRlbXNbMF07XG4gICAgICAgICAgICAgICAgICBjZWxsID0ge1xuICAgICAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgICBpdGVtc0NvdW50OiBpdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVByZXZpZXc6ICgoZmlyc3RJdGVtIHx8IHt9KSBhcyBFbnRpdHlQcmV2aWV3SXRlbSkucHJldmlldyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGZpcnN0SXRlbS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RJdGVtLFxuICAgICAgICAgICAgICAgICAgICBpdGVtc1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5ncm91cGVkSW5bbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gc29ydEl0ZW1zKGQuZ3JvdXBlZEluW2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKVxuICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gaXRlbXNbMF07XG4gICAgICAgICAgICAgICAgICBjZWxsID0ge1xuICAgICAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgICBpdGVtc0NvdW50OiBpdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVByZXZpZXc6ICgoZmlyc3RJdGVtIHx8IHt9KSBhcyBFbnRpdHlQcmV2aWV3SXRlbSkucHJldmlldyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGZpcnN0SXRlbS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RJdGVtLFxuICAgICAgICAgICAgICAgICAgICBpdGVtc1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSlcblxuXG4gICAgICAgICAgcm93W2ZpZWxkRGVmaW5pdGlvbi5sYWJlbF0gPSBjZWxsO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcm93XG4gICAgICB9KVxuXG5cbiAgICApXG4gIH1cblxuXG5cbiAgLy8gQHNweVRhZ1xuICBwcml2YXRlIHBpcGVJdGVtKHI6IEluZlN0YXRlbWVudCwgcGtQcm9qZWN0OiBudW1iZXIsIHByb3BJc091dGdvaW5nOiBib29sZWFuKSB7XG5cbiAgICBjb25zdCB0YXJnZXRFbnRpdHkgPSBwcm9wSXNPdXRnb2luZyA/IHIuZmtfb2JqZWN0X2luZm8gOiByLmZrX3N1YmplY3RfaW5mbztcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuZ2V0TW9kZWxPZkVudGl0eSQodGFyZ2V0RW50aXR5KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKG0gPT4ge1xuICAgICAgICBjb25zdCBtb2RlbE5hbWU6IEluZk1vZGVsTmFtZSA9IG0gPyBtLm1vZGVsTmFtZSA6IHVuZGVmaW5lZDtcbiAgICAgICAgc3dpdGNoIChtb2RlbE5hbWUpIHtcbiAgICAgICAgICBjYXNlICdhcHBlbGxhdGlvbic6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpO1xuICAgICAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2Uocik7XG4gICAgICAgICAgY2FzZSAncGxhY2UnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1QbGFjZShyKTtcbiAgICAgICAgICBjYXNlICdkaW1lbnNpb24nOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1EaW1lbnNpb24ocik7XG4gICAgICAgICAgY2FzZSAnbGFuZ19zdHJpbmcnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1MYW5nU3RyaW5nKHIpO1xuICAgICAgICAgIGNhc2UgJ3RpbWVfcHJpbWl0aXZlJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtVGltZVByaW1pdGl2ZShyLCBwa1Byb2plY3QpOyAvLyBUT0RPOiBlbWl0cyB0d2ljZVxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgcHJvcElzT3V0Z29pbmcpO1xuICAgICAgICB9XG5cblxuICAgICAgfSlcbiAgICApXG5cblxuICB9XG5cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWY6IFN1YmZpZWxkLCBma0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8RW50aXR5UHJvcGVydGllcz4ge1xuXG4gICAgaWYgKGxpc3REZWYubGlzdFR5cGUuYXBwZWxsYXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0QXBwZWxsYXRpb24obGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5sYW5ndWFnZSkge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5ndWFnZShsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLnBsYWNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdFBsYWNlKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUuZGltZW5zaW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdERpbWVuc2lvbihsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmxhbmdTdHJpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ1N0cmluZyhsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cblxuXG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5lbnRpdHlQcmV2aWV3IHx8IGxpc3REZWYubGlzdFR5cGUudGVtcG9yYWxFbnRpdHkpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0RW50aXR5UHJldmlldyhsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLnRpbWVTcGFuKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVRpbWVTcGFuKGZrRW50aXR5KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCBpdGVtcyA9IGl0ZW0ucHJvcGVydGllcy5maW5kKHAgPT4gcC5pdGVtcy5sZW5ndGggPiAwKSA/IFt7XG4gICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lU3BhblBpcGUudHJhbnNmb3JtKHRpbWVTcGFuSXRlbVRvVGltZVNwYW4oaXRlbSkpLFxuICAgICAgICAgICAgcHJvcGVydGllczogW10gLy8gVE9ETyBjaGVjayBpZiB0aGUgcHJvcGVydGllcyBvciB0aGUgaXRlbSBhcmUgcmVhbGx5IG5vdCBuZWVkZWRcbiAgICAgICAgICB9XSA6IFtdXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxpc3REZWZpbml0aW9uOiBsaXN0RGVmLFxuICAgICAgICAgICAgaXRlbXNcbiAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgIH1cbiAgICBlbHNlIHJldHVybiBvZihudWxsKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzKHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPFRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcz4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLmluZiQudGVtcG9yYWxfZW50aXR5JC5ieV9wa19lbnRpdHlfa2V5JChwa0VudGl0eSksXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3QkKHsgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eSB9KSxcbiAgICAgIHRoaXMucy5pbmYkLnRleHRfcHJvcGVydHkkLmJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfaW5kZXhlZCQocGtFbnRpdHkpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbdGVtcG9yYWxFbnRpdHksIHN0YXRlbWVudHMsIHRleHRQcm9wZXJ0aWVzXSkgPT4ge1xuICAgICAgICBjb25zdCByZXM6IFRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcyA9IHtcbiAgICAgICAgICB0ZW1wb3JhbEVudGl0eSxcbiAgICAgICAgICBzdGF0ZW1lbnRzOiBzdGF0ZW1lbnRzLFxuICAgICAgICAgIHRleHRQcm9wZXJ0aWVzOiB2YWx1ZXModGV4dFByb3BlcnRpZXMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBnZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgaXRlbXMpOiBFbnRpdHlQcm9wZXJ0aWVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGlzdERlZmluaXRpb24sXG4gICAgICBpdGVtcyxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aW1lIHNwYW4gaXRlbSBpbiB2ZXJzaW9uIG9mIHByb2plY3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1UaW1lU3Bhbihwa0VudGl0eSk6IE9ic2VydmFibGU8VGltZVNwYW5JdGVtPiB7XG5cbiAgICByZXR1cm4gdGhpcy5wLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jLnBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhcbiAgICAgICAgICBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoZmllbGREZWZzID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KGZpZWxkRGVmcy5tYXAoZmllbGREZWYgPT4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgICAgICAgICBma19wcm9wZXJ0eTogZmllbGREZWYucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwT3IoW10sIHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnMuaW5mJC50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkLmtleShwa1Byb2plY3QgKyAnXycgKyBzdGF0ZW1lbnQucGtfZW50aXR5KVxuICAgICAgICAgICAgICAgICAgKS5waXBlKG1hcCgoW2luZlRpbWVQcmltaXRpdmUsIHByb2pSZWxdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXI6ICgocHJvalJlbC5jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICBwcm9qUmVsLFxuICAgICAgICAgICAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAgICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXM6IFRpbWVTcGFuUHJvcGVydHkgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uOiBmaWVsZERlZi5saXN0RGVmaW5pdGlvbnNbMF0sIGl0ZW1zXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSkucGlwZShcbiAgICAgICAgICAgICAgbWFwKChwcm9wZXJ0aWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcHMgPSBwcm9wZXJ0aWVzLmZpbHRlcihwID0+IHAuaXRlbXMubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZXNwYW5pdGVtOiBUaW1lU3Bhbkl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZXNwYW5pdGVtXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSlcblxuICAgIClcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1BcHBlbGxhdGlvbihzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmFwcGVsbGF0aW9uJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgbWFwKGFwcGVsbGF0aW9uID0+IHtcbiAgICAgICAgaWYgKCFhcHBlbGxhdGlvbikgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG5vZGU6IEFwcGVsbGF0aW9uSXRlbSA9IHtcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgIGxhYmVsOiBhcHBlbGxhdGlvbi5zdHJpbmcsXG4gICAgICAgICAgZmtDbGFzczogYXBwZWxsYXRpb24uZmtfY2xhc3NcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtTGFuZ3VhZ2Uoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5ndWFnZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIG1hcChsYW5ndWFnZSA9PiB7XG4gICAgICAgIGlmICghbGFuZ3VhZ2UpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBub2RlOiBMYW5ndWFnZUl0ZW0gPSB7XG4gICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICBsYWJlbDogbGFuZ3VhZ2Uubm90ZXMsXG4gICAgICAgICAgZmtDbGFzczogbGFuZ3VhZ2UuZmtfY2xhc3NcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtUGxhY2Uoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5wbGFjZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIG1hcChwbGFjZSA9PiB7XG4gICAgICAgIGlmICghcGxhY2UpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBub2RlOiBQbGFjZUl0ZW0gPSB7XG4gICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICBsYWJlbDogJ1dHUzg0OiAnICsgcGxhY2UubGF0ICsgJ8KwLCAnICsgcGxhY2UubG9uZyArICfCsCcsXG4gICAgICAgICAgZmtDbGFzczogcGxhY2UuZmtfY2xhc3NcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtRGltZW5zaW9uKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmRpbWVuc2lvbiQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIHN3aXRjaE1hcCgoZGltZW5zaW9uKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhkaW1lbnNpb24uZmtfbWVhc3VyZW1lbnRfdW5pdClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChwcmV2aWV3ID0+IHtcblxuICAgICAgICAgICAgICBjb25zdCBub2RlOiBEaW1lbnNpb25JdGVtID0ge1xuICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGAke2RpbWVuc2lvbi5udW1lcmljX3ZhbHVlfSAke3ByZXZpZXcuZW50aXR5X2xhYmVsfWAsXG4gICAgICAgICAgICAgICAgZmtDbGFzczogZGltZW5zaW9uLmZrX2NsYXNzLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtTGFuZ1N0cmluZyhzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ19zdHJpbmckLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgKGxhbmdTdHJpbmcpID0+IHtcbiAgICAgICAgICBpZiAoIWxhbmdTdHJpbmcpIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpXG4gICAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleShsYW5nU3RyaW5nLmZrX2xhbmd1YWdlKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChsYW5ndWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFsYW5ndWFnZSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGxhbmdTdHJpbmcuc3RyaW5nKSBsYWJlbCA9IGxhbmdTdHJpbmcuc3RyaW5nXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGFuZ1N0cmluZy5xdWlsbF9kb2MgJiYgbGFuZ1N0cmluZy5xdWlsbF9kb2Mub3BzICYmIGxhbmdTdHJpbmcucXVpbGxfZG9jLm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsID0gbGFuZ1N0cmluZy5xdWlsbF9kb2Mub3BzLm1hcChvcCA9PiBvcC5pbnNlcnQpLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBub2RlOiBMYW5nU3RyaW5nSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICAgICAgICBma0NsYXNzOiBsYW5nU3RyaW5nLmZrX2NsYXNzLFxuICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgICAgICAgICAgICBma0xhbmd1YWdlOiBsYW5nU3RyaW5nLmZrX2xhbmd1YWdlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtRW50aXR5UHJldmlldyhzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoKGlzT3V0Z29pbmcgPyBzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8gOiBzdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKSkucGlwZShcbiAgICAgIC8vIGZpbHRlcihwcmV2aWV3ID0+ICFwcmV2aWV3LmxvYWRpbmcgJiYgISFwcmV2aWV3ICYmICEhcHJldmlldy5lbnRpdHlfdHlwZSksXG4gICAgICBtYXAocHJldmlldyA9PiB7XG4gICAgICAgIGlmICghcHJldmlldykge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vZGU6IEVudGl0eVByZXZpZXdJdGVtID0ge1xuICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgcHJldmlldyxcbiAgICAgICAgICBsYWJlbDogcHJldmlldy5lbnRpdHlfbGFiZWwgfHwgJycsXG4gICAgICAgICAgZmtDbGFzczogcHJldmlldy5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGtcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1UaW1lUHJpbWl0aXZlKHN0YXRlbWVudDogSW5mU3RhdGVtZW50LCBwa1Byb2plY3QpOiBPYnNlcnZhYmxlPFRpbWVQcmltaXRpdmVJdGVtPiB7XG4gICAgaWYgKHBrUHJvamVjdCkge1xuICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHN0YXRlbWVudC5wa19lbnRpdHkpLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICAgICkucGlwZShcbiAgICAgICAgbWFwKChbaW5mVGltZVByaW1pdGl2ZSwgcHJvalJlbF0pID0+IHtcbiAgICAgICAgICBpZiAoIWluZlRpbWVQcmltaXRpdmUpIHJldHVybiBudWxsO1xuICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgICAgICAgICAgIGNhbGVuZGFyOiAoKHByb2pSZWwuY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zdCBub2RlOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlKSxcbiAgICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgfSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmluZlJlcG8udGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShmaWx0ZXIoeCA9PiAhIXgpKS5waXBlKFxuICAgICAgICBtYXAoaW5mVGltZVByaW1pdGl2ZSA9PiB7XG4gICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgY2FsZW5kYXI6ICgoc3RhdGVtZW50LmNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnN0IG5vZGU6IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAqIFBpcGUgYWx0ZXJuYXRpdmVzIChub3QgaW4gcHJvamVjdClcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0TGVuZ3RoKGw6IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICBzd2l0Y2ggKGwubGlzdFR5cGUpIHtcbiAgICAgIGNhc2UgJ2FwcGVsbGF0aW9uJzpcbiAgICAgIGNhc2UgJ2VudGl0eS1wcmV2aWV3JzpcbiAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgICAgIGNhc2UgJ3BsYWNlJzpcbiAgICAgIGNhc2UgJ2xhbmdTdHJpbmcnOlxuICAgICAgY2FzZSAndGVtcG9yYWwtZW50aXR5JzpcbiAgICAgIGNhc2UgJ3RpbWUtc3Bhbic6XG4gICAgICAgIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0U3RhdGVtZW50cyhsLCBwa0VudGl0eSkucGlwZShtYXAoaXRlbXMgPT4gaXRlbXMubGVuZ3RoKSlcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3QobDogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJdGVtTGlzdD4ge1xuICAgIGlmIChsLmxpc3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEFwcGVsbGF0aW9uKGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZW50aXR5UHJldmlldykgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ3VhZ2UpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0TGFuZ3VhZ2UobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5wbGFjZSkgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RQbGFjZShsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmRpbWVuc2lvbikgcmV0dXJuIHRoaXMucGlwZUFsdExpc3REaW1lbnNpb24obCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5nU3RyaW5nKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdExhbmdTdHJpbmcobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5KVxuICAgIGVsc2UgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0U3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkgOlxuICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUluZ29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgdGhlIGl0ZW1zIGluIGVudGl0eSBwcmV2aWV3IGZpZWxkXG4gICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSkpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXNcbiAgICAgICAgICAgICAgLmZpbHRlcihub2RlID0+ICEhbm9kZSlcbiAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEub3JkTnVtID4gYi5vcmROdW0gPyAxIDogLTEpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgIH0pKVxuXG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gcGxhY2UgbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdFBsYWNlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtUGxhY2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBkaW1lbnNpb24gbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdERpbWVuc2lvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1EaW1lbnNpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBsYW5nU3RyaW5nIGxpc3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RMYW5nU3RyaW5nPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPExhbmdTdHJpbmdJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5nU3RyaW5nKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGFwcGVsbGF0aW9uIGZpZWxkXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBsYW5ndWFnZSBmaWVsZFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdExhbmd1YWdlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIFBpcGUgcmVwbyB2aWV3cyAoY29tbXVuaXR5IGZhdm9yaXRlcywgd2hlcmUgcmVzdHJpY3RlZCBieSBxdWFudGlmaWVycylcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAvKipcbiAgICogUGlwZSByZXBvc2l0b3J5IHRlbXBvcmFsIGVudGl0eSBpdGVtIGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBQaXBlIGFwcGVsbGF0aW9uIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvTGlzdEFwcGVsbGF0aW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEFwcGVsbGF0aW9uSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBQaXBlIGxhbmd1YWdlIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHBsYWNlIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvTGlzdFBsYWNlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtUGxhY2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBQaXBlIHBsYWNlIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0RGltZW5zaW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuICAvKipcbiAgKiBQaXBlIHRoZSBpdGVtcyBpbiBlbnRpdHkgcHJldmlldyBmaWVsZCwgY29ubmVjdGVkIGJ5IGNvbW11bml0eSBmYXZvcml0ZSBzdGF0ZW1lbnRzXG4gICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0RW50aXR5UHJldmlldzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAgICAgdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkgOlxuICAgICAgdGhpcy5iLnBpcGVSZXBvSW5nb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZykpKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKVxuICAgICAgICAgICAgICAvLyAuc29ydCgoYSwgYikgPT4gYS5vcmROdW0gPiBiLm9yZE51bSA/IDEgOiAtMSlcbiAgICAgICAgICAgICkpXG4gICAgICB9KSxcbiAgICAgIHN0YXJ0V2l0aChbXSlcbiAgICApXG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgcmVwbyB0aW1lIHNwYW4gaXRlbVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0l0ZW1UaW1lU3Bhbihwa0VudGl0eSk6IE9ic2VydmFibGU8VGltZVNwYW5JdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucC5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYy5waXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhcbiAgICAgICAgICBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoZmllbGREZWZpbml0aW9ucyA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KGZpZWxkRGVmaW5pdGlvbnMubWFwKGZpZWxkRGVmID0+XG4gICAgICAgICAgICAgIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoZmllbGREZWYucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICBzd2l0Y2hNYXBPcihbXSwgc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzLm1hcChzdGF0ZW1lbnQgPT5cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZlJlcG8udGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcCgoaW5mVGltZVByaW1pdGl2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyOiAoKHN0YXRlbWVudC5jb21tdW5pdHlfZmF2b3JpdGVfY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApKSxcbiAgICAgICAgICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlczogVGltZVNwYW5Qcm9wZXJ0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbjogZmllbGREZWYubGlzdERlZmluaXRpb25zWzBdLCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKHsgbGlzdERlZmluaXRpb246IGZpZWxkRGVmLmxpc3REZWZpbml0aW9uc1swXSwgaXRlbXM6IFtdIH0gYXMgVGltZVNwYW5Qcm9wZXJ0eSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKS5waXBlKFxuICAgICAgICAgICAgICBtYXAoKHByb3BlcnRpZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lc3Bhbml0ZW06IFRpbWVTcGFuSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMuZmlsdGVyKHByb3BzID0+IHByb3BzLml0ZW1zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lc3Bhbml0ZW1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIGxhYmVsIG9mIGdpdmVuIGVudGl0eVxuICAgKiBUaGlzIHdpbGwgdXNlIGVudGl0eSBwcmV2aWV3cyBmb3IgZ2V0dGluZyBzdHJpbmdzIG9mIHJlbGF0ZWQgdGVtcG9yYWwgZW50aXRpZXNcbiAgICogU28gdGhpcyBtYXkgdGFrZSBhIGxpdHRsZSB3aGlsZVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGFiZWxPZkVudGl0eShma0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5iLnBpcGVDbGFzc09mRW50aXR5KGZrRW50aXR5KS5waXBlKFxuXG4gICAgICAvLyBnZXQgdGhlIGRlZmluaXRpb24gb2YgdGhlIGZpcnN0IGZpZWxkXG4gICAgICBzd2l0Y2hNYXAoZmtDbGFzcyA9PiB0aGlzLmMucGlwZUJhc2ljQW5kU3BlY2lmaWNGaWVsZHMoZmtDbGFzcykucGlwZShcbiAgICAgICAgLy8gZ2V0IHRoZSBmaXJzdCBpdGVtIG9mIHRoYXQgZmllbGRcbiAgICAgICAgc3dpdGNoTWFwKGZpZWxkRGVmID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICAgIGZpZWxkRGVmICYmIGZpZWxkRGVmLmxlbmd0aCA/XG4gICAgICAgICAgICBmaWVsZERlZlswXS5saXN0RGVmaW5pdGlvbnMubWFwKGxpc3REZWYgPT4gdGhpcy5waXBlRW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBma0VudGl0eSwgMSkpIDpcbiAgICAgICAgICAgIFtdXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAocHJvcHMgPT4ge1xuICAgICAgICAgICAgcHJvcHMgPSBwcm9wcy5maWx0ZXIocHJvcCA9PiBwcm9wLml0ZW1zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICBpZiAocHJvcHMubGVuZ3RoICYmIHByb3BzWzBdLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvcHNbMF0uaXRlbXNbMF0ubGFiZWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICAgIH0pXG4gICAgICAgICkpKVxuICAgICAgKSlcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBjbGFzcyBsYWJlbCBvZiBnaXZlbiBlbnRpdHlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUNsYXNzTGFiZWxPZkVudGl0eShma0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5iLnBpcGVDbGFzc09mRW50aXR5KGZrRW50aXR5KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrQ2xhc3MgPT4gdGhpcy5jLnBpcGVDbGFzc0xhYmVsKHBrQ2xhc3MpKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgcGtfZW50aXR5IG9mIHRoZSB0eXBlIG9mIGFuIGVudGl0eVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlVHlwZU9mRW50aXR5KHBrRW50aXR5OiBudW1iZXIsIGhhc1R5cGVQcm9wZXJ0eTogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnQ+IHtcbiAgICBpZiAoaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoeyBma19wcm9wZXJ0eTogaGFzVHlwZVByb3BlcnR5LCBma19zdWJqZWN0X2luZm86IHBrRW50aXR5IH0pLnBpcGUobWFwKGl0ZW1zID0+IHtcbiAgICAgICAgaWYgKCFpdGVtcyB8fCBPYmplY3Qua2V5cyhpdGVtcykubGVuZ3RoIDwgMSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgZWxzZSByZXR1cm4gdmFsdWVzKGl0ZW1zKVswXVxuICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKHsgZmtfcHJvcGVydHk6IGhhc1R5cGVQcm9wZXJ0eSwgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5IH0pLnBpcGUoXG4gICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgaWYgKCFpdGVtcyB8fCBPYmplY3Qua2V5cyhpdGVtcykubGVuZ3RoIDwgMSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICBlbHNlIHJldHVybiB2YWx1ZXMoaXRlbXMpWzBdXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzZXNBbmRUeXBlcyhlbmFibGVkSW46ICdlbnRpdGllcycgfCAnc291cmNlcycpIHtcbiAgICByZXR1cm4gdGhpcy5jLnBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzKGVuYWJsZWRJbikucGlwZShcbiAgICAgIHN3aXRjaE1hcChpdGVtcyA9PiB0aGlzLnBpcGVDbGFzc0FuZFR5cGVOb2RlcyhpdGVtcykpLFxuICAgIClcbiAgfVxuXG4gIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVDbGFzc2VzQW5kVHlwZXNPZkNsYXNzZXMoY2xhc3NlczogbnVtYmVyW10pIHtcbiAgICByZXR1cm4gdGhpcy5jLnBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzT2ZUeXBlZENsYXNzZXMoY2xhc3NlcykucGlwZShcbiAgICAgIHN3aXRjaE1hcChpdGVtcyA9PiB0aGlzLnBpcGVDbGFzc0FuZFR5cGVOb2RlcyhpdGVtcykpLFxuICAgIClcbiAgfVxuXG4gIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVDbGFzc0FuZFR5cGVOb2Rlcyh0eXBlQW5kVHlwZWRDbGFzc2VzOiB7IHR5cGVkQ2xhc3M6IG51bWJlcjsgdHlwZUNsYXNzOiBudW1iZXI7IH1bXSk6IE9ic2VydmFibGU8Q2xhc3NBbmRUeXBlTm9kZVtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgdHlwZUFuZFR5cGVkQ2xhc3Nlcy5tYXAoaXRlbSA9PiB0aGlzLmMucGlwZUNsYXNzTGFiZWwoaXRlbS50eXBlZENsYXNzKS5waXBlKFxuICAgICAgICBtYXAobGFiZWwgPT4gKHtcbiAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICBkYXRhOiB7IHBrQ2xhc3M6IGl0ZW0udHlwZWRDbGFzcywgcGtUeXBlOiBudWxsIH1cbiAgICAgICAgfSBhcyBDbGFzc0FuZFR5cGVOb2RlKSksXG4gICAgICAgIHN3aXRjaE1hcChub2RlID0+IGlpZihcbiAgICAgICAgICAoKSA9PiAhIWl0ZW0udHlwZUNsYXNzLFxuICAgICAgICAgIHRoaXMuYi5waXBlUGVyc2lzdGVudEl0ZW1Qa3NCeUNsYXNzKGl0ZW0udHlwZUNsYXNzKS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKHR5cGVQa3MgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgICAgICAgIHR5cGVQa3MubWFwKHBrVHlwZSA9PiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhwa1R5cGUpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKHByZXZpZXcgPT4gKHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBwcmV2aWV3LmVudGl0eV9sYWJlbCxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IHsgcGtDbGFzczogaXRlbS50eXBlZENsYXNzLCBwa1R5cGUgfVxuICAgICAgICAgICAgICAgIH0gYXMgQ2xhc3NBbmRUeXBlTm9kZSkpXG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgIHNvcnRBYmMobiA9PiBuLmxhYmVsKSxcbiAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgbWFwKGNoaWxkcmVuID0+IHtcbiAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuXG4gICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgb2YoeyAuLi5ub2RlLCBjaGlsZHJlbjogW10gfSBhcyBDbGFzc0FuZFR5cGVOb2RlKVxuICAgICAgICApXG4gICAgICAgIClcbiAgICAgICkpXG4gICAgKS5waXBlKFxuICAgICAgc29ydEFiYygobm9kZSkgPT4gbm9kZS5sYWJlbCksXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYXJyYXkgb2YgcGtfY2xhc3Mgb2YgYWxsIGNsYXNzZXMgYW5kIHR5cGVkIGNsYXNzZXMuXG4gICAqIEBwYXJhbSBjbGFzc2VzQW5kVHlwZXMgYSBvYmplY3QgY29udGFpbmluZyB7Y2xhc3NlczogW10sIHR5cGVzW119XG4gICAqL1xuICBwaXBlQ2xhc3Nlc0Zyb21DbGFzc2VzQW5kVHlwZXMoY2xhc3Nlc0FuZFR5cGVzOiBDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICBjb25zdCB0eXBlZENsYXNzZXMkID0gKCFjbGFzc2VzQW5kVHlwZXMgfHwgIWNsYXNzZXNBbmRUeXBlcy50eXBlcyB8fCAhY2xhc3Nlc0FuZFR5cGVzLnR5cGVzLmxlbmd0aCkgP1xuICAgICAgb2YoW10gYXMgbnVtYmVyW10pIDpcbiAgICAgIHRoaXMuYi5waXBlQ2xhc3Nlc09mUGVyc2lzdGVudEl0ZW1zKGNsYXNzZXNBbmRUeXBlcy50eXBlcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChwa3MpID0+ICEhcGtzKSxcbiAgICAgICAgICBzd2l0Y2hNYXAodHlwZUNsYXNzZXMgPT4gdGhpcy5jLnBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHR5cGVDbGFzc2VzKSlcbiAgICAgICAgKVxuICAgIHJldHVybiB0eXBlZENsYXNzZXMkLnBpcGUoXG4gICAgICBtYXAodHlwZWRDbGFzc2VzID0+IHVuaXEoWy4uLnR5cGVkQ2xhc3NlcywgLi4uKChjbGFzc2VzQW5kVHlwZXMgfHwgeyBjbGFzc2VzOiBbXSB9KS5jbGFzc2VzIHx8IFtdKV0pKVxuICAgICk7XG4gIH1cblxuICBwaXBlUHJvcGVydHlPcHRpb25zRnJvbUNsYXNzZXNBbmRUeXBlcyhjbGFzc2VzQW5kVHlwZXM6IENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsKTogT2JzZXJ2YWJsZTxQcm9wZXJ0eU9wdGlvbltdPiB7XG4gICAgcmV0dXJuIHRoaXMucGlwZUNsYXNzZXNGcm9tQ2xhc3Nlc0FuZFR5cGVzKGNsYXNzZXNBbmRUeXBlcykucGlwZShcbiAgICAgIHN3aXRjaE1hcChjbGFzc2VzID0+IHRoaXMucGlwZVByb3BlcnR5T3B0aW9uc0Zvcm1DbGFzc2VzKGNsYXNzZXMpKVxuICAgIClcbiAgfVxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlUHJvcGVydHlPcHRpb25zRm9ybUNsYXNzZXMoY2xhc3NlczogbnVtYmVyW10pOiBPYnNlcnZhYmxlPFByb3BlcnR5T3B0aW9uW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoY2xhc3Nlcy5tYXAocGtDbGFzcyA9PiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKS5waXBlKFxuICAgICAgbWFwKGMgPT4gYy5iYXNpY190eXBlID09PSA5KSxcbiAgICAgIHN3aXRjaE1hcChpc1RlRW4gPT4gdGhpcy5jLnBpcGVTcGVjaWZpY0FuZEJhc2ljRmllbGRzKHBrQ2xhc3MpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChjbGFzc0ZpZWxkcyA9PiBjbGFzc0ZpZWxkc1xuICAgICAgICAgICAgLmZpbHRlcihmID0+ICEhZi5wcm9wZXJ0eS5wa1Byb3BlcnR5KVxuICAgICAgICAgICAgLm1hcChmID0+ICh7XG4gICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGYuaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgZmtQcm9wZXJ0eURvbWFpbjogZi5pc091dGdvaW5nID8gZi5zb3VyY2VDbGFzcyA6IG51bGwsXG4gICAgICAgICAgICAgIGZrUHJvcGVydHlSYW5nZTogZi5pc091dGdvaW5nID8gbnVsbCA6IGYuc291cmNlQ2xhc3MsXG4gICAgICAgICAgICAgIHBrUHJvcGVydHk6IGYucHJvcGVydHkucGtQcm9wZXJ0eVxuICAgICAgICAgICAgfSkpKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoaXRlbXMgPT4ge1xuICAgICAgICAgICAgaWYgKGlzVGVFbikge1xuICAgICAgICAgICAgICAvLyBhZGQgdGltZSBwcm9wZXJ0aWVzIChhdCBzb21lIHRpbWUgd2l0aGluLCAuLi4pXG4gICAgICAgICAgICAgIERmaENvbmZpZy5QUk9QRVJUWV9QS1NfV0hFUkVfVElNRV9QUklNSVRJVkVfSVNfUkFOR0UubWFwKHBrUHJvcGVydHkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgcGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgIGZrUHJvcGVydHlEb21haW46IHBrQ2xhc3MsXG4gICAgICAgICAgICAgICAgICBma1Byb3BlcnR5UmFuZ2U6IERmaENvbmZpZy5DTEFTU19QS19USU1FX1BSSU1JVElWRSxcbiAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoaXRlbXMubWFwKGl0ZW0gPT4gdGhpcy5jLnBpcGVGaWVsZExhYmVsKFxuICAgICAgICAgICAgICBpdGVtLnBrUHJvcGVydHksXG4gICAgICAgICAgICAgIGl0ZW0uZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgICAgICAgaXRlbS5ma1Byb3BlcnR5UmFuZ2UsXG4gICAgICAgICAgICApLnBpcGUobWFwKGxhYmVsID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNPdXRnb2luZyA9IGl0ZW0uaXNPdXRnb2luZztcbiAgICAgICAgICAgICAgY29uc3QgbzogUHJvcGVydHlPcHRpb24gPSB7XG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICBwazogaXRlbS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgIHByb3BlcnR5RmllbGRLZXk6IHByb3BlcnR5T3B0aW9uRmllbGRLZXkoaXRlbS5wa1Byb3BlcnR5LCBpc091dGdvaW5nKVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgIH0pKSkpO1xuICAgICAgICAgIH0pKSlcbiAgICApXG5cblxuICAgICkpLnBpcGUobWFwKHkgPT4gZmxhdHRlbjxQcm9wZXJ0eU9wdGlvbj4oeSkpKTtcbiAgfVxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlUGtDbGFzc2VzRnJvbVByb3BlcnR5U2VsZWN0TW9kZWwobW9kZWw6IFByb3BlcnR5U2VsZWN0TW9kZWwpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgW1xuICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwub3V0Z29pbmdQcm9wZXJ0aWVzLCB0cnVlKSxcbiAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLmluZ29pbmdQcm9wZXJ0aWVzLCBmYWxzZSksXG4gICAgICBdXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbb3V0LCBpbmddKSA9PiB1bmlxKFsuLi5vdXQsIC4uLmluZ10pKVxuICAgIClcbiAgfVxuXG4gIGdldFBrQ2xhc3Nlc0Zyb21Qcm9wZXJ0eVNlbGVjdE1vZGVsJChtb2RlbCQ6IE9ic2VydmFibGU8UHJvcGVydHlTZWxlY3RNb2RlbD4pOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIG1vZGVsJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKG1vZGVsID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBbXG4gICAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLm91dGdvaW5nUHJvcGVydGllcywgdHJ1ZSksXG4gICAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLmluZ29pbmdQcm9wZXJ0aWVzLCBmYWxzZSksXG4gICAgICAgIF1cbiAgICAgICkucGlwZShcbiAgICAgICAgbWFwKChbb3V0LCBpbmddKSA9PiB1bmlxKFsuLi5vdXQsIC4uLmluZ10pKVxuICAgICAgKSlcbiAgICApXG4gIH1cblxuXG5cbiAgZ2V0UHJvcGVydHlPcHRpb25zJChjbGFzc1R5cGVzJDogT2JzZXJ2YWJsZTxDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbD4pOiBPYnNlcnZhYmxlPFByb3BlcnR5T3B0aW9uW10+IHtcbiAgICByZXR1cm4gY2xhc3NUeXBlcyQucGlwZTxDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCwgUHJvcGVydHlPcHRpb25bXT4oXG4gICAgICAvLyBtYWtlIHN1cmUgb25seSBpdCBwYXNzZXMgb25seSBpZiBkYXRhIG9mIHRoZSBhcnJheUNsYXNzZXMgYXJlIGNoYW5nZWQgKG5vdCBjaGlsZHJlbilcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsPigoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gZXF1YWxzKGEsIGIpO1xuICAgICAgfSksXG4gICAgICBzd2l0Y2hNYXAoKHgpID0+ICF4ID8gZW1wdHkoKSA6IHRoaXMuYi5waXBlQ2xhc3Nlc09mUGVyc2lzdGVudEl0ZW1zKHgudHlwZXMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigocGtzKSA9PiAhIXBrcyksXG4gICAgICAgICAgc3dpdGNoTWFwKHR5cGVDbGFzc2VzID0+IHRoaXMuYy5waXBlVHlwZWRDbGFzc2VzT2ZUeXBlQ2xhc3Nlcyh0eXBlQ2xhc3NlcykucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCh0eXBlZENsYXNzZXMgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gdW5pcShbLi4udHlwZWRDbGFzc2VzLCAuLi4oeC5jbGFzc2VzIHx8IFtdKV0pO1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlUHJvcGVydHlPcHRpb25zRm9ybUNsYXNzZXMoY2xhc3NlcylcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvcGVydHlPcHRpb25GaWVsZEtleShma1Byb3BlcnR5OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBzdHJpbmcge1xuICByZXR1cm4gJ18nICsgZmtQcm9wZXJ0eSArICdfJyArIChpc091dGdvaW5nID8gJ291dGdvaW5nJyA6ICdpbmdvaW5nJyk7XG59XG5cbiJdfQ==