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
        var _a;
        var _this = this;
        /** @type {?} */
        var virtualStatementToTimeSpan = { fk_object_info: page.fkSourceEntity };
        /** @type {?} */
        var targets = (_a = {}, _a[DfhConfig.ClASS_PK_TIME_SPAN] = { timeSpan: 'true' }, _a)
        // console.log('subfieldType.temporalEntity.length', subfieldType.temporalEntity.length)
        // for each of these subfields
        ;
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
                fkProperty: fkProperty,
                isOutgoing: true,
                limit: 1,
                offset: 0,
                fkSourceEntity: page.fkSourceEntity,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9pbmZvcm1hdGlvbi1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUlqRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuSCxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBTXRFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUs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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDVixtREFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFqQixVQUFrQixRQUFnQjtRQUNoQyxPQUFPLElB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cmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGZoQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBJbmZTdGF0ZW1lbnQgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgR3ZGaWVsZFBhZ2UsIEd2RmllbGRUYXJnZXRzLCBHdlRhcmdldFR5cGUsIFRpbWVQcmltaXRpdmVXaXRoQ2FsLCBXYXJFbnRpdHlQcmV2aWV3VGltZVNwYW4gfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdE9yRW1wdHksIHNvcnRBYmMsIFRpbWVQcmltaXRpdmVQaXBlLCBUaW1lU3BhblBpcGUsIFRpbWVTcGFuVXRpbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgZXF1YWxzLCBmbGF0dGVuLCB1bmlxLCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIGVtcHR5LCBpaWYsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhY2hlLCBzcHlUYWcgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IGluZlRpbWVQcmltVG9UaW1lUHJpbVdpdGhDYWwgfSBmcm9tICcuLi9mdW5jdGlvbnMvZnVuY3Rpb25zJztcbmltcG9ydCB7IENsYXNzQW5kVHlwZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvQ2xhc3NBbmRUeXBlTm9kZSc7XG5pbXBvcnQgeyBDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCB9IGZyb20gJy4uL21vZGVscy9DbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCc7XG5pbXBvcnQgeyBQcm9wZXJ0eU9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9Qcm9wZXJ0eU9wdGlvbic7XG5pbXBvcnQgeyBQcm9wZXJ0eVNlbGVjdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL1Byb3BlcnR5U2VsZWN0TW9kZWwnO1xuaW1wb3J0IHsgU3RhdGVtZW50UHJvalJlbCwgU3RhdGVtZW50VGFyZ2V0LCBTdGF0ZW1lbnRXaXRoVGFyZ2V0LCBTdWJlbnRpdHlTdWJmaWVsZFBhZ2UsIFN1YmZpZWxkUGFnZSB9IGZyb20gJy4uL21vZGVscy9TdGF0ZW1lbnRXaXRoVGFyZ2V0JztcbmltcG9ydCB7IEluZlNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2luZi5zZXJ2aWNlJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UgfSBmcm9tICcuL2FjdGl2ZS1wcm9qZWN0LXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvblBpcGVzU2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEluZm9ybWF0aW9uQmFzaWNQaXBlc1NlcnZpY2UgfSBmcm9tICcuL2luZm9ybWF0aW9uLWJhc2ljLXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NoZW1hU2VsZWN0b3JzU2VydmljZSB9IGZyb20gJy4vc2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlJztcblxuXG5cblxuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG4vKipcbiAqIFRoaXMgU2VydmljZSBwcm92aWRlcyBhIGNvbGxlY2lvbiBvZiBwaXBlcyB0aGF0IGFnZ3JlZ2F0ZSBvciB0cmFuc2Zvcm0gaW5mb3JtYXRpb24uXG4gKiBGb3IgRXhhbXBsZVxuICogLSB0aGUgbGlzdHMgb2YgdGV4dCBwcm9wZXJ0aWVzLCBhcHBlbGxhaXRvbnMsIHBsYWNlcywgdGltZS1wcmltaXRpdmVzIC8gdGltZS1zcGFucyBldGMuXG4gKiAtIHRoZSBsYWJlbCBvZiB0ZW1wb3JhbCBlbnRpdHkgb3IgcGVyc2lzdGVudCBpdGVtXG4gKlxuICogVGhpcyBtYWlubHkgc2VsZWN0cyBkYXRhIGZyb20gdGhlIGluZm9ybWF0aW9uIHNjaGVtYSBhbmQgdGhlIHJlbGF0aW9uIHRvIHByb2plY3RzLlxuICogSXQgY29tYmluZXMgcGlwZXMgc2VsZWN0aW5nIGRhdGEgZnJvbSB0aGVcbiAqIC0gYWN0aXZhdGVkIHByb2plY3RcbiAqIC0gYWx0ZXJuYXRpdmVzIChub3QgaW4gcHJvamVjdCBidXQgaW4gb3RoZXJzKVxuICogLSByZXBvXG4gKlxuICovXG5leHBvcnQgY2xhc3MgSW5mb3JtYXRpb25QaXBlc1NlcnZpY2Uge1xuXG4gIGluZlJlcG86IEluZlNlbGVjdG9yO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYjogSW5mb3JtYXRpb25CYXNpY1BpcGVzU2VydmljZSxcbiAgICBwcml2YXRlIHA6IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzOiBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgYzogQ29uZmlndXJhdGlvblBpcGVzU2VydmljZSxcbiAgICBwdWJsaWMgdGltZVByaW1pdGl2ZVBpcGU6IFRpbWVQcmltaXRpdmVQaXBlLFxuICAgIHByaXZhdGUgdGltZVNwYW5QaXBlOiBUaW1lU3BhblBpcGUsXG4gICAgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+XG4gICkge1xuICAgIHRoaXMuaW5mUmVwbyA9IG5ldyBJbmZTZWxlY3RvcihuZ1JlZHV4LCBvZigncmVwbycpKVxuICB9XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIFBpcGUgdGhlIHByb2plY3QgZW50aXRpZXNcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAvLyAgIC8vIEBzcHlUYWdcbiAgLy8gICBwaXBlTGlzdExlbmd0aChsOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gIC8vICAgICBzd2l0Y2ggKGwubGlzdFR5cGUpIHtcbiAgLy8gICAgICAgY2FzZSAnYXBwZWxsYXRpb24nOlxuICAvLyAgICAgICBjYXNlICdlbnRpdHktcHJldmlldyc6XG4gIC8vICAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgLy8gICAgICAgY2FzZSAncGxhY2UnOlxuICAvLyAgICAgICBjYXNlICdkaW1lbnNpb24nOlxuICAvLyAgICAgICBjYXNlICdsYW5nU3RyaW5nJzpcbiAgLy8gICAgICAgY2FzZSAndGVtcG9yYWwtZW50aXR5JzpcbiAgLy8gICAgICAgICByZXR1cm4gdGhpcy5waXBlTGlzdChsLCBwa0VudGl0eSkucGlwZShtYXAoaXRlbXMgPT4gaXRlbXMubGVuZ3RoKSlcblxuICAvLyAgICAgICBjYXNlICd0aW1lLXNwYW4nOlxuICAvLyAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAvLyAgICAgICAgICAgdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KDcyLCBwa0VudGl0eSksXG4gIC8vICAgICAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoNzEsIHBrRW50aXR5KSxcbiAgLy8gICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTAsIHBrRW50aXR5KSxcbiAgLy8gICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTEsIHBrRW50aXR5KSxcbiAgLy8gICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTIsIHBrRW50aXR5KSxcbiAgLy8gICAgICAgICAgIHRoaXMuYi5waXBlT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eSgxNTMsIHBrRW50aXR5KVxuICAvLyAgICAgICAgICkucGlwZShcbiAgLy8gICAgICAgICAgIHRhcCgoeCkgPT4ge1xuXG4gIC8vICAgICAgICAgICB9KSxcbiAgLy8gICAgICAgICAgIG1hcChpdGVtcyA9PiBpdGVtcy5maWx0ZXIoeCA9PiB4Lmxlbmd0aCA+IDApLmxlbmd0aCkpXG5cbiAgLy8gICAgICAgLy8gY2FzZSAndGV4dC1wcm9wZXJ0eSc6XG4gIC8vICAgICAgIC8vICAgcmV0dXJuIHRoaXMucGlwZUxpc3RUZXh0UHJvcGVydHkobCwgcGtFbnRpdHkpLnBpcGUobWFwKGl0ZW1zID0+IGl0ZW1zLmxlbmd0aCkpXG5cbiAgLy8gICAgICAgZGVmYXVsdDpcbiAgLy8gICAgICAgICBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgLy8gICAgICAgICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG5cbiAgLy8gICAvLyBAc3B5VGFnXG4gIC8vICAgcGlwZUxpc3QobDogU3ViZmllbGQsIHBrRW50aXR5LCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8SXRlbUxpc3Q+IHtcbiAgLy8gICAgIGlmIChsLmxpc3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm4gdGhpcy5waXBlTGlzdEFwcGVsbGF0aW9uKGwsIHBrRW50aXR5LCBsaW1pdClcbiAgLy8gICAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZW50aXR5UHJldmlldykgcmV0dXJuIHRoaXMucGlwZUxpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5LCBsaW1pdClcbiAgLy8gICAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ3VhZ2UpIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ3VhZ2UobCwgcGtFbnRpdHksIGxpbWl0KVxuICAvLyAgICAgZWxzZSBpZiAobC5saXN0VHlwZS5wbGFjZSkgcmV0dXJuIHRoaXMucGlwZUxpc3RQbGFjZShsLCBwa0VudGl0eSwgbGltaXQpXG4gIC8vICAgICBlbHNlIGlmIChsLmxpc3RUeXBlLmRpbWVuc2lvbikgcmV0dXJuIHRoaXMucGlwZUxpc3REaW1lbnNpb24obCwgcGtFbnRpdHksIGxpbWl0KVxuICAvLyAgICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5nU3RyaW5nKSByZXR1cm4gdGhpcy5waXBlTGlzdExhbmdTdHJpbmcobCwgcGtFbnRpdHksIGxpbWl0KVxuICAvLyAgICAgZWxzZSBpZiAobC5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkgcmV0dXJuIHRoaXMucGlwZUxpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5LCBsaW1pdClcbiAgLy8gICAgIGVsc2UgaWYgKGwubGlzdFR5cGUudGltZVNwYW4pIHtcbiAgLy8gICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1UaW1lU3Bhbihwa0VudGl0eSkucGlwZShcbiAgLy8gICAgICAgICBtYXAoKHRzKSA9PiBbdHNdLmZpbHRlcihpID0+IGkucHJvcGVydGllcy5sZW5ndGggPiAwKSlcbiAgLy8gICAgICAgKVxuICAvLyAgICAgfVxuICAvLyAgICAgZWxzZSBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3RUeXBlJylcbiAgLy8gICB9XG5cbiAgLy8gICAvLyBAc3B5VGFnXG4gIC8vICAgcGlwZUxpc3RCYXNpY1N0YXRlbWVudEl0ZW1zKGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgcGtQcm9qZWN0OiBudW1iZXIpOiBPYnNlcnZhYmxlPEJhc2ljU3RhdGVtZW50SXRlbVtdPiB7XG4gIC8vICAgICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAvLyAgICAgICB0aGlzLmIucGlwZU91dGdvaW5nQmFzaWNTdGF0ZW1lbnRJdGVtc0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHksIHBrUHJvamVjdCkgOlxuICAvLyAgICAgICB0aGlzLmIucGlwZUluZ29pbmdCYXNpY1N0YXRlbWVudEl0ZW1zQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSwgcGtQcm9qZWN0KVxuICAvLyAgICAgKVxuICAvLyAgIH1cblxuICAvLyAgIC8qKlxuICAvLyAgICAqIFBpcGUgdGhlIGl0ZW1zIGluIGFwcGVsbGF0aW9uIGZpZWxkXG4gIC8vICAgICovXG4gIC8vICAgLy8gQHNweVRhZ1xuICAvLyAgIHBpcGVMaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAvLyAgICAgICAucGlwZShcbiAgLy8gICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocikpKVxuICAvLyAgICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgLy8gICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICAgIH0pKVxuICAvLyAgIH1cblxuICAvLyAgIC8qKlxuICAvLyAgKiBQaXBlIHRoZSBpdGVtcyBpbiBlbnRpdHkgcHJldmlldyBmaWVsZFxuICAvLyAgKi9cbiAgLy8gICAvLyBAc3B5VGFnXG4gIC8vICAgcGlwZUxpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gIC8vICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgIHRhZyhgYmVmb3JlLSR7cGtFbnRpdHl9LSR7bGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eX0tJHtsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzc31gKSxcbiAgLy8gICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSkpXG4gIC8vICAgICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcylcbiAgLy8gICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLm9yZE51bSA+IGIub3JkTnVtID8gMSA6IC0xKSxcbiAgLy8gICAgICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAvLyAgICAgICAgICAgICAgICksXG4gIC8vICAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKVxuICAvLyAgICAgICAgICAgICApXG4gIC8vICAgICAgICAgfSksXG4gIC8vICAgICAgICAgdGFnKGBhZnRlci0ke3BrRW50aXR5fS0ke2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHl9LSR7bGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3N9YCksXG4gIC8vICAgICAgIClcblxuICAvLyAgIH1cblxuXG4gIC8vICAgLy8gQHNweVRhZ1xuICAvLyAgIHBpcGVMaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlU3RhdGVtZW50c09mTGlzdChsaXN0RGVmaW5pdGlvbiwgcGtFbnRpdHkpXG4gIC8vICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKSkpXG4gIC8vICAgICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICAgIGxpbWl0VG8obGltaXQpLFxuICAvLyAgICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgICAgfSkpXG4gIC8vICAgfVxuXG4gIC8vICAgLyoqXG4gIC8vICAgICogUGlwZSB0aGUgaXRlbXMgaW4gcGxhY2UgbGlzdFxuICAvLyAgICAqL1xuICAvLyAgIC8vIEBzcHlUYWdcbiAgLy8gICBwaXBlTGlzdFBsYWNlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHk6IG51bWJlciwgbGltaXQ/OiBudW1iZXIpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbVtdPiB7XG5cbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAvLyAgICAgICAucGlwZShcbiAgLy8gICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtUGxhY2UocikpKVxuICAvLyAgICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgLy8gICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICAgIH0pKVxuICAvLyAgIH1cblxuICAvLyAgIC8qKlxuICAvLyAgICAqIFBpcGUgdGhlIGl0ZW1zIGluIHBsYWNlIGxpc3RcbiAgLy8gICAgKi9cbiAgLy8gICAvLyBAc3B5VGFnXG4gIC8vICAgcGlwZUxpc3REaW1lbnNpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8RGltZW5zaW9uSXRlbVtdPiB7XG5cbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZVN0YXRlbWVudHNPZkxpc3QobGlzdERlZmluaXRpb24sIHBrRW50aXR5KVxuICAvLyAgICAgICAucGlwZShcbiAgLy8gICAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRGltZW5zaW9uKHIpKSlcbiAgLy8gICAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgICAgbGltaXRUbyhsaW1pdCksXG4gIC8vICAgICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgICB9KSlcbiAgLy8gICB9XG5cbiAgLy8gICAvKipcbiAgLy8gICogUGlwZSB0aGUgaXRlbXMgaW4gbGFuZ1N0cmluZyBsaXN0XG4gIC8vICAqL1xuICAvLyAgIC8vIEBzcHlUYWdcbiAgLy8gICBwaXBlTGlzdExhbmdTdHJpbmc8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW1bXT4ge1xuXG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVTdGF0ZW1lbnRzT2ZMaXN0KGxpc3REZWZpbml0aW9uLCBwa0VudGl0eSlcbiAgLy8gICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUxhbmdTdHJpbmcocikpKVxuICAvLyAgICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgICBsaW1pdFRvKGxpbWl0KSxcbiAgLy8gICAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICAgIH0pKVxuXG4gIC8vICAgfVxuXG4gIC8qKlxuICAgKiBwaXBlIHRoZSBwcm9qZWN0IHJlbGF0aW9uIG9mIGdpdmVuIHN0YXRtZW50LCBpZiB0aGUgc2NvcGUgb2YgdGhpcyBwYWdlIGlzIGluUHJvamVjdFxuICAgKiBAcGFyYW0gc3RtdCBJbmZTdGF0ZW1lbnQgdG8gYmUgY29tcGxldGVkIHdpdGggcHJvalJlbFxuICAgKiBAcGFyYW0gcGFnZSBwYWdlIGZvciB3aGljaCB3ZSBhcmUgcGlwaW5nIHRoaXMgc3R1ZmZcbiAgICovXG4gIHBpcGVQcm9qUmVsT2ZTdGF0ZW1lbnQoc3RtdDogSW5mU3RhdGVtZW50LCBwYWdlOiBHdkZpZWxkUGFnZSk6IE9ic2VydmFibGU8U3RhdGVtZW50UHJvalJlbD4ge1xuICAgIGlmIChwYWdlLnNjb3BlLmluUHJvamVjdCkge1xuICAgICAgcmV0dXJuIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSRcbiAgICAgICAgLmtleShwYWdlLnNjb3BlLmluUHJvamVjdCArICdfJyArIHN0bXQucGtfZW50aXR5KS5waXBlKFxuICAgICAgICAgIG1hcChcbiAgICAgICAgICAgIHByb2pSZWwgPT4gKHtcbiAgICAgICAgICAgICAgcHJvalJlbCxcbiAgICAgICAgICAgICAgb3JkTnVtOiBwYWdlLmlzT3V0Z29pbmcgPyBwcm9qUmVsLm9yZF9udW1fb2ZfcmFuZ2UgOiBwcm9qUmVsLm9yZF9udW1fb2ZfZG9tYWluXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IEJlaGF2aW9yU3ViamVjdCh7XG4gICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgICAgICAgb3JkTnVtOiAwXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICAvKipcbiAgICogcGlwZSB0aGUgdGFyZ2V0IG9mIGdpdmVuIHN0YXRtZW50XG4gICAqIEBwYXJhbSBzdG10IEluZlN0YXRlbWVudCB0byBiZSBjb21wbGV0ZWQgd2l0aCB0YXJnZXRcbiAgICogQHBhcmFtIHBhZ2UgcGFnZSBmb3Igd2hpY2ggd2UgYXJlIHBpcGluZyB0aGlzIHN0dWZmXG4gICAqIEBwYXJhbSBzdWJmaWVsZFR5cGUgdHlwZSBvZiBzdWJmaWVsZCBmb3Igd2hpY2ggd2UgcGlwZSB0aGlzIHN0dWZmXG4gICAqL1xuICBwaXBlVGFyZ2V0T2ZTdGF0ZW1lbnQoc3RtdDogSW5mU3RhdGVtZW50LCBwYWdlOiBHdkZpZWxkUGFnZSwgdGFyZ2V0czogR3ZGaWVsZFRhcmdldHMpOiBPYnNlcnZhYmxlPFN0YXRlbWVudFRhcmdldD4ge1xuICAgIGNvbnN0IGlzT3V0Z29pbmcgPSBwYWdlLmlzT3V0Z29pbmdcbiAgICBjb25zdCB0YXJnZXRJbmZvID0gaXNPdXRnb2luZyA/IHN0bXQuZmtfb2JqZWN0X2luZm8gOiBzdG10LmZrX3N1YmplY3RfaW5mbztcbiAgICAvLyBoZXJlIHlvdSBjb3VsZCBhZGQgdGFyZ2V0RGF0YSBvciB0YXJnZXRDZWxsXG5cblxuICAgIHJldHVybiB0aGlzLnMuaW5mJC5nZXRNb2RlbE9mRW50aXR5JCh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgIHN3aXRjaE1hcChpdGVtID0+IHtcbiAgICAgICAgY29uc3Qgc3ViZmllbGRUeXBlOiBHdlRhcmdldFR5cGUgPSB0YXJnZXRzW2l0ZW0uZmtDbGFzc11cbiAgICAgICAgaWYgKHN1YmZpZWxkVHlwZS5hcHBlbGxhdGlvbikge1xuICAgICAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5hcHBlbGxhdGlvbiQuYnlfcGtfZW50aXR5JC5rZXkodGFyZ2V0SW5mbykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgICAgICBtYXAoYXBwZWxsYXRpb24gPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IGFwcGVsbGF0aW9uLnN0cmluZyxcbiAgICAgICAgICAgICAgICB0YXJnZXRDbGFzczogYXBwZWxsYXRpb24uZmtfY2xhc3MsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICBhcHBlbGxhdGlvblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLnBsYWNlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnBsYWNlJC5ieV9wa19lbnRpdHkkLmtleSh0YXJnZXRJbmZvKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgICAgICAgICAgIG1hcChwbGFjZSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQ6IHN0bXQsXG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogYFdHUzg0OiAke3BsYWNlLmxhdH3CsCwgJHtwbGFjZS5sb25nfcKwYCxcbiAgICAgICAgICAgICAgICB0YXJnZXRDbGFzczogcGxhY2UuZmtfY2xhc3MsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICBwbGFjZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLmRpbWVuc2lvbikge1xuICAgICAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5kaW1lbnNpb24kLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKGRpbWVuc2lvbiA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhkaW1lbnNpb24uZmtfbWVhc3VyZW1lbnRfdW5pdClcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgdW5pdFByZXZpZXcgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogYCR7ZGltZW5zaW9uLm51bWVyaWNfdmFsdWV9ICR7dW5pdFByZXZpZXcuZW50aXR5X2xhYmVsfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzczogZGltZW5zaW9uLmZrX2NsYXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdWJmaWVsZFR5cGUubGFuZ1N0cmluZykge1xuICAgICAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5nX3N0cmluZyQuYnlfcGtfZW50aXR5JC5rZXkodGFyZ2V0SW5mbykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgICAgICBzd2l0Y2hNYXAobGFuZ1N0cmluZyA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5ndWFnZSQuYnlfcGtfZW50aXR5JC5rZXkobGFuZ1N0cmluZy5ma19sYW5ndWFnZSlcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogYCR7bGFuZ1N0cmluZy5zdHJpbmd9ICgke2xhbmd1YWdlLmlzbzYzOTF9KWAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzczogbGFuZ1N0cmluZy5ma19jbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5nU3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS5sYW5ndWFnZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5ndWFnZSQuYnlfcGtfZW50aXR5JC5rZXkodGFyZ2V0SW5mbykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcih4ID0+ICEheCksXG4gICAgICAgICAgICBtYXAobGFuZ3VhZ2UgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IGAke2xhbmd1YWdlLm5vdGVzIHx8IGxhbmd1YWdlLmlzbzYzOTF9YCxcbiAgICAgICAgICAgICAgICB0YXJnZXRDbGFzczogbGFuZ3VhZ2UuZmtfY2xhc3MsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICBsYW5ndWFnZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLmVudGl0eVByZXZpZXcgfHwgc3ViZmllbGRUeXBlLnR5cGVJdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICAgICAgbWFwKGVudGl0eVByZXZpZXcgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IGAke2VudGl0eVByZXZpZXcuZW50aXR5X2xhYmVsfWAsXG4gICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IGVudGl0eVByZXZpZXcuZmtfY2xhc3MsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICBlbnRpdHlQcmV2aWV3XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBzdG10VGFyZ2V0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eSkge1xuXG4gICAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnRlbXBvcmFsX2VudGl0eSQuX2J5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICAgICAgbWFwKHRlbXBvcmFsRW50aXR5ID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3RtdFRhcmdldDogU3RhdGVtZW50VGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgIHN0YXRlbWVudDogc3RtdCxcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIHRhcmdldExhYmVsOiBgYCxcbiAgICAgICAgICAgICAgICB0YXJnZXRDbGFzczogdGVtcG9yYWxFbnRpdHkuZmtfY2xhc3MsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICBlbnRpdHk6IHtcbiAgICAgICAgICAgICAgICAgICAgcGtFbnRpdHk6IHRlbXBvcmFsRW50aXR5LnBrX2VudGl0eSxcbiAgICAgICAgICAgICAgICAgICAgZmtDbGFzczogdGVtcG9yYWxFbnRpdHkuZmtfY2xhc3NcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWJmaWVsZFR5cGUudGVtcG9yYWxFbnRpdHkubGVuZ3RoJywgc3ViZmllbGRUeXBlLnRlbXBvcmFsRW50aXR5Lmxlbmd0aClcblxuICAgICAgICAgIC8vIC8vIGZvciBlYWNoIG9mIHRoZXNlIHN1YmZpZWxkc1xuICAgICAgICAgIC8vIGNvbnN0IHN1YmVudGl0eVBhZ2VzJCA9IHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eS5tYXAoc3ViZmllbGRSZXEgPT4ge1xuXG4gICAgICAgICAgLy8gICAvLyBjb25zb2xlLmxvZygnc3ViZW50aXR5IHN1YmZpZWxkIGZvciB0YXJnZXRJbmZvJywgdGFyZ2V0SW5mbylcblxuICAgICAgICAgIC8vICAgLy8gY3JlYXRlIHBhZ2U6R3ZTdWJmaWVsZFBhZ2VcbiAgICAgICAgICAvLyAgIGNvbnN0IHsgaXNDaXJjdWxhciwgLi4ucCB9ID0gc3ViZmllbGRSZXEucGFnZVxuICAgICAgICAgIC8vICAgY29uc3Qgc2NvcGUgPSBwYWdlLnNjb3BlLm5vdEluUHJvamVjdCA/IHsgaW5SZXBvOiB0cnVlIH0gOiBwYWdlLnNjb3BlXG4gICAgICAgICAgLy8gICBjb25zdCBuZXN0ZWRQYWdlOiBHdkZpZWxkUGFnZSA9IHtcbiAgICAgICAgICAvLyAgICAgLi4ucCxcbiAgICAgICAgICAvLyAgICAgZmtTb3VyY2VFbnRpdHk6IHRhcmdldEluZm8sXG4gICAgICAgICAgLy8gICAgIHNjb3BlLFxuICAgICAgICAgIC8vICAgfVxuXG4gICAgICAgICAgLy8gICByZXR1cm4gdGhpcy5waXBlU3ViZmllbGRQYWdlKG5lc3RlZFBhZ2UsIHN1YmZpZWxkUmVxLnN1YmZpZWxkVHlwZSkucGlwZShcbiAgICAgICAgICAvLyAgICAgbWFwKCh7IGNvdW50LCBzdGF0ZW1lbnRzIH0pID0+IHtcbiAgICAgICAgICAvLyAgICAgICBjb25zdCB7IGxpbWl0LCBvZmZzZXQsIC4uLnMgfSA9IG5lc3RlZFBhZ2U7XG4gICAgICAgICAgLy8gICAgICAgY29uc3Qgc3ViZW50aXR5U3ViZmllbGRQYWdlOiBTdWJlbnRpdHlTdWJmaWVsZFBhZ2UgPSB7XG4gICAgICAgICAgLy8gICAgICAgICBzdWJmaWVsZDogcyxcbiAgICAgICAgICAvLyAgICAgICAgIGNvdW50LFxuICAgICAgICAgIC8vICAgICAgICAgc3RhdGVtZW50c1xuICAgICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgICAvLyAgICAgICByZXR1cm4gc3ViZW50aXR5U3ViZmllbGRQYWdlXG4gICAgICAgICAgLy8gICAgIH0pLFxuICAgICAgICAgIC8vICAgICAvLyBzdGFydFdpdGgodW5kZWZpbmVkKSAvLyBUT0RPIHJlbW92ZSEgdGhpcyBpcyBmb3IgZGVidWdnaW5nXG4gICAgICAgICAgLy8gICApXG4gICAgICAgICAgLy8gfSlcblxuICAgICAgICAgIC8vIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShzdWJlbnRpdHlQYWdlcyQpXG4gICAgICAgICAgLy8gICAucGlwZShcbiAgICAgICAgICAvLyAgICAgLy8gZmlsdGVyKHN1YmZpZWxkcyA9PiB7XG4gICAgICAgICAgLy8gICAgIC8vICAgY29uc29sZS5sb2coJ3N1YmZpZWxkc1xcbicsIHN1YmZpZWxkcy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAvLyAgICAgLy8gICAgIGNvbnN0IHJlcSA9IHN1YmZpZWxkVHlwZS50ZW1wb3JhbEVudGl0eVtpXVxuICAgICAgICAgIC8vICAgICAvLyAgICAgY29uc3QgZmllbGRJbmZvID0gdGFyZ2V0SW5mbyArICdfJyArIHJlcS5wYWdlLmZrUHJvcGVydHkgKyAnXycgKyByZXEucGFnZS50YXJnZXRDbGFzcyArICdfJyArIGtleXMocmVxLnN1YmZpZWxkVHlwZSlbMF1cbiAgICAgICAgICAvLyAgICAgLy8gICAgIHJldHVybiBgJHtpfTogJHtpdGVtID09PSB1bmRlZmluZWQgP1xuICAgICAgICAgIC8vICAgICAvLyAgICAgICBgdW5kZWZpbmVkICR7ZmllbGRJbmZvfWAgOlxuICAgICAgICAgIC8vICAgICAvLyAgICAgICBgb2sgICAgICAgICR7ZmllbGRJbmZvfWBcbiAgICAgICAgICAvLyAgICAgLy8gICAgICAgfWBcbiAgICAgICAgICAvLyAgICAgLy8gICB9KS5qb2luKCdcXG4nKSlcbiAgICAgICAgICAvLyAgICAgLy8gICByZXR1cm4gIXN1YmZpZWxkcy5pbmNsdWRlcyh1bmRlZmluZWQpXG4gICAgICAgICAgLy8gICAgIC8vIH0pLFxuICAgICAgICAgIC8vICAgICBtYXAoXG4gICAgICAgICAgLy8gICAgICAgc3ViZmllbGRzID0+IHtcbiAgICAgICAgICAvLyAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAvLyAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgIC8vICAgICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICAgIC8vICAgICAgICAgICB0YXJnZXRMYWJlbDogJycsXG4gICAgICAgICAgLy8gICAgICAgICAgIHRhcmdldENsYXNzOiBwYWdlLnRhcmdldENsYXNzLFxuICAgICAgICAgIC8vICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAvLyAgICAgICAgICAgICBlbnRpdHk6IHtcbiAgICAgICAgICAvLyAgICAgICAgICAgICAgIHBrRW50aXR5OiB0YXJnZXRJbmZvLFxuICAgICAgICAgIC8vICAgICAgICAgICAgICAgc3ViZmllbGRzXG4gICAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAgIC8vICAgICAgICAgICB9XG4gICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgLy8gICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgICAvLyAgICAgKVxuICAgICAgICAgIC8vICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZiAoc3ViZmllbGRUeXBlLnRpbWVQcmltaXRpdmUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQudGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHRhcmdldEluZm8pLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAgICAgICAgICAgc3dpdGNoTWFwKHRpbWVQcmltaXRpdmUgPT4ge1xuICAgICAgICAgICAgICAvLyBnZXQgY2FsZW5kYXJcbiAgICAgICAgICAgICAgbGV0IGNhbCQ6IE9ic2VydmFibGU8VGltZVByaW1pdGl2ZVdpdGhDYWwuQ2FsZW5kYXJFbnVtPlxuICAgICAgICAgICAgICBpZiAocGFnZS5zY29wZS5pblByb2plY3QpIHtcbiAgICAgICAgICAgICAgICBjYWwkID0gdGhpcy5zLnBybyQuaW5mb19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JC5rZXkocGFnZS5zY29wZS5pblByb2plY3QgKyAnXycgKyBzdG10LnBrX2VudGl0eSlcbiAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgICAgaW5mb1Byb2pSZWwgPT4gaW5mb1Byb2pSZWwuY2FsZW5kYXIgYXMgVGltZVByaW1pdGl2ZVdpdGhDYWwuQ2FsZW5kYXJFbnVtXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYWwkID0gbmV3IEJlaGF2aW9yU3ViamVjdChzdG10LmNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhciBhcyBUaW1lUHJpbWl0aXZlV2l0aENhbC5DYWxlbmRhckVudW0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gcGlwZSB0YXJnZXQgdGltZSBwcmltaXRpdmUgb2Ygc3RtdFxuICAgICAgICAgICAgICByZXR1cm4gY2FsJC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAgIGNhbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVQcmltV2l0aENhbCA9IGluZlRpbWVQcmltVG9UaW1lUHJpbVdpdGhDYWwodGltZVByaW1pdGl2ZSwgY2FsKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdG10VGFyZ2V0OiBTdGF0ZW1lbnRUYXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGVtZW50OiBzdG10LFxuICAgICAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltV2l0aENhbCksXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHRpbWVQcmltaXRpdmUuZmtfY2xhc3MsXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lUHJpbWl0aXZlOiB0aW1lUHJpbVdpdGhDYWxcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0bXRUYXJnZXRcblxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGltcGxlbWVudGF0aW9uIGZvdW5kIGZvciBzdWJmaWVsZFR5cGUgJHtKU09OLnN0cmluZ2lmeShzdWJmaWVsZFR5cGUpfWApO1xuICAgICAgfSlcbiAgICApXG5cblxuICB9XG5cbiAgLyoqXG4gICAqIHBpcGUgdGFyZ2V0IGFuZCBwcm9qUmVsIG9mIHRoZSBnaXZlbiBzdGF0ZW1lbnRcbiAgICovXG4gIHBpcGVTdGF0ZW1lbnRXaXRoVGFyZ2V0KHN0bXQ6IEluZlN0YXRlbWVudCwgcGFnZTogR3ZGaWVsZFBhZ2UsIHRhcmdldHM6IEd2RmllbGRUYXJnZXRzKTogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRXaXRoVGFyZ2V0PiB7XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZVRhcmdldE9mU3RhdGVtZW50KHN0bXQsIHBhZ2UsIHRhcmdldHMpLFxuICAgICAgdGhpcy5waXBlUHJvalJlbE9mU3RhdGVtZW50KHN0bXQsIHBhZ2UpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbdGFyZ2V0LCBwcm9qUmVsXSkgPT4gKHsgLi4udGFyZ2V0LCAuLi5wcm9qUmVsIH0pKVxuICAgIClcbiAgfVxuXG4gIHBpcGVTdWJmaWVsZFBhZ2UocGFnZTogR3ZGaWVsZFBhZ2UsIHRhcmdldHM6IEd2RmllbGRUYXJnZXRzKTogT2JzZXJ2YWJsZTxTdWJmaWVsZFBhZ2U+IHtcbiAgICBpZiAocGFnZS5ma1Byb3BlcnR5ID09PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTiAmJiBwYWdlLmlzT3V0Z29pbmcpIHtcbiAgICAgIC8vIGlmIHRpbWVTcGFuIG1ha2UgYSBzaG9ydCBjdXQ6IHByb2R1Y2UgYSB2aXJ0dWFsIHN0YXRlbWVudFdpdGhUYXJnZXQgZnJvbSBlbnRpdHkgdG8gdGltZVNwYW5cbiAgICAgIHJldHVybiB0aGlzLnBpcGVUaW1lU3BhbihwYWdlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIGdldCB0aGUgc3RhdG1lbnRzIG9mIHRoYXQgcGFnZVxuICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgIHRoaXMucy5pbmYkLnN0YXRlbWVudCQucGFnaW5hdGlvbiQucGlwZUNvdW50KHBhZ2UpLFxuICAgICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kLnBpcGVQYWdlKHBhZ2UpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoXG4gICAgICAgICAgICAgIHBrU3RtdHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICAgICAgICAgICAgcGtTdG10cy5tYXAocGtTdG10ID0+IHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfcGtfZW50aXR5JC5rZXkocGtTdG10KVxuICAgICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggc3RhdGVtZW50LCBkZXBlbmRpbmcgb24gdGhlIHN1YmZpZWxkVHlwZSwgbG9hZCB0aGUgY29ycmVzcG9uZGluZyB0YXJnZXRcbiAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoc3RtdCA9PiAhIXN0bXQpLFxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoc3RtdCA9PiB0aGlzLnBpcGVTdGF0ZW1lbnRXaXRoVGFyZ2V0KHN0bXQsIHBhZ2UsIHRhcmdldHMpKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICApXG4gICAgICApLnBpcGUoXG4gICAgICAgIG1hcCgoW2NvdW50LCBzdGF0ZW1lbnRzXSkgPT4gKHsgY291bnQsIHN0YXRlbWVudHMgfSkpXG4gICAgICApXG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIHBpcGVUaW1lU3BhbihwYWdlOiBHdkZpZWxkUGFnZSkge1xuICAgIGNvbnN0IHZpcnR1YWxTdGF0ZW1lbnRUb1RpbWVTcGFuID0geyBma19vYmplY3RfaW5mbzogcGFnZS5ma1NvdXJjZUVudGl0eSB9O1xuICAgIGNvbnN0IHRhcmdldHM6IEd2RmllbGRUYXJnZXRzID0geyBbRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTl06IHsgdGltZVNwYW46ICd0cnVlJyB9IH1cblxuICAgIC8vIGNvbnNvbGUubG9nKCdzdWJmaWVsZFR5cGUudGVtcG9yYWxFbnRpdHkubGVuZ3RoJywgc3ViZmllbGRUeXBlLnRlbXBvcmFsRW50aXR5Lmxlbmd0aClcblxuICAgIC8vIGZvciBlYWNoIG9mIHRoZXNlIHN1YmZpZWxkc1xuICAgIGNvbnN0IHN1YmVudGl0eVBhZ2VzJCA9IERmaENvbmZpZy5QUk9QRVJUWV9QS1NfV0hFUkVfVElNRV9QUklNSVRJVkVfSVNfUkFOR0VcbiAgICAgIC5tYXAoZmtQcm9wZXJ0eSA9PiB7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3N1YmVudGl0eSBzdWJmaWVsZCBmb3IgdGFyZ2V0SW5mbycsIHRhcmdldEluZm8pXG5cbiAgICAgICAgLy8gY3JlYXRlIHBhZ2U6R3ZTdWJmaWVsZFBhZ2VcbiAgICAgICAgY29uc3Qgc2NvcGUgPSBwYWdlLnNjb3BlLm5vdEluUHJvamVjdCA/IHsgaW5SZXBvOiB0cnVlIH0gOiBwYWdlLnNjb3BlXG5cbiAgICAgICAgY29uc3QgbmVzdGVkUGFnZTogR3ZGaWVsZFBhZ2UgPSB7XG4gICAgICAgICAgZmtQcm9wZXJ0eSxcbiAgICAgICAgICBpc091dGdvaW5nOiB0cnVlLFxuICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICBma1NvdXJjZUVudGl0eTogcGFnZS5ma1NvdXJjZUVudGl0eSxcbiAgICAgICAgICBzY29wZSxcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdWJmVHlwZTogR3ZUYXJnZXRUeXBlID0ge1xuICAgICAgICAgIHRpbWVQcmltaXRpdmU6ICd0cnVlJ1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyZ3RzID0ge1xuICAgICAgICAgIFtEZmhDb25maWcuQ0xBU1NfUEtfVElNRV9QUklNSVRJVkVdOiBzdWJmVHlwZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBpcGVTdWJmaWVsZFBhZ2UobmVzdGVkUGFnZSwgdHJndHMpLnBpcGUoXG4gICAgICAgICAgbWFwKCh7IGNvdW50LCBzdGF0ZW1lbnRzIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbGltaXQsIG9mZnNldCwgLi4ucyB9ID0gbmVzdGVkUGFnZTtcbiAgICAgICAgICAgIGNvbnN0IHN1YmVudGl0eVN1YmZpZWxkUGFnZTogU3ViZW50aXR5U3ViZmllbGRQYWdlID0ge1xuICAgICAgICAgICAgICBzdWJmaWVsZDogcyxcbiAgICAgICAgICAgICAgY291bnQsXG4gICAgICAgICAgICAgIHN0YXRlbWVudHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdWJlbnRpdHlTdWJmaWVsZFBhZ2VcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoc3ViZW50aXR5UGFnZXMkKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChcbiAgICAgICAgICBzdWJmaWVsZHMgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGltZVNwYW5QcmV2aWV3OiBXYXJFbnRpdHlQcmV2aWV3VGltZVNwYW4gPSB7fVxuICAgICAgICAgICAgc3ViZmllbGRzLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgICAgIGlmIChzLnN0YXRlbWVudHNbMF0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdCA9IHMuc3RhdGVtZW50c1swXVxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IERmaENvbmZpZy5QUk9QRVJUWV9QS19UT19FWElTVEVOQ0VfVElNRV9LRVlbc3Quc3RhdGVtZW50LmZrX3Byb3BlcnR5XVxuICAgICAgICAgICAgICAgIHRpbWVTcGFuUHJldmlld1trZXldID0gc3QudGFyZ2V0LnRpbWVQcmltaXRpdmVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnN0IHN0bXRUYXJnZXQ6IFN0YXRlbWVudFRhcmdldCA9IHtcbiAgICAgICAgICAgICAgc3RhdGVtZW50OiB2aXJ0dWFsU3RhdGVtZW50VG9UaW1lU3BhbixcbiAgICAgICAgICAgICAgaXNPdXRnb2luZzogcGFnZS5pc091dGdvaW5nLFxuICAgICAgICAgICAgICB0YXJnZXRMYWJlbDogdGhpcy50aW1lU3BhblBpcGUudHJhbnNmb3JtKG5ldyBUaW1lU3BhblV0aWwodGltZVNwYW5QcmV2aWV3KSksXG4gICAgICAgICAgICAgIHRhcmdldENsYXNzOiBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOLFxuICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICB0aW1lU3Bhbjoge1xuICAgICAgICAgICAgICAgICAgcHJldmlldzogdGltZVNwYW5QcmV2aWV3LFxuICAgICAgICAgICAgICAgICAgc3ViZmllbGRzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RtdFRhcmdldFxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKS5waXBlKG1hcChzdG10VGFyZ2V0ID0+IHtcbiAgICAgICAgY29uc3Qgc3RtdFdUOiBTdGF0ZW1lbnRXaXRoVGFyZ2V0ID0ge1xuICAgICAgICAgIC4uLnN0bXRUYXJnZXQsXG4gICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7IGNvdW50OiAxLCBzdGF0ZW1lbnRzOiBbc3RtdFdUXSB9O1xuICAgICAgfSkpO1xuICB9XG5cbiAgLy8gcGlwZVN0YXRlbWVudExpc3RQYWdlKFxuICAvLyAgIHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLFxuICAvLyAgIGxpbWl0OiBudW1iZXIsXG4gIC8vICAgb2Zmc2V0OiBudW1iZXIsXG4gIC8vICAgcGtQcm9qZWN0OiBudW1iZXIsXG4gIC8vICAgbGlzdERlZmluaXRpb246IFN1YmZpZWxkLFxuICAvLyAgIGFsdGVybmF0aXZlID0gZmFsc2UpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAvLyAgIC8vIHByZXBhcmUgcGFnZSBsb2FkZXJcbiAgLy8gICBjb25zdCBwYWdlTG9hZGVyJCA9IGFsdGVybmF0aXZlID8gdGhpcy5pbmZSZXBvLnN0YXRlbWVudCQucGFnaW5hdGlvbiQgOiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kO1xuXG4gIC8vICAgLy8gcHJlcGFyZSBiYXNpYyBzdGF0ZW1lbnQgaXRlbSBsb2FkZXJcbiAgLy8gICBjb25zdCBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIgPSAocGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcsIHBrUHJvaikgPT4ge1xuICAvLyAgICAgcmV0dXJuIGFsdGVybmF0aXZlID9cbiAgLy8gICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcpIDpcbiAgLy8gICAgICAgdGhpcy5iLnBpcGVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrUHJvaiwgcGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcpXG4gIC8vICAgfVxuXG4gIC8vICAgY29uc3QgcGFnaW5hdGVkU3RhdGVtZW50UGtzJCA9IHBhZ2VMb2FkZXIkLnBpcGVQYWdlKHBhZ2luYXRlQnksIGxpbWl0LCBvZmZzZXQpXG5cbiAgLy8gICByZXR1cm4gcGFnaW5hdGVkU3RhdGVtZW50UGtzJC5waXBlKFxuICAvLyAgICAgc3dpdGNoTWFwKChwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MpID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAvLyAgICAgICBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MubWFwKHBrU3RhdGVtZW50ID0+IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlcihwa1N0YXRlbWVudCwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZywgcGtQcm9qZWN0KVxuICAvLyAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgLy8gICAgICAgICAgIHN3aXRjaE1hcCh4ID0+IHRoaXMucC5zdHJlYW1FbnRpdHlQcmV2aWV3KHguaXNPdXRnb2luZyA/IHguc3RhdGVtZW50LmZrX29iamVjdF9pbmZvIDogeC5zdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKVxuICAvLyAgICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgICBtYXAoKHByZXZpZXcpID0+IHtcbiAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IEVudGl0eVByZXZpZXdJdGVtID0ge1xuICAvLyAgICAgICAgICAgICAgICAgICAuLi54LFxuICAvLyAgICAgICAgICAgICAgICAgICBwcmV2aWV3LFxuICAvLyAgICAgICAgICAgICAgICAgICBma0NsYXNzOiBwcmV2aWV3LmZrX2NsYXNzXG4gIC8vICAgICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgLy8gICAgICAgICAgICAgICB9KVxuICAvLyAgICAgICAgICAgICApXG4gIC8vICAgICAgICAgICApKVxuXG4gIC8vICAgICAgIClcbiAgLy8gICAgIClcbiAgLy8gICAgICkpXG5cbiAgLy8gfVxuXG5cbiAgLy8gLyoqXG4gIC8vICAqIFBpcGUgdGhlIHRlbXBvcmFsIGVudGl0aWVzIGNvbm5lY3RlZCB0byBnaXZlbiBlbnRpdHkgYnkgc3RhdGVtZW50cyB0aGF0IGFyZSBpbiB0aGUgY3VycmVudCBwcm9qZWN0XG4gIC8vICAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIC8vIHBpcGVUZW1wb3JhbEVudGl0eVRhYmxlUm93cyhcbiAgLy8gLy8gICBwYWdpbmF0ZUJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSxcbiAgLy8gLy8gICBsaW1pdDogbnVtYmVyLFxuICAvLyAvLyAgIG9mZnNldDogbnVtYmVyLFxuICAvLyAvLyAgIHBrUHJvamVjdDogbnVtYmVyLFxuICAvLyAvLyAgIGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCxcbiAgLy8gLy8gICBmaWVsZERlZmluaXRpb25zOiBGaWVsZFtdLFxuICAvLyAvLyAgIGFsdGVybmF0aXZlID0gZmFsc2UpOiBPYnNlcnZhYmxlPFRlbXBvcmFsRW50aXR5SXRlbVtdPiB7XG5cbiAgLy8gLy8gICAvLyBjb25zdCBwcm9wZXJ0eUl0ZW1UeXBlID0gdGhpcy5wcm9wZXJ0eUl0ZW1UeXBlKGZpZWxkRGVmaW5pdGlvbnMpXG5cbiAgLy8gLy8gICBjb25zdCB0YXJnZXRFbnRpdHlPZlN0YXRlbWVudEl0ZW0gPSAocjogQmFzaWNTdGF0ZW1lbnRJdGVtKSA9PiByLmlzT3V0Z29pbmcgPyByLnN0YXRlbWVudC5ma19vYmplY3RfaW5mbyA6IHIuc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbztcblxuICAvLyAvLyAgIC8vIHByZXBhcmUgcGFnZSBsb2FkZXJcbiAgLy8gLy8gICBjb25zdCBwYWdlTG9hZGVyJCA9IGFsdGVybmF0aXZlID8gdGhpcy5pbmZSZXBvLnN0YXRlbWVudCQucGFnaW5hdGlvbiQgOiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLnBhZ2luYXRpb24kO1xuXG4gIC8vIC8vICAgLy8gcHJlcGFyZSBiYXNpYyBzdGF0ZW1lbnQgaXRlbSBsb2FkZXJcbiAgLy8gLy8gICBjb25zdCBiYXNpY1N0YXRlbWVudEl0ZW1Mb2FkZXIgPSAocGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcsIHBrUHJvaikgPT4ge1xuICAvLyAvLyAgICAgcmV0dXJuIGFsdGVybmF0aXZlID9cbiAgLy8gLy8gICAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUJhc2ljU3RhdGVtZW50SXRlbUJ5UGtTdGF0ZW1lbnQocGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcpIDpcbiAgLy8gLy8gICAgICAgdGhpcy5iLnBpcGVCYXNpY1N0YXRlbWVudEl0ZW1CeVBrU3RhdGVtZW50KHBrUHJvaiwgcGtTdGF0ZW1lbnQsIGlzT3V0Z29pbmcpXG4gIC8vIC8vICAgfVxuXG4gIC8vIC8vICAgLy8gcHJlcGFyZSBUZUVuUm93IGxvYWRlclxuICAvLyAvLyAgIGNvbnN0IHJvd0xvYWRlciA9ICh0YXJnZXRFbnRpdHlQaywgZmllbGREZWYsIHBrUHJvaikgPT4ge1xuICAvLyAvLyAgICAgcmV0dXJuIGFsdGVybmF0aXZlID9cbiAgLy8gLy8gICAgICAgdGhpcy5waXBlSXRlbVRlRW5Sb3codGFyZ2V0RW50aXR5UGssIGZpZWxkRGVmLCBudWxsLCB0cnVlKSA6XG4gIC8vIC8vICAgICAgIHRoaXMucGlwZUl0ZW1UZUVuUm93KHRhcmdldEVudGl0eVBrLCBmaWVsZERlZiwgcGtQcm9qLCBmYWxzZSlcbiAgLy8gLy8gICB9XG5cbiAgLy8gLy8gICBjb25zdCBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MkID0gcGFnZUxvYWRlciQucGlwZVBhZ2UocGFnaW5hdGVCeSwgbGltaXQsIG9mZnNldClcblxuICAvLyAvLyAgIGNvbnN0IHJvd3MkID0gcGFnaW5hdGVkU3RhdGVtZW50UGtzJC5waXBlKFxuICAvLyAvLyAgICAgc3dpdGNoTWFwKChwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MpID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAvLyAvLyAgICAgICBwYWdpbmF0ZWRTdGF0ZW1lbnRQa3MubWFwKHBrU3RhdGVtZW50ID0+IGJhc2ljU3RhdGVtZW50SXRlbUxvYWRlcihwa1N0YXRlbWVudCwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZywgcGtQcm9qZWN0KVxuICAvLyAvLyAgICAgICAgIC5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gIC8vIC8vICAgICAgIClcbiAgLy8gLy8gICAgIClcbiAgLy8gLy8gICAgICAgLnBpcGUoXG4gIC8vIC8vICAgICAgICAgc3dpdGNoTWFwKCh0ZUVuU3RhdGVtZW50KSA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgLy8gLy8gICAgICAgICAgIHRlRW5TdGF0ZW1lbnQubWFwKChiYXNpY1N0YXRlbWVudEl0ZW0pID0+IHtcbiAgLy8gLy8gICAgICAgICAgICAgY29uc3QgcGtUZUVuID0gdGFyZ2V0RW50aXR5T2ZTdGF0ZW1lbnRJdGVtKGJhc2ljU3RhdGVtZW50SXRlbSk7XG4gIC8vIC8vICAgICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAvLyAvLyAgICAgICAgICAgICAgIHJvd0xvYWRlcihcbiAgLy8gLy8gICAgICAgICAgICAgICAgIHBrVGVFbixcbiAgLy8gLy8gICAgICAgICAgICAgICAgIGZpZWxkRGVmaW5pdGlvbnMsXG4gIC8vIC8vICAgICAgICAgICAgICAgICAvLyBwcm9wZXJ0eUl0ZW1UeXBlLFxuICAvLyAvLyAgICAgICAgICAgICAgICAgcGtQcm9qZWN0XG4gIC8vIC8vICAgICAgICAgICAgICAgKSxcbiAgLy8gLy8gICAgICAgICAgICAgICB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkLmtleShwa1Byb2plY3QgKyAnXycgKyBwa1RlRW4pXG4gIC8vIC8vICAgICAgICAgICAgICkucGlwZShcbiAgLy8gLy8gICAgICAgICAgICAgICBtYXAoKFtyb3csIHRlRW5Qcm9qUmVsXSkgPT4ge1xuICAvLyAvLyAgICAgICAgICAgICAgICAgY29uc3QgaXRlbTogVGVtcG9yYWxFbnRpdHlJdGVtID0ge1xuICAvLyAvLyAgICAgICAgICAgICAgICAgICAuLi5iYXNpY1N0YXRlbWVudEl0ZW0sXG4gIC8vIC8vICAgICAgICAgICAgICAgICAgIHJvdyxcbiAgLy8gLy8gICAgICAgICAgICAgICAgICAgcGtFbnRpdHk6IHBrVGVFbixcbiAgLy8gLy8gICAgICAgICAgICAgICAgICAgdGVFblByb2pSZWxcbiAgLy8gLy8gICAgICAgICAgICAgICAgIH07XG4gIC8vIC8vICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbVxuICAvLyAvLyAgICAgICAgICAgICAgIH0pXG4gIC8vIC8vICAgICAgICAgICAgIClcbiAgLy8gLy8gICAgICAgICAgIH0pXG4gIC8vIC8vICAgICAgICAgKSksXG4gIC8vIC8vICAgICAgICkpLFxuXG4gIC8vIC8vICAgKVxuICAvLyAvLyAgIHJldHVybiByb3dzJFxuICAvLyAvLyB9XG5cblxuXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUl0ZW1UZUVuUm93KHBrRW50aXR5OiBudW1iZXIsIGZpZWxkRGVmaW5pdGlvbnM6IEZpZWxkW10sIHBrUHJvamVjdDogbnVtYmVyLCByZXBvOiBib29sZWFuKTogT2JzZXJ2YWJsZTxUZW1wb3JhbEVudGl0eVJvdz4ge1xuXG4gIC8vICAgLy8gcGlwZSBvdXRnb2luZyBzdGF0ZW1lbnRzXG4gIC8vICAgY29uc3Qgb3V0Z29pbmdTdGF0ZW1lbnRzJCA9IHJlcG8gPyB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpIDogdGhpcy5iLnBpcGVPdXRnb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpO1xuICAvLyAgIC8vIHBpcGUgaW5nb2luZyBzdGF0ZW1lbnRzXG4gIC8vICAgY29uc3QgaW5nb2luZ1N0YXRlbWVudHMkID0gcmVwbyA/IHRoaXMuYi5waXBlUmVwb0luZ29pbmdTdGF0ZW1lbnRzKHBrRW50aXR5KSA6IHRoaXMuYi5waXBlSW5nb2luZ1N0YXRlbWVudHMocGtFbnRpdHkpO1xuXG5cbiAgLy8gICAvLyBwaXBlIGFsbCBzdGF0ZW1lbnRzIHdpdGggaW5mb3JtYXRpb24gbGVhZiBpdGVtc1xuXG4gIC8vICAgY29uc3Qgb3V0Z29pbmdJdGVtcyQ6IE9ic2VydmFibGU8U3RhdGVtZW50SXRlbVtdPiA9IG91dGdvaW5nU3RhdGVtZW50cyQucGlwZShcbiAgLy8gICAgIHN3aXRjaE1hcChzdGF0ZW1lbnRzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAvLyAgICAgICBzdGF0ZW1lbnRzXG4gIC8vICAgICAgICAgLmZpbHRlcihzdGF0ZW1lbnQgPT4gISFzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pIC8vIHJlbW92ZSBzdGF0ZW1lbnRzIG5vdCBwb2ludGluZyB0byBpbmZvcm1hdGlvblxuICAvLyAgICAgICAgIC5tYXAocyA9PiB7XG4gIC8vICAgICAgICAgICBjb25zdCBpc091dGdvaW5nID0gdHJ1ZTtcbiAgLy8gICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtKHMsIHBrUHJvamVjdCwgaXNPdXRnb2luZyk7XG4gIC8vICAgICAgICAgfSlcbiAgLy8gICAgICkpXG5cbiAgLy8gICApXG4gIC8vICAgY29uc3QgaW5nb2luZ0l0ZW1zJDogT2JzZXJ2YWJsZTxTdGF0ZW1lbnRJdGVtW10+ID0gaW5nb2luZ1N0YXRlbWVudHMkLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAoc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgLy8gICAgICAgc3RhdGVtZW50c1xuICAvLyAgICAgICAgIC5maWx0ZXIoc3RhdGVtZW50ID0+ICEhc3RhdGVtZW50LmZrX3N1YmplY3RfaW5mbykgLy8gcmVtb3ZlIHN0YXRlbWVudHMgbm90IHBvaW50aW5nIHRvIGluZm9ybWF0aW9uXG4gIC8vICAgICAgICAgLm1hcChzID0+IHtcbiAgLy8gICAgICAgICAgIGNvbnN0IGlzT3V0Z29pbmcgPSBmYWxzZTtcbiAgLy8gICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtKHMsIHBrUHJvamVjdCwgaXNPdXRnb2luZyk7XG4gIC8vICAgICAgICAgfSlcbiAgLy8gICAgICkpXG5cbiAgLy8gICApXG5cbiAgLy8gICBjb25zdCBzb3J0SXRlbXMgPSByZXBvID9cbiAgLy8gICAgIChpdGVtOiBTdGF0ZW1lbnRJdGVtW10pID0+IGl0ZW0uc29ydCgoYSwgYikgPT4gYS5zdGF0ZW1lbnQuaXNfaW5fcHJvamVjdF9jb3VudCA+IGIuc3RhdGVtZW50LmlzX2luX3Byb2plY3RfY291bnQgPyAxIDogLTEpIDpcbiAgLy8gICAgIChpdGVtOiBTdGF0ZW1lbnRJdGVtW10pID0+IGl0ZW07XG5cblxuICAvLyAgIHJldHVybiBjb21iaW5lTGF0ZXN0KG91dGdvaW5nSXRlbXMkLCBpbmdvaW5nSXRlbXMkKS5waXBlKFxuXG4gIC8vICAgICBtYXAoKFtvdXRnb2luZ0l0ZW1zLCBpbmdvaW5nSXRlbXNdKSA9PiB7XG4gIC8vICAgICAgIGNvbnN0IGdyb3VwZWRPdXQgPSBncm91cEJ5KChpKSA9PiAoaSAmJiBpLnN0YXRlbWVudCA/IGkuc3RhdGVtZW50LmZrX3Byb3BlcnR5LnRvU3RyaW5nKCkgOiB1bmRlZmluZWQpLCBvdXRnb2luZ0l0ZW1zKTtcbiAgLy8gICAgICAgY29uc3QgZ3JvdXBlZEluID0gZ3JvdXBCeSgoaSkgPT4gKGkgJiYgaS5zdGF0ZW1lbnQgPyBpLnN0YXRlbWVudC5ma19wcm9wZXJ0eS50b1N0cmluZygpIDogdW5kZWZpbmVkKSwgaW5nb2luZ0l0ZW1zKTtcbiAgLy8gICAgICAgcmV0dXJuIHsgZ3JvdXBlZE91dCwgZ3JvdXBlZEluIH1cbiAgLy8gICAgIH0pLFxuICAvLyAgICAgLy8gYXVkaXRUaW1lKDEwKSxcbiAgLy8gICAgIG1hcCgoZCkgPT4ge1xuICAvLyAgICAgICBjb25zdCByb3c6IFRlbXBvcmFsRW50aXR5Um93ID0ge31cblxuICAvLyAgICAgICBmaWVsZERlZmluaXRpb25zLmZvckVhY2goZmllbGREZWZpbml0aW9uID0+IHtcblxuICAvLyAgICAgICAgIGxldCBjZWxsOiBUZW1wb3JhbEVudGl0eUNlbGw7XG4gIC8vICAgICAgICAgZmllbGREZWZpbml0aW9uLmxpc3REZWZpbml0aW9ucy5mb3JFYWNoKGxpc3REZWZpbml0aW9uID0+IHtcbiAgLy8gICAgICAgICAgIGlmIChsaXN0RGVmaW5pdGlvbi5saXN0VHlwZS50aW1lU3Bhbikge1xuXG4gIC8vICAgICAgICAgICAgIGNvbnN0IHQgPSBwaWNrKFsnNzEnLCAnNzInLCAnMTUwJywgJzE1MScsICcxNTInLCAnMTUzJ10sIGQuZ3JvdXBlZE91dCk7XG4gIC8vICAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0KTtcbiAgLy8gICAgICAgICAgICAgY29uc3QgaXRlbXNDb3VudCA9IGtleXMubGVuZ3RoO1xuXG4gIC8vICAgICAgICAgICAgIGxldCBsYWJlbDtcbiAgLy8gICAgICAgICAgICAgaWYgKGl0ZW1zQ291bnQgPiAwKSB7XG4gIC8vICAgICAgICAgICAgICAgY29uc3QgdGltZVNwYW5LZXlzOiBDdHJsVGltZVNwYW5EaWFsb2dSZXN1bHQgPSB7fVxuICAvLyAgICAgICAgICAgICAgIGtleXMuZm9yRWFjaChrZXkgPT4geyB0aW1lU3BhbktleXNba2V5XSA9IHRba2V5XVswXS50aW1lUHJpbWl0aXZlIH0pXG4gIC8vICAgICAgICAgICAgICAgY29uc3QgdGltZVNwYW4gPSBUaW1lU3BhblV0aWwuZnJvbVRpbWVTcGFuRGlhbG9nRGF0YSh0aW1lU3BhbktleXMpO1xuICAvLyAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy50aW1lU3BhblBpcGUudHJhbnNmb3JtKHRpbWVTcGFuKTtcbiAgLy8gICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICBjZWxsID0ge1xuICAvLyAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcsXG4gIC8vICAgICAgICAgICAgICAgaXRlbXNDb3VudCxcbiAgLy8gICAgICAgICAgICAgICBsYWJlbCxcbiAgLy8gICAgICAgICAgICAgICBlbnRpdHlQcmV2aWV3OiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgICAgICAgIGlzVGltZVNwYW46IHRydWVcbiAgLy8gICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgZWxzZSB7XG4gIC8vICAgICAgICAgICAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gIC8vICAgICAgICAgICAgICAgaWYgKGQuZ3JvdXBlZE91dFtsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAvLyAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBzb3J0SXRlbXMoZC5ncm91cGVkT3V0W2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKVxuICAvLyAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gaXRlbXNbMF07XG4gIC8vICAgICAgICAgICAgICAgICBjZWxsID0ge1xuICAvLyAgICAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLFxuICAvLyAgICAgICAgICAgICAgICAgICBpdGVtc0NvdW50OiBpdGVtcy5sZW5ndGgsXG4gIC8vICAgICAgICAgICAgICAgICAgIGVudGl0eVByZXZpZXc6ICgoZmlyc3RJdGVtIHx8IHt9KSBhcyBFbnRpdHlQcmV2aWV3SXRlbSkucHJldmlldyxcbiAgLy8gICAgICAgICAgICAgICAgICAgbGFiZWw6IGZpcnN0SXRlbS5sYWJlbCxcbiAgLy8gICAgICAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgLy8gICAgICAgICAgICAgICAgICAgZmlyc3RJdGVtLFxuICAvLyAgICAgICAgICAgICAgICAgICBpdGVtc1xuICAvLyAgICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgICAgICAgICBpZiAoZC5ncm91cGVkSW5bbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gc29ydEl0ZW1zKGQuZ3JvdXBlZEluW2xpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHldKVxuICAvLyAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gaXRlbXNbMF07XG4gIC8vICAgICAgICAgICAgICAgICBjZWxsID0ge1xuICAvLyAgICAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nLFxuICAvLyAgICAgICAgICAgICAgICAgICBpdGVtc0NvdW50OiBpdGVtcy5sZW5ndGgsXG4gIC8vICAgICAgICAgICAgICAgICAgIGVudGl0eVByZXZpZXc6ICgoZmlyc3RJdGVtIHx8IHt9KSBhcyBFbnRpdHlQcmV2aWV3SXRlbSkucHJldmlldyxcbiAgLy8gICAgICAgICAgICAgICAgICAgbGFiZWw6IGZpcnN0SXRlbS5sYWJlbCxcbiAgLy8gICAgICAgICAgICAgICAgICAgcGtQcm9wZXJ0eTogbGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgLy8gICAgICAgICAgICAgICAgICAgZmlyc3RJdGVtLFxuICAvLyAgICAgICAgICAgICAgICAgICBpdGVtc1xuICAvLyAgICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgfVxuXG4gIC8vICAgICAgICAgfSlcblxuXG4gIC8vICAgICAgICAgcm93W2ZpZWxkRGVmaW5pdGlvbi5sYWJlbF0gPSBjZWxsO1xuICAvLyAgICAgICB9KVxuICAvLyAgICAgICByZXR1cm4gcm93XG4gIC8vICAgICB9KVxuXG5cbiAgLy8gICApXG4gIC8vIH1cblxuXG5cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwcml2YXRlIHBpcGVJdGVtKHI6IEluZlN0YXRlbWVudCwgcGtQcm9qZWN0OiBudW1iZXIsIHByb3BJc091dGdvaW5nOiBib29sZWFuKSB7XG5cbiAgLy8gICBjb25zdCB0YXJnZXRFbnRpdHkgPSBwcm9wSXNPdXRnb2luZyA/IHIuZmtfb2JqZWN0X2luZm8gOiByLmZrX3N1YmplY3RfaW5mbztcbiAgLy8gICByZXR1cm4gdGhpcy5zLmluZiQuZ2V0TW9kZWxPZkVudGl0eSQodGFyZ2V0RW50aXR5KS5waXBlKFxuICAvLyAgICAgc3dpdGNoTWFwKG0gPT4ge1xuICAvLyAgICAgICBjb25zdCBtb2RlbE5hbWU6IEluZk1vZGVsTmFtZSA9IG0gPyBtLm1vZGVsTmFtZSA6IHVuZGVmaW5lZDtcbiAgLy8gICAgICAgc3dpdGNoIChtb2RlbE5hbWUpIHtcbiAgLy8gICAgICAgICBjYXNlICdhcHBlbGxhdGlvbic6XG4gIC8vICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUFwcGVsbGF0aW9uKHIpO1xuICAvLyAgICAgICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgLy8gICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2Uocik7XG4gIC8vICAgICAgICAgY2FzZSAncGxhY2UnOlxuICAvLyAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1QbGFjZShyKTtcbiAgLy8gICAgICAgICBjYXNlICdkaW1lbnNpb24nOlxuICAvLyAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1EaW1lbnNpb24ocik7XG4gIC8vICAgICAgICAgY2FzZSAnbGFuZ19zdHJpbmcnOlxuICAvLyAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZUl0ZW1MYW5nU3RyaW5nKHIpO1xuICAvLyAgICAgICAgIGNhc2UgJ3RpbWVfcHJpbWl0aXZlJzpcbiAgLy8gICAgICAgICAgIHJldHVybiB0aGlzLnBpcGVJdGVtVGltZVByaW1pdGl2ZShyLCBwa1Byb2plY3QpOyAvLyBUT0RPOiBlbWl0cyB0d2ljZVxuICAvLyAgICAgICAgIGRlZmF1bHQ6XG4gIC8vICAgICAgICAgICByZXR1cm4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgcHJvcElzT3V0Z29pbmcpO1xuICAvLyAgICAgICB9XG5cblxuICAvLyAgICAgfSlcbiAgLy8gICApXG5cblxuICAvLyB9XG5cblxuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWY6IFN1YmZpZWxkLCBma0VudGl0eTogbnVtYmVyLCBsaW1pdD86IG51bWJlcik6IE9ic2VydmFibGU8RW50aXR5UHJvcGVydGllcz4ge1xuXG4gIC8vICAgaWYgKGxpc3REZWYubGlzdFR5cGUuYXBwZWxsYXRpb24pIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLnBpcGVMaXN0QXBwZWxsYXRpb24obGlzdERlZiwgZmtFbnRpdHksIGxpbWl0KVxuICAvLyAgICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiB0aGlzLmdldEVudGl0eVByb3BlcnRpZXMobGlzdERlZiwgaXRlbXMpKSlcbiAgLy8gICB9XG4gIC8vICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5sYW5ndWFnZSkge1xuICAvLyAgICAgcmV0dXJuIHRoaXMucGlwZUxpc3RMYW5ndWFnZShsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gIC8vICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAvLyAgIH1cbiAgLy8gICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLnBsYWNlKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5waXBlTGlzdFBsYWNlKGxpc3REZWYsIGZrRW50aXR5LCBsaW1pdClcbiAgLy8gICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gdGhpcy5nZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWYsIGl0ZW1zKSkpXG4gIC8vICAgfVxuICAvLyAgIGVsc2UgaWYgKGxpc3REZWYubGlzdFR5cGUuZGltZW5zaW9uKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5waXBlTGlzdERpbWVuc2lvbihsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gIC8vICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAvLyAgIH1cbiAgLy8gICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLmxhbmdTdHJpbmcpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLnBpcGVMaXN0TGFuZ1N0cmluZyhsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gIC8vICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAvLyAgIH1cblxuXG4gIC8vICAgZWxzZSBpZiAobGlzdERlZi5saXN0VHlwZS5lbnRpdHlQcmV2aWV3IHx8IGxpc3REZWYubGlzdFR5cGUudGVtcG9yYWxFbnRpdHkpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLnBpcGVMaXN0RW50aXR5UHJldmlldyhsaXN0RGVmLCBma0VudGl0eSwgbGltaXQpXG4gIC8vICAgICAgIC5waXBlKG1hcCgoaXRlbXMpID0+IHRoaXMuZ2V0RW50aXR5UHJvcGVydGllcyhsaXN0RGVmLCBpdGVtcykpKVxuICAvLyAgIH1cbiAgLy8gICBlbHNlIGlmIChsaXN0RGVmLmxpc3RUeXBlLnRpbWVTcGFuKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5waXBlSXRlbVRpbWVTcGFuKGZrRW50aXR5KVxuICAvLyAgICAgICAucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgLy8gICAgICAgICBjb25zdCBpdGVtcyA9IGl0ZW0ucHJvcGVydGllcy5maW5kKHAgPT4gcC5pdGVtcy5sZW5ndGggPiAwKSA/IFt7XG4gIC8vICAgICAgICAgICBsYWJlbDogdGhpcy50aW1lU3BhblBpcGUudHJhbnNmb3JtKHRpbWVTcGFuSXRlbVRvVGltZVNwYW4oaXRlbSkpLFxuICAvLyAgICAgICAgICAgcHJvcGVydGllczogW10gLy8gVE9ETyBjaGVjayBpZiB0aGUgcHJvcGVydGllcyBvciB0aGUgaXRlbSBhcmUgcmVhbGx5IG5vdCBuZWVkZWRcbiAgLy8gICAgICAgICB9XSA6IFtdXG4gIC8vICAgICAgICAgcmV0dXJuIHtcbiAgLy8gICAgICAgICAgIGxpc3REZWZpbml0aW9uOiBsaXN0RGVmLFxuICAvLyAgICAgICAgICAgaXRlbXNcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgIH0pKVxuICAvLyAgIH1cbiAgLy8gICBlbHNlIHJldHVybiBvZihudWxsKVxuICAvLyB9XG5cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlVGVtcG9yYWxFbnRpdHlSZW1vdmVQcm9wZXJ0aWVzKHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPFRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcz4ge1xuICAvLyAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAvLyAgICAgdGhpcy5zLmluZiQudGVtcG9yYWxfZW50aXR5JC5ieV9wa19lbnRpdHlfa2V5JChwa0VudGl0eSksXG4gIC8vICAgICB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3QkKHsgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eSB9KSxcbiAgLy8gICAgIHRoaXMucy5pbmYkLnRleHRfcHJvcGVydHkkLmJ5X2ZrX2NvbmNlcm5lZF9lbnRpdHlfaW5kZXhlZCQocGtFbnRpdHkpXG4gIC8vICAgKS5waXBlKFxuICAvLyAgICAgbWFwKChbdGVtcG9yYWxFbnRpdHksIHN0YXRlbWVudHMsIHRleHRQcm9wZXJ0aWVzXSkgPT4ge1xuICAvLyAgICAgICBjb25zdCByZXM6IFRlbXBvcmFsRW50aXR5UmVtb3ZlUHJvcGVydGllcyA9IHtcbiAgLy8gICAgICAgICB0ZW1wb3JhbEVudGl0eSxcbiAgLy8gICAgICAgICBzdGF0ZW1lbnRzOiBzdGF0ZW1lbnRzLFxuICAvLyAgICAgICAgIHRleHRQcm9wZXJ0aWVzOiB2YWx1ZXModGV4dFByb3BlcnRpZXMpXG4gIC8vICAgICAgIH1cbiAgLy8gICAgICAgcmV0dXJuIHJlc1xuICAvLyAgICAgfSlcbiAgLy8gICApXG4gIC8vIH1cblxuICAvLyBnZXRFbnRpdHlQcm9wZXJ0aWVzKGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgaXRlbXMpOiBFbnRpdHlQcm9wZXJ0aWVzIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgbGlzdERlZmluaXRpb24sXG4gIC8vICAgICBpdGVtcyxcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyAvKipcbiAgLy8gICogUGlwZSB0aW1lIHNwYW4gaXRlbSBpbiB2ZXJzaW9uIG9mIHByb2plY3RcbiAgLy8gICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUl0ZW1UaW1lU3Bhbihwa0VudGl0eSk6IE9ic2VydmFibGU8VGltZVNwYW5JdGVtPiB7XG5cbiAgLy8gICByZXR1cm4gdGhpcy5wLnBrUHJvamVjdCQucGlwZShcbiAgLy8gICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4ge1xuICAvLyAgICAgICByZXR1cm4gdGhpcy5jLnBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhcbiAgLy8gICAgICAgICBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOXG4gIC8vICAgICAgICkucGlwZShcbiAgLy8gICAgICAgICBzd2l0Y2hNYXAoZmllbGREZWZzID0+IHtcbiAgLy8gICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KGZpZWxkRGVmcy5tYXAoZmllbGREZWYgPT4gdGhpcy5zLmluZiQuc3RhdGVtZW50JC5ieV9zdWJqZWN0X2FuZF9wcm9wZXJ0eSQoe1xuICAvLyAgICAgICAgICAgICBma19wcm9wZXJ0eTogZmllbGREZWYucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgLy8gICAgICAgICAgICAgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eVxuICAvLyAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgICAgc3dpdGNoTWFwT3IoW10sIHN0YXRlbWVudHMgPT4gY29tYmluZUxhdGVzdChcbiAgLy8gICAgICAgICAgICAgICAgIHN0YXRlbWVudHMubWFwKHN0YXRlbWVudCA9PiBjb21iaW5lTGF0ZXN0KFxuICAvLyAgICAgICAgICAgICAgICAgICB0aGlzLnMuaW5mJC50aW1lX3ByaW1pdGl2ZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAvLyAgICAgICAgICAgICAgICAgICB0aGlzLnMucHJvJC5pbmZvX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19ma19lbnRpdHkkLmtleShwa1Byb2plY3QgKyAnXycgKyBzdGF0ZW1lbnQucGtfZW50aXR5KVxuICAvLyAgICAgICAgICAgICAgICAgKS5waXBlKG1hcCgoW2luZlRpbWVQcmltaXRpdmUsIHByb2pSZWxdKSA9PiB7XG4gIC8vICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gIC8vICAgICAgICAgICAgICAgICAgICAganVsaWFuRGF5OiBpbmZUaW1lUHJpbWl0aXZlLmp1bGlhbl9kYXksXG4gIC8vICAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXI6ICgocHJvalJlbC5jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgLy8gICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gIC8vICAgICAgICAgICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW06IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAvLyAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCxcbiAgLy8gICAgICAgICAgICAgICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICAgICAgICAgICAgICBwcm9qUmVsLFxuICAvLyAgICAgICAgICAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gIC8vICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAvLyAgICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgLy8gICAgICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgLy8gICAgICAgICAgICAgICAgIH0pKVxuICAvLyAgICAgICAgICAgICAgICAgKVxuICAvLyAgICAgICAgICAgICAgICkpLFxuICAvLyAgICAgICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG4gIC8vICAgICAgICAgICAgICAgICBjb25zdCByZXM6IFRpbWVTcGFuUHJvcGVydHkgPSB7XG4gIC8vICAgICAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uOiBmaWVsZERlZi5saXN0RGVmaW5pdGlvbnNbMF0sIGl0ZW1zXG4gIC8vICAgICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgICAgICByZXR1cm4gcmVzXG4gIC8vICAgICAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICAgICAgKVxuICAvLyAgICAgICAgICAgKSkucGlwZShcbiAgLy8gICAgICAgICAgICAgbWFwKChwcm9wZXJ0aWVzKSA9PiB7XG4gIC8vICAgICAgICAgICAgICAgY29uc3QgcHJvcHMgPSBwcm9wZXJ0aWVzLmZpbHRlcihwID0+IHAuaXRlbXMubGVuZ3RoID4gMCk7XG4gIC8vICAgICAgICAgICAgICAgY29uc3QgdGltZXNwYW5pdGVtOiBUaW1lU3Bhbkl0ZW0gPSB7XG4gIC8vICAgICAgICAgICAgICAgICBsYWJlbDogJycsXG4gIC8vICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wc1xuICAvLyAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICByZXR1cm4gdGltZXNwYW5pdGVtXG4gIC8vICAgICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICApXG4gIC8vICAgICAgICAgfSlcbiAgLy8gICAgICAgKVxuICAvLyAgICAgfSlcblxuICAvLyAgIClcbiAgLy8gfVxuXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUl0ZW1BcHBlbGxhdGlvbihzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtPiB7XG4gIC8vICAgcmV0dXJuIHRoaXMucy5pbmYkLmFwcGVsbGF0aW9uJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoXG4gIC8vICAgICBmaWx0ZXIoeCA9PiAhIXgpLFxuICAvLyAgICAgbWFwKGFwcGVsbGF0aW9uID0+IHtcbiAgLy8gICAgICAgaWYgKCFhcHBlbGxhdGlvbikgcmV0dXJuIG51bGw7XG4gIC8vICAgICAgIGNvbnN0IG5vZGU6IEFwcGVsbGF0aW9uSXRlbSA9IHtcbiAgLy8gICAgICAgICBvcmROdW06IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgc3RhdGVtZW50LFxuICAvLyAgICAgICAgIGxhYmVsOiBhcHBlbGxhdGlvbi5zdHJpbmcsXG4gIC8vICAgICAgICAgZmtDbGFzczogYXBwZWxsYXRpb24uZmtfY2xhc3NcbiAgLy8gICAgICAgfVxuICAvLyAgICAgICByZXR1cm4gbm9kZVxuICAvLyAgICAgfSkpXG4gIC8vIH1cblxuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVJdGVtTGFuZ3VhZ2Uoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbT4ge1xuICAvLyAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5ndWFnZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAvLyAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgLy8gICAgIG1hcChsYW5ndWFnZSA9PiB7XG4gIC8vICAgICAgIGlmICghbGFuZ3VhZ2UpIHJldHVybiBudWxsO1xuICAvLyAgICAgICBjb25zdCBub2RlOiBMYW5ndWFnZUl0ZW0gPSB7XG4gIC8vICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgIHN0YXRlbWVudCxcbiAgLy8gICAgICAgICBsYWJlbDogbGFuZ3VhZ2Uubm90ZXMsXG4gIC8vICAgICAgICAgZmtDbGFzczogbGFuZ3VhZ2UuZmtfY2xhc3NcbiAgLy8gICAgICAgfVxuICAvLyAgICAgICByZXR1cm4gbm9kZVxuICAvLyAgICAgfSkpXG4gIC8vIH1cblxuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVJdGVtUGxhY2Uoc3RhdGVtZW50OiBJbmZTdGF0ZW1lbnQpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbT4ge1xuICAvLyAgIHJldHVybiB0aGlzLnMuaW5mJC5wbGFjZSQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAvLyAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgLy8gICAgIG1hcChwbGFjZSA9PiB7XG4gIC8vICAgICAgIGlmICghcGxhY2UpIHJldHVybiBudWxsO1xuICAvLyAgICAgICBjb25zdCBub2RlOiBQbGFjZUl0ZW0gPSB7XG4gIC8vICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgIHN0YXRlbWVudCxcbiAgLy8gICAgICAgICBsYWJlbDogJ1dHUzg0OiAnICsgcGxhY2UubGF0ICsgJ8KwLCAnICsgcGxhY2UubG9uZyArICfCsCcsXG4gIC8vICAgICAgICAgZmtDbGFzczogcGxhY2UuZmtfY2xhc3NcbiAgLy8gICAgICAgfVxuICAvLyAgICAgICByZXR1cm4gbm9kZVxuICAvLyAgICAgfSkpXG4gIC8vIH1cblxuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVJdGVtRGltZW5zaW9uKHN0YXRlbWVudDogSW5mU3RhdGVtZW50KTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtPiB7XG4gIC8vICAgcmV0dXJuIHRoaXMucy5pbmYkLmRpbWVuc2lvbiQuYnlfcGtfZW50aXR5JC5rZXkoc3RhdGVtZW50LmZrX29iamVjdF9pbmZvKS5waXBlKFxuICAvLyAgICAgZmlsdGVyKHggPT4gISF4KSxcbiAgLy8gICAgIHN3aXRjaE1hcCgoZGltZW5zaW9uKSA9PiB7XG4gIC8vICAgICAgIHJldHVybiB0aGlzLnAuc3RyZWFtRW50aXR5UHJldmlldyhkaW1lbnNpb24uZmtfbWVhc3VyZW1lbnRfdW5pdClcbiAgLy8gICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgIG1hcChwcmV2aWV3ID0+IHtcblxuICAvLyAgICAgICAgICAgICBjb25zdCBub2RlOiBEaW1lbnNpb25JdGVtID0ge1xuICAvLyAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gIC8vICAgICAgICAgICAgICAgbGFiZWw6IGAke2RpbWVuc2lvbi5udW1lcmljX3ZhbHVlfSAke3ByZXZpZXcuZW50aXR5X2xhYmVsfWAsXG4gIC8vICAgICAgICAgICAgICAgZmtDbGFzczogZGltZW5zaW9uLmZrX2NsYXNzLFxuICAvLyAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgIHJldHVybiBub2RlXG4gIC8vICAgICAgICAgICB9KVxuICAvLyAgICAgICAgIClcbiAgLy8gICAgIH0pXG4gIC8vICAgKVxuICAvLyB9XG5cblxuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVJdGVtTGFuZ1N0cmluZyhzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCk6IE9ic2VydmFibGU8TGFuZ1N0cmluZ0l0ZW0+IHtcbiAgLy8gICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ19zdHJpbmckLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShcbiAgLy8gICAgIHN3aXRjaE1hcChcbiAgLy8gICAgICAgKGxhbmdTdHJpbmcpID0+IHtcbiAgLy8gICAgICAgICBpZiAoIWxhbmdTdHJpbmcpIHJldHVybiBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpXG4gIC8vICAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleShsYW5nU3RyaW5nLmZrX2xhbmd1YWdlKVxuICAvLyAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgIG1hcChsYW5ndWFnZSA9PiB7XG4gIC8vICAgICAgICAgICAgICAgaWYgKCFsYW5ndWFnZSkgcmV0dXJuIG51bGw7XG4gIC8vICAgICAgICAgICAgICAgbGV0IGxhYmVsID0gJyc7XG4gIC8vICAgICAgICAgICAgICAgaWYgKGxhbmdTdHJpbmcuc3RyaW5nKSBsYWJlbCA9IGxhbmdTdHJpbmcuc3RyaW5nXG4gIC8vICAgICAgICAgICAgICAgZWxzZSBpZiAobGFuZ1N0cmluZy5xdWlsbF9kb2MgJiYgbGFuZ1N0cmluZy5xdWlsbF9kb2Mub3BzICYmIGxhbmdTdHJpbmcucXVpbGxfZG9jLm9wcy5sZW5ndGgpIHtcbiAgLy8gICAgICAgICAgICAgICAgIGxhYmVsID0gbGFuZ1N0cmluZy5xdWlsbF9kb2Mub3BzLm1hcChvcCA9PiBvcC5pbnNlcnQpLmpvaW4oJycpO1xuICAvLyAgICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgICAgICBjb25zdCBub2RlOiBMYW5nU3RyaW5nSXRlbSA9IHtcbiAgLy8gICAgICAgICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgICAgICAgICAgc3RhdGVtZW50LFxuICAvLyAgICAgICAgICAgICAgICAgbGFiZWwsXG4gIC8vICAgICAgICAgICAgICAgICBma0NsYXNzOiBsYW5nU3RyaW5nLmZrX2NsYXNzLFxuICAvLyAgICAgICAgICAgICAgICAgbGFuZ3VhZ2UsXG4gIC8vICAgICAgICAgICAgICAgICBma0xhbmd1YWdlOiBsYW5nU3RyaW5nLmZrX2xhbmd1YWdlXG4gIC8vICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICAgIHJldHVybiBub2RlXG4gIC8vICAgICAgICAgICAgIH0pXG4gIC8vICAgICAgICAgICApXG4gIC8vICAgICAgIH0pXG4gIC8vICAgKVxuICAvLyB9XG5cblxuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVJdGVtRW50aXR5UHJldmlldyhzdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8RW50aXR5UHJldmlld0l0ZW0+IHtcbiAgLy8gICByZXR1cm4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoKGlzT3V0Z29pbmcgPyBzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8gOiBzdGF0ZW1lbnQuZmtfc3ViamVjdF9pbmZvKSkucGlwZShcbiAgLy8gICAgIC8vIGZpbHRlcihwcmV2aWV3ID0+ICFwcmV2aWV3LmxvYWRpbmcgJiYgISFwcmV2aWV3ICYmICEhcHJldmlldy5lbnRpdHlfdHlwZSksXG4gIC8vICAgICBtYXAocHJldmlldyA9PiB7XG4gIC8vICAgICAgIGlmICghcHJldmlldykge1xuICAvLyAgICAgICAgIHJldHVybiBudWxsO1xuICAvLyAgICAgICB9XG4gIC8vICAgICAgIGNvbnN0IG5vZGU6IEVudGl0eVByZXZpZXdJdGVtID0ge1xuICAvLyAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgIHByb2pSZWw6IHVuZGVmaW5lZCxcbiAgLy8gICAgICAgICBzdGF0ZW1lbnQsXG4gIC8vICAgICAgICAgcHJldmlldyxcbiAgLy8gICAgICAgICBsYWJlbDogcHJldmlldy5lbnRpdHlfbGFiZWwgfHwgJycsXG4gIC8vICAgICAgICAgZmtDbGFzczogcHJldmlldy5ma19jbGFzc1xuICAvLyAgICAgICB9XG4gIC8vICAgICAgIHJldHVybiBub2RlXG4gIC8vICAgICB9KSlcbiAgLy8gfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBAcGFyYW0gcGtcbiAgLy8gICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUl0ZW1UaW1lUHJpbWl0aXZlKHN0YXRlbWVudDogSW5mU3RhdGVtZW50LCBwa1Byb2plY3QpOiBPYnNlcnZhYmxlPFRpbWVQcmltaXRpdmVJdGVtPiB7XG4gIC8vICAgaWYgKHBrUHJvamVjdCkge1xuICAvLyAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gIC8vICAgICAgIHRoaXMucy5pbmYkLnRpbWVfcHJpbWl0aXZlJC5ieV9wa19lbnRpdHkkLmtleShzdGF0ZW1lbnQuZmtfb2JqZWN0X2luZm8pLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gIC8vICAgICAgIHRoaXMucy5wcm8kLmluZm9fcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQua2V5KHBrUHJvamVjdCArICdfJyArIHN0YXRlbWVudC5wa19lbnRpdHkpLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgLy8gICAgICkucGlwZShcbiAgLy8gICAgICAgbWFwKChbaW5mVGltZVByaW1pdGl2ZSwgcHJvalJlbF0pID0+IHtcbiAgLy8gICAgICAgICBpZiAoIWluZlRpbWVQcmltaXRpdmUpIHJldHVybiBudWxsO1xuICAvLyAgICAgICAgIGNvbnN0IHRpbWVQcmltaXRpdmUgPSBuZXcgVGltZVByaW1pdGl2ZSh7XG4gIC8vICAgICAgICAgICBqdWxpYW5EYXk6IGluZlRpbWVQcmltaXRpdmUuanVsaWFuX2RheSxcbiAgLy8gICAgICAgICAgIGNhbGVuZGFyOiAoKHByb2pSZWwuY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gIC8vICAgICAgICAgICBkdXJhdGlvbjogKGluZlRpbWVQcmltaXRpdmUuZHVyYXRpb24gYXMgR3JhbnVsYXJpdHkpXG4gIC8vICAgICAgICAgfSlcbiAgLy8gICAgICAgICBjb25zdCBub2RlOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgLy8gICAgICAgICAgIG9yZE51bTogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgICAgc3RhdGVtZW50LFxuICAvLyAgICAgICAgICAgdGltZVByaW1pdGl2ZSxcbiAgLy8gICAgICAgICAgIGxhYmVsOiB0aGlzLnRpbWVQcmltaXRpdmVQaXBlLnRyYW5zZm9ybSh0aW1lUHJpbWl0aXZlKSxcbiAgLy8gICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgLy8gICAgICAgICB9XG4gIC8vICAgICAgICAgcmV0dXJuIG5vZGVcbiAgLy8gICAgICAgfSkpXG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmluZlJlcG8udGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbykucGlwZShmaWx0ZXIoeCA9PiAhIXgpKS5waXBlKFxuICAvLyAgICAgICBtYXAoaW5mVGltZVByaW1pdGl2ZSA9PiB7XG4gIC8vICAgICAgICAgY29uc3QgdGltZVByaW1pdGl2ZSA9IG5ldyBUaW1lUHJpbWl0aXZlKHtcbiAgLy8gICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAvLyAgICAgICAgICAgY2FsZW5kYXI6ICgoc3RhdGVtZW50LmNvbW11bml0eV9mYXZvcml0ZV9jYWxlbmRhciB8fCAnZ3JlZ29yaWFuJykgYXMgQ2FsZW5kYXJUeXBlKSxcbiAgLy8gICAgICAgICAgIGR1cmF0aW9uOiAoaW5mVGltZVByaW1pdGl2ZS5kdXJhdGlvbiBhcyBHcmFudWxhcml0eSlcbiAgLy8gICAgICAgICB9KVxuICAvLyAgICAgICAgIGNvbnN0IG5vZGU6IFRpbWVQcmltaXRpdmVJdGVtID0ge1xuICAvLyAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgICBwcm9qUmVsOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgICBzdGF0ZW1lbnQsXG4gIC8vICAgICAgICAgICB0aW1lUHJpbWl0aXZlLFxuICAvLyAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAvLyAgICAgICAgICAgZmtDbGFzczogaW5mVGltZVByaW1pdGl2ZS5ma19jbGFzc1xuICAvLyAgICAgICAgIH1cbiAgLy8gICAgICAgICByZXR1cm4gbm9kZVxuICAvLyAgICAgICB9KVxuICAvLyAgICAgKVxuICAvLyAgIH1cbiAgLy8gfVxuXG5cbiAgLy8gLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyAqIFBpcGUgYWx0ZXJuYXRpdmVzIChub3QgaW4gcHJvamVjdClcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVBbHRMaXN0TGVuZ3RoKGw6IFN1YmZpZWxkLCBwa0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgLy8gICBzd2l0Y2ggKGwubGlzdFR5cGUpIHtcbiAgLy8gICAgIGNhc2UgJ2FwcGVsbGF0aW9uJzpcbiAgLy8gICAgIGNhc2UgJ2VudGl0eS1wcmV2aWV3JzpcbiAgLy8gICAgIGNhc2UgJ2xhbmd1YWdlJzpcbiAgLy8gICAgIGNhc2UgJ3BsYWNlJzpcbiAgLy8gICAgIGNhc2UgJ2xhbmdTdHJpbmcnOlxuICAvLyAgICAgY2FzZSAndGVtcG9yYWwtZW50aXR5JzpcbiAgLy8gICAgIGNhc2UgJ3RpbWUtc3Bhbic6XG4gIC8vICAgICAgIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0U3RhdGVtZW50cyhsLCBwa0VudGl0eSkucGlwZShtYXAoaXRlbXMgPT4gaXRlbXMubGVuZ3RoKSlcblxuICAvLyAgICAgZGVmYXVsdDpcbiAgLy8gICAgICAgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gIC8vICAgICAgIGJyZWFrO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUFsdExpc3QobDogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxJdGVtTGlzdD4ge1xuICAvLyAgIGlmIChsLmxpc3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdEFwcGVsbGF0aW9uKGwsIHBrRW50aXR5KVxuICAvLyAgIGVsc2UgaWYgKGwubGlzdFR5cGUuZW50aXR5UHJldmlldykgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5KVxuICAvLyAgIGVsc2UgaWYgKGwubGlzdFR5cGUubGFuZ3VhZ2UpIHJldHVybiB0aGlzLnBpcGVBbHRMaXN0TGFuZ3VhZ2UobCwgcGtFbnRpdHkpXG4gIC8vICAgZWxzZSBpZiAobC5saXN0VHlwZS5wbGFjZSkgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RQbGFjZShsLCBwa0VudGl0eSlcbiAgLy8gICBlbHNlIGlmIChsLmxpc3RUeXBlLmRpbWVuc2lvbikgcmV0dXJuIHRoaXMucGlwZUFsdExpc3REaW1lbnNpb24obCwgcGtFbnRpdHkpXG4gIC8vICAgZWxzZSBpZiAobC5saXN0VHlwZS5sYW5nU3RyaW5nKSByZXR1cm4gdGhpcy5waXBlQWx0TGlzdExhbmdTdHJpbmcobCwgcGtFbnRpdHkpXG4gIC8vICAgZWxzZSBpZiAobC5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkgcmV0dXJuIHRoaXMucGlwZUFsdExpc3RFbnRpdHlQcmV2aWV3KGwsIHBrRW50aXR5KVxuICAvLyAgIGVsc2UgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0VHlwZScpXG4gIC8vIH1cblxuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVBbHRMaXN0U3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPEluZlN0YXRlbWVudFtdPiB7XG4gIC8vICAgcmV0dXJuIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nID9cbiAgLy8gICAgIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVJbmdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkgOlxuICAvLyAgICAgdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZUluZ29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAvLyAgIClcbiAgLy8gfVxuXG4gIC8vIC8qKlxuICAvLyAqIFBpcGUgdGhlIGl0ZW1zIGluIGVudGl0eSBwcmV2aWV3IGZpZWxkXG4gIC8vICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUFsdExpc3RFbnRpdHlQcmV2aWV3PFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEVudGl0eVByZXZpZXdJdGVtW10+IHtcblxuICAvLyAgIHJldHVybiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZyA/XG4gIC8vICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlT3V0Z29pbmdTdGF0ZW1lbnRzKGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KSA6XG4gIC8vICAgICB0aGlzLmIucGlwZUFsdGVybmF0aXZlSW5nb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gIC8vICAgKS5waXBlKFxuICAvLyAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtRW50aXR5UHJldmlldyhyLCBsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSkpXG4gIC8vICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXNcbiAgLy8gICAgICAgICAgICAgLmZpbHRlcihub2RlID0+ICEhbm9kZSlcbiAgLy8gICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEub3JkTnVtID4gYi5vcmROdW0gPyAxIDogLTEpXG4gIC8vICAgICAgICAgICApLFxuICAvLyAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgIH0pKVxuXG4gIC8vIH1cblxuICAvLyAvKipcbiAgLy8gICogUGlwZSB0aGUgYWx0ZXJuYXRpdmUgaXRlbXMgaW4gcGxhY2UgbGlzdFxuICAvLyAgKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlQWx0TGlzdFBsYWNlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbVtdPiB7XG5cbiAgLy8gICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gIC8vICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtUGxhY2UocikpKVxuICAvLyAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICB9KSlcbiAgLy8gICB9XG4gIC8vIH1cblxuXG4gIC8vIC8qKlxuICAvLyAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBkaW1lbnNpb24gbGlzdFxuICAvLyAgKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlQWx0TGlzdERpbWVuc2lvbjxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxEaW1lbnNpb25JdGVtW10+IHtcblxuICAvLyAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgLy8gICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1EaW1lbnNpb24ocikpKVxuICAvLyAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICB9KSlcbiAgLy8gICB9XG4gIC8vIH1cblxuXG4gIC8vIC8qKlxuICAvLyAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBsYW5nU3RyaW5nIGxpc3RcbiAgLy8gICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZUFsdExpc3RMYW5nU3RyaW5nPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPExhbmdTdHJpbmdJdGVtW10+IHtcblxuICAvLyAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgLy8gICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5nU3RyaW5nKHIpKSlcbiAgLy8gICAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgICBtYXAobm9kZXMgPT4gbm9kZXMuZmlsdGVyKG5vZGUgPT4gISFub2RlICYmIG5vZGUuZmtDbGFzcyA9PT0gbGlzdERlZmluaXRpb24udGFyZ2V0Q2xhc3MpKSxcbiAgLy8gICAgICAgICAgICAgc3RhcnRXaXRoKFtdKSlcbiAgLy8gICAgICAgfSkpXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgLy8gLyoqXG4gIC8vICAqIFBpcGUgdGhlIGFsdGVybmF0aXZlIGl0ZW1zIGluIGFwcGVsbGF0aW9uIGZpZWxkXG4gIC8vICAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVBbHRMaXN0QXBwZWxsYXRpb248VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8QXBwZWxsYXRpb25JdGVtW10+IHtcblxuICAvLyAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVBbHRlcm5hdGl2ZU91dGdvaW5nU3RhdGVtZW50cyhsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgLy8gICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1BcHBlbGxhdGlvbihyKSkpXG4gIC8vICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgIH0pKVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBQaXBlIHRoZSBhbHRlcm5hdGl2ZSBpdGVtcyBpbiBsYW5ndWFnZSBmaWVsZFxuICAvLyAgKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlQWx0TGlzdExhbmd1YWdlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPExhbmd1YWdlSXRlbVtdPiB7XG5cbiAgLy8gICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlQWx0ZXJuYXRpdmVPdXRnb2luZ1N0YXRlbWVudHMobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gIC8vICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtTGFuZ3VhZ2UocikpKVxuICAvLyAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICB9KSlcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vICAqIFBpcGUgcmVwbyB2aWV3cyAoY29tbXVuaXR5IGZhdm9yaXRlcywgd2hlcmUgcmVzdHJpY3RlZCBieSBxdWFudGlmaWVycylcbiAgLy8gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAvLyAvKipcbiAgLy8gICogUGlwZSByZXBvc2l0b3J5IHRlbXBvcmFsIGVudGl0eSBpdGVtIGluIHRoZSB3YXkgaXQgaXMgZGVmaW5lZCBieSB0aGUgcmVwb3NpdG9yeVxuICAvLyAgKi9cblxuXG4gIC8vIC8qKlxuICAvLyAgKiBQaXBlIGFwcGVsbGF0aW9uIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gIC8vICAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVSZXBvTGlzdEFwcGVsbGF0aW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPEFwcGVsbGF0aW9uSXRlbVtdPiB7XG5cbiAgLy8gICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gIC8vICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtQXBwZWxsYXRpb24ocikpKVxuICAvLyAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICB9KSlcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyAvKipcbiAgLy8gKiBQaXBlIGxhbmd1YWdlIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gIC8vICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZVJlcG9MaXN0TGFuZ3VhZ2U8VD4obGlzdERlZmluaXRpb246IFN1YmZpZWxkLCBwa0VudGl0eSk6IE9ic2VydmFibGU8TGFuZ3VhZ2VJdGVtW10+IHtcblxuICAvLyAgIGlmIChsaXN0RGVmaW5pdGlvbi5pc091dGdvaW5nKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkucGlwZShcbiAgLy8gICAgICAgc3dpdGNoTWFwKChzdGF0ZW1lbnRzKSA9PiB7XG4gIC8vICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3Qoc3RhdGVtZW50cy5tYXAoKHIsIGkpID0+IHRoaXMucGlwZUl0ZW1MYW5ndWFnZShyKSkpXG4gIC8vICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgIH0pKVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIC8qKlxuICAvLyAgKiBQaXBlIHBsYWNlIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gIC8vICAqL1xuICAvLyAvLyBAc3B5VGFnXG4gIC8vIHBpcGVSZXBvTGlzdFBsYWNlPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPFBsYWNlSXRlbVtdPiB7XG5cbiAgLy8gICBpZiAobGlzdERlZmluaXRpb24uaXNPdXRnb2luZykge1xuICAvLyAgICAgcmV0dXJuIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkobGlzdERlZmluaXRpb24ucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpLnBpcGUoXG4gIC8vICAgICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHN0YXRlbWVudHMubWFwKChyLCBpKSA9PiB0aGlzLnBpcGVJdGVtUGxhY2UocikpKVxuICAvLyAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgIG1hcChub2RlcyA9PiBub2Rlcy5maWx0ZXIobm9kZSA9PiAhIW5vZGUgJiYgbm9kZS5ma0NsYXNzID09PSBsaXN0RGVmaW5pdGlvbi50YXJnZXRDbGFzcykpLFxuICAvLyAgICAgICAgICAgICBzdGFydFdpdGgoW10pKVxuICAvLyAgICAgICB9KSlcbiAgLy8gICB9XG4gIC8vIH1cblxuICAvLyAvKipcbiAgLy8gKiBQaXBlIHBsYWNlIGxpc3QgaW4gdGhlIHdheSBpdCBpcyBkZWZpbmVkIGJ5IHRoZSByZXBvc2l0b3J5XG4gIC8vICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZVJlcG9MaXN0RGltZW5zaW9uPFQ+KGxpc3REZWZpbml0aW9uOiBTdWJmaWVsZCwgcGtFbnRpdHkpOiBPYnNlcnZhYmxlPERpbWVuc2lvbkl0ZW1bXT4ge1xuXG4gIC8vICAgaWYgKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcpIHtcbiAgLy8gICAgIHJldHVybiB0aGlzLmIucGlwZVJlcG9PdXRnb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KS5waXBlKFxuICAvLyAgICAgICBzd2l0Y2hNYXAoKHN0YXRlbWVudHMpID0+IHtcbiAgLy8gICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbURpbWVuc2lvbihyKSkpXG4gIC8vICAgICAgICAgICAucGlwZShcbiAgLy8gICAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKSksXG4gIC8vICAgICAgICAgICAgIHN0YXJ0V2l0aChbXSkpXG4gIC8vICAgICAgIH0pKVxuICAvLyAgIH1cbiAgLy8gfVxuICAvLyAvKipcbiAgLy8gKiBQaXBlIHRoZSBpdGVtcyBpbiBlbnRpdHkgcHJldmlldyBmaWVsZCwgY29ubmVjdGVkIGJ5IGNvbW11bml0eSBmYXZvcml0ZSBzdGF0ZW1lbnRzXG4gIC8vICovXG4gIC8vIC8vIEBzcHlUYWdcbiAgLy8gcGlwZVJlcG9MaXN0RW50aXR5UHJldmlldzxUPihsaXN0RGVmaW5pdGlvbjogU3ViZmllbGQsIHBrRW50aXR5KTogT2JzZXJ2YWJsZTxFbnRpdHlQcmV2aWV3SXRlbVtdPiB7XG5cbiAgLy8gICByZXR1cm4gKGxpc3REZWZpbml0aW9uLmlzT3V0Z29pbmcgP1xuICAvLyAgICAgdGhpcy5iLnBpcGVSZXBvT3V0Z29pbmdTdGF0ZW1lbnRzQnlQcm9wZXJ0eShsaXN0RGVmaW5pdGlvbi5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBwa0VudGl0eSkgOlxuICAvLyAgICAgdGhpcy5iLnBpcGVSZXBvSW5nb2luZ1N0YXRlbWVudHNCeVByb3BlcnR5KGxpc3REZWZpbml0aW9uLnByb3BlcnR5LnBrUHJvcGVydHksIHBrRW50aXR5KVxuICAvLyAgICkucGlwZShcbiAgLy8gICAgIHN3aXRjaE1hcCgoc3RhdGVtZW50cykgPT4ge1xuICAvLyAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChzdGF0ZW1lbnRzLm1hcCgociwgaSkgPT4gdGhpcy5waXBlSXRlbUVudGl0eVByZXZpZXcociwgbGlzdERlZmluaXRpb24uaXNPdXRnb2luZykpKVxuICAvLyAgICAgICAgIC5waXBlKFxuICAvLyAgICAgICAgICAgbWFwKG5vZGVzID0+IG5vZGVzLmZpbHRlcihub2RlID0+ICEhbm9kZSAmJiBub2RlLmZrQ2xhc3MgPT09IGxpc3REZWZpbml0aW9uLnRhcmdldENsYXNzKVxuICAvLyAgICAgICAgICAgICAvLyAuc29ydCgoYSwgYikgPT4gYS5vcmROdW0gPiBiLm9yZE51bSA/IDEgOiAtMSlcbiAgLy8gICAgICAgICAgICkpXG4gIC8vICAgICB9KSxcbiAgLy8gICAgIHN0YXJ0V2l0aChbXSlcbiAgLy8gICApXG5cbiAgLy8gfVxuXG5cbiAgLy8gLyoqXG4gIC8vICAqIFBpcGUgcmVwbyB0aW1lIHNwYW4gaXRlbVxuICAvLyAgKi9cbiAgLy8gLy8gQHNweVRhZ1xuICAvLyBwaXBlUmVwb0l0ZW1UaW1lU3Bhbihwa0VudGl0eSk6IE9ic2VydmFibGU8VGltZVNwYW5JdGVtPiB7XG4gIC8vICAgcmV0dXJuIHRoaXMucC5wa1Byb2plY3QkLnBpcGUoXG4gIC8vICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHtcbiAgLy8gICAgICAgcmV0dXJuIHRoaXMuYy5waXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhcbiAgLy8gICAgICAgICBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOXG4gIC8vICAgICAgICkucGlwZShcbiAgLy8gICAgICAgICBzd2l0Y2hNYXAoZmllbGREZWZpbml0aW9ucyA9PiB7XG5cbiAgLy8gICAgICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KGZpZWxkRGVmaW5pdGlvbnMubWFwKGZpZWxkRGVmID0+XG4gIC8vICAgICAgICAgICAgIHRoaXMuYi5waXBlUmVwb091dGdvaW5nU3RhdGVtZW50c0J5UHJvcGVydHkoZmllbGREZWYucHJvcGVydHkucGtQcm9wZXJ0eSwgcGtFbnRpdHkpXG4gIC8vICAgICAgICAgICAgICAgLnBpcGUoXG4gIC8vICAgICAgICAgICAgICAgICBzd2l0Y2hNYXBPcihbXSwgc3RhdGVtZW50cyA9PiBjb21iaW5lTGF0ZXN0KFxuICAvLyAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzLm1hcChzdGF0ZW1lbnQgPT5cbiAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLmluZlJlcG8udGltZV9wcmltaXRpdmUkLmJ5X3BrX2VudGl0eSQua2V5KHN0YXRlbWVudC5ma19vYmplY3RfaW5mbylcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcCgoaW5mVGltZVByaW1pdGl2ZSkgPT4ge1xuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lUHJpbWl0aXZlID0gbmV3IFRpbWVQcmltaXRpdmUoe1xuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1bGlhbkRheTogaW5mVGltZVByaW1pdGl2ZS5qdWxpYW5fZGF5LFxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyOiAoKHN0YXRlbWVudC5jb21tdW5pdHlfZmF2b3JpdGVfY2FsZW5kYXIgfHwgJ2dyZWdvcmlhbicpIGFzIENhbGVuZGFyVHlwZSksXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IChpbmZUaW1lUHJpbWl0aXZlLmR1cmF0aW9uIGFzIEdyYW51bGFyaXR5KVxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtOiBUaW1lUHJpbWl0aXZlSXRlbSA9IHtcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnQsXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkTnVtOiB1bmRlZmluZWQsXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvalJlbDogdW5kZWZpbmVkLFxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVQcmltaXRpdmUsXG4gIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRoaXMudGltZVByaW1pdGl2ZVBpcGUudHJhbnNmb3JtKHRpbWVQcmltaXRpdmUpLFxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIGZrQ2xhc3M6IGluZlRpbWVQcmltaXRpdmUuZmtfY2xhc3NcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgLy8gICAgICAgICAgICAgICAgICAgICAgIH0pKVxuICAvLyAgICAgICAgICAgICAgICAgICApXG4gIC8vICAgICAgICAgICAgICAgICApKSxcbiAgLy8gICAgICAgICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG4gIC8vICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlczogVGltZVNwYW5Qcm9wZXJ0eSA9IHtcbiAgLy8gICAgICAgICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbjogZmllbGREZWYubGlzdERlZmluaXRpb25zWzBdLCBpdGVtc1xuICAvLyAgICAgICAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNcbiAgLy8gICAgICAgICAgICAgICAgIH0pLFxuICAvLyAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKHsgbGlzdERlZmluaXRpb246IGZpZWxkRGVmLmxpc3REZWZpbml0aW9uc1swXSwgaXRlbXM6IFtdIH0gYXMgVGltZVNwYW5Qcm9wZXJ0eSlcbiAgLy8gICAgICAgICAgICAgICApXG4gIC8vICAgICAgICAgICApKS5waXBlKFxuICAvLyAgICAgICAgICAgICBtYXAoKHByb3BlcnRpZXMpID0+IHtcbiAgLy8gICAgICAgICAgICAgICBjb25zdCB0aW1lc3Bhbml0ZW06IFRpbWVTcGFuSXRlbSA9IHtcbiAgLy8gICAgICAgICAgICAgICAgIGxhYmVsOiAnJyxcbiAgLy8gICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMuZmlsdGVyKHByb3BzID0+IHByb3BzLml0ZW1zLmxlbmd0aCA+IDApXG4gIC8vICAgICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgICAgIHJldHVybiB0aW1lc3Bhbml0ZW1cbiAgLy8gICAgICAgICAgICAgfSlcbiAgLy8gICAgICAgICAgIClcbiAgLy8gICAgICAgICB9KVxuICAvLyAgICAgICApXG4gIC8vICAgICB9KVxuXG4gIC8vICAgKVxuICAvLyB9XG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIGxhYmVsIG9mIGdpdmVuIGVudGl0eVxuICAgKiBUaGlzIHdpbGwgdXNlIGVudGl0eSBwcmV2aWV3cyBmb3IgZ2V0dGluZyBzdHJpbmdzIG9mIHJlbGF0ZWQgdGVtcG9yYWwgZW50aXRpZXNcbiAgICogU28gdGhpcyBtYXkgdGFrZSBhIGxpdHRsZSB3aGlsZVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBwaXBlTGFiZWxPZkVudGl0eShma0VudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcoZmtFbnRpdHkpLnBpcGUobWFwKHAgPT4gcC5lbnRpdHlfbGFiZWwpKVxuICAgIC8vIHJldHVybiB0aGlzLmIucGlwZUNsYXNzT2ZFbnRpdHkoZmtFbnRpdHkpLnBpcGUoXG5cbiAgICAvLyAgIC8vIGdldCB0aGUgZGVmaW5pdGlvbiBvZiB0aGUgZmlyc3QgZmllbGRcbiAgICAvLyAgIHN3aXRjaE1hcChma0NsYXNzID0+IHRoaXMuYy5waXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhma0NsYXNzKS5waXBlKFxuICAgIC8vICAgICAvLyBnZXQgdGhlIGZpcnN0IGl0ZW0gb2YgdGhhdCBmaWVsZFxuICAgIC8vICAgICBzd2l0Y2hNYXAoZmllbGRzID0+IHRoaXMucGlwZVN1YmZpZWxkUGFnZShmaWVsZFswXSwpLnBpcGUoXG4gICAgLy8gICAgICAgbWFwKHByb3BzID0+IHtcbiAgICAvLyAgICAgICAgIHByb3BzID0gcHJvcHMuZmlsdGVyKHByb3AgPT4gcHJvcC5pdGVtcy5sZW5ndGggPiAwKVxuICAgIC8vICAgICAgICAgaWYgKHByb3BzLmxlbmd0aCAmJiBwcm9wc1swXS5pdGVtcy5sZW5ndGgpIHtcbiAgICAvLyAgICAgICAgICAgcmV0dXJuIHByb3BzWzBdLml0ZW1zWzBdLmxhYmVsXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgICByZXR1cm4gJydcbiAgICAvLyAgICAgICB9KVxuICAgIC8vICAgICApKSlcbiAgICAvLyAgICkpXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgY2xhc3MgbGFiZWwgb2YgZ2l2ZW4gZW50aXR5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIHBpcGVDbGFzc0xhYmVsT2ZFbnRpdHkoZmtFbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuYi5waXBlQ2xhc3NPZkVudGl0eShma0VudGl0eSkucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa0NsYXNzID0+IHRoaXMuYy5waXBlQ2xhc3NMYWJlbChwa0NsYXNzKSlcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgdGhlIHBrX2VudGl0eSBvZiB0aGUgdHlwZSBvZiBhbiBlbnRpdHlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgcGlwZVR5cGVPZkVudGl0eShwa0VudGl0eTogbnVtYmVyLCBoYXNUeXBlUHJvcGVydHk6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8SW5mU3RhdGVtZW50PiB7XG4gICAgaWYgKGlzT3V0Z29pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5zdGF0ZW1lbnQkLmJ5X3N1YmplY3RfYW5kX3Byb3BlcnR5X2luZGV4ZWQkKHsgZmtfcHJvcGVydHk6IGhhc1R5cGVQcm9wZXJ0eSwgZmtfc3ViamVjdF9pbmZvOiBwa0VudGl0eSB9KS5waXBlKG1hcChpdGVtcyA9PiB7XG4gICAgICAgIGlmICghaXRlbXMgfHwgT2JqZWN0LmtleXMoaXRlbXMpLmxlbmd0aCA8IDEpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGVsc2UgcmV0dXJuIHZhbHVlcyhpdGVtcylbMF1cbiAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLnN0YXRlbWVudCQuYnlfb2JqZWN0X2FuZF9wcm9wZXJ0eV9pbmRleGVkJCh7IGZrX3Byb3BlcnR5OiBoYXNUeXBlUHJvcGVydHksIGZrX29iamVjdF9pbmZvOiBwa0VudGl0eSB9KS5waXBlKFxuICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAgICAgICAgIGlmICghaXRlbXMgfHwgT2JqZWN0LmtleXMoaXRlbXMpLmxlbmd0aCA8IDEpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgZWxzZSByZXR1cm4gdmFsdWVzKGl0ZW1zKVswXVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVDbGFzc2VzQW5kVHlwZXMoZW5hYmxlZEluOiAnZW50aXRpZXMnIHwgJ3NvdXJjZXMnKSB7XG4gICAgcmV0dXJuIHRoaXMuYy5waXBlVHlwZUFuZFR5cGVkQ2xhc3NlcyhlbmFibGVkSW4pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoaXRlbXMgPT4gdGhpcy5waXBlQ2xhc3NBbmRUeXBlTm9kZXMoaXRlbXMpKSxcbiAgICApXG4gIH1cblxuICBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlQ2xhc3Nlc0FuZFR5cGVzT2ZDbGFzc2VzKGNsYXNzZXM6IG51bWJlcltdKSB7XG4gICAgcmV0dXJuIHRoaXMuYy5waXBlVHlwZUFuZFR5cGVkQ2xhc3Nlc09mVHlwZWRDbGFzc2VzKGNsYXNzZXMpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoaXRlbXMgPT4gdGhpcy5waXBlQ2xhc3NBbmRUeXBlTm9kZXMoaXRlbXMpKSxcbiAgICApXG4gIH1cblxuICBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlQ2xhc3NBbmRUeXBlTm9kZXModHlwZUFuZFR5cGVkQ2xhc3NlczogeyB0eXBlZENsYXNzOiBudW1iZXI7IHR5cGVDbGFzczogbnVtYmVyOyB9W10pOiBPYnNlcnZhYmxlPENsYXNzQW5kVHlwZU5vZGVbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgIHR5cGVBbmRUeXBlZENsYXNzZXMubWFwKGl0ZW0gPT4gdGhpcy5jLnBpcGVDbGFzc0xhYmVsKGl0ZW0udHlwZWRDbGFzcykucGlwZShcbiAgICAgICAgbWFwKGxhYmVsID0+ICh7XG4gICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgZGF0YTogeyBwa0NsYXNzOiBpdGVtLnR5cGVkQ2xhc3MsIHBrVHlwZTogbnVsbCB9XG4gICAgICAgIH0gYXMgQ2xhc3NBbmRUeXBlTm9kZSkpLFxuICAgICAgICBzd2l0Y2hNYXAobm9kZSA9PiBpaWYoXG4gICAgICAgICAgKCkgPT4gISFpdGVtLnR5cGVDbGFzcyxcbiAgICAgICAgICB0aGlzLmIucGlwZVBlcnNpc3RlbnRJdGVtUGtzQnlDbGFzcyhpdGVtLnR5cGVDbGFzcykucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCh0eXBlUGtzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgICAgICAgICB0eXBlUGtzLm1hcChwa1R5cGUgPT4gdGhpcy5wLnN0cmVhbUVudGl0eVByZXZpZXcocGtUeXBlKS5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChwcmV2aWV3ID0+ICh7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogcHJldmlldy5lbnRpdHlfbGFiZWwsXG4gICAgICAgICAgICAgICAgICBkYXRhOiB7IHBrQ2xhc3M6IGl0ZW0udHlwZWRDbGFzcywgcGtUeXBlIH1cbiAgICAgICAgICAgICAgICB9IGFzIENsYXNzQW5kVHlwZU5vZGUpKVxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgKS5waXBlKFxuICAgICAgICAgICAgICBzb3J0QWJjKG4gPT4gbi5sYWJlbCksXG4gICAgICAgICAgICApKSxcbiAgICAgICAgICAgIG1hcChjaGlsZHJlbiA9PiB7XG4gICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4gPSBjaGlsZHJlblxuICAgICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApLFxuICAgICAgICAgIG9mKHsgLi4ubm9kZSwgY2hpbGRyZW46IFtdIH0gYXMgQ2xhc3NBbmRUeXBlTm9kZSlcbiAgICAgICAgKVxuICAgICAgICApXG4gICAgICApKVxuICAgICkucGlwZShcbiAgICAgIHNvcnRBYmMoKG5vZGUpID0+IG5vZGUubGFiZWwpLFxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGFycmF5IG9mIHBrX2NsYXNzIG9mIGFsbCBjbGFzc2VzIGFuZCB0eXBlZCBjbGFzc2VzLlxuICAgKiBAcGFyYW0gY2xhc3Nlc0FuZFR5cGVzIGEgb2JqZWN0IGNvbnRhaW5pbmcge2NsYXNzZXM6IFtdLCB0eXBlc1tdfVxuICAgKi9cbiAgcGlwZUNsYXNzZXNGcm9tQ2xhc3Nlc0FuZFR5cGVzKGNsYXNzZXNBbmRUeXBlczogQ2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgY29uc3QgdHlwZWRDbGFzc2VzJCA9ICghY2xhc3Nlc0FuZFR5cGVzIHx8ICFjbGFzc2VzQW5kVHlwZXMudHlwZXMgfHwgIWNsYXNzZXNBbmRUeXBlcy50eXBlcy5sZW5ndGgpID9cbiAgICAgIG9mKFtdIGFzIG51bWJlcltdKSA6XG4gICAgICB0aGlzLmIucGlwZUNsYXNzZXNPZlBlcnNpc3RlbnRJdGVtcyhjbGFzc2VzQW5kVHlwZXMudHlwZXMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigocGtzKSA9PiAhIXBrcyksXG4gICAgICAgICAgc3dpdGNoTWFwKHR5cGVDbGFzc2VzID0+IHRoaXMuYy5waXBlVHlwZWRDbGFzc2VzT2ZUeXBlQ2xhc3Nlcyh0eXBlQ2xhc3NlcykpXG4gICAgICAgIClcbiAgICByZXR1cm4gdHlwZWRDbGFzc2VzJC5waXBlKFxuICAgICAgbWFwKHR5cGVkQ2xhc3NlcyA9PiB1bmlxKFsuLi50eXBlZENsYXNzZXMsIC4uLigoY2xhc3Nlc0FuZFR5cGVzIHx8IHsgY2xhc3NlczogW10gfSkuY2xhc3NlcyB8fCBbXSldKSlcbiAgICApO1xuICB9XG5cbiAgcGlwZVByb3BlcnR5T3B0aW9uc0Zyb21DbGFzc2VzQW5kVHlwZXMoY2xhc3Nlc0FuZFR5cGVzOiBDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbCk6IE9ic2VydmFibGU8UHJvcGVydHlPcHRpb25bXT4ge1xuICAgIHJldHVybiB0aGlzLnBpcGVDbGFzc2VzRnJvbUNsYXNzZXNBbmRUeXBlcyhjbGFzc2VzQW5kVHlwZXMpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoY2xhc3NlcyA9PiB0aGlzLnBpcGVQcm9wZXJ0eU9wdGlvbnNGb3JtQ2xhc3NlcyhjbGFzc2VzKSlcbiAgICApXG4gIH1cblxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZVByb3BlcnR5T3B0aW9uc0Zvcm1DbGFzc2VzKGNsYXNzZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTxQcm9wZXJ0eU9wdGlvbltdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KGNsYXNzZXMubWFwKHBrQ2xhc3MgPT4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcykucGlwZShcbiAgICAgIG1hcChjID0+IGMuYmFzaWNfdHlwZSA9PT0gOSksXG4gICAgICBzd2l0Y2hNYXAoaXNUZUVuID0+IHRoaXMuYy5waXBlU3BlY2lmaWNBbmRCYXNpY0ZpZWxkcyhwa0NsYXNzKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoY2xhc3NGaWVsZHMgPT4gY2xhc3NGaWVsZHNcbiAgICAgICAgICAgIC5maWx0ZXIoZiA9PiAhIWYucHJvcGVydHkucGtQcm9wZXJ0eSlcbiAgICAgICAgICAgIC5tYXAoZiA9PiAoe1xuICAgICAgICAgICAgICBpc091dGdvaW5nOiBmLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgIGZrUHJvcGVydHlEb21haW46IGYuaXNPdXRnb2luZyA/IGYuc291cmNlQ2xhc3MgOiBudWxsLFxuICAgICAgICAgICAgICBma1Byb3BlcnR5UmFuZ2U6IGYuaXNPdXRnb2luZyA/IG51bGwgOiBmLnNvdXJjZUNsYXNzLFxuICAgICAgICAgICAgICBwa1Byb3BlcnR5OiBmLnByb3BlcnR5LnBrUHJvcGVydHlcbiAgICAgICAgICAgIH0pKSksXG4gICAgICAgICAgc3dpdGNoTWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgIGlmIChpc1RlRW4pIHtcbiAgICAgICAgICAgICAgLy8gYWRkIHRpbWUgcHJvcGVydGllcyAoYXQgc29tZSB0aW1lIHdpdGhpbiwgLi4uKVxuICAgICAgICAgICAgICBEZmhDb25maWcuUFJPUEVSVFlfUEtTX1dIRVJFX1RJTUVfUFJJTUlUSVZFX0lTX1JBTkdFLm1hcChwa1Byb3BlcnR5ID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHBrUHJvcGVydHksXG4gICAgICAgICAgICAgICAgICBma1Byb3BlcnR5RG9tYWluOiBwa0NsYXNzLFxuICAgICAgICAgICAgICAgICAgZmtQcm9wZXJ0eVJhbmdlOiBEZmhDb25maWcuQ0xBU1NfUEtfVElNRV9QUklNSVRJVkUsXG4gICAgICAgICAgICAgICAgICBpc091dGdvaW5nOiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KGl0ZW1zLm1hcChpdGVtID0+IHRoaXMuYy5waXBlRmllbGRMYWJlbChcbiAgICAgICAgICAgICAgaXRlbS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICBpdGVtLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgICAgICAgIGl0ZW0uZmtQcm9wZXJ0eVJhbmdlLFxuICAgICAgICAgICAgKS5waXBlKG1hcChsYWJlbCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzT3V0Z29pbmcgPSBpdGVtLmlzT3V0Z29pbmc7XG4gICAgICAgICAgICAgIGNvbnN0IG86IFByb3BlcnR5T3B0aW9uID0ge1xuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICAgICAgcGs6IGl0ZW0ucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUZpZWxkS2V5OiBwcm9wZXJ0eU9wdGlvbkZpZWxkS2V5KGl0ZW0ucGtQcm9wZXJ0eSwgaXNPdXRnb2luZylcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgICB9KSkpKTtcbiAgICAgICAgICB9KSkpXG4gICAgKVxuXG5cbiAgICApKS5waXBlKG1hcCh5ID0+IGZsYXR0ZW48UHJvcGVydHlPcHRpb24+KHkpKSk7XG4gIH1cblxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZVBrQ2xhc3Nlc0Zyb21Qcm9wZXJ0eVNlbGVjdE1vZGVsKG1vZGVsOiBQcm9wZXJ0eVNlbGVjdE1vZGVsKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgIFtcbiAgICAgICAgdGhpcy5jLnBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKG1vZGVsLm91dGdvaW5nUHJvcGVydGllcywgdHJ1ZSksXG4gICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5pbmdvaW5nUHJvcGVydGllcywgZmFsc2UpLFxuICAgICAgXVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW291dCwgaW5nXSkgPT4gdW5pcShbLi4ub3V0LCAuLi5pbmddKSlcbiAgICApXG4gIH1cblxuICBnZXRQa0NsYXNzZXNGcm9tUHJvcGVydHlTZWxlY3RNb2RlbCQobW9kZWwkOiBPYnNlcnZhYmxlPFByb3BlcnR5U2VsZWN0TW9kZWw+KTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiBtb2RlbCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChtb2RlbCA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgICAgW1xuICAgICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5vdXRnb2luZ1Byb3BlcnRpZXMsIHRydWUpLFxuICAgICAgICAgIHRoaXMuYy5waXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhtb2RlbC5pbmdvaW5nUHJvcGVydGllcywgZmFsc2UpLFxuICAgICAgICBdXG4gICAgICApLnBpcGUoXG4gICAgICAgIG1hcCgoW291dCwgaW5nXSkgPT4gdW5pcShbLi4ub3V0LCAuLi5pbmddKSlcbiAgICAgICkpXG4gICAgKVxuICB9XG5cblxuXG4gIGdldFByb3BlcnR5T3B0aW9ucyQoY2xhc3NUeXBlcyQ6IE9ic2VydmFibGU8Q2xhc3NBbmRUeXBlU2VsZWN0TW9kZWw+KTogT2JzZXJ2YWJsZTxQcm9wZXJ0eU9wdGlvbltdPiB7XG4gICAgcmV0dXJuIGNsYXNzVHlwZXMkLnBpcGU8Q2xhc3NBbmRUeXBlU2VsZWN0TW9kZWwsIFByb3BlcnR5T3B0aW9uW10+KFxuICAgICAgLy8gbWFrZSBzdXJlIG9ubHkgaXQgcGFzc2VzIG9ubHkgaWYgZGF0YSBvZiB0aGUgYXJyYXlDbGFzc2VzIGFyZSBjaGFuZ2VkIChub3QgY2hpbGRyZW4pXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZDxDbGFzc0FuZFR5cGVTZWxlY3RNb2RlbD4oKGEsIGIpID0+IHtcbiAgICAgICAgcmV0dXJuIGVxdWFscyhhLCBiKTtcbiAgICAgIH0pLFxuICAgICAgc3dpdGNoTWFwKCh4KSA9PiAheCA/IGVtcHR5KCkgOiB0aGlzLmIucGlwZUNsYXNzZXNPZlBlcnNpc3RlbnRJdGVtcyh4LnR5cGVzKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKHBrcykgPT4gISFwa3MpLFxuICAgICAgICAgIHN3aXRjaE1hcCh0eXBlQ2xhc3NlcyA9PiB0aGlzLmMucGlwZVR5cGVkQ2xhc3Nlc09mVHlwZUNsYXNzZXModHlwZUNsYXNzZXMpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAodHlwZWRDbGFzc2VzID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IHVuaXEoWy4uLnR5cGVkQ2xhc3NlcywgLi4uKHguY2xhc3NlcyB8fCBbXSldKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlwZVByb3BlcnR5T3B0aW9uc0Zvcm1DbGFzc2VzKGNsYXNzZXMpXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnR5T3B0aW9uRmllbGRLZXkoZmtQcm9wZXJ0eTogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogc3RyaW5nIHtcbiAgcmV0dXJuICdfJyArIGZrUHJvcGVydHkgKyAnXycgKyAoaXNPdXRnb2luZyA/ICdvdXRnb2luZycgOiAnaW5nb2luZycpO1xufVxuXG4iXX0=