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
import { BehaviorSubject, combineLatest, merge, Observable, of, pipe } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { spyTag } from '../decorators/method-decorators';
import { ActiveProjectPipesService } from './active-project-pipes.service';
import { SchemaSelectorsService } from './schema-selectors.service';
import * as i0 from "@angular/core";
import * as i1 from "./active-project-pipes.service";
import * as i2 from "./schema-selectors.service";
/**
 * This service contains a basic pipes for creating more complex
 * rxjs pipes. Each pipe takes non-observable parameters and
 * returns an observable. The method names are mainly
 * based on the type of the observable data
 */
export class InformationBasicPipesService {
    // infRepo: InfSelector;
    /**
     * @param {?} p
     * @param {?} s
     */
    constructor(p, s) {
        this.p = p;
        this.s = s;
        /**
         * Pipes max. one time primitive for an array of statements, assuming that the statements
         * are of the same properties.
         */
        this.timePrimitiveOfStatements = (/**
         * @return {?}
         */
        () => pipe(map((/**
         * @param {?} r
         * @return {?}
         */
        (r) => r[0])), switchMap((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            if (!r)
                return new BehaviorSubject(undefined);
            return this.pipeInfTimePrimitive(r.fk_object_info).pipe(switchMap((/**
             * @param {?} infTimePrimitive
             * @return {?}
             */
            (infTimePrimitive) => this.p.pkProject$.pipe(switchMap((/**
             * @param {?} pkProject
             * @return {?}
             */
            (pkProject) => this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$
                .key(pkProject + '_' + r[0].pk_entity).pipe(filter((/**
             * @param {?} statement
             * @return {?}
             */
            statement => !!statement)), map((/**
             * @param {?} ipr
             * @return {?}
             */
            ipr => {
                /** @type {?} */
                const y = {
                    calendar: (/** @type {?} */ ((ipr.calendar ? ipr.calendar : 'gregorian'))),
                    julianDay: infTimePrimitive.julian_day,
                    duration: (/** @type {?} */ (infTimePrimitive.duration))
                };
                return y;
            })))))))));
        }))));
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
     * @param {?} pkEntity
     * @param {?} isOutgoing
     * @return {?}
     */
    pipeStatements(pkEntity, isOutgoing) {
        return isOutgoing ? this.pipeOutgoingStatements(pkEntity) : this.pipeIngoingStatements(pkEntity);
    }
    /**
     * Pipe outgoing statements of an entity
     * @param {?} pkEntity
     * @return {?}
     */
    pipeOutgoingStatements(pkEntity) {
        return this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity });
    }
    /**
     * Pipe ingoing statements of an entity
     * @param {?} pkEntity
     * @return {?}
     */
    pipeIngoingStatements(pkEntity) {
        return this.s.inf$.statement$.by_object$({ fk_object_info: pkEntity });
    }
    // pipeStatementsOfList(listDefinition: Subfield, pkEntity): Observable<InfStatement[]> {
    //   if (listDefinition.isOutgoing) {
    //     return this.s.inf$.statement$.by_subject_and_property$({
    //       fk_property: listDefinition.property.pkProperty,
    //       fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
    //       fk_subject_info: pkEntity
    //     })
    //   } else {
    //     return this.s.inf$.statement$.by_object_and_property$({
    //       fk_property: listDefinition.property.pkProperty,
    //       fk_property_of_property: listDefinition.property.pkPropertyOfProperty,
    //       fk_object_info: pkEntity
    //     })
    //   }
    // }
    /**
     * Pipe outgoing statements of temporal entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    pipeOutgoingStatementsByProperty(pkProperty, pkEntity) {
        return this.s.inf$.statement$.by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        });
    }
    /**
     * Pipe ingoing statements of an entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    pipeIngoingStatementsByProperty(pkProperty, pkEntity) {
        return this.s.inf$.statement$.by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        });
    }
    /**
     * Pipe outgoing statements of temporal entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    pipeOutgoingBasicStatementItemsByProperty(pkProperty, pkEntity, pkProject) {
        return this.s.inf$.statement$.by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        statements => combineLatestOrEmpty(statements.map((/**
         * @param {?} statement
         * @return {?}
         */
        statement => this.pipeBasicStatementItem(pkProject, statement, true)))))));
    }
    /**
     * Pipe ingoing statements of an entity
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @param {?} pkProject
     * @return {?}
     */
    pipeIngoingBasicStatementItemsByProperty(pkProperty, pkEntity, pkProject) {
        return this.s.inf$.statement$.by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }).pipe(switchMap((/**
         * @param {?} statements
         * @return {?}
         */
        statements => combineLatestOrEmpty(statements.map((/**
         * @param {?} statement
         * @return {?}
         */
        statement => this.pipeBasicStatementItem(pkProject, statement, false)))))));
    }
    /**
     * @private
     * @param {?} pkProject
     * @param {?} statement
     * @param {?} isOutgoing
     * @return {?}
     */
    pipeBasicStatementItem(pkProject, statement, isOutgoing) {
        return this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x)), map((/**
         * @param {?} projRel
         * @return {?}
         */
        projRel => ({
            projRel, statement, label: '', ordNum: (isOutgoing ? projRel.ord_num_of_range : projRel.ord_num_of_domain), isOutgoing
        }))));
    }
    /**
     * @param {?} pkProject
     * @param {?} pkStatement
     * @param {?} isOutgoing
     * @return {?}
     */
    pipeBasicStatementItemByPkStatement(pkProject, pkStatement, isOutgoing) {
        return this.s.inf$.statement$.by_pk_entity_key$(pkStatement).pipe(switchMap((/**
         * @param {?} statement
         * @return {?}
         */
        statement => (!statement) ? of(undefined) : this.pipeBasicStatementItem(pkProject, statement, isOutgoing))));
    }
    /**
     * @param {?} pkEntity
     * @return {?}
     */
    pipeInfTimePrimitive(pkEntity) {
        return this.s.inf$.time_primitive$.by_pk_entity$.key(pkEntity);
    }
    /**
     * pipes the TimeSpan of a temporal entity
     * @param {?} pkEntity the pk_entity of the termporal entity
     * @return {?}
     */
    pipeTimeSpan(pkEntity) {
        // Get the properties leading to presences
        return combineLatest(this.pipeOutgoingStatementsByProperty(72, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(71, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(150, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(151, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(152, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(153, pkEntity).pipe(this.timePrimitiveOfStatements())).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([_72, _71, _150, _151, _152, _153]) => new TimeSpanUtil({
            p82: _72,
            p81: _71,
            p82a: _152,
            p81a: _150,
            p81b: _151,
            p82b: _153,
        }))));
    }
    /**
     * Pipes the fk_class of the given entity
     * @param {?} pkEntity
     * @return {?}
     */
    pipeClassOfEntity(pkEntity) {
        return merge(this.s.inf$.persistent_item$.by_pk_entity_key$(pkEntity).pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => !!e)), map((/**
         * @param {?} e
         * @return {?}
         */
        e => e.fk_class))), this.s.inf$.temporal_entity$.by_pk_entity_key$(pkEntity).pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => !!e)), map((/**
         * @param {?} e
         * @return {?}
         */
        e => e.fk_class))));
    }
    /**
     * Pipes distinct fk_classes of the given persistent items
     * @param {?} pkEntities
     * @return {?}
     */
    pipeClassesOfPersistentItems(pkEntities) {
        return this.s.inf$.persistent_item$.by_pk_entity_all$().pipe(map((/**
         * @param {?} peIts
         * @return {?}
         */
        (peIts) => {
            if (!pkEntities || pkEntities.length === 0) {
                return [];
            }
            /** @type {?} */
            const classes = {};
            /** @type {?} */
            const a = [];
            pkEntities.forEach((/**
             * @param {?} typePk
             * @return {?}
             */
            typePk => {
                if (!classes[peIts[typePk].fk_class]) {
                    classes[peIts[typePk].fk_class] = true;
                    a.push(peIts[typePk].fk_class);
                }
            }));
            return a;
        })));
    }
    /*********************************************************************
       * Repo
      *********************************************************************/
    /**
     * Pipe repo outgoing statements.
     * @param {?} pkEntity
     * @return {?}
     */
    pipeRepoOutgoingStatements(pkEntity) {
        return this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity }, false);
    }
    /**
     * Pipe repo ingoing statements.
     * @param {?} pkEntity
     * @return {?}
     */
    pipeRepoIngoingStatements(pkEntity) {
        return this.s.inf$.statement$.by_object$({ fk_object_info: pkEntity }, false);
    }
    /**
     * Pipe repo outgoing statements.
     * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    pipeRepoOutgoingStatementsByProperty(pkProperty, pkEntity) {
        return combineLatest(this.s.dfh$.property$.by_pk_property$.key(pkProperty)
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x && Object.keys(x).length > 0)), map((/**
         * @param {?} p
         * @return {?}
         */
        p => values(p)[0].range_instances_max_quantifier))), this.s.inf$.statement$
            .by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }, false)
        // .pipe(filter(x => !!x))
        ).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([m, rs]) => {
            if (rs.length === 0)
                return rs;
            /** @type {?} */
            const r = this.sortStatementsByRepoPopularity(rs);
            return (m === -1 || m === null) ? r : r.slice(0, m);
        })));
    }
    /**
     * Pipe repo ingoing statements.
     * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    pipeRepoIngoingStatementsByProperty(pkProperty, pkEntity) {
        return combineLatest(this.s.dfh$.property$.by_pk_property$.key(pkProperty)
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x && Object.keys(x).length > 0)), map((/**
         * @param {?} p
         * @return {?}
         */
        p => values(p)[0].domain_instances_max_quantifier))), this.s.inf$.statement$
            .by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }, false)
        // .pipe(filter(x => !!x))
        ).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([m, rs]) => {
            if (rs.length === 0)
                return rs;
            /** @type {?} */
            const r = this.sortStatementsByRepoPopularity(rs);
            return (m === -1 || m === null) ? r : r.slice(0, m);
        })));
    }
    /**
     * ******************************************************************
     * Alternatives (Repo minus Project)
     * *******************************************************************
     * @param {?} pkStatement
     * @param {?} isOutgoing
     * @return {?}
     */
    pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) {
        return combineLatest(this.s.inf$.statement$.by_pk_entity_key$(pkStatement, false), this.s.inf$.statement$.by_pk_entity_key$(pkStatement))
            .pipe(filter((/**
         * @param {?} __0
         * @return {?}
         */
        ([inrepo]) => !!inrepo)), map((/**
         * @param {?} __0
         * @return {?}
         */
        ([inrepo, inproject]) => {
            if (inproject) {
                return undefined;
            }
            else {
                /** @type {?} */
                const i = {
                    projRel: undefined,
                    statement: inrepo,
                    ordNum: undefined,
                    isOutgoing,
                    label: ''
                };
                return i;
            }
        })));
    }
    /**
     * Pipe alternative ingoing statements (= statements not in active project)
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    pipeAlternativeIngoingStatements(pkProperty, pkEntity) {
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
        inproject => inproject ? Object.keys(inproject) : [])))).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([inrepo, inproject]) => omit(inproject, inrepo))), map((/**
         * @param {?} statements
         * @return {?}
         */
        statements => values(statements))));
    }
    /**
     * Pipe alternative outgoing statements (= statements not in active project)
     * @param {?} pkProperty
     * @param {?} pkEntity
     * @return {?}
     */
    pipeAlternativeOutgoingStatements(pkProperty, pkEntity) {
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
        inproject => inproject ? Object.keys(inproject) : [])))).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([inrepo, inproject]) => omit(inproject, inrepo))), map((/**
         * @param {?} statements
         * @return {?}
         */
        statements => values(statements))));
    }
    /**
     * get array of pks of persistent items of a specific class
     * @param {?} pkClass
     * @return {?}
     */
    pipePersistentItemPksByClass(pkClass) {
        return this.s.inf$.persistent_item$.by_fk_class_key$(pkClass).pipe(map((/**
         * @param {?} ob
         * @return {?}
         */
        ob => {
            if (ob)
                return Object.keys(ob).map((/**
                 * @param {?} k
                 * @return {?}
                 */
                k => parseInt(k, 10)));
            return [];
        })));
    }
    /**
     * gets the css classes for that entity
     * @param {?} pkEntity
     * @return {?}
     */
    pipeIconType(pkEntity) {
        return this.p.streamEntityPreview(pkEntity).pipe(map((/**
         * @param {?} preview
         * @return {?}
         */
        preview => {
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
    }
    /**
     * ******************************************************************
     * Helpers
     * *******************************************************************
     * @param {?} statements
     * @return {?}
     */
    sortStatementsByRepoPopularity(statements) {
        return statements.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a.is_in_project_count > b.is_in_project_count ? 1 : -1));
    }
}
InformationBasicPipesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
InformationBasicPipesService.ctorParameters = () => [
    { type: ActiveProjectPipesService },
    { type: SchemaSelectorsService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tYmFzaWMtcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy8iLCJzb3VyY2VzIjpbImxpYi9xdWVyaWVzL3NlcnZpY2VzL2luZm9ybWF0aW9uLWJhc2ljLXBpcGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFakQsT0FBTyxFQUFFLFlBQVksRUFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUV2RSxPQUFPLEVBQWdCLG9CQUFvQixFQUFlLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BHLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRixPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFekQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7QUFRcEU7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8sNEJBQTRCOzs7Ozs7SUFHdkMsWUFDVSxDQUE0QixFQUM1QixDQUF5QjtRQUR6QixNQUFDLEdBQUQsQ0FBQyxDQUEyQjtRQUM1QixNQUFDLEdBQUQsQ0FBQyxDQUF3Qjs7Ozs7UUF3S25DLDhCQUF5Qjs7O1FBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUNwQyxH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UCxNQUFNOzs7NENBQTBELFVBQVU7cUZBZ0IxRTtBQU9PO0lBQVAsTUFBTTs7OzRDQUF3QyxVQUFVO2dGQU14RDs7Ozs7OztJQW5ORCxpRUFxQkM7Ozs7O0lBOUxDLHlDQUFvQzs7Ozs7SUFDcEMseUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGZoQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgSWNvblR5cGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IEluZlN0YXRlbWVudCwgSW5mVGltZVByaW1pdGl2ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBUaW1lUHJpbWl0aXZlV2l0aENhbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBDYWxlbmRhclR5cGUsIGNvbWJpbmVMYXRlc3RPckVtcHR5LCBHcmFudWxhcml0eSwgVGltZVNwYW5VdGlsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBvbWl0LCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIG1lcmdlLCBPYnNlcnZhYmxlLCBvZiwgcGlwZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHNweVRhZyB9IGZyb20gJy4uL2RlY29yYXRvcnMvbWV0aG9kLWRlY29yYXRvcnMnO1xuaW1wb3J0IHsgQmFzaWNTdGF0ZW1lbnRJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL0Jhc2ljU3RhdGVtZW50SXRlbSc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5cblxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgY29udGFpbnMgYSBiYXNpYyBwaXBlcyBmb3IgY3JlYXRpbmcgbW9yZSBjb21wbGV4XG4gKiByeGpzIHBpcGVzLiBFYWNoIHBpcGUgdGFrZXMgbm9uLW9ic2VydmFibGUgcGFyYW1ldGVycyBhbmRcbiAqIHJldHVybnMgYW4gb2JzZXJ2YWJsZS4gVGhlIG1ldGhvZCBuYW1lcyBhcmUgbWFpbmx5XG4gKiBiYXNlZCBvbiB0aGUgdHlwZSBvZiB0aGUgb2JzZXJ2YWJsZSBkYXRhXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZvcm1hdGlvbkJhc2ljUGlwZXNTZXJ2aWNlIHtcbiAgLy8gaW5mUmVwbzogSW5mU2VsZWN0b3I7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwOiBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgKSB7IH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIFByb2plY3RcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8vIEBzcHlUYWcgcGlwZVJlbGF0ZWRUZW1wb3JhbEVudGl0aWVzKHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPEluZlRlbXBvcmFsRW50aXR5W10+IHtcbiAgLy8gICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JFxuICAvLyAgICAgLmJ5X29iamVjdCQoeyBma19vYmplY3RfaW5mbzogcGtFbnRpdHkgfSlcbiAgLy8gICAgIC5waXBlKFxuICAvLyAgICAgICBhdWRpdFRpbWUoMSksXG4gIC8vICAgICAgIHN3aXRjaE1hcE9yKFtdLCAoc3RhdGVtZW50cykgPT4gY29tYmluZUxhdGVzdChcbiAgLy8gICAgICAgICBzdGF0ZW1lbnRzLm1hcChzdGF0ZW1lbnQgPT4gdGhpcy5zLmluZiQudGVtcG9yYWxfZW50aXR5JC5ieV9wa19lbnRpdHlfa2V5JChzdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKS5waXBlKFxuICAvLyAgICAgICAgICkpXG4gIC8vICAgICAgICkucGlwZShcbiAgLy8gICAgICAgICBtYXAoeCA9PiB4LmZpbHRlcigoeSkgPT4gISF5KSksXG4gIC8vICAgICAgICkpLFxuICAvLyAgICAgKVxuICAvLyB9XG5cblxuXG5cbiAgLyoqXG4gKiBQaXBlIHN0YXRlbWVudHMgb2YgYW4gZW50aXR5XG4gKi9cbiAgQHNweVRhZyBwaXBlU3RhdGVtZW50cyhwa0VudGl0eTogbnVtYmVyLCBpc091dGdvaW5nKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiBpc091dGdvaW5nID8gdGhpcy5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KSA6IHRoaXMucGlwZUluZ29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KVxuICB9XG5cblxuICAvKipcbiAgKiBQaXBlIG91dGdvaW5nIHN0YXRlbWVudHMgb2YgYW4gZW50aXR5XG4gICovXG4gIEBzcHlUYWcgcGlwZU91dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0JCh7IGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHkgfSlcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgaW5nb2luZyBzdGF0ZW1lbnRzIG9mIGFuIGVudGl0eVxuICAgKi9cbiAgQHNweVRhZyBwaXBlSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0JCh7IGZrX29iamVjdF9pbmZvOiBwa0VudGl0eSB9KVxuICB9XG5cblxuICAvLyBwaXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAvLyAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAvLyAgICAgICBma19wcm9wZXJ0eTogbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgLy8gICAgICAgZmtfcHJvcGVydHlfb2ZfcHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHlPZlByb3BlcnR5LFxuICAvLyAgICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gIC8vICAgICB9KVxuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gIC8vICAgICAgIGZrX3Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAvLyAgICAgICBma19wcm9wZXJ0eV9vZl9wcm9wZXJ0eTogbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eU9mUHJvcGVydHksXG4gIC8vICAgICAgIGZrX29iamVjdF9pbmZvOiBwa0VudGl0eVxuICAvLyAgICAgfSlcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvKipcbiAgICogUGlwZSBvdXRnb2luZyBzdGF0ZW1lbnRzIG9mIHRlbXBvcmFsIGVudGl0eVxuICAgKi9cbiAgQHNweVRhZyBwaXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShwa1Byb3BlcnR5LCBwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgfSlcblxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSBpbmdvaW5nIHN0YXRlbWVudHMgb2YgYW4gZW50aXR5XG4gICAqL1xuICBAc3B5VGFnIHBpcGVJbmdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkocGtQcm9wZXJ0eSwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICBma19vYmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gKiBQaXBlIG91dGdvaW5nIHN0YXRlbWVudHMgb2YgdGVtcG9yYWwgZW50aXR5XG4gKi9cbiAgQHNweVRhZyBwaXBlT3V0Z29pbmdCYXNpY1N0YXRlbWVudEl0ZW1zQnlQcm9wZXJ0eShwa1Byb3BlcnR5LCBwa0VudGl0eSwgcGtQcm9qZWN0OiBudW1iZXIpOiBPYnNlcnZhYmxlPEJhc2ljU3RhdGVtZW50SXRlbVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eVxuICAgIH0pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgc3RhdGVtZW50cy5tYXAoc3RhdGVtZW50ID0+IHRoaXMucGlwZUJhc2ljU3RhdGVtZW50SXRlbShwa1Byb2plY3QsIHN0YXRlbWVudCwgdHJ1ZSkpXG4gICAgICApKVxuICAgIClcbiAgfVxuXG5cblxuICAvKipcbiAgICogUGlwZSBpbmdvaW5nIHN0YXRlbWVudHMgb2YgYW4gZW50aXR5XG4gICAqL1xuICBAc3B5VGFnIHBpcGVJbmdvaW5nQmFzaWNTdGF0ZW1lbnRJdGVtc0J5UHJvcGVydHkocGtQcm9wZXJ0eSwgcGtFbnRpdHksIHBrUHJvamVjdDogbnVtYmVyKTogT2JzZXJ2YWJsZTxCYXNpY1N0YXRlbWVudEl0ZW1bXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5XG4gICAgfSkucGlwZShcbiAgICAgIHN3aXRjaE1hcChzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBzdGF0ZW1lbnRzLm1hcChzdGF0ZW1lbnQgPT4gdGhpcy5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtKHBrUHJvamVjdCwgc3RhdGVtZW50LCBmYWxzZSkpXG4gICAgICApKVxuICAgIClcbiAgfVxuXG4gIEBzcHlUYWcgcHJpdmF0ZSBwaXBlQmFzaWNTdGF0ZW1lbnRJdGVtKHBrUHJvamVjdDogbnVtYmVyLCBzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8QmFzaWNTdGF0ZW1lbnRJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHN0YXRlbWVudC5wa19lbnRpdHkpLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgbWFwKHByb2pSZWwgPT4gKHtcbiAgICAgICAgcHJvalJlbCwgc3RhdGVtZW50LCBsYWJlbDogJycsIG9yZE51bTogKGlzT3V0Z29pbmcgPyBwcm9qUmVsLm9yZF9udW1fb2ZfcmFuZ2UgOiBwcm9qUmVsLm9yZF9udW1fb2ZfZG9tYWluKSwgaXNPdXRnb2luZ1xuICAgICAgfSkpXG4gICAgKTtcbiAgfVxuXG4gIEBzcHlUYWcgcGlwZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtQcm9qZWN0OiBudW1iZXIsIHBrU3RhdGVtZW50OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEJhc2ljU3RhdGVtZW50SXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3BrX2VudGl0eV9rZXkkKHBrU3RhdGVtZW50KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKHN0YXRlbWVudCA9PiAoIXN0YXRlbWVudCkgPyBvZih1bmRlZmluZWQpIDogdGhpcy5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtKHBrUHJvamVjdCwgc3RhdGVtZW50LCBpc091dGdvaW5nKSlcbiAgICApXG4gIH1cblxuXG4gIEBzcHlUYWcgcGlwZUluZlRpbWVQcmltaXRpdmUocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8SW5mVGltZVByaW1pdGl2ZT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkocGtFbnRpdHkpXG4gIH1cblxuICAvKipcbiAgICogcGlwZXMgdGhlIFRpbWVTcGFuIG9mIGEgdGVtcG9yYWwgZW50aXR5XG4gICAqIEBwYXJhbSBwa0VudGl0eSB0aGUgcGtfZW50aXR5IG9mIHRoZSB0ZXJtcG9yYWwgZW50aXR5XG4gICAqL1xuICBAc3B5VGFnIHBpcGVUaW1lU3Bhbihwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxUaW1lU3BhblV0aWw+IHtcbiAgICAvLyBHZXQgdGhlIHByb3BlcnRpZXMgbGVhZGluZyB0byBwcmVzZW5jZXNcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoNzIsIHBrRW50aXR5KS5waXBlKHRoaXMudGltZVByaW1pdGl2ZU9mU3RhdGVtZW50cygpKSxcbiAgICAgIHRoaXMucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoNzEsIHBrRW50aXR5KS5waXBlKHRoaXMudGltZVByaW1pdGl2ZU9mU3RhdGVtZW50cygpKSxcbiAgICAgIHRoaXMucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUwLCBwa0VudGl0eSkucGlwZSh0aGlzLnRpbWVQcmltaXRpdmVPZlN0YXRlbWVudHMoKSksXG4gICAgICB0aGlzLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MSwgcGtFbnRpdHkpLnBpcGUodGhpcy50aW1lUHJpbWl0aXZlT2ZTdGF0ZW1lbnRzKCkpLFxuICAgICAgdGhpcy5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTIsIHBrRW50aXR5KS5waXBlKHRoaXMudGltZVByaW1pdGl2ZU9mU3RhdGVtZW50cygpKSxcbiAgICAgIHRoaXMucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUzLCBwa0VudGl0eSkucGlwZSh0aGlzLnRpbWVQcmltaXRpdmVPZlN0YXRlbWVudHMoKSksXG5cbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFtfNzIsIF83MSwgXzE1MCwgXzE1MSwgXzE1MiwgXzE1M10pID0+IG5ldyBUaW1lU3BhblV0aWwoe1xuICAgICAgICBwODI6IF83MixcbiAgICAgICAgcDgxOiBfNzEsXG4gICAgICAgIHA4MmE6IF8xNTIsXG4gICAgICAgIHA4MWE6IF8xNTAsXG4gICAgICAgIHA4MWI6IF8xNTEsXG4gICAgICAgIHA4MmI6IF8xNTMsXG4gICAgICB9KSksXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBQaXBlcyBtYXguIG9uZSB0aW1lIHByaW1pdGl2ZSBmb3IgYW4gYXJyYXkgb2Ygc3RhdGVtZW50cywgYXNzdW1pbmcgdGhhdCB0aGUgc3RhdGVtZW50c1xuICAgKiBhcmUgb2YgdGhlIHNhbWUgcHJvcGVydGllcy5cbiAgICovXG4gIHRpbWVQcmltaXRpdmVPZlN0YXRlbWVudHMgPSAoKSA9PiBwaXBlKFxuICAgIG1hcCgocjogSW5mU3RhdGVtZW50W10pID0+IHJbMF0pLFxuICAgIHN3aXRjaE1hcCgocikgPT4ge1xuICAgICAgaWYgKCFyKSByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpXG4gICAgICByZXR1cm4gdGhpcy5waXBlSW5mVGltZVByaW1pdGl2ZShyLmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGluZlRpbWVQcmltaXRpdmUpID0+IHRoaXMucC5wa1Byb2plY3QkLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKChwa1Byb2plY3QpID0+IHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSRcbiAgICAgICAgICAgIC5rZXkocGtQcm9qZWN0ICsgJ18nICsgclswXS5wa19lbnRpdHkpLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlcihzdGF0ZW1lbnQgPT4gISFzdGF0ZW1lbnQpLFxuICAgICAgICAgICAgICBtYXAoaXByID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB5OiBUaW1lUHJpbWl0aXZlV2l0aENhbCA9IHtcbiAgICAgICAgICAgICAgICAgIGNhbGVuZGFyOiAoaXByLmNhbGVuZGFyID8gaXByLmNhbGVuZGFyIDogJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSxcbiAgICAgICAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApKVxuICAgICAgICApKVxuICAgICAgKVxuICAgIH0pXG4gIClcblxuICAvKipcbiAgICogUGlwZXMgdGhlIGZrX2NsYXNzIG9mIHRoZSBnaXZlbiBlbnRpdHlcbiAgICovXG4gIEBzcHlUYWcgcGlwZUNsYXNzT2ZFbnRpdHkocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIG1lcmdlKFxuICAgICAgdGhpcy5zLmluZiQucGVyc2lzdGVudF9pdGVtJC5ieV9wa19lbnRpdHlfa2V5JChwa0VudGl0eSkucGlwZShcbiAgICAgICAgZmlsdGVyKGUgPT4gISFlKSxcbiAgICAgICAgbWFwKGUgPT4gZS5ma19jbGFzcylcbiAgICAgICksXG4gICAgICB0aGlzLnMuaW5mJC50ZW1wb3JhbF9lbnRpdHkkLmJ5X3BrX2VudGl0eV9rZXkkKHBrRW50aXR5KS5waXBlKFxuICAgICAgICBmaWx0ZXIoZSA9PiAhIWUpLFxuICAgICAgICBtYXAoZSA9PiBlLmZrX2NsYXNzKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyBkaXN0aW5jdCBma19jbGFzc2VzIG9mIHRoZSBnaXZlbiBwZXJzaXN0ZW50IGl0ZW1zXG4gICAqL1xuICBAc3B5VGFnIHBpcGVDbGFzc2VzT2ZQZXJzaXN0ZW50SXRlbXMocGtFbnRpdGllczogbnVtYmVyW10pOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnBlcnNpc3RlbnRfaXRlbSQuYnlfcGtfZW50aXR5X2FsbCQoKS5waXBlKFxuICAgICAgbWFwKChwZUl0cykgPT4ge1xuICAgICAgICBpZiAoIXBrRW50aXRpZXMgfHwgcGtFbnRpdGllcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gW11cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbGFzc2VzID0ge307XG4gICAgICAgIGNvbnN0IGEgPSBbXTtcbiAgICAgICAgcGtFbnRpdGllcy5mb3JFYWNoKHR5cGVQayA9PiB7XG4gICAgICAgICAgaWYgKCFjbGFzc2VzW3BlSXRzW3R5cGVQa10uZmtfY2xhc3NdKSB7XG4gICAgICAgICAgICBjbGFzc2VzW3BlSXRzW3R5cGVQa10uZmtfY2xhc3NdID0gdHJ1ZTtcbiAgICAgICAgICAgIGEucHVzaChwZUl0c1t0eXBlUGtdLmZrX2NsYXNzKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9KVxuICAgIClcblxuICB9XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIFJlcG9cbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8qKlxuICAgICogUGlwZSByZXBvIG91dGdvaW5nIHN0YXRlbWVudHMuXG4gICAgKi9cbiAgQHNweVRhZyBwaXBlUmVwb091dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0JCh7IGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHkgfSwgZmFsc2UpXG4gIH1cblxuICAvKipcbiAgKiBQaXBlIHJlcG8gaW5nb2luZyBzdGF0ZW1lbnRzLlxuICAqL1xuICBAc3B5VGFnIHBpcGVSZXBvSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0JCh7IGZrX29iamVjdF9pbmZvOiBwa0VudGl0eSB9LCBmYWxzZSlcbiAgfVxuXG4gIC8qKlxuICAgICogUGlwZSByZXBvIG91dGdvaW5nIHN0YXRlbWVudHMuXG4gICAgKiBJZiBtYXggcXVhbnRpdHkgaXMgbGltaXRlZCwgdGFrZXMgb25seSBtYXggYWxsb3dlZCBudW1iZXIgb2Ygc3RhdGVtZW50cywgc3RhcnRpbmcgd2l0aCBoaWdoZXN0IGlzX2luX3Byb2plY3RfY291bnRcbiAgICAqL1xuICBAc3B5VGFnIHBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShwa1Byb3BlcnR5LCBwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9wa19wcm9wZXJ0eSQua2V5KHBrUHJvcGVydHkpXG4gICAgICAgIC5waXBlKGZpbHRlcih4ID0+ICEheCAmJiBPYmplY3Qua2V5cyh4KS5sZW5ndGggPiAwKSwgbWFwKHAgPT4gdmFsdWVzKHApWzBdLnJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcikpLFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JFxuICAgICAgICAuYnlfc3ViamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICAgIH0sIGZhbHNlKVxuICAgICAgLy8gLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFttLCByc10pID0+IHtcbiAgICAgICAgaWYgKHJzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJzO1xuICAgICAgICBjb25zdCByID0gdGhpcy5zb3J0U3RhdGVtZW50c0J5UmVwb1BvcHVsYXJpdHkocnMpO1xuICAgICAgICByZXR1cm4gKG0gPT09IC0xIHx8IG0gPT09IG51bGwpID8gciA6IHIuc2xpY2UoMCwgbSk7XG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgcmVwbyBpbmdvaW5nIHN0YXRlbWVudHMuXG4gICogSWYgbWF4IHF1YW50aXR5IGlzIGxpbWl0ZWQsIHRha2VzIG9ubHkgbWF4IGFsbG93ZWQgbnVtYmVyIG9mIHN0YXRlbWVudHMsIHN0YXJ0aW5nIHdpdGggaGlnaGVzdCBpc19pbl9wcm9qZWN0X2NvdW50XG4gICovXG4gIEBzcHlUYWcgcGlwZVJlcG9JbmdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkocGtQcm9wZXJ0eSwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfcGtfcHJvcGVydHkkLmtleShwa1Byb3BlcnR5KVxuICAgICAgICAucGlwZShmaWx0ZXIoeCA9PiAhIXggJiYgT2JqZWN0LmtleXMoeCkubGVuZ3RoID4gMCksIG1hcChwID0+IHZhbHVlcyhwKVswXS5kb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyKSksXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkXG4gICAgICAgIC5ieV9vYmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICAgICAgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICAgIH0sIGZhbHNlKVxuICAgICAgLy8gLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFttLCByc10pID0+IHtcbiAgICAgICAgaWYgKHJzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJzO1xuICAgICAgICBjb25zdCByID0gdGhpcy5zb3J0U3RhdGVtZW50c0J5UmVwb1BvcHVsYXJpdHkocnMpO1xuICAgICAgICByZXR1cm4gKG0gPT09IC0xIHx8IG0gPT09IG51bGwpID8gciA6IHIuc2xpY2UoMCwgbSk7XG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBBbHRlcm5hdGl2ZXMgKFJlcG8gbWludXMgUHJvamVjdClcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIEBzcHlUYWcgcGlwZUFsdGVybmF0aXZlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1N0YXRlbWVudDogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxCYXNpY1N0YXRlbWVudEl0ZW0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfcGtfZW50aXR5X2tleSQocGtTdGF0ZW1lbnQsIGZhbHNlKSxcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfcGtfZW50aXR5X2tleSQocGtTdGF0ZW1lbnQpLFxuICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKFtpbnJlcG9dKSA9PiAhIWlucmVwbyksXG4gICAgICAgIG1hcCgoW2lucmVwbywgaW5wcm9qZWN0XSkgPT4ge1xuICAgICAgICAgIGlmIChpbnByb2plY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaTogQmFzaWNTdGF0ZW1lbnRJdGVtID0ge1xuICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHN0YXRlbWVudDogaW5yZXBvLFxuICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgbGFiZWw6ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAgICogUGlwZSBhbHRlcm5hdGl2ZSBpbmdvaW5nIHN0YXRlbWVudHMgKD0gc3RhdGVtZW50cyBub3QgaW4gYWN0aXZlIHByb2plY3QpXG4gICAgICovXG4gIEBzcHlUYWcgcGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMocGtQcm9wZXJ0eSwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoe1xuICAgICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgICAgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICB9LCBmYWxzZSksXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoe1xuICAgICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgICAgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICB9KS5waXBlKFxuICAgICAgICBtYXAoaW5wcm9qZWN0ID0+IGlucHJvamVjdCA/IE9iamVjdC5rZXlzKGlucHJvamVjdCkgOiBbXSlcbiAgICAgIClcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFtpbnJlcG8sIGlucHJvamVjdF0pID0+IG9taXQoaW5wcm9qZWN0LCBpbnJlcG8pKSxcbiAgICAgIG1hcChzdGF0ZW1lbnRzID0+IHZhbHVlcyhzdGF0ZW1lbnRzKSlcbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIGFsdGVybmF0aXZlIG91dGdvaW5nIHN0YXRlbWVudHMgKD0gc3RhdGVtZW50cyBub3QgaW4gYWN0aXZlIHByb2plY3QpXG4gICAqL1xuICBAc3B5VGFnIHBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhwa1Byb3BlcnR5LCBwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoe1xuICAgICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgICAgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eVxuICAgICAgfSwgZmFsc2UpLFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7XG4gICAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICB9KS5waXBlKFxuICAgICAgICBtYXAoaW5wcm9qZWN0ID0+IGlucHJvamVjdCA/IE9iamVjdC5rZXlzKGlucHJvamVjdCkgOiBbXSlcbiAgICAgICksXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbaW5yZXBvLCBpbnByb2plY3RdKSA9PiBvbWl0KGlucHJvamVjdCwgaW5yZXBvKSksXG4gICAgICBtYXAoc3RhdGVtZW50cyA9PiB2YWx1ZXMoc3RhdGVtZW50cykpXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBnZXQgYXJyYXkgb2YgcGtzIG9mIHBlcnNpc3RlbnQgaXRlbXMgb2YgYSBzcGVjaWZpYyBjbGFzc1xuICAgKi9cbiAgQHNweVRhZyBwaXBlUGVyc2lzdGVudEl0ZW1Qa3NCeUNsYXNzKHBrQ2xhc3MpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnBlcnNpc3RlbnRfaXRlbSQuYnlfZmtfY2xhc3Nfa2V5JChwa0NsYXNzKS5waXBlKFxuICAgICAgbWFwKG9iID0+IHtcbiAgICAgICAgaWYgKG9iKSByZXR1cm4gT2JqZWN0LmtleXMob2IpLm1hcChrID0+IHBhcnNlSW50KGssIDEwKSk7XG4gICAgICAgIHJldHVybiBbXVxuICAgICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogZ2V0cyB0aGUgY3NzIGNsYXNzZXMgZm9yIHRoYXQgZW50aXR5XG4gICAqIEBwYXJhbSBwa0VudGl0eVxuICAgKi9cbiAgcGlwZUljb25UeXBlKHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPEljb25UeXBlPiB7XG5cbiAgICByZXR1cm4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcocGtFbnRpdHkpLnBpcGUoXG4gICAgICBtYXAocHJldmlldyA9PiB7XG4gICAgICAgIGlmIChwcmV2aWV3LmVudGl0eV90eXBlID09ICd0ZUVuJykge1xuICAgICAgICAgIHJldHVybiAndGVtcG9yYWwtZW50aXR5J1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2aWV3LmZrX2NsYXNzID09PSBEZmhDb25maWcuQ0xBU1NfUEtfRVhQUkVTU0lPTl9QT1JUSU9OKSB7XG4gICAgICAgICAgcmV0dXJuICdleHByZXNzaW9uLXBvcnRpb24nXG4gICAgICAgIH0gZWxzZSBpZiAoRGZoQ29uZmlnLkNMQVNTX1BLU19TT1VSQ0VfUEVfSVQuaW5jbHVkZXMocHJldmlldy5ma19jbGFzcykpIHtcbiAgICAgICAgICByZXR1cm4gJ3NvdXJjZSdcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ3BlcnNpc3RlbnQtZW50aXR5J1xuICAgICAgfSlcbiAgICApXG5cbiAgfVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBIZWxwZXJzXG4gICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIHNvcnRTdGF0ZW1lbnRzQnlSZXBvUG9wdWxhcml0eShzdGF0ZW1lbnRzOiBJbmZTdGF0ZW1lbnRbXSk6IEluZlN0YXRlbWVudFtdIHtcbiAgICByZXR1cm4gc3RhdGVtZW50cy5zb3J0KChhLCBiKSA9PiBhLmlzX2luX3Byb2plY3RfY291bnQgPiBiLmlzX2luX3Byb2plY3RfY291bnQgPyAxIDogLTEpXG4gIH1cblxuXG5cbn1cbiJdfQ==