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
    /**
     * @param {?} listDefinition
     * @param {?} pkEntity
     * @return {?}
     */
    pipeStatementsOfList(listDefinition, pkEntity) {
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
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tYmFzaWMtcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbmZvcm1hdGlvbi1iYXNpYy1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWpELE9BQU8sRUFBRSxZQUFZLEVBQW9CLE1BQU0sdUJBQXVCLENBQUM7QUFDdkUsT0FBTyxFQUFnQixvQkFBb0IsRUFBOEIsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkgsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUd6RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQVNwRTs7Ozs7R0FLRztBQUNILE1BQU0sT0FBTyw0QkFBNEI7Ozs7OztJQUd2QyxZQUNVLENBQTRCLEVBQzVCLENBQXlCO1FBRHpCLE1BQUMsR0FBRCxDQUFDLENBQTJCO1FBQzVCLE1BQUMsR0FBRCxDQUFDLENBQXdCOzs7OztRQXdLbkMsOEJBQXlCOzs7UUFBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENB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RztBQUVPO0lBQVAsTUFBTTs7cURBQThELFlBQVk7NENBQXdCLFVBQVU7MEVBT2xIO0FBRU87SUFBUCxNQUFNOzs7NENBQW1HLFVBQVU7dUZBSW5IO0FBR087SUFBUCxNQUFNOzs7NENBQXlDLFVBQVU7d0VBRXpEO0FBTU87SUFBUCxNQUFNOzs7NENBQWlDLFVBQVU7Z0VBb0JqRDtBQWtDTztJQUFQLE1BQU07Ozs0Q0FBc0MsVUFBVTtxRUFXdEQ7QUFLTztJQUFQLE1BQU07Ozs0Q0FBcUQsVUFBVTtnRkFrQnJFO0FBVU87SUFBUCxNQUFNOzs7NENBQXVDLFVBQVU7OEVBRXZEO0FBS087SUFBUCxNQUFNOzs7NENBQXNDLFVBQVU7NkVBRXREO0FBTU87SUFBUCxNQUFNOzs7NENBQTZELFVBQVU7d0ZBaUI3RTtBQU1PO0lBQVAsTUFBTTs7OzRDQUE0RCxVQUFVO3VGQWlCNUU7QUFPTztJQUFQLE1BQU07Ozs0Q0FBMkYsVUFBVTtrR0FzQjNHO0FBTU87SUFBUCxNQUFNOzs7NENBQXlELFVBQVU7b0ZBZ0J6RTtBQU1PO0lBQVAsTUFBTTs7OzRDQUEwRCxVQUFVO3FGQWdCMUU7QUFPTztJQUFQLE1BQU07Ozs0Q0FBd0MsVUFBVTtnRkFNeEQ7Ozs7Ozs7SUFuTkQsaUVBcUJDOzs7OztJQTlMQyx5Q0FBb0M7Ozs7O0lBQ3BDLHlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaENvbmZpZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItY29uZmlnJztcbmltcG9ydCB7IEljb25UeXBlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBJbmZTdGF0ZW1lbnQsIEluZlRpbWVQcmltaXRpdmUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgQ2FsZW5kYXJUeXBlLCBjb21iaW5lTGF0ZXN0T3JFbXB0eSwgR3JhbnVsYXJpdHksIFRpbWVQcmltaXRpdmUsIFRpbWVTcGFuVXRpbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgb21pdCwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCBwaXBlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBzcHlUYWcgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IEJhc2ljU3RhdGVtZW50SXRlbSwgfSBmcm9tICcuLi9tb2RlbHMvQmFzaWNTdGF0ZW1lbnRJdGVtJztcbmltcG9ydCB7IFN1YmZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL1N1YmZpZWxkJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UgfSBmcm9tICcuL2FjdGl2ZS1wcm9qZWN0LXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NoZW1hU2VsZWN0b3JzU2VydmljZSB9IGZyb20gJy4vc2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlJztcbmltcG9ydCB7IFRpbWVQcmltaXRpdmVXaXRoQ2FsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcblxuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIFRoaXMgc2VydmljZSBjb250YWlucyBhIGJhc2ljIHBpcGVzIGZvciBjcmVhdGluZyBtb3JlIGNvbXBsZXhcbiAqIHJ4anMgcGlwZXMuIEVhY2ggcGlwZSB0YWtlcyBub24tb2JzZXJ2YWJsZSBwYXJhbWV0ZXJzIGFuZFxuICogcmV0dXJucyBhbiBvYnNlcnZhYmxlLiBUaGUgbWV0aG9kIG5hbWVzIGFyZSBtYWlubHlcbiAqIGJhc2VkIG9uIHRoZSB0eXBlIG9mIHRoZSBvYnNlcnZhYmxlIGRhdGFcbiAqL1xuZXhwb3J0IGNsYXNzIEluZm9ybWF0aW9uQmFzaWNQaXBlc1NlcnZpY2Uge1xuICAvLyBpbmZSZXBvOiBJbmZTZWxlY3RvcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHA6IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzOiBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlLFxuICApIHsgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogUHJvamVjdFxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgLy8gQHNweVRhZyBwaXBlUmVsYXRlZFRlbXBvcmFsRW50aXRpZXMocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8SW5mVGVtcG9yYWxFbnRpdHlbXT4ge1xuICAvLyAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkXG4gIC8vICAgICAuYnlfb2JqZWN0JCh7IGZrX29iamVjdF9pbmZvOiBwa0VudGl0eSB9KVxuICAvLyAgICAgLnBpcGUoXG4gIC8vICAgICAgIGF1ZGl0VGltZSgxKSxcbiAgLy8gICAgICAgc3dpdGNoTWFwT3IoW10sIChzdGF0ZW1lbnRzKSA9PiBjb21iaW5lTGF0ZXN0KFxuICAvLyAgICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PiB0aGlzLnMuaW5mJC50ZW1wb3JhbF9lbnRpdHkkLmJ5X3BrX2VudGl0eV9rZXkkKHN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pLnBpcGUoXG4gIC8vICAgICAgICAgKSlcbiAgLy8gICAgICAgKS5waXBlKFxuICAvLyAgICAgICAgIG1hcCh4ID0+IHguZmlsdGVyKCh5KSA9PiAhIXkpKSxcbiAgLy8gICAgICAgKSksXG4gIC8vICAgICApXG4gIC8vIH1cblxuXG5cblxuICAvKipcbiAqIFBpcGUgc3RhdGVtZW50cyBvZiBhbiBlbnRpdHlcbiAqL1xuICBAc3B5VGFnIHBpcGVTdGF0ZW1lbnRzKHBrRW50aXR5OiBudW1iZXIsIGlzT3V0Z29pbmcpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIGlzT3V0Z29pbmcgPyB0aGlzLnBpcGVPdXRnb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpIDogdGhpcy5waXBlSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpXG4gIH1cblxuXG4gIC8qKlxuICAqIFBpcGUgb3V0Z29pbmcgc3RhdGVtZW50cyBvZiBhbiBlbnRpdHlcbiAgKi9cbiAgQHNweVRhZyBwaXBlT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3QkKHsgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eSB9KVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSBpbmdvaW5nIHN0YXRlbWVudHMgb2YgYW4gZW50aXR5XG4gICAqL1xuICBAc3B5VGFnIHBpcGVJbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3QkKHsgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5IH0pXG4gIH1cblxuXG4gIHBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICAgIGZrX3Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICBma19wcm9wZXJ0eV9vZl9wcm9wZXJ0eTogbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eU9mUHJvcGVydHksXG4gICAgICAgIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgICAgZmtfcHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksXG4gICAgICAgIGZrX3Byb3BlcnR5X29mX3Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5T2ZQcm9wZXJ0eSxcbiAgICAgICAgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIG91dGdvaW5nIHN0YXRlbWVudHMgb2YgdGVtcG9yYWwgZW50aXR5XG4gICAqL1xuICBAc3B5VGFnIHBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KHBrUHJvcGVydHksIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICB9KVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIGluZ29pbmcgc3RhdGVtZW50cyBvZiBhbiBlbnRpdHlcbiAgICovXG4gIEBzcHlUYWcgcGlwZUluZ29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShwa1Byb3BlcnR5LCBwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgIGZrX29iamVjdF9pbmZvOiBwa0VudGl0eVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAqIFBpcGUgb3V0Z29pbmcgc3RhdGVtZW50cyBvZiB0ZW1wb3JhbCBlbnRpdHlcbiAqL1xuICBAc3B5VGFnIHBpcGVPdXRnb2luZ0Jhc2ljU3RhdGVtZW50SXRlbXNCeVByb3BlcnR5KHBrUHJvcGVydHksIHBrRW50aXR5LCBwa1Byb2plY3Q6IG51bWJlcik6IE9ic2VydmFibGU8QmFzaWNTdGF0ZW1lbnRJdGVtW10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgfSkucGlwZShcbiAgICAgIHN3aXRjaE1hcChzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBzdGF0ZW1lbnRzLm1hcChzdGF0ZW1lbnQgPT4gdGhpcy5waXBlQmFzaWNTdGF0ZW1lbnRJdGVtKHBrUHJvamVjdCwgc3RhdGVtZW50LCB0cnVlKSlcbiAgICAgICkpXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBQaXBlIGluZ29pbmcgc3RhdGVtZW50cyBvZiBhbiBlbnRpdHlcbiAgICovXG4gIEBzcHlUYWcgcGlwZUluZ29pbmdCYXNpY1N0YXRlbWVudEl0ZW1zQnlQcm9wZXJ0eShwa1Byb3BlcnR5LCBwa0VudGl0eSwgcGtQcm9qZWN0OiBudW1iZXIpOiBPYnNlcnZhYmxlPEJhc2ljU3RhdGVtZW50SXRlbVtdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICBma19vYmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICB9KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PiB0aGlzLnBpcGVCYXNpY1N0YXRlbWVudEl0ZW0ocGtQcm9qZWN0LCBzdGF0ZW1lbnQsIGZhbHNlKSlcbiAgICAgICkpXG4gICAgKVxuICB9XG5cbiAgQHNweVRhZyBwcml2YXRlIHBpcGVCYXNpY1N0YXRlbWVudEl0ZW0ocGtQcm9qZWN0OiBudW1iZXIsIHN0YXRlbWVudDogSW5mU3RhdGVtZW50LCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxCYXNpY1N0YXRlbWVudEl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgc3RhdGVtZW50LnBrX2VudGl0eSkucGlwZShcbiAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICBtYXAocHJvalJlbCA9PiAoe1xuICAgICAgICBwcm9qUmVsLCBzdGF0ZW1lbnQsIGxhYmVsOiAnJywgb3JkTnVtOiAoaXNPdXRnb2luZyA/IHByb2pSZWwub3JkX251bV9vZl9yYW5nZSA6IHByb2pSZWwub3JkX251bV9vZl9kb21haW4pLCBpc091dGdvaW5nXG4gICAgICB9KSlcbiAgICApO1xuICB9XG5cbiAgQHNweVRhZyBwaXBlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1Byb2plY3Q6IG51bWJlciwgcGtTdGF0ZW1lbnQ6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8QmFzaWNTdGF0ZW1lbnRJdGVtPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfcGtfZW50aXR5X2tleSQocGtTdGF0ZW1lbnQpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoc3RhdGVtZW50ID0+ICghc3RhdGVtZW50KSA/IG9mKHVuZGVmaW5lZCkgOiB0aGlzLnBpcGVCYXNpY1N0YXRlbWVudEl0ZW0ocGtQcm9qZWN0LCBzdGF0ZW1lbnQsIGlzT3V0Z29pbmcpKVxuICAgIClcbiAgfVxuXG5cbiAgQHNweVRhZyBwaXBlSW5mVGltZVByaW1pdGl2ZShwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxJbmZUaW1lUHJpbWl0aXZlPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShwa0VudGl0eSlcbiAgfVxuXG4gIC8qKlxuICAgKiBwaXBlcyB0aGUgVGltZVNwYW4gb2YgYSB0ZW1wb3JhbCBlbnRpdHlcbiAgICogQHBhcmFtIHBrRW50aXR5IHRoZSBwa19lbnRpdHkgb2YgdGhlIHRlcm1wb3JhbCBlbnRpdHlcbiAgICovXG4gIEBzcHlUYWcgcGlwZVRpbWVTcGFuKHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPFRpbWVTcGFuVXRpbD4ge1xuICAgIC8vIEdldCB0aGUgcHJvcGVydGllcyBsZWFkaW5nIHRvIHByZXNlbmNlc1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MiwgcGtFbnRpdHkpLnBpcGUodGhpcy50aW1lUHJpbWl0aXZlT2ZTdGF0ZW1lbnRzKCkpLFxuICAgICAgdGhpcy5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MSwgcGtFbnRpdHkpLnBpcGUodGhpcy50aW1lUHJpbWl0aXZlT2ZTdGF0ZW1lbnRzKCkpLFxuICAgICAgdGhpcy5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTAsIHBrRW50aXR5KS5waXBlKHRoaXMudGltZVByaW1pdGl2ZU9mU3RhdGVtZW50cygpKSxcbiAgICAgIHRoaXMucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUxLCBwa0VudGl0eSkucGlwZSh0aGlzLnRpbWVQcmltaXRpdmVPZlN0YXRlbWVudHMoKSksXG4gICAgICB0aGlzLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MiwgcGtFbnRpdHkpLnBpcGUodGhpcy50aW1lUHJpbWl0aXZlT2ZTdGF0ZW1lbnRzKCkpLFxuICAgICAgdGhpcy5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTMsIHBrRW50aXR5KS5waXBlKHRoaXMudGltZVByaW1pdGl2ZU9mU3RhdGVtZW50cygpKSxcblxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW183MiwgXzcxLCBfMTUwLCBfMTUxLCBfMTUyLCBfMTUzXSkgPT4gbmV3IFRpbWVTcGFuVXRpbCh7XG4gICAgICAgIHA4MjogXzcyLFxuICAgICAgICBwODE6IF83MSxcbiAgICAgICAgcDgyYTogXzE1MixcbiAgICAgICAgcDgxYTogXzE1MCxcbiAgICAgICAgcDgxYjogXzE1MSxcbiAgICAgICAgcDgyYjogXzE1MyxcbiAgICAgIH0pKSxcbiAgICApXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIG1heC4gb25lIHRpbWUgcHJpbWl0aXZlIGZvciBhbiBhcnJheSBvZiBzdGF0ZW1lbnRzLCBhc3N1bWluZyB0aGF0IHRoZSBzdGF0ZW1lbnRzXG4gICAqIGFyZSBvZiB0aGUgc2FtZSBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgdGltZVByaW1pdGl2ZU9mU3RhdGVtZW50cyA9ICgpID0+IHBpcGUoXG4gICAgbWFwKChyOiBJbmZTdGF0ZW1lbnRbXSkgPT4gclswXSksXG4gICAgc3dpdGNoTWFwKChyKSA9PiB7XG4gICAgICBpZiAoIXIpIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZClcbiAgICAgIHJldHVybiB0aGlzLnBpcGVJbmZUaW1lUHJpbWl0aXZlKHIuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoaW5mVGltZVByaW1pdGl2ZSkgPT4gdGhpcy5wLnBrUHJvamVjdCQucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKHBrUHJvamVjdCkgPT4gdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JFxuICAgICAgICAgICAgLmtleShwa1Byb2plY3QgKyAnXycgKyByWzBdLnBrX2VudGl0eSkucGlwZShcbiAgICAgICAgICAgICAgZmlsdGVyKHN0YXRlbWVudCA9PiAhIXN0YXRlbWVudCksXG4gICAgICAgICAgICAgIG1hcChpcHIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHk6IFRpbWVQcmltaXRpdmVXaXRoQ2FsID0ge1xuICAgICAgICAgICAgICAgICAgY2FsZW5kYXI6IChpcHIuY2FsZW5kYXIgPyBpcHIuY2FsZW5kYXIgOiAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlLFxuICAgICAgICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICkpXG4gICAgICAgICkpXG4gICAgICApXG4gICAgfSlcbiAgKVxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgZmtfY2xhc3Mgb2YgdGhlIGdpdmVuIGVudGl0eVxuICAgKi9cbiAgQHNweVRhZyBwaXBlQ2xhc3NPZkVudGl0eShwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gbWVyZ2UoXG4gICAgICB0aGlzLnMuaW5mJC5wZXJzaXN0ZW50X2l0ZW0kLmJ5X3BrX2VudGl0eV9rZXkkKHBrRW50aXR5KS5waXBlKFxuICAgICAgICBmaWx0ZXIoZSA9PiAhIWUpLFxuICAgICAgICBtYXAoZSA9PiBlLmZrX2NsYXNzKVxuICAgICAgKSxcbiAgICAgIHRoaXMucy5pbmYkLnRlbXBvcmFsX2VudGl0eSQuYnlfcGtfZW50aXR5X2tleSQocGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIGZpbHRlcihlID0+ICEhZSksXG4gICAgICAgIG1hcChlID0+IGUuZmtfY2xhc3MpXG4gICAgICApXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIGRpc3RpbmN0IGZrX2NsYXNzZXMgb2YgdGhlIGdpdmVuIHBlcnNpc3RlbnQgaXRlbXNcbiAgICovXG4gIEBzcHlUYWcgcGlwZUNsYXNzZXNPZlBlcnNpc3RlbnRJdGVtcyhwa0VudGl0aWVzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQucGVyc2lzdGVudF9pdGVtJC5ieV9wa19lbnRpdHlfYWxsJCgpLnBpcGUoXG4gICAgICBtYXAoKHBlSXRzKSA9PiB7XG4gICAgICAgIGlmICghcGtFbnRpdGllcyB8fCBwa0VudGl0aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSB7fTtcbiAgICAgICAgY29uc3QgYSA9IFtdO1xuICAgICAgICBwa0VudGl0aWVzLmZvckVhY2godHlwZVBrID0+IHtcbiAgICAgICAgICBpZiAoIWNsYXNzZXNbcGVJdHNbdHlwZVBrXS5ma19jbGFzc10pIHtcbiAgICAgICAgICAgIGNsYXNzZXNbcGVJdHNbdHlwZVBrXS5ma19jbGFzc10gPSB0cnVlO1xuICAgICAgICAgICAgYS5wdXNoKHBlSXRzW3R5cGVQa10uZmtfY2xhc3MpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYTtcbiAgICAgIH0pXG4gICAgKVxuXG4gIH1cblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogUmVwb1xuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgLyoqXG4gICAgKiBQaXBlIHJlcG8gb3V0Z29pbmcgc3RhdGVtZW50cy5cbiAgICAqL1xuICBAc3B5VGFnIHBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3QkKHsgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eSB9LCBmYWxzZSlcbiAgfVxuXG4gIC8qKlxuICAqIFBpcGUgcmVwbyBpbmdvaW5nIHN0YXRlbWVudHMuXG4gICovXG4gIEBzcHlUYWcgcGlwZVJlcG9JbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3QkKHsgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5IH0sIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAgKiBQaXBlIHJlcG8gb3V0Z29pbmcgc3RhdGVtZW50cy5cbiAgICAqIElmIG1heCBxdWFudGl0eSBpcyBsaW1pdGVkLCB0YWtlcyBvbmx5IG1heCBhbGxvd2VkIG51bWJlciBvZiBzdGF0ZW1lbnRzLCBzdGFydGluZyB3aXRoIGhpZ2hlc3QgaXNfaW5fcHJvamVjdF9jb3VudFxuICAgICovXG4gIEBzcHlUYWcgcGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KHBrUHJvcGVydHksIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X3BrX3Byb3BlcnR5JC5rZXkocGtQcm9wZXJ0eSlcbiAgICAgICAgLnBpcGUoZmlsdGVyKHggPT4gISF4ICYmIE9iamVjdC5rZXlzKHgpLmxlbmd0aCA+IDApLCBtYXAocCA9PiB2YWx1ZXMocClbMF0ucmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyKSksXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkXG4gICAgICAgIC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgICAgIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgICAgfSwgZmFsc2UpXG4gICAgICAvLyAucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW20sIHJzXSkgPT4ge1xuICAgICAgICBpZiAocnMubGVuZ3RoID09PSAwKSByZXR1cm4gcnM7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLnNvcnRTdGF0ZW1lbnRzQnlSZXBvUG9wdWxhcml0eShycyk7XG4gICAgICAgIHJldHVybiAobSA9PT0gLTEgfHwgbSA9PT0gbnVsbCkgPyByIDogci5zbGljZSgwLCBtKTtcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICogUGlwZSByZXBvIGluZ29pbmcgc3RhdGVtZW50cy5cbiAgKiBJZiBtYXggcXVhbnRpdHkgaXMgbGltaXRlZCwgdGFrZXMgb25seSBtYXggYWxsb3dlZCBudW1iZXIgb2Ygc3RhdGVtZW50cywgc3RhcnRpbmcgd2l0aCBoaWdoZXN0IGlzX2luX3Byb2plY3RfY291bnRcbiAgKi9cbiAgQHNweVRhZyBwaXBlUmVwb0luZ29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShwa1Byb3BlcnR5LCBwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9wa19wcm9wZXJ0eSQua2V5KHBrUHJvcGVydHkpXG4gICAgICAgIC5waXBlKGZpbHRlcih4ID0+ICEheCAmJiBPYmplY3Qua2V5cyh4KS5sZW5ndGggPiAwKSwgbWFwKHAgPT4gdmFsdWVzKHApWzBdLmRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXIpKSxcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCRcbiAgICAgICAgLmJ5X29iamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgICAgICBma19vYmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgICAgfSwgZmFsc2UpXG4gICAgICAvLyAucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW20sIHJzXSkgPT4ge1xuICAgICAgICBpZiAocnMubGVuZ3RoID09PSAwKSByZXR1cm4gcnM7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLnNvcnRTdGF0ZW1lbnRzQnlSZXBvUG9wdWxhcml0eShycyk7XG4gICAgICAgIHJldHVybiAobSA9PT0gLTEgfHwgbSA9PT0gbnVsbCkgPyByIDogci5zbGljZSgwLCBtKTtcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIEFsdGVybmF0aXZlcyAoUmVwbyBtaW51cyBQcm9qZWN0KVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgQHNweVRhZyBwaXBlQWx0ZXJuYXRpdmVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrU3RhdGVtZW50OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEJhc2ljU3RhdGVtZW50SXRlbT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9wa19lbnRpdHlfa2V5JChwa1N0YXRlbWVudCwgZmFsc2UpLFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9wa19lbnRpdHlfa2V5JChwa1N0YXRlbWVudCksXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoW2lucmVwb10pID0+ICEhaW5yZXBvKSxcbiAgICAgICAgbWFwKChbaW5yZXBvLCBpbnByb2plY3RdKSA9PiB7XG4gICAgICAgICAgaWYgKGlucHJvamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpOiBCYXNpY1N0YXRlbWVudEl0ZW0gPSB7XG4gICAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgc3RhdGVtZW50OiBpbnJlcG8sXG4gICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICBsYWJlbDogJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKVxuICB9XG5cblxuICAvKipcbiAgICAgKiBQaXBlIGFsdGVybmF0aXZlIGluZ29pbmcgc3RhdGVtZW50cyAoPSBzdGF0ZW1lbnRzIG5vdCBpbiBhY3RpdmUgcHJvamVjdClcbiAgICAgKi9cbiAgQHNweVRhZyBwaXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhwa1Byb3BlcnR5LCBwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7XG4gICAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgICBma19vYmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgIH0sIGZhbHNlKSxcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7XG4gICAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgICBma19vYmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgIH0pLnBpcGUoXG4gICAgICAgIG1hcChpbnByb2plY3QgPT4gaW5wcm9qZWN0ID8gT2JqZWN0LmtleXMoaW5wcm9qZWN0KSA6IFtdKVxuICAgICAgKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW2lucmVwbywgaW5wcm9qZWN0XSkgPT4gb21pdChpbnByb2plY3QsIGlucmVwbykpLFxuICAgICAgbWFwKHN0YXRlbWVudHMgPT4gdmFsdWVzKHN0YXRlbWVudHMpKVxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgYWx0ZXJuYXRpdmUgb3V0Z29pbmcgc3RhdGVtZW50cyAoPSBzdGF0ZW1lbnRzIG5vdCBpbiBhY3RpdmUgcHJvamVjdClcbiAgICovXG4gIEBzcHlUYWcgcGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKHBrUHJvcGVydHksIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7XG4gICAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gICAgICB9LCBmYWxzZSksXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKHtcbiAgICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICAgIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgIH0pLnBpcGUoXG4gICAgICAgIG1hcChpbnByb2plY3QgPT4gaW5wcm9qZWN0ID8gT2JqZWN0LmtleXMoaW5wcm9qZWN0KSA6IFtdKVxuICAgICAgKSxcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFtpbnJlcG8sIGlucHJvamVjdF0pID0+IG9taXQoaW5wcm9qZWN0LCBpbnJlcG8pKSxcbiAgICAgIG1hcChzdGF0ZW1lbnRzID0+IHZhbHVlcyhzdGF0ZW1lbnRzKSlcbiAgICApXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIGdldCBhcnJheSBvZiBwa3Mgb2YgcGVyc2lzdGVudCBpdGVtcyBvZiBhIHNwZWNpZmljIGNsYXNzXG4gICAqL1xuICBAc3B5VGFnIHBpcGVQZXJzaXN0ZW50SXRlbVBrc0J5Q2xhc3MocGtDbGFzcyk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQucGVyc2lzdGVudF9pdGVtJC5ieV9ma19jbGFzc19rZXkkKHBrQ2xhc3MpLnBpcGUoXG4gICAgICBtYXAob2IgPT4ge1xuICAgICAgICBpZiAob2IpIHJldHVybiBPYmplY3Qua2V5cyhvYikubWFwKGsgPT4gcGFyc2VJbnQoaywgMTApKTtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXRzIHRoZSBjc3MgY2xhc3NlcyBmb3IgdGhhdCBlbnRpdHlcbiAgICogQHBhcmFtIHBrRW50aXR5XG4gICAqL1xuICBwaXBlSWNvblR5cGUocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8SWNvblR5cGU+IHtcblxuICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhwa0VudGl0eSkucGlwZShcbiAgICAgIG1hcChwcmV2aWV3ID0+IHtcbiAgICAgICAgaWYgKHByZXZpZXcuZW50aXR5X3R5cGUgPT0gJ3RlRW4nKSB7XG4gICAgICAgICAgcmV0dXJuICd0ZW1wb3JhbC1lbnRpdHknXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXZpZXcuZmtfY2xhc3MgPT09IERmaENvbmZpZy5DTEFTU19QS19FWFBSRVNTSU9OX1BPUlRJT04pIHtcbiAgICAgICAgICByZXR1cm4gJ2V4cHJlc3Npb24tcG9ydGlvbidcbiAgICAgICAgfSBlbHNlIGlmIChEZmhDb25maWcuQ0xBU1NfUEtTX1NPVVJDRV9QRV9JVC5pbmNsdWRlcyhwcmV2aWV3LmZrX2NsYXNzKSkge1xuICAgICAgICAgIHJldHVybiAnc291cmNlJ1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAncGVyc2lzdGVudC1lbnRpdHknXG4gICAgICB9KVxuICAgIClcblxuICB9XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIEhlbHBlcnNcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgc29ydFN0YXRlbWVudHNCeVJlcG9Qb3B1bGFyaXR5KHN0YXRlbWVudHM6IEluZlN0YXRlbWVudFtdKTogSW5mU3RhdGVtZW50W10ge1xuICAgIHJldHVybiBzdGF0ZW1lbnRzLnNvcnQoKGEsIGIpID0+IGEuaXNfaW5fcHJvamVjdF9jb3VudCA+IGIuaXNfaW5fcHJvamVjdF9jb3VudCA/IDEgOiAtMSlcbiAgfVxuXG5cblxufVxuIl19