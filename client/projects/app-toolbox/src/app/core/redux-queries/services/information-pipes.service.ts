
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { limitTo, sortAbc, switchMapOr } from 'projects/app-toolbox/src/app/core';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project";
import { TimePrimitive } from '@kleiolab/lib-utils';
import { InfTextProperty } from '@kleiolab/lib-sdk-lb3';
import { InfStatement } from '@kleiolab/lib-sdk-lb3';
import { TimeSpan } from "@kleiolab/lib-utils";
import { U } from "projects/app-toolbox/src/app/core/util/util";
import { Granularity } from "@kleiolab/lib-utils";
import { CalendarType } from "@kleiolab/lib-utils";
import { InfModelName } from 'projects/app-toolbox/src/app/core/inf/inf.service';
import { InfSelector } from 'projects/app-toolbox/src/app/core/inf/inf.service';
import { DfhConfig } from 'projects/app-toolbox/src/app/modules/information/shared/dfh-config';
import { ClassAndTypeSelectModel } from 'projects/app-toolbox/src/app/modules/queries/components/class-and-type-select/class-and-type-select.component';
import { PropertyOption, PropertySelectModel } from 'projects/app-toolbox/src/app/modules/queries/components/property-select/property-select.component';
import { cache, spyTag } from 'projects/app-toolbox/src/app/shared';
import { TimePrimitivePipe } from 'projects/app-toolbox/src/app/shared/pipes/time-primitive/time-primitive.pipe';
import { equals, flatten, groupBy, omit, pick, uniq, values } from 'ramda';
import { BehaviorSubject, combineLatest, empty, iif, Observable, of } from 'rxjs';
import { tag } from 'rxjs-spy/operators';
import { distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ConfigurationPipesService } from 'projects/app-toolbox/src/app/core/redux-queries/services/configuration-pipes.service';
import { PaginateByParam } from 'projects/app-toolbox/src/app/core/redux-store/actions';
import { combineLatestOrEmpty } from 'projects/app-toolbox/src/app/core/util/combineLatestOrEmpty';
import { ClassAndTypeNode } from '../../../modules/base/components/classes-and-types-select/classes-and-types-select.component';
import { CtrlTimeSpanDialogResult } from '../../../modules/base/components/ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { AppellationItem, BasicStatementItem, DimensionItem, EntityPreviewItem, EntityProperties, Field, ItemList, LangStringItem, LanguageItem, PlaceItem, StatementItem, Subfield, TemporalEntityCell, TemporalEntityItem, TemporalEntityRemoveProperties, TemporalEntityRow, TextPropertyItem, TimePrimitiveItem, TimeSpanItem, TimeSpanProperty } from '../../../modules/base/components/properties-tree/properties-tree.models';
import { InformationBasicPipesService } from './information-basic-pipes.service';
import { IAppState } from 'projects/app-toolbox/src/app/core/redux-store/model';
import { ActiveProjectPipesService } from './active-project-pipes.service';
import { SchemaSelectorsService } from './schema-selectors.service';
import { TimeSpanPipe } from '../../../shared/pipes/time-span/time-span.pipe';

@Injectable()
/**
 * This Service provides a collecion of pipes that aggregate or transform information.
 * For Example
 * - the lists of text properties, appellaitons, places, time-primitives / time-spans etc.
 * - the label of temporal entity or persistent item
 *
 * This mainly selects data from the information schema and the relation to projects.
 * It combines pipes selecting data from the
 * - activated project
 * - alternatives (not in project but in others)
 * - repo
 *
 */
export class InformationPipesService {

  infRepo: InfSelector;

  constructor(
    private b: InformationBasicPipesService,
    private p: ActiveProjectPipesService,
    private s: SchemaSelectorsService,
    private c: ConfigurationPipesService,
    public timePrimitivePipe: TimePrimitivePipe,
    private timeSpanPipe: TimeSpanPipe,
    ngRedux: NgRedux<IAppState>
  ) {
    this.infRepo = new InfSelector(ngRedux, of('repo'))
  }


  /*********************************************************************
   * Pipe the project entities
   *********************************************************************/

  @spyTag pipeListLength(l: Subfield, pkEntity: number): Observable<number> {
    switch (l.listType) {
      case 'appellation':
      case 'entity-preview':
      case 'language':
      case 'place':
      case 'dimension':
      case 'langString':
      case 'temporal-entity':
        return this.pipeList(l, pkEntity).pipe(map(items => items.length))

      case 'time-span':
        return combineLatest(
          this.b.pipeOutgoingStatementsByProperty(72, pkEntity),
          this.b.pipeOutgoingStatementsByProperty(71, pkEntity),
          this.b.pipeOutgoingStatementsByProperty(150, pkEntity),
          this.b.pipeOutgoingStatementsByProperty(151, pkEntity),
          this.b.pipeOutgoingStatementsByProperty(152, pkEntity),
          this.b.pipeOutgoingStatementsByProperty(153, pkEntity)
        ).pipe(
          tap((x) => {

          }),
          map(items => items.filter(x => x.length > 0).length))

      // case 'text-property':
      //   return this.pipeListTextProperty(l, pkEntity).pipe(map(items => items.length))

      default:
        console.warn('unsupported listType')
        return new BehaviorSubject(0);
    }
  }

