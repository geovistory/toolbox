
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ActiveProjectService, IAppState, InfStatement, InfTextProperty, limitTo, sortAbc, switchMapOr, TimePrimitive, TimeSpan, U } from 'app/core';
import { Granularity } from 'app/core/date-time/date-time-commons';
import { CalendarType } from 'app/core/date-time/time-primitive';
import { InfSelector } from 'app/core/inf/inf.service';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { ClassAndTypeSelectModel } from 'app/modules/queries/components/class-and-type-select/class-and-type-select.component';
import { PropertyOption, PropertySelectModel } from 'app/modules/queries/components/property-select/property-select.component';
import { cache, spyTag } from 'app/shared';
import { TimePrimitivePipe } from 'app/shared/pipes/time-primitive/time-primitive.pipe';
import { TimeSpanPipe } from 'app/shared/pipes/time-span/time-span.pipe';
import { equals, flatten, groupBy, indexBy, omit, pick, uniq, values } from 'ramda';
import { BehaviorSubject, combineLatest, empty, iif, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';
import { PaginateByParam } from '../../../core/store/actions';
import { combineLatestOrEmpty } from '../../../core/util/combineLatestOrEmpty';
import { ClassAndTypeNode } from '../components/classes-and-types-select/classes-and-types-select.component';
import { CtrlTimeSpanDialogResult } from '../components/ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component';
import { AppellationItem, BasicStatementItem, EntityPreviewItem, EntityProperties, FieldDefinition, ItemList, ItemType, LanguageItem, ListDefinition, PlaceItem, PropertyItemTypeMap, StatementItem, TemporalEntityCell, TemporalEntityItem, TemporalEntityRemoveProperties, TemporalEntityRow, TextPropertyItem, TimePrimitiveItem, TimeSpanItem, TimeSpanProperty, LangStringItem } from '../components/properties-tree/properties-tree.models';
import { ConfigurationPipesService } from './configuration-pipes.service';
import { InformationBasicPipesService } from './information-basic-pipes.service';
import { QuillOpsToStrPipe } from 'app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';
// import { TemporalEntityTableRow } from "../components/temporal-entity-list/TemporalEntityTable";

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
    private p: ActiveProjectService,
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

  @spyTag pipeListLength(l: ListDefinition, pkEntity: number): Observable<number> {
    switch (l.listType) {
      case 'appellation':
      case 'entity-preview':
      case 'language':
      case 'place':
      case 'lang-string':
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

      case 'text-property':
        return this.pipeListTextProperty(l, pkEntity).pipe(map(items => items.length))

      default:
        return new BehaviorSubject(0);
    }
  }

  @spyTag pipeList(l: ListDefinition, pkEntity, limit?: number): Observable<ItemList> {
    if (l.listType === 'appellation') return this.pipeListAppellation(l, pkEntity, limit)
    else if (l.listType === 'entity-preview') return this.pipeListEntityPreview(l, pkEntity, limit)
    else if (l.listType === 'language') return this.pipeListLanguage(l, pkEntity, limit)
    else if (l.listType === 'place') return this.pipeListPlace(l, pkEntity, limit)
    else if (l.listType === 'lang-string') return this.pipeListLangString(l, pkEntity, limit)
    else if (l.listType === 'temporal-entity') return this.pipeListEntityPreview(l, pkEntity, limit)
    else if (l.listType === 'text-property') return this.pipeListTextProperty(l, pkEntity, limit)
    else if (l.listType === 'time-span') {
      return this.pipeItemTimeSpan(pkEntity).pipe(
        map((ts) => [ts].filter(i => i.properties.length > 0))
      )
    }
  }

  @spyTag pipeListBasicStatementItems(listDefinition: ListDefinition, pkEntity: number, pkProject: number): Observable<BasicStatementItem[]> {
    return (listDefinition.isOutgoing ?
      this.b.pipeOutgoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject) :
      this.b.pipeIngoingBasicStatementItemsByProperty(listDefinition.property.pkProperty, pkEntity, pkProject)
    )
  }

  /**
   * Pipe the items in appellation field
   */
  @spyTag pipeListAppellation<T>(listDefinition: ListDefinition, pkEntity: number, limit?: number): Observable<AppellationItem[]> {
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
  @spyTag pipeListEntityPreview<T>(listDefinition: ListDefinition, pkEntity: number, limit?: number): Observable<EntityPreviewItem[]> {

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


  @spyTag pipeListLanguage<T>(listDefinition: ListDefinition, pkEntity: number, limit?: number): Observable<LanguageItem[]> {

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
  @spyTag pipeListPlace<T>(listDefinition: ListDefinition, pkEntity: number, limit?: number): Observable<PlaceItem[]> {

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
 * Pipe the items in lang-string list
 */
  @spyTag pipeListLangString<T>(listDefinition: ListDefinition, pkEntity: number, limit?: number): Observable<LangStringItem[]> {

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

  @spyTag pipeListTextProperty<T>(listDefinition: ListDefinition, pkEntity: number, limit?: number): Observable<TextPropertyItem[]> {
    return this.p.pkProject$.pipe(
      switchMap(pkProject => this.p.inf$.text_property$.by_fk_concerned_entity__fk_class_field_indexed$(pkEntity + '_' + listDefinition.fkClassField)
        .pipe(
          map(textPropertyByPk => values(textPropertyByPk)),
          switchMapOr([], textProperties => combineLatest(
            textProperties.map(textProperty => combineLatest(
              this.p.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + textProperty.pk_entity).pipe(
                filter(x => !!x)),
              this.p.inf$.language$.by_pk_entity$.key(textProperty.fk_language).pipe(
                filter(x => !!x)),
            ).pipe(
              map(([projRel, language]) => {
                const item: TextPropertyItem = {
                  projRel,
                  textProperty,
                  language,
                  label: textProperty.string,
                  ordNum: projRel.ord_num_of_text_property
                }
                return item
              })
            ))
          )),
          map(items => items.sort((a, b) => a.ordNum > b.ordNum ? 1 : -1)),
          limitTo(limit),
        )
      ))
  }


  pipeStatementListPage(
    paginateBy: PaginateByParam[],
    limit: number,
    offset: number,
    pkProject: number,
    listDefinition: ListDefinition,
    alternative = false): Observable<EntityPreviewItem[]> {

    // prepare page loader
    const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.p.inf$.statement$.pagination$;

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
    listDefinition: ListDefinition,
    fieldDefinitions: FieldDefinition[],
    alternative = false): Observable<TemporalEntityItem[]> {

    const propertyItemType = this.propertyItemType(fieldDefinitions)

    const targetEntityOfStatementItem = (r: BasicStatementItem) => r.isOutgoing ? r.statement.fk_object_info : r.statement.fk_subject_info;

    // prepare page loader
    const pageLoader$ = alternative ? this.infRepo.statement$.pagination$ : this.p.inf$.statement$.pagination$;

    // prepare basic statement item loader
    const basicStatementItemLoader = (pkStatement, isOutgoing, pkProj) => {
      return alternative ?
        this.b.pipeAlternativeBasicStatementItemByPkStatement(pkStatement, isOutgoing) :
        this.b.pipeBasicStatementItemByPkStatement(pkProj, pkStatement, isOutgoing)
    }

    // prepare TeEnRow loader
    const rowLoader = (targetEntityPk, fieldDef, propItemType, pkProj) => {
      return alternative ?
        this.pipeItemTeEnRow(targetEntityPk, fieldDef, propItemType, null, true) :
        this.pipeItemTeEnRow(targetEntityPk, fieldDef, propItemType, pkProj, false)
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
                  propertyItemType,
                  pkProject
                ),
                this.p.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + pkTeEn)
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



  @spyTag pipeItemTeEnRow(pkEntity: number, fieldDefinitions: FieldDefinition[], propertyItemType: PropertyItemTypeMap, pkProject: number, repo: boolean): Observable<TemporalEntityRow> {

    // pipe outgoing statements
    const outgoingStatements$ = repo ? this.b.pipeRepoOutgoingStatements(pkEntity) : this.b.pipeOutgoingStatements(pkEntity);
    // pipe ingoing statements
    const ingoingStatements$ = repo ? this.b.pipeRepoIngoingStatements(pkEntity) : this.b.pipeIngoingStatements(pkEntity);


    // pipe all statements with leaf items
    const outgoingItems$: Observable<StatementItem[]> = outgoingStatements$.pipe(
      switchMap(statements => combineLatestOrEmpty(
        statements.map(r => {
          const isOutgoing = true;
          return this.pipeItem(propertyItemType, r, pkProject, isOutgoing);
        })
      ))

    )
    const ingoingItems$: Observable<StatementItem[]> = ingoingStatements$.pipe(
      switchMapOr([], statements => combineLatest(
        statements.map(r => {
          const isOutgoing = false;
          return this.pipeItem(propertyItemType, r, pkProject, isOutgoing);
        })
      ))

    )

    const sortItems = repo ?
      (item: StatementItem[]) => item.sort((a, b) => a.statement.is_in_project_count > b.statement.is_in_project_count ? 1 : -1) :
      (item: StatementItem[]) => item;


    return combineLatest(outgoingItems$, ingoingItems$).pipe(

      map(([outgoingItems, ingoingItems]) => {
        const groupedOut = groupBy((i) => (i.statement ? i.statement.fk_property.toString() : undefined), outgoingItems);
        const groupedIn = groupBy((i) => (i.statement ? i.statement.fk_property.toString() : undefined), ingoingItems);
        return { groupedOut, groupedIn }
      }),
      // auditTime(10),
      map((d) => {
        const row: TemporalEntityRow = {}

        fieldDefinitions.forEach(fieldDefinition => {

          let cell: TemporalEntityCell;
          fieldDefinition.listDefinitions.forEach(listDefinition => {
            if (!listDefinition.fkClassField) {
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
            else if (listDefinition.listType == 'time-span') {

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
          })


          row[fieldDefinition.label] = cell;
        })
        return row
      })


    )
    // TODO: pipe all text properties

  }

  @spyTag private pipeItem(propertyItemType: PropertyItemTypeMap, r: InfStatement, pkProject: number, propIsOutgoing: boolean) {
    const itemType = propertyItemType[(r.fk_property + '_' + propIsOutgoing)];
    let listType: ItemType;
    if (!itemType) {
      return of({
        projRel: undefined,
        ordNum: undefined,
        label: 'Error in data',
        statement: undefined,
        isOutgoing: undefined,
        fkClass: undefined,
        error: 'Error in data'
      })
    }
    listType = itemType.listType;
    const isOutgoing = itemType.isOutgoing
    if (listType === 'appellation') return this.pipeItemAppellation(r);
    else if (listType === 'entity-preview') return this.pipeItemEntityPreview(r, isOutgoing);
    // else if (listType === 'temporal-entity') return this.pipeItemEntityPreview(r, isOutgoing);
    else if (listType === 'language') return this.pipeItemLanguage(r);
    else if (listType === 'place') return this.pipeItemPlace(r);
    else if (listType === 'lang-string') return this.pipeItemLangString(r);
    else if (listType === 'time-primitive') return this.pipeItemTimePrimitive(r, pkProject); // TODO: emits twice
    else if (listType === 'time-span') return this.pipeItemTimePrimitive(r, pkProject);
    else if (listType === 'has-type') return this.pipeItemEntityPreview(r, isOutgoing);

    // Default!!

    return of({
      projRel: undefined,
      ordNum: undefined,
      label: 'Error in data',
      statement: undefined,
      isOutgoing: undefined,
      fkClass: undefined,
      error: 'Error in data'
    })

  }

  /**
   * TODO: instead of this we'd need a property -> itemType map where
   * also time-primitve is a type
   */
  propertyItemType(fieldDefinitions: FieldDefinition[]): PropertyItemTypeMap {
    const itemTypes: {
      pkProperty: number,
      listType: ItemType,
      isOutgoing: boolean
    }[] = []

    fieldDefinitions.forEach(fieldDefinition => {
      fieldDefinition.listDefinitions.forEach(listDefinition => {
        const listType: ItemType = listDefinition.listType === 'temporal-entity' || listDefinition.listType === 'persistent-item' ?
          'entity-preview' : listDefinition.listType;
        itemTypes.push({
          pkProperty: listDefinition.property.pkProperty,
          listType,
          isOutgoing: listDefinition.isOutgoing
        })
      })
    })

    DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.forEach(pkProperty => {
      itemTypes.push({
        pkProperty, listType: 'time-primitive', isOutgoing: true
      })
    })

    return indexBy((l) => l.pkProperty + '_' + l.isOutgoing, itemTypes)
  }


  @spyTag pipeEntityProperties(listDef: ListDefinition, fkEntity: number, limit?: number): Observable<EntityProperties> {

    if (listDef.listType === 'appellation') {
      return this.pipeListAppellation(listDef, fkEntity, limit)
        .pipe(map((items) => this.getEntityProperties(listDef, items)))
    }
    else if (listDef.listType === 'language') {
      return this.pipeListLanguage(listDef, fkEntity, limit)
        .pipe(map((items) => this.getEntityProperties(listDef, items)))
    }
    else if (listDef.listType === 'place') {
      return this.pipeListPlace(listDef, fkEntity, limit)
        .pipe(map((items) => this.getEntityProperties(listDef, items)))
    }

    else if (listDef.listType === 'lang-string') {
      return this.pipeListLangString(listDef, fkEntity, limit)
        .pipe(map((items) => this.getEntityProperties(listDef, items)))
    }

    else if (listDef.listType === 'text-property') {
      return this.pipeListTextProperty(listDef, fkEntity, limit)
        .pipe(map((items) => this.getEntityProperties(listDef, items)))
    }
    else if (listDef.listType === 'entity-preview' || listDef.listType === 'temporal-entity') {
      return this.pipeListEntityPreview(listDef, fkEntity, limit)
        .pipe(map((items) => this.getEntityProperties(listDef, items)))
    }
    else if (listDef.listType === 'time-span') {
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
      this.p.inf$.temporal_entity$.by_pk_entity_key$(pkEntity),
      this.p.inf$.statement$.by_subject$({ fk_subject_info: pkEntity }),
      this.p.inf$.text_property$.by_fk_concerned_entity_indexed$(pkEntity)
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

  getEntityProperties(listDefinition: ListDefinition, items): EntityProperties {
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
        return this.c.pipeSpecificFieldDefinitions(
          DfhConfig.ClASS_PK_TIME_SPAN
        ).pipe(
          switchMap(fieldDefs => {
            return combineLatest(fieldDefs.map(fieldDef => this.p.inf$.statement$.by_subject_and_property$({
              fk_property: fieldDef.property.pkProperty,
              fk_subject_info: pkEntity
            })
              .pipe(
                switchMapOr([], statements => combineLatest(
                  statements.map(statement => combineLatest(
                    this.p.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter(x => !!x)),
                    this.p.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity)
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
    return this.p.inf$.appellation$.by_pk_entity$.key(statement.fk_object_info).pipe(
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
    return this.p.inf$.language$.by_pk_entity$.key(statement.fk_object_info).pipe(
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
    return this.p.inf$.place$.by_pk_entity$.key(statement.fk_object_info).pipe(
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

  @spyTag pipeItemLangString(statement: InfStatement): Observable<LangStringItem> {
    return this.p.inf$.lang_string$.by_pk_entity$.key(statement.fk_object_info).pipe(
      switchMap(
        (langString) => {
          if (!langString) return new BehaviorSubject(null)
          return this.p.inf$.language$.by_pk_entity$.key(langString.fk_language)
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
                  language
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
        this.p.inf$.time_primitive$.by_pk_entity$.key(statement.fk_object_info).pipe(filter(x => !!x)),
        this.p.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + statement.pk_entity).pipe(filter(x => !!x))
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
  @spyTag pipeAltListLength(l: ListDefinition, pkEntity: number): Observable<number> {
    switch (l.listType) {
      case 'appellation':
      case 'entity-preview':
      case 'language':
      case 'place':
      case 'lang-string':
      case 'temporal-entity':
      case 'time-span':
        return this.pipeAltListStatements(l, pkEntity).pipe(map(items => items.length))

      case 'text-property':
        return this.pipeAltListTextProperty(l, pkEntity).pipe(map(items => items.length))

      default:
        break;
    }
  }

  @spyTag pipeAltList(l: ListDefinition, pkEntity): Observable<ItemList> {
    if (l.listType === 'appellation') return this.pipeAltListAppellation(l, pkEntity)
    else if (l.listType === 'entity-preview') return this.pipeAltListEntityPreview(l, pkEntity)
    else if (l.listType === 'language') return this.pipeAltListLanguage(l, pkEntity)
    else if (l.listType === 'place') return this.pipeAltListPlace(l, pkEntity)
    else if (l.listType === 'lang-string') return this.pipeAltListLangString(l, pkEntity)
    else if (l.listType === 'temporal-entity') return this.pipeAltListEntityPreview(l, pkEntity)
    else if (l.listType === 'text-property') return this.pipeAltListTextProperty(l, pkEntity)
    // else if (l.listType === 'time-span') return this.pipeAlternativeTimeSpanItem(pkEntity).pipe(map((ts) => [ts]))
  }

  @spyTag pipeAltListStatements(listDefinition: ListDefinition, pkEntity: number): Observable<InfStatement[]> {
    return (listDefinition.isOutgoing ?
      this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity) :
      this.b.pipeAlternativeIngoingStatements(listDefinition.property.pkProperty, pkEntity)
    )
  }

  /**
  * Pipe the items in entity preview field
  */
  @spyTag pipeAltListEntityPreview<T>(listDefinition: ListDefinition, pkEntity): Observable<EntityPreviewItem[]> {

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
  @spyTag pipeAltListPlace<T>(listDefinition: ListDefinition, pkEntity): Observable<PlaceItem[]> {

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
   * Pipe the alternative items in langString list
   */
  @spyTag pipeAltListLangString<T>(listDefinition: ListDefinition, pkEntity): Observable<LangStringItem[]> {

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
  @spyTag pipeAltListAppellation<T>(listDefinition: ListDefinition, pkEntity): Observable<AppellationItem[]> {

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
  @spyTag pipeAltListLanguage<T>(listDefinition: ListDefinition, pkEntity): Observable<LanguageItem[]> {

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

  @spyTag pipeAltListTextProperty<T>(listDefinition: ListDefinition, pkEntity): Observable<TextPropertyItem[]> {

    const key = pkEntity + '_' + listDefinition.fkClassField;
    return combineLatest(
      this.infRepo.text_property$.by_fk_concerned_entity__fk_class_field_indexed$(key),
      this.p.inf$.text_property$.by_fk_concerned_entity__fk_class_field_indexed$(key).pipe(
        map(inproject => inproject ? Object.keys(inproject) : [])
      )
    ).pipe(
      map(([inrepo, inproject]) => omit(inproject, inrepo)),
      map(ds => values(ds)),
      switchMapOr([], (textProps: InfTextProperty[]) => {
        return combineLatest(textProps.map((textProperty) => this.p.inf$.language$.by_pk_entity$.key(textProperty.fk_language)
          .pipe(
            map(language => {
              const item: TextPropertyItem = {
                ordNum: undefined,
                projRel: undefined,
                language,
                textProperty,
                label: textProperty.string,
              }
              return item
            })
          ))).pipe(
            map(vals => vals.filter(x => x !== null))
          )
      })
    )
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
  @spyTag pipeRepoListAppellation<T>(listDefinition: ListDefinition, pkEntity): Observable<AppellationItem[]> {

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
  @spyTag pipeRepoListLanguage<T>(listDefinition: ListDefinition, pkEntity): Observable<LanguageItem[]> {

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
  @spyTag pipeRepoListPlace<T>(listDefinition: ListDefinition, pkEntity): Observable<PlaceItem[]> {

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
  * Pipe the items in entity preview field, connected by community favorite statements
  */
  @spyTag pipeRepoListEntityPreview<T>(listDefinition: ListDefinition, pkEntity): Observable<EntityPreviewItem[]> {

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
        return this.c.pipeFieldDefinitions(
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
      switchMap(fkClass => this.c.pipeFieldDefinitions(fkClass).pipe(
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
      return this.p.inf$.statement$.by_subject_and_property_indexed$({ fk_property: hasTypeProperty, fk_subject_info: pkEntity }).pipe(map(items => {
        if (!items || Object.keys(items).length < 1) return undefined;
        else return values(items)[0]
      })
      )
    }
    else {
      return this.p.inf$.statement$.by_object_and_property_indexed$({ fk_property: hasTypeProperty, fk_object_info: pkEntity }).pipe(
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
      map(typedClasses => uniq([...typedClasses, ...(classesAndTypes || { classes: [] }).classes || []]))
    )
  }

  pipePropertyOptionsFromClassesAndTypes(classesAndTypes: ClassAndTypeSelectModel): Observable<PropertyOption[]> {
    return this.pipeClassesFromClassesAndTypes(classesAndTypes).pipe(
      switchMap(classes => this.pipePropertyOptionsFormClasses(classes))
    )
  }

  @cache({ refCount: false })
  pipePropertyOptionsFormClasses(classes: number[]): Observable<PropertyOption[]> {
    return combineLatestOrEmpty(classes.map(pkClass => this.c.pipeFieldDefinitionsSpecificFirst(pkClass)
      .pipe(switchMap(classFields => {
        const fields = classFields.filter(f => !!f.property.pkProperty);

        return combineLatestOrEmpty(fields.map(field => this.c.pipeLabelOfPropertyField(
          field.property.pkProperty,
          field.isOutgoing ? field.sourceClass : null,
          field.isOutgoing ? null : field.sourceClass,
        ).pipe(map(label => {
          const isOutgoing = field.isOutgoing;
          const o: PropertyOption = {
            isOutgoing,
            label,
            pk: field.property.pkProperty,
            propertyFieldKey: propertyOptionFieldKey(field.property.pkProperty, isOutgoing)
          };
          return o;
        }))));
      })))).pipe(map(y => flatten<PropertyOption>(y)));
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
              const classes = uniq([...typedClasses, ...x.classes || []]);
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

