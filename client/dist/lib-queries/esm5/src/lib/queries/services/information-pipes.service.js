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
     * @param stmt InfStatement to be completed with projRel
     * @param page page for which we are piping this stuff
     */
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
    InformationPipesService.prototype.pipeProjRelOfStatement = /*********************************************************************
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
     * @param {?} targets
     * @return {?}
     */
    InformationPipesService.prototype.pipeTargetOfStatement = /**
     * pipe the target of given statment
     * @param {?} stmt InfStatement to be completed with target
     * @param {?} page page for which we are piping this stuff
     * @param {?} targets
     * @return {?}
     */
    function (stmt, page, targets) {
        var _this = this;
        /** @type {?} */
        var isOutgoing = page.isOutgoing;
        /** @type {?} */
        var targetInfo = isOutgoing ? stmt.fk_object_info : stmt.fk_subject_info;
        // here you could add targetData or targetCell
        return this.s.inf$.getModelOfEntity$(targetInfo).pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; })), switchMap((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var subfieldType = targets[item.fkClass];
            if (subfieldType.appellation) {
                return _this.s.inf$.appellation$.by_pk_entity$.key(targetInfo).pipe(filter((/**
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
                        targetClass: appellation.fk_class,
                        target: {
                            appellation: appellation
                        }
                    };
                    return stmtTarget;
                })));
            }
            else if (subfieldType.place) {
                return _this.s.inf$.place$.by_pk_entity$.key(targetInfo).pipe(filter((/**
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
                        targetClass: place.fk_class,
                        target: {
                            place: place
                        }
                    };
                    return stmtTarget;
                })));
            }
            else if (subfieldType.dimension) {
                return _this.s.inf$.dimension$.by_pk_entity$.key(targetInfo).pipe(filter((/**
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
                            targetClass: dimension.fk_class,
                            target: {
                                dimension: dimension
                            }
                        };
                        return stmtTarget;
                    })));
                })));
            }
            else if (subfieldType.langString) {
                return _this.s.inf$.lang_string$.by_pk_entity$.key(targetInfo).pipe(filter((/**
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
                            targetClass: langString.fk_class,
                            target: {
                                langString: langString
                            }
                        };
                        return stmtTarget;
                    })));
                })));
            }
            else if (subfieldType.language) {
                return _this.s.inf$.language$.by_pk_entity$.key(targetInfo).pipe(filter((/**
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
                        targetClass: language.fk_class,
                        target: {
                            language: language
                        }
                    };
                    return stmtTarget;
                })));
            }
            else if (subfieldType.entityPreview || subfieldType.typeItem) {
                return _this.p.streamEntityPreview(targetInfo).pipe(filter((/**
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
                        targetClass: entityPreview.fk_class,
                        target: {
                            entityPreview: entityPreview
                        }
                    };
                    return stmtTarget;
                })));
            }
            else if (subfieldType.temporalEntity) {
                return _this.s.inf$.temporal_entity$._by_pk_entity$.key(targetInfo).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; })), map((/**
                 * @param {?} temporalEntity
                 * @return {?}
                 */
                function (temporalEntity) {
                    /** @type {?} */
                    var stmtTarget = {
                        statement: stmt,
                        isOutgoing: isOutgoing,
                        targetLabel: "",
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
                return _this.s.inf$.time_primitive$.by_pk_entity$.key(targetInfo).pipe(filter((/**
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
                            targetClass: timePrimitive.fk_class,
                            target: {
                                timePrimitive: timePrimWithCal
                            }
                        };
                        return stmtTarget;
                    })));
                })));
            }
            throw new Error("No implementation found for subfieldType " + JSON.stringify(subfieldType));
        })));
    };
    /**
     * pipe target and projRel of the given statement
     */
    /**
     * pipe target and projRel of the given statement
     * @param {?} stmt
     * @param {?} page
     * @param {?} targets
     * @return {?}
     */
    InformationPipesService.prototype.pipeStatementWithTarget = /**
     * pipe target and projRel of the given statement
     * @param {?} stmt
     * @param {?} page
     * @param {?} targets
     * @return {?}
     */
    function (stmt, page, targets) {
        return combineLatest(this.pipeTargetOfStatement(stmt, page, targets), this.pipeProjRelOfStatement(stmt, page)).pipe(map((/**
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
     * @param {?} targets
     * @return {?}
     */
    InformationPipesService.prototype.pipeSubfieldPage = /**
     * @param {?} page
     * @param {?} targets
     * @return {?}
     */
    function (page, targets) {
        var _this = this;
        if (page.property.fkProperty === DfhConfig.PROPERTY_PK_HAS_TIME_SPAN && page.isOutgoing) {
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
            function (stmt) { return _this.pipeStatementWithTarget(stmt, page, targets); }))); }))); })))).pipe(map((/**
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
     * @return {?}
     */
    InformationPipesService.prototype.pipeTimeSpan = /**
     * @private
     * @param {?} page
     * @return {?}
     */
    function (page) {
        var _this = this;
        /** @type {?} */
        var virtualStatementToTimeSpan = { fk_object_info: page.source.fkInfo };
        // const targets: GvFieldTargets = { [DfhConfig.ClASS_PK_TIME_SPAN]: { timeSpan: 'true' } }
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
            var _a;
            // console.log('subentity subfield for targetInfo', targetInfo)
            // create page:GvSubfieldPage
            /** @type {?} */
            var scope = page.scope.notInProject ? { inRepo: true } : page.scope;
            /** @type {?} */
            var nestedPage = {
                property: { fkProperty: fkProperty },
                isOutgoing: true,
                limit: 1,
                offset: 0,
                source: page.source,
                scope: scope,
            };
            /** @type {?} */
            var subfType = {
                timePrimitive: 'true'
            };
            /** @type {?} */
            var trgts = (_a = {},
                _a[DfhConfig.CLASS_PK_TIME_PRIMITIVE] = subfType,
                _a);
            return _this.pipeSubfieldPage(nestedPage, trgts).pipe(map((/**
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
                statement: virtualStatementToTimeSpan,
                isOutgoing: page.isOutgoing,
                targetLabel: _this.timeSpanPipe.transform(new TimeSpanUtil(timeSpanPreview)),
                targetClass: DfhConfig.ClASS_PK_TIME_SPAN,
                target: {
                    timeSpan: {
                        preview: timeSpanPreview,
                        subfields: subfields
                    }
                }
            };
            return stmtTarget;
        }))).pipe(map((/**
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
     */
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
    InformationPipesService.prototype.pipeLabelOfEntity = 
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
    function (fkEntity) {
        return this.p.streamEntityPreview(fkEntity).pipe(map((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return p.entity_label; })));
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
        function (f) { return !!f.property.fkProperty; }))
            .map((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return ({
            isOutgoing: f.isOutgoing,
            fkPropertyDomain: f.isOutgoing ? f.sourceClass : null,
            fkPropertyRange: f.isOutgoing ? null : f.sourceClass,
            pkProperty: f.property.fkProperty
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbmZvcm1hdGlvbi1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuSCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBTXRFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUs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QUFvQztJQUNwQyxpQkFBaUI7SUFDakIsY0FBYztJQUNkLGFBQWE7SUFDYixVQUFVO0lBQ1YsU0FBUztJQUVULE1BQU07SUFDTixJQUFJO0lBR0o7Ozs7T0FJRztJQUNILFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNWLG1EQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQWpCLFVBQWtCLFFBQWdCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRzs7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Z0JBWFEsNEJBQTRCO2dCQUY1Qix5QkFBeUI7Z0JBR3pCLHNCQUFzQjtnQkFGdEIseUJBQXlCO2dCQWJNLGlCQUFpQjtnQkFBRSxZQUFZO2dCQU45RCxPQUFPOzs7SUE4akRkO1FBRkMsTUFBTTtRQUNOLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7OztzRUFLMUI7SUFJRDtRQUZDLE1BQU07UUFDTixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7Ozs7K0VBSzFCO0lBSUQ7UUFGQyxNQUFNO1FBQ04sS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7Z0RBQytELFVBQVU7d0VBZ0NuRztJQTBCRDtRQURDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7O2dEQUN3QixVQUFVO2lGQTZDNUQ7SUFHRDtRQURDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7O2dEQUN1QyxVQUFVO3VGQVMzRTtrQ0Fsc0RIO0NBdXVEQyxBQXpzREQsSUF5c0RDO1NBenJEWSx1QkFBdUI7OztJQUVsQywwQ0FBcUI7Ozs7O0lBR25CLG9DQUF1Qzs7Ozs7SUFDdkMsb0NBQW9DOzs7OztJQUNwQyxvQ0FBaUM7Ozs7O0lBQ2pDLG9DQUFvQzs7SUFDcEMsb0RBQTJDOzs7OztJQUMzQywrQ0FBa0M7Ozs7Ozs7QUFpckR0QyxNQUFNLFVBQVUsc0JBQXNCLENBQUMsVUFBa0IsRUFBRSxVQUFtQjtJQUM1RSxPQUFPLEdBQUcsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZmhDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IEluZlN0YXRlbWVudCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBHdkZpZWxkUGFnZSwgR3ZGaWVsZFRhcmdldHMsIEd2VGFyZ2V0VHlwZSwgVGltZVByaW1pdGl2ZVdpdGhDYWwsIFdhckVudGl0eVByZXZpZXdUaW1lU3BhbiB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0T3JFbXB0eSwgc29ydEFiYywgVGltZVByaW1pdGl2ZVBpcGUsIFRpbWVTcGFuUGlwZSwgVGltZVNwYW5VdGlsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBlcXVhbHMsIGZsYXR0ZW4sIHVuaXEsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgZW1wdHksIGlpZiwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2FjaGUsIHNweVRhZyB9IGZyb20gJy4uL2RlY29yYXRvcnMvbWV0aG9kLWRlY29yYXRvcnMnO1xuaW1wb3J0IHsgaW5mVGltZVByaW1Ub1RpbWVQcmltV2l0aENhbCB9IGZyb20gJy4uL2Z1bmN0aW9ucy9mdW5jdGlvbnMnO1xuaW1wb3J0IHsgQ2xhc3NBbmRUeXBlTm9kZSB9IGZyb20gJy4uL21vZGVscy9DbGFzc0FuZFR5cGVOb2RlJztcbmltcG9ydCB7IENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL0NsYXNzQW5kVHlwZVNlbGVjdE1vZGVsJztcbmltcG9ydCB7IFByb3BlcnR5T3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL1Byb3BlcnR5T3B0aW9uJztcbmltcG9ydCB7IFByb3BlcnR5U2VsZWN0TW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvUHJvcGVydHlTZWxlY3RNb2RlbCc7XG5pbXBvcnQgeyBTdGF0ZW1lbnRQcm9qUmVsLCBTdGF0ZW1lbnRUYXJnZXQsIFN0YXRlbWVudFdpdGhUYXJnZXQsIFN1YmVudGl0eVN1YmZpZWxkUGFnZSwgU3ViZmllbGRQYWdlIH0gZnJvbSAnLi4vbW9kZWxzL1N0YXRlbWVudFdpdGhUYXJnZXQnO1xuaW1wb3J0IHsgSW5mU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvaW5mLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSB9IGZyb20gJy4vYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uLXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW5mb3JtYXRpb25CYXNpY1BpcGVzU2VydmljZSB9IGZyb20gJy4vaW5mb3JtYXRpb24tYmFzaWMtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zY2hlbWEtc2VsZWN0b3JzLnNlcnZpY2UnO1xuXG5cblxuXG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbi8qKlxuICogVGhpcyBTZXJ2aWNlIHByb3ZpZGVzIGEgY29sbGVjaW9uIG9mIHBpcGVzIHRoYXQgYWdncmVnYXRlIG9yIHRyYW5zZm9ybSBpbmZvcm1hdGlvbi5cbiAqIEZvciBFeGFtcGxlXG4gKiAtIHRoZSBsaXN0cyBvZiB0ZXh0IHByb3BlcnRpZXMsIGFwcGVsbGFpdG9ucywgcGxhY2VzLCB0aW1lLXByaW1pdGl2ZXMgLyB0aW1lLXNwYW5zIGV0Yy5cbiAqIC0gdGhlIGxhYmVsIG9mIHRlbXBvcmFsIGVudGl0eSBvciBwZXJzaXN0ZW50IGl0ZW1cbiAqXG4gKiBUaGlzIG1haW5seSBzZWxlY3RzIGRhdGEgZnJvbSB0aGUgaW5mb3JtYXRpb24gc2NoZW1hIGFuZCB0aGUgcmVsYXRpb24gdG8gcHJvamVjdHMuXG4gKiBJdCBjb21iaW5lcyBwaXBlcyBzZWxlY3RpbmcgZGF0YSBmcm9tIHRoZVxuICogLSBhY3RpdmF0ZWQgcHJvamVjdFxuICogLSBhbHRlcm5hdGl2ZXMgKG5vdCBpbiBwcm9qZWN0IGJ1dCBpbiBvdGhlcnMpXG4gKiAtIHJlcG9cbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZvcm1hdGlvblBpcGVzU2VydmljZSB7XG5cbiAgaW5mUmVwbzogSW5mU2VsZWN0b3I7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBiOiBJbmZvcm1hdGlvbkJhc2ljUGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcDogQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSxcbiAgICBwcml2YXRlIHM6IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjOiBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlLFxuICAgIHB1YmxpYyB0aW1lUHJpbWl0aXZlUGlwZTogVGltZVByaW1pdGl2ZVBpcGUsXG4gICAgcHJpdmF0ZSB0aW1lU3BhblBpcGU6IFRpbWVTcGFuUGlwZSxcbiAgICBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT5cbiAgKSB7XG4gICAgdGhpcy5pbmZSZXBvID0gbmV3IEluZlNlbGVjdG9yKG5nUmVkdXgsIG9mKCdyZXBvJykpXG4gIH1cblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogUGlwZSB0aGUgcHJvamVjdCBlbnRpdGllc1xuICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8vICAgLy8gQHNweVRhZ1xuICAvLyAgIHBpcGVMaXN0TGVuZ3RoKGw6IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgLy8gICAgIHN3aXRjaCAobC5saXN0VHlwZSkge1xuICAvLyAgICAgICBjYXNlICdhcHBlbGxhdGlvbic6XG4gIC8vICAgICAgIGNhc2UgJ2VudGl0eS1wcmV2aWV3JzpcbiAgLy8gICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAvLyAgICAgICBjYXNlICdwbGFjZSc6XG4gIC8vICAgICAgIGNhc2UgJ2RpbWVuc2lvbic6XG4gIC8vICAgICAgIGNhc2UgJ2xhbmdTdHJpbmcnOlxuICAvLyAgICAgICBjYXNlICd0ZW1wb3JhbC1lbnRpdHknOlxuICAvLyAgICAgICAgIHJldHVybiB0aGlzLnBpcGVMaXN0KGwsIHBrRW50aXR5KS5waXBlKG1hcChpdGVtcyA9PiBpdGVtcy5sZW5ndGgpKVxuXG4gIC8vICAgICAgIGNhc2UgJ3RpbWUtc3Bhbic6XG4gIC8vICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gIC8vICAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoNzIsIHBrRW50aXR5KSxcbiAgLy8gICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSg3MSwgcGtFbnRpdHkpLFxuICAvLyAgICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MCwgcGtFbnRpdHkpLFxuICAvLyAgICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MSwgcGtFbnRpdHkpLFxuICAvLyAgICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MiwgcGtFbnRpdHkpLFxuICAvLyAgICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDE1MywgcGtFbnRpdHkpXG4gIC8vICAgICAgICAgKS5waXBlKFxuICAvLyAgICAgICAgICAgdGFwKCh4KSA9PiB7XG5cbiAgLy8gICAgICAgICAgIH0pLFxuICAvLyAgICAgICAgICAgbWFwKGl0ZW1zID0+IGl0ZW1zLmZpbHRlcih4ID0+IHgubGVuZ3RoID4gMCkubGVuZ3RoKSlcblxuICAvLyAgICAgICAvLyBjYXNlICd0ZXh0LXByb3BlcnR5JzpcbiAgLy8gICAgICAgLy8gICByZXR1cm4gdGhpcy5waXBlTGlzdFRleHRQcm9wZXJ0eShsLCBwa0VudGl0eSkucGlwZShtYXAoaXRlbXMgPT4gaXRlbXMubGVuZ3RoKSlcblxuICAvLyAgICAgICBkZWZhdWx0OlxuICAvLyAgICAgICAgIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICAvLyAgICAgICAgIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xuICAvLyAgICAgfVxuICAvLyAgIH1cblxuICAvLyAgIC8vIEBzcHlUYWdcbiAgLy8gICBwaXBlTGlzdChsOiBTdWJmaWVsZCwgcGtFbnRpdHksIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxJdGVtTGlzdD4ge1xuICAvLyAgICAgaWYgKGwubGlzdFR5cGUuYXBwZWxsYXRpb24pIHJldHVybiB0aGlzLnBpcGVMaXN0QXBwZWxsYXRpb24obCwgcGtFbnRpdHksIGxpbWl0KVxuICAvLyAgICAgZWxzZSBpZiAobC5saXN0VHlwZS5lbnRpdHlQcmV2aWV3KSByZXR1cm4gdGhpcy5waXBlTGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHksIGxpbWl0KVxuICAvLyAgICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5ndWFnZSkgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5ndWFnZShsLCBwa0VudGl0eSwgbGltaXQpXG4gIC8vICAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnBsYWNlKSByZXR1cm4gdGhpcy5waXBlTGlzdFBsYWNlKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgLy8gICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gdGhpcy5waXBlTGlzdERpbWVuc2lvbihsLCBwa0VudGl0eSwgbGltaXQpXG4gIC8vICAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmdTdHJpbmcpIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ1N0cmluZyhsLCBwa0VudGl0eSwgbGltaXQpXG4gIC8vICAgICBlbHNlIGlmIChsLmxpc3RUeXBlLnRlbXBvcmFsRW50aXR5KSByZXR1cm4gdGhpcy5waXBlTGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHksIGxpbWl0KVxuICAvLyAgICAgZWxzZSBpZiAobC5saXN0VHlwZS50aW1lU3Bhbikge1xuICAvLyAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVRpbWVTcGFuKHBrRW50aXR5KS5waXBlKFxuICAvLyAgICAgICAgIG1hcCgodHMpID0+IFt0c10uZmlsdGVyKGkgPT4gaS5wcm9wZXJ0aWVzLmxlbmd0aCA+IDApKVxuICAvLyAgICAgICApXG4gIC8vICAgICB9XG4gIC8vICAgICBlbHNlIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdFR5cGUnKVxuICAvLyAgIH1cblxuICAvLyAgIC8vIEBzcHlUYWdcbiAgLy8gICBwaXBlTGlzdEJhc2ljU3RhdGVtZW50SXRlbXMobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBwa1Byb2plY3Q6IG51bWJlcik6IE9ic2VydmFibGU8QmFzaWNTdGF0ZW1lbnRJdGVtW10+IHtcbiAgLy8gICAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gIC8vICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdCYXNpY1N0YXRlbWVudEl0ZW1zQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSwgcGtQcm9qZWN0KSA6XG4gIC8vICAgICAgIHRoaXMuYi5waXBlSW5nb2luZ0Jhc2ljU3RhdGVtZW50SXRlbXNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5LCBwa1Byb2plY3QpXG4gIC8vICAgICApXG4gIC8vICAgfVxuXG4gIC8vICAgLyoqXG4gIC8vICAgICogUGlwZSB0aGUgaXRlbXMgaW4gYXBwZWxsYXRpb24gZmllbGRcbiAgLy8gICAgKi9cbiAgLy8gICAvLyBAc3B5VGFnXG4gIC8vICAgcGlwZUxpc3RBcHBlbGxhdGlvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW1bXT4ge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gIC8vICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKSkpXG4gIC8vICAgICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAvLyAgICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgICAgfSkpXG4gIC8vICAgfVxuXG4gIC8vICAgLyoqXG4gIC8vICAqIFBpcGUgdGhlIGl0ZW1zIGluIGVudGl0eSBwcmV2aWV3IGZpZWxkXG4gIC8vICAqL1xuICAvLyAgIC8vIEBzcHlUYWdcbiAgLy8gICBwaXBlTGlzdEVudGl0eVByZXZpZXc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgLy8gICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgdGFnKGBiZWZvcmUtJHtwa0VudGl0eX0tJHtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5fS0ke2xpc3REZWZpbml0aW9uLnRhcmdldENsYXNzfWApLFxuICAvLyAgICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpKSlcbiAgLy8gICAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKVxuICAvLyAgICAgICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEub3JkTnVtID4gYi5vcmROdW0gPyAxIDogLTEpLFxuICAvLyAgICAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gIC8vICAgICAgICAgICAgICAgKSxcbiAgLy8gICAgICAgICAgICAgICBzdGFydFdpdGgoW10pXG4gIC8vICAgICAgICAgICAgIClcbiAgLy8gICAgICAgICB9KSxcbiAgLy8gICAgICAgICB0YWcoYGFmdGVyLSR7cGtFbnRpdHl9LSR7bGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eX0tJHtsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzc31gKSxcbiAgLy8gICAgICAgKVxuXG4gIC8vICAgfVxuXG5cbiAgLy8gICAvLyBAc3B5VGFnXG4gIC8vICAgcGlwZUxpc3RMYW5ndWFnZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW1bXT4ge1xuXG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgLy8gICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpKSlcbiAgLy8gICAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gIC8vICAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgICB9KSlcbiAgLy8gICB9XG5cbiAgLy8gICAvKipcbiAgLy8gICAgKiBQaXBlIHRoZSBpdGVtcyBpbiBwbGFjZSBsaXN0XG4gIC8vICAgICovXG4gIC8vICAgLy8gQHNweVRhZ1xuICAvLyAgIHBpcGVMaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gIC8vICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1QbGFjZShyKSkpXG4gIC8vICAgICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAvLyAgICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgICAgfSkpXG4gIC8vICAgfVxuXG4gIC8vICAgLyoqXG4gIC8vICAgICogUGlwZSB0aGUgaXRlbXMgaW4gcGxhY2UgbGlzdFxuICAvLyAgICAqL1xuICAvLyAgIC8vIEBzcHlUYWdcbiAgLy8gICBwaXBlTGlzdERpbWVuc2lvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtW10+IHtcblxuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gIC8vICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1EaW1lbnNpb24ocikpKVxuICAvLyAgICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgLy8gICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICAgIH0pKVxuICAvLyAgIH1cblxuICAvLyAgIC8qKlxuICAvLyAgKiBQaXBlIHRoZSBpdGVtcyBpbiBsYW5nU3RyaW5nIGxpc3RcbiAgLy8gICovXG4gIC8vICAgLy8gQHNweVRhZ1xuICAvLyAgIHBpcGVMaXN0TGFuZ1N0cmluZzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxMYW5nU3RyaW5nSXRlbVtdPiB7XG5cbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAvLyAgICAgICAucGlwZShcbiAgLy8gICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ1N0cmluZyhyKSkpXG4gIC8vICAgICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAvLyAgICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgICAgfSkpXG5cbiAgLy8gICB9XG5cbiAgLyoqXG4gICAqIHBpcGUgdGhlIHByb2plY3QgcmVsYXRpb24gb2YgZ2l2ZW4gc3RhdG1lbnQsIGlmIHRoZSBzY29wZSBvZiB0aGlzIHBhZ2UgaXMgaW5Qcm9qZWN0XG4gICAqIEBwYXJhbSBzdG10IEluZlN0YXRlbWVudCB0byBiZSBjb21wbGV0ZWQgd2l0aCBwcm9qUmVsXG4gICAqIEBwYXJhbSBwYWdlIHBhZ2UgZm9yIHdoaWNoIHdlIGFyZSBwaXBpbmcgdGhpcyBzdHVmZlxuICAgKi9cbiAgcGlwZVByb2pSZWxPZlN0YXRlbWVudChzdG10OiBJbmZTdGF0ZW1lbnQsIHBhZ2U6IEd2RmllbGRQYWdlKTogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRQcm9qUmVsPiB7XG4gICAgaWYgKHBhZ2Uuc2NvcGUuaW5Qcm9qZWN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JFxuICAgICAgICAua2V5KHBhZ2Uuc2NvcGUuaW5Qcm9qZWN0ICsgJ18nICsgc3RtdC5wa19lbnRpdHkpLnBpcGUoXG4gICAgICAgICAgbWFwKFxuICAgICAgICAgICAgcHJvalJlbCA9PiAoe1xuICAgICAgICAgICAgICBwcm9qUmVsLFxuICAgICAgICAgICAgICBvcmROdW06IHBhZ2UuaXNPdXRnb2luZyA/IHByb2pSZWwub3JkX251bV9vZl9yYW5nZSA6IHByb2pSZWwub3JkX251bV9vZl9kb21haW5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0KHtcbiAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICBvcmROdW06IDBcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBwaXBlIHRoZSB0YXJnZXQgb2YgZ2l2ZW4gc3RhdG1lbnRcbiAgICogQHBhcmFtIHN0bXQgSW5mU3RhdGVtZW50IHRvIGJlIGNvbXBsZXRlZCB3aXRoIHRhcmdldFxuICAgKiBAcGFyYW0gcGFnZSBwYWdlIGZvciB3aGljaCB3ZSBhcmUgcGlwaW5nIHRoaXMgc3R1ZmZcbiAgICogQHBhcmFtIHN1YmZpZWxkVHlwZSB0eXBlIG9mIHN1YmZpZWxkIGZvciB3aGljaCB3ZSBwaXBlIHRoaXMgc3R1ZmZcbiAgICovXG4gIHBpcGVUYXJnZXRPZlN0YXRlbWVudChzdG10OiBJbmZTdGF0ZW1lbnQsIHBhZ2U6IEd2RmllbGRQYWdlLCB0YXJnZXRzOiBHdkZpZWxkVGFyZ2V0cyk6IE9ic2VydmFibGU8U3RhdGVtZW50VGFyZ2V0PiB7XG4gICAgY29uc3QgaXNPdXRnb2luZyA9IHBhZ2UuaXNPdXRnb2luZ1xuICAgIGNvbnN0IHRhcmdldEluZm8gPSBpc091dGdvaW5nID8gc3RtdC5ma19vYmplY3RfaW5mbyA6IHN0bXQuZmtfc3ViamVjdF9pbmZvO1xuICAgIC8vIGhlcmUgeW91IGNvdWxkIGFkZCB0YXJnZXREYXRhIG9yIHRhcmdldENlbGxcblxuXG4gICAgcmV0dXJuIHRoaXMucy5pbmYkLmdldE1vZGVsT2ZFbnRpdHkkKHRhcmdldEluZm8pLnBpcGUoXG4gICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgc3dpdGNoTWFwKGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBzdWJmaWVsZFR5cGU6IEd2VGFyZ2V0VHlwZSA9IHRhcmdldHNbaXRlbS5ma0NsYXNzXVxuICAgICAgICBpZiAoc3ViZmllbGRUeXBlLmFwcGVsbGF0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmFwcGVsbGF0aW9uJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgICAgICAgIG1hcChhcHBlbGxhdGlvbiA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogYXBwZWxsYXRpb24uc3RyaW5nLFxuICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBhcHBlbGxhdGlvbi5ma19jbGFzcyxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgIGFwcGVsbGF0aW9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUucGxhY2UpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQucGxhY2UkLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICAgICAgbWFwKHBsYWNlID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIHRhcmdldExhYmVsOiBgV0dTODQ6ICR7cGxhY2UubGF0fcKwLCAke3BsYWNlLmxvbmd9wrBgLFxuICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBwbGFjZS5ma19jbGFzcyxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgIHBsYWNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUuZGltZW5zaW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmRpbWVuc2lvbiQuYnlfcGtfZW50aXR5JC5rZXkodGFyZ2V0SW5mbykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgICAgICBzd2l0Y2hNYXAoZGltZW5zaW9uID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KGRpbWVuc2lvbi5ma19tZWFzdXJlbWVudF91bml0KVxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICB1bml0UHJldmlldyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldExhYmVsOiBgJHtkaW1lbnNpb24ubnVtZXJpY192YWx1ZX0gJHt1bml0UHJldmlldy5lbnRpdHlfbGFiZWx9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBkaW1lbnNpb24uZmtfY2xhc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS5sYW5nU3RyaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmdfc3RyaW5nJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgICAgICAgIHN3aXRjaE1hcChsYW5nU3RyaW5nID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleShsYW5nU3RyaW5nLmZrX2xhbmd1YWdlKVxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldExhYmVsOiBgJHtsYW5nU3RyaW5nLnN0cmluZ30gKCR7bGFuZ3VhZ2UuaXNvNjM5MX0pYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBsYW5nU3RyaW5nLmZrX2NsYXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmdTdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLmxhbmd1YWdlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgICAgICAgIG1hcChsYW5ndWFnZSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogYCR7bGFuZ3VhZ2Uubm90ZXMgfHwgbGFuZ3VhZ2UuaXNvNjM5MX1gLFxuICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBsYW5ndWFnZS5ma19jbGFzcyxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgIGxhbmd1YWdlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUuZW50aXR5UHJldmlldyB8fCBzdWJmaWVsZFR5cGUudHlwZUl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcodGFyZ2V0SW5mbykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgICAgICBtYXAoZW50aXR5UHJldmlldyA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogYCR7ZW50aXR5UHJldmlldy5lbnRpdHlfbGFiZWx9YCxcbiAgICAgICAgICAgICAgICB0YXJnZXRDbGFzczogZW50aXR5UHJldmlldy5ma19jbGFzcyxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgIGVudGl0eVByZXZpZXdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLnRlbXBvcmFsRW50aXR5KSB7XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQudGVtcG9yYWxfZW50aXR5JC5fYnlfcGtfZW50aXR5JC5rZXkodGFyZ2V0SW5mbykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgICAgICBtYXAodGVtcG9yYWxFbnRpdHkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IGBgLFxuICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiB0ZW1wb3JhbEVudGl0eS5ma19jbGFzcyxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgIGVudGl0eToge1xuICAgICAgICAgICAgICAgICAgICBwa0VudGl0eTogdGVtcG9yYWxFbnRpdHkucGtfZW50aXR5LFxuICAgICAgICAgICAgICAgICAgICBma0NsYXNzOiB0ZW1wb3JhbEVudGl0eS5ma19jbGFzc1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eS5sZW5ndGgnLCBzdWJmaWVsZFR5cGUudGVtcG9yYWxFbnRpdHkubGVuZ3RoKVxuXG4gICAgICAgICAgLy8gLy8gZm9yIGVhY2ggb2YgdGhlc2Ugc3ViZmllbGRzXG4gICAgICAgICAgLy8gY29uc3Qgc3ViZW50aXR5UGFnZXMkID0gc3ViZmllbGRUeXBlLnRlbXBvcmFsRW50aXR5Lm1hcChzdWJmaWVsZFJlcSA9PiB7XG5cbiAgICAgICAgICAvLyAgIC8vIGNvbnNvbGUubG9nKCdzdWJlbnRpdHkgc3ViZmllbGQgZm9yIHRhcmdldEluZm8nLCB0YXJnZXRJbmZvKVxuXG4gICAgICAgICAgLy8gICAvLyBjcmVhdGUgcGFnZTpHdlN1YmZpZWxkUGFnZVxuICAgICAgICAgIC8vICAgY29uc3QgeyBpc0NpcmN1bGFyLCAuLi5wIH0gPSBzdWJmaWVsZFJlcS5wYWdlXG4gICAgICAgICAgLy8gICBjb25zdCBzY29wZSA9IHBhZ2Uuc2NvcGUubm90SW5Qcm9qZWN0ID8geyBpblJlcG86IHRydWUgfSA6IHBhZ2Uuc2NvcGVcbiAgICAgICAgICAvLyAgIGNvbnN0IG5lc3RlZFBhZ2U6IEd2RmllbGRQYWdlID0ge1xuICAgICAgICAgIC8vICAgICAuLi5wLFxuICAgICAgICAgIC8vICAgICBma1NvdXJjZUVudGl0eTogdGFyZ2V0SW5mbyxcbiAgICAgICAgICAvLyAgICAgc2NvcGUsXG4gICAgICAgICAgLy8gICB9XG5cbiAgICAgICAgICAvLyAgIHJldHVybiB0aGlzLnBpcGVTdWJmaWVsZFBhZ2UobmVzdGVkUGFnZSwgc3ViZmllbGRSZXEuc3ViZmllbGRUeXBlKS5waXBlKFxuICAgICAgICAgIC8vICAgICBtYXAoKHsgY291bnQsIHN0YXRlbWVudHMgfSkgPT4ge1xuICAgICAgICAgIC8vICAgICAgIGNvbnN0IHsgbGltaXQsIG9mZnNldCwgLi4ucyB9ID0gbmVzdGVkUGFnZTtcbiAgICAgICAgICAvLyAgICAgICBjb25zdCBzdWJlbnRpdHlTdWJmaWVsZFBhZ2U6IFN1YmVudGl0eVN1YmZpZWxkUGFnZSA9IHtcbiAgICAgICAgICAvLyAgICAgICAgIHN1YmZpZWxkOiBzLFxuICAgICAgICAgIC8vICAgICAgICAgY291bnQsXG4gICAgICAgICAgLy8gICAgICAgICBzdGF0ZW1lbnRzXG4gICAgICAgICAgLy8gICAgICAgfVxuICAgICAgICAgIC8vICAgICAgIHJldHVybiBzdWJlbnRpdHlTdWJmaWVsZFBhZ2VcbiAgICAgICAgICAvLyAgICAgfSksXG4gICAgICAgICAgLy8gICAgIC8vIHN0YXJ0V2l0aCh1bmRlZmluZWQpIC8vIFRPRE8gcmVtb3ZlISB0aGlzIGlzIGZvciBkZWJ1Z2dpbmdcbiAgICAgICAgICAvLyAgIClcbiAgICAgICAgICAvLyB9KVxuXG4gICAgICAgICAgLy8gcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KHN1YmVudGl0eVBhZ2VzJClcbiAgICAgICAgICAvLyAgIC5waXBlKFxuICAgICAgICAgIC8vICAgICAvLyBmaWx0ZXIoc3ViZmllbGRzID0+IHtcbiAgICAgICAgICAvLyAgICAgLy8gICBjb25zb2xlLmxvZygnc3ViZmllbGRzXFxuJywgc3ViZmllbGRzLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgIC8vICAgICAvLyAgICAgY29uc3QgcmVxID0gc3ViZmllbGRUeXBlLnRlbXBvcmFsRW50aXR5W2ldXG4gICAgICAgICAgLy8gICAgIC8vICAgICBjb25zdCBmaWVsZEluZm8gPSB0YXJnZXRJbmZvICsgJ18nICsgcmVxLnBhZ2UuZmtQcm9wZXJ0eSArICdfJyArIHJlcS5wYWdlLnRhcmdldENsYXNzICsgJ18nICsga2V5cyhyZXEuc3ViZmllbGRUeXBlKVswXVxuICAgICAgICAgIC8vICAgICAvLyAgICAgcmV0dXJuIGAke2l9OiAke2l0ZW0gPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgLy8gICAgIC8vICAgICAgIGB1bmRlZmluZWQgJHtmaWVsZEluZm99YCA6XG4gICAgICAgICAgLy8gICAgIC8vICAgICAgIGBvayAgICAgICAgJHtmaWVsZEluZm99YFxuICAgICAgICAgIC8vICAgICAvLyAgICAgICB9YFxuICAgICAgICAgIC8vICAgICAvLyAgIH0pLmpvaW4oJ1xcbicpKVxuICAgICAgICAgIC8vICAgICAvLyAgIHJldHVybiAhc3ViZmllbGRzLmluY2x1ZGVzKHVuZGVmaW5lZClcbiAgICAgICAgICAvLyAgICAgLy8gfSksXG4gICAgICAgICAgLy8gICAgIG1hcChcbiAgICAgICAgICAvLyAgICAgICBzdWJmaWVsZHMgPT4ge1xuICAgICAgICAgIC8vICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgIC8vICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgLy8gICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgLy8gICAgICAgICAgIHRhcmdldExhYmVsOiAnJyxcbiAgICAgICAgICAvLyAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHBhZ2UudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgLy8gICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgIC8vICAgICAgICAgICAgIGVudGl0eToge1xuICAgICAgICAgIC8vICAgICAgICAgICAgICAgcGtFbnRpdHk6IHRhcmdldEluZm8sXG4gICAgICAgICAgLy8gICAgICAgICAgICAgICBzdWJmaWVsZHNcbiAgICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgICAgLy8gICAgICAgICAgIH1cbiAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAvLyAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG4gICAgICAgICAgLy8gICAgICAgfVxuICAgICAgICAgIC8vICAgICApXG4gICAgICAgICAgLy8gICApXG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUudGltZVByaW1pdGl2ZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnMuaW5mJC50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkodGFyZ2V0SW5mbykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgICAgICBzd2l0Y2hNYXAodGltZVByaW1pdGl2ZSA9PiB7XG4gICAgICAgICAgICAgIC8vIGdldCBjYWxlbmRhclxuICAgICAgICAgICAgICBsZXQgY2FsJDogT2JzZXJ2YWJsZTxUaW1lUHJpbWl0aXZlV2l0aENhbC5DYWxlbmRhckVudW0+XG4gICAgICAgICAgICAgIGlmIChwYWdlLnNjb3BlLmluUHJvamVjdCkge1xuICAgICAgICAgICAgICAgIGNhbCQgPSB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkLmtleShwYWdlLnNjb3BlLmluUHJvamVjdCArICdfJyArIHN0bXQucGtfZW50aXR5KVxuICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgICBpbmZvUHJvalJlbCA9PiBpbmZvUHJvalJlbC5jYWxlbmRhciBhcyBUaW1lUHJpbWl0aXZlV2l0aENhbC5DYWxlbmRhckVudW1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhbCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHN0bXQuY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyIGFzIFRpbWVQcmltaXRpdmVXaXRoQ2FsLkNhbGVuZGFyRW51bSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBwaXBlIHRhcmdldCB0aW1lIHByaW1pdGl2ZSBvZiBzdG10XG4gICAgICAgICAgICAgIHJldHVybiBjYWwkLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgY2FsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZVByaW1XaXRoQ2FsID0gaW5mVGltZVByaW1Ub1RpbWVQcmltV2l0aENhbCh0aW1lUHJpbWl0aXZlLCBjYWwpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1XaXRoQ2FsKSxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzczogdGltZVByaW1pdGl2ZS5ma19jbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVQcmltaXRpdmU6IHRpbWVQcmltV2l0aENhbFxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gaW1wbGVtZW50YXRpb24gZm91bmQgZm9yIHN1YmZpZWxkVHlwZSAke0pTT04uc3RyaW5naWZ5KHN1YmZpZWxkVHlwZSl9YCk7XG4gICAgICB9KVxuICAgIClcblxuXG4gIH1cblxuICAvKipcbiAgICogcGlwZSB0YXJnZXQgYW5kIHByb2pSZWwgb2YgdGhlIGdpdmVuIHN0YXRlbWVudFxuICAgKi9cbiAgcGlwZVN0YXRlbWVudFdpdGhUYXJnZXQoc3RtdDogSW5mU3RhdGVtZW50LCBwYWdlOiBHdkZpZWxkUGFnZSwgdGFyZ2V0czogR3ZGaWVsZFRhcmdldHMpOiBPYnNlcnZhYmxlPFN0YXRlbWVudFdpdGhUYXJnZXQ+IHtcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlVGFyZ2V0T2ZTdGF0ZW1lbnQoc3RtdCwgcGFnZSwgdGFyZ2V0cyksXG4gICAgICB0aGlzLnBpcGVQcm9qUmVsT2ZTdGF0ZW1lbnQoc3RtdCwgcGFnZSlcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFt0YXJnZXQsIHByb2pSZWxdKSA9PiAoeyAuLi50YXJnZXQsIC4uLnByb2pSZWwgfSkpXG4gICAgKVxuICB9XG5cbiAgcGlwZVN1YmZpZWxkUGFnZShwYWdlOiBHdkZpZWxkUGFnZSwgdGFyZ2V0czogR3ZGaWVsZFRhcmdldHMpOiBPYnNlcnZhYmxlPFN1YmZpZWxkUGFnZT4ge1xuICAgIGlmIChwYWdlLnByb3BlcnR5LmZrUHJvcGVydHkgPT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19IQVNfVElNRV9TUEFOICYmIHBhZ2UuaXNPdXRnb2luZykge1xuICAgICAgLy8gaWYgdGltZVNwYW4gbWFrZSBhIHNob3J0IGN1dDogcHJvZHVjZSBhIHZpcnR1YWwgc3RhdGVtZW50V2l0aFRhcmdldCBmcm9tIGVudGl0eSB0byB0aW1lU3BhblxuICAgICAgcmV0dXJuIHRoaXMucGlwZVRpbWVTcGFuKHBhZ2UpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gZ2V0IHRoZSBzdGF0bWVudHMgb2YgdGhhdCBwYWdlXG4gICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgdGhpcy5zLmluZiQuc3RhdGVtZW50JC5wYWdpbmF0aW9uJC5waXBlQ291bnQocGFnZSksXG4gICAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQucGlwZVBhZ2UocGFnZSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgICAgICAgcGtTdG10cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgICAgICAgICBwa1N0bXRzLm1hcChwa1N0bXQgPT4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9wa19lbnRpdHkkLmtleShwa1N0bXQpXG4gICAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBzdGF0ZW1lbnQsIGRlcGVuZGluZyBvbiB0aGUgc3ViZmllbGRUeXBlLCBsb2FkIHRoZSBjb3JyZXNwb25kaW5nIHRhcmdldFxuICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcihzdG10ID0+ICEhc3RtdCksXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaE1hcChzdG10ID0+IHRoaXMucGlwZVN0YXRlbWVudFdpdGhUYXJnZXQoc3RtdCwgcGFnZSwgdGFyZ2V0cykpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApLFxuICAgICAgICAgIClcbiAgICAgICkucGlwZShcbiAgICAgICAgbWFwKChbY291bnQsIHN0YXRlbWVudHNdKSA9PiAoeyBjb3VudCwgc3RhdGVtZW50cyB9KSlcbiAgICAgIClcbiAgICB9XG5cbiAgfVxuXG4gIHByaXZhdGUgcGlwZVRpbWVTcGFuKHBhZ2U6IEd2RmllbGRQYWdlKSB7XG4gICAgY29uc3QgdmlydHVhbFN0YXRlbWVudFRvVGltZVNwYW4gPSB7IGZrX29iamVjdF9pbmZvOiBwYWdlLnNvdXJjZS5ma0luZm8gfTtcbiAgICAvLyBjb25zdCB0YXJnZXRzOiBHdkZpZWxkVGFyZ2V0cyA9IHsgW0RmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU5dOiB7IHRpbWVTcGFuOiAndHJ1ZScgfSB9XG5cbiAgICAvLyBjb25zb2xlLmxvZygnc3ViZmllbGRUeXBlLnRlbXBvcmFsRW50aXR5Lmxlbmd0aCcsIHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eS5sZW5ndGgpXG5cbiAgICAvLyBmb3IgZWFjaCBvZiB0aGVzZSBzdWJmaWVsZHNcbiAgICBjb25zdCBzdWJlbnRpdHlQYWdlcyQgPSBEZmhDb25maWcuUFJPUEVSVFlfUEtTX1dIRVJFX1RJTUVfUFJJTUlUSVZFX0lTX1JBTkdFXG4gICAgICAubWFwKGZrUHJvcGVydHkgPT4ge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWJlbnRpdHkgc3ViZmllbGQgZm9yIHRhcmdldEluZm8nLCB0YXJnZXRJbmZvKVxuXG4gICAgICAgIC8vIGNyZWF0ZSBwYWdlOkd2U3ViZmllbGRQYWdlXG4gICAgICAgIGNvbnN0IHNjb3BlID0gcGFnZS5zY29wZS5ub3RJblByb2plY3QgPyB7IGluUmVwbzogdHJ1ZSB9IDogcGFnZS5zY29wZVxuXG4gICAgICAgIGNvbnN0IG5lc3RlZFBhZ2U6IEd2RmllbGRQYWdlID0ge1xuICAgICAgICAgIHByb3BlcnR5OiB7IGZrUHJvcGVydHkgfSxcbiAgICAgICAgICBpc091dGdvaW5nOiB0cnVlLFxuICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICBzb3VyY2U6IHBhZ2Uuc291cmNlLFxuICAgICAgICAgIHNjb3BlLFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN1YmZUeXBlOiBHdlRhcmdldFR5cGUgPSB7XG4gICAgICAgICAgdGltZVByaW1pdGl2ZTogJ3RydWUnXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJndHMgPSB7XG4gICAgICAgICAgW0RmaENvbmZpZy5DTEFTU19QS19USU1FX1BSSU1JVElWRV06IHN1YmZUeXBlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucGlwZVN1YmZpZWxkUGFnZShuZXN0ZWRQYWdlLCB0cmd0cykucGlwZShcbiAgICAgICAgICBtYXAoKHsgY291bnQsIHN0YXRlbWVudHMgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBsaW1pdCwgb2Zmc2V0LCAuLi5zIH0gPSBuZXN0ZWRQYWdlO1xuICAgICAgICAgICAgY29uc3Qgc3ViZW50aXR5U3ViZmllbGRQYWdlOiBTdWJlbnRpdHlTdWJmaWVsZFBhZ2UgPSB7XG4gICAgICAgICAgICAgIHN1YmZpZWxkOiBzLFxuICAgICAgICAgICAgICBjb3VudCxcbiAgICAgICAgICAgICAgc3RhdGVtZW50c1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN1YmVudGl0eVN1YmZpZWxkUGFnZVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG5cblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShzdWJlbnRpdHlQYWdlcyQpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKFxuICAgICAgICAgIHN1YmZpZWxkcyA9PiB7XG4gICAgICAgICAgICBjb25zdCB0aW1lU3BhblByZXZpZXc6IFdhckVudGl0eVByZXZpZXdUaW1lU3BhbiA9IHt9XG4gICAgICAgICAgICBzdWJmaWVsZHMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgICAgaWYgKHMuc3RhdGVtZW50c1swXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0ID0gcy5zdGF0ZW1lbnRzWzBdXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX1RPX0VYSVNURU5DRV9USU1FX0tFWVtzdC5zdGF0ZW1lbnQuZmtfcHJvcGVydHldXG4gICAgICAgICAgICAgICAgdGltZVNwYW5QcmV2aWV3W2tleV0gPSBzdC50YXJnZXQudGltZVByaW1pdGl2ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHZpcnR1YWxTdGF0ZW1lbnRUb1RpbWVTcGFuLFxuICAgICAgICAgICAgICBpc091dGdvaW5nOiBwYWdlLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgIHRhcmdldExhYmVsOiB0aGlzLnRpbWVTcGFuUGlwZS50cmFuc2Zvcm0obmV3IFRpbWVTcGFuVXRpbCh0aW1lU3BhblByZXZpZXcpKSxcbiAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU4sXG4gICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgIHRpbWVTcGFuOiB7XG4gICAgICAgICAgICAgICAgICBwcmV2aWV3OiB0aW1lU3BhblByZXZpZXcsXG4gICAgICAgICAgICAgICAgICBzdWJmaWVsZHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApLnBpcGUobWFwKHN0bXRUYXJnZXQgPT4ge1xuICAgICAgICBjb25zdCBzdG10V1Q6IFN0YXRlbWVudFdpdGhUYXJnZXQgPSB7XG4gICAgICAgICAgLi4uc3RtdFRhcmdldCxcbiAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHsgY291bnQ6IDEsIHN0YXRlbWVudHM6IFtzdG10V1RdIH07XG4gICAgICB9KSk7XG4gIH1cblxuICAvLyBwaXBlU3RhdGVtZW50TGlzdFBhZ2UoXG4gIC8vICAgcGFnaW5hdGVCeTogUGFnaW5hdGVCeVBhcmFtW10sXG4gIC8vICAgbGltaXQ6IG51bWJlcixcbiAgLy8gICBvZmZzZXQ6IG51bWJlcixcbiAgLy8gICBwa1Byb2plY3Q6IG51bWJlcixcbiAgLy8gICBsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsXG4gIC8vICAgYWx0ZXJuYXRpdmUgPSBmYWxzZSk6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gIC8vICAgLy8gcHJlcGFyZSBwYWdlIGxvYWRlclxuICAvLyAgIGNvbnN0IHBhZ2VMb2FkZXIkID0gYWx0ZXJuYXRpdmUgPyB0aGlzLmluZlJlcG8uc3RhdGVtZW50JC5wYWdpbmF0aW9uJCA6IHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQ7XG5cbiAgLy8gICAvLyBwcmVwYXJlIGJhc2ljIHN0YXRlbWVudCBpdGVtIGxvYWRlclxuICAvLyAgIGNvbnN0IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlciA9IChwa1N0YXRlbWVudCwgaXNPdXRnb2luZywgcGtQcm9qKSA9PiB7XG4gIC8vICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAvLyAgICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1N0YXRlbWVudCwgaXNPdXRnb2luZykgOlxuICAvLyAgICAgICB0aGlzLmIucGlwZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtQcm9qLCBwa1N0YXRlbWVudCwgaXNPdXRnb2luZylcbiAgLy8gICB9XG5cbiAgLy8gICBjb25zdCBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkID0gcGFnZUxvYWRlciQucGlwZVBhZ2UocGFnaW5hdGVCeSwgbGltaXQsIG9mZnNldClcblxuICAvLyAgIHJldHVybiBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAoKHBhZ2luYXRlZFN0YXRlbWVudFBrcykgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gIC8vICAgICAgIHBhZ2luYXRlZFN0YXRlbWVudFBrcy5tYXAocGtTdGF0ZW1lbnQgPT4gYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyKHBrU3RhdGVtZW50LCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLCBwa1Byb2plY3QpXG4gIC8vICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAvLyAgICAgICAgICAgc3dpdGNoTWFwKHggPT4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoeC5pc091dGdvaW5nID8geC5zdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8gOiB4LnN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pXG4gIC8vICAgICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICAgIG1hcCgocHJldmlldykgPT4ge1xuICAvLyAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogRW50aXR5UHJldmlld0l0ZW0gPSB7XG4gIC8vICAgICAgICAgICAgICAgICAgIC4uLngsXG4gIC8vICAgICAgICAgICAgICAgICAgIHByZXZpZXcsXG4gIC8vICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IHByZXZpZXcuZmtfY2xhc3NcbiAgLy8gICAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAvLyAgICAgICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICAgIClcbiAgLy8gICAgICAgICAgICkpXG5cbiAgLy8gICAgICAgKVxuICAvLyAgICAgKVxuICAvLyAgICAgKSlcblxuICAvLyB9XG5cblxuICAvLyAvKipcbiAgLy8gICogUGlwZSB0aGUgdGVtcG9yYWwgZW50aXRpZXMgY29ubmVjdGVkIHRvIGdpdmVuIGVudGl0eSBieSBzdGF0ZW1lbnRzIHRoYXQgYXJlIGluIHRoZSBjdXJyZW50IHByb2plY3RcbiAgLy8gICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gLy8gcGlwZVRlbXBvcmFsRW50aXR5VGFibGVSb3dzKFxuICAvLyAvLyAgIHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLFxuICAvLyAvLyAgIGxpbWl0OiBudW1iZXIsXG4gIC8vIC8vICAgb2Zmc2V0OiBudW1iZXIsXG4gIC8vIC8vICAgcGtQcm9qZWN0OiBudW1iZXIsXG4gIC8vIC8vICAgbGlzdERlZmluaXRpb246IFN1YmZpZWxkLFxuICAvLyAvLyAgIGZpZWxkRGVmaW5pdGlvbnM6IEZpZWxkW10sXG4gIC8vIC8vICAgYWx0ZXJuYXRpdmUgPSBmYWxzZSk6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlJdGVtW10+IHtcblxuICAvLyAvLyAgIC8vIGNvbnN0IHByb3BlcnR5SXRlbVR5cGUgPSB0aGlzLnByb3BlcnR5SXRlbVR5cGUoZmllbGREZWZpbml0aW9ucylcblxuICAvLyAvLyAgIGNvbnN0IHRhcmdldEVudGl0eU9mU3RhdGVtZW50SXRlbSA9IChyOiBCYXNpY1N0YXRlbWVudEl0ZW0pID0+IHIuaXNPdXRnb2luZyA/IHIuc3RhdGVtZW50LmZrX29iamVjdF9pbmZvIDogci5zdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvO1xuXG4gIC8vIC8vICAgLy8gcHJlcGFyZSBwYWdlIGxvYWRlclxuICAvLyAvLyAgIGNvbnN0IHBhZ2VMb2FkZXIkID0gYWx0ZXJuYXRpdmUgPyB0aGlzLmluZlJlcG8uc3RhdGVtZW50JC5wYWdpbmF0aW9uJCA6IHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQ7XG5cbiAgLy8gLy8gICAvLyBwcmVwYXJlIGJhc2ljIHN0YXRlbWVudCBpdGVtIGxvYWRlclxuICAvLyAvLyAgIGNvbnN0IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlciA9IChwa1N0YXRlbWVudCwgaXNPdXRnb2luZywgcGtQcm9qKSA9PiB7XG4gIC8vIC8vICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAvLyAvLyAgICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlQmFzaWNTdGF0ZW1lbnRJdGVtQnlQa1N0YXRlbWVudChwa1N0YXRlbWVudCwgaXNPdXRnb2luZykgOlxuICAvLyAvLyAgICAgICB0aGlzLmIucGlwZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtQcm9qLCBwa1N0YXRlbWVudCwgaXNPdXRnb2luZylcbiAgLy8gLy8gICB9XG5cbiAgLy8gLy8gICAvLyBwcmVwYXJlIFRlRW5Sb3cgbG9hZGVyXG4gIC8vIC8vICAgY29uc3Qgcm93TG9hZGVyID0gKHRhcmdldEVudGl0eVBrLCBmaWVsZERlZiwgcGtQcm9qKSA9PiB7XG4gIC8vIC8vICAgICByZXR1cm4gYWx0ZXJuYXRpdmUgP1xuICAvLyAvLyAgICAgICB0aGlzLnBpcGVJdGVtVGVFblJvdyh0YXJnZXRFbnRpdHlQaywgZmllbGREZWYsIG51bGwsIHRydWUpIDpcbiAgLy8gLy8gICAgICAgdGhpcy5waXBlSXRlbVRlRW5Sb3codGFyZ2V0RW50aXR5UGssIGZpZWxkRGVmLCBwa1Byb2osIGZhbHNlKVxuICAvLyAvLyAgIH1cblxuICAvLyAvLyAgIGNvbnN0IHBhZ2luYXRlZFN0YXRlbWVudFBrcyQgPSBwYWdlTG9hZGVyJC5waXBlUGFnZShwYWdpbmF0ZUJ5LCBsaW1pdCwgb2Zmc2V0KVxuXG4gIC8vIC8vICAgY29uc3Qgcm93cyQgPSBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkLnBpcGUoXG4gIC8vIC8vICAgICBzd2l0Y2hNYXAoKHBhZ2luYXRlZFN0YXRlbWVudFBrcykgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gIC8vIC8vICAgICAgIHBhZ2luYXRlZFN0YXRlbWVudFBrcy5tYXAocGtTdGF0ZW1lbnQgPT4gYmFzaWNTdGF0ZW1lbnRJdGVtTG9hZGVyKHBrU3RhdGVtZW50LCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLCBwa1Byb2plY3QpXG4gIC8vIC8vICAgICAgICAgLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgLy8gLy8gICAgICAgKVxuICAvLyAvLyAgICAgKVxuICAvLyAvLyAgICAgICAucGlwZShcbiAgLy8gLy8gICAgICAgICBzd2l0Y2hNYXAoKHRlRW5TdGF0ZW1lbnQpID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAvLyAvLyAgICAgICAgICAgdGVFblN0YXRlbWVudC5tYXAoKGJhc2ljU3RhdGVtZW50SXRlbSkgPT4ge1xuICAvLyAvLyAgICAgICAgICAgICBjb25zdCBwa1RlRW4gPSB0YXJnZXRFbnRpdHlPZlN0YXRlbWVudEl0ZW0oYmFzaWNTdGF0ZW1lbnRJdGVtKTtcbiAgLy8gLy8gICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gIC8vIC8vICAgICAgICAgICAgICAgcm93TG9hZGVyKFxuICAvLyAvLyAgICAgICAgICAgICAgICAgcGtUZUVuLFxuICAvLyAvLyAgICAgICAgICAgICAgICAgZmllbGREZWZpbml0aW9ucyxcbiAgLy8gLy8gICAgICAgICAgICAgICAgIC8vIHByb3BlcnR5SXRlbVR5cGUsXG4gIC8vIC8vICAgICAgICAgICAgICAgICBwa1Byb2plY3RcbiAgLy8gLy8gICAgICAgICAgICAgICApLFxuICAvLyAvLyAgICAgICAgICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHBrVGVFbilcbiAgLy8gLy8gICAgICAgICAgICAgKS5waXBlKFxuICAvLyAvLyAgICAgICAgICAgICAgIG1hcCgoW3JvdywgdGVFblByb2pSZWxdKSA9PiB7XG4gIC8vIC8vICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBUZW1wb3JhbEVudGl0eUl0ZW0gPSB7XG4gIC8vIC8vICAgICAgICAgICAgICAgICAgIC4uLmJhc2ljU3RhdGVtZW50SXRlbSxcbiAgLy8gLy8gICAgICAgICAgICAgICAgICAgcm93LFxuICAvLyAvLyAgICAgICAgICAgICAgICAgICBwa0VudGl0eTogcGtUZUVuLFxuICAvLyAvLyAgICAgICAgICAgICAgICAgICB0ZUVuUHJvalJlbFxuICAvLyAvLyAgICAgICAgICAgICAgICAgfTtcbiAgLy8gLy8gICAgICAgICAgICAgICAgIHJldHVybiBpdGVtXG4gIC8vIC8vICAgICAgICAgICAgICAgfSlcbiAgLy8gLy8gICAgICAgICAgICAgKVxuICAvLyAvLyAgICAgICAgICAgfSlcbiAgLy8gLy8gICAgICAgICApKSxcbiAgLy8gLy8gICAgICAgKSksXG5cbiAgLy8gLy8gICApXG4gIC8vIC8vICAgcmV0dXJuIHJvd3MkXG4gIC8vIC8vIH1cblxuXG5cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlSXRlbVRlRW5Sb3cocGtFbnRpdHk6IG51bWJlciwgZmllbGREZWZpbml0aW9uczogRmllbGRbXSwgcGtQcm9qZWN0OiBudW1iZXIsIHJlcG86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFRlbXBvcmFsRW50aXR5Um93PiB7XG5cbiAgLy8gICAvLyBwaXBlIG91dGdvaW5nIHN0YXRlbWVudHNcbiAgLy8gICBjb25zdCBvdXRnb2luZ1N0YXRlbWVudHMkID0gcmVwbyA/IHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSkgOiB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk7XG4gIC8vICAgLy8gcGlwZSBpbmdvaW5nIHN0YXRlbWVudHNcbiAgLy8gICBjb25zdCBpbmdvaW5nU3RhdGVtZW50cyQgPSByZXBvID8gdGhpcy5iLnBpcGVSZXBvSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpIDogdGhpcy5iLnBpcGVJbmdvaW5nU3RhdGVtZW50cyhwa0VudGl0eSk7XG5cblxuICAvLyAgIC8vIHBpcGUgYWxsIHN0YXRlbWVudHMgd2l0aCBpbmZvcm1hdGlvbiBsZWFmIGl0ZW1zXG5cbiAgLy8gICBjb25zdCBvdXRnb2luZ0l0ZW1zJDogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRJdGVtW10+ID0gb3V0Z29pbmdTdGF0ZW1lbnRzJC5waXBlKFxuICAvLyAgICAgc3dpdGNoTWFwKHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gIC8vICAgICAgIHN0YXRlbWVudHNcbiAgLy8gICAgICAgICAuZmlsdGVyKHN0YXRlbWVudCA9PiAhIXN0YXRlbWVudC5ma19vYmplY3RfaW5mbykgLy8gcmVtb3ZlIHN0YXRlbWVudHMgbm90IHBvaW50aW5nIHRvIGluZm9ybWF0aW9uXG4gIC8vICAgICAgICAgLm1hcChzID0+IHtcbiAgLy8gICAgICAgICAgIGNvbnN0IGlzT3V0Z29pbmcgPSB0cnVlO1xuICAvLyAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW0ocywgcGtQcm9qZWN0LCBpc091dGdvaW5nKTtcbiAgLy8gICAgICAgICB9KVxuICAvLyAgICAgKSlcblxuICAvLyAgIClcbiAgLy8gICBjb25zdCBpbmdvaW5nSXRlbXMkOiBPYnNlcnZhYmxlPFN0YXRlbWVudEl0ZW1bXT4gPSBpbmdvaW5nU3RhdGVtZW50cyQucGlwZShcbiAgLy8gICAgIHN3aXRjaE1hcChzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAvLyAgICAgICBzdGF0ZW1lbnRzXG4gIC8vICAgICAgICAgLmZpbHRlcihzdGF0ZW1lbnQgPT4gISFzdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKSAvLyByZW1vdmUgc3RhdGVtZW50cyBub3QgcG9pbnRpbmcgdG8gaW5mb3JtYXRpb25cbiAgLy8gICAgICAgICAubWFwKHMgPT4ge1xuICAvLyAgICAgICAgICAgY29uc3QgaXNPdXRnb2luZyA9IGZhbHNlO1xuICAvLyAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW0ocywgcGtQcm9qZWN0LCBpc091dGdvaW5nKTtcbiAgLy8gICAgICAgICB9KVxuICAvLyAgICAgKSlcblxuICAvLyAgIClcblxuICAvLyAgIGNvbnN0IHNvcnRJdGVtcyA9IHJlcG8gP1xuICAvLyAgICAgKGl0ZW06IFN0YXRlbWVudEl0ZW1bXSkgPT4gaXRlbS5zb3J0KChhLCBiKSA9PiBhLnN0YXRlbWVudC5pc19pbl9wcm9qZWN0X2NvdW50ID4gYi5zdGF0ZW1lbnQuaXNfaW5fcHJvamVjdF9jb3VudCA/IDEgOiAtMSkgOlxuICAvLyAgICAgKGl0ZW06IFN0YXRlbWVudEl0ZW1bXSkgPT4gaXRlbTtcblxuXG4gIC8vICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qob3V0Z29pbmdJdGVtcyQsIGluZ29pbmdJdGVtcyQpLnBpcGUoXG5cbiAgLy8gICAgIG1hcCgoW291dGdvaW5nSXRlbXMsIGluZ29pbmdJdGVtc10pID0+IHtcbiAgLy8gICAgICAgY29uc3QgZ3JvdXBlZE91dCA9IGdyb3VwQnkoKGkpID0+IChpICYmIGkuc3RhdGVtZW50ID8gaS5zdGF0ZW1lbnQuZmtfcHJvcGVydHkudG9TdHJpbmcoKSA6IHVuZGVmaW5lZCksIG91dGdvaW5nSXRlbXMpO1xuICAvLyAgICAgICBjb25zdCBncm91cGVkSW4gPSBncm91cEJ5KChpKSA9PiAoaSAmJiBpLnN0YXRlbWVudCA/IGkuc3RhdGVtZW50LmZrX3Byb3BlcnR5LnRvU3RyaW5nKCkgOiB1bmRlZmluZWQpLCBpbmdvaW5nSXRlbXMpO1xuICAvLyAgICAgICByZXR1cm4geyBncm91cGVkT3V0LCBncm91cGVkSW4gfVxuICAvLyAgICAgfSksXG4gIC8vICAgICAvLyBhdWRpdFRpbWUoMTApLFxuICAvLyAgICAgbWFwKChkKSA9PiB7XG4gIC8vICAgICAgIGNvbnN0IHJvdzogVGVtcG9yYWxFbnRpdHlSb3cgPSB7fVxuXG4gIC8vICAgICAgIGZpZWxkRGVmaW5pdGlvbnMuZm9yRWFjaChmaWVsZERlZmluaXRpb24gPT4ge1xuXG4gIC8vICAgICAgICAgbGV0IGNlbGw6IFRlbXBvcmFsRW50aXR5Q2VsbDtcbiAgLy8gICAgICAgICBmaWVsZERlZmluaXRpb24ubGlzdERlZmluaXRpb25zLmZvckVhY2gobGlzdERlZmluaXRpb24gPT4ge1xuICAvLyAgICAgICAgICAgaWYgKGxpc3REZWZpbml0aW9uLmxpc3RUeXBlLnRpbWVTcGFuKSB7XG5cbiAgLy8gICAgICAgICAgICAgY29uc3QgdCA9IHBpY2soWyc3MScsICc3MicsICcxNTAnLCAnMTUxJywgJzE1MicsICcxNTMnXSwgZC5ncm91cGVkT3V0KTtcbiAgLy8gICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHQpO1xuICAvLyAgICAgICAgICAgICBjb25zdCBpdGVtc0NvdW50ID0ga2V5cy5sZW5ndGg7XG5cbiAgLy8gICAgICAgICAgICAgbGV0IGxhYmVsO1xuICAvLyAgICAgICAgICAgICBpZiAoaXRlbXNDb3VudCA+IDApIHtcbiAgLy8gICAgICAgICAgICAgICBjb25zdCB0aW1lU3BhbktleXM6IEN0cmxUaW1lU3BhbkRpYWxvZ1Jlc3VsdCA9IHt9XG4gIC8vICAgICAgICAgICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiB7IHRpbWVTcGFuS2V5c1trZXldID0gdFtrZXldWzBdLnRpbWVQcmltaXRpdmUgfSlcbiAgLy8gICAgICAgICAgICAgICBjb25zdCB0aW1lU3BhbiA9IFRpbWVTcGFuVXRpbC5mcm9tVGltZVNwYW5EaWFsb2dEYXRhKHRpbWVTcGFuS2V5cyk7XG4gIC8vICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLnRpbWVTcGFuUGlwZS50cmFuc2Zvcm0odGltZVNwYW4pO1xuICAvLyAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgIGNlbGwgPSB7XG4gIC8vICAgICAgICAgICAgICAgaXNPdXRnb2luZzogbGlzdERlZmluaXRpb24uaXNPdXRnb2luZyxcbiAgLy8gICAgICAgICAgICAgICBpdGVtc0NvdW50LFxuICAvLyAgICAgICAgICAgICAgIGxhYmVsLFxuICAvLyAgICAgICAgICAgICAgIGVudGl0eVByZXZpZXc6IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICAgICAgICBwa1Byb3BlcnR5OiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgICAgICAgaXNUaW1lU3BhbjogdHJ1ZVxuICAvLyAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICBlbHNlIHtcbiAgLy8gICAgICAgICAgICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgLy8gICAgICAgICAgICAgICBpZiAoZC5ncm91cGVkT3V0W2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gIC8vICAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IHNvcnRJdGVtcyhkLmdyb3VwZWRPdXRbbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pXG4gIC8vICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSBpdGVtc1swXTtcbiAgLy8gICAgICAgICAgICAgICAgIGNlbGwgPSB7XG4gIC8vICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsXG4gIC8vICAgICAgICAgICAgICAgICAgIGl0ZW1zQ291bnQ6IGl0ZW1zLmxlbmd0aCxcbiAgLy8gICAgICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogKChmaXJzdEl0ZW0gfHwge30pIGFzIEVudGl0eVByZXZpZXdJdGVtKS5wcmV2aWV3LFxuICAvLyAgICAgICAgICAgICAgICAgICBsYWJlbDogZmlyc3RJdGVtLmxhYmVsLFxuICAvLyAgICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAvLyAgICAgICAgICAgICAgICAgICBmaXJzdEl0ZW0sXG4gIC8vICAgICAgICAgICAgICAgICAgIGl0ZW1zXG4gIC8vICAgICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xuICAvLyAgICAgICAgICAgICAgIGlmIChkLmdyb3VwZWRJbltsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAvLyAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBzb3J0SXRlbXMoZC5ncm91cGVkSW5bbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pXG4gIC8vICAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEl0ZW0gPSBpdGVtc1swXTtcbiAgLy8gICAgICAgICAgICAgICAgIGNlbGwgPSB7XG4gIC8vICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsXG4gIC8vICAgICAgICAgICAgICAgICAgIGl0ZW1zQ291bnQ6IGl0ZW1zLmxlbmd0aCxcbiAgLy8gICAgICAgICAgICAgICAgICAgZW50aXR5UHJldmlldzogKChmaXJzdEl0ZW0gfHwge30pIGFzIEVudGl0eVByZXZpZXdJdGVtKS5wcmV2aWV3LFxuICAvLyAgICAgICAgICAgICAgICAgICBsYWJlbDogZmlyc3RJdGVtLmxhYmVsLFxuICAvLyAgICAgICAgICAgICAgICAgICBwa1Byb3BlcnR5OiBsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAvLyAgICAgICAgICAgICAgICAgICBmaXJzdEl0ZW0sXG4gIC8vICAgICAgICAgICAgICAgICAgIGl0ZW1zXG4gIC8vICAgICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICB9XG5cbiAgLy8gICAgICAgICB9KVxuXG5cbiAgLy8gICAgICAgICByb3dbZmllbGREZWZpbml0aW9uLmxhYmVsXSA9IGNlbGw7XG4gIC8vICAgICAgIH0pXG4gIC8vICAgICAgIHJldHVybiByb3dcbiAgLy8gICAgIH0pXG5cblxuICAvLyAgIClcbiAgLy8gfVxuXG5cblxuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHByaXZhdGUgcGlwZUl0ZW0ocjogSW5mU3RhdGVtZW50LCBwa1Byb2plY3Q6IG51bWJlciwgcHJvcElzT3V0Z29pbmc6IGJvb2xlYW4pIHtcblxuICAvLyAgIGNvbnN0IHRhcmdldEVudGl0eSA9IHByb3BJc091dGdvaW5nID8gci5ma19vYmplY3RfaW5mbyA6IHIuZmtfc3ViamVjdF9pbmZvO1xuICAvLyAgIHJldHVybiB0aGlzLnMuaW5mJC5nZXRNb2RlbE9mRW50aXR5JCh0YXJnZXRFbnRpdHkpLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAobSA9PiB7XG4gIC8vICAgICAgIGNvbnN0IG1vZGVsTmFtZTogSW5mTW9kZWxOYW1lID0gbSA/IG0ubW9kZWxOYW1lIDogdW5kZWZpbmVkO1xuICAvLyAgICAgICBzd2l0Y2ggKG1vZGVsTmFtZSkge1xuICAvLyAgICAgICAgIGNhc2UgJ2FwcGVsbGF0aW9uJzpcbiAgLy8gICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocik7XG4gIC8vICAgICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAvLyAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKTtcbiAgLy8gICAgICAgICBjYXNlICdwbGFjZSc6XG4gIC8vICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVBsYWNlKHIpO1xuICAvLyAgICAgICAgIGNhc2UgJ2RpbWVuc2lvbic6XG4gIC8vICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKTtcbiAgLy8gICAgICAgICBjYXNlICdsYW5nX3N0cmluZyc6XG4gIC8vICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocik7XG4gIC8vICAgICAgICAgY2FzZSAndGltZV9wcmltaXRpdmUnOlxuICAvLyAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1UaW1lUHJpbWl0aXZlKHIsIHBrUHJvamVjdCk7IC8vIFRPRE86IGVtaXRzIHR3aWNlXG4gIC8vICAgICAgICAgZGVmYXVsdDpcbiAgLy8gICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBwcm9wSXNPdXRnb2luZyk7XG4gIC8vICAgICAgIH1cblxuXG4gIC8vICAgICB9KVxuICAvLyAgIClcblxuXG4gIC8vIH1cblxuXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUVudGl0eVByb3BlcnRpZXMobGlzdERlZjogU3ViZmllbGQsIGZrRW50aXR5OiBudW1iZXIsIGxpbWl0PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxFbnRpdHlQcm9wZXJ0aWVzPiB7XG5cbiAgLy8gICBpZiAobGlzdERlZi5saXN0VHlwZS5hcHBlbGxhdGlvbikge1xuICAvLyAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RBcHBlbGxhdGlvbihsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gIC8vICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAvLyAgIH1cbiAgLy8gICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmxhbmd1YWdlKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5waXBlTGlzdExhbmd1YWdlKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgLy8gICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gIC8vICAgfVxuICAvLyAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUucGxhY2UpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLnBpcGVMaXN0UGxhY2UobGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAvLyAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgLy8gICB9XG4gIC8vICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5kaW1lbnNpb24pIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLnBpcGVMaXN0RGltZW5zaW9uKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgLy8gICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gIC8vICAgfVxuICAvLyAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUubGFuZ1N0cmluZykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5nU3RyaW5nKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgLy8gICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gIC8vICAgfVxuXG5cbiAgLy8gICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmVudGl0eVByZXZpZXcgfHwgbGlzdERlZi5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkge1xuICAvLyAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RFbnRpdHlQcmV2aWV3KGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgLy8gICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gIC8vICAgfVxuICAvLyAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUudGltZVNwYW4pIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLnBpcGVJdGVtVGltZVNwYW4oZmtFbnRpdHkpXG4gIC8vICAgICAgIC5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAvLyAgICAgICAgIGNvbnN0IGl0ZW1zID0gaXRlbS5wcm9wZXJ0aWVzLmZpbmQocCA9PiBwLml0ZW1zLmxlbmd0aCA+IDApID8gW3tcbiAgLy8gICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVTcGFuUGlwZS50cmFuc2Zvcm0odGltZVNwYW5JdGVtVG9UaW1lU3BhbihpdGVtKSksXG4gIC8vICAgICAgICAgICBwcm9wZXJ0aWVzOiBbXSAvLyBUT0RPIGNoZWNrIGlmIHRoZSBwcm9wZXJ0aWVzIG9yIHRoZSBpdGVtIGFyZSByZWFsbHkgbm90IG5lZWRlZFxuICAvLyAgICAgICAgIH1dIDogW11cbiAgLy8gICAgICAgICByZXR1cm4ge1xuICAvLyAgICAgICAgICAgbGlzdERlZmluaXRpb246IGxpc3REZWYsXG4gIC8vICAgICAgICAgICBpdGVtc1xuICAvLyAgICAgICAgIH1cbiAgLy8gICAgICAgfSkpXG4gIC8vICAgfVxuICAvLyAgIGVsc2UgcmV0dXJuIG9mKG51bGwpXG4gIC8vIH1cblxuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVUZW1wb3JhbEVudGl0eVJlbW92ZVByb3BlcnRpZXMocGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8VGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzPiB7XG4gIC8vICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gIC8vICAgICB0aGlzLnMuaW5mJC50ZW1wb3JhbF9lbnRpdHkkLmJ5X3BrX2VudGl0eV9rZXkkKHBrRW50aXR5KSxcbiAgLy8gICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdCQoeyBma19zdWJqZWN0X2luZm86IHBrRW50aXR5IH0pLFxuICAvLyAgICAgdGhpcy5zLmluZiQudGV4dF9wcm9wZXJ0eSQuYnlfZmtfY29uY2VybmVkX2VudGl0eV9pbmRleGVkJChwa0VudGl0eSlcbiAgLy8gICApLnBpcGUoXG4gIC8vICAgICBtYXAoKFt0ZW1wb3JhbEVudGl0eSwgc3RhdGVtZW50cywgdGV4dFByb3BlcnRpZXNdKSA9PiB7XG4gIC8vICAgICAgIGNvbnN0IHJlczogVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzID0ge1xuICAvLyAgICAgICAgIHRlbXBvcmFsRW50aXR5LFxuICAvLyAgICAgICAgIHN0YXRlbWVudHM6IHN0YXRlbWVudHMsXG4gIC8vICAgICAgICAgdGV4dFByb3BlcnRpZXM6IHZhbHVlcyh0ZXh0UHJvcGVydGllcylcbiAgLy8gICAgICAgfVxuICAvLyAgICAgICByZXR1cm4gcmVzXG4gIC8vICAgICB9KVxuICAvLyAgIClcbiAgLy8gfVxuXG4gIC8vIGdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBpdGVtcyk6IEVudGl0eVByb3BlcnRpZXMge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICBsaXN0RGVmaW5pdGlvbixcbiAgLy8gICAgIGl0ZW1zLFxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBQaXBlIHRpbWUgc3BhbiBpdGVtIGluIHZlcnNpb24gb2YgcHJvamVjdFxuICAvLyAgKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlSXRlbVRpbWVTcGFuKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxUaW1lU3Bhbkl0ZW0+IHtcblxuICAvLyAgIHJldHVybiB0aGlzLnAucGtQcm9qZWN0JC5waXBlKFxuICAvLyAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB7XG4gIC8vICAgICAgIHJldHVybiB0aGlzLmMucGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKFxuICAvLyAgICAgICAgIERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU5cbiAgLy8gICAgICAgKS5waXBlKFxuICAvLyAgICAgICAgIHN3aXRjaE1hcChmaWVsZERlZnMgPT4ge1xuICAvLyAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoZmllbGREZWZzLm1hcChmaWVsZERlZiA9PiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5JCh7XG4gIC8vICAgICAgICAgICAgIGZrX3Byb3BlcnR5OiBmaWVsZERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAvLyAgICAgICAgICAgICBma19zdWJqZWN0X2luZm86IHBrRW50aXR5XG4gIC8vICAgICAgICAgICB9KVxuICAvLyAgICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgICBzd2l0Y2hNYXBPcihbXSwgc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0KFxuICAvLyAgICAgICAgICAgICAgICAgc3RhdGVtZW50cy5tYXAoc3RhdGVtZW50ID0+IGNvbWJpbmVMYXRlc3QoXG4gIC8vICAgICAgICAgICAgICAgICAgIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gIC8vICAgICAgICAgICAgICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHN0YXRlbWVudC5wa19lbnRpdHkpXG4gIC8vICAgICAgICAgICAgICAgICApLnBpcGUobWFwKChbaW5mVGltZVByaW1pdGl2ZSwgcHJvalJlbF0pID0+IHtcbiAgLy8gICAgICAgICAgICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgLy8gICAgICAgICAgICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgLy8gICAgICAgICAgICAgICAgICAgICBjYWxlbmRhcjogKChwcm9qUmVsLmNhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAvLyAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgLy8gICAgICAgICAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gIC8vICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAvLyAgICAgICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgICAgICAgICAgICAgIHByb2pSZWwsXG4gIC8vICAgICAgICAgICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgLy8gICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gIC8vICAgICAgICAgICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAvLyAgICAgICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAvLyAgICAgICAgICAgICAgICAgfSkpXG4gIC8vICAgICAgICAgICAgICAgICApXG4gIC8vICAgICAgICAgICAgICAgKSksXG4gIC8vICAgICAgICAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IHJlczogVGltZVNwYW5Qcm9wZXJ0eSA9IHtcbiAgLy8gICAgICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb246IGZpZWxkRGVmLmxpc3REZWZpbml0aW9uc1swXSwgaXRlbXNcbiAgLy8gICAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICAgIHJldHVybiByZXNcbiAgLy8gICAgICAgICAgICAgICB9KVxuICAvLyAgICAgICAgICAgICApXG4gIC8vICAgICAgICAgICApKS5waXBlKFxuICAvLyAgICAgICAgICAgICBtYXAoKHByb3BlcnRpZXMpID0+IHtcbiAgLy8gICAgICAgICAgICAgICBjb25zdCBwcm9wcyA9IHByb3BlcnRpZXMuZmlsdGVyKHAgPT4gcC5pdGVtcy5sZW5ndGggPiAwKTtcbiAgLy8gICAgICAgICAgICAgICBjb25zdCB0aW1lc3Bhbml0ZW06IFRpbWVTcGFuSXRlbSA9IHtcbiAgLy8gICAgICAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgLy8gICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BzXG4gIC8vICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICAgIHJldHVybiB0aW1lc3Bhbml0ZW1cbiAgLy8gICAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICAgIClcbiAgLy8gICAgICAgICB9KVxuICAvLyAgICAgICApXG4gIC8vICAgICB9KVxuXG4gIC8vICAgKVxuICAvLyB9XG5cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlSXRlbUFwcGVsbGF0aW9uKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW0+IHtcbiAgLy8gICByZXR1cm4gdGhpcy5zLmluZiQuYXBwZWxsYXRpb24kLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgLy8gICAgIGZpbHRlcih4ID0+ICEheCksXG4gIC8vICAgICBtYXAoYXBwZWxsYXRpb24gPT4ge1xuICAvLyAgICAgICBpZiAoIWFwcGVsbGF0aW9uKSByZXR1cm4gbnVsbDtcbiAgLy8gICAgICAgY29uc3Qgbm9kZTogQXBwZWxsYXRpb25JdGVtID0ge1xuICAvLyAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICBzdGF0ZW1lbnQsXG4gIC8vICAgICAgICAgbGFiZWw6IGFwcGVsbGF0aW9uLnN0cmluZyxcbiAgLy8gICAgICAgICBma0NsYXNzOiBhcHBlbGxhdGlvbi5ma19jbGFzc1xuICAvLyAgICAgICB9XG4gIC8vICAgICAgIHJldHVybiBub2RlXG4gIC8vICAgICB9KSlcbiAgLy8gfVxuXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUl0ZW1MYW5ndWFnZShzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtPiB7XG4gIC8vICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gIC8vICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAvLyAgICAgbWFwKGxhbmd1YWdlID0+IHtcbiAgLy8gICAgICAgaWYgKCFsYW5ndWFnZSkgcmV0dXJuIG51bGw7XG4gIC8vICAgICAgIGNvbnN0IG5vZGU6IExhbmd1YWdlSXRlbSA9IHtcbiAgLy8gICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgc3RhdGVtZW50LFxuICAvLyAgICAgICAgIGxhYmVsOiBsYW5ndWFnZS5ub3RlcyxcbiAgLy8gICAgICAgICBma0NsYXNzOiBsYW5ndWFnZS5ma19jbGFzc1xuICAvLyAgICAgICB9XG4gIC8vICAgICAgIHJldHVybiBub2RlXG4gIC8vICAgICB9KSlcbiAgLy8gfVxuXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUl0ZW1QbGFjZShzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8UGxhY2VJdGVtPiB7XG4gIC8vICAgcmV0dXJuIHRoaXMucy5pbmYkLnBsYWNlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gIC8vICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAvLyAgICAgbWFwKHBsYWNlID0+IHtcbiAgLy8gICAgICAgaWYgKCFwbGFjZSkgcmV0dXJuIG51bGw7XG4gIC8vICAgICAgIGNvbnN0IG5vZGU6IFBsYWNlSXRlbSA9IHtcbiAgLy8gICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgc3RhdGVtZW50LFxuICAvLyAgICAgICAgIGxhYmVsOiAnV0dTODQ6ICcgKyBwbGFjZS5sYXQgKyAnwrAsICcgKyBwbGFjZS5sb25nICsgJ8KwJyxcbiAgLy8gICAgICAgICBma0NsYXNzOiBwbGFjZS5ma19jbGFzc1xuICAvLyAgICAgICB9XG4gIC8vICAgICAgIHJldHVybiBub2RlXG4gIC8vICAgICB9KSlcbiAgLy8gfVxuXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUl0ZW1EaW1lbnNpb24oc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW0+IHtcbiAgLy8gICByZXR1cm4gdGhpcy5zLmluZiQuZGltZW5zaW9uJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gIC8vICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAvLyAgICAgc3dpdGNoTWFwKChkaW1lbnNpb24pID0+IHtcbiAgLy8gICAgICAgcmV0dXJuIHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KGRpbWVuc2lvbi5ma19tZWFzdXJlbWVudF91bml0KVxuICAvLyAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgbWFwKHByZXZpZXcgPT4ge1xuXG4gIC8vICAgICAgICAgICAgIGNvbnN0IG5vZGU6IERpbWVuc2lvbkl0ZW0gPSB7XG4gIC8vICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgLy8gICAgICAgICAgICAgICBsYWJlbDogYCR7ZGltZW5zaW9uLm51bWVyaWNfdmFsdWV9ICR7cHJldmlldy5lbnRpdHlfbGFiZWx9YCxcbiAgLy8gICAgICAgICAgICAgICBma0NsYXNzOiBkaW1lbnNpb24uZmtfY2xhc3MsXG4gIC8vICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgLy8gICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgKVxuICAvLyAgICAgfSlcbiAgLy8gICApXG4gIC8vIH1cblxuXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUl0ZW1MYW5nU3RyaW5nKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxMYW5nU3RyaW5nSXRlbT4ge1xuICAvLyAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5nX3N0cmluZyQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAvLyAgICAgc3dpdGNoTWFwKFxuICAvLyAgICAgICAobGFuZ1N0cmluZykgPT4ge1xuICAvLyAgICAgICAgIGlmICghbGFuZ1N0cmluZykgcmV0dXJuIG5ldyBCZWhhdmlvclN1YmplY3QobnVsbClcbiAgLy8gICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KGxhbmdTdHJpbmcuZmtfbGFuZ3VhZ2UpXG4gIC8vICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgbWFwKGxhbmd1YWdlID0+IHtcbiAgLy8gICAgICAgICAgICAgICBpZiAoIWxhbmd1YWdlKSByZXR1cm4gbnVsbDtcbiAgLy8gICAgICAgICAgICAgICBsZXQgbGFiZWwgPSAnJztcbiAgLy8gICAgICAgICAgICAgICBpZiAobGFuZ1N0cmluZy5zdHJpbmcpIGxhYmVsID0gbGFuZ1N0cmluZy5zdHJpbmdcbiAgLy8gICAgICAgICAgICAgICBlbHNlIGlmIChsYW5nU3RyaW5nLnF1aWxsX2RvYyAmJiBsYW5nU3RyaW5nLnF1aWxsX2RvYy5vcHMgJiYgbGFuZ1N0cmluZy5xdWlsbF9kb2Mub3BzLmxlbmd0aCkge1xuICAvLyAgICAgICAgICAgICAgICAgbGFiZWwgPSBsYW5nU3RyaW5nLnF1aWxsX2RvYy5vcHMubWFwKG9wID0+IG9wLmluc2VydCkuam9pbignJyk7XG4gIC8vICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICAgIGNvbnN0IG5vZGU6IExhbmdTdHJpbmdJdGVtID0ge1xuICAvLyAgICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gIC8vICAgICAgICAgICAgICAgICBsYWJlbCxcbiAgLy8gICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGxhbmdTdHJpbmcuZmtfY2xhc3MsXG4gIC8vICAgICAgICAgICAgICAgICBsYW5ndWFnZSxcbiAgLy8gICAgICAgICAgICAgICAgIGZrTGFuZ3VhZ2U6IGxhbmdTdHJpbmcuZmtfbGFuZ3VhZ2VcbiAgLy8gICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgLy8gICAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICAgIClcbiAgLy8gICAgICAgfSlcbiAgLy8gICApXG4gIC8vIH1cblxuXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHN0YXRlbWVudDogSW5mU3RhdGVtZW50LCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbT4ge1xuICAvLyAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldygoaXNPdXRnb2luZyA/IHN0YXRlbWVudC5ma19vYmplY3RfaW5mbyA6IHN0YXRlbWVudC5ma19zdWJqZWN0X2luZm8pKS5waXBlKFxuICAvLyAgICAgLy8gZmlsdGVyKHByZXZpZXcgPT4gIXByZXZpZXcubG9hZGluZyAmJiAhIXByZXZpZXcgJiYgISFwcmV2aWV3LmVudGl0eV90eXBlKSxcbiAgLy8gICAgIG1hcChwcmV2aWV3ID0+IHtcbiAgLy8gICAgICAgaWYgKCFwcmV2aWV3KSB7XG4gIC8vICAgICAgICAgcmV0dXJuIG51bGw7XG4gIC8vICAgICAgIH1cbiAgLy8gICAgICAgY29uc3Qgbm9kZTogRW50aXR5UHJldmlld0l0ZW0gPSB7XG4gIC8vICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgIHN0YXRlbWVudCxcbiAgLy8gICAgICAgICBwcmV2aWV3LFxuICAvLyAgICAgICAgIGxhYmVsOiBwcmV2aWV3LmVudGl0eV9sYWJlbCB8fCAnJyxcbiAgLy8gICAgICAgICBma0NsYXNzOiBwcmV2aWV3LmZrX2NsYXNzXG4gIC8vICAgICAgIH1cbiAgLy8gICAgICAgcmV0dXJuIG5vZGVcbiAgLy8gICAgIH0pKVxuICAvLyB9XG5cbiAgLy8gLyoqXG4gIC8vICAqIEBwYXJhbSBwa1xuICAvLyAgKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlSXRlbVRpbWVQcmltaXRpdmUoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQsIHBrUHJvamVjdCk6IE9ic2VydmFibGU8VGltZVByaW1pdGl2ZUl0ZW0+IHtcbiAgLy8gICBpZiAocGtQcm9qZWN0KSB7XG4gIC8vICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgLy8gICAgICAgdGhpcy5zLmluZiQudGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgLy8gICAgICAgdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGtQcm9qZWN0ICsgJ18nICsgc3RhdGVtZW50LnBrX2VudGl0eSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAvLyAgICAgKS5waXBlKFxuICAvLyAgICAgICBtYXAoKFtpbmZUaW1lUHJpbWl0aXZlLCBwcm9qUmVsXSkgPT4ge1xuICAvLyAgICAgICAgIGlmICghaW5mVGltZVByaW1pdGl2ZSkgcmV0dXJuIG51bGw7XG4gIC8vICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgLy8gICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAvLyAgICAgICAgICAgY2FsZW5kYXI6ICgocHJvalJlbC5jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgLy8gICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgLy8gICAgICAgICB9KVxuICAvLyAgICAgICAgIGNvbnN0IG5vZGU6IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAvLyAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgICBzdGF0ZW1lbnQsXG4gIC8vICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAvLyAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAvLyAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAvLyAgICAgICAgIH1cbiAgLy8gICAgICAgICByZXR1cm4gbm9kZVxuICAvLyAgICAgICB9KSlcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuaW5mUmVwby50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLnBpcGUoXG4gIC8vICAgICAgIG1hcChpbmZUaW1lUHJpbWl0aXZlID0+IHtcbiAgLy8gICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAvLyAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gIC8vICAgICAgICAgICBjYWxlbmRhcjogKChzdGF0ZW1lbnQuY29tbXVuaXR5X2Zhdm9yaXRlX2NhbGVuZGFyIHx8ICdncmVnb3JpYW4nKSBhcyBDYWxlbmRhclR5cGUpLFxuICAvLyAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAvLyAgICAgICAgIH0pXG4gIC8vICAgICAgICAgY29uc3Qgbm9kZTogVGltZVByaW1pdGl2ZUl0ZW0gPSB7XG4gIC8vICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICAgIHN0YXRlbWVudCxcbiAgLy8gICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gIC8vICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gIC8vICAgICAgICAgICBma0NsYXNzOiBpbmZUaW1lUHJpbWl0aXZlLmZrX2NsYXNzXG4gIC8vICAgICAgICAgfVxuICAvLyAgICAgICAgIHJldHVybiBub2RlXG4gIC8vICAgICAgIH0pXG4gIC8vICAgICApXG4gIC8vICAgfVxuICAvLyB9XG5cblxuICAvLyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vICogUGlwZSBhbHRlcm5hdGl2ZXMgKG5vdCBpbiBwcm9qZWN0KVxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUFsdExpc3RMZW5ndGgobDogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAvLyAgIHN3aXRjaCAobC5saXN0VHlwZSkge1xuICAvLyAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAvLyAgICAgY2FzZSAnZW50aXR5LXByZXZpZXcnOlxuICAvLyAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAvLyAgICAgY2FzZSAncGxhY2UnOlxuICAvLyAgICAgY2FzZSAnbGFuZ1N0cmluZyc6XG4gIC8vICAgICBjYXNlICd0ZW1wb3JhbC1lbnRpdHknOlxuICAvLyAgICAgY2FzZSAndGltZS1zcGFuJzpcbiAgLy8gICAgICAgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RTdGF0ZW1lbnRzKGwsIHBrRW50aXR5KS5waXBlKG1hcChpdGVtcyA9PiBpdGVtcy5sZW5ndGgpKVxuXG4gIC8vICAgICBkZWZhdWx0OlxuICAvLyAgICAgICBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgLy8gICAgICAgYnJlYWs7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlQWx0TGlzdChsOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEl0ZW1MaXN0PiB7XG4gIC8vICAgaWYgKGwubGlzdFR5cGUuYXBwZWxsYXRpb24pIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0QXBwZWxsYXRpb24obCwgcGtFbnRpdHkpXG4gIC8vICAgZWxzZSBpZiAobC5saXN0VHlwZS5lbnRpdHlQcmV2aWV3KSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHkpXG4gIC8vICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5ndWFnZSkgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RMYW5ndWFnZShsLCBwa0VudGl0eSlcbiAgLy8gICBlbHNlIGlmIChsLmxpc3RUeXBlLnBsYWNlKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdFBsYWNlKGwsIHBrRW50aXR5KVxuICAvLyAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdERpbWVuc2lvbihsLCBwa0VudGl0eSlcbiAgLy8gICBlbHNlIGlmIChsLmxpc3RUeXBlLmxhbmdTdHJpbmcpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0TGFuZ1N0cmluZyhsLCBwa0VudGl0eSlcbiAgLy8gICBlbHNlIGlmIChsLmxpc3RUeXBlLnRlbXBvcmFsRW50aXR5KSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEVudGl0eVByZXZpZXcobCwgcGtFbnRpdHkpXG4gIC8vICAgZWxzZSBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgLy8gfVxuXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUFsdExpc3RTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50W10+IHtcbiAgLy8gICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAvLyAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUluZ29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gIC8vICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gIC8vICAgKVxuICAvLyB9XG5cbiAgLy8gLyoqXG4gIC8vICogUGlwZSB0aGUgaXRlbXMgaW4gZW50aXR5IHByZXZpZXcgZmllbGRcbiAgLy8gKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlQWx0TGlzdEVudGl0eVByZXZpZXc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW1bXT4ge1xuXG4gIC8vICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgLy8gICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpIDpcbiAgLy8gICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgLy8gICApLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1FbnRpdHlQcmV2aWV3KHIsIGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpKSlcbiAgLy8gICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlc1xuICAvLyAgICAgICAgICAgICAuZmlsdGVyKG5vZGUgPT4gISFub2RlKVxuICAvLyAgICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5vcmROdW0gPiBiLm9yZE51bSA/IDEgOiAtMSlcbiAgLy8gICAgICAgICAgICksXG4gIC8vICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgfSkpXG5cbiAgLy8gfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBwbGFjZSBsaXN0XG4gIC8vICAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVBbHRMaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAvLyAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgLy8gICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1QbGFjZShyKSkpXG4gIC8vICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgIH0pKVxuICAvLyAgIH1cbiAgLy8gfVxuXG5cbiAgLy8gLyoqXG4gIC8vICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGRpbWVuc2lvbiBsaXN0XG4gIC8vICAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVBbHRMaXN0RGltZW5zaW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW1bXT4ge1xuXG4gIC8vICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAvLyAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gIC8vICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgIH0pKVxuICAvLyAgIH1cbiAgLy8gfVxuXG5cbiAgLy8gLyoqXG4gIC8vICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGxhbmdTdHJpbmcgbGlzdFxuICAvLyAgKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlQWx0TGlzdExhbmdTdHJpbmc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW1bXT4ge1xuXG4gIC8vICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAvLyAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocikpKVxuICAvLyAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICB9KSlcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyAvKipcbiAgLy8gICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gYXBwZWxsYXRpb24gZmllbGRcbiAgLy8gICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUFsdExpc3RBcHBlbGxhdGlvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxBcHBlbGxhdGlvbkl0ZW1bXT4ge1xuXG4gIC8vICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAvLyAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpKSlcbiAgLy8gICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgfSkpXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gLyoqXG4gIC8vICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGxhbmd1YWdlIGZpZWxkXG4gIC8vICAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVBbHRMaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAvLyAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgLy8gICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKSkpXG4gIC8vICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgIH0pKVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gICogUGlwZSByZXBvIHZpZXdzIChjb21tdW5pdHkgZmF2b3JpdGVzLCB3aGVyZSByZXN0cmljdGVkIGJ5IHF1YW50aWZpZXJzKVxuICAvLyAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIC8vIC8qKlxuICAvLyAgKiBQaXBlIHJlcG9zaXRvcnkgdGVtcG9yYWwgZW50aXR5IGl0ZW0gaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gIC8vICAqL1xuXG5cbiAgLy8gLyoqXG4gIC8vICAqIFBpcGUgYXBwZWxsYXRpb24gbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgLy8gICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZVJlcG9MaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcblxuICAvLyAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgLy8gICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKSkpXG4gIC8vICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgIH0pKVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIC8qKlxuICAvLyAqIFBpcGUgbGFuZ3VhZ2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgLy8gKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlUmVwb0xpc3RMYW5ndWFnZTxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxMYW5ndWFnZUl0ZW1bXT4ge1xuXG4gIC8vICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAvLyAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmd1YWdlKHIpKSlcbiAgLy8gICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgfSkpXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gLyoqXG4gIC8vICAqIFBpcGUgcGxhY2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgLy8gICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZVJlcG9MaXN0UGxhY2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8UGxhY2VJdGVtW10+IHtcblxuICAvLyAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgLy8gICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1QbGFjZShyKSkpXG4gIC8vICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgIH0pKVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIC8qKlxuICAvLyAqIFBpcGUgcGxhY2UgbGlzdCBpbiB0aGUgd2F5IGl0IGlzIGRlZmluZWQgYnkgdGhlIHJlcG9zaXRvcnlcbiAgLy8gKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlUmVwb0xpc3REaW1lbnNpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbVtdPiB7XG5cbiAgLy8gICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gIC8vICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpKSlcbiAgLy8gICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgfSkpXG4gIC8vICAgfVxuICAvLyB9XG4gIC8vIC8qKlxuICAvLyAqIFBpcGUgdGhlIGl0ZW1zIGluIGVudGl0eSBwcmV2aWV3IGZpZWxkLCBjb25uZWN0ZWQgYnkgY29tbXVuaXR5IGZhdm9yaXRlIHN0YXRlbWVudHNcbiAgLy8gKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlUmVwb0xpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAvLyAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gIC8vICAgICB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gIC8vICAgICB0aGlzLmIucGlwZVJlcG9JbmdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gIC8vICAgKS5waXBlKFxuICAvLyAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSkpXG4gIC8vICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpXG4gIC8vICAgICAgICAgICAgIC8vIC5zb3J0KChhLCBiKSA9PiBhLm9yZE51bSA+IGIub3JkTnVtID8gMSA6IC0xKVxuICAvLyAgICAgICAgICAgKSlcbiAgLy8gICAgIH0pLFxuICAvLyAgICAgc3RhcnRXaXRoKFtdKVxuICAvLyAgIClcblxuICAvLyB9XG5cblxuICAvLyAvKipcbiAgLy8gICogUGlwZSByZXBvIHRpbWUgc3BhbiBpdGVtXG4gIC8vICAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVSZXBvSXRlbVRpbWVTcGFuKHBrRW50aXR5KTogT2JzZXJ2YWJsZTxUaW1lU3Bhbkl0ZW0+IHtcbiAgLy8gICByZXR1cm4gdGhpcy5wLnBrUHJvamVjdCQucGlwZShcbiAgLy8gICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAvLyAgICAgICByZXR1cm4gdGhpcy5jLnBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKFxuICAvLyAgICAgICAgIERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU5cbiAgLy8gICAgICAgKS5waXBlKFxuICAvLyAgICAgICAgIHN3aXRjaE1hcChmaWVsZERlZmluaXRpb25zID0+IHtcblxuICAvLyAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoZmllbGREZWZpbml0aW9ucy5tYXAoZmllbGREZWYgPT5cbiAgLy8gICAgICAgICAgICAgdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShmaWVsZERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSlcbiAgLy8gICAgICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgICAgIHN3aXRjaE1hcE9yKFtdLCBzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3QoXG4gIC8vICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PlxuICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mUmVwby50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKVxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKChpbmZUaW1lUHJpbWl0aXZlKSA9PiB7XG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXI6ICgoc3RhdGVtZW50LmNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lUHJpbWl0aXZlUGlwZS50cmFuc2Zvcm0odGltZVByaW1pdGl2ZSksXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAvLyAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gIC8vICAgICAgICAgICAgICAgICAgIClcbiAgLy8gICAgICAgICAgICAgICAgICkpLFxuICAvLyAgICAgICAgICAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgLy8gICAgICAgICAgICAgICAgICAgY29uc3QgcmVzOiBUaW1lU3BhblByb3BlcnR5ID0ge1xuICAvLyAgICAgICAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uOiBmaWVsZERlZi5saXN0RGVmaW5pdGlvbnNbMF0sIGl0ZW1zXG4gIC8vICAgICAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xuICAvLyAgICAgICAgICAgICAgICAgfSksXG4gIC8vICAgICAgICAgICAgICAgICBzdGFydFdpdGgoeyBsaXN0RGVmaW5pdGlvbjogZmllbGREZWYubGlzdERlZmluaXRpb25zWzBdLCBpdGVtczogW10gfSBhcyBUaW1lU3BhblByb3BlcnR5KVxuICAvLyAgICAgICAgICAgICAgIClcbiAgLy8gICAgICAgICAgICkpLnBpcGUoXG4gIC8vICAgICAgICAgICAgIG1hcCgocHJvcGVydGllcykgPT4ge1xuICAvLyAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzcGFuaXRlbTogVGltZVNwYW5JdGVtID0ge1xuICAvLyAgICAgICAgICAgICAgICAgbGFiZWw6ICcnLFxuICAvLyAgICAgICAgICAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllcy5maWx0ZXIocHJvcHMgPT4gcHJvcHMuaXRlbXMubGVuZ3RoID4gMClcbiAgLy8gICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVzcGFuaXRlbVxuICAvLyAgICAgICAgICAgICB9KVxuICAvLyAgICAgICAgICAgKVxuICAvLyAgICAgICAgIH0pXG4gIC8vICAgICAgIClcbiAgLy8gICAgIH0pXG5cbiAgLy8gICApXG4gIC8vIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgbGFiZWwgb2YgZ2l2ZW4gZW50aXR5XG4gICAqIFRoaXMgd2lsbCB1c2UgZW50aXR5IHByZXZpZXdzIGZvciBnZXR0aW5nIHN0cmluZ3Mgb2YgcmVsYXRlZCB0ZW1wb3JhbCBlbnRpdGllc1xuICAgKiBTbyB0aGlzIG1heSB0YWtlIGEgbGl0dGxlIHdoaWxlXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVMYWJlbE9mRW50aXR5KGZrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhma0VudGl0eSkucGlwZShtYXAocCA9PiBwLmVudGl0eV9sYWJlbCkpXG4gICAgLy8gcmV0dXJuIHRoaXMuYi5waXBlQ2xhc3NPZkVudGl0eShma0VudGl0eSkucGlwZShcblxuICAgIC8vICAgLy8gZ2V0IHRoZSBkZWZpbml0aW9uIG9mIHRoZSBmaXJzdCBmaWVsZFxuICAgIC8vICAgc3dpdGNoTWFwKGZrQ2xhc3MgPT4gdGhpcy5jLnBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKGZrQ2xhc3MpLnBpcGUoXG4gICAgLy8gICAgIC8vIGdldCB0aGUgZmlyc3QgaXRlbSBvZiB0aGF0IGZpZWxkXG4gICAgLy8gICAgIHN3aXRjaE1hcChmaWVsZHMgPT4gdGhpcy5waXBlU3ViZmllbGRQYWdlKGZpZWxkWzBdLCkucGlwZShcbiAgICAvLyAgICAgICBtYXAocHJvcHMgPT4ge1xuICAgIC8vICAgICAgICAgcHJvcHMgPSBwcm9wcy5maWx0ZXIocHJvcCA9PiBwcm9wLml0ZW1zLmxlbmd0aCA+IDApXG4gICAgLy8gICAgICAgICBpZiAocHJvcHMubGVuZ3RoICYmIHByb3BzWzBdLml0ZW1zLmxlbmd0aCkge1xuICAgIC8vICAgICAgICAgICByZXR1cm4gcHJvcHNbMF0uaXRlbXNbMF0ubGFiZWxcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIHJldHVybiAnJ1xuICAgIC8vICAgICAgIH0pXG4gICAgLy8gICAgICkpKVxuICAgIC8vICAgKSlcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBjbGFzcyBsYWJlbCBvZiBnaXZlbiBlbnRpdHlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZUNsYXNzTGFiZWxPZkVudGl0eShma0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5iLnBpcGVDbGFzc09mRW50aXR5KGZrRW50aXR5KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrQ2xhc3MgPT4gdGhpcy5jLnBpcGVDbGFzc0xhYmVsKHBrQ2xhc3MpKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgcGtfZW50aXR5IG9mIHRoZSB0eXBlIG9mIGFuIGVudGl0eVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlVHlwZU9mRW50aXR5KHBrRW50aXR5OiBudW1iZXIsIGhhc1R5cGVQcm9wZXJ0eTogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxJbmZTdGF0ZW1lbnQ+IHtcbiAgICBpZiAoaXNPdXRnb2luZykge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfc3ViamVjdF9hbmRfcHJvcGVydHlfaW5kZXhlZCQoeyBma19wcm9wZXJ0eTogaGFzVHlwZVByb3BlcnR5LCBma19zdWJqZWN0X2luZm86IHBrRW50aXR5IH0pLnBpcGUobWFwKGl0ZW1zID0+IHtcbiAgICAgICAgaWYgKCFpdGVtcyB8fCBPYmplY3Qua2V5cyhpdGVtcykubGVuZ3RoIDwgMSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgZWxzZSByZXR1cm4gdmFsdWVzKGl0ZW1zKVswXVxuICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9vYmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKHsgZmtfcHJvcGVydHk6IGhhc1R5cGVQcm9wZXJ0eSwgZmtfb2JqZWN0X2luZm86IHBrRW50aXR5IH0pLnBpcGUoXG4gICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgaWYgKCFpdGVtcyB8fCBPYmplY3Qua2V5cyhpdGVtcykubGVuZ3RoIDwgMSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICBlbHNlIHJldHVybiB2YWx1ZXMoaXRlbXMpWzBdXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZUNsYXNzZXNBbmRUeXBlcyhlbmFibGVkSW46ICdlbnRpdGllcycgfCAnc291cmNlcycpIHtcbiAgICByZXR1cm4gdGhpcy5jLnBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzKGVuYWJsZWRJbikucGlwZShcbiAgICAgIHN3aXRjaE1hcChpdGVtcyA9PiB0aGlzLnBpcGVDbGFzc0FuZFR5cGVOb2RlcyhpdGVtcykpLFxuICAgIClcbiAgfVxuXG4gIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVDbGFzc2VzQW5kVHlwZXNPZkNsYXNzZXMoY2xhc3NlczogbnVtYmVyW10pIHtcbiAgICByZXR1cm4gdGhpcy5jLnBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzT2ZUeXBlZENsYXNzZXMoY2xhc3NlcykucGlwZShcbiAgICAgIHN3aXRjaE1hcChpdGVtcyA9PiB0aGlzLnBpcGVDbGFzc0FuZFR5cGVOb2RlcyhpdGVtcykpLFxuICAgIClcbiAgfVxuXG4gIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVDbGFzc0FuZFR5cGVOb2Rlcyh0eXBlQW5kVHlwZWRDbGFzc2VzOiB7IHR5cGVkQ2xhc3M6IG51bWJlcjsgdHlwZUNsYXNzOiBudW1iZXI7IH1bXSk6IE9ic2VydmFibGU8Q2xhc3NBbmRUeXBlTm9kZVtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgdHlwZUFuZFR5cGVkQ2xhc3Nlcy5tYXAoaXRlbSA9PiB0aGlzLmMucGlwZUNsYXNzTGFiZWwoaXRlbS50eXBlZENsYXNzKS5waXBlKFxuICAgICAgICBtYXAobGFiZWwgPT4gKHtcbiAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICBkYXRhOiB7IHBrQ2xhc3M6IGl0ZW0udHlwZWRDbGFzcywgcGtUeXBlOiBudWxsIH1cbiAgICAgICAgfSBhcyBDbGFzc0FuZFR5cGVOb2RlKSksXG4gICAgICAgIHN3aXRjaE1hcChub2RlID0+IGlpZihcbiAgICAgICAgICAoKSA9PiAhIWl0ZW0udHlwZUNsYXNzLFxuICAgICAgICAgIHRoaXMuYi5waXBlUGVyc2lzdGVudEl0ZW1Qa3NCeUNsYXNzKGl0ZW0udHlwZUNsYXNzKS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKHR5cGVQa3MgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgICAgICAgIHR5cGVQa3MubWFwKHBrVHlwZSA9PiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhwa1R5cGUpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKHByZXZpZXcgPT4gKHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBwcmV2aWV3LmVudGl0eV9sYWJlbCxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IHsgcGtDbGFzczogaXRlbS50eXBlZENsYXNzLCBwa1R5cGUgfVxuICAgICAgICAgICAgICAgIH0gYXMgQ2xhc3NBbmRUeXBlTm9kZSkpXG4gICAgICAgICAgICAgICkpXG4gICAgICAgICAgICApLnBpcGUoXG4gICAgICAgICAgICAgIHNvcnRBYmMobiA9PiBuLmxhYmVsKSxcbiAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgbWFwKGNoaWxkcmVuID0+IHtcbiAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuXG4gICAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgb2YoeyAuLi5ub2RlLCBjaGlsZHJlbjogW10gfSBhcyBDbGFzc0FuZFR5cGVOb2RlKVxuICAgICAgICApXG4gICAgICAgIClcbiAgICAgICkpXG4gICAgKS5waXBlKFxuICAgICAgc29ydEFiYygobm9kZSkgPT4gbm9kZS5sYWJlbCksXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYXJyYXkgb2YgcGtfY2xhc3Mgb2YgYWxsIGNsYXNzZXMgYW5kIHR5cGVkIGNsYXNzZXMuXG4gICAqIEBwYXJhbSBjbGFzc2VzQW5kVHlwZXMgYSBvYmplY3QgY29udGFpbmluZyB7Y2xhc3NlczogW10sIHR5cGVzW119XG4gICAqL1xuICBwaXBlQ2xhc3Nlc0Zyb21DbGFzc2VzQW5kVHlwZXMoY2xhc3Nlc0FuZFR5cGVzOiBDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICBjb25zdCB0eXBlZENsYXNzZXMkID0gKCFjbGFzc2VzQW5kVHlwZXMgfHwgIWNsYXNzZXNBbmRUeXBlcy50eXBlcyB8fCAhY2xhc3Nlc0FuZFR5cGVzLnR5cGVzLmxlbmd0aCkgP1xuICAgICAgb2YoW10gYXMgbnVtYmVyW10pIDpcbiAgICAgIHRoaXMuYi5waXBlQ2xhc3Nlc09mUGVyc2lzdGVudEl0ZW1zKGNsYXNzZXNBbmRUeXBlcy50eXBlcylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChwa3MpID0+ICEhcGtzKSxcbiAgICAgICAgICBzd2l0Y2hNYXAodHlwZUNsYXNzZXMgPT4gdGhpcy5jLnBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHR5cGVDbGFzc2VzKSlcbiAgICAgICAgKVxuICAgIHJldHVybiB0eXBlZENsYXNzZXMkLnBpcGUoXG4gICAgICBtYXAodHlwZWRDbGFzc2VzID0+IHVuaXEoWy4uLnR5cGVkQ2xhc3NlcywgLi4uKChjbGFzc2VzQW5kVHlwZXMgfHwgeyBjbGFzc2VzOiBbXSB9KS5jbGFzc2VzIHx8IFtdKV0pKVxuICAgICk7XG4gIH1cblxuICBwaXBlUHJvcGVydHlPcHRpb25zRnJvbUNsYXNzZXNBbmRUeXBlcyhjbGFzc2VzQW5kVHlwZXM6IENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsKTogT2JzZXJ2YWJsZTxQcm9wZXJ0eU9wdGlvbltdPiB7XG4gICAgcmV0dXJuIHRoaXMucGlwZUNsYXNzZXNGcm9tQ2xhc3Nlc0FuZFR5cGVzKGNsYXNzZXNBbmRUeXBlcykucGlwZShcbiAgICAgIHN3aXRjaE1hcChjbGFzc2VzID0+IHRoaXMucGlwZVByb3BlcnR5T3B0aW9uc0Zvcm1DbGFzc2VzKGNsYXNzZXMpKVxuICAgIClcbiAgfVxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlUHJvcGVydHlPcHRpb25zRm9ybUNsYXNzZXMoY2xhc3NlczogbnVtYmVyW10pOiBPYnNlcnZhYmxlPFByb3BlcnR5T3B0aW9uW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoY2xhc3Nlcy5tYXAocGtDbGFzcyA9PiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKS5waXBlKFxuICAgICAgbWFwKGMgPT4gYy5iYXNpY190eXBlID09PSA5KSxcbiAgICAgIHN3aXRjaE1hcChpc1RlRW4gPT4gdGhpcy5jLnBpcGVTcGVjaWZpY0FuZEJhc2ljRmllbGRzKHBrQ2xhc3MpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChjbGFzc0ZpZWxkcyA9PiBjbGFzc0ZpZWxkc1xuICAgICAgICAgICAgLmZpbHRlcihmID0+ICEhZi5wcm9wZXJ0eS5ma1Byb3BlcnR5KVxuICAgICAgICAgICAgLm1hcChmID0+ICh7XG4gICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGYuaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgZmtQcm9wZXJ0eURvbWFpbjogZi5pc091dGdvaW5nID8gZi5zb3VyY2VDbGFzcyA6IG51bGwsXG4gICAgICAgICAgICAgIGZrUHJvcGVydHlSYW5nZTogZi5pc091dGdvaW5nID8gbnVsbCA6IGYuc291cmNlQ2xhc3MsXG4gICAgICAgICAgICAgIHBrUHJvcGVydHk6IGYucHJvcGVydHkuZmtQcm9wZXJ0eVxuICAgICAgICAgICAgfSkpKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoaXRlbXMgPT4ge1xuICAgICAgICAgICAgaWYgKGlzVGVFbikge1xuICAgICAgICAgICAgICAvLyBhZGQgdGltZSBwcm9wZXJ0aWVzIChhdCBzb21lIHRpbWUgd2l0aGluLCAuLi4pXG4gICAgICAgICAgICAgIERmaENvbmZpZy5QUk9QRVJUWV9QS1NfV0hFUkVfVElNRV9QUklNSVRJVkVfSVNfUkFOR0UubWFwKHBrUHJvcGVydHkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgcGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgIGZrUHJvcGVydHlEb21haW46IHBrQ2xhc3MsXG4gICAgICAgICAgICAgICAgICBma1Byb3BlcnR5UmFuZ2U6IERmaENvbmZpZy5DTEFTU19QS19USU1FX1BSSU1JVElWRSxcbiAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoaXRlbXMubWFwKGl0ZW0gPT4gdGhpcy5jLnBpcGVGaWVsZExhYmVsKFxuICAgICAgICAgICAgICBpdGVtLnBrUHJvcGVydHksXG4gICAgICAgICAgICAgIGl0ZW0uZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgICAgICAgaXRlbS5ma1Byb3BlcnR5UmFuZ2UsXG4gICAgICAgICAgICApLnBpcGUobWFwKGxhYmVsID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNPdXRnb2luZyA9IGl0ZW0uaXNPdXRnb2luZztcbiAgICAgICAgICAgICAgY29uc3QgbzogUHJvcGVydHlPcHRpb24gPSB7XG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgICBwazogaXRlbS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgIHByb3BlcnR5RmllbGRLZXk6IHByb3BlcnR5T3B0aW9uRmllbGRLZXkoaXRlbS5wa1Byb3BlcnR5LCBpc091dGdvaW5nKVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgIH0pKSkpO1xuICAgICAgICAgIH0pKSlcbiAgICApXG5cblxuICAgICkpLnBpcGUobWFwKHkgPT4gZmxhdHRlbjxQcm9wZXJ0eU9wdGlvbj4oeSkpKTtcbiAgfVxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlUGtDbGFzc2VzRnJvbVByb3BlcnR5U2VsZWN0TW9kZWwobW9kZWw6IFByb3BlcnR5U2VsZWN0TW9kZWwpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgW1xuICAgICAgICB0aGlzLmMucGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMobW9kZWwub3V0Z29pbmdQcm9wZXJ0aWVzLCB0cnVlKSxcbiAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLmluZ29pbmdQcm9wZXJ0aWVzLCBmYWxzZSksXG4gICAgICBdXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbb3V0LCBpbmddKSA9PiB1bmlxKFsuLi5vdXQsIC4uLmluZ10pKVxuICAgIClcbiAgfVxuXG4gIGdldFBrQ2xhc3Nlc0Zyb21Qcm9wZXJ0eVNlbGVjdE1vZGVsJChtb2RlbCQ6IE9ic2VydmFibGU8UHJvcGVydHlTZWxlY3RNb2RlbD4pOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIG1vZGVsJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKG1vZGVsID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICBbXG4gICAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLm91dGdvaW5nUHJvcGVydGllcywgdHJ1ZSksXG4gICAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLmluZ29pbmdQcm9wZXJ0aWVzLCBmYWxzZSksXG4gICAgICAgIF1cbiAgICAgICkucGlwZShcbiAgICAgICAgbWFwKChbb3V0LCBpbmddKSA9PiB1bmlxKFsuLi5vdXQsIC4uLmluZ10pKVxuICAgICAgKSlcbiAgICApXG4gIH1cblxuXG5cbiAgZ2V0UHJvcGVydHlPcHRpb25zJChjbGFzc1R5cGVzJDogT2JzZXJ2YWJsZTxDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbD4pOiBPYnNlcnZhYmxlPFByb3BlcnR5T3B0aW9uW10+IHtcbiAgICByZXR1cm4gY2xhc3NUeXBlcyQucGlwZTxDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCwgUHJvcGVydHlPcHRpb25bXT4oXG4gICAgICAvLyBtYWtlIHN1cmUgb25seSBpdCBwYXNzZXMgb25seSBpZiBkYXRhIG9mIHRoZSBhcnJheUNsYXNzZXMgYXJlIGNoYW5nZWQgKG5vdCBjaGlsZHJlbilcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkPENsYXNzQW5kVHlwZVNlbGVjdE1vZGVsPigoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gZXF1YWxzKGEsIGIpO1xuICAgICAgfSksXG4gICAgICBzd2l0Y2hNYXAoKHgpID0+ICF4ID8gZW1wdHkoKSA6IHRoaXMuYi5waXBlQ2xhc3Nlc09mUGVyc2lzdGVudEl0ZW1zKHgudHlwZXMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigocGtzKSA9PiAhIXBrcyksXG4gICAgICAgICAgc3dpdGNoTWFwKHR5cGVDbGFzc2VzID0+IHRoaXMuYy5waXBlVHlwZWRDbGFzc2VzT2ZUeXBlQ2xhc3Nlcyh0eXBlQ2xhc3NlcykucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCh0eXBlZENsYXNzZXMgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gdW5pcShbLi4udHlwZWRDbGFzc2VzLCAuLi4oeC5jbGFzc2VzIHx8IFtdKV0pO1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlUHJvcGVydHlPcHRpb25zRm9ybUNsYXNzZXMoY2xhc3NlcylcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvcGVydHlPcHRpb25GaWVsZEtleShma1Byb3BlcnR5OiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBzdHJpbmcge1xuICByZXR1cm4gJ18nICsgZmtQcm9wZXJ0eSArICdfJyArIChpc091dGdvaW5nID8gJ291dGdvaW5nJyA6ICdpbmdvaW5nJyk7XG59XG5cbiJdfQ==