  @spyTag pipeList(l: Subfield, pkEntity, limit?: number): Observable<ItemList> {
    if (l.listType.appellation) return this.pipeListAppellation(l, pkEntity, limit)
    else if (l.listType.entityPreview) return this.pipeListEntityPreview(l, pkEntity, limit)
    else if (l.listType.language) return this.pipeListLanguage(l, pkEntity, limit)
    else if (l.listType.place) return this.pipeListPlace(l, pkEntity, limit)
    else if (l.listType.dimension) return this.pipeListDimension(l, pkEntity, limit)
    else if (l.listType.langString) return this.pipeListLangString(l, pkEntity, limit)
    else if (l.listType.temporalEntity) return this.pipeListEntityPreview(l, pkEntity, limit)
    else if (l.listType.timeSpan) {
      return this.pipeItemTimeSpan(pkEntity).pipe(
        map((ts) => [ts].filter(i => i.properties.length > 0))
      )
    }
    else console.warn('unsupported listType')
  }

  @spyTag pipeListBasicStatementItems(listDefinition: Subfield, pkEntity: number, pkProject: number): Observable<BasicStatementItem[]> {
    return (listDefinition.isOutgoing ?
      this.b.pipeOutgoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject) :
      this.b.pipeIngoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject)
    )
  }

  /**
   * Pipe the items in appellation field
   */
  @spyTag pipeListAppellation<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<AppellationItem[]> {
    return this.b.pipeStatementsOfList(listDefinition, pkEntity)
      .pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemAppellation(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              limitTo(limit),
              startWith([]))
        }))
  }

  /**
 * Pipe the items in entity preview field
 */
  @spyTag pipeListEntityPreview<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<EntityPreviewItem[]> {

    return this.b.pipeStatementsOfList(listDefinition, pkEntity)
      .pipe(
        tag(`before-${pkEntity}-${listDefinition.property.pkProperty}-${listDefinition.targetClass}`),
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)
                .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1),
                limitTo(limit),
              ),
              startWith([])
            )
        }),
        tag(`after-${pkEntity}-${listDefinition.property.pkProperty}-${listDefinition.targetClass}`),
      )

  }


  @spyTag pipeListLanguage<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<LanguageItem[]> {

    return this.b.pipeStatementsOfList(listDefinition, pkEntity)
      .pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemLanguage(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              limitTo(limit),
              startWith([]))
        }))
  }

  /**
   * Pipe the items in place list
   */
  @spyTag pipeListPlace<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<PlaceItem[]> {

    return this.b.pipeStatementsOfList(listDefinition, pkEntity)
      .pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemPlace(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              limitTo(limit),
              startWith([]))
        }))
  }

  /**
   * Pipe the items in place list
   */
  @spyTag pipeListDimension<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<DimensionItem[]> {

    return this.b.pipeStatementsOfList(listDefinition, pkEntity)
      .pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemDimension(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              limitTo(limit),
              startWith([]))
        }))
  }

  /**
 * Pipe the items in langString list
 */
  @spyTag pipeListLangString<T>(listDefinition: Subfield, pkEntity: number, limit?: number): Observable<LangStringItem[]> {

    return this.b.pipeStatementsOfList(listDefinition, pkEntity)
      .pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemLangString(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              limitTo(limit),
              startWith([]))
        }))

  }


  pipeStatementListPage(
    paginateBy: PaginateByParam[],
    limit: number,
    offset: number,
    pkProject: number,
    listDefinition: Subfield,
    alternative = false): Observable<EntityPreviewItem[]> {

    // prepare page loader
    const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;

    // prepare basic statement item loader
    const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
      return alternative ?
        this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
        this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    }

    const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)

    return paginatedStatementPks$.pipe(
      switchMap((paginatedStatementPks) => combineLatestOrEmpty(
        paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
          .pipe(
            filter(x => !!x),
            switchMap(x => this.p.streamEntityPreview(x.isOutgoing ? x.statement.fk_object_info : x.statement.fk_subject_info)
              .pipe(
                map((preview) => {
                  const item: EntityPreviewItem = {
                    ...x,
                    preview,
                    fkClass: preview.fk_class
                  }
                  return item;
                })
              )
            ))

        )
      )
      ))

  }


  /**
   * Pipe the temporal entities connected to given entity by statements that are in the current project
   */
  @spyTag pipeTemporalEntityTableRows(
    paginateBy: PaginateByParam[],
    limit: number,
    offset: number,
    pkProject: number,
    listDefinition: Subfield,
    fieldDefinitions: Field[],
    alternative = false): Observable<TemporalEntityItem[]> {

    // const propertyItemType = this.propertyItemType(fieldDefinitions)

    const targetEntityOfStatementItem = (r: BasicStatementItem) => r.isOutgoing ? r.statement.fk_object_info : r.statement.fk_subject_info;

    // prepare page loader
    const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.s.inf$.statement$.pagination$;

    // prepare basic statement item loader
    const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
      return alternative ?
        this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
        this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    }

    // prepare TeEnRow loader
    const rowLoader = (targetEntityPk, fieldDef, pkProj) => {
      return alternative ?
        this.pipeItemTeEnRow(targetEntityPk, fieldDef, null, true) :
        this.pipeItemTeEnRow(targetEntityPk, fieldDef, pkProj, false)
    }

    const paginatedStatementPks$ = pageLoader$.pipePage(paginateBy, limit, offset)

    const rows$ = paginatedStatementPks$.pipe(
      switchMap((paginatedStatementPks) => combineLatestOrEmpty(
        paginatedStatementPks.map(pkStatement => basicStatementItemLoader(pkStatement, listDefinition.isOutgoing, pkProject)
          .pipe(filter(x => !!x))
        )
      )
        .pipe(
          switchMap((teEnStatement) => combineLatestOrEmpty(
            teEnStatement.map((basicStatementItem) => {
              const pkTeEn = targetEntityOfStatementItem(basicStatementItem);
              return combineLatest(
                rowLoader(
                  pkTeEn,
                  fieldDefinitions,
                  // propertyItemType,
                  pkProject
                ),
                this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + pkTeEn)
              ).pipe(
                map(([row, teEnProjRel]) => {
                  const item: TemporalEntityItem = {
                    ...basicStatementItem,
                    row,
                    pkEntity: pkTeEn,
                    teEnProjRel
                  };
                  return item
                })
              )
            })
          )),
        )),

    )
    return rows$
  }



  @spyTag pipeItemTeEnRow(pkEntity: number, fieldDefinitions: Field[], pkProject: number, repo: boolean): Observable<TemporalEntityRow> {

    // pipe outgoing statements
    const outgoingStatements$ = repo ? this.b.pipeRepoOutgoingStatements(pkEntity) : this.b.pipeOutgoingStatements(pkEntity);
    // pipe ingoing statements
    const ingoingStatements$ = repo ? this.b.pipeRepoIngoingStatements(pkEntity) : this.b.pipeIngoingStatements(pkEntity);


    // pipe all statements with information leaf items

    const outgoingItems$: Observable<StatementItem[]> = outgoingStatements$.pipe(
      switchMap(statements => combineLatestOrEmpty(
        statements
          .filter(statement => !!statement.fk_object_info) // remove statements not pointing to information
          .map(s => {
            const isOutgoing = true;
            return this.pipeItem(s, pkProject, isOutgoing);
          })
      ))

    )
    const ingoingItems$: Observable<StatementItem[]> = ingoingStatements$.pipe(
      switchMap(statements => combineLatestOrEmpty(
        statements
          .filter(statement => !!statement.fk_subject_info) // remove statements not pointing to information
          .map(s => {
            const isOutgoing = false;
            return this.pipeItem(s, pkProject, isOutgoing);
          })
      ))

    )

    const sortItems = repo ?
      (item: StatementItem[]) => item.sort((a, b) => a.statement.is_in_project_count > b.statement.is_in_project_count ? 1 : -1) :
      (item: StatementItem[]) => item;


    return combineLatest(outgoingItems$, ingoingItems$).pipe(

      map(([outgoingItems, ingoingItems]) => {
        const groupedOut = groupBy((i) => (i && i.statement ? i.statement.fk_property.toString() : undefined), outgoingItems);
        const groupedIn = groupBy((i) => (i && i.statement ? i.statement.fk_property.toString() : undefined), ingoingItems);
        return { groupedOut, groupedIn }
      }),
      // auditTime(10),
      map((d) => {
        const row: TemporalEntityRow = {}

        fieldDefinitions.forEach(fieldDefinition => {

          let cell: TemporalEntityCell;
          fieldDefinition.listDefinitions.forEach(listDefinition => {
            if (listDefinition.listType.timeSpan) {

              const t = pick(['71', '72', '150', '151', '152', '153'], d.groupedOut);
              const keys = Object.keys(t);
              const itemsCount = keys.length;

              let label;
              if (itemsCount > 0) {
                const timeSpanKeys: CtrlTimeSpanDialogResult = {}
                keys.forEach(key => { timeSpanKeys[key] = t[key][0].timePrimitive })
                const timeSpan = TimeSpan.fromTimeSpanDialogData(timeSpanKeys);
                label = this.timeSpanPipe.transform(timeSpan);
              }
              cell = {
                isOutgoing: listDefinition.isOutgoing,
                itemsCount,
                label,
                entityPreview: undefined,
                pkProperty: undefined,
                isTimeSpan: true
              }
            }
            else {
              if (listDefinition.isOutgoing) {
                if (d.groupedOut[listDefinition.property.pkProperty]) {
                  const items = sortItems(d.groupedOut[listDefinition.property.pkProperty])
                  const firstItem = items[0];
                  cell = {
                    isOutgoing: listDefinition.isOutgoing,
                    itemsCount: items.length,
                    entityPreview: ((firstItem || {}) as EntityPreviewItem).preview,
                    label: firstItem.label,
                    pkProperty: listDefinition.property.pkProperty,
                    firstItem,
                    items
                  }
                }
              } else {
                if (d.groupedIn[listDefinition.property.pkProperty]) {
                  const items = sortItems(d.groupedIn[listDefinition.property.pkProperty])
                  const firstItem = items[0];
                  cell = {
                    isOutgoing: listDefinition.isOutgoing,
                    itemsCount: items.length,
                    entityPreview: ((firstItem || {}) as EntityPreviewItem).preview,
                    label: firstItem.label,
                    pkProperty: listDefinition.property.pkProperty,
                    firstItem,
                    items
                  }
                }
              }
            }

          })


          row[fieldDefinition.label] = cell;
        })
        return row
      })


    )
  }



  @spyTag private pipeItem(r: InfStatement, pkProject: number, propIsOutgoing: boolean) {

    const targetEntity = propIsOutgoing ? r.fk_object_info : r.fk_subject_info;
    return this.s.inf$.getModelOfEntity$(targetEntity).pipe(
      switchMap(m => {
        const modelName: InfModelName = m ? m.modelName : undefined;
        switch (modelName) {
          case 'appellation':
            return this.pipeItemAppellation(r);
          case 'language':
            return this.pipeItemLanguage(r);
          case 'place':
            return this.pipeItemPlace(r);
          case 'dimension':
            return this.pipeItemDimension(r);
          case 'lang_string':
            return this.pipeItemLangString(r);
          case 'time_primitive':
            return this.pipeItemTimePrimitive(r, pkProject); // TODO: emits twice
          default:
            return this.pipeItemEntityPreview(r, propIsOutgoing);
            break;
        }


      })
    )


  }


  @spyTag pipeEntityProperties(listDef: Subfield, fkEntity: number, limit?: number): Observable<EntityProperties> {

    if (listDef.listType.appellation) {
      return this.pipeListAppellation(listDef, fkEntity, limit)
        .pipe(map((items) => this.getEntityProperties(listDef, items)))
    }
    else if (listDef.listType.language) {
      return this.pipeListLanguage(listDef, fkEntity, limit)
        .pipe(map((items) => this.getEntityProperties(listDef, items)))
    }
    else if (listDef.listType.place) {
      return this.pipeListPlace(listDef, fkEntity, limit)
        .pipe(map((items) => this.getEntityProperties(listDef, items)))
    }
    else if (listDef.listType.dimension) {
      return this.pipeListDimension(listDef, fkEntity, limit)
        .pipe(map((items) => this.getEntityProperties(listDef, items)))
    }
    else if (listDef.listType.langString) {
      return this.pipeListLangString(listDef, fkEntity, limit)
        .pipe(map((items) => this.getEntityProperties(listDef, items)))
    }


    else if (listDef.listType.entityPreview || listDef.listType.temporalEntity) {
      return this.pipeListEntityPreview(listDef, fkEntity, limit)
        .pipe(map((items) => this.getEntityProperties(listDef, items)))
    }
    else if (listDef.listType.timeSpan) {
      return this.pipeItemTimeSpan(fkEntity)
        .pipe(map((item) => {
          const items = item.properties.find(p => p.items.length > 0) ? [{
            label: this.timeSpanPipe.transform(U.timeSpanItemToTimeSpan(item)),
            properties: [] // TODO check if the properties or the item are really not needed
          }] : []
          return {
            listDefinition: listDef,
            items
          }
        }))
    }
    else return of(null)
  }

  @spyTag pipeTemporalEntityRemoveProperties(pkEntity: number): Observable<TemporalEntityRemoveProperties> {
    return combineLatest(
      this.s.inf$.temporal_entity$.by_pk_entity_key$(pkEntity),
      this.s.inf$.statement$.by_subject$({ fk_subject_info: pkEntity }),
      this.s.inf$.text_property$.by_fk_concerned_entity_indexed$(pkEntity)
    ).pipe(
      map(([temporalEntity, statements, textProperties]) => {
        const res: TemporalEntityRemoveProperties = {
          temporalEntity,
          statements: statements,
          textProperties: values(textProperties)
        }
        return res
      })
    )
  }

  getEntityProperties(listDefinition: Subfield, items): EntityProperties {
    return {
      listDefinition,
      items,
    }
  }

  /**
   * Pipe time span item in version of project
   */
  @spyTag pipeItemTimeSpan(pkEntity): Observable<TimeSpanItem> {

    return this.p.pkProject$.pipe(
      switchMap(pkProject => {
        return this.c.pipeSpecificFieldOfClass(
          DfhConfig.ClASS_PK_TIME_SPAN
        ).pipe(
          switchMap(fieldDefs => {
            return combineLatest(fieldDefs.map(fieldDef => this.s.inf$.statement$.by_subject_and_property$({
              fk_property: fieldDef.property.pkProperty,
              fk_subject_info: pkEntity
            })
              .pipe(
                switchMapOr([], statements => combineLatest(
                  statements.map(statement => combineLatest(
                    this.s.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter(x => !!x)),
                    this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity)
                  ).pipe(map(([infTimePrimitive, projRel]) => {
                    const timePrimitive = new TimePrimitive({
                      julianDay: infTimePrimitive.julian_day,
                      calendar: ((projRel.calendar || 'gregorian') as CalendarType),
                      duration: (infTimePrimitive.duration as Granularity)
                    })
                    const item: TimePrimitiveItem = {
                      statement,
                      ordNum: undefined,
                      projRel,
                      timePrimitive,
                      label: this.timePrimitivePipe.transform(timePrimitive),
                      fkClass: infTimePrimitive.fk_class
                    }
                    return item;
                  }))
                  )
                )),
                map(items => {
                  const res: TimeSpanProperty = {
                    listDefinition: fieldDef.listDefinitions[0], items
                  }
                  return res
                })
              )
            )).pipe(
              map((properties) => {
                const props = properties.filter(p => p.items.length > 0);
                const timespanitem: TimeSpanItem = {
                  label: '',
                  properties: props
                }
                return timespanitem
              })
            )
          })
        )
      })

    )
  }

  @spyTag pipeItemAppellation(statement: InfStatement): Observable<AppellationItem> {
    return this.s.inf$.appellation$.by_pk_entity$.key(statement.fk_object_info).pipe(
      filter(x => !!x),
      map(appellation => {
        if (!appellation) return null;
        const node: AppellationItem = {
          ordNum: undefined,
          projRel: undefined,
          statement,
          label: appellation.string,
          fkClass: appellation.fk_class
        }
        return node
      }))
  }

  @spyTag pipeItemLanguage(statement: InfStatement): Observable<LanguageItem> {
    return this.s.inf$.language$.by_pk_entity$.key(statement.fk_object_info).pipe(
      filter(x => !!x),
      map(language => {
        if (!language) return null;
        const node: LanguageItem = {
          ordNum: undefined,
          projRel: undefined,
          statement,
          label: language.notes,
          fkClass: language.fk_class
        }
        return node
      }))
  }

  @spyTag pipeItemPlace(statement: InfStatement): Observable<PlaceItem> {
    return this.s.inf$.place$.by_pk_entity$.key(statement.fk_object_info).pipe(
      filter(x => !!x),
      map(place => {
        if (!place) return null;
        const node: PlaceItem = {
          ordNum: undefined,
          projRel: undefined,
          statement,
          label: 'WGS84: ' + place.lat + '°, ' + place.long + '°',
          fkClass: place.fk_class
        }
        return node
      }))
  }

  @spyTag pipeItemDimension(statement: InfStatement): Observable<DimensionItem> {
    return this.s.inf$.dimension$.by_pk_entity$.key(statement.fk_object_info).pipe(
      filter(x => !!x),
      switchMap((dimension) => {
        return this.p.streamEntityPreview(dimension.fk_measurement_unit)
          .pipe(
            map(preview => {

              const node: DimensionItem = {
                ordNum: undefined,
                projRel: undefined,
                statement,
                label: `${dimension.numeric_value} ${preview.entity_label}`,
                fkClass: dimension.fk_class,
              }
              return node
            })
          )
      })
    )
  }


  @spyTag pipeItemLangString(statement: InfStatement): Observable<LangStringItem> {
    return this.s.inf$.lang_string$.by_pk_entity$.key(statement.fk_object_info).pipe(
      switchMap(
        (langString) => {
          if (!langString) return new BehaviorSubject(null)
          return this.s.inf$.language$.by_pk_entity$.key(langString.fk_language)
            .pipe(
              map(language => {
                if (!language) return null;
                let label = '';
                if (langString.string) label = langString.string
                else if (langString.quill_doc && langString.quill_doc.ops && langString.quill_doc.ops.length) {
                  label = langString.quill_doc.ops.map(op => op.insert).join('');
                }
                const node: LangStringItem = {
                  ordNum: undefined,
                  projRel: undefined,
                  statement,
                  label,
                  fkClass: langString.fk_class,
                  language,
                  fkLanguage: langString.fk_language
                }
                return node
              })
            )
        })
    )
  }


  @spyTag pipeItemEntityPreview(statement: InfStatement, isOutgoing: boolean): Observable<EntityPreviewItem> {
    return this.p.streamEntityPreview((isOutgoing ? statement.fk_object_info : statement.fk_subject_info)).pipe(
      // filter(preview => !preview.loading && !!preview && !!preview.entity_type),
      map(preview => {
        if (!preview) {
          return null;
        }
        const node: EntityPreviewItem = {
          ordNum: undefined,
          projRel: undefined,
          statement,
          preview,
          label: preview.entity_label || '',
          fkClass: preview.fk_class
        }
        return node
      }))
  }

  /**
   * @param pk
   */
  @spyTag pipeItemTimePrimitive(statement: InfStatement, pkProject): Observable<TimePrimitiveItem> {
    if (pkProject) {
      return combineLatest(
        this.s.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter(x => !!x)),
        this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity).pipe(filter(x => !!x))
      ).pipe(
        map(([infTimePrimitive, projRel]) => {
          if (!infTimePrimitive) return null;
          const timePrimitive = new TimePrimitive({
            julianDay: infTimePrimitive.julian_day,
            calendar: ((projRel.calendar || 'gregorian') as CalendarType),
            duration: (infTimePrimitive.duration as Granularity)
          })
          const node: TimePrimitiveItem = {
            ordNum: undefined,
            projRel: undefined,
            statement,
            timePrimitive,
            label: this.timePrimitivePipe.transform(timePrimitive),
            fkClass: infTimePrimitive.fk_class
          }
          return node
        }))
    } else {
      return this.infRepo.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter(x => !!x)).pipe(
        map(infTimePrimitive => {
          const timePrimitive = new TimePrimitive({
            julianDay: infTimePrimitive.julian_day,
            calendar: ((statement.community_favorite_calendar || 'gregorian') as CalendarType),
            duration: (infTimePrimitive.duration as Granularity)
          })
          const node: TimePrimitiveItem = {
            ordNum: undefined,
            projRel: undefined,
            statement,
            timePrimitive,
            label: this.timePrimitivePipe.transform(timePrimitive),
            fkClass: infTimePrimitive.fk_class
          }
          return node
        })
      )
    }
  }


  /*********************************************************************
  * Pipe alternatives (not in project)
  *********************************************************************/
  @spyTag pipeAltListLength(l: Subfield, pkEntity: number): Observable<number> {
    switch (l.listType) {
      case 'appellation':
      case 'entity-preview':
      case 'language':
      case 'place':
      case 'langString':
      case 'temporal-entity':
      case 'time-span':
        return this.pipeAltListStatements(l, pkEntity).pipe(map(items => items.length))

      default:
        console.warn('unsupported listType')
        break;
    }
  }

  @spyTag pipeAltList(l: Subfield, pkEntity): Observable<ItemList> {
    if (l.listType.appellation) return this.pipeAltListAppellation(l, pkEntity)
    else if (l.listType.entityPreview) return this.pipeAltListEntityPreview(l, pkEntity)
    else if (l.listType.language) return this.pipeAltListLanguage(l, pkEntity)
    else if (l.listType.place) return this.pipeAltListPlace(l, pkEntity)
    else if (l.listType.dimension) return this.pipeAltListDimension(l, pkEntity)
    else if (l.listType.langString) return this.pipeAltListLangString(l, pkEntity)
    else if (l.listType.temporalEntity) return this.pipeAltListEntityPreview(l, pkEntity)
    else console.warn('unsupported listType')
  }

  @spyTag pipeAltListStatements(listDefinition: Subfield, pkEntity: number): Observable<InfStatement[]> {
    return (listDefinition.isOutgoing ?
      this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity) :
      this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity)
    )
  }

  /**
  * Pipe the items in entity preview field
  */
  @spyTag pipeAltListEntityPreview<T>(listDefinition: Subfield, pkEntity): Observable<EntityPreviewItem[]> {

    return (listDefinition.isOutgoing ?
      this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity) :
      this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity)
    ).pipe(
      switchMap((statements) => {
        return combineLatest(statements.map((r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing)))
          .pipe(
            map(nodes => nodes
              .filter(node => !!node)
              .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1)
            ),
            startWith([]))
      }))

  }

  /**
   * Pipe the alternative items in place list
   */
  @spyTag pipeAltListPlace<T>(listDefinition: Subfield, pkEntity): Observable<PlaceItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemPlace(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              startWith([]))
        }))
    }
  }


  /**
   * Pipe the alternative items in dimension list
   */
  @spyTag pipeAltListDimension<T>(listDefinition: Subfield, pkEntity): Observable<DimensionItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemDimension(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              startWith([]))
        }))
    }
  }


  /**
   * Pipe the alternative items in langString list
   */
  @spyTag pipeAltListLangString<T>(listDefinition: Subfield, pkEntity): Observable<LangStringItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemLangString(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              startWith([]))
        }))
    }
  }

  /**
   * Pipe the alternative items in appellation field
   */
  @spyTag pipeAltListAppellation<T>(listDefinition: Subfield, pkEntity): Observable<AppellationItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemAppellation(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              startWith([]))
        }))
    }
  }

  /**
   * Pipe the alternative items in language field
   */
  @spyTag pipeAltListLanguage<T>(listDefinition: Subfield, pkEntity): Observable<LanguageItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeAlternativeOutgoingStatements(listDefinition.property.pkProperty, pkEntity).pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemLanguage(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              startWith([]))
        }))
    }
  }

  /*********************************************************************
   * Pipe repo views (community favorites, where restricted by quantifiers)
   *********************************************************************/

  /**
   * Pipe repository temporal entity item in the way it is defined by the repository
   */


  /**
   * Pipe appellation list in the way it is defined by the repository
   */
  @spyTag pipeRepoListAppellation<T>(listDefinition: Subfield, pkEntity): Observable<AppellationItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemAppellation(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              startWith([]))
        }))
    }
  }

  /**
  * Pipe language list in the way it is defined by the repository
  */
  @spyTag pipeRepoListLanguage<T>(listDefinition: Subfield, pkEntity): Observable<LanguageItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemLanguage(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              startWith([]))
        }))
    }
  }

  /**
   * Pipe place list in the way it is defined by the repository
   */
  @spyTag pipeRepoListPlace<T>(listDefinition: Subfield, pkEntity): Observable<PlaceItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemPlace(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              startWith([]))
        }))
    }
  }

  /**
  * Pipe place list in the way it is defined by the repository
  */
  @spyTag pipeRepoListDimension<T>(listDefinition: Subfield, pkEntity): Observable<DimensionItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity).pipe(
        switchMap((statements) => {
          return combineLatest(statements.map((r, i) => this.pipeItemDimension(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)),
              startWith([]))
        }))
    }
  }
  /**
  * Pipe the items in entity preview field, connected by community favorite statements
  */
  @spyTag pipeRepoListEntityPreview<T>(listDefinition: Subfield, pkEntity): Observable<EntityPreviewItem[]> {

    return (listDefinition.isOutgoing ?
      this.b.pipeRepoOutgoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity) :
      this.b.pipeRepoIngoingStatementsByProperty(listDefinition.property.pkProperty, pkEntity)
    ).pipe(
      switchMap((statements) => {
        return combineLatest(statements.map((r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing)))
          .pipe(
            map(nodes => nodes.filter(node => !!node && node.fkClass === listDefinition.targetClass)
              // .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1)
            ))
      }),
      startWith([])
    )

  }


  /**
   * Pipe repo time span item
   */
  @spyTag pipeRepoItemTimeSpan(pkEntity): Observable<TimeSpanItem> {
    return this.p.pkProject$.pipe(
      switchMap(pkProject => {
        return this.c.pipeBasicAndSpecificFields(
          DfhConfig.ClASS_PK_TIME_SPAN
        ).pipe(
          switchMap(fieldDefinitions => {

            return combineLatest(fieldDefinitions.map(fieldDef =>
              this.b.pipeRepoOutgoingStatementsByProperty(fieldDef.property.pkProperty, pkEntity)
                .pipe(
                  switchMapOr([], statements => combineLatest(
                    statements.map(statement =>
                      this.infRepo.time_primitive$.by_pk_entity$.key(statement.fk_object_info)
                        .pipe(map((infTimePrimitive) => {
                          const timePrimitive = new TimePrimitive({
                            julianDay: infTimePrimitive.julian_day,
                            calendar: ((statement.community_favorite_calendar || 'gregorian') as CalendarType),
                            duration: (infTimePrimitive.duration as Granularity)
                          })
                          const item: TimePrimitiveItem = {
                            statement,
                            ordNum: undefined,
                            projRel: undefined,
                            timePrimitive,
                            label: this.timePrimitivePipe.transform(timePrimitive),
                            fkClass: infTimePrimitive.fk_class
                          }
                          return item;
                        }))
                    )
                  )),
                  map(items => {
                    const res: TimeSpanProperty = {
                      listDefinition: fieldDef.listDefinitions[0], items
                    }
                    return res
                  }),
                  startWith({ listDefinition: fieldDef.listDefinitions[0], items: [] } as TimeSpanProperty)
                )
            )).pipe(
              map((properties) => {
                const timespanitem: TimeSpanItem = {
                  label: '',
                  properties: properties.filter(props => props.items.length > 0)
                }
                return timespanitem
              })
            )
          })
        )
      })

    )
  }


  /**
   * Pipes the label of given entity
   * This will use entity previews for getting strings of related temporal entities
   * So this may take a little while
   */
  @spyTag pipeLabelOfEntity(fkEntity: number): Observable<string> {
    return this.b.pipeClassOfEntity(fkEntity).pipe(

      // get the definition of the first field
      switchMap(fkClass => this.c.pipeBasicAndSpecificFields(fkClass).pipe(
        // get the first item of that field
        switchMap(fieldDef => combineLatestOrEmpty(
          fieldDef && fieldDef.length ?
            fieldDef[0].listDefinitions.map(listDef => this.pipeEntityProperties(listDef, fkEntity, 1)) :
            []
        ).pipe(
          map(props => {
            props = props.filter(prop => prop.items.length > 0)
            if (props.length && props[0].items.length) {
              return props[0].items[0].label
            }
            return ''
          })
        )))
      ))
  }


  /**
   * Pipes the class label of given entity
   */
  @spyTag pipeClassLabelOfEntity(fkEntity: number): Observable<string> {
    return this.b.pipeClassOfEntity(fkEntity).pipe(
      switchMap(pkClass => this.c.pipeClassLabel(pkClass))
    )
  }

  /**
   * Pipes the pk_entity of the type of an entity
   */
  @spyTag pipeTypeOfEntity(pkEntity: number, hasTypeProperty: number, isOutgoing: boolean): Observable<InfStatement> {
    if (isOutgoing) {
      return this.s.inf$.statement$.by_subject_and_property_indexed$({ fk_property: hasTypeProperty, fk_subject_info: pkEntity }).pipe(map(items => {
        if (!items || Object.keys(items).length < 1) return undefined;
        else return values(items)[0]
      })
      )
    }
    else {
      return this.s.inf$.statement$.by_object_and_property_indexed$({ fk_property: hasTypeProperty, fk_object_info: pkEntity }).pipe(
        map(items => {
          if (!items || Object.keys(items).length < 1) return undefined;
          else return values(items)[0]
        })
      )
    }
  }

  @spyTag
  @cache({ refCount: false })
  pipeClassesAndTypes(enabledIn: 'entities' | 'sources') {
    return this.c.pipeTypeAndTypedClasses(enabledIn).pipe(
      switchMap(items => this.pipeClassAndTypeNodes(items)),
    )
  }

  @spyTag
  @cache({ refCount: false })
  pipeClassesAndTypesOfClasses(classes: number[]) {
    return this.c.pipeTypeAndTypedClassesOfTypedClasses(classes).pipe(
      switchMap(items => this.pipeClassAndTypeNodes(items)),
    )
  }

  @spyTag
  @cache({ refCount: false })
  pipeClassAndTypeNodes(typeAndTypedClasses: { typedClass: number; typeClass: number; }[]): Observable<ClassAndTypeNode[]> {
    return combineLatestOrEmpty(
      typeAndTypedClasses.map(item => this.c.pipeClassLabel(item.typedClass).pipe(
        map(label => ({
          label,
          data: { pkClass: item.typedClass, pkType: null }
        } as ClassAndTypeNode)),
        switchMap(node => iif(
          () => !!item.typeClass,
          this.b.pipePersistentItemPksByClass(item.typeClass).pipe(
            switchMap(typePks => combineLatestOrEmpty(
              typePks.map(pkType => this.p.streamEntityPreview(pkType).pipe(
                map(preview => ({
                  label: preview.entity_label,
                  data: { pkClass: item.typedClass, pkType }
                } as ClassAndTypeNode))
              ))
            ).pipe(
              sortAbc(n => n.label),
            )),
            map(children => {
              node.children = children
              return node
            })
          ),
          of({ ...node, children: [] } as ClassAndTypeNode)
        )
        )
      ))
    ).pipe(
      sortAbc((node) => node.label),
    )
  }

  /**
   * returns array of pk_class of all classes and typed classes.
   * @param classesAndTypes a object containing {classes: [], types[]}
   */
  pipeClassesFromClassesAndTypes(classesAndTypes: ClassAndTypeSelectModel): Observable<number[]> {
    const typedClasses$ = (!classesAndTypes || !classesAndTypes.types || !classesAndTypes.types.length) ?
      of([] as number[]) :
      this.b.pipeClassesOfPersistentItems(classesAndTypes.types)
        .pipe(
          filter((pks) => !!pks),
          switchMap(typeClasses => this.c.pipeTypedClassesOfTypeClasses(typeClasses))
        )
    return typedClasses$.pipe(
      map(typedClasses => uniq([...typedClasses, ...((classesAndTypes || { classes: [] }).classes || [])]))
    );
  }

  pipePropertyOptionsFromClassesAndTypes(classesAndTypes: ClassAndTypeSelectModel): Observable<PropertyOption[]> {
    return this.pipeClassesFromClassesAndTypes(classesAndTypes).pipe(
      switchMap(classes => this.pipePropertyOptionsFormClasses(classes))
    )
  }

  @cache({ refCount: false })
  pipePropertyOptionsFormClasses(classes: number[]): Observable<PropertyOption[]> {
    return combineLatestOrEmpty(classes.map(pkClass => this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(
      map(c => c.basic_type === 9),
      switchMap(isTeEn => this.c.pipeSpecificAndBasicFields(pkClass)
        .pipe(
          map(classFields => classFields
            .filter(f => !!f.property.pkProperty)
            .map(f => ({
              isOutgoing: f.isOutgoing,
              fkPropertyDomain: f.isOutgoing ? f.sourceClass : null,
              fkPropertyRange: f.isOutgoing ? null : f.sourceClass,
              pkProperty: f.property.pkProperty
            }))),
          switchMap(items => {
            if (isTeEn) {
              // add time properties (at some time within, ...)
              DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.map(pkProperty => {
                items.push({
                  pkProperty,
                  fkPropertyDomain: pkClass,
                  fkPropertyRange: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
                  isOutgoing: true
                })
              })
            }

            return combineLatestOrEmpty(items.map(item => this.c.pipeFieldLabel(
              item.pkProperty,
              item.fkPropertyDomain,
              item.fkPropertyRange,
            ).pipe(map(label => {
              const isOutgoing = item.isOutgoing;
              const o: PropertyOption = {
                isOutgoing,
                label,
                pk: item.pkProperty,
                propertyFieldKey: propertyOptionFieldKey(item.pkProperty, isOutgoing)
              };
              return o;
            }))));
          })))
    )


    )).pipe(map(y => flatten<PropertyOption>(y)));
  }

  @cache({ refCount: false })
  pipePkClassesFromPropertySelectModel(model: PropertySelectModel): Observable<number[]> {
    return combineLatestOrEmpty(
      [
        this.c.pipeTargetClassesOfProperties(model.outgoingProperties, true),
        this.c.pipeTargetClassesOfProperties(model.ingoingProperties, false),
      ]
    ).pipe(
      map(([out, ing]) => uniq([...out, ...ing]))
    )
  }

  getPkClassesFromPropertySelectModel$(model$: Observable<PropertySelectModel>): Observable<number[]> {
    return model$.pipe(
      switchMap(model => combineLatestOrEmpty(
        [
          this.c.pipeTargetClassesOfProperties(model.outgoingProperties, true),
          this.c.pipeTargetClassesOfProperties(model.ingoingProperties, false),
        ]
      ).pipe(
        map(([out, ing]) => uniq([...out, ...ing]))
      ))
    )
  }



  getPropertyOptions$(classTypes$: Observable<ClassAndTypeSelectModel>): Observable<PropertyOption[]> {
    return classTypes$.pipe<ClassAndTypeSelectModel, PropertyOption[]>(
      // make sure only it passes only if data of the arrayClasses are changed (not children)
      distinctUntilChanged<ClassAndTypeSelectModel>((a, b) => {
        return equals(a, b);
      }),
      switchMap((x) => !x ? empty() : this.b.pipeClassesOfPersistentItems(x.types)
        .pipe(
          filter((pks) => !!pks),
          switchMap(typeClasses => this.c.pipeTypedClassesOfTypeClasses(typeClasses).pipe(
            switchMap(typedClasses => {
              const classes = uniq([...typedClasses, ...(x.classes || [])]);
              return this.pipePropertyOptionsFormClasses(classes)
            }))
          )
        )
      )
    );
  }

}

export function propertyOptionFieldKey(fkProperty: number, isOutgoing: boolean): string {
  return '_' + fkProperty + '_' + (isOutgoing ? 'outgoing' : 'ingoing');
}

