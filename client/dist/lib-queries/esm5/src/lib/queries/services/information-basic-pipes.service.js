/**
 * @fileoverview added by tsickle
 * Generated from: services/information-basic-pipes.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { InfStatement } from '@kleiolab/lib-sdk-lb3';
import { combineLatestOrEmpty, TimeSpanUtil } from '@kleiolab/lib-utils';
import { omit, values } from 'ramda';
import { combineLatest, merge, Observable, of, pipe, BehaviorSubject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { spyTag } from '../decorators/method-decorators';
import { ActiveProjectPipesService } from './active-project-pipes.service';
import { SchemaSelectorsService } from './schema-selectors.service';
import * as i0 from "@angular/core";
import * as i1 from "./active-project-pipes.service";
import * as i2 from "./schema-selectors.service";
var InformationBasicPipesService = /** @class */ (function () {
    // infRepo: InfSelector;
    function InformationBasicPipesService(p, s) {
        var _this = this;
        this.p = p;
        this.s = s;
        /**
         * Pipes max. one time primitive for an array of statements, assuming that the statements
         * are of the same properties.
         */
        this.timePrimitiveOfStatements = (/**
         * @return {?}
         */
        function () { return pipe(map((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return r[0]; })), switchMap((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            if (!r)
                return new BehaviorSubject(undefined);
            return _this.pipeInfTimePrimitive(r.fk_object_info).pipe(switchMap((/**
             * @param {?} infTimePrimitive
             * @return {?}
             */
            function (infTimePrimitive) { return _this.p.pkProject$.pipe(switchMap((/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) { return _this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$
                .key(pkProject + '_' + r[0].pk_entity).pipe(filter((/**
             * @param {?} statement
             * @return {?}
             */
            function (statement) { return !!statement; })), map((/**
             * @param {?} ipr
             * @return {?}
             */
            function (ipr) {
                /** @type {?} */
                var y = {
                    calendar: (/** @type {?} */ ((ipr.calendar ? ipr.calendar : 'gregorian'))),
                    julianDay: infTimePrimitive.julian_day,
                    duration: (/** @type {?} */ (infTimePrimitive.duration))
                };
                return y;
            }))); }))); })));
        }))); });
    }
    /*********************************************************************
     * Project
    *********************************************************************/
    // @spyTag pipeRelatedTemporalEntities(pkEntity: number): Observable<InfTemporalEntity[]> {
    //   return this.s.inf$.statement$
    //     .by_object$({ fk_object_info: pkEntity })
    //     .pipe(
    //       auditTime(1),
    //       switchMapOr([], (statements) => combineLatest(
    //         statements.map(statement => this.s.inf$.temporal_entity$.by_pk_entity_key$(statement.fk_subject_info).pipe(
    //         ))
    //       ).pipe(
    //         map(x => x.filter((y) => !!y)),
    //       )),
    //     )
    // }
    /**
   * Pipe statements of an entity
   */
    /*********************************************************************
       * Project
      *********************************************************************/
    // @spyTag pipeRelatedTemporalEntities(pkEntity: number): Observable<InfTemporalEntity[]> {
    //   return this.s.inf$.statement$
    //     .by_object$({ fk_object_info: pkEntity })
    //     .pipe(
    //       auditTime(1),
    //       switchMapOr([], (statements) => combineLatest(
    //         statements.map(statement => this.s.inf$.temporal_entity$.by_pk_entity_key$(statement.fk_subject_info).pipe(
    //         ))
    //       ).pipe(
    //         map(x => x.filter((y) => !!y)),
    //       )),
    //     )
    // }
    /**
     * Pipe statements of an entity
     * @param {?} pkEntity
     * @param {?} isOutgoing
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeStatements = /*********************************************************************
       * Project
      *********************************************************************/
    // @spyTag pipeRelatedTemporalEntities(pkEntity: number): Observable<InfTemporalEntity[]> {
    //   return this.s.inf$.statement$
    //     .by_object$({ fk_object_info: pkEntity })
    //     .pipe(
    //       auditTime(1),
    //       switchMapOr([], (statements) => combineLatest(
    //         statements.map(statement => this.s.inf$.temporal_entity$.by_pk_entity_key$(statement.fk_subject_info).pipe(
    //         ))
    //       ).pipe(
    //         map(x => x.filter((y) => !!y)),
    //       )),
    //     )
    // }
    /**
     * Pipe statements of an entity
     * @param {?} pkEntity
     * @param {?} isOutgoing
     * @return {?}
     */
    function (pkEntity, isOutgoing) {
        return isOutgoing ? this.pipeOutgoingStatements(pkEntity) : this.pipeIngoingStatements(pkEntity);
    };
    /**
    * Pipe outgoing statements of an entity
    */
    /**
     * Pipe outgoing statements of an entity
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeOutgoingStatements = /**
     * Pipe outgoing statements of an entity
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity });
    };
    /**
     * Pipe ingoing statements of an entity
     */
    /**
     * Pipe ingoing statements of an entity
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeIngoingStatements = /**
     * Pipe ingoing statements of an entity
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.s.inf$.statement$.by_object$({ fk_object_info: pkEntity });
    };
    /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeStatementsOfList = /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    function (listDefinition, pkEntity) {
        if (listDefinition.isOutgoing) {
            return this.s.inf$.statement$.by_subject_and_property$({
                fk_property: listDefinition.property.pkProperty,
                fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
                fk_subject_info: pkEntity
            });
        }
        else {
            return this.s.inf$.statement$.by_object_and_property$({
                fk_property: listDefinition.property.pkProperty,
                fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
                fk_object_info: pkEntity
            });
        }
    };
    /**
     * Pipe outgoing statements of temporal entity
     */
    /**
     * Pipe outgoing statements of temporal entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeOutgoingStatementsByProperty = /**
     * Pipe outgoing statements of temporal entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkProperty, pkEntity) {
        return this.s.inf$.statement$.by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        });
    };
    /**
     * Pipe ingoing statements of an entity
     */
    /**
     * Pipe ingoing statements of an entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeIngoingStatementsByProperty = /**
     * Pipe ingoing statements of an entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkProperty, pkEntity) {
        return this.s.inf$.statement$.by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        });
    };
    /**
   * Pipe outgoing statements of temporal entity
   */
    /**
     * Pipe outgoing statements of temporal entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeOutgoingBasicStatementItemsByProperty = /**
     * Pipe outgoing statements of temporal entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    function (pkProperty, pkEntity, pkProject) {
        var _this = this;
        return this.s.inf$.statement$.by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) { return combineLatestOrEmpty(statements.map((/**
         * @param {?} statement
         * @return {?}
         */
        function (statement) { return _this.pipeBasicStatementItem(pkProject, statement, true); }))); })));
    };
    /**
     * Pipe ingoing statements of an entity
     */
    /**
     * Pipe ingoing statements of an entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeIngoingBasicStatementItemsByProperty = /**
     * Pipe ingoing statements of an entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    function (pkProperty, pkEntity, pkProject) {
        var _this = this;
        return this.s.inf$.statement$.by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) { return combineLatestOrEmpty(statements.map((/**
         * @param {?} statement
         * @return {?}
         */
        function (statement) { return _this.pipeBasicStatementItem(pkProject, statement, false); }))); })));
    };
    /**
     * @private
     * @param {?} pkProject
     * @param {?} statement
     * @param {?} isOutgoing
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeBasicStatementItem = /**
     * @private
     * @param {?} pkProject
     * @param {?} statement
     * @param {?} isOutgoing
     * @return {?}
     */
    function (pkProject, statement, isOutgoing) {
        return this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; })), map((/**
         * @param {?} projRel
         * @return {?}
         */
        function (projRel) { return ({
            projRel: projRel, statement: statement, label: '', ordNum: (isOutgoing ? projRel.ord_num_of_range : projRel.ord_num_of_domain), isOutgoing: isOutgoing
        }); })));
    };
    /**
     * @param {?} pkProject
     * @param {?} pkStatement
     * @param {?} isOutgoing
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeBasicStatementItemByPkStatement = /**
     * @param {?} pkProject
     * @param {?} pkStatement
     * @param {?} isOutgoing
     * @return {?}
     */
    function (pkProject, pkStatement, isOutgoing) {
        var _this = this;
        return this.s.inf$.statement$.by_pk_entity_key$(pkStatement).pipe(switchMap((/**
         * @param {?} statement
         * @return {?}
         */
        function (statement) { return (!statement) ? of(undefined) : _this.pipeBasicStatementItem(pkProject, statement, isOutgoing); })));
    };
    /**
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeInfTimePrimitive = /**
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.s.inf$.time_primitive$.by_pk_entity$.key(pkEntity);
    };
    /**
     * pipes the TimeSpan of a temporal entity
     * @param pkEntity the pk_entity of the termporal entity
     */
    /**
     * pipes the TimeSpan of a temporal entity
     * @param {?} pkEntity the pk_entity of the termporal entity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeTimeSpan = /**
     * pipes the TimeSpan of a temporal entity
     * @param {?} pkEntity the pk_entity of the termporal entity
     * @return {?}
     */
    function (pkEntity) {
        // Get the properties leading to presences
        return combineLatest(this.pipeOutgoingStatementsByProperty(72, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(71, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(150, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(151, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(152, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(153, pkEntity).pipe(this.timePrimitiveOfStatements())).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 6), _72 = _b[0], _71 = _b[1], _150 = _b[2], _151 = _b[3], _152 = _b[4], _153 = _b[5];
            return new TimeSpanUtil({
                p82: _72,
                p81: _71,
                p82a: _152,
                p81a: _150,
                p81b: _151,
                p82b: _153,
            });
        })));
    };
    /**
     * Pipes the fk_class of the given entity
     */
    /**
     * Pipes the fk_class of the given entity
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeClassOfEntity = /**
     * Pipes the fk_class of the given entity
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return merge(this.s.inf$.persistent_item$.by_pk_entity_key$(pkEntity).pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return !!e; })), map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.fk_class; }))), this.s.inf$.temporal_entity$.by_pk_entity_key$(pkEntity).pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return !!e; })), map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.fk_class; }))));
    };
    /**
     * Pipes distinct fk_classes of the given persistent items
     */
    /**
     * Pipes distinct fk_classes of the given persistent items
     * @param {?} pkEntities
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeClassesOfPersistentItems = /**
     * Pipes distinct fk_classes of the given persistent items
     * @param {?} pkEntities
     * @return {?}
     */
    function (pkEntities) {
        return this.s.inf$.persistent_item$.by_pk_entity_all$().pipe(map((/**
         * @param {?} peIts
         * @return {?}
         */
        function (peIts) {
            if (!pkEntities || pkEntities.length === 0) {
                return [];
            }
            /** @type {?} */
            var classes = {};
            /** @type {?} */
            var a = [];
            pkEntities.forEach((/**
             * @param {?} typePk
             * @return {?}
             */
            function (typePk) {
                if (!classes[peIts[typePk].fk_class]) {
                    classes[peIts[typePk].fk_class] = true;
                    a.push(peIts[typePk].fk_class);
                }
            }));
            return a;
        })));
    };
    /*********************************************************************
     * Repo
    *********************************************************************/
    /**
      * Pipe repo outgoing statements.
      */
    /*********************************************************************
       * Repo
      *********************************************************************/
    /**
     * Pipe repo outgoing statements.
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeRepoOutgoingStatements = /*********************************************************************
       * Repo
      *********************************************************************/
    /**
     * Pipe repo outgoing statements.
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity }, false);
    };
    /**
    * Pipe repo ingoing statements.
    */
    /**
     * Pipe repo ingoing statements.
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeRepoIngoingStatements = /**
     * Pipe repo ingoing statements.
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.s.inf$.statement$.by_object$({ fk_object_info: pkEntity }, false);
    };
    /**
      * Pipe repo outgoing statements.
      * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
      */
    /**
     * Pipe repo outgoing statements.
     * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeRepoOutgoingStatementsByProperty = /**
     * Pipe repo outgoing statements.
     * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkProperty, pkEntity) {
        var _this = this;
        return combineLatest(this.s.dfh$.property$.by_pk_property$.key(pkProperty)
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x && Object.keys(x).length > 0; })), map((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return values(p)[0].range_instances_max_quantifier; }))), this.s.inf$.statement$
            .by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }, false)
        // .pipe(filter(x => !!x))
        ).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), m = _b[0], rs = _b[1];
            if (rs.length === 0)
                return rs;
            /** @type {?} */
            var r = _this.sortStatementsByRepoPopularity(rs);
            return (m === -1 || m === null) ? r : r.slice(0, m);
        })));
    };
    /**
    * Pipe repo ingoing statements.
    * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
    */
    /**
     * Pipe repo ingoing statements.
     * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeRepoIngoingStatementsByProperty = /**
     * Pipe repo ingoing statements.
     * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkProperty, pkEntity) {
        var _this = this;
        return combineLatest(this.s.dfh$.property$.by_pk_property$.key(pkProperty)
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x && Object.keys(x).length > 0; })), map((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return values(p)[0].domain_instances_max_quantifier; }))), this.s.inf$.statement$
            .by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }, false)
        // .pipe(filter(x => !!x))
        ).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), m = _b[0], rs = _b[1];
            if (rs.length === 0)
                return rs;
            /** @type {?} */
            var r = _this.sortStatementsByRepoPopularity(rs);
            return (m === -1 || m === null) ? r : r.slice(0, m);
        })));
    };
    /*********************************************************************
     * Alternatives (Repo minus Project)
    *********************************************************************/
    /**
     * ******************************************************************
     * Alternatives (Repo minus Project)
     * *******************************************************************
     * @param {?} pkStatement
     * @param {?} isOutgoing
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeAlternativeBasicStatementItemByPkStatement = /**
     * ******************************************************************
     * Alternatives (Repo minus Project)
     * *******************************************************************
     * @param {?} pkStatement
     * @param {?} isOutgoing
     * @return {?}
     */
    function (pkStatement, isOutgoing) {
        return combineLatest(this.s.inf$.statement$.by_pk_entity_key$(pkStatement, false), this.s.inf$.statement$.by_pk_entity_key$(pkStatement))
            .pipe(filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 1), inrepo = _b[0];
            return !!inrepo;
        })), map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), inrepo = _b[0], inproject = _b[1];
            if (inproject) {
                return undefined;
            }
            else {
                /** @type {?} */
                var i = {
                    projRel: undefined,
                    statement: inrepo,
                    ordNum: undefined,
                    isOutgoing: isOutgoing,
                    label: ''
                };
                return i;
            }
        })));
    };
    /**
       * Pipe alternative ingoing statements (= statements not in active project)
       */
    /**
     * Pipe alternative ingoing statements (= statements not in active project)
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeAlternativeIngoingStatements = /**
     * Pipe alternative ingoing statements (= statements not in active project)
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkProperty, pkEntity) {
        return combineLatest(this.s.inf$.statement$.by_object_and_property_indexed$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }, false), this.s.inf$.statement$.by_object_and_property_indexed$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }).pipe(map((/**
         * @param {?} inproject
         * @return {?}
         */
        function (inproject) { return inproject ? Object.keys(inproject) : []; })))).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), inrepo = _b[0], inproject = _b[1];
            return omit(inproject, inrepo);
        })), map((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) { return values(statements); })));
    };
    /**
     * Pipe alternative outgoing statements (= statements not in active project)
     */
    /**
     * Pipe alternative outgoing statements (= statements not in active project)
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeAlternativeOutgoingStatements = /**
     * Pipe alternative outgoing statements (= statements not in active project)
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkProperty, pkEntity) {
        return combineLatest(this.s.inf$.statement$.by_subject_and_property_indexed$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }, false), this.s.inf$.statement$.by_subject_and_property_indexed$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }).pipe(map((/**
         * @param {?} inproject
         * @return {?}
         */
        function (inproject) { return inproject ? Object.keys(inproject) : []; })))).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), inrepo = _b[0], inproject = _b[1];
            return omit(inproject, inrepo);
        })), map((/**
         * @param {?} statements
         * @return {?}
         */
        function (statements) { return values(statements); })));
    };
    /**
     * get array of pks of persistent items of a specific class
     */
    /**
     * get array of pks of persistent items of a specific class
     * @param {?} pkClass
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipePersistentItemPksByClass = /**
     * get array of pks of persistent items of a specific class
     * @param {?} pkClass
     * @return {?}
     */
    function (pkClass) {
        return this.s.inf$.persistent_item$.by_fk_class_key$(pkClass).pipe(map((/**
         * @param {?} ob
         * @return {?}
         */
        function (ob) {
            if (ob)
                return Object.keys(ob).map((/**
                 * @param {?} k
                 * @return {?}
                 */
                function (k) { return parseInt(k, 10); }));
            return [];
        })));
    };
    /**
     * gets the css classes for that entity
     * @param pkEntity
     */
    /**
     * gets the css classes for that entity
     * @param {?} pkEntity
     * @return {?}
     */
    InformationBasicPipesService.prototype.pipeIconType = /**
     * gets the css classes for that entity
     * @param {?} pkEntity
     * @return {?}
     */
    function (pkEntity) {
        return this.p.streamEntityPreview(pkEntity).pipe(map((/**
         * @param {?} preview
         * @return {?}
         */
        function (preview) {
            if (preview.entity_type == 'teEn') {
                return 'temporal-entity';
            }
            if (preview.fk_class === DfhConfig.CLASS_PK_EXPRESSION_PORTION) {
                return 'expression-portion';
            }
            else if (DfhConfig.CLASS_PKS_SOURCE_PE_IT.includes(preview.fk_class)) {
                return 'source';
            }
            return 'persistent-entity';
        })));
    };
    /*********************************************************************
     * Helpers
     *********************************************************************/
    /**
     * ******************************************************************
     * Helpers
     * *******************************************************************
     * @param {?} statements
     * @return {?}
     */
    InformationBasicPipesService.prototype.sortStatementsByRepoPopularity = /**
     * ******************************************************************
     * Helpers
     * *******************************************************************
     * @param {?} statements
     * @return {?}
     */
    function (statements) {
        return statements.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.is_in_project_count > b.is_in_project_count ? 1 : -1; }));
    };
    InformationBasicPipesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    InformationBasicPipesService.ctorParameters = function () { return [
        { type: ActiveProjectPipesService },
        { type: SchemaSelectorsService }
    ]; };
    /** @nocollapse */ InformationBasicPipesService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function InformationBasicPipesService_Factory() { return new InformationBasicPipesService(i0.ɵɵinject(i1.ActiveProjectPipesService), i0.ɵɵinject(i2.SchemaSelectorsService)); }, token: InformationBasicPipesService, providedIn: "root" });
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeStatements", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeOutgoingStatements", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeIngoingStatements", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeOutgoingStatementsByProperty", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeIngoingStatementsByProperty", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeOutgoingBasicStatementItemsByProperty", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeIngoingBasicStatementItemsByProperty", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, InfStatement, Boolean]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeBasicStatementItem", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Number, Boolean]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeBasicStatementItemByPkStatement", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeInfTimePrimitive", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeTimeSpan", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeClassOfEntity", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeClassesOfPersistentItems", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeRepoOutgoingStatements", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeRepoIngoingStatements", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeRepoOutgoingStatementsByProperty", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeRepoIngoingStatementsByProperty", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Boolean]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeAlternativeBasicStatementItemByPkStatement", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeAlternativeIngoingStatements", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipeAlternativeOutgoingStatements", null);
    tslib_1.__decorate([
        spyTag,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], InformationBasicPipesService.prototype, "pipePersistentItemPksByClass", null);
    return InformationBasicPipesService;
}());
export { InformationBasicPipesService };
if (false) {
    /**
     * Pipes max. one time primitive for an array of statements, assuming that the statements
     * are of the same properties.
     * @type {?}
     */
    InformationBasicPipesService.prototype.timePrimitiveOfStatements;
    /**
     * @type {?}
     * @private
     */
    InformationBasicPipesService.prototype.p;
    /**
     * @type {?}
     * @private
     */
    InformationBasicPipesService.prototype.s;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tYmFzaWMtcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbmZvcm1hdGlvbi1iYXNpYy1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWpELE9BQU8sRUFBRSxZQUFZLEVBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFDdkUsT0FBTyxFQUFnQixvQkFBb0IsRUFBOEIsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkgsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUd6RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQU1wRTtJQVVFLHdCQUF3QjtJQUV4QixzQ0FDVSxDQUE0QixFQUM1QixDQUF5QjtRQUZuQyxpQkFHSztRQUZLLE1BQUMsR0FBRCxDQUFDLENBQTJCO1FBQzVCLE1BQUMsR0FBRCxDQUFDLENBQXdCOzs7OztRQXdLbkMsOEJBQXlCOzs7UUFBRyxjQUFNLE9BQUEsSUFBSSxDQUNwQyxHQUFHOzs7O1FBQUMs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bXBvcnQgeyBEZmhDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBJY29uVHlwZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgSW5mU3RhdGVtZW50LCBJbmZUaW1lUHJpbWl0aXZlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IENhbGVuZGFyVHlwZSwgY29tYmluZUxhdGVzdE9yRW1wdHksIEdyYW51bGFyaXR5LCBUaW1lUHJpbWl0aXZlLCBUaW1lU3BhblV0aWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IG9taXQsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIG1lcmdlLCBPYnNlcnZhYmxlLCBvZiwgcGlwZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgc3B5VGFnIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9tZXRob2QtZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBCYXNpY1N0YXRlbWVudEl0ZW0sIH0gZnJvbSAnLi4vbW9kZWxzL0Jhc2ljU3RhdGVtZW50SXRlbSc7XG5pbXBvcnQgeyBTdWJmaWVsZCB9IGZyb20gJy4uL21vZGVscy9TdWJmaWVsZCc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5pbXBvcnQgeyBUaW1lUHJpbWl0aXZlV2l0aENhbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5cblxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgY29udGFpbnMgYSBiYXNpYyBwaXBlcyBmb3IgY3JlYXRpbmcgbW9yZSBjb21wbGV4XG4gKiByeGpzIHBpcGVzLiBFYWNoIHBpcGUgdGFrZXMgbm9uLW9ic2VydmFibGUgcGFyYW1ldGVycyBhbmRcbiAqIHJldHVybnMgYW4gb2JzZXJ2YWJsZS4gVGhlIG1ldGhvZCBuYW1lcyBhcmUgbWFpbmx5XG4gKiBiYXNlZCBvbiB0aGUgdHlwZSBvZiB0aGUgb2JzZXJ2YWJsZSBkYXRhXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZvcm1hdGlvbkJhc2ljUGlwZXNTZXJ2aWNlIHtcbiAgLy8gaW5mUmVwbzogSW5mU2VsZWN0b3I7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwOiBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgKSB7IH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIFByb2plY3RcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8vIEBzcHlUYWcgcGlwZVJlbGF0ZWRUZW1wb3JhbEVudGl0aWVzKHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPEluZlRlbXBvcmFsRW50aXR5W10+IHtcbiAgLy8gICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JFxuICAvLyAgICAgLmJ5X29iamVjdCQoeyBma19vYmplY3RfaW5mbzogcGtFbnRpdHkgfSlcbiAgLy8gICAgIC5waXBlKFxuICAvLyAgICAgICBhdWRpdFRpbWUoMSksXG4gIC8vICAgICAgIHN3aXRjaE1hcE9yKFtdLCAoc3RhdGVtZW50cykgPT4gY29tYmluZUxhdGVzdChcbiAgLy8gICAgICAgICBzdGF0ZW1lbnRzLm1hcChzdGF0ZW1lbnQgPT4gdGhpcy5zLmluZiQudGVtcG9yYWxfZW50aXR5JC5ieV9wa19lbnRpdHlfa2V5JChzdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKS5waXBlKFxuICAvLyAgICAgICAgICkpXG4gIC8vICAgICAgICkucGlwZShcbiAgLy8gICAgICAgICBtYXAoeCA9PiB4LmZpbHRlcigoeSkgPT4gISF5KSksXG4gIC8vICAgICAgICkpLFxuICAvLyAgICAgKVxuICAvLyB9XG5cblxuXG5cbiAgLyoqXG4gKiBQaXBlIHN0YXRlbWVudHMgb2YgYW4gZW50aXR5XG4gKi9cbiAgQHNweVRhZyBwaXBlU3RhdGVtZW50cyhwa0VudGl0eTogbnVtYmVyLCBpc091dGdvaW5nKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiBpc091dGdvaW5nID8gdGhpcy5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KSA6IHRoaXMucGlwZUluZ29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KVxuICB9XG5cblxuICAvKipcbiAgKiBQaXBlIG91dGdvaW5nIHN0YXRlbWVudHMgb2YgYW4gZW50aXR5XG4gICovXG4gIEBzcHlUYWcgcGlwZU91dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0JCh7IGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHkgfSlcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgaW5nb2luZyBzdGF0ZW1lbnRzIG9mIGFuIGVudGl0eVxuICAgKi9cbiAgQHNweVRhZyBwaXBlSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0JCh7IGZrX29iamVjdF9pbmZvOiBwa0VudGl0eSB9KVxuICB9XG5cblxuICBwaXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgICBma19wcm9wZXJ0eTogbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgICAgICAgZmtfcHJvcGVydHlfb2ZfcHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHlPZlByb3BlcnR5LFxuICAgICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICAgIGZrX3Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICBma19wcm9wZXJ0eV9vZl9wcm9wZXJ0eTogbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eU9mUHJvcGVydHksXG4gICAgICAgIGZrX29iamVjdF9pbmZvOiBwa0VudGl0eVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGlwZSBvdXRnb2luZyBzdGF0ZW1lbnRzIG9mIHRlbXBvcmFsIGVudGl0eVxuICAgKi9cbiAgQHNweVRhZyBwaXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShwa1Byb3BlcnR5LCBwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgfSlcblxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSBpbmdvaW5nIHN0YXRlbWVudHMgb2YgYW4gZW50aXR5XG4gICAqL1xuICBAc3B5VGFnIHBpcGVJbmdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkocGtQcm9wZXJ0eSwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICBma19vYmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gKiBQaXBlIG91dGdvaW5nIHN0YXRlbWVudHMgb2YgdGVtcG9yYWwgZW50aXR5XG4gKi9cbiAgQHNweVRhZyBwaXBlT3V0Z29pbmdCYXNpY1N0YXRlbWVudEl0ZW1zQnlQcm9wZXJ0eShwa1Byb3BlcnR5LCBwa0VudGl0eSwgcGtQcm9qZWN0OiBudW1iZXIpOiBPYnNlcnZhYmxlPEJhc2ljU3RhdGVtZW50SXRlbVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eVxuICAgIH0pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgc3RhdGVtZW50cy5tYXAoc3RhdGVtZW50ID0+IHRoaXMucGlwZUJhc2ljU3RhdGVtZW50SXRlbShwa1Byb2plY3QsIHN0YXRlbWVudCwgdHJ1ZSkpXG4gICAgICApKVxuICAgIClcbiAgfVxuXG5cblxuICAvKipcbiAgICogUGlwZSBpbmdvaW5nIHN0YXRlbWVudHMgb2YgYW4gZW50aXR5XG4gICAqL1xuICBAc3B5VGFnIHBpcGVJbmdvaW5nQmFzaWNTdGF0ZW1lbnRJdGVtc0J5UHJvcGVydHkocGtQcm9wZXJ0eSwgcGtFbnRpdHksIHBrUHJvamVjdDogbnVtYmVyKTogT2JzZXJ2YWJsZTxCYXNpY1N0YXRlbWVudEl0ZW1bXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5XG4gICAgfSkucGlwZShcbiAgICAgIHN3aXRjaE1hcChzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBzdGF0ZW1lbnRzLm1hcChzdGF0ZW1lbnQgPT4gdGhpcy5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtKHBrUHJvamVjdCwgc3RhdGVtZW50LCBmYWxzZSkpXG4gICAgICApKVxuICAgIClcbiAgfVxuXG4gIEBzcHlUYWcgcHJpdmF0ZSBwaXBlQmFzaWNTdGF0ZW1lbnRJdGVtKHBrUHJvamVjdDogbnVtYmVyLCBzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8QmFzaWNTdGF0ZW1lbnRJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHN0YXRlbWVudC5wa19lbnRpdHkpLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgbWFwKHByb2pSZWwgPT4gKHtcbiAgICAgICAgcHJvalJlbCwgc3RhdGVtZW50LCBsYWJlbDogJycsIG9yZE51bTogKGlzT3V0Z29pbmcgPyBwcm9qUmVsLm9yZF9udW1fb2ZfcmFuZ2UgOiBwcm9qUmVsLm9yZF9udW1fb2ZfZG9tYWluKSwgaXNPdXRnb2luZ1xuICAgICAgfSkpXG4gICAgKTtcbiAgfVxuXG4gIEBzcHlUYWcgcGlwZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtQcm9qZWN0OiBudW1iZXIsIHBrU3RhdGVtZW50OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEJhc2ljU3RhdGVtZW50SXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3BrX2VudGl0eV9rZXkkKHBrU3RhdGVtZW50KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKHN0YXRlbWVudCA9PiAoIXN0YXRlbWVudCkgPyBvZih1bmRlZmluZWQpIDogdGhpcy5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtKHBrUHJvamVjdCwgc3RhdGVtZW50LCBpc091dGdvaW5nKSlcbiAgICApXG4gIH1cblxuXG4gIEBzcHlUYWcgcGlwZUluZlRpbWVQcmltaXRpdmUocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8SW5mVGltZVByaW1pdGl2ZT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkocGtFbnRpdHkpXG4gIH1cblxuICAvKipcbiAgICogcGlwZXMgdGhlIFRpbWVTcGFuIG9mIGEgdGVtcG9yYWwgZW50aXR5XG4gICAqIEBwYXJhbSBwa0VudGl0eSB0aGUgcGtfZW50aXR5IG9mIHRoZSB0ZXJtcG9yYWwgZW50aXR5XG4gICAqL1xuICBAc3B5VGFnIHBpcGVUaW1lU3Bhbihwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxUaW1lU3BhblV0aWw+IHtcbiAgICAvLyBHZXQgdGhlIHByb3BlcnRpZXMgbGVhZGluZyB0byBwcmVzZW5jZXNcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoNzIsIHBrRW50aXR5KS5waXBlKHRoaXMudGltZVByaW1pdGl2ZU9mU3RhdGVtZW50cygpKSxcbiAgICAgIHRoaXMucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoNzEsIHBrRW50aXR5KS5waXBlKHRoaXMudGltZVByaW1pdGl2ZU9mU3RhdGVtZW50cygpKSxcbiAgICAgIHRoaXMucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUwLCBwa0VudGl0eSkucGlwZSh0aGlzLnRpbWVQcmltaXRpdmVPZlN0YXRlbWVudHMoKSksXG4gICAgICB0aGlzLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MSwgcGtFbnRpdHkpLnBpcGUodGhpcy50aW1lUHJpbWl0aXZlT2ZTdGF0ZW1lbnRzKCkpLFxuICAgICAgdGhpcy5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTIsIHBrRW50aXR5KS5waXBlKHRoaXMudGltZVByaW1pdGl2ZU9mU3RhdGVtZW50cygpKSxcbiAgICAgIHRoaXMucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUzLCBwa0VudGl0eSkucGlwZSh0aGlzLnRpbWVQcmltaXRpdmVPZlN0YXRlbWVudHMoKSksXG5cbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFtfNzIsIF83MSwgXzE1MCwgXzE1MSwgXzE1MiwgXzE1M10pID0+IG5ldyBUaW1lU3BhblV0aWwoe1xuICAgICAgICBwODI6IF83MixcbiAgICAgICAgcDgxOiBfNzEsXG4gICAgICAgIHA4MmE6IF8xNTIsXG4gICAgICAgIHA4MWE6IF8xNTAsXG4gICAgICAgIHA4MWI6IF8xNTEsXG4gICAgICAgIHA4MmI6IF8xNTMsXG4gICAgICB9KSksXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBQaXBlcyBtYXguIG9uZSB0aW1lIHByaW1pdGl2ZSBmb3IgYW4gYXJyYXkgb2Ygc3RhdGVtZW50cywgYXNzdW1pbmcgdGhhdCB0aGUgc3RhdGVtZW50c1xuICAgKiBhcmUgb2YgdGhlIHNhbWUgcHJvcGVydGllcy5cbiAgICovXG4gIHRpbWVQcmltaXRpdmVPZlN0YXRlbWVudHMgPSAoKSA9PiBwaXBlKFxuICAgIG1hcCgocjogSW5mU3RhdGVtZW50W10pID0+IHJbMF0pLFxuICAgIHN3aXRjaE1hcCgocikgPT4ge1xuICAgICAgaWYgKCFyKSByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpXG4gICAgICByZXR1cm4gdGhpcy5waXBlSW5mVGltZVByaW1pdGl2ZShyLmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGluZlRpbWVQcmltaXRpdmUpID0+IHRoaXMucC5wa1Byb2plY3QkLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKChwa1Byb2plY3QpID0+IHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSRcbiAgICAgICAgICAgIC5rZXkocGtQcm9qZWN0ICsgJ18nICsgclswXS5wa19lbnRpdHkpLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlcihzdGF0ZW1lbnQgPT4gISFzdGF0ZW1lbnQpLFxuICAgICAgICAgICAgICBtYXAoaXByID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB5OiBUaW1lUHJpbWl0aXZlV2l0aENhbCA9IHtcbiAgICAgICAgICAgICAgICAgIGNhbGVuZGFyOiAoaXByLmNhbGVuZGFyID8gaXByLmNhbGVuZGFyIDogJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSxcbiAgICAgICAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApKVxuICAgICAgICApKVxuICAgICAgKVxuICAgIH0pXG4gIClcblxuICAvKipcbiAgICogUGlwZXMgdGhlIGZrX2NsYXNzIG9mIHRoZSBnaXZlbiBlbnRpdHlcbiAgICovXG4gIEBzcHlUYWcgcGlwZUNsYXNzT2ZFbnRpdHkocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIG1lcmdlKFxuICAgICAgdGhpcy5zLmluZiQucGVyc2lzdGVudF9pdGVtJC5ieV9wa19lbnRpdHlfa2V5JChwa0VudGl0eSkucGlwZShcbiAgICAgICAgZmlsdGVyKGUgPT4gISFlKSxcbiAgICAgICAgbWFwKGUgPT4gZS5ma19jbGFzcylcbiAgICAgICksXG4gICAgICB0aGlzLnMuaW5mJC50ZW1wb3JhbF9lbnRpdHkkLmJ5X3BrX2VudGl0eV9rZXkkKHBrRW50aXR5KS5waXBlKFxuICAgICAgICBmaWx0ZXIoZSA9PiAhIWUpLFxuICAgICAgICBtYXAoZSA9PiBlLmZrX2NsYXNzKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyBkaXN0aW5jdCBma19jbGFzc2VzIG9mIHRoZSBnaXZlbiBwZXJzaXN0ZW50IGl0ZW1zXG4gICAqL1xuICBAc3B5VGFnIHBpcGVDbGFzc2VzT2ZQZXJzaXN0ZW50SXRlbXMocGtFbnRpdGllczogbnVtYmVyW10pOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnBlcnNpc3RlbnRfaXRlbSQuYnlfcGtfZW50aXR5X2FsbCQoKS5waXBlKFxuICAgICAgbWFwKChwZUl0cykgPT4ge1xuICAgICAgICBpZiAoIXBrRW50aXRpZXMgfHwgcGtFbnRpdGllcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gW11cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbGFzc2VzID0ge307XG4gICAgICAgIGNvbnN0IGEgPSBbXTtcbiAgICAgICAgcGtFbnRpdGllcy5mb3JFYWNoKHR5cGVQayA9PiB7XG4gICAgICAgICAgaWYgKCFjbGFzc2VzW3BlSXRzW3R5cGVQa10uZmtfY2xhc3NdKSB7XG4gICAgICAgICAgICBjbGFzc2VzW3BlSXRzW3R5cGVQa10uZmtfY2xhc3NdID0gdHJ1ZTtcbiAgICAgICAgICAgIGEucHVzaChwZUl0c1t0eXBlUGtdLmZrX2NsYXNzKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9KVxuICAgIClcblxuICB9XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIFJlcG9cbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8qKlxuICAgICogUGlwZSByZXBvIG91dGdvaW5nIHN0YXRlbWVudHMuXG4gICAgKi9cbiAgQHNweVRhZyBwaXBlUmVwb091dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0JCh7IGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHkgfSwgZmFsc2UpXG4gIH1cblxuICAvKipcbiAgKiBQaXBlIHJlcG8gaW5nb2luZyBzdGF0ZW1lbnRzLlxuICAqL1xuICBAc3B5VGFnIHBpcGVSZXBvSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0JCh7IGZrX29iamVjdF9pbmZvOiBwa0VudGl0eSB9LCBmYWxzZSlcbiAgfVxuXG4gIC8qKlxuICAgICogUGlwZSByZXBvIG91dGdvaW5nIHN0YXRlbWVudHMuXG4gICAgKiBJZiBtYXggcXVhbnRpdHkgaXMgbGltaXRlZCwgdGFrZXMgb25seSBtYXggYWxsb3dlZCBudW1iZXIgb2Ygc3RhdGVtZW50cywgc3RhcnRpbmcgd2l0aCBoaWdoZXN0IGlzX2luX3Byb2plY3RfY291bnRcbiAgICAqL1xuICBAc3B5VGFnIHBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShwa1Byb3BlcnR5LCBwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9wa19wcm9wZXJ0eSQua2V5KHBrUHJvcGVydHkpXG4gICAgICAgIC5waXBlKGZpbHRlcih4ID0+ICEheCAmJiBPYmplY3Qua2V5cyh4KS5sZW5ndGggPiAwKSwgbWFwKHAgPT4gdmFsdWVzKHApWzBdLnJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcikpLFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JFxuICAgICAgICAuYnlfc3ViamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICAgIH0sIGZhbHNlKVxuICAgICAgLy8gLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFttLCByc10pID0+IHtcbiAgICAgICAgaWYgKHJzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJzO1xuICAgICAgICBjb25zdCByID0gdGhpcy5zb3J0U3RhdGVtZW50c0J5UmVwb1BvcHVsYXJpdHkocnMpO1xuICAgICAgICByZXR1cm4gKG0gPT09IC0xIHx8IG0gPT09IG51bGwpID8gciA6IHIuc2xpY2UoMCwgbSk7XG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgcmVwbyBpbmdvaW5nIHN0YXRlbWVudHMuXG4gICogSWYgbWF4IHF1YW50aXR5IGlzIGxpbWl0ZWQsIHRha2VzIG9ubHkgbWF4IGFsbG93ZWQgbnVtYmVyIG9mIHN0YXRlbWVudHMsIHN0YXJ0aW5nIHdpdGggaGlnaGVzdCBpc19pbl9wcm9qZWN0X2NvdW50XG4gICovXG4gIEBzcHlUYWcgcGlwZVJlcG9JbmdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkocGtQcm9wZXJ0eSwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfcGtfcHJvcGVydHkkLmtleShwa1Byb3BlcnR5KVxuICAgICAgICAucGlwZShmaWx0ZXIoeCA9PiAhIXggJiYgT2JqZWN0LmtleXMoeCkubGVuZ3RoID4gMCksIG1hcChwID0+IHZhbHVlcyhwKVswXS5kb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyKSksXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkXG4gICAgICAgIC5ieV9vYmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICAgICAgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICAgIH0sIGZhbHNlKVxuICAgICAgLy8gLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFttLCByc10pID0+IHtcbiAgICAgICAgaWYgKHJzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJzO1xuICAgICAgICBjb25zdCByID0gdGhpcy5zb3J0U3RhdGVtZW50c0J5UmVwb1BvcHVsYXJpdHkocnMpO1xuICAgICAgICByZXR1cm4gKG0gPT09IC0xIHx8IG0gPT09IG51bGwpID8gciA6IHIuc2xpY2UoMCwgbSk7XG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBBbHRlcm5hdGl2ZXMgKFJlcG8gbWludXMgUHJvamVjdClcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIEBzcHlUYWcgcGlwZUFsdGVybmF0aXZlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1N0YXRlbWVudDogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxCYXNpY1N0YXRlbWVudEl0ZW0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfcGtfZW50aXR5X2tleSQocGtTdGF0ZW1lbnQsIGZhbHNlKSxcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfcGtfZW50aXR5X2tleSQocGtTdGF0ZW1lbnQpLFxuICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKFtpbnJlcG9dKSA9PiAhIWlucmVwbyksXG4gICAgICAgIG1hcCgoW2lucmVwbywgaW5wcm9qZWN0XSkgPT4ge1xuICAgICAgICAgIGlmIChpbnByb2plY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaTogQmFzaWNTdGF0ZW1lbnRJdGVtID0ge1xuICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHN0YXRlbWVudDogaW5yZXBvLFxuICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgbGFiZWw6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAgICogUGlwZSBhbHRlcm5hdGl2ZSBpbmdvaW5nIHN0YXRlbWVudHMgKD0gc3RhdGVtZW50cyBub3QgaW4gYWN0aXZlIHByb2plY3QpXG4gICAgICovXG4gIEBzcHlUYWcgcGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMocGtQcm9wZXJ0eSwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoe1xuICAgICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgICAgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICB9LCBmYWxzZSksXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoe1xuICAgICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgICAgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICB9KS5waXBlKFxuICAgICAgICBtYXAoaW5wcm9qZWN0ID0+IGlucHJvamVjdCA/IE9iamVjdC5rZXlzKGlucHJvamVjdCkgOiBbXSlcbiAgICAgIClcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFtpbnJlcG8sIGlucHJvamVjdF0pID0+IG9taXQoaW5wcm9qZWN0LCBpbnJlcG8pKSxcbiAgICAgIG1hcChzdGF0ZW1lbnRzID0+IHZhbHVlcyhzdGF0ZW1lbnRzKSlcbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIGFsdGVybmF0aXZlIG91dGdvaW5nIHN0YXRlbWVudHMgKD0gc3RhdGVtZW50cyBub3QgaW4gYWN0aXZlIHByb2plY3QpXG4gICAqL1xuICBAc3B5VGFnIHBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhwa1Byb3BlcnR5LCBwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoe1xuICAgICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgICAgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eVxuICAgICAgfSwgZmFsc2UpLFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7XG4gICAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICB9KS5waXBlKFxuICAgICAgICBtYXAoaW5wcm9qZWN0ID0+IGlucHJvamVjdCA/IE9iamVjdC5rZXlzKGlucHJvamVjdCkgOiBbXSlcbiAgICAgICksXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbaW5yZXBvLCBpbnByb2plY3RdKSA9PiBvbWl0KGlucHJvamVjdCwgaW5yZXBvKSksXG4gICAgICBtYXAoc3RhdGVtZW50cyA9PiB2YWx1ZXMoc3RhdGVtZW50cykpXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBnZXQgYXJyYXkgb2YgcGtzIG9mIHBlcnNpc3RlbnQgaXRlbXMgb2YgYSBzcGVjaWZpYyBjbGFzc1xuICAgKi9cbiAgQHNweVRhZyBwaXBlUGVyc2lzdGVudEl0ZW1Qa3NCeUNsYXNzKHBrQ2xhc3MpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnBlcnNpc3RlbnRfaXRlbSQuYnlfZmtfY2xhc3Nfa2V5JChwa0NsYXNzKS5waXBlKFxuICAgICAgbWFwKG9iID0+IHtcbiAgICAgICAgaWYgKG9iKSByZXR1cm4gT2JqZWN0LmtleXMob2IpLm1hcChrID0+IHBhcnNlSW50KGssIDEwKSk7XG4gICAgICAgIHJldHVybiBbXVxuICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogZ2V0cyB0aGUgY3NzIGNsYXNzZXMgZm9yIHRoYXQgZW50aXR5XG4gICAqIEBwYXJhbSBwa0VudGl0eVxuICAgKi9cbiAgcGlwZUljb25UeXBlKHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPEljb25UeXBlPiB7XG5cbiAgICByZXR1cm4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcocGtFbnRpdHkpLnBpcGUoXG4gICAgICBtYXAocHJldmlldyA9PiB7XG4gICAgICAgIGlmIChwcmV2aWV3LmVudGl0eV90eXBlID09ICd0ZUVuJykge1xuICAgICAgICAgIHJldHVybiAndGVtcG9yYWwtZW50aXR5J1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2aWV3LmZrX2NsYXNzID09PSBEZmhDb25maWcuQ0xBU1NfUEtfRVhQUkVTU0lPTl9QT1JUSU9OKSB7XG4gICAgICAgICAgcmV0dXJuICdleHByZXNzaW9uLXBvcnRpb24nXG4gICAgICAgIH0gZWxzZSBpZiAoRGZoQ29uZmlnLkNMQVNTX1BLU19TT1VSQ0VfUEVfSVQuaW5jbHVkZXMocHJldmlldy5ma19jbGFzcykpIHtcbiAgICAgICAgICByZXR1cm4gJ3NvdXJjZSdcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ3BlcnNpc3RlbnQtZW50aXR5J1xuICAgICAgfSlcbiAgICApXG5cbiAgfVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBIZWxwZXJzXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIHNvcnRTdGF0ZW1lbnRzQnlSZXBvUG9wdWxhcml0eShzdGF0ZW1lbnRzOiBJbmZTdGF0ZW1lbnRbXSk6IEluZlN0YXRlbWVudFtdIHtcbiAgICByZXR1cm4gc3RhdGVtZW50cy5zb3J0KChhLCBiKSA9PiBhLmlzX2luX3Byb2plY3RfY291bnQgPiBiLmlzX2luX3Byb2plY3RfY291bnQgPyAxIDogLTEpXG4gIH1cblxuXG5cbn1cbiJdfQ==