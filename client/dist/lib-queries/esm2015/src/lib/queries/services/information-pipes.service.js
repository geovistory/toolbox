/**
 * @fileoverview added by tsickle
 * Generated from: services/information-pipes.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { combineLatestOrEmpty, sortAbc, TimePrimitivePipe, TimeSpanPipe, TimeSpanUtil } from '@kleiolab/lib-utils';
import { equals, flatten, uniq, values } from 'ramda';
import { BehaviorSubject, combineLatest, empty, iif, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { cache, spyTag } from '../decorators/method-decorators';
import { infTimePrimToTimePrimWithCal } from '../functions/functions';
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
    /*********************************************************************
       * Pipe the project entities
       *********************************************************************/
    //   // @spyTag
    //   pipeListLength(l: Subfield, pkEntity: number): Observable<number> {
    //     switch (l.listType) {
    //       case 'appellation':
    //       case 'entity-preview':
    //       case 'language':
    //       case 'place':
    //       case 'dimension':
    //       case 'langString':
    //       case 'temporal-entity':
    //         return this.pipeList(l, pkEntity).pipe(map(items => items.length))
    //       case 'time-span':
    //         return combineLatest(
    //           this.b.pipeOutgoingStatementsByProperty(72, pkEntity),
    //           this.b.pipeOutgoingStatementsByProperty(71, pkEntity),
    //           this.b.pipeOutgoingStatementsByProperty(150, pkEntity),
    //           this.b.pipeOutgoingStatementsByProperty(151, pkEntity),
    //           this.b.pipeOutgoingStatementsByProperty(152, pkEntity),
    //           this.b.pipeOutgoingStatementsByProperty(153, pkEntity)
    //         ).pipe(
    //           tap((x) => {
    //           }),
    //           map(items => items.filter(x => x.length > 0).length))
    //       // case 'text-property':
    //       //   return this.pipeListTextProperty(l, pkEntity).pipe(map(items => items.length))
    //       default:
    //         console.warn('unsupported listType')
    //         return new BehaviorSubject(0);
    //     }
    //   }
    //   // @spyTag
    //   pipeList(l: Subfield, pkEntity, limit?: number): Observable<ItemList> {
    //     if (l.listType.appellation) return this.pipeListAppellation(l, pkEntity, limit)
    //     else if (l.listType.entityPreview) return this.pipeListEntityPreview(l, pkEntity, limit)
    //     else if (l.listType.language) return this.pipeListLanguage(l, pkEntity, limit)
    //     else if (l.listType.place) return this.pipeListPlace(l, pkEntity, limit)
    //     else if (l.listType.dimension) return this.pipeListDimension(l, pkEntity, limit)
    //     else if (l.listType.langString) return this.pipeListLangString(l, pkEntity, limit)
    //     else if (l.listType.temporalEntity) return this.pipeListEntityPreview(l, pkEntity, limit)
    //     else if (l.listType.timeSpan) {
    //       return this.pipeItemTimeSpan(pkEntity).pipe(
    //         map((ts) => [ts].filter(i => i.properties.length > 0))
    //       )
    //     }
    //     else console.warn('unsupported listType')
    //   }
    //   // @spyTag
    //   pipeListBasicStatementItems(listDefinition: Subfield, pkEntity: number, pkProject: number): Observable<BasicStatementItem[]> {
    //     return (listDefinition.isOutgoing ?
    //       this.b.pipeOutgoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject) :
    //       this.b.pipeIngoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject)
    //     )
    //   }
    //   /**
    //    * Pipe the items in appellation field
    //    */
    //   // @spyTag
    //   pipeListAppellation<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<AppellationItem[]> {
    //     return this.b.pipeStatementsOfList(listDefinition, pkEntity)
    //       .pipe(
    //         switchMap((statements) => {
    //           return combineLatest(statements.map((r, i) => this.pipeItemAppellation(r)))
    //             .pipe(
    //               map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //               limitTo(limit),
    //               startWith([]))
    //         }))
    //   }
    //   /**
    //  * Pipe the items in entity preview field
    //  */
    //   // @spyTag
    //   pipeListEntityPreview<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<EntityPreviewItem[]> {
    //     return this.b.pipeStatementsOfList(listDefinition, pkEntity)
    //       .pipe(
    //         tag(`before-${pkEntity}-${listDefinition.property.pkProperty}-${listDefinition.targetClass}`),
    //         switchMap((statements) => {
    //           return combineLatest(statements.map((r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing)))
    //             .pipe(
    //               map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)
    //                 .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1),
    //                 limitTo(limit),
    //               ),
    //               startWith([])
    //             )
    //         }),
    //         tag(`after-${pkEntity}-${listDefinition.property.pkProperty}-${listDefinition.targetClass}`),
    //       )
    //   }
    //   // @spyTag
    //   pipeListLanguage<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<LanguageItem[]> {
    //     return this.b.pipeStatementsOfList(listDefinition, pkEntity)
    //       .pipe(
    //         switchMap((statements) => {
    //           return combineLatest(statements.map((r, i) => this.pipeItemLanguage(r)))
    //             .pipe(
    //               map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //               limitTo(limit),
    //               startWith([]))
    //         }))
    //   }
    //   /**
    //    * Pipe the items in place list
    //    */
    //   // @spyTag
    //   pipeListPlace<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<PlaceItem[]> {
    //     return this.b.pipeStatementsOfList(listDefinition, pkEntity)
    //       .pipe(
    //         switchMap((statements) => {
    //           return combineLatest(statements.map((r, i) => this.pipeItemPlace(r)))
    //             .pipe(
    //               map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //               limitTo(limit),
    //               startWith([]))
    //         }))
    //   }
    //   /**
    //    * Pipe the items in place list
    //    */
    //   // @spyTag
    //   pipeListDimension<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<DimensionItem[]> {
    //     return this.b.pipeStatementsOfList(listDefinition, pkEntity)
    //       .pipe(
    //         switchMap((statements) => {
    //           return combineLatest(statements.map((r, i) => this.pipeItemDimension(r)))
    //             .pipe(
    //               map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //               limitTo(limit),
    //               startWith([]))
    //         }))
    //   }
    //   /**
    //  * Pipe the items in langString list
    //  */
    //   // @spyTag
    //   pipeListLangString<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<LangStringItem[]> {
    //     return this.b.pipeStatementsOfList(listDefinition, pkEntity)
    //       .pipe(
    //         switchMap((statements) => {
    //           return combineLatest(statements.map((r, i) => this.pipeItemLangString(r)))
    //             .pipe(
    //               map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //               limitTo(limit),
    //               startWith([]))
    //         }))
    //   }
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
     * @param {?} targets
     * @return {?}
     */
    pipeTargetOfStatement(stmt, page, targets) {
        /** @type {?} */
        const isOutgoing = page.isOutgoing;
        /** @type {?} */
        const targetInfo = isOutgoing ? stmt.fk_object_info : stmt.fk_subject_info;
        // here you could add targetData or targetCell
        return this.s.inf$.getModelOfEntity$(targetInfo).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x)), switchMap((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            /** @type {?} */
            const subfieldType = targets[item.fkClass];
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
                        targetClass: appellation.fk_class,
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
                        targetClass: place.fk_class,
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
                            targetClass: dimension.fk_class,
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
                            targetClass: langString.fk_class,
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
                        targetClass: language.fk_class,
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
                        targetClass: entityPreview.fk_class,
                        target: {
                            entityPreview
                        }
                    };
                    return stmtTarget;
                })));
            }
            else if (subfieldType.temporalEntity) {
                return this.s.inf$.temporal_entity$._by_pk_entity$.key(targetInfo).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x)), map((/**
                 * @param {?} temporalEntity
                 * @return {?}
                 */
                temporalEntity => {
                    /** @type {?} */
                    const stmtTarget = {
                        statement: stmt,
                        isOutgoing,
                        targetLabel: ``,
                        targetClass: temporalEntity.fk_class,
                        target: {
                            entity: {
                                pkEntity: temporalEntity.pk_entity,
                                fkClass: temporalEntity.fk_class
                            }
                        }
                    };
                    return stmtTarget;
                })));
                // console.log('subfieldType.temporalEntity.length', subfieldType.temporalEntity.length)
                // // for each of these subfields
                // const subentityPages$ = subfieldType.temporalEntity.map(subfieldReq => {
                //   // console.log('subentity subfield for targetInfo', targetInfo)
                //   // create page:GvSubfieldPage
                //   const { isCircular, ...p } = subfieldReq.page
                //   const scope = page.scope.notInProject ? { inRepo: true } : page.scope
                //   const nestedPage: GvFieldPage = {
                //     ...p,
                //     fkSourceEntity: targetInfo,
                //     scope,
                //   }
                //   return this.pipeSubfieldPage(nestedPage, subfieldReq.subfieldType).pipe(
                //     map(({ count, statements }) => {
                //       const { limit, offset, ...s } = nestedPage;
                //       const subentitySubfieldPage: SubentitySubfieldPage = {
                //         subfield: s,
                //         count,
                //         statements
                //       }
                //       return subentitySubfieldPage
                //     }),
                //     // startWith(undefined) // TODO remove! this is for debugging
                //   )
                // })
                // return combineLatestOrEmpty(subentityPages$)
                //   .pipe(
                //     // filter(subfields => {
                //     //   console.log('subfields\n', subfields.map((item, i) => {
                //     //     const req = subfieldType.temporalEntity[i]
                //     //     const fieldInfo = targetInfo + '_' + req.page.fkProperty + '_' + req.page.targetClass + '_' + keys(req.subfieldType)[0]
                //     //     return `${i}: ${item === undefined ?
                //     //       `undefined ${fieldInfo}` :
                //     //       `ok        ${fieldInfo}`
                //     //       }`
                //     //   }).join('\n'))
                //     //   return !subfields.includes(undefined)
                //     // }),
                //     map(
                //       subfields => {
                //         const stmtTarget: StatementTarget = {
                //           statement: stmt,
                //           isOutgoing,
                //           targetLabel: '',
                //           targetClass: page.targetClass,
                //           target: {
                //             entity: {
                //               pkEntity: targetInfo,
                //               subfields
                //             }
                //           }
                //         }
                //         return stmtTarget
                //       }
                //     )
                //   )
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
                            targetClass: timePrimitive.fk_class,
                            target: {
                                timePrimitive: timePrimWithCal
                            }
                        };
                        return stmtTarget;
                    })));
                })));
            }
            throw new Error(`No implementation found for subfieldType ${JSON.stringify(subfieldType)}`);
        })));
    }
    /**
     * pipe target and projRel of the given statement
     * @param {?} stmt
     * @param {?} page
     * @param {?} targets
     * @return {?}
     */
    pipeStatementWithTarget(stmt, page, targets) {
        return combineLatest(this.pipeTargetOfStatement(stmt, page, targets), this.pipeProjRelOfStatement(stmt, page)).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([target, projRel]) => (Object.assign({}, target, projRel)))));
    }
    /**
     * @param {?} page
     * @param {?} targets
     * @return {?}
     */
    pipeSubfieldPage(page, targets) {
        if (page.fkProperty === DfhConfig.PROPERTY_PK_HAS_TIME_SPAN && page.isOutgoing) {
            // if timeSpan make a short cut: produce a virtual statementWithTarget from entity to timeSpan
            return this.pipeTimeSpan(page);
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
            stmt => this.pipeStatementWithTarget(stmt, page, targets))))))))))).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            ([count, statements]) => ({ count, statements }))));
        }
    }
    /**
     * @private
     * @param {?} page
     * @return {?}
     */
    pipeTimeSpan(page) {
        /** @type {?} */
        const virtualStatementToTimeSpan = { fk_object_info: page.fkSourceEntity };
        /** @type {?} */
        const targets = { [DfhConfig.ClASS_PK_TIME_SPAN]: { timeSpan: 'true' } }
        // console.log('subfieldType.temporalEntity.length', subfieldType.temporalEntity.length)
        // for each of these subfields
        ;
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
                fkSourceEntity: page.fkSourceEntity,
                scope,
            };
            /** @type {?} */
            const subfType = {
                timePrimitive: 'true'
            };
            /** @type {?} */
            const trgts = {
                [DfhConfig.CLASS_PK_TIME_PRIMITIVE]: subfType
            };
            return this.pipeSubfieldPage(nestedPage, trgts).pipe(map((/**
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
                statement: virtualStatementToTimeSpan,
                isOutgoing: page.isOutgoing,
                targetLabel: this.timeSpanPipe.transform(new TimeSpanUtil(timeSpanPreview)),
                targetClass: DfhConfig.ClASS_PK_TIME_SPAN,
                target: {
                    timeSpan: {
                        preview: timeSpanPreview,
                        subfields
                    }
                }
            };
            return stmtTarget;
        }))).pipe(map((/**
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
    // /**
    //  * Pipe the temporal entities connected to given entity by statements that are in the current project
    //  */
    // // @spyTag
    // // pipeTemporalEntityTableRows(
    // //   paginateBy: PaginateByParam[],
    // //   limit: number,
    // //   offset: number,
    // //   pkProject: number,
    // //   listDefinition: Subfield,
    // //   fieldDefinitions: Field[],
    // //   alternative = false): Observable<TemporalEntityItem[]> {
    // //   // const propertyItemType = this.propertyItemType(fieldDefinitions)
    // //   const targetEntityOfStatementItem = (r: BasicStatementItem) => r.isOutgoing ? r.statement.fk_object_info : r.statement.fk_subject_info;
    // //   // prepare page loader
    // //   const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;
    // //   // prepare basic statement item loader
    // //   const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
    // //     return alternative ?
    // //       this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
    // //       this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    // //   }
    // //   // prepare TeEnRow loader
    // //   const rowLoader = (targetEntityPk, fieldDef, pkProj) => {
    // //     return alternative ?
    // //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, null, true) :
    // //       this.pipeItemTeEnRow(targetEntityPk, fieldDef, pkProj, false)
    // //   }
    // //   const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)
    // //   const rows$ = paginatedStatementPks$.pipe(
    // //     switchMap((paginatedStatementPks) => combineLatestOrEmpty(
    // //       paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
    // //         .pipe(filter(x => !!x))
    // //       )
    // //     )
    // //       .pipe(
    // //         switchMap((teEnStatement) => combineLatestOrEmpty(
    // //           teEnStatement.map((basicStatementItem) => {
    // //             const pkTeEn = targetEntityOfStatementItem(basicStatementItem);
    // //             return combineLatest(
    // //               rowLoader(
    // //                 pkTeEn,
    // //                 fieldDefinitions,
    // //                 // propertyItemType,
    // //                 pkProject
    // //               ),
    // //               this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + pkTeEn)
    // //             ).pipe(
    // //               map(([row, teEnProjRel]) => {
    // //                 const item: TemporalEntityItem = {
    // //                   ...basicStatementItem,
    // //                   row,
    // //                   pkEntity: pkTeEn,
    // //                   teEnProjRel
    // //                 };
    // //                 return item
    // //               })
    // //             )
    // //           })
    // //         )),
    // //       )),
    // //   )
    // //   return rows$
    // // }
    // // @spyTag
    // pipeItemTeEnRow(pkEntity: number, fieldDefinitions: Field[], pkProject: number, repo: boolean): Observable<TemporalEntityRow> {
    //   // pipe outgoing statements
    //   const outgoingStatements$ = repo ? this.b.pipeRepoOutgoingStatements(pkEntity) : this.b.pipeOutgoingStatements(pkEntity);
    //   // pipe ingoing statements
    //   const ingoingStatements$ = repo ? this.b.pipeRepoIngoingStatements(pkEntity) : this.b.pipeIngoingStatements(pkEntity);
    //   // pipe all statements with information leaf items
    //   const outgoingItems$: Observable<StatementItem[]> = outgoingStatements$.pipe(
    //     switchMap(statements => combineLatestOrEmpty(
    //       statements
    //         .filter(statement => !!statement.fk_object_info) // remove statements not pointing to information
    //         .map(s => {
    //           const isOutgoing = true;
    //           return this.pipeItem(s, pkProject, isOutgoing);
    //         })
    //     ))
    //   )
    //   const ingoingItems$: Observable<StatementItem[]> = ingoingStatements$.pipe(
    //     switchMap(statements => combineLatestOrEmpty(
    //       statements
    //         .filter(statement => !!statement.fk_subject_info) // remove statements not pointing to information
    //         .map(s => {
    //           const isOutgoing = false;
    //           return this.pipeItem(s, pkProject, isOutgoing);
    //         })
    //     ))
    //   )
    //   const sortItems = repo ?
    //     (item: StatementItem[]) => item.sort((a, b) => a.statement.is_in_project_count > b.statement.is_in_project_count ? 1 : -1) :
    //     (item: StatementItem[]) => item;
    //   return combineLatest(outgoingItems$, ingoingItems$).pipe(
    //     map(([outgoingItems, ingoingItems]) => {
    //       const groupedOut = groupBy((i) => (i && i.statement ? i.statement.fk_property.toString() : undefined), outgoingItems);
    //       const groupedIn = groupBy((i) => (i && i.statement ? i.statement.fk_property.toString() : undefined), ingoingItems);
    //       return { groupedOut, groupedIn }
    //     }),
    //     // auditTime(10),
    //     map((d) => {
    //       const row: TemporalEntityRow = {}
    //       fieldDefinitions.forEach(fieldDefinition => {
    //         let cell: TemporalEntityCell;
    //         fieldDefinition.listDefinitions.forEach(listDefinition => {
    //           if (listDefinition.listType.timeSpan) {
    //             const t = pick(['71', '72', '150', '151', '152', '153'], d.groupedOut);
    //             const keys = Object.keys(t);
    //             const itemsCount = keys.length;
    //             let label;
    //             if (itemsCount > 0) {
    //               const timeSpanKeys: CtrlTimeSpanDialogResult = {}
    //               keys.forEach(key => { timeSpanKeys[key] = t[key][0].timePrimitive })
    //               const timeSpan = TimeSpanUtil.fromTimeSpanDialogData(timeSpanKeys);
    //               label = this.timeSpanPipe.transform(timeSpan);
    //             }
    //             cell = {
    //               isOutgoing: listDefinition.isOutgoing,
    //               itemsCount,
    //               label,
    //               entityPreview: undefined,
    //               pkProperty: undefined,
    //               isTimeSpan: true
    //             }
    //           }
    //           else {
    //             if (listDefinition.isOutgoing) {
    //               if (d.groupedOut[listDefinition.property.pkProperty]) {
    //                 const items = sortItems(d.groupedOut[listDefinition.property.pkProperty])
    //                 const firstItem = items[0];
    //                 cell = {
    //                   isOutgoing: listDefinition.isOutgoing,
    //                   itemsCount: items.length,
    //                   entityPreview: ((firstItem || {}) as EntityPreviewItem).preview,
    //                   label: firstItem.label,
    //                   pkProperty: listDefinition.property.pkProperty,
    //                   firstItem,
    //                   items
    //                 }
    //               }
    //             } else {
    //               if (d.groupedIn[listDefinition.property.pkProperty]) {
    //                 const items = sortItems(d.groupedIn[listDefinition.property.pkProperty])
    //                 const firstItem = items[0];
    //                 cell = {
    //                   isOutgoing: listDefinition.isOutgoing,
    //                   itemsCount: items.length,
    //                   entityPreview: ((firstItem || {}) as EntityPreviewItem).preview,
    //                   label: firstItem.label,
    //                   pkProperty: listDefinition.property.pkProperty,
    //                   firstItem,
    //                   items
    //                 }
    //               }
    //             }
    //           }
    //         })
    //         row[fieldDefinition.label] = cell;
    //       })
    //       return row
    //     })
    //   )
    // }
    // // @spyTag
    // private pipeItem(r: InfStatement, pkProject: number, propIsOutgoing: boolean) {
    //   const targetEntity = propIsOutgoing ? r.fk_object_info : r.fk_subject_info;
    //   return this.s.inf$.getModelOfEntity$(targetEntity).pipe(
    //     switchMap(m => {
    //       const modelName: InfModelName = m ? m.modelName : undefined;
    //       switch (modelName) {
    //         case 'appellation':
    //           return this.pipeItemAppellation(r);
    //         case 'language':
    //           return this.pipeItemLanguage(r);
    //         case 'place':
    //           return this.pipeItemPlace(r);
    //         case 'dimension':
    //           return this.pipeItemDimension(r);
    //         case 'lang_string':
    //           return this.pipeItemLangString(r);
    //         case 'time_primitive':
    //           return this.pipeItemTimePrimitive(r, pkProject); // TODO: emits twice
    //         default:
    //           return this.pipeItemEntityPreview(r, propIsOutgoing);
    //       }
    //     })
    //   )
    // }
    // // @spyTag
    // pipeEntityProperties(listDef: Subfield, fkEntity: number, limit?: number): Observable<EntityProperties> {
    //   if (listDef.listType.appellation) {
    //     return this.pipeListAppellation(listDef, fkEntity, limit)
    //       .pipe(map((items) => this.getEntityProperties(listDef, items)))
    //   }
    //   else if (listDef.listType.language) {
    //     return this.pipeListLanguage(listDef, fkEntity, limit)
    //       .pipe(map((items) => this.getEntityProperties(listDef, items)))
    //   }
    //   else if (listDef.listType.place) {
    //     return this.pipeListPlace(listDef, fkEntity, limit)
    //       .pipe(map((items) => this.getEntityProperties(listDef, items)))
    //   }
    //   else if (listDef.listType.dimension) {
    //     return this.pipeListDimension(listDef, fkEntity, limit)
    //       .pipe(map((items) => this.getEntityProperties(listDef, items)))
    //   }
    //   else if (listDef.listType.langString) {
    //     return this.pipeListLangString(listDef, fkEntity, limit)
    //       .pipe(map((items) => this.getEntityProperties(listDef, items)))
    //   }
    //   else if (listDef.listType.entityPreview || listDef.listType.temporalEntity) {
    //     return this.pipeListEntityPreview(listDef, fkEntity, limit)
    //       .pipe(map((items) => this.getEntityProperties(listDef, items)))
    //   }
    //   else if (listDef.listType.timeSpan) {
    //     return this.pipeItemTimeSpan(fkEntity)
    //       .pipe(map((item) => {
    //         const items = item.properties.find(p => p.items.length > 0) ? [{
    //           label: this.timeSpanPipe.transform(timeSpanItemToTimeSpan(item)),
    //           properties: [] // TODO check if the properties or the item are really not needed
    //         }] : []
    //         return {
    //           listDefinition: listDef,
    //           items
    //         }
    //       }))
    //   }
    //   else return of(null)
    // }
    // // @spyTag
    // pipeTemporalEntityRemoveProperties(pkEntity: number): Observable<TemporalEntityRemoveProperties> {
    //   return combineLatest(
    //     this.s.inf$.temporal_entity$.by_pk_entity_key$(pkEntity),
    //     this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity }),
    //     this.s.inf$.text_property$.by_fk_concerned_entity_indexed$(pkEntity)
    //   ).pipe(
    //     map(([temporalEntity, statements, textProperties]) => {
    //       const res: TemporalEntityRemoveProperties = {
    //         temporalEntity,
    //         statements: statements,
    //         textProperties: values(textProperties)
    //       }
    //       return res
    //     })
    //   )
    // }
    // getEntityProperties(listDefinition: Subfield, items): EntityProperties {
    //   return {
    //     listDefinition,
    //     items,
    //   }
    // }
    // /**
    //  * Pipe time span item in version of project
    //  */
    // // @spyTag
    // pipeItemTimeSpan(pkEntity): Observable<TimeSpanItem> {
    //   return this.p.pkProject$.pipe(
    //     switchMap(pkProject => {
    //       return this.c.pipeSpecificFieldOfClass(
    //         DfhConfig.ClASS_PK_TIME_SPAN
    //       ).pipe(
    //         switchMap(fieldDefs => {
    //           return combineLatest(fieldDefs.map(fieldDef => this.s.inf$.statement$.by_subject_and_property$({
    //             fk_property: fieldDef.property.pkProperty,
    //             fk_subject_info: pkEntity
    //           })
    //             .pipe(
    //               switchMapOr([], statements => combineLatest(
    //                 statements.map(statement => combineLatest(
    //                   this.s.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter(x => !!x)),
    //                   this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity)
    //                 ).pipe(map(([infTimePrimitive, projRel]) => {
    //                   const timePrimitive = new TimePrimitive({
    //                     julianDay: infTimePrimitive.julian_day,
    //                     calendar: ((projRel.calendar || 'gregorian') as CalendarType),
    //                     duration: (infTimePrimitive.duration as Granularity)
    //                   })
    //                   const item: TimePrimitiveItem = {
    //                     statement,
    //                     ordNum: undefined,
    //                     projRel,
    //                     timePrimitive,
    //                     label: this.timePrimitivePipe.transform(timePrimitive),
    //                     fkClass: infTimePrimitive.fk_class
    //                   }
    //                   return item;
    //                 }))
    //                 )
    //               )),
    //               map(items => {
    //                 const res: TimeSpanProperty = {
    //                   listDefinition: fieldDef.listDefinitions[0], items
    //                 }
    //                 return res
    //               })
    //             )
    //           )).pipe(
    //             map((properties) => {
    //               const props = properties.filter(p => p.items.length > 0);
    //               const timespanitem: TimeSpanItem = {
    //                 label: '',
    //                 properties: props
    //               }
    //               return timespanitem
    //             })
    //           )
    //         })
    //       )
    //     })
    //   )
    // }
    // // @spyTag
    // pipeItemAppellation(statement: InfStatement): Observable<AppellationItem> {
    //   return this.s.inf$.appellation$.by_pk_entity$.key(statement.fk_object_info).pipe(
    //     filter(x => !!x),
    //     map(appellation => {
    //       if (!appellation) return null;
    //       const node: AppellationItem = {
    //         ordNum: undefined,
    //         projRel: undefined,
    //         statement,
    //         label: appellation.string,
    //         fkClass: appellation.fk_class
    //       }
    //       return node
    //     }))
    // }
    // // @spyTag
    // pipeItemLanguage(statement: InfStatement): Observable<LanguageItem> {
    //   return this.s.inf$.language$.by_pk_entity$.key(statement.fk_object_info).pipe(
    //     filter(x => !!x),
    //     map(language => {
    //       if (!language) return null;
    //       const node: LanguageItem = {
    //         ordNum: undefined,
    //         projRel: undefined,
    //         statement,
    //         label: language.notes,
    //         fkClass: language.fk_class
    //       }
    //       return node
    //     }))
    // }
    // // @spyTag
    // pipeItemPlace(statement: InfStatement): Observable<PlaceItem> {
    //   return this.s.inf$.place$.by_pk_entity$.key(statement.fk_object_info).pipe(
    //     filter(x => !!x),
    //     map(place => {
    //       if (!place) return null;
    //       const node: PlaceItem = {
    //         ordNum: undefined,
    //         projRel: undefined,
    //         statement,
    //         label: 'WGS84: ' + place.lat + '°, ' + place.long + '°',
    //         fkClass: place.fk_class
    //       }
    //       return node
    //     }))
    // }
    // // @spyTag
    // pipeItemDimension(statement: InfStatement): Observable<DimensionItem> {
    //   return this.s.inf$.dimension$.by_pk_entity$.key(statement.fk_object_info).pipe(
    //     filter(x => !!x),
    //     switchMap((dimension) => {
    //       return this.p.streamEntityPreview(dimension.fk_measurement_unit)
    //         .pipe(
    //           map(preview => {
    //             const node: DimensionItem = {
    //               ordNum: undefined,
    //               projRel: undefined,
    //               statement,
    //               label: `${dimension.numeric_value} ${preview.entity_label}`,
    //               fkClass: dimension.fk_class,
    //             }
    //             return node
    //           })
    //         )
    //     })
    //   )
    // }
    // // @spyTag
    // pipeItemLangString(statement: InfStatement): Observable<LangStringItem> {
    //   return this.s.inf$.lang_string$.by_pk_entity$.key(statement.fk_object_info).pipe(
    //     switchMap(
    //       (langString) => {
    //         if (!langString) return new BehaviorSubject(null)
    //         return this.s.inf$.language$.by_pk_entity$.key(langString.fk_language)
    //           .pipe(
    //             map(language => {
    //               if (!language) return null;
    //               let label = '';
    //               if (langString.string) label = langString.string
    //               else if (langString.quill_doc && langString.quill_doc.ops && langString.quill_doc.ops.length) {
    //                 label = langString.quill_doc.ops.map(op => op.insert).join('');
    //               }
    //               const node: LangStringItem = {
    //                 ordNum: undefined,
    //                 projRel: undefined,
    //                 statement,
    //                 label,
    //                 fkClass: langString.fk_class,
    //                 language,
    //                 fkLanguage: langString.fk_language
    //               }
    //               return node
    //             })
    //           )
    //       })
    //   )
    // }
    // // @spyTag
    // pipeItemEntityPreview(statement: InfStatement, isOutgoing: boolean): Observable<EntityPreviewItem> {
    //   return this.p.streamEntityPreview((isOutgoing ? statement.fk_object_info : statement.fk_subject_info)).pipe(
    //     // filter(preview => !preview.loading && !!preview && !!preview.entity_type),
    //     map(preview => {
    //       if (!preview) {
    //         return null;
    //       }
    //       const node: EntityPreviewItem = {
    //         ordNum: undefined,
    //         projRel: undefined,
    //         statement,
    //         preview,
    //         label: preview.entity_label || '',
    //         fkClass: preview.fk_class
    //       }
    //       return node
    //     }))
    // }
    // /**
    //  * @param pk
    //  */
    // // @spyTag
    // pipeItemTimePrimitive(statement: InfStatement, pkProject): Observable<TimePrimitiveItem> {
    //   if (pkProject) {
    //     return combineLatest(
    //       this.s.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter(x => !!x)),
    //       this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity).pipe(filter(x => !!x))
    //     ).pipe(
    //       map(([infTimePrimitive, projRel]) => {
    //         if (!infTimePrimitive) return null;
    //         const timePrimitive = new TimePrimitive({
    //           julianDay: infTimePrimitive.julian_day,
    //           calendar: ((projRel.calendar || 'gregorian') as CalendarType),
    //           duration: (infTimePrimitive.duration as Granularity)
    //         })
    //         const node: TimePrimitiveItem = {
    //           ordNum: undefined,
    //           projRel: undefined,
    //           statement,
    //           timePrimitive,
    //           label: this.timePrimitivePipe.transform(timePrimitive),
    //           fkClass: infTimePrimitive.fk_class
    //         }
    //         return node
    //       }))
    //   } else {
    //     return this.infRepo.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter(x => !!x)).pipe(
    //       map(infTimePrimitive => {
    //         const timePrimitive = new TimePrimitive({
    //           julianDay: infTimePrimitive.julian_day,
    //           calendar: ((statement.community_favorite_calendar || 'gregorian') as CalendarType),
    //           duration: (infTimePrimitive.duration as Granularity)
    //         })
    //         const node: TimePrimitiveItem = {
    //           ordNum: undefined,
    //           projRel: undefined,
    //           statement,
    //           timePrimitive,
    //           label: this.timePrimitivePipe.transform(timePrimitive),
    //           fkClass: infTimePrimitive.fk_class
    //         }
    //         return node
    //       })
    //     )
    //   }
    // }
    // /*********************************************************************
    // * Pipe alternatives (not in project)
    // *********************************************************************/
    // // @spyTag
    // pipeAltListLength(l: Subfield, pkEntity: number): Observable<number> {
    //   switch (l.listType) {
    //     case 'appellation':
    //     case 'entity-preview':
    //     case 'language':
    //     case 'place':
    //     case 'langString':
    //     case 'temporal-entity':
    //     case 'time-span':
    //       return this.pipeAltListStatements(l, pkEntity).pipe(map(items => items.length))
    //     default:
    //       console.warn('unsupported listType')
    //       break;
    //   }
    // }
    // // @spyTag
    // pipeAltList(l: Subfield, pkEntity): Observable<ItemList> {
    //   if (l.listType.appellation) return this.pipeAltListAppellation(l, pkEntity)
    //   else if (l.listType.entityPreview) return this.pipeAltListEntityPreview(l, pkEntity)
    //   else if (l.listType.language) return this.pipeAltListLanguage(l, pkEntity)
    //   else if (l.listType.place) return this.pipeAltListPlace(l, pkEntity)
    //   else if (l.listType.dimension) return this.pipeAltListDimension(l, pkEntity)
    //   else if (l.listType.langString) return this.pipeAltListLangString(l, pkEntity)
    //   else if (l.listType.temporalEntity) return this.pipeAltListEntityPreview(l, pkEntity)
    //   else console.warn('unsupported listType')
    // }
    // // @spyTag
    // pipeAltListStatements(listDefinition: Subfield, pkEntity: number): Observable<InfStatement[]> {
    //   return (listDefinition.isOutgoing ?
    //     this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity) :
    //     this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity)
    //   )
    // }
    // /**
    // * Pipe the items in entity preview field
    // */
    // // @spyTag
    // pipeAltListEntityPreview<T>(listDefinition: Subfield, pkEntity): Observable<EntityPreviewItem[]> {
    //   return (listDefinition.isOutgoing ?
    //     this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity) :
    //     this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity)
    //   ).pipe(
    //     switchMap((statements) => {
    //       return combineLatest(statements.map((r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing)))
    //         .pipe(
    //           map(nodes => nodes
    //             .filter(node => !!node)
    //             .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1)
    //           ),
    //           startWith([]))
    //     }))
    // }
    // /**
    //  * Pipe the alternative items in place list
    //  */
    // // @spyTag
    // pipeAltListPlace<T>(listDefinition: Subfield, pkEntity): Observable<PlaceItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemPlace(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    //  * Pipe the alternative items in dimension list
    //  */
    // // @spyTag
    // pipeAltListDimension<T>(listDefinition: Subfield, pkEntity): Observable<DimensionItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemDimension(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    //  * Pipe the alternative items in langString list
    //  */
    // // @spyTag
    // pipeAltListLangString<T>(listDefinition: Subfield, pkEntity): Observable<LangStringItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemLangString(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    //  * Pipe the alternative items in appellation field
    //  */
    // // @spyTag
    // pipeAltListAppellation<T>(listDefinition: Subfield, pkEntity): Observable<AppellationItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemAppellation(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    //  * Pipe the alternative items in language field
    //  */
    // // @spyTag
    // pipeAltListLanguage<T>(listDefinition: Subfield, pkEntity): Observable<LanguageItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemLanguage(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /*********************************************************************
    //  * Pipe repo views (community favorites, where restricted by quantifiers)
    //  *********************************************************************/
    // /**
    //  * Pipe repository temporal entity item in the way it is defined by the repository
    //  */
    // /**
    //  * Pipe appellation list in the way it is defined by the repository
    //  */
    // // @spyTag
    // pipeRepoListAppellation<T>(listDefinition: Subfield, pkEntity): Observable<AppellationItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemAppellation(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    // * Pipe language list in the way it is defined by the repository
    // */
    // // @spyTag
    // pipeRepoListLanguage<T>(listDefinition: Subfield, pkEntity): Observable<LanguageItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemLanguage(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    //  * Pipe place list in the way it is defined by the repository
    //  */
    // // @spyTag
    // pipeRepoListPlace<T>(listDefinition: Subfield, pkEntity): Observable<PlaceItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemPlace(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    // * Pipe place list in the way it is defined by the repository
    // */
    // // @spyTag
    // pipeRepoListDimension<T>(listDefinition: Subfield, pkEntity): Observable<DimensionItem[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(
    //       switchMap((statements) => {
    //         return combineLatest(statements.map((r, i) => this.pipeItemDimension(r)))
    //           .pipe(
    //             map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
    //             startWith([]))
    //       }))
    //   }
    // }
    // /**
    // * Pipe the items in entity preview field, connected by community favorite statements
    // */
    // // @spyTag
    // pipeRepoListEntityPreview<T>(listDefinition: Subfield, pkEntity): Observable<EntityPreviewItem[]> {
    //   return (listDefinition.isOutgoing ?
    //     this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity) :
    //     this.b.pipeRepoIngoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity)
    //   ).pipe(
    //     switchMap((statements) => {
    //       return combineLatest(statements.map((r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing)))
    //         .pipe(
    //           map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)
    //             // .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1)
    //           ))
    //     }),
    //     startWith([])
    //   )
    // }
    // /**
    //  * Pipe repo time span item
    //  */
    // // @spyTag
    // pipeRepoItemTimeSpan(pkEntity): Observable<TimeSpanItem> {
    //   return this.p.pkProject$.pipe(
    //     switchMap(pkProject => {
    //       return this.c.pipeBasicAndSpecificFields(
    //         DfhConfig.ClASS_PK_TIME_SPAN
    //       ).pipe(
    //         switchMap(fieldDefinitions => {
    //           return combineLatest(fieldDefinitions.map(fieldDef =>
    //             this.b.pipeRepoOutgoingStatementsByProperty(fieldDef.property.pkProperty, pkEntity)
    //               .pipe(
    //                 switchMapOr([], statements => combineLatest(
    //                   statements.map(statement =>
    //                     this.infRepo.time_primitive$.by_pk_entity$.key(statement.fk_object_info)
    //                       .pipe(map((infTimePrimitive) => {
    //                         const timePrimitive = new TimePrimitive({
    //                           julianDay: infTimePrimitive.julian_day,
    //                           calendar: ((statement.community_favorite_calendar || 'gregorian') as CalendarType),
    //                           duration: (infTimePrimitive.duration as Granularity)
    //                         })
    //                         const item: TimePrimitiveItem = {
    //                           statement,
    //                           ordNum: undefined,
    //                           projRel: undefined,
    //                           timePrimitive,
    //                           label: this.timePrimitivePipe.transform(timePrimitive),
    //                           fkClass: infTimePrimitive.fk_class
    //                         }
    //                         return item;
    //                       }))
    //                   )
    //                 )),
    //                 map(items => {
    //                   const res: TimeSpanProperty = {
    //                     listDefinition: fieldDef.listDefinitions[0], items
    //                   }
    //                   return res
    //                 }),
    //                 startWith({ listDefinition: fieldDef.listDefinitions[0], items: [] } as TimeSpanProperty)
    //               )
    //           )).pipe(
    //             map((properties) => {
    //               const timespanitem: TimeSpanItem = {
    //                 label: '',
    //                 properties: properties.filter(props => props.items.length > 0)
    //               }
    //               return timespanitem
    //             })
    //           )
    //         })
    //       )
    //     })
    //   )
    // }
    /**
     * Pipes the label of given entity
     * This will use entity previews for getting strings of related temporal entities
     * So this may take a little while
     * @param {?} fkEntity
     * @return {?}
     */
    // @spyTag
    pipeLabelOfEntity(fkEntity) {
        return this.p.streamEntityPreview(fkEntity).pipe(map((/**
         * @param {?} p
         * @return {?}
         */
        p => p.entity_label)));
        // return this.b.pipeClassOfEntity(fkEntity).pipe(
        //   // get the definition of the first field
        //   switchMap(fkClass => this.c.pipeBasicAndSpecificFields(fkClass).pipe(
        //     // get the first item of that field
        //     switchMap(fields => this.pipeSubfieldPage(field[0],).pipe(
        //       map(props => {
        //         props = props.filter(prop => prop.items.length > 0)
        //         if (props.length && props[0].items.length) {
        //           return props[0].items[0].label
        //         }
        //         return ''
        //       })
        //     )))
        //   ))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbmZvcm1hdGlvbi1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuSCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBTXRFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUs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Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBczRCRCxpQkFBaUIsQ0FBQyxRQUFnQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7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akMsb0NBQW9DOztJQUNwQyxvREFBMkM7Ozs7O0lBQzNDLCtDQUFrQzs7Ozs7OztBQWlyRHRDLE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxVQUFrQixFQUFFLFVBQW1CO0lBQzVFLE9BQU8sR0FBRyxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaENvbmZpZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItY29uZmlnJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgSW5mU3RhdGVtZW50IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEd2RmllbGRQYWdlLCBHdkZpZWxkVGFyZ2V0cywgR3ZUYXJnZXRUeXBlLCBUaW1lUHJpbWl0aXZlV2l0aENhbCwgV2FyRW50aXR5UHJldmlld1RpbWVTcGFuIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3RPckVtcHR5LCBzb3J0QWJjLCBUaW1lUHJpbWl0aXZlUGlwZSwgVGltZVNwYW5QaXBlLCBUaW1lU3BhblV0aWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IGVxdWFscywgZmxhdHRlbiwgdW5pcSwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBlbXB0eSwgaWlmLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjYWNoZSwgc3B5VGFnIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9tZXRob2QtZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBpbmZUaW1lUHJpbVRvVGltZVByaW1XaXRoQ2FsIH0gZnJvbSAnLi4vZnVuY3Rpb25zL2Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBDbGFzc0FuZFR5cGVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL0NsYXNzQW5kVHlwZU5vZGUnO1xuaW1wb3J0IHsgQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwnO1xuaW1wb3J0IHsgUHJvcGVydHlPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvUHJvcGVydHlPcHRpb24nO1xuaW1wb3J0IHsgUHJvcGVydHlTZWxlY3RNb2RlbCB9IGZyb20gJy4uL21vZGVscy9Qcm9wZXJ0eVNlbGVjdE1vZGVsJztcbmltcG9ydCB7IFN0YXRlbWVudFByb2pSZWwsIFN0YXRlbWVudFRhcmdldCwgU3RhdGVtZW50V2l0aFRhcmdldCwgU3ViZW50aXR5U3ViZmllbGRQYWdlLCBTdWJmaWVsZFBhZ2UgfSBmcm9tICcuLi9tb2RlbHMvU3RhdGVtZW50V2l0aFRhcmdldCc7XG5pbXBvcnQgeyBJbmZTZWxlY3RvciB9IGZyb20gJy4uL3NlbGVjdG9ycy9pbmYuc2VydmljZSc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25QaXBlc1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24tcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbkJhc2ljUGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9pbmZvcm1hdGlvbi1iYXNpYy1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5cblxuXG5cblxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuLyoqXG4gKiBUaGlzIFNlcnZpY2UgcHJvdmlkZXMgYSBjb2xsZWNpb24gb2YgcGlwZXMgdGhhdCBhZ2dyZWdhdGUgb3IgdHJhbnNmb3JtIGluZm9ybWF0aW9uLlxuICogRm9yIEV4YW1wbGVcbiAqIC0gdGhlIGxpc3RzIG9mIHRleHQgcHJvcGVydGllcywgYXBwZWxsYWl0b25zLCBwbGFjZXMsIHRpbWUtcHJpbWl0aXZlcyAvIHRpbWUtc3BhbnMgZXRjLlxuICogLSB0aGUgbGFiZWwgb2YgdGVtcG9yYWwgZW50aXR5IG9yIHBlcnNpc3RlbnQgaXRlbVxuICpcbiAqIFRoaXMgbWFpbmx5IHNlbGVjdHMgZGF0YSBmcm9tIHRoZSBpbmZvcm1hdGlvbiBzY2hlbWEgYW5kIHRoZSByZWxhdGlvbiB0byBwcm9qZWN0cy5cbiAqIEl0IGNvbWJpbmVzIHBpcGVzIHNlbGVjdGluZyBkYXRhIGZyb20gdGhlXG4gKiAtIGFjdGl2YXRlZCBwcm9qZWN0XG4gKiAtIGFsdGVybmF0aXZlcyAobm90IGluIHByb2plY3QgYnV0IGluIG90aGVycylcbiAqIC0gcmVwb1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uUGlwZXNTZXJ2aWNlIHtcblxuICBpbmZSZXBvOiBJbmZTZWxlY3RvcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGI6IEluZm9ybWF0aW9uQmFzaWNQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBwOiBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgICBwcml2YXRlIGM6IENvbmZpZ3VyYXRpb25QaXBlc1NlcnZpY2UsXG4gICAgcHVibGljIHRpbWVQcmltaXRpdmVQaXBlOiBUaW1lUHJpbWl0aXZlUGlwZSxcbiAgICBwcml2YXRlIHRpbWVTcGFuUGlwZTogVGltZVNwYW5QaXBlLFxuICAgIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPlxuICApIHtcbiAgICB0aGlzLmluZlJlcG8gPSBuZXcgSW5mU2VsZWN0b3IobmdSZWR1eCwgb2YoJ3JlcG8nKSlcbiAgfVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBQaXBlIHRoZSBwcm9qZWN0IGVudGl0aWVzXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgLy8gICAvLyBAc3B5VGFnXG4gIC8vICAgcGlwZUxpc3RMZW5ndGgobDogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAvLyAgICAgc3dpdGNoIChsLmxpc3RUeXBlKSB7XG4gIC8vICAgICAgIGNhc2UgJ2FwcGVsbGF0aW9uJzpcbiAgLy8gICAgICAgY2FzZSAnZW50aXR5LXByZXZpZXcnOlxuICAvLyAgICAgICBjYXNlICdsYW5ndWFnZSc6XG4gIC8vICAgICAgIGNhc2UgJ3BsYWNlJzpcbiAgLy8gICAgICAgY2FzZSAnZGltZW5zaW9uJzpcbiAgLy8gICAgICAgY2FzZSAnbGFuZ1N0cmluZyc6XG4gIC8vICAgICAgIGNhc2UgJ3RlbXBvcmFsLWVudGl0eSc6XG4gIC8vICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3QobCwgcGtFbnRpdHkpLnBpcGUobWFwKGl0ZW1zID0+IGl0ZW1zLmxlbmd0aCkpXG5cbiAgLy8gICAgICAgY2FzZSAndGltZS1zcGFuJzpcbiAgLy8gICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgLy8gICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MiwgcGtFbnRpdHkpLFxuICAvLyAgICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDcxLCBwa0VudGl0eSksXG4gIC8vICAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUwLCBwa0VudGl0eSksXG4gIC8vICAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUxLCBwa0VudGl0eSksXG4gIC8vICAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUyLCBwa0VudGl0eSksXG4gIC8vICAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUzLCBwa0VudGl0eSlcbiAgLy8gICAgICAgICApLnBpcGUoXG4gIC8vICAgICAgICAgICB0YXAoKHgpID0+IHtcblxuICAvLyAgICAgICAgICAgfSksXG4gIC8vICAgICAgICAgICBtYXAoaXRlbXMgPT4gaXRlbXMuZmlsdGVyKHggPT4geC5sZW5ndGggPiAwKS5sZW5ndGgpKVxuXG4gIC8vICAgICAgIC8vIGNhc2UgJ3RleHQtcHJvcGVydHknOlxuICAvLyAgICAgICAvLyAgIHJldHVybiB0aGlzLnBpcGVMaXN0VGV4dFByb3BlcnR5KGwsIHBrRW50aXR5KS5waXBlKG1hcChpdGVtcyA9PiBpdGVtcy5sZW5ndGgpKVxuXG4gIC8vICAgICAgIGRlZmF1bHQ6XG4gIC8vICAgICAgICAgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gIC8vICAgICAgICAgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gIC8vICAgICB9XG4gIC8vICAgfVxuXG4gIC8vICAgLy8gQHNweVRhZ1xuICAvLyAgIHBpcGVMaXN0KGw6IFN1YmZpZWxkLCBwa0VudGl0eSwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEl0ZW1MaXN0PiB7XG4gIC8vICAgICBpZiAobC5saXN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuIHRoaXMucGlwZUxpc3RBcHBlbGxhdGlvbihsLCBwa0VudGl0eSwgbGltaXQpXG4gIC8vICAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmVudGl0eVByZXZpZXcpIHJldHVybiB0aGlzLnBpcGVMaXN0RW50aXR5UHJldmlldyhsLCBwa0VudGl0eSwgbGltaXQpXG4gIC8vICAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmd1YWdlKSByZXR1cm4gdGhpcy5waXBlTGlzdExhbmd1YWdlKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgLy8gICAgIGVsc2UgaWYgKGwubGlzdFR5cGUucGxhY2UpIHJldHVybiB0aGlzLnBpcGVMaXN0UGxhY2UobCwgcGtFbnRpdHksIGxpbWl0KVxuICAvLyAgICAgZWxzZSBpZiAobC5saXN0VHlwZS5kaW1lbnNpb24pIHJldHVybiB0aGlzLnBpcGVMaXN0RGltZW5zaW9uKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgLy8gICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ1N0cmluZykgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5nU3RyaW5nKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgLy8gICAgIGVsc2UgaWYgKGwubGlzdFR5cGUudGVtcG9yYWxFbnRpdHkpIHJldHVybiB0aGlzLnBpcGVMaXN0RW50aXR5UHJldmlldyhsLCBwa0VudGl0eSwgbGltaXQpXG4gIC8vICAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnRpbWVTcGFuKSB7XG4gIC8vICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtVGltZVNwYW4ocGtFbnRpdHkpLnBpcGUoXG4gIC8vICAgICAgICAgbWFwKCh0cykgPT4gW3RzXS5maWx0ZXIoaSA9PiBpLnByb3BlcnRpZXMubGVuZ3RoID4gMCkpXG4gIC8vICAgICAgIClcbiAgLy8gICAgIH1cbiAgLy8gICAgIGVsc2UgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gIC8vICAgfVxuXG4gIC8vICAgLy8gQHNweVRhZ1xuICAvLyAgIHBpcGVMaXN0QmFzaWNTdGF0ZW1lbnRJdGVtcyhsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIHBrUHJvamVjdDogbnVtYmVyKTogT2JzZXJ2YWJsZTxCYXNpY1N0YXRlbWVudEl0ZW1bXT4ge1xuICAvLyAgICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgLy8gICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ0Jhc2ljU3RhdGVtZW50SXRlbXNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5LCBwa1Byb2plY3QpIDpcbiAgLy8gICAgICAgdGhpcy5iLnBpcGVJbmdvaW5nQmFzaWNTdGF0ZW1lbnRJdGVtc0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHksIHBrUHJvamVjdClcbiAgLy8gICAgIClcbiAgLy8gICB9XG5cbiAgLy8gICAvKipcbiAgLy8gICAgKiBQaXBlIHRoZSBpdGVtcyBpbiBhcHBlbGxhdGlvbiBmaWVsZFxuICAvLyAgICAqL1xuICAvLyAgIC8vIEBzcHlUYWdcbiAgLy8gICBwaXBlTGlzdEFwcGVsbGF0aW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEFwcGVsbGF0aW9uSXRlbVtdPiB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgLy8gICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpKSlcbiAgLy8gICAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gIC8vICAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgICB9KSlcbiAgLy8gICB9XG5cbiAgLy8gICAvKipcbiAgLy8gICogUGlwZSB0aGUgaXRlbXMgaW4gZW50aXR5IHByZXZpZXcgZmllbGRcbiAgLy8gICovXG4gIC8vICAgLy8gQHNweVRhZ1xuICAvLyAgIHBpcGVMaXN0RW50aXR5UHJldmlldzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAvLyAgICAgICAucGlwZShcbiAgLy8gICAgICAgICB0YWcoYGJlZm9yZS0ke3BrRW50aXR5fS0ke2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHl9LSR7bGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3N9YCksXG4gIC8vICAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZykpKVxuICAvLyAgICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpXG4gIC8vICAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5vcmROdW0gPiBiLm9yZE51bSA/IDEgOiAtMSksXG4gIC8vICAgICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgLy8gICAgICAgICAgICAgICApLFxuICAvLyAgICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSlcbiAgLy8gICAgICAgICAgICAgKVxuICAvLyAgICAgICAgIH0pLFxuICAvLyAgICAgICAgIHRhZyhgYWZ0ZXItJHtwa0VudGl0eX0tJHtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5fS0ke2xpc3REZWZpbml0aW9uLnRhcmdldENsYXNzfWApLFxuICAvLyAgICAgICApXG5cbiAgLy8gICB9XG5cblxuICAvLyAgIC8vIEBzcHlUYWdcbiAgLy8gICBwaXBlTGlzdExhbmd1YWdlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbVtdPiB7XG5cbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAvLyAgICAgICAucGlwZShcbiAgLy8gICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2UocikpKVxuICAvLyAgICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgLy8gICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICAgIH0pKVxuICAvLyAgIH1cblxuICAvLyAgIC8qKlxuICAvLyAgICAqIFBpcGUgdGhlIGl0ZW1zIGluIHBsYWNlIGxpc3RcbiAgLy8gICAgKi9cbiAgLy8gICAvLyBAc3B5VGFnXG4gIC8vICAgcGlwZUxpc3RQbGFjZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxQbGFjZUl0ZW1bXT4ge1xuXG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgLy8gICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbVBsYWNlKHIpKSlcbiAgLy8gICAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gIC8vICAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgICB9KSlcbiAgLy8gICB9XG5cbiAgLy8gICAvKipcbiAgLy8gICAgKiBQaXBlIHRoZSBpdGVtcyBpbiBwbGFjZSBsaXN0XG4gIC8vICAgICovXG4gIC8vICAgLy8gQHNweVRhZ1xuICAvLyAgIHBpcGVMaXN0RGltZW5zaW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW1bXT4ge1xuXG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgLy8gICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gIC8vICAgICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAvLyAgICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgICAgfSkpXG4gIC8vICAgfVxuXG4gIC8vICAgLyoqXG4gIC8vICAqIFBpcGUgdGhlIGl0ZW1zIGluIGxhbmdTdHJpbmcgbGlzdFxuICAvLyAgKi9cbiAgLy8gICAvLyBAc3B5VGFnXG4gIC8vICAgcGlwZUxpc3RMYW5nU3RyaW5nPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPExhbmdTdHJpbmdJdGVtW10+IHtcblxuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gIC8vICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5nU3RyaW5nKHIpKSlcbiAgLy8gICAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gIC8vICAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgICB9KSlcblxuICAvLyAgIH1cblxuICAvKipcbiAgICogcGlwZSB0aGUgcHJvamVjdCByZWxhdGlvbiBvZiBnaXZlbiBzdGF0bWVudCwgaWYgdGhlIHNjb3BlIG9mIHRoaXMgcGFnZSBpcyBpblByb2plY3RcbiAgICogQHBhcmFtIHN0bXQgSW5mU3RhdGVtZW50IHRvIGJlIGNvbXBsZXRlZCB3aXRoIHByb2pSZWxcbiAgICogQHBhcmFtIHBhZ2UgcGFnZSBmb3Igd2hpY2ggd2UgYXJlIHBpcGluZyB0aGlzIHN0dWZmXG4gICAqL1xuICBwaXBlUHJvalJlbE9mU3RhdGVtZW50KHN0bXQ6IEluZlN0YXRlbWVudCwgcGFnZTogR3ZGaWVsZFBhZ2UpOiBPYnNlcnZhYmxlPFN0YXRlbWVudFByb2pSZWw+IHtcbiAgICBpZiAocGFnZS5zY29wZS5pblByb2plY3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkXG4gICAgICAgIC5rZXkocGFnZS5zY29wZS5pblByb2plY3QgKyAnXycgKyBzdG10LnBrX2VudGl0eSkucGlwZShcbiAgICAgICAgICBtYXAoXG4gICAgICAgICAgICBwcm9qUmVsID0+ICh7XG4gICAgICAgICAgICAgIHByb2pSZWwsXG4gICAgICAgICAgICAgIG9yZE51bTogcGFnZS5pc091dGdvaW5nID8gcHJvalJlbC5vcmRfbnVtX29mX3JhbmdlIDogcHJvalJlbC5vcmRfbnVtX29mX2RvbWFpblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3Qoe1xuICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgIG9yZE51bTogMFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIHBpcGUgdGhlIHRhcmdldCBvZiBnaXZlbiBzdGF0bWVudFxuICAgKiBAcGFyYW0gc3RtdCBJbmZTdGF0ZW1lbnQgdG8gYmUgY29tcGxldGVkIHdpdGggdGFyZ2V0XG4gICAqIEBwYXJhbSBwYWdlIHBhZ2UgZm9yIHdoaWNoIHdlIGFyZSBwaXBpbmcgdGhpcyBzdHVmZlxuICAgKiBAcGFyYW0gc3ViZmllbGRUeXBlIHR5cGUgb2Ygc3ViZmllbGQgZm9yIHdoaWNoIHdlIHBpcGUgdGhpcyBzdHVmZlxuICAgKi9cbiAgcGlwZVRhcmdldE9mU3RhdGVtZW50KHN0bXQ6IEluZlN0YXRlbWVudCwgcGFnZTogR3ZGaWVsZFBhZ2UsIHRhcmdldHM6IEd2RmllbGRUYXJnZXRzKTogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRUYXJnZXQ+IHtcbiAgICBjb25zdCBpc091dGdvaW5nID0gcGFnZS5pc091dGdvaW5nXG4gICAgY29uc3QgdGFyZ2V0SW5mbyA9IGlzT3V0Z29pbmcgPyBzdG10LmZrX29iamVjdF9pbmZvIDogc3RtdC5ma19zdWJqZWN0X2luZm87XG4gICAgLy8gaGVyZSB5b3UgY291bGQgYWRkIHRhcmdldERhdGEgb3IgdGFyZ2V0Q2VsbFxuXG5cbiAgICByZXR1cm4gdGhpcy5zLmluZiQuZ2V0TW9kZWxPZkVudGl0eSQodGFyZ2V0SW5mbykucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBzd2l0Y2hNYXAoaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IHN1YmZpZWxkVHlwZTogR3ZUYXJnZXRUeXBlID0gdGFyZ2V0c1tpdGVtLmZrQ2xhc3NdXG4gICAgICAgIGlmIChzdWJmaWVsZFR5cGUuYXBwZWxsYXRpb24pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQuYXBwZWxsYXRpb24kLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICAgICAgbWFwKGFwcGVsbGF0aW9uID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIHRhcmdldExhYmVsOiBhcHBlbGxhdGlvbi5zdHJpbmcsXG4gICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IGFwcGVsbGF0aW9uLmZrX2NsYXNzLFxuICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgYXBwZWxsYXRpb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS5wbGFjZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5wbGFjZSQuYnlfcGtfZW50aXR5JC5rZXkodGFyZ2V0SW5mbykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgICAgICBtYXAocGxhY2UgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IGBXR1M4NDogJHtwbGFjZS5sYXR9wrAsICR7cGxhY2UubG9uZ33CsGAsXG4gICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHBsYWNlLmZrX2NsYXNzLFxuICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgcGxhY2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS5kaW1lbnNpb24pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQuZGltZW5zaW9uJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgICAgICAgIHN3aXRjaE1hcChkaW1lbnNpb24gPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoZGltZW5zaW9uLmZrX21lYXN1cmVtZW50X3VuaXQpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIHVuaXRQcmV2aWV3ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IGAke2RpbWVuc2lvbi5udW1lcmljX3ZhbHVlfSAke3VuaXRQcmV2aWV3LmVudGl0eV9sYWJlbH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IGRpbWVuc2lvbi5ma19jbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLmxhbmdTdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ19zdHJpbmckLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKGxhbmdTdHJpbmcgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KGxhbmdTdHJpbmcuZmtfbGFuZ3VhZ2UpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IGAke2xhbmdTdHJpbmcuc3RyaW5nfSAoJHtsYW5ndWFnZS5pc282MzkxfSlgLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IGxhbmdTdHJpbmcuZmtfY2xhc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZ1N0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUubGFuZ3VhZ2UpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICAgICAgbWFwKGxhbmd1YWdlID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIHRhcmdldExhYmVsOiBgJHtsYW5ndWFnZS5ub3RlcyB8fCBsYW5ndWFnZS5pc282MzkxfWAsXG4gICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IGxhbmd1YWdlLmZrX2NsYXNzLFxuICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS5lbnRpdHlQcmV2aWV3IHx8IHN1YmZpZWxkVHlwZS50eXBlSXRlbSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgICAgICAgIG1hcChlbnRpdHlQcmV2aWV3ID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIHRhcmdldExhYmVsOiBgJHtlbnRpdHlQcmV2aWV3LmVudGl0eV9sYWJlbH1gLFxuICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBlbnRpdHlQcmV2aWV3LmZrX2NsYXNzLFxuICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgZW50aXR5UHJldmlld1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUudGVtcG9yYWxFbnRpdHkpIHtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnMuaW5mJC50ZW1wb3JhbF9lbnRpdHkkLl9ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgICAgICAgIG1hcCh0ZW1wb3JhbEVudGl0eSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogYGAsXG4gICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHRlbXBvcmFsRW50aXR5LmZrX2NsYXNzLFxuICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgZW50aXR5OiB7XG4gICAgICAgICAgICAgICAgICAgIHBrRW50aXR5OiB0ZW1wb3JhbEVudGl0eS5wa19lbnRpdHksXG4gICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IHRlbXBvcmFsRW50aXR5LmZrX2NsYXNzXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc3ViZmllbGRUeXBlLnRlbXBvcmFsRW50aXR5Lmxlbmd0aCcsIHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eS5sZW5ndGgpXG5cbiAgICAgICAgICAvLyAvLyBmb3IgZWFjaCBvZiB0aGVzZSBzdWJmaWVsZHNcbiAgICAgICAgICAvLyBjb25zdCBzdWJlbnRpdHlQYWdlcyQgPSBzdWJmaWVsZFR5cGUudGVtcG9yYWxFbnRpdHkubWFwKHN1YmZpZWxkUmVxID0+IHtcblxuICAgICAgICAgIC8vICAgLy8gY29uc29sZS5sb2coJ3N1YmVudGl0eSBzdWJmaWVsZCBmb3IgdGFyZ2V0SW5mbycsIHRhcmdldEluZm8pXG5cbiAgICAgICAgICAvLyAgIC8vIGNyZWF0ZSBwYWdlOkd2U3ViZmllbGRQYWdlXG4gICAgICAgICAgLy8gICBjb25zdCB7IGlzQ2lyY3VsYXIsIC4uLnAgfSA9IHN1YmZpZWxkUmVxLnBhZ2VcbiAgICAgICAgICAvLyAgIGNvbnN0IHNjb3BlID0gcGFnZS5zY29wZS5ub3RJblByb2plY3QgPyB7IGluUmVwbzogdHJ1ZSB9IDogcGFnZS5zY29wZVxuICAgICAgICAgIC8vICAgY29uc3QgbmVzdGVkUGFnZTogR3ZGaWVsZFBhZ2UgPSB7XG4gICAgICAgICAgLy8gICAgIC4uLnAsXG4gICAgICAgICAgLy8gICAgIGZrU291cmNlRW50aXR5OiB0YXJnZXRJbmZvLFxuICAgICAgICAgIC8vICAgICBzY29wZSxcbiAgICAgICAgICAvLyAgIH1cblxuICAgICAgICAgIC8vICAgcmV0dXJuIHRoaXMucGlwZVN1YmZpZWxkUGFnZShuZXN0ZWRQYWdlLCBzdWJmaWVsZFJlcS5zdWJmaWVsZFR5cGUpLnBpcGUoXG4gICAgICAgICAgLy8gICAgIG1hcCgoeyBjb3VudCwgc3RhdGVtZW50cyB9KSA9PiB7XG4gICAgICAgICAgLy8gICAgICAgY29uc3QgeyBsaW1pdCwgb2Zmc2V0LCAuLi5zIH0gPSBuZXN0ZWRQYWdlO1xuICAgICAgICAgIC8vICAgICAgIGNvbnN0IHN1YmVudGl0eVN1YmZpZWxkUGFnZTogU3ViZW50aXR5U3ViZmllbGRQYWdlID0ge1xuICAgICAgICAgIC8vICAgICAgICAgc3ViZmllbGQ6IHMsXG4gICAgICAgICAgLy8gICAgICAgICBjb3VudCxcbiAgICAgICAgICAvLyAgICAgICAgIHN0YXRlbWVudHNcbiAgICAgICAgICAvLyAgICAgICB9XG4gICAgICAgICAgLy8gICAgICAgcmV0dXJuIHN1YmVudGl0eVN1YmZpZWxkUGFnZVxuICAgICAgICAgIC8vICAgICB9KSxcbiAgICAgICAgICAvLyAgICAgLy8gc3RhcnRXaXRoKHVuZGVmaW5lZCkgLy8gVE9ETyByZW1vdmUhIHRoaXMgaXMgZm9yIGRlYnVnZ2luZ1xuICAgICAgICAgIC8vICAgKVxuICAgICAgICAgIC8vIH0pXG5cbiAgICAgICAgICAvLyByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoc3ViZW50aXR5UGFnZXMkKVxuICAgICAgICAgIC8vICAgLnBpcGUoXG4gICAgICAgICAgLy8gICAgIC8vIGZpbHRlcihzdWJmaWVsZHMgPT4ge1xuICAgICAgICAgIC8vICAgICAvLyAgIGNvbnNvbGUubG9nKCdzdWJmaWVsZHNcXG4nLCBzdWJmaWVsZHMubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgLy8gICAgIC8vICAgICBjb25zdCByZXEgPSBzdWJmaWVsZFR5cGUudGVtcG9yYWxFbnRpdHlbaV1cbiAgICAgICAgICAvLyAgICAgLy8gICAgIGNvbnN0IGZpZWxkSW5mbyA9IHRhcmdldEluZm8gKyAnXycgKyByZXEucGFnZS5ma1Byb3BlcnR5ICsgJ18nICsgcmVxLnBhZ2UudGFyZ2V0Q2xhc3MgKyAnXycgKyBrZXlzKHJlcS5zdWJmaWVsZFR5cGUpWzBdXG4gICAgICAgICAgLy8gICAgIC8vICAgICByZXR1cm4gYCR7aX06ICR7aXRlbSA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAvLyAgICAgLy8gICAgICAgYHVuZGVmaW5lZCAke2ZpZWxkSW5mb31gIDpcbiAgICAgICAgICAvLyAgICAgLy8gICAgICAgYG9rICAgICAgICAke2ZpZWxkSW5mb31gXG4gICAgICAgICAgLy8gICAgIC8vICAgICAgIH1gXG4gICAgICAgICAgLy8gICAgIC8vICAgfSkuam9pbignXFxuJykpXG4gICAgICAgICAgLy8gICAgIC8vICAgcmV0dXJuICFzdWJmaWVsZHMuaW5jbHVkZXModW5kZWZpbmVkKVxuICAgICAgICAgIC8vICAgICAvLyB9KSxcbiAgICAgICAgICAvLyAgICAgbWFwKFxuICAgICAgICAgIC8vICAgICAgIHN1YmZpZWxkcyA9PiB7XG4gICAgICAgICAgLy8gICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgLy8gICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAvLyAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAvLyAgICAgICAgICAgdGFyZ2V0TGFiZWw6ICcnLFxuICAgICAgICAgIC8vICAgICAgICAgICB0YXJnZXRDbGFzczogcGFnZS50YXJnZXRDbGFzcyxcbiAgICAgICAgICAvLyAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgLy8gICAgICAgICAgICAgZW50aXR5OiB7XG4gICAgICAgICAgLy8gICAgICAgICAgICAgICBwa0VudGl0eTogdGFyZ2V0SW5mbyxcbiAgICAgICAgICAvLyAgICAgICAgICAgICAgIHN1YmZpZWxkc1xuICAgICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgICAvLyAgICAgICAgICAgfVxuICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcbiAgICAgICAgICAvLyAgICAgICB9XG4gICAgICAgICAgLy8gICAgIClcbiAgICAgICAgICAvLyAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS50aW1lUHJpbWl0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgICAgICAgIHN3aXRjaE1hcCh0aW1lUHJpbWl0aXZlID0+IHtcbiAgICAgICAgICAgICAgLy8gZ2V0IGNhbGVuZGFyXG4gICAgICAgICAgICAgIGxldCBjYWwkOiBPYnNlcnZhYmxlPFRpbWVQcmltaXRpdmVXaXRoQ2FsLkNhbGVuZGFyRW51bT5cbiAgICAgICAgICAgICAgaWYgKHBhZ2Uuc2NvcGUuaW5Qcm9qZWN0KSB7XG4gICAgICAgICAgICAgICAgY2FsJCA9IHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBhZ2Uuc2NvcGUuaW5Qcm9qZWN0ICsgJ18nICsgc3RtdC5wa19lbnRpdHkpXG4gICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAgIGluZm9Qcm9qUmVsID0+IGluZm9Qcm9qUmVsLmNhbGVuZGFyIGFzIFRpbWVQcmltaXRpdmVXaXRoQ2FsLkNhbGVuZGFyRW51bVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsJCA9IG5ldyBCZWhhdmlvclN1YmplY3Qoc3RtdC5jb21tdW5pdHlfZmF2b3JpdGVfY2FsZW5kYXIgYXMgVGltZVByaW1pdGl2ZVdpdGhDYWwuQ2FsZW5kYXJFbnVtKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIHBpcGUgdGFyZ2V0IHRpbWUgcHJpbWl0aXZlIG9mIHN0bXRcbiAgICAgICAgICAgICAgcmV0dXJuIGNhbCQucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICBjYWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lUHJpbVdpdGhDYWwgPSBpbmZUaW1lUHJpbVRvVGltZVByaW1XaXRoQ2FsKHRpbWVQcmltaXRpdmUsIGNhbClcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldExhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbVdpdGhDYWwpLFxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiB0aW1lUHJpbWl0aXZlLmZrX2NsYXNzLFxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZVByaW1pdGl2ZTogdGltZVByaW1XaXRoQ2FsXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBpbXBsZW1lbnRhdGlvbiBmb3VuZCBmb3Igc3ViZmllbGRUeXBlICR7SlNPTi5zdHJpbmdpZnkoc3ViZmllbGRUeXBlKX1gKTtcbiAgICAgIH0pXG4gICAgKVxuXG5cbiAgfVxuXG4gIC8qKlxuICAgKiBwaXBlIHRhcmdldCBhbmQgcHJvalJlbCBvZiB0aGUgZ2l2ZW4gc3RhdGVtZW50XG4gICAqL1xuICBwaXBlU3RhdGVtZW50V2l0aFRhcmdldChzdG10OiBJbmZTdGF0ZW1lbnQsIHBhZ2U6IEd2RmllbGRQYWdlLCB0YXJnZXRzOiBHdkZpZWxkVGFyZ2V0cyk6IE9ic2VydmFibGU8U3RhdGVtZW50V2l0aFRhcmdldD4ge1xuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVUYXJnZXRPZlN0YXRlbWVudChzdG10LCBwYWdlLCB0YXJnZXRzKSxcbiAgICAgIHRoaXMucGlwZVByb2pSZWxPZlN0YXRlbWVudChzdG10LCBwYWdlKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW3RhcmdldCwgcHJvalJlbF0pID0+ICh7IC4uLnRhcmdldCwgLi4ucHJvalJlbCB9KSlcbiAgICApXG4gIH1cblxuICBwaXBlU3ViZmllbGRQYWdlKHBhZ2U6IEd2RmllbGRQYWdlLCB0YXJnZXRzOiBHdkZpZWxkVGFyZ2V0cyk6IE9ic2VydmFibGU8U3ViZmllbGRQYWdlPiB7XG4gICAgaWYgKHBhZ2UuZmtQcm9wZXJ0eSA9PT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0hBU19USU1FX1NQQU4gJiYgcGFnZS5pc091dGdvaW5nKSB7XG4gICAgICAvLyBpZiB0aW1lU3BhbiBtYWtlIGEgc2hvcnQgY3V0OiBwcm9kdWNlIGEgdmlydHVhbCBzdGF0ZW1lbnRXaXRoVGFyZ2V0IGZyb20gZW50aXR5IHRvIHRpbWVTcGFuXG4gICAgICByZXR1cm4gdGhpcy5waXBlVGltZVNwYW4ocGFnZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBnZXQgdGhlIHN0YXRtZW50cyBvZiB0aGF0IHBhZ2VcbiAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kLnBpcGVDb3VudChwYWdlKSxcbiAgICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5wYWdpbmF0aW9uJC5waXBlUGFnZShwYWdlKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKFxuICAgICAgICAgICAgICBwa1N0bXRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICAgICAgICAgIHBrU3RtdHMubWFwKHBrU3RtdCA9PiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3BrX2VudGl0eSQua2V5KHBrU3RtdClcbiAgICAgICAgICAgICAgICAgIC8vIGZvciBlYWNoIHN0YXRlbWVudCwgZGVwZW5kaW5nIG9uIHRoZSBzdWJmaWVsZFR5cGUsIGxvYWQgdGhlIGNvcnJlc3BvbmRpbmcgdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyKHN0bXQgPT4gISFzdG10KSxcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoTWFwKHN0bXQgPT4gdGhpcy5waXBlU3RhdGVtZW50V2l0aFRhcmdldChzdG10LCBwYWdlLCB0YXJnZXRzKSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXAoKFtjb3VudCwgc3RhdGVtZW50c10pID0+ICh7IGNvdW50LCBzdGF0ZW1lbnRzIH0pKVxuICAgICAgKVxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBwaXBlVGltZVNwYW4ocGFnZTogR3ZGaWVsZFBhZ2UpIHtcbiAgICBjb25zdCB2aXJ0dWFsU3RhdGVtZW50VG9UaW1lU3BhbiA9IHsgZmtfb2JqZWN0X2luZm86IHBhZ2UuZmtTb3VyY2VFbnRpdHkgfTtcbiAgICBjb25zdCB0YXJnZXRzOiBHdkZpZWxkVGFyZ2V0cyA9IHsgW0RmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU5dOiB7IHRpbWVTcGFuOiAndHJ1ZScgfSB9XG5cbiAgICAvLyBjb25zb2xlLmxvZygnc3ViZmllbGRUeXBlLnRlbXBvcmFsRW50aXR5Lmxlbmd0aCcsIHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eS5sZW5ndGgpXG5cbiAgICAvLyBmb3IgZWFjaCBvZiB0aGVzZSBzdWJmaWVsZHNcbiAgICBjb25zdCBzdWJlbnRpdHlQYWdlcyQgPSBEZmhDb25maWcuUFJPUEVSVFlfUEtTX1dIRVJFX1RJTUVfUFJJTUlUSVZFX0lTX1JBTkdFXG4gICAgICAubWFwKGZrUHJvcGVydHkgPT4ge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWJlbnRpdHkgc3ViZmllbGQgZm9yIHRhcmdldEluZm8nLCB0YXJnZXRJbmZvKVxuXG4gICAgICAgIC8vIGNyZWF0ZSBwYWdlOkd2U3ViZmllbGRQYWdlXG4gICAgICAgIGNvbnN0IHNjb3BlID0gcGFnZS5zY29wZS5ub3RJblByb2plY3QgPyB7IGluUmVwbzogdHJ1ZSB9IDogcGFnZS5zY29wZVxuXG4gICAgICAgIGNvbnN0IG5lc3RlZFBhZ2U6IEd2RmllbGRQYWdlID0ge1xuICAgICAgICAgIGZrUHJvcGVydHksXG4gICAgICAgICAgaXNPdXRnb2luZzogdHJ1ZSxcbiAgICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgICAgZmtTb3VyY2VFbnRpdHk6IHBhZ2UuZmtTb3VyY2VFbnRpdHksXG4gICAgICAgICAgc2NvcGUsXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3ViZlR5cGU6IEd2VGFyZ2V0VHlwZSA9IHtcbiAgICAgICAgICB0aW1lUHJpbWl0aXZlOiAndHJ1ZSdcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmd0cyA9IHtcbiAgICAgICAgICBbRGZoQ29uZmlnLkNMQVNTX1BLX1RJTUVfUFJJTUlUSVZFXTogc3ViZlR5cGVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5waXBlU3ViZmllbGRQYWdlKG5lc3RlZFBhZ2UsIHRyZ3RzKS5waXBlKFxuICAgICAgICAgIG1hcCgoeyBjb3VudCwgc3RhdGVtZW50cyB9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGxpbWl0LCBvZmZzZXQsIC4uLnMgfSA9IG5lc3RlZFBhZ2U7XG4gICAgICAgICAgICBjb25zdCBzdWJlbnRpdHlTdWJmaWVsZFBhZ2U6IFN1YmVudGl0eVN1YmZpZWxkUGFnZSA9IHtcbiAgICAgICAgICAgICAgc3ViZmllbGQ6IHMsXG4gICAgICAgICAgICAgIGNvdW50LFxuICAgICAgICAgICAgICBzdGF0ZW1lbnRzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3ViZW50aXR5U3ViZmllbGRQYWdlXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSlcblxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KHN1YmVudGl0eVBhZ2VzJClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoXG4gICAgICAgICAgc3ViZmllbGRzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVTcGFuUHJldmlldzogV2FyRW50aXR5UHJldmlld1RpbWVTcGFuID0ge31cbiAgICAgICAgICAgIHN1YmZpZWxkcy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgICAgICBpZiAocy5zdGF0ZW1lbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3QgPSBzLnN0YXRlbWVudHNbMF1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBEZmhDb25maWcuUFJPUEVSVFlfUEtfVE9fRVhJU1RFTkNFX1RJTUVfS0VZW3N0LnN0YXRlbWVudC5ma19wcm9wZXJ0eV1cbiAgICAgICAgICAgICAgICB0aW1lU3BhblByZXZpZXdba2V5XSA9IHN0LnRhcmdldC50aW1lUHJpbWl0aXZlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICAgIHN0YXRlbWVudDogdmlydHVhbFN0YXRlbWVudFRvVGltZVNwYW4sXG4gICAgICAgICAgICAgIGlzT3V0Z29pbmc6IHBhZ2UuaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IHRoaXMudGltZVNwYW5QaXBlLnRyYW5zZm9ybShuZXcgVGltZVNwYW5VdGlsKHRpbWVTcGFuUHJldmlldykpLFxuICAgICAgICAgICAgICB0YXJnZXRDbGFzczogRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTixcbiAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgdGltZVNwYW46IHtcbiAgICAgICAgICAgICAgICAgIHByZXZpZXc6IHRpbWVTcGFuUHJldmlldyxcbiAgICAgICAgICAgICAgICAgIHN1YmZpZWxkc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICkucGlwZShtYXAoc3RtdFRhcmdldCA9PiB7XG4gICAgICAgIGNvbnN0IHN0bXRXVDogU3RhdGVtZW50V2l0aFRhcmdldCA9IHtcbiAgICAgICAgICAuLi5zdG10VGFyZ2V0LFxuICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4geyBjb3VudDogMSwgc3RhdGVtZW50czogW3N0bXRXVF0gfTtcbiAgICAgIH0pKTtcbiAgfVxuXG4gIC8vIHBpcGVTdGF0ZW1lbnRMaXN0UGFnZShcbiAgLy8gICBwYWdpbmF0ZUJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSxcbiAgLy8gICBsaW1pdDogbnVtYmVyLFxuICAvLyAgIG9mZnNldDogbnVtYmVyLFxuICAvLyAgIHBrUHJvamVjdDogbnVtYmVyLFxuICAvLyAgIGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCxcbiAgLy8gICBhbHRlcm5hdGl2ZSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgLy8gICAvLyBwcmVwYXJlIHBhZ2UgbG9hZGVyXG4gIC8vICAgY29uc3QgcGFnZUxvYWRlciQgPSBhbHRlcm5hdGl2ZSA/IHRoaXMuaW5mUmVwby5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kIDogdGhpcy5zLmluZiQuc3RhdGVtZW50JC5wYWdpbmF0aW9uJDtcblxuICAvLyAgIC8vIHByZXBhcmUgYmFzaWMgc3RhdGVtZW50IGl0ZW0gbG9hZGVyXG4gIC8vICAgY29uc3QgYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyID0gKHBrU3RhdGVtZW50LCBpc091dGdvaW5nLCBwa1Byb2opID0+IHtcbiAgLy8gICAgIHJldHVybiBhbHRlcm5hdGl2ZSA/XG4gIC8vICAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrU3RhdGVtZW50LCBpc091dGdvaW5nKSA6XG4gIC8vICAgICAgIHRoaXMuYi5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1Byb2osIHBrU3RhdGVtZW50LCBpc091dGdvaW5nKVxuICAvLyAgIH1cblxuICAvLyAgIGNvbnN0IHBhZ2luYXRlZFN0YXRlbWVudFBrcyQgPSBwYWdlTG9hZGVyJC5waXBlUGFnZShwYWdpbmF0ZUJ5LCBsaW1pdCwgb2Zmc2V0KVxuXG4gIC8vICAgcmV0dXJuIHBhZ2luYXRlZFN0YXRlbWVudFBrcyQucGlwZShcbiAgLy8gICAgIHN3aXRjaE1hcCgocGFnaW5hdGVkU3RhdGVtZW50UGtzKSA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgLy8gICAgICAgcGFnaW5hdGVkU3RhdGVtZW50UGtzLm1hcChwa1N0YXRlbWVudCA9PiBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIocGtTdGF0ZW1lbnQsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsIHBrUHJvamVjdClcbiAgLy8gICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gIC8vICAgICAgICAgICBzd2l0Y2hNYXAoeCA9PiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyh4LmlzT3V0Z29pbmcgPyB4LnN0YXRlbWVudC5ma19vYmplY3RfaW5mbyA6IHguc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbylcbiAgLy8gICAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgICAgbWFwKChwcmV2aWV3KSA9PiB7XG4gIC8vICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBFbnRpdHlQcmV2aWV3SXRlbSA9IHtcbiAgLy8gICAgICAgICAgICAgICAgICAgLi4ueCxcbiAgLy8gICAgICAgICAgICAgICAgICAgcHJldmlldyxcbiAgLy8gICAgICAgICAgICAgICAgICAgZmtDbGFzczogcHJldmlldy5ma19jbGFzc1xuICAvLyAgICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gIC8vICAgICAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICAgICAgKVxuICAvLyAgICAgICAgICAgKSlcblxuICAvLyAgICAgICApXG4gIC8vICAgICApXG4gIC8vICAgICApKVxuXG4gIC8vIH1cblxuXG4gIC8vIC8qKlxuICAvLyAgKiBQaXBlIHRoZSB0ZW1wb3JhbCBlbnRpdGllcyBjb25uZWN0ZWQgdG8gZ2l2ZW4gZW50aXR5IGJ5IHN0YXRlbWVudHMgdGhhdCBhcmUgaW4gdGhlIGN1cnJlbnQgcHJvamVjdFxuICAvLyAgKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyAvLyBwaXBlVGVtcG9yYWxFbnRpdHlUYWJsZVJvd3MoXG4gIC8vIC8vICAgcGFnaW5hdGVCeTogUGFnaW5hdGVCeVBhcmFtW10sXG4gIC8vIC8vICAgbGltaXQ6IG51bWJlcixcbiAgLy8gLy8gICBvZmZzZXQ6IG51bWJlcixcbiAgLy8gLy8gICBwa1Byb2plY3Q6IG51bWJlcixcbiAgLy8gLy8gICBsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsXG4gIC8vIC8vICAgZmllbGREZWZpbml0aW9uczogRmllbGRbXSxcbiAgLy8gLy8gICBhbHRlcm5hdGl2ZSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxUZW1wb3JhbEVudGl0eUl0ZW1bXT4ge1xuXG4gIC8vIC8vICAgLy8gY29uc3QgcHJvcGVydHlJdGVtVHlwZSA9IHRoaXMucHJvcGVydHlJdGVtVHlwZShmaWVsZERlZmluaXRpb25zKVxuXG4gIC8vIC8vICAgY29uc3QgdGFyZ2V0RW50aXR5T2ZTdGF0ZW1lbnRJdGVtID0gKHI6IEJhc2ljU3RhdGVtZW50SXRlbSkgPT4gci5pc091dGdvaW5nID8gci5zdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8gOiByLnN0YXRlbWVudC5ma19zdWJqZWN0X2luZm87XG5cbiAgLy8gLy8gICAvLyBwcmVwYXJlIHBhZ2UgbG9hZGVyXG4gIC8vIC8vICAgY29uc3QgcGFnZUxvYWRlciQgPSBhbHRlcm5hdGl2ZSA/IHRoaXMuaW5mUmVwby5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kIDogdGhpcy5zLmluZiQuc3RhdGVtZW50JC5wYWdpbmF0aW9uJDtcblxuICAvLyAvLyAgIC8vIHByZXBhcmUgYmFzaWMgc3RhdGVtZW50IGl0ZW0gbG9hZGVyXG4gIC8vIC8vICAgY29uc3QgYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyID0gKHBrU3RhdGVtZW50LCBpc091dGdvaW5nLCBwa1Byb2opID0+IHtcbiAgLy8gLy8gICAgIHJldHVybiBhbHRlcm5hdGl2ZSA/XG4gIC8vIC8vICAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrU3RhdGVtZW50LCBpc091dGdvaW5nKSA6XG4gIC8vIC8vICAgICAgIHRoaXMuYi5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1Byb2osIHBrU3RhdGVtZW50LCBpc091dGdvaW5nKVxuICAvLyAvLyAgIH1cblxuICAvLyAvLyAgIC8vIHByZXBhcmUgVGVFblJvdyBsb2FkZXJcbiAgLy8gLy8gICBjb25zdCByb3dMb2FkZXIgPSAodGFyZ2V0RW50aXR5UGssIGZpZWxkRGVmLCBwa1Byb2opID0+IHtcbiAgLy8gLy8gICAgIHJldHVybiBhbHRlcm5hdGl2ZSA/XG4gIC8vIC8vICAgICAgIHRoaXMucGlwZUl0ZW1UZUVuUm93KHRhcmdldEVudGl0eVBrLCBmaWVsZERlZiwgbnVsbCwgdHJ1ZSkgOlxuICAvLyAvLyAgICAgICB0aGlzLnBpcGVJdGVtVGVFblJvdyh0YXJnZXRFbnRpdHlQaywgZmllbGREZWYsIHBrUHJvaiwgZmFsc2UpXG4gIC8vIC8vICAgfVxuXG4gIC8vIC8vICAgY29uc3QgcGFnaW5hdGVkU3RhdGVtZW50UGtzJCA9IHBhZ2VMb2FkZXIkLnBpcGVQYWdlKHBhZ2luYXRlQnksIGxpbWl0LCBvZmZzZXQpXG5cbiAgLy8gLy8gICBjb25zdCByb3dzJCA9IHBhZ2luYXRlZFN0YXRlbWVudFBrcyQucGlwZShcbiAgLy8gLy8gICAgIHN3aXRjaE1hcCgocGFnaW5hdGVkU3RhdGVtZW50UGtzKSA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgLy8gLy8gICAgICAgcGFnaW5hdGVkU3RhdGVtZW50UGtzLm1hcChwa1N0YXRlbWVudCA9PiBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIocGtTdGF0ZW1lbnQsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsIHBrUHJvamVjdClcbiAgLy8gLy8gICAgICAgICAucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAvLyAvLyAgICAgICApXG4gIC8vIC8vICAgICApXG4gIC8vIC8vICAgICAgIC5waXBlKFxuICAvLyAvLyAgICAgICAgIHN3aXRjaE1hcCgodGVFblN0YXRlbWVudCkgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gIC8vIC8vICAgICAgICAgICB0ZUVuU3RhdGVtZW50Lm1hcCgoYmFzaWNTdGF0ZW1lbnRJdGVtKSA9PiB7XG4gIC8vIC8vICAgICAgICAgICAgIGNvbnN0IHBrVGVFbiA9IHRhcmdldEVudGl0eU9mU3RhdGVtZW50SXRlbShiYXNpY1N0YXRlbWVudEl0ZW0pO1xuICAvLyAvLyAgICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgLy8gLy8gICAgICAgICAgICAgICByb3dMb2FkZXIoXG4gIC8vIC8vICAgICAgICAgICAgICAgICBwa1RlRW4sXG4gIC8vIC8vICAgICAgICAgICAgICAgICBmaWVsZERlZmluaXRpb25zLFxuICAvLyAvLyAgICAgICAgICAgICAgICAgLy8gcHJvcGVydHlJdGVtVHlwZSxcbiAgLy8gLy8gICAgICAgICAgICAgICAgIHBrUHJvamVjdFxuICAvLyAvLyAgICAgICAgICAgICAgICksXG4gIC8vIC8vICAgICAgICAgICAgICAgdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgcGtUZUVuKVxuICAvLyAvLyAgICAgICAgICAgICApLnBpcGUoXG4gIC8vIC8vICAgICAgICAgICAgICAgbWFwKChbcm93LCB0ZUVuUHJvalJlbF0pID0+IHtcbiAgLy8gLy8gICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRlbXBvcmFsRW50aXR5SXRlbSA9IHtcbiAgLy8gLy8gICAgICAgICAgICAgICAgICAgLi4uYmFzaWNTdGF0ZW1lbnRJdGVtLFxuICAvLyAvLyAgICAgICAgICAgICAgICAgICByb3csXG4gIC8vIC8vICAgICAgICAgICAgICAgICAgIHBrRW50aXR5OiBwa1RlRW4sXG4gIC8vIC8vICAgICAgICAgICAgICAgICAgIHRlRW5Qcm9qUmVsXG4gIC8vIC8vICAgICAgICAgICAgICAgICB9O1xuICAvLyAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1cbiAgLy8gLy8gICAgICAgICAgICAgICB9KVxuICAvLyAvLyAgICAgICAgICAgICApXG4gIC8vIC8vICAgICAgICAgICB9KVxuICAvLyAvLyAgICAgICAgICkpLFxuICAvLyAvLyAgICAgICApKSxcblxuICAvLyAvLyAgIClcbiAgLy8gLy8gICByZXR1cm4gcm93cyRcbiAgLy8gLy8gfVxuXG5cblxuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVJdGVtVGVFblJvdyhwa0VudGl0eTogbnVtYmVyLCBmaWVsZERlZmluaXRpb25zOiBGaWVsZFtdLCBwa1Byb2plY3Q6IG51bWJlciwgcmVwbzogYm9vbGVhbik6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlSb3c+IHtcblxuICAvLyAgIC8vIHBpcGUgb3V0Z29pbmcgc3RhdGVtZW50c1xuICAvLyAgIGNvbnN0IG91dGdvaW5nU3RhdGVtZW50cyQgPSByZXBvID8gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KSA6IHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTtcbiAgLy8gICAvLyBwaXBlIGluZ29pbmcgc3RhdGVtZW50c1xuICAvLyAgIGNvbnN0IGluZ29pbmdTdGF0ZW1lbnRzJCA9IHJlcG8gPyB0aGlzLmIucGlwZVJlcG9JbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSkgOiB0aGlzLmIucGlwZUluZ29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTtcblxuXG4gIC8vICAgLy8gcGlwZSBhbGwgc3RhdGVtZW50cyB3aXRoIGluZm9ybWF0aW9uIGxlYWYgaXRlbXNcblxuICAvLyAgIGNvbnN0IG91dGdvaW5nSXRlbXMkOiBPYnNlcnZhYmxlPFN0YXRlbWVudEl0ZW1bXT4gPSBvdXRnb2luZ1N0YXRlbWVudHMkLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAoc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgLy8gICAgICAgc3RhdGVtZW50c1xuICAvLyAgICAgICAgIC5maWx0ZXIoc3RhdGVtZW50ID0+ICEhc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKSAvLyByZW1vdmUgc3RhdGVtZW50cyBub3QgcG9pbnRpbmcgdG8gaW5mb3JtYXRpb25cbiAgLy8gICAgICAgICAubWFwKHMgPT4ge1xuICAvLyAgICAgICAgICAgY29uc3QgaXNPdXRnb2luZyA9IHRydWU7XG4gIC8vICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbShzLCBwa1Byb2plY3QsIGlzT3V0Z29pbmcpO1xuICAvLyAgICAgICAgIH0pXG4gIC8vICAgICApKVxuXG4gIC8vICAgKVxuICAvLyAgIGNvbnN0IGluZ29pbmdJdGVtcyQ6IE9ic2VydmFibGU8U3RhdGVtZW50SXRlbVtdPiA9IGluZ29pbmdTdGF0ZW1lbnRzJC5waXBlKFxuICAvLyAgICAgc3dpdGNoTWFwKHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gIC8vICAgICAgIHN0YXRlbWVudHNcbiAgLy8gICAgICAgICAuZmlsdGVyKHN0YXRlbWVudCA9PiAhIXN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pIC8vIHJlbW92ZSBzdGF0ZW1lbnRzIG5vdCBwb2ludGluZyB0byBpbmZvcm1hdGlvblxuICAvLyAgICAgICAgIC5tYXAocyA9PiB7XG4gIC8vICAgICAgICAgICBjb25zdCBpc091dGdvaW5nID0gZmFsc2U7XG4gIC8vICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbShzLCBwa1Byb2plY3QsIGlzT3V0Z29pbmcpO1xuICAvLyAgICAgICAgIH0pXG4gIC8vICAgICApKVxuXG4gIC8vICAgKVxuXG4gIC8vICAgY29uc3Qgc29ydEl0ZW1zID0gcmVwbyA/XG4gIC8vICAgICAoaXRlbTogU3RhdGVtZW50SXRlbVtdKSA9PiBpdGVtLnNvcnQoKGEsIGIpID0+IGEuc3RhdGVtZW50LmlzX2luX3Byb2plY3RfY291bnQgPiBiLnN0YXRlbWVudC5pc19pbl9wcm9qZWN0X2NvdW50ID8gMSA6IC0xKSA6XG4gIC8vICAgICAoaXRlbTogU3RhdGVtZW50SXRlbVtdKSA9PiBpdGVtO1xuXG5cbiAgLy8gICByZXR1cm4gY29tYmluZUxhdGVzdChvdXRnb2luZ0l0ZW1zJCwgaW5nb2luZ0l0ZW1zJCkucGlwZShcblxuICAvLyAgICAgbWFwKChbb3V0Z29pbmdJdGVtcywgaW5nb2luZ0l0ZW1zXSkgPT4ge1xuICAvLyAgICAgICBjb25zdCBncm91cGVkT3V0ID0gZ3JvdXBCeSgoaSkgPT4gKGkgJiYgaS5zdGF0ZW1lbnQgPyBpLnN0YXRlbWVudC5ma19wcm9wZXJ0eS50b1N0cmluZygpIDogdW5kZWZpbmVkKSwgb3V0Z29pbmdJdGVtcyk7XG4gIC8vICAgICAgIGNvbnN0IGdyb3VwZWRJbiA9IGdyb3VwQnkoKGkpID0+IChpICYmIGkuc3RhdGVtZW50ID8gaS5zdGF0ZW1lbnQuZmtfcHJvcGVydHkudG9TdHJpbmcoKSA6IHVuZGVmaW5lZCksIGluZ29pbmdJdGVtcyk7XG4gIC8vICAgICAgIHJldHVybiB7IGdyb3VwZWRPdXQsIGdyb3VwZWRJbiB9XG4gIC8vICAgICB9KSxcbiAgLy8gICAgIC8vIGF1ZGl0VGltZSgxMCksXG4gIC8vICAgICBtYXAoKGQpID0+IHtcbiAgLy8gICAgICAgY29uc3Qgcm93OiBUZW1wb3JhbEVudGl0eVJvdyA9IHt9XG5cbiAgLy8gICAgICAgZmllbGREZWZpbml0aW9ucy5mb3JFYWNoKGZpZWxkRGVmaW5pdGlvbiA9PiB7XG5cbiAgLy8gICAgICAgICBsZXQgY2VsbDogVGVtcG9yYWxFbnRpdHlDZWxsO1xuICAvLyAgICAgICAgIGZpZWxkRGVmaW5pdGlvbi5saXN0RGVmaW5pdGlvbnMuZm9yRWFjaChsaXN0RGVmaW5pdGlvbiA9PiB7XG4gIC8vICAgICAgICAgICBpZiAobGlzdERlZmluaXRpb24ubGlzdFR5cGUudGltZVNwYW4pIHtcblxuICAvLyAgICAgICAgICAgICBjb25zdCB0ID0gcGljayhbJzcxJywgJzcyJywgJzE1MCcsICcxNTEnLCAnMTUyJywgJzE1MyddLCBkLmdyb3VwZWRPdXQpO1xuICAvLyAgICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModCk7XG4gIC8vICAgICAgICAgICAgIGNvbnN0IGl0ZW1zQ291bnQgPSBrZXlzLmxlbmd0aDtcblxuICAvLyAgICAgICAgICAgICBsZXQgbGFiZWw7XG4gIC8vICAgICAgICAgICAgIGlmIChpdGVtc0NvdW50ID4gMCkge1xuICAvLyAgICAgICAgICAgICAgIGNvbnN0IHRpbWVTcGFuS2V5czogQ3RybFRpbWVTcGFuRGlhbG9nUmVzdWx0ID0ge31cbiAgLy8gICAgICAgICAgICAgICBrZXlzLmZvckVhY2goa2V5ID0+IHsgdGltZVNwYW5LZXlzW2tleV0gPSB0W2tleV1bMF0udGltZVByaW1pdGl2ZSB9KVxuICAvLyAgICAgICAgICAgICAgIGNvbnN0IHRpbWVTcGFuID0gVGltZVNwYW5VdGlsLmZyb21UaW1lU3BhbkRpYWxvZ0RhdGEodGltZVNwYW5LZXlzKTtcbiAgLy8gICAgICAgICAgICAgICBsYWJlbCA9IHRoaXMudGltZVNwYW5QaXBlLnRyYW5zZm9ybSh0aW1lU3Bhbik7XG4gIC8vICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgY2VsbCA9IHtcbiAgLy8gICAgICAgICAgICAgICBpc091dGdvaW5nOiBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLFxuICAvLyAgICAgICAgICAgICAgIGl0ZW1zQ291bnQsXG4gIC8vICAgICAgICAgICAgICAgbGFiZWwsXG4gIC8vICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgICAgICAgIHBrUHJvcGVydHk6IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICAgICAgICBpc1RpbWVTcGFuOiB0cnVlXG4gIC8vICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgIGVsc2Uge1xuICAvLyAgICAgICAgICAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAvLyAgICAgICAgICAgICAgIGlmIChkLmdyb3VwZWRPdXRbbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gc29ydEl0ZW1zKGQuZ3JvdXBlZE91dFtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSlcbiAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IGl0ZW1zWzBdO1xuICAvLyAgICAgICAgICAgICAgICAgY2VsbCA9IHtcbiAgLy8gICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogbGlzdERlZmluaXRpb24uaXNPdXRnb2luZyxcbiAgLy8gICAgICAgICAgICAgICAgICAgaXRlbXNDb3VudDogaXRlbXMubGVuZ3RoLFxuICAvLyAgICAgICAgICAgICAgICAgICBlbnRpdHlQcmV2aWV3OiAoKGZpcnN0SXRlbSB8fCB7fSkgYXMgRW50aXR5UHJldmlld0l0ZW0pLnByZXZpZXcsXG4gIC8vICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmaXJzdEl0ZW0ubGFiZWwsXG4gIC8vICAgICAgICAgICAgICAgICAgIHBrUHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksXG4gIC8vICAgICAgICAgICAgICAgICAgIGZpcnN0SXRlbSxcbiAgLy8gICAgICAgICAgICAgICAgICAgaXRlbXNcbiAgLy8gICAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgIH0gZWxzZSB7XG4gIC8vICAgICAgICAgICAgICAgaWYgKGQuZ3JvdXBlZEluW2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gIC8vICAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IHNvcnRJdGVtcyhkLmdyb3VwZWRJbltsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSlcbiAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IGl0ZW1zWzBdO1xuICAvLyAgICAgICAgICAgICAgICAgY2VsbCA9IHtcbiAgLy8gICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogbGlzdERlZmluaXRpb24uaXNPdXRnb2luZyxcbiAgLy8gICAgICAgICAgICAgICAgICAgaXRlbXNDb3VudDogaXRlbXMubGVuZ3RoLFxuICAvLyAgICAgICAgICAgICAgICAgICBlbnRpdHlQcmV2aWV3OiAoKGZpcnN0SXRlbSB8fCB7fSkgYXMgRW50aXR5UHJldmlld0l0ZW0pLnByZXZpZXcsXG4gIC8vICAgICAgICAgICAgICAgICAgIGxhYmVsOiBmaXJzdEl0ZW0ubGFiZWwsXG4gIC8vICAgICAgICAgICAgICAgICAgIHBrUHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksXG4gIC8vICAgICAgICAgICAgICAgICAgIGZpcnN0SXRlbSxcbiAgLy8gICAgICAgICAgICAgICAgICAgaXRlbXNcbiAgLy8gICAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgIH1cblxuICAvLyAgICAgICAgIH0pXG5cblxuICAvLyAgICAgICAgIHJvd1tmaWVsZERlZmluaXRpb24ubGFiZWxdID0gY2VsbDtcbiAgLy8gICAgICAgfSlcbiAgLy8gICAgICAgcmV0dXJuIHJvd1xuICAvLyAgICAgfSlcblxuXG4gIC8vICAgKVxuICAvLyB9XG5cblxuXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcHJpdmF0ZSBwaXBlSXRlbShyOiBJbmZTdGF0ZW1lbnQsIHBrUHJvamVjdDogbnVtYmVyLCBwcm9wSXNPdXRnb2luZzogYm9vbGVhbikge1xuXG4gIC8vICAgY29uc3QgdGFyZ2V0RW50aXR5ID0gcHJvcElzT3V0Z29pbmcgPyByLmZrX29iamVjdF9pbmZvIDogci5ma19zdWJqZWN0X2luZm87XG4gIC8vICAgcmV0dXJuIHRoaXMucy5pbmYkLmdldE1vZGVsT2ZFbnRpdHkkKHRhcmdldEVudGl0eSkucGlwZShcbiAgLy8gICAgIHN3aXRjaE1hcChtID0+IHtcbiAgLy8gICAgICAgY29uc3QgbW9kZWxOYW1lOiBJbmZNb2RlbE5hbWUgPSBtID8gbS5tb2RlbE5hbWUgOiB1bmRlZmluZWQ7XG4gIC8vICAgICAgIHN3aXRjaCAobW9kZWxOYW1lKSB7XG4gIC8vICAgICAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAvLyAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKTtcbiAgLy8gICAgICAgICBjYXNlICdsYW5ndWFnZSc6XG4gIC8vICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpO1xuICAvLyAgICAgICAgIGNhc2UgJ3BsYWNlJzpcbiAgLy8gICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtUGxhY2Uocik7XG4gIC8vICAgICAgICAgY2FzZSAnZGltZW5zaW9uJzpcbiAgLy8gICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpO1xuICAvLyAgICAgICAgIGNhc2UgJ2xhbmdfc3RyaW5nJzpcbiAgLy8gICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtTGFuZ1N0cmluZyhyKTtcbiAgLy8gICAgICAgICBjYXNlICd0aW1lX3ByaW1pdGl2ZSc6XG4gIC8vICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVRpbWVQcmltaXRpdmUociwgcGtQcm9qZWN0KTsgLy8gVE9ETzogZW1pdHMgdHdpY2VcbiAgLy8gICAgICAgICBkZWZhdWx0OlxuICAvLyAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIHByb3BJc091dGdvaW5nKTtcbiAgLy8gICAgICAgfVxuXG5cbiAgLy8gICAgIH0pXG4gIC8vICAgKVxuXG5cbiAgLy8gfVxuXG5cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlRW50aXR5UHJvcGVydGllcyhsaXN0RGVmOiBTdWJmaWVsZCwgZmtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEVudGl0eVByb3BlcnRpZXM+IHtcblxuICAvLyAgIGlmIChsaXN0RGVmLmxpc3RUeXBlLmFwcGVsbGF0aW9uKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5waXBlTGlzdEFwcGVsbGF0aW9uKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgLy8gICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gIC8vICAgfVxuICAvLyAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUubGFuZ3VhZ2UpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ3VhZ2UobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAvLyAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgLy8gICB9XG4gIC8vICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5wbGFjZSkge1xuICAvLyAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RQbGFjZShsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gIC8vICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAvLyAgIH1cbiAgLy8gICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmRpbWVuc2lvbikge1xuICAvLyAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3REaW1lbnNpb24obGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAvLyAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgLy8gICB9XG4gIC8vICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5sYW5nU3RyaW5nKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5waXBlTGlzdExhbmdTdHJpbmcobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAvLyAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgLy8gICB9XG5cblxuICAvLyAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUuZW50aXR5UHJldmlldyB8fCBsaXN0RGVmLmxpc3RUeXBlLnRlbXBvcmFsRW50aXR5KSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5waXBlTGlzdEVudGl0eVByZXZpZXcobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAvLyAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgLy8gICB9XG4gIC8vICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS50aW1lU3Bhbikge1xuICAvLyAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1UaW1lU3Bhbihma0VudGl0eSlcbiAgLy8gICAgICAgLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gIC8vICAgICAgICAgY29uc3QgaXRlbXMgPSBpdGVtLnByb3BlcnRpZXMuZmluZChwID0+IHAuaXRlbXMubGVuZ3RoID4gMCkgPyBbe1xuICAvLyAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVNwYW5QaXBlLnRyYW5zZm9ybSh0aW1lU3Bhbkl0ZW1Ub1RpbWVTcGFuKGl0ZW0pKSxcbiAgLy8gICAgICAgICAgIHByb3BlcnRpZXM6IFtdIC8vIFRPRE8gY2hlY2sgaWYgdGhlIHByb3BlcnRpZXMgb3IgdGhlIGl0ZW0gYXJlIHJlYWxseSBub3QgbmVlZGVkXG4gIC8vICAgICAgICAgfV0gOiBbXVxuICAvLyAgICAgICAgIHJldHVybiB7XG4gIC8vICAgICAgICAgICBsaXN0RGVmaW5pdGlvbjogbGlzdERlZixcbiAgLy8gICAgICAgICAgIGl0ZW1zXG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICB9KSlcbiAgLy8gICB9XG4gIC8vICAgZWxzZSByZXR1cm4gb2YobnVsbClcbiAgLy8gfVxuXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZVRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcyhwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXM+IHtcbiAgLy8gICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgLy8gICAgIHRoaXMucy5pbmYkLnRlbXBvcmFsX2VudGl0eSQuYnlfcGtfZW50aXR5X2tleSQocGtFbnRpdHkpLFxuICAvLyAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0JCh7IGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHkgfSksXG4gIC8vICAgICB0aGlzLnMuaW5mJC50ZXh0X3Byb3BlcnR5JC5ieV9ma19jb25jZXJuZWRfZW50aXR5X2luZGV4ZWQkKHBrRW50aXR5KVxuICAvLyAgICkucGlwZShcbiAgLy8gICAgIG1hcCgoW3RlbXBvcmFsRW50aXR5LCBzdGF0ZW1lbnRzLCB0ZXh0UHJvcGVydGllc10pID0+IHtcbiAgLy8gICAgICAgY29uc3QgcmVzOiBUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMgPSB7XG4gIC8vICAgICAgICAgdGVtcG9yYWxFbnRpdHksXG4gIC8vICAgICAgICAgc3RhdGVtZW50czogc3RhdGVtZW50cyxcbiAgLy8gICAgICAgICB0ZXh0UHJvcGVydGllczogdmFsdWVzKHRleHRQcm9wZXJ0aWVzKVxuICAvLyAgICAgICB9XG4gIC8vICAgICAgIHJldHVybiByZXNcbiAgLy8gICAgIH0pXG4gIC8vICAgKVxuICAvLyB9XG5cbiAgLy8gZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIGl0ZW1zKTogRW50aXR5UHJvcGVydGllcyB7XG4gIC8vICAgcmV0dXJuIHtcbiAgLy8gICAgIGxpc3REZWZpbml0aW9uLFxuICAvLyAgICAgaXRlbXMsXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gLyoqXG4gIC8vICAqIFBpcGUgdGltZSBzcGFuIGl0ZW0gaW4gdmVyc2lvbiBvZiBwcm9qZWN0XG4gIC8vICAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVJdGVtVGltZVNwYW4ocGtFbnRpdHkpOiBPYnNlcnZhYmxlPFRpbWVTcGFuSXRlbT4ge1xuXG4gIC8vICAgcmV0dXJuIHRoaXMucC5wa1Byb2plY3QkLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHtcbiAgLy8gICAgICAgcmV0dXJuIHRoaXMuYy5waXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MoXG4gIC8vICAgICAgICAgRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTlxuICAvLyAgICAgICApLnBpcGUoXG4gIC8vICAgICAgICAgc3dpdGNoTWFwKGZpZWxkRGVmcyA9PiB7XG4gIC8vICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChmaWVsZERlZnMubWFwKGZpZWxkRGVmID0+IHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgLy8gICAgICAgICAgICAgZmtfcHJvcGVydHk6IGZpZWxkRGVmLnByb3BlcnR5LnBrUHJvcGVydHksXG4gIC8vICAgICAgICAgICAgIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHlcbiAgLy8gICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICAgIHN3aXRjaE1hcE9yKFtdLCBzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3QoXG4gIC8vICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzLm1hcChzdGF0ZW1lbnQgPT4gY29tYmluZUxhdGVzdChcbiAgLy8gICAgICAgICAgICAgICAgICAgdGhpcy5zLmluZiQudGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgLy8gICAgICAgICAgICAgICAgICAgdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgc3RhdGVtZW50LnBrX2VudGl0eSlcbiAgLy8gICAgICAgICAgICAgICAgICkucGlwZShtYXAoKFtpbmZUaW1lUHJpbWl0aXZlLCBwcm9qUmVsXSkgPT4ge1xuICAvLyAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAvLyAgICAgICAgICAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAvLyAgICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyOiAoKHByb2pSZWwuY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gIC8vICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAvLyAgICAgICAgICAgICAgICAgICB9KVxuICAvLyAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgLy8gICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gIC8vICAgICAgICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgICAgICAgICAgICAgcHJvalJlbCxcbiAgLy8gICAgICAgICAgICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAvLyAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlKSxcbiAgLy8gICAgICAgICAgICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gIC8vICAgICAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gIC8vICAgICAgICAgICAgICAgICB9KSlcbiAgLy8gICAgICAgICAgICAgICAgIClcbiAgLy8gICAgICAgICAgICAgICApKSxcbiAgLy8gICAgICAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAvLyAgICAgICAgICAgICAgICAgY29uc3QgcmVzOiBUaW1lU3BhblByb3BlcnR5ID0ge1xuICAvLyAgICAgICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbjogZmllbGREZWYubGlzdERlZmluaXRpb25zWzBdLCBpdGVtc1xuICAvLyAgICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAvLyAgICAgICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICAgIClcbiAgLy8gICAgICAgICAgICkpLnBpcGUoXG4gIC8vICAgICAgICAgICAgIG1hcCgocHJvcGVydGllcykgPT4ge1xuICAvLyAgICAgICAgICAgICAgIGNvbnN0IHByb3BzID0gcHJvcGVydGllcy5maWx0ZXIocCA9PiBwLml0ZW1zLmxlbmd0aCA+IDApO1xuICAvLyAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuaXRlbTogVGltZVNwYW5JdGVtID0ge1xuICAvLyAgICAgICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAvLyAgICAgICAgICAgICAgICAgcHJvcGVydGllczogcHJvcHNcbiAgLy8gICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVzcGFuaXRlbVxuICAvLyAgICAgICAgICAgICB9KVxuICAvLyAgICAgICAgICAgKVxuICAvLyAgICAgICAgIH0pXG4gIC8vICAgICAgIClcbiAgLy8gICAgIH0pXG5cbiAgLy8gICApXG4gIC8vIH1cblxuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVJdGVtQXBwZWxsYXRpb24oc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPEFwcGVsbGF0aW9uSXRlbT4ge1xuICAvLyAgIHJldHVybiB0aGlzLnMuaW5mJC5hcHBlbGxhdGlvbiQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAvLyAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgLy8gICAgIG1hcChhcHBlbGxhdGlvbiA9PiB7XG4gIC8vICAgICAgIGlmICghYXBwZWxsYXRpb24pIHJldHVybiBudWxsO1xuICAvLyAgICAgICBjb25zdCBub2RlOiBBcHBlbGxhdGlvbkl0ZW0gPSB7XG4gIC8vICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgIHN0YXRlbWVudCxcbiAgLy8gICAgICAgICBsYWJlbDogYXBwZWxsYXRpb24uc3RyaW5nLFxuICAvLyAgICAgICAgIGZrQ2xhc3M6IGFwcGVsbGF0aW9uLmZrX2NsYXNzXG4gIC8vICAgICAgIH1cbiAgLy8gICAgICAgcmV0dXJuIG5vZGVcbiAgLy8gICAgIH0pKVxuICAvLyB9XG5cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlSXRlbUxhbmd1YWdlKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW0+IHtcbiAgLy8gICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgLy8gICAgIGZpbHRlcih4ID0+ICEheCksXG4gIC8vICAgICBtYXAobGFuZ3VhZ2UgPT4ge1xuICAvLyAgICAgICBpZiAoIWxhbmd1YWdlKSByZXR1cm4gbnVsbDtcbiAgLy8gICAgICAgY29uc3Qgbm9kZTogTGFuZ3VhZ2VJdGVtID0ge1xuICAvLyAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICBzdGF0ZW1lbnQsXG4gIC8vICAgICAgICAgbGFiZWw6IGxhbmd1YWdlLm5vdGVzLFxuICAvLyAgICAgICAgIGZrQ2xhc3M6IGxhbmd1YWdlLmZrX2NsYXNzXG4gIC8vICAgICAgIH1cbiAgLy8gICAgICAgcmV0dXJuIG5vZGVcbiAgLy8gICAgIH0pKVxuICAvLyB9XG5cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlSXRlbVBsYWNlKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxQbGFjZUl0ZW0+IHtcbiAgLy8gICByZXR1cm4gdGhpcy5zLmluZiQucGxhY2UkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgLy8gICAgIGZpbHRlcih4ID0+ICEheCksXG4gIC8vICAgICBtYXAocGxhY2UgPT4ge1xuICAvLyAgICAgICBpZiAoIXBsYWNlKSByZXR1cm4gbnVsbDtcbiAgLy8gICAgICAgY29uc3Qgbm9kZTogUGxhY2VJdGVtID0ge1xuICAvLyAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICBzdGF0ZW1lbnQsXG4gIC8vICAgICAgICAgbGFiZWw6ICdXR1M4NDogJyArIHBsYWNlLmxhdCArICfCsCwgJyArIHBsYWNlLmxvbmcgKyAnwrAnLFxuICAvLyAgICAgICAgIGZrQ2xhc3M6IHBsYWNlLmZrX2NsYXNzXG4gIC8vICAgICAgIH1cbiAgLy8gICAgICAgcmV0dXJuIG5vZGVcbiAgLy8gICAgIH0pKVxuICAvLyB9XG5cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlSXRlbURpbWVuc2lvbihzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbT4ge1xuICAvLyAgIHJldHVybiB0aGlzLnMuaW5mJC5kaW1lbnNpb24kLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgLy8gICAgIGZpbHRlcih4ID0+ICEheCksXG4gIC8vICAgICBzd2l0Y2hNYXAoKGRpbWVuc2lvbikgPT4ge1xuICAvLyAgICAgICByZXR1cm4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoZGltZW5zaW9uLmZrX21lYXN1cmVtZW50X3VuaXQpXG4gIC8vICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICBtYXAocHJldmlldyA9PiB7XG5cbiAgLy8gICAgICAgICAgICAgY29uc3Qgbm9kZTogRGltZW5zaW9uSXRlbSA9IHtcbiAgLy8gICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAvLyAgICAgICAgICAgICAgIGxhYmVsOiBgJHtkaW1lbnNpb24ubnVtZXJpY192YWx1ZX0gJHtwcmV2aWV3LmVudGl0eV9sYWJlbH1gLFxuICAvLyAgICAgICAgICAgICAgIGZrQ2xhc3M6IGRpbWVuc2lvbi5ma19jbGFzcyxcbiAgLy8gICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAvLyAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICApXG4gIC8vICAgICB9KVxuICAvLyAgIClcbiAgLy8gfVxuXG5cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlSXRlbUxhbmdTdHJpbmcoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPExhbmdTdHJpbmdJdGVtPiB7XG4gIC8vICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmdfc3RyaW5nJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAoXG4gIC8vICAgICAgIChsYW5nU3RyaW5nKSA9PiB7XG4gIC8vICAgICAgICAgaWYgKCFsYW5nU3RyaW5nKSByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKVxuICAvLyAgICAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5ndWFnZSQuYnlfcGtfZW50aXR5JC5rZXkobGFuZ1N0cmluZy5ma19sYW5ndWFnZSlcbiAgLy8gICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICBtYXAobGFuZ3VhZ2UgPT4ge1xuICAvLyAgICAgICAgICAgICAgIGlmICghbGFuZ3VhZ2UpIHJldHVybiBudWxsO1xuICAvLyAgICAgICAgICAgICAgIGxldCBsYWJlbCA9ICcnO1xuICAvLyAgICAgICAgICAgICAgIGlmIChsYW5nU3RyaW5nLnN0cmluZykgbGFiZWwgPSBsYW5nU3RyaW5nLnN0cmluZ1xuICAvLyAgICAgICAgICAgICAgIGVsc2UgaWYgKGxhbmdTdHJpbmcucXVpbGxfZG9jICYmIGxhbmdTdHJpbmcucXVpbGxfZG9jLm9wcyAmJiBsYW5nU3RyaW5nLnF1aWxsX2RvYy5vcHMubGVuZ3RoKSB7XG4gIC8vICAgICAgICAgICAgICAgICBsYWJlbCA9IGxhbmdTdHJpbmcucXVpbGxfZG9jLm9wcy5tYXAob3AgPT4gb3AuaW5zZXJ0KS5qb2luKCcnKTtcbiAgLy8gICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgICAgY29uc3Qgbm9kZTogTGFuZ1N0cmluZ0l0ZW0gPSB7XG4gIC8vICAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgLy8gICAgICAgICAgICAgICAgIGxhYmVsLFxuICAvLyAgICAgICAgICAgICAgICAgZmtDbGFzczogbGFuZ1N0cmluZy5ma19jbGFzcyxcbiAgLy8gICAgICAgICAgICAgICAgIGxhbmd1YWdlLFxuICAvLyAgICAgICAgICAgICAgICAgZmtMYW5ndWFnZTogbGFuZ1N0cmluZy5ma19sYW5ndWFnZVxuICAvLyAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAvLyAgICAgICAgICAgICB9KVxuICAvLyAgICAgICAgICAgKVxuICAvLyAgICAgICB9KVxuICAvLyAgIClcbiAgLy8gfVxuXG5cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlSXRlbUVudGl0eVByZXZpZXcoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtPiB7XG4gIC8vICAgcmV0dXJuIHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KChpc091dGdvaW5nID8gc3RhdGVtZW50LmZrX29iamVjdF9pbmZvIDogc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbykpLnBpcGUoXG4gIC8vICAgICAvLyBmaWx0ZXIocHJldmlldyA9PiAhcHJldmlldy5sb2FkaW5nICYmICEhcHJldmlldyAmJiAhIXByZXZpZXcuZW50aXR5X3R5cGUpLFxuICAvLyAgICAgbWFwKHByZXZpZXcgPT4ge1xuICAvLyAgICAgICBpZiAoIXByZXZpZXcpIHtcbiAgLy8gICAgICAgICByZXR1cm4gbnVsbDtcbiAgLy8gICAgICAgfVxuICAvLyAgICAgICBjb25zdCBub2RlOiBFbnRpdHlQcmV2aWV3SXRlbSA9IHtcbiAgLy8gICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgc3RhdGVtZW50LFxuICAvLyAgICAgICAgIHByZXZpZXcsXG4gIC8vICAgICAgICAgbGFiZWw6IHByZXZpZXcuZW50aXR5X2xhYmVsIHx8ICcnLFxuICAvLyAgICAgICAgIGZrQ2xhc3M6IHByZXZpZXcuZmtfY2xhc3NcbiAgLy8gICAgICAgfVxuICAvLyAgICAgICByZXR1cm4gbm9kZVxuICAvLyAgICAgfSkpXG4gIC8vIH1cblxuICAvLyAvKipcbiAgLy8gICogQHBhcmFtIHBrXG4gIC8vICAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVJdGVtVGltZVByaW1pdGl2ZShzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCwgcGtQcm9qZWN0KTogT2JzZXJ2YWJsZTxUaW1lUHJpbWl0aXZlSXRlbT4ge1xuICAvLyAgIGlmIChwa1Byb2plY3QpIHtcbiAgLy8gICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAvLyAgICAgICB0aGlzLnMuaW5mJC50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAvLyAgICAgICB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkLmtleShwa1Byb2plY3QgKyAnXycgKyBzdGF0ZW1lbnQucGtfZW50aXR5KS5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gIC8vICAgICApLnBpcGUoXG4gIC8vICAgICAgIG1hcCgoW2luZlRpbWVQcmltaXRpdmUsIHByb2pSZWxdKSA9PiB7XG4gIC8vICAgICAgICAgaWYgKCFpbmZUaW1lUHJpbWl0aXZlKSByZXR1cm4gbnVsbDtcbiAgLy8gICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAvLyAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gIC8vICAgICAgICAgICBjYWxlbmRhcjogKChwcm9qUmVsLmNhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAvLyAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAvLyAgICAgICAgIH0pXG4gIC8vICAgICAgICAgY29uc3Qgbm9kZTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gIC8vICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICAgIHN0YXRlbWVudCxcbiAgLy8gICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gIC8vICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gIC8vICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICAgIHJldHVybiBub2RlXG4gIC8vICAgICAgIH0pKVxuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5pbmZSZXBvLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoZmlsdGVyKHggPT4gISF4KSkucGlwZShcbiAgLy8gICAgICAgbWFwKGluZlRpbWVQcmltaXRpdmUgPT4ge1xuICAvLyAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gIC8vICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgLy8gICAgICAgICAgIGNhbGVuZGFyOiAoKHN0YXRlbWVudC5jb21tdW5pdHlfZmF2b3JpdGVfY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gIC8vICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gIC8vICAgICAgICAgfSlcbiAgLy8gICAgICAgICBjb25zdCBub2RlOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgLy8gICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgICAgc3RhdGVtZW50LFxuICAvLyAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgLy8gICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlKSxcbiAgLy8gICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgICAgcmV0dXJuIG5vZGVcbiAgLy8gICAgICAgfSlcbiAgLy8gICAgIClcbiAgLy8gICB9XG4gIC8vIH1cblxuXG4gIC8vIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gKiBQaXBlIGFsdGVybmF0aXZlcyAobm90IGluIHByb2plY3QpXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlQWx0TGlzdExlbmd0aChsOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gIC8vICAgc3dpdGNoIChsLmxpc3RUeXBlKSB7XG4gIC8vICAgICBjYXNlICdhcHBlbGxhdGlvbic6XG4gIC8vICAgICBjYXNlICdlbnRpdHktcHJldmlldyc6XG4gIC8vICAgICBjYXNlICdsYW5ndWFnZSc6XG4gIC8vICAgICBjYXNlICdwbGFjZSc6XG4gIC8vICAgICBjYXNlICdsYW5nU3RyaW5nJzpcbiAgLy8gICAgIGNhc2UgJ3RlbXBvcmFsLWVudGl0eSc6XG4gIC8vICAgICBjYXNlICd0aW1lLXNwYW4nOlxuICAvLyAgICAgICByZXR1cm4gdGhpcy5waXBlQWx0TGlzdFN0YXRlbWVudHMobCwgcGtFbnRpdHkpLnBpcGUobWFwKGl0ZW1zID0+IGl0ZW1zLmxlbmd0aCkpXG5cbiAgLy8gICAgIGRlZmF1bHQ6XG4gIC8vICAgICAgIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICAvLyAgICAgICBicmVhaztcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVBbHRMaXN0KGw6IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8SXRlbUxpc3Q+IHtcbiAgLy8gICBpZiAobC5saXN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RBcHBlbGxhdGlvbihsLCBwa0VudGl0eSlcbiAgLy8gICBlbHNlIGlmIChsLmxpc3RUeXBlLmVudGl0eVByZXZpZXcpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0RW50aXR5UHJldmlldyhsLCBwa0VudGl0eSlcbiAgLy8gICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmd1YWdlKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdExhbmd1YWdlKGwsIHBrRW50aXR5KVxuICAvLyAgIGVsc2UgaWYgKGwubGlzdFR5cGUucGxhY2UpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0UGxhY2UobCwgcGtFbnRpdHkpXG4gIC8vICAgZWxzZSBpZiAobC5saXN0VHlwZS5kaW1lbnNpb24pIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0RGltZW5zaW9uKGwsIHBrRW50aXR5KVxuICAvLyAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ1N0cmluZykgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RMYW5nU3RyaW5nKGwsIHBrRW50aXR5KVxuICAvLyAgIGVsc2UgaWYgKGwubGlzdFR5cGUudGVtcG9yYWxFbnRpdHkpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0RW50aXR5UHJldmlldyhsLCBwa0VudGl0eSlcbiAgLy8gICBlbHNlIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICAvLyB9XG5cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlQWx0TGlzdFN0YXRlbWVudHMobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAvLyAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gIC8vICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpIDpcbiAgLy8gICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgLy8gICApXG4gIC8vIH1cblxuICAvLyAvKipcbiAgLy8gKiBQaXBlIHRoZSBpdGVtcyBpbiBlbnRpdHkgcHJldmlldyBmaWVsZFxuICAvLyAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVBbHRMaXN0RW50aXR5UHJldmlldzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgLy8gICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAvLyAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkgOlxuICAvLyAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUluZ29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAvLyAgICkucGlwZShcbiAgLy8gICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZykpKVxuICAvLyAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzXG4gIC8vICAgICAgICAgICAgIC5maWx0ZXIobm9kZSA9PiAhIW5vZGUpXG4gIC8vICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLm9yZE51bSA+IGIub3JkTnVtID8gMSA6IC0xKVxuICAvLyAgICAgICAgICAgKSxcbiAgLy8gICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICB9KSlcblxuICAvLyB9XG5cbiAgLy8gLyoqXG4gIC8vICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIHBsYWNlIGxpc3RcbiAgLy8gICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUFsdExpc3RQbGFjZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxQbGFjZUl0ZW1bXT4ge1xuXG4gIC8vICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAvLyAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbVBsYWNlKHIpKSlcbiAgLy8gICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgfSkpXG4gIC8vICAgfVxuICAvLyB9XG5cblxuICAvLyAvKipcbiAgLy8gICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gZGltZW5zaW9uIGxpc3RcbiAgLy8gICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUFsdExpc3REaW1lbnNpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbVtdPiB7XG5cbiAgLy8gICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gIC8vICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpKSlcbiAgLy8gICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgfSkpXG4gIC8vICAgfVxuICAvLyB9XG5cblxuICAvLyAvKipcbiAgLy8gICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gbGFuZ1N0cmluZyBsaXN0XG4gIC8vICAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVBbHRMaXN0TGFuZ1N0cmluZzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxMYW5nU3RyaW5nSXRlbVtdPiB7XG5cbiAgLy8gICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gIC8vICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ1N0cmluZyhyKSkpXG4gIC8vICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgIH0pKVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBhcHBlbGxhdGlvbiBmaWVsZFxuICAvLyAgKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlQWx0TGlzdEFwcGVsbGF0aW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEFwcGVsbGF0aW9uSXRlbVtdPiB7XG5cbiAgLy8gICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gIC8vICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocikpKVxuICAvLyAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICB9KSlcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyAvKipcbiAgLy8gICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gbGFuZ3VhZ2UgZmllbGRcbiAgLy8gICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUFsdExpc3RMYW5ndWFnZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW1bXT4ge1xuXG4gIC8vICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAvLyAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpKSlcbiAgLy8gICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgfSkpXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyAgKiBQaXBlIHJlcG8gdmlld3MgKGNvbW11bml0eSBmYXZvcml0ZXMsIHdoZXJlIHJlc3RyaWN0ZWQgYnkgcXVhbnRpZmllcnMpXG4gIC8vICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgLy8gLyoqXG4gIC8vICAqIFBpcGUgcmVwb3NpdG9yeSB0ZW1wb3JhbCBlbnRpdHkgaXRlbSBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgLy8gICovXG5cblxuICAvLyAvKipcbiAgLy8gICogUGlwZSBhcHBlbGxhdGlvbiBsaXN0IGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAvLyAgKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlUmVwb0xpc3RBcHBlbGxhdGlvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW1bXT4ge1xuXG4gIC8vICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAvLyAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpKSlcbiAgLy8gICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgfSkpXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gLyoqXG4gIC8vICogUGlwZSBsYW5ndWFnZSBsaXN0IGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAvLyAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVSZXBvTGlzdExhbmd1YWdlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbVtdPiB7XG5cbiAgLy8gICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gIC8vICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2UocikpKVxuICAvLyAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICB9KSlcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyAvKipcbiAgLy8gICogUGlwZSBwbGFjZSBsaXN0IGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAvLyAgKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlUmVwb0xpc3RQbGFjZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxQbGFjZUl0ZW1bXT4ge1xuXG4gIC8vICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAvLyAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbVBsYWNlKHIpKSlcbiAgLy8gICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgfSkpXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gLyoqXG4gIC8vICogUGlwZSBwbGFjZSBsaXN0IGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAvLyAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVSZXBvTGlzdERpbWVuc2lvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtW10+IHtcblxuICAvLyAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgLy8gICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1EaW1lbnNpb24ocikpKVxuICAvLyAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICB9KSlcbiAgLy8gICB9XG4gIC8vIH1cbiAgLy8gLyoqXG4gIC8vICogUGlwZSB0aGUgaXRlbXMgaW4gZW50aXR5IHByZXZpZXcgZmllbGQsIGNvbm5lY3RlZCBieSBjb21tdW5pdHkgZmF2b3JpdGUgc3RhdGVtZW50c1xuICAvLyAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVSZXBvTGlzdEVudGl0eVByZXZpZXc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gIC8vICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgLy8gICAgIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpIDpcbiAgLy8gICAgIHRoaXMuYi5waXBlUmVwb0luZ29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgLy8gICApLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpKSlcbiAgLy8gICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcylcbiAgLy8gICAgICAgICAgICAgLy8gLnNvcnQoKGEsIGIpID0+IGEub3JkTnVtID4gYi5vcmROdW0gPyAxIDogLTEpXG4gIC8vICAgICAgICAgICApKVxuICAvLyAgICAgfSksXG4gIC8vICAgICBzdGFydFdpdGgoW10pXG4gIC8vICAgKVxuXG4gIC8vIH1cblxuXG4gIC8vIC8qKlxuICAvLyAgKiBQaXBlIHJlcG8gdGltZSBzcGFuIGl0ZW1cbiAgLy8gICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZVJlcG9JdGVtVGltZVNwYW4ocGtFbnRpdHkpOiBPYnNlcnZhYmxlPFRpbWVTcGFuSXRlbT4ge1xuICAvLyAgIHJldHVybiB0aGlzLnAucGtQcm9qZWN0JC5waXBlKFxuICAvLyAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gIC8vICAgICAgIHJldHVybiB0aGlzLmMucGlwZUJhc2ljQW5kU3BlY2lmaWNGaWVsZHMoXG4gIC8vICAgICAgICAgRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTlxuICAvLyAgICAgICApLnBpcGUoXG4gIC8vICAgICAgICAgc3dpdGNoTWFwKGZpZWxkRGVmaW5pdGlvbnMgPT4ge1xuXG4gIC8vICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChmaWVsZERlZmluaXRpb25zLm1hcChmaWVsZERlZiA9PlxuICAvLyAgICAgICAgICAgICB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGZpZWxkRGVmLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAvLyAgICAgICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICAgICAgc3dpdGNoTWFwT3IoW10sIHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdChcbiAgLy8gICAgICAgICAgICAgICAgICAgc3RhdGVtZW50cy5tYXAoc3RhdGVtZW50ID0+XG4gIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZSZXBvLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAucGlwZShtYXAoKGluZlRpbWVQcmltaXRpdmUpID0+IHtcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxlbmRhcjogKChzdGF0ZW1lbnQuY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlKSxcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gIC8vICAgICAgICAgICAgICAgICAgICAgICB9KSlcbiAgLy8gICAgICAgICAgICAgICAgICAgKVxuICAvLyAgICAgICAgICAgICAgICAgKSksXG4gIC8vICAgICAgICAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAvLyAgICAgICAgICAgICAgICAgICBjb25zdCByZXM6IFRpbWVTcGFuUHJvcGVydHkgPSB7XG4gIC8vICAgICAgICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb246IGZpZWxkRGVmLmxpc3REZWZpbml0aW9uc1swXSwgaXRlbXNcbiAgLy8gICAgICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzXG4gIC8vICAgICAgICAgICAgICAgICB9KSxcbiAgLy8gICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7IGxpc3REZWZpbml0aW9uOiBmaWVsZERlZi5saXN0RGVmaW5pdGlvbnNbMF0sIGl0ZW1zOiBbXSB9IGFzIFRpbWVTcGFuUHJvcGVydHkpXG4gIC8vICAgICAgICAgICAgICAgKVxuICAvLyAgICAgICAgICAgKSkucGlwZShcbiAgLy8gICAgICAgICAgICAgbWFwKChwcm9wZXJ0aWVzKSA9PiB7XG4gIC8vICAgICAgICAgICAgICAgY29uc3QgdGltZXNwYW5pdGVtOiBUaW1lU3Bhbkl0ZW0gPSB7XG4gIC8vICAgICAgICAgICAgICAgICBsYWJlbDogJycsXG4gIC8vICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLmZpbHRlcihwcm9wcyA9PiBwcm9wcy5pdGVtcy5sZW5ndGggPiAwKVxuICAvLyAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICByZXR1cm4gdGltZXNwYW5pdGVtXG4gIC8vICAgICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICApXG4gIC8vICAgICAgICAgfSlcbiAgLy8gICAgICAgKVxuICAvLyAgICAgfSlcblxuICAvLyAgIClcbiAgLy8gfVxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBsYWJlbCBvZiBnaXZlbiBlbnRpdHlcbiAgICogVGhpcyB3aWxsIHVzZSBlbnRpdHkgcHJldmlld3MgZm9yIGdldHRpbmcgc3RyaW5ncyBvZiByZWxhdGVkIHRlbXBvcmFsIGVudGl0aWVzXG4gICAqIFNvIHRoaXMgbWF5IHRha2UgYSBsaXR0bGUgd2hpbGVcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxhYmVsT2ZFbnRpdHkoZmtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KGZrRW50aXR5KS5waXBlKG1hcChwID0+IHAuZW50aXR5X2xhYmVsKSlcbiAgICAvLyByZXR1cm4gdGhpcy5iLnBpcGVDbGFzc09mRW50aXR5KGZrRW50aXR5KS5waXBlKFxuXG4gICAgLy8gICAvLyBnZXQgdGhlIGRlZmluaXRpb24gb2YgdGhlIGZpcnN0IGZpZWxkXG4gICAgLy8gICBzd2l0Y2hNYXAoZmtDbGFzcyA9PiB0aGlzLmMucGlwZUJhc2ljQW5kU3BlY2lmaWNGaWVsZHMoZmtDbGFzcykucGlwZShcbiAgICAvLyAgICAgLy8gZ2V0IHRoZSBmaXJzdCBpdGVtIG9mIHRoYXQgZmllbGRcbiAgICAvLyAgICAgc3dpdGNoTWFwKGZpZWxkcyA9PiB0aGlzLnBpcGVTdWJmaWVsZFBhZ2UoZmllbGRbMF0sKS5waXBlKFxuICAgIC8vICAgICAgIG1hcChwcm9wcyA9PiB7XG4gICAgLy8gICAgICAgICBwcm9wcyA9IHByb3BzLmZpbHRlcihwcm9wID0+IHByb3AuaXRlbXMubGVuZ3RoID4gMClcbiAgICAvLyAgICAgICAgIGlmIChwcm9wcy5sZW5ndGggJiYgcHJvcHNbMF0uaXRlbXMubGVuZ3RoKSB7XG4gICAgLy8gICAgICAgICAgIHJldHVybiBwcm9wc1swXS5pdGVtc1swXS5sYWJlbFxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgcmV0dXJuICcnXG4gICAgLy8gICAgICAgfSlcbiAgICAvLyAgICAgKSkpXG4gICAgLy8gICApKVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIGNsYXNzIGxhYmVsIG9mIGdpdmVuIGVudGl0eVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQ2xhc3NMYWJlbE9mRW50aXR5KGZrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmIucGlwZUNsYXNzT2ZFbnRpdHkoZmtFbnRpdHkpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtDbGFzcyA9PiB0aGlzLmMucGlwZUNsYXNzTGFiZWwocGtDbGFzcykpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBwa19lbnRpdHkgb2YgdGhlIHR5cGUgb2YgYW4gZW50aXR5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVUeXBlT2ZFbnRpdHkocGtFbnRpdHk6IG51bWJlciwgaGFzVHlwZVByb3BlcnR5OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudD4ge1xuICAgIGlmIChpc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7IGZrX3Byb3BlcnR5OiBoYXNUeXBlUHJvcGVydHksIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHkgfSkucGlwZShtYXAoaXRlbXMgPT4ge1xuICAgICAgICBpZiAoIWl0ZW1zIHx8IE9iamVjdC5rZXlzKGl0ZW1zKS5sZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBlbHNlIHJldHVybiB2YWx1ZXMoaXRlbXMpWzBdXG4gICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoeyBma19wcm9wZXJ0eTogaGFzVHlwZVByb3BlcnR5LCBma19vYmplY3RfaW5mbzogcGtFbnRpdHkgfSkucGlwZShcbiAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICBpZiAoIWl0ZW1zIHx8IE9iamVjdC5rZXlzKGl0ZW1zKS5sZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlcyhpdGVtcylbMF1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlQ2xhc3Nlc0FuZFR5cGVzKGVuYWJsZWRJbjogJ2VudGl0aWVzJyB8ICdzb3VyY2VzJykge1xuICAgIHJldHVybiB0aGlzLmMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXMoZW5hYmxlZEluKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGl0ZW1zID0+IHRoaXMucGlwZUNsYXNzQW5kVHlwZU5vZGVzKGl0ZW1zKSksXG4gICAgKVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzZXNBbmRUeXBlc09mQ2xhc3NlcyhjbGFzc2VzOiBudW1iZXJbXSkge1xuICAgIHJldHVybiB0aGlzLmMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXNPZlR5cGVkQ2xhc3NlcyhjbGFzc2VzKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGl0ZW1zID0+IHRoaXMucGlwZUNsYXNzQW5kVHlwZU5vZGVzKGl0ZW1zKSksXG4gICAgKVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzQW5kVHlwZU5vZGVzKHR5cGVBbmRUeXBlZENsYXNzZXM6IHsgdHlwZWRDbGFzczogbnVtYmVyOyB0eXBlQ2xhc3M6IG51bWJlcjsgfVtdKTogT2JzZXJ2YWJsZTxDbGFzc0FuZFR5cGVOb2RlW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICB0eXBlQW5kVHlwZWRDbGFzc2VzLm1hcChpdGVtID0+IHRoaXMuYy5waXBlQ2xhc3NMYWJlbChpdGVtLnR5cGVkQ2xhc3MpLnBpcGUoXG4gICAgICAgIG1hcChsYWJlbCA9PiAoe1xuICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgIGRhdGE6IHsgcGtDbGFzczogaXRlbS50eXBlZENsYXNzLCBwa1R5cGU6IG51bGwgfVxuICAgICAgICB9IGFzIENsYXNzQW5kVHlwZU5vZGUpKSxcbiAgICAgICAgc3dpdGNoTWFwKG5vZGUgPT4gaWlmKFxuICAgICAgICAgICgpID0+ICEhaXRlbS50eXBlQ2xhc3MsXG4gICAgICAgICAgdGhpcy5iLnBpcGVQZXJzaXN0ZW50SXRlbVBrc0J5Q2xhc3MoaXRlbS50eXBlQ2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAodHlwZVBrcyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgICAgICAgdHlwZVBrcy5tYXAocGtUeXBlID0+IHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KHBrVHlwZSkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAocHJldmlldyA9PiAoe1xuICAgICAgICAgICAgICAgICAgbGFiZWw6IHByZXZpZXcuZW50aXR5X2xhYmVsLFxuICAgICAgICAgICAgICAgICAgZGF0YTogeyBwa0NsYXNzOiBpdGVtLnR5cGVkQ2xhc3MsIHBrVHlwZSB9XG4gICAgICAgICAgICAgICAgfSBhcyBDbGFzc0FuZFR5cGVOb2RlKSlcbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgc29ydEFiYyhuID0+IG4ubGFiZWwpLFxuICAgICAgICAgICAgKSksXG4gICAgICAgICAgICBtYXAoY2hpbGRyZW4gPT4ge1xuICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuID0gY2hpbGRyZW5cbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSxcbiAgICAgICAgICBvZih7IC4uLm5vZGUsIGNoaWxkcmVuOiBbXSB9IGFzIENsYXNzQW5kVHlwZU5vZGUpXG4gICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKSlcbiAgICApLnBpcGUoXG4gICAgICBzb3J0QWJjKChub2RlKSA9PiBub2RlLmxhYmVsKSxcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhcnJheSBvZiBwa19jbGFzcyBvZiBhbGwgY2xhc3NlcyBhbmQgdHlwZWQgY2xhc3Nlcy5cbiAgICogQHBhcmFtIGNsYXNzZXNBbmRUeXBlcyBhIG9iamVjdCBjb250YWluaW5nIHtjbGFzc2VzOiBbXSwgdHlwZXNbXX1cbiAgICovXG4gIHBpcGVDbGFzc2VzRnJvbUNsYXNzZXNBbmRUeXBlcyhjbGFzc2VzQW5kVHlwZXM6IENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIGNvbnN0IHR5cGVkQ2xhc3NlcyQgPSAoIWNsYXNzZXNBbmRUeXBlcyB8fCAhY2xhc3Nlc0FuZFR5cGVzLnR5cGVzIHx8ICFjbGFzc2VzQW5kVHlwZXMudHlwZXMubGVuZ3RoKSA/XG4gICAgICBvZihbXSBhcyBudW1iZXJbXSkgOlxuICAgICAgdGhpcy5iLnBpcGVDbGFzc2VzT2ZQZXJzaXN0ZW50SXRlbXMoY2xhc3Nlc0FuZFR5cGVzLnR5cGVzKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKHBrcykgPT4gISFwa3MpLFxuICAgICAgICAgIHN3aXRjaE1hcCh0eXBlQ2xhc3NlcyA9PiB0aGlzLmMucGlwZVR5cGVkQ2xhc3Nlc09mVHlwZUNsYXNzZXModHlwZUNsYXNzZXMpKVxuICAgICAgICApXG4gICAgcmV0dXJuIHR5cGVkQ2xhc3NlcyQucGlwZShcbiAgICAgIG1hcCh0eXBlZENsYXNzZXMgPT4gdW5pcShbLi4udHlwZWRDbGFzc2VzLCAuLi4oKGNsYXNzZXNBbmRUeXBlcyB8fCB7IGNsYXNzZXM6IFtdIH0pLmNsYXNzZXMgfHwgW10pXSkpXG4gICAgKTtcbiAgfVxuXG4gIHBpcGVQcm9wZXJ0eU9wdGlvbnNGcm9tQ2xhc3Nlc0FuZFR5cGVzKGNsYXNzZXNBbmRUeXBlczogQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwpOiBPYnNlcnZhYmxlPFByb3BlcnR5T3B0aW9uW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlQ2xhc3Nlc0Zyb21DbGFzc2VzQW5kVHlwZXMoY2xhc3Nlc0FuZFR5cGVzKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGNsYXNzZXMgPT4gdGhpcy5waXBlUHJvcGVydHlPcHRpb25zRm9ybUNsYXNzZXMoY2xhc3NlcykpXG4gICAgKVxuICB9XG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVQcm9wZXJ0eU9wdGlvbnNGb3JtQ2xhc3NlcyhjbGFzc2VzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8UHJvcGVydHlPcHRpb25bXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShjbGFzc2VzLm1hcChwa0NsYXNzID0+IHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLnBpcGUoXG4gICAgICBtYXAoYyA9PiBjLmJhc2ljX3R5cGUgPT09IDkpLFxuICAgICAgc3dpdGNoTWFwKGlzVGVFbiA9PiB0aGlzLmMucGlwZVNwZWNpZmljQW5kQmFzaWNGaWVsZHMocGtDbGFzcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGNsYXNzRmllbGRzID0+IGNsYXNzRmllbGRzXG4gICAgICAgICAgICAuZmlsdGVyKGYgPT4gISFmLnByb3BlcnR5LnBrUHJvcGVydHkpXG4gICAgICAgICAgICAubWFwKGYgPT4gKHtcbiAgICAgICAgICAgICAgaXNPdXRnb2luZzogZi5pc091dGdvaW5nLFxuICAgICAgICAgICAgICBma1Byb3BlcnR5RG9tYWluOiBmLmlzT3V0Z29pbmcgPyBmLnNvdXJjZUNsYXNzIDogbnVsbCxcbiAgICAgICAgICAgICAgZmtQcm9wZXJ0eVJhbmdlOiBmLmlzT3V0Z29pbmcgPyBudWxsIDogZi5zb3VyY2VDbGFzcyxcbiAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogZi5wcm9wZXJ0eS5wa1Byb3BlcnR5XG4gICAgICAgICAgICB9KSkpLFxuICAgICAgICAgIHN3aXRjaE1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICBpZiAoaXNUZUVuKSB7XG4gICAgICAgICAgICAgIC8vIGFkZCB0aW1lIHByb3BlcnRpZXMgKGF0IHNvbWUgdGltZSB3aXRoaW4sIC4uLilcbiAgICAgICAgICAgICAgRGZoQ29uZmlnLlBST1BFUlRZX1BLU19XSEVSRV9USU1FX1BSSU1JVElWRV9JU19SQU5HRS5tYXAocGtQcm9wZXJ0eSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgZmtQcm9wZXJ0eURvbWFpbjogcGtDbGFzcyxcbiAgICAgICAgICAgICAgICAgIGZrUHJvcGVydHlSYW5nZTogRGZoQ29uZmlnLkNMQVNTX1BLX1RJTUVfUFJJTUlUSVZFLFxuICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShpdGVtcy5tYXAoaXRlbSA9PiB0aGlzLmMucGlwZUZpZWxkTGFiZWwoXG4gICAgICAgICAgICAgIGl0ZW0ucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgaXRlbS5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICAgICAgICBpdGVtLmZrUHJvcGVydHlSYW5nZSxcbiAgICAgICAgICAgICkucGlwZShtYXAobGFiZWwgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc091dGdvaW5nID0gaXRlbS5pc091dGdvaW5nO1xuICAgICAgICAgICAgICBjb25zdCBvOiBQcm9wZXJ0eU9wdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICAgIHBrOiBpdGVtLnBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgcHJvcGVydHlGaWVsZEtleTogcHJvcGVydHlPcHRpb25GaWVsZEtleShpdGVtLnBrUHJvcGVydHksIGlzT3V0Z29pbmcpXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgfSkpKSk7XG4gICAgICAgICAgfSkpKVxuICAgIClcblxuXG4gICAgKSkucGlwZShtYXAoeSA9PiBmbGF0dGVuPFByb3BlcnR5T3B0aW9uPih5KSkpO1xuICB9XG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVQa0NsYXNzZXNGcm9tUHJvcGVydHlTZWxlY3RNb2RlbChtb2RlbDogUHJvcGVydHlTZWxlY3RNb2RlbCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICBbXG4gICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5vdXRnb2luZ1Byb3BlcnRpZXMsIHRydWUpLFxuICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwuaW5nb2luZ1Byb3BlcnRpZXMsIGZhbHNlKSxcbiAgICAgIF1cbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFtvdXQsIGluZ10pID0+IHVuaXEoWy4uLm91dCwgLi4uaW5nXSkpXG4gICAgKVxuICB9XG5cbiAgZ2V0UGtDbGFzc2VzRnJvbVByb3BlcnR5U2VsZWN0TW9kZWwkKG1vZGVsJDogT2JzZXJ2YWJsZTxQcm9wZXJ0eVNlbGVjdE1vZGVsPik6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gbW9kZWwkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAobW9kZWwgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIFtcbiAgICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwub3V0Z29pbmdQcm9wZXJ0aWVzLCB0cnVlKSxcbiAgICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwuaW5nb2luZ1Byb3BlcnRpZXMsIGZhbHNlKSxcbiAgICAgICAgXVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXAoKFtvdXQsIGluZ10pID0+IHVuaXEoWy4uLm91dCwgLi4uaW5nXSkpXG4gICAgICApKVxuICAgIClcbiAgfVxuXG5cblxuICBnZXRQcm9wZXJ0eU9wdGlvbnMkKGNsYXNzVHlwZXMkOiBPYnNlcnZhYmxlPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsPik6IE9ic2VydmFibGU8UHJvcGVydHlPcHRpb25bXT4ge1xuICAgIHJldHVybiBjbGFzc1R5cGVzJC5waXBlPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsLCBQcm9wZXJ0eU9wdGlvbltdPihcbiAgICAgIC8vIG1ha2Ugc3VyZSBvbmx5IGl0IHBhc3NlcyBvbmx5IGlmIGRhdGEgb2YgdGhlIGFycmF5Q2xhc3NlcyBhcmUgY2hhbmdlZCAobm90IGNoaWxkcmVuKVxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQ8Q2xhc3NBbmRUeXBlU2VsZWN0TW9kZWw+KChhLCBiKSA9PiB7XG4gICAgICAgIHJldHVybiBlcXVhbHMoYSwgYik7XG4gICAgICB9KSxcbiAgICAgIHN3aXRjaE1hcCgoeCkgPT4gIXggPyBlbXB0eSgpIDogdGhpcy5iLnBpcGVDbGFzc2VzT2ZQZXJzaXN0ZW50SXRlbXMoeC50eXBlcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChwa3MpID0+ICEhcGtzKSxcbiAgICAgICAgICBzd2l0Y2hNYXAodHlwZUNsYXNzZXMgPT4gdGhpcy5jLnBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHR5cGVDbGFzc2VzKS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKHR5cGVkQ2xhc3NlcyA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSB1bmlxKFsuLi50eXBlZENsYXNzZXMsIC4uLih4LmNsYXNzZXMgfHwgW10pXSk7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVQcm9wZXJ0eU9wdGlvbnNGb3JtQ2xhc3NlcyhjbGFzc2VzKVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eU9wdGlvbkZpZWxkS2V5KGZrUHJvcGVydHk6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IHN0cmluZyB7XG4gIHJldHVybiAnXycgKyBma1Byb3BlcnR5ICsgJ18nICsgKGlzT3V0Z29pbmcgPyAnb3V0Z29pbmcnIDogJ2luZ29pbmcnKTtcbn1cblxuIl19