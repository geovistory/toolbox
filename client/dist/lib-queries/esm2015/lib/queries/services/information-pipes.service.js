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
     * @param {?} paginateBy
     * @param {?} limit
     * @param {?} offset
     * @param {?} pkProject
     * @param {?} listDefinition
     * @param {?=} alternative
     * @return {?}
     */
    pipeStatementListPage(paginateBy, limit, offset, pkProject, listDefinition, alternative = false) {
        // prepare page loader
        /** @type {?} */
        const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
        // prepare basic statement item loader
        /** @type {?} */
        const basicStatementItemLoader = (/**
         * @param {?} pkStatement
         * @param {?} isOutgoing
         * @param {?} pkProj
         * @return {?}
         */
        (pkStatement, isOutgoing, pkProj) => {
            return alternative ?
                this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
                this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing);
        });
        /** @type {?} */
        const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset);
        return paginatedStatementPks$.pipe(switchMap((/**
         * @param {?} paginatedStatementPks
         * @return {?}
         */
        (paginatedStatementPks) => combineLatestOrEmpty(paginatedStatementPks.map((/**
         * @param {?} pkStatement
         * @return {?}
         */
        pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x)), switchMap((/**
         * @param {?} x
         * @return {?}
         */
        x => this.p.streamEntityPreview(x.isOutgoing ? x.statement.fk_object_info : x.statement.fk_subject_info)
            .pipe(map((/**
         * @param {?} preview
         * @return {?}
         */
        (preview) => {
            /** @type {?} */
            const item = Object.assign({}, x, { preview, fkClass: preview.fk_class });
            return item;
        }))))))))))));
    }
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
    // @spyTag
    pipeTemporalEntityTableRows(paginateBy, limit, offset, pkProject, listDefinition, fieldDefinitions, alternative = false) {
        // const propertyItemType = this.propertyItemType(fieldDefinitions)
        // const propertyItemType = this.propertyItemType(fieldDefinitions)
        /** @type {?} */
        const targetEntityOfStatementItem = (/**
         * @param {?} r
         * @return {?}
         */
        (r) => r.isOutgoing ? r.statement.fk_object_info : r.statement.fk_subject_info);
        // prepare page loader
        /** @type {?} */
        const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
        // prepare basic statement item loader
        /** @type {?} */
        const basicStatementItemLoader = (/**
         * @param {?} pkStatement
         * @param {?} isOutgoing
         * @param {?} pkProj
         * @return {?}
         */
        (pkStatement, isOutgoing, pkProj) => {
            return alternative ?
                this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
                this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing);
        })
        // prepare TeEnRow loader
        ;
        // prepare TeEnRow loader
        /** @type {?} */
        const rowLoader = (/**
         * @param {?} targetEntityPk
         * @param {?} fieldDef
         * @param {?} pkProj
         * @return {?}
         */
        (targetEntityPk, fieldDef, pkProj) => {
            return alternative ?
                this.pipeItemTeEnRow(targetEntityPk, fieldDef, null, true) :
                this.pipeItemTeEnRow(targetEntityPk, fieldDef, pkProj, false);
        });
        /** @type {?} */
        const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset);
        /** @type {?} */
        const rows$ = paginatedStatementPks$.pipe(switchMap((/**
         * @param {?} paginatedStatementPks
         * @return {?}
         */
        (paginatedStatementPks) => combineLatestOrEmpty(paginatedStatementPks.map((/**
         * @param {?} pkStatement
         * @return {?}
         */
        pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x))))))
            .pipe(switchMap((/**
         * @param {?} teEnStatement
         * @return {?}
         */
        (teEnStatement) => combineLatestOrEmpty(teEnStatement.map((/**
         * @param {?} basicStatementItem
         * @return {?}
         */
        (basicStatementItem) => {
            /** @type {?} */
            const pkTeEn = targetEntityOfStatementItem(basicStatementItem);
            return combineLatest(rowLoader(pkTeEn, fieldDefinitions, 
            // propertyItemType,
            pkProject), this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + pkTeEn)).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            ([row, teEnProjRel]) => {
                /** @type {?} */
                const item = Object.assign({}, basicStatementItem, { row, pkEntity: pkTeEn, teEnProjRel });
                return item;
            })));
        })))))))));
        return rows$;
    }
    // @spyTag
    /**
     * @param {?} pkEntity
     * @param {?} fieldDefinitions
     * @param {?} pkProject
     * @param {?} repo
     * @return {?}
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy8iLCJzb3VyY2VzIjpbImxpYi9xdWVyaWVzL3NlcnZpY2VzL2luZm9ybWF0aW9uLXBpcGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR2pELE9BQU8sRUFBZ0Isb0JBQW9CLEVBQWUsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuTCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDckUsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUF5QmhFLE9BQU8sRUFBZ0IsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDckUs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QUM7QUFDeEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaENvbmZpZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItY29uZmlnJztcbmltcG9ydCB7IElBcHBTdGF0ZSwgUGFnaW5hdGVCeVBhcmFtIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBJbmZTdGF0ZW1lbnQgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJUeXBlLCBjb21iaW5lTGF0ZXN0T3JFbXB0eSwgR3JhbnVsYXJpdHksIGxpbWl0VG8sIHNvcnRBYmMsIHN3aXRjaE1hcE9yLCBUaW1lUHJpbWl0aXZlLCBUaW1lUHJpbWl0aXZlUGlwZSwgVGltZVNwYW5QaXBlLCBUaW1lU3BhblV0aWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IGVxdWFscywgZmxhdHRlbiwgZ3JvdXBCeSwgcGljaywgdW5pcSwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBlbXB0eSwgaWlmLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFnIH0gZnJvbSAncnhqcy1zcHkvb3BlcmF0b3JzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhY2hlLCBzcHlUYWcgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IHRpbWVTcGFuSXRlbVRvVGltZVNwYW4gfSBmcm9tICcuLi9mdW5jdGlvbnMvZnVuY3Rpb25zJztcbmltcG9ydCB7IEFwcGVsbGF0aW9uSXRlbSB9IGZyb20gJy4uL21vZGVscy9BcHBlbGxhdGlvbkl0ZW0nO1xuaW1wb3J0IHsgQmFzaWNTdGF0ZW1lbnRJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0Jhc2ljU3RhdGVtZW50SXRlbSc7XG5pbXBvcnQgeyBDbGFzc0FuZFR5cGVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL0NsYXNzQW5kVHlwZU5vZGUnO1xuaW1wb3J0IHsgQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwnO1xuaW1wb3J0IHsgQ3RybFRpbWVTcGFuRGlhbG9nUmVzdWx0IH0gZnJvbSAnLi4vbW9kZWxzL0N0cmxUaW1lU3BhbkRpYWxvZ1Jlc3VsdCc7XG5pbXBvcnQgeyBEaW1lbnNpb25JdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0RpbWVuc2lvbkl0ZW0nO1xuaW1wb3J0IHsgRW50aXR5UHJldmlld0l0ZW0gfSBmcm9tICcuLi9tb2RlbHMvRW50aXR5UHJldmlld0l0ZW0nO1xuaW1wb3J0IHsgRW50aXR5UHJvcGVydGllcyB9IGZyb20gJy4uL21vZGVscy9FbnRpdHlQcm9wZXJ0aWVzJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL0ZpZWxkJztcbmltcG9ydCB7IEl0ZW1MaXN0IH0gZnJvbSAnLi4vbW9kZWxzL0l0ZW1MaXN0JztcbmltcG9ydCB7IExhbmdTdHJpbmdJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0xhbmdTdHJpbmdJdGVtJztcbmltcG9ydCB7IExhbmd1YWdlSXRlbSB9IGZyb20gJy4uL21vZGVscy9MYW5ndWFnZUl0ZW0nO1xuaW1wb3J0IHsgUGxhY2VJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1BsYWNlSXRlbSc7XG5pbXBvcnQgeyBQcm9wZXJ0eU9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9Qcm9wZXJ0eU9wdGlvbic7XG5pbXBvcnQgeyBQcm9wZXJ0eVNlbGVjdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL1Byb3BlcnR5U2VsZWN0TW9kZWwnO1xuaW1wb3J0IHsgU3RhdGVtZW50SXRlbSB9IGZyb20gJy4uL21vZGVscy9TdGF0ZW1lbnRJdGVtJztcbmltcG9ydCB7IFN1YmZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL1N1YmZpZWxkJztcbmltcG9ydCB7IFRlbXBvcmFsRW50aXR5Q2VsbCB9IGZyb20gJy4uL21vZGVscy9UZW1wb3JhbEVudGl0eUNlbGwnO1xuaW1wb3J0IHsgVGVtcG9yYWxFbnRpdHlJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1RlbXBvcmFsRW50aXR5SXRlbSc7XG5pbXBvcnQgeyBUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMgfSBmcm9tICcuLi9tb2RlbHMvVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzJztcbmltcG9ydCB7IFRlbXBvcmFsRW50aXR5Um93IH0gZnJvbSAnLi4vbW9kZWxzL1RlbXBvcmFsRW50aXR5Um93JztcbmltcG9ydCB7IFRpbWVQcmltaXRpdmVJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1RpbWVQcmltaXRpdmVJdGVtJztcbmltcG9ydCB7IFRpbWVTcGFuSXRlbSB9IGZyb20gJy4uL21vZGVscy9UaW1lU3Bhbkl0ZW0nO1xuaW1wb3J0IHsgVGltZVNwYW5Qcm9wZXJ0eSB9IGZyb20gJy4uL21vZGVscy9UaW1lU3BhblByb3BlcnR5JztcbmltcG9ydCB7IEluZk1vZGVsTmFtZSwgSW5mU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvaW5mLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSB9IGZyb20gJy4vYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5mb3JtYXRpb25CYXNpY1BpcGVzU2VydmljZSB9IGZyb20gJy4vaW5mb3JtYXRpb24tYmFzaWMtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zY2hlbWEtc2VsZWN0b3JzLnNlcnZpY2UnO1xuXG5cblxuXG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbi8qKlxuICogVGhpcyBTZXJ2aWNlIHByb3ZpZGVzIGEgY29sbGVjaW9uIG9mIHBpcGVzIHRoYXQgYWdncmVnYXRlIG9yIHRyYW5zZm9ybSBpbmZvcm1hdGlvbi5cbiAqIEZvciBFeGFtcGxlXG4gKiAtIHRoZSBsaXN0cyBvZiB0ZXh0IHByb3BlcnRpZXMsIGFwcGVsbGFpdG9ucywgcGxhY2VzLCB0aW1lLXByaW1pdGl2ZXMgLyB0aW1lLXNwYW5zIGV0Yy5cbiAqIC0gdGhlIGxhYmVsIG9mIHRlbXBvcmFsIGVudGl0eSBvciBwZXJzaXN0ZW50IGl0ZW1cbiAqXG4gKiBUaGlzIG1haW5seSBzZWxlY3RzIGRhdGEgZnJvbSB0aGUgaW5mb3JtYXRpb24gc2NoZW1hIGFuZCB0aGUgcmVsYXRpb24gdG8gcHJvamVjdHMuXG4gKiBJdCBjb21iaW5lcyBwaXBlcyBzZWxlY3RpbmcgZGF0YSBmcm9tIHRoZVxuICogLSBhY3RpdmF0ZWQgcHJvamVjdFxuICogLSBhbHRlcm5hdGl2ZXMgKG5vdCBpbiBwcm9qZWN0IGJ1dCBpbiBvdGhlcnMpXG4gKiAtIHJlcG9cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZvcm1hdGlvblBpcGVzU2VydmljZSB7XG5cbiAgaW5mUmVwbzogSW5mU2VsZWN0b3I7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBiOiBJbmZvcm1hdGlvbkJhc2ljUGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcDogQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSxcbiAgICBwcml2YXRlIHM6IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjOiBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlLFxuICAgIHB1YmxpYyB0aW1lUHJpbWl0aXZlUGlwZTogVGltZVByaW1pdGl2ZVBpcGUsXG4gICAgcHJpdmF0ZSB0aW1lU3BhblBpcGU6IFRpbWVTcGFuUGlwZSxcbiAgICBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT5cbiAgKSB7XG4gICAgdGhpcy5pbmZSZXBvID0gbmV3IEluZlNlbGVjdG9yKG5nUmVkdXgsIG9mKCdyZXBvJykpXG4gIH1cblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogUGlwZSB0aGUgcHJvamVjdCBlbnRpdGllc1xuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RMZW5ndGgobDogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHN3aXRjaCAobC5saXN0VHlwZSkge1xuICAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAgICAgY2FzZSAnZW50aXR5LXByZXZpZXcnOlxuICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgY2FzZSAncGxhY2UnOlxuICAgICAgY2FzZSAnZGltZW5zaW9uJzpcbiAgICAgIGNhc2UgJ2xhbmdTdHJpbmcnOlxuICAgICAgY2FzZSAndGVtcG9yYWwtZW50aXR5JzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3QobCwgcGtFbnRpdHkpLnBpcGUobWFwKGl0ZW1zID0+IGl0ZW1zLmxlbmd0aCkpXG5cbiAgICAgIGNhc2UgJ3RpbWUtc3Bhbic6XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MiwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MSwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTAsIHBrRW50aXR5KSxcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUxLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MiwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTMsIHBrRW50aXR5KVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgdGFwKCh4KSA9PiB7XG5cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBtYXAoaXRlbXMgPT4gaXRlbXMuZmlsdGVyKHggPT4geC5sZW5ndGggPiAwKS5sZW5ndGgpKVxuXG4gICAgICAvLyBjYXNlICd0ZXh0LXByb3BlcnR5JzpcbiAgICAgIC8vICAgcmV0dXJuIHRoaXMucGlwZUxpc3RUZXh0UHJvcGVydHkobCwgcGtFbnRpdHkpLnBpcGUobWFwKGl0ZW1zID0+IGl0ZW1zLmxlbmd0aCkpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICAgICAgICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgICB9XG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0KGw6IFN1YmZpZWxkLCBwa0VudGl0eSwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEl0ZW1MaXN0PiB7XG4gICAgaWYgKGwubGlzdFR5cGUuYXBwZWxsYXRpb24pIHJldHVybiB0aGlzLnBpcGVMaXN0QXBwZWxsYXRpb24obCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZW50aXR5UHJldmlldykgcmV0dXJuIHRoaXMucGlwZUxpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmd1YWdlKSByZXR1cm4gdGhpcy5waXBlTGlzdExhbmd1YWdlKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnBsYWNlKSByZXR1cm4gdGhpcy5waXBlTGlzdFBsYWNlKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmRpbWVuc2lvbikgcmV0dXJuIHRoaXMucGlwZUxpc3REaW1lbnNpb24obCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ1N0cmluZykgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5nU3RyaW5nKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnRlbXBvcmFsRW50aXR5KSByZXR1cm4gdGhpcy5waXBlTGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUudGltZVNwYW4pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtVGltZVNwYW4ocGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIG1hcCgodHMpID0+IFt0c10uZmlsdGVyKGkgPT4gaS5wcm9wZXJ0aWVzLmxlbmd0aCA+IDApKVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdEJhc2ljU3RhdGVtZW50SXRlbXMobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBwa1Byb2plY3Q6IG51bWJlcik6IE9ic2VydmFibGU8QmFzaWNTdGF0ZW1lbnRJdGVtW10+IHtcbiAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ0Jhc2ljU3RhdGVtZW50SXRlbXNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5LCBwa1Byb2plY3QpIDpcbiAgICAgIHRoaXMuYi5waXBlSW5nb2luZ0Jhc2ljU3RhdGVtZW50SXRlbXNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5LCBwa1Byb2plY3QpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGl0ZW1zIGluIGFwcGVsbGF0aW9uIGZpZWxkXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gKiBQaXBlIHRoZSBpdGVtcyBpbiBlbnRpdHkgcHJldmlldyBmaWVsZFxuICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhZyhgYmVmb3JlLSR7cGtFbnRpdHl9LSR7bGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eX0tJHtsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzc31gKSxcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEub3JkTnVtID4gYi5vcmROdW0gPyAxIDogLTEpLFxuICAgICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pXG4gICAgICAgICAgICApXG4gICAgICAgIH0pLFxuICAgICAgICB0YWcoYGFmdGVyLSR7cGtFbnRpdHl9LSR7bGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eX0tJHtsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzc31gKSxcbiAgICAgIClcblxuICB9XG5cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgaXRlbXMgaW4gcGxhY2UgbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdFBsYWNlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbVBsYWNlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGl0ZW1zIGluIHBsYWNlIGxpc3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3REaW1lbnNpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICogUGlwZSB0aGUgaXRlbXMgaW4gbGFuZ1N0cmluZyBsaXN0XG4gKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdExhbmdTdHJpbmc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5nU3RyaW5nKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuXG4gIH1cblxuXG4gIHBpcGVTdGF0ZW1lbnRMaXN0UGFnZShcbiAgICBwYWdpbmF0ZUJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSxcbiAgICBsaW1pdDogbnVtYmVyLFxuICAgIG9mZnNldDogbnVtYmVyLFxuICAgIHBrUHJvamVjdDogbnVtYmVyLFxuICAgIGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCxcbiAgICBhbHRlcm5hdGl2ZSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgICAvLyBwcmVwYXJlIHBhZ2UgbG9hZGVyXG4gICAgY29uc3QgcGFnZUxvYWRlciQgPSBhbHRlcm5hdGl2ZSA/IHRoaXMuaW5mUmVwby5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kIDogdGhpcy5zLmluZiQuc3RhdGVtZW50JC5wYWdpbmF0aW9uJDtcblxuICAgIC8vIHByZXBhcmUgYmFzaWMgc3RhdGVtZW50IGl0ZW0gbG9hZGVyXG4gICAgY29uc3QgYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyID0gKHBrU3RhdGVtZW50LCBpc091dGdvaW5nLCBwa1Byb2opID0+IHtcbiAgICAgIHJldHVybiBhbHRlcm5hdGl2ZSA/XG4gICAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrU3RhdGVtZW50LCBpc091dGdvaW5nKSA6XG4gICAgICAgIHRoaXMuYi5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1Byb2osIHBrU3RhdGVtZW50LCBpc091dGdvaW5nKVxuICAgIH1cblxuICAgIGNvbnN0IHBhZ2luYXRlZFN0YXRlbWVudFBrcyQgPSBwYWdlTG9hZGVyJC5waXBlUGFnZShwYWdpbmF0ZUJ5LCBsaW1pdCwgb2Zmc2V0KVxuXG4gICAgcmV0dXJuIHBhZ2luYXRlZFN0YXRlbWVudFBrcyQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgocGFnaW5hdGVkU3RhdGVtZW50UGtzKSA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgcGFnaW5hdGVkU3RhdGVtZW50UGtzLm1hcChwa1N0YXRlbWVudCA9PiBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIocGtTdGF0ZW1lbnQsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsIHBrUHJvamVjdClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgICAgICBzd2l0Y2hNYXAoeCA9PiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyh4LmlzT3V0Z29pbmcgPyB4LnN0YXRlbWVudC5ma19vYmplY3RfaW5mbyA6IHguc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbylcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChwcmV2aWV3KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBFbnRpdHlQcmV2aWV3SXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgLi4ueCxcbiAgICAgICAgICAgICAgICAgICAgcHJldmlldyxcbiAgICAgICAgICAgICAgICAgICAgZmtDbGFzczogcHJldmlldy5ma19jbGFzc1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSlcblxuICAgICAgICApXG4gICAgICApXG4gICAgICApKVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSB0ZW1wb3JhbCBlbnRpdGllcyBjb25uZWN0ZWQgdG8gZ2l2ZW4gZW50aXR5IGJ5IHN0YXRlbWVudHMgdGhhdCBhcmUgaW4gdGhlIGN1cnJlbnQgcHJvamVjdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlVGVtcG9yYWxFbnRpdHlUYWJsZVJvd3MoXG4gICAgcGFnaW5hdGVCeTogUGFnaW5hdGVCeVBhcmFtW10sXG4gICAgbGltaXQ6IG51bWJlcixcbiAgICBvZmZzZXQ6IG51bWJlcixcbiAgICBwa1Byb2plY3Q6IG51bWJlcixcbiAgICBsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsXG4gICAgZmllbGREZWZpbml0aW9uczogRmllbGRbXSxcbiAgICBhbHRlcm5hdGl2ZSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxUZW1wb3JhbEVudGl0eUl0ZW1bXT4ge1xuXG4gICAgLy8gY29uc3QgcHJvcGVydHlJdGVtVHlwZSA9IHRoaXMucHJvcGVydHlJdGVtVHlwZShmaWVsZERlZmluaXRpb25zKVxuXG4gICAgY29uc3QgdGFyZ2V0RW50aXR5T2ZTdGF0ZW1lbnRJdGVtID0gKHI6IEJhc2ljU3RhdGVtZW50SXRlbSkgPT4gci5pc091dGdvaW5nID8gci5zdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8gOiByLnN0YXRlbWVudC5ma19zdWJqZWN0X2luZm87XG5cbiAgICAvLyBwcmVwYXJlIHBhZ2UgbG9hZGVyXG4gICAgY29uc3QgcGFnZUxvYWRlciQgPSBhbHRlcm5hdGl2ZSA/IHRoaXMuaW5mUmVwby5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kIDogdGhpcy5zLmluZiQuc3RhdGVtZW50JC5wYWdpbmF0aW9uJDtcblxuICAgIC8vIHByZXBhcmUgYmFzaWMgc3RhdGVtZW50IGl0ZW0gbG9hZGVyXG4gICAgY29uc3QgYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyID0gKHBrU3RhdGVtZW50LCBpc091dGdvaW5nLCBwa1Byb2opID0+IHtcbiAgICAgIHJldHVybiBhbHRlcm5hdGl2ZSA/XG4gICAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrU3RhdGVtZW50LCBpc091dGdvaW5nKSA6XG4gICAgICAgIHRoaXMuYi5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1Byb2osIHBrU3RhdGVtZW50LCBpc091dGdvaW5nKVxuICAgIH1cblxuICAgIC8vIHByZXBhcmUgVGVFblJvdyBsb2FkZXJcbiAgICBjb25zdCByb3dMb2FkZXIgPSAodGFyZ2V0RW50aXR5UGssIGZpZWxkRGVmLCBwa1Byb2opID0+IHtcbiAgICAgIHJldHVybiBhbHRlcm5hdGl2ZSA/XG4gICAgICAgIHRoaXMucGlwZUl0ZW1UZUVuUm93KHRhcmdldEVudGl0eVBrLCBmaWVsZERlZiwgbnVsbCwgdHJ1ZSkgOlxuICAgICAgICB0aGlzLnBpcGVJdGVtVGVFblJvdyh0YXJnZXRFbnRpdHlQaywgZmllbGREZWYsIHBrUHJvaiwgZmFsc2UpXG4gICAgfVxuXG4gICAgY29uc3QgcGFnaW5hdGVkU3RhdGVtZW50UGtzJCA9IHBhZ2VMb2FkZXIkLnBpcGVQYWdlKHBhZ2luYXRlQnksIGxpbWl0LCBvZmZzZXQpXG5cbiAgICBjb25zdCByb3dzJCA9IHBhZ2luYXRlZFN0YXRlbWVudFBrcyQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgocGFnaW5hdGVkU3RhdGVtZW50UGtzKSA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgcGFnaW5hdGVkU3RhdGVtZW50UGtzLm1hcChwa1N0YXRlbWVudCA9PiBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIocGtTdGF0ZW1lbnQsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsIHBrUHJvamVjdClcbiAgICAgICAgICAucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICAgICApXG4gICAgICApXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgodGVFblN0YXRlbWVudCkgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgICAgICB0ZUVuU3RhdGVtZW50Lm1hcCgoYmFzaWNTdGF0ZW1lbnRJdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHBrVGVFbiA9IHRhcmdldEVudGl0eU9mU3RhdGVtZW50SXRlbShiYXNpY1N0YXRlbWVudEl0ZW0pO1xuICAgICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgICAgICByb3dMb2FkZXIoXG4gICAgICAgICAgICAgICAgICBwa1RlRW4sXG4gICAgICAgICAgICAgICAgICBmaWVsZERlZmluaXRpb25zLFxuICAgICAgICAgICAgICAgICAgLy8gcHJvcGVydHlJdGVtVHlwZSxcbiAgICAgICAgICAgICAgICAgIHBrUHJvamVjdFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgcGtUZUVuKVxuICAgICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChbcm93LCB0ZUVuUHJvalJlbF0pID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRlbXBvcmFsRW50aXR5SXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uYmFzaWNTdGF0ZW1lbnRJdGVtLFxuICAgICAgICAgICAgICAgICAgICByb3csXG4gICAgICAgICAgICAgICAgICAgIHBrRW50aXR5OiBwa1RlRW4sXG4gICAgICAgICAgICAgICAgICAgIHRlRW5Qcm9qUmVsXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICkpLFxuICAgICAgICApKSxcblxuICAgIClcbiAgICByZXR1cm4gcm93cyRcbiAgfVxuXG5cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtVGVFblJvdyhwa0VudGl0eTogbnVtYmVyLCBmaWVsZERlZmluaXRpb25zOiBGaWVsZFtdLCBwa1Byb2plY3Q6IG51bWJlciwgcmVwbzogYm9vbGVhbik6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlSb3c+IHtcblxuICAgIC8vIHBpcGUgb3V0Z29pbmcgc3RhdGVtZW50c1xuICAgIGNvbnN0IG91dGdvaW5nU3RhdGVtZW50cyQgPSByZXBvID8gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KSA6IHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTtcbiAgICAvLyBwaXBlIGluZ29pbmcgc3RhdGVtZW50c1xuICAgIGNvbnN0IGluZ29pbmdTdGF0ZW1lbnRzJCA9IHJlcG8gPyB0aGlzLmIucGlwZVJlcG9JbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSkgOiB0aGlzLmIucGlwZUluZ29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTtcblxuXG4gICAgLy8gcGlwZSBhbGwgc3RhdGVtZW50cyB3aXRoIGluZm9ybWF0aW9uIGxlYWYgaXRlbXNcblxuICAgIGNvbnN0IG91dGdvaW5nSXRlbXMkOiBPYnNlcnZhYmxlPFN0YXRlbWVudEl0ZW1bXT4gPSBvdXRnb2luZ1N0YXRlbWVudHMkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgc3RhdGVtZW50c1xuICAgICAgICAgIC5maWx0ZXIoc3RhdGVtZW50ID0+ICEhc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKSAvLyByZW1vdmUgc3RhdGVtZW50cyBub3QgcG9pbnRpbmcgdG8gaW5mb3JtYXRpb25cbiAgICAgICAgICAubWFwKHMgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNPdXRnb2luZyA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbShzLCBwa1Byb2plY3QsIGlzT3V0Z29pbmcpO1xuICAgICAgICAgIH0pXG4gICAgICApKVxuXG4gICAgKVxuICAgIGNvbnN0IGluZ29pbmdJdGVtcyQ6IE9ic2VydmFibGU8U3RhdGVtZW50SXRlbVtdPiA9IGluZ29pbmdTdGF0ZW1lbnRzJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIHN0YXRlbWVudHNcbiAgICAgICAgICAuZmlsdGVyKHN0YXRlbWVudCA9PiAhIXN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pIC8vIHJlbW92ZSBzdGF0ZW1lbnRzIG5vdCBwb2ludGluZyB0byBpbmZvcm1hdGlvblxuICAgICAgICAgIC5tYXAocyA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc091dGdvaW5nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbShzLCBwa1Byb2plY3QsIGlzT3V0Z29pbmcpO1xuICAgICAgICAgIH0pXG4gICAgICApKVxuXG4gICAgKVxuXG4gICAgY29uc3Qgc29ydEl0ZW1zID0gcmVwbyA/XG4gICAgICAoaXRlbTogU3RhdGVtZW50SXRlbVtdKSA9PiBpdGVtLnNvcnQoKGEsIGIpID0+IGEuc3RhdGVtZW50LmlzX2luX3Byb2plY3RfY291bnQgPiBiLnN0YXRlbWVudC5pc19pbl9wcm9qZWN0X2NvdW50ID8gMSA6IC0xKSA6XG4gICAgICAoaXRlbTogU3RhdGVtZW50SXRlbVtdKSA9PiBpdGVtO1xuXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChvdXRnb2luZ0l0ZW1zJCwgaW5nb2luZ0l0ZW1zJCkucGlwZShcblxuICAgICAgbWFwKChbb3V0Z29pbmdJdGVtcywgaW5nb2luZ0l0ZW1zXSkgPT4ge1xuICAgICAgICBjb25zdCBncm91cGVkT3V0ID0gZ3JvdXBCeSgoaSkgPT4gKGkgJiYgaS5zdGF0ZW1lbnQgPyBpLnN0YXRlbWVudC5ma19wcm9wZXJ0eS50b1N0cmluZygpIDogdW5kZWZpbmVkKSwgb3V0Z29pbmdJdGVtcyk7XG4gICAgICAgIGNvbnN0IGdyb3VwZWRJbiA9IGdyb3VwQnkoKGkpID0+IChpICYmIGkuc3RhdGVtZW50ID8gaS5zdGF0ZW1lbnQuZmtfcHJvcGVydHkudG9TdHJpbmcoKSA6IHVuZGVmaW5lZCksIGluZ29pbmdJdGVtcyk7XG4gICAgICAgIHJldHVybiB7IGdyb3VwZWRPdXQsIGdyb3VwZWRJbiB9XG4gICAgICB9KSxcbiAgICAgIC8vIGF1ZGl0VGltZSgxMCksXG4gICAgICBtYXAoKGQpID0+IHtcbiAgICAgICAgY29uc3Qgcm93OiBUZW1wb3JhbEVudGl0eVJvdyA9IHt9XG5cbiAgICAgICAgZmllbGREZWZpbml0aW9ucy5mb3JFYWNoKGZpZWxkRGVmaW5pdGlvbiA9PiB7XG5cbiAgICAgICAgICBsZXQgY2VsbDogVGVtcG9yYWxFbnRpdHlDZWxsO1xuICAgICAgICAgIGZpZWxkRGVmaW5pdGlvbi5saXN0RGVmaW5pdGlvbnMuZm9yRWFjaChsaXN0RGVmaW5pdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAobGlzdERlZmluaXRpb24ubGlzdFR5cGUudGltZVNwYW4pIHtcblxuICAgICAgICAgICAgICBjb25zdCB0ID0gcGljayhbJzcxJywgJzcyJywgJzE1MCcsICcxNTEnLCAnMTUyJywgJzE1MyddLCBkLmdyb3VwZWRPdXQpO1xuICAgICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModCk7XG4gICAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnQgPSBrZXlzLmxlbmd0aDtcblxuICAgICAgICAgICAgICBsZXQgbGFiZWw7XG4gICAgICAgICAgICAgIGlmIChpdGVtc0NvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVTcGFuS2V5czogQ3RybFRpbWVTcGFuRGlhbG9nUmVzdWx0ID0ge31cbiAgICAgICAgICAgICAgICBrZXlzLmZvckVhY2goa2V5ID0+IHsgdGltZVNwYW5LZXlzW2tleV0gPSB0W2tleV1bMF0udGltZVByaW1pdGl2ZSB9KVxuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVTcGFuID0gVGltZVNwYW5VdGlsLmZyb21UaW1lU3BhbkRpYWxvZ0RhdGEodGltZVNwYW5LZXlzKTtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IHRoaXMudGltZVNwYW5QaXBlLnRyYW5zZm9ybSh0aW1lU3Bhbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2VsbCA9IHtcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIGl0ZW1zQ291bnQsXG4gICAgICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHBrUHJvcGVydHk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBpc1RpbWVTcGFuOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgICAgICAgICAgIGlmIChkLmdyb3VwZWRPdXRbbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gc29ydEl0ZW1zKGQuZ3JvdXBlZE91dFtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSlcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgICAgICAgY2VsbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogbGlzdERlZmluaXRpb24uaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNDb3VudDogaXRlbXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcmV2aWV3OiAoKGZpcnN0SXRlbSB8fCB7fSkgYXMgRW50aXR5UHJldmlld0l0ZW0pLnByZXZpZXcsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmaXJzdEl0ZW0ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIHBrUHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0SXRlbSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuZ3JvdXBlZEluW2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IHNvcnRJdGVtcyhkLmdyb3VwZWRJbltsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSlcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IGl0ZW1zWzBdO1xuICAgICAgICAgICAgICAgICAgY2VsbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogbGlzdERlZmluaXRpb24uaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNDb3VudDogaXRlbXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcmV2aWV3OiAoKGZpcnN0SXRlbSB8fCB7fSkgYXMgRW50aXR5UHJldmlld0l0ZW0pLnByZXZpZXcsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmaXJzdEl0ZW0ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIHBrUHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0SXRlbSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pXG5cblxuICAgICAgICAgIHJvd1tmaWVsZERlZmluaXRpb24ubGFiZWxdID0gY2VsbDtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJvd1xuICAgICAgfSlcblxuXG4gICAgKVxuICB9XG5cblxuXG4gIC8vIEBzcHlUYWdcbiAgcHJpdmF0ZSBwaXBlSXRlbShyOiBJbmZTdGF0ZW1lbnQsIHBrUHJvamVjdDogbnVtYmVyLCBwcm9wSXNPdXRnb2luZzogYm9vbGVhbikge1xuXG4gICAgY29uc3QgdGFyZ2V0RW50aXR5ID0gcHJvcElzT3V0Z29pbmcgPyByLmZrX29iamVjdF9pbmZvIDogci5ma19zdWJqZWN0X2luZm87XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmdldE1vZGVsT2ZFbnRpdHkkKHRhcmdldEVudGl0eSkucGlwZShcbiAgICAgIHN3aXRjaE1hcChtID0+IHtcbiAgICAgICAgY29uc3QgbW9kZWxOYW1lOiBJbmZNb2RlbE5hbWUgPSBtID8gbS5tb2RlbE5hbWUgOiB1bmRlZmluZWQ7XG4gICAgICAgIHN3aXRjaCAobW9kZWxOYW1lKSB7XG4gICAgICAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKTtcbiAgICAgICAgICBjYXNlICdsYW5ndWFnZSc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpO1xuICAgICAgICAgIGNhc2UgJ3BsYWNlJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtUGxhY2Uocik7XG4gICAgICAgICAgY2FzZSAnZGltZW5zaW9uJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpO1xuICAgICAgICAgIGNhc2UgJ2xhbmdfc3RyaW5nJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtTGFuZ1N0cmluZyhyKTtcbiAgICAgICAgICBjYXNlICd0aW1lX3ByaW1pdGl2ZSc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVRpbWVQcmltaXRpdmUociwgcGtQcm9qZWN0KTsgLy8gVE9ETzogZW1pdHMgdHdpY2VcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIHByb3BJc091dGdvaW5nKTtcbiAgICAgICAgfVxuXG5cbiAgICAgIH0pXG4gICAgKVxuXG5cbiAgfVxuXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlRW50aXR5UHJvcGVydGllcyhsaXN0RGVmOiBTdWJmaWVsZCwgZmtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEVudGl0eVByb3BlcnRpZXM+IHtcblxuICAgIGlmIChsaXN0RGVmLmxpc3RUeXBlLmFwcGVsbGF0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdEFwcGVsbGF0aW9uKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUubGFuZ3VhZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ3VhZ2UobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5wbGFjZSkge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RQbGFjZShsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmRpbWVuc2lvbikge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3REaW1lbnNpb24obGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5sYW5nU3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdExhbmdTdHJpbmcobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG5cblxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUuZW50aXR5UHJldmlldyB8fCBsaXN0RGVmLmxpc3RUeXBlLnRlbXBvcmFsRW50aXR5KSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdEVudGl0eVByZXZpZXcobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS50aW1lU3Bhbikge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1UaW1lU3Bhbihma0VudGl0eSlcbiAgICAgICAgLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXRlbXMgPSBpdGVtLnByb3BlcnRpZXMuZmluZChwID0+IHAuaXRlbXMubGVuZ3RoID4gMCkgPyBbe1xuICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVNwYW5QaXBlLnRyYW5zZm9ybSh0aW1lU3Bhbkl0ZW1Ub1RpbWVTcGFuKGl0ZW0pKSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IFtdIC8vIFRPRE8gY2hlY2sgaWYgdGhlIHByb3BlcnRpZXMgb3IgdGhlIGl0ZW0gYXJlIHJlYWxseSBub3QgbmVlZGVkXG4gICAgICAgICAgfV0gOiBbXVxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsaXN0RGVmaW5pdGlvbjogbGlzdERlZixcbiAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICB9XG4gICAgZWxzZSByZXR1cm4gb2YobnVsbClcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcyhwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXM+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5pbmYkLnRlbXBvcmFsX2VudGl0eSQuYnlfcGtfZW50aXR5X2tleSQocGtFbnRpdHkpLFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0JCh7IGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHkgfSksXG4gICAgICB0aGlzLnMuaW5mJC50ZXh0X3Byb3BlcnR5JC5ieV9ma19jb25jZXJuZWRfZW50aXR5X2luZGV4ZWQkKHBrRW50aXR5KVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW3RlbXBvcmFsRW50aXR5LCBzdGF0ZW1lbnRzLCB0ZXh0UHJvcGVydGllc10pID0+IHtcbiAgICAgICAgY29uc3QgcmVzOiBUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMgPSB7XG4gICAgICAgICAgdGVtcG9yYWxFbnRpdHksXG4gICAgICAgICAgc3RhdGVtZW50czogc3RhdGVtZW50cyxcbiAgICAgICAgICB0ZXh0UHJvcGVydGllczogdmFsdWVzKHRleHRQcm9wZXJ0aWVzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIGl0ZW1zKTogRW50aXR5UHJvcGVydGllcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxpc3REZWZpbml0aW9uLFxuICAgICAgaXRlbXMsXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGltZSBzcGFuIGl0ZW0gaW4gdmVyc2lvbiBvZiBwcm9qZWN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtVGltZVNwYW4ocGtFbnRpdHkpOiBPYnNlcnZhYmxlPFRpbWVTcGFuSXRlbT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucC5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYy5waXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MoXG4gICAgICAgICAgRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTlxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGZpZWxkRGVmcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChmaWVsZERlZnMubWFwKGZpZWxkRGVmID0+IHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgICAgICAgICAgZmtfcHJvcGVydHk6IGZpZWxkRGVmLnByb3BlcnR5LnBrUHJvcGVydHksXG4gICAgICAgICAgICAgIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcE9yKFtdLCBzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzLm1hcChzdGF0ZW1lbnQgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zLmluZiQudGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgc3RhdGVtZW50LnBrX2VudGl0eSlcbiAgICAgICAgICAgICAgICAgICkucGlwZShtYXAoKFtpbmZUaW1lUHJpbWl0aXZlLCBwcm9qUmVsXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAgICAgICAgICAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyOiAoKHByb2pSZWwuY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgcHJvalJlbCxcbiAgICAgICAgICAgICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlKSxcbiAgICAgICAgICAgICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApKSxcbiAgICAgICAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzOiBUaW1lU3BhblByb3BlcnR5ID0ge1xuICAgICAgICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbjogZmllbGREZWYubGlzdERlZmluaXRpb25zWzBdLCBpdGVtc1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgocHJvcGVydGllcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BzID0gcHJvcGVydGllcy5maWx0ZXIocCA9PiBwLml0ZW1zLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuaXRlbTogVGltZVNwYW5JdGVtID0ge1xuICAgICAgICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogcHJvcHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVzcGFuaXRlbVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG5cbiAgICApXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtQXBwZWxsYXRpb24oc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPEFwcGVsbGF0aW9uSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5hcHBlbGxhdGlvbiQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIG1hcChhcHBlbGxhdGlvbiA9PiB7XG4gICAgICAgIGlmICghYXBwZWxsYXRpb24pIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBub2RlOiBBcHBlbGxhdGlvbkl0ZW0gPSB7XG4gICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICBsYWJlbDogYXBwZWxsYXRpb24uc3RyaW5nLFxuICAgICAgICAgIGZrQ2xhc3M6IGFwcGVsbGF0aW9uLmZrX2NsYXNzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbUxhbmd1YWdlKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBtYXAobGFuZ3VhZ2UgPT4ge1xuICAgICAgICBpZiAoIWxhbmd1YWdlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3Qgbm9kZTogTGFuZ3VhZ2VJdGVtID0ge1xuICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgbGFiZWw6IGxhbmd1YWdlLm5vdGVzLFxuICAgICAgICAgIGZrQ2xhc3M6IGxhbmd1YWdlLmZrX2NsYXNzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVBsYWNlKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxQbGFjZUl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQucGxhY2UkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBtYXAocGxhY2UgPT4ge1xuICAgICAgICBpZiAoIXBsYWNlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3Qgbm9kZTogUGxhY2VJdGVtID0ge1xuICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgbGFiZWw6ICdXR1M4NDogJyArIHBsYWNlLmxhdCArICfCsCwgJyArIHBsYWNlLmxvbmcgKyAnwrAnLFxuICAgICAgICAgIGZrQ2xhc3M6IHBsYWNlLmZrX2NsYXNzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbURpbWVuc2lvbihzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5kaW1lbnNpb24kLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBzd2l0Y2hNYXAoKGRpbWVuc2lvbikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoZGltZW5zaW9uLmZrX21lYXN1cmVtZW50X3VuaXQpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAocHJldmlldyA9PiB7XG5cbiAgICAgICAgICAgICAgY29uc3Qgbm9kZTogRGltZW5zaW9uSXRlbSA9IHtcbiAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgIGxhYmVsOiBgJHtkaW1lbnNpb24ubnVtZXJpY192YWx1ZX0gJHtwcmV2aWV3LmVudGl0eV9sYWJlbH1gLFxuICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGRpbWVuc2lvbi5ma19jbGFzcyxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbUxhbmdTdHJpbmcoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPExhbmdTdHJpbmdJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmdfc3RyaW5nJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoXG4gICAgICAgIChsYW5nU3RyaW5nKSA9PiB7XG4gICAgICAgICAgaWYgKCFsYW5nU3RyaW5nKSByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKVxuICAgICAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5ndWFnZSQuYnlfcGtfZW50aXR5JC5rZXkobGFuZ1N0cmluZy5ma19sYW5ndWFnZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobGFuZ3VhZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghbGFuZ3VhZ2UpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbCA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChsYW5nU3RyaW5nLnN0cmluZykgbGFiZWwgPSBsYW5nU3RyaW5nLnN0cmluZ1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxhbmdTdHJpbmcucXVpbGxfZG9jICYmIGxhbmdTdHJpbmcucXVpbGxfZG9jLm9wcyAmJiBsYW5nU3RyaW5nLnF1aWxsX2RvYy5vcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICBsYWJlbCA9IGxhbmdTdHJpbmcucXVpbGxfZG9jLm9wcy5tYXAob3AgPT4gb3AuaW5zZXJ0KS5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZTogTGFuZ1N0cmluZ0l0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICAgICAgZmtDbGFzczogbGFuZ1N0cmluZy5ma19jbGFzcyxcbiAgICAgICAgICAgICAgICAgIGxhbmd1YWdlLFxuICAgICAgICAgICAgICAgICAgZmtMYW5ndWFnZTogbGFuZ1N0cmluZy5ma19sYW5ndWFnZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICB9KVxuICAgIClcbiAgfVxuXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbUVudGl0eVByZXZpZXcoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KChpc091dGdvaW5nID8gc3RhdGVtZW50LmZrX29iamVjdF9pbmZvIDogc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbykpLnBpcGUoXG4gICAgICAvLyBmaWx0ZXIocHJldmlldyA9PiAhcHJldmlldy5sb2FkaW5nICYmICEhcHJldmlldyAmJiAhIXByZXZpZXcuZW50aXR5X3R5cGUpLFxuICAgICAgbWFwKHByZXZpZXcgPT4ge1xuICAgICAgICBpZiAoIXByZXZpZXcpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub2RlOiBFbnRpdHlQcmV2aWV3SXRlbSA9IHtcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgIHByZXZpZXcsXG4gICAgICAgICAgbGFiZWw6IHByZXZpZXcuZW50aXR5X2xhYmVsIHx8ICcnLFxuICAgICAgICAgIGZrQ2xhc3M6IHByZXZpZXcuZmtfY2xhc3NcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBrXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtVGltZVByaW1pdGl2ZShzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCwgcGtQcm9qZWN0KTogT2JzZXJ2YWJsZTxUaW1lUHJpbWl0aXZlSXRlbT4ge1xuICAgIGlmIChwa1Byb2plY3QpIHtcbiAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICB0aGlzLnMuaW5mJC50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkLmtleShwa1Byb2plY3QgKyAnXycgKyBzdGF0ZW1lbnQucGtfZW50aXR5KS5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gICAgICApLnBpcGUoXG4gICAgICAgIG1hcCgoW2luZlRpbWVQcmltaXRpdmUsIHByb2pSZWxdKSA9PiB7XG4gICAgICAgICAgaWYgKCFpbmZUaW1lUHJpbWl0aXZlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICBjYWxlbmRhcjogKChwcm9qUmVsLmNhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc3Qgbm9kZTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH0pKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbmZSZXBvLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoZmlsdGVyKHggPT4gISF4KSkucGlwZShcbiAgICAgICAgbWFwKGluZlRpbWVQcmltaXRpdmUgPT4ge1xuICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgICAgICAgICAgIGNhbGVuZGFyOiAoKHN0YXRlbWVudC5jb21tdW5pdHlfZmF2b3JpdGVfY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zdCBub2RlOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlKSxcbiAgICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgKiBQaXBlIGFsdGVybmF0aXZlcyAobm90IGluIHByb2plY3QpXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdExlbmd0aChsOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgc3dpdGNoIChsLmxpc3RUeXBlKSB7XG4gICAgICBjYXNlICdhcHBlbGxhdGlvbic6XG4gICAgICBjYXNlICdlbnRpdHktcHJldmlldyc6XG4gICAgICBjYXNlICdsYW5ndWFnZSc6XG4gICAgICBjYXNlICdwbGFjZSc6XG4gICAgICBjYXNlICdsYW5nU3RyaW5nJzpcbiAgICAgIGNhc2UgJ3RlbXBvcmFsLWVudGl0eSc6XG4gICAgICBjYXNlICd0aW1lLXNwYW4nOlxuICAgICAgICByZXR1cm4gdGhpcy5waXBlQWx0TGlzdFN0YXRlbWVudHMobCwgcGtFbnRpdHkpLnBpcGUobWFwKGl0ZW1zID0+IGl0ZW1zLmxlbmd0aCkpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0KGw6IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8SXRlbUxpc3Q+IHtcbiAgICBpZiAobC5saXN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RBcHBlbGxhdGlvbihsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmVudGl0eVByZXZpZXcpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0RW50aXR5UHJldmlldyhsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmd1YWdlKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdExhbmd1YWdlKGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUucGxhY2UpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0UGxhY2UobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5kaW1lbnNpb24pIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0RGltZW5zaW9uKGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ1N0cmluZykgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RMYW5nU3RyaW5nKGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUudGVtcG9yYWxFbnRpdHkpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0RW50aXR5UHJldmlldyhsLCBwa0VudGl0eSlcbiAgICBlbHNlIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdFN0YXRlbWVudHMobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpIDpcbiAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgICApXG4gIH1cblxuICAvKipcbiAgKiBQaXBlIHRoZSBpdGVtcyBpbiBlbnRpdHkgcHJldmlldyBmaWVsZFxuICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0RW50aXR5UHJldmlldzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkgOlxuICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUluZ29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZykpKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzXG4gICAgICAgICAgICAgIC5maWx0ZXIobm9kZSA9PiAhIW5vZGUpXG4gICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLm9yZE51bSA+IGIub3JkTnVtID8gMSA6IC0xKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICB9KSlcblxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIHBsYWNlIGxpc3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RQbGFjZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxQbGFjZUl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbVBsYWNlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gZGltZW5zaW9uIGxpc3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3REaW1lbnNpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gbGFuZ1N0cmluZyBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0TGFuZ1N0cmluZzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxMYW5nU3RyaW5nSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ1N0cmluZyhyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBhcHBlbGxhdGlvbiBmaWVsZFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdEFwcGVsbGF0aW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEFwcGVsbGF0aW9uSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gbGFuZ3VhZ2UgZmllbGRcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RMYW5ndWFnZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBQaXBlIHJlcG8gdmlld3MgKGNvbW11bml0eSBmYXZvcml0ZXMsIHdoZXJlIHJlc3RyaWN0ZWQgYnkgcXVhbnRpZmllcnMpXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgLyoqXG4gICAqIFBpcGUgcmVwb3NpdG9yeSB0ZW1wb3JhbCBlbnRpdHkgaXRlbSBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgICovXG5cblxuICAvKipcbiAgICogUGlwZSBhcHBlbGxhdGlvbiBsaXN0IGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3RBcHBlbGxhdGlvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogUGlwZSBsYW5ndWFnZSBsaXN0IGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvTGlzdExhbmd1YWdlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGlwZSBwbGFjZSBsaXN0IGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3RQbGFjZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxQbGFjZUl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbVBsYWNlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogUGlwZSBwbGFjZSBsaXN0IGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvTGlzdERpbWVuc2lvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1EaW1lbnNpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cbiAgLyoqXG4gICogUGlwZSB0aGUgaXRlbXMgaW4gZW50aXR5IHByZXZpZXcgZmllbGQsIGNvbm5lY3RlZCBieSBjb21tdW5pdHkgZmF2b3JpdGUgc3RhdGVtZW50c1xuICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvTGlzdEVudGl0eVByZXZpZXc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgICAgIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpIDpcbiAgICAgIHRoaXMuYi5waXBlUmVwb0luZ29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpKSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcylcbiAgICAgICAgICAgICAgLy8gLnNvcnQoKGEsIGIpID0+IGEub3JkTnVtID4gYi5vcmROdW0gPyAxIDogLTEpXG4gICAgICAgICAgICApKVxuICAgICAgfSksXG4gICAgICBzdGFydFdpdGgoW10pXG4gICAgKVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIHJlcG8gdGltZSBzcGFuIGl0ZW1cbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9JdGVtVGltZVNwYW4ocGtFbnRpdHkpOiBPYnNlcnZhYmxlPFRpbWVTcGFuSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnAucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmMucGlwZUJhc2ljQW5kU3BlY2lmaWNGaWVsZHMoXG4gICAgICAgICAgRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTlxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKGZpZWxkRGVmaW5pdGlvbnMgPT4ge1xuXG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChmaWVsZERlZmluaXRpb25zLm1hcChmaWVsZERlZiA9PlxuICAgICAgICAgICAgICB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGZpZWxkRGVmLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwT3IoW10sIHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50cy5tYXAoc3RhdGVtZW50ID0+XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZSZXBvLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pXG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAoKGluZlRpbWVQcmltaXRpdmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxlbmRhcjogKChzdGF0ZW1lbnQuY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKSksXG4gICAgICAgICAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXM6IFRpbWVTcGFuUHJvcGVydHkgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb246IGZpZWxkRGVmLmxpc3REZWZpbml0aW9uc1swXSwgaXRlbXNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7IGxpc3REZWZpbml0aW9uOiBmaWVsZERlZi5saXN0RGVmaW5pdGlvbnNbMF0sIGl0ZW1zOiBbXSB9IGFzIFRpbWVTcGFuUHJvcGVydHkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSkucGlwZShcbiAgICAgICAgICAgICAgbWFwKChwcm9wZXJ0aWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZXNwYW5pdGVtOiBUaW1lU3Bhbkl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLmZpbHRlcihwcm9wcyA9PiBwcm9wcy5pdGVtcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZXNwYW5pdGVtXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSlcblxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBsYWJlbCBvZiBnaXZlbiBlbnRpdHlcbiAgICogVGhpcyB3aWxsIHVzZSBlbnRpdHkgcHJldmlld3MgZm9yIGdldHRpbmcgc3RyaW5ncyBvZiByZWxhdGVkIHRlbXBvcmFsIGVudGl0aWVzXG4gICAqIFNvIHRoaXMgbWF5IHRha2UgYSBsaXR0bGUgd2hpbGVcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxhYmVsT2ZFbnRpdHkoZmtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuYi5waXBlQ2xhc3NPZkVudGl0eShma0VudGl0eSkucGlwZShcblxuICAgICAgLy8gZ2V0IHRoZSBkZWZpbml0aW9uIG9mIHRoZSBmaXJzdCBmaWVsZFxuICAgICAgc3dpdGNoTWFwKGZrQ2xhc3MgPT4gdGhpcy5jLnBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKGZrQ2xhc3MpLnBpcGUoXG4gICAgICAgIC8vIGdldCB0aGUgZmlyc3QgaXRlbSBvZiB0aGF0IGZpZWxkXG4gICAgICAgIHN3aXRjaE1hcChmaWVsZERlZiA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgICBmaWVsZERlZiAmJiBmaWVsZERlZi5sZW5ndGggP1xuICAgICAgICAgICAgZmllbGREZWZbMF0ubGlzdERlZmluaXRpb25zLm1hcChsaXN0RGVmID0+IHRoaXMucGlwZUVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgZmtFbnRpdHksIDEpKSA6XG4gICAgICAgICAgICBbXVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKHByb3BzID0+IHtcbiAgICAgICAgICAgIHByb3BzID0gcHJvcHMuZmlsdGVyKHByb3AgPT4gcHJvcC5pdGVtcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgaWYgKHByb3BzLmxlbmd0aCAmJiBwcm9wc1swXS5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb3BzWzBdLml0ZW1zWzBdLmxhYmVsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJydcbiAgICAgICAgICB9KVxuICAgICAgICApKSlcbiAgICAgICkpXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgY2xhc3MgbGFiZWwgb2YgZ2l2ZW4gZW50aXR5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVDbGFzc0xhYmVsT2ZFbnRpdHkoZmtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuYi5waXBlQ2xhc3NPZkVudGl0eShma0VudGl0eSkucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa0NsYXNzID0+IHRoaXMuYy5waXBlQ2xhc3NMYWJlbChwa0NsYXNzKSlcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgdGhlIHBrX2VudGl0eSBvZiB0aGUgdHlwZSBvZiBhbiBlbnRpdHlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVR5cGVPZkVudGl0eShwa0VudGl0eTogbnVtYmVyLCBoYXNUeXBlUHJvcGVydHk6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50PiB7XG4gICAgaWYgKGlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKHsgZmtfcHJvcGVydHk6IGhhc1R5cGVQcm9wZXJ0eSwgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eSB9KS5waXBlKG1hcChpdGVtcyA9PiB7XG4gICAgICAgIGlmICghaXRlbXMgfHwgT2JqZWN0LmtleXMoaXRlbXMpLmxlbmd0aCA8IDEpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlcyhpdGVtcylbMF1cbiAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7IGZrX3Byb3BlcnR5OiBoYXNUeXBlUHJvcGVydHksIGZrX29iamVjdF9pbmZvOiBwa0VudGl0eSB9KS5waXBlKFxuICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAgICAgICAgIGlmICghaXRlbXMgfHwgT2JqZWN0LmtleXMoaXRlbXMpLmxlbmd0aCA8IDEpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgZWxzZSByZXR1cm4gdmFsdWVzKGl0ZW1zKVswXVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVDbGFzc2VzQW5kVHlwZXMoZW5hYmxlZEluOiAnZW50aXRpZXMnIHwgJ3NvdXJjZXMnKSB7XG4gICAgcmV0dXJuIHRoaXMuYy5waXBlVHlwZUFuZFR5cGVkQ2xhc3NlcyhlbmFibGVkSW4pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoaXRlbXMgPT4gdGhpcy5waXBlQ2xhc3NBbmRUeXBlTm9kZXMoaXRlbXMpKSxcbiAgICApXG4gIH1cblxuICBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlQ2xhc3Nlc0FuZFR5cGVzT2ZDbGFzc2VzKGNsYXNzZXM6IG51bWJlcltdKSB7XG4gICAgcmV0dXJuIHRoaXMuYy5waXBlVHlwZUFuZFR5cGVkQ2xhc3Nlc09mVHlwZWRDbGFzc2VzKGNsYXNzZXMpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoaXRlbXMgPT4gdGhpcy5waXBlQ2xhc3NBbmRUeXBlTm9kZXMoaXRlbXMpKSxcbiAgICApXG4gIH1cblxuICBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlQ2xhc3NBbmRUeXBlTm9kZXModHlwZUFuZFR5cGVkQ2xhc3NlczogeyB0eXBlZENsYXNzOiBudW1iZXI7IHR5cGVDbGFzczogbnVtYmVyOyB9W10pOiBPYnNlcnZhYmxlPENsYXNzQW5kVHlwZU5vZGVbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgIHR5cGVBbmRUeXBlZENsYXNzZXMubWFwKGl0ZW0gPT4gdGhpcy5jLnBpcGVDbGFzc0xhYmVsKGl0ZW0udHlwZWRDbGFzcykucGlwZShcbiAgICAgICAgbWFwKGxhYmVsID0+ICh7XG4gICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgZGF0YTogeyBwa0NsYXNzOiBpdGVtLnR5cGVkQ2xhc3MsIHBrVHlwZTogbnVsbCB9XG4gICAgICAgIH0gYXMgQ2xhc3NBbmRUeXBlTm9kZSkpLFxuICAgICAgICBzd2l0Y2hNYXAobm9kZSA9PiBpaWYoXG4gICAgICAgICAgKCkgPT4gISFpdGVtLnR5cGVDbGFzcyxcbiAgICAgICAgICB0aGlzLmIucGlwZVBlcnNpc3RlbnRJdGVtUGtzQnlDbGFzcyhpdGVtLnR5cGVDbGFzcykucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCh0eXBlUGtzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICAgICAgICB0eXBlUGtzLm1hcChwa1R5cGUgPT4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcocGtUeXBlKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChwcmV2aWV3ID0+ICh7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogcHJldmlldy5lbnRpdHlfbGFiZWwsXG4gICAgICAgICAgICAgICAgICBkYXRhOiB7IHBrQ2xhc3M6IGl0ZW0udHlwZWRDbGFzcywgcGtUeXBlIH1cbiAgICAgICAgICAgICAgICB9IGFzIENsYXNzQW5kVHlwZU5vZGUpKVxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICBzb3J0QWJjKG4gPT4gbi5sYWJlbCksXG4gICAgICAgICAgICApKSxcbiAgICAgICAgICAgIG1hcChjaGlsZHJlbiA9PiB7XG4gICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4gPSBjaGlsZHJlblxuICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApLFxuICAgICAgICAgIG9mKHsgLi4ubm9kZSwgY2hpbGRyZW46IFtdIH0gYXMgQ2xhc3NBbmRUeXBlTm9kZSlcbiAgICAgICAgKVxuICAgICAgICApXG4gICAgICApKVxuICAgICkucGlwZShcbiAgICAgIHNvcnRBYmMoKG5vZGUpID0+IG5vZGUubGFiZWwpLFxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGFycmF5IG9mIHBrX2NsYXNzIG9mIGFsbCBjbGFzc2VzIGFuZCB0eXBlZCBjbGFzc2VzLlxuICAgKiBAcGFyYW0gY2xhc3Nlc0FuZFR5cGVzIGEgb2JqZWN0IGNvbnRhaW5pbmcge2NsYXNzZXM6IFtdLCB0eXBlc1tdfVxuICAgKi9cbiAgcGlwZUNsYXNzZXNGcm9tQ2xhc3Nlc0FuZFR5cGVzKGNsYXNzZXNBbmRUeXBlczogQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgY29uc3QgdHlwZWRDbGFzc2VzJCA9ICghY2xhc3Nlc0FuZFR5cGVzIHx8ICFjbGFzc2VzQW5kVHlwZXMudHlwZXMgfHwgIWNsYXNzZXNBbmRUeXBlcy50eXBlcy5sZW5ndGgpID9cbiAgICAgIG9mKFtdIGFzIG51bWJlcltdKSA6XG4gICAgICB0aGlzLmIucGlwZUNsYXNzZXNPZlBlcnNpc3RlbnRJdGVtcyhjbGFzc2VzQW5kVHlwZXMudHlwZXMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigocGtzKSA9PiAhIXBrcyksXG4gICAgICAgICAgc3dpdGNoTWFwKHR5cGVDbGFzc2VzID0+IHRoaXMuYy5waXBlVHlwZWRDbGFzc2VzT2ZUeXBlQ2xhc3Nlcyh0eXBlQ2xhc3NlcykpXG4gICAgICAgIClcbiAgICByZXR1cm4gdHlwZWRDbGFzc2VzJC5waXBlKFxuICAgICAgbWFwKHR5cGVkQ2xhc3NlcyA9PiB1bmlxKFsuLi50eXBlZENsYXNzZXMsIC4uLigoY2xhc3Nlc0FuZFR5cGVzIHx8IHsgY2xhc3NlczogW10gfSkuY2xhc3NlcyB8fCBbXSldKSlcbiAgICApO1xuICB9XG5cbiAgcGlwZVByb3BlcnR5T3B0aW9uc0Zyb21DbGFzc2VzQW5kVHlwZXMoY2xhc3Nlc0FuZFR5cGVzOiBDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCk6IE9ic2VydmFibGU8UHJvcGVydHlPcHRpb25bXT4ge1xuICAgIHJldHVybiB0aGlzLnBpcGVDbGFzc2VzRnJvbUNsYXNzZXNBbmRUeXBlcyhjbGFzc2VzQW5kVHlwZXMpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoY2xhc3NlcyA9PiB0aGlzLnBpcGVQcm9wZXJ0eU9wdGlvbnNGb3JtQ2xhc3NlcyhjbGFzc2VzKSlcbiAgICApXG4gIH1cblxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZVByb3BlcnR5T3B0aW9uc0Zvcm1DbGFzc2VzKGNsYXNzZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTxQcm9wZXJ0eU9wdGlvbltdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KGNsYXNzZXMubWFwKHBrQ2xhc3MgPT4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcykucGlwZShcbiAgICAgIG1hcChjID0+IGMuYmFzaWNfdHlwZSA9PT0gOSksXG4gICAgICBzd2l0Y2hNYXAoaXNUZUVuID0+IHRoaXMuYy5waXBlU3BlY2lmaWNBbmRCYXNpY0ZpZWxkcyhwa0NsYXNzKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoY2xhc3NGaWVsZHMgPT4gY2xhc3NGaWVsZHNcbiAgICAgICAgICAgIC5maWx0ZXIoZiA9PiAhIWYucHJvcGVydHkucGtQcm9wZXJ0eSlcbiAgICAgICAgICAgIC5tYXAoZiA9PiAoe1xuICAgICAgICAgICAgICBpc091dGdvaW5nOiBmLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgIGZrUHJvcGVydHlEb21haW46IGYuaXNPdXRnb2luZyA/IGYuc291cmNlQ2xhc3MgOiBudWxsLFxuICAgICAgICAgICAgICBma1Byb3BlcnR5UmFuZ2U6IGYuaXNPdXRnb2luZyA/IG51bGwgOiBmLnNvdXJjZUNsYXNzLFxuICAgICAgICAgICAgICBwa1Byb3BlcnR5OiBmLnByb3BlcnR5LnBrUHJvcGVydHlcbiAgICAgICAgICAgIH0pKSksXG4gICAgICAgICAgc3dpdGNoTWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgIGlmIChpc1RlRW4pIHtcbiAgICAgICAgICAgICAgLy8gYWRkIHRpbWUgcHJvcGVydGllcyAoYXQgc29tZSB0aW1lIHdpdGhpbiwgLi4uKVxuICAgICAgICAgICAgICBEZmhDb25maWcuUFJPUEVSVFlfUEtTX1dIRVJFX1RJTUVfUFJJTUlUSVZFX0lTX1JBTkdFLm1hcChwa1Byb3BlcnR5ID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgICBma1Byb3BlcnR5RG9tYWluOiBwa0NsYXNzLFxuICAgICAgICAgICAgICAgICAgZmtQcm9wZXJ0eVJhbmdlOiBEZmhDb25maWcuQ0xBU1NfUEtfVElNRV9QUklNSVRJVkUsXG4gICAgICAgICAgICAgICAgICBpc091dGdvaW5nOiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KGl0ZW1zLm1hcChpdGVtID0+IHRoaXMuYy5waXBlRmllbGRMYWJlbChcbiAgICAgICAgICAgICAgaXRlbS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICBpdGVtLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgICAgICAgIGl0ZW0uZmtQcm9wZXJ0eVJhbmdlLFxuICAgICAgICAgICAgKS5waXBlKG1hcChsYWJlbCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzT3V0Z29pbmcgPSBpdGVtLmlzT3V0Z29pbmc7XG4gICAgICAgICAgICAgIGNvbnN0IG86IFByb3BlcnR5T3B0aW9uID0ge1xuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICAgICAgcGs6IGl0ZW0ucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUZpZWxkS2V5OiBwcm9wZXJ0eU9wdGlvbkZpZWxkS2V5KGl0ZW0ucGtQcm9wZXJ0eSwgaXNPdXRnb2luZylcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgICB9KSkpKTtcbiAgICAgICAgICB9KSkpXG4gICAgKVxuXG5cbiAgICApKS5waXBlKG1hcCh5ID0+IGZsYXR0ZW48UHJvcGVydHlPcHRpb24+KHkpKSk7XG4gIH1cblxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZVBrQ2xhc3Nlc0Zyb21Qcm9wZXJ0eVNlbGVjdE1vZGVsKG1vZGVsOiBQcm9wZXJ0eVNlbGVjdE1vZGVsKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgIFtcbiAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLm91dGdvaW5nUHJvcGVydGllcywgdHJ1ZSksXG4gICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5pbmdvaW5nUHJvcGVydGllcywgZmFsc2UpLFxuICAgICAgXVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW291dCwgaW5nXSkgPT4gdW5pcShbLi4ub3V0LCAuLi5pbmddKSlcbiAgICApXG4gIH1cblxuICBnZXRQa0NsYXNzZXNGcm9tUHJvcGVydHlTZWxlY3RNb2RlbCQobW9kZWwkOiBPYnNlcnZhYmxlPFByb3BlcnR5U2VsZWN0TW9kZWw+KTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiBtb2RlbCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChtb2RlbCA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgW1xuICAgICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5vdXRnb2luZ1Byb3BlcnRpZXMsIHRydWUpLFxuICAgICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5pbmdvaW5nUHJvcGVydGllcywgZmFsc2UpLFxuICAgICAgICBdXG4gICAgICApLnBpcGUoXG4gICAgICAgIG1hcCgoW291dCwgaW5nXSkgPT4gdW5pcShbLi4ub3V0LCAuLi5pbmddKSlcbiAgICAgICkpXG4gICAgKVxuICB9XG5cblxuXG4gIGdldFByb3BlcnR5T3B0aW9ucyQoY2xhc3NUeXBlcyQ6IE9ic2VydmFibGU8Q2xhc3NBbmRUeXBlU2VsZWN0TW9kZWw+KTogT2JzZXJ2YWJsZTxQcm9wZXJ0eU9wdGlvbltdPiB7XG4gICAgcmV0dXJuIGNsYXNzVHlwZXMkLnBpcGU8Q2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwsIFByb3BlcnR5T3B0aW9uW10+KFxuICAgICAgLy8gbWFrZSBzdXJlIG9ubHkgaXQgcGFzc2VzIG9ubHkgaWYgZGF0YSBvZiB0aGUgYXJyYXlDbGFzc2VzIGFyZSBjaGFuZ2VkIChub3QgY2hpbGRyZW4pXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZDxDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbD4oKGEsIGIpID0+IHtcbiAgICAgICAgcmV0dXJuIGVxdWFscyhhLCBiKTtcbiAgICAgIH0pLFxuICAgICAgc3dpdGNoTWFwKCh4KSA9PiAheCA/IGVtcHR5KCkgOiB0aGlzLmIucGlwZUNsYXNzZXNPZlBlcnNpc3RlbnRJdGVtcyh4LnR5cGVzKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKHBrcykgPT4gISFwa3MpLFxuICAgICAgICAgIHN3aXRjaE1hcCh0eXBlQ2xhc3NlcyA9PiB0aGlzLmMucGlwZVR5cGVkQ2xhc3Nlc09mVHlwZUNsYXNzZXModHlwZUNsYXNzZXMpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAodHlwZWRDbGFzc2VzID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IHVuaXEoWy4uLnR5cGVkQ2xhc3NlcywgLi4uKHguY2xhc3NlcyB8fCBbXSldKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZVByb3BlcnR5T3B0aW9uc0Zvcm1DbGFzc2VzKGNsYXNzZXMpXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnR5T3B0aW9uRmllbGRLZXkoZmtQcm9wZXJ0eTogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogc3RyaW5nIHtcbiAgcmV0dXJuICdfJyArIGZrUHJvcGVydHkgKyAnXycgKyAoaXNPdXRnb2luZyA/ICdvdXRnb2luZycgOiAnaW5nb2luZycpO1xufVxuXG4iXX0=