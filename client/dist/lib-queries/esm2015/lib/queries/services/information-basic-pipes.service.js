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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tYmFzaWMtcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy8iLCJzb3VyY2VzIjpbImxpYi9xdWVyaWVzL3NlcnZpY2VzL2luZm9ybWF0aW9uLWJhc2ljLXBpcGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFakQsT0FBTyxFQUFFLFlBQVksRUFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RSxPQUFPLEVBQWdCLG9CQUFvQixFQUE4QixZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuSCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkYsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBR3pELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7O0FBU3BFOzs7OztHQUtHO0FBQ0gsTUFBTSxPQUFPLDRCQUE0Qjs7Ozs7O0lBR3ZDLFlBQ1UsQ0FBNEIsRUFDNUIsQ0FBeUI7UUFEekIsTUFBQyxHQUFELENBQUMsQ0FBMkI7UUFDNUIsTUFBQyxHQUFELENBQUMsQ0FBd0I7Ozs7O1FBd0tuQyw4QkFBeUI7OztRQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FDcEMs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RU87SUFBUCxNQUFNOztxREFBOEQsWUFBWTs0Q0FBd0IsVUFBVTswRUFPbEg7QUFFTztJQUFQLE1BQU07Ozs0Q0FBbUcsVUFBVTt1RkFJbkg7QUFHTztJQUFQLE1BQU07Ozs0Q0FBeUMsVUFBVTt3RUFFekQ7QUFNTztJQUFQLE1BQU07Ozs0Q0FBaUMsVUFBVTtnRUFvQmpEO0FBa0NPO0lBQVAsTUFBTTs7OzRDQUFzQyxVQUFVO3FFQVd0RDtBQUtPO0lBQVAsTUFBTTs7OzRDQUFxRCxVQUFVO2dGQWtCckU7QUFVTztJQUFQLE1BQU07Ozs0Q0FBdUMsVUFBVTs4RUFFdkQ7QUFLTztJQUFQLE1BQU07Ozs0Q0FBc0MsVUFBVTs2RUFFdEQ7QUFNTztJQUFQLE1BQU07Ozs0Q0FBNkQsVUFBVTt3RkFpQjdFO0FBTU87SUFBUCxNQUFNOzs7NENBQTRELFVBQVU7dUZBaUI1RTtBQU9PO0lBQVAsTUFBTTs7OzRDQUEyRixVQUFVO2tHQXNCM0c7QUFNTztJQUFQLE1BQU07Ozs0Q0FBeUQsVUFBVTtvRkFnQnpFO0FBTU87SUFBUCxNQUFNOzs7NENBQTBELFVBQVU7cUZBZ0IxRTtBQU9PO0lBQVAsTUFBTTs7OzRDQUF3QyxVQUFVO2dGQU14RDs7Ozs7OztJQW5ORCxpRUFxQkM7Ozs7O0lBOUxDLHlDQUFvQzs7Ozs7SUFDcEMseUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGZoQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgSWNvblR5cGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IEluZlN0YXRlbWVudCwgSW5mVGltZVByaW1pdGl2ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBDYWxlbmRhclR5cGUsIGNvbWJpbmVMYXRlc3RPckVtcHR5LCBHcmFudWxhcml0eSwgVGltZVByaW1pdGl2ZSwgVGltZVNwYW5VdGlsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBvbWl0LCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIHBpcGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHNweVRhZyB9IGZyb20gJy4uL2RlY29yYXRvcnMvbWV0aG9kLWRlY29yYXRvcnMnO1xuaW1wb3J0IHsgQmFzaWNTdGF0ZW1lbnRJdGVtLCB9IGZyb20gJy4uL21vZGVscy9CYXNpY1N0YXRlbWVudEl0ZW0nO1xuaW1wb3J0IHsgU3ViZmllbGQgfSBmcm9tICcuLi9tb2RlbHMvU3ViZmllbGQnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSB9IGZyb20gJy4vYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zY2hlbWEtc2VsZWN0b3JzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGltZVByaW1pdGl2ZVdpdGhDYWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuXG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbi8qKlxuICogVGhpcyBzZXJ2aWNlIGNvbnRhaW5zIGEgYmFzaWMgcGlwZXMgZm9yIGNyZWF0aW5nIG1vcmUgY29tcGxleFxuICogcnhqcyBwaXBlcy4gRWFjaCBwaXBlIHRha2VzIG5vbi1vYnNlcnZhYmxlIHBhcmFtZXRlcnMgYW5kXG4gKiByZXR1cm5zIGFuIG9ic2VydmFibGUuIFRoZSBtZXRob2QgbmFtZXMgYXJlIG1haW5seVxuICogYmFzZWQgb24gdGhlIHR5cGUgb2YgdGhlIG9ic2VydmFibGUgZGF0YVxuICovXG5leHBvcnQgY2xhc3MgSW5mb3JtYXRpb25CYXNpY1BpcGVzU2VydmljZSB7XG4gIC8vIGluZlJlcG86IEluZlNlbGVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcDogQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSxcbiAgICBwcml2YXRlIHM6IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UsXG4gICkgeyB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBQcm9qZWN0XG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAvLyBAc3B5VGFnIHBpcGVSZWxhdGVkVGVtcG9yYWxFbnRpdGllcyhwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxJbmZUZW1wb3JhbEVudGl0eVtdPiB7XG4gIC8vICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCRcbiAgLy8gICAgIC5ieV9vYmplY3QkKHsgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5IH0pXG4gIC8vICAgICAucGlwZShcbiAgLy8gICAgICAgYXVkaXRUaW1lKDEpLFxuICAvLyAgICAgICBzd2l0Y2hNYXBPcihbXSwgKHN0YXRlbWVudHMpID0+IGNvbWJpbmVMYXRlc3QoXG4gIC8vICAgICAgICAgc3RhdGVtZW50cy5tYXAoc3RhdGVtZW50ID0+IHRoaXMucy5pbmYkLnRlbXBvcmFsX2VudGl0eSQuYnlfcGtfZW50aXR5X2tleSQoc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbykucGlwZShcbiAgLy8gICAgICAgICApKVxuICAvLyAgICAgICApLnBpcGUoXG4gIC8vICAgICAgICAgbWFwKHggPT4geC5maWx0ZXIoKHkpID0+ICEheSkpLFxuICAvLyAgICAgICApKSxcbiAgLy8gICAgIClcbiAgLy8gfVxuXG5cblxuXG4gIC8qKlxuICogUGlwZSBzdGF0ZW1lbnRzIG9mIGFuIGVudGl0eVxuICovXG4gIEBzcHlUYWcgcGlwZVN0YXRlbWVudHMocGtFbnRpdHk6IG51bWJlciwgaXNPdXRnb2luZyk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICByZXR1cm4gaXNPdXRnb2luZyA/IHRoaXMucGlwZU91dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSkgOiB0aGlzLnBpcGVJbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSlcbiAgfVxuXG5cbiAgLyoqXG4gICogUGlwZSBvdXRnb2luZyBzdGF0ZW1lbnRzIG9mIGFuIGVudGl0eVxuICAqL1xuICBAc3B5VGFnIHBpcGVPdXRnb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdCQoeyBma19zdWJqZWN0X2luZm86IHBrRW50aXR5IH0pXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlIGluZ29pbmcgc3RhdGVtZW50cyBvZiBhbiBlbnRpdHlcbiAgICovXG4gIEBzcHlUYWcgcGlwZUluZ29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdCQoeyBma19vYmplY3RfaW5mbzogcGtFbnRpdHkgfSlcbiAgfVxuXG5cbiAgcGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgICAgZmtfcHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksXG4gICAgICAgIGZrX3Byb3BlcnR5X29mX3Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5T2ZQcm9wZXJ0eSxcbiAgICAgICAgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgICBma19wcm9wZXJ0eTogbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgICAgICAgZmtfcHJvcGVydHlfb2ZfcHJvcGVydHk6IGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHlPZlByb3BlcnR5LFxuICAgICAgICBma19vYmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgb3V0Z29pbmcgc3RhdGVtZW50cyBvZiB0ZW1wb3JhbCBlbnRpdHlcbiAgICovXG4gIEBzcHlUYWcgcGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkocGtQcm9wZXJ0eSwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eVxuICAgIH0pXG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGUgaW5nb2luZyBzdGF0ZW1lbnRzIG9mIGFuIGVudGl0eVxuICAgKi9cbiAgQHNweVRhZyBwaXBlSW5nb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KHBrUHJvcGVydHksIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdF9hbmRfcHJvcGVydHkkKHtcbiAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICogUGlwZSBvdXRnb2luZyBzdGF0ZW1lbnRzIG9mIHRlbXBvcmFsIGVudGl0eVxuICovXG4gIEBzcHlUYWcgcGlwZU91dGdvaW5nQmFzaWNTdGF0ZW1lbnRJdGVtc0J5UHJvcGVydHkocGtQcm9wZXJ0eSwgcGtFbnRpdHksIHBrUHJvamVjdDogbnVtYmVyKTogT2JzZXJ2YWJsZTxCYXNpY1N0YXRlbWVudEl0ZW1bXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICB9KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PiB0aGlzLnBpcGVCYXNpY1N0YXRlbWVudEl0ZW0ocGtQcm9qZWN0LCBzdGF0ZW1lbnQsIHRydWUpKVxuICAgICAgKSlcbiAgICApXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFBpcGUgaW5nb2luZyBzdGF0ZW1lbnRzIG9mIGFuIGVudGl0eVxuICAgKi9cbiAgQHNweVRhZyBwaXBlSW5nb2luZ0Jhc2ljU3RhdGVtZW50SXRlbXNCeVByb3BlcnR5KHBrUHJvcGVydHksIHBrRW50aXR5LCBwa1Byb2plY3Q6IG51bWJlcik6IE9ic2VydmFibGU8QmFzaWNTdGF0ZW1lbnRJdGVtW10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgIGZrX29iamVjdF9pbmZvOiBwa0VudGl0eVxuICAgIH0pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgc3RhdGVtZW50cy5tYXAoc3RhdGVtZW50ID0+IHRoaXMucGlwZUJhc2ljU3RhdGVtZW50SXRlbShwa1Byb2plY3QsIHN0YXRlbWVudCwgZmFsc2UpKVxuICAgICAgKSlcbiAgICApXG4gIH1cblxuICBAc3B5VGFnIHByaXZhdGUgcGlwZUJhc2ljU3RhdGVtZW50SXRlbShwa1Byb2plY3Q6IG51bWJlciwgc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPEJhc2ljU3RhdGVtZW50SXRlbT4ge1xuICAgIHJldHVybiB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkLmtleShwa1Byb2plY3QgKyAnXycgKyBzdGF0ZW1lbnQucGtfZW50aXR5KS5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIG1hcChwcm9qUmVsID0+ICh7XG4gICAgICAgIHByb2pSZWwsIHN0YXRlbWVudCwgbGFiZWw6ICcnLCBvcmROdW06IChpc091dGdvaW5nID8gcHJvalJlbC5vcmRfbnVtX29mX3JhbmdlIDogcHJvalJlbC5vcmRfbnVtX29mX2RvbWFpbiksIGlzT3V0Z29pbmdcbiAgICAgIH0pKVxuICAgICk7XG4gIH1cblxuICBAc3B5VGFnIHBpcGVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrUHJvamVjdDogbnVtYmVyLCBwa1N0YXRlbWVudDogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxCYXNpY1N0YXRlbWVudEl0ZW0+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9wa19lbnRpdHlfa2V5JChwa1N0YXRlbWVudCkucGlwZShcbiAgICAgIHN3aXRjaE1hcChzdGF0ZW1lbnQgPT4gKCFzdGF0ZW1lbnQpID8gb2YodW5kZWZpbmVkKSA6IHRoaXMucGlwZUJhc2ljU3RhdGVtZW50SXRlbShwa1Byb2plY3QsIHN0YXRlbWVudCwgaXNPdXRnb2luZykpXG4gICAgKVxuICB9XG5cblxuICBAc3B5VGFnIHBpcGVJbmZUaW1lUHJpbWl0aXZlKHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPEluZlRpbWVQcmltaXRpdmU+IHtcbiAgICByZXR1cm4gdGhpcy5zLmluZiQudGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHBrRW50aXR5KVxuICB9XG5cbiAgLyoqXG4gICAqIHBpcGVzIHRoZSBUaW1lU3BhbiBvZiBhIHRlbXBvcmFsIGVudGl0eVxuICAgKiBAcGFyYW0gcGtFbnRpdHkgdGhlIHBrX2VudGl0eSBvZiB0aGUgdGVybXBvcmFsIGVudGl0eVxuICAgKi9cbiAgQHNweVRhZyBwaXBlVGltZVNwYW4ocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8VGltZVNwYW5VdGlsPiB7XG4gICAgLy8gR2V0IHRoZSBwcm9wZXJ0aWVzIGxlYWRpbmcgdG8gcHJlc2VuY2VzXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDcyLCBwa0VudGl0eSkucGlwZSh0aGlzLnRpbWVQcmltaXRpdmVPZlN0YXRlbWVudHMoKSksXG4gICAgICB0aGlzLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDcxLCBwa0VudGl0eSkucGlwZSh0aGlzLnRpbWVQcmltaXRpdmVPZlN0YXRlbWVudHMoKSksXG4gICAgICB0aGlzLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MCwgcGtFbnRpdHkpLnBpcGUodGhpcy50aW1lUHJpbWl0aXZlT2ZTdGF0ZW1lbnRzKCkpLFxuICAgICAgdGhpcy5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTEsIHBrRW50aXR5KS5waXBlKHRoaXMudGltZVByaW1pdGl2ZU9mU3RhdGVtZW50cygpKSxcbiAgICAgIHRoaXMucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoMTUyLCBwa0VudGl0eSkucGlwZSh0aGlzLnRpbWVQcmltaXRpdmVPZlN0YXRlbWVudHMoKSksXG4gICAgICB0aGlzLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MywgcGtFbnRpdHkpLnBpcGUodGhpcy50aW1lUHJpbWl0aXZlT2ZTdGF0ZW1lbnRzKCkpLFxuXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbXzcyLCBfNzEsIF8xNTAsIF8xNTEsIF8xNTIsIF8xNTNdKSA9PiBuZXcgVGltZVNwYW5VdGlsKHtcbiAgICAgICAgcDgyOiBfNzIsXG4gICAgICAgIHA4MTogXzcxLFxuICAgICAgICBwODJhOiBfMTUyLFxuICAgICAgICBwODFhOiBfMTUwLFxuICAgICAgICBwODFiOiBfMTUxLFxuICAgICAgICBwODJiOiBfMTUzLFxuICAgICAgfSkpLFxuICAgIClcbiAgfVxuXG5cblxuICAvKipcbiAgICogUGlwZXMgbWF4LiBvbmUgdGltZSBwcmltaXRpdmUgZm9yIGFuIGFycmF5IG9mIHN0YXRlbWVudHMsIGFzc3VtaW5nIHRoYXQgdGhlIHN0YXRlbWVudHNcbiAgICogYXJlIG9mIHRoZSBzYW1lIHByb3BlcnRpZXMuXG4gICAqL1xuICB0aW1lUHJpbWl0aXZlT2ZTdGF0ZW1lbnRzID0gKCkgPT4gcGlwZShcbiAgICBtYXAoKHI6IEluZlN0YXRlbWVudFtdKSA9PiByWzBdKSxcbiAgICBzd2l0Y2hNYXAoKHIpID0+IHtcbiAgICAgIGlmICghcikgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKVxuICAgICAgcmV0dXJuIHRoaXMucGlwZUluZlRpbWVQcmltaXRpdmUoci5ma19vYmplY3RfaW5mbykucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChpbmZUaW1lUHJpbWl0aXZlKSA9PiB0aGlzLnAucGtQcm9qZWN0JC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgocGtQcm9qZWN0KSA9PiB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkXG4gICAgICAgICAgICAua2V5KHBrUHJvamVjdCArICdfJyArIHJbMF0ucGtfZW50aXR5KS5waXBlKFxuICAgICAgICAgICAgICBmaWx0ZXIoc3RhdGVtZW50ID0+ICEhc3RhdGVtZW50KSxcbiAgICAgICAgICAgICAgbWFwKGlwciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeTogVGltZVByaW1pdGl2ZVdpdGhDYWwgPSB7XG4gICAgICAgICAgICAgICAgICBjYWxlbmRhcjogKGlwci5jYWxlbmRhciA/IGlwci5jYWxlbmRhciA6ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUsXG4gICAgICAgICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB5O1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSlcbiAgICAgICAgKSlcbiAgICAgIClcbiAgICB9KVxuICApXG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBma19jbGFzcyBvZiB0aGUgZ2l2ZW4gZW50aXR5XG4gICAqL1xuICBAc3B5VGFnIHBpcGVDbGFzc09mRW50aXR5KHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiBtZXJnZShcbiAgICAgIHRoaXMucy5pbmYkLnBlcnNpc3RlbnRfaXRlbSQuYnlfcGtfZW50aXR5X2tleSQocGtFbnRpdHkpLnBpcGUoXG4gICAgICAgIGZpbHRlcihlID0+ICEhZSksXG4gICAgICAgIG1hcChlID0+IGUuZmtfY2xhc3MpXG4gICAgICApLFxuICAgICAgdGhpcy5zLmluZiQudGVtcG9yYWxfZW50aXR5JC5ieV9wa19lbnRpdHlfa2V5JChwa0VudGl0eSkucGlwZShcbiAgICAgICAgZmlsdGVyKGUgPT4gISFlKSxcbiAgICAgICAgbWFwKGUgPT4gZS5ma19jbGFzcylcbiAgICAgIClcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgZGlzdGluY3QgZmtfY2xhc3NlcyBvZiB0aGUgZ2l2ZW4gcGVyc2lzdGVudCBpdGVtc1xuICAgKi9cbiAgQHNweVRhZyBwaXBlQ2xhc3Nlc09mUGVyc2lzdGVudEl0ZW1zKHBrRW50aXRpZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5wZXJzaXN0ZW50X2l0ZW0kLmJ5X3BrX2VudGl0eV9hbGwkKCkucGlwZShcbiAgICAgIG1hcCgocGVJdHMpID0+IHtcbiAgICAgICAgaWYgKCFwa0VudGl0aWVzIHx8IHBrRW50aXRpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIFtdXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IHt9O1xuICAgICAgICBjb25zdCBhID0gW107XG4gICAgICAgIHBrRW50aXRpZXMuZm9yRWFjaCh0eXBlUGsgPT4ge1xuICAgICAgICAgIGlmICghY2xhc3Nlc1twZUl0c1t0eXBlUGtdLmZrX2NsYXNzXSkge1xuICAgICAgICAgICAgY2xhc3Nlc1twZUl0c1t0eXBlUGtdLmZrX2NsYXNzXSA9IHRydWU7XG4gICAgICAgICAgICBhLnB1c2gocGVJdHNbdHlwZVBrXS5ma19jbGFzcylcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBhO1xuICAgICAgfSlcbiAgICApXG5cbiAgfVxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBSZXBvXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAvKipcbiAgICAqIFBpcGUgcmVwbyBvdXRnb2luZyBzdGF0ZW1lbnRzLlxuICAgICovXG4gIEBzcHlUYWcgcGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdCQoeyBma19zdWJqZWN0X2luZm86IHBrRW50aXR5IH0sIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICogUGlwZSByZXBvIGluZ29pbmcgc3RhdGVtZW50cy5cbiAgKi9cbiAgQHNweVRhZyBwaXBlUmVwb0luZ29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X29iamVjdCQoeyBma19vYmplY3RfaW5mbzogcGtFbnRpdHkgfSwgZmFsc2UpXG4gIH1cblxuICAvKipcbiAgICAqIFBpcGUgcmVwbyBvdXRnb2luZyBzdGF0ZW1lbnRzLlxuICAgICogSWYgbWF4IHF1YW50aXR5IGlzIGxpbWl0ZWQsIHRha2VzIG9ubHkgbWF4IGFsbG93ZWQgbnVtYmVyIG9mIHN0YXRlbWVudHMsIHN0YXJ0aW5nIHdpdGggaGlnaGVzdCBpc19pbl9wcm9qZWN0X2NvdW50XG4gICAgKi9cbiAgQHNweVRhZyBwaXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkocGtQcm9wZXJ0eSwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfcGtfcHJvcGVydHkkLmtleShwa1Byb3BlcnR5KVxuICAgICAgICAucGlwZShmaWx0ZXIoeCA9PiAhIXggJiYgT2JqZWN0LmtleXMoeCkubGVuZ3RoID4gMCksIG1hcChwID0+IHZhbHVlcyhwKVswXS5yYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXIpKSxcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCRcbiAgICAgICAgLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gICAgICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICAgICAgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eVxuICAgICAgICB9LCBmYWxzZSlcbiAgICAgIC8vIC5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbbSwgcnNdKSA9PiB7XG4gICAgICAgIGlmIChycy5sZW5ndGggPT09IDApIHJldHVybiBycztcbiAgICAgICAgY29uc3QgciA9IHRoaXMuc29ydFN0YXRlbWVudHNCeVJlcG9Qb3B1bGFyaXR5KHJzKTtcbiAgICAgICAgcmV0dXJuIChtID09PSAtMSB8fCBtID09PSBudWxsKSA/IHIgOiByLnNsaWNlKDAsIG0pO1xuICAgICAgfSlcbiAgICApXG4gIH1cblxuICAvKipcbiAgKiBQaXBlIHJlcG8gaW5nb2luZyBzdGF0ZW1lbnRzLlxuICAqIElmIG1heCBxdWFudGl0eSBpcyBsaW1pdGVkLCB0YWtlcyBvbmx5IG1heCBhbGxvd2VkIG51bWJlciBvZiBzdGF0ZW1lbnRzLCBzdGFydGluZyB3aXRoIGhpZ2hlc3QgaXNfaW5fcHJvamVjdF9jb3VudFxuICAqL1xuICBAc3B5VGFnIHBpcGVSZXBvSW5nb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KHBrUHJvcGVydHksIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X3BrX3Byb3BlcnR5JC5rZXkocGtQcm9wZXJ0eSlcbiAgICAgICAgLnBpcGUoZmlsdGVyKHggPT4gISF4ICYmIE9iamVjdC5rZXlzKHgpLmxlbmd0aCA+IDApLCBtYXAocCA9PiB2YWx1ZXMocClbMF0uZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcikpLFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JFxuICAgICAgICAuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAgICAgICAgIGZrX3Byb3BlcnR5OiBwa1Byb3BlcnR5LFxuICAgICAgICAgIGZrX29iamVjdF9pbmZvOiBwa0VudGl0eVxuICAgICAgICB9LCBmYWxzZSlcbiAgICAgIC8vIC5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbbSwgcnNdKSA9PiB7XG4gICAgICAgIGlmIChycy5sZW5ndGggPT09IDApIHJldHVybiBycztcbiAgICAgICAgY29uc3QgciA9IHRoaXMuc29ydFN0YXRlbWVudHNCeVJlcG9Qb3B1bGFyaXR5KHJzKTtcbiAgICAgICAgcmV0dXJuIChtID09PSAtMSB8fCBtID09PSBudWxsKSA/IHIgOiByLnNsaWNlKDAsIG0pO1xuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogQWx0ZXJuYXRpdmVzIChSZXBvIG1pbnVzIFByb2plY3QpXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICBAc3B5VGFnIHBpcGVBbHRlcm5hdGl2ZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtTdGF0ZW1lbnQ6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8QmFzaWNTdGF0ZW1lbnRJdGVtPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3BrX2VudGl0eV9rZXkkKHBrU3RhdGVtZW50LCBmYWxzZSksXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3BrX2VudGl0eV9rZXkkKHBrU3RhdGVtZW50KSxcbiAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChbaW5yZXBvXSkgPT4gISFpbnJlcG8pLFxuICAgICAgICBtYXAoKFtpbnJlcG8sIGlucHJvamVjdF0pID0+IHtcbiAgICAgICAgICBpZiAoaW5wcm9qZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGk6IEJhc2ljU3RhdGVtZW50SXRlbSA9IHtcbiAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IGlucmVwbyxcbiAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgIGxhYmVsOiAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgICAqIFBpcGUgYWx0ZXJuYXRpdmUgaW5nb2luZyBzdGF0ZW1lbnRzICg9IHN0YXRlbWVudHMgbm90IGluIGFjdGl2ZSBwcm9qZWN0KVxuICAgICAqL1xuICBAc3B5VGFnIHBpcGVBbHRlcm5hdGl2ZUluZ29pbmdTdGF0ZW1lbnRzKHBrUHJvcGVydHksIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKHtcbiAgICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICAgIGZrX29iamVjdF9pbmZvOiBwa0VudGl0eVxuICAgICAgfSwgZmFsc2UpLFxuICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKHtcbiAgICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICAgIGZrX29iamVjdF9pbmZvOiBwa0VudGl0eVxuICAgICAgfSkucGlwZShcbiAgICAgICAgbWFwKGlucHJvamVjdCA9PiBpbnByb2plY3QgPyBPYmplY3Qua2V5cyhpbnByb2plY3QpIDogW10pXG4gICAgICApXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbaW5yZXBvLCBpbnByb2plY3RdKSA9PiBvbWl0KGlucHJvamVjdCwgaW5yZXBvKSksXG4gICAgICBtYXAoc3RhdGVtZW50cyA9PiB2YWx1ZXMoc3RhdGVtZW50cykpXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogUGlwZSBhbHRlcm5hdGl2ZSBvdXRnb2luZyBzdGF0ZW1lbnRzICg9IHN0YXRlbWVudHMgbm90IGluIGFjdGl2ZSBwcm9qZWN0KVxuICAgKi9cbiAgQHNweVRhZyBwaXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMocGtQcm9wZXJ0eSwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKHtcbiAgICAgICAgZmtfcHJvcGVydHk6IHBrUHJvcGVydHksXG4gICAgICAgIGZrX3N1YmplY3RfaW5mbzogcGtFbnRpdHlcbiAgICAgIH0sIGZhbHNlKSxcbiAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoe1xuICAgICAgICBma19wcm9wZXJ0eTogcGtQcm9wZXJ0eSxcbiAgICAgICAgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eVxuICAgICAgfSkucGlwZShcbiAgICAgICAgbWFwKGlucHJvamVjdCA9PiBpbnByb2plY3QgPyBPYmplY3Qua2V5cyhpbnByb2plY3QpIDogW10pXG4gICAgICApLFxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW2lucmVwbywgaW5wcm9qZWN0XSkgPT4gb21pdChpbnByb2plY3QsIGlucmVwbykpLFxuICAgICAgbWFwKHN0YXRlbWVudHMgPT4gdmFsdWVzKHN0YXRlbWVudHMpKVxuICAgIClcbiAgfVxuXG5cblxuICAvKipcbiAgICogZ2V0IGFycmF5IG9mIHBrcyBvZiBwZXJzaXN0ZW50IGl0ZW1zIG9mIGEgc3BlY2lmaWMgY2xhc3NcbiAgICovXG4gIEBzcHlUYWcgcGlwZVBlcnNpc3RlbnRJdGVtUGtzQnlDbGFzcyhwa0NsYXNzKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuaW5mJC5wZXJzaXN0ZW50X2l0ZW0kLmJ5X2ZrX2NsYXNzX2tleSQocGtDbGFzcykucGlwZShcbiAgICAgIG1hcChvYiA9PiB7XG4gICAgICAgIGlmIChvYikgcmV0dXJuIE9iamVjdC5rZXlzKG9iKS5tYXAoayA9PiBwYXJzZUludChrLCAxMCkpO1xuICAgICAgICByZXR1cm4gW11cbiAgICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIGdldHMgdGhlIGNzcyBjbGFzc2VzIGZvciB0aGF0IGVudGl0eVxuICAgKiBAcGFyYW0gcGtFbnRpdHlcbiAgICovXG4gIHBpcGVJY29uVHlwZShwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxJY29uVHlwZT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KHBrRW50aXR5KS5waXBlKFxuICAgICAgbWFwKHByZXZpZXcgPT4ge1xuICAgICAgICBpZiAocHJldmlldy5lbnRpdHlfdHlwZSA9PSAndGVFbicpIHtcbiAgICAgICAgICByZXR1cm4gJ3RlbXBvcmFsLWVudGl0eSdcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJldmlldy5ma19jbGFzcyA9PT0gRGZoQ29uZmlnLkNMQVNTX1BLX0VYUFJFU1NJT05fUE9SVElPTikge1xuICAgICAgICAgIHJldHVybiAnZXhwcmVzc2lvbi1wb3J0aW9uJ1xuICAgICAgICB9IGVsc2UgaWYgKERmaENvbmZpZy5DTEFTU19QS1NfU09VUkNFX1BFX0lULmluY2x1ZGVzKHByZXZpZXcuZmtfY2xhc3MpKSB7XG4gICAgICAgICAgcmV0dXJuICdzb3VyY2UnXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdwZXJzaXN0ZW50LWVudGl0eSdcbiAgICAgIH0pXG4gICAgKVxuXG4gIH1cblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogSGVscGVyc1xuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICBzb3J0U3RhdGVtZW50c0J5UmVwb1BvcHVsYXJpdHkoc3RhdGVtZW50czogSW5mU3RhdGVtZW50W10pOiBJbmZTdGF0ZW1lbnRbXSB7XG4gICAgcmV0dXJuIHN0YXRlbWVudHMuc29ydCgoYSwgYikgPT4gYS5pc19pbl9wcm9qZWN0X2NvdW50ID4gYi5pc19pbl9wcm9qZWN0X2NvdW50ID8gMSA6IC0xKVxuICB9XG5cblxuXG59XG4iXX0=