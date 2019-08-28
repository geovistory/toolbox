import { NgRedux } from "@angular-redux/store";
import { Injectable } from "@angular/core";
import { ActiveProjectService, IAppState, InfEntityAssociation, InfRole, InfTextProperty, limitOffset, limitTo, sortAbc, switchMapOr, SysConfig, TimePrimitive, TimeSpan, U } from "app/core";
import { Granularity } from "app/core/date-time/date-time-commons";
import { CalendarType } from "app/core/date-time/time-primitive";
import { InfSelector } from "app/core/inf/inf.service";
import { DfhConfig } from "app/modules/information/shared/dfh-config";
import { cache, spyTag } from "app/shared";
import { TimePrimitivePipe } from "app/shared/pipes/time-primitive/time-primitive.pipe";
import { TimeSpanPipe } from "app/shared/pipes/time-span/time-span.pipe";
import { groupBy, indexBy, omit, pathOr, pick, sum, values } from "ramda";
import { combineLatest, iif, Observable, of } from "rxjs";
import { filter, first, map, startWith, switchMap, tap } from "rxjs/operators";
import { tag } from "../../../../../node_modules/rxjs-spy/operators";
import { PaginateByParam } from "../../../core/store/actions";
import { combineLatestOrEmpty } from "../../../core/util/combineLatestOrEmpty";
import { ClassAndTypeNode } from "../new-components/classes-and-types-select/classes-and-types-select.component";
import { CtrlTimeSpanDialogResult } from "../new-components/ctrl-time-span/ctrl-time-span-dialog/ctrl-time-span-dialog.component";
import { AppellationItem, BasicRoleItem, EntityPreviewItem, EntityProperties, FieldDefinition, ItemList, LanguageItem, ListDefinition, ListType, PlaceItem, PropertyItemTypeMap, RoleItem, TemporalEntityCell, TemporalEntityItem, TemporalEntityRemoveProperties, TemporalEntityRow, TemporalEntityTableI, TextPropertyItem, TimePrimitiveItem, TimeSpanItem, TimeSpanProperty } from "../new-components/properties-tree/properties-tree.models";
import { ConfigurationPipesService } from "./configuration-pipes.service";
import { InformationBasicPipesService } from "./information-basic-pipes.service";
// import { TemporalEntityTableRow } from "../new-components/temporal-entity-list/TemporalEntityTable";

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
      case 'temporal-entity':
        return this.pipeListRoles(l, pkEntity).pipe(map(items => items.length))

      case 'time-span':
        return combineLatest(
          this.b.pipeOutgoingRolesByProperty(72, pkEntity),
          this.b.pipeOutgoingRolesByProperty(71, pkEntity),
          this.b.pipeOutgoingRolesByProperty(150, pkEntity),
          this.b.pipeOutgoingRolesByProperty(151, pkEntity),
          this.b.pipeOutgoingRolesByProperty(152, pkEntity),
          this.b.pipeOutgoingRolesByProperty(153, pkEntity)
        ).pipe(
          tap((x) => {

          }),
          map(items => items.filter(x => x.length > 0).length))

      case 'text-property':
        return this.pipeListTextProperty(l, pkEntity).pipe(map(items => items.length))

      default:
        break;
    }
  }

  @spyTag pipeList(l: ListDefinition, pkEntity, limit?: number): Observable<ItemList> {
    if (l.listType === 'appellation') return this.pipeListAppellation(l, pkEntity, limit)
    else if (l.listType === 'entity-preview') return this.pipeListEntityPreview(l, pkEntity, limit)
    else if (l.listType === 'language') return this.pipeListLanguage(l, pkEntity, limit)
    else if (l.listType === 'place') return this.pipeListPlace(l, pkEntity, limit)
    else if (l.listType === 'temporal-entity') return this.pipeListEntityPreview(l, pkEntity, limit)
    else if (l.listType === 'text-property') return this.pipeListTextProperty(l, pkEntity, limit)
    else if (l.listType === 'time-span') return this.pipeItemTimeSpan(pkEntity).pipe(
      map((ts) => [ts].filter(i => i.properties.length > 0))
    )
  }

  @spyTag pipeListRoles(listDefinition: ListDefinition, pkEntity: number): Observable<InfRole[]> {
    return (listDefinition.isOutgoing ?
      this.b.pipeOutgoingRolesByProperty(listDefinition.pkProperty, pkEntity) :
      this.b.pipeIngoingRolesByProperty(listDefinition.pkProperty, pkEntity)
    )
  }

  @spyTag pipeListBasicRoleItems(listDefinition: ListDefinition, pkEntity: number, pkProject: number): Observable<BasicRoleItem[]> {
    return (listDefinition.isOutgoing ?
      this.b.pipeOutgoingBasicRoleItemsByProperty(listDefinition.pkProperty, pkEntity, pkProject) :
      this.b.pipeIngoingBasicRoleItemsByProperty(listDefinition.pkProperty, pkEntity, pkProject)
    )
  }

  /**
   * Pipe the items in appellation field
   */
  @spyTag pipeListAppellation<T>(listDefinition: ListDefinition, pkEntity: number, limit?: number): Observable<AppellationItem[]> {
    if (listDefinition.isOutgoing) {
      return this.b.pipeOutgoingRolesByProperty(listDefinition.pkProperty, pkEntity).pipe(
        switchMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeItemAppellation(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              limitTo(limit),
              startWith([]))
        }))
    }
  }

  /**
 * Pipe the items in entity preview field
 */
  @spyTag pipeListEntityPreview<T>(listDefinition: ListDefinition, pkEntity: number, limit?: number): Observable<EntityPreviewItem[]> {

    return (listDefinition.isOutgoing ?
      this.b.pipeOutgoingRolesByProperty(listDefinition.pkProperty, pkEntity) :
      this.b.pipeIngoingRolesByProperty(listDefinition.pkProperty, pkEntity)
    ).pipe(
      tag(`before-${pkEntity}-${listDefinition.pkProperty}-${listDefinition.targetClass}`),
      switchMap((roles) => {
        return combineLatest(roles.map((r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing)))
          .pipe(
            map(nodes => nodes
              .filter(node => !!node)
              .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1),
              limitTo(limit),
            ),
            startWith([])
          )
      }),
      tag(`after-${pkEntity}-${listDefinition.pkProperty}-${listDefinition.targetClass}`),
    )

  }


  @spyTag pipeListLanguage<T>(listDefinition: ListDefinition, pkEntity: number, limit?: number): Observable<LanguageItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeOutgoingRolesByProperty(listDefinition.pkProperty, pkEntity).pipe(
        switchMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeItemLanguage(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              limitTo(limit),
              startWith([]))
        }))
    }
  }

  /**
   * Pipe the items in place list
   */
  @spyTag pipeListPlace<T>(listDefinition: ListDefinition, pkEntity: number, limit?: number): Observable<PlaceItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeOutgoingRolesByProperty(listDefinition.pkProperty, pkEntity).pipe(
        switchMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeItemPlace(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              limitTo(limit),
              startWith([]))
        }))
    }
  }

  @spyTag pipeListTextProperty<T>(listDefinition: ListDefinition, pkEntity: number, limit?: number): Observable<TextPropertyItem[]> {
    return this.p.pkProject$.pipe(
      switchMap(pkProject => this.p.inf$.text_property$.by_fk_concerned_entity__fk_class_field$.key(pkEntity + '_' + listDefinition.fkClassField)
        .pipe(
          map(textPropertyByPk => values(textPropertyByPk)),
          switchMapOr([], textProperties => combineLatest(textProperties.map(textProperty => combineLatest(
            this.p.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + textProperty.pk_entity),
            this.p.inf$.language$.by_pk_entity$.key(textProperty.fk_language)
          )
            .pipe(
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


  /**
   * Pipe the temporal entities connected to given entity by roles that are in the current project
   */
  @spyTag @cache({ refCount: false }) pipeTemporalEntityTableRows<T>(
    paginateBy: PaginateByParam[],
    limit: number,
    offset: number,
    pkProject: number,
    listDefinition: ListDefinition,
    fieldDefinitions: FieldDefinition[],
    alternative = false): Observable<TemporalEntityItem[]> {

    const propertyItemType = this.propertyItemType(fieldDefinitions)

    const targetEntityOfRoleItem = (r: BasicRoleItem) => r.isOutgoing ? r.role.fk_entity : r.role.fk_temporal_entity;

    // prepare page loader
    const pageLoader$ = alternative ? this.infRepo.role$.pagination$ : this.p.inf$.role$.pagination$;

    // prepare basic role item loader
    const basicRoleItemLoader = (pkRole, isOutgoing, pkProject) => {
      return alternative ?
        this.b.pipeAlternativeBasicRoleItemByPkRole(pkRole, isOutgoing) :
        this.b.pipeBasicRoleItemByPkRole(pkProject, pkRole, isOutgoing)
    }

    // prepare TeEnRow loader
    const rowLoader = (targetEntityPk, fieldDefinitions, propertyItemType, pkProject) => {
      return alternative ?
        this.pipeItemTeEnRow(targetEntityPk, fieldDefinitions, propertyItemType, null, true) :
        this.pipeItemTeEnRow(targetEntityPk, fieldDefinitions, propertyItemType, pkProject, false)
    }



    const paginatedRolePks$ = pageLoader$.pipePage(paginateBy, limit, offset)

    const rows$ = paginatedRolePks$.pipe(
      switchMap((paginatedRolePks) => combineLatest(
        paginatedRolePks.map(pkRole => basicRoleItemLoader(pkRole, listDefinition.isOutgoing, pkProject)
          .pipe(filter(x => !!x))
        )
      ).pipe(
        switchMap((teEnRoles) => combineLatestOrEmpty(
          teEnRoles.map((basicRoleItem) => rowLoader(
            targetEntityOfRoleItem(basicRoleItem),
            fieldDefinitions,
            propertyItemType,
            pkProject
          ).pipe(
            map(row => {
              const item: TemporalEntityItem = {
                ...basicRoleItem,
                row,
                pkEntity: targetEntityOfRoleItem(basicRoleItem)
              };
              return item
            })
          ))
        )),
      )),

    )
    return rows$
  }



  @spyTag pipeItemTeEnRow(pkEntity: number, fieldDefinitions: FieldDefinition[], propertyItemType: PropertyItemTypeMap, pkProject: number, repo: boolean): Observable<TemporalEntityRow> {

    // pipe outgoing roles
    const outgoingRoles$ = repo ? this.b.pipeRepoOutgoingRoles(pkEntity) : this.b.pipeOutgoingRoles(pkEntity);
    // pipe ingoing roles
    const ingoingRoles$ = repo ? this.b.pipeRepoIngoingRoles(pkEntity) : this.b.pipeIngoingRoles(pkEntity);


    // pipe all roles with leaf items
    const outgoingItems$: Observable<RoleItem[]> = outgoingRoles$.pipe(
      switchMap(roles => combineLatestOrEmpty(
        roles.map(r => {
          return this.pipeItem(propertyItemType, r, pkProject);
        })
      ))

    )
    const ingoingItems$: Observable<RoleItem[]> = ingoingRoles$.pipe(
      switchMapOr([], roles => combineLatest(
        roles.map(r => {
          return this.pipeItem(propertyItemType, r, pkProject);
        })
      ))

    )

    const sortItems = repo ?
      (item: RoleItem[]) => item.sort((a, b) => a.role.is_in_project_count > b.role.is_in_project_count ? 1 : -1) :
      (item: RoleItem[]) => item;


    return combineLatest(outgoingItems$, ingoingItems$).pipe(

      map(([outgoingItems, ingoingItems]) => {
        const groupedOut = groupBy((i) => (i.role ? i.role.fk_property.toString() : undefined), outgoingItems);
        const groupedIn = groupBy((i) => (i.role ? i.role.fk_property.toString() : undefined), ingoingItems);
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
                if (d.groupedOut[listDefinition.pkProperty]) {
                  const items = sortItems(d.groupedOut[listDefinition.pkProperty])
                  cell = {
                    itemsCount: items.length,
                    entityPreview: listDefinition.listType === 'entity-preview' ?
                      (items[0] as EntityPreviewItem).preview : undefined,
                    label: items[0].label,
                    pkProperty: listDefinition.pkProperty
                  }
                }
              } else {
                if (d.groupedIn[listDefinition.pkProperty]) {
                  const items = sortItems(d.groupedIn[listDefinition.pkProperty])

                  cell = {
                    itemsCount: items.length,
                    entityPreview: listDefinition.listType === 'entity-preview' ?
                      (items[0] as EntityPreviewItem).preview : undefined,
                    label: items[0].label,
                    pkProperty: listDefinition.pkProperty
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
                itemsCount,
                label,
                entityPreview: undefined,
                pkProperty: undefined
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

  @spyTag private pipeItem(propertyItemType: PropertyItemTypeMap, r: InfRole, pkProject: number) {
    let $: Observable<RoleItem>;
    const itemType = propertyItemType[(r.fk_property + '_' + true)];
    let listType;
    if (!itemType) {
      $ = of({
        projRel: undefined,
        ordNum: undefined,
        label: 'Error in data',
        role: undefined,
        isOutgoing: undefined,
        error: 'Error in data'
      })
    } else {
      const { listType, isOutgoing } = itemType;
      if (listType === 'appellation')
        $ = this.pipeItemAppellation(r);
      else if (listType === 'entity-preview')
        $ = this.pipeItemEntityPreview(r, isOutgoing);
      else if (listType === 'temporal-entity')
        $ = this.pipeItemEntityPreview(r, isOutgoing);
      else if (listType === 'language')
        $ = this.pipeItemLanguage(r);
      else if (listType === 'place')
        $ = this.pipeItemPlace(r);
      else if (listType === 'time-primitive')
        $ = this.pipeItemTimePrimitive(r, pkProject); // TODO: emits twice
      else if (listType === 'time-span')
        $ = this.pipeItemTimePrimitive(r, pkProject);
    }

    return $.pipe(tag(`pipeItemTeEnRow-item-${listType}-${r.fk_entity}`));
  }

  /**
   * TODO: instead of this we'd need a property -> itemType map where
   * also time-primitve is a type
   */
  propertyItemType(fieldDefinitions: FieldDefinition[]): PropertyItemTypeMap {
    const itemTypes: {
      pkProperty: number,
      listType: ListType,
      isOutgoing: boolean
    }[] = []

    fieldDefinitions.forEach(fieldDefinition => {
      fieldDefinition.listDefinitions.forEach(listDefinition => {
        itemTypes.push({
          pkProperty: listDefinition.pkProperty,
          listType: listDefinition.listType,
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

    if (listDef.listType === 'appellation') return this.pipeListAppellation(listDef, fkEntity, limit)
      .pipe(map((items) => this.getEntityProperties(listDef, items)))

    else if (listDef.listType === 'language') return this.pipeListLanguage(listDef, fkEntity, limit)
      .pipe(map((items) => this.getEntityProperties(listDef, items)))

    else if (listDef.listType === 'place') return this.pipeListPlace(listDef, fkEntity, limit)
      .pipe(map((items) => this.getEntityProperties(listDef, items)))

    else if (listDef.listType === 'text-property') return this.pipeListTextProperty(listDef, fkEntity, limit)
      .pipe(map((items) => this.getEntityProperties(listDef, items)))

    else if (listDef.listType === 'entity-preview' || listDef.listType === 'temporal-entity') return this.pipeListEntityPreview(listDef, fkEntity, limit)
      .pipe(map((items) => this.getEntityProperties(listDef, items)))

    else if (listDef.listType === 'time-span') return this.pipeItemTimeSpan(fkEntity)
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

    else return of(null)
  }

  @spyTag pipeTemporalEntityRemoveProperties(pkEntity: number): Observable<TemporalEntityRemoveProperties> {
    return combineLatest(
      this.p.inf$.temporal_entity$.by_pk_entity$.key(pkEntity),
      this.p.inf$.role$.by_fk_temporal_entity$.key(pkEntity),
      this.p.inf$.text_property$.by_fk_concerned_entity$.key(pkEntity)
    ).pipe(
      map(([temporalEntity, roles, textProperties]) => {
        const res: TemporalEntityRemoveProperties = {
          temporalEntity,
          roles: values(roles),
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
        return this.c.pipeFieldDefinitions(
          DfhConfig.ClASS_PK_TIME_SPAN,
          SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE
        ).pipe(
          switchMap(fieldDefs => {

            return combineLatest(fieldDefs.map(
              fieldDef => this.p.inf$.role$.by_fk_property__fk_temporal_entity$.key(fieldDef.pkProperty + '_' + pkEntity)
                .pipe(
                  tap((x) => {

                  }),
                  map(roles => values(roles)),
                  switchMapOr([], roles => combineLatest(
                    roles.map(role => combineLatest(
                      this.p.inf$.time_primitive$.by_pk_entity$.key(role.fk_entity).filter(x => !!x),
                      this.p.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + role.pk_entity)
                    ).pipe(map(([infTimePrimitive, projRel]) => {
                      const timePrimitive = new TimePrimitive({
                        julianDay: infTimePrimitive.julian_day,
                        calendar: ((projRel.calendar || 'gregorian') as CalendarType ),
                        duration: (infTimePrimitive.duration as Granularity)
                      })
                      const item: TimePrimitiveItem = {
                        role,
                        ordNum: undefined,
                        projRel,
                        timePrimitive,
                        label: this.timePrimitivePipe.transform(timePrimitive)
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
                  // startWith({ listDefinition: fieldDef.listDefinitions[0], items: [] } as TimeSpanProperties)
                )
            )).pipe(
              map((properties) => {
                const props = properties.filter(props => props.items.length > 0);
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

  @spyTag pipeItemAppellation(role: InfRole): Observable<AppellationItem> {
    return this.p.inf$.appellation$.by_pk_entity$.key(role.fk_entity).pipe(
      filter(x => !!x),
      map(appellation => {
        if (!appellation) return null;
        const node: AppellationItem = {
          ordNum: undefined,
          projRel: undefined,
          role,
          label: appellation.string
        }
        return node
      }))
  }

  @spyTag pipeItemLanguage(role: InfRole): Observable<LanguageItem> {
    return this.p.inf$.language$.by_pk_entity$.key(role.fk_entity).pipe(
      filter(x => !!x),
      map(language => {
        if (!language) return null;
        const node: LanguageItem = {
          ordNum: undefined,
          projRel: undefined,
          role,
          label: language.notes
        }
        return node
      }))
  }

  @spyTag pipeItemPlace(role: InfRole): Observable<PlaceItem> {
    return this.p.inf$.place$.by_pk_entity$.key(role.fk_entity).pipe(
      filter(x => !!x),
      map(place => {
        if (!place) return null;
        const node: PlaceItem = {
          ordNum: undefined,
          projRel: undefined,
          role,
          label: 'WGS84: ' + place.lat + '°, ' + place.long + '°'
        }
        return node
      }))
  }

  @spyTag pipeItemEntityPreview(role: InfRole, isOutgoing: boolean): Observable<EntityPreviewItem> {
    return this.p.streamEntityPreview((isOutgoing ? role.fk_entity : role.fk_temporal_entity)).pipe(
      filter(preview => !preview.loading && !!preview && !!preview.entity_type),
      map(preview => {
        if (!preview) {
          return null;
        }
        const node: EntityPreviewItem = {
          ordNum: undefined,
          projRel: undefined,
          role,
          preview,
          label: preview.entity_label
        }
        return node
      }))
  }

  /**
   * @param pk
   */
  @spyTag pipeItemTimePrimitive(role: InfRole, pkProject): Observable<TimePrimitiveItem> {
    if (pkProject) {
      return combineLatest(
        this.p.inf$.time_primitive$.by_pk_entity$.key(role.fk_entity).filter(x => !!x),
        this.p.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + role.pk_entity).filter(x => !!x)
      ).pipe(
        map(([infTimePrimitive, projRel]) => {
          if (!infTimePrimitive) return null;
          const timePrimitive = new TimePrimitive({
            julianDay: infTimePrimitive.julian_day,
            calendar: ((projRel.calendar || 'gregorian') as CalendarType ),
            duration: (infTimePrimitive.duration as Granularity)
          })
          const node: TimePrimitiveItem = {
            ordNum: undefined,
            projRel: undefined,
            role,
            timePrimitive,
            label: this.timePrimitivePipe.transform(timePrimitive)
          }
          return node
        }))
    } else {
      return this.infRepo.time_primitive$.by_pk_entity$.key(role.fk_entity).filter(x => !!x).pipe(
        map(infTimePrimitive => {
          const timePrimitive = new TimePrimitive({
            julianDay: infTimePrimitive.julian_day,
            calendar: ((role.community_favorite_calendar || 'gregorian') as CalendarType ),
            duration: (infTimePrimitive.duration as Granularity)
          })
          const node: TimePrimitiveItem = {
            ordNum: undefined,
            projRel: undefined,
            role,
            timePrimitive,
            label: this.timePrimitivePipe.transform(timePrimitive)
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
      case 'temporal-entity':
      case 'time-span':
        return this.pipeAltListRoles(l, pkEntity).pipe(map(items => items.length))

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
    else if (l.listType === 'temporal-entity') return this.pipeAltListEntityPreview(l, pkEntity)
    else if (l.listType === 'text-property') return this.pipeAltListTextProperty(l, pkEntity)
    // else if (l.listType === 'time-span') return this.pipeAlternativeTimeSpanItem(pkEntity).pipe(map((ts) => [ts]))
  }

  @spyTag pipeAltListRoles(listDefinition: ListDefinition, pkEntity: number): Observable<InfRole[]> {
    return (listDefinition.isOutgoing ?
      this.b.pipeAlternativeIngoingRoles(listDefinition.pkProperty, pkEntity) :
      this.b.pipeAlternativeIngoingRoles(listDefinition.pkProperty, pkEntity)
    )
  }

  /**
  * Pipe the items in entity preview field
  */
  @spyTag pipeAltListEntityPreview<T>(listDefinition: ListDefinition, pkEntity): Observable<EntityPreviewItem[]> {

    return (listDefinition.isOutgoing ?
      this.b.pipeAlternativeOutgoingRoles(listDefinition.pkProperty, pkEntity) :
      this.b.pipeAlternativeIngoingRoles(listDefinition.pkProperty, pkEntity)
    ).pipe(
      switchMap((roles) => {
        return combineLatest(roles.map((r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing)))
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
      return this.b.pipeAlternativeOutgoingRoles(listDefinition.pkProperty, pkEntity).pipe(
        switchMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeItemPlace(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  /**
   * Pipe the alternative items in appellation field
   */
  @spyTag pipeAltListAppellation<T>(listDefinition: ListDefinition, pkEntity): Observable<AppellationItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeAlternativeOutgoingRoles(listDefinition.pkProperty, pkEntity).pipe(
        switchMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeItemAppellation(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  /**
   * Pipe the alternative items in language field
   */
  @spyTag pipeAltListLanguage<T>(listDefinition: ListDefinition, pkEntity): Observable<LanguageItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeAlternativeOutgoingRoles(listDefinition.pkProperty, pkEntity).pipe(
        switchMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeItemLanguage(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  @spyTag pipeAltListTextProperty<T>(listDefinition: ListDefinition, pkEntity): Observable<TextPropertyItem[]> {

    const key = pkEntity + '_' + listDefinition.fkClassField;
    return combineLatest(
      this.infRepo.text_property$.by_fk_concerned_entity__fk_class_field$.key(key),
      this.p.inf$.text_property$.by_fk_concerned_entity__fk_class_field$.key(key).pipe(
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
      return this.b.pipeRepoOutgoingRolesByProperty(listDefinition.pkProperty, pkEntity).pipe(
        switchMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeItemAppellation(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  /**
  * Pipe language list in the way it is defined by the repository
  */
  @spyTag pipeRepoListLanguage<T>(listDefinition: ListDefinition, pkEntity): Observable<LanguageItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeRepoOutgoingRolesByProperty(listDefinition.pkProperty, pkEntity).pipe(
        switchMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeItemLanguage(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  /**
   * Pipe place list in the way it is defined by the repository
   */
  @spyTag pipeRepoListPlace<T>(listDefinition: ListDefinition, pkEntity): Observable<PlaceItem[]> {

    if (listDefinition.isOutgoing) {
      return this.b.pipeRepoOutgoingRolesByProperty(listDefinition.pkProperty, pkEntity).pipe(
        switchMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeItemPlace(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  /**
  * Pipe the items in entity preview field, connected by community favorite roles
  */
  @spyTag pipeRepoListEntityPreview<T>(listDefinition: ListDefinition, pkEntity): Observable<EntityPreviewItem[]> {

    return (listDefinition.isOutgoing ?
      this.b.pipeRepoOutgoingRolesByProperty(listDefinition.pkProperty, pkEntity) :
      this.b.pipeRepoIngoingRolesByProperty(listDefinition.pkProperty, pkEntity)
    ).pipe(
      switchMap((roles) => {
        return combineLatest(roles.map((r, i) => this.pipeItemEntityPreview(r, listDefinition.isOutgoing)))
          .pipe(
            map(nodes => nodes.filter(node => !!node)
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
          DfhConfig.ClASS_PK_TIME_SPAN,
          SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE
        ).pipe(
          switchMap(fieldDefinitions => {

            return combineLatest(fieldDefinitions.map(fieldDef =>
              this.b.pipeRepoOutgoingRolesByProperty(fieldDef.pkProperty, pkEntity)
                .pipe(
                  switchMapOr([], roles => combineLatest(
                    roles.map(role =>
                      this.infRepo.time_primitive$.by_pk_entity$.key(role.fk_entity)
                        .pipe(map((infTimePrimitive) => {
                          const timePrimitive = new TimePrimitive({
                            julianDay: infTimePrimitive.julian_day,
                            calendar: ((role.community_favorite_calendar || 'gregorian') as CalendarType ),
                            duration: (infTimePrimitive.duration as Granularity)
                          })
                          const item: TimePrimitiveItem = {
                            role,
                            ordNum: undefined,
                            projRel: undefined,
                            timePrimitive,
                            label: this.timePrimitivePipe.transform(timePrimitive)
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
   */
  @spyTag pipeLabelOfEntity(fkEntity: number): Observable<string> {
    return this.b.pipeClassOfEntity(fkEntity).pipe(
      // get the first class field config
      switchMap(pkClass => this.c.pipeClassFieldConfigs(pkClass, SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE, 1).pipe(
        // get the definition of the first field
        switchMap(fields => this.c.pipeFieldDefinition(fields[0]).pipe(
          // get the first item of that field
          switchMap(fieldDef => combineLatest(
            fieldDef.listDefinitions.map(listDef => this.pipeEntityProperties(listDef, fkEntity, 1))
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


      ))

  }
  /**
   * Pipes the class label of given entity
   */
  @spyTag pipeClassLabelOfEntity(fkEntity: number): Observable<string> {
    return this.b.pipeClassOfEntity(fkEntity).pipe(
      switchMap(pkClass => this.c.pipeLabelOfClass(pkClass))
    )
  }

  /**
   * Pipes the pk_entity of the type of an entity
   */
  @spyTag pipeTypeEntityAssociation(pkEntity: number): Observable<InfEntityAssociation> {
    return this.b.pipeClassOfEntity(pkEntity).pipe(
      switchMap(pkTypedClass => this.c.pipeTypePropertyOfTypedClass(pkTypedClass).pipe(
        switchMap(pkProperty => this.p.inf$.entity_association$.by_fk_property__fk_info_domain$.key(pkProperty + '_' + pkEntity).pipe(
          map(items => {
            if (!items || Object.keys(items).length < 1) return undefined;
            else return values(items)[0]
          })
        ))
      ))
    )
  }

  @spyTag
  @cache({ refCount: false })
  pipeClassesAndTypes(enabledIn: 'entities' | 'sources') {
    return this.c.pipeTypeAndTypedClasses(enabledIn).pipe(
      switchMap(items => combineLatestOrEmpty(
        items.map(item => this.c.pipeLabelOfClass(item.typedClass).pipe(
          tag('xyz-2'),
          map(label => ({
            label,
            data: { pkClass: item.typedClass, pkType: null }
          } as ClassAndTypeNode)),
          switchMap(node => iif(
            () => !!item.typeClass,
            this.b.pipePersistentItemPksByClass(item.typeClass).pipe(
              switchMap(typePks => combineLatestOrEmpty(
                typePks.map(pkType => this.pipeLabelOfEntity(pkType).pipe(
                  map(label => ({
                    label, data: { pkClass: item.typedClass, pkType }
                  } as ClassAndTypeNode))
                ))
              ).pipe(
                sortAbc(node => node.label),
              )),
              map(children => {
                node.children = children
                return node
              })
            ),
            of({ ...node, children: [] })
          )
          )
        ))
      ).pipe(
        sortAbc((node) => node.label),
        tag('xyz-3')
      )),
      tag('xyz-1'),
    )
  }

}
