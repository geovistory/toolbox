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
/**
 * This Service provides a collecion of pipes that aggregate or transform information.
 * For Example
 * - the lists of text properties, appellaitons, places, time-primitives / time-spans etc.
 * - the label of temporal entity or persistent item
 *
 * This mainly selects data from the information schema and the relation to projects.
 * It combines pipes selecting data from the
 * - activated project
 * - alternatives (not in project but in others)
 * - repo
 *
 */
export class InformationPipesService {
    /**
     * @param {?} b
     * @param {?} p
     * @param {?} s
     * @param {?} c
     * @param {?} timePrimitivePipe
     * @param {?} timeSpanPipe
     * @param {?} ngRedux
     */
    constructor(b, p, s, c, timePrimitivePipe, timeSpanPipe, ngRedux) {
        this.b = b;
        this.p = p;
        this.s = s;
        this.c = c;
        this.timePrimitivePipe = timePrimitivePipe;
        this.timeSpanPipe = timeSpanPipe;
        this.infRepo = new InfSelector(ngRedux, of('repo'));
    }
    /**
     * ******************************************************************
     * Pipe the project entities
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeListLength(l, pkEntity) {
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
                items => items.length)));
            case 'time-span':
                return combineLatest(this.b.pipeOutgoingStatementsByProperty(72, pkEntity), this.b.pipeOutgoingStatementsByProperty(71, pkEntity), this.b.pipeOutgoingStatementsByProperty(150, pkEntity), this.b.pipeOutgoingStatementsByProperty(151, pkEntity), this.b.pipeOutgoingStatementsByProperty(152, pkEntity), this.b.pipeOutgoingStatementsByProperty(153, pkEntity)).pipe(tap((/**
                 * @param {?} x
                 * @return {?}
                 */
                (x) => {
                })), map((/**
                 * @param {?} items
                 * @return {?}
                 */
                items => items.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => x.length > 0)).length)));
            // case 'text-property':
            //   return this.pipeListTextProperty(l, pkEntity).pipe(map(items => items.length))
            default:
                console.warn('unsupported listType');
                return new BehaviorSubject(0);
        }
    }
    // @spyTag
    /**
     * @param {?} l
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    pipeList(l, pkEntity, limit) {
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
            (ts) => [ts].filter((/**
             * @param {?} i
             * @return {?}
             */
            i => i.properties.length > 0)))));
        }
        else
            console.warn('unsupported listType');
    }
    // @spyTag
    /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    pipeListBasicStatementItems(listDefinition, pkEntity, pkProject) {
        return (listDefinition.isOutgoing ?
            this.b.pipeOutgoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject) :
            this.b.pipeIngoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject));
    }
    /**
     * Pipe the items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    pipeListAppellation(listDefinition, pkEntity, limit) {
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        (statements) => {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            (r, i) => this.pipeItemAppellation(r))))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            nodes => nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            node => !!node && node.fkClass === listDefinition.targetClass)))), limitTo(limit), startWith([]));
        })));
    }
    /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    pipeListEntityPreview(listDefinition, pkEntity, limit) {
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(tag(`before-${pkEntity}-${listDefinition.property.pkProperty}-${listDefinition.targetClass}`), switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        (statements) => {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            (r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing))))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            nodes => nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            node => !!node && node.fkClass === listDefinition.targetClass))
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a.ordNum > b.ordNum ? 1 : -1))), limitTo(limit)), startWith([]));
        })), tag(`after-${pkEntity}-${listDefinition.property.pkProperty}-${listDefinition.targetClass}`));
    }
    // @spyTag
    /**
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    pipeListLanguage(listDefinition, pkEntity, limit) {
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        (statements) => {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            (r, i) => this.pipeItemLanguage(r))))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            nodes => nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            node => !!node && node.fkClass === listDefinition.targetClass)))), limitTo(limit), startWith([]));
        })));
    }
    /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    pipeListPlace(listDefinition, pkEntity, limit) {
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        (statements) => {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            (r, i) => this.pipeItemPlace(r))))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            nodes => nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            node => !!node && node.fkClass === listDefinition.targetClass)))), limitTo(limit), startWith([]));
        })));
    }
    /**
     * Pipe the items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    pipeListDimension(listDefinition, pkEntity, limit) {
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        (statements) => {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            (r, i) => this.pipeItemDimension(r))))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            nodes => nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            node => !!node && node.fkClass === listDefinition.targetClass)))), limitTo(limit), startWith([]));
        })));
    }
    /**
     * Pipe the items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @param {?=} limit
     * @return {?}
     */
    // @spyTag
    pipeListLangString(listDefinition, pkEntity, limit) {
        return this.b.pipeStatementsOfList(listDefinition, pkEntity)
            .pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        (statements) => {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            (r, i) => this.pipeItemLangString(r))))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            nodes => nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            node => !!node && node.fkClass === listDefinition.targetClass)))), limitTo(limit), startWith([]));
        })));
    }
    /**
     * pipe the project relation of given statment, if the scope of this page is inProject
     * @param {?} stmt InfStatement to be completed with projRel
     * @param {?} page page for which we are piping this stuff
     * @return {?}
     */
    pipeProjRelOfStatement(stmt, page) {
        if (page.scope.inProject) {
            return this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$
                .key(page.scope.inProject + '_' + stmt.pk_entity).pipe(map((/**
             * @param {?} projRel
             * @return {?}
             */
            projRel => ({
                projRel,
                ordNum: page.isOutgoing ? projRel.ord_num_of_range : projRel.ord_num_of_domain
            }))));
        }
    }
    /**
     * pipe the target of given statment
     * @param {?} stmt InfStatement to be completed with target
     * @param {?} page page for which we are piping this stuff
     * @param {?} subfieldType type of subfield for which we pipe this stupp
     * @return {?}
     */
    pipeTargetOfStatement(stmt, page, subfieldType) {
        /** @type {?} */
        const isOutgoing = page.isOutgoing;
        /** @type {?} */
        const targetInfo = isOutgoing ? stmt.fk_object_info : stmt.fk_subject_info;
        // here you could add targetData or targetCell
        if (subfieldType.appellation) {
            return this.s.inf$.appellation$.by_pk_entity$.key(targetInfo).pipe(map((/**
             * @param {?} appellation
             * @return {?}
             */
            appellation => {
                /** @type {?} */
                const stmtTarget = {
                    statement: stmt,
                    isOutgoing,
                    targetLabel: appellation.string,
                    targetClass: appellation.fk_class,
                    target: {
                        appellation
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
        throw new Error(`No implementation found for subfieldType ${JSON.stringify(subfieldType)}`);
    }
    /**
     * pipe target and projRel of the given statement
     * @param {?} stmt
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    pipeStatementWithTarget(stmt, page, subfieldType) {
        return combineLatest(this.pipeTargetOfStatement(stmt, page, subfieldType), this.pipeProjRelOfStatement(stmt, page)).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([target, projRel]) => (Object.assign({}, target, projRel)))));
    }
    /**
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    pipeSubfieldPage(page, subfieldType) {
        // get the statments of that page
        return this.s.inf$.statement$.pagination$.pipePage(page)
            .pipe(switchMap((/**
         * @param {?} pkStmts
         * @return {?}
         */
        pkStmts => combineLatestOrEmpty(pkStmts.map((/**
         * @param {?} pkStmt
         * @return {?}
         */
        pkStmt => this.s.inf$.statement$.by_pk_entity$.key(pkStmt)
            // for each statement, depending on the subfieldType, load the corresponding target
            .pipe(switchMap((/**
         * @param {?} stmt
         * @return {?}
         */
        stmt => this.pipeStatementWithTarget(stmt, page, subfieldType))))))))));
    }
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
    pipeItemTeEnRow(pkEntity, fieldDefinitions, pkProject, repo) {
        // pipe outgoing statements
        /** @type {?} */
        const outgoingStatements$ = repo ? this.b.pipeRepoOutgoingStatements(pkEntity) : this.b.pipeOutgoingStatements(pkEntity);
        // pipe ingoing statements
        /** @type {?} */
        const ingoingStatements$ = repo ? this.b.pipeRepoIngoingStatements(pkEntity) : this.b.pipeIngoingStatements(pkEntity);
        // pipe all statements with information leaf items
        /** @type {?} */
        const outgoingItems$ = outgoingStatements$.pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        statements => combineLatestOrEmpty(statements
            .filter((/**
         * @param {?} statement
         * @return {?}
         */
        statement => !!statement.fk_object_info)) // remove statements not pointing to information
            .map((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            /** @type {?} */
            const isOutgoing = true;
            return this.pipeItem(s, pkProject, isOutgoing);
        }))))));
        /** @type {?} */
        const ingoingItems$ = ingoingStatements$.pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        statements => combineLatestOrEmpty(statements
            .filter((/**
         * @param {?} statement
         * @return {?}
         */
        statement => !!statement.fk_subject_info)) // remove statements not pointing to information
            .map((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            /** @type {?} */
            const isOutgoing = false;
            return this.pipeItem(s, pkProject, isOutgoing);
        }))))));
        /** @type {?} */
        const sortItems = repo ?
            (/**
             * @param {?} item
             * @return {?}
             */
            (item) => item.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a.statement.is_in_project_count > b.statement.is_in_project_count ? 1 : -1))) :
            (/**
             * @param {?} item
             * @return {?}
             */
            (item) => item);
        return combineLatest(outgoingItems$, ingoingItems$).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([outgoingItems, ingoingItems]) => {
            /** @type {?} */
            const groupedOut = groupBy((/**
             * @param {?} i
             * @return {?}
             */
            (i) => (i && i.statement ? i.statement.fk_property.toString() : undefined)), outgoingItems);
            /** @type {?} */
            const groupedIn = groupBy((/**
             * @param {?} i
             * @return {?}
             */
            (i) => (i && i.statement ? i.statement.fk_property.toString() : undefined)), ingoingItems);
            return { groupedOut, groupedIn };
        })), 
        // auditTime(10),
        map((/**
         * @param {?} d
         * @return {?}
         */
        (d) => {
            /** @type {?} */
            const row = {};
            fieldDefinitions.forEach((/**
             * @param {?} fieldDefinition
             * @return {?}
             */
            fieldDefinition => {
                /** @type {?} */
                let cell;
                fieldDefinition.listDefinitions.forEach((/**
                 * @param {?} listDefinition
                 * @return {?}
                 */
                listDefinition => {
                    if (listDefinition.listType.timeSpan) {
                        /** @type {?} */
                        const t = pick(['71', '72', '150', '151', '152', '153'], d.groupedOut);
                        /** @type {?} */
                        const keys = Object.keys(t);
                        /** @type {?} */
                        const itemsCount = keys.length;
                        /** @type {?} */
                        let label;
                        if (itemsCount > 0) {
                            /** @type {?} */
                            const timeSpanKeys = {};
                            keys.forEach((/**
                             * @param {?} key
                             * @return {?}
                             */
                            key => { timeSpanKeys[key] = t[key][0].timePrimitive; }));
                            /** @type {?} */
                            const timeSpan = TimeSpanUtil.fromTimeSpanDialogData(timeSpanKeys);
                            label = this.timeSpanPipe.transform(timeSpan);
                        }
                        cell = {
                            isOutgoing: listDefinition.isOutgoing,
                            itemsCount,
                            label,
                            entityPreview: undefined,
                            pkProperty: undefined,
                            isTimeSpan: true
                        };
                    }
                    else {
                        if (listDefinition.isOutgoing) {
                            if (d.groupedOut[listDefinition.property.pkProperty]) {
                                /** @type {?} */
                                const items = sortItems(d.groupedOut[listDefinition.property.pkProperty]);
                                /** @type {?} */
                                const firstItem = items[0];
                                cell = {
                                    isOutgoing: listDefinition.isOutgoing,
                                    itemsCount: items.length,
                                    entityPreview: ((/** @type {?} */ ((firstItem || {})))).preview,
                                    label: firstItem.label,
                                    pkProperty: listDefinition.property.pkProperty,
                                    firstItem,
                                    items
                                };
                            }
                        }
                        else {
                            if (d.groupedIn[listDefinition.property.pkProperty]) {
                                /** @type {?} */
                                const items = sortItems(d.groupedIn[listDefinition.property.pkProperty]);
                                /** @type {?} */
                                const firstItem = items[0];
                                cell = {
                                    isOutgoing: listDefinition.isOutgoing,
                                    itemsCount: items.length,
                                    entityPreview: ((/** @type {?} */ ((firstItem || {})))).preview,
                                    label: firstItem.label,
                                    pkProperty: listDefinition.property.pkProperty,
                                    firstItem,
                                    items
                                };
                            }
                        }
                    }
                }));
                row[fieldDefinition.label] = cell;
            }));
            return row;
        })));
    }
    // @spyTag
    /**
     * @private
     * @param {?} r
     * @param {?} pkProject
     * @param {?} propIsOutgoing
     * @return {?}
     */
    pipeItem(r, pkProject, propIsOutgoing) {
        /** @type {?} */
        const targetEntity = propIsOutgoing ? r.fk_object_info : r.fk_subject_info;
        return this.s.inf$.getModelOfEntity$(targetEntity).pipe(switchMap((/**
         * @param {?} m
         * @return {?}
         */
        m => {
            /** @type {?} */
            const modelName = m ? m.modelName : undefined;
            switch (modelName) {
                case 'appellation':
                    return this.pipeItemAppellation(r);
                case 'language':
                    return this.pipeItemLanguage(r);
                case 'place':
                    return this.pipeItemPlace(r);
                case 'dimension':
                    return this.pipeItemDimension(r);
                case 'lang_string':
                    return this.pipeItemLangString(r);
                case 'time_primitive':
                    return this.pipeItemTimePrimitive(r, pkProject); // TODO: emits twice
                default:
                    return this.pipeItemEntityPreview(r, propIsOutgoing);
            }
        })));
    }
    // @spyTag
    /**
     * @param {?} listDef
     * @param {?} fkEntity
     * @param {?=} limit
     * @return {?}
     */
    pipeEntityProperties(listDef, fkEntity, limit) {
        if (listDef.listType.appellation) {
            return this.pipeListAppellation(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            (items) => this.getEntityProperties(listDef, items))));
        }
        else if (listDef.listType.language) {
            return this.pipeListLanguage(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            (items) => this.getEntityProperties(listDef, items))));
        }
        else if (listDef.listType.place) {
            return this.pipeListPlace(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            (items) => this.getEntityProperties(listDef, items))));
        }
        else if (listDef.listType.dimension) {
            return this.pipeListDimension(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            (items) => this.getEntityProperties(listDef, items))));
        }
        else if (listDef.listType.langString) {
            return this.pipeListLangString(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            (items) => this.getEntityProperties(listDef, items))));
        }
        else if (listDef.listType.entityPreview || listDef.listType.temporalEntity) {
            return this.pipeListEntityPreview(listDef, fkEntity, limit)
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            (items) => this.getEntityProperties(listDef, items))));
        }
        else if (listDef.listType.timeSpan) {
            return this.pipeItemTimeSpan(fkEntity)
                .pipe(map((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                /** @type {?} */
                const items = item.properties.find((/**
                 * @param {?} p
                 * @return {?}
                 */
                p => p.items.length > 0)) ? [{
                        label: this.timeSpanPipe.transform(timeSpanItemToTimeSpan(item)),
                        properties: [] // TODO check if the properties or the item are really not needed
                    }] : [];
                return {
                    listDefinition: listDef,
                    items
                };
            })));
        }
        else
            return of(null);
    }
    // @spyTag
    /**
     * @param {?} pkEntity
     * @return {?}
     */
    pipeTemporalEntityRemoveProperties(pkEntity) {
        return combineLatest(this.s.inf$.temporal_entity$.by_pk_entity_key$(pkEntity), this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity }), this.s.inf$.text_property$.by_fk_concerned_entity_indexed$(pkEntity)).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([temporalEntity, statements, textProperties]) => {
            /** @type {?} */
            const res = {
                temporalEntity,
                statements: statements,
                textProperties: values(textProperties)
            };
            return res;
        })));
    }
    /**
     * @param {?} listDefinition
     * @param {?} items
     * @return {?}
     */
    getEntityProperties(listDefinition, items) {
        return {
            listDefinition,
            items,
        };
    }
    /**
     * Pipe time span item in version of project
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeItemTimeSpan(pkEntity) {
        return this.p.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        pkProject => {
            return this.c.pipeSpecificFieldOfClass(DfhConfig.ClASS_PK_TIME_SPAN).pipe(switchMap((/**
             * @param {?} fieldDefs
             * @return {?}
             */
            fieldDefs => {
                return combineLatest(fieldDefs.map((/**
                 * @param {?} fieldDef
                 * @return {?}
                 */
                fieldDef => this.s.inf$.statement$.by_subject_and_property$({
                    fk_property: fieldDef.property.pkProperty,
                    fk_subject_info: pkEntity
                })
                    .pipe(switchMapOr([], (/**
                 * @param {?} statements
                 * @return {?}
                 */
                statements => combineLatest(statements.map((/**
                 * @param {?} statement
                 * @return {?}
                 */
                statement => combineLatest(this.s.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))), this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity)).pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                ([infTimePrimitive, projRel]) => {
                    /** @type {?} */
                    const timePrimitive = new TimePrimitive({
                        julianDay: infTimePrimitive.julian_day,
                        calendar: ((/** @type {?} */ ((projRel.calendar || 'gregorian')))),
                        duration: ((/** @type {?} */ (infTimePrimitive.duration)))
                    });
                    /** @type {?} */
                    const item = {
                        statement,
                        ordNum: undefined,
                        projRel,
                        timePrimitive,
                        label: this.timePrimitivePipe.transform(timePrimitive),
                        fkClass: infTimePrimitive.fk_class
                    };
                    return item;
                })))))))), map((/**
                 * @param {?} items
                 * @return {?}
                 */
                items => {
                    /** @type {?} */
                    const res = {
                        listDefinition: fieldDef.listDefinitions[0], items
                    };
                    return res;
                })))))).pipe(map((/**
                 * @param {?} properties
                 * @return {?}
                 */
                (properties) => {
                    /** @type {?} */
                    const props = properties.filter((/**
                     * @param {?} p
                     * @return {?}
                     */
                    p => p.items.length > 0));
                    /** @type {?} */
                    const timespanitem = {
                        label: '',
                        properties: props
                    };
                    return timespanitem;
                })));
            })));
        })));
    }
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    pipeItemAppellation(statement) {
        return this.s.inf$.appellation$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x)), map((/**
         * @param {?} appellation
         * @return {?}
         */
        appellation => {
            if (!appellation)
                return null;
            /** @type {?} */
            const node = {
                ordNum: undefined,
                projRel: undefined,
                statement,
                label: appellation.string,
                fkClass: appellation.fk_class
            };
            return node;
        })));
    }
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    pipeItemLanguage(statement) {
        return this.s.inf$.language$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x)), map((/**
         * @param {?} language
         * @return {?}
         */
        language => {
            if (!language)
                return null;
            /** @type {?} */
            const node = {
                ordNum: undefined,
                projRel: undefined,
                statement,
                label: language.notes,
                fkClass: language.fk_class
            };
            return node;
        })));
    }
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    pipeItemPlace(statement) {
        return this.s.inf$.place$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x)), map((/**
         * @param {?} place
         * @return {?}
         */
        place => {
            if (!place)
                return null;
            /** @type {?} */
            const node = {
                ordNum: undefined,
                projRel: undefined,
                statement,
                label: 'WGS84: ' + place.lat + '°, ' + place.long + '°',
                fkClass: place.fk_class
            };
            return node;
        })));
    }
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    pipeItemDimension(statement) {
        return this.s.inf$.dimension$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x)), switchMap((/**
         * @param {?} dimension
         * @return {?}
         */
        (dimension) => {
            return this.p.streamEntityPreview(dimension.fk_measurement_unit)
                .pipe(map((/**
             * @param {?} preview
             * @return {?}
             */
            preview => {
                /** @type {?} */
                const node = {
                    ordNum: undefined,
                    projRel: undefined,
                    statement,
                    label: `${dimension.numeric_value} ${preview.entity_label}`,
                    fkClass: dimension.fk_class,
                };
                return node;
            })));
        })));
    }
    // @spyTag
    /**
     * @param {?} statement
     * @return {?}
     */
    pipeItemLangString(statement) {
        return this.s.inf$.lang_string$.by_pk_entity$.key(statement.fk_object_info).pipe(switchMap((/**
         * @param {?} langString
         * @return {?}
         */
        (langString) => {
            if (!langString)
                return new BehaviorSubject(null);
            return this.s.inf$.language$.by_pk_entity$.key(langString.fk_language)
                .pipe(map((/**
             * @param {?} language
             * @return {?}
             */
            language => {
                if (!language)
                    return null;
                /** @type {?} */
                let label = '';
                if (langString.string)
                    label = langString.string;
                else if (langString.quill_doc && langString.quill_doc.ops && langString.quill_doc.ops.length) {
                    label = langString.quill_doc.ops.map((/**
                     * @param {?} op
                     * @return {?}
                     */
                    op => op.insert)).join('');
                }
                /** @type {?} */
                const node = {
                    ordNum: undefined,
                    projRel: undefined,
                    statement,
                    label,
                    fkClass: langString.fk_class,
                    language,
                    fkLanguage: langString.fk_language
                };
                return node;
            })));
        })));
    }
    // @spyTag
    /**
     * @param {?} statement
     * @param {?} isOutgoing
     * @return {?}
     */
    pipeItemEntityPreview(statement, isOutgoing) {
        return this.p.streamEntityPreview((isOutgoing ? statement.fk_object_info : statement.fk_subject_info)).pipe(
        // filter(preview => !preview.loading && !!preview && !!preview.entity_type),
        map((/**
         * @param {?} preview
         * @return {?}
         */
        preview => {
            if (!preview) {
                return null;
            }
            /** @type {?} */
            const node = {
                ordNum: undefined,
                projRel: undefined,
                statement,
                preview,
                label: preview.entity_label || '',
                fkClass: preview.fk_class
            };
            return node;
        })));
    }
    /**
     * @param {?} statement
     * @param {?} pkProject
     * @return {?}
     */
    // @spyTag
    pipeItemTimePrimitive(statement, pkProject) {
        if (pkProject) {
            return combineLatest(this.s.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x)))).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            ([infTimePrimitive, projRel]) => {
                if (!infTimePrimitive)
                    return null;
                /** @type {?} */
                const timePrimitive = new TimePrimitive({
                    julianDay: infTimePrimitive.julian_day,
                    calendar: ((/** @type {?} */ ((projRel.calendar || 'gregorian')))),
                    duration: ((/** @type {?} */ (infTimePrimitive.duration)))
                });
                /** @type {?} */
                const node = {
                    ordNum: undefined,
                    projRel: undefined,
                    statement,
                    timePrimitive,
                    label: this.timePrimitivePipe.transform(timePrimitive),
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
            x => !!x))).pipe(map((/**
             * @param {?} infTimePrimitive
             * @return {?}
             */
            infTimePrimitive => {
                /** @type {?} */
                const timePrimitive = new TimePrimitive({
                    julianDay: infTimePrimitive.julian_day,
                    calendar: ((/** @type {?} */ ((statement.community_favorite_calendar || 'gregorian')))),
                    duration: ((/** @type {?} */ (infTimePrimitive.duration)))
                });
                /** @type {?} */
                const node = {
                    ordNum: undefined,
                    projRel: undefined,
                    statement,
                    timePrimitive,
                    label: this.timePrimitivePipe.transform(timePrimitive),
                    fkClass: infTimePrimitive.fk_class
                };
                return node;
            })));
        }
    }
    /**
     * ******************************************************************
     * Pipe alternatives (not in project)
     * *******************************************************************
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeAltListLength(l, pkEntity) {
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
                items => items.length)));
            default:
                console.warn('unsupported listType');
                break;
        }
    }
    // @spyTag
    /**
     * @param {?} l
     * @param {?} pkEntity
     * @return {?}
     */
    pipeAltList(l, pkEntity) {
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
    }
    // @spyTag
    /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    pipeAltListStatements(listDefinition, pkEntity) {
        return (listDefinition.isOutgoing ?
            this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity) :
            this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity));
    }
    /**
     * Pipe the items in entity preview field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeAltListEntityPreview(listDefinition, pkEntity) {
        return (listDefinition.isOutgoing ?
            this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity) :
            this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity)).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        (statements) => {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            (r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing))))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            nodes => nodes
                .filter((/**
             * @param {?} node
             * @return {?}
             */
            node => !!node))
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a.ordNum > b.ordNum ? 1 : -1)))), startWith([]));
        })));
    }
    /**
     * Pipe the alternative items in place list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeAltListPlace(listDefinition, pkEntity) {
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            (statements) => {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                (r, i) => this.pipeItemPlace(r))))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                nodes => nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                node => !!node && node.fkClass === listDefinition.targetClass)))), startWith([]));
            })));
        }
    }
    /**
     * Pipe the alternative items in dimension list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeAltListDimension(listDefinition, pkEntity) {
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            (statements) => {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                (r, i) => this.pipeItemDimension(r))))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                nodes => nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                node => !!node && node.fkClass === listDefinition.targetClass)))), startWith([]));
            })));
        }
    }
    /**
     * Pipe the alternative items in langString list
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeAltListLangString(listDefinition, pkEntity) {
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            (statements) => {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                (r, i) => this.pipeItemLangString(r))))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                nodes => nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                node => !!node && node.fkClass === listDefinition.targetClass)))), startWith([]));
            })));
        }
    }
    /**
     * Pipe the alternative items in appellation field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeAltListAppellation(listDefinition, pkEntity) {
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            (statements) => {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                (r, i) => this.pipeItemAppellation(r))))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                nodes => nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                node => !!node && node.fkClass === listDefinition.targetClass)))), startWith([]));
            })));
        }
    }
    /**
     * Pipe the alternative items in language field
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeAltListLanguage(listDefinition, pkEntity) {
        if (listDefinition.isOutgoing) {
            return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            (statements) => {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                (r, i) => this.pipeItemLanguage(r))))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                nodes => nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                node => !!node && node.fkClass === listDefinition.targetClass)))), startWith([]));
            })));
        }
    }
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
    pipeRepoListAppellation(listDefinition, pkEntity) {
        if (listDefinition.isOutgoing) {
            return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            (statements) => {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                (r, i) => this.pipeItemAppellation(r))))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                nodes => nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                node => !!node && node.fkClass === listDefinition.targetClass)))), startWith([]));
            })));
        }
    }
    /**
     * Pipe language list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeRepoListLanguage(listDefinition, pkEntity) {
        if (listDefinition.isOutgoing) {
            return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            (statements) => {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                (r, i) => this.pipeItemLanguage(r))))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                nodes => nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                node => !!node && node.fkClass === listDefinition.targetClass)))), startWith([]));
            })));
        }
    }
    /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeRepoListPlace(listDefinition, pkEntity) {
        if (listDefinition.isOutgoing) {
            return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            (statements) => {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                (r, i) => this.pipeItemPlace(r))))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                nodes => nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                node => !!node && node.fkClass === listDefinition.targetClass)))), startWith([]));
            })));
        }
    }
    /**
     * Pipe place list in the way it is defined by the repository
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeRepoListDimension(listDefinition, pkEntity) {
        if (listDefinition.isOutgoing) {
            return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(switchMap((/**
             * @param {?} statements
             * @return {?}
             */
            (statements) => {
                return combineLatest(statements.map((/**
                 * @param {?} r
                 * @param {?} i
                 * @return {?}
                 */
                (r, i) => this.pipeItemDimension(r))))
                    .pipe(map((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                nodes => nodes.filter((/**
                 * @param {?} node
                 * @return {?}
                 */
                node => !!node && node.fkClass === listDefinition.targetClass)))), startWith([]));
            })));
        }
    }
    /**
     * Pipe the items in entity preview field, connected by community favorite statements
     * @template T
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeRepoListEntityPreview(listDefinition, pkEntity) {
        return (listDefinition.isOutgoing ?
            this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity) :
            this.b.pipeRepoIngoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity)).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        (statements) => {
            return combineLatest(statements.map((/**
             * @param {?} r
             * @param {?} i
             * @return {?}
             */
            (r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing))))
                .pipe(map((/**
             * @param {?} nodes
             * @return {?}
             */
            nodes => nodes.filter((/**
             * @param {?} node
             * @return {?}
             */
            node => !!node && node.fkClass === listDefinition.targetClass)))));
        })), startWith([]));
    }
    /**
     * Pipe repo time span item
     * @param {?} pkEntity
     * @return {?}
     */
    // @spyTag
    pipeRepoItemTimeSpan(pkEntity) {
        return this.p.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        pkProject => {
            return this.c.pipeBasicAndSpecificFields(DfhConfig.ClASS_PK_TIME_SPAN).pipe(switchMap((/**
             * @param {?} fieldDefinitions
             * @return {?}
             */
            fieldDefinitions => {
                return combineLatest(fieldDefinitions.map((/**
                 * @param {?} fieldDef
                 * @return {?}
                 */
                fieldDef => this.b.pipeRepoOutgoingStatementsByProperty(fieldDef.property.pkProperty, pkEntity)
                    .pipe(switchMapOr([], (/**
                 * @param {?} statements
                 * @return {?}
                 */
                statements => combineLatest(statements.map((/**
                 * @param {?} statement
                 * @return {?}
                 */
                statement => this.infRepo.time_primitive$.by_pk_entity$.key(statement.fk_object_info)
                    .pipe(map((/**
                 * @param {?} infTimePrimitive
                 * @return {?}
                 */
                (infTimePrimitive) => {
                    /** @type {?} */
                    const timePrimitive = new TimePrimitive({
                        julianDay: infTimePrimitive.julian_day,
                        calendar: ((/** @type {?} */ ((statement.community_favorite_calendar || 'gregorian')))),
                        duration: ((/** @type {?} */ (infTimePrimitive.duration)))
                    });
                    /** @type {?} */
                    const item = {
                        statement,
                        ordNum: undefined,
                        projRel: undefined,
                        timePrimitive,
                        label: this.timePrimitivePipe.transform(timePrimitive),
                        fkClass: infTimePrimitive.fk_class
                    };
                    return item;
                })))))))), map((/**
                 * @param {?} items
                 * @return {?}
                 */
                items => {
                    /** @type {?} */
                    const res = {
                        listDefinition: fieldDef.listDefinitions[0], items
                    };
                    return res;
                })), startWith((/** @type {?} */ ({ listDefinition: fieldDef.listDefinitions[0], items: [] }))))))).pipe(map((/**
                 * @param {?} properties
                 * @return {?}
                 */
                (properties) => {
                    /** @type {?} */
                    const timespanitem = {
                        label: '',
                        properties: properties.filter((/**
                         * @param {?} props
                         * @return {?}
                         */
                        props => props.items.length > 0))
                    };
                    return timespanitem;
                })));
            })));
        })));
    }
    /**
     * Pipes the label of given entity
     * This will use entity previews for getting strings of related temporal entities
     * So this may take a little while
     * @param {?} fkEntity
     * @return {?}
     */
    // @spyTag
    pipeLabelOfEntity(fkEntity) {
        return this.b.pipeClassOfEntity(fkEntity).pipe(
        // get the definition of the first field
        switchMap((/**
         * @param {?} fkClass
         * @return {?}
         */
        fkClass => this.c.pipeBasicAndSpecificFields(fkClass).pipe(
        // get the first item of that field
        switchMap((/**
         * @param {?} fieldDef
         * @return {?}
         */
        fieldDef => combineLatestOrEmpty(fieldDef && fieldDef.length ?
            fieldDef[0].listDefinitions.map((/**
             * @param {?} listDef
             * @return {?}
             */
            listDef => this.pipeEntityProperties(listDef, fkEntity, 1))) :
            []).pipe(map((/**
         * @param {?} props
         * @return {?}
         */
        props => {
            props = props.filter((/**
             * @param {?} prop
             * @return {?}
             */
            prop => prop.items.length > 0));
            if (props.length && props[0].items.length) {
                return props[0].items[0].label;
            }
            return '';
        })))))))));
    }
    /**
     * Pipes the class label of given entity
     * @param {?} fkEntity
     * @return {?}
     */
    // @spyTag
    pipeClassLabelOfEntity(fkEntity) {
        return this.b.pipeClassOfEntity(fkEntity).pipe(switchMap((/**
         * @param {?} pkClass
         * @return {?}
         */
        pkClass => this.c.pipeClassLabel(pkClass))));
    }
    /**
     * Pipes the pk_entity of the type of an entity
     * @param {?} pkEntity
     * @param {?} hasTypeProperty
     * @param {?} isOutgoing
     * @return {?}
     */
    // @spyTag
    pipeTypeOfEntity(pkEntity, hasTypeProperty, isOutgoing) {
        if (isOutgoing) {
            return this.s.inf$.statement$.by_subject_and_property_indexed$({ fk_property: hasTypeProperty, fk_subject_info: pkEntity }).pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            items => {
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
            items => {
                if (!items || Object.keys(items).length < 1)
                    return undefined;
                else
                    return values(items)[0];
            })));
        }
    }
    /**
     * @param {?} enabledIn
     * @return {?}
     */
    pipeClassesAndTypes(enabledIn) {
        return this.c.pipeTypeAndTypedClasses(enabledIn).pipe(switchMap((/**
         * @param {?} items
         * @return {?}
         */
        items => this.pipeClassAndTypeNodes(items))));
    }
    /**
     * @param {?} classes
     * @return {?}
     */
    pipeClassesAndTypesOfClasses(classes) {
        return this.c.pipeTypeAndTypedClassesOfTypedClasses(classes).pipe(switchMap((/**
         * @param {?} items
         * @return {?}
         */
        items => this.pipeClassAndTypeNodes(items))));
    }
    /**
     * @param {?} typeAndTypedClasses
     * @return {?}
     */
    pipeClassAndTypeNodes(typeAndTypedClasses) {
        return combineLatestOrEmpty(typeAndTypedClasses.map((/**
         * @param {?} item
         * @return {?}
         */
        item => this.c.pipeClassLabel(item.typedClass).pipe(map((/**
         * @param {?} label
         * @return {?}
         */
        label => ((/** @type {?} */ ({
            label,
            data: { pkClass: item.typedClass, pkType: null }
        }))))), switchMap((/**
         * @param {?} node
         * @return {?}
         */
        node => iif((/**
         * @return {?}
         */
        () => !!item.typeClass), this.b.pipePersistentItemPksByClass(item.typeClass).pipe(switchMap((/**
         * @param {?} typePks
         * @return {?}
         */
        typePks => combineLatestOrEmpty(typePks.map((/**
         * @param {?} pkType
         * @return {?}
         */
        pkType => this.p.streamEntityPreview(pkType).pipe(map((/**
         * @param {?} preview
         * @return {?}
         */
        preview => ((/** @type {?} */ ({
            label: preview.entity_label,
            data: { pkClass: item.typedClass, pkType }
        }))))))))).pipe(sortAbc((/**
         * @param {?} n
         * @return {?}
         */
        n => n.label))))), map((/**
         * @param {?} children
         * @return {?}
         */
        children => {
            node.children = children;
            return node;
        }))), of((/** @type {?} */ (Object.assign({}, node, { children: [] }))))))))))).pipe(sortAbc((/**
         * @param {?} node
         * @return {?}
         */
        (node) => node.label)));
    }
    /**
     * returns array of pk_class of all classes and typed classes.
     * @param {?} classesAndTypes a object containing {classes: [], types[]}
     * @return {?}
     */
    pipeClassesFromClassesAndTypes(classesAndTypes) {
        /** @type {?} */
        const typedClasses$ = (!classesAndTypes || !classesAndTypes.types || !classesAndTypes.types.length) ?
            of((/** @type {?} */ ([]))) :
            this.b.pipeClassesOfPersistentItems(classesAndTypes.types)
                .pipe(filter((/**
             * @param {?} pks
             * @return {?}
             */
            (pks) => !!pks)), switchMap((/**
             * @param {?} typeClasses
             * @return {?}
             */
            typeClasses => this.c.pipeTypedClassesOfTypeClasses(typeClasses))));
        return typedClasses$.pipe(map((/**
         * @param {?} typedClasses
         * @return {?}
         */
        typedClasses => uniq([...typedClasses, ...((classesAndTypes || { classes: [] }).classes || [])]))));
    }
    /**
     * @param {?} classesAndTypes
     * @return {?}
     */
    pipePropertyOptionsFromClassesAndTypes(classesAndTypes) {
        return this.pipeClassesFromClassesAndTypes(classesAndTypes).pipe(switchMap((/**
         * @param {?} classes
         * @return {?}
         */
        classes => this.pipePropertyOptionsFormClasses(classes))));
    }
    /**
     * @param {?} classes
     * @return {?}
     */
    pipePropertyOptionsFormClasses(classes) {
        return combineLatestOrEmpty(classes.map((/**
         * @param {?} pkClass
         * @return {?}
         */
        pkClass => this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(map((/**
         * @param {?} c
         * @return {?}
         */
        c => c.basic_type === 9)), switchMap((/**
         * @param {?} isTeEn
         * @return {?}
         */
        isTeEn => this.c.pipeSpecificAndBasicFields(pkClass)
            .pipe(map((/**
         * @param {?} classFields
         * @return {?}
         */
        classFields => classFields
            .filter((/**
         * @param {?} f
         * @return {?}
         */
        f => !!f.property.pkProperty))
            .map((/**
         * @param {?} f
         * @return {?}
         */
        f => ({
            isOutgoing: f.isOutgoing,
            fkPropertyDomain: f.isOutgoing ? f.sourceClass : null,
            fkPropertyRange: f.isOutgoing ? null : f.sourceClass,
            pkProperty: f.property.pkProperty
        }))))), switchMap((/**
         * @param {?} items
         * @return {?}
         */
        items => {
            if (isTeEn) {
                // add time properties (at some time within, ...)
                DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.map((/**
                 * @param {?} pkProperty
                 * @return {?}
                 */
                pkProperty => {
                    items.push({
                        pkProperty,
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
            item => this.c.pipeFieldLabel(item.pkProperty, item.fkPropertyDomain, item.fkPropertyRange).pipe(map((/**
             * @param {?} label
             * @return {?}
             */
            label => {
                /** @type {?} */
                const isOutgoing = item.isOutgoing;
                /** @type {?} */
                const o = {
                    isOutgoing,
                    label,
                    pk: item.pkProperty,
                    propertyFieldKey: propertyOptionFieldKey(item.pkProperty, isOutgoing)
                };
                return o;
            }))))));
        }))))))))).pipe(map((/**
         * @param {?} y
         * @return {?}
         */
        y => flatten(y))));
    }
    /**
     * @param {?} model
     * @return {?}
     */
    pipePkClassesFromPropertySelectModel(model) {
        return combineLatestOrEmpty([
            this.c.pipeTargetClassesOfProperties(model.outgoingProperties, true),
            this.c.pipeTargetClassesOfProperties(model.ingoingProperties, false),
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([out, ing]) => uniq([...out, ...ing]))));
    }
    /**
     * @param {?} model$
     * @return {?}
     */
    getPkClassesFromPropertySelectModel$(model$) {
        return model$.pipe(switchMap((/**
         * @param {?} model
         * @return {?}
         */
        model => combineLatestOrEmpty([
            this.c.pipeTargetClassesOfProperties(model.outgoingProperties, true),
            this.c.pipeTargetClassesOfProperties(model.ingoingProperties, false),
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([out, ing]) => uniq([...out, ...ing])))))));
    }
    /**
     * @param {?} classTypes$
     * @return {?}
     */
    getPropertyOptions$(classTypes$) {
        return classTypes$.pipe(
        // make sure only it passes only if data of the arrayClasses are changed (not children)
        distinctUntilChanged((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            return equals(a, b);
        })), switchMap((/**
         * @param {?} x
         * @return {?}
         */
        (x) => !x ? empty() : this.b.pipeClassesOfPersistentItems(x.types)
            .pipe(filter((/**
         * @param {?} pks
         * @return {?}
         */
        (pks) => !!pks)), switchMap((/**
         * @param {?} typeClasses
         * @return {?}
         */
        typeClasses => this.c.pipeTypedClassesOfTypeClasses(typeClasses).pipe(switchMap((/**
         * @param {?} typedClasses
         * @return {?}
         */
        typedClasses => {
            /** @type {?} */
            const classes = uniq([...typedClasses, ...(x.classes || [])]);
            return this.pipePropertyOptionsFormClasses(classes);
        })))))))));
    }
}
InformationPipesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
InformationPipesService.ctorParameters = () => [
    { type: InformationBasicPipesService },
    { type: ActiveProjectPipesService },
    { type: SchemaSelectorsService },
    { type: ConfigurationPipesService },
    { type: TimePrimitivePipe },
    { type: TimeSpanPipe },
    { type: NgRedux }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbmZvcm1hdGlvbi1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlqRCxPQUFPLEVBQWdCLG9CQUFvQixFQUFlLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkwsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBMEJoRSxPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FB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LENBQ0YsRUFDRixDQUNGLENBQUM7SUFDSixDQUFDOzs7WUF0NENGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVhRLDRCQUE0QjtZQUY1Qix5QkFBeUI7WUFHekIsc0JBQXNCO1lBRnRCLHlCQUF5QjtZQWxDc0UsaUJBQWlCO1lBQUUsWUFBWTtZQU45SCxPQUFPOzs7QUFreENkO0lBRkMsTUFBTTtJQUNOLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7OztrRUFLMUI7QUFJRDtJQUZDLE1BQU07SUFDTixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7Ozs7MkVBSzFCO0FBSUQ7SUFGQyxNQUFNO0lBQ04sS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7NENBQytELFVBQVU7b0VBZ0NuRztBQTBCRDtJQURDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7OzRDQUN3QixVQUFVOzZFQTZDNUQ7QUFHRDtJQURDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7OzRDQUN1QyxVQUFVO21GQVMzRTs7O0lBajFDRCwwQ0FBcUI7Ozs7O0lBR25CLG9DQUF1Qzs7Ozs7SUFDdkMsb0NBQW9DOzs7OztJQUNwQyxvQ0FBaUM7Ozs7O0lBQ2pDLG9DQUFvQzs7SUFDcEMsb0RBQTJDOzs7OztJQUMzQywrQ0FBa0M7Ozs7Ozs7QUFnM0N0QyxNQUFNLFVBQVUsc0JBQXNCLENBQUMsVUFBa0IsRUFBRSxVQUFtQjtJQUM1RSxPQUFPLEdBQUcsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZmhDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IEluZlN0YXRlbWVudCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBHdlN1YmZpZWxkUGFnZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBDYWxlbmRhclR5cGUsIGNvbWJpbmVMYXRlc3RPckVtcHR5LCBHcmFudWxhcml0eSwgbGltaXRUbywgc29ydEFiYywgc3dpdGNoTWFwT3IsIFRpbWVQcmltaXRpdmUsIFRpbWVQcmltaXRpdmVQaXBlLCBUaW1lU3BhblBpcGUsIFRpbWVTcGFuVXRpbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgZXF1YWxzLCBmbGF0dGVuLCBncm91cEJ5LCBwaWNrLCB1bmlxLCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIGVtcHR5LCBpaWYsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWcgfSBmcm9tICdyeGpzLXNweS9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2FjaGUsIHNweVRhZyB9IGZyb20gJy4uL2RlY29yYXRvcnMvbWV0aG9kLWRlY29yYXRvcnMnO1xuaW1wb3J0IHsgdGltZVNwYW5JdGVtVG9UaW1lU3BhbiB9IGZyb20gJy4uL2Z1bmN0aW9ucy9mdW5jdGlvbnMnO1xuaW1wb3J0IHsgQXBwZWxsYXRpb25JdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0FwcGVsbGF0aW9uSXRlbSc7XG5pbXBvcnQgeyBCYXNpY1N0YXRlbWVudEl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvQmFzaWNTdGF0ZW1lbnRJdGVtJztcbmltcG9ydCB7IENsYXNzQW5kVHlwZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvQ2xhc3NBbmRUeXBlTm9kZSc7XG5pbXBvcnQgeyBDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCB9IGZyb20gJy4uL21vZGVscy9DbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCc7XG5pbXBvcnQgeyBDdHJsVGltZVNwYW5EaWFsb2dSZXN1bHQgfSBmcm9tICcuLi9tb2RlbHMvQ3RybFRpbWVTcGFuRGlhbG9nUmVzdWx0JztcbmltcG9ydCB7IERpbWVuc2lvbkl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvRGltZW5zaW9uSXRlbSc7XG5pbXBvcnQgeyBFbnRpdHlQcmV2aWV3SXRlbSB9IGZyb20gJy4uL21vZGVscy9FbnRpdHlQcmV2aWV3SXRlbSc7XG5pbXBvcnQgeyBFbnRpdHlQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vbW9kZWxzL0VudGl0eVByb3BlcnRpZXMnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9tb2RlbHMvRmllbGQnO1xuaW1wb3J0IHsgSXRlbUxpc3QgfSBmcm9tICcuLi9tb2RlbHMvSXRlbUxpc3QnO1xuaW1wb3J0IHsgTGFuZ1N0cmluZ0l0ZW0gfSBmcm9tICcuLi9tb2RlbHMvTGFuZ1N0cmluZ0l0ZW0nO1xuaW1wb3J0IHsgTGFuZ3VhZ2VJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0xhbmd1YWdlSXRlbSc7XG5pbXBvcnQgeyBQbGFjZUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvUGxhY2VJdGVtJztcbmltcG9ydCB7IFByb3BlcnR5T3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL1Byb3BlcnR5T3B0aW9uJztcbmltcG9ydCB7IFByb3BlcnR5U2VsZWN0TW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvUHJvcGVydHlTZWxlY3RNb2RlbCc7XG5pbXBvcnQgeyBTdGF0ZW1lbnRJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1N0YXRlbWVudEl0ZW0nO1xuaW1wb3J0IHsgU3RhdGVtZW50UHJvalJlbCwgU3RhdGVtZW50VGFyZ2V0LCBTdGF0ZW1lbnRXaXRoVGFyZ2V0IH0gZnJvbSAnLi4vbW9kZWxzL1N0YXRlbWVudFdpdGhUYXJnZXQnO1xuaW1wb3J0IHsgU3ViZmllbGQgfSBmcm9tICcuLi9tb2RlbHMvU3ViZmllbGQnO1xuaW1wb3J0IHsgU3ViZmllbGRUeXBlIH0gZnJvbSAnLi4vbW9kZWxzL1N1YmZpZWxkVHlwZSc7XG5pbXBvcnQgeyBUZW1wb3JhbEVudGl0eUNlbGwgfSBmcm9tICcuLi9tb2RlbHMvVGVtcG9yYWxFbnRpdHlDZWxsJztcbmltcG9ydCB7IFRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcyB9IGZyb20gJy4uL21vZGVscy9UZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMnO1xuaW1wb3J0IHsgVGVtcG9yYWxFbnRpdHlSb3cgfSBmcm9tICcuLi9tb2RlbHMvVGVtcG9yYWxFbnRpdHlSb3cnO1xuaW1wb3J0IHsgVGltZVByaW1pdGl2ZUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvVGltZVByaW1pdGl2ZUl0ZW0nO1xuaW1wb3J0IHsgVGltZVNwYW5JdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1RpbWVTcGFuSXRlbSc7XG5pbXBvcnQgeyBUaW1lU3BhblByb3BlcnR5IH0gZnJvbSAnLi4vbW9kZWxzL1RpbWVTcGFuUHJvcGVydHknO1xuaW1wb3J0IHsgSW5mTW9kZWxOYW1lLCBJbmZTZWxlY3RvciB9IGZyb20gJy4uL3NlbGVjdG9ycy9pbmYuc2VydmljZSc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25QaXBlc1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24tcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbkJhc2ljUGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9pbmZvcm1hdGlvbi1iYXNpYy1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5cblxuXG5cblxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuLyoqXG4gKiBUaGlzIFNlcnZpY2UgcHJvdmlkZXMgYSBjb2xsZWNpb24gb2YgcGlwZXMgdGhhdCBhZ2dyZWdhdGUgb3IgdHJhbnNmb3JtIGluZm9ybWF0aW9uLlxuICogRm9yIEV4YW1wbGVcbiAqIC0gdGhlIGxpc3RzIG9mIHRleHQgcHJvcGVydGllcywgYXBwZWxsYWl0b25zLCBwbGFjZXMsIHRpbWUtcHJpbWl0aXZlcyAvIHRpbWUtc3BhbnMgZXRjLlxuICogLSB0aGUgbGFiZWwgb2YgdGVtcG9yYWwgZW50aXR5IG9yIHBlcnNpc3RlbnQgaXRlbVxuICpcbiAqIFRoaXMgbWFpbmx5IHNlbGVjdHMgZGF0YSBmcm9tIHRoZSBpbmZvcm1hdGlvbiBzY2hlbWEgYW5kIHRoZSByZWxhdGlvbiB0byBwcm9qZWN0cy5cbiAqIEl0IGNvbWJpbmVzIHBpcGVzIHNlbGVjdGluZyBkYXRhIGZyb20gdGhlXG4gKiAtIGFjdGl2YXRlZCBwcm9qZWN0XG4gKiAtIGFsdGVybmF0aXZlcyAobm90IGluIHByb2plY3QgYnV0IGluIG90aGVycylcbiAqIC0gcmVwb1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uUGlwZXNTZXJ2aWNlIHtcblxuICBpbmZSZXBvOiBJbmZTZWxlY3RvcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGI6IEluZm9ybWF0aW9uQmFzaWNQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBwOiBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgICBwcml2YXRlIGM6IENvbmZpZ3VyYXRpb25QaXBlc1NlcnZpY2UsXG4gICAgcHVibGljIHRpbWVQcmltaXRpdmVQaXBlOiBUaW1lUHJpbWl0aXZlUGlwZSxcbiAgICBwcml2YXRlIHRpbWVTcGFuUGlwZTogVGltZVNwYW5QaXBlLFxuICAgIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPlxuICApIHtcbiAgICB0aGlzLmluZlJlcG8gPSBuZXcgSW5mU2VsZWN0b3IobmdSZWR1eCwgb2YoJ3JlcG8nKSlcbiAgfVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBQaXBlIHRoZSBwcm9qZWN0IGVudGl0aWVzXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdExlbmd0aChsOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgc3dpdGNoIChsLmxpc3RUeXBlKSB7XG4gICAgICBjYXNlICdhcHBlbGxhdGlvbic6XG4gICAgICBjYXNlICdlbnRpdHktcHJldmlldyc6XG4gICAgICBjYXNlICdsYW5ndWFnZSc6XG4gICAgICBjYXNlICdwbGFjZSc6XG4gICAgICBjYXNlICdkaW1lbnNpb24nOlxuICAgICAgY2FzZSAnbGFuZ1N0cmluZyc6XG4gICAgICBjYXNlICd0ZW1wb3JhbC1lbnRpdHknOlxuICAgICAgICByZXR1cm4gdGhpcy5waXBlTGlzdChsLCBwa0VudGl0eSkucGlwZShtYXAoaXRlbXMgPT4gaXRlbXMubGVuZ3RoKSlcblxuICAgICAgY2FzZSAndGltZS1zcGFuJzpcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDcyLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDcxLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MCwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTEsIHBrRW50aXR5KSxcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUyLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MywgcGtFbnRpdHkpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICB0YXAoKHgpID0+IHtcblxuICAgICAgICAgIH0pLFxuICAgICAgICAgIG1hcChpdGVtcyA9PiBpdGVtcy5maWx0ZXIoeCA9PiB4Lmxlbmd0aCA+IDApLmxlbmd0aCkpXG5cbiAgICAgIC8vIGNhc2UgJ3RleHQtcHJvcGVydHknOlxuICAgICAgLy8gICByZXR1cm4gdGhpcy5waXBlTGlzdFRleHRQcm9wZXJ0eShsLCBwa0VudGl0eSkucGlwZShtYXAoaXRlbXMgPT4gaXRlbXMubGVuZ3RoKSlcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gICAgICAgIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xuICAgIH1cbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3QobDogU3ViZmllbGQsIHBrRW50aXR5LCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8SXRlbUxpc3Q+IHtcbiAgICBpZiAobC5saXN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuIHRoaXMucGlwZUxpc3RBcHBlbGxhdGlvbihsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5lbnRpdHlQcmV2aWV3KSByZXR1cm4gdGhpcy5waXBlTGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ3VhZ2UpIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ3VhZ2UobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUucGxhY2UpIHJldHVybiB0aGlzLnBpcGVMaXN0UGxhY2UobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gdGhpcy5waXBlTGlzdERpbWVuc2lvbihsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5nU3RyaW5nKSByZXR1cm4gdGhpcy5waXBlTGlzdExhbmdTdHJpbmcobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUudGVtcG9yYWxFbnRpdHkpIHJldHVybiB0aGlzLnBpcGVMaXN0RW50aXR5UHJldmlldyhsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS50aW1lU3Bhbikge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1UaW1lU3Bhbihwa0VudGl0eSkucGlwZShcbiAgICAgICAgbWFwKCh0cykgPT4gW3RzXS5maWx0ZXIoaSA9PiBpLnByb3BlcnRpZXMubGVuZ3RoID4gMCkpXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0QmFzaWNTdGF0ZW1lbnRJdGVtcyhsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIHBrUHJvamVjdDogbnVtYmVyKTogT2JzZXJ2YWJsZTxCYXNpY1N0YXRlbWVudEl0ZW1bXT4ge1xuICAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gICAgICB0aGlzLmIucGlwZU91dGdvaW5nQmFzaWNTdGF0ZW1lbnRJdGVtc0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHksIHBrUHJvamVjdCkgOlxuICAgICAgdGhpcy5iLnBpcGVJbmdvaW5nQmFzaWNTdGF0ZW1lbnRJdGVtc0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHksIHBrUHJvamVjdClcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgaXRlbXMgaW4gYXBwZWxsYXRpb24gZmllbGRcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RBcHBlbGxhdGlvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW1bXT4ge1xuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAqIFBpcGUgdGhlIGl0ZW1zIGluIGVudGl0eSBwcmV2aWV3IGZpZWxkXG4gKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdEVudGl0eVByZXZpZXc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFnKGBiZWZvcmUtJHtwa0VudGl0eX0tJHtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5fS0ke2xpc3REZWZpbml0aW9uLnRhcmdldENsYXNzfWApLFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZykpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcylcbiAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5vcmROdW0gPiBiLm9yZE51bSA/IDEgOiAtMSksXG4gICAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgfSksXG4gICAgICAgIHRhZyhgYWZ0ZXItJHtwa0VudGl0eX0tJHtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5fS0ke2xpc3REZWZpbml0aW9uLnRhcmdldENsYXNzfWApLFxuICAgICAgKVxuXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RMYW5ndWFnZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBpdGVtcyBpbiBwbGFjZSBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtUGxhY2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgaXRlbXMgaW4gcGxhY2UgbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdERpbWVuc2lvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gKiBQaXBlIHRoZSBpdGVtcyBpbiBsYW5nU3RyaW5nIGxpc3RcbiAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0TGFuZ1N0cmluZzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxMYW5nU3RyaW5nSXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG5cbiAgfVxuXG4gIC8qKlxuICAgKiBwaXBlIHRoZSBwcm9qZWN0IHJlbGF0aW9uIG9mIGdpdmVuIHN0YXRtZW50LCBpZiB0aGUgc2NvcGUgb2YgdGhpcyBwYWdlIGlzIGluUHJvamVjdFxuICAgKiBAcGFyYW0gc3RtdCBJbmZTdGF0ZW1lbnQgdG8gYmUgY29tcGxldGVkIHdpdGggcHJvalJlbFxuICAgKiBAcGFyYW0gcGFnZSBwYWdlIGZvciB3aGljaCB3ZSBhcmUgcGlwaW5nIHRoaXMgc3R1ZmZcbiAgICovXG4gIHBpcGVQcm9qUmVsT2ZTdGF0ZW1lbnQoc3RtdDogSW5mU3RhdGVtZW50LCBwYWdlOiBHdlN1YmZpZWxkUGFnZSk6IE9ic2VydmFibGU8U3RhdGVtZW50UHJvalJlbD4ge1xuICAgIGlmIChwYWdlLnNjb3BlLmluUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSRcbiAgICAgICAgLmtleShwYWdlLnNjb3BlLmluUHJvamVjdCArICdfJyArIHN0bXQucGtfZW50aXR5KS5waXBlKFxuICAgICAgICAgIG1hcChcbiAgICAgICAgICAgIHByb2pSZWwgPT4gKHtcbiAgICAgICAgICAgICAgcHJvalJlbCxcbiAgICAgICAgICAgICAgb3JkTnVtOiBwYWdlLmlzT3V0Z29pbmcgPyBwcm9qUmVsLm9yZF9udW1fb2ZfcmFuZ2UgOiBwcm9qUmVsLm9yZF9udW1fb2ZfZG9tYWluXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH1cbiAgfVxuICAvKipcbiAgICogcGlwZSB0aGUgdGFyZ2V0IG9mIGdpdmVuIHN0YXRtZW50XG4gICAqIEBwYXJhbSBzdG10IEluZlN0YXRlbWVudCB0byBiZSBjb21wbGV0ZWQgd2l0aCB0YXJnZXRcbiAgICogQHBhcmFtIHBhZ2UgcGFnZSBmb3Igd2hpY2ggd2UgYXJlIHBpcGluZyB0aGlzIHN0dWZmXG4gICAqIEBwYXJhbSBzdWJmaWVsZFR5cGUgdHlwZSBvZiBzdWJmaWVsZCBmb3Igd2hpY2ggd2UgcGlwZSB0aGlzIHN0dXBwXG4gICAqL1xuICBwaXBlVGFyZ2V0T2ZTdGF0ZW1lbnQoc3RtdDogSW5mU3RhdGVtZW50LCBwYWdlOiBHdlN1YmZpZWxkUGFnZSwgc3ViZmllbGRUeXBlOiBTdWJmaWVsZFR5cGUpOiBPYnNlcnZhYmxlPFN0YXRlbWVudFRhcmdldD4ge1xuICAgIGNvbnN0IGlzT3V0Z29pbmcgPSBwYWdlLmlzT3V0Z29pbmdcbiAgICBjb25zdCB0YXJnZXRJbmZvID0gaXNPdXRnb2luZyA/IHN0bXQuZmtfb2JqZWN0X2luZm8gOiBzdG10LmZrX3N1YmplY3RfaW5mbztcbiAgICAvLyBoZXJlIHlvdSBjb3VsZCBhZGQgdGFyZ2V0RGF0YSBvciB0YXJnZXRDZWxsXG5cbiAgICBpZiAoc3ViZmllbGRUeXBlLmFwcGVsbGF0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuYXBwZWxsYXRpb24kLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgIG1hcChhcHBlbGxhdGlvbiA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgIHRhcmdldExhYmVsOiBhcHBlbGxhdGlvbi5zdHJpbmcsXG4gICAgICAgICAgICB0YXJnZXRDbGFzczogYXBwZWxsYXRpb24uZmtfY2xhc3MsXG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgYXBwZWxsYXRpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLnRlbXBvcmFsRW50aXR5KSB7XG4gICAgICAvLyBwaXBlIHRoZSBzdWJmaWVsZHMgb2YgdGhlIHRlbXBvcmFsRW50aXR5IGNsYXNzXG4gICAgICAvLyBpZiB0aGUgc3ViZmllbGRUeXBlcyBvZiB0aGVzZSBhcmUgdGVtcG9yYWxFbnRpdHkgYWdhaW4sIHJlcGxhY2UgaXQgd2l0aCBlbnRpdHlQcmV2aWV3XG4gICAgICAvLyBpbiBvcmRlciB0byBwcmV2ZW50IGluZmluaXQgY3ljbGVcblxuICAgICAgLy8gZm9yIGVhY2ggb2YgdGhlc2Ugc3ViZmllbGRzXG4gICAgICAvLyAtIGNyZWF0ZSBwYWdlOkd2U3ViZmllbGRQYWdlXG4gICAgICAvLyAtIGNhbGwgdGhpcy5waXBlU3ViZmllbGRQYWdlKHBhZ2UsIHN1YmZpZWxkVHlwZSlcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGltcGxlbWVudGF0aW9uIGZvdW5kIGZvciBzdWJmaWVsZFR5cGUgJHtKU09OLnN0cmluZ2lmeShzdWJmaWVsZFR5cGUpfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIHBpcGUgdGFyZ2V0IGFuZCBwcm9qUmVsIG9mIHRoZSBnaXZlbiBzdGF0ZW1lbnRcbiAgICovXG4gIHBpcGVTdGF0ZW1lbnRXaXRoVGFyZ2V0KHN0bXQ6IEluZlN0YXRlbWVudCwgcGFnZTogR3ZTdWJmaWVsZFBhZ2UsIHN1YmZpZWxkVHlwZTogU3ViZmllbGRUeXBlKTogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRXaXRoVGFyZ2V0PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVUYXJnZXRPZlN0YXRlbWVudChzdG10LCBwYWdlLCBzdWJmaWVsZFR5cGUpLFxuICAgICAgdGhpcy5waXBlUHJvalJlbE9mU3RhdGVtZW50KHN0bXQsIHBhZ2UpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbdGFyZ2V0LCBwcm9qUmVsXSkgPT4gKHsgLi4udGFyZ2V0LCAuLi5wcm9qUmVsIH0pKVxuICAgIClcbiAgfVxuXG4gIHBpcGVTdWJmaWVsZFBhZ2UocGFnZTogR3ZTdWJmaWVsZFBhZ2UsIHN1YmZpZWxkVHlwZTogU3ViZmllbGRUeXBlKTogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRXaXRoVGFyZ2V0W10+IHtcbiAgICAvLyBnZXQgdGhlIHN0YXRtZW50cyBvZiB0aGF0IHBhZ2VcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5wYWdpbmF0aW9uJC5waXBlUGFnZShwYWdlKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgICBwa1N0bXRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICAgICAgcGtTdG10cy5tYXAocGtTdG10ID0+IHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfcGtfZW50aXR5JC5rZXkocGtTdG10KVxuICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBzdGF0ZW1lbnQsIGRlcGVuZGluZyBvbiB0aGUgc3ViZmllbGRUeXBlLCBsb2FkIHRoZSBjb3JyZXNwb25kaW5nIHRhcmdldFxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoc3RtdCA9PiB0aGlzLnBpcGVTdGF0ZW1lbnRXaXRoVGFyZ2V0KHN0bXQsIHBhZ2UsIHN1YmZpZWxkVHlwZSkpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgfVxuXG4gIC8vIHBpcGVTdGF0ZW1lbnRMaXN0UGFnZShcbiAgLy8gICBwYWdpbmF0ZUJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSxcbiAgLy8gICBsaW1pdDogbnVtYmVyLFxuICAvLyAgIG9mZnNldDogbnVtYmVyLFxuICAvLyAgIHBrUHJvamVjdDogbnVtYmVyLFxuICAvLyAgIGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCxcbiAgLy8gICBhbHRlcm5hdGl2ZSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgLy8gICAvLyBwcmVwYXJlIHBhZ2UgbG9hZGVyXG4gIC8vICAgY29uc3QgcGFnZUxvYWRlciQgPSBhbHRlcm5hdGl2ZSA/IHRoaXMuaW5mUmVwby5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kIDogdGhpcy5zLmluZiQuc3RhdGVtZW50JC5wYWdpbmF0aW9uJDtcblxuICAvLyAgIC8vIHByZXBhcmUgYmFzaWMgc3RhdGVtZW50IGl0ZW0gbG9hZGVyXG4gIC8vICAgY29uc3QgYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyID0gKHBrU3RhdGVtZW50LCBpc091dGdvaW5nLCBwa1Byb2opID0+IHtcbiAgLy8gICAgIHJldHVybiBhbHRlcm5hdGl2ZSA/XG4gIC8vICAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrU3RhdGVtZW50LCBpc091dGdvaW5nKSA6XG4gIC8vICAgICAgIHRoaXMuYi5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1Byb2osIHBrU3RhdGVtZW50LCBpc091dGdvaW5nKVxuICAvLyAgIH1cblxuICAvLyAgIGNvbnN0IHBhZ2luYXRlZFN0YXRlbWVudFBrcyQgPSBwYWdlTG9hZGVyJC5waXBlUGFnZShwYWdpbmF0ZUJ5LCBsaW1pdCwgb2Zmc2V0KVxuXG4gIC8vICAgcmV0dXJuIHBhZ2luYXRlZFN0YXRlbWVudFBrcyQucGlwZShcbiAgLy8gICAgIHN3aXRjaE1hcCgocGFnaW5hdGVkU3RhdGVtZW50UGtzKSA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgLy8gICAgICAgcGFnaW5hdGVkU3RhdGVtZW50UGtzLm1hcChwa1N0YXRlbWVudCA9PiBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIocGtTdGF0ZW1lbnQsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsIHBrUHJvamVjdClcbiAgLy8gICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gIC8vICAgICAgICAgICBzd2l0Y2hNYXAoeCA9PiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyh4LmlzT3V0Z29pbmcgPyB4LnN0YXRlbWVudC5ma19vYmplY3RfaW5mbyA6IHguc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbylcbiAgLy8gICAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgICAgbWFwKChwcmV2aWV3KSA9PiB7XG4gIC8vICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBFbnRpdHlQcmV2aWV3SXRlbSA9IHtcbiAgLy8gICAgICAgICAgICAgICAgICAgLi4ueCxcbiAgLy8gICAgICAgICAgICAgICAgICAgcHJldmlldyxcbiAgLy8gICAgICAgICAgICAgICAgICAgZmtDbGFzczogcHJldmlldy5ma19jbGFzc1xuICAvLyAgICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gIC8vICAgICAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICAgICAgKVxuICAvLyAgICAgICAgICAgKSlcblxuICAvLyAgICAgICApXG4gIC8vICAgICApXG4gIC8vICAgICApKVxuXG4gIC8vIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSB0ZW1wb3JhbCBlbnRpdGllcyBjb25uZWN0ZWQgdG8gZ2l2ZW4gZW50aXR5IGJ5IHN0YXRlbWVudHMgdGhhdCBhcmUgaW4gdGhlIGN1cnJlbnQgcHJvamVjdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICAvLyBwaXBlVGVtcG9yYWxFbnRpdHlUYWJsZVJvd3MoXG4gIC8vICAgcGFnaW5hdGVCeTogUGFnaW5hdGVCeVBhcmFtW10sXG4gIC8vICAgbGltaXQ6IG51bWJlcixcbiAgLy8gICBvZmZzZXQ6IG51bWJlcixcbiAgLy8gICBwa1Byb2plY3Q6IG51bWJlcixcbiAgLy8gICBsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsXG4gIC8vICAgZmllbGREZWZpbml0aW9uczogRmllbGRbXSxcbiAgLy8gICBhbHRlcm5hdGl2ZSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxUZW1wb3JhbEVudGl0eUl0ZW1bXT4ge1xuXG4gIC8vICAgLy8gY29uc3QgcHJvcGVydHlJdGVtVHlwZSA9IHRoaXMucHJvcGVydHlJdGVtVHlwZShmaWVsZERlZmluaXRpb25zKVxuXG4gIC8vICAgY29uc3QgdGFyZ2V0RW50aXR5T2ZTdGF0ZW1lbnRJdGVtID0gKHI6IEJhc2ljU3RhdGVtZW50SXRlbSkgPT4gci5pc091dGdvaW5nID8gci5zdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8gOiByLnN0YXRlbWVudC5ma19zdWJqZWN0X2luZm87XG5cbiAgLy8gICAvLyBwcmVwYXJlIHBhZ2UgbG9hZGVyXG4gIC8vICAgY29uc3QgcGFnZUxvYWRlciQgPSBhbHRlcm5hdGl2ZSA/IHRoaXMuaW5mUmVwby5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kIDogdGhpcy5zLmluZiQuc3RhdGVtZW50JC5wYWdpbmF0aW9uJDtcblxuICAvLyAgIC8vIHByZXBhcmUgYmFzaWMgc3RhdGVtZW50IGl0ZW0gbG9hZGVyXG4gIC8vICAgY29uc3QgYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyID0gKHBrU3RhdGVtZW50LCBpc091dGdvaW5nLCBwa1Byb2opID0+IHtcbiAgLy8gICAgIHJldHVybiBhbHRlcm5hdGl2ZSA/XG4gIC8vICAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrU3RhdGVtZW50LCBpc091dGdvaW5nKSA6XG4gIC8vICAgICAgIHRoaXMuYi5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1Byb2osIHBrU3RhdGVtZW50LCBpc091dGdvaW5nKVxuICAvLyAgIH1cblxuICAvLyAgIC8vIHByZXBhcmUgVGVFblJvdyBsb2FkZXJcbiAgLy8gICBjb25zdCByb3dMb2FkZXIgPSAodGFyZ2V0RW50aXR5UGssIGZpZWxkRGVmLCBwa1Byb2opID0+IHtcbiAgLy8gICAgIHJldHVybiBhbHRlcm5hdGl2ZSA/XG4gIC8vICAgICAgIHRoaXMucGlwZUl0ZW1UZUVuUm93KHRhcmdldEVudGl0eVBrLCBmaWVsZERlZiwgbnVsbCwgdHJ1ZSkgOlxuICAvLyAgICAgICB0aGlzLnBpcGVJdGVtVGVFblJvdyh0YXJnZXRFbnRpdHlQaywgZmllbGREZWYsIHBrUHJvaiwgZmFsc2UpXG4gIC8vICAgfVxuXG4gIC8vICAgY29uc3QgcGFnaW5hdGVkU3RhdGVtZW50UGtzJCA9IHBhZ2VMb2FkZXIkLnBpcGVQYWdlKHBhZ2luYXRlQnksIGxpbWl0LCBvZmZzZXQpXG5cbiAgLy8gICBjb25zdCByb3dzJCA9IHBhZ2luYXRlZFN0YXRlbWVudFBrcyQucGlwZShcbiAgLy8gICAgIHN3aXRjaE1hcCgocGFnaW5hdGVkU3RhdGVtZW50UGtzKSA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgLy8gICAgICAgcGFnaW5hdGVkU3RhdGVtZW50UGtzLm1hcChwa1N0YXRlbWVudCA9PiBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIocGtTdGF0ZW1lbnQsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsIHBrUHJvamVjdClcbiAgLy8gICAgICAgICAucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAvLyAgICAgICApXG4gIC8vICAgICApXG4gIC8vICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgIHN3aXRjaE1hcCgodGVFblN0YXRlbWVudCkgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gIC8vICAgICAgICAgICB0ZUVuU3RhdGVtZW50Lm1hcCgoYmFzaWNTdGF0ZW1lbnRJdGVtKSA9PiB7XG4gIC8vICAgICAgICAgICAgIGNvbnN0IHBrVGVFbiA9IHRhcmdldEVudGl0eU9mU3RhdGVtZW50SXRlbShiYXNpY1N0YXRlbWVudEl0ZW0pO1xuICAvLyAgICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgLy8gICAgICAgICAgICAgICByb3dMb2FkZXIoXG4gIC8vICAgICAgICAgICAgICAgICBwa1RlRW4sXG4gIC8vICAgICAgICAgICAgICAgICBmaWVsZERlZmluaXRpb25zLFxuICAvLyAgICAgICAgICAgICAgICAgLy8gcHJvcGVydHlJdGVtVHlwZSxcbiAgLy8gICAgICAgICAgICAgICAgIHBrUHJvamVjdFxuICAvLyAgICAgICAgICAgICAgICksXG4gIC8vICAgICAgICAgICAgICAgdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgcGtUZUVuKVxuICAvLyAgICAgICAgICAgICApLnBpcGUoXG4gIC8vICAgICAgICAgICAgICAgbWFwKChbcm93LCB0ZUVuUHJvalJlbF0pID0+IHtcbiAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRlbXBvcmFsRW50aXR5SXRlbSA9IHtcbiAgLy8gICAgICAgICAgICAgICAgICAgLi4uYmFzaWNTdGF0ZW1lbnRJdGVtLFxuICAvLyAgICAgICAgICAgICAgICAgICByb3csXG4gIC8vICAgICAgICAgICAgICAgICAgIHBrRW50aXR5OiBwa1RlRW4sXG4gIC8vICAgICAgICAgICAgICAgICAgIHRlRW5Qcm9qUmVsXG4gIC8vICAgICAgICAgICAgICAgICB9O1xuICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1cbiAgLy8gICAgICAgICAgICAgICB9KVxuICAvLyAgICAgICAgICAgICApXG4gIC8vICAgICAgICAgICB9KVxuICAvLyAgICAgICAgICkpLFxuICAvLyAgICAgICApKSxcblxuICAvLyAgIClcbiAgLy8gICByZXR1cm4gcm93cyRcbiAgLy8gfVxuXG5cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtVGVFblJvdyhwa0VudGl0eTogbnVtYmVyLCBmaWVsZERlZmluaXRpb25zOiBGaWVsZFtdLCBwa1Byb2plY3Q6IG51bWJlciwgcmVwbzogYm9vbGVhbik6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlSb3c+IHtcblxuICAgIC8vIHBpcGUgb3V0Z29pbmcgc3RhdGVtZW50c1xuICAgIGNvbnN0IG91dGdvaW5nU3RhdGVtZW50cyQgPSByZXBvID8gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KSA6IHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTtcbiAgICAvLyBwaXBlIGluZ29pbmcgc3RhdGVtZW50c1xuICAgIGNvbnN0IGluZ29pbmdTdGF0ZW1lbnRzJCA9IHJlcG8gPyB0aGlzLmIucGlwZVJlcG9JbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSkgOiB0aGlzLmIucGlwZUluZ29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTtcblxuXG4gICAgLy8gcGlwZSBhbGwgc3RhdGVtZW50cyB3aXRoIGluZm9ybWF0aW9uIGxlYWYgaXRlbXNcblxuICAgIGNvbnN0IG91dGdvaW5nSXRlbXMkOiBPYnNlcnZhYmxlPFN0YXRlbWVudEl0ZW1bXT4gPSBvdXRnb2luZ1N0YXRlbWVudHMkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgc3RhdGVtZW50c1xuICAgICAgICAgIC5maWx0ZXIoc3RhdGVtZW50ID0+ICEhc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKSAvLyByZW1vdmUgc3RhdGVtZW50cyBub3QgcG9pbnRpbmcgdG8gaW5mb3JtYXRpb25cbiAgICAgICAgICAubWFwKHMgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNPdXRnb2luZyA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbShzLCBwa1Byb2plY3QsIGlzT3V0Z29pbmcpO1xuICAgICAgICAgIH0pXG4gICAgICApKVxuXG4gICAgKVxuICAgIGNvbnN0IGluZ29pbmdJdGVtcyQ6IE9ic2VydmFibGU8U3RhdGVtZW50SXRlbVtdPiA9IGluZ29pbmdTdGF0ZW1lbnRzJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIHN0YXRlbWVudHNcbiAgICAgICAgICAuZmlsdGVyKHN0YXRlbWVudCA9PiAhIXN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pIC8vIHJlbW92ZSBzdGF0ZW1lbnRzIG5vdCBwb2ludGluZyB0byBpbmZvcm1hdGlvblxuICAgICAgICAgIC5tYXAocyA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc091dGdvaW5nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbShzLCBwa1Byb2plY3QsIGlzT3V0Z29pbmcpO1xuICAgICAgICAgIH0pXG4gICAgICApKVxuXG4gICAgKVxuXG4gICAgY29uc3Qgc29ydEl0ZW1zID0gcmVwbyA/XG4gICAgICAoaXRlbTogU3RhdGVtZW50SXRlbVtdKSA9PiBpdGVtLnNvcnQoKGEsIGIpID0+IGEuc3RhdGVtZW50LmlzX2luX3Byb2plY3RfY291bnQgPiBiLnN0YXRlbWVudC5pc19pbl9wcm9qZWN0X2NvdW50ID8gMSA6IC0xKSA6XG4gICAgICAoaXRlbTogU3RhdGVtZW50SXRlbVtdKSA9PiBpdGVtO1xuXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChvdXRnb2luZ0l0ZW1zJCwgaW5nb2luZ0l0ZW1zJCkucGlwZShcblxuICAgICAgbWFwKChbb3V0Z29pbmdJdGVtcywgaW5nb2luZ0l0ZW1zXSkgPT4ge1xuICAgICAgICBjb25zdCBncm91cGVkT3V0ID0gZ3JvdXBCeSgoaSkgPT4gKGkgJiYgaS5zdGF0ZW1lbnQgPyBpLnN0YXRlbWVudC5ma19wcm9wZXJ0eS50b1N0cmluZygpIDogdW5kZWZpbmVkKSwgb3V0Z29pbmdJdGVtcyk7XG4gICAgICAgIGNvbnN0IGdyb3VwZWRJbiA9IGdyb3VwQnkoKGkpID0+IChpICYmIGkuc3RhdGVtZW50ID8gaS5zdGF0ZW1lbnQuZmtfcHJvcGVydHkudG9TdHJpbmcoKSA6IHVuZGVmaW5lZCksIGluZ29pbmdJdGVtcyk7XG4gICAgICAgIHJldHVybiB7IGdyb3VwZWRPdXQsIGdyb3VwZWRJbiB9XG4gICAgICB9KSxcbiAgICAgIC8vIGF1ZGl0VGltZSgxMCksXG4gICAgICBtYXAoKGQpID0+IHtcbiAgICAgICAgY29uc3Qgcm93OiBUZW1wb3JhbEVudGl0eVJvdyA9IHt9XG5cbiAgICAgICAgZmllbGREZWZpbml0aW9ucy5mb3JFYWNoKGZpZWxkRGVmaW5pdGlvbiA9PiB7XG5cbiAgICAgICAgICBsZXQgY2VsbDogVGVtcG9yYWxFbnRpdHlDZWxsO1xuICAgICAgICAgIGZpZWxkRGVmaW5pdGlvbi5saXN0RGVmaW5pdGlvbnMuZm9yRWFjaChsaXN0RGVmaW5pdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAobGlzdERlZmluaXRpb24ubGlzdFR5cGUudGltZVNwYW4pIHtcblxuICAgICAgICAgICAgICBjb25zdCB0ID0gcGljayhbJzcxJywgJzcyJywgJzE1MCcsICcxNTEnLCAnMTUyJywgJzE1MyddLCBkLmdyb3VwZWRPdXQpO1xuICAgICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModCk7XG4gICAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnQgPSBrZXlzLmxlbmd0aDtcblxuICAgICAgICAgICAgICBsZXQgbGFiZWw7XG4gICAgICAgICAgICAgIGlmIChpdGVtc0NvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVTcGFuS2V5czogQ3RybFRpbWVTcGFuRGlhbG9nUmVzdWx0ID0ge31cbiAgICAgICAgICAgICAgICBrZXlzLmZvckVhY2goa2V5ID0+IHsgdGltZVNwYW5LZXlzW2tleV0gPSB0W2tleV1bMF0udGltZVByaW1pdGl2ZSB9KVxuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVTcGFuID0gVGltZVNwYW5VdGlsLmZyb21UaW1lU3BhbkRpYWxvZ0RhdGEodGltZVNwYW5LZXlzKTtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IHRoaXMudGltZVNwYW5QaXBlLnRyYW5zZm9ybSh0aW1lU3Bhbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2VsbCA9IHtcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIGl0ZW1zQ291bnQsXG4gICAgICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHBrUHJvcGVydHk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBpc1RpbWVTcGFuOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgICAgICAgICAgIGlmIChkLmdyb3VwZWRPdXRbbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gc29ydEl0ZW1zKGQuZ3JvdXBlZE91dFtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSlcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgICAgICAgY2VsbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogbGlzdERlZmluaXRpb24uaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNDb3VudDogaXRlbXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcmV2aWV3OiAoKGZpcnN0SXRlbSB8fCB7fSkgYXMgRW50aXR5UHJldmlld0l0ZW0pLnByZXZpZXcsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmaXJzdEl0ZW0ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIHBrUHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0SXRlbSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuZ3JvdXBlZEluW2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IHNvcnRJdGVtcyhkLmdyb3VwZWRJbltsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSlcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgICAgICAgY2VsbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogbGlzdERlZmluaXRpb24uaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNDb3VudDogaXRlbXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcmV2aWV3OiAoKGZpcnN0SXRlbSB8fCB7fSkgYXMgRW50aXR5UHJldmlld0l0ZW0pLnByZXZpZXcsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmaXJzdEl0ZW0ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIHBrUHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0SXRlbSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pXG5cblxuICAgICAgICAgIHJvd1tmaWVsZERlZmluaXRpb24ubGFiZWxdID0gY2VsbDtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJvd1xuICAgICAgfSlcblxuXG4gICAgKVxuICB9XG5cblxuXG4gIC8vIEBzcHlUYWdcbiAgcHJpdmF0ZSBwaXBlSXRlbShyOiBJbmZTdGF0ZW1lbnQsIHBrUHJvamVjdDogbnVtYmVyLCBwcm9wSXNPdXRnb2luZzogYm9vbGVhbikge1xuXG4gICAgY29uc3QgdGFyZ2V0RW50aXR5ID0gcHJvcElzT3V0Z29pbmcgPyByLmZrX29iamVjdF9pbmZvIDogci5ma19zdWJqZWN0X2luZm87XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmdldE1vZGVsT2ZFbnRpdHkkKHRhcmdldEVudGl0eSkucGlwZShcbiAgICAgIHN3aXRjaE1hcChtID0+IHtcbiAgICAgICAgY29uc3QgbW9kZWxOYW1lOiBJbmZNb2RlbE5hbWUgPSBtID8gbS5tb2RlbE5hbWUgOiB1bmRlZmluZWQ7XG4gICAgICAgIHN3aXRjaCAobW9kZWxOYW1lKSB7XG4gICAgICAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKTtcbiAgICAgICAgICBjYXNlICdsYW5ndWFnZSc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpO1xuICAgICAgICAgIGNhc2UgJ3BsYWNlJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtUGxhY2Uocik7XG4gICAgICAgICAgY2FzZSAnZGltZW5zaW9uJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpO1xuICAgICAgICAgIGNhc2UgJ2xhbmdfc3RyaW5nJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtTGFuZ1N0cmluZyhyKTtcbiAgICAgICAgICBjYXNlICd0aW1lX3ByaW1pdGl2ZSc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVRpbWVQcmltaXRpdmUociwgcGtQcm9qZWN0KTsgLy8gVE9ETzogZW1pdHMgdHdpY2VcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIHByb3BJc091dGdvaW5nKTtcbiAgICAgICAgfVxuXG5cbiAgICAgIH0pXG4gICAgKVxuXG5cbiAgfVxuXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlRW50aXR5UHJvcGVydGllcyhsaXN0RGVmOiBTdWJmaWVsZCwgZmtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEVudGl0eVByb3BlcnRpZXM+IHtcblxuICAgIGlmIChsaXN0RGVmLmxpc3RUeXBlLmFwcGVsbGF0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdEFwcGVsbGF0aW9uKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUubGFuZ3VhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ3VhZ2UobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5wbGFjZSkge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RQbGFjZShsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmRpbWVuc2lvbikge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3REaW1lbnNpb24obGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5sYW5nU3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdExhbmdTdHJpbmcobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG5cblxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUuZW50aXR5UHJldmlldyB8fCBsaXN0RGVmLmxpc3RUeXBlLnRlbXBvcmFsRW50aXR5KSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdEVudGl0eVByZXZpZXcobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS50aW1lU3Bhbikge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1UaW1lU3Bhbihma0VudGl0eSlcbiAgICAgICAgLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXRlbXMgPSBpdGVtLnByb3BlcnRpZXMuZmluZChwID0+IHAuaXRlbXMubGVuZ3RoID4gMCkgPyBbe1xuICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVNwYW5QaXBlLnRyYW5zZm9ybSh0aW1lU3Bhbkl0ZW1Ub1RpbWVTcGFuKGl0ZW0pKSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdIC8vIFRPRE8gY2hlY2sgaWYgdGhlIHByb3BlcnRpZXMgb3IgdGhlIGl0ZW0gYXJlIHJlYWxseSBub3QgbmVlZGVkXG4gICAgICAgICAgfV0gOiBbXVxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsaXN0RGVmaW5pdGlvbjogbGlzdERlZixcbiAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gb2YobnVsbClcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcyhwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXM+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5pbmYkLnRlbXBvcmFsX2VudGl0eSQuYnlfcGtfZW50aXR5X2tleSQocGtFbnRpdHkpLFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0JCh7IGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHkgfSksXG4gICAgICB0aGlzLnMuaW5mJC50ZXh0X3Byb3BlcnR5JC5ieV9ma19jb25jZXJuZWRfZW50aXR5X2luZGV4ZWQkKHBrRW50aXR5KVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW3RlbXBvcmFsRW50aXR5LCBzdGF0ZW1lbnRzLCB0ZXh0UHJvcGVydGllc10pID0+IHtcbiAgICAgICAgY29uc3QgcmVzOiBUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMgPSB7XG4gICAgICAgICAgdGVtcG9yYWxFbnRpdHksXG4gICAgICAgICAgc3RhdGVtZW50czogc3RhdGVtZW50cyxcbiAgICAgICAgICB0ZXh0UHJvcGVydGllczogdmFsdWVzKHRleHRQcm9wZXJ0aWVzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIGl0ZW1zKTogRW50aXR5UHJvcGVydGllcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxpc3REZWZpbml0aW9uLFxuICAgICAgaXRlbXMsXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGltZSBzcGFuIGl0ZW0gaW4gdmVyc2lvbiBvZiBwcm9qZWN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtVGltZVNwYW4ocGtFbnRpdHkpOiBPYnNlcnZhYmxlPFRpbWVTcGFuSXRlbT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucC5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYy5waXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MoXG4gICAgICAgICAgRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTlxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGZpZWxkRGVmcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChmaWVsZERlZnMubWFwKGZpZWxkRGVmID0+IHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgICAgICAgICAgZmtfcHJvcGVydHk6IGZpZWxkRGVmLnByb3BlcnR5LnBrUHJvcGVydHksXG4gICAgICAgICAgICAgIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcE9yKFtdLCBzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzLm1hcChzdGF0ZW1lbnQgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zLmluZiQudGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgc3RhdGVtZW50LnBrX2VudGl0eSlcbiAgICAgICAgICAgICAgICAgICkucGlwZShtYXAoKFtpbmZUaW1lUHJpbWl0aXZlLCBwcm9qUmVsXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAgICAgICAgICAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyOiAoKHByb2pSZWwuY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgcHJvalJlbCxcbiAgICAgICAgICAgICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlKSxcbiAgICAgICAgICAgICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApKSxcbiAgICAgICAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzOiBUaW1lU3BhblByb3BlcnR5ID0ge1xuICAgICAgICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbjogZmllbGREZWYubGlzdERlZmluaXRpb25zWzBdLCBpdGVtc1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgocHJvcGVydGllcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BzID0gcHJvcGVydGllcy5maWx0ZXIocCA9PiBwLml0ZW1zLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuaXRlbTogVGltZVNwYW5JdGVtID0ge1xuICAgICAgICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogcHJvcHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVzcGFuaXRlbVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG5cbiAgICApXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtQXBwZWxsYXRpb24oc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPEFwcGVsbGF0aW9uSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5hcHBlbGxhdGlvbiQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIG1hcChhcHBlbGxhdGlvbiA9PiB7XG4gICAgICAgIGlmICghYXBwZWxsYXRpb24pIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBub2RlOiBBcHBlbGxhdGlvbkl0ZW0gPSB7XG4gICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICBsYWJlbDogYXBwZWxsYXRpb24uc3RyaW5nLFxuICAgICAgICAgIGZrQ2xhc3M6IGFwcGVsbGF0aW9uLmZrX2NsYXNzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbUxhbmd1YWdlKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBtYXAobGFuZ3VhZ2UgPT4ge1xuICAgICAgICBpZiAoIWxhbmd1YWdlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3Qgbm9kZTogTGFuZ3VhZ2VJdGVtID0ge1xuICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgbGFiZWw6IGxhbmd1YWdlLm5vdGVzLFxuICAgICAgICAgIGZrQ2xhc3M6IGxhbmd1YWdlLmZrX2NsYXNzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVBsYWNlKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxQbGFjZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQucGxhY2UkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBtYXAocGxhY2UgPT4ge1xuICAgICAgICBpZiAoIXBsYWNlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3Qgbm9kZTogUGxhY2VJdGVtID0ge1xuICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgbGFiZWw6ICdXR1M4NDogJyArIHBsYWNlLmxhdCArICfCsCwgJyArIHBsYWNlLmxvbmcgKyAnwrAnLFxuICAgICAgICAgIGZrQ2xhc3M6IHBsYWNlLmZrX2NsYXNzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbURpbWVuc2lvbihzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5kaW1lbnNpb24kLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBzd2l0Y2hNYXAoKGRpbWVuc2lvbikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoZGltZW5zaW9uLmZrX21lYXN1cmVtZW50X3VuaXQpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAocHJldmlldyA9PiB7XG5cbiAgICAgICAgICAgICAgY29uc3Qgbm9kZTogRGltZW5zaW9uSXRlbSA9IHtcbiAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgIGxhYmVsOiBgJHtkaW1lbnNpb24ubnVtZXJpY192YWx1ZX0gJHtwcmV2aWV3LmVudGl0eV9sYWJlbH1gLFxuICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGRpbWVuc2lvbi5ma19jbGFzcyxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbUxhbmdTdHJpbmcoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPExhbmdTdHJpbmdJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmdfc3RyaW5nJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoXG4gICAgICAgIChsYW5nU3RyaW5nKSA9PiB7XG4gICAgICAgICAgaWYgKCFsYW5nU3RyaW5nKSByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKVxuICAgICAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5ndWFnZSQuYnlfcGtfZW50aXR5JC5rZXkobGFuZ1N0cmluZy5ma19sYW5ndWFnZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobGFuZ3VhZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghbGFuZ3VhZ2UpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbCA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChsYW5nU3RyaW5nLnN0cmluZykgbGFiZWwgPSBsYW5nU3RyaW5nLnN0cmluZ1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxhbmdTdHJpbmcucXVpbGxfZG9jICYmIGxhbmdTdHJpbmcucXVpbGxfZG9jLm9wcyAmJiBsYW5nU3RyaW5nLnF1aWxsX2RvYy5vcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBsYWJlbCA9IGxhbmdTdHJpbmcucXVpbGxfZG9jLm9wcy5tYXAob3AgPT4gb3AuaW5zZXJ0KS5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZTogTGFuZ1N0cmluZ0l0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICAgICAgZmtDbGFzczogbGFuZ1N0cmluZy5ma19jbGFzcyxcbiAgICAgICAgICAgICAgICAgIGxhbmd1YWdlLFxuICAgICAgICAgICAgICAgICAgZmtMYW5ndWFnZTogbGFuZ1N0cmluZy5ma19sYW5ndWFnZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICB9KVxuICAgIClcbiAgfVxuXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbUVudGl0eVByZXZpZXcoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KChpc091dGdvaW5nID8gc3RhdGVtZW50LmZrX29iamVjdF9pbmZvIDogc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbykpLnBpcGUoXG4gICAgICAvLyBmaWx0ZXIocHJldmlldyA9PiAhcHJldmlldy5sb2FkaW5nICYmICEhcHJldmlldyAmJiAhIXByZXZpZXcuZW50aXR5X3R5cGUpLFxuICAgICAgbWFwKHByZXZpZXcgPT4ge1xuICAgICAgICBpZiAoIXByZXZpZXcpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub2RlOiBFbnRpdHlQcmV2aWV3SXRlbSA9IHtcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgIHByZXZpZXcsXG4gICAgICAgICAgbGFiZWw6IHByZXZpZXcuZW50aXR5X2xhYmVsIHx8ICcnLFxuICAgICAgICAgIGZrQ2xhc3M6IHByZXZpZXcuZmtfY2xhc3NcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBrXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtVGltZVByaW1pdGl2ZShzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCwgcGtQcm9qZWN0KTogT2JzZXJ2YWJsZTxUaW1lUHJpbWl0aXZlSXRlbT4ge1xuICAgIGlmIChwa1Byb2plY3QpIHtcbiAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICB0aGlzLnMuaW5mJC50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkLmtleShwa1Byb2plY3QgKyAnXycgKyBzdGF0ZW1lbnQucGtfZW50aXR5KS5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gICAgICApLnBpcGUoXG4gICAgICAgIG1hcCgoW2luZlRpbWVQcmltaXRpdmUsIHByb2pSZWxdKSA9PiB7XG4gICAgICAgICAgaWYgKCFpbmZUaW1lUHJpbWl0aXZlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICBjYWxlbmRhcjogKChwcm9qUmVsLmNhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc3Qgbm9kZTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH0pKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbmZSZXBvLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoZmlsdGVyKHggPT4gISF4KSkucGlwZShcbiAgICAgICAgbWFwKGluZlRpbWVQcmltaXRpdmUgPT4ge1xuICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgICAgICAgICAgIGNhbGVuZGFyOiAoKHN0YXRlbWVudC5jb21tdW5pdHlfZmF2b3JpdGVfY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zdCBub2RlOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlKSxcbiAgICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgKiBQaXBlIGFsdGVybmF0aXZlcyAobm90IGluIHByb2plY3QpXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdExlbmd0aChsOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgc3dpdGNoIChsLmxpc3RUeXBlKSB7XG4gICAgICBjYXNlICdhcHBlbGxhdGlvbic6XG4gICAgICBjYXNlICdlbnRpdHktcHJldmlldyc6XG4gICAgICBjYXNlICdsYW5ndWFnZSc6XG4gICAgICBjYXNlICdwbGFjZSc6XG4gICAgICBjYXNlICdsYW5nU3RyaW5nJzpcbiAgICAgIGNhc2UgJ3RlbXBvcmFsLWVudGl0eSc6XG4gICAgICBjYXNlICd0aW1lLXNwYW4nOlxuICAgICAgICByZXR1cm4gdGhpcy5waXBlQWx0TGlzdFN0YXRlbWVudHMobCwgcGtFbnRpdHkpLnBpcGUobWFwKGl0ZW1zID0+IGl0ZW1zLmxlbmd0aCkpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0KGw6IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8SXRlbUxpc3Q+IHtcbiAgICBpZiAobC5saXN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RBcHBlbGxhdGlvbihsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmVudGl0eVByZXZpZXcpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0RW50aXR5UHJldmlldyhsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmd1YWdlKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdExhbmd1YWdlKGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUucGxhY2UpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0UGxhY2UobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5kaW1lbnNpb24pIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0RGltZW5zaW9uKGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ1N0cmluZykgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RMYW5nU3RyaW5nKGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUudGVtcG9yYWxFbnRpdHkpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0RW50aXR5UHJldmlldyhsLCBwa0VudGl0eSlcbiAgICBlbHNlIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdFN0YXRlbWVudHMobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpIDpcbiAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgICApXG4gIH1cblxuICAvKipcbiAgKiBQaXBlIHRoZSBpdGVtcyBpbiBlbnRpdHkgcHJldmlldyBmaWVsZFxuICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0RW50aXR5UHJldmlldzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkgOlxuICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUluZ29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZykpKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzXG4gICAgICAgICAgICAgIC5maWx0ZXIobm9kZSA9PiAhIW5vZGUpXG4gICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLm9yZE51bSA+IGIub3JkTnVtID8gMSA6IC0xKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICB9KSlcblxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIHBsYWNlIGxpc3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RQbGFjZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxQbGFjZUl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbVBsYWNlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gZGltZW5zaW9uIGxpc3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3REaW1lbnNpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gbGFuZ1N0cmluZyBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0TGFuZ1N0cmluZzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxMYW5nU3RyaW5nSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ1N0cmluZyhyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBhcHBlbGxhdGlvbiBmaWVsZFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdEFwcGVsbGF0aW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEFwcGVsbGF0aW9uSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gbGFuZ3VhZ2UgZmllbGRcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RMYW5ndWFnZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBQaXBlIHJlcG8gdmlld3MgKGNvbW11bml0eSBmYXZvcml0ZXMsIHdoZXJlIHJlc3RyaWN0ZWQgYnkgcXVhbnRpZmllcnMpXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgLyoqXG4gICAqIFBpcGUgcmVwb3NpdG9yeSB0ZW1wb3JhbCBlbnRpdHkgaXRlbSBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgICovXG5cblxuICAvKipcbiAgICogUGlwZSBhcHBlbGxhdGlvbiBsaXN0IGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3RBcHBlbGxhdGlvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogUGlwZSBsYW5ndWFnZSBsaXN0IGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvTGlzdExhbmd1YWdlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGlwZSBwbGFjZSBsaXN0IGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3RQbGFjZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxQbGFjZUl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbVBsYWNlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogUGlwZSBwbGFjZSBsaXN0IGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvTGlzdERpbWVuc2lvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1EaW1lbnNpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cbiAgLyoqXG4gICogUGlwZSB0aGUgaXRlbXMgaW4gZW50aXR5IHByZXZpZXcgZmllbGQsIGNvbm5lY3RlZCBieSBjb21tdW5pdHkgZmF2b3JpdGUgc3RhdGVtZW50c1xuICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvTGlzdEVudGl0eVByZXZpZXc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgICAgIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpIDpcbiAgICAgIHRoaXMuYi5waXBlUmVwb0luZ29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpKSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcylcbiAgICAgICAgICAgICAgLy8gLnNvcnQoKGEsIGIpID0+IGEub3JkTnVtID4gYi5vcmROdW0gPyAxIDogLTEpXG4gICAgICAgICAgICApKVxuICAgICAgfSksXG4gICAgICBzdGFydFdpdGgoW10pXG4gICAgKVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIHJlcG8gdGltZSBzcGFuIGl0ZW1cbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9JdGVtVGltZVNwYW4ocGtFbnRpdHkpOiBPYnNlcnZhYmxlPFRpbWVTcGFuSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnAucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmMucGlwZUJhc2ljQW5kU3BlY2lmaWNGaWVsZHMoXG4gICAgICAgICAgRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTlxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGZpZWxkRGVmaW5pdGlvbnMgPT4ge1xuXG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChmaWVsZERlZmluaXRpb25zLm1hcChmaWVsZERlZiA9PlxuICAgICAgICAgICAgICB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGZpZWxkRGVmLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwT3IoW10sIHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50cy5tYXAoc3RhdGVtZW50ID0+XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZSZXBvLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pXG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAoKGluZlRpbWVQcmltaXRpdmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxlbmRhcjogKChzdGF0ZW1lbnQuY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKSksXG4gICAgICAgICAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXM6IFRpbWVTcGFuUHJvcGVydHkgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb246IGZpZWxkRGVmLmxpc3REZWZpbml0aW9uc1swXSwgaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7IGxpc3REZWZpbml0aW9uOiBmaWVsZERlZi5saXN0RGVmaW5pdGlvbnNbMF0sIGl0ZW1zOiBbXSB9IGFzIFRpbWVTcGFuUHJvcGVydHkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSkucGlwZShcbiAgICAgICAgICAgICAgbWFwKChwcm9wZXJ0aWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZXNwYW5pdGVtOiBUaW1lU3Bhbkl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLmZpbHRlcihwcm9wcyA9PiBwcm9wcy5pdGVtcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZXNwYW5pdGVtXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSlcblxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBsYWJlbCBvZiBnaXZlbiBlbnRpdHlcbiAgICogVGhpcyB3aWxsIHVzZSBlbnRpdHkgcHJldmlld3MgZm9yIGdldHRpbmcgc3RyaW5ncyBvZiByZWxhdGVkIHRlbXBvcmFsIGVudGl0aWVzXG4gICAqIFNvIHRoaXMgbWF5IHRha2UgYSBsaXR0bGUgd2hpbGVcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxhYmVsT2ZFbnRpdHkoZmtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuYi5waXBlQ2xhc3NPZkVudGl0eShma0VudGl0eSkucGlwZShcblxuICAgICAgLy8gZ2V0IHRoZSBkZWZpbml0aW9uIG9mIHRoZSBmaXJzdCBmaWVsZFxuICAgICAgc3dpdGNoTWFwKGZrQ2xhc3MgPT4gdGhpcy5jLnBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKGZrQ2xhc3MpLnBpcGUoXG4gICAgICAgIC8vIGdldCB0aGUgZmlyc3QgaXRlbSBvZiB0aGF0IGZpZWxkXG4gICAgICAgIHN3aXRjaE1hcChmaWVsZERlZiA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgICBmaWVsZERlZiAmJiBmaWVsZERlZi5sZW5ndGggP1xuICAgICAgICAgICAgZmllbGREZWZbMF0ubGlzdERlZmluaXRpb25zLm1hcChsaXN0RGVmID0+IHRoaXMucGlwZUVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgZmtFbnRpdHksIDEpKSA6XG4gICAgICAgICAgICBbXVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKHByb3BzID0+IHtcbiAgICAgICAgICAgIHByb3BzID0gcHJvcHMuZmlsdGVyKHByb3AgPT4gcHJvcC5pdGVtcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgaWYgKHByb3BzLmxlbmd0aCAmJiBwcm9wc1swXS5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb3BzWzBdLml0ZW1zWzBdLmxhYmVsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJydcbiAgICAgICAgICB9KVxuICAgICAgICApKSlcbiAgICAgICkpXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgY2xhc3MgbGFiZWwgb2YgZ2l2ZW4gZW50aXR5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVDbGFzc0xhYmVsT2ZFbnRpdHkoZmtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuYi5waXBlQ2xhc3NPZkVudGl0eShma0VudGl0eSkucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa0NsYXNzID0+IHRoaXMuYy5waXBlQ2xhc3NMYWJlbChwa0NsYXNzKSlcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgdGhlIHBrX2VudGl0eSBvZiB0aGUgdHlwZSBvZiBhbiBlbnRpdHlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVR5cGVPZkVudGl0eShwa0VudGl0eTogbnVtYmVyLCBoYXNUeXBlUHJvcGVydHk6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50PiB7XG4gICAgaWYgKGlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKHsgZmtfcHJvcGVydHk6IGhhc1R5cGVQcm9wZXJ0eSwgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eSB9KS5waXBlKG1hcChpdGVtcyA9PiB7XG4gICAgICAgIGlmICghaXRlbXMgfHwgT2JqZWN0LmtleXMoaXRlbXMpLmxlbmd0aCA8IDEpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlcyhpdGVtcylbMF1cbiAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7IGZrX3Byb3BlcnR5OiBoYXNUeXBlUHJvcGVydHksIGZrX29iamVjdF9pbmZvOiBwa0VudGl0eSB9KS5waXBlKFxuICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAgICAgICAgIGlmICghaXRlbXMgfHwgT2JqZWN0LmtleXMoaXRlbXMpLmxlbmd0aCA8IDEpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgZWxzZSByZXR1cm4gdmFsdWVzKGl0ZW1zKVswXVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVDbGFzc2VzQW5kVHlwZXMoZW5hYmxlZEluOiAnZW50aXRpZXMnIHwgJ3NvdXJjZXMnKSB7XG4gICAgcmV0dXJuIHRoaXMuYy5waXBlVHlwZUFuZFR5cGVkQ2xhc3NlcyhlbmFibGVkSW4pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoaXRlbXMgPT4gdGhpcy5waXBlQ2xhc3NBbmRUeXBlTm9kZXMoaXRlbXMpKSxcbiAgICApXG4gIH1cblxuICBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlQ2xhc3Nlc0FuZFR5cGVzT2ZDbGFzc2VzKGNsYXNzZXM6IG51bWJlcltdKSB7XG4gICAgcmV0dXJuIHRoaXMuYy5waXBlVHlwZUFuZFR5cGVkQ2xhc3Nlc09mVHlwZWRDbGFzc2VzKGNsYXNzZXMpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoaXRlbXMgPT4gdGhpcy5waXBlQ2xhc3NBbmRUeXBlTm9kZXMoaXRlbXMpKSxcbiAgICApXG4gIH1cblxuICBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlQ2xhc3NBbmRUeXBlTm9kZXModHlwZUFuZFR5cGVkQ2xhc3NlczogeyB0eXBlZENsYXNzOiBudW1iZXI7IHR5cGVDbGFzczogbnVtYmVyOyB9W10pOiBPYnNlcnZhYmxlPENsYXNzQW5kVHlwZU5vZGVbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgIHR5cGVBbmRUeXBlZENsYXNzZXMubWFwKGl0ZW0gPT4gdGhpcy5jLnBpcGVDbGFzc0xhYmVsKGl0ZW0udHlwZWRDbGFzcykucGlwZShcbiAgICAgICAgbWFwKGxhYmVsID0+ICh7XG4gICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgZGF0YTogeyBwa0NsYXNzOiBpdGVtLnR5cGVkQ2xhc3MsIHBrVHlwZTogbnVsbCB9XG4gICAgICAgIH0gYXMgQ2xhc3NBbmRUeXBlTm9kZSkpLFxuICAgICAgICBzd2l0Y2hNYXAobm9kZSA9PiBpaWYoXG4gICAgICAgICAgKCkgPT4gISFpdGVtLnR5cGVDbGFzcyxcbiAgICAgICAgICB0aGlzLmIucGlwZVBlcnNpc3RlbnRJdGVtUGtzQnlDbGFzcyhpdGVtLnR5cGVDbGFzcykucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCh0eXBlUGtzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICAgICAgICB0eXBlUGtzLm1hcChwa1R5cGUgPT4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcocGtUeXBlKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChwcmV2aWV3ID0+ICh7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogcHJldmlldy5lbnRpdHlfbGFiZWwsXG4gICAgICAgICAgICAgICAgICBkYXRhOiB7IHBrQ2xhc3M6IGl0ZW0udHlwZWRDbGFzcywgcGtUeXBlIH1cbiAgICAgICAgICAgICAgICB9IGFzIENsYXNzQW5kVHlwZU5vZGUpKVxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICBzb3J0QWJjKG4gPT4gbi5sYWJlbCksXG4gICAgICAgICAgICApKSxcbiAgICAgICAgICAgIG1hcChjaGlsZHJlbiA9PiB7XG4gICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4gPSBjaGlsZHJlblxuICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApLFxuICAgICAgICAgIG9mKHsgLi4ubm9kZSwgY2hpbGRyZW46IFtdIH0gYXMgQ2xhc3NBbmRUeXBlTm9kZSlcbiAgICAgICAgKVxuICAgICAgICApXG4gICAgICApKVxuICAgICkucGlwZShcbiAgICAgIHNvcnRBYmMoKG5vZGUpID0+IG5vZGUubGFiZWwpLFxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGFycmF5IG9mIHBrX2NsYXNzIG9mIGFsbCBjbGFzc2VzIGFuZCB0eXBlZCBjbGFzc2VzLlxuICAgKiBAcGFyYW0gY2xhc3Nlc0FuZFR5cGVzIGEgb2JqZWN0IGNvbnRhaW5pbmcge2NsYXNzZXM6IFtdLCB0eXBlc1tdfVxuICAgKi9cbiAgcGlwZUNsYXNzZXNGcm9tQ2xhc3Nlc0FuZFR5cGVzKGNsYXNzZXNBbmRUeXBlczogQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgY29uc3QgdHlwZWRDbGFzc2VzJCA9ICghY2xhc3Nlc0FuZFR5cGVzIHx8ICFjbGFzc2VzQW5kVHlwZXMudHlwZXMgfHwgIWNsYXNzZXNBbmRUeXBlcy50eXBlcy5sZW5ndGgpID9cbiAgICAgIG9mKFtdIGFzIG51bWJlcltdKSA6XG4gICAgICB0aGlzLmIucGlwZUNsYXNzZXNPZlBlcnNpc3RlbnRJdGVtcyhjbGFzc2VzQW5kVHlwZXMudHlwZXMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigocGtzKSA9PiAhIXBrcyksXG4gICAgICAgICAgc3dpdGNoTWFwKHR5cGVDbGFzc2VzID0+IHRoaXMuYy5waXBlVHlwZWRDbGFzc2VzT2ZUeXBlQ2xhc3Nlcyh0eXBlQ2xhc3NlcykpXG4gICAgICAgIClcbiAgICByZXR1cm4gdHlwZWRDbGFzc2VzJC5waXBlKFxuICAgICAgbWFwKHR5cGVkQ2xhc3NlcyA9PiB1bmlxKFsuLi50eXBlZENsYXNzZXMsIC4uLigoY2xhc3Nlc0FuZFR5cGVzIHx8IHsgY2xhc3NlczogW10gfSkuY2xhc3NlcyB8fCBbXSldKSlcbiAgICApO1xuICB9XG5cbiAgcGlwZVByb3BlcnR5T3B0aW9uc0Zyb21DbGFzc2VzQW5kVHlwZXMoY2xhc3Nlc0FuZFR5cGVzOiBDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCk6IE9ic2VydmFibGU8UHJvcGVydHlPcHRpb25bXT4ge1xuICAgIHJldHVybiB0aGlzLnBpcGVDbGFzc2VzRnJvbUNsYXNzZXNBbmRUeXBlcyhjbGFzc2VzQW5kVHlwZXMpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoY2xhc3NlcyA9PiB0aGlzLnBpcGVQcm9wZXJ0eU9wdGlvbnNGb3JtQ2xhc3NlcyhjbGFzc2VzKSlcbiAgICApXG4gIH1cblxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZVByb3BlcnR5T3B0aW9uc0Zvcm1DbGFzc2VzKGNsYXNzZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTxQcm9wZXJ0eU9wdGlvbltdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KGNsYXNzZXMubWFwKHBrQ2xhc3MgPT4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcykucGlwZShcbiAgICAgIG1hcChjID0+IGMuYmFzaWNfdHlwZSA9PT0gOSksXG4gICAgICBzd2l0Y2hNYXAoaXNUZUVuID0+IHRoaXMuYy5waXBlU3BlY2lmaWNBbmRCYXNpY0ZpZWxkcyhwa0NsYXNzKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoY2xhc3NGaWVsZHMgPT4gY2xhc3NGaWVsZHNcbiAgICAgICAgICAgIC5maWx0ZXIoZiA9PiAhIWYucHJvcGVydHkucGtQcm9wZXJ0eSlcbiAgICAgICAgICAgIC5tYXAoZiA9PiAoe1xuICAgICAgICAgICAgICBpc091dGdvaW5nOiBmLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgIGZrUHJvcGVydHlEb21haW46IGYuaXNPdXRnb2luZyA/IGYuc291cmNlQ2xhc3MgOiBudWxsLFxuICAgICAgICAgICAgICBma1Byb3BlcnR5UmFuZ2U6IGYuaXNPdXRnb2luZyA/IG51bGwgOiBmLnNvdXJjZUNsYXNzLFxuICAgICAgICAgICAgICBwa1Byb3BlcnR5OiBmLnByb3BlcnR5LnBrUHJvcGVydHlcbiAgICAgICAgICAgIH0pKSksXG4gICAgICAgICAgc3dpdGNoTWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgIGlmIChpc1RlRW4pIHtcbiAgICAgICAgICAgICAgLy8gYWRkIHRpbWUgcHJvcGVydGllcyAoYXQgc29tZSB0aW1lIHdpdGhpbiwgLi4uKVxuICAgICAgICAgICAgICBEZmhDb25maWcuUFJPUEVSVFlfUEtTX1dIRVJFX1RJTUVfUFJJTUlUSVZFX0lTX1JBTkdFLm1hcChwa1Byb3BlcnR5ID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgICBma1Byb3BlcnR5RG9tYWluOiBwa0NsYXNzLFxuICAgICAgICAgICAgICAgICAgZmtQcm9wZXJ0eVJhbmdlOiBEZmhDb25maWcuQ0xBU1NfUEtfVElNRV9QUklNSVRJVkUsXG4gICAgICAgICAgICAgICAgICBpc091dGdvaW5nOiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KGl0ZW1zLm1hcChpdGVtID0+IHRoaXMuYy5waXBlRmllbGRMYWJlbChcbiAgICAgICAgICAgICAgaXRlbS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICBpdGVtLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgICAgICAgIGl0ZW0uZmtQcm9wZXJ0eVJhbmdlLFxuICAgICAgICAgICAgKS5waXBlKG1hcChsYWJlbCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzT3V0Z29pbmcgPSBpdGVtLmlzT3V0Z29pbmc7XG4gICAgICAgICAgICAgIGNvbnN0IG86IFByb3BlcnR5T3B0aW9uID0ge1xuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICAgICAgcGs6IGl0ZW0ucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUZpZWxkS2V5OiBwcm9wZXJ0eU9wdGlvbkZpZWxkS2V5KGl0ZW0ucGtQcm9wZXJ0eSwgaXNPdXRnb2luZylcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgICB9KSkpKTtcbiAgICAgICAgICB9KSkpXG4gICAgKVxuXG5cbiAgICApKS5waXBlKG1hcCh5ID0+IGZsYXR0ZW48UHJvcGVydHlPcHRpb24+KHkpKSk7XG4gIH1cblxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZVBrQ2xhc3Nlc0Zyb21Qcm9wZXJ0eVNlbGVjdE1vZGVsKG1vZGVsOiBQcm9wZXJ0eVNlbGVjdE1vZGVsKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgIFtcbiAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLm91dGdvaW5nUHJvcGVydGllcywgdHJ1ZSksXG4gICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5pbmdvaW5nUHJvcGVydGllcywgZmFsc2UpLFxuICAgICAgXVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW291dCwgaW5nXSkgPT4gdW5pcShbLi4ub3V0LCAuLi5pbmddKSlcbiAgICApXG4gIH1cblxuICBnZXRQa0NsYXNzZXNGcm9tUHJvcGVydHlTZWxlY3RNb2RlbCQobW9kZWwkOiBPYnNlcnZhYmxlPFByb3BlcnR5U2VsZWN0TW9kZWw+KTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiBtb2RlbCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChtb2RlbCA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgW1xuICAgICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5vdXRnb2luZ1Byb3BlcnRpZXMsIHRydWUpLFxuICAgICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5pbmdvaW5nUHJvcGVydGllcywgZmFsc2UpLFxuICAgICAgICBdXG4gICAgICApLnBpcGUoXG4gICAgICAgIG1hcCgoW291dCwgaW5nXSkgPT4gdW5pcShbLi4ub3V0LCAuLi5pbmddKSlcbiAgICAgICkpXG4gICAgKVxuICB9XG5cblxuXG4gIGdldFByb3BlcnR5T3B0aW9ucyQoY2xhc3NUeXBlcyQ6IE9ic2VydmFibGU8Q2xhc3NBbmRUeXBlU2VsZWN0TW9kZWw+KTogT2JzZXJ2YWJsZTxQcm9wZXJ0eU9wdGlvbltdPiB7XG4gICAgcmV0dXJuIGNsYXNzVHlwZXMkLnBpcGU8Q2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwsIFByb3BlcnR5T3B0aW9uW10+KFxuICAgICAgLy8gbWFrZSBzdXJlIG9ubHkgaXQgcGFzc2VzIG9ubHkgaWYgZGF0YSBvZiB0aGUgYXJyYXlDbGFzc2VzIGFyZSBjaGFuZ2VkIChub3QgY2hpbGRyZW4pXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZDxDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbD4oKGEsIGIpID0+IHtcbiAgICAgICAgcmV0dXJuIGVxdWFscyhhLCBiKTtcbiAgICAgIH0pLFxuICAgICAgc3dpdGNoTWFwKCh4KSA9PiAheCA/IGVtcHR5KCkgOiB0aGlzLmIucGlwZUNsYXNzZXNPZlBlcnNpc3RlbnRJdGVtcyh4LnR5cGVzKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKHBrcykgPT4gISFwa3MpLFxuICAgICAgICAgIHN3aXRjaE1hcCh0eXBlQ2xhc3NlcyA9PiB0aGlzLmMucGlwZVR5cGVkQ2xhc3Nlc09mVHlwZUNsYXNzZXModHlwZUNsYXNzZXMpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAodHlwZWRDbGFzc2VzID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IHVuaXEoWy4uLnR5cGVkQ2xhc3NlcywgLi4uKHguY2xhc3NlcyB8fCBbXSldKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZVByb3BlcnR5T3B0aW9uc0Zvcm1DbGFzc2VzKGNsYXNzZXMpXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnR5T3B0aW9uRmllbGRLZXkoZmtQcm9wZXJ0eTogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogc3RyaW5nIHtcbiAgcmV0dXJuICdfJyArIGZrUHJvcGVydHkgKyAnXycgKyAoaXNPdXRnb2luZyA/ICdvdXRnb2luZycgOiAnaW5nb2luZycpO1xufVxuXG4iXX0=