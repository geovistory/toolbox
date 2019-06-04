import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Injectable } from "@angular/core";
import { ActiveProjectService, ClassConfigList, InfRole, ProInfoProjRel, PropertyField, SysConfig, TimePrimitive, U } from "app/core";
import { Granularity } from "app/core/date-time/date-time-commons";
import { CalendarType } from "app/core/date-time/time-primitive";
import { DfhConfig } from "app/modules/information/shared/dfh-config";
import { TimePrimitivePipe } from "app/shared/pipes/time-primitive/time-primitive.pipe";
import { TimeSpanPipe } from "app/shared/pipes/time-span/time-span.pipe";
import { pathOr, values } from "ramda";
import { combineLatest, Observable, of, BehaviorSubject } from "rxjs";
import { filter, first, map, mergeMap, startWith } from "rxjs/operators";
import { AppellationItem, EntityPreviewItem, ItemBasics, LanguageItem, ListDefinition, PlaceItem, ListType, TemporalEntityItem, TemporalEntityProperties, TextPropertyItem, TimePrimitiveItem, TimeSpanItem, TimeSpanProperties } from "./properties-tree.models";


@Injectable()
export class PropertyTreeService {

  showControl$ = new BehaviorSubject(null)

  constructor(
    private p: ActiveProjectService,
    private timePrimitivePipe: TimePrimitivePipe,
    private timeSpanPipe: TimeSpanPipe
  ) { }
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

  /**
   * Pipe the items in appellation field
   */
  pipeAppellationList<T>(listDefinition: ListDefinition, pkEntity): Observable<AppellationItem[]> {

    if (listDefinition.isOutgoing) {
      return this.pipeTeEnRoles(listDefinition.pkProperty, pkEntity).pipe(
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
      this.pipeTeEnRoles(listDefinition.pkProperty, pkEntity) :
      this.pipePeItRoles(listDefinition.pkProperty, pkEntity)
    ).pipe(
      mergeMap((roles) => {
        return combineLatest(roles.map((r, i) => this.pipeEntityPreviewItem(r)))
          .pipe(
            map(nodes => nodes
              .filter(node => !!node)
              .sort((a, b) => a.ordNum > b.ordNum ? 1 : -1)
            ),
            startWith([]))
      }))

  }

  pipeTemporalEntityList<T>(listDefinition: ListDefinition, pkEntity: number, appContext: number): Observable<TemporalEntityItem[]> {

    return (listDefinition.isOutgoing ?
      this.pipeTeEnRoles(listDefinition.pkProperty, pkEntity) :
      this.pipePeItRoles(listDefinition.pkProperty, pkEntity)
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
      return this.pipeTeEnRoles(listDefinition.pkProperty, pkEntity).pipe(
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
      return this.pipeTeEnRoles(listDefinition.pkProperty, pkEntity).pipe(
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
                  ordNum: projRel.ord_num
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
   * Pipe roles of persistent item
   */
  pipePeItRoles(pkProperty, pkEntity): Observable<InfRole[]> {
    return this.p.inf$.role$.by_fk_property__fk_entity$
      .key(pkProperty + '_' + pkEntity).pipe(
        map(roles => values(roles))
      )
  }

  /**
   * Pipe roles of temporal entity
   */
  pipeTeEnRoles(pkProperty, pkEntity): Observable<InfRole[]> {
    return this.p.inf$.role$.by_fk_property__fk_temporal_entity$
      .key(pkProperty + '_' + pkEntity).pipe(
        map(roles => values(roles))
      )
  }

  /**
   * Pipe roles of temporal entity
   */
  pipeTimeSpan(pkEntity): Observable<TimeSpanItem> {
    return this.p.pkProject$.pipe(
      mergeMap(pkProject => {
        // DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.map(pkProperty => (
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

  pipeEntityPreviewItem(role: InfRole): Observable<EntityPreviewItem> {
    return this.p.streamEntityPreview(role.fk_entity).pipe(
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
              .pipe(map((items) => this.pipeKeyValues(listDef, items)))

            else if (listDef.listType === 'language') return this.pipeLanguageList(listDef, targetInstance)
              .pipe(map((items) => this.pipeKeyValues(listDef, items)))

            else if (listDef.listType === 'place') return this.pipePlaceList(listDef, targetInstance)
              .pipe(map((items) => this.pipeKeyValues(listDef, items)))

            else if (listDef.listType === 'entity-preview' || listDef.listType === 'temporal-entity') return this.pipeEntityPreviewList(listDef, targetInstance)
              .pipe(map((items) => this.pipeKeyValues(listDef, items)))


            else if (listDef.listType === 'time-span') return this.pipeTimeSpan(targetInstance)
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
            p => p && p.items && p.items.length &&
              // exclude circular role
              p.listDefinition.pkProperty !== role.fk_property)
          )
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
          ordNum: projRel.ord_num,
          properties: properties,
          label: pathOr('', ['0', 'items', '0', 'label'], properties)
        }
        return node
      }))
  }

  pipeKeyValues(listDefinition: ListDefinition, items): TemporalEntityProperties {
    return {
      listDefinition, items
    }
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
        if (ipr.ord_num != i) {
          changedEprs.push({ ...ipr, ord_num: i, })
        }
      }

      if (changedEprs.length) this.p.pro$.info_proj_rel.upsert(changedEprs, pkProject)
    })
  }

}
