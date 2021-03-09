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
import { infTimePrimToTimePrimWithCal, timeSpanItemToTimeSpan } from '../functions/functions';
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
        else {
            return new BehaviorSubject({
                projRel: undefined,
                ordNum: 0
            });
        }
    }
    /**
     * pipe the target of given statment
     * @param {?} stmt InfStatement to be completed with target
     * @param {?} page page for which we are piping this stuff
     * @param {?} subfieldType type of subfield for which we pipe this stuff
     * @return {?}
     */
    pipeTargetOfStatement(stmt, page, subfieldType) {
        /** @type {?} */
        const isOutgoing = page.isOutgoing;
        /** @type {?} */
        const targetInfo = isOutgoing ? stmt.fk_object_info : stmt.fk_subject_info;
        // here you could add targetData or targetCell
        if (subfieldType.appellation) {
            return this.s.inf$.appellation$.by_pk_entity$.key(targetInfo).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x)), map((/**
             * @param {?} appellation
             * @return {?}
             */
            appellation => {
                /** @type {?} */
                const stmtTarget = {
                    statement: stmt,
                    isOutgoing,
                    targetLabel: appellation.string,
                    targetClass: page.targetClass,
                    target: {
                        appellation
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.place) {
            return this.s.inf$.place$.by_pk_entity$.key(targetInfo).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x)), map((/**
             * @param {?} place
             * @return {?}
             */
            place => {
                /** @type {?} */
                const stmtTarget = {
                    statement: stmt,
                    isOutgoing,
                    targetLabel: `WGS84: ${place.lat}°, ${place.long}°`,
                    targetClass: page.targetClass,
                    target: {
                        place
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.dimension) {
            return this.s.inf$.dimension$.by_pk_entity$.key(targetInfo).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x)), switchMap((/**
             * @param {?} dimension
             * @return {?}
             */
            dimension => {
                return this.p.streamEntityPreview(dimension.fk_measurement_unit)
                    .pipe(map((/**
                 * @param {?} unitPreview
                 * @return {?}
                 */
                unitPreview => {
                    /** @type {?} */
                    const stmtTarget = {
                        statement: stmt,
                        isOutgoing,
                        targetLabel: `${dimension.numeric_value} ${unitPreview.entity_label}`,
                        targetClass: page.targetClass,
                        target: {
                            dimension
                        }
                    };
                    return stmtTarget;
                })));
            })));
        }
        else if (subfieldType.langString) {
            return this.s.inf$.lang_string$.by_pk_entity$.key(targetInfo).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x)), switchMap((/**
             * @param {?} langString
             * @return {?}
             */
            langString => {
                return this.s.inf$.language$.by_pk_entity$.key(langString.fk_language)
                    .pipe(map((/**
                 * @param {?} language
                 * @return {?}
                 */
                language => {
                    /** @type {?} */
                    const stmtTarget = {
                        statement: stmt,
                        isOutgoing,
                        targetLabel: `${langString.string} (${language.iso6391})`,
                        targetClass: page.targetClass,
                        target: {
                            langString
                        }
                    };
                    return stmtTarget;
                })));
            })));
        }
        else if (subfieldType.language) {
            return this.s.inf$.language$.by_pk_entity$.key(targetInfo).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x)), map((/**
             * @param {?} language
             * @return {?}
             */
            language => {
                /** @type {?} */
                const stmtTarget = {
                    statement: stmt,
                    isOutgoing,
                    targetLabel: `${language.notes || language.iso6391}`,
                    targetClass: page.targetClass,
                    target: {
                        language
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.entityPreview || subfieldType.typeItem) {
            return this.p.streamEntityPreview(targetInfo).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x)), map((/**
             * @param {?} entityPreview
             * @return {?}
             */
            entityPreview => {
                /** @type {?} */
                const stmtTarget = {
                    statement: stmt,
                    isOutgoing,
                    targetLabel: `${entityPreview.entity_label}`,
                    targetClass: page.targetClass,
                    target: {
                        entityPreview
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.temporalEntity) {
            // console.log('subfieldType.temporalEntity.length', subfieldType.temporalEntity.length)
            // for each of these subfields
            /** @type {?} */
            const subentityPages$ = subfieldType.temporalEntity.map((/**
             * @param {?} subfieldReq
             * @return {?}
             */
            subfieldReq => {
                // console.log('subentity subfield for targetInfo', targetInfo)
                // console.log('subentity subfield for targetInfo', targetInfo)
                // create page:GvSubfieldPage
                const _a = subfieldReq.page, { isCircular } = _a, p = tslib_1.__rest(_a, ["isCircular"]);
                /** @type {?} */
                const scope = page.scope.notInProject ? { inRepo: true } : page.scope;
                /** @type {?} */
                const nestedPage = Object.assign({}, p, { fkSourceEntity: targetInfo, scope });
                return this.pipeSubfieldPage(nestedPage, subfieldReq.subfieldType).pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                ({ count, statements }) => {
                    const { limit, offset } = nestedPage, s = tslib_1.__rest(nestedPage, ["limit", "offset"]);
                    /** @type {?} */
                    const subentitySubfieldPage = {
                        subfield: s,
                        count,
                        statements
                    };
                    return subentitySubfieldPage;
                })));
            }));
            return combineLatestOrEmpty(subentityPages$)
                .pipe(
            // filter(subfields => {
            //   console.log('subfields\n', subfields.map((item, i) => {
            //     const req = subfieldType.temporalEntity[i]
            //     const fieldInfo = targetInfo + '_' + req.page.fkProperty + '_' + req.page.targetClass + '_' + keys(req.subfieldType)[0]
            //     return `${i}: ${item === undefined ?
            //       `undefined ${fieldInfo}` :
            //       `ok        ${fieldInfo}`
            //       }`
            //   }).join('\n'))
            //   return !subfields.includes(undefined)
            // }),
            map((/**
             * @param {?} subfields
             * @return {?}
             */
            subfields => {
                /** @type {?} */
                const stmtTarget = {
                    statement: stmt,
                    isOutgoing,
                    targetLabel: '',
                    targetClass: page.targetClass,
                    target: {
                        entity: {
                            pkEntity: targetInfo,
                            subfields
                        }
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.timeSpan) {
            // console.log('subfieldType.temporalEntity.length', subfieldType.temporalEntity.length)
            // for each of these subfields
            /** @type {?} */
            const subentityPages$ = DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE
                .map((/**
             * @param {?} fkProperty
             * @return {?}
             */
            fkProperty => {
                // console.log('subentity subfield for targetInfo', targetInfo)
                // console.log('subentity subfield for targetInfo', targetInfo)
                // create page:GvSubfieldPage
                /** @type {?} */
                const scope = page.scope.notInProject ? { inRepo: true } : page.scope;
                /** @type {?} */
                const nestedPage = {
                    fkProperty,
                    isOutgoing: true,
                    limit: 1,
                    offset: 0,
                    targetClass: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
                    fkSourceEntity: targetInfo,
                    scope,
                };
                /** @type {?} */
                const subfType = {
                    timePrimitive: 'true'
                };
                return this.pipeSubfieldPage(nestedPage, subfType).pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                ({ count, statements }) => {
                    const { limit, offset } = nestedPage, s = tslib_1.__rest(nestedPage, ["limit", "offset"]);
                    /** @type {?} */
                    const subentitySubfieldPage = {
                        subfield: s,
                        count,
                        statements
                    };
                    return subentitySubfieldPage;
                })));
            }));
            return combineLatestOrEmpty(subentityPages$)
                .pipe(map((/**
             * @param {?} subfields
             * @return {?}
             */
            subfields => {
                /** @type {?} */
                const timeSpanPreview = {};
                subfields.forEach((/**
                 * @param {?} s
                 * @return {?}
                 */
                s => {
                    if (s.statements[0]) {
                        /** @type {?} */
                        const st = s.statements[0];
                        /** @type {?} */
                        const key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[st.statement.fk_property];
                        timeSpanPreview[key] = st.target.timePrimitive;
                    }
                }));
                /** @type {?} */
                const stmtTarget = {
                    statement: stmt,
                    isOutgoing,
                    targetLabel: this.timeSpanPipe.transform(new TimeSpanUtil(timeSpanPreview)),
                    targetClass: page.targetClass,
                    target: {
                        timeSpan: {
                            preview: timeSpanPreview,
                            subfields
                        }
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.timePrimitive) {
            return this.s.inf$.time_primitive$.by_pk_entity$.key(targetInfo).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x)), switchMap((/**
             * @param {?} timePrimitive
             * @return {?}
             */
            timePrimitive => {
                // get calendar
                /** @type {?} */
                let cal$;
                if (page.scope.inProject) {
                    cal$ = this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(page.scope.inProject + '_' + stmt.pk_entity)
                        .pipe(map((/**
                     * @param {?} infoProjRel
                     * @return {?}
                     */
                    infoProjRel => (/** @type {?} */ (infoProjRel.calendar)))));
                }
                else {
                    cal$ = new BehaviorSubject((/** @type {?} */ (stmt.community_favorite_calendar)));
                }
                // pipe target time primitive of stmt
                return cal$.pipe(map((/**
                 * @param {?} cal
                 * @return {?}
                 */
                cal => {
                    /** @type {?} */
                    const timePrimWithCal = infTimePrimToTimePrimWithCal(timePrimitive, cal);
                    /** @type {?} */
                    const stmtTarget = {
                        statement: stmt,
                        isOutgoing,
                        targetLabel: this.timePrimitivePipe.transform(timePrimWithCal),
                        targetClass: page.targetClass,
                        target: {
                            timePrimitive: timePrimWithCal
                        }
                    };
                    return stmtTarget;
                })));
            })));
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
        if (subfieldType.timeSpan) {
            // if timeSpan make a short cut: produce a virtual statementWithTarget from entity to timeSpan
            return this.pipeTimeSpan(page, subfieldType);
        }
        else {
            // get the statments of that page
            return combineLatest(this.s.inf$.statement$.pagination$.pipeCount(page), this.s.inf$.statement$.pagination$.pipePage(page)
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
                .pipe(filter((/**
             * @param {?} stmt
             * @return {?}
             */
            stmt => !!stmt)), switchMap((/**
             * @param {?} stmt
             * @return {?}
             */
            stmt => this.pipeStatementWithTarget(stmt, page, subfieldType))))))))))).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            ([count, statements]) => ({ count, statements }))));
        }
    }
    /**
     * @private
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    pipeTimeSpan(page, subfieldType) {
        /** @type {?} */
        const virtualStatementToTimeSpan = { fk_object_info: page.fkSourceEntity };
        return this.pipeTargetOfStatement(virtualStatementToTimeSpan, page, subfieldType).pipe(map((/**
         * @param {?} stmtTarget
         * @return {?}
         */
        stmtTarget => {
            /** @type {?} */
            const stmtWT = Object.assign({}, stmtTarget, { projRel: undefined, ordNum: undefined });
            return { count: 1, statements: [stmtWT] };
        })));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbmZvcm1hdGlvbi1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlqRCxPQUFPLEVBQWdCLG9CQUFvQixFQUFlLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkwsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBeUI5RixPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLDBC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QyxNQUFNO0lBQ04sS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7NENBQytELFVBQVU7b0VBZ0NuRztBQTBCRDtJQURDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7OzRDQUN3QixVQUFVOzZFQTZDNUQ7QUFHRDtJQURDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7OzRDQUN1QyxVQUFVO21GQVMzRTs7O0lBdm5ERCwwQ0FBcUI7Ozs7O0lBR25CLG9DQUF1Qzs7Ozs7SUFDdkMsb0NBQW9DOzs7OztJQUNwQyxvQ0FBaUM7Ozs7O0lBQ2pDLG9DQUFvQzs7SUFDcEMsb0RBQTJDOzs7OztJQUMzQywrQ0FBa0M7Ozs7Ozs7QUFzcER0QyxNQUFNLFVBQVUsc0JBQXNCLENBQUMsVUFBa0IsRUFBRSxVQUFtQjtJQUM1RSxPQUFPLEdBQUcsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZmhDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IEluZlN0YXRlbWVudCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBHdlN1YmZpZWxkUGFnZSwgR3ZTdWJmaWVsZFR5cGUsIFRpbWVQcmltaXRpdmVXaXRoQ2FsLCBXYXJFbnRpdHlQcmV2aWV3VGltZVNwYW4gfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJUeXBlLCBjb21iaW5lTGF0ZXN0T3JFbXB0eSwgR3JhbnVsYXJpdHksIGxpbWl0VG8sIHNvcnRBYmMsIHN3aXRjaE1hcE9yLCBUaW1lUHJpbWl0aXZlLCBUaW1lUHJpbWl0aXZlUGlwZSwgVGltZVNwYW5QaXBlLCBUaW1lU3BhblV0aWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IGVxdWFscywgZmxhdHRlbiwgZ3JvdXBCeSwgcGljaywgdW5pcSwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBlbXB0eSwgaWlmLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFnIH0gZnJvbSAncnhqcy1zcHkvb3BlcmF0b3JzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhY2hlLCBzcHlUYWcgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IGluZlRpbWVQcmltVG9UaW1lUHJpbVdpdGhDYWwsIHRpbWVTcGFuSXRlbVRvVGltZVNwYW4gfSBmcm9tICcuLi9mdW5jdGlvbnMvZnVuY3Rpb25zJztcbmltcG9ydCB7IEFwcGVsbGF0aW9uSXRlbSB9IGZyb20gJy4uL21vZGVscy9BcHBlbGxhdGlvbkl0ZW0nO1xuaW1wb3J0IHsgQmFzaWNTdGF0ZW1lbnRJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0Jhc2ljU3RhdGVtZW50SXRlbSc7XG5pbXBvcnQgeyBDbGFzc0FuZFR5cGVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL0NsYXNzQW5kVHlwZU5vZGUnO1xuaW1wb3J0IHsgQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwnO1xuaW1wb3J0IHsgQ3RybFRpbWVTcGFuRGlhbG9nUmVzdWx0IH0gZnJvbSAnLi4vbW9kZWxzL0N0cmxUaW1lU3BhbkRpYWxvZ1Jlc3VsdCc7XG5pbXBvcnQgeyBEaW1lbnNpb25JdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0RpbWVuc2lvbkl0ZW0nO1xuaW1wb3J0IHsgRW50aXR5UHJldmlld0l0ZW0gfSBmcm9tICcuLi9tb2RlbHMvRW50aXR5UHJldmlld0l0ZW0nO1xuaW1wb3J0IHsgRW50aXR5UHJvcGVydGllcyB9IGZyb20gJy4uL21vZGVscy9FbnRpdHlQcm9wZXJ0aWVzJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL0ZpZWxkJztcbmltcG9ydCB7IEl0ZW1MaXN0IH0gZnJvbSAnLi4vbW9kZWxzL0l0ZW1MaXN0JztcbmltcG9ydCB7IExhbmdTdHJpbmdJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0xhbmdTdHJpbmdJdGVtJztcbmltcG9ydCB7IExhbmd1YWdlSXRlbSB9IGZyb20gJy4uL21vZGVscy9MYW5ndWFnZUl0ZW0nO1xuaW1wb3J0IHsgUGxhY2VJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1BsYWNlSXRlbSc7XG5pbXBvcnQgeyBQcm9wZXJ0eU9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9Qcm9wZXJ0eU9wdGlvbic7XG5pbXBvcnQgeyBQcm9wZXJ0eVNlbGVjdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL1Byb3BlcnR5U2VsZWN0TW9kZWwnO1xuaW1wb3J0IHsgU3RhdGVtZW50SXRlbSB9IGZyb20gJy4uL21vZGVscy9TdGF0ZW1lbnRJdGVtJztcbmltcG9ydCB7IFN0YXRlbWVudFByb2pSZWwsIFN0YXRlbWVudFRhcmdldCwgU3RhdGVtZW50V2l0aFRhcmdldCwgU3ViZW50aXR5U3ViZmllbGRQYWdlLCBTdWJmaWVsZFBhZ2UgfSBmcm9tICcuLi9tb2RlbHMvU3RhdGVtZW50V2l0aFRhcmdldCc7XG5pbXBvcnQgeyBTdWJmaWVsZCB9IGZyb20gJy4uL21vZGVscy9TdWJmaWVsZCc7XG5pbXBvcnQgeyBUZW1wb3JhbEVudGl0eUNlbGwgfSBmcm9tICcuLi9tb2RlbHMvVGVtcG9yYWxFbnRpdHlDZWxsJztcbmltcG9ydCB7IFRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcyB9IGZyb20gJy4uL21vZGVscy9UZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMnO1xuaW1wb3J0IHsgVGVtcG9yYWxFbnRpdHlSb3cgfSBmcm9tICcuLi9tb2RlbHMvVGVtcG9yYWxFbnRpdHlSb3cnO1xuaW1wb3J0IHsgVGltZVByaW1pdGl2ZUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvVGltZVByaW1pdGl2ZUl0ZW0nO1xuaW1wb3J0IHsgVGltZVNwYW5JdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1RpbWVTcGFuSXRlbSc7XG5pbXBvcnQgeyBUaW1lU3BhblByb3BlcnR5IH0gZnJvbSAnLi4vbW9kZWxzL1RpbWVTcGFuUHJvcGVydHknO1xuaW1wb3J0IHsgSW5mTW9kZWxOYW1lLCBJbmZTZWxlY3RvciB9IGZyb20gJy4uL3NlbGVjdG9ycy9pbmYuc2VydmljZSc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25QaXBlc1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24tcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbkJhc2ljUGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9pbmZvcm1hdGlvbi1iYXNpYy1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5cblxuXG5cblxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuLyoqXG4gKiBUaGlzIFNlcnZpY2UgcHJvdmlkZXMgYSBjb2xsZWNpb24gb2YgcGlwZXMgdGhhdCBhZ2dyZWdhdGUgb3IgdHJhbnNmb3JtIGluZm9ybWF0aW9uLlxuICogRm9yIEV4YW1wbGVcbiAqIC0gdGhlIGxpc3RzIG9mIHRleHQgcHJvcGVydGllcywgYXBwZWxsYWl0b25zLCBwbGFjZXMsIHRpbWUtcHJpbWl0aXZlcyAvIHRpbWUtc3BhbnMgZXRjLlxuICogLSB0aGUgbGFiZWwgb2YgdGVtcG9yYWwgZW50aXR5IG9yIHBlcnNpc3RlbnQgaXRlbVxuICpcbiAqIFRoaXMgbWFpbmx5IHNlbGVjdHMgZGF0YSBmcm9tIHRoZSBpbmZvcm1hdGlvbiBzY2hlbWEgYW5kIHRoZSByZWxhdGlvbiB0byBwcm9qZWN0cy5cbiAqIEl0IGNvbWJpbmVzIHBpcGVzIHNlbGVjdGluZyBkYXRhIGZyb20gdGhlXG4gKiAtIGFjdGl2YXRlZCBwcm9qZWN0XG4gKiAtIGFsdGVybmF0aXZlcyAobm90IGluIHByb2plY3QgYnV0IGluIG90aGVycylcbiAqIC0gcmVwb1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uUGlwZXNTZXJ2aWNlIHtcblxuICBpbmZSZXBvOiBJbmZTZWxlY3RvcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGI6IEluZm9ybWF0aW9uQmFzaWNQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBwOiBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgICBwcml2YXRlIGM6IENvbmZpZ3VyYXRpb25QaXBlc1NlcnZpY2UsXG4gICAgcHVibGljIHRpbWVQcmltaXRpdmVQaXBlOiBUaW1lUHJpbWl0aXZlUGlwZSxcbiAgICBwcml2YXRlIHRpbWVTcGFuUGlwZTogVGltZVNwYW5QaXBlLFxuICAgIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPlxuICApIHtcbiAgICB0aGlzLmluZlJlcG8gPSBuZXcgSW5mU2VsZWN0b3IobmdSZWR1eCwgb2YoJ3JlcG8nKSlcbiAgfVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBQaXBlIHRoZSBwcm9qZWN0IGVudGl0aWVzXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdExlbmd0aChsOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgc3dpdGNoIChsLmxpc3RUeXBlKSB7XG4gICAgICBjYXNlICdhcHBlbGxhdGlvbic6XG4gICAgICBjYXNlICdlbnRpdHktcHJldmlldyc6XG4gICAgICBjYXNlICdsYW5ndWFnZSc6XG4gICAgICBjYXNlICdwbGFjZSc6XG4gICAgICBjYXNlICdkaW1lbnNpb24nOlxuICAgICAgY2FzZSAnbGFuZ1N0cmluZyc6XG4gICAgICBjYXNlICd0ZW1wb3JhbC1lbnRpdHknOlxuICAgICAgICByZXR1cm4gdGhpcy5waXBlTGlzdChsLCBwa0VudGl0eSkucGlwZShtYXAoaXRlbXMgPT4gaXRlbXMubGVuZ3RoKSlcblxuICAgICAgY2FzZSAndGltZS1zcGFuJzpcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDcyLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDcxLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MCwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTEsIHBrRW50aXR5KSxcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUyLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MywgcGtFbnRpdHkpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICB0YXAoKHgpID0+IHtcblxuICAgICAgICAgIH0pLFxuICAgICAgICAgIG1hcChpdGVtcyA9PiBpdGVtcy5maWx0ZXIoeCA9PiB4Lmxlbmd0aCA+IDApLmxlbmd0aCkpXG5cbiAgICAgIC8vIGNhc2UgJ3RleHQtcHJvcGVydHknOlxuICAgICAgLy8gICByZXR1cm4gdGhpcy5waXBlTGlzdFRleHRQcm9wZXJ0eShsLCBwa0VudGl0eSkucGlwZShtYXAoaXRlbXMgPT4gaXRlbXMubGVuZ3RoKSlcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gICAgICAgIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xuICAgIH1cbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3QobDogU3ViZmllbGQsIHBrRW50aXR5LCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8SXRlbUxpc3Q+IHtcbiAgICBpZiAobC5saXN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuIHRoaXMucGlwZUxpc3RBcHBlbGxhdGlvbihsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5lbnRpdHlQcmV2aWV3KSByZXR1cm4gdGhpcy5waXBlTGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ3VhZ2UpIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ3VhZ2UobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUucGxhY2UpIHJldHVybiB0aGlzLnBpcGVMaXN0UGxhY2UobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gdGhpcy5waXBlTGlzdERpbWVuc2lvbihsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5nU3RyaW5nKSByZXR1cm4gdGhpcy5waXBlTGlzdExhbmdTdHJpbmcobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUudGVtcG9yYWxFbnRpdHkpIHJldHVybiB0aGlzLnBpcGVMaXN0RW50aXR5UHJldmlldyhsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS50aW1lU3Bhbikge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1UaW1lU3Bhbihwa0VudGl0eSkucGlwZShcbiAgICAgICAgbWFwKCh0cykgPT4gW3RzXS5maWx0ZXIoaSA9PiBpLnByb3BlcnRpZXMubGVuZ3RoID4gMCkpXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0QmFzaWNTdGF0ZW1lbnRJdGVtcyhsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIHBrUHJvamVjdDogbnVtYmVyKTogT2JzZXJ2YWJsZTxCYXNpY1N0YXRlbWVudEl0ZW1bXT4ge1xuICAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gICAgICB0aGlzLmIucGlwZU91dGdvaW5nQmFzaWNTdGF0ZW1lbnRJdGVtc0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHksIHBrUHJvamVjdCkgOlxuICAgICAgdGhpcy5iLnBpcGVJbmdvaW5nQmFzaWNTdGF0ZW1lbnRJdGVtc0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHksIHBrUHJvamVjdClcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgaXRlbXMgaW4gYXBwZWxsYXRpb24gZmllbGRcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RBcHBlbGxhdGlvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW1bXT4ge1xuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAqIFBpcGUgdGhlIGl0ZW1zIGluIGVudGl0eSBwcmV2aWV3IGZpZWxkXG4gKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdEVudGl0eVByZXZpZXc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFnKGBiZWZvcmUtJHtwa0VudGl0eX0tJHtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5fS0ke2xpc3REZWZpbml0aW9uLnRhcmdldENsYXNzfWApLFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZykpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcylcbiAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5vcmROdW0gPiBiLm9yZE51bSA/IDEgOiAtMSksXG4gICAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgfSksXG4gICAgICAgIHRhZyhgYWZ0ZXItJHtwa0VudGl0eX0tJHtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5fS0ke2xpc3REZWZpbml0aW9uLnRhcmdldENsYXNzfWApLFxuICAgICAgKVxuXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RMYW5ndWFnZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBpdGVtcyBpbiBwbGFjZSBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtUGxhY2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgaXRlbXMgaW4gcGxhY2UgbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdERpbWVuc2lvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gKiBQaXBlIHRoZSBpdGVtcyBpbiBsYW5nU3RyaW5nIGxpc3RcbiAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0TGFuZ1N0cmluZzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxMYW5nU3RyaW5nSXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG5cbiAgfVxuXG4gIC8qKlxuICAgKiBwaXBlIHRoZSBwcm9qZWN0IHJlbGF0aW9uIG9mIGdpdmVuIHN0YXRtZW50LCBpZiB0aGUgc2NvcGUgb2YgdGhpcyBwYWdlIGlzIGluUHJvamVjdFxuICAgKiBAcGFyYW0gc3RtdCBJbmZTdGF0ZW1lbnQgdG8gYmUgY29tcGxldGVkIHdpdGggcHJvalJlbFxuICAgKiBAcGFyYW0gcGFnZSBwYWdlIGZvciB3aGljaCB3ZSBhcmUgcGlwaW5nIHRoaXMgc3R1ZmZcbiAgICovXG4gIHBpcGVQcm9qUmVsT2ZTdGF0ZW1lbnQoc3RtdDogSW5mU3RhdGVtZW50LCBwYWdlOiBHdlN1YmZpZWxkUGFnZSk6IE9ic2VydmFibGU8U3RhdGVtZW50UHJvalJlbD4ge1xuICAgIGlmIChwYWdlLnNjb3BlLmluUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSRcbiAgICAgICAgLmtleShwYWdlLnNjb3BlLmluUHJvamVjdCArICdfJyArIHN0bXQucGtfZW50aXR5KS5waXBlKFxuICAgICAgICAgIG1hcChcbiAgICAgICAgICAgIHByb2pSZWwgPT4gKHtcbiAgICAgICAgICAgICAgcHJvalJlbCxcbiAgICAgICAgICAgICAgb3JkTnVtOiBwYWdlLmlzT3V0Z29pbmcgPyBwcm9qUmVsLm9yZF9udW1fb2ZfcmFuZ2UgOiBwcm9qUmVsLm9yZF9udW1fb2ZfZG9tYWluXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdCh7XG4gICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgb3JkTnVtOiAwXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICAvKipcbiAgICogcGlwZSB0aGUgdGFyZ2V0IG9mIGdpdmVuIHN0YXRtZW50XG4gICAqIEBwYXJhbSBzdG10IEluZlN0YXRlbWVudCB0byBiZSBjb21wbGV0ZWQgd2l0aCB0YXJnZXRcbiAgICogQHBhcmFtIHBhZ2UgcGFnZSBmb3Igd2hpY2ggd2UgYXJlIHBpcGluZyB0aGlzIHN0dWZmXG4gICAqIEBwYXJhbSBzdWJmaWVsZFR5cGUgdHlwZSBvZiBzdWJmaWVsZCBmb3Igd2hpY2ggd2UgcGlwZSB0aGlzIHN0dWZmXG4gICAqL1xuICBwaXBlVGFyZ2V0T2ZTdGF0ZW1lbnQoc3RtdDogSW5mU3RhdGVtZW50LCBwYWdlOiBHdlN1YmZpZWxkUGFnZSwgc3ViZmllbGRUeXBlOiBHdlN1YmZpZWxkVHlwZSk6IE9ic2VydmFibGU8U3RhdGVtZW50VGFyZ2V0PiB7XG4gICAgY29uc3QgaXNPdXRnb2luZyA9IHBhZ2UuaXNPdXRnb2luZ1xuICAgIGNvbnN0IHRhcmdldEluZm8gPSBpc091dGdvaW5nID8gc3RtdC5ma19vYmplY3RfaW5mbyA6IHN0bXQuZmtfc3ViamVjdF9pbmZvO1xuICAgIC8vIGhlcmUgeW91IGNvdWxkIGFkZCB0YXJnZXREYXRhIG9yIHRhcmdldENlbGxcblxuICAgIGlmIChzdWJmaWVsZFR5cGUuYXBwZWxsYXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5hcHBlbGxhdGlvbiQuYnlfcGtfZW50aXR5JC5rZXkodGFyZ2V0SW5mbykucGlwZShcbiAgICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgICAgbWFwKGFwcGVsbGF0aW9uID0+IHtcbiAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IGFwcGVsbGF0aW9uLnN0cmluZyxcbiAgICAgICAgICAgIHRhcmdldENsYXNzOiBwYWdlLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgIGFwcGVsbGF0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS5wbGFjZSkge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnBsYWNlJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICBtYXAocGxhY2UgPT4ge1xuICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICB0YXJnZXRMYWJlbDogYFdHUzg0OiAke3BsYWNlLmxhdH3CsCwgJHtwbGFjZS5sb25nfcKwYCxcbiAgICAgICAgICAgIHRhcmdldENsYXNzOiBwYWdlLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgIHBsYWNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS5kaW1lbnNpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5kaW1lbnNpb24kLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgIHN3aXRjaE1hcChkaW1lbnNpb24gPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhkaW1lbnNpb24uZmtfbWVhc3VyZW1lbnRfdW5pdClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgdW5pdFByZXZpZXcgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldExhYmVsOiBgJHtkaW1lbnNpb24ubnVtZXJpY192YWx1ZX0gJHt1bml0UHJldmlldy5lbnRpdHlfbGFiZWx9YCxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHBhZ2UudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS5sYW5nU3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ19zdHJpbmckLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgIHN3aXRjaE1hcChsYW5nU3RyaW5nID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KGxhbmdTdHJpbmcuZmtfbGFuZ3VhZ2UpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIGxhbmd1YWdlID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogYCR7bGFuZ1N0cmluZy5zdHJpbmd9ICgke2xhbmd1YWdlLmlzbzYzOTF9KWAsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBwYWdlLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICBsYW5nU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLmxhbmd1YWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgIG1hcChsYW5ndWFnZSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgIHRhcmdldExhYmVsOiBgJHtsYW5ndWFnZS5ub3RlcyB8fCBsYW5ndWFnZS5pc282MzkxfWAsXG4gICAgICAgICAgICB0YXJnZXRDbGFzczogcGFnZS50YXJnZXRDbGFzcyxcbiAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICBsYW5ndWFnZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUuZW50aXR5UHJldmlldyB8fCBzdWJmaWVsZFR5cGUudHlwZUl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICBtYXAoZW50aXR5UHJldmlldyA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgIHRhcmdldExhYmVsOiBgJHtlbnRpdHlQcmV2aWV3LmVudGl0eV9sYWJlbH1gLFxuICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHBhZ2UudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgZW50aXR5UHJldmlld1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cblxuICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eSkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ3N1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eS5sZW5ndGgnLCBzdWJmaWVsZFR5cGUudGVtcG9yYWxFbnRpdHkubGVuZ3RoKVxuXG4gICAgICAvLyBmb3IgZWFjaCBvZiB0aGVzZSBzdWJmaWVsZHNcbiAgICAgIGNvbnN0IHN1YmVudGl0eVBhZ2VzJCA9IHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eS5tYXAoc3ViZmllbGRSZXEgPT4ge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWJlbnRpdHkgc3ViZmllbGQgZm9yIHRhcmdldEluZm8nLCB0YXJnZXRJbmZvKVxuXG4gICAgICAgIC8vIGNyZWF0ZSBwYWdlOkd2U3ViZmllbGRQYWdlXG4gICAgICAgIGNvbnN0IHsgaXNDaXJjdWxhciwgLi4ucCB9ID0gc3ViZmllbGRSZXEucGFnZVxuICAgICAgICBjb25zdCBzY29wZSA9IHBhZ2Uuc2NvcGUubm90SW5Qcm9qZWN0ID8geyBpblJlcG86IHRydWUgfSA6IHBhZ2Uuc2NvcGVcbiAgICAgICAgY29uc3QgbmVzdGVkUGFnZTogR3ZTdWJmaWVsZFBhZ2UgPSB7XG4gICAgICAgICAgLi4ucCxcbiAgICAgICAgICBma1NvdXJjZUVudGl0eTogdGFyZ2V0SW5mbyxcbiAgICAgICAgICBzY29wZSxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnBpcGVTdWJmaWVsZFBhZ2UobmVzdGVkUGFnZSwgc3ViZmllbGRSZXEuc3ViZmllbGRUeXBlKS5waXBlKFxuICAgICAgICAgIG1hcCgoeyBjb3VudCwgc3RhdGVtZW50cyB9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGxpbWl0LCBvZmZzZXQsIC4uLnMgfSA9IG5lc3RlZFBhZ2U7XG4gICAgICAgICAgICBjb25zdCBzdWJlbnRpdHlTdWJmaWVsZFBhZ2U6IFN1YmVudGl0eVN1YmZpZWxkUGFnZSA9IHtcbiAgICAgICAgICAgICAgc3ViZmllbGQ6IHMsXG4gICAgICAgICAgICAgIGNvdW50LFxuICAgICAgICAgICAgICBzdGF0ZW1lbnRzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3ViZW50aXR5U3ViZmllbGRQYWdlXG4gICAgICAgICAgfSksXG4gICAgICAgICAgLy8gc3RhcnRXaXRoKHVuZGVmaW5lZCkgLy8gVE9ETyByZW1vdmUhIHRoaXMgaXMgZm9yIGRlYnVnZ2luZ1xuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoc3ViZW50aXR5UGFnZXMkKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAvLyBmaWx0ZXIoc3ViZmllbGRzID0+IHtcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdzdWJmaWVsZHNcXG4nLCBzdWJmaWVsZHMubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgLy8gICAgIGNvbnN0IHJlcSA9IHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eVtpXVxuICAgICAgICAgIC8vICAgICBjb25zdCBmaWVsZEluZm8gPSB0YXJnZXRJbmZvICsgJ18nICsgcmVxLnBhZ2UuZmtQcm9wZXJ0eSArICdfJyArIHJlcS5wYWdlLnRhcmdldENsYXNzICsgJ18nICsga2V5cyhyZXEuc3ViZmllbGRUeXBlKVswXVxuICAgICAgICAgIC8vICAgICByZXR1cm4gYCR7aX06ICR7aXRlbSA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAvLyAgICAgICBgdW5kZWZpbmVkICR7ZmllbGRJbmZvfWAgOlxuICAgICAgICAgIC8vICAgICAgIGBvayAgICAgICAgJHtmaWVsZEluZm99YFxuICAgICAgICAgIC8vICAgICAgIH1gXG4gICAgICAgICAgLy8gICB9KS5qb2luKCdcXG4nKSlcbiAgICAgICAgICAvLyAgIHJldHVybiAhc3ViZmllbGRzLmluY2x1ZGVzKHVuZGVmaW5lZClcbiAgICAgICAgICAvLyB9KSxcbiAgICAgICAgICBtYXAoXG4gICAgICAgICAgICBzdWJmaWVsZHMgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgdGFyZ2V0TGFiZWw6ICcnLFxuICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBwYWdlLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgZW50aXR5OiB7XG4gICAgICAgICAgICAgICAgICAgIHBrRW50aXR5OiB0YXJnZXRJbmZvLFxuICAgICAgICAgICAgICAgICAgICBzdWJmaWVsZHNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLnRpbWVTcGFuKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnc3ViZmllbGRUeXBlLnRlbXBvcmFsRW50aXR5Lmxlbmd0aCcsIHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eS5sZW5ndGgpXG5cbiAgICAgIC8vIGZvciBlYWNoIG9mIHRoZXNlIHN1YmZpZWxkc1xuICAgICAgY29uc3Qgc3ViZW50aXR5UGFnZXMkID0gRGZoQ29uZmlnLlBST1BFUlRZX1BLU19XSEVSRV9USU1FX1BSSU1JVElWRV9JU19SQU5HRVxuICAgICAgICAubWFwKGZrUHJvcGVydHkgPT4ge1xuXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1YmVudGl0eSBzdWJmaWVsZCBmb3IgdGFyZ2V0SW5mbycsIHRhcmdldEluZm8pXG5cbiAgICAgICAgICAvLyBjcmVhdGUgcGFnZTpHdlN1YmZpZWxkUGFnZVxuICAgICAgICAgIGNvbnN0IHNjb3BlID0gcGFnZS5zY29wZS5ub3RJblByb2plY3QgPyB7IGluUmVwbzogdHJ1ZSB9IDogcGFnZS5zY29wZVxuXG4gICAgICAgICAgY29uc3QgbmVzdGVkUGFnZTogR3ZTdWJmaWVsZFBhZ2UgPSB7XG4gICAgICAgICAgICBma1Byb3BlcnR5LFxuICAgICAgICAgICAgaXNPdXRnb2luZzogdHJ1ZSxcbiAgICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IERmaENvbmZpZy5DTEFTU19QS19USU1FX1BSSU1JVElWRSxcbiAgICAgICAgICAgIGZrU291cmNlRW50aXR5OiB0YXJnZXRJbmZvLFxuICAgICAgICAgICAgc2NvcGUsXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHN1YmZUeXBlOiBHdlN1YmZpZWxkVHlwZSA9IHtcbiAgICAgICAgICAgIHRpbWVQcmltaXRpdmU6ICd0cnVlJ1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVTdWJmaWVsZFBhZ2UobmVzdGVkUGFnZSwgc3ViZlR5cGUpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHsgY291bnQsIHN0YXRlbWVudHMgfSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IGxpbWl0LCBvZmZzZXQsIC4uLnMgfSA9IG5lc3RlZFBhZ2U7XG4gICAgICAgICAgICAgIGNvbnN0IHN1YmVudGl0eVN1YmZpZWxkUGFnZTogU3ViZW50aXR5U3ViZmllbGRQYWdlID0ge1xuICAgICAgICAgICAgICAgIHN1YmZpZWxkOiBzLFxuICAgICAgICAgICAgICAgIGNvdW50LFxuICAgICAgICAgICAgICAgIHN0YXRlbWVudHNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gc3ViZW50aXR5U3ViZmllbGRQYWdlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfSlcblxuXG4gICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoc3ViZW50aXR5UGFnZXMkKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoXG4gICAgICAgICAgICBzdWJmaWVsZHMgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB0aW1lU3BhblByZXZpZXc6IFdhckVudGl0eVByZXZpZXdUaW1lU3BhbiA9IHt9XG4gICAgICAgICAgICAgIHN1YmZpZWxkcy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzLnN0YXRlbWVudHNbMF0pIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHN0ID0gcy5zdGF0ZW1lbnRzWzBdXG4gICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBEZmhDb25maWcuUFJPUEVSVFlfUEtfVE9fRVhJU1RFTkNFX1RJTUVfS0VZW3N0LnN0YXRlbWVudC5ma19wcm9wZXJ0eV1cbiAgICAgICAgICAgICAgICAgIHRpbWVTcGFuUHJldmlld1trZXldID0gc3QudGFyZ2V0LnRpbWVQcmltaXRpdmVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogdGhpcy50aW1lU3BhblBpcGUudHJhbnNmb3JtKG5ldyBUaW1lU3BhblV0aWwodGltZVNwYW5QcmV2aWV3KSksXG4gICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHBhZ2UudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICB0aW1lU3Bhbjoge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3OiB0aW1lU3BhblByZXZpZXcsXG4gICAgICAgICAgICAgICAgICAgIHN1YmZpZWxkc1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUudGltZVByaW1pdGl2ZSkge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICBzd2l0Y2hNYXAodGltZVByaW1pdGl2ZSA9PiB7XG4gICAgICAgICAgLy8gZ2V0IGNhbGVuZGFyXG4gICAgICAgICAgbGV0IGNhbCQ6IE9ic2VydmFibGU8VGltZVByaW1pdGl2ZVdpdGhDYWwuQ2FsZW5kYXJFbnVtPlxuICAgICAgICAgIGlmIChwYWdlLnNjb3BlLmluUHJvamVjdCkge1xuICAgICAgICAgICAgY2FsJCA9IHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBhZ2Uuc2NvcGUuaW5Qcm9qZWN0ICsgJ18nICsgc3RtdC5wa19lbnRpdHkpXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgIGluZm9Qcm9qUmVsID0+IGluZm9Qcm9qUmVsLmNhbGVuZGFyIGFzIFRpbWVQcmltaXRpdmVXaXRoQ2FsLkNhbGVuZGFyRW51bVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNhbCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHN0bXQuY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyIGFzIFRpbWVQcmltaXRpdmVXaXRoQ2FsLkNhbGVuZGFyRW51bSlcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcGlwZSB0YXJnZXQgdGltZSBwcmltaXRpdmUgb2Ygc3RtdFxuICAgICAgICAgIHJldHVybiBjYWwkLnBpcGUoXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgIGNhbCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZVByaW1XaXRoQ2FsID0gaW5mVGltZVByaW1Ub1RpbWVQcmltV2l0aENhbCh0aW1lUHJpbWl0aXZlLCBjYWwpXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgIHRhcmdldExhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbVdpdGhDYWwpLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHBhZ2UudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGltZVByaW1pdGl2ZTogdGltZVByaW1XaXRoQ2FsXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGltcGxlbWVudGF0aW9uIGZvdW5kIGZvciBzdWJmaWVsZFR5cGUgJHtKU09OLnN0cmluZ2lmeShzdWJmaWVsZFR5cGUpfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIHBpcGUgdGFyZ2V0IGFuZCBwcm9qUmVsIG9mIHRoZSBnaXZlbiBzdGF0ZW1lbnRcbiAgICovXG4gIHBpcGVTdGF0ZW1lbnRXaXRoVGFyZ2V0KHN0bXQ6IEluZlN0YXRlbWVudCwgcGFnZTogR3ZTdWJmaWVsZFBhZ2UsIHN1YmZpZWxkVHlwZTogR3ZTdWJmaWVsZFR5cGUpOiBPYnNlcnZhYmxlPFN0YXRlbWVudFdpdGhUYXJnZXQ+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZVRhcmdldE9mU3RhdGVtZW50KHN0bXQsIHBhZ2UsIHN1YmZpZWxkVHlwZSksXG4gICAgICB0aGlzLnBpcGVQcm9qUmVsT2ZTdGF0ZW1lbnQoc3RtdCwgcGFnZSlcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFt0YXJnZXQsIHByb2pSZWxdKSA9PiAoeyAuLi50YXJnZXQsIC4uLnByb2pSZWwgfSkpXG4gICAgKVxuICB9XG5cbiAgcGlwZVN1YmZpZWxkUGFnZShwYWdlOiBHdlN1YmZpZWxkUGFnZSwgc3ViZmllbGRUeXBlOiBHdlN1YmZpZWxkVHlwZSk6IE9ic2VydmFibGU8U3ViZmllbGRQYWdlPiB7XG4gICAgaWYgKHN1YmZpZWxkVHlwZS50aW1lU3Bhbikge1xuICAgICAgLy8gaWYgdGltZVNwYW4gbWFrZSBhIHNob3J0IGN1dDogcHJvZHVjZSBhIHZpcnR1YWwgc3RhdGVtZW50V2l0aFRhcmdldCBmcm9tIGVudGl0eSB0byB0aW1lU3BhblxuICAgICAgcmV0dXJuIHRoaXMucGlwZVRpbWVTcGFuKHBhZ2UsIHN1YmZpZWxkVHlwZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gZ2V0IHRoZSBzdGF0bWVudHMgb2YgdGhhdCBwYWdlXG4gICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5wYWdpbmF0aW9uJC5waXBlQ291bnQocGFnZSksXG4gICAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQucGlwZVBhZ2UocGFnZSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgICAgICAgcGtTdG10cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgICAgICAgICBwa1N0bXRzLm1hcChwa1N0bXQgPT4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9wa19lbnRpdHkkLmtleShwa1N0bXQpXG4gICAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBzdGF0ZW1lbnQsIGRlcGVuZGluZyBvbiB0aGUgc3ViZmllbGRUeXBlLCBsb2FkIHRoZSBjb3JyZXNwb25kaW5nIHRhcmdldFxuICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcihzdG10ID0+ICEhc3RtdCksXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcChzdG10ID0+IHRoaXMucGlwZVN0YXRlbWVudFdpdGhUYXJnZXQoc3RtdCwgcGFnZSwgc3ViZmllbGRUeXBlKSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXAoKFtjb3VudCwgc3RhdGVtZW50c10pID0+ICh7IGNvdW50LCBzdGF0ZW1lbnRzIH0pKVxuICAgICAgKVxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBwaXBlVGltZVNwYW4ocGFnZTogR3ZTdWJmaWVsZFBhZ2UsIHN1YmZpZWxkVHlwZTogR3ZTdWJmaWVsZFR5cGUpIHtcbiAgICBjb25zdCB2aXJ0dWFsU3RhdGVtZW50VG9UaW1lU3BhbiA9IHsgZmtfb2JqZWN0X2luZm86IHBhZ2UuZmtTb3VyY2VFbnRpdHkgfTtcbiAgICByZXR1cm4gdGhpcy5waXBlVGFyZ2V0T2ZTdGF0ZW1lbnQodmlydHVhbFN0YXRlbWVudFRvVGltZVNwYW4sIHBhZ2UsIHN1YmZpZWxkVHlwZSkucGlwZShtYXAoc3RtdFRhcmdldCA9PiB7XG4gICAgICBjb25zdCBzdG10V1Q6IFN0YXRlbWVudFdpdGhUYXJnZXQgPSB7XG4gICAgICAgIC4uLnN0bXRUYXJnZXQsXG4gICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgb3JkTnVtOiB1bmRlZmluZWRcbiAgICAgIH07XG4gICAgICByZXR1cm4geyBjb3VudDogMSwgc3RhdGVtZW50czogW3N0bXRXVF0gfTtcbiAgICB9KSk7XG4gIH1cblxuICAvLyBwaXBlU3RhdGVtZW50TGlzdFBhZ2UoXG4gIC8vICAgcGFnaW5hdGVCeTogUGFnaW5hdGVCeVBhcmFtW10sXG4gIC8vICAgbGltaXQ6IG51bWJlcixcbiAgLy8gICBvZmZzZXQ6IG51bWJlcixcbiAgLy8gICBwa1Byb2plY3Q6IG51bWJlcixcbiAgLy8gICBsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsXG4gIC8vICAgYWx0ZXJuYXRpdmUgPSBmYWxzZSk6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gIC8vICAgLy8gcHJlcGFyZSBwYWdlIGxvYWRlclxuICAvLyAgIGNvbnN0IHBhZ2VMb2FkZXIkID0gYWx0ZXJuYXRpdmUgPyB0aGlzLmluZlJlcG8uc3RhdGVtZW50JC5wYWdpbmF0aW9uJCA6IHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQ7XG5cbiAgLy8gICAvLyBwcmVwYXJlIGJhc2ljIHN0YXRlbWVudCBpdGVtIGxvYWRlclxuICAvLyAgIGNvbnN0IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlciA9IChwa1N0YXRlbWVudCwgaXNPdXRnb2luZywgcGtQcm9qKSA9PiB7XG4gIC8vICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAvLyAgICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1N0YXRlbWVudCwgaXNPdXRnb2luZykgOlxuICAvLyAgICAgICB0aGlzLmIucGlwZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtQcm9qLCBwa1N0YXRlbWVudCwgaXNPdXRnb2luZylcbiAgLy8gICB9XG5cbiAgLy8gICBjb25zdCBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkID0gcGFnZUxvYWRlciQucGlwZVBhZ2UocGFnaW5hdGVCeSwgbGltaXQsIG9mZnNldClcblxuICAvLyAgIHJldHVybiBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAoKHBhZ2luYXRlZFN0YXRlbWVudFBrcykgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gIC8vICAgICAgIHBhZ2luYXRlZFN0YXRlbWVudFBrcy5tYXAocGtTdGF0ZW1lbnQgPT4gYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyKHBrU3RhdGVtZW50LCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLCBwa1Byb2plY3QpXG4gIC8vICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAvLyAgICAgICAgICAgc3dpdGNoTWFwKHggPT4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoeC5pc091dGdvaW5nID8geC5zdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8gOiB4LnN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pXG4gIC8vICAgICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICAgIG1hcCgocHJldmlldykgPT4ge1xuICAvLyAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogRW50aXR5UHJldmlld0l0ZW0gPSB7XG4gIC8vICAgICAgICAgICAgICAgICAgIC4uLngsXG4gIC8vICAgICAgICAgICAgICAgICAgIHByZXZpZXcsXG4gIC8vICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IHByZXZpZXcuZmtfY2xhc3NcbiAgLy8gICAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAvLyAgICAgICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICAgIClcbiAgLy8gICAgICAgICAgICkpXG5cbiAgLy8gICAgICAgKVxuICAvLyAgICAgKVxuICAvLyAgICAgKSlcblxuICAvLyB9XG5cblxuICAvKipcbiAgICogUGlwZSB0aGUgdGVtcG9yYWwgZW50aXRpZXMgY29ubmVjdGVkIHRvIGdpdmVuIGVudGl0eSBieSBzdGF0ZW1lbnRzIHRoYXQgYXJlIGluIHRoZSBjdXJyZW50IHByb2plY3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgLy8gcGlwZVRlbXBvcmFsRW50aXR5VGFibGVSb3dzKFxuICAvLyAgIHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLFxuICAvLyAgIGxpbWl0OiBudW1iZXIsXG4gIC8vICAgb2Zmc2V0OiBudW1iZXIsXG4gIC8vICAgcGtQcm9qZWN0OiBudW1iZXIsXG4gIC8vICAgbGlzdERlZmluaXRpb246IFN1YmZpZWxkLFxuICAvLyAgIGZpZWxkRGVmaW5pdGlvbnM6IEZpZWxkW10sXG4gIC8vICAgYWx0ZXJuYXRpdmUgPSBmYWxzZSk6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlJdGVtW10+IHtcblxuICAvLyAgIC8vIGNvbnN0IHByb3BlcnR5SXRlbVR5cGUgPSB0aGlzLnByb3BlcnR5SXRlbVR5cGUoZmllbGREZWZpbml0aW9ucylcblxuICAvLyAgIGNvbnN0IHRhcmdldEVudGl0eU9mU3RhdGVtZW50SXRlbSA9IChyOiBCYXNpY1N0YXRlbWVudEl0ZW0pID0+IHIuaXNPdXRnb2luZyA/IHIuc3RhdGVtZW50LmZrX29iamVjdF9pbmZvIDogci5zdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvO1xuXG4gIC8vICAgLy8gcHJlcGFyZSBwYWdlIGxvYWRlclxuICAvLyAgIGNvbnN0IHBhZ2VMb2FkZXIkID0gYWx0ZXJuYXRpdmUgPyB0aGlzLmluZlJlcG8uc3RhdGVtZW50JC5wYWdpbmF0aW9uJCA6IHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQ7XG5cbiAgLy8gICAvLyBwcmVwYXJlIGJhc2ljIHN0YXRlbWVudCBpdGVtIGxvYWRlclxuICAvLyAgIGNvbnN0IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlciA9IChwa1N0YXRlbWVudCwgaXNPdXRnb2luZywgcGtQcm9qKSA9PiB7XG4gIC8vICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAvLyAgICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1N0YXRlbWVudCwgaXNPdXRnb2luZykgOlxuICAvLyAgICAgICB0aGlzLmIucGlwZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtQcm9qLCBwa1N0YXRlbWVudCwgaXNPdXRnb2luZylcbiAgLy8gICB9XG5cbiAgLy8gICAvLyBwcmVwYXJlIFRlRW5Sb3cgbG9hZGVyXG4gIC8vICAgY29uc3Qgcm93TG9hZGVyID0gKHRhcmdldEVudGl0eVBrLCBmaWVsZERlZiwgcGtQcm9qKSA9PiB7XG4gIC8vICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAvLyAgICAgICB0aGlzLnBpcGVJdGVtVGVFblJvdyh0YXJnZXRFbnRpdHlQaywgZmllbGREZWYsIG51bGwsIHRydWUpIDpcbiAgLy8gICAgICAgdGhpcy5waXBlSXRlbVRlRW5Sb3codGFyZ2V0RW50aXR5UGssIGZpZWxkRGVmLCBwa1Byb2osIGZhbHNlKVxuICAvLyAgIH1cblxuICAvLyAgIGNvbnN0IHBhZ2luYXRlZFN0YXRlbWVudFBrcyQgPSBwYWdlTG9hZGVyJC5waXBlUGFnZShwYWdpbmF0ZUJ5LCBsaW1pdCwgb2Zmc2V0KVxuXG4gIC8vICAgY29uc3Qgcm93cyQgPSBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAoKHBhZ2luYXRlZFN0YXRlbWVudFBrcykgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gIC8vICAgICAgIHBhZ2luYXRlZFN0YXRlbWVudFBrcy5tYXAocGtTdGF0ZW1lbnQgPT4gYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyKHBrU3RhdGVtZW50LCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLCBwa1Byb2plY3QpXG4gIC8vICAgICAgICAgLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgLy8gICAgICAgKVxuICAvLyAgICAgKVxuICAvLyAgICAgICAucGlwZShcbiAgLy8gICAgICAgICBzd2l0Y2hNYXAoKHRlRW5TdGF0ZW1lbnQpID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAvLyAgICAgICAgICAgdGVFblN0YXRlbWVudC5tYXAoKGJhc2ljU3RhdGVtZW50SXRlbSkgPT4ge1xuICAvLyAgICAgICAgICAgICBjb25zdCBwa1RlRW4gPSB0YXJnZXRFbnRpdHlPZlN0YXRlbWVudEl0ZW0oYmFzaWNTdGF0ZW1lbnRJdGVtKTtcbiAgLy8gICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gIC8vICAgICAgICAgICAgICAgcm93TG9hZGVyKFxuICAvLyAgICAgICAgICAgICAgICAgcGtUZUVuLFxuICAvLyAgICAgICAgICAgICAgICAgZmllbGREZWZpbml0aW9ucyxcbiAgLy8gICAgICAgICAgICAgICAgIC8vIHByb3BlcnR5SXRlbVR5cGUsXG4gIC8vICAgICAgICAgICAgICAgICBwa1Byb2plY3RcbiAgLy8gICAgICAgICAgICAgICApLFxuICAvLyAgICAgICAgICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHBrVGVFbilcbiAgLy8gICAgICAgICAgICAgKS5waXBlKFxuICAvLyAgICAgICAgICAgICAgIG1hcCgoW3JvdywgdGVFblByb2pSZWxdKSA9PiB7XG4gIC8vICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBUZW1wb3JhbEVudGl0eUl0ZW0gPSB7XG4gIC8vICAgICAgICAgICAgICAgICAgIC4uLmJhc2ljU3RhdGVtZW50SXRlbSxcbiAgLy8gICAgICAgICAgICAgICAgICAgcm93LFxuICAvLyAgICAgICAgICAgICAgICAgICBwa0VudGl0eTogcGtUZUVuLFxuICAvLyAgICAgICAgICAgICAgICAgICB0ZUVuUHJvalJlbFxuICAvLyAgICAgICAgICAgICAgICAgfTtcbiAgLy8gICAgICAgICAgICAgICAgIHJldHVybiBpdGVtXG4gIC8vICAgICAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICAgICAgKVxuICAvLyAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICApKSxcbiAgLy8gICAgICAgKSksXG5cbiAgLy8gICApXG4gIC8vICAgcmV0dXJuIHJvd3MkXG4gIC8vIH1cblxuXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVRlRW5Sb3cocGtFbnRpdHk6IG51bWJlciwgZmllbGREZWZpbml0aW9uczogRmllbGRbXSwgcGtQcm9qZWN0OiBudW1iZXIsIHJlcG86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFRlbXBvcmFsRW50aXR5Um93PiB7XG5cbiAgICAvLyBwaXBlIG91dGdvaW5nIHN0YXRlbWVudHNcbiAgICBjb25zdCBvdXRnb2luZ1N0YXRlbWVudHMkID0gcmVwbyA/IHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSkgOiB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk7XG4gICAgLy8gcGlwZSBpbmdvaW5nIHN0YXRlbWVudHNcbiAgICBjb25zdCBpbmdvaW5nU3RhdGVtZW50cyQgPSByZXBvID8gdGhpcy5iLnBpcGVSZXBvSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpIDogdGhpcy5iLnBpcGVJbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk7XG5cblxuICAgIC8vIHBpcGUgYWxsIHN0YXRlbWVudHMgd2l0aCBpbmZvcm1hdGlvbiBsZWFmIGl0ZW1zXG5cbiAgICBjb25zdCBvdXRnb2luZ0l0ZW1zJDogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRJdGVtW10+ID0gb3V0Z29pbmdTdGF0ZW1lbnRzJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIHN0YXRlbWVudHNcbiAgICAgICAgICAuZmlsdGVyKHN0YXRlbWVudCA9PiAhIXN0YXRlbWVudC5ma19vYmplY3RfaW5mbykgLy8gcmVtb3ZlIHN0YXRlbWVudHMgbm90IHBvaW50aW5nIHRvIGluZm9ybWF0aW9uXG4gICAgICAgICAgLm1hcChzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzT3V0Z29pbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW0ocywgcGtQcm9qZWN0LCBpc091dGdvaW5nKTtcbiAgICAgICAgICB9KVxuICAgICAgKSlcblxuICAgIClcbiAgICBjb25zdCBpbmdvaW5nSXRlbXMkOiBPYnNlcnZhYmxlPFN0YXRlbWVudEl0ZW1bXT4gPSBpbmdvaW5nU3RhdGVtZW50cyQucGlwZShcbiAgICAgIHN3aXRjaE1hcChzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBzdGF0ZW1lbnRzXG4gICAgICAgICAgLmZpbHRlcihzdGF0ZW1lbnQgPT4gISFzdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKSAvLyByZW1vdmUgc3RhdGVtZW50cyBub3QgcG9pbnRpbmcgdG8gaW5mb3JtYXRpb25cbiAgICAgICAgICAubWFwKHMgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNPdXRnb2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW0ocywgcGtQcm9qZWN0LCBpc091dGdvaW5nKTtcbiAgICAgICAgICB9KVxuICAgICAgKSlcblxuICAgIClcblxuICAgIGNvbnN0IHNvcnRJdGVtcyA9IHJlcG8gP1xuICAgICAgKGl0ZW06IFN0YXRlbWVudEl0ZW1bXSkgPT4gaXRlbS5zb3J0KChhLCBiKSA9PiBhLnN0YXRlbWVudC5pc19pbl9wcm9qZWN0X2NvdW50ID4gYi5zdGF0ZW1lbnQuaXNfaW5fcHJvamVjdF9jb3VudCA/IDEgOiAtMSkgOlxuICAgICAgKGl0ZW06IFN0YXRlbWVudEl0ZW1bXSkgPT4gaXRlbTtcblxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qob3V0Z29pbmdJdGVtcyQsIGluZ29pbmdJdGVtcyQpLnBpcGUoXG5cbiAgICAgIG1hcCgoW291dGdvaW5nSXRlbXMsIGluZ29pbmdJdGVtc10pID0+IHtcbiAgICAgICAgY29uc3QgZ3JvdXBlZE91dCA9IGdyb3VwQnkoKGkpID0+IChpICYmIGkuc3RhdGVtZW50ID8gaS5zdGF0ZW1lbnQuZmtfcHJvcGVydHkudG9TdHJpbmcoKSA6IHVuZGVmaW5lZCksIG91dGdvaW5nSXRlbXMpO1xuICAgICAgICBjb25zdCBncm91cGVkSW4gPSBncm91cEJ5KChpKSA9PiAoaSAmJiBpLnN0YXRlbWVudCA/IGkuc3RhdGVtZW50LmZrX3Byb3BlcnR5LnRvU3RyaW5nKCkgOiB1bmRlZmluZWQpLCBpbmdvaW5nSXRlbXMpO1xuICAgICAgICByZXR1cm4geyBncm91cGVkT3V0LCBncm91cGVkSW4gfVxuICAgICAgfSksXG4gICAgICAvLyBhdWRpdFRpbWUoMTApLFxuICAgICAgbWFwKChkKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdzogVGVtcG9yYWxFbnRpdHlSb3cgPSB7fVxuXG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbnMuZm9yRWFjaChmaWVsZERlZmluaXRpb24gPT4ge1xuXG4gICAgICAgICAgbGV0IGNlbGw6IFRlbXBvcmFsRW50aXR5Q2VsbDtcbiAgICAgICAgICBmaWVsZERlZmluaXRpb24ubGlzdERlZmluaXRpb25zLmZvckVhY2gobGlzdERlZmluaXRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKGxpc3REZWZpbml0aW9uLmxpc3RUeXBlLnRpbWVTcGFuKSB7XG5cbiAgICAgICAgICAgICAgY29uc3QgdCA9IHBpY2soWyc3MScsICc3MicsICcxNTAnLCAnMTUxJywgJzE1MicsICcxNTMnXSwgZC5ncm91cGVkT3V0KTtcbiAgICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHQpO1xuICAgICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ID0ga2V5cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgbGV0IGxhYmVsO1xuICAgICAgICAgICAgICBpZiAoaXRlbXNDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lU3BhbktleXM6IEN0cmxUaW1lU3BhbkRpYWxvZ1Jlc3VsdCA9IHt9XG4gICAgICAgICAgICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiB7IHRpbWVTcGFuS2V5c1trZXldID0gdFtrZXldWzBdLnRpbWVQcmltaXRpdmUgfSlcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lU3BhbiA9IFRpbWVTcGFuVXRpbC5mcm9tVGltZVNwYW5EaWFsb2dEYXRhKHRpbWVTcGFuS2V5cyk7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLnRpbWVTcGFuUGlwZS50cmFuc2Zvcm0odGltZVNwYW4pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZzogbGlzdERlZmluaXRpb24uaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICBpdGVtc0NvdW50LFxuICAgICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICAgIGVudGl0eVByZXZpZXc6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaXNUaW1lU3BhbjogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5ncm91cGVkT3V0W2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IHNvcnRJdGVtcyhkLmdyb3VwZWRPdXRbbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pXG4gICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgICAgICAgIGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zQ291bnQ6IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogKChmaXJzdEl0ZW0gfHwge30pIGFzIEVudGl0eVByZXZpZXdJdGVtKS5wcmV2aWV3LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmlyc3RJdGVtLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgICBmaXJzdEl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChkLmdyb3VwZWRJbltsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBzb3J0SXRlbXMoZC5ncm91cGVkSW5bbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pXG4gICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgICAgICAgIGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zQ291bnQ6IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogKChmaXJzdEl0ZW0gfHwge30pIGFzIEVudGl0eVByZXZpZXdJdGVtKS5wcmV2aWV3LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmlyc3RJdGVtLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgICBmaXJzdEl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9KVxuXG5cbiAgICAgICAgICByb3dbZmllbGREZWZpbml0aW9uLmxhYmVsXSA9IGNlbGw7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByb3dcbiAgICAgIH0pXG5cblxuICAgIClcbiAgfVxuXG5cblxuICAvLyBAc3B5VGFnXG4gIHByaXZhdGUgcGlwZUl0ZW0ocjogSW5mU3RhdGVtZW50LCBwa1Byb2plY3Q6IG51bWJlciwgcHJvcElzT3V0Z29pbmc6IGJvb2xlYW4pIHtcblxuICAgIGNvbnN0IHRhcmdldEVudGl0eSA9IHByb3BJc091dGdvaW5nID8gci5ma19vYmplY3RfaW5mbyA6IHIuZmtfc3ViamVjdF9pbmZvO1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5nZXRNb2RlbE9mRW50aXR5JCh0YXJnZXRFbnRpdHkpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAobSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsTmFtZTogSW5mTW9kZWxOYW1lID0gbSA/IG0ubW9kZWxOYW1lIDogdW5kZWZpbmVkO1xuICAgICAgICBzd2l0Y2ggKG1vZGVsTmFtZSkge1xuICAgICAgICAgIGNhc2UgJ2FwcGVsbGF0aW9uJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocik7XG4gICAgICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKTtcbiAgICAgICAgICBjYXNlICdwbGFjZSc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVBsYWNlKHIpO1xuICAgICAgICAgIGNhc2UgJ2RpbWVuc2lvbic6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKTtcbiAgICAgICAgICBjYXNlICdsYW5nX3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocik7XG4gICAgICAgICAgY2FzZSAndGltZV9wcmltaXRpdmUnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1UaW1lUHJpbWl0aXZlKHIsIHBrUHJvamVjdCk7IC8vIFRPRE86IGVtaXRzIHR3aWNlXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBwcm9wSXNPdXRnb2luZyk7XG4gICAgICAgIH1cblxuXG4gICAgICB9KVxuICAgIClcblxuXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUVudGl0eVByb3BlcnRpZXMobGlzdERlZjogU3ViZmllbGQsIGZrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxFbnRpdHlQcm9wZXJ0aWVzPiB7XG5cbiAgICBpZiAobGlzdERlZi5saXN0VHlwZS5hcHBlbGxhdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RBcHBlbGxhdGlvbihsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmxhbmd1YWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdExhbmd1YWdlKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUucGxhY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0UGxhY2UobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5kaW1lbnNpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0RGltZW5zaW9uKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUubGFuZ1N0cmluZykge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5nU3RyaW5nKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuXG5cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmVudGl0eVByZXZpZXcgfHwgbGlzdERlZi5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RFbnRpdHlQcmV2aWV3KGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUudGltZVNwYW4pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtVGltZVNwYW4oZmtFbnRpdHkpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGl0ZW1zID0gaXRlbS5wcm9wZXJ0aWVzLmZpbmQocCA9PiBwLml0ZW1zLmxlbmd0aCA+IDApID8gW3tcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVTcGFuUGlwZS50cmFuc2Zvcm0odGltZVNwYW5JdGVtVG9UaW1lU3BhbihpdGVtKSksXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSAvLyBUT0RPIGNoZWNrIGlmIHRoZSBwcm9wZXJ0aWVzIG9yIHRoZSBpdGVtIGFyZSByZWFsbHkgbm90IG5lZWRlZFxuICAgICAgICAgIH1dIDogW11cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGlzdERlZmluaXRpb246IGxpc3REZWYsXG4gICAgICAgICAgICBpdGVtc1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIG9mKG51bGwpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuaW5mJC50ZW1wb3JhbF9lbnRpdHkkLmJ5X3BrX2VudGl0eV9rZXkkKHBrRW50aXR5KSxcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdCQoeyBma19zdWJqZWN0X2luZm86IHBrRW50aXR5IH0pLFxuICAgICAgdGhpcy5zLmluZiQudGV4dF9wcm9wZXJ0eSQuYnlfZmtfY29uY2VybmVkX2VudGl0eV9pbmRleGVkJChwa0VudGl0eSlcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFt0ZW1wb3JhbEVudGl0eSwgc3RhdGVtZW50cywgdGV4dFByb3BlcnRpZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlczogVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzID0ge1xuICAgICAgICAgIHRlbXBvcmFsRW50aXR5LFxuICAgICAgICAgIHN0YXRlbWVudHM6IHN0YXRlbWVudHMsXG4gICAgICAgICAgdGV4dFByb3BlcnRpZXM6IHZhbHVlcyh0ZXh0UHJvcGVydGllcylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIGdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBpdGVtcyk6IEVudGl0eVByb3BlcnRpZXMge1xuICAgIHJldHVybiB7XG4gICAgICBsaXN0RGVmaW5pdGlvbixcbiAgICAgIGl0ZW1zLFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRpbWUgc3BhbiBpdGVtIGluIHZlcnNpb24gb2YgcHJvamVjdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVRpbWVTcGFuKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxUaW1lU3Bhbkl0ZW0+IHtcblxuICAgIHJldHVybiB0aGlzLnAucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmMucGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKFxuICAgICAgICAgIERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU5cbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChmaWVsZERlZnMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoZmllbGREZWZzLm1hcChmaWVsZERlZiA9PiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICAgICAgICAgIGZrX3Byb3BlcnR5OiBmaWVsZERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXBPcihbXSwgc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgICAgc3RhdGVtZW50cy5tYXAoc3RhdGVtZW50ID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHN0YXRlbWVudC5wa19lbnRpdHkpXG4gICAgICAgICAgICAgICAgICApLnBpcGUobWFwKChbaW5mVGltZVByaW1pdGl2ZSwgcHJvalJlbF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgICAgICAgICAgICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxlbmRhcjogKChwcm9qUmVsLmNhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgIHByb2pSZWwsXG4gICAgICAgICAgICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSksXG4gICAgICAgICAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlczogVGltZVNwYW5Qcm9wZXJ0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb246IGZpZWxkRGVmLmxpc3REZWZpbml0aW9uc1swXSwgaXRlbXNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKS5waXBlKFxuICAgICAgICAgICAgICBtYXAoKHByb3BlcnRpZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXMuZmlsdGVyKHAgPT4gcC5pdGVtcy5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lc3Bhbml0ZW06IFRpbWVTcGFuSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lc3Bhbml0ZW1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbUFwcGVsbGF0aW9uKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuYXBwZWxsYXRpb24kLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBtYXAoYXBwZWxsYXRpb24gPT4ge1xuICAgICAgICBpZiAoIWFwcGVsbGF0aW9uKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3Qgbm9kZTogQXBwZWxsYXRpb25JdGVtID0ge1xuICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgbGFiZWw6IGFwcGVsbGF0aW9uLnN0cmluZyxcbiAgICAgICAgICBma0NsYXNzOiBhcHBlbGxhdGlvbi5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1MYW5ndWFnZShzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgbWFwKGxhbmd1YWdlID0+IHtcbiAgICAgICAgaWYgKCFsYW5ndWFnZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG5vZGU6IExhbmd1YWdlSXRlbSA9IHtcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgIGxhYmVsOiBsYW5ndWFnZS5ub3RlcyxcbiAgICAgICAgICBma0NsYXNzOiBsYW5ndWFnZS5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1QbGFjZShzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8UGxhY2VJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnBsYWNlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgbWFwKHBsYWNlID0+IHtcbiAgICAgICAgaWYgKCFwbGFjZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG5vZGU6IFBsYWNlSXRlbSA9IHtcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgIGxhYmVsOiAnV0dTODQ6ICcgKyBwbGFjZS5sYXQgKyAnwrAsICcgKyBwbGFjZS5sb25nICsgJ8KwJyxcbiAgICAgICAgICBma0NsYXNzOiBwbGFjZS5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1EaW1lbnNpb24oc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuZGltZW5zaW9uJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgc3dpdGNoTWFwKChkaW1lbnNpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KGRpbWVuc2lvbi5ma19tZWFzdXJlbWVudF91bml0KVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKHByZXZpZXcgPT4ge1xuXG4gICAgICAgICAgICAgIGNvbnN0IG5vZGU6IERpbWVuc2lvbkl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICBsYWJlbDogYCR7ZGltZW5zaW9uLm51bWVyaWNfdmFsdWV9ICR7cHJldmlldy5lbnRpdHlfbGFiZWx9YCxcbiAgICAgICAgICAgICAgICBma0NsYXNzOiBkaW1lbnNpb24uZmtfY2xhc3MsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1MYW5nU3RyaW5nKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxMYW5nU3RyaW5nSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5nX3N0cmluZyQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKFxuICAgICAgICAobGFuZ1N0cmluZykgPT4ge1xuICAgICAgICAgIGlmICghbGFuZ1N0cmluZykgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3QobnVsbClcbiAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KGxhbmdTdHJpbmcuZmtfbGFuZ3VhZ2UpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKGxhbmd1YWdlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWxhbmd1YWdlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWwgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAobGFuZ1N0cmluZy5zdHJpbmcpIGxhYmVsID0gbGFuZ1N0cmluZy5zdHJpbmdcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsYW5nU3RyaW5nLnF1aWxsX2RvYyAmJiBsYW5nU3RyaW5nLnF1aWxsX2RvYy5vcHMgJiYgbGFuZ1N0cmluZy5xdWlsbF9kb2Mub3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgbGFiZWwgPSBsYW5nU3RyaW5nLnF1aWxsX2RvYy5vcHMubWFwKG9wID0+IG9wLmluc2VydCkuam9pbignJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGU6IExhbmdTdHJpbmdJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGxhbmdTdHJpbmcuZmtfY2xhc3MsXG4gICAgICAgICAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgIGZrTGFuZ3VhZ2U6IGxhbmdTdHJpbmcuZmtfbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHN0YXRlbWVudDogSW5mU3RhdGVtZW50LCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldygoaXNPdXRnb2luZyA/IHN0YXRlbWVudC5ma19vYmplY3RfaW5mbyA6IHN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pKS5waXBlKFxuICAgICAgLy8gZmlsdGVyKHByZXZpZXcgPT4gIXByZXZpZXcubG9hZGluZyAmJiAhIXByZXZpZXcgJiYgISFwcmV2aWV3LmVudGl0eV90eXBlKSxcbiAgICAgIG1hcChwcmV2aWV3ID0+IHtcbiAgICAgICAgaWYgKCFwcmV2aWV3KSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9kZTogRW50aXR5UHJldmlld0l0ZW0gPSB7XG4gICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICBwcmV2aWV3LFxuICAgICAgICAgIGxhYmVsOiBwcmV2aWV3LmVudGl0eV9sYWJlbCB8fCAnJyxcbiAgICAgICAgICBma0NsYXNzOiBwcmV2aWV3LmZrX2NsYXNzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwa1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVRpbWVQcmltaXRpdmUoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQsIHBrUHJvamVjdCk6IE9ic2VydmFibGU8VGltZVByaW1pdGl2ZUl0ZW0+IHtcbiAgICBpZiAocGtQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgdGhpcy5zLmluZiQudGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgc3RhdGVtZW50LnBrX2VudGl0eSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXAoKFtpbmZUaW1lUHJpbWl0aXZlLCBwcm9qUmVsXSkgPT4ge1xuICAgICAgICAgIGlmICghaW5mVGltZVByaW1pdGl2ZSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgY2FsZW5kYXI6ICgocHJvalJlbC5jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnN0IG5vZGU6IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9KSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW5mUmVwby50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLnBpcGUoXG4gICAgICAgIG1hcChpbmZUaW1lUHJpbWl0aXZlID0+IHtcbiAgICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICBjYWxlbmRhcjogKChzdGF0ZW1lbnQuY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc3Qgbm9kZTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICB9XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICogUGlwZSBhbHRlcm5hdGl2ZXMgKG5vdCBpbiBwcm9qZWN0KVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RMZW5ndGgobDogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHN3aXRjaCAobC5saXN0VHlwZSkge1xuICAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAgICAgY2FzZSAnZW50aXR5LXByZXZpZXcnOlxuICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgY2FzZSAncGxhY2UnOlxuICAgICAgY2FzZSAnbGFuZ1N0cmluZyc6XG4gICAgICBjYXNlICd0ZW1wb3JhbC1lbnRpdHknOlxuICAgICAgY2FzZSAndGltZS1zcGFuJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RTdGF0ZW1lbnRzKGwsIHBrRW50aXR5KS5waXBlKG1hcChpdGVtcyA9PiBpdGVtcy5sZW5ndGgpKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdChsOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEl0ZW1MaXN0PiB7XG4gICAgaWYgKGwubGlzdFR5cGUuYXBwZWxsYXRpb24pIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0QXBwZWxsYXRpb24obCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5lbnRpdHlQcmV2aWV3KSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5ndWFnZSkgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RMYW5ndWFnZShsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnBsYWNlKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdFBsYWNlKGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdERpbWVuc2lvbihsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmdTdHJpbmcpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0TGFuZ1N0cmluZyhsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnRlbXBvcmFsRW50aXR5KSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUluZ29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICogUGlwZSB0aGUgaXRlbXMgaW4gZW50aXR5IHByZXZpZXcgZmllbGRcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdEVudGl0eVByZXZpZXc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpIDpcbiAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpKSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlc1xuICAgICAgICAgICAgICAuZmlsdGVyKG5vZGUgPT4gISFub2RlKVxuICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5vcmROdW0gPiBiLm9yZE51bSA/IDEgOiAtMSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgfSkpXG5cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBwbGFjZSBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1QbGFjZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGRpbWVuc2lvbiBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0RGltZW5zaW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGxhbmdTdHJpbmcgbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdExhbmdTdHJpbmc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gYXBwZWxsYXRpb24gZmllbGRcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RBcHBlbGxhdGlvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGxhbmd1YWdlIGZpZWxkXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogUGlwZSByZXBvIHZpZXdzIChjb21tdW5pdHkgZmF2b3JpdGVzLCB3aGVyZSByZXN0cmljdGVkIGJ5IHF1YW50aWZpZXJzKVxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8qKlxuICAgKiBQaXBlIHJlcG9zaXRvcnkgdGVtcG9yYWwgZW50aXR5IGl0ZW0gaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIFBpcGUgYXBwZWxsYXRpb24gbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgbGFuZ3VhZ2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3RMYW5ndWFnZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgcGxhY2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1QbGFjZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgcGxhY2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3REaW1lbnNpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG4gIC8qKlxuICAqIFBpcGUgdGhlIGl0ZW1zIGluIGVudGl0eSBwcmV2aWV3IGZpZWxkLCBjb25uZWN0ZWQgYnkgY29tbXVuaXR5IGZhdm9yaXRlIHN0YXRlbWVudHNcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gICAgICB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gICAgICB0aGlzLmIucGlwZVJlcG9JbmdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSkpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICAgIC8vIC5zb3J0KChhLCBiKSA9PiBhLm9yZE51bSA+IGIub3JkTnVtID8gMSA6IC0xKVxuICAgICAgICAgICAgKSlcbiAgICAgIH0pLFxuICAgICAgc3RhcnRXaXRoKFtdKVxuICAgIClcblxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSByZXBvIHRpbWUgc3BhbiBpdGVtXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvSXRlbVRpbWVTcGFuKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxUaW1lU3Bhbkl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5wLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jLnBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKFxuICAgICAgICAgIERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU5cbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChmaWVsZERlZmluaXRpb25zID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoZmllbGREZWZpbml0aW9ucy5tYXAoZmllbGREZWYgPT5cbiAgICAgICAgICAgICAgdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShmaWVsZERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcE9yKFtdLCBzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PlxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mUmVwby50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKChpbmZUaW1lUHJpbWl0aXZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXI6ICgoc3RhdGVtZW50LmNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzOiBUaW1lU3BhblByb3BlcnR5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uOiBmaWVsZERlZi5saXN0RGVmaW5pdGlvbnNbMF0sIGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBzdGFydFdpdGgoeyBsaXN0RGVmaW5pdGlvbjogZmllbGREZWYubGlzdERlZmluaXRpb25zWzBdLCBpdGVtczogW10gfSBhcyBUaW1lU3BhblByb3BlcnR5KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgocHJvcGVydGllcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuaXRlbTogVGltZVNwYW5JdGVtID0ge1xuICAgICAgICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllcy5maWx0ZXIocHJvcHMgPT4gcHJvcHMuaXRlbXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVzcGFuaXRlbVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG5cbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgbGFiZWwgb2YgZ2l2ZW4gZW50aXR5XG4gICAqIFRoaXMgd2lsbCB1c2UgZW50aXR5IHByZXZpZXdzIGZvciBnZXR0aW5nIHN0cmluZ3Mgb2YgcmVsYXRlZCB0ZW1wb3JhbCBlbnRpdGllc1xuICAgKiBTbyB0aGlzIG1heSB0YWtlIGEgbGl0dGxlIHdoaWxlXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMYWJlbE9mRW50aXR5KGZrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmIucGlwZUNsYXNzT2ZFbnRpdHkoZmtFbnRpdHkpLnBpcGUoXG5cbiAgICAgIC8vIGdldCB0aGUgZGVmaW5pdGlvbiBvZiB0aGUgZmlyc3QgZmllbGRcbiAgICAgIHN3aXRjaE1hcChma0NsYXNzID0+IHRoaXMuYy5waXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhma0NsYXNzKS5waXBlKFxuICAgICAgICAvLyBnZXQgdGhlIGZpcnN0IGl0ZW0gb2YgdGhhdCBmaWVsZFxuICAgICAgICBzd2l0Y2hNYXAoZmllbGREZWYgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgICAgZmllbGREZWYgJiYgZmllbGREZWYubGVuZ3RoID9cbiAgICAgICAgICAgIGZpZWxkRGVmWzBdLmxpc3REZWZpbml0aW9ucy5tYXAobGlzdERlZiA9PiB0aGlzLnBpcGVFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGZrRW50aXR5LCAxKSkgOlxuICAgICAgICAgICAgW11cbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcChwcm9wcyA9PiB7XG4gICAgICAgICAgICBwcm9wcyA9IHByb3BzLmZpbHRlcihwcm9wID0+IHByb3AuaXRlbXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIGlmIChwcm9wcy5sZW5ndGggJiYgcHJvcHNbMF0uaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9wc1swXS5pdGVtc1swXS5sYWJlbFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICcnXG4gICAgICAgICAgfSlcbiAgICAgICAgKSkpXG4gICAgICApKVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIGNsYXNzIGxhYmVsIG9mIGdpdmVuIGVudGl0eVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQ2xhc3NMYWJlbE9mRW50aXR5KGZrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmIucGlwZUNsYXNzT2ZFbnRpdHkoZmtFbnRpdHkpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtDbGFzcyA9PiB0aGlzLmMucGlwZUNsYXNzTGFiZWwocGtDbGFzcykpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBwa19lbnRpdHkgb2YgdGhlIHR5cGUgb2YgYW4gZW50aXR5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVUeXBlT2ZFbnRpdHkocGtFbnRpdHk6IG51bWJlciwgaGFzVHlwZVByb3BlcnR5OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudD4ge1xuICAgIGlmIChpc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7IGZrX3Byb3BlcnR5OiBoYXNUeXBlUHJvcGVydHksIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHkgfSkucGlwZShtYXAoaXRlbXMgPT4ge1xuICAgICAgICBpZiAoIWl0ZW1zIHx8IE9iamVjdC5rZXlzKGl0ZW1zKS5sZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBlbHNlIHJldHVybiB2YWx1ZXMoaXRlbXMpWzBdXG4gICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoeyBma19wcm9wZXJ0eTogaGFzVHlwZVByb3BlcnR5LCBma19vYmplY3RfaW5mbzogcGtFbnRpdHkgfSkucGlwZShcbiAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICBpZiAoIWl0ZW1zIHx8IE9iamVjdC5rZXlzKGl0ZW1zKS5sZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlcyhpdGVtcylbMF1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlQ2xhc3Nlc0FuZFR5cGVzKGVuYWJsZWRJbjogJ2VudGl0aWVzJyB8ICdzb3VyY2VzJykge1xuICAgIHJldHVybiB0aGlzLmMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXMoZW5hYmxlZEluKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGl0ZW1zID0+IHRoaXMucGlwZUNsYXNzQW5kVHlwZU5vZGVzKGl0ZW1zKSksXG4gICAgKVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzZXNBbmRUeXBlc09mQ2xhc3NlcyhjbGFzc2VzOiBudW1iZXJbXSkge1xuICAgIHJldHVybiB0aGlzLmMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXNPZlR5cGVkQ2xhc3NlcyhjbGFzc2VzKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGl0ZW1zID0+IHRoaXMucGlwZUNsYXNzQW5kVHlwZU5vZGVzKGl0ZW1zKSksXG4gICAgKVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzQW5kVHlwZU5vZGVzKHR5cGVBbmRUeXBlZENsYXNzZXM6IHsgdHlwZWRDbGFzczogbnVtYmVyOyB0eXBlQ2xhc3M6IG51bWJlcjsgfVtdKTogT2JzZXJ2YWJsZTxDbGFzc0FuZFR5cGVOb2RlW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICB0eXBlQW5kVHlwZWRDbGFzc2VzLm1hcChpdGVtID0+IHRoaXMuYy5waXBlQ2xhc3NMYWJlbChpdGVtLnR5cGVkQ2xhc3MpLnBpcGUoXG4gICAgICAgIG1hcChsYWJlbCA9PiAoe1xuICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgIGRhdGE6IHsgcGtDbGFzczogaXRlbS50eXBlZENsYXNzLCBwa1R5cGU6IG51bGwgfVxuICAgICAgICB9IGFzIENsYXNzQW5kVHlwZU5vZGUpKSxcbiAgICAgICAgc3dpdGNoTWFwKG5vZGUgPT4gaWlmKFxuICAgICAgICAgICgpID0+ICEhaXRlbS50eXBlQ2xhc3MsXG4gICAgICAgICAgdGhpcy5iLnBpcGVQZXJzaXN0ZW50SXRlbVBrc0J5Q2xhc3MoaXRlbS50eXBlQ2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAodHlwZVBrcyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgICAgICAgdHlwZVBrcy5tYXAocGtUeXBlID0+IHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KHBrVHlwZSkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAocHJldmlldyA9PiAoe1xuICAgICAgICAgICAgICAgICAgbGFiZWw6IHByZXZpZXcuZW50aXR5X2xhYmVsLFxuICAgICAgICAgICAgICAgICAgZGF0YTogeyBwa0NsYXNzOiBpdGVtLnR5cGVkQ2xhc3MsIHBrVHlwZSB9XG4gICAgICAgICAgICAgICAgfSBhcyBDbGFzc0FuZFR5cGVOb2RlKSlcbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgc29ydEFiYyhuID0+IG4ubGFiZWwpLFxuICAgICAgICAgICAgKSksXG4gICAgICAgICAgICBtYXAoY2hpbGRyZW4gPT4ge1xuICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuID0gY2hpbGRyZW5cbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSxcbiAgICAgICAgICBvZih7IC4uLm5vZGUsIGNoaWxkcmVuOiBbXSB9IGFzIENsYXNzQW5kVHlwZU5vZGUpXG4gICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKSlcbiAgICApLnBpcGUoXG4gICAgICBzb3J0QWJjKChub2RlKSA9PiBub2RlLmxhYmVsKSxcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhcnJheSBvZiBwa19jbGFzcyBvZiBhbGwgY2xhc3NlcyBhbmQgdHlwZWQgY2xhc3Nlcy5cbiAgICogQHBhcmFtIGNsYXNzZXNBbmRUeXBlcyBhIG9iamVjdCBjb250YWluaW5nIHtjbGFzc2VzOiBbXSwgdHlwZXNbXX1cbiAgICovXG4gIHBpcGVDbGFzc2VzRnJvbUNsYXNzZXNBbmRUeXBlcyhjbGFzc2VzQW5kVHlwZXM6IENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIGNvbnN0IHR5cGVkQ2xhc3NlcyQgPSAoIWNsYXNzZXNBbmRUeXBlcyB8fCAhY2xhc3Nlc0FuZFR5cGVzLnR5cGVzIHx8ICFjbGFzc2VzQW5kVHlwZXMudHlwZXMubGVuZ3RoKSA/XG4gICAgICBvZihbXSBhcyBudW1iZXJbXSkgOlxuICAgICAgdGhpcy5iLnBpcGVDbGFzc2VzT2ZQZXJzaXN0ZW50SXRlbXMoY2xhc3Nlc0FuZFR5cGVzLnR5cGVzKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKHBrcykgPT4gISFwa3MpLFxuICAgICAgICAgIHN3aXRjaE1hcCh0eXBlQ2xhc3NlcyA9PiB0aGlzLmMucGlwZVR5cGVkQ2xhc3Nlc09mVHlwZUNsYXNzZXModHlwZUNsYXNzZXMpKVxuICAgICAgICApXG4gICAgcmV0dXJuIHR5cGVkQ2xhc3NlcyQucGlwZShcbiAgICAgIG1hcCh0eXBlZENsYXNzZXMgPT4gdW5pcShbLi4udHlwZWRDbGFzc2VzLCAuLi4oKGNsYXNzZXNBbmRUeXBlcyB8fCB7IGNsYXNzZXM6IFtdIH0pLmNsYXNzZXMgfHwgW10pXSkpXG4gICAgKTtcbiAgfVxuXG4gIHBpcGVQcm9wZXJ0eU9wdGlvbnNGcm9tQ2xhc3Nlc0FuZFR5cGVzKGNsYXNzZXNBbmRUeXBlczogQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwpOiBPYnNlcnZhYmxlPFByb3BlcnR5T3B0aW9uW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlQ2xhc3Nlc0Zyb21DbGFzc2VzQW5kVHlwZXMoY2xhc3Nlc0FuZFR5cGVzKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGNsYXNzZXMgPT4gdGhpcy5waXBlUHJvcGVydHlPcHRpb25zRm9ybUNsYXNzZXMoY2xhc3NlcykpXG4gICAgKVxuICB9XG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVQcm9wZXJ0eU9wdGlvbnNGb3JtQ2xhc3NlcyhjbGFzc2VzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8UHJvcGVydHlPcHRpb25bXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShjbGFzc2VzLm1hcChwa0NsYXNzID0+IHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLnBpcGUoXG4gICAgICBtYXAoYyA9PiBjLmJhc2ljX3R5cGUgPT09IDkpLFxuICAgICAgc3dpdGNoTWFwKGlzVGVFbiA9PiB0aGlzLmMucGlwZVNwZWNpZmljQW5kQmFzaWNGaWVsZHMocGtDbGFzcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGNsYXNzRmllbGRzID0+IGNsYXNzRmllbGRzXG4gICAgICAgICAgICAuZmlsdGVyKGYgPT4gISFmLnByb3BlcnR5LnBrUHJvcGVydHkpXG4gICAgICAgICAgICAubWFwKGYgPT4gKHtcbiAgICAgICAgICAgICAgaXNPdXRnb2luZzogZi5pc091dGdvaW5nLFxuICAgICAgICAgICAgICBma1Byb3BlcnR5RG9tYWluOiBmLmlzT3V0Z29pbmcgPyBmLnNvdXJjZUNsYXNzIDogbnVsbCxcbiAgICAgICAgICAgICAgZmtQcm9wZXJ0eVJhbmdlOiBmLmlzT3V0Z29pbmcgPyBudWxsIDogZi5zb3VyY2VDbGFzcyxcbiAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogZi5wcm9wZXJ0eS5wa1Byb3BlcnR5XG4gICAgICAgICAgICB9KSkpLFxuICAgICAgICAgIHN3aXRjaE1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICBpZiAoaXNUZUVuKSB7XG4gICAgICAgICAgICAgIC8vIGFkZCB0aW1lIHByb3BlcnRpZXMgKGF0IHNvbWUgdGltZSB3aXRoaW4sIC4uLilcbiAgICAgICAgICAgICAgRGZoQ29uZmlnLlBST1BFUlRZX1BLU19XSEVSRV9USU1FX1BSSU1JVElWRV9JU19SQU5HRS5tYXAocGtQcm9wZXJ0eSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgZmtQcm9wZXJ0eURvbWFpbjogcGtDbGFzcyxcbiAgICAgICAgICAgICAgICAgIGZrUHJvcGVydHlSYW5nZTogRGZoQ29uZmlnLkNMQVNTX1BLX1RJTUVfUFJJTUlUSVZFLFxuICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShpdGVtcy5tYXAoaXRlbSA9PiB0aGlzLmMucGlwZUZpZWxkTGFiZWwoXG4gICAgICAgICAgICAgIGl0ZW0ucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgaXRlbS5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICAgICAgICBpdGVtLmZrUHJvcGVydHlSYW5nZSxcbiAgICAgICAgICAgICkucGlwZShtYXAobGFiZWwgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc091dGdvaW5nID0gaXRlbS5pc091dGdvaW5nO1xuICAgICAgICAgICAgICBjb25zdCBvOiBQcm9wZXJ0eU9wdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICAgIHBrOiBpdGVtLnBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgcHJvcGVydHlGaWVsZEtleTogcHJvcGVydHlPcHRpb25GaWVsZEtleShpdGVtLnBrUHJvcGVydHksIGlzT3V0Z29pbmcpXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgfSkpKSk7XG4gICAgICAgICAgfSkpKVxuICAgIClcblxuXG4gICAgKSkucGlwZShtYXAoeSA9PiBmbGF0dGVuPFByb3BlcnR5T3B0aW9uPih5KSkpO1xuICB9XG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVQa0NsYXNzZXNGcm9tUHJvcGVydHlTZWxlY3RNb2RlbChtb2RlbDogUHJvcGVydHlTZWxlY3RNb2RlbCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICBbXG4gICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5vdXRnb2luZ1Byb3BlcnRpZXMsIHRydWUpLFxuICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwuaW5nb2luZ1Byb3BlcnRpZXMsIGZhbHNlKSxcbiAgICAgIF1cbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFtvdXQsIGluZ10pID0+IHVuaXEoWy4uLm91dCwgLi4uaW5nXSkpXG4gICAgKVxuICB9XG5cbiAgZ2V0UGtDbGFzc2VzRnJvbVByb3BlcnR5U2VsZWN0TW9kZWwkKG1vZGVsJDogT2JzZXJ2YWJsZTxQcm9wZXJ0eVNlbGVjdE1vZGVsPik6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gbW9kZWwkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAobW9kZWwgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIFtcbiAgICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwub3V0Z29pbmdQcm9wZXJ0aWVzLCB0cnVlKSxcbiAgICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwuaW5nb2luZ1Byb3BlcnRpZXMsIGZhbHNlKSxcbiAgICAgICAgXVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXAoKFtvdXQsIGluZ10pID0+IHVuaXEoWy4uLm91dCwgLi4uaW5nXSkpXG4gICAgICApKVxuICAgIClcbiAgfVxuXG5cblxuICBnZXRQcm9wZXJ0eU9wdGlvbnMkKGNsYXNzVHlwZXMkOiBPYnNlcnZhYmxlPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsPik6IE9ic2VydmFibGU8UHJvcGVydHlPcHRpb25bXT4ge1xuICAgIHJldHVybiBjbGFzc1R5cGVzJC5waXBlPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsLCBQcm9wZXJ0eU9wdGlvbltdPihcbiAgICAgIC8vIG1ha2Ugc3VyZSBvbmx5IGl0IHBhc3NlcyBvbmx5IGlmIGRhdGEgb2YgdGhlIGFycmF5Q2xhc3NlcyBhcmUgY2hhbmdlZCAobm90IGNoaWxkcmVuKVxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQ8Q2xhc3NBbmRUeXBlU2VsZWN0TW9kZWw+KChhLCBiKSA9PiB7XG4gICAgICAgIHJldHVybiBlcXVhbHMoYSwgYik7XG4gICAgICB9KSxcbiAgICAgIHN3aXRjaE1hcCgoeCkgPT4gIXggPyBlbXB0eSgpIDogdGhpcy5iLnBpcGVDbGFzc2VzT2ZQZXJzaXN0ZW50SXRlbXMoeC50eXBlcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChwa3MpID0+ICEhcGtzKSxcbiAgICAgICAgICBzd2l0Y2hNYXAodHlwZUNsYXNzZXMgPT4gdGhpcy5jLnBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHR5cGVDbGFzc2VzKS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKHR5cGVkQ2xhc3NlcyA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSB1bmlxKFsuLi50eXBlZENsYXNzZXMsIC4uLih4LmNsYXNzZXMgfHwgW10pXSk7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVQcm9wZXJ0eU9wdGlvbnNGb3JtQ2xhc3NlcyhjbGFzc2VzKVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eU9wdGlvbkZpZWxkS2V5KGZrUHJvcGVydHk6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IHN0cmluZyB7XG4gIHJldHVybiAnXycgKyBma1Byb3BlcnR5ICsgJ18nICsgKGlzT3V0Z29pbmcgPyAnb3V0Z29pbmcnIDogJ2luZ29pbmcnKTtcbn1cblxuIl19