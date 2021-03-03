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
                    targetClass: page.targetClass,
                    target: {
                        appellation: appellation
                    }
                };
                return stmtTarget;
            })));
        }
        else if (subfieldType.place) {
            return this.s.inf$.place$.by_pk_entity$.key(targetInfo).pipe(map((/**
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
            return this.s.inf$.dimension$.by_pk_entity$.key(targetInfo).pipe(switchMap((/**
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
            return this.s.inf$.lang_string$.by_pk_entity$.key(targetInfo).pipe(switchMap((/**
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
            return this.s.inf$.language$.by_pk_entity$.key(targetInfo).pipe(map((/**
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
        else if (subfieldType.entityPreview) {
            return this.p.streamEntityPreview(targetInfo).pipe(map((/**
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
                .pipe(map((/**
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
            return this.s.inf$.time_primitive$.by_pk_entity$.key(targetInfo).pipe(switchMap((/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbmZvcm1hdGlvbi1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlqRCxPQUFPLEVBQWdCLG9CQUFvQixFQUFlLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkwsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBeUI5RixPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLDBC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UUFEQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OztnREFDdUMsVUFBVTt1RkFTM0U7a0NBaHFESDtDQXFzREMsQUFucERELElBbXBEQztTQW5vRFksdUJBQXVCOzs7SUFFbEMsMENBQXFCOzs7OztJQUduQixvQ0FBdUM7Ozs7O0lBQ3ZDLG9DQUFvQzs7Ozs7SUFDcEMsb0NBQWlDOzs7OztJQUNqQyxvQ0FBb0M7O0lBQ3BDLG9EQUEyQzs7Ozs7SUFDM0MsK0NBQWtDOzs7Ozs7O0FBMm5EdEMsTUFBTSxVQUFVLHNCQUFzQixDQUFDLFVBQWtCLEVBQUUsVUFBbUI7SUFDNUUsT0FBTyxHQUFHLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGZoQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBJbmZTdGF0ZW1lbnQgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgR3ZTdWJmaWVsZFBhZ2UsIEd2U3ViZmllbGRUeXBlLCBUaW1lUHJpbWl0aXZlV2l0aENhbCwgV2FyRW50aXR5UHJldmlld1RpbWVTcGFuIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IENhbGVuZGFyVHlwZSwgY29tYmluZUxhdGVzdE9yRW1wdHksIEdyYW51bGFyaXR5LCBsaW1pdFRvLCBzb3J0QWJjLCBzd2l0Y2hNYXBPciwgVGltZVByaW1pdGl2ZSwgVGltZVByaW1pdGl2ZVBpcGUsIFRpbWVTcGFuUGlwZSwgVGltZVNwYW5VdGlsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBlcXVhbHMsIGZsYXR0ZW4sIGdyb3VwQnksIHBpY2ssIHVuaXEsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgZW1wdHksIGlpZiwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhZyB9IGZyb20gJ3J4anMtc3B5L29wZXJhdG9ycyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjYWNoZSwgc3B5VGFnIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9tZXRob2QtZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBpbmZUaW1lUHJpbVRvVGltZVByaW1XaXRoQ2FsLCB0aW1lU3Bhbkl0ZW1Ub1RpbWVTcGFuIH0gZnJvbSAnLi4vZnVuY3Rpb25zL2Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBBcHBlbGxhdGlvbkl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvQXBwZWxsYXRpb25JdGVtJztcbmltcG9ydCB7IEJhc2ljU3RhdGVtZW50SXRlbSB9IGZyb20gJy4uL21vZGVscy9CYXNpY1N0YXRlbWVudEl0ZW0nO1xuaW1wb3J0IHsgQ2xhc3NBbmRUeXBlTm9kZSB9IGZyb20gJy4uL21vZGVscy9DbGFzc0FuZFR5cGVOb2RlJztcbmltcG9ydCB7IENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL0NsYXNzQW5kVHlwZVNlbGVjdE1vZGVsJztcbmltcG9ydCB7IEN0cmxUaW1lU3BhbkRpYWxvZ1Jlc3VsdCB9IGZyb20gJy4uL21vZGVscy9DdHJsVGltZVNwYW5EaWFsb2dSZXN1bHQnO1xuaW1wb3J0IHsgRGltZW5zaW9uSXRlbSB9IGZyb20gJy4uL21vZGVscy9EaW1lbnNpb25JdGVtJztcbmltcG9ydCB7IEVudGl0eVByZXZpZXdJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0VudGl0eVByZXZpZXdJdGVtJztcbmltcG9ydCB7IEVudGl0eVByb3BlcnRpZXMgfSBmcm9tICcuLi9tb2RlbHMvRW50aXR5UHJvcGVydGllcyc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL21vZGVscy9GaWVsZCc7XG5pbXBvcnQgeyBJdGVtTGlzdCB9IGZyb20gJy4uL21vZGVscy9JdGVtTGlzdCc7XG5pbXBvcnQgeyBMYW5nU3RyaW5nSXRlbSB9IGZyb20gJy4uL21vZGVscy9MYW5nU3RyaW5nSXRlbSc7XG5pbXBvcnQgeyBMYW5ndWFnZUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvTGFuZ3VhZ2VJdGVtJztcbmltcG9ydCB7IFBsYWNlSXRlbSB9IGZyb20gJy4uL21vZGVscy9QbGFjZUl0ZW0nO1xuaW1wb3J0IHsgUHJvcGVydHlPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvUHJvcGVydHlPcHRpb24nO1xuaW1wb3J0IHsgUHJvcGVydHlTZWxlY3RNb2RlbCB9IGZyb20gJy4uL21vZGVscy9Qcm9wZXJ0eVNlbGVjdE1vZGVsJztcbmltcG9ydCB7IFN0YXRlbWVudEl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvU3RhdGVtZW50SXRlbSc7XG5pbXBvcnQgeyBTdGF0ZW1lbnRQcm9qUmVsLCBTdGF0ZW1lbnRUYXJnZXQsIFN0YXRlbWVudFdpdGhUYXJnZXQsIFN1YmVudGl0eVN1YmZpZWxkUGFnZSwgU3ViZmllbGRQYWdlIH0gZnJvbSAnLi4vbW9kZWxzL1N0YXRlbWVudFdpdGhUYXJnZXQnO1xuaW1wb3J0IHsgU3ViZmllbGQgfSBmcm9tICcuLi9tb2RlbHMvU3ViZmllbGQnO1xuaW1wb3J0IHsgVGVtcG9yYWxFbnRpdHlDZWxsIH0gZnJvbSAnLi4vbW9kZWxzL1RlbXBvcmFsRW50aXR5Q2VsbCc7XG5pbXBvcnQgeyBUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMgfSBmcm9tICcuLi9tb2RlbHMvVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzJztcbmltcG9ydCB7IFRlbXBvcmFsRW50aXR5Um93IH0gZnJvbSAnLi4vbW9kZWxzL1RlbXBvcmFsRW50aXR5Um93JztcbmltcG9ydCB7IFRpbWVQcmltaXRpdmVJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL1RpbWVQcmltaXRpdmVJdGVtJztcbmltcG9ydCB7IFRpbWVTcGFuSXRlbSB9IGZyb20gJy4uL21vZGVscy9UaW1lU3Bhbkl0ZW0nO1xuaW1wb3J0IHsgVGltZVNwYW5Qcm9wZXJ0eSB9IGZyb20gJy4uL21vZGVscy9UaW1lU3BhblByb3BlcnR5JztcbmltcG9ydCB7IEluZk1vZGVsTmFtZSwgSW5mU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvaW5mLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSB9IGZyb20gJy4vYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5mb3JtYXRpb25CYXNpY1BpcGVzU2VydmljZSB9IGZyb20gJy4vaW5mb3JtYXRpb24tYmFzaWMtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zY2hlbWEtc2VsZWN0b3JzLnNlcnZpY2UnO1xuXG5cblxuXG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbi8qKlxuICogVGhpcyBTZXJ2aWNlIHByb3ZpZGVzIGEgY29sbGVjaW9uIG9mIHBpcGVzIHRoYXQgYWdncmVnYXRlIG9yIHRyYW5zZm9ybSBpbmZvcm1hdGlvbi5cbiAqIEZvciBFeGFtcGxlXG4gKiAtIHRoZSBsaXN0cyBvZiB0ZXh0IHByb3BlcnRpZXMsIGFwcGVsbGFpdG9ucywgcGxhY2VzLCB0aW1lLXByaW1pdGl2ZXMgLyB0aW1lLXNwYW5zIGV0Yy5cbiAqIC0gdGhlIGxhYmVsIG9mIHRlbXBvcmFsIGVudGl0eSBvciBwZXJzaXN0ZW50IGl0ZW1cbiAqXG4gKiBUaGlzIG1haW5seSBzZWxlY3RzIGRhdGEgZnJvbSB0aGUgaW5mb3JtYXRpb24gc2NoZW1hIGFuZCB0aGUgcmVsYXRpb24gdG8gcHJvamVjdHMuXG4gKiBJdCBjb21iaW5lcyBwaXBlcyBzZWxlY3RpbmcgZGF0YSBmcm9tIHRoZVxuICogLSBhY3RpdmF0ZWQgcHJvamVjdFxuICogLSBhbHRlcm5hdGl2ZXMgKG5vdCBpbiBwcm9qZWN0IGJ1dCBpbiBvdGhlcnMpXG4gKiAtIHJlcG9cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZvcm1hdGlvblBpcGVzU2VydmljZSB7XG5cbiAgaW5mUmVwbzogSW5mU2VsZWN0b3I7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBiOiBJbmZvcm1hdGlvbkJhc2ljUGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcDogQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSxcbiAgICBwcml2YXRlIHM6IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjOiBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlLFxuICAgIHB1YmxpYyB0aW1lUHJpbWl0aXZlUGlwZTogVGltZVByaW1pdGl2ZVBpcGUsXG4gICAgcHJpdmF0ZSB0aW1lU3BhblBpcGU6IFRpbWVTcGFuUGlwZSxcbiAgICBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT5cbiAgKSB7XG4gICAgdGhpcy5pbmZSZXBvID0gbmV3IEluZlNlbGVjdG9yKG5nUmVkdXgsIG9mKCdyZXBvJykpXG4gIH1cblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogUGlwZSB0aGUgcHJvamVjdCBlbnRpdGllc1xuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RMZW5ndGgobDogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHN3aXRjaCAobC5saXN0VHlwZSkge1xuICAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAgICAgY2FzZSAnZW50aXR5LXByZXZpZXcnOlxuICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgY2FzZSAncGxhY2UnOlxuICAgICAgY2FzZSAnZGltZW5zaW9uJzpcbiAgICAgIGNhc2UgJ2xhbmdTdHJpbmcnOlxuICAgICAgY2FzZSAndGVtcG9yYWwtZW50aXR5JzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3QobCwgcGtFbnRpdHkpLnBpcGUobWFwKGl0ZW1zID0+IGl0ZW1zLmxlbmd0aCkpXG5cbiAgICAgIGNhc2UgJ3RpbWUtc3Bhbic6XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MiwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MSwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTAsIHBrRW50aXR5KSxcbiAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUxLCBwa0VudGl0eSksXG4gICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MiwgcGtFbnRpdHkpLFxuICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTMsIHBrRW50aXR5KVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgdGFwKCh4KSA9PiB7XG5cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBtYXAoaXRlbXMgPT4gaXRlbXMuZmlsdGVyKHggPT4geC5sZW5ndGggPiAwKS5sZW5ndGgpKVxuXG4gICAgICAvLyBjYXNlICd0ZXh0LXByb3BlcnR5JzpcbiAgICAgIC8vICAgcmV0dXJuIHRoaXMucGlwZUxpc3RUZXh0UHJvcGVydHkobCwgcGtFbnRpdHkpLnBpcGUobWFwKGl0ZW1zID0+IGl0ZW1zLmxlbmd0aCkpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICAgICAgICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgICB9XG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0KGw6IFN1YmZpZWxkLCBwa0VudGl0eSwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEl0ZW1MaXN0PiB7XG4gICAgaWYgKGwubGlzdFR5cGUuYXBwZWxsYXRpb24pIHJldHVybiB0aGlzLnBpcGVMaXN0QXBwZWxsYXRpb24obCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZW50aXR5UHJldmlldykgcmV0dXJuIHRoaXMucGlwZUxpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmd1YWdlKSByZXR1cm4gdGhpcy5waXBlTGlzdExhbmd1YWdlKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnBsYWNlKSByZXR1cm4gdGhpcy5waXBlTGlzdFBsYWNlKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmRpbWVuc2lvbikgcmV0dXJuIHRoaXMucGlwZUxpc3REaW1lbnNpb24obCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ1N0cmluZykgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5nU3RyaW5nKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnRlbXBvcmFsRW50aXR5KSByZXR1cm4gdGhpcy5waXBlTGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHksIGxpbWl0KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUudGltZVNwYW4pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtVGltZVNwYW4ocGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIG1hcCgodHMpID0+IFt0c10uZmlsdGVyKGkgPT4gaS5wcm9wZXJ0aWVzLmxlbmd0aCA+IDApKVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdEJhc2ljU3RhdGVtZW50SXRlbXMobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBwa1Byb2plY3Q6IG51bWJlcik6IE9ic2VydmFibGU8QmFzaWNTdGF0ZW1lbnRJdGVtW10+IHtcbiAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ0Jhc2ljU3RhdGVtZW50SXRlbXNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5LCBwa1Byb2plY3QpIDpcbiAgICAgIHRoaXMuYi5waXBlSW5nb2luZ0Jhc2ljU3RhdGVtZW50SXRlbXNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5LCBwa1Byb2plY3QpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGl0ZW1zIGluIGFwcGVsbGF0aW9uIGZpZWxkXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gKiBQaXBlIHRoZSBpdGVtcyBpbiBlbnRpdHkgcHJldmlldyBmaWVsZFxuICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhZyhgYmVmb3JlLSR7cGtFbnRpdHl9LSR7bGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eX0tJHtsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzc31gKSxcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEub3JkTnVtID4gYi5vcmROdW0gPyAxIDogLTEpLFxuICAgICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pXG4gICAgICAgICAgICApXG4gICAgICAgIH0pLFxuICAgICAgICB0YWcoYGFmdGVyLSR7cGtFbnRpdHl9LSR7bGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eX0tJHtsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzc31gKSxcbiAgICAgIClcblxuICB9XG5cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVMaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgaXRlbXMgaW4gcGxhY2UgbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdFBsYWNlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbVBsYWNlKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGl0ZW1zIGluIHBsYWNlIGxpc3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUxpc3REaW1lbnNpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICogUGlwZSB0aGUgaXRlbXMgaW4gbGFuZ1N0cmluZyBsaXN0XG4gKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGlzdExhbmdTdHJpbmc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5nU3RyaW5nKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuXG4gIH1cblxuICAvKipcbiAgICogcGlwZSB0aGUgcHJvamVjdCByZWxhdGlvbiBvZiBnaXZlbiBzdGF0bWVudCwgaWYgdGhlIHNjb3BlIG9mIHRoaXMgcGFnZSBpcyBpblByb2plY3RcbiAgICogQHBhcmFtIHN0bXQgSW5mU3RhdGVtZW50IHRvIGJlIGNvbXBsZXRlZCB3aXRoIHByb2pSZWxcbiAgICogQHBhcmFtIHBhZ2UgcGFnZSBmb3Igd2hpY2ggd2UgYXJlIHBpcGluZyB0aGlzIHN0dWZmXG4gICAqL1xuICBwaXBlUHJvalJlbE9mU3RhdGVtZW50KHN0bXQ6IEluZlN0YXRlbWVudCwgcGFnZTogR3ZTdWJmaWVsZFBhZ2UpOiBPYnNlcnZhYmxlPFN0YXRlbWVudFByb2pSZWw+IHtcbiAgICBpZiAocGFnZS5zY29wZS5pblByb2plY3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkXG4gICAgICAgIC5rZXkocGFnZS5zY29wZS5pblByb2plY3QgKyAnXycgKyBzdG10LnBrX2VudGl0eSkucGlwZShcbiAgICAgICAgICBtYXAoXG4gICAgICAgICAgICBwcm9qUmVsID0+ICh7XG4gICAgICAgICAgICAgIHByb2pSZWwsXG4gICAgICAgICAgICAgIG9yZE51bTogcGFnZS5pc091dGdvaW5nID8gcHJvalJlbC5vcmRfbnVtX29mX3JhbmdlIDogcHJvalJlbC5vcmRfbnVtX29mX2RvbWFpblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIHBpcGUgdGhlIHRhcmdldCBvZiBnaXZlbiBzdGF0bWVudFxuICAgKiBAcGFyYW0gc3RtdCBJbmZTdGF0ZW1lbnQgdG8gYmUgY29tcGxldGVkIHdpdGggdGFyZ2V0XG4gICAqIEBwYXJhbSBwYWdlIHBhZ2UgZm9yIHdoaWNoIHdlIGFyZSBwaXBpbmcgdGhpcyBzdHVmZlxuICAgKiBAcGFyYW0gc3ViZmllbGRUeXBlIHR5cGUgb2Ygc3ViZmllbGQgZm9yIHdoaWNoIHdlIHBpcGUgdGhpcyBzdHVmZlxuICAgKi9cbiAgcGlwZVRhcmdldE9mU3RhdGVtZW50KHN0bXQ6IEluZlN0YXRlbWVudCwgcGFnZTogR3ZTdWJmaWVsZFBhZ2UsIHN1YmZpZWxkVHlwZTogR3ZTdWJmaWVsZFR5cGUpOiBPYnNlcnZhYmxlPFN0YXRlbWVudFRhcmdldD4ge1xuICAgIGNvbnN0IGlzT3V0Z29pbmcgPSBwYWdlLmlzT3V0Z29pbmdcbiAgICBjb25zdCB0YXJnZXRJbmZvID0gaXNPdXRnb2luZyA/IHN0bXQuZmtfb2JqZWN0X2luZm8gOiBzdG10LmZrX3N1YmplY3RfaW5mbztcbiAgICAvLyBoZXJlIHlvdSBjb3VsZCBhZGQgdGFyZ2V0RGF0YSBvciB0YXJnZXRDZWxsXG5cbiAgICBpZiAoc3ViZmllbGRUeXBlLmFwcGVsbGF0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuYXBwZWxsYXRpb24kLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgIG1hcChhcHBlbGxhdGlvbiA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgIHRhcmdldExhYmVsOiBhcHBlbGxhdGlvbi5zdHJpbmcsXG4gICAgICAgICAgICB0YXJnZXRDbGFzczogcGFnZS50YXJnZXRDbGFzcyxcbiAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICBhcHBlbGxhdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUucGxhY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5wbGFjZSQuYnlfcGtfZW50aXR5JC5rZXkodGFyZ2V0SW5mbykucGlwZShcbiAgICAgICAgbWFwKHBsYWNlID0+IHtcbiAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IGBXR1M4NDogJHtwbGFjZS5sYXR9wrAsICR7cGxhY2UubG9uZ33CsGAsXG4gICAgICAgICAgICB0YXJnZXRDbGFzczogcGFnZS50YXJnZXRDbGFzcyxcbiAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICBwbGFjZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUuZGltZW5zaW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuZGltZW5zaW9uJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoZGltZW5zaW9uID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoZGltZW5zaW9uLmZrX21lYXN1cmVtZW50X3VuaXQpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgIHVuaXRQcmV2aWV3ID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogYCR7ZGltZW5zaW9uLm51bWVyaWNfdmFsdWV9ICR7dW5pdFByZXZpZXcuZW50aXR5X2xhYmVsfWAsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBwYWdlLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUubGFuZ1N0cmluZykge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmdfc3RyaW5nJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAobGFuZ1N0cmluZyA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleShsYW5nU3RyaW5nLmZrX2xhbmd1YWdlKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IGAke2xhbmdTdHJpbmcuc3RyaW5nfSAoJHtsYW5ndWFnZS5pc282MzkxfSlgLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzczogcGFnZS50YXJnZXRDbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgbGFuZ1N0cmluZ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS5sYW5ndWFnZSkge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICBtYXAobGFuZ3VhZ2UgPT4ge1xuICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICB0YXJnZXRMYWJlbDogYCR7bGFuZ3VhZ2Uubm90ZXMgfHwgbGFuZ3VhZ2UuaXNvNjM5MX1gLFxuICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHBhZ2UudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgbGFuZ3VhZ2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLmVudGl0eVByZXZpZXcpIHtcbiAgICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICBtYXAoZW50aXR5UHJldmlldyA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgIHRhcmdldExhYmVsOiBgJHtlbnRpdHlQcmV2aWV3LmVudGl0eV9sYWJlbH1gLFxuICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHBhZ2UudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgZW50aXR5UHJldmlld1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cblxuICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eSkge1xuICAgICAgLy8gY29uc29sZS5sb2coJ3N1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eS5sZW5ndGgnLCBzdWJmaWVsZFR5cGUudGVtcG9yYWxFbnRpdHkubGVuZ3RoKVxuXG4gICAgICAvLyBmb3IgZWFjaCBvZiB0aGVzZSBzdWJmaWVsZHNcbiAgICAgIGNvbnN0IHN1YmVudGl0eVBhZ2VzJCA9IHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eS5tYXAoc3ViZmllbGRSZXEgPT4ge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWJlbnRpdHkgc3ViZmllbGQgZm9yIHRhcmdldEluZm8nLCB0YXJnZXRJbmZvKVxuXG4gICAgICAgIC8vIGNyZWF0ZSBwYWdlOkd2U3ViZmllbGRQYWdlXG4gICAgICAgIGNvbnN0IHsgaXNDaXJjdWxhciwgLi4ucCB9ID0gc3ViZmllbGRSZXEucGFnZVxuICAgICAgICBjb25zdCBuZXN0ZWRQYWdlOiBHdlN1YmZpZWxkUGFnZSA9IHtcbiAgICAgICAgICAuLi5wLFxuICAgICAgICAgIGZrU291cmNlRW50aXR5OiB0YXJnZXRJbmZvLFxuICAgICAgICAgIHNjb3BlOiBwYWdlLnNjb3BlLFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucGlwZVN1YmZpZWxkUGFnZShuZXN0ZWRQYWdlLCBzdWJmaWVsZFJlcS5zdWJmaWVsZFR5cGUpLnBpcGUoXG4gICAgICAgICAgbWFwKCh7IGNvdW50LCBzdGF0ZW1lbnRzIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbGltaXQsIG9mZnNldCwgLi4ucyB9ID0gbmVzdGVkUGFnZTtcbiAgICAgICAgICAgIGNvbnN0IHN1YmVudGl0eVN1YmZpZWxkUGFnZTogU3ViZW50aXR5U3ViZmllbGRQYWdlID0ge1xuICAgICAgICAgICAgICBzdWJmaWVsZDogcyxcbiAgICAgICAgICAgICAgY291bnQsXG4gICAgICAgICAgICAgIHN0YXRlbWVudHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdWJlbnRpdHlTdWJmaWVsZFBhZ2VcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoc3ViZW50aXR5UGFnZXMkKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoXG4gICAgICAgICAgICBzdWJmaWVsZHMgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgdGFyZ2V0TGFiZWw6ICcnLFxuICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBwYWdlLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgZW50aXR5OiB7XG4gICAgICAgICAgICAgICAgICAgIHBrRW50aXR5OiB0YXJnZXRJbmZvLFxuICAgICAgICAgICAgICAgICAgICBzdWJmaWVsZHNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLnRpbWVTcGFuKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnc3ViZmllbGRUeXBlLnRlbXBvcmFsRW50aXR5Lmxlbmd0aCcsIHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eS5sZW5ndGgpXG5cbiAgICAgIC8vIGZvciBlYWNoIG9mIHRoZXNlIHN1YmZpZWxkc1xuICAgICAgY29uc3Qgc3ViZW50aXR5UGFnZXMkID0gRGZoQ29uZmlnLlBST1BFUlRZX1BLU19XSEVSRV9USU1FX1BSSU1JVElWRV9JU19SQU5HRVxuICAgICAgICAubWFwKGZrUHJvcGVydHkgPT4ge1xuXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1YmVudGl0eSBzdWJmaWVsZCBmb3IgdGFyZ2V0SW5mbycsIHRhcmdldEluZm8pXG5cbiAgICAgICAgICAvLyBjcmVhdGUgcGFnZTpHdlN1YmZpZWxkUGFnZVxuICAgICAgICAgIGNvbnN0IG5lc3RlZFBhZ2U6IEd2U3ViZmllbGRQYWdlID0ge1xuICAgICAgICAgICAgZmtQcm9wZXJ0eSxcbiAgICAgICAgICAgIGlzT3V0Z29pbmc6IHRydWUsXG4gICAgICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgIHRhcmdldENsYXNzOiBEZmhDb25maWcuQ0xBU1NfUEtfVElNRV9QUklNSVRJVkUsXG4gICAgICAgICAgICBma1NvdXJjZUVudGl0eTogdGFyZ2V0SW5mbyxcbiAgICAgICAgICAgIHNjb3BlOiBwYWdlLnNjb3BlLFxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBzdWJmVHlwZTogR3ZTdWJmaWVsZFR5cGUgPSB7XG4gICAgICAgICAgICB0aW1lUHJpbWl0aXZlOiAndHJ1ZSdcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5waXBlU3ViZmllbGRQYWdlKG5lc3RlZFBhZ2UsIHN1YmZUeXBlKS5waXBlKFxuICAgICAgICAgICAgbWFwKCh7IGNvdW50LCBzdGF0ZW1lbnRzIH0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyBsaW1pdCwgb2Zmc2V0LCAuLi5zIH0gPSBuZXN0ZWRQYWdlO1xuICAgICAgICAgICAgICBjb25zdCBzdWJlbnRpdHlTdWJmaWVsZFBhZ2U6IFN1YmVudGl0eVN1YmZpZWxkUGFnZSA9IHtcbiAgICAgICAgICAgICAgICBzdWJmaWVsZDogcyxcbiAgICAgICAgICAgICAgICBjb3VudCxcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHN1YmVudGl0eVN1YmZpZWxkUGFnZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH0pXG5cblxuICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KHN1YmVudGl0eVBhZ2VzJClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKFxuICAgICAgICAgICAgc3ViZmllbGRzID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdGltZVNwYW5QcmV2aWV3OiBXYXJFbnRpdHlQcmV2aWV3VGltZVNwYW4gPSB7fVxuICAgICAgICAgICAgICBzdWJmaWVsZHMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocy5zdGF0ZW1lbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzdCA9IHMuc3RhdGVtZW50c1swXVxuICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX1RPX0VYSVNURU5DRV9USU1FX0tFWVtzdC5zdGF0ZW1lbnQuZmtfcHJvcGVydHldXG4gICAgICAgICAgICAgICAgICB0aW1lU3BhblByZXZpZXdba2V5XSA9IHN0LnRhcmdldC50aW1lUHJpbWl0aXZlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IHRoaXMudGltZVNwYW5QaXBlLnRyYW5zZm9ybShuZXcgVGltZVNwYW5VdGlsKHRpbWVTcGFuUHJldmlldykpLFxuICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBwYWdlLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgdGltZVNwYW46IHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlldzogdGltZVNwYW5QcmV2aWV3LFxuICAgICAgICAgICAgICAgICAgICBzdWJmaWVsZHNcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG4gICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLnRpbWVQcmltaXRpdmUpIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkodGFyZ2V0SW5mbykucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKHRpbWVQcmltaXRpdmUgPT4ge1xuICAgICAgICAgIC8vIGdldCBjYWxlbmRhclxuICAgICAgICAgIGxldCBjYWwkOiBPYnNlcnZhYmxlPFRpbWVQcmltaXRpdmVXaXRoQ2FsLkNhbGVuZGFyRW51bT5cbiAgICAgICAgICBpZiAocGFnZS5zY29wZS5pblByb2plY3QpIHtcbiAgICAgICAgICAgIGNhbCQgPSB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkLmtleShwYWdlLnNjb3BlLmluUHJvamVjdCArICdfJyArIHN0bXQucGtfZW50aXR5KVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICBpbmZvUHJvalJlbCA9PiBpbmZvUHJvalJlbC5jYWxlbmRhciBhcyBUaW1lUHJpbWl0aXZlV2l0aENhbC5DYWxlbmRhckVudW1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYWwkID0gbmV3IEJlaGF2aW9yU3ViamVjdChzdG10LmNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhciBhcyBUaW1lUHJpbWl0aXZlV2l0aENhbC5DYWxlbmRhckVudW0pXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHBpcGUgdGFyZ2V0IHRpbWUgcHJpbWl0aXZlIG9mIHN0bXRcbiAgICAgICAgICByZXR1cm4gY2FsJC5waXBlKFxuICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICBjYWwgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVQcmltV2l0aENhbCA9IGluZlRpbWVQcmltVG9UaW1lUHJpbVdpdGhDYWwodGltZVByaW1pdGl2ZSwgY2FsKVxuICAgICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1XaXRoQ2FsKSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBwYWdlLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVQcmltaXRpdmU6IHRpbWVQcmltV2l0aENhbFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBpbXBsZW1lbnRhdGlvbiBmb3VuZCBmb3Igc3ViZmllbGRUeXBlICR7SlNPTi5zdHJpbmdpZnkoc3ViZmllbGRUeXBlKX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwaXBlIHRhcmdldCBhbmQgcHJvalJlbCBvZiB0aGUgZ2l2ZW4gc3RhdGVtZW50XG4gICAqL1xuICBwaXBlU3RhdGVtZW50V2l0aFRhcmdldChzdG10OiBJbmZTdGF0ZW1lbnQsIHBhZ2U6IEd2U3ViZmllbGRQYWdlLCBzdWJmaWVsZFR5cGU6IEd2U3ViZmllbGRUeXBlKTogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRXaXRoVGFyZ2V0PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVUYXJnZXRPZlN0YXRlbWVudChzdG10LCBwYWdlLCBzdWJmaWVsZFR5cGUpLFxuICAgICAgdGhpcy5waXBlUHJvalJlbE9mU3RhdGVtZW50KHN0bXQsIHBhZ2UpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbdGFyZ2V0LCBwcm9qUmVsXSkgPT4gKHsgLi4udGFyZ2V0LCAuLi5wcm9qUmVsIH0pKVxuICAgIClcbiAgfVxuXG4gIHBpcGVTdWJmaWVsZFBhZ2UocGFnZTogR3ZTdWJmaWVsZFBhZ2UsIHN1YmZpZWxkVHlwZTogR3ZTdWJmaWVsZFR5cGUpOiBPYnNlcnZhYmxlPFN1YmZpZWxkUGFnZT4ge1xuICAgIGlmIChzdWJmaWVsZFR5cGUudGltZVNwYW4pIHtcbiAgICAgIC8vIGlmIHRpbWVTcGFuIG1ha2UgYSBzaG9ydCBjdXQ6IHByb2R1Y2UgYSB2aXJ0dWFsIHN0YXRlbWVudFdpdGhUYXJnZXQgZnJvbSBlbnRpdHkgdG8gdGltZVNwYW5cbiAgICAgIHJldHVybiB0aGlzLnBpcGVUaW1lU3BhbihwYWdlLCBzdWJmaWVsZFR5cGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIGdldCB0aGUgc3RhdG1lbnRzIG9mIHRoYXQgcGFnZVxuICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQucGlwZUNvdW50KHBhZ2UpLFxuICAgICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kLnBpcGVQYWdlKHBhZ2UpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoXG4gICAgICAgICAgICAgIHBrU3RtdHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgICAgICAgICAgcGtTdG10cy5tYXAocGtTdG10ID0+IHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfcGtfZW50aXR5JC5rZXkocGtTdG10KVxuICAgICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggc3RhdGVtZW50LCBkZXBlbmRpbmcgb24gdGhlIHN1YmZpZWxkVHlwZSwgbG9hZCB0aGUgY29ycmVzcG9uZGluZyB0YXJnZXRcbiAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoc3RtdCA9PiAhIXN0bXQpLFxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoc3RtdCA9PiB0aGlzLnBpcGVTdGF0ZW1lbnRXaXRoVGFyZ2V0KHN0bXQsIHBhZ2UsIHN1YmZpZWxkVHlwZSkpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApLFxuICAgICAgICAgIClcbiAgICAgICkucGlwZShcbiAgICAgICAgbWFwKChbY291bnQsIHN0YXRlbWVudHNdKSA9PiAoeyBjb3VudCwgc3RhdGVtZW50cyB9KSlcbiAgICAgIClcbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgcGlwZVRpbWVTcGFuKHBhZ2U6IEd2U3ViZmllbGRQYWdlLCBzdWJmaWVsZFR5cGU6IEd2U3ViZmllbGRUeXBlKSB7XG4gICAgY29uc3QgdmlydHVhbFN0YXRlbWVudFRvVGltZVNwYW4gPSB7IGZrX29iamVjdF9pbmZvOiBwYWdlLmZrU291cmNlRW50aXR5IH07XG4gICAgcmV0dXJuIHRoaXMucGlwZVRhcmdldE9mU3RhdGVtZW50KHZpcnR1YWxTdGF0ZW1lbnRUb1RpbWVTcGFuLCBwYWdlLCBzdWJmaWVsZFR5cGUpLnBpcGUobWFwKHN0bXRUYXJnZXQgPT4ge1xuICAgICAgY29uc3Qgc3RtdFdUOiBTdGF0ZW1lbnRXaXRoVGFyZ2V0ID0ge1xuICAgICAgICAuLi5zdG10VGFyZ2V0LFxuICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgIG9yZE51bTogdW5kZWZpbmVkXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHsgY291bnQ6IDEsIHN0YXRlbWVudHM6IFtzdG10V1RdIH07XG4gICAgfSkpO1xuICB9XG5cbiAgLy8gcGlwZVN0YXRlbWVudExpc3RQYWdlKFxuICAvLyAgIHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLFxuICAvLyAgIGxpbWl0OiBudW1iZXIsXG4gIC8vICAgb2Zmc2V0OiBudW1iZXIsXG4gIC8vICAgcGtQcm9qZWN0OiBudW1iZXIsXG4gIC8vICAgbGlzdERlZmluaXRpb246IFN1YmZpZWxkLFxuICAvLyAgIGFsdGVybmF0aXZlID0gZmFsc2UpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAvLyAgIC8vIHByZXBhcmUgcGFnZSBsb2FkZXJcbiAgLy8gICBjb25zdCBwYWdlTG9hZGVyJCA9IGFsdGVybmF0aXZlID8gdGhpcy5pbmZSZXBvLnN0YXRlbWVudCQucGFnaW5hdGlvbiQgOiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kO1xuXG4gIC8vICAgLy8gcHJlcGFyZSBiYXNpYyBzdGF0ZW1lbnQgaXRlbSBsb2FkZXJcbiAgLy8gICBjb25zdCBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIgPSAocGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcsIHBrUHJvaikgPT4ge1xuICAvLyAgICAgcmV0dXJuIGFsdGVybmF0aXZlID9cbiAgLy8gICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcpIDpcbiAgLy8gICAgICAgdGhpcy5iLnBpcGVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrUHJvaiwgcGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcpXG4gIC8vICAgfVxuXG4gIC8vICAgY29uc3QgcGFnaW5hdGVkU3RhdGVtZW50UGtzJCA9IHBhZ2VMb2FkZXIkLnBpcGVQYWdlKHBhZ2luYXRlQnksIGxpbWl0LCBvZmZzZXQpXG5cbiAgLy8gICByZXR1cm4gcGFnaW5hdGVkU3RhdGVtZW50UGtzJC5waXBlKFxuICAvLyAgICAgc3dpdGNoTWFwKChwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MpID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAvLyAgICAgICBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MubWFwKHBrU3RhdGVtZW50ID0+IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlcihwa1N0YXRlbWVudCwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZywgcGtQcm9qZWN0KVxuICAvLyAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgLy8gICAgICAgICAgIHN3aXRjaE1hcCh4ID0+IHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KHguaXNPdXRnb2luZyA/IHguc3RhdGVtZW50LmZrX29iamVjdF9pbmZvIDogeC5zdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKVxuICAvLyAgICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgICBtYXAoKHByZXZpZXcpID0+IHtcbiAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IEVudGl0eVByZXZpZXdJdGVtID0ge1xuICAvLyAgICAgICAgICAgICAgICAgICAuLi54LFxuICAvLyAgICAgICAgICAgICAgICAgICBwcmV2aWV3LFxuICAvLyAgICAgICAgICAgICAgICAgICBma0NsYXNzOiBwcmV2aWV3LmZrX2NsYXNzXG4gIC8vICAgICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgLy8gICAgICAgICAgICAgICB9KVxuICAvLyAgICAgICAgICAgICApXG4gIC8vICAgICAgICAgICApKVxuXG4gIC8vICAgICAgIClcbiAgLy8gICAgIClcbiAgLy8gICAgICkpXG5cbiAgLy8gfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIHRlbXBvcmFsIGVudGl0aWVzIGNvbm5lY3RlZCB0byBnaXZlbiBlbnRpdHkgYnkgc3RhdGVtZW50cyB0aGF0IGFyZSBpbiB0aGUgY3VycmVudCBwcm9qZWN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIC8vIHBpcGVUZW1wb3JhbEVudGl0eVRhYmxlUm93cyhcbiAgLy8gICBwYWdpbmF0ZUJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSxcbiAgLy8gICBsaW1pdDogbnVtYmVyLFxuICAvLyAgIG9mZnNldDogbnVtYmVyLFxuICAvLyAgIHBrUHJvamVjdDogbnVtYmVyLFxuICAvLyAgIGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCxcbiAgLy8gICBmaWVsZERlZmluaXRpb25zOiBGaWVsZFtdLFxuICAvLyAgIGFsdGVybmF0aXZlID0gZmFsc2UpOiBPYnNlcnZhYmxlPFRlbXBvcmFsRW50aXR5SXRlbVtdPiB7XG5cbiAgLy8gICAvLyBjb25zdCBwcm9wZXJ0eUl0ZW1UeXBlID0gdGhpcy5wcm9wZXJ0eUl0ZW1UeXBlKGZpZWxkRGVmaW5pdGlvbnMpXG5cbiAgLy8gICBjb25zdCB0YXJnZXRFbnRpdHlPZlN0YXRlbWVudEl0ZW0gPSAocjogQmFzaWNTdGF0ZW1lbnRJdGVtKSA9PiByLmlzT3V0Z29pbmcgPyByLnN0YXRlbWVudC5ma19vYmplY3RfaW5mbyA6IHIuc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbztcblxuICAvLyAgIC8vIHByZXBhcmUgcGFnZSBsb2FkZXJcbiAgLy8gICBjb25zdCBwYWdlTG9hZGVyJCA9IGFsdGVybmF0aXZlID8gdGhpcy5pbmZSZXBvLnN0YXRlbWVudCQucGFnaW5hdGlvbiQgOiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kO1xuXG4gIC8vICAgLy8gcHJlcGFyZSBiYXNpYyBzdGF0ZW1lbnQgaXRlbSBsb2FkZXJcbiAgLy8gICBjb25zdCBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIgPSAocGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcsIHBrUHJvaikgPT4ge1xuICAvLyAgICAgcmV0dXJuIGFsdGVybmF0aXZlID9cbiAgLy8gICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcpIDpcbiAgLy8gICAgICAgdGhpcy5iLnBpcGVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrUHJvaiwgcGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcpXG4gIC8vICAgfVxuXG4gIC8vICAgLy8gcHJlcGFyZSBUZUVuUm93IGxvYWRlclxuICAvLyAgIGNvbnN0IHJvd0xvYWRlciA9ICh0YXJnZXRFbnRpdHlQaywgZmllbGREZWYsIHBrUHJvaikgPT4ge1xuICAvLyAgICAgcmV0dXJuIGFsdGVybmF0aXZlID9cbiAgLy8gICAgICAgdGhpcy5waXBlSXRlbVRlRW5Sb3codGFyZ2V0RW50aXR5UGssIGZpZWxkRGVmLCBudWxsLCB0cnVlKSA6XG4gIC8vICAgICAgIHRoaXMucGlwZUl0ZW1UZUVuUm93KHRhcmdldEVudGl0eVBrLCBmaWVsZERlZiwgcGtQcm9qLCBmYWxzZSlcbiAgLy8gICB9XG5cbiAgLy8gICBjb25zdCBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkID0gcGFnZUxvYWRlciQucGlwZVBhZ2UocGFnaW5hdGVCeSwgbGltaXQsIG9mZnNldClcblxuICAvLyAgIGNvbnN0IHJvd3MkID0gcGFnaW5hdGVkU3RhdGVtZW50UGtzJC5waXBlKFxuICAvLyAgICAgc3dpdGNoTWFwKChwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MpID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAvLyAgICAgICBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MubWFwKHBrU3RhdGVtZW50ID0+IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlcihwa1N0YXRlbWVudCwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZywgcGtQcm9qZWN0KVxuICAvLyAgICAgICAgIC5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gIC8vICAgICAgIClcbiAgLy8gICAgIClcbiAgLy8gICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgc3dpdGNoTWFwKCh0ZUVuU3RhdGVtZW50KSA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgLy8gICAgICAgICAgIHRlRW5TdGF0ZW1lbnQubWFwKChiYXNpY1N0YXRlbWVudEl0ZW0pID0+IHtcbiAgLy8gICAgICAgICAgICAgY29uc3QgcGtUZUVuID0gdGFyZ2V0RW50aXR5T2ZTdGF0ZW1lbnRJdGVtKGJhc2ljU3RhdGVtZW50SXRlbSk7XG4gIC8vICAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAvLyAgICAgICAgICAgICAgIHJvd0xvYWRlcihcbiAgLy8gICAgICAgICAgICAgICAgIHBrVGVFbixcbiAgLy8gICAgICAgICAgICAgICAgIGZpZWxkRGVmaW5pdGlvbnMsXG4gIC8vICAgICAgICAgICAgICAgICAvLyBwcm9wZXJ0eUl0ZW1UeXBlLFxuICAvLyAgICAgICAgICAgICAgICAgcGtQcm9qZWN0XG4gIC8vICAgICAgICAgICAgICAgKSxcbiAgLy8gICAgICAgICAgICAgICB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkLmtleShwa1Byb2plY3QgKyAnXycgKyBwa1RlRW4pXG4gIC8vICAgICAgICAgICAgICkucGlwZShcbiAgLy8gICAgICAgICAgICAgICBtYXAoKFtyb3csIHRlRW5Qcm9qUmVsXSkgPT4ge1xuICAvLyAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogVGVtcG9yYWxFbnRpdHlJdGVtID0ge1xuICAvLyAgICAgICAgICAgICAgICAgICAuLi5iYXNpY1N0YXRlbWVudEl0ZW0sXG4gIC8vICAgICAgICAgICAgICAgICAgIHJvdyxcbiAgLy8gICAgICAgICAgICAgICAgICAgcGtFbnRpdHk6IHBrVGVFbixcbiAgLy8gICAgICAgICAgICAgICAgICAgdGVFblByb2pSZWxcbiAgLy8gICAgICAgICAgICAgICAgIH07XG4gIC8vICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVxuICAvLyAgICAgICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICAgIClcbiAgLy8gICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgKSksXG4gIC8vICAgICAgICkpLFxuXG4gIC8vICAgKVxuICAvLyAgIHJldHVybiByb3dzJFxuICAvLyB9XG5cblxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1UZUVuUm93KHBrRW50aXR5OiBudW1iZXIsIGZpZWxkRGVmaW5pdGlvbnM6IEZpZWxkW10sIHBrUHJvamVjdDogbnVtYmVyLCByZXBvOiBib29sZWFuKTogT2JzZXJ2YWJsZTxUZW1wb3JhbEVudGl0eVJvdz4ge1xuXG4gICAgLy8gcGlwZSBvdXRnb2luZyBzdGF0ZW1lbnRzXG4gICAgY29uc3Qgb3V0Z29pbmdTdGF0ZW1lbnRzJCA9IHJlcG8gPyB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpIDogdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpO1xuICAgIC8vIHBpcGUgaW5nb2luZyBzdGF0ZW1lbnRzXG4gICAgY29uc3QgaW5nb2luZ1N0YXRlbWVudHMkID0gcmVwbyA/IHRoaXMuYi5waXBlUmVwb0luZ29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KSA6IHRoaXMuYi5waXBlSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpO1xuXG5cbiAgICAvLyBwaXBlIGFsbCBzdGF0ZW1lbnRzIHdpdGggaW5mb3JtYXRpb24gbGVhZiBpdGVtc1xuXG4gICAgY29uc3Qgb3V0Z29pbmdJdGVtcyQ6IE9ic2VydmFibGU8U3RhdGVtZW50SXRlbVtdPiA9IG91dGdvaW5nU3RhdGVtZW50cyQucGlwZShcbiAgICAgIHN3aXRjaE1hcChzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBzdGF0ZW1lbnRzXG4gICAgICAgICAgLmZpbHRlcihzdGF0ZW1lbnQgPT4gISFzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pIC8vIHJlbW92ZSBzdGF0ZW1lbnRzIG5vdCBwb2ludGluZyB0byBpbmZvcm1hdGlvblxuICAgICAgICAgIC5tYXAocyA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc091dGdvaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtKHMsIHBrUHJvamVjdCwgaXNPdXRnb2luZyk7XG4gICAgICAgICAgfSlcbiAgICAgICkpXG5cbiAgICApXG4gICAgY29uc3QgaW5nb2luZ0l0ZW1zJDogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRJdGVtW10+ID0gaW5nb2luZ1N0YXRlbWVudHMkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgc3RhdGVtZW50c1xuICAgICAgICAgIC5maWx0ZXIoc3RhdGVtZW50ID0+ICEhc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbykgLy8gcmVtb3ZlIHN0YXRlbWVudHMgbm90IHBvaW50aW5nIHRvIGluZm9ybWF0aW9uXG4gICAgICAgICAgLm1hcChzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzT3V0Z29pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtKHMsIHBrUHJvamVjdCwgaXNPdXRnb2luZyk7XG4gICAgICAgICAgfSlcbiAgICAgICkpXG5cbiAgICApXG5cbiAgICBjb25zdCBzb3J0SXRlbXMgPSByZXBvID9cbiAgICAgIChpdGVtOiBTdGF0ZW1lbnRJdGVtW10pID0+IGl0ZW0uc29ydCgoYSwgYikgPT4gYS5zdGF0ZW1lbnQuaXNfaW5fcHJvamVjdF9jb3VudCA+IGIuc3RhdGVtZW50LmlzX2luX3Byb2plY3RfY291bnQgPyAxIDogLTEpIDpcbiAgICAgIChpdGVtOiBTdGF0ZW1lbnRJdGVtW10pID0+IGl0ZW07XG5cblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KG91dGdvaW5nSXRlbXMkLCBpbmdvaW5nSXRlbXMkKS5waXBlKFxuXG4gICAgICBtYXAoKFtvdXRnb2luZ0l0ZW1zLCBpbmdvaW5nSXRlbXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IGdyb3VwZWRPdXQgPSBncm91cEJ5KChpKSA9PiAoaSAmJiBpLnN0YXRlbWVudCA/IGkuc3RhdGVtZW50LmZrX3Byb3BlcnR5LnRvU3RyaW5nKCkgOiB1bmRlZmluZWQpLCBvdXRnb2luZ0l0ZW1zKTtcbiAgICAgICAgY29uc3QgZ3JvdXBlZEluID0gZ3JvdXBCeSgoaSkgPT4gKGkgJiYgaS5zdGF0ZW1lbnQgPyBpLnN0YXRlbWVudC5ma19wcm9wZXJ0eS50b1N0cmluZygpIDogdW5kZWZpbmVkKSwgaW5nb2luZ0l0ZW1zKTtcbiAgICAgICAgcmV0dXJuIHsgZ3JvdXBlZE91dCwgZ3JvdXBlZEluIH1cbiAgICAgIH0pLFxuICAgICAgLy8gYXVkaXRUaW1lKDEwKSxcbiAgICAgIG1hcCgoZCkgPT4ge1xuICAgICAgICBjb25zdCByb3c6IFRlbXBvcmFsRW50aXR5Um93ID0ge31cblxuICAgICAgICBmaWVsZERlZmluaXRpb25zLmZvckVhY2goZmllbGREZWZpbml0aW9uID0+IHtcblxuICAgICAgICAgIGxldCBjZWxsOiBUZW1wb3JhbEVudGl0eUNlbGw7XG4gICAgICAgICAgZmllbGREZWZpbml0aW9uLmxpc3REZWZpbml0aW9ucy5mb3JFYWNoKGxpc3REZWZpbml0aW9uID0+IHtcbiAgICAgICAgICAgIGlmIChsaXN0RGVmaW5pdGlvbi5saXN0VHlwZS50aW1lU3Bhbikge1xuXG4gICAgICAgICAgICAgIGNvbnN0IHQgPSBwaWNrKFsnNzEnLCAnNzInLCAnMTUwJywgJzE1MScsICcxNTInLCAnMTUzJ10sIGQuZ3JvdXBlZE91dCk7XG4gICAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0KTtcbiAgICAgICAgICAgICAgY29uc3QgaXRlbXNDb3VudCA9IGtleXMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgIGxldCBsYWJlbDtcbiAgICAgICAgICAgICAgaWYgKGl0ZW1zQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZVNwYW5LZXlzOiBDdHJsVGltZVNwYW5EaWFsb2dSZXN1bHQgPSB7fVxuICAgICAgICAgICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4geyB0aW1lU3BhbktleXNba2V5XSA9IHRba2V5XVswXS50aW1lUHJpbWl0aXZlIH0pXG4gICAgICAgICAgICAgICAgY29uc3QgdGltZVNwYW4gPSBUaW1lU3BhblV0aWwuZnJvbVRpbWVTcGFuRGlhbG9nRGF0YSh0aW1lU3BhbktleXMpO1xuICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy50aW1lU3BhblBpcGUudHJhbnNmb3JtKHRpbWVTcGFuKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjZWxsID0ge1xuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgaXRlbXNDb3VudCxcbiAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICBlbnRpdHlQcmV2aWV3OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGlzVGltZVNwYW46IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQuZ3JvdXBlZE91dFtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBzb3J0SXRlbXMoZC5ncm91cGVkT3V0W2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKVxuICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gaXRlbXNbMF07XG4gICAgICAgICAgICAgICAgICBjZWxsID0ge1xuICAgICAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgICBpdGVtc0NvdW50OiBpdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVByZXZpZXc6ICgoZmlyc3RJdGVtIHx8IHt9KSBhcyBFbnRpdHlQcmV2aWV3SXRlbSkucHJldmlldyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGZpcnN0SXRlbS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RJdGVtLFxuICAgICAgICAgICAgICAgICAgICBpdGVtc1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZC5ncm91cGVkSW5bbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gc29ydEl0ZW1zKGQuZ3JvdXBlZEluW2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKVxuICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gaXRlbXNbMF07XG4gICAgICAgICAgICAgICAgICBjZWxsID0ge1xuICAgICAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgICBpdGVtc0NvdW50OiBpdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVByZXZpZXc6ICgoZmlyc3RJdGVtIHx8IHt9KSBhcyBFbnRpdHlQcmV2aWV3SXRlbSkucHJldmlldyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGZpcnN0SXRlbS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RJdGVtLFxuICAgICAgICAgICAgICAgICAgICBpdGVtc1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSlcblxuXG4gICAgICAgICAgcm93W2ZpZWxkRGVmaW5pdGlvbi5sYWJlbF0gPSBjZWxsO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcm93XG4gICAgICB9KVxuXG5cbiAgICApXG4gIH1cblxuXG5cbiAgLy8gQHNweVRhZ1xuICBwcml2YXRlIHBpcGVJdGVtKHI6IEluZlN0YXRlbWVudCwgcGtQcm9qZWN0OiBudW1iZXIsIHByb3BJc091dGdvaW5nOiBib29sZWFuKSB7XG5cbiAgICBjb25zdCB0YXJnZXRFbnRpdHkgPSBwcm9wSXNPdXRnb2luZyA/IHIuZmtfb2JqZWN0X2luZm8gOiByLmZrX3N1YmplY3RfaW5mbztcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuZ2V0TW9kZWxPZkVudGl0eSQodGFyZ2V0RW50aXR5KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKG0gPT4ge1xuICAgICAgICBjb25zdCBtb2RlbE5hbWU6IEluZk1vZGVsTmFtZSA9IG0gPyBtLm1vZGVsTmFtZSA6IHVuZGVmaW5lZDtcbiAgICAgICAgc3dpdGNoIChtb2RlbE5hbWUpIHtcbiAgICAgICAgICBjYXNlICdhcHBlbGxhdGlvbic6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpO1xuICAgICAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2Uocik7XG4gICAgICAgICAgY2FzZSAncGxhY2UnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1QbGFjZShyKTtcbiAgICAgICAgICBjYXNlICdkaW1lbnNpb24nOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1EaW1lbnNpb24ocik7XG4gICAgICAgICAgY2FzZSAnbGFuZ19zdHJpbmcnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1MYW5nU3RyaW5nKHIpO1xuICAgICAgICAgIGNhc2UgJ3RpbWVfcHJpbWl0aXZlJzpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtVGltZVByaW1pdGl2ZShyLCBwa1Byb2plY3QpOyAvLyBUT0RPOiBlbWl0cyB0d2ljZVxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgcHJvcElzT3V0Z29pbmcpO1xuICAgICAgICB9XG5cblxuICAgICAgfSlcbiAgICApXG5cblxuICB9XG5cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWY6IFN1YmZpZWxkLCBma0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8RW50aXR5UHJvcGVydGllcz4ge1xuXG4gICAgaWYgKGxpc3REZWYubGlzdFR5cGUuYXBwZWxsYXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0QXBwZWxsYXRpb24obGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgICB9XG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5sYW5ndWFnZSkge1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5ndWFnZShsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLnBsYWNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdFBsYWNlKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gICAgfVxuICAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUuZGltZW5zaW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlTGlzdERpbWVuc2lvbihsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmxhbmdTdHJpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ1N0cmluZyhsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cblxuXG4gICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5lbnRpdHlQcmV2aWV3IHx8IGxpc3REZWYubGlzdFR5cGUudGVtcG9yYWxFbnRpdHkpIHtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0RW50aXR5UHJldmlldyhsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAgIH1cbiAgICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLnRpbWVTcGFuKSB7XG4gICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVRpbWVTcGFuKGZrRW50aXR5KVxuICAgICAgICAucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCBpdGVtcyA9IGl0ZW0ucHJvcGVydGllcy5maW5kKHAgPT4gcC5pdGVtcy5sZW5ndGggPiAwKSA/IFt7XG4gICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lU3BhblBpcGUudHJhbnNmb3JtKHRpbWVTcGFuSXRlbVRvVGltZVNwYW4oaXRlbSkpLFxuICAgICAgICAgICAgcHJvcGVydGllczogW10gLy8gVE9ETyBjaGVjayBpZiB0aGUgcHJvcGVydGllcyBvciB0aGUgaXRlbSBhcmUgcmVhbGx5IG5vdCBuZWVkZWRcbiAgICAgICAgICB9XSA6IFtdXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxpc3REZWZpbml0aW9uOiBsaXN0RGVmLFxuICAgICAgICAgICAgaXRlbXNcbiAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgIH1cbiAgICBlbHNlIHJldHVybiBvZihudWxsKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBwaXBlVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzKHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPFRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcz4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLmluZiQudGVtcG9yYWxfZW50aXR5JC5ieV9wa19lbnRpdHlfa2V5JChwa0VudGl0eSksXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3QkKHsgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eSB9KSxcbiAgICAgIHRoaXMucy5pbmYkLnRleHRfcHJvcGVydHkkLmJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfaW5kZXhlZCQocGtFbnRpdHkpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbdGVtcG9yYWxFbnRpdHksIHN0YXRlbWVudHMsIHRleHRQcm9wZXJ0aWVzXSkgPT4ge1xuICAgICAgICBjb25zdCByZXM6IFRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcyA9IHtcbiAgICAgICAgICB0ZW1wb3JhbEVudGl0eSxcbiAgICAgICAgICBzdGF0ZW1lbnRzOiBzdGF0ZW1lbnRzLFxuICAgICAgICAgIHRleHRQcm9wZXJ0aWVzOiB2YWx1ZXModGV4dFByb3BlcnRpZXMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBnZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgaXRlbXMpOiBFbnRpdHlQcm9wZXJ0aWVzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGlzdERlZmluaXRpb24sXG4gICAgICBpdGVtcyxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aW1lIHNwYW4gaXRlbSBpbiB2ZXJzaW9uIG9mIHByb2plY3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1UaW1lU3Bhbihwa0VudGl0eSk6IE9ic2VydmFibGU8VGltZVNwYW5JdGVtPiB7XG5cbiAgICByZXR1cm4gdGhpcy5wLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jLnBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhcbiAgICAgICAgICBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoZmllbGREZWZzID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KGZpZWxkRGVmcy5tYXAoZmllbGREZWYgPT4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgICAgICAgICBma19wcm9wZXJ0eTogZmllbGREZWYucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwT3IoW10sIHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnMuaW5mJC50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkLmtleShwa1Byb2plY3QgKyAnXycgKyBzdGF0ZW1lbnQucGtfZW50aXR5KVxuICAgICAgICAgICAgICAgICAgKS5waXBlKG1hcCgoW2luZlRpbWVQcmltaXRpdmUsIHByb2pSZWxdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXI6ICgocHJvalJlbC5jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICBwcm9qUmVsLFxuICAgICAgICAgICAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAgICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXM6IFRpbWVTcGFuUHJvcGVydHkgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uOiBmaWVsZERlZi5saXN0RGVmaW5pdGlvbnNbMF0sIGl0ZW1zXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSkucGlwZShcbiAgICAgICAgICAgICAgbWFwKChwcm9wZXJ0aWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcHMgPSBwcm9wZXJ0aWVzLmZpbHRlcihwID0+IHAuaXRlbXMubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZXNwYW5pdGVtOiBUaW1lU3Bhbkl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogJycsXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZXNwYW5pdGVtXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSlcblxuICAgIClcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1BcHBlbGxhdGlvbihzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmFwcGVsbGF0aW9uJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgbWFwKGFwcGVsbGF0aW9uID0+IHtcbiAgICAgICAgaWYgKCFhcHBlbGxhdGlvbikgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IG5vZGU6IEFwcGVsbGF0aW9uSXRlbSA9IHtcbiAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgIGxhYmVsOiBhcHBlbGxhdGlvbi5zdHJpbmcsXG4gICAgICAgICAgZmtDbGFzczogYXBwZWxsYXRpb24uZmtfY2xhc3NcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtTGFuZ3VhZ2Uoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5ndWFnZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIG1hcChsYW5ndWFnZSA9PiB7XG4gICAgICAgIGlmICghbGFuZ3VhZ2UpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBub2RlOiBMYW5ndWFnZUl0ZW0gPSB7XG4gICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICBsYWJlbDogbGFuZ3VhZ2Uubm90ZXMsXG4gICAgICAgICAgZmtDbGFzczogbGFuZ3VhZ2UuZmtfY2xhc3NcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtUGxhY2Uoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5wbGFjZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIG1hcChwbGFjZSA9PiB7XG4gICAgICAgIGlmICghcGxhY2UpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBub2RlOiBQbGFjZUl0ZW0gPSB7XG4gICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXRlbWVudCxcbiAgICAgICAgICBsYWJlbDogJ1dHUzg0OiAnICsgcGxhY2UubGF0ICsgJ8KwLCAnICsgcGxhY2UubG9uZyArICfCsCcsXG4gICAgICAgICAgZmtDbGFzczogcGxhY2UuZmtfY2xhc3NcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtRGltZW5zaW9uKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmRpbWVuc2lvbiQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIHN3aXRjaE1hcCgoZGltZW5zaW9uKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhkaW1lbnNpb24uZmtfbWVhc3VyZW1lbnRfdW5pdClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChwcmV2aWV3ID0+IHtcblxuICAgICAgICAgICAgICBjb25zdCBub2RlOiBEaW1lbnNpb25JdGVtID0ge1xuICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGAke2RpbWVuc2lvbi5udW1lcmljX3ZhbHVlfSAke3ByZXZpZXcuZW50aXR5X2xhYmVsfWAsXG4gICAgICAgICAgICAgICAgZmtDbGFzczogZGltZW5zaW9uLmZrX2NsYXNzLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtTGFuZ1N0cmluZyhzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ19zdHJpbmckLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgKGxhbmdTdHJpbmcpID0+IHtcbiAgICAgICAgICBpZiAoIWxhbmdTdHJpbmcpIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpXG4gICAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleShsYW5nU3RyaW5nLmZrX2xhbmd1YWdlKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChsYW5ndWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFsYW5ndWFnZSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGxhbmdTdHJpbmcuc3RyaW5nKSBsYWJlbCA9IGxhbmdTdHJpbmcuc3RyaW5nXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGFuZ1N0cmluZy5xdWlsbF9kb2MgJiYgbGFuZ1N0cmluZy5xdWlsbF9kb2Mub3BzICYmIGxhbmdTdHJpbmcucXVpbGxfZG9jLm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsID0gbGFuZ1N0cmluZy5xdWlsbF9kb2Mub3BzLm1hcChvcCA9PiBvcC5pbnNlcnQpLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBub2RlOiBMYW5nU3RyaW5nSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICAgICAgICBma0NsYXNzOiBsYW5nU3RyaW5nLmZrX2NsYXNzLFxuICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgICAgICAgICAgICBma0xhbmd1YWdlOiBsYW5nU3RyaW5nLmZrX2xhbmd1YWdlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVJdGVtRW50aXR5UHJldmlldyhzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoKGlzT3V0Z29pbmcgPyBzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8gOiBzdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKSkucGlwZShcbiAgICAgIC8vIGZpbHRlcihwcmV2aWV3ID0+ICFwcmV2aWV3LmxvYWRpbmcgJiYgISFwcmV2aWV3ICYmICEhcHJldmlldy5lbnRpdHlfdHlwZSksXG4gICAgICBtYXAocHJldmlldyA9PiB7XG4gICAgICAgIGlmICghcHJldmlldykge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vZGU6IEVudGl0eVByZXZpZXdJdGVtID0ge1xuICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgcHJldmlldyxcbiAgICAgICAgICBsYWJlbDogcHJldmlldy5lbnRpdHlfbGFiZWwgfHwgJycsXG4gICAgICAgICAgZmtDbGFzczogcHJldmlldy5ma19jbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGtcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUl0ZW1UaW1lUHJpbWl0aXZlKHN0YXRlbWVudDogSW5mU3RhdGVtZW50LCBwa1Byb2plY3QpOiBPYnNlcnZhYmxlPFRpbWVQcmltaXRpdmVJdGVtPiB7XG4gICAgaWYgKHBrUHJvamVjdCkge1xuICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHN0YXRlbWVudC5wa19lbnRpdHkpLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICAgICkucGlwZShcbiAgICAgICAgbWFwKChbaW5mVGltZVByaW1pdGl2ZSwgcHJvalJlbF0pID0+IHtcbiAgICAgICAgICBpZiAoIWluZlRpbWVQcmltaXRpdmUpIHJldHVybiBudWxsO1xuICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgICAgICAgICAgIGNhbGVuZGFyOiAoKHByb2pSZWwuY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zdCBub2RlOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc3RhdGVtZW50LFxuICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlKSxcbiAgICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgfSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmluZlJlcG8udGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShmaWx0ZXIoeCA9PiAhIXgpKS5waXBlKFxuICAgICAgICBtYXAoaW5mVGltZVByaW1pdGl2ZSA9PiB7XG4gICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgY2FsZW5kYXI6ICgoc3RhdGVtZW50LmNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIGNvbnN0IG5vZGU6IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAqIFBpcGUgYWx0ZXJuYXRpdmVzIChub3QgaW4gcHJvamVjdClcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0TGVuZ3RoKGw6IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICBzd2l0Y2ggKGwubGlzdFR5cGUpIHtcbiAgICAgIGNhc2UgJ2FwcGVsbGF0aW9uJzpcbiAgICAgIGNhc2UgJ2VudGl0eS1wcmV2aWV3JzpcbiAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgICAgIGNhc2UgJ3BsYWNlJzpcbiAgICAgIGNhc2UgJ2xhbmdTdHJpbmcnOlxuICAgICAgY2FzZSAndGVtcG9yYWwtZW50aXR5JzpcbiAgICAgIGNhc2UgJ3RpbWUtc3Bhbic6XG4gICAgICAgIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0U3RhdGVtZW50cyhsLCBwa0VudGl0eSkucGlwZShtYXAoaXRlbXMgPT4gaXRlbXMubGVuZ3RoKSlcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3QobDogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJdGVtTGlzdD4ge1xuICAgIGlmIChsLmxpc3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEFwcGVsbGF0aW9uKGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZW50aXR5UHJldmlldykgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5KVxuICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ3VhZ2UpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0TGFuZ3VhZ2UobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5wbGFjZSkgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RQbGFjZShsLCBwa0VudGl0eSlcbiAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmRpbWVuc2lvbikgcmV0dXJuIHRoaXMucGlwZUFsdExpc3REaW1lbnNpb24obCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5nU3RyaW5nKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdExhbmdTdHJpbmcobCwgcGtFbnRpdHkpXG4gICAgZWxzZSBpZiAobC5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5KVxuICAgIGVsc2UgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0U3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkgOlxuICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUluZ29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgdGhlIGl0ZW1zIGluIGVudGl0eSBwcmV2aWV3IGZpZWxkXG4gICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSkpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXNcbiAgICAgICAgICAgICAgLmZpbHRlcihub2RlID0+ICEhbm9kZSlcbiAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEub3JkTnVtID4gYi5vcmROdW0gPyAxIDogLTEpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgIH0pKVxuXG4gIH1cblxuICAvKipcbiAgICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gcGxhY2UgbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdFBsYWNlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtUGxhY2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBkaW1lbnNpb24gbGlzdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdERpbWVuc2lvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1EaW1lbnNpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBsYW5nU3RyaW5nIGxpc3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUFsdExpc3RMYW5nU3RyaW5nPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPExhbmdTdHJpbmdJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5nU3RyaW5nKHIpKSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgICAgICAgfSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGFwcGVsbGF0aW9uIGZpZWxkXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVBbHRMaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBsYW5ndWFnZSBmaWVsZFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlQWx0TGlzdExhbmd1YWdlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIFBpcGUgcmVwbyB2aWV3cyAoY29tbXVuaXR5IGZhdm9yaXRlcywgd2hlcmUgcmVzdHJpY3RlZCBieSBxdWFudGlmaWVycylcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAvKipcbiAgICogUGlwZSByZXBvc2l0b3J5IHRlbXBvcmFsIGVudGl0eSBpdGVtIGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBQaXBlIGFwcGVsbGF0aW9uIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvTGlzdEFwcGVsbGF0aW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEFwcGVsbGF0aW9uSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBQaXBlIGxhbmd1YWdlIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIHBsYWNlIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVSZXBvTGlzdFBsYWNlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbVtdPiB7XG5cbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtUGxhY2UocikpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAgICAgICB9KSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBQaXBlIHBsYWNlIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0RGltZW5zaW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW1bXT4ge1xuXG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gICAgICAgIH0pKVxuICAgIH1cbiAgfVxuICAvKipcbiAgKiBQaXBlIHRoZSBpdGVtcyBpbiBlbnRpdHkgcHJldmlldyBmaWVsZCwgY29ubmVjdGVkIGJ5IGNvbW11bml0eSBmYXZvcml0ZSBzdGF0ZW1lbnRzXG4gICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVJlcG9MaXN0RW50aXR5UHJldmlldzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAgICAgdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkgOlxuICAgICAgdGhpcy5iLnBpcGVSZXBvSW5nb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZykpKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKVxuICAgICAgICAgICAgICAvLyAuc29ydCgoYSwgYikgPT4gYS5vcmROdW0gPiBiLm9yZE51bSA/IDEgOiAtMSlcbiAgICAgICAgICAgICkpXG4gICAgICB9KSxcbiAgICAgIHN0YXJ0V2l0aChbXSlcbiAgICApXG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgcmVwbyB0aW1lIHNwYW4gaXRlbVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlUmVwb0l0ZW1UaW1lU3Bhbihwa0VudGl0eSk6IE9ic2VydmFibGU8VGltZVNwYW5JdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucC5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYy5waXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhcbiAgICAgICAgICBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoZmllbGREZWZpbml0aW9ucyA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KGZpZWxkRGVmaW5pdGlvbnMubWFwKGZpZWxkRGVmID0+XG4gICAgICAgICAgICAgIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoZmllbGREZWYucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICBzd2l0Y2hNYXBPcihbXSwgc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzLm1hcChzdGF0ZW1lbnQgPT5cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZlJlcG8udGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcCgoaW5mVGltZVByaW1pdGl2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyOiAoKHN0YXRlbWVudC5jb21tdW5pdHlfZmF2b3JpdGVfY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApKSxcbiAgICAgICAgICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlczogVGltZVNwYW5Qcm9wZXJ0eSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbjogZmllbGREZWYubGlzdERlZmluaXRpb25zWzBdLCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKHsgbGlzdERlZmluaXRpb246IGZpZWxkRGVmLmxpc3REZWZpbml0aW9uc1swXSwgaXRlbXM6IFtdIH0gYXMgVGltZVNwYW5Qcm9wZXJ0eSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKS5waXBlKFxuICAgICAgICAgICAgICBtYXAoKHByb3BlcnRpZXMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lc3Bhbml0ZW06IFRpbWVTcGFuSXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMuZmlsdGVyKHByb3BzID0+IHByb3BzLml0ZW1zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lc3Bhbml0ZW1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIGxhYmVsIG9mIGdpdmVuIGVudGl0eVxuICAgKiBUaGlzIHdpbGwgdXNlIGVudGl0eSBwcmV2aWV3cyBmb3IgZ2V0dGluZyBzdHJpbmdzIG9mIHJlbGF0ZWQgdGVtcG9yYWwgZW50aXRpZXNcbiAgICogU28gdGhpcyBtYXkgdGFrZSBhIGxpdHRsZSB3aGlsZVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGFiZWxPZkVudGl0eShma0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5iLnBpcGVDbGFzc09mRW50aXR5KGZrRW50aXR5KS5waXBlKFxuXG4gICAgICAvLyBnZXQgdGhlIGRlZmluaXRpb24gb2YgdGhlIGZpcnN0IGZpZWxkXG4gICAgICBzd2l0Y2hNYXAoZmtDbGFzcyA9PiB0aGlzLmMucGlwZUJhc2ljQW5kU3BlY2lmaWNGaWVsZHMoZmtDbGFzcykucGlwZShcbiAgICAgICAgLy8gZ2V0IHRoZSBmaXJzdCBpdGVtIG9mIHRoYXQgZmllbGRcbiAgICAgICAgc3dpdGNoTWFwKGZpZWxkRGVmID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICAgIGZpZWxkRGVmICYmIGZpZWxkRGVmLmxlbmd0aCA/XG4gICAgICAgICAgICBmaWVsZERlZlswXS5saXN0RGVmaW5pdGlvbnMubWFwKGxpc3REZWYgPT4gdGhpcy5waXBlRW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBma0VudGl0eSwgMSkpIDpcbiAgICAgICAgICAgIFtdXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAocHJvcHMgPT4ge1xuICAgICAgICAgICAgcHJvcHMgPSBwcm9wcy5maWx0ZXIocHJvcCA9PiBwcm9wLml0ZW1zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICBpZiAocHJvcHMubGVuZ3RoICYmIHByb3BzWzBdLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvcHNbMF0uaXRlbXNbMF0ubGFiZWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICAgIH0pXG4gICAgICAgICkpKVxuICAgICAgKSlcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBjbGFzcyBsYWJlbCBvZiBnaXZlbiBlbnRpdHlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUNsYXNzTGFiZWxPZkVudGl0eShma0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5iLnBpcGVDbGFzc09mRW50aXR5KGZrRW50aXR5KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrQ2xhc3MgPT4gdGhpcy5jLnBpcGVDbGFzc0xhYmVsKHBrQ2xhc3MpKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgcGtfZW50aXR5IG9mIHRoZSB0eXBlIG9mIGFuIGVudGl0eVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlVHlwZU9mRW50aXR5KHBrRW50aXR5OiBudW1iZXIsIGhhc1R5cGVQcm9wZXJ0eTogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnQ+IHtcbiAgICBpZiAoaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoeyBma19wcm9wZXJ0eTogaGFzVHlwZVByb3BlcnR5LCBma19zdWJqZWN0X2luZm86IHBrRW50aXR5IH0pLnBpcGUobWFwKGl0ZW1zID0+IHtcbiAgICAgICAgaWYgKCFpdGVtcyB8fCBPYmplY3Qua2V5cyhpdGVtcykubGVuZ3RoIDwgMSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgZWxzZSByZXR1cm4gdmFsdWVzKGl0ZW1zKVswXVxuICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKHsgZmtfcHJvcGVydHk6IGhhc1R5cGVQcm9wZXJ0eSwgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5IH0pLnBpcGUoXG4gICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgaWYgKCFpdGVtcyB8fCBPYmplY3Qua2V5cyhpdGVtcykubGVuZ3RoIDwgMSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICBlbHNlIHJldHVybiB2YWx1ZXMoaXRlbXMpWzBdXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzZXNBbmRUeXBlcyhlbmFibGVkSW46ICdlbnRpdGllcycgfCAnc291cmNlcycpIHtcbiAgICByZXR1cm4gdGhpcy5jLnBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzKGVuYWJsZWRJbikucGlwZShcbiAgICAgIHN3aXRjaE1hcChpdGVtcyA9PiB0aGlzLnBpcGVDbGFzc0FuZFR5cGVOb2RlcyhpdGVtcykpLFxuICAgIClcbiAgfVxuXG4gIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVDbGFzc2VzQW5kVHlwZXNPZkNsYXNzZXMoY2xhc3NlczogbnVtYmVyW10pIHtcbiAgICByZXR1cm4gdGhpcy5jLnBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzT2ZUeXBlZENsYXNzZXMoY2xhc3NlcykucGlwZShcbiAgICAgIHN3aXRjaE1hcChpdGVtcyA9PiB0aGlzLnBpcGVDbGFzc0FuZFR5cGVOb2RlcyhpdGVtcykpLFxuICAgIClcbiAgfVxuXG4gIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVDbGFzc0FuZFR5cGVOb2Rlcyh0eXBlQW5kVHlwZWRDbGFzc2VzOiB7IHR5cGVkQ2xhc3M6IG51bWJlcjsgdHlwZUNsYXNzOiBudW1iZXI7IH1bXSk6IE9ic2VydmFibGU8Q2xhc3NBbmRUeXBlTm9kZVtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgdHlwZUFuZFR5cGVkQ2xhc3Nlcy5tYXAoaXRlbSA9PiB0aGlzLmMucGlwZUNsYXNzTGFiZWwoaXRlbS50eXBlZENsYXNzKS5waXBlKFxuICAgICAgICBtYXAobGFiZWwgPT4gKHtcbiAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICBkYXRhOiB7IHBrQ2xhc3M6IGl0ZW0udHlwZWRDbGFzcywgcGtUeXBlOiBudWxsIH1cbiAgICAgICAgfSBhcyBDbGFzc0FuZFR5cGVOb2RlKSksXG4gICAgICAgIHN3aXRjaE1hcChub2RlID0+IGlpZihcbiAgICAgICAgICAoKSA9PiAhIWl0ZW0udHlwZUNsYXNzLFxuICAgICAgICAgIHRoaXMuYi5waXBlUGVyc2lzdGVudEl0ZW1Qa3NCeUNsYXNzKGl0ZW0udHlwZUNsYXNzKS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKHR5cGVQa3MgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgICAgICAgIHR5cGVQa3MubWFwKHBrVHlwZSA9PiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhwa1R5cGUpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKHByZXZpZXcgPT4gKHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBwcmV2aWV3LmVudGl0eV9sYWJlbCxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IHsgcGtDbGFzczogaXRlbS50eXBlZENsYXNzLCBwa1R5cGUgfVxuICAgICAgICAgICAgICAgIH0gYXMgQ2xhc3NBbmRUeXBlTm9kZSkpXG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgIHNvcnRBYmMobiA9PiBuLmxhYmVsKSxcbiAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgbWFwKGNoaWxkcmVuID0+IHtcbiAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuXG4gICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgb2YoeyAuLi5ub2RlLCBjaGlsZHJlbjogW10gfSBhcyBDbGFzc0FuZFR5cGVOb2RlKVxuICAgICAgICApXG4gICAgICAgIClcbiAgICAgICkpXG4gICAgKS5waXBlKFxuICAgICAgc29ydEFiYygobm9kZSkgPT4gbm9kZS5sYWJlbCksXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYXJyYXkgb2YgcGtfY2xhc3Mgb2YgYWxsIGNsYXNzZXMgYW5kIHR5cGVkIGNsYXNzZXMuXG4gICAqIEBwYXJhbSBjbGFzc2VzQW5kVHlwZXMgYSBvYmplY3QgY29udGFpbmluZyB7Y2xhc3NlczogW10sIHR5cGVzW119XG4gICAqL1xuICBwaXBlQ2xhc3Nlc0Zyb21DbGFzc2VzQW5kVHlwZXMoY2xhc3Nlc0FuZFR5cGVzOiBDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICBjb25zdCB0eXBlZENsYXNzZXMkID0gKCFjbGFzc2VzQW5kVHlwZXMgfHwgIWNsYXNzZXNBbmRUeXBlcy50eXBlcyB8fCAhY2xhc3Nlc0FuZFR5cGVzLnR5cGVzLmxlbmd0aCkgP1xuICAgICAgb2YoW10gYXMgbnVtYmVyW10pIDpcbiAgICAgIHRoaXMuYi5waXBlQ2xhc3Nlc09mUGVyc2lzdGVudEl0ZW1zKGNsYXNzZXNBbmRUeXBlcy50eXBlcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChwa3MpID0+ICEhcGtzKSxcbiAgICAgICAgICBzd2l0Y2hNYXAodHlwZUNsYXNzZXMgPT4gdGhpcy5jLnBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHR5cGVDbGFzc2VzKSlcbiAgICAgICAgKVxuICAgIHJldHVybiB0eXBlZENsYXNzZXMkLnBpcGUoXG4gICAgICBtYXAodHlwZWRDbGFzc2VzID0+IHVuaXEoWy4uLnR5cGVkQ2xhc3NlcywgLi4uKChjbGFzc2VzQW5kVHlwZXMgfHwgeyBjbGFzc2VzOiBbXSB9KS5jbGFzc2VzIHx8IFtdKV0pKVxuICAgICk7XG4gIH1cblxuICBwaXBlUHJvcGVydHlPcHRpb25zRnJvbUNsYXNzZXNBbmRUeXBlcyhjbGFzc2VzQW5kVHlwZXM6IENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsKTogT2JzZXJ2YWJsZTxQcm9wZXJ0eU9wdGlvbltdPiB7XG4gICAgcmV0dXJuIHRoaXMucGlwZUNsYXNzZXNGcm9tQ2xhc3Nlc0FuZFR5cGVzKGNsYXNzZXNBbmRUeXBlcykucGlwZShcbiAgICAgIHN3aXRjaE1hcChjbGFzc2VzID0+IHRoaXMucGlwZVByb3BlcnR5T3B0aW9uc0Zvcm1DbGFzc2VzKGNsYXNzZXMpKVxuICAgIClcbiAgfVxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlUHJvcGVydHlPcHRpb25zRm9ybUNsYXNzZXMoY2xhc3NlczogbnVtYmVyW10pOiBPYnNlcnZhYmxlPFByb3BlcnR5T3B0aW9uW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoY2xhc3Nlcy5tYXAocGtDbGFzcyA9PiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKS5waXBlKFxuICAgICAgbWFwKGMgPT4gYy5iYXNpY190eXBlID09PSA5KSxcbiAgICAgIHN3aXRjaE1hcChpc1RlRW4gPT4gdGhpcy5jLnBpcGVTcGVjaWZpY0FuZEJhc2ljRmllbGRzKHBrQ2xhc3MpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChjbGFzc0ZpZWxkcyA9PiBjbGFzc0ZpZWxkc1xuICAgICAgICAgICAgLmZpbHRlcihmID0+ICEhZi5wcm9wZXJ0eS5wa1Byb3BlcnR5KVxuICAgICAgICAgICAgLm1hcChmID0+ICh7XG4gICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGYuaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgZmtQcm9wZXJ0eURvbWFpbjogZi5pc091dGdvaW5nID8gZi5zb3VyY2VDbGFzcyA6IG51bGwsXG4gICAgICAgICAgICAgIGZrUHJvcGVydHlSYW5nZTogZi5pc091dGdvaW5nID8gbnVsbCA6IGYuc291cmNlQ2xhc3MsXG4gICAgICAgICAgICAgIHBrUHJvcGVydHk6IGYucHJvcGVydHkucGtQcm9wZXJ0eVxuICAgICAgICAgICAgfSkpKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoaXRlbXMgPT4ge1xuICAgICAgICAgICAgaWYgKGlzVGVFbikge1xuICAgICAgICAgICAgICAvLyBhZGQgdGltZSBwcm9wZXJ0aWVzIChhdCBzb21lIHRpbWUgd2l0aGluLCAuLi4pXG4gICAgICAgICAgICAgIERmaENvbmZpZy5QUk9QRVJUWV9QS1NfV0hFUkVfVElNRV9QUklNSVRJVkVfSVNfUkFOR0UubWFwKHBrUHJvcGVydHkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgcGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgIGZrUHJvcGVydHlEb21haW46IHBrQ2xhc3MsXG4gICAgICAgICAgICAgICAgICBma1Byb3BlcnR5UmFuZ2U6IERmaENvbmZpZy5DTEFTU19QS19USU1FX1BSSU1JVElWRSxcbiAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoaXRlbXMubWFwKGl0ZW0gPT4gdGhpcy5jLnBpcGVGaWVsZExhYmVsKFxuICAgICAgICAgICAgICBpdGVtLnBrUHJvcGVydHksXG4gICAgICAgICAgICAgIGl0ZW0uZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgICAgICAgaXRlbS5ma1Byb3BlcnR5UmFuZ2UsXG4gICAgICAgICAgICApLnBpcGUobWFwKGxhYmVsID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNPdXRnb2luZyA9IGl0ZW0uaXNPdXRnb2luZztcbiAgICAgICAgICAgICAgY29uc3QgbzogUHJvcGVydHlPcHRpb24gPSB7XG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICBwazogaXRlbS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgIHByb3BlcnR5RmllbGRLZXk6IHByb3BlcnR5T3B0aW9uRmllbGRLZXkoaXRlbS5wa1Byb3BlcnR5LCBpc091dGdvaW5nKVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgIH0pKSkpO1xuICAgICAgICAgIH0pKSlcbiAgICApXG5cblxuICAgICkpLnBpcGUobWFwKHkgPT4gZmxhdHRlbjxQcm9wZXJ0eU9wdGlvbj4oeSkpKTtcbiAgfVxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlUGtDbGFzc2VzRnJvbVByb3BlcnR5U2VsZWN0TW9kZWwobW9kZWw6IFByb3BlcnR5U2VsZWN0TW9kZWwpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgW1xuICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwub3V0Z29pbmdQcm9wZXJ0aWVzLCB0cnVlKSxcbiAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLmluZ29pbmdQcm9wZXJ0aWVzLCBmYWxzZSksXG4gICAgICBdXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbb3V0LCBpbmddKSA9PiB1bmlxKFsuLi5vdXQsIC4uLmluZ10pKVxuICAgIClcbiAgfVxuXG4gIGdldFBrQ2xhc3Nlc0Zyb21Qcm9wZXJ0eVNlbGVjdE1vZGVsJChtb2RlbCQ6IE9ic2VydmFibGU8UHJvcGVydHlTZWxlY3RNb2RlbD4pOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIG1vZGVsJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKG1vZGVsID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBbXG4gICAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLm91dGdvaW5nUHJvcGVydGllcywgdHJ1ZSksXG4gICAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLmluZ29pbmdQcm9wZXJ0aWVzLCBmYWxzZSksXG4gICAgICAgIF1cbiAgICAgICkucGlwZShcbiAgICAgICAgbWFwKChbb3V0LCBpbmddKSA9PiB1bmlxKFsuLi5vdXQsIC4uLmluZ10pKVxuICAgICAgKSlcbiAgICApXG4gIH1cblxuXG5cbiAgZ2V0UHJvcGVydHlPcHRpb25zJChjbGFzc1R5cGVzJDogT2JzZXJ2YWJsZTxDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbD4pOiBPYnNlcnZhYmxlPFByb3BlcnR5T3B0aW9uW10+IHtcbiAgICByZXR1cm4gY2xhc3NUeXBlcyQucGlwZTxDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCwgUHJvcGVydHlPcHRpb25bXT4oXG4gICAgICAvLyBtYWtlIHN1cmUgb25seSBpdCBwYXNzZXMgb25seSBpZiBkYXRhIG9mIHRoZSBhcnJheUNsYXNzZXMgYXJlIGNoYW5nZWQgKG5vdCBjaGlsZHJlbilcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsPigoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gZXF1YWxzKGEsIGIpO1xuICAgICAgfSksXG4gICAgICBzd2l0Y2hNYXAoKHgpID0+ICF4ID8gZW1wdHkoKSA6IHRoaXMuYi5waXBlQ2xhc3Nlc09mUGVyc2lzdGVudEl0ZW1zKHgudHlwZXMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigocGtzKSA9PiAhIXBrcyksXG4gICAgICAgICAgc3dpdGNoTWFwKHR5cGVDbGFzc2VzID0+IHRoaXMuYy5waXBlVHlwZWRDbGFzc2VzT2ZUeXBlQ2xhc3Nlcyh0eXBlQ2xhc3NlcykucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCh0eXBlZENsYXNzZXMgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gdW5pcShbLi4udHlwZWRDbGFzc2VzLCAuLi4oeC5jbGFzc2VzIHx8IFtdKV0pO1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlUHJvcGVydHlPcHRpb25zRm9ybUNsYXNzZXMoY2xhc3NlcylcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvcGVydHlPcHRpb25GaWVsZEtleShma1Byb3BlcnR5OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBzdHJpbmcge1xuICByZXR1cm4gJ18nICsgZmtQcm9wZXJ0eSArICdfJyArIChpc091dGdvaW5nID8gJ291dGdvaW5nJyA6ICdpbmdvaW5nJyk7XG59XG5cbiJdfQ==