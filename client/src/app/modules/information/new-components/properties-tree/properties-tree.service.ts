import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Injectable } from "@angular/core";
import { ActiveProjectService, ClassConfigList, InfRole, ProInfoProjRel, PropertyField, SysConfig, TimePrimitive, U, IAppState, InfEntityAssociation } from "app/core";
import { Granularity } from "app/core/date-time/date-time-commons";
import { CalendarType } from "app/core/date-time/time-primitive";
import { DfhConfig } from "app/modules/information/shared/dfh-config";
import { TimePrimitivePipe } from "app/shared/pipes/time-primitive/time-primitive.pipe";
import { TimeSpanPipe } from "app/shared/pipes/time-span/time-span.pipe";
import { pathOr, values, omit } from "ramda";
import { combineLatest, Observable, of, BehaviorSubject } from "rxjs";
import { filter, first, map, mergeMap, startWith, tap } from "rxjs/operators";
import { AppellationItem, EntityPreviewItem, ItemBasics, LanguageItem, ListDefinition, PlaceItem, ListType, TemporalEntityItem, TemporalEntityProperties, TextPropertyItem, TimePrimitiveItem, TimeSpanItem, TimeSpanProperties } from "./properties-tree.models";
import { InfSelector } from "app/core/inf/inf.service";
import { NgRedux } from "../../../../../../node_modules/@angular-redux/store";


@Injectable()
export class PropertyTreeService {

  showControl$ = new BehaviorSubject<ListDefinition>(null)

  infRepo: InfSelector;

  constructor(
    private p: ActiveProjectService,
    private timePrimitivePipe: TimePrimitivePipe,
    private timeSpanPipe: TimeSpanPipe,
    ngRedux: NgRedux<IAppState>
  ) {
    this.infRepo = new InfSelector(ngRedux, of('repo'))
  }
  /**
   * Pipe the fields of given class and app context
   */
  pipeListDefinitions(pkClass: number, appContext: number): Observable<ListDefinition[]> {
    return this.p.crm$.pipe(
      filter(crm => pathOr(false, ['classes', pkClass, 'uiContexts', appContext, 'uiElements'], crm)),

      map(crm => {
        const fields: ListDefinition[] = crm.classes[pkClass].uiContexts[appContext].uiElements.map((e) => {
          const isPropField = !!e.propertyFieldKey;
          const f = crm.fieldList[e.propSetKey || e.propertyFieldKey]

          let listType: ListType;
          let targetClassLabel;
          let targetMaxQuantity;
          if (f.type == 'PropertyField') {
            const propField = f as PropertyField;
            listType = this.targetOfPropertyField(propField.targetClassPk, crm.classes);
            targetClassLabel = crm.classes[propField.targetClassPk] ? crm.classes[propField.targetClassPk].label : ''
            targetMaxQuantity = propField.targetMaxQuantity;
          } else if (f.type === 'ExistenceTimeDetail') {
            listType = 'time-span'
          } else if (f.type === 'TextPropertyField') {
            listType = 'text-property'
          }

          const node: ListDefinition = {
            listType,
            targetClassLabel,
            targetMaxQuantity,
            label: f.label.default,
            pkProperty: isPropField ? (f as PropertyField).property.dfh_pk_property : undefined,
            isOutgoing: isPropField ? (f as PropertyField).isOutgoing : undefined,
            ontoInfoLabel: isPropField ? (f as PropertyField).property.dfh_identifier_in_namespace : undefined,
            ontoInfoUrl: isPropField ? 'http://ontologies.dataforhistory.org/property/' + (f as PropertyField).property.dfh_fk_property_of_origin : ''
          }
          return node
        })
        return fields
      }),
    )
  }

  private targetOfPropertyField(targetClassPk, classes: ClassConfigList): ListType {

    const targetClassConfig = classes[targetClassPk]
    if (targetClassPk == DfhConfig.CLASS_PK_APPELLATION) {
      return 'appellation'
    }
    else if (targetClassPk == DfhConfig.CLASS_PK_LANGUAGE) {
      return 'language'
    }
    else if (targetClassPk == DfhConfig.CLASS_PK_PLACE) {
      return 'place'
    }
    else if (targetClassPk == DfhConfig.CLASS_PK_TIME_PRIMITIVE) {
      return 'time-primitive'
    }
    else if (targetClassConfig.subclassOf === 'teEnt' || targetClassConfig.dfh_pk_class == DfhConfig.CLASS_PK_PRESENCE) {
      return 'temporal-entity'
    }
    else if (targetClassConfig.subclassOf === 'peIt') {
      return 'entity-preview'
    }


  }

  /*********************************************************************
   * Pipe the project entities
   *********************************************************************/

  /**
   * Pipe the items in appellation field
   */
  pipeAppellationList<T>(listDefinition: ListDefinition, pkEntity): Observable<AppellationItem[]> {

    if (listDefinition.isOutgoing) {
      return this.pipeOutgoingRoles(listDefinition.pkProperty, pkEntity).pipe(
        mergeMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeAppellationItem(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  /**
 * Pipe the items in entity preview field
 */
  pipeEntityPreviewList<T>(listDefinition: ListDefinition, pkEntity): Observable<EntityPreviewItem[]> {

    return (listDefinition.isOutgoing ?
      this.pipeOutgoingRoles(listDefinition.pkProperty, pkEntity) :
      this.pipeIngoingRoles(listDefinition.pkProperty, pkEntity)
    ).pipe(
      mergeMap((roles) => {
        return combineLatest(roles.map((r, i) => this.pipeEntityPreviewItem(r, listDefinition.isOutgoing)))
          .pipe(
            map(nodes => nodes
              .filter(node => !!node)
              .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1)
            ),
            startWith([]))
      }))

  }

  /**
   * Pipe the temporal entities connected to given entity by roles that are in the current project
   */
  pipeTemporalEntityList<T>(listDefinition: ListDefinition, pkEntity: number, appContext: number): Observable<TemporalEntityItem[]> {

    return (listDefinition.isOutgoing ?
      this.pipeOutgoingRoles(listDefinition.pkProperty, pkEntity) :
      this.pipeIngoingRoles(listDefinition.pkProperty, pkEntity)
    ).pipe(
      mergeMap((roles) => {
        return combineLatest(roles.map((r, i) => this.pipeTemporalEntityItem(r, listDefinition, appContext)))
          .pipe(
            map(nodes => nodes
              .filter(node => !!node)
              .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1)
            ),
            startWith([]))
      }))
  }


  pipeLanguageList<T>(listDefinition: ListDefinition, pkEntity): Observable<LanguageItem[]> {

    if (listDefinition.isOutgoing) {
      return this.pipeOutgoingRoles(listDefinition.pkProperty, pkEntity).pipe(
        mergeMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeLanguageItem(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  /**
   * Pipe the items in place list
   */
  pipePlaceList<T>(listDefinition: ListDefinition, pkEntity): Observable<PlaceItem[]> {

    if (listDefinition.isOutgoing) {
      return this.pipeOutgoingRoles(listDefinition.pkProperty, pkEntity).pipe(
        mergeMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipePlaceItem(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  pipeTextPropertyList<T>(listDefinition: ListDefinition, pkEntity): Observable<TextPropertyItem[]> {
    return this.pipeTextPropertyItems(pkEntity)
  }


  pipeTextPropertyItems(pkEntity: number): Observable<TextPropertyItem[]> {
    return this.p.pkProject$.pipe(
      mergeMap(pkProject => this.p.inf$.text_property$.by_fk_concerned_entity$.key(pkEntity)
        .pipe(
          filter(x => !!x),
          map(textPropertyByPk => values(textPropertyByPk)),
          mergeMap(textProperties => combineLatest(textProperties.map(textProperty => this.p.pro$.info_proj_rel$.by_fk_project__fk_entity$
            .key(pkProject + '_' + textProperty.pk_entity)
            .pipe(
              map(projRel => {
                const item: TextPropertyItem = {
                  projRel,
                  textProperty,
                  label: textProperty.string,
                  ordNum: projRel.ord_num_of_text_property
                }
                return item
              })
            ))
          )),
          map(items => items.sort((a, b) => a.ordNum > b.ordNum ? 1 : -1))
        )
      ))
  }


  /**
   * Pipe outgoing roles of temporal entity
   */
  pipeOutgoingRoles(pkProperty, pkEntity): Observable<InfRole[]> {
    return this.p.inf$.role$.by_fk_property__fk_temporal_entity$
      .key(pkProperty + '_' + pkEntity).pipe(
        map(roles => values(roles))
      )
  }


  /**
   * Pipe ingoing roles of an entity
   */
  pipeIngoingRoles(pkProperty, pkEntity): Observable<InfRole[]> {
    return this.p.inf$.role$.by_fk_property__fk_entity$
      .key(pkProperty + '_' + pkEntity).pipe(
        map(roles => values(roles))
      )
  }

  /**
   * Pipe temporal entity item in the way it is defined by the active project
   */
  pipeTemporalEntityItem(role: InfRole, listDefinition: ListDefinition, appContext: number): Observable<TemporalEntityItem> {
    return combineLatest(this.p.pkProject$, this.p.crm$).pipe(first(p => !!p)).switchMap(([pkProject, crm]) => {
      const p = crm.properties[listDefinition.pkProperty];
      const targetClass = listDefinition.isOutgoing ? p.dfh_has_range : p.dfh_has_domain;
      const targetInstance = listDefinition.isOutgoing ? role.fk_entity : role.fk_temporal_entity;
      return combineLatest(
        this.p.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(pkProject + '_' + role.pk_entity),
        this.pipeListDefinitions(targetClass, appContext).mergeMap((listDefinitions) => {
          return combineLatest(listDefinitions.map(listDef => {
            if (listDef.listType === 'appellation') return this.pipeAppellationList(listDef, targetInstance)
              .pipe(map((items) => this.pipeTemporalEntityProperties(listDef, items)))

            else if (listDef.listType === 'language') return this.pipeLanguageList(listDef, targetInstance)
              .pipe(map((items) => this.pipeTemporalEntityProperties(listDef, items)))

            else if (listDef.listType === 'place') return this.pipePlaceList(listDef, targetInstance)
              .pipe(map((items) => this.pipeTemporalEntityProperties(listDef, items)))

            else if (listDef.listType === 'entity-preview' || listDef.listType === 'temporal-entity') return this.pipeEntityPreviewList(listDef, targetInstance)
              .pipe(map((items) => this.pipeTemporalEntityProperties(listDef, items)))


            else if (listDef.listType === 'time-span') return this.pipeTimeSpanItem(targetInstance)
              .pipe(
                map((item) => {
                  const items = item.properties.find(p => p.items.length > 0) ? [{
                    label: this.timeSpanPipe.transform(U.timeSpanItemToTimeSpan(item))
                  }] : []
                  return {
                    listDefinition: listDef,
                    items
                  }
                }))

            else return of(null)

          }))
        }).pipe(
          map((properties: TemporalEntityProperties[]) => properties.filter(
            // exclude properties without roles
            p => p
              // && p.items && p.items.length
              // exclude circular role
              // && p.listDefinition.pkProperty !== role.fk_property
          ))
        )
      )
    }).pipe(

      map(([
        projRel,
        properties,
      ]) => {

        const node: TemporalEntityItem = {
          role,
          projRel,
          ordNum: projRel.ord_num_of_domain,
          properties: properties,
          label: pathOr('', ['0', 'items', '0', 'label'], properties)
        }
        return node
      }))
  }

  /**
   * Pipe time span item in version of project
   */
  pipeTimeSpanItem(pkEntity): Observable<TimeSpanItem> {
    return this.p.pkProject$.pipe(
      mergeMap(pkProject => {
        return this.pipeListDefinitions(
          DfhConfig.ClASS_PK_TIME_SPAN,
          SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE
        ).pipe(
          mergeMap(listDefs => {

            return combineLatest(listDefs.map(listDefinition => this.p.inf$.role$.by_fk_property__fk_temporal_entity$
              .key(listDefinition.pkProperty + '_' + pkEntity)
              .pipe(
                map(roles => values(roles)),
                mergeMap(roles => combineLatest(
                  roles.map(role => combineLatest(
                    this.p.inf$.time_primitive$.by_pk_entity$.key(role.fk_entity),
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
                  const res: TimeSpanProperties = {
                    listDefinition, items
                  }
                  return res
                }),
                startWith({ listDefinition, items: [] } as TimeSpanProperties)
              )
            )).pipe(
              map((properties) => {
                const timespanitem: TimeSpanItem = {
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



  pipeAppellationItem(role: InfRole): Observable<AppellationItem> {
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

  pipeLanguageItem(role: InfRole): Observable<LanguageItem> {
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

  pipePlaceItem(role: InfRole): Observable<PlaceItem> {
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

  pipeEntityPreviewItem(role: InfRole, isOutgoing: boolean): Observable<EntityPreviewItem> {
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

  pipeTemporalEntityProperties(listDefinition: ListDefinition, items): TemporalEntityProperties {
    return {
      listDefinition,
      items,
    }
  }

  /*********************************************************************
  * Pipe alternatives (not in project)
  *********************************************************************/
  /**
   * Pipe the temporal entities connected to given entity by alternative roles (= roles not in active project)
   */
  pipeAlternativeTemporalEntityList<T>(listDefinition: ListDefinition, pkEntity: number, appContext: number): Observable<TemporalEntityItem[]> {

    return (listDefinition.isOutgoing ?
      this.pipeAlternativeOutgoingRoles(listDefinition.pkProperty, pkEntity) :
      this.pipeAlternativeIngoingRoles(listDefinition.pkProperty, pkEntity)
    ).pipe(
      mergeMap((roles) => {
        return combineLatest(roles.map((r, i) => this.pipeRepoTemporalEntityItem(r, listDefinition, appContext)))
          .pipe(
            map(nodes => nodes
              .filter(node => !!node)
              .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1)
            ),
            startWith([]))
      }))
  }

  /**
     * Pipe alternative ingoing roles (= roles not in active project)
     */
  pipeAlternativeIngoingRoles(pkProperty, pkEntity): Observable<InfRole[]> {
    return combineLatest(
      this.infRepo.role$.by_fk_property__fk_entity$.key(pkProperty + '_' + pkEntity).filter(x => !!x),
      this.p.inf$.role$.by_fk_property__fk_entity$.key(pkProperty + '_' + pkEntity),
    ).pipe(
      map(([inrepo, inproject]) => omit(Object.keys(inproject), inrepo)),
      map(roles => values(roles))
    )
  }


  /**
   * Pipe alternative outgoing roles (= roles not in active project)
   */
  pipeAlternativeOutgoingRoles(pkProperty, pkEntity): Observable<InfRole[]> {
    return combineLatest(
      this.infRepo.role$.by_fk_property__fk_temporal_entity$.key(pkProperty + '_' + pkEntity).pipe(filter(x => !!x)),
      this.p.inf$.role$.by_fk_property__fk_temporal_entity$.key(pkProperty + '_' + pkEntity).pipe(filter(x => !!x))
    ).pipe(
      map(([inrepo, inproject]) => omit(Object.keys(inproject), inrepo)),
      map(roles => values(roles))
    )
  }

  /*********************************************************************
   * Pipe repo views (community favorites, where restricted by quantifiers)
   *********************************************************************/

  /**
   * Pipe repository temporal entity item in the way it is defined by the repository
   */
  pipeRepoTemporalEntityItem(role: InfRole, listDefinition: ListDefinition, appContext: number): Observable<TemporalEntityItem> {
    return combineLatest(this.p.pkProject$, this.p.crm$).pipe(first(p => !!p)).switchMap(([pkProject, crm]) => {
      const p = crm.properties[listDefinition.pkProperty];
      const targetClass = listDefinition.isOutgoing ? p.dfh_has_range : p.dfh_has_domain;
      const targetInstance = listDefinition.isOutgoing ? role.fk_entity : role.fk_temporal_entity;
      return this.pipeListDefinitions(targetClass, appContext).mergeMap((listDefinitions) => {
        return combineLatest(listDefinitions.map(listDef => {
          if (listDef.listType === 'appellation') return this.pipeRepoAppellationList(listDef, targetInstance)
            .pipe(map((items) => this.pipeTemporalEntityProperties(listDef, items)))

          else if (listDef.listType === 'language') return this.pipeRepoLanguageList(listDef, targetInstance)
            .pipe(map((items) => this.pipeTemporalEntityProperties(listDef, items)))

          else if (listDef.listType === 'place') return this.pipeRepoPlaceList(listDef, targetInstance)
            .pipe(map((items) => this.pipeTemporalEntityProperties(listDef, items)))

          else if (listDef.listType === 'entity-preview' || listDef.listType === 'temporal-entity') return this.pipeRepoEntityPreviewList(listDef, targetInstance)
            .pipe(map((items) => this.pipeTemporalEntityProperties(listDef, items)))


          else if (listDef.listType === 'time-span') return this.pipeRepoTimeSpanItem(targetInstance)
            .pipe(
              map((item) => {
                const items = item.properties.find(p => p.items.length > 0) ? [{
                  label: this.timeSpanPipe.transform(U.timeSpanItemToTimeSpan(item))
                }] : []
                return {
                  listDefinition: listDef,
                  items
                }
              }))

          else return of(null)

        }))
      }).pipe(
        map((properties: TemporalEntityProperties[]) => properties.filter(
          // exclude properties without roles
          p => p && p.items && p.items.length
            // exclude circular role
            && p.listDefinition.pkProperty !== role.fk_property
        ))
      )
    }).pipe(

      map((properties) => {

        const node: TemporalEntityItem = {
          role,
          projRel: null,
          ordNum: null,
          properties: properties,
          label: pathOr('', ['0', 'items', '0', 'label'], properties)
        }
        return node
      }))
  }

  /**
   * Pipe appellation list in the way it is defined by the repository
   */
  pipeRepoAppellationList<T>(listDefinition: ListDefinition, pkEntity): Observable<AppellationItem[]> {

    if (listDefinition.isOutgoing) {
      return this.pipeRepoOutgoingRoles(listDefinition.pkProperty, pkEntity).pipe(
        mergeMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeAppellationItem(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  /**
  * Pipe language list in the way it is defined by the repository
  */
  pipeRepoLanguageList<T>(listDefinition: ListDefinition, pkEntity): Observable<LanguageItem[]> {

    if (listDefinition.isOutgoing) {
      return this.pipeRepoOutgoingRoles(listDefinition.pkProperty, pkEntity).pipe(
        mergeMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeLanguageItem(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  /**
   * Pipe place list in the way it is defined by the repository
   */
  pipeRepoPlaceList<T>(listDefinition: ListDefinition, pkEntity): Observable<PlaceItem[]> {

    if (listDefinition.isOutgoing) {
      return this.pipeRepoOutgoingRoles(listDefinition.pkProperty, pkEntity).pipe(
        mergeMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipePlaceItem(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  /**
 * Pipe the items in entity preview field, connected by community favorite roles
 */
  pipeRepoEntityPreviewList<T>(listDefinition: ListDefinition, pkEntity): Observable<EntityPreviewItem[]> {

    return (listDefinition.isOutgoing ?
      this.pipeRepoOutgoingRoles(listDefinition.pkProperty, pkEntity) :
      this.pipeRepoIngoingRoles(listDefinition.pkProperty, pkEntity)
    ).pipe(
      mergeMap((roles) => {
        return combineLatest(roles.map((r, i) => this.pipeEntityPreviewItem(r, listDefinition.isOutgoing)))
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
  pipeRepoTimeSpanItem(pkEntity): Observable<TimeSpanItem> {
    return this.p.pkProject$.pipe(
      mergeMap(pkProject => {
        return this.pipeListDefinitions(
          DfhConfig.ClASS_PK_TIME_SPAN,
          SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE
        ).pipe(
          mergeMap(listDefs => {

            return combineLatest(listDefs.map(listDefinition =>
              this.pipeRepoOutgoingRoles(listDefinition.pkProperty, pkEntity)
                .pipe(
                  mergeMap(roles => combineLatest(
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
                    const res: TimeSpanProperties = {
                      listDefinition, items
                    }
                    return res
                  }),
                  startWith({ listDefinition, items: [] } as TimeSpanProperties)
                )
            )).pipe(
              map((properties) => {
                const timespanitem: TimeSpanItem = {
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
   * Pipe repo outgoing roles.
   * If max quantity is limited, takes only max allowed number of roles, starting with highest is_in_project_count
   */
  pipeRepoOutgoingRoles(pkProperty, pkEntity): Observable<InfRole[]> {
    return combineLatest(
      this.p.crm$.pipe(filter(x => !!x), map(crm => crm.properties[pkProperty].dfh_range_instances_max_quantifier)),
      this.infRepo.role$.by_fk_property__fk_temporal_entity$.key(pkProperty + '_' + pkEntity).pipe(filter(x => !!x))
    ).pipe(
      map(([m, inrepo]) => {
        const rs = values(inrepo);
        if (rs.length === 0) return rs;
        const r = this.sortRolesByRepoPopularity(rs);
        return (m === -1 || m === null) ? r : r.slice(0, m);
      })
    )
  }

  /**
 * Pipe repo ingoing roles.
 * If max quantity is limited, takes only max allowed number of roles, starting with highest is_in_project_count
 */
  pipeRepoIngoingRoles(pkProperty, pkEntity): Observable<InfRole[]> {
    return combineLatest(
      this.p.crm$.pipe(filter(x => !!x), map(crm => crm.properties[pkProperty].dfh_domain_instances_max_quantifier)),
      this.infRepo.role$.by_fk_property__fk_entity$.key(pkProperty + '_' + pkEntity).pipe(filter(x => !!x))
    ).pipe(
      map(([m, inrepo]) => {
        const rs = values(inrepo);
        if (rs.length === 0) return rs;
        const r = this.sortRolesByRepoPopularity(rs);
        return (m === -1 || m === null) ? r : r.slice(0, m);
      })
    )
  }

  /*********************************************************************
   * Helpers
   *********************************************************************/
  sortRolesByRepoPopularity(roles: InfRole[]): InfRole[] {
    return roles.sort((a, b) => a.is_in_project_count > b.is_in_project_count ? 1 : -1)
  }

  updateOrder(event: CdkDragDrop<ItemBasics[]>, items$: Observable<ItemBasics[]>) {
    combineLatest(this.p.pkProject$, items$).pipe(
      first(([p, i]) => (i && i.length > 0))
    ).subscribe(([pkProject, items]) => {

      moveItemInArray(items, event.previousIndex, event.currentIndex);

      const changedEprs: ProInfoProjRel[] = []

      // check, if needs update
      for (let i = 0; i < items.length; i++) {

        const ipr = items[i].projRel;
        // if the ord_num is wrong
        // TODO: add support for ord_num_of_range
        if (ipr.ord_num_of_domain != i) {
          changedEprs.push({ ...ipr, ord_num_of_domain: i, })
        }
      }

      if (changedEprs.length) this.p.pro$.info_proj_rel.upsert(changedEprs, pkProject)
    })
  }

}
