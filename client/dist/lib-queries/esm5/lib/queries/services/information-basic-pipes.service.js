/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/services/information-basic-pipes.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tYmFzaWMtcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy8iLCJzb3VyY2VzIjpbImxpYi9xdWVyaWVzL3NlcnZpY2VzL2luZm9ybWF0aW9uLWJhc2ljLXBpcGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFakQsT0FBTyxFQUFFLFlBQVksRUFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RSxPQUFPLEVBQWdCLG9CQUFvQixFQUE4QixZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuSCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkYsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBR3pELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7O0FBTXBFO0lBVUUsd0JBQXdCO0lBRXhCLHNDQUNVLENBQTRCLEVBQzVCLENBQXlCO1FBRm5DLGlCQUdLO1FBRkssTUFBQyxHQUFELENBQUMsQ0FBMkI7UUFDNUIsTUFBQyxHQUFELENBQUMsQ0FBd0I7Ozs7O1FBd0tuQyw4QkFBeUI7OztRQUFHLGNBQU0sT0FBQSxJQUFJLENBQ3BDLEdBQUc7Ozs7UUFBQyxVQUFD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TU87UUFBUCxNQUFNOzs7Z0RBQW1DLFVBQVU7OEVBRW5EO0lBTU87UUFBUCxNQUFNOzs7Z0RBQWtDLFVBQVU7NkVBRWxEO0lBc0JPO1FBQVAsTUFBTTs7O2dEQUF5RCxVQUFVO3dGQU16RTtJQU1PO1FBQVAsTUFBTTs7O2dEQUF3RCxVQUFVO3VGQUt4RTtJQUtPO1FBQVAsTUFBTTs7O2dEQUFxRixVQUFVO2lHQVNyRztJQU9PO1FBQVAsTUFBTTs7O2dEQUFvRixVQUFVO2dHQVNwRztJQUVPO1FBQVAsTUFBTTs7eURBQThELFlBQVk7Z0RBQXdCLFVBQVU7OEVBT2xIO0lBRU87UUFBUCxNQUFNOzs7Z0RBQW1HLFVBQVU7MkZBSW5IO0lBR087UUFBUCxNQUFNOzs7Z0RBQXlDLFVBQVU7NEVBRXpEO0lBTU87UUFBUCxNQUFNOzs7Z0RBQWlDLFVBQVU7b0VBb0JqRDtJQWtDTztRQUFQLE1BQU07OztnREFBc0MsVUFBVTt5RUFXdEQ7SUFLTztRQUFQLE1BQU07OztnREFBcUQsVUFBVTtvRkFrQnJFO0lBVU87UUFBUCxNQUFNOzs7Z0RBQXVDLFVBQVU7a0ZBRXZEO0lBS087UUFBUCxNQUFNOzs7Z0RBQXNDLFVBQVU7aUZBRXREO0lBTU87UUFBUCxNQUFNOzs7Z0RBQTZELFVBQVU7NEZBaUI3RTtJQU1PO1FBQVAsTUFBTTs7O2dEQUE0RCxVQUFVOzJGQWlCNUU7SUFPTztRQUFQLE1BQU07OztnREFBMkYsVUFBVTtzR0FzQjNHO0lBTU87UUFBUCxNQUFNOzs7Z0RBQXlELFVBQVU7d0ZBZ0J6RTtJQU1PO1FBQVAsTUFBTTs7O2dEQUEwRCxVQUFVO3lGQWdCMUU7SUFPTztRQUFQLE1BQU07OztnREFBd0MsVUFBVTtvRkFNeEQ7dUNBM1pIO0NBNmJDLEFBM2FELElBMmFDO1NBbGFZLDRCQUE0Qjs7Ozs7OztJQTZLdkMsaUVBcUJDOzs7OztJQTlMQyx5Q0FBb0M7Ozs7O0lBQ3BDLHlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaENvbmZpZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItY29uZmlnJztcbmltcG9ydCB7IEljb25UeXBlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBJbmZTdGF0ZW1lbnQsIEluZlRpbWVQcmltaXRpdmUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJUeXBlLCBjb21iaW5lTGF0ZXN0T3JFbXB0eSwgR3JhbnVsYXJpdHksIFRpbWVQcmltaXRpdmUsIFRpbWVTcGFuVXRpbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgb21pdCwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCBwaXBlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBzcHlUYWcgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IEJhc2ljU3RhdGVtZW50SXRlbSwgfSBmcm9tICcuLi9tb2RlbHMvQmFzaWNTdGF0ZW1lbnRJdGVtJztcbmltcG9ydCB7IFN1YmZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL1N1YmZpZWxkJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UgfSBmcm9tICcuL2FjdGl2ZS1wcm9qZWN0LXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NoZW1hU2VsZWN0b3JzU2VydmljZSB9IGZyb20gJy4vc2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlJztcbmltcG9ydCB7IFRpbWVQcmltaXRpdmVXaXRoQ2FsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcblxuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIFRoaXMgc2VydmljZSBjb250YWlucyBhIGJhc2ljIHBpcGVzIGZvciBjcmVhdGluZyBtb3JlIGNvbXBsZXhcbiAqIHJ4anMgcGlwZXMuIEVhY2ggcGlwZSB0YWtlcyBub24tb2JzZXJ2YWJsZSBwYXJhbWV0ZXJzIGFuZFxuICogcmV0dXJucyBhbiBvYnNlcnZhYmxlLiBUaGUgbWV0aG9kIG5hbWVzIGFyZSBtYWlubHlcbiAqIGJhc2VkIG9uIHRoZSB0eXBlIG9mIHRoZSBvYnNlcnZhYmxlIGRhdGFcbiAqL1xuZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uQmFzaWNQaXBlc1NlcnZpY2Uge1xuICAvLyBpbmZSZXBvOiBJbmZTZWxlY3RvcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHA6IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzOiBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlLFxuICApIHsgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogUHJvamVjdFxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgLy8gQHNweVRhZyBwaXBlUmVsYXRlZFRlbXBvcmFsRW50aXRpZXMocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8SW5mVGVtcG9yYWxFbnRpdHlbXT4ge1xuICAvLyAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkXG4gIC8vICAgICAuYnlfb2JqZWN0JCh7IGZrX29iamVjdF9pbmZvOiBwa0VudGl0eSB9KVxuICAvLyAgICAgLnBpcGUoXG4gIC8vICAgICAgIGF1ZGl0VGltZSgxKSxcbiAgLy8gICAgICAgc3dpdGNoTWFwT3IoW10sIChzdGF0ZW1lbnRzKSA9PiBjb21iaW5lTGF0ZXN0KFxuICAvLyAgICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PiB0aGlzLnMuaW5mJC50ZW1wb3JhbF9lbnRpdHkkLmJ5X3BrX2VudGl0eV9rZXkkKHN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pLnBpcGUoXG4gIC8vICAgICAgICAgKSlcbiAgLy8gICAgICAgKS5waXBlKFxuICAvLyAgICAgICAgIG1hcCh4ID0+IHguZmlsdGVyKCh5KSA9PiAhIXkpKSxcbiAgLy8gICAgICAgKSksXG4gIC8vICAgICApXG4gIC8vIH1cblxuXG5cblxuICAvKipcbiAqIFBpcGUgc3RhdGVtZW50cyBvZiBhbiBlbnRpdHlcbiAqL1xuICBAc3B5VGFnIHBpcGVTdGF0ZW1lbnRzKHBrRW50aXR5OiBudW1iZXIsIGlzT3V0Z29pbmcpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIGlzT3V0Z29pbmcgPyB0aGlzLnBpcGVPdXRnb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpIDogdGhpcy5waXBlSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpXG4gIH1cblxuXG4gIC8qKlxuICAqIFBpcGUgb3V0Z29pbmcgc3RhdGVtZW50cyBvZiBhbiBlbnRpdHlcbiAgKi9cbiAgQHNweVRhZyBwaXBlT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3QkKHsgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eSB9KVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSBpbmdvaW5nIHN0YXRlbWVudHMgb2YgYW4gZW50aXR5XG4gICAqL1xuICBAc3B5VGFnIHBpcGVJbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3QkKHsgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5IH0pXG4gIH1cblxuXG4gIHBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICAgIGZrX3Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICBma19wcm9wZXJ0eV9vZl9wcm9wZXJ0eTogbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eU9mUHJvcGVydHksXG4gICAgICAgIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgICAgZmtfcHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksXG4gICAgICAgIGZrX3Byb3BlcnR5X29mX3Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5T2ZQcm9wZXJ0eSxcbiAgICAgICAgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIG91dGdvaW5nIHN0YXRlbWVudHMgb2YgdGVtcG9yYWwgZW50aXR5XG4gICAqL1xuICBAc3B5VGFnIHBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KHBrUHJvcGVydHksIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICB9KVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIGluZ29pbmcgc3RhdGVtZW50cyBvZiBhbiBlbnRpdHlcbiAgICovXG4gIEBzcHlUYWcgcGlwZUluZ29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShwa1Byb3BlcnR5LCBwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgIGZrX29iamVjdF9pbmZvOiBwa0VudGl0eVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAqIFBpcGUgb3V0Z29pbmcgc3RhdGVtZW50cyBvZiB0ZW1wb3JhbCBlbnRpdHlcbiAqL1xuICBAc3B5VGFnIHBpcGVPdXRnb2luZ0Jhc2ljU3RhdGVtZW50SXRlbXNCeVByb3BlcnR5KHBrUHJvcGVydHksIHBrRW50aXR5LCBwa1Byb2plY3Q6IG51bWJlcik6IE9ic2VydmFibGU8QmFzaWNTdGF0ZW1lbnRJdGVtW10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgfSkucGlwZShcbiAgICAgIHN3aXRjaE1hcChzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBzdGF0ZW1lbnRzLm1hcChzdGF0ZW1lbnQgPT4gdGhpcy5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtKHBrUHJvamVjdCwgc3RhdGVtZW50LCB0cnVlKSlcbiAgICAgICkpXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBQaXBlIGluZ29pbmcgc3RhdGVtZW50cyBvZiBhbiBlbnRpdHlcbiAgICovXG4gIEBzcHlUYWcgcGlwZUluZ29pbmdCYXNpY1N0YXRlbWVudEl0ZW1zQnlQcm9wZXJ0eShwa1Byb3BlcnR5LCBwa0VudGl0eSwgcGtQcm9qZWN0OiBudW1iZXIpOiBPYnNlcnZhYmxlPEJhc2ljU3RhdGVtZW50SXRlbVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICBma19vYmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICB9KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PiB0aGlzLnBpcGVCYXNpY1N0YXRlbWVudEl0ZW0ocGtQcm9qZWN0LCBzdGF0ZW1lbnQsIGZhbHNlKSlcbiAgICAgICkpXG4gICAgKVxuICB9XG5cbiAgQHNweVRhZyBwcml2YXRlIHBpcGVCYXNpY1N0YXRlbWVudEl0ZW0ocGtQcm9qZWN0OiBudW1iZXIsIHN0YXRlbWVudDogSW5mU3RhdGVtZW50LCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxCYXNpY1N0YXRlbWVudEl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgc3RhdGVtZW50LnBrX2VudGl0eSkucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBtYXAocHJvalJlbCA9PiAoe1xuICAgICAgICBwcm9qUmVsLCBzdGF0ZW1lbnQsIGxhYmVsOiAnJywgb3JkTnVtOiAoaXNPdXRnb2luZyA/IHByb2pSZWwub3JkX251bV9vZl9yYW5nZSA6IHByb2pSZWwub3JkX251bV9vZl9kb21haW4pLCBpc091dGdvaW5nXG4gICAgICB9KSlcbiAgICApO1xuICB9XG5cbiAgQHNweVRhZyBwaXBlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1Byb2plY3Q6IG51bWJlciwgcGtTdGF0ZW1lbnQ6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8QmFzaWNTdGF0ZW1lbnRJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfcGtfZW50aXR5X2tleSQocGtTdGF0ZW1lbnQpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoc3RhdGVtZW50ID0+ICghc3RhdGVtZW50KSA/IG9mKHVuZGVmaW5lZCkgOiB0aGlzLnBpcGVCYXNpY1N0YXRlbWVudEl0ZW0ocGtQcm9qZWN0LCBzdGF0ZW1lbnQsIGlzT3V0Z29pbmcpKVxuICAgIClcbiAgfVxuXG5cbiAgQHNweVRhZyBwaXBlSW5mVGltZVByaW1pdGl2ZShwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxJbmZUaW1lUHJpbWl0aXZlPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShwa0VudGl0eSlcbiAgfVxuXG4gIC8qKlxuICAgKiBwaXBlcyB0aGUgVGltZVNwYW4gb2YgYSB0ZW1wb3JhbCBlbnRpdHlcbiAgICogQHBhcmFtIHBrRW50aXR5IHRoZSBwa19lbnRpdHkgb2YgdGhlIHRlcm1wb3JhbCBlbnRpdHlcbiAgICovXG4gIEBzcHlUYWcgcGlwZVRpbWVTcGFuKHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPFRpbWVTcGFuVXRpbD4ge1xuICAgIC8vIEdldCB0aGUgcHJvcGVydGllcyBsZWFkaW5nIHRvIHByZXNlbmNlc1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MiwgcGtFbnRpdHkpLnBpcGUodGhpcy50aW1lUHJpbWl0aXZlT2ZTdGF0ZW1lbnRzKCkpLFxuICAgICAgdGhpcy5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MSwgcGtFbnRpdHkpLnBpcGUodGhpcy50aW1lUHJpbWl0aXZlT2ZTdGF0ZW1lbnRzKCkpLFxuICAgICAgdGhpcy5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTAsIHBrRW50aXR5KS5waXBlKHRoaXMudGltZVByaW1pdGl2ZU9mU3RhdGVtZW50cygpKSxcbiAgICAgIHRoaXMucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUxLCBwa0VudGl0eSkucGlwZSh0aGlzLnRpbWVQcmltaXRpdmVPZlN0YXRlbWVudHMoKSksXG4gICAgICB0aGlzLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MiwgcGtFbnRpdHkpLnBpcGUodGhpcy50aW1lUHJpbWl0aXZlT2ZTdGF0ZW1lbnRzKCkpLFxuICAgICAgdGhpcy5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTMsIHBrRW50aXR5KS5waXBlKHRoaXMudGltZVByaW1pdGl2ZU9mU3RhdGVtZW50cygpKSxcblxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW183MiwgXzcxLCBfMTUwLCBfMTUxLCBfMTUyLCBfMTUzXSkgPT4gbmV3IFRpbWVTcGFuVXRpbCh7XG4gICAgICAgIHA4MjogXzcyLFxuICAgICAgICBwODE6IF83MSxcbiAgICAgICAgcDgyYTogXzE1MixcbiAgICAgICAgcDgxYTogXzE1MCxcbiAgICAgICAgcDgxYjogXzE1MSxcbiAgICAgICAgcDgyYjogXzE1MyxcbiAgICAgIH0pKSxcbiAgICApXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIG1heC4gb25lIHRpbWUgcHJpbWl0aXZlIGZvciBhbiBhcnJheSBvZiBzdGF0ZW1lbnRzLCBhc3N1bWluZyB0aGF0IHRoZSBzdGF0ZW1lbnRzXG4gICAqIGFyZSBvZiB0aGUgc2FtZSBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgdGltZVByaW1pdGl2ZU9mU3RhdGVtZW50cyA9ICgpID0+IHBpcGUoXG4gICAgbWFwKChyOiBJbmZTdGF0ZW1lbnRbXSkgPT4gclswXSksXG4gICAgc3dpdGNoTWFwKChyKSA9PiB7XG4gICAgICBpZiAoIXIpIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZClcbiAgICAgIHJldHVybiB0aGlzLnBpcGVJbmZUaW1lUHJpbWl0aXZlKHIuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoaW5mVGltZVByaW1pdGl2ZSkgPT4gdGhpcy5wLnBrUHJvamVjdCQucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKHBrUHJvamVjdCkgPT4gdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JFxuICAgICAgICAgICAgLmtleShwa1Byb2plY3QgKyAnXycgKyByWzBdLnBrX2VudGl0eSkucGlwZShcbiAgICAgICAgICAgICAgZmlsdGVyKHN0YXRlbWVudCA9PiAhIXN0YXRlbWVudCksXG4gICAgICAgICAgICAgIG1hcChpcHIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHk6IFRpbWVQcmltaXRpdmVXaXRoQ2FsID0ge1xuICAgICAgICAgICAgICAgICAgY2FsZW5kYXI6IChpcHIuY2FsZW5kYXIgPyBpcHIuY2FsZW5kYXIgOiAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlLFxuICAgICAgICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICkpXG4gICAgICAgICkpXG4gICAgICApXG4gICAgfSlcbiAgKVxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgZmtfY2xhc3Mgb2YgdGhlIGdpdmVuIGVudGl0eVxuICAgKi9cbiAgQHNweVRhZyBwaXBlQ2xhc3NPZkVudGl0eShwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gbWVyZ2UoXG4gICAgICB0aGlzLnMuaW5mJC5wZXJzaXN0ZW50X2l0ZW0kLmJ5X3BrX2VudGl0eV9rZXkkKHBrRW50aXR5KS5waXBlKFxuICAgICAgICBmaWx0ZXIoZSA9PiAhIWUpLFxuICAgICAgICBtYXAoZSA9PiBlLmZrX2NsYXNzKVxuICAgICAgKSxcbiAgICAgIHRoaXMucy5pbmYkLnRlbXBvcmFsX2VudGl0eSQuYnlfcGtfZW50aXR5X2tleSQocGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIGZpbHRlcihlID0+ICEhZSksXG4gICAgICAgIG1hcChlID0+IGUuZmtfY2xhc3MpXG4gICAgICApXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIGRpc3RpbmN0IGZrX2NsYXNzZXMgb2YgdGhlIGdpdmVuIHBlcnNpc3RlbnQgaXRlbXNcbiAgICovXG4gIEBzcHlUYWcgcGlwZUNsYXNzZXNPZlBlcnNpc3RlbnRJdGVtcyhwa0VudGl0aWVzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQucGVyc2lzdGVudF9pdGVtJC5ieV9wa19lbnRpdHlfYWxsJCgpLnBpcGUoXG4gICAgICBtYXAoKHBlSXRzKSA9PiB7XG4gICAgICAgIGlmICghcGtFbnRpdGllcyB8fCBwa0VudGl0aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSB7fTtcbiAgICAgICAgY29uc3QgYSA9IFtdO1xuICAgICAgICBwa0VudGl0aWVzLmZvckVhY2godHlwZVBrID0+IHtcbiAgICAgICAgICBpZiAoIWNsYXNzZXNbcGVJdHNbdHlwZVBrXS5ma19jbGFzc10pIHtcbiAgICAgICAgICAgIGNsYXNzZXNbcGVJdHNbdHlwZVBrXS5ma19jbGFzc10gPSB0cnVlO1xuICAgICAgICAgICAgYS5wdXNoKHBlSXRzW3R5cGVQa10uZmtfY2xhc3MpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYTtcbiAgICAgIH0pXG4gICAgKVxuXG4gIH1cblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogUmVwb1xuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgLyoqXG4gICAgKiBQaXBlIHJlcG8gb3V0Z29pbmcgc3RhdGVtZW50cy5cbiAgICAqL1xuICBAc3B5VGFnIHBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3QkKHsgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eSB9LCBmYWxzZSlcbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgcmVwbyBpbmdvaW5nIHN0YXRlbWVudHMuXG4gICovXG4gIEBzcHlUYWcgcGlwZVJlcG9JbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3QkKHsgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5IH0sIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAgKiBQaXBlIHJlcG8gb3V0Z29pbmcgc3RhdGVtZW50cy5cbiAgICAqIElmIG1heCBxdWFudGl0eSBpcyBsaW1pdGVkLCB0YWtlcyBvbmx5IG1heCBhbGxvd2VkIG51bWJlciBvZiBzdGF0ZW1lbnRzLCBzdGFydGluZyB3aXRoIGhpZ2hlc3QgaXNfaW5fcHJvamVjdF9jb3VudFxuICAgICovXG4gIEBzcHlUYWcgcGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KHBrUHJvcGVydHksIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X3BrX3Byb3BlcnR5JC5rZXkocGtQcm9wZXJ0eSlcbiAgICAgICAgLnBpcGUoZmlsdGVyKHggPT4gISF4ICYmIE9iamVjdC5rZXlzKHgpLmxlbmd0aCA+IDApLCBtYXAocCA9PiB2YWx1ZXMocClbMF0ucmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyKSksXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkXG4gICAgICAgIC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgICAgIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgICAgfSwgZmFsc2UpXG4gICAgICAvLyAucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW20sIHJzXSkgPT4ge1xuICAgICAgICBpZiAocnMubGVuZ3RoID09PSAwKSByZXR1cm4gcnM7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLnNvcnRTdGF0ZW1lbnRzQnlSZXBvUG9wdWxhcml0eShycyk7XG4gICAgICAgIHJldHVybiAobSA9PT0gLTEgfHwgbSA9PT0gbnVsbCkgPyByIDogci5zbGljZSgwLCBtKTtcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICogUGlwZSByZXBvIGluZ29pbmcgc3RhdGVtZW50cy5cbiAgKiBJZiBtYXggcXVhbnRpdHkgaXMgbGltaXRlZCwgdGFrZXMgb25seSBtYXggYWxsb3dlZCBudW1iZXIgb2Ygc3RhdGVtZW50cywgc3RhcnRpbmcgd2l0aCBoaWdoZXN0IGlzX2luX3Byb2plY3RfY291bnRcbiAgKi9cbiAgQHNweVRhZyBwaXBlUmVwb0luZ29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShwa1Byb3BlcnR5LCBwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9wa19wcm9wZXJ0eSQua2V5KHBrUHJvcGVydHkpXG4gICAgICAgIC5waXBlKGZpbHRlcih4ID0+ICEheCAmJiBPYmplY3Qua2V5cyh4KS5sZW5ndGggPiAwKSwgbWFwKHAgPT4gdmFsdWVzKHApWzBdLmRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXIpKSxcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCRcbiAgICAgICAgLmJ5X29iamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgICAgICBma19vYmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgICAgfSwgZmFsc2UpXG4gICAgICAvLyAucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW20sIHJzXSkgPT4ge1xuICAgICAgICBpZiAocnMubGVuZ3RoID09PSAwKSByZXR1cm4gcnM7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLnNvcnRTdGF0ZW1lbnRzQnlSZXBvUG9wdWxhcml0eShycyk7XG4gICAgICAgIHJldHVybiAobSA9PT0gLTEgfHwgbSA9PT0gbnVsbCkgPyByIDogci5zbGljZSgwLCBtKTtcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIEFsdGVybmF0aXZlcyAoUmVwbyBtaW51cyBQcm9qZWN0KVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgQHNweVRhZyBwaXBlQWx0ZXJuYXRpdmVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrU3RhdGVtZW50OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEJhc2ljU3RhdGVtZW50SXRlbT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9wa19lbnRpdHlfa2V5JChwa1N0YXRlbWVudCwgZmFsc2UpLFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9wa19lbnRpdHlfa2V5JChwa1N0YXRlbWVudCksXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoW2lucmVwb10pID0+ICEhaW5yZXBvKSxcbiAgICAgICAgbWFwKChbaW5yZXBvLCBpbnByb2plY3RdKSA9PiB7XG4gICAgICAgICAgaWYgKGlucHJvamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpOiBCYXNpY1N0YXRlbWVudEl0ZW0gPSB7XG4gICAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgc3RhdGVtZW50OiBpbnJlcG8sXG4gICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICBsYWJlbDogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cblxuICAvKipcbiAgICAgKiBQaXBlIGFsdGVybmF0aXZlIGluZ29pbmcgc3RhdGVtZW50cyAoPSBzdGF0ZW1lbnRzIG5vdCBpbiBhY3RpdmUgcHJvamVjdClcbiAgICAgKi9cbiAgQHNweVRhZyBwaXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhwa1Byb3BlcnR5LCBwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7XG4gICAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgICBma19vYmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgIH0sIGZhbHNlKSxcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7XG4gICAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgICBma19vYmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgIH0pLnBpcGUoXG4gICAgICAgIG1hcChpbnByb2plY3QgPT4gaW5wcm9qZWN0ID8gT2JqZWN0LmtleXMoaW5wcm9qZWN0KSA6IFtdKVxuICAgICAgKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW2lucmVwbywgaW5wcm9qZWN0XSkgPT4gb21pdChpbnByb2plY3QsIGlucmVwbykpLFxuICAgICAgbWFwKHN0YXRlbWVudHMgPT4gdmFsdWVzKHN0YXRlbWVudHMpKVxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgYWx0ZXJuYXRpdmUgb3V0Z29pbmcgc3RhdGVtZW50cyAoPSBzdGF0ZW1lbnRzIG5vdCBpbiBhY3RpdmUgcHJvamVjdClcbiAgICovXG4gIEBzcHlUYWcgcGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKHBrUHJvcGVydHksIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7XG4gICAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICB9LCBmYWxzZSksXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKHtcbiAgICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICAgIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgIH0pLnBpcGUoXG4gICAgICAgIG1hcChpbnByb2plY3QgPT4gaW5wcm9qZWN0ID8gT2JqZWN0LmtleXMoaW5wcm9qZWN0KSA6IFtdKVxuICAgICAgKSxcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFtpbnJlcG8sIGlucHJvamVjdF0pID0+IG9taXQoaW5wcm9qZWN0LCBpbnJlcG8pKSxcbiAgICAgIG1hcChzdGF0ZW1lbnRzID0+IHZhbHVlcyhzdGF0ZW1lbnRzKSlcbiAgICApXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIGdldCBhcnJheSBvZiBwa3Mgb2YgcGVyc2lzdGVudCBpdGVtcyBvZiBhIHNwZWNpZmljIGNsYXNzXG4gICAqL1xuICBAc3B5VGFnIHBpcGVQZXJzaXN0ZW50SXRlbVBrc0J5Q2xhc3MocGtDbGFzcyk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQucGVyc2lzdGVudF9pdGVtJC5ieV9ma19jbGFzc19rZXkkKHBrQ2xhc3MpLnBpcGUoXG4gICAgICBtYXAob2IgPT4ge1xuICAgICAgICBpZiAob2IpIHJldHVybiBPYmplY3Qua2V5cyhvYikubWFwKGsgPT4gcGFyc2VJbnQoaywgMTApKTtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXRzIHRoZSBjc3MgY2xhc3NlcyBmb3IgdGhhdCBlbnRpdHlcbiAgICogQHBhcmFtIHBrRW50aXR5XG4gICAqL1xuICBwaXBlSWNvblR5cGUocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8SWNvblR5cGU+IHtcblxuICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhwa0VudGl0eSkucGlwZShcbiAgICAgIG1hcChwcmV2aWV3ID0+IHtcbiAgICAgICAgaWYgKHByZXZpZXcuZW50aXR5X3R5cGUgPT0gJ3RlRW4nKSB7XG4gICAgICAgICAgcmV0dXJuICd0ZW1wb3JhbC1lbnRpdHknXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXZpZXcuZmtfY2xhc3MgPT09IERmaENvbmZpZy5DTEFTU19QS19FWFBSRVNTSU9OX1BPUlRJT04pIHtcbiAgICAgICAgICByZXR1cm4gJ2V4cHJlc3Npb24tcG9ydGlvbidcbiAgICAgICAgfSBlbHNlIGlmIChEZmhDb25maWcuQ0xBU1NfUEtTX1NPVVJDRV9QRV9JVC5pbmNsdWRlcyhwcmV2aWV3LmZrX2NsYXNzKSkge1xuICAgICAgICAgIHJldHVybiAnc291cmNlJ1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAncGVyc2lzdGVudC1lbnRpdHknXG4gICAgICB9KVxuICAgIClcblxuICB9XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIEhlbHBlcnNcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgc29ydFN0YXRlbWVudHNCeVJlcG9Qb3B1bGFyaXR5KHN0YXRlbWVudHM6IEluZlN0YXRlbWVudFtdKTogSW5mU3RhdGVtZW50W10ge1xuICAgIHJldHVybiBzdGF0ZW1lbnRzLnNvcnQoKGEsIGIpID0+IGEuaXNfaW5fcHJvamVjdF9jb3VudCA+IGIuaXNfaW5fcHJvamVjdF9jb3VudCA/IDEgOiAtMSlcbiAgfVxuXG5cblxufVxuIl19