import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DfhConfig } from '@kleiolab/lib-config';
import { combineLatestOrEmpty, TimeSpanUtil } from '@kleiolab/lib-utils';
import { omit, values } from 'ramda';
import { combineLatest, merge, of, pipe, BehaviorSubject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { spyTag } from '../decorators/method-decorators';
let InformationBasicPipesService = 
/**
 * This service contains a basic pipes for creating more complex
 * rxjs pipes. Each pipe takes non-observable parameters and
 * returns an observable. The method names are mainly
 * based on the type of the observable data
 */
class InformationBasicPipesService {
    // infRepo: InfSelector;
    constructor(p, s) {
        this.p = p;
        this.s = s;
        /**
         * Pipes max. one time primitive for an array of statements, assuming that the statements
         * are of the same properties.
         */
        this.timePrimitiveOfStatements = () => pipe(map((r) => r[0]), switchMap((r) => {
            if (!r)
                return new BehaviorSubject(undefined);
            return this.pipeInfTimePrimitive(r.fk_object_info).pipe(switchMap((infTimePrimitive) => this.p.pkProject$.pipe(switchMap((pkProject) => this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$
                .key(pkProject + '_' + r[0].pk_entity).pipe(filter(statement => !!statement), map(ipr => {
                const y = {
                    calendar: (ipr.calendar ? ipr.calendar : 'gregorian'),
                    julianDay: infTimePrimitive.julian_day,
                    duration: infTimePrimitive.duration
                };
                return y;
            }))))));
        }));
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
    pipeStatements(pkEntity, isOutgoing) {
        return isOutgoing ? this.pipeOutgoingStatements(pkEntity) : this.pipeIngoingStatements(pkEntity);
    }
    /**
    * Pipe outgoing statements of an entity
    */
    pipeOutgoingStatements(pkEntity) {
        return this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity });
    }
    /**
     * Pipe ingoing statements of an entity
     */
    pipeIngoingStatements(pkEntity) {
        return this.s.inf$.statement$.by_object$({ fk_object_info: pkEntity });
    }
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
     */
    pipeOutgoingStatementsByProperty(pkProperty, pkEntity) {
        return this.s.inf$.statement$.by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        });
    }
    /**
     * Pipe ingoing statements of an entity
     */
    pipeIngoingStatementsByProperty(pkProperty, pkEntity) {
        return this.s.inf$.statement$.by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        });
    }
    /**
   * Pipe outgoing statements of temporal entity
   */
    pipeOutgoingBasicStatementItemsByProperty(pkProperty, pkEntity, pkProject) {
        return this.s.inf$.statement$.by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }).pipe(switchMap(statements => combineLatestOrEmpty(statements.map(statement => this.pipeBasicStatementItem(pkProject, statement, true)))));
    }
    /**
     * Pipe ingoing statements of an entity
     */
    pipeIngoingBasicStatementItemsByProperty(pkProperty, pkEntity, pkProject) {
        return this.s.inf$.statement$.by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }).pipe(switchMap(statements => combineLatestOrEmpty(statements.map(statement => this.pipeBasicStatementItem(pkProject, statement, false)))));
    }
    pipeBasicStatementItem(pkProject, statement, isOutgoing) {
        return this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity).pipe(filter(x => !!x), map(projRel => ({
            projRel, statement, label: '', ordNum: (isOutgoing ? projRel.ord_num_of_range : projRel.ord_num_of_domain), isOutgoing
        })));
    }
    pipeBasicStatementItemByPkStatement(pkProject, pkStatement, isOutgoing) {
        return this.s.inf$.statement$.by_pk_entity_key$(pkStatement).pipe(switchMap(statement => (!statement) ? of(undefined) : this.pipeBasicStatementItem(pkProject, statement, isOutgoing)));
    }
    pipeInfTimePrimitive(pkEntity) {
        return this.s.inf$.time_primitive$.by_pk_entity$.key(pkEntity);
    }
    /**
     * pipes the TimeSpan of a temporal entity
     * @param pkEntity the pk_entity of the termporal entity
     */
    pipeTimeSpan(pkEntity) {
        // Get the properties leading to presences
        return combineLatest(this.pipeOutgoingStatementsByProperty(72, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(71, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(150, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(151, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(152, pkEntity).pipe(this.timePrimitiveOfStatements()), this.pipeOutgoingStatementsByProperty(153, pkEntity).pipe(this.timePrimitiveOfStatements())).pipe(map(([_72, _71, _150, _151, _152, _153]) => new TimeSpanUtil({
            p82: _72,
            p81: _71,
            p82a: _152,
            p81a: _150,
            p81b: _151,
            p82b: _153,
        })));
    }
    /**
     * Pipes the fk_class of the given entity
     */
    pipeClassOfEntity(pkEntity) {
        return merge(this.s.inf$.persistent_item$.by_pk_entity_key$(pkEntity).pipe(filter(e => !!e), map(e => e.fk_class)), this.s.inf$.temporal_entity$.by_pk_entity_key$(pkEntity).pipe(filter(e => !!e), map(e => e.fk_class)));
    }
    /**
     * Pipes distinct fk_classes of the given persistent items
     */
    pipeClassesOfPersistentItems(pkEntities) {
        return this.s.inf$.persistent_item$.by_pk_entity_all$().pipe(map((peIts) => {
            if (!pkEntities || pkEntities.length === 0) {
                return [];
            }
            const classes = {};
            const a = [];
            pkEntities.forEach(typePk => {
                if (!classes[peIts[typePk].fk_class]) {
                    classes[peIts[typePk].fk_class] = true;
                    a.push(peIts[typePk].fk_class);
                }
            });
            return a;
        }));
    }
    /*********************************************************************
     * Repo
    *********************************************************************/
    /**
      * Pipe repo outgoing statements.
      */
    pipeRepoOutgoingStatements(pkEntity) {
        return this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity }, false);
    }
    /**
    * Pipe repo ingoing statements.
    */
    pipeRepoIngoingStatements(pkEntity) {
        return this.s.inf$.statement$.by_object$({ fk_object_info: pkEntity }, false);
    }
    /**
      * Pipe repo outgoing statements.
      * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
      */
    pipeRepoOutgoingStatementsByProperty(pkProperty, pkEntity) {
        return combineLatest(this.s.dfh$.property$.by_pk_property$.key(pkProperty)
            .pipe(filter(x => !!x && Object.keys(x).length > 0), map(p => values(p)[0].range_instances_max_quantifier)), this.s.inf$.statement$
            .by_subject_and_property$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }, false)
        // .pipe(filter(x => !!x))
        ).pipe(map(([m, rs]) => {
            if (rs.length === 0)
                return rs;
            const r = this.sortStatementsByRepoPopularity(rs);
            return (m === -1 || m === null) ? r : r.slice(0, m);
        }));
    }
    /**
    * Pipe repo ingoing statements.
    * If max quantity is limited, takes only max allowed number of statements, starting with highest is_in_project_count
    */
    pipeRepoIngoingStatementsByProperty(pkProperty, pkEntity) {
        return combineLatest(this.s.dfh$.property$.by_pk_property$.key(pkProperty)
            .pipe(filter(x => !!x && Object.keys(x).length > 0), map(p => values(p)[0].domain_instances_max_quantifier)), this.s.inf$.statement$
            .by_object_and_property$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }, false)
        // .pipe(filter(x => !!x))
        ).pipe(map(([m, rs]) => {
            if (rs.length === 0)
                return rs;
            const r = this.sortStatementsByRepoPopularity(rs);
            return (m === -1 || m === null) ? r : r.slice(0, m);
        }));
    }
    /*********************************************************************
     * Alternatives (Repo minus Project)
    *********************************************************************/
    pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) {
        return combineLatest(this.s.inf$.statement$.by_pk_entity_key$(pkStatement, false), this.s.inf$.statement$.by_pk_entity_key$(pkStatement))
            .pipe(filter(([inrepo]) => !!inrepo), map(([inrepo, inproject]) => {
            if (inproject) {
                return undefined;
            }
            else {
                const i = {
                    projRel: undefined,
                    statement: inrepo,
                    ordNum: undefined,
                    isOutgoing,
                    label: ''
                };
                return i;
            }
        }));
    }
    /**
       * Pipe alternative ingoing statements (= statements not in active project)
       */
    pipeAlternativeIngoingStatements(pkProperty, pkEntity) {
        return combineLatest(this.s.inf$.statement$.by_object_and_property_indexed$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }, false), this.s.inf$.statement$.by_object_and_property_indexed$({
            fk_property: pkProperty,
            fk_object_info: pkEntity
        }).pipe(map(inproject => inproject ? Object.keys(inproject) : []))).pipe(map(([inrepo, inproject]) => omit(inproject, inrepo)), map(statements => values(statements)));
    }
    /**
     * Pipe alternative outgoing statements (= statements not in active project)
     */
    pipeAlternativeOutgoingStatements(pkProperty, pkEntity) {
        return combineLatest(this.s.inf$.statement$.by_subject_and_property_indexed$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }, false), this.s.inf$.statement$.by_subject_and_property_indexed$({
            fk_property: pkProperty,
            fk_subject_info: pkEntity
        }).pipe(map(inproject => inproject ? Object.keys(inproject) : []))).pipe(map(([inrepo, inproject]) => omit(inproject, inrepo)), map(statements => values(statements)));
    }
    /**
     * get array of pks of persistent items of a specific class
     */
    pipePersistentItemPksByClass(pkClass) {
        return this.s.inf$.persistent_item$.by_fk_class_key$(pkClass).pipe(map(ob => {
            if (ob)
                return Object.keys(ob).map(k => parseInt(k, 10));
            return [];
        }));
    }
    /**
     * gets the css classes for that entity
     * @param pkEntity
     */
    pipeIconType(pkEntity) {
        return this.p.streamEntityPreview(pkEntity).pipe(map(preview => {
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
        }));
    }
    /*********************************************************************
     * Helpers
     *********************************************************************/
    sortStatementsByRepoPopularity(statements) {
        return statements.sort((a, b) => a.is_in_project_count > b.is_in_project_count ? 1 : -1);
    }
};
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeStatements", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeOutgoingStatements", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeIngoingStatements", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeOutgoingStatementsByProperty", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeIngoingStatementsByProperty", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeOutgoingBasicStatementItemsByProperty", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeIngoingBasicStatementItemsByProperty", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeBasicStatementItem", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeBasicStatementItemByPkStatement", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeInfTimePrimitive", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeTimeSpan", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeClassOfEntity", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeClassesOfPersistentItems", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeRepoOutgoingStatements", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeRepoIngoingStatements", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeRepoOutgoingStatementsByProperty", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeRepoIngoingStatementsByProperty", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeAlternativeBasicStatementItemByPkStatement", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeAlternativeIngoingStatements", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipeAlternativeOutgoingStatements", null);
tslib_1.__decorate([
    spyTag
], InformationBasicPipesService.prototype, "pipePersistentItemPksByClass", null);
InformationBasicPipesService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
    /**
     * This service contains a basic pipes for creating more complex
     * rxjs pipes. Each pipe takes non-observable parameters and
     * returns an observable. The method names are mainly
     * based on the type of the observable data
     */
], InformationBasicPipesService);
export { InformationBasicPipesService };
//# sourceMappingURL=information-basic-pipes.service.js.map