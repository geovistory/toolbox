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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbmZvcm1hdGlvbi1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdqRCxPQUFPLEVBQWdCLG9CQUFvQixFQUFlLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkwsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBeUJoRSxPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FB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QyxDQUFDO0FBQ3hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZmhDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUsIFBhZ2luYXRlQnlQYXJhbSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgSW5mU3RhdGVtZW50IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IENhbGVuZGFyVHlwZSwgY29tYmluZUxhdGVzdE9yRW1wdHksIEdyYW51bGFyaXR5LCBsaW1pdFRvLCBzb3J0QWJjLCBzd2l0Y2hNYXBPciwgVGltZVByaW1pdGl2ZSwgVGltZVByaW1pdGl2ZVBpcGUsIFRpbWVTcGFuUGlwZSwgVGltZVNwYW5VdGlsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBlcXVhbHMsIGZsYXR0ZW4sIGdyb3VwQnksIHBpY2ssIHVuaXEsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgZW1wdHksIGlpZiwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhZyB9IGZyb20gJ3J4anMtc3B5L29wZXJhdG9ycyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjYWNoZSwgc3B5VGFnIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9tZXRob2QtZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyB0aW1lU3Bhbkl0ZW1Ub1RpbWVTcGFuIH0gZnJvbSAnLi4vZnVuY3Rpb25zL2Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBBcHBlbGxhdGlvbkl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvQXBwZWxsYXRpb25JdGVtJztcbmltcG9ydCB7IEJhc2ljU3RhdGVtZW50SXRlbSB9IGZyb20gJy4uL21vZGVscy9CYXNpY1N0YXRlbWVudEl0ZW0nO1xuaW1wb3J0IHsgQ2xhc3NBbmRUeXBlTm9kZSB9IGZyb20gJy4uL21vZGVscy9DbGFzc0FuZFR5cGVOb2RlJztcbmltcG9ydCB7IENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL0NsYXNzQW5kVHlwZVNlbGVjdE1vZGVsJztcbmltcG9ydCB7IEN0cmxUaW1lU3BhbkRpYWxvZ1Jlc3VsdCB9IGZyb20gJy4uL21vZGVscy9DdHJsVGltZVNwYW5EaWFsb2dSZXN1bHQnO1xuaW1wb3J0IHsgRGltZW5zaW9uSXRlbSB9IGZyb20gJy4uL21vZGVscy9EaW1lbnNpb25JdGVtJztcbmltcG9ydCB7IEVudGl0eVByZXZpZXdJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0VudGl0eVByZXZpZXdJdGVtJztcbmltcG9ydCB7IEVudGl0eVByb3BlcnRpZXMgfSBmcm9tICcuLi9tb2RlbHMvRW50aXR5UHJvcGVydGllcyc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL21vZGVscy9GaWVsZCc7XG5pbXBvcnQgeyBJdGVtTGlzdCB9IGZyb20gJy4uL21vZGVscy9JdGVtTGlzdCc7XG5pbXBvcnQgeyBMYW5nU3RyaW5nSXRlbSB9IGZyb20gJy4uL21vZGVscy9MYW5nU3RyaW5nSXRlbSc7XG5pbXBvcnQgeyBMYW5ndWFnZUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvTGFuZ3VhZ2VJdGVtJztcbmltcG9ydCB7IFBsYWNlSXRlbSB9IGZyb20gJy4uL21vZGVscy9QbGFjZUl0ZW0nO1xuaW1wb3J0IHsgUHJvcGVydHlPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvUHJvcGVydHlPcHRpb24nO1xuaW1wb3J0IHsgUHJvcGVydHlTZWxlY3RNb2RlbCB9IGZyb20gJy4uL21vZGVscy9Qcm9wZXJ0eVNlbGVjdE1vZGVsJztcbmltcG9ydCB7IFN0YXRlbWVudEl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvU3RhdGVtZW50SXRlbSc7XG5pbXBvcnQgeyBTdWJmaWVsZCB9IGZyb20gJy4uL21vZGVscy9TdWJmaWVsZCc7XG5pbXBvcnQgeyBUZW1wb3JhbEVudGl0eUNlbGwgfSBmcm9tICcuLi9tb2RlbHMvVGVtcG9yYWxFbnRpdHlDZWxsJztcbmltcG9ydCB7IFRlbXBvcmFsRW50aXR5SXRlbSB9IGZyb20gJy4uL21vZGVscy9UZW1wb3JhbEVudGl0eUl0ZW0nO1xuaW1wb3J0IHsgVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vbW9kZWxzL1RlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcyc7XG5pbXBvcnQgeyBUZW1wb3JhbEVudGl0eVJvdyB9IGZyb20gJy4uL21vZGVscy9UZW1wb3JhbEVudGl0eVJvdyc7XG5pbXBvcnQgeyBUaW1lUHJpbWl0aXZlSXRlbSB9IGZyb20gJy4uL21vZGVscy9UaW1lUHJpbWl0aXZlSXRlbSc7XG5pbXBvcnQgeyBUaW1lU3Bhbkl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvVGltZVNwYW5JdGVtJztcbmltcG9ydCB7IFRpbWVTcGFuUHJvcGVydHkgfSBmcm9tICcuLi9tb2RlbHMvVGltZVNwYW5Qcm9wZXJ0eSc7XG5pbXBvcnQgeyBJbmZNb2RlbE5hbWUsIEluZlNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2luZi5zZXJ2aWNlJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UgfSBmcm9tICcuL2FjdGl2ZS1wcm9qZWN0LXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvblBpcGVzU2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEluZm9ybWF0aW9uQmFzaWNQaXBlc1NlcnZpY2UgfSBmcm9tICcuL2luZm9ybWF0aW9uLWJhc2ljLXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NoZW1hU2VsZWN0b3JzU2VydmljZSB9IGZyb20gJy4vc2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlJztcblxuXG5cblxuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIFRoaXMgU2VydmljZSBwcm92aWRlcyBhIGNvbGxlY2lvbiBvZiBwaXBlcyB0aGF0IGFnZ3JlZ2F0ZSBvciB0cmFuc2Zvcm0gaW5mb3JtYXRpb24uXG4gKiBGb3IgRXhhbXBsZVxuICogLSB0aGUgbGlzdHMgb2YgdGV4dCBwcm9wZXJ0aWVzLCBhcHBlbGxhaXRvbnMsIHBsYWNlcywgdGltZS1wcmltaXRpdmVzIC8gdGltZS1zcGFucyBldGMuXG4gKiAtIHRoZSBsYWJlbCBvZiB0ZW1wb3JhbCBlbnRpdHkgb3IgcGVyc2lzdGVudCBpdGVtXG4gKlxuICogVGhpcyBtYWlubHkgc2VsZWN0cyBkYXRhIGZyb20gdGhlIGluZm9ybWF0aW9uIHNjaGVtYSBhbmQgdGhlIHJlbGF0aW9uIHRvIHByb2plY3RzLlxuICogSXQgY29tYmluZXMgcGlwZXMgc2VsZWN0aW5nIGRhdGEgZnJvbSB0aGVcbiAqIC0gYWN0aXZhdGVkIHByb2plY3RcbiAqIC0gYWx0ZXJuYXRpdmVzIChub3QgaW4gcHJvamVjdCBidXQgaW4gb3RoZXJzKVxuICogLSByZXBvXG4gKlxuICovXG5leHBvcnQgY2xhc3MgSW5mb3JtYXRpb25QaXBlc1NlcnZpY2Uge1xuXG4gIGluZlJlcG86IEluZlNlbGVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYjogSW5mb3JtYXRpb25CYXNpY1BpcGVzU2VydmljZSxcbiAgICBwcml2YXRlIHA6IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzOiBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgYzogQ29uZmlndXJhdGlvblBpcGVzU2VydmljZSxcbiAgICBwdWJsaWMgdGltZVByaW1pdGl2ZVBpcGU6IFRpbWVQcmltaXRpdmVQaXBlLFxuICAgIHByaXZhdGUgdGltZVNwYW5QaXBlOiBUaW1lU3BhblBpcGUsXG4gICAgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+XG4gICkge1xuICAgIHRoaXMuaW5mUmVwbyA9IG5ldyBJbmZTZWxlY3RvcihuZ1JlZHV4LCBvZigncmVwbycpKVxuICB9XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIFBpcGUgdGhlIHByb2plY3QgZW50aXRpZXNcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0TGVuZ3RoKGw6IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICBzd2l0Y2ggKGwubGlzdFR5cGUpIHtcbiAgICAgIGNhc2UgJ2FwcGVsbGF0aW9uJzpcbiAgICAgIGNhc2UgJ2VudGl0eS1wcmV2aWV3JzpcbiAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgICAgIGNhc2UgJ3BsYWNlJzpcbiAgICAgIGNhc2UgJ2RpbWVuc2lvbic6XG4gICAgICBjYXNlICdsYW5nU3RyaW5nJzpcbiAgICAgIGNhc2UgJ3RlbXBvcmFsLWVudGl0eSc6XG4gICAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0KGwsIHBrRW50aXR5KS5waXBlKG1hcChpdGVtcyA9PiBpdGVtcy5sZW5ndGgpKVxuXG4gICAgICBjYXNlICd0aW1lLXNwYW4nOlxuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoNzIsIHBrRW50aXR5KSxcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoNzEsIHBrRW50aXR5KSxcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUwLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MSwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTIsIHBrRW50aXR5KSxcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUzLCBwa0VudGl0eSlcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIHRhcCgoeCkgPT4ge1xuXG4gICAgICAgICAgfSksXG4gICAgICAgICAgbWFwKGl0ZW1zID0+IGl0ZW1zLmZpbHRlcih4ID0+IHgubGVuZ3RoID4gMCkubGVuZ3RoKSlcblxuICAgICAgLy8gY2FzZSAndGV4dC1wcm9wZXJ0eSc6XG4gICAgICAvLyAgIHJldHVybiB0aGlzLnBpcGVMaXN0VGV4dFByb3BlcnR5KGwsIHBrRW50aXR5KS5waXBlKG1hcChpdGVtcyA9PiBpdGVtcy5sZW5ndGgpKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgICAgICAgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gICAgfVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdChsOiBTdWJmaWVsZCwgcGtFbnRpdHksIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxJdGVtTGlzdD4ge1xuICAgIGlmIChsLmxpc3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm4gdGhpcy5waXBlTGlzdEFwcGVsbGF0aW9uKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmVudGl0eVByZXZpZXcpIHJldHVybiB0aGlzLnBpcGVMaXN0RW50aXR5UHJldmlldyhsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5ndWFnZSkgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5ndWFnZShsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5wbGFjZSkgcmV0dXJuIHRoaXMucGlwZUxpc3RQbGFjZShsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5kaW1lbnNpb24pIHJldHVybiB0aGlzLnBpcGVMaXN0RGltZW5zaW9uKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmdTdHJpbmcpIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ1N0cmluZyhsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkgcmV0dXJuIHRoaXMucGlwZUxpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnRpbWVTcGFuKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVRpbWVTcGFuKHBrRW50aXR5KS5waXBlKFxuICAgICAgICBtYXAoKHRzKSA9PiBbdHNdLmZpbHRlcihpID0+IGkucHJvcGVydGllcy5sZW5ndGggPiAwKSlcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RCYXNpY1N0YXRlbWVudEl0ZW1zKGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgcGtQcm9qZWN0OiBudW1iZXIpOiBPYnNlcnZhYmxlPEJhc2ljU3RhdGVtZW50SXRlbVtdPiB7XG4gICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdCYXNpY1N0YXRlbWVudEl0ZW1zQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSwgcGtQcm9qZWN0KSA6XG4gICAgICB0aGlzLmIucGlwZUluZ29pbmdCYXNpY1N0YXRlbWVudEl0ZW1zQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSwgcGtQcm9qZWN0KVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBpdGVtcyBpbiBhcHBlbGxhdGlvbiBmaWVsZFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdEFwcGVsbGF0aW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEFwcGVsbGF0aW9uSXRlbVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICogUGlwZSB0aGUgaXRlbXMgaW4gZW50aXR5IHByZXZpZXcgZmllbGRcbiAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0RW50aXR5UHJldmlldzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWcoYGJlZm9yZS0ke3BrRW50aXR5fS0ke2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHl9LSR7bGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3N9YCksXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKVxuICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLm9yZE51bSA+IGIub3JkTnVtID8gMSA6IC0xKSxcbiAgICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKVxuICAgICAgICAgICAgKVxuICAgICAgICB9KSxcbiAgICAgICAgdGFnKGBhZnRlci0ke3BrRW50aXR5fS0ke2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHl9LSR7bGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3N9YCksXG4gICAgICApXG5cbiAgfVxuXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdExhbmd1YWdlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGl0ZW1zIGluIHBsYWNlIGxpc3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RQbGFjZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxQbGFjZUl0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1QbGFjZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBpdGVtcyBpbiBwbGFjZSBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0RGltZW5zaW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1EaW1lbnNpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAqIFBpcGUgdGhlIGl0ZW1zIGluIGxhbmdTdHJpbmcgbGlzdFxuICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RMYW5nU3RyaW5nPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPExhbmdTdHJpbmdJdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ1N0cmluZyhyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcblxuICB9XG5cblxuICBwaXBlU3RhdGVtZW50TGlzdFBhZ2UoXG4gICAgcGFnaW5hdGVCeTogUGFnaW5hdGVCeVBhcmFtW10sXG4gICAgbGltaXQ6IG51bWJlcixcbiAgICBvZmZzZXQ6IG51bWJlcixcbiAgICBwa1Byb2plY3Q6IG51bWJlcixcbiAgICBsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsXG4gICAgYWx0ZXJuYXRpdmUgPSBmYWxzZSk6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gICAgLy8gcHJlcGFyZSBwYWdlIGxvYWRlclxuICAgIGNvbnN0IHBhZ2VMb2FkZXIkID0gYWx0ZXJuYXRpdmUgPyB0aGlzLmluZlJlcG8uc3RhdGVtZW50JC5wYWdpbmF0aW9uJCA6IHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQ7XG5cbiAgICAvLyBwcmVwYXJlIGJhc2ljIHN0YXRlbWVudCBpdGVtIGxvYWRlclxuICAgIGNvbnN0IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlciA9IChwa1N0YXRlbWVudCwgaXNPdXRnb2luZywgcGtQcm9qKSA9PiB7XG4gICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAgICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1N0YXRlbWVudCwgaXNPdXRnb2luZykgOlxuICAgICAgICB0aGlzLmIucGlwZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtQcm9qLCBwa1N0YXRlbWVudCwgaXNPdXRnb2luZylcbiAgICB9XG5cbiAgICBjb25zdCBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkID0gcGFnZUxvYWRlciQucGlwZVBhZ2UocGFnaW5hdGVCeSwgbGltaXQsIG9mZnNldClcblxuICAgIHJldHVybiBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHBhZ2luYXRlZFN0YXRlbWVudFBrcykgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIHBhZ2luYXRlZFN0YXRlbWVudFBrcy5tYXAocGtTdGF0ZW1lbnQgPT4gYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyKHBrU3RhdGVtZW50LCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLCBwa1Byb2plY3QpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKHggPT4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoeC5pc091dGdvaW5nID8geC5zdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8gOiB4LnN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgocHJldmlldykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogRW50aXR5UHJldmlld0l0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIC4uLngsXG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXcsXG4gICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IHByZXZpZXcuZmtfY2xhc3NcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpXG5cbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgKSlcblxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSB0aGUgdGVtcG9yYWwgZW50aXRpZXMgY29ubmVjdGVkIHRvIGdpdmVuIGVudGl0eSBieSBzdGF0ZW1lbnRzIHRoYXQgYXJlIGluIHRoZSBjdXJyZW50IHByb2plY3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVRlbXBvcmFsRW50aXR5VGFibGVSb3dzKFxuICAgIHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLFxuICAgIGxpbWl0OiBudW1iZXIsXG4gICAgb2Zmc2V0OiBudW1iZXIsXG4gICAgcGtQcm9qZWN0OiBudW1iZXIsXG4gICAgbGlzdERlZmluaXRpb246IFN1YmZpZWxkLFxuICAgIGZpZWxkRGVmaW5pdGlvbnM6IEZpZWxkW10sXG4gICAgYWx0ZXJuYXRpdmUgPSBmYWxzZSk6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlJdGVtW10+IHtcblxuICAgIC8vIGNvbnN0IHByb3BlcnR5SXRlbVR5cGUgPSB0aGlzLnByb3BlcnR5SXRlbVR5cGUoZmllbGREZWZpbml0aW9ucylcblxuICAgIGNvbnN0IHRhcmdldEVudGl0eU9mU3RhdGVtZW50SXRlbSA9IChyOiBCYXNpY1N0YXRlbWVudEl0ZW0pID0+IHIuaXNPdXRnb2luZyA/IHIuc3RhdGVtZW50LmZrX29iamVjdF9pbmZvIDogci5zdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvO1xuXG4gICAgLy8gcHJlcGFyZSBwYWdlIGxvYWRlclxuICAgIGNvbnN0IHBhZ2VMb2FkZXIkID0gYWx0ZXJuYXRpdmUgPyB0aGlzLmluZlJlcG8uc3RhdGVtZW50JC5wYWdpbmF0aW9uJCA6IHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQ7XG5cbiAgICAvLyBwcmVwYXJlIGJhc2ljIHN0YXRlbWVudCBpdGVtIGxvYWRlclxuICAgIGNvbnN0IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlciA9IChwa1N0YXRlbWVudCwgaXNPdXRnb2luZywgcGtQcm9qKSA9PiB7XG4gICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAgICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1N0YXRlbWVudCwgaXNPdXRnb2luZykgOlxuICAgICAgICB0aGlzLmIucGlwZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtQcm9qLCBwa1N0YXRlbWVudCwgaXNPdXRnb2luZylcbiAgICB9XG5cbiAgICAvLyBwcmVwYXJlIFRlRW5Sb3cgbG9hZGVyXG4gICAgY29uc3Qgcm93TG9hZGVyID0gKHRhcmdldEVudGl0eVBrLCBmaWVsZERlZiwgcGtQcm9qKSA9PiB7XG4gICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAgICAgICB0aGlzLnBpcGVJdGVtVGVFblJvdyh0YXJnZXRFbnRpdHlQaywgZmllbGREZWYsIG51bGwsIHRydWUpIDpcbiAgICAgICAgdGhpcy5waXBlSXRlbVRlRW5Sb3codGFyZ2V0RW50aXR5UGssIGZpZWxkRGVmLCBwa1Byb2osIGZhbHNlKVxuICAgIH1cblxuICAgIGNvbnN0IHBhZ2luYXRlZFN0YXRlbWVudFBrcyQgPSBwYWdlTG9hZGVyJC5waXBlUGFnZShwYWdpbmF0ZUJ5LCBsaW1pdCwgb2Zmc2V0KVxuXG4gICAgY29uc3Qgcm93cyQgPSBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHBhZ2luYXRlZFN0YXRlbWVudFBrcykgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIHBhZ2luYXRlZFN0YXRlbWVudFBrcy5tYXAocGtTdGF0ZW1lbnQgPT4gYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyKHBrU3RhdGVtZW50LCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLCBwa1Byb2plY3QpXG4gICAgICAgICAgLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKHRlRW5TdGF0ZW1lbnQpID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICAgICAgdGVFblN0YXRlbWVudC5tYXAoKGJhc2ljU3RhdGVtZW50SXRlbSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBwa1RlRW4gPSB0YXJnZXRFbnRpdHlPZlN0YXRlbWVudEl0ZW0oYmFzaWNTdGF0ZW1lbnRJdGVtKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgcm93TG9hZGVyKFxuICAgICAgICAgICAgICAgICAgcGtUZUVuLFxuICAgICAgICAgICAgICAgICAgZmllbGREZWZpbml0aW9ucyxcbiAgICAgICAgICAgICAgICAgIC8vIHByb3BlcnR5SXRlbVR5cGUsXG4gICAgICAgICAgICAgICAgICBwa1Byb2plY3RcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHBrVGVFbilcbiAgICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoW3JvdywgdGVFblByb2pSZWxdKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBUZW1wb3JhbEVudGl0eUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmJhc2ljU3RhdGVtZW50SXRlbSxcbiAgICAgICAgICAgICAgICAgICAgcm93LFxuICAgICAgICAgICAgICAgICAgICBwa0VudGl0eTogcGtUZUVuLFxuICAgICAgICAgICAgICAgICAgICB0ZUVuUHJvalJlbFxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApKSxcbiAgICAgICAgKSksXG5cbiAgICApXG4gICAgcmV0dXJuIHJvd3MkXG4gIH1cblxuXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVRlRW5Sb3cocGtFbnRpdHk6IG51bWJlciwgZmllbGREZWZpbml0aW9uczogRmllbGRbXSwgcGtQcm9qZWN0OiBudW1iZXIsIHJlcG86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFRlbXBvcmFsRW50aXR5Um93PiB7XG5cbiAgICAvLyBwaXBlIG91dGdvaW5nIHN0YXRlbWVudHNcbiAgICBjb25zdCBvdXRnb2luZ1N0YXRlbWVudHMkID0gcmVwbyA/IHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSkgOiB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk7XG4gICAgLy8gcGlwZSBpbmdvaW5nIHN0YXRlbWVudHNcbiAgICBjb25zdCBpbmdvaW5nU3RhdGVtZW50cyQgPSByZXBvID8gdGhpcy5iLnBpcGVSZXBvSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpIDogdGhpcy5iLnBpcGVJbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk7XG5cblxuICAgIC8vIHBpcGUgYWxsIHN0YXRlbWVudHMgd2l0aCBpbmZvcm1hdGlvbiBsZWFmIGl0ZW1zXG5cbiAgICBjb25zdCBvdXRnb2luZ0l0ZW1zJDogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRJdGVtW10+ID0gb3V0Z29pbmdTdGF0ZW1lbnRzJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIHN0YXRlbWVudHNcbiAgICAgICAgICAuZmlsdGVyKHN0YXRlbWVudCA9PiAhIXN0YXRlbWVudC5ma19vYmplY3RfaW5mbykgLy8gcmVtb3ZlIHN0YXRlbWVudHMgbm90IHBvaW50aW5nIHRvIGluZm9ybWF0aW9uXG4gICAgICAgICAgLm1hcChzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzT3V0Z29pbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW0ocywgcGtQcm9qZWN0LCBpc091dGdvaW5nKTtcbiAgICAgICAgICB9KVxuICAgICAgKSlcblxuICAgIClcbiAgICBjb25zdCBpbmdvaW5nSXRlbXMkOiBPYnNlcnZhYmxlPFN0YXRlbWVudEl0ZW1bXT4gPSBpbmdvaW5nU3RhdGVtZW50cyQucGlwZShcbiAgICAgIHN3aXRjaE1hcChzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBzdGF0ZW1lbnRzXG4gICAgICAgICAgLmZpbHRlcihzdGF0ZW1lbnQgPT4gISFzdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKSAvLyByZW1vdmUgc3RhdGVtZW50cyBub3QgcG9pbnRpbmcgdG8gaW5mb3JtYXRpb25cbiAgICAgICAgICAubWFwKHMgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNPdXRnb2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW0ocywgcGtQcm9qZWN0LCBpc091dGdvaW5nKTtcbiAgICAgICAgICB9KVxuICAgICAgKSlcblxuICAgIClcblxuICAgIGNvbnN0IHNvcnRJdGVtcyA9IHJlcG8gP1xuICAgICAgKGl0ZW06IFN0YXRlbWVudEl0ZW1bXSkgPT4gaXRlbS5zb3J0KChhLCBiKSA9PiBhLnN0YXRlbWVudC5pc19pbl9wcm9qZWN0X2NvdW50ID4gYi5zdGF0ZW1lbnQuaXNfaW5fcHJvamVjdF9jb3VudCA/IDEgOiAtMSkgOlxuICAgICAgKGl0ZW06IFN0YXRlbWVudEl0ZW1bXSkgPT4gaXRlbTtcblxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qob3V0Z29pbmdJdGVtcyQsIGluZ29pbmdJdGVtcyQpLnBpcGUoXG5cbiAgICAgIG1hcCgoW291dGdvaW5nSXRlbXMsIGluZ29pbmdJdGVtc10pID0+IHtcbiAgICAgICAgY29uc3QgZ3JvdXBlZE91dCA9IGdyb3VwQnkoKGkpID0+IChpICYmIGkuc3RhdGVtZW50ID8gaS5zdGF0ZW1lbnQuZmtfcHJvcGVydHkudG9TdHJpbmcoKSA6IHVuZGVmaW5lZCksIG91dGdvaW5nSXRlbXMpO1xuICAgICAgICBjb25zdCBncm91cGVkSW4gPSBncm91cEJ5KChpKSA9PiAoaSAmJiBpLnN0YXRlbWVudCA/IGkuc3RhdGVtZW50LmZrX3Byb3BlcnR5LnRvU3RyaW5nKCkgOiB1bmRlZmluZWQpLCBpbmdvaW5nSXRlbXMpO1xuICAgICAgICByZXR1cm4geyBncm91cGVkT3V0LCBncm91cGVkSW4gfVxuICAgICAgfSksXG4gICAgICAvLyBhdWRpdFRpbWUoMTApLFxuICAgICAgbWFwKChkKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdzogVGVtcG9yYWxFbnRpdHlSb3cgPSB7fVxuXG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbnMuZm9yRWFjaChmaWVsZERlZmluaXRpb24gPT4ge1xuXG4gICAgICAgICAgbGV0IGNlbGw6IFRlbXBvcmFsRW50aXR5Q2VsbDtcbiAgICAgICAgICBmaWVsZERlZmluaXRpb24ubGlzdERlZmluaXRpb25zLmZvckVhY2gobGlzdERlZmluaXRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKGxpc3REZWZpbml0aW9uLmxpc3RUeXBlLnRpbWVTcGFuKSB7XG5cbiAgICAgICAgICAgICAgY29uc3QgdCA9IHBpY2soWyc3MScsICc3MicsICcxNTAnLCAnMTUxJywgJzE1MicsICcxNTMnXSwgZC5ncm91cGVkT3V0KTtcbiAgICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHQpO1xuICAgICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ID0ga2V5cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgbGV0IGxhYmVsO1xuICAgICAgICAgICAgICBpZiAoaXRlbXNDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lU3BhbktleXM6IEN0cmxUaW1lU3BhbkRpYWxvZ1Jlc3VsdCA9IHt9XG4gICAgICAgICAgICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiB7IHRpbWVTcGFuS2V5c1trZXldID0gdFtrZXldWzBdLnRpbWVQcmltaXRpdmUgfSlcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lU3BhbiA9IFRpbWVTcGFuVXRpbC5mcm9tVGltZVNwYW5EaWFsb2dEYXRhKHRpbWVTcGFuS2V5cyk7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLnRpbWVTcGFuUGlwZS50cmFuc2Zvcm0odGltZVNwYW4pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZzogbGlzdERlZmluaXRpb24uaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICBpdGVtc0NvdW50LFxuICAgICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICAgIGVudGl0eVByZXZpZXc6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaXNUaW1lU3BhbjogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5ncm91cGVkT3V0W2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IHNvcnRJdGVtcyhkLmdyb3VwZWRPdXRbbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pXG4gICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgICAgICAgIGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zQ291bnQ6IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogKChmaXJzdEl0ZW0gfHwge30pIGFzIEVudGl0eVByZXZpZXdJdGVtKS5wcmV2aWV3LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmlyc3RJdGVtLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgICBmaXJzdEl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChkLmdyb3VwZWRJbltsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBzb3J0SXRlbXMoZC5ncm91cGVkSW5bbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pXG4gICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgICAgICAgIGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zQ291bnQ6IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogKChmaXJzdEl0ZW0gfHwge30pIGFzIEVudGl0eVByZXZpZXdJdGVtKS5wcmV2aWV3LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmlyc3RJdGVtLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgICBmaXJzdEl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9KVxuXG5cbiAgICAgICAgICByb3dbZmllbGREZWZpbml0aW9uLmxhYmVsXSA9IGNlbGw7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByb3dcbiAgICAgIH0pXG5cblxuICAgIClcbiAgfVxuXG5cblxuICAvLyBAc3B5VGFnXG4gIHByaXZhdGUgcGlwZUl0ZW0ocjogSW5mU3RhdGVtZW50LCBwa1Byb2plY3Q6IG51bWJlciwgcHJvcElzT3V0Z29pbmc6IGJvb2xlYW4pIHtcblxuICAgIGNvbnN0IHRhcmdldEVudGl0eSA9IHByb3BJc091dGdvaW5nID8gci5ma19vYmplY3RfaW5mbyA6IHIuZmtfc3ViamVjdF9pbmZvO1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5nZXRNb2RlbE9mRW50aXR5JCh0YXJnZXRFbnRpdHkpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAobSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsTmFtZTogSW5mTW9kZWxOYW1lID0gbSA/IG0ubW9kZWxOYW1lIDogdW5kZWZpbmVkO1xuICAgICAgICBzd2l0Y2ggKG1vZGVsTmFtZSkge1xuICAgICAgICAgIGNhc2UgJ2FwcGVsbGF0aW9uJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocik7XG4gICAgICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKTtcbiAgICAgICAgICBjYXNlICdwbGFjZSc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVBsYWNlKHIpO1xuICAgICAgICAgIGNhc2UgJ2RpbWVuc2lvbic6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKTtcbiAgICAgICAgICBjYXNlICdsYW5nX3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocik7XG4gICAgICAgICAgY2FzZSAndGltZV9wcmltaXRpdmUnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1UaW1lUHJpbWl0aXZlKHIsIHBrUHJvamVjdCk7IC8vIFRPRE86IGVtaXRzIHR3aWNlXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBwcm9wSXNPdXRnb2luZyk7XG4gICAgICAgIH1cblxuXG4gICAgICB9KVxuICAgIClcblxuXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUVudGl0eVByb3BlcnRpZXMobGlzdERlZjogU3ViZmllbGQsIGZrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxFbnRpdHlQcm9wZXJ0aWVzPiB7XG5cbiAgICBpZiAobGlzdERlZi5saXN0VHlwZS5hcHBlbGxhdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RBcHBlbGxhdGlvbihsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmxhbmd1YWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdExhbmd1YWdlKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUucGxhY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0UGxhY2UobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5kaW1lbnNpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0RGltZW5zaW9uKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUubGFuZ1N0cmluZykge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5nU3RyaW5nKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuXG5cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmVudGl0eVByZXZpZXcgfHwgbGlzdERlZi5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RFbnRpdHlQcmV2aWV3KGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUudGltZVNwYW4pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtVGltZVNwYW4oZmtFbnRpdHkpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGl0ZW1zID0gaXRlbS5wcm9wZXJ0aWVzLmZpbmQocCA9PiBwLml0ZW1zLmxlbmd0aCA+IDApID8gW3tcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVTcGFuUGlwZS50cmFuc2Zvcm0odGltZVNwYW5JdGVtVG9UaW1lU3BhbihpdGVtKSksXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSAvLyBUT0RPIGNoZWNrIGlmIHRoZSBwcm9wZXJ0aWVzIG9yIHRoZSBpdGVtIGFyZSByZWFsbHkgbm90IG5lZWRlZFxuICAgICAgICAgIH1dIDogW11cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGlzdERlZmluaXRpb246IGxpc3REZWYsXG4gICAgICAgICAgICBpdGVtc1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIG9mKG51bGwpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuaW5mJC50ZW1wb3JhbF9lbnRpdHkkLmJ5X3BrX2VudGl0eV9rZXkkKHBrRW50aXR5KSxcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdCQoeyBma19zdWJqZWN0X2luZm86IHBrRW50aXR5IH0pLFxuICAgICAgdGhpcy5zLmluZiQudGV4dF9wcm9wZXJ0eSQuYnlfZmtfY29uY2VybmVkX2VudGl0eV9pbmRleGVkJChwa0VudGl0eSlcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFt0ZW1wb3JhbEVudGl0eSwgc3RhdGVtZW50cywgdGV4dFByb3BlcnRpZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlczogVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzID0ge1xuICAgICAgICAgIHRlbXBvcmFsRW50aXR5LFxuICAgICAgICAgIHN0YXRlbWVudHM6IHN0YXRlbWVudHMsXG4gICAgICAgICAgdGV4dFByb3BlcnRpZXM6IHZhbHVlcyh0ZXh0UHJvcGVydGllcylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIGdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBpdGVtcyk6IEVudGl0eVByb3BlcnRpZXMge1xuICAgIHJldHVybiB7XG4gICAgICBsaXN0RGVmaW5pdGlvbixcbiAgICAgIGl0ZW1zLFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRpbWUgc3BhbiBpdGVtIGluIHZlcnNpb24gb2YgcHJvamVjdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVRpbWVTcGFuKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxUaW1lU3Bhbkl0ZW0+IHtcblxuICAgIHJldHVybiB0aGlzLnAucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmMucGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKFxuICAgICAgICAgIERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU5cbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChmaWVsZERlZnMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoZmllbGREZWZzLm1hcChmaWVsZERlZiA9PiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICAgICAgICAgIGZrX3Byb3BlcnR5OiBmaWVsZERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXBPcihbXSwgc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgICAgc3RhdGVtZW50cy5tYXAoc3RhdGVtZW50ID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHN0YXRlbWVudC5wa19lbnRpdHkpXG4gICAgICAgICAgICAgICAgICApLnBpcGUobWFwKChbaW5mVGltZVByaW1pdGl2ZSwgcHJvalJlbF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgICAgICAgICAgICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxlbmRhcjogKChwcm9qUmVsLmNhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgIHByb2pSZWwsXG4gICAgICAgICAgICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSksXG4gICAgICAgICAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlczogVGltZVNwYW5Qcm9wZXJ0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb246IGZpZWxkRGVmLmxpc3REZWZpbml0aW9uc1swXSwgaXRlbXNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKS5waXBlKFxuICAgICAgICAgICAgICBtYXAoKHByb3BlcnRpZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXMuZmlsdGVyKHAgPT4gcC5pdGVtcy5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lc3Bhbml0ZW06IFRpbWVTcGFuSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lc3Bhbml0ZW1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbUFwcGVsbGF0aW9uKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuYXBwZWxsYXRpb24kLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBtYXAoYXBwZWxsYXRpb24gPT4ge1xuICAgICAgICBpZiAoIWFwcGVsbGF0aW9uKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3Qgbm9kZTogQXBwZWxsYXRpb25JdGVtID0ge1xuICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgbGFiZWw6IGFwcGVsbGF0aW9uLnN0cmluZyxcbiAgICAgICAgICBma0NsYXNzOiBhcHBlbGxhdGlvbi5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1MYW5ndWFnZShzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgbWFwKGxhbmd1YWdlID0+IHtcbiAgICAgICAgaWYgKCFsYW5ndWFnZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG5vZGU6IExhbmd1YWdlSXRlbSA9IHtcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgIGxhYmVsOiBsYW5ndWFnZS5ub3RlcyxcbiAgICAgICAgICBma0NsYXNzOiBsYW5ndWFnZS5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1QbGFjZShzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8UGxhY2VJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnBsYWNlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgbWFwKHBsYWNlID0+IHtcbiAgICAgICAgaWYgKCFwbGFjZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG5vZGU6IFBsYWNlSXRlbSA9IHtcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgIGxhYmVsOiAnV0dTODQ6ICcgKyBwbGFjZS5sYXQgKyAnwrAsICcgKyBwbGFjZS5sb25nICsgJ8KwJyxcbiAgICAgICAgICBma0NsYXNzOiBwbGFjZS5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1EaW1lbnNpb24oc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuZGltZW5zaW9uJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgc3dpdGNoTWFwKChkaW1lbnNpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KGRpbWVuc2lvbi5ma19tZWFzdXJlbWVudF91bml0KVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKHByZXZpZXcgPT4ge1xuXG4gICAgICAgICAgICAgIGNvbnN0IG5vZGU6IERpbWVuc2lvbkl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICBsYWJlbDogYCR7ZGltZW5zaW9uLm51bWVyaWNfdmFsdWV9ICR7cHJldmlldy5lbnRpdHlfbGFiZWx9YCxcbiAgICAgICAgICAgICAgICBma0NsYXNzOiBkaW1lbnNpb24uZmtfY2xhc3MsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1MYW5nU3RyaW5nKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxMYW5nU3RyaW5nSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5nX3N0cmluZyQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKFxuICAgICAgICAobGFuZ1N0cmluZykgPT4ge1xuICAgICAgICAgIGlmICghbGFuZ1N0cmluZykgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3QobnVsbClcbiAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KGxhbmdTdHJpbmcuZmtfbGFuZ3VhZ2UpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKGxhbmd1YWdlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWxhbmd1YWdlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWwgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAobGFuZ1N0cmluZy5zdHJpbmcpIGxhYmVsID0gbGFuZ1N0cmluZy5zdHJpbmdcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsYW5nU3RyaW5nLnF1aWxsX2RvYyAmJiBsYW5nU3RyaW5nLnF1aWxsX2RvYy5vcHMgJiYgbGFuZ1N0cmluZy5xdWlsbF9kb2Mub3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgbGFiZWwgPSBsYW5nU3RyaW5nLnF1aWxsX2RvYy5vcHMubWFwKG9wID0+IG9wLmluc2VydCkuam9pbignJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGU6IExhbmdTdHJpbmdJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGxhbmdTdHJpbmcuZmtfY2xhc3MsXG4gICAgICAgICAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgIGZrTGFuZ3VhZ2U6IGxhbmdTdHJpbmcuZmtfbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHN0YXRlbWVudDogSW5mU3RhdGVtZW50LCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldygoaXNPdXRnb2luZyA/IHN0YXRlbWVudC5ma19vYmplY3RfaW5mbyA6IHN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pKS5waXBlKFxuICAgICAgLy8gZmlsdGVyKHByZXZpZXcgPT4gIXByZXZpZXcubG9hZGluZyAmJiAhIXByZXZpZXcgJiYgISFwcmV2aWV3LmVudGl0eV90eXBlKSxcbiAgICAgIG1hcChwcmV2aWV3ID0+IHtcbiAgICAgICAgaWYgKCFwcmV2aWV3KSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9kZTogRW50aXR5UHJldmlld0l0ZW0gPSB7XG4gICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICBwcmV2aWV3LFxuICAgICAgICAgIGxhYmVsOiBwcmV2aWV3LmVudGl0eV9sYWJlbCB8fCAnJyxcbiAgICAgICAgICBma0NsYXNzOiBwcmV2aWV3LmZrX2NsYXNzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwa1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVRpbWVQcmltaXRpdmUoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQsIHBrUHJvamVjdCk6IE9ic2VydmFibGU8VGltZVByaW1pdGl2ZUl0ZW0+IHtcbiAgICBpZiAocGtQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgdGhpcy5zLmluZiQudGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgc3RhdGVtZW50LnBrX2VudGl0eSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXAoKFtpbmZUaW1lUHJpbWl0aXZlLCBwcm9qUmVsXSkgPT4ge1xuICAgICAgICAgIGlmICghaW5mVGltZVByaW1pdGl2ZSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgY2FsZW5kYXI6ICgocHJvalJlbC5jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnN0IG5vZGU6IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9KSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW5mUmVwby50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLnBpcGUoXG4gICAgICAgIG1hcChpbmZUaW1lUHJpbWl0aXZlID0+IHtcbiAgICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICBjYWxlbmRhcjogKChzdGF0ZW1lbnQuY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc3Qgbm9kZTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICB9XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICogUGlwZSBhbHRlcm5hdGl2ZXMgKG5vdCBpbiBwcm9qZWN0KVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RMZW5ndGgobDogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHN3aXRjaCAobC5saXN0VHlwZSkge1xuICAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAgICAgY2FzZSAnZW50aXR5LXByZXZpZXcnOlxuICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgY2FzZSAncGxhY2UnOlxuICAgICAgY2FzZSAnbGFuZ1N0cmluZyc6XG4gICAgICBjYXNlICd0ZW1wb3JhbC1lbnRpdHknOlxuICAgICAgY2FzZSAndGltZS1zcGFuJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RTdGF0ZW1lbnRzKGwsIHBrRW50aXR5KS5waXBlKG1hcChpdGVtcyA9PiBpdGVtcy5sZW5ndGgpKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdChsOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEl0ZW1MaXN0PiB7XG4gICAgaWYgKGwubGlzdFR5cGUuYXBwZWxsYXRpb24pIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0QXBwZWxsYXRpb24obCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5lbnRpdHlQcmV2aWV3KSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5ndWFnZSkgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RMYW5ndWFnZShsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnBsYWNlKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdFBsYWNlKGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdERpbWVuc2lvbihsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmdTdHJpbmcpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0TGFuZ1N0cmluZyhsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnRlbXBvcmFsRW50aXR5KSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUluZ29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICogUGlwZSB0aGUgaXRlbXMgaW4gZW50aXR5IHByZXZpZXcgZmllbGRcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdEVudGl0eVByZXZpZXc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpIDpcbiAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpKSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlc1xuICAgICAgICAgICAgICAuZmlsdGVyKG5vZGUgPT4gISFub2RlKVxuICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5vcmROdW0gPiBiLm9yZE51bSA/IDEgOiAtMSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgfSkpXG5cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBwbGFjZSBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1QbGFjZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGRpbWVuc2lvbiBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0RGltZW5zaW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGxhbmdTdHJpbmcgbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdExhbmdTdHJpbmc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gYXBwZWxsYXRpb24gZmllbGRcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RBcHBlbGxhdGlvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGxhbmd1YWdlIGZpZWxkXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogUGlwZSByZXBvIHZpZXdzIChjb21tdW5pdHkgZmF2b3JpdGVzLCB3aGVyZSByZXN0cmljdGVkIGJ5IHF1YW50aWZpZXJzKVxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8qKlxuICAgKiBQaXBlIHJlcG9zaXRvcnkgdGVtcG9yYWwgZW50aXR5IGl0ZW0gaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIFBpcGUgYXBwZWxsYXRpb24gbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgbGFuZ3VhZ2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3RMYW5ndWFnZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgcGxhY2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1QbGFjZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgcGxhY2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3REaW1lbnNpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG4gIC8qKlxuICAqIFBpcGUgdGhlIGl0ZW1zIGluIGVudGl0eSBwcmV2aWV3IGZpZWxkLCBjb25uZWN0ZWQgYnkgY29tbXVuaXR5IGZhdm9yaXRlIHN0YXRlbWVudHNcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gICAgICB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gICAgICB0aGlzLmIucGlwZVJlcG9JbmdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSkpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICAgIC8vIC5zb3J0KChhLCBiKSA9PiBhLm9yZE51bSA+IGIub3JkTnVtID8gMSA6IC0xKVxuICAgICAgICAgICAgKSlcbiAgICAgIH0pLFxuICAgICAgc3RhcnRXaXRoKFtdKVxuICAgIClcblxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSByZXBvIHRpbWUgc3BhbiBpdGVtXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvSXRlbVRpbWVTcGFuKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxUaW1lU3Bhbkl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5wLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jLnBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKFxuICAgICAgICAgIERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU5cbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChmaWVsZERlZmluaXRpb25zID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoZmllbGREZWZpbml0aW9ucy5tYXAoZmllbGREZWYgPT5cbiAgICAgICAgICAgICAgdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShmaWVsZERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcE9yKFtdLCBzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PlxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mUmVwby50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKChpbmZUaW1lUHJpbWl0aXZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXI6ICgoc3RhdGVtZW50LmNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzOiBUaW1lU3BhblByb3BlcnR5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uOiBmaWVsZERlZi5saXN0RGVmaW5pdGlvbnNbMF0sIGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBzdGFydFdpdGgoeyBsaXN0RGVmaW5pdGlvbjogZmllbGREZWYubGlzdERlZmluaXRpb25zWzBdLCBpdGVtczogW10gfSBhcyBUaW1lU3BhblByb3BlcnR5KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgocHJvcGVydGllcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuaXRlbTogVGltZVNwYW5JdGVtID0ge1xuICAgICAgICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllcy5maWx0ZXIocHJvcHMgPT4gcHJvcHMuaXRlbXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVzcGFuaXRlbVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG5cbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgbGFiZWwgb2YgZ2l2ZW4gZW50aXR5XG4gICAqIFRoaXMgd2lsbCB1c2UgZW50aXR5IHByZXZpZXdzIGZvciBnZXR0aW5nIHN0cmluZ3Mgb2YgcmVsYXRlZCB0ZW1wb3JhbCBlbnRpdGllc1xuICAgKiBTbyB0aGlzIG1heSB0YWtlIGEgbGl0dGxlIHdoaWxlXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMYWJlbE9mRW50aXR5KGZrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmIucGlwZUNsYXNzT2ZFbnRpdHkoZmtFbnRpdHkpLnBpcGUoXG5cbiAgICAgIC8vIGdldCB0aGUgZGVmaW5pdGlvbiBvZiB0aGUgZmlyc3QgZmllbGRcbiAgICAgIHN3aXRjaE1hcChma0NsYXNzID0+IHRoaXMuYy5waXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhma0NsYXNzKS5waXBlKFxuICAgICAgICAvLyBnZXQgdGhlIGZpcnN0IGl0ZW0gb2YgdGhhdCBmaWVsZFxuICAgICAgICBzd2l0Y2hNYXAoZmllbGREZWYgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgICAgZmllbGREZWYgJiYgZmllbGREZWYubGVuZ3RoID9cbiAgICAgICAgICAgIGZpZWxkRGVmWzBdLmxpc3REZWZpbml0aW9ucy5tYXAobGlzdERlZiA9PiB0aGlzLnBpcGVFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGZrRW50aXR5LCAxKSkgOlxuICAgICAgICAgICAgW11cbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcChwcm9wcyA9PiB7XG4gICAgICAgICAgICBwcm9wcyA9IHByb3BzLmZpbHRlcihwcm9wID0+IHByb3AuaXRlbXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIGlmIChwcm9wcy5sZW5ndGggJiYgcHJvcHNbMF0uaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9wc1swXS5pdGVtc1swXS5sYWJlbFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICcnXG4gICAgICAgICAgfSlcbiAgICAgICAgKSkpXG4gICAgICApKVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIGNsYXNzIGxhYmVsIG9mIGdpdmVuIGVudGl0eVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQ2xhc3NMYWJlbE9mRW50aXR5KGZrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmIucGlwZUNsYXNzT2ZFbnRpdHkoZmtFbnRpdHkpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtDbGFzcyA9PiB0aGlzLmMucGlwZUNsYXNzTGFiZWwocGtDbGFzcykpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBwa19lbnRpdHkgb2YgdGhlIHR5cGUgb2YgYW4gZW50aXR5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVUeXBlT2ZFbnRpdHkocGtFbnRpdHk6IG51bWJlciwgaGFzVHlwZVByb3BlcnR5OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudD4ge1xuICAgIGlmIChpc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7IGZrX3Byb3BlcnR5OiBoYXNUeXBlUHJvcGVydHksIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHkgfSkucGlwZShtYXAoaXRlbXMgPT4ge1xuICAgICAgICBpZiAoIWl0ZW1zIHx8IE9iamVjdC5rZXlzKGl0ZW1zKS5sZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBlbHNlIHJldHVybiB2YWx1ZXMoaXRlbXMpWzBdXG4gICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoeyBma19wcm9wZXJ0eTogaGFzVHlwZVByb3BlcnR5LCBma19vYmplY3RfaW5mbzogcGtFbnRpdHkgfSkucGlwZShcbiAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICBpZiAoIWl0ZW1zIHx8IE9iamVjdC5rZXlzKGl0ZW1zKS5sZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlcyhpdGVtcylbMF1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlQ2xhc3Nlc0FuZFR5cGVzKGVuYWJsZWRJbjogJ2VudGl0aWVzJyB8ICdzb3VyY2VzJykge1xuICAgIHJldHVybiB0aGlzLmMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXMoZW5hYmxlZEluKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGl0ZW1zID0+IHRoaXMucGlwZUNsYXNzQW5kVHlwZU5vZGVzKGl0ZW1zKSksXG4gICAgKVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzZXNBbmRUeXBlc09mQ2xhc3NlcyhjbGFzc2VzOiBudW1iZXJbXSkge1xuICAgIHJldHVybiB0aGlzLmMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXNPZlR5cGVkQ2xhc3NlcyhjbGFzc2VzKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGl0ZW1zID0+IHRoaXMucGlwZUNsYXNzQW5kVHlwZU5vZGVzKGl0ZW1zKSksXG4gICAgKVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzQW5kVHlwZU5vZGVzKHR5cGVBbmRUeXBlZENsYXNzZXM6IHsgdHlwZWRDbGFzczogbnVtYmVyOyB0eXBlQ2xhc3M6IG51bWJlcjsgfVtdKTogT2JzZXJ2YWJsZTxDbGFzc0FuZFR5cGVOb2RlW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICB0eXBlQW5kVHlwZWRDbGFzc2VzLm1hcChpdGVtID0+IHRoaXMuYy5waXBlQ2xhc3NMYWJlbChpdGVtLnR5cGVkQ2xhc3MpLnBpcGUoXG4gICAgICAgIG1hcChsYWJlbCA9PiAoe1xuICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgIGRhdGE6IHsgcGtDbGFzczogaXRlbS50eXBlZENsYXNzLCBwa1R5cGU6IG51bGwgfVxuICAgICAgICB9IGFzIENsYXNzQW5kVHlwZU5vZGUpKSxcbiAgICAgICAgc3dpdGNoTWFwKG5vZGUgPT4gaWlmKFxuICAgICAgICAgICgpID0+ICEhaXRlbS50eXBlQ2xhc3MsXG4gICAgICAgICAgdGhpcy5iLnBpcGVQZXJzaXN0ZW50SXRlbVBrc0J5Q2xhc3MoaXRlbS50eXBlQ2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAodHlwZVBrcyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgICAgICAgdHlwZVBrcy5tYXAocGtUeXBlID0+IHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KHBrVHlwZSkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAocHJldmlldyA9PiAoe1xuICAgICAgICAgICAgICAgICAgbGFiZWw6IHByZXZpZXcuZW50aXR5X2xhYmVsLFxuICAgICAgICAgICAgICAgICAgZGF0YTogeyBwa0NsYXNzOiBpdGVtLnR5cGVkQ2xhc3MsIHBrVHlwZSB9XG4gICAgICAgICAgICAgICAgfSBhcyBDbGFzc0FuZFR5cGVOb2RlKSlcbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgc29ydEFiYyhuID0+IG4ubGFiZWwpLFxuICAgICAgICAgICAgKSksXG4gICAgICAgICAgICBtYXAoY2hpbGRyZW4gPT4ge1xuICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuID0gY2hpbGRyZW5cbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSxcbiAgICAgICAgICBvZih7IC4uLm5vZGUsIGNoaWxkcmVuOiBbXSB9IGFzIENsYXNzQW5kVHlwZU5vZGUpXG4gICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKSlcbiAgICApLnBpcGUoXG4gICAgICBzb3J0QWJjKChub2RlKSA9PiBub2RlLmxhYmVsKSxcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhcnJheSBvZiBwa19jbGFzcyBvZiBhbGwgY2xhc3NlcyBhbmQgdHlwZWQgY2xhc3Nlcy5cbiAgICogQHBhcmFtIGNsYXNzZXNBbmRUeXBlcyBhIG9iamVjdCBjb250YWluaW5nIHtjbGFzc2VzOiBbXSwgdHlwZXNbXX1cbiAgICovXG4gIHBpcGVDbGFzc2VzRnJvbUNsYXNzZXNBbmRUeXBlcyhjbGFzc2VzQW5kVHlwZXM6IENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIGNvbnN0IHR5cGVkQ2xhc3NlcyQgPSAoIWNsYXNzZXNBbmRUeXBlcyB8fCAhY2xhc3Nlc0FuZFR5cGVzLnR5cGVzIHx8ICFjbGFzc2VzQW5kVHlwZXMudHlwZXMubGVuZ3RoKSA/XG4gICAgICBvZihbXSBhcyBudW1iZXJbXSkgOlxuICAgICAgdGhpcy5iLnBpcGVDbGFzc2VzT2ZQZXJzaXN0ZW50SXRlbXMoY2xhc3Nlc0FuZFR5cGVzLnR5cGVzKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKHBrcykgPT4gISFwa3MpLFxuICAgICAgICAgIHN3aXRjaE1hcCh0eXBlQ2xhc3NlcyA9PiB0aGlzLmMucGlwZVR5cGVkQ2xhc3Nlc09mVHlwZUNsYXNzZXModHlwZUNsYXNzZXMpKVxuICAgICAgICApXG4gICAgcmV0dXJuIHR5cGVkQ2xhc3NlcyQucGlwZShcbiAgICAgIG1hcCh0eXBlZENsYXNzZXMgPT4gdW5pcShbLi4udHlwZWRDbGFzc2VzLCAuLi4oKGNsYXNzZXNBbmRUeXBlcyB8fCB7IGNsYXNzZXM6IFtdIH0pLmNsYXNzZXMgfHwgW10pXSkpXG4gICAgKTtcbiAgfVxuXG4gIHBpcGVQcm9wZXJ0eU9wdGlvbnNGcm9tQ2xhc3Nlc0FuZFR5cGVzKGNsYXNzZXNBbmRUeXBlczogQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwpOiBPYnNlcnZhYmxlPFByb3BlcnR5T3B0aW9uW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlQ2xhc3Nlc0Zyb21DbGFzc2VzQW5kVHlwZXMoY2xhc3Nlc0FuZFR5cGVzKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGNsYXNzZXMgPT4gdGhpcy5waXBlUHJvcGVydHlPcHRpb25zRm9ybUNsYXNzZXMoY2xhc3NlcykpXG4gICAgKVxuICB9XG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVQcm9wZXJ0eU9wdGlvbnNGb3JtQ2xhc3NlcyhjbGFzc2VzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8UHJvcGVydHlPcHRpb25bXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShjbGFzc2VzLm1hcChwa0NsYXNzID0+IHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLnBpcGUoXG4gICAgICBtYXAoYyA9PiBjLmJhc2ljX3R5cGUgPT09IDkpLFxuICAgICAgc3dpdGNoTWFwKGlzVGVFbiA9PiB0aGlzLmMucGlwZVNwZWNpZmljQW5kQmFzaWNGaWVsZHMocGtDbGFzcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGNsYXNzRmllbGRzID0+IGNsYXNzRmllbGRzXG4gICAgICAgICAgICAuZmlsdGVyKGYgPT4gISFmLnByb3BlcnR5LnBrUHJvcGVydHkpXG4gICAgICAgICAgICAubWFwKGYgPT4gKHtcbiAgICAgICAgICAgICAgaXNPdXRnb2luZzogZi5pc091dGdvaW5nLFxuICAgICAgICAgICAgICBma1Byb3BlcnR5RG9tYWluOiBmLmlzT3V0Z29pbmcgPyBmLnNvdXJjZUNsYXNzIDogbnVsbCxcbiAgICAgICAgICAgICAgZmtQcm9wZXJ0eVJhbmdlOiBmLmlzT3V0Z29pbmcgPyBudWxsIDogZi5zb3VyY2VDbGFzcyxcbiAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogZi5wcm9wZXJ0eS5wa1Byb3BlcnR5XG4gICAgICAgICAgICB9KSkpLFxuICAgICAgICAgIHN3aXRjaE1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICBpZiAoaXNUZUVuKSB7XG4gICAgICAgICAgICAgIC8vIGFkZCB0aW1lIHByb3BlcnRpZXMgKGF0IHNvbWUgdGltZSB3aXRoaW4sIC4uLilcbiAgICAgICAgICAgICAgRGZoQ29uZmlnLlBST1BFUlRZX1BLU19XSEVSRV9USU1FX1BSSU1JVElWRV9JU19SQU5HRS5tYXAocGtQcm9wZXJ0eSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgZmtQcm9wZXJ0eURvbWFpbjogcGtDbGFzcyxcbiAgICAgICAgICAgICAgICAgIGZrUHJvcGVydHlSYW5nZTogRGZoQ29uZmlnLkNMQVNTX1BLX1RJTUVfUFJJTUlUSVZFLFxuICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShpdGVtcy5tYXAoaXRlbSA9PiB0aGlzLmMucGlwZUZpZWxkTGFiZWwoXG4gICAgICAgICAgICAgIGl0ZW0ucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgaXRlbS5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICAgICAgICBpdGVtLmZrUHJvcGVydHlSYW5nZSxcbiAgICAgICAgICAgICkucGlwZShtYXAobGFiZWwgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc091dGdvaW5nID0gaXRlbS5pc091dGdvaW5nO1xuICAgICAgICAgICAgICBjb25zdCBvOiBQcm9wZXJ0eU9wdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICAgIHBrOiBpdGVtLnBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgcHJvcGVydHlGaWVsZEtleTogcHJvcGVydHlPcHRpb25GaWVsZEtleShpdGVtLnBrUHJvcGVydHksIGlzT3V0Z29pbmcpXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgfSkpKSk7XG4gICAgICAgICAgfSkpKVxuICAgIClcblxuXG4gICAgKSkucGlwZShtYXAoeSA9PiBmbGF0dGVuPFByb3BlcnR5T3B0aW9uPih5KSkpO1xuICB9XG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVQa0NsYXNzZXNGcm9tUHJvcGVydHlTZWxlY3RNb2RlbChtb2RlbDogUHJvcGVydHlTZWxlY3RNb2RlbCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICBbXG4gICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5vdXRnb2luZ1Byb3BlcnRpZXMsIHRydWUpLFxuICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwuaW5nb2luZ1Byb3BlcnRpZXMsIGZhbHNlKSxcbiAgICAgIF1cbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFtvdXQsIGluZ10pID0+IHVuaXEoWy4uLm91dCwgLi4uaW5nXSkpXG4gICAgKVxuICB9XG5cbiAgZ2V0UGtDbGFzc2VzRnJvbVByb3BlcnR5U2VsZWN0TW9kZWwkKG1vZGVsJDogT2JzZXJ2YWJsZTxQcm9wZXJ0eVNlbGVjdE1vZGVsPik6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gbW9kZWwkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAobW9kZWwgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIFtcbiAgICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwub3V0Z29pbmdQcm9wZXJ0aWVzLCB0cnVlKSxcbiAgICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwuaW5nb2luZ1Byb3BlcnRpZXMsIGZhbHNlKSxcbiAgICAgICAgXVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXAoKFtvdXQsIGluZ10pID0+IHVuaXEoWy4uLm91dCwgLi4uaW5nXSkpXG4gICAgICApKVxuICAgIClcbiAgfVxuXG5cblxuICBnZXRQcm9wZXJ0eU9wdGlvbnMkKGNsYXNzVHlwZXMkOiBPYnNlcnZhYmxlPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsPik6IE9ic2VydmFibGU8UHJvcGVydHlPcHRpb25bXT4ge1xuICAgIHJldHVybiBjbGFzc1R5cGVzJC5waXBlPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsLCBQcm9wZXJ0eU9wdGlvbltdPihcbiAgICAgIC8vIG1ha2Ugc3VyZSBvbmx5IGl0IHBhc3NlcyBvbmx5IGlmIGRhdGEgb2YgdGhlIGFycmF5Q2xhc3NlcyBhcmUgY2hhbmdlZCAobm90IGNoaWxkcmVuKVxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQ8Q2xhc3NBbmRUeXBlU2VsZWN0TW9kZWw+KChhLCBiKSA9PiB7XG4gICAgICAgIHJldHVybiBlcXVhbHMoYSwgYik7XG4gICAgICB9KSxcbiAgICAgIHN3aXRjaE1hcCgoeCkgPT4gIXggPyBlbXB0eSgpIDogdGhpcy5iLnBpcGVDbGFzc2VzT2ZQZXJzaXN0ZW50SXRlbXMoeC50eXBlcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChwa3MpID0+ICEhcGtzKSxcbiAgICAgICAgICBzd2l0Y2hNYXAodHlwZUNsYXNzZXMgPT4gdGhpcy5jLnBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHR5cGVDbGFzc2VzKS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKHR5cGVkQ2xhc3NlcyA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSB1bmlxKFsuLi50eXBlZENsYXNzZXMsIC4uLih4LmNsYXNzZXMgfHwgW10pXSk7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVQcm9wZXJ0eU9wdGlvbnNGb3JtQ2xhc3NlcyhjbGFzc2VzKVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eU9wdGlvbkZpZWxkS2V5KGZrUHJvcGVydHk6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IHN0cmluZyB7XG4gIHJldHVybiAnXycgKyBma1Byb3BlcnR5ICsgJ18nICsgKGlzT3V0Z29pbmcgPyAnb3V0Z29pbmcnIDogJ2luZ29pbmcnKTtcbn1cblxuIl19