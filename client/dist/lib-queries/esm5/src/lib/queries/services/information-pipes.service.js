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
        else {
            return new BehaviorSubject({
                projRel: undefined,
                ordNum: 0
            });
        }
    };
    /**
     * pipe the target of given statment
     * @param stmt InfStatement to be completed with target
     * @param page page for which we are piping this stuff
     * @param subfieldType type of subfield for which we pipe this stuff
     */
    /**
     * pipe the target of given statment
     * @param {?} stmt InfStatement to be completed with target
     * @param {?} page page for which we are piping this stuff
     * @param {?} subfieldType type of subfield for which we pipe this stuff
     * @return {?}
     */
    InformationPipesService.prototype.pipeTargetOfStatement = /**
     * pipe the target of given statment
     * @param {?} stmt InfStatement to be completed with target
     * @param {?} page page for which we are piping this stuff
     * @param {?} subfieldType type of subfield for which we pipe this stuff
     * @return {?}
     */
    function (stmt, page, subfieldType) {
        var _this = this;
        /** @type {?} */
        var isOutgoing = page.isOutgoing;
        /** @type {?} */
        var targetInfo = isOutgoing ? stmt.fk_object_info : stmt.fk_subject_info;
        // here you could add targetData or targetCell
        if (subfieldType.appellation) {
            return this.s.inf$.appellation$.by_pk_entity$.key(targetInfo).pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; })), map((/**
             * @param {?} appellation
             * @return {?}
             */
            function (appellation) {
                /** @type {?} */
                var stmtTarget = {
                    statement: stmt,
                    isOutgoing: isOutgoing,
                    targetLabel: appellation.string,
                    targetClass: page.targetClass,
                    target: {
                        appellation: appellation
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
            function (x) { return !!x; })), map((/**
             * @param {?} place
             * @return {?}
             */
            function (place) {
                /** @type {?} */
                var stmtTarget = {
                    statement: stmt,
                    isOutgoing: isOutgoing,
                    targetLabel: "WGS84: " + place.lat + "\u00B0, " + place.long + "\u00B0",
                    targetClass: page.targetClass,
                    target: {
                        place: place
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
            function (x) { return !!x; })), switchMap((/**
             * @param {?} dimension
             * @return {?}
             */
            function (dimension) {
                return _this.p.streamEntityPreview(dimension.fk_measurement_unit)
                    .pipe(map((/**
                 * @param {?} unitPreview
                 * @return {?}
                 */
                function (unitPreview) {
                    /** @type {?} */
                    var stmtTarget = {
                        statement: stmt,
                        isOutgoing: isOutgoing,
                        targetLabel: dimension.numeric_value + " " + unitPreview.entity_label,
                        targetClass: page.targetClass,
                        target: {
                            dimension: dimension
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
            function (x) { return !!x; })), switchMap((/**
             * @param {?} langString
             * @return {?}
             */
            function (langString) {
                return _this.s.inf$.language$.by_pk_entity$.key(langString.fk_language)
                    .pipe(map((/**
                 * @param {?} language
                 * @return {?}
                 */
                function (language) {
                    /** @type {?} */
                    var stmtTarget = {
                        statement: stmt,
                        isOutgoing: isOutgoing,
                        targetLabel: langString.string + " (" + language.iso6391 + ")",
                        targetClass: page.targetClass,
                        target: {
                            langString: langString
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
            function (x) { return !!x; })), map((/**
             * @param {?} language
             * @return {?}
             */
            function (language) {
                /** @type {?} */
                var stmtTarget = {
                    statement: stmt,
                    isOutgoing: isOutgoing,
                    targetLabel: "" + (language.notes || language.iso6391),
                    targetClass: page.targetClass,
                    target: {
                        language: language
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
            function (x) { return !!x; })), map((/**
             * @param {?} entityPreview
             * @return {?}
             */
            function (entityPreview) {
                /** @type {?} */
                var stmtTarget = {
                    statement: stmt,
                    isOutgoing: isOutgoing,
                    targetLabel: "" + entityPreview.entity_label,
                    targetClass: page.targetClass,
                    target: {
                        entityPreview: entityPreview
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.temporalEntity) {
            // console.log('subfieldType.temporalEntity.length', subfieldType.temporalEntity.length)
            // for each of these subfields
            /** @type {?} */
            var subentityPages$ = subfieldType.temporalEntity.map((/**
             * @param {?} subfieldReq
             * @return {?}
             */
            function (subfieldReq) {
                // console.log('subentity subfield for targetInfo', targetInfo)
                // console.log('subentity subfield for targetInfo', targetInfo)
                // create page:GvSubfieldPage
                var _a = subfieldReq.page, isCircular = _a.isCircular, p = tslib_1.__rest(_a, ["isCircular"]);
                /** @type {?} */
                var nestedPage = tslib_1.__assign({}, p, { fkSourceEntity: targetInfo, scope: page.scope });
                return _this.pipeSubfieldPage(nestedPage, subfieldReq.subfieldType).pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var count = _a.count, statements = _a.statements;
                    var limit = nestedPage.limit, offset = nestedPage.offset, s = tslib_1.__rest(nestedPage, ["limit", "offset"]);
                    /** @type {?} */
                    var subentitySubfieldPage = {
                        subfield: s,
                        count: count,
                        statements: statements
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
            function (subfields) {
                /** @type {?} */
                var stmtTarget = {
                    statement: stmt,
                    isOutgoing: isOutgoing,
                    targetLabel: '',
                    targetClass: page.targetClass,
                    target: {
                        entity: {
                            pkEntity: targetInfo,
                            subfields: subfields
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
            var subentityPages$ = DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE
                .map((/**
             * @param {?} fkProperty
             * @return {?}
             */
            function (fkProperty) {
                // console.log('subentity subfield for targetInfo', targetInfo)
                // console.log('subentity subfield for targetInfo', targetInfo)
                // create page:GvSubfieldPage
                /** @type {?} */
                var nestedPage = {
                    fkProperty: fkProperty,
                    isOutgoing: true,
                    limit: 1,
                    offset: 0,
                    targetClass: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
                    fkSourceEntity: targetInfo,
                    scope: page.scope,
                };
                /** @type {?} */
                var subfType = {
                    timePrimitive: 'true'
                };
                return _this.pipeSubfieldPage(nestedPage, subfType).pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var count = _a.count, statements = _a.statements;
                    var limit = nestedPage.limit, offset = nestedPage.offset, s = tslib_1.__rest(nestedPage, ["limit", "offset"]);
                    /** @type {?} */
                    var subentitySubfieldPage = {
                        subfield: s,
                        count: count,
                        statements: statements
                    };
                    return subentitySubfieldPage;
                })));
            }));
            return combineLatestOrEmpty(subentityPages$)
                .pipe(map((/**
             * @param {?} subfields
             * @return {?}
             */
            function (subfields) {
                /** @type {?} */
                var timeSpanPreview = {};
                subfields.forEach((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) {
                    if (s.statements[0]) {
                        /** @type {?} */
                        var st = s.statements[0];
                        /** @type {?} */
                        var key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[st.statement.fk_property];
                        timeSpanPreview[key] = st.target.timePrimitive;
                    }
                }));
                /** @type {?} */
                var stmtTarget = {
                    statement: stmt,
                    isOutgoing: isOutgoing,
                    targetLabel: _this.timeSpanPipe.transform(new TimeSpanUtil(timeSpanPreview)),
                    targetClass: page.targetClass,
                    target: {
                        timeSpan: {
                            preview: timeSpanPreview,
                            subfields: subfields
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
            function (x) { return !!x; })), switchMap((/**
             * @param {?} timePrimitive
             * @return {?}
             */
            function (timePrimitive) {
                // get calendar
                /** @type {?} */
                var cal$;
                if (page.scope.inProject) {
                    cal$ = _this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(page.scope.inProject + '_' + stmt.pk_entity)
                        .pipe(map((/**
                     * @param {?} infoProjRel
                     * @return {?}
                     */
                    function (infoProjRel) { return (/** @type {?} */ (infoProjRel.calendar)); })));
                }
                else {
                    cal$ = new BehaviorSubject((/** @type {?} */ (stmt.community_favorite_calendar)));
                }
                // pipe target time primitive of stmt
                return cal$.pipe(map((/**
                 * @param {?} cal
                 * @return {?}
                 */
                function (cal) {
                    /** @type {?} */
                    var timePrimWithCal = infTimePrimToTimePrimWithCal(timePrimitive, cal);
                    /** @type {?} */
                    var stmtTarget = {
                        statement: stmt,
                        isOutgoing: isOutgoing,
                        targetLabel: _this.timePrimitivePipe.transform(timePrimWithCal),
                        targetClass: page.targetClass,
                        target: {
                            timePrimitive: timePrimWithCal
                        }
                    };
                    return stmtTarget;
                })));
            })));
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
            function (pkStmts) { return combineLatestOrEmpty(pkStmts.map((/**
             * @param {?} pkStmt
             * @return {?}
             */
            function (pkStmt) { return _this.s.inf$.statement$.by_pk_entity$.key(pkStmt)
                // for each statement, depending on the subfieldType, load the corresponding target
                .pipe(filter((/**
             * @param {?} stmt
             * @return {?}
             */
            function (stmt) { return !!stmt; })), switchMap((/**
             * @param {?} stmt
             * @return {?}
             */
            function (stmt) { return _this.pipeStatementWithTarget(stmt, page, subfieldType); }))); }))); })))).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = tslib_1.__read(_a, 2), count = _b[0], statements = _b[1];
                return ({ count: count, statements: statements });
            })));
        }
    };
    /**
     * @private
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    InformationPipesService.prototype.pipeTimeSpan = /**
     * @private
     * @param {?} page
     * @param {?} subfieldType
     * @return {?}
     */
    function (page, subfieldType) {
        /** @type {?} */
        var virtualStatementToTimeSpan = { fk_object_info: page.fkSourceEntity };
        return this.pipeTargetOfStatement(virtualStatementToTimeSpan, page, subfieldType).pipe(map((/**
         * @param {?} stmtTarget
         * @return {?}
         */
        function (stmtTarget) {
            /** @type {?} */
            var stmtWT = tslib_1.__assign({}, stmtTarget, { projRel: undefined, ordNum: undefined });
            return { count: 1, statements: [stmtWT] };
        })));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbmZvcm1hdGlvbi1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlqRCxPQUFPLEVBQWdCLG9CQUFvQixFQUFlLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkwsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBeUI5RixPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLDBC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QyxvQ0FBaUM7Ozs7O0lBQ2pDLG9DQUFvQzs7SUFDcEMsb0RBQTJDOzs7OztJQUMzQywrQ0FBa0M7Ozs7Ozs7QUFtcER0QyxNQUFNLFVBQVUsc0JBQXNCLENBQUMsVUFBa0IsRUFBRSxVQUFtQjtJQUM1RSxPQUFPLEdBQUcsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZmhDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IEluZlN0YXRlbWVudCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBHdlN1YmZpZWxkUGFnZSwgR3ZTdWJmaWVsZFR5cGUsIFRpbWVQcmltaXRpdmVXaXRoQ2FsLCBXYXJFbnRpdHlQcmV2aWV3VGltZVNwYW4gfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgQ2FsZW5kYXJUeXBlLCBjb21iaW5lTGF0ZXN0T3JFbXB0eSwgR3JhbnVsYXJpdHksIGxpbWl0VG8sIHNvcnRBYmMsIHN3aXRjaE1hcE9yLCBUaW1lUHJpbWl0aXZlLCBUaW1lUHJpbWl0aXZlUGlwZSwgVGltZVNwYW5QaXBlLCBUaW1lU3BhblV0aWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IGVxdWFscywgZmxhdHRlbiwgZ3JvdXBCeSwgcGljaywgdW5pcSwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBlbXB0eSwgaWlmLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFnIH0gZnJvbSAncnhqcy1zcHkvb3BlcmF0b3JzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhY2hlLCBzcHlUYWcgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IGluZlRpbWVQcmltVG9UaW1lUHJpbVdpdGhDYWwsIHRpbWVTcGFuSXRlbVRvVGltZVNwYW4gfSBmcm9tICcuLi9mdW5jdGlvbnMvZnVuY3Rpb25zJztcbmltcG9ydCB7IEFwcGVsbGF0aW9uSXRlbSB9IGZyb20gJy4uL21vZGVscy9BcHBlbGxhdGlvbkl0ZW0nO1xuaW1wb3J0IHsgQmFzaWNTdGF0ZW1lbnRJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0Jhc2ljU3RhdGVtZW50SXRlbSc7XG5pbXBvcnQgeyBDbGFzc0FuZFR5cGVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL0NsYXNzQW5kVHlwZU5vZGUnO1xuaW1wb3J0IHsgQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwnO1xuaW1wb3J0IHsgQ3RybFRpbWVTcGFuRGlhbG9nUmVzdWx0IH0gZnJvbSAnLi4vbW9kZWxzL0N0cmxUaW1lU3BhbkRpYWxvZ1Jlc3VsdCc7XG5pbXBvcnQgeyBEaW1lbnNpb25JdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0RpbWVuc2lvbkl0ZW0nO1xuaW1wb3J0IHsgRW50aXR5UHJldmlld0l0ZW0gfSBmcm9tICcuLi9tb2RlbHMvRW50aXR5UHJldmlld0l0ZW0nO1xuaW1wb3J0IHsgRW50aXR5UHJvcGVydGllcyB9IGZyb20gJy4uL21vZGVscy9FbnRpdHlQcm9wZXJ0aWVzJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL0ZpZWxkJztcbmltcG9ydCB7IEl0ZW1MaXN0IH0gZnJvbSAnLi4vbW9kZWxzL0l0ZW1MaXN0JztcbmltcG9ydCB7IExhbmdTdHJpbmdJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0xhbmdTdHJpbmdJdGVtJztcbmltcG9ydCB7IExhbmd1YWdlSXRlbSB9IGZyb20gJy4uL21vZGVscy9MYW5ndWFnZUl0ZW0nO1xuaW1wb3J0IHsgUGxhY2VJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1BsYWNlSXRlbSc7XG5pbXBvcnQgeyBQcm9wZXJ0eU9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9Qcm9wZXJ0eU9wdGlvbic7XG5pbXBvcnQgeyBQcm9wZXJ0eVNlbGVjdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL1Byb3BlcnR5U2VsZWN0TW9kZWwnO1xuaW1wb3J0IHsgU3RhdGVtZW50SXRlbSB9IGZyb20gJy4uL21vZGVscy9TdGF0ZW1lbnRJdGVtJztcbmltcG9ydCB7IFN0YXRlbWVudFByb2pSZWwsIFN0YXRlbWVudFRhcmdldCwgU3RhdGVtZW50V2l0aFRhcmdldCwgU3ViZW50aXR5U3ViZmllbGRQYWdlLCBTdWJmaWVsZFBhZ2UgfSBmcm9tICcuLi9tb2RlbHMvU3RhdGVtZW50V2l0aFRhcmdldCc7XG5pbXBvcnQgeyBTdWJmaWVsZCB9IGZyb20gJy4uL21vZGVscy9TdWJmaWVsZCc7XG5pbXBvcnQgeyBUZW1wb3JhbEVudGl0eUNlbGwgfSBmcm9tICcuLi9tb2RlbHMvVGVtcG9yYWxFbnRpdHlDZWxsJztcbmltcG9ydCB7IFRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcyB9IGZyb20gJy4uL21vZGVscy9UZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMnO1xuaW1wb3J0IHsgVGVtcG9yYWxFbnRpdHlSb3cgfSBmcm9tICcuLi9tb2RlbHMvVGVtcG9yYWxFbnRpdHlSb3cnO1xuaW1wb3J0IHsgVGltZVByaW1pdGl2ZUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvVGltZVByaW1pdGl2ZUl0ZW0nO1xuaW1wb3J0IHsgVGltZVNwYW5JdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1RpbWVTcGFuSXRlbSc7XG5pbXBvcnQgeyBUaW1lU3BhblByb3BlcnR5IH0gZnJvbSAnLi4vbW9kZWxzL1RpbWVTcGFuUHJvcGVydHknO1xuaW1wb3J0IHsgSW5mTW9kZWxOYW1lLCBJbmZTZWxlY3RvciB9IGZyb20gJy4uL3NlbGVjdG9ycy9pbmYuc2VydmljZSc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25QaXBlc1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24tcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbkJhc2ljUGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9pbmZvcm1hdGlvbi1iYXNpYy1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5cblxuXG5cblxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuLyoqXG4gKiBUaGlzIFNlcnZpY2UgcHJvdmlkZXMgYSBjb2xsZWNpb24gb2YgcGlwZXMgdGhhdCBhZ2dyZWdhdGUgb3IgdHJhbnNmb3JtIGluZm9ybWF0aW9uLlxuICogRm9yIEV4YW1wbGVcbiAqIC0gdGhlIGxpc3RzIG9mIHRleHQgcHJvcGVydGllcywgYXBwZWxsYWl0b25zLCBwbGFjZXMsIHRpbWUtcHJpbWl0aXZlcyAvIHRpbWUtc3BhbnMgZXRjLlxuICogLSB0aGUgbGFiZWwgb2YgdGVtcG9yYWwgZW50aXR5IG9yIHBlcnNpc3RlbnQgaXRlbVxuICpcbiAqIFRoaXMgbWFpbmx5IHNlbGVjdHMgZGF0YSBmcm9tIHRoZSBpbmZvcm1hdGlvbiBzY2hlbWEgYW5kIHRoZSByZWxhdGlvbiB0byBwcm9qZWN0cy5cbiAqIEl0IGNvbWJpbmVzIHBpcGVzIHNlbGVjdGluZyBkYXRhIGZyb20gdGhlXG4gKiAtIGFjdGl2YXRlZCBwcm9qZWN0XG4gKiAtIGFsdGVybmF0aXZlcyAobm90IGluIHByb2plY3QgYnV0IGluIG90aGVycylcbiAqIC0gcmVwb1xuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uUGlwZXNTZXJ2aWNlIHtcblxuICBpbmZSZXBvOiBJbmZTZWxlY3RvcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGI6IEluZm9ybWF0aW9uQmFzaWNQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBwOiBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgICBwcml2YXRlIGM6IENvbmZpZ3VyYXRpb25QaXBlc1NlcnZpY2UsXG4gICAgcHVibGljIHRpbWVQcmltaXRpdmVQaXBlOiBUaW1lUHJpbWl0aXZlUGlwZSxcbiAgICBwcml2YXRlIHRpbWVTcGFuUGlwZTogVGltZVNwYW5QaXBlLFxuICAgIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPlxuICApIHtcbiAgICB0aGlzLmluZlJlcG8gPSBuZXcgSW5mU2VsZWN0b3IobmdSZWR1eCwgb2YoJ3JlcG8nKSlcbiAgfVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBQaXBlIHRoZSBwcm9qZWN0IGVudGl0aWVzXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdExlbmd0aChsOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgc3dpdGNoIChsLmxpc3RUeXBlKSB7XG4gICAgICBjYXNlICdhcHBlbGxhdGlvbic6XG4gICAgICBjYXNlICdlbnRpdHktcHJldmlldyc6XG4gICAgICBjYXNlICdsYW5ndWFnZSc6XG4gICAgICBjYXNlICdwbGFjZSc6XG4gICAgICBjYXNlICdkaW1lbnNpb24nOlxuICAgICAgY2FzZSAnbGFuZ1N0cmluZyc6XG4gICAgICBjYXNlICd0ZW1wb3JhbC1lbnRpdHknOlxuICAgICAgICByZXR1cm4gdGhpcy5waXBlTGlzdChsLCBwa0VudGl0eSkucGlwZShtYXAoaXRlbXMgPT4gaXRlbXMubGVuZ3RoKSlcblxuICAgICAgY2FzZSAndGltZS1zcGFuJzpcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDcyLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDcxLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MCwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTEsIHBrRW50aXR5KSxcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUyLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MywgcGtFbnRpdHkpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICB0YXAoKHgpID0+IHtcblxuICAgICAgICAgIH0pLFxuICAgICAgICAgIG1hcChpdGVtcyA9PiBpdGVtcy5maWx0ZXIoeCA9PiB4Lmxlbmd0aCA+IDApLmxlbmd0aCkpXG5cbiAgICAgIC8vIGNhc2UgJ3RleHQtcHJvcGVydHknOlxuICAgICAgLy8gICByZXR1cm4gdGhpcy5waXBlTGlzdFRleHRQcm9wZXJ0eShsLCBwa0VudGl0eSkucGlwZShtYXAoaXRlbXMgPT4gaXRlbXMubGVuZ3RoKSlcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gICAgICAgIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xuICAgIH1cbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3QobDogU3ViZmllbGQsIHBrRW50aXR5LCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8SXRlbUxpc3Q+IHtcbiAgICBpZiAobC5saXN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuIHRoaXMucGlwZUxpc3RBcHBlbGxhdGlvbihsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5lbnRpdHlQcmV2aWV3KSByZXR1cm4gdGhpcy5waXBlTGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ3VhZ2UpIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ3VhZ2UobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUucGxhY2UpIHJldHVybiB0aGlzLnBpcGVMaXN0UGxhY2UobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gdGhpcy5waXBlTGlzdERpbWVuc2lvbihsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5nU3RyaW5nKSByZXR1cm4gdGhpcy5waXBlTGlzdExhbmdTdHJpbmcobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUudGVtcG9yYWxFbnRpdHkpIHJldHVybiB0aGlzLnBpcGVMaXN0RW50aXR5UHJldmlldyhsLCBwa0VudGl0eSwgbGltaXQpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS50aW1lU3Bhbikge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1UaW1lU3Bhbihwa0VudGl0eSkucGlwZShcbiAgICAgICAgbWFwKCh0cykgPT4gW3RzXS5maWx0ZXIoaSA9PiBpLnByb3BlcnRpZXMubGVuZ3RoID4gMCkpXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0QmFzaWNTdGF0ZW1lbnRJdGVtcyhsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIHBrUHJvamVjdDogbnVtYmVyKTogT2JzZXJ2YWJsZTxCYXNpY1N0YXRlbWVudEl0ZW1bXT4ge1xuICAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gICAgICB0aGlzLmIucGlwZU91dGdvaW5nQmFzaWNTdGF0ZW1lbnRJdGVtc0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHksIHBrUHJvamVjdCkgOlxuICAgICAgdGhpcy5iLnBpcGVJbmdvaW5nQmFzaWNTdGF0ZW1lbnRJdGVtc0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHksIHBrUHJvamVjdClcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgaXRlbXMgaW4gYXBwZWxsYXRpb24gZmllbGRcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RBcHBlbGxhdGlvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW1bXT4ge1xuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAqIFBpcGUgdGhlIGl0ZW1zIGluIGVudGl0eSBwcmV2aWV3IGZpZWxkXG4gKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdEVudGl0eVByZXZpZXc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFnKGBiZWZvcmUtJHtwa0VudGl0eX0tJHtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5fS0ke2xpc3REZWZpbml0aW9uLnRhcmdldENsYXNzfWApLFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZykpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcylcbiAgICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5vcmROdW0gPiBiLm9yZE51bSA/IDEgOiAtMSksXG4gICAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSlcbiAgICAgICAgICAgIClcbiAgICAgICAgfSksXG4gICAgICAgIHRhZyhgYWZ0ZXItJHtwa0VudGl0eX0tJHtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5fS0ke2xpc3REZWZpbml0aW9uLnRhcmdldENsYXNzfWApLFxuICAgICAgKVxuXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RMYW5ndWFnZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBpdGVtcyBpbiBwbGFjZSBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtUGxhY2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgaXRlbXMgaW4gcGxhY2UgbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdERpbWVuc2lvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gKiBQaXBlIHRoZSBpdGVtcyBpbiBsYW5nU3RyaW5nIGxpc3RcbiAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0TGFuZ1N0cmluZzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxMYW5nU3RyaW5nSXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG5cbiAgfVxuXG4gIC8qKlxuICAgKiBwaXBlIHRoZSBwcm9qZWN0IHJlbGF0aW9uIG9mIGdpdmVuIHN0YXRtZW50LCBpZiB0aGUgc2NvcGUgb2YgdGhpcyBwYWdlIGlzIGluUHJvamVjdFxuICAgKiBAcGFyYW0gc3RtdCBJbmZTdGF0ZW1lbnQgdG8gYmUgY29tcGxldGVkIHdpdGggcHJvalJlbFxuICAgKiBAcGFyYW0gcGFnZSBwYWdlIGZvciB3aGljaCB3ZSBhcmUgcGlwaW5nIHRoaXMgc3R1ZmZcbiAgICovXG4gIHBpcGVQcm9qUmVsT2ZTdGF0ZW1lbnQoc3RtdDogSW5mU3RhdGVtZW50LCBwYWdlOiBHdlN1YmZpZWxkUGFnZSk6IE9ic2VydmFibGU8U3RhdGVtZW50UHJvalJlbD4ge1xuICAgIGlmIChwYWdlLnNjb3BlLmluUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSRcbiAgICAgICAgLmtleShwYWdlLnNjb3BlLmluUHJvamVjdCArICdfJyArIHN0bXQucGtfZW50aXR5KS5waXBlKFxuICAgICAgICAgIG1hcChcbiAgICAgICAgICAgIHByb2pSZWwgPT4gKHtcbiAgICAgICAgICAgICAgcHJvalJlbCxcbiAgICAgICAgICAgICAgb3JkTnVtOiBwYWdlLmlzT3V0Z29pbmcgPyBwcm9qUmVsLm9yZF9udW1fb2ZfcmFuZ2UgOiBwcm9qUmVsLm9yZF9udW1fb2ZfZG9tYWluXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdCh7XG4gICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgb3JkTnVtOiAwXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICAvKipcbiAgICogcGlwZSB0aGUgdGFyZ2V0IG9mIGdpdmVuIHN0YXRtZW50XG4gICAqIEBwYXJhbSBzdG10IEluZlN0YXRlbWVudCB0byBiZSBjb21wbGV0ZWQgd2l0aCB0YXJnZXRcbiAgICogQHBhcmFtIHBhZ2UgcGFnZSBmb3Igd2hpY2ggd2UgYXJlIHBpcGluZyB0aGlzIHN0dWZmXG4gICAqIEBwYXJhbSBzdWJmaWVsZFR5cGUgdHlwZSBvZiBzdWJmaWVsZCBmb3Igd2hpY2ggd2UgcGlwZSB0aGlzIHN0dWZmXG4gICAqL1xuICBwaXBlVGFyZ2V0T2ZTdGF0ZW1lbnQoc3RtdDogSW5mU3RhdGVtZW50LCBwYWdlOiBHdlN1YmZpZWxkUGFnZSwgc3ViZmllbGRUeXBlOiBHdlN1YmZpZWxkVHlwZSk6IE9ic2VydmFibGU8U3RhdGVtZW50VGFyZ2V0PiB7XG4gICAgY29uc3QgaXNPdXRnb2luZyA9IHBhZ2UuaXNPdXRnb2luZ1xuICAgIGNvbnN0IHRhcmdldEluZm8gPSBpc091dGdvaW5nID8gc3RtdC5ma19vYmplY3RfaW5mbyA6IHN0bXQuZmtfc3ViamVjdF9pbmZvO1xuICAgIC8vIGhlcmUgeW91IGNvdWxkIGFkZCB0YXJnZXREYXRhIG9yIHRhcmdldENlbGxcblxuICAgIGlmIChzdWJmaWVsZFR5cGUuYXBwZWxsYXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5hcHBlbGxhdGlvbiQuYnlfcGtfZW50aXR5JC5rZXkodGFyZ2V0SW5mbykucGlwZShcbiAgICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgICAgbWFwKGFwcGVsbGF0aW9uID0+IHtcbiAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IGFwcGVsbGF0aW9uLnN0cmluZyxcbiAgICAgICAgICAgIHRhcmdldENsYXNzOiBwYWdlLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgIGFwcGVsbGF0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS5wbGFjZSkge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnBsYWNlJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICBtYXAocGxhY2UgPT4ge1xuICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICB0YXJnZXRMYWJlbDogYFdHUzg0OiAke3BsYWNlLmxhdH3CsCwgJHtwbGFjZS5sb25nfcKwYCxcbiAgICAgICAgICAgIHRhcmdldENsYXNzOiBwYWdlLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgIHBsYWNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS5kaW1lbnNpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5kaW1lbnNpb24kLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgIHN3aXRjaE1hcChkaW1lbnNpb24gPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhkaW1lbnNpb24uZmtfbWVhc3VyZW1lbnRfdW5pdClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgdW5pdFByZXZpZXcgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldExhYmVsOiBgJHtkaW1lbnNpb24ubnVtZXJpY192YWx1ZX0gJHt1bml0UHJldmlldy5lbnRpdHlfbGFiZWx9YCxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHBhZ2UudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS5sYW5nU3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ19zdHJpbmckLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgIHN3aXRjaE1hcChsYW5nU3RyaW5nID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KGxhbmdTdHJpbmcuZmtfbGFuZ3VhZ2UpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIGxhbmd1YWdlID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogYCR7bGFuZ1N0cmluZy5zdHJpbmd9ICgke2xhbmd1YWdlLmlzbzYzOTF9KWAsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBwYWdlLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICBsYW5nU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLmxhbmd1YWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgIG1hcChsYW5ndWFnZSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgIHRhcmdldExhYmVsOiBgJHtsYW5ndWFnZS5ub3RlcyB8fCBsYW5ndWFnZS5pc282MzkxfWAsXG4gICAgICAgICAgICB0YXJnZXRDbGFzczogcGFnZS50YXJnZXRDbGFzcyxcbiAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICBsYW5ndWFnZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUuZW50aXR5UHJldmlldyB8fCBzdWJmaWVsZFR5cGUudHlwZUl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICBtYXAoZW50aXR5UHJldmlldyA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgIHRhcmdldExhYmVsOiBgJHtlbnRpdHlQcmV2aWV3LmVudGl0eV9sYWJlbH1gLFxuICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHBhZ2UudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgZW50aXR5UHJldmlld1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cblxuICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eSkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ3N1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eS5sZW5ndGgnLCBzdWJmaWVsZFR5cGUudGVtcG9yYWxFbnRpdHkubGVuZ3RoKVxuXG4gICAgICAvLyBmb3IgZWFjaCBvZiB0aGVzZSBzdWJmaWVsZHNcbiAgICAgIGNvbnN0IHN1YmVudGl0eVBhZ2VzJCA9IHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eS5tYXAoc3ViZmllbGRSZXEgPT4ge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWJlbnRpdHkgc3ViZmllbGQgZm9yIHRhcmdldEluZm8nLCB0YXJnZXRJbmZvKVxuXG4gICAgICAgIC8vIGNyZWF0ZSBwYWdlOkd2U3ViZmllbGRQYWdlXG4gICAgICAgIGNvbnN0IHsgaXNDaXJjdWxhciwgLi4ucCB9ID0gc3ViZmllbGRSZXEucGFnZVxuICAgICAgICBjb25zdCBuZXN0ZWRQYWdlOiBHdlN1YmZpZWxkUGFnZSA9IHtcbiAgICAgICAgICAuLi5wLFxuICAgICAgICAgIGZrU291cmNlRW50aXR5OiB0YXJnZXRJbmZvLFxuICAgICAgICAgIHNjb3BlOiBwYWdlLnNjb3BlLFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucGlwZVN1YmZpZWxkUGFnZShuZXN0ZWRQYWdlLCBzdWJmaWVsZFJlcS5zdWJmaWVsZFR5cGUpLnBpcGUoXG4gICAgICAgICAgbWFwKCh7IGNvdW50LCBzdGF0ZW1lbnRzIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbGltaXQsIG9mZnNldCwgLi4ucyB9ID0gbmVzdGVkUGFnZTtcbiAgICAgICAgICAgIGNvbnN0IHN1YmVudGl0eVN1YmZpZWxkUGFnZTogU3ViZW50aXR5U3ViZmllbGRQYWdlID0ge1xuICAgICAgICAgICAgICBzdWJmaWVsZDogcyxcbiAgICAgICAgICAgICAgY291bnQsXG4gICAgICAgICAgICAgIHN0YXRlbWVudHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdWJlbnRpdHlTdWJmaWVsZFBhZ2VcbiAgICAgICAgICB9KSxcbiAgICAgICAgICAvLyBzdGFydFdpdGgodW5kZWZpbmVkKSAvLyBUT0RPIHJlbW92ZSEgdGhpcyBpcyBmb3IgZGVidWdnaW5nXG4gICAgICAgIClcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShzdWJlbnRpdHlQYWdlcyQpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIC8vIGZpbHRlcihzdWJmaWVsZHMgPT4ge1xuICAgICAgICAgIC8vICAgY29uc29sZS5sb2coJ3N1YmZpZWxkc1xcbicsIHN1YmZpZWxkcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAvLyAgICAgY29uc3QgcmVxID0gc3ViZmllbGRUeXBlLnRlbXBvcmFsRW50aXR5W2ldXG4gICAgICAgICAgLy8gICAgIGNvbnN0IGZpZWxkSW5mbyA9IHRhcmdldEluZm8gKyAnXycgKyByZXEucGFnZS5ma1Byb3BlcnR5ICsgJ18nICsgcmVxLnBhZ2UudGFyZ2V0Q2xhc3MgKyAnXycgKyBrZXlzKHJlcS5zdWJmaWVsZFR5cGUpWzBdXG4gICAgICAgICAgLy8gICAgIHJldHVybiBgJHtpfTogJHtpdGVtID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgIC8vICAgICAgIGB1bmRlZmluZWQgJHtmaWVsZEluZm99YCA6XG4gICAgICAgICAgLy8gICAgICAgYG9rICAgICAgICAke2ZpZWxkSW5mb31gXG4gICAgICAgICAgLy8gICAgICAgfWBcbiAgICAgICAgICAvLyAgIH0pLmpvaW4oJ1xcbicpKVxuICAgICAgICAgIC8vICAgcmV0dXJuICFzdWJmaWVsZHMuaW5jbHVkZXModW5kZWZpbmVkKVxuICAgICAgICAgIC8vIH0pLFxuICAgICAgICAgIG1hcChcbiAgICAgICAgICAgIHN1YmZpZWxkcyA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogJycsXG4gICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHBhZ2UudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICBlbnRpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgcGtFbnRpdHk6IHRhcmdldEluZm8sXG4gICAgICAgICAgICAgICAgICAgIHN1YmZpZWxkc1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUudGltZVNwYW4pIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWJmaWVsZFR5cGUudGVtcG9yYWxFbnRpdHkubGVuZ3RoJywgc3ViZmllbGRUeXBlLnRlbXBvcmFsRW50aXR5Lmxlbmd0aClcblxuICAgICAgLy8gZm9yIGVhY2ggb2YgdGhlc2Ugc3ViZmllbGRzXG4gICAgICBjb25zdCBzdWJlbnRpdHlQYWdlcyQgPSBEZmhDb25maWcuUFJPUEVSVFlfUEtTX1dIRVJFX1RJTUVfUFJJTUlUSVZFX0lTX1JBTkdFXG4gICAgICAgIC5tYXAoZmtQcm9wZXJ0eSA9PiB7XG5cbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc3ViZW50aXR5IHN1YmZpZWxkIGZvciB0YXJnZXRJbmZvJywgdGFyZ2V0SW5mbylcblxuICAgICAgICAgIC8vIGNyZWF0ZSBwYWdlOkd2U3ViZmllbGRQYWdlXG4gICAgICAgICAgY29uc3QgbmVzdGVkUGFnZTogR3ZTdWJmaWVsZFBhZ2UgPSB7XG4gICAgICAgICAgICBma1Byb3BlcnR5LFxuICAgICAgICAgICAgaXNPdXRnb2luZzogdHJ1ZSxcbiAgICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IERmaENvbmZpZy5DTEFTU19QS19USU1FX1BSSU1JVElWRSxcbiAgICAgICAgICAgIGZrU291cmNlRW50aXR5OiB0YXJnZXRJbmZvLFxuICAgICAgICAgICAgc2NvcGU6IHBhZ2Uuc2NvcGUsXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHN1YmZUeXBlOiBHdlN1YmZpZWxkVHlwZSA9IHtcbiAgICAgICAgICAgIHRpbWVQcmltaXRpdmU6ICd0cnVlJ1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVTdWJmaWVsZFBhZ2UobmVzdGVkUGFnZSwgc3ViZlR5cGUpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHsgY291bnQsIHN0YXRlbWVudHMgfSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IGxpbWl0LCBvZmZzZXQsIC4uLnMgfSA9IG5lc3RlZFBhZ2U7XG4gICAgICAgICAgICAgIGNvbnN0IHN1YmVudGl0eVN1YmZpZWxkUGFnZTogU3ViZW50aXR5U3ViZmllbGRQYWdlID0ge1xuICAgICAgICAgICAgICAgIHN1YmZpZWxkOiBzLFxuICAgICAgICAgICAgICAgIGNvdW50LFxuICAgICAgICAgICAgICAgIHN0YXRlbWVudHNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gc3ViZW50aXR5U3ViZmllbGRQYWdlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfSlcblxuXG4gICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoc3ViZW50aXR5UGFnZXMkKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoXG4gICAgICAgICAgICBzdWJmaWVsZHMgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB0aW1lU3BhblByZXZpZXc6IFdhckVudGl0eVByZXZpZXdUaW1lU3BhbiA9IHt9XG4gICAgICAgICAgICAgIHN1YmZpZWxkcy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzLnN0YXRlbWVudHNbMF0pIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHN0ID0gcy5zdGF0ZW1lbnRzWzBdXG4gICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBEZmhDb25maWcuUFJPUEVSVFlfUEtfVE9fRVhJU1RFTkNFX1RJTUVfS0VZW3N0LnN0YXRlbWVudC5ma19wcm9wZXJ0eV1cbiAgICAgICAgICAgICAgICAgIHRpbWVTcGFuUHJldmlld1trZXldID0gc3QudGFyZ2V0LnRpbWVQcmltaXRpdmVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogdGhpcy50aW1lU3BhblBpcGUudHJhbnNmb3JtKG5ldyBUaW1lU3BhblV0aWwodGltZVNwYW5QcmV2aWV3KSksXG4gICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHBhZ2UudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICB0aW1lU3Bhbjoge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3OiB0aW1lU3BhblByZXZpZXcsXG4gICAgICAgICAgICAgICAgICAgIHN1YmZpZWxkc1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICAgICAgfVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUudGltZVByaW1pdGl2ZSkge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICBzd2l0Y2hNYXAodGltZVByaW1pdGl2ZSA9PiB7XG4gICAgICAgICAgLy8gZ2V0IGNhbGVuZGFyXG4gICAgICAgICAgbGV0IGNhbCQ6IE9ic2VydmFibGU8VGltZVByaW1pdGl2ZVdpdGhDYWwuQ2FsZW5kYXJFbnVtPlxuICAgICAgICAgIGlmIChwYWdlLnNjb3BlLmluUHJvamVjdCkge1xuICAgICAgICAgICAgY2FsJCA9IHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBhZ2Uuc2NvcGUuaW5Qcm9qZWN0ICsgJ18nICsgc3RtdC5wa19lbnRpdHkpXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgIGluZm9Qcm9qUmVsID0+IGluZm9Qcm9qUmVsLmNhbGVuZGFyIGFzIFRpbWVQcmltaXRpdmVXaXRoQ2FsLkNhbGVuZGFyRW51bVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNhbCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHN0bXQuY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyIGFzIFRpbWVQcmltaXRpdmVXaXRoQ2FsLkNhbGVuZGFyRW51bSlcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcGlwZSB0YXJnZXQgdGltZSBwcmltaXRpdmUgb2Ygc3RtdFxuICAgICAgICAgIHJldHVybiBjYWwkLnBpcGUoXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgIGNhbCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZVByaW1XaXRoQ2FsID0gaW5mVGltZVByaW1Ub1RpbWVQcmltV2l0aENhbCh0aW1lUHJpbWl0aXZlLCBjYWwpXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgIHRhcmdldExhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbVdpdGhDYWwpLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHBhZ2UudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGltZVByaW1pdGl2ZTogdGltZVByaW1XaXRoQ2FsXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGltcGxlbWVudGF0aW9uIGZvdW5kIGZvciBzdWJmaWVsZFR5cGUgJHtKU09OLnN0cmluZ2lmeShzdWJmaWVsZFR5cGUpfWApO1xuICB9XG5cbiAgLyoqXG4gICAqIHBpcGUgdGFyZ2V0IGFuZCBwcm9qUmVsIG9mIHRoZSBnaXZlbiBzdGF0ZW1lbnRcbiAgICovXG4gIHBpcGVTdGF0ZW1lbnRXaXRoVGFyZ2V0KHN0bXQ6IEluZlN0YXRlbWVudCwgcGFnZTogR3ZTdWJmaWVsZFBhZ2UsIHN1YmZpZWxkVHlwZTogR3ZTdWJmaWVsZFR5cGUpOiBPYnNlcnZhYmxlPFN0YXRlbWVudFdpdGhUYXJnZXQ+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZVRhcmdldE9mU3RhdGVtZW50KHN0bXQsIHBhZ2UsIHN1YmZpZWxkVHlwZSksXG4gICAgICB0aGlzLnBpcGVQcm9qUmVsT2ZTdGF0ZW1lbnQoc3RtdCwgcGFnZSlcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFt0YXJnZXQsIHByb2pSZWxdKSA9PiAoeyAuLi50YXJnZXQsIC4uLnByb2pSZWwgfSkpXG4gICAgKVxuICB9XG5cbiAgcGlwZVN1YmZpZWxkUGFnZShwYWdlOiBHdlN1YmZpZWxkUGFnZSwgc3ViZmllbGRUeXBlOiBHdlN1YmZpZWxkVHlwZSk6IE9ic2VydmFibGU8U3ViZmllbGRQYWdlPiB7XG4gICAgaWYgKHN1YmZpZWxkVHlwZS50aW1lU3Bhbikge1xuICAgICAgLy8gaWYgdGltZVNwYW4gbWFrZSBhIHNob3J0IGN1dDogcHJvZHVjZSBhIHZpcnR1YWwgc3RhdGVtZW50V2l0aFRhcmdldCBmcm9tIGVudGl0eSB0byB0aW1lU3BhblxuICAgICAgcmV0dXJuIHRoaXMucGlwZVRpbWVTcGFuKHBhZ2UsIHN1YmZpZWxkVHlwZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gZ2V0IHRoZSBzdGF0bWVudHMgb2YgdGhhdCBwYWdlXG4gICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5wYWdpbmF0aW9uJC5waXBlQ291bnQocGFnZSksXG4gICAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQucGlwZVBhZ2UocGFnZSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgICAgICAgcGtTdG10cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgICAgICAgICBwa1N0bXRzLm1hcChwa1N0bXQgPT4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9wa19lbnRpdHkkLmtleShwa1N0bXQpXG4gICAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBzdGF0ZW1lbnQsIGRlcGVuZGluZyBvbiB0aGUgc3ViZmllbGRUeXBlLCBsb2FkIHRoZSBjb3JyZXNwb25kaW5nIHRhcmdldFxuICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcihzdG10ID0+ICEhc3RtdCksXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcChzdG10ID0+IHRoaXMucGlwZVN0YXRlbWVudFdpdGhUYXJnZXQoc3RtdCwgcGFnZSwgc3ViZmllbGRUeXBlKSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXAoKFtjb3VudCwgc3RhdGVtZW50c10pID0+ICh7IGNvdW50LCBzdGF0ZW1lbnRzIH0pKVxuICAgICAgKVxuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBwaXBlVGltZVNwYW4ocGFnZTogR3ZTdWJmaWVsZFBhZ2UsIHN1YmZpZWxkVHlwZTogR3ZTdWJmaWVsZFR5cGUpIHtcbiAgICBjb25zdCB2aXJ0dWFsU3RhdGVtZW50VG9UaW1lU3BhbiA9IHsgZmtfb2JqZWN0X2luZm86IHBhZ2UuZmtTb3VyY2VFbnRpdHkgfTtcbiAgICByZXR1cm4gdGhpcy5waXBlVGFyZ2V0T2ZTdGF0ZW1lbnQodmlydHVhbFN0YXRlbWVudFRvVGltZVNwYW4sIHBhZ2UsIHN1YmZpZWxkVHlwZSkucGlwZShtYXAoc3RtdFRhcmdldCA9PiB7XG4gICAgICBjb25zdCBzdG10V1Q6IFN0YXRlbWVudFdpdGhUYXJnZXQgPSB7XG4gICAgICAgIC4uLnN0bXRUYXJnZXQsXG4gICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgb3JkTnVtOiB1bmRlZmluZWRcbiAgICAgIH07XG4gICAgICByZXR1cm4geyBjb3VudDogMSwgc3RhdGVtZW50czogW3N0bXRXVF0gfTtcbiAgICB9KSk7XG4gIH1cblxuICAvLyBwaXBlU3RhdGVtZW50TGlzdFBhZ2UoXG4gIC8vICAgcGFnaW5hdGVCeTogUGFnaW5hdGVCeVBhcmFtW10sXG4gIC8vICAgbGltaXQ6IG51bWJlcixcbiAgLy8gICBvZmZzZXQ6IG51bWJlcixcbiAgLy8gICBwa1Byb2plY3Q6IG51bWJlcixcbiAgLy8gICBsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsXG4gIC8vICAgYWx0ZXJuYXRpdmUgPSBmYWxzZSk6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gIC8vICAgLy8gcHJlcGFyZSBwYWdlIGxvYWRlclxuICAvLyAgIGNvbnN0IHBhZ2VMb2FkZXIkID0gYWx0ZXJuYXRpdmUgPyB0aGlzLmluZlJlcG8uc3RhdGVtZW50JC5wYWdpbmF0aW9uJCA6IHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQ7XG5cbiAgLy8gICAvLyBwcmVwYXJlIGJhc2ljIHN0YXRlbWVudCBpdGVtIGxvYWRlclxuICAvLyAgIGNvbnN0IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlciA9IChwa1N0YXRlbWVudCwgaXNPdXRnb2luZywgcGtQcm9qKSA9PiB7XG4gIC8vICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAvLyAgICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1N0YXRlbWVudCwgaXNPdXRnb2luZykgOlxuICAvLyAgICAgICB0aGlzLmIucGlwZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtQcm9qLCBwa1N0YXRlbWVudCwgaXNPdXRnb2luZylcbiAgLy8gICB9XG5cbiAgLy8gICBjb25zdCBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkID0gcGFnZUxvYWRlciQucGlwZVBhZ2UocGFnaW5hdGVCeSwgbGltaXQsIG9mZnNldClcblxuICAvLyAgIHJldHVybiBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAoKHBhZ2luYXRlZFN0YXRlbWVudFBrcykgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gIC8vICAgICAgIHBhZ2luYXRlZFN0YXRlbWVudFBrcy5tYXAocGtTdGF0ZW1lbnQgPT4gYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyKHBrU3RhdGVtZW50LCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLCBwa1Byb2plY3QpXG4gIC8vICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAvLyAgICAgICAgICAgc3dpdGNoTWFwKHggPT4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoeC5pc091dGdvaW5nID8geC5zdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8gOiB4LnN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pXG4gIC8vICAgICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICAgIG1hcCgocHJldmlldykgPT4ge1xuICAvLyAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogRW50aXR5UHJldmlld0l0ZW0gPSB7XG4gIC8vICAgICAgICAgICAgICAgICAgIC4uLngsXG4gIC8vICAgICAgICAgICAgICAgICAgIHByZXZpZXcsXG4gIC8vICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IHByZXZpZXcuZmtfY2xhc3NcbiAgLy8gICAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAvLyAgICAgICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICAgIClcbiAgLy8gICAgICAgICAgICkpXG5cbiAgLy8gICAgICAgKVxuICAvLyAgICAgKVxuICAvLyAgICAgKSlcblxuICAvLyB9XG5cblxuICAvKipcbiAgICogUGlwZSB0aGUgdGVtcG9yYWwgZW50aXRpZXMgY29ubmVjdGVkIHRvIGdpdmVuIGVudGl0eSBieSBzdGF0ZW1lbnRzIHRoYXQgYXJlIGluIHRoZSBjdXJyZW50IHByb2plY3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgLy8gcGlwZVRlbXBvcmFsRW50aXR5VGFibGVSb3dzKFxuICAvLyAgIHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLFxuICAvLyAgIGxpbWl0OiBudW1iZXIsXG4gIC8vICAgb2Zmc2V0OiBudW1iZXIsXG4gIC8vICAgcGtQcm9qZWN0OiBudW1iZXIsXG4gIC8vICAgbGlzdERlZmluaXRpb246IFN1YmZpZWxkLFxuICAvLyAgIGZpZWxkRGVmaW5pdGlvbnM6IEZpZWxkW10sXG4gIC8vICAgYWx0ZXJuYXRpdmUgPSBmYWxzZSk6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlJdGVtW10+IHtcblxuICAvLyAgIC8vIGNvbnN0IHByb3BlcnR5SXRlbVR5cGUgPSB0aGlzLnByb3BlcnR5SXRlbVR5cGUoZmllbGREZWZpbml0aW9ucylcblxuICAvLyAgIGNvbnN0IHRhcmdldEVudGl0eU9mU3RhdGVtZW50SXRlbSA9IChyOiBCYXNpY1N0YXRlbWVudEl0ZW0pID0+IHIuaXNPdXRnb2luZyA/IHIuc3RhdGVtZW50LmZrX29iamVjdF9pbmZvIDogci5zdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvO1xuXG4gIC8vICAgLy8gcHJlcGFyZSBwYWdlIGxvYWRlclxuICAvLyAgIGNvbnN0IHBhZ2VMb2FkZXIkID0gYWx0ZXJuYXRpdmUgPyB0aGlzLmluZlJlcG8uc3RhdGVtZW50JC5wYWdpbmF0aW9uJCA6IHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQ7XG5cbiAgLy8gICAvLyBwcmVwYXJlIGJhc2ljIHN0YXRlbWVudCBpdGVtIGxvYWRlclxuICAvLyAgIGNvbnN0IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlciA9IChwa1N0YXRlbWVudCwgaXNPdXRnb2luZywgcGtQcm9qKSA9PiB7XG4gIC8vICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAvLyAgICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1N0YXRlbWVudCwgaXNPdXRnb2luZykgOlxuICAvLyAgICAgICB0aGlzLmIucGlwZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtQcm9qLCBwa1N0YXRlbWVudCwgaXNPdXRnb2luZylcbiAgLy8gICB9XG5cbiAgLy8gICAvLyBwcmVwYXJlIFRlRW5Sb3cgbG9hZGVyXG4gIC8vICAgY29uc3Qgcm93TG9hZGVyID0gKHRhcmdldEVudGl0eVBrLCBmaWVsZERlZiwgcGtQcm9qKSA9PiB7XG4gIC8vICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAvLyAgICAgICB0aGlzLnBpcGVJdGVtVGVFblJvdyh0YXJnZXRFbnRpdHlQaywgZmllbGREZWYsIG51bGwsIHRydWUpIDpcbiAgLy8gICAgICAgdGhpcy5waXBlSXRlbVRlRW5Sb3codGFyZ2V0RW50aXR5UGssIGZpZWxkRGVmLCBwa1Byb2osIGZhbHNlKVxuICAvLyAgIH1cblxuICAvLyAgIGNvbnN0IHBhZ2luYXRlZFN0YXRlbWVudFBrcyQgPSBwYWdlTG9hZGVyJC5waXBlUGFnZShwYWdpbmF0ZUJ5LCBsaW1pdCwgb2Zmc2V0KVxuXG4gIC8vICAgY29uc3Qgcm93cyQgPSBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAoKHBhZ2luYXRlZFN0YXRlbWVudFBrcykgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gIC8vICAgICAgIHBhZ2luYXRlZFN0YXRlbWVudFBrcy5tYXAocGtTdGF0ZW1lbnQgPT4gYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyKHBrU3RhdGVtZW50LCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLCBwa1Byb2plY3QpXG4gIC8vICAgICAgICAgLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgLy8gICAgICAgKVxuICAvLyAgICAgKVxuICAvLyAgICAgICAucGlwZShcbiAgLy8gICAgICAgICBzd2l0Y2hNYXAoKHRlRW5TdGF0ZW1lbnQpID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAvLyAgICAgICAgICAgdGVFblN0YXRlbWVudC5tYXAoKGJhc2ljU3RhdGVtZW50SXRlbSkgPT4ge1xuICAvLyAgICAgICAgICAgICBjb25zdCBwa1RlRW4gPSB0YXJnZXRFbnRpdHlPZlN0YXRlbWVudEl0ZW0oYmFzaWNTdGF0ZW1lbnRJdGVtKTtcbiAgLy8gICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gIC8vICAgICAgICAgICAgICAgcm93TG9hZGVyKFxuICAvLyAgICAgICAgICAgICAgICAgcGtUZUVuLFxuICAvLyAgICAgICAgICAgICAgICAgZmllbGREZWZpbml0aW9ucyxcbiAgLy8gICAgICAgICAgICAgICAgIC8vIHByb3BlcnR5SXRlbVR5cGUsXG4gIC8vICAgICAgICAgICAgICAgICBwa1Byb2plY3RcbiAgLy8gICAgICAgICAgICAgICApLFxuICAvLyAgICAgICAgICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHBrVGVFbilcbiAgLy8gICAgICAgICAgICAgKS5waXBlKFxuICAvLyAgICAgICAgICAgICAgIG1hcCgoW3JvdywgdGVFblByb2pSZWxdKSA9PiB7XG4gIC8vICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBUZW1wb3JhbEVudGl0eUl0ZW0gPSB7XG4gIC8vICAgICAgICAgICAgICAgICAgIC4uLmJhc2ljU3RhdGVtZW50SXRlbSxcbiAgLy8gICAgICAgICAgICAgICAgICAgcm93LFxuICAvLyAgICAgICAgICAgICAgICAgICBwa0VudGl0eTogcGtUZUVuLFxuICAvLyAgICAgICAgICAgICAgICAgICB0ZUVuUHJvalJlbFxuICAvLyAgICAgICAgICAgICAgICAgfTtcbiAgLy8gICAgICAgICAgICAgICAgIHJldHVybiBpdGVtXG4gIC8vICAgICAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICAgICAgKVxuICAvLyAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICApKSxcbiAgLy8gICAgICAgKSksXG5cbiAgLy8gICApXG4gIC8vICAgcmV0dXJuIHJvd3MkXG4gIC8vIH1cblxuXG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVRlRW5Sb3cocGtFbnRpdHk6IG51bWJlciwgZmllbGREZWZpbml0aW9uczogRmllbGRbXSwgcGtQcm9qZWN0OiBudW1iZXIsIHJlcG86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFRlbXBvcmFsRW50aXR5Um93PiB7XG5cbiAgICAvLyBwaXBlIG91dGdvaW5nIHN0YXRlbWVudHNcbiAgICBjb25zdCBvdXRnb2luZ1N0YXRlbWVudHMkID0gcmVwbyA/IHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSkgOiB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk7XG4gICAgLy8gcGlwZSBpbmdvaW5nIHN0YXRlbWVudHNcbiAgICBjb25zdCBpbmdvaW5nU3RhdGVtZW50cyQgPSByZXBvID8gdGhpcy5iLnBpcGVSZXBvSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpIDogdGhpcy5iLnBpcGVJbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk7XG5cblxuICAgIC8vIHBpcGUgYWxsIHN0YXRlbWVudHMgd2l0aCBpbmZvcm1hdGlvbiBsZWFmIGl0ZW1zXG5cbiAgICBjb25zdCBvdXRnb2luZ0l0ZW1zJDogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRJdGVtW10+ID0gb3V0Z29pbmdTdGF0ZW1lbnRzJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIHN0YXRlbWVudHNcbiAgICAgICAgICAuZmlsdGVyKHN0YXRlbWVudCA9PiAhIXN0YXRlbWVudC5ma19vYmplY3RfaW5mbykgLy8gcmVtb3ZlIHN0YXRlbWVudHMgbm90IHBvaW50aW5nIHRvIGluZm9ybWF0aW9uXG4gICAgICAgICAgLm1hcChzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzT3V0Z29pbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW0ocywgcGtQcm9qZWN0LCBpc091dGdvaW5nKTtcbiAgICAgICAgICB9KVxuICAgICAgKSlcblxuICAgIClcbiAgICBjb25zdCBpbmdvaW5nSXRlbXMkOiBPYnNlcnZhYmxlPFN0YXRlbWVudEl0ZW1bXT4gPSBpbmdvaW5nU3RhdGVtZW50cyQucGlwZShcbiAgICAgIHN3aXRjaE1hcChzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBzdGF0ZW1lbnRzXG4gICAgICAgICAgLmZpbHRlcihzdGF0ZW1lbnQgPT4gISFzdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKSAvLyByZW1vdmUgc3RhdGVtZW50cyBub3QgcG9pbnRpbmcgdG8gaW5mb3JtYXRpb25cbiAgICAgICAgICAubWFwKHMgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNPdXRnb2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW0ocywgcGtQcm9qZWN0LCBpc091dGdvaW5nKTtcbiAgICAgICAgICB9KVxuICAgICAgKSlcblxuICAgIClcblxuICAgIGNvbnN0IHNvcnRJdGVtcyA9IHJlcG8gP1xuICAgICAgKGl0ZW06IFN0YXRlbWVudEl0ZW1bXSkgPT4gaXRlbS5zb3J0KChhLCBiKSA9PiBhLnN0YXRlbWVudC5pc19pbl9wcm9qZWN0X2NvdW50ID4gYi5zdGF0ZW1lbnQuaXNfaW5fcHJvamVjdF9jb3VudCA/IDEgOiAtMSkgOlxuICAgICAgKGl0ZW06IFN0YXRlbWVudEl0ZW1bXSkgPT4gaXRlbTtcblxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qob3V0Z29pbmdJdGVtcyQsIGluZ29pbmdJdGVtcyQpLnBpcGUoXG5cbiAgICAgIG1hcCgoW291dGdvaW5nSXRlbXMsIGluZ29pbmdJdGVtc10pID0+IHtcbiAgICAgICAgY29uc3QgZ3JvdXBlZE91dCA9IGdyb3VwQnkoKGkpID0+IChpICYmIGkuc3RhdGVtZW50ID8gaS5zdGF0ZW1lbnQuZmtfcHJvcGVydHkudG9TdHJpbmcoKSA6IHVuZGVmaW5lZCksIG91dGdvaW5nSXRlbXMpO1xuICAgICAgICBjb25zdCBncm91cGVkSW4gPSBncm91cEJ5KChpKSA9PiAoaSAmJiBpLnN0YXRlbWVudCA/IGkuc3RhdGVtZW50LmZrX3Byb3BlcnR5LnRvU3RyaW5nKCkgOiB1bmRlZmluZWQpLCBpbmdvaW5nSXRlbXMpO1xuICAgICAgICByZXR1cm4geyBncm91cGVkT3V0LCBncm91cGVkSW4gfVxuICAgICAgfSksXG4gICAgICAvLyBhdWRpdFRpbWUoMTApLFxuICAgICAgbWFwKChkKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdzogVGVtcG9yYWxFbnRpdHlSb3cgPSB7fVxuXG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbnMuZm9yRWFjaChmaWVsZERlZmluaXRpb24gPT4ge1xuXG4gICAgICAgICAgbGV0IGNlbGw6IFRlbXBvcmFsRW50aXR5Q2VsbDtcbiAgICAgICAgICBmaWVsZERlZmluaXRpb24ubGlzdERlZmluaXRpb25zLmZvckVhY2gobGlzdERlZmluaXRpb24gPT4ge1xuICAgICAgICAgICAgaWYgKGxpc3REZWZpbml0aW9uLmxpc3RUeXBlLnRpbWVTcGFuKSB7XG5cbiAgICAgICAgICAgICAgY29uc3QgdCA9IHBpY2soWyc3MScsICc3MicsICcxNTAnLCAnMTUxJywgJzE1MicsICcxNTMnXSwgZC5ncm91cGVkT3V0KTtcbiAgICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHQpO1xuICAgICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ID0ga2V5cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgbGV0IGxhYmVsO1xuICAgICAgICAgICAgICBpZiAoaXRlbXNDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lU3BhbktleXM6IEN0cmxUaW1lU3BhbkRpYWxvZ1Jlc3VsdCA9IHt9XG4gICAgICAgICAgICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiB7IHRpbWVTcGFuS2V5c1trZXldID0gdFtrZXldWzBdLnRpbWVQcmltaXRpdmUgfSlcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lU3BhbiA9IFRpbWVTcGFuVXRpbC5mcm9tVGltZVNwYW5EaWFsb2dEYXRhKHRpbWVTcGFuS2V5cyk7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLnRpbWVTcGFuUGlwZS50cmFuc2Zvcm0odGltZVNwYW4pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZzogbGlzdERlZmluaXRpb24uaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICBpdGVtc0NvdW50LFxuICAgICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICAgIGVudGl0eVByZXZpZXc6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaXNUaW1lU3BhbjogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5ncm91cGVkT3V0W2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IHNvcnRJdGVtcyhkLmdyb3VwZWRPdXRbbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pXG4gICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgICAgICAgIGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zQ291bnQ6IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogKChmaXJzdEl0ZW0gfHwge30pIGFzIEVudGl0eVByZXZpZXdJdGVtKS5wcmV2aWV3LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmlyc3RJdGVtLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgICBmaXJzdEl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChkLmdyb3VwZWRJbltsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBzb3J0SXRlbXMoZC5ncm91cGVkSW5bbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pXG4gICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICAgICAgICAgIGNlbGwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zQ291bnQ6IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogKChmaXJzdEl0ZW0gfHwge30pIGFzIEVudGl0eVByZXZpZXdJdGVtKS5wcmV2aWV3LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZmlyc3RJdGVtLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgICBmaXJzdEl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9KVxuXG5cbiAgICAgICAgICByb3dbZmllbGREZWZpbml0aW9uLmxhYmVsXSA9IGNlbGw7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByb3dcbiAgICAgIH0pXG5cblxuICAgIClcbiAgfVxuXG5cblxuICAvLyBAc3B5VGFnXG4gIHByaXZhdGUgcGlwZUl0ZW0ocjogSW5mU3RhdGVtZW50LCBwa1Byb2plY3Q6IG51bWJlciwgcHJvcElzT3V0Z29pbmc6IGJvb2xlYW4pIHtcblxuICAgIGNvbnN0IHRhcmdldEVudGl0eSA9IHByb3BJc091dGdvaW5nID8gci5ma19vYmplY3RfaW5mbyA6IHIuZmtfc3ViamVjdF9pbmZvO1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5nZXRNb2RlbE9mRW50aXR5JCh0YXJnZXRFbnRpdHkpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAobSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsTmFtZTogSW5mTW9kZWxOYW1lID0gbSA/IG0ubW9kZWxOYW1lIDogdW5kZWZpbmVkO1xuICAgICAgICBzd2l0Y2ggKG1vZGVsTmFtZSkge1xuICAgICAgICAgIGNhc2UgJ2FwcGVsbGF0aW9uJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocik7XG4gICAgICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKTtcbiAgICAgICAgICBjYXNlICdwbGFjZSc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVBsYWNlKHIpO1xuICAgICAgICAgIGNhc2UgJ2RpbWVuc2lvbic6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKTtcbiAgICAgICAgICBjYXNlICdsYW5nX3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocik7XG4gICAgICAgICAgY2FzZSAndGltZV9wcmltaXRpdmUnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1UaW1lUHJpbWl0aXZlKHIsIHBrUHJvamVjdCk7IC8vIFRPRE86IGVtaXRzIHR3aWNlXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBwcm9wSXNPdXRnb2luZyk7XG4gICAgICAgIH1cblxuXG4gICAgICB9KVxuICAgIClcblxuXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUVudGl0eVByb3BlcnRpZXMobGlzdERlZjogU3ViZmllbGQsIGZrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxFbnRpdHlQcm9wZXJ0aWVzPiB7XG5cbiAgICBpZiAobGlzdERlZi5saXN0VHlwZS5hcHBlbGxhdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RBcHBlbGxhdGlvbihsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmxhbmd1YWdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdExhbmd1YWdlKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUucGxhY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0UGxhY2UobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5kaW1lbnNpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0RGltZW5zaW9uKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUubGFuZ1N0cmluZykge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5nU3RyaW5nKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuXG5cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmVudGl0eVByZXZpZXcgfHwgbGlzdERlZi5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RFbnRpdHlQcmV2aWV3KGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUudGltZVNwYW4pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtVGltZVNwYW4oZmtFbnRpdHkpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGl0ZW1zID0gaXRlbS5wcm9wZXJ0aWVzLmZpbmQocCA9PiBwLml0ZW1zLmxlbmd0aCA+IDApID8gW3tcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVTcGFuUGlwZS50cmFuc2Zvcm0odGltZVNwYW5JdGVtVG9UaW1lU3BhbihpdGVtKSksXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSAvLyBUT0RPIGNoZWNrIGlmIHRoZSBwcm9wZXJ0aWVzIG9yIHRoZSBpdGVtIGFyZSByZWFsbHkgbm90IG5lZWRlZFxuICAgICAgICAgIH1dIDogW11cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGlzdERlZmluaXRpb246IGxpc3REZWYsXG4gICAgICAgICAgICBpdGVtc1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgfVxuICAgIGVsc2UgcmV0dXJuIG9mKG51bGwpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuaW5mJC50ZW1wb3JhbF9lbnRpdHkkLmJ5X3BrX2VudGl0eV9rZXkkKHBrRW50aXR5KSxcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdCQoeyBma19zdWJqZWN0X2luZm86IHBrRW50aXR5IH0pLFxuICAgICAgdGhpcy5zLmluZiQudGV4dF9wcm9wZXJ0eSQuYnlfZmtfY29uY2VybmVkX2VudGl0eV9pbmRleGVkJChwa0VudGl0eSlcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFt0ZW1wb3JhbEVudGl0eSwgc3RhdGVtZW50cywgdGV4dFByb3BlcnRpZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlczogVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzID0ge1xuICAgICAgICAgIHRlbXBvcmFsRW50aXR5LFxuICAgICAgICAgIHN0YXRlbWVudHM6IHN0YXRlbWVudHMsXG4gICAgICAgICAgdGV4dFByb3BlcnRpZXM6IHZhbHVlcyh0ZXh0UHJvcGVydGllcylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIGdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBpdGVtcyk6IEVudGl0eVByb3BlcnRpZXMge1xuICAgIHJldHVybiB7XG4gICAgICBsaXN0RGVmaW5pdGlvbixcbiAgICAgIGl0ZW1zLFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRpbWUgc3BhbiBpdGVtIGluIHZlcnNpb24gb2YgcHJvamVjdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVRpbWVTcGFuKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxUaW1lU3Bhbkl0ZW0+IHtcblxuICAgIHJldHVybiB0aGlzLnAucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmMucGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKFxuICAgICAgICAgIERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU5cbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChmaWVsZERlZnMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoZmllbGREZWZzLm1hcChmaWVsZERlZiA9PiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICAgICAgICAgIGZrX3Byb3BlcnR5OiBmaWVsZERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXBPcihbXSwgc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgICAgc3RhdGVtZW50cy5tYXAoc3RhdGVtZW50ID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHN0YXRlbWVudC5wa19lbnRpdHkpXG4gICAgICAgICAgICAgICAgICApLnBpcGUobWFwKChbaW5mVGltZVByaW1pdGl2ZSwgcHJvalJlbF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgICAgICAgICAgICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgICAgICAgICAgICAgICAgICAgICBjYWxlbmRhcjogKChwcm9qUmVsLmNhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgIHByb2pSZWwsXG4gICAgICAgICAgICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSksXG4gICAgICAgICAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlczogVGltZVNwYW5Qcm9wZXJ0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb246IGZpZWxkRGVmLmxpc3REZWZpbml0aW9uc1swXSwgaXRlbXNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKS5waXBlKFxuICAgICAgICAgICAgICBtYXAoKHByb3BlcnRpZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXMuZmlsdGVyKHAgPT4gcC5pdGVtcy5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lc3Bhbml0ZW06IFRpbWVTcGFuSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lc3Bhbml0ZW1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbUFwcGVsbGF0aW9uKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuYXBwZWxsYXRpb24kLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBtYXAoYXBwZWxsYXRpb24gPT4ge1xuICAgICAgICBpZiAoIWFwcGVsbGF0aW9uKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY29uc3Qgbm9kZTogQXBwZWxsYXRpb25JdGVtID0ge1xuICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgbGFiZWw6IGFwcGVsbGF0aW9uLnN0cmluZyxcbiAgICAgICAgICBma0NsYXNzOiBhcHBlbGxhdGlvbi5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1MYW5ndWFnZShzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgbWFwKGxhbmd1YWdlID0+IHtcbiAgICAgICAgaWYgKCFsYW5ndWFnZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG5vZGU6IExhbmd1YWdlSXRlbSA9IHtcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgIGxhYmVsOiBsYW5ndWFnZS5ub3RlcyxcbiAgICAgICAgICBma0NsYXNzOiBsYW5ndWFnZS5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1QbGFjZShzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8UGxhY2VJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnBsYWNlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgbWFwKHBsYWNlID0+IHtcbiAgICAgICAgaWYgKCFwbGFjZSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG5vZGU6IFBsYWNlSXRlbSA9IHtcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgIGxhYmVsOiAnV0dTODQ6ICcgKyBwbGFjZS5sYXQgKyAnwrAsICcgKyBwbGFjZS5sb25nICsgJ8KwJyxcbiAgICAgICAgICBma0NsYXNzOiBwbGFjZS5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1EaW1lbnNpb24oc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuZGltZW5zaW9uJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgc3dpdGNoTWFwKChkaW1lbnNpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KGRpbWVuc2lvbi5ma19tZWFzdXJlbWVudF91bml0KVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKHByZXZpZXcgPT4ge1xuXG4gICAgICAgICAgICAgIGNvbnN0IG5vZGU6IERpbWVuc2lvbkl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICBsYWJlbDogYCR7ZGltZW5zaW9uLm51bWVyaWNfdmFsdWV9ICR7cHJldmlldy5lbnRpdHlfbGFiZWx9YCxcbiAgICAgICAgICAgICAgICBma0NsYXNzOiBkaW1lbnNpb24uZmtfY2xhc3MsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1MYW5nU3RyaW5nKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxMYW5nU3RyaW5nSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5nX3N0cmluZyQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKFxuICAgICAgICAobGFuZ1N0cmluZykgPT4ge1xuICAgICAgICAgIGlmICghbGFuZ1N0cmluZykgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3QobnVsbClcbiAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KGxhbmdTdHJpbmcuZmtfbGFuZ3VhZ2UpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKGxhbmd1YWdlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWxhbmd1YWdlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWwgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAobGFuZ1N0cmluZy5zdHJpbmcpIGxhYmVsID0gbGFuZ1N0cmluZy5zdHJpbmdcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsYW5nU3RyaW5nLnF1aWxsX2RvYyAmJiBsYW5nU3RyaW5nLnF1aWxsX2RvYy5vcHMgJiYgbGFuZ1N0cmluZy5xdWlsbF9kb2Mub3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgbGFiZWwgPSBsYW5nU3RyaW5nLnF1aWxsX2RvYy5vcHMubWFwKG9wID0+IG9wLmluc2VydCkuam9pbignJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGU6IExhbmdTdHJpbmdJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGxhbmdTdHJpbmcuZmtfY2xhc3MsXG4gICAgICAgICAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICAgICAgICAgIGZrTGFuZ3VhZ2U6IGxhbmdTdHJpbmcuZmtfbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHN0YXRlbWVudDogSW5mU3RhdGVtZW50LCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldygoaXNPdXRnb2luZyA/IHN0YXRlbWVudC5ma19vYmplY3RfaW5mbyA6IHN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pKS5waXBlKFxuICAgICAgLy8gZmlsdGVyKHByZXZpZXcgPT4gIXByZXZpZXcubG9hZGluZyAmJiAhIXByZXZpZXcgJiYgISFwcmV2aWV3LmVudGl0eV90eXBlKSxcbiAgICAgIG1hcChwcmV2aWV3ID0+IHtcbiAgICAgICAgaWYgKCFwcmV2aWV3KSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9kZTogRW50aXR5UHJldmlld0l0ZW0gPSB7XG4gICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICBwcmV2aWV3LFxuICAgICAgICAgIGxhYmVsOiBwcmV2aWV3LmVudGl0eV9sYWJlbCB8fCAnJyxcbiAgICAgICAgICBma0NsYXNzOiBwcmV2aWV3LmZrX2NsYXNzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwa1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlSXRlbVRpbWVQcmltaXRpdmUoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQsIHBrUHJvamVjdCk6IE9ic2VydmFibGU8VGltZVByaW1pdGl2ZUl0ZW0+IHtcbiAgICBpZiAocGtQcm9qZWN0KSB7XG4gICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgdGhpcy5zLmluZiQudGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgc3RhdGVtZW50LnBrX2VudGl0eSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXAoKFtpbmZUaW1lUHJpbWl0aXZlLCBwcm9qUmVsXSkgPT4ge1xuICAgICAgICAgIGlmICghaW5mVGltZVByaW1pdGl2ZSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgY2FsZW5kYXI6ICgocHJvalJlbC5jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnN0IG5vZGU6IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9KSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW5mUmVwby50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLnBpcGUoXG4gICAgICAgIG1hcChpbmZUaW1lUHJpbWl0aXZlID0+IHtcbiAgICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICBjYWxlbmRhcjogKChzdGF0ZW1lbnQuY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgY29uc3Qgbm9kZTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICB9XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICogUGlwZSBhbHRlcm5hdGl2ZXMgKG5vdCBpbiBwcm9qZWN0KVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RMZW5ndGgobDogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHN3aXRjaCAobC5saXN0VHlwZSkge1xuICAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAgICAgY2FzZSAnZW50aXR5LXByZXZpZXcnOlxuICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgY2FzZSAncGxhY2UnOlxuICAgICAgY2FzZSAnbGFuZ1N0cmluZyc6XG4gICAgICBjYXNlICd0ZW1wb3JhbC1lbnRpdHknOlxuICAgICAgY2FzZSAndGltZS1zcGFuJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RTdGF0ZW1lbnRzKGwsIHBrRW50aXR5KS5waXBlKG1hcChpdGVtcyA9PiBpdGVtcy5sZW5ndGgpKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdChsOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEl0ZW1MaXN0PiB7XG4gICAgaWYgKGwubGlzdFR5cGUuYXBwZWxsYXRpb24pIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0QXBwZWxsYXRpb24obCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5lbnRpdHlQcmV2aWV3KSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5ndWFnZSkgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RMYW5ndWFnZShsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnBsYWNlKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdFBsYWNlKGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdERpbWVuc2lvbihsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmdTdHJpbmcpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0TGFuZ1N0cmluZyhsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnRlbXBvcmFsRW50aXR5KSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUluZ29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICogUGlwZSB0aGUgaXRlbXMgaW4gZW50aXR5IHByZXZpZXcgZmllbGRcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdEVudGl0eVByZXZpZXc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpIDpcbiAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpKSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlc1xuICAgICAgICAgICAgICAuZmlsdGVyKG5vZGUgPT4gISFub2RlKVxuICAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5vcmROdW0gPiBiLm9yZE51bSA/IDEgOiAtMSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgfSkpXG5cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBwbGFjZSBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1QbGFjZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGRpbWVuc2lvbiBsaXN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0RGltZW5zaW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGxhbmdTdHJpbmcgbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdExhbmdTdHJpbmc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gYXBwZWxsYXRpb24gZmllbGRcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RBcHBlbGxhdGlvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGxhbmd1YWdlIGZpZWxkXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogUGlwZSByZXBvIHZpZXdzIChjb21tdW5pdHkgZmF2b3JpdGVzLCB3aGVyZSByZXN0cmljdGVkIGJ5IHF1YW50aWZpZXJzKVxuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8qKlxuICAgKiBQaXBlIHJlcG9zaXRvcnkgdGVtcG9yYWwgZW50aXR5IGl0ZW0gaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIFBpcGUgYXBwZWxsYXRpb24gbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgbGFuZ3VhZ2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3RMYW5ndWFnZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgcGxhY2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1QbGFjZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgcGxhY2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3REaW1lbnNpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG4gIC8qKlxuICAqIFBpcGUgdGhlIGl0ZW1zIGluIGVudGl0eSBwcmV2aWV3IGZpZWxkLCBjb25uZWN0ZWQgYnkgY29tbXVuaXR5IGZhdm9yaXRlIHN0YXRlbWVudHNcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0xpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gICAgICB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gICAgICB0aGlzLmIucGlwZVJlcG9JbmdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSkpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICAgIC8vIC5zb3J0KChhLCBiKSA9PiBhLm9yZE51bSA+IGIub3JkTnVtID8gMSA6IC0xKVxuICAgICAgICAgICAgKSlcbiAgICAgIH0pLFxuICAgICAgc3RhcnRXaXRoKFtdKVxuICAgIClcblxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSByZXBvIHRpbWUgc3BhbiBpdGVtXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvSXRlbVRpbWVTcGFuKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxUaW1lU3Bhbkl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5wLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jLnBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKFxuICAgICAgICAgIERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU5cbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcChmaWVsZERlZmluaXRpb25zID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoZmllbGREZWZpbml0aW9ucy5tYXAoZmllbGREZWYgPT5cbiAgICAgICAgICAgICAgdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShmaWVsZERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcE9yKFtdLCBzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PlxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mUmVwby50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKChpbmZUaW1lUHJpbWl0aXZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXI6ICgoc3RhdGVtZW50LmNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzOiBUaW1lU3BhblByb3BlcnR5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uOiBmaWVsZERlZi5saXN0RGVmaW5pdGlvbnNbMF0sIGl0ZW1zXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBzdGFydFdpdGgoeyBsaXN0RGVmaW5pdGlvbjogZmllbGREZWYubGlzdERlZmluaXRpb25zWzBdLCBpdGVtczogW10gfSBhcyBUaW1lU3BhblByb3BlcnR5KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkpLnBpcGUoXG4gICAgICAgICAgICAgIG1hcCgocHJvcGVydGllcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuaXRlbTogVGltZVNwYW5JdGVtID0ge1xuICAgICAgICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllcy5maWx0ZXIocHJvcHMgPT4gcHJvcHMuaXRlbXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVzcGFuaXRlbVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG5cbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgbGFiZWwgb2YgZ2l2ZW4gZW50aXR5XG4gICAqIFRoaXMgd2lsbCB1c2UgZW50aXR5IHByZXZpZXdzIGZvciBnZXR0aW5nIHN0cmluZ3Mgb2YgcmVsYXRlZCB0ZW1wb3JhbCBlbnRpdGllc1xuICAgKiBTbyB0aGlzIG1heSB0YWtlIGEgbGl0dGxlIHdoaWxlXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMYWJlbE9mRW50aXR5KGZrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmIucGlwZUNsYXNzT2ZFbnRpdHkoZmtFbnRpdHkpLnBpcGUoXG5cbiAgICAgIC8vIGdldCB0aGUgZGVmaW5pdGlvbiBvZiB0aGUgZmlyc3QgZmllbGRcbiAgICAgIHN3aXRjaE1hcChma0NsYXNzID0+IHRoaXMuYy5waXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhma0NsYXNzKS5waXBlKFxuICAgICAgICAvLyBnZXQgdGhlIGZpcnN0IGl0ZW0gb2YgdGhhdCBmaWVsZFxuICAgICAgICBzd2l0Y2hNYXAoZmllbGREZWYgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgICAgZmllbGREZWYgJiYgZmllbGREZWYubGVuZ3RoID9cbiAgICAgICAgICAgIGZpZWxkRGVmWzBdLmxpc3REZWZpbml0aW9ucy5tYXAobGlzdERlZiA9PiB0aGlzLnBpcGVFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGZrRW50aXR5LCAxKSkgOlxuICAgICAgICAgICAgW11cbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcChwcm9wcyA9PiB7XG4gICAgICAgICAgICBwcm9wcyA9IHByb3BzLmZpbHRlcihwcm9wID0+IHByb3AuaXRlbXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIGlmIChwcm9wcy5sZW5ndGggJiYgcHJvcHNbMF0uaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9wc1swXS5pdGVtc1swXS5sYWJlbFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICcnXG4gICAgICAgICAgfSlcbiAgICAgICAgKSkpXG4gICAgICApKVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIGNsYXNzIGxhYmVsIG9mIGdpdmVuIGVudGl0eVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQ2xhc3NMYWJlbE9mRW50aXR5KGZrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmIucGlwZUNsYXNzT2ZFbnRpdHkoZmtFbnRpdHkpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtDbGFzcyA9PiB0aGlzLmMucGlwZUNsYXNzTGFiZWwocGtDbGFzcykpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBwa19lbnRpdHkgb2YgdGhlIHR5cGUgb2YgYW4gZW50aXR5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVUeXBlT2ZFbnRpdHkocGtFbnRpdHk6IG51bWJlciwgaGFzVHlwZVByb3BlcnR5OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudD4ge1xuICAgIGlmIChpc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7IGZrX3Byb3BlcnR5OiBoYXNUeXBlUHJvcGVydHksIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHkgfSkucGlwZShtYXAoaXRlbXMgPT4ge1xuICAgICAgICBpZiAoIWl0ZW1zIHx8IE9iamVjdC5rZXlzKGl0ZW1zKS5sZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBlbHNlIHJldHVybiB2YWx1ZXMoaXRlbXMpWzBdXG4gICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoeyBma19wcm9wZXJ0eTogaGFzVHlwZVByb3BlcnR5LCBma19vYmplY3RfaW5mbzogcGtFbnRpdHkgfSkucGlwZShcbiAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICBpZiAoIWl0ZW1zIHx8IE9iamVjdC5rZXlzKGl0ZW1zKS5sZW5ndGggPCAxKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlcyhpdGVtcylbMF1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlQ2xhc3Nlc0FuZFR5cGVzKGVuYWJsZWRJbjogJ2VudGl0aWVzJyB8ICdzb3VyY2VzJykge1xuICAgIHJldHVybiB0aGlzLmMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXMoZW5hYmxlZEluKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGl0ZW1zID0+IHRoaXMucGlwZUNsYXNzQW5kVHlwZU5vZGVzKGl0ZW1zKSksXG4gICAgKVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzZXNBbmRUeXBlc09mQ2xhc3NlcyhjbGFzc2VzOiBudW1iZXJbXSkge1xuICAgIHJldHVybiB0aGlzLmMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXNPZlR5cGVkQ2xhc3NlcyhjbGFzc2VzKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGl0ZW1zID0+IHRoaXMucGlwZUNsYXNzQW5kVHlwZU5vZGVzKGl0ZW1zKSksXG4gICAgKVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzQW5kVHlwZU5vZGVzKHR5cGVBbmRUeXBlZENsYXNzZXM6IHsgdHlwZWRDbGFzczogbnVtYmVyOyB0eXBlQ2xhc3M6IG51bWJlcjsgfVtdKTogT2JzZXJ2YWJsZTxDbGFzc0FuZFR5cGVOb2RlW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICB0eXBlQW5kVHlwZWRDbGFzc2VzLm1hcChpdGVtID0+IHRoaXMuYy5waXBlQ2xhc3NMYWJlbChpdGVtLnR5cGVkQ2xhc3MpLnBpcGUoXG4gICAgICAgIG1hcChsYWJlbCA9PiAoe1xuICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgIGRhdGE6IHsgcGtDbGFzczogaXRlbS50eXBlZENsYXNzLCBwa1R5cGU6IG51bGwgfVxuICAgICAgICB9IGFzIENsYXNzQW5kVHlwZU5vZGUpKSxcbiAgICAgICAgc3dpdGNoTWFwKG5vZGUgPT4gaWlmKFxuICAgICAgICAgICgpID0+ICEhaXRlbS50eXBlQ2xhc3MsXG4gICAgICAgICAgdGhpcy5iLnBpcGVQZXJzaXN0ZW50SXRlbVBrc0J5Q2xhc3MoaXRlbS50eXBlQ2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAodHlwZVBrcyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgICAgICAgdHlwZVBrcy5tYXAocGtUeXBlID0+IHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KHBrVHlwZSkucGlwZShcbiAgICAgICAgICAgICAgICBtYXAocHJldmlldyA9PiAoe1xuICAgICAgICAgICAgICAgICAgbGFiZWw6IHByZXZpZXcuZW50aXR5X2xhYmVsLFxuICAgICAgICAgICAgICAgICAgZGF0YTogeyBwa0NsYXNzOiBpdGVtLnR5cGVkQ2xhc3MsIHBrVHlwZSB9XG4gICAgICAgICAgICAgICAgfSBhcyBDbGFzc0FuZFR5cGVOb2RlKSlcbiAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgc29ydEFiYyhuID0+IG4ubGFiZWwpLFxuICAgICAgICAgICAgKSksXG4gICAgICAgICAgICBtYXAoY2hpbGRyZW4gPT4ge1xuICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuID0gY2hpbGRyZW5cbiAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSxcbiAgICAgICAgICBvZih7IC4uLm5vZGUsIGNoaWxkcmVuOiBbXSB9IGFzIENsYXNzQW5kVHlwZU5vZGUpXG4gICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKSlcbiAgICApLnBpcGUoXG4gICAgICBzb3J0QWJjKChub2RlKSA9PiBub2RlLmxhYmVsKSxcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBhcnJheSBvZiBwa19jbGFzcyBvZiBhbGwgY2xhc3NlcyBhbmQgdHlwZWQgY2xhc3Nlcy5cbiAgICogQHBhcmFtIGNsYXNzZXNBbmRUeXBlcyBhIG9iamVjdCBjb250YWluaW5nIHtjbGFzc2VzOiBbXSwgdHlwZXNbXX1cbiAgICovXG4gIHBpcGVDbGFzc2VzRnJvbUNsYXNzZXNBbmRUeXBlcyhjbGFzc2VzQW5kVHlwZXM6IENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIGNvbnN0IHR5cGVkQ2xhc3NlcyQgPSAoIWNsYXNzZXNBbmRUeXBlcyB8fCAhY2xhc3Nlc0FuZFR5cGVzLnR5cGVzIHx8ICFjbGFzc2VzQW5kVHlwZXMudHlwZXMubGVuZ3RoKSA/XG4gICAgICBvZihbXSBhcyBudW1iZXJbXSkgOlxuICAgICAgdGhpcy5iLnBpcGVDbGFzc2VzT2ZQZXJzaXN0ZW50SXRlbXMoY2xhc3Nlc0FuZFR5cGVzLnR5cGVzKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKHBrcykgPT4gISFwa3MpLFxuICAgICAgICAgIHN3aXRjaE1hcCh0eXBlQ2xhc3NlcyA9PiB0aGlzLmMucGlwZVR5cGVkQ2xhc3Nlc09mVHlwZUNsYXNzZXModHlwZUNsYXNzZXMpKVxuICAgICAgICApXG4gICAgcmV0dXJuIHR5cGVkQ2xhc3NlcyQucGlwZShcbiAgICAgIG1hcCh0eXBlZENsYXNzZXMgPT4gdW5pcShbLi4udHlwZWRDbGFzc2VzLCAuLi4oKGNsYXNzZXNBbmRUeXBlcyB8fCB7IGNsYXNzZXM6IFtdIH0pLmNsYXNzZXMgfHwgW10pXSkpXG4gICAgKTtcbiAgfVxuXG4gIHBpcGVQcm9wZXJ0eU9wdGlvbnNGcm9tQ2xhc3Nlc0FuZFR5cGVzKGNsYXNzZXNBbmRUeXBlczogQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwpOiBPYnNlcnZhYmxlPFByb3BlcnR5T3B0aW9uW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlQ2xhc3Nlc0Zyb21DbGFzc2VzQW5kVHlwZXMoY2xhc3Nlc0FuZFR5cGVzKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKGNsYXNzZXMgPT4gdGhpcy5waXBlUHJvcGVydHlPcHRpb25zRm9ybUNsYXNzZXMoY2xhc3NlcykpXG4gICAgKVxuICB9XG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVQcm9wZXJ0eU9wdGlvbnNGb3JtQ2xhc3NlcyhjbGFzc2VzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8UHJvcGVydHlPcHRpb25bXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShjbGFzc2VzLm1hcChwa0NsYXNzID0+IHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLnBpcGUoXG4gICAgICBtYXAoYyA9PiBjLmJhc2ljX3R5cGUgPT09IDkpLFxuICAgICAgc3dpdGNoTWFwKGlzVGVFbiA9PiB0aGlzLmMucGlwZVNwZWNpZmljQW5kQmFzaWNGaWVsZHMocGtDbGFzcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGNsYXNzRmllbGRzID0+IGNsYXNzRmllbGRzXG4gICAgICAgICAgICAuZmlsdGVyKGYgPT4gISFmLnByb3BlcnR5LnBrUHJvcGVydHkpXG4gICAgICAgICAgICAubWFwKGYgPT4gKHtcbiAgICAgICAgICAgICAgaXNPdXRnb2luZzogZi5pc091dGdvaW5nLFxuICAgICAgICAgICAgICBma1Byb3BlcnR5RG9tYWluOiBmLmlzT3V0Z29pbmcgPyBmLnNvdXJjZUNsYXNzIDogbnVsbCxcbiAgICAgICAgICAgICAgZmtQcm9wZXJ0eVJhbmdlOiBmLmlzT3V0Z29pbmcgPyBudWxsIDogZi5zb3VyY2VDbGFzcyxcbiAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogZi5wcm9wZXJ0eS5wa1Byb3BlcnR5XG4gICAgICAgICAgICB9KSkpLFxuICAgICAgICAgIHN3aXRjaE1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICBpZiAoaXNUZUVuKSB7XG4gICAgICAgICAgICAgIC8vIGFkZCB0aW1lIHByb3BlcnRpZXMgKGF0IHNvbWUgdGltZSB3aXRoaW4sIC4uLilcbiAgICAgICAgICAgICAgRGZoQ29uZmlnLlBST1BFUlRZX1BLU19XSEVSRV9USU1FX1BSSU1JVElWRV9JU19SQU5HRS5tYXAocGtQcm9wZXJ0eSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgZmtQcm9wZXJ0eURvbWFpbjogcGtDbGFzcyxcbiAgICAgICAgICAgICAgICAgIGZrUHJvcGVydHlSYW5nZTogRGZoQ29uZmlnLkNMQVNTX1BLX1RJTUVfUFJJTUlUSVZFLFxuICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShpdGVtcy5tYXAoaXRlbSA9PiB0aGlzLmMucGlwZUZpZWxkTGFiZWwoXG4gICAgICAgICAgICAgIGl0ZW0ucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgaXRlbS5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICAgICAgICBpdGVtLmZrUHJvcGVydHlSYW5nZSxcbiAgICAgICAgICAgICkucGlwZShtYXAobGFiZWwgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc091dGdvaW5nID0gaXRlbS5pc091dGdvaW5nO1xuICAgICAgICAgICAgICBjb25zdCBvOiBQcm9wZXJ0eU9wdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICAgIHBrOiBpdGVtLnBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgcHJvcGVydHlGaWVsZEtleTogcHJvcGVydHlPcHRpb25GaWVsZEtleShpdGVtLnBrUHJvcGVydHksIGlzT3V0Z29pbmcpXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHJldHVybiBvO1xuICAgICAgICAgICAgfSkpKSk7XG4gICAgICAgICAgfSkpKVxuICAgIClcblxuXG4gICAgKSkucGlwZShtYXAoeSA9PiBmbGF0dGVuPFByb3BlcnR5T3B0aW9uPih5KSkpO1xuICB9XG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVQa0NsYXNzZXNGcm9tUHJvcGVydHlTZWxlY3RNb2RlbChtb2RlbDogUHJvcGVydHlTZWxlY3RNb2RlbCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICBbXG4gICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5vdXRnb2luZ1Byb3BlcnRpZXMsIHRydWUpLFxuICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwuaW5nb2luZ1Byb3BlcnRpZXMsIGZhbHNlKSxcbiAgICAgIF1cbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFtvdXQsIGluZ10pID0+IHVuaXEoWy4uLm91dCwgLi4uaW5nXSkpXG4gICAgKVxuICB9XG5cbiAgZ2V0UGtDbGFzc2VzRnJvbVByb3BlcnR5U2VsZWN0TW9kZWwkKG1vZGVsJDogT2JzZXJ2YWJsZTxQcm9wZXJ0eVNlbGVjdE1vZGVsPik6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gbW9kZWwkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAobW9kZWwgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIFtcbiAgICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwub3V0Z29pbmdQcm9wZXJ0aWVzLCB0cnVlKSxcbiAgICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwuaW5nb2luZ1Byb3BlcnRpZXMsIGZhbHNlKSxcbiAgICAgICAgXVxuICAgICAgKS5waXBlKFxuICAgICAgICBtYXAoKFtvdXQsIGluZ10pID0+IHVuaXEoWy4uLm91dCwgLi4uaW5nXSkpXG4gICAgICApKVxuICAgIClcbiAgfVxuXG5cblxuICBnZXRQcm9wZXJ0eU9wdGlvbnMkKGNsYXNzVHlwZXMkOiBPYnNlcnZhYmxlPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsPik6IE9ic2VydmFibGU8UHJvcGVydHlPcHRpb25bXT4ge1xuICAgIHJldHVybiBjbGFzc1R5cGVzJC5waXBlPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsLCBQcm9wZXJ0eU9wdGlvbltdPihcbiAgICAgIC8vIG1ha2Ugc3VyZSBvbmx5IGl0IHBhc3NlcyBvbmx5IGlmIGRhdGEgb2YgdGhlIGFycmF5Q2xhc3NlcyBhcmUgY2hhbmdlZCAobm90IGNoaWxkcmVuKVxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQ8Q2xhc3NBbmRUeXBlU2VsZWN0TW9kZWw+KChhLCBiKSA9PiB7XG4gICAgICAgIHJldHVybiBlcXVhbHMoYSwgYik7XG4gICAgICB9KSxcbiAgICAgIHN3aXRjaE1hcCgoeCkgPT4gIXggPyBlbXB0eSgpIDogdGhpcy5iLnBpcGVDbGFzc2VzT2ZQZXJzaXN0ZW50SXRlbXMoeC50eXBlcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChwa3MpID0+ICEhcGtzKSxcbiAgICAgICAgICBzd2l0Y2hNYXAodHlwZUNsYXNzZXMgPT4gdGhpcy5jLnBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHR5cGVDbGFzc2VzKS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKHR5cGVkQ2xhc3NlcyA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSB1bmlxKFsuLi50eXBlZENsYXNzZXMsIC4uLih4LmNsYXNzZXMgfHwgW10pXSk7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVQcm9wZXJ0eU9wdGlvbnNGb3JtQ2xhc3NlcyhjbGFzc2VzKVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9wZXJ0eU9wdGlvbkZpZWxkS2V5KGZrUHJvcGVydHk6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IHN0cmluZyB7XG4gIHJldHVybiAnXycgKyBma1Byb3BlcnR5ICsgJ18nICsgKGlzT3V0Z29pbmcgPyAnb3V0Z29pbmcnIDogJ2luZ29pbmcnKTtcbn1cblxuIl19