import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Injectable } from "@angular/core";
import { ActiveProjectService, ClassConfigList, InfRole, ProInfoProjRel, PropertyField, SysConfig, TimePrimitive, U, IAppState, InfEntityAssociation, ProClassFieldConfig, DfhPropertyProfileView, DfhPropertyView } from "app/core";
import { Granularity } from "app/core/date-time/date-time-commons";
import { CalendarType } from "app/core/date-time/time-primitive";
import { DfhConfig } from "app/modules/information/shared/dfh-config";
import { TimePrimitivePipe } from "app/shared/pipes/time-primitive/time-primitive.pipe";
import { TimeSpanPipe } from "app/shared/pipes/time-span/time-span.pipe";
import { pathOr, values, omit, indexBy, uniq, groupBy, sum } from "ramda";
import { combineLatest, Observable, of, BehaviorSubject } from "rxjs";
import { filter, first, map, mergeMap, startWith, tap, switchMap, distinctUntilChanged } from "rxjs/operators";
import { AppellationItem, EntityPreviewItem, ItemBasics, LanguageItem, ListDefinition, PlaceItem, ListType, TemporalEntityItem, TemporalEntityProperties, TextPropertyItem, TimePrimitiveItem, TimeSpanItem, TimeSpanProperties, FieldDefinition, ClassFieldConfig, TemporalEntityCellDefinition, ItemList, TemporalEntityRemoveProperties } from "./properties-tree.models";
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
   * Groups inherited properties by property of origin
   *
   * TODO: once identity of fk_property is changed, so that dfh_class_field_config only contains fk_property of original properties
   *  - Simplify this function by removing the whole merge map part and taking just the values of the by_fk_class__fk_app_context$.key()
   */
  pipeFieldsOfClass(pkClass: number, appContext: number): Observable<ClassFieldConfig[]> {
    return this.p.pro$.class_field_config$.by_fk_class__fk_app_context$.key(pkClass + '_' + appContext).pipe(
      mergeMap(ds => combineLatest(values(ds).map(d => {
        if (!d.fk_property) return of({ ...d, fk_property_of_origin: undefined });
        // Join the fk_property_of_origin
        return this.p.dfh$.property_view$.by_dfh_pk_property$.key(d.fk_property).map(p => ({
          ...d,
          fk_property_of_origin: p.fk_property
        }))

      })).pipe(
        map((ds) => ds.sort((a, b) => (a.ord_num > b.ord_num ? 1 : -1))),
        map((ds: ClassFieldConfig[]) => {
          const o = {}
          const fields = []
          ds.forEach(d => {
            if (!o[d.fk_property_of_origin]) {
              fields.push(d)
              o[d.fk_property_of_origin] = true
            }
          })
          return fields;
        }),
      ))
    )
  }

  /**
   * Todo: once the pk_property of inherited properties is gone
   * change this
   */
  pipeEnabledInheritedPropertiesOfPropertyField(field: ClassFieldConfig): Observable<DfhPropertyProfileView[]> {
    return combineLatest(field.property_is_outgoing ?
      this.p.dfh$.property_view$.by_dfh_has_domain__fk_property$.key(field.fk_class + '_' + field.fk_property_of_origin) :
      this.p.dfh$.property_view$.by_dfh_has_range__fk_property$.key(field.fk_class + '_' + field.fk_property_of_origin),
      this.p.pro$.class_field_config$.by_fk_property__property_is_outgoing__fk_app_context$.all$
    )
      .pipe(
        map(([props, fields]) => {
          return values(props).filter(prop => fields[prop.dfh_pk_property + '_' + field.property_is_outgoing + '_' + field.fk_app_context])
        }),
        startWith([])
      )
  }


  pipeLabelOfClass(pkClass: number): Observable<string> {
    return combineLatest(
      this.p.dfh$.class$.by_dfh_pk_class$.key(pkClass).pipe(
        map(c => c.dfh_standard_label),
        startWith('')
      ),
      this.p.dfh$.label$.by_dfh_fk_class$.key(pkClass).pipe(
        map(l => values(l)[0].dfh_label),
        startWith('')
      ),
    ).pipe(
      map(([c, l]) => (l ? l : c))
    );
  }

  /**
   * TODO: When changing identity of properties, add optional paramaters for domain and range classes
   *
   */
  pipeLabelOfProperty(fkProperty: number, isOutgoing: boolean, singular: boolean): Observable<string> {
    const system_type = isOutgoing ? (singular ? 180 : 181) : (singular ? 182 : 183)
    return combineLatest(
      this.p.dfh$.label$.by_dfh_fk_property__com_fk_system_type$.key(fkProperty + '_' + system_type).pipe(
        map(l => values(l)[0].dfh_label),
        startWith('')
      ),
      this.p.dfh$.property_view$.by_dfh_pk_property$.key(fkProperty).pipe(
        map(c => (isOutgoing ? c.dfh_standard_label : 'reverse of: ' + c.dfh_standard_label)),
        startWith('')
      ),
    ).pipe(
      map(([l, p]) => (l ? l : p)),
      distinctUntilChanged()
    );
  }

  // pipeLabelsOfProperty(fkProperty: number);

  /**
   * pipes the dfh_standard_label of the property with the given pk_property (of origin)
   */
  pipeDfhProperyStandardLabel(fkOriginalProperty): Observable<string> {
    return this.p.dfh$.property_view$.by_fk_property$.key(fkOriginalProperty).pipe(
      map(p => values(p)[0].dfh_standard_label)
    )
  }


  pipeListTypeOfClass(targetClassPk: number): Observable<ListType> {
    return this.p.dfh$.class$.by_dfh_pk_class$.key(targetClassPk).pipe(
      map(klass => {

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
        else if (klass.dfh_fk_system_type === 8) {
          return 'entity-preview'
        }
        else {
          return 'temporal-entity'
        }
      })
    )

  }

  /**
   * returns an object where the keys are the pks of the Classes
   * used by the given project
   */
  pipeSelectedClassesInProject(): Observable<{ [key: string]: any }> {
    return this.p.pkProject$.mergeMap(pkProject => combineLatest(

      this.p.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
        .pipe(mergeMap((cs) => combineLatest(values(cs).map(c => this.p.dfh$.class$.by_pk_entity$.key(c.fk_entity).pipe(
          map(dfhc => values(dfhc)[0].dfh_pk_class),
          startWith(0)
        ))))),

      this.p.sys$.system_relevant_class$.by_required$.key('true')
        .pipe(map(c => values(c).map(k => k.fk_class)))

    ).pipe(
      map(([a, b]) => indexBy((x) => x.toString(), uniq([...a, ...b]))),
      startWith({})
    ))
  }

  pipeListDefinitionsOfField(field: ClassFieldConfig): Observable<ListDefinition[]> {
    if (field.fk_property) {
      const o = field.property_is_outgoing;
      return combineLatest(
        this.pipeEnabledInheritedPropertiesOfPropertyField(field)
      ).pipe(
        mergeMap(([ps, klasses]) => combineLatest(
          ps
            .map(p => {
              const targetClass = o ? p.dfh_has_range : p.dfh_has_domain;
              const maxQ = field.property_is_outgoing ? p.dfh_range_instances_max_quantifier : p.dfh_domain_instances_max_quantifier;

              return combineLatest(
                this.pipeLabelOfClass(targetClass),
                this.pipeListTypeOfClass(targetClass),
                this.pipeLabelOfProperty(
                  p.dfh_pk_property,
                  field.property_is_outgoing,
                  (maxQ === 1)
                )
              ).pipe(
                map(([targetClassLabel, listType, label]) => {

                  const node: ListDefinition = {
                    listType,
                    targetClass,
                    targetClassLabel,
                    targetMaxQuantity: o ? p.dfh_range_instances_max_quantifier : p.dfh_domain_instances_max_quantifier,
                    label,
                    pkProperty: p.dfh_pk_property,
                    fkPropertyOfOrigin: field.fk_property_of_origin,
                    fkClassField: undefined,
                    isOutgoing: o,
                    isIdentiyDefining: p.identity_defining,
                    ontoInfoLabel: p.dfh_identifier_in_namespace,
                    ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/' + p.dfh_pk_property
                  }
                  return node
                })
              )
            })
        ).pipe(
          startWith([])
        ))
      )
    } else {
      return of([this.getClassFieldListDefinition(field.fk_class_field)])
    }
  }


  getClassFieldListDefinition(pkClassField): ListDefinition {

    switch (pkClassField) {
      case SysConfig.PK_CLASS_FIELD_WHEN:
        return {
          listType: 'time-span',
          label: 'When',
          fkClassField: pkClassField,
          pkProperty: undefined,
          fkPropertyOfOrigin: undefined,
          targetClass: undefined,
          isOutgoing: undefined,
          isIdentiyDefining: undefined,
          ontoInfoLabel: 'P4',
          ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/4'
        }
      case SysConfig.PK_CLASS_FIELD_ENTITY_DEFINITION:
        return {
          listType: 'text-property',
          label: 'Entity Definition',
          fkClassField: pkClassField,
          pkProperty: undefined,
          fkPropertyOfOrigin: undefined,
          targetClass: undefined,
          isOutgoing: undefined,
          isIdentiyDefining: undefined,
          ontoInfoLabel: 'P3',
          ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/3'
        }
      case SysConfig.PK_CLASS_FIELD_EXACT_REFERENCE:
        return {
          listType: 'text-property',
          label: 'Exact Reference',
          fkClassField: pkClassField,
          pkProperty: undefined,
          fkPropertyOfOrigin: undefined,
          targetClass: undefined,
          isOutgoing: undefined,
          isIdentiyDefining: undefined,
          ontoInfoLabel: 'P3',
          ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/3'
        }
      case SysConfig.PK_CLASS_FIELD_SHORT_TITLE:
        return {
          listType: 'text-property',
          label: 'Short Title',
          fkClassField: pkClassField,
          pkProperty: undefined,
          fkPropertyOfOrigin: undefined,
          targetClass: undefined,
          isOutgoing: undefined,
          isIdentiyDefining: undefined,
          ontoInfoLabel: 'P3',
          ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/3'
        }
      default:
        break;
    }
  }



  /**
   * Pipe the fields of given class for given app context
   */
  pipeFieldDefinitions(pkClass: number, appContext: number): Observable<FieldDefinition[]> {
    return this.pipeFieldsOfClass(pkClass, appContext).pipe(
      mergeMap(fields => combineLatest(fields.map(field => this.pipeFieldDefinition(field))))
    )
  }

  /**
   * Pipe the field definition with label, links to ontoMe, max quantity etc for given class-field-config
   */
  pipeFieldDefinition(field: ClassFieldConfig): Observable<FieldDefinition> {
    if (field.fk_class_field) {
      const classField = this.getClassFieldListDefinition(field.fk_class_field);
      return of({ ...classField, listDefinitions: [classField], fkPropertyOfOrigin: undefined })
    }
    else {
      return this.pipePropertyOfOriginOrInherited(field.fk_property_of_origin, field.fk_property)
        .pipe(
          mergeMap((p) => {
            const maxQ = field.property_is_outgoing ? p.dfh_range_instances_max_quantifier : p.dfh_domain_instances_max_quantifier;
            return combineLatest(
              this.pipeListDefinitionsOfField(field),
              this.pipeLabelOfProperty(
                p.dfh_pk_property,
                field.property_is_outgoing,
                (maxQ === 1)
              )
            ).pipe(
              map(([listDefinitions, label]) => {
                const fieldDefinition: FieldDefinition = {
                  isOutgoing: field.property_is_outgoing,
                  label,
                  listDefinitions,
                  ontoInfoLabel: p.dfh_identifier_in_namespace,
                  ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/' + p.dfh_pk_property,
                  pkProperty: field.fk_property_of_origin,
                  targetClasses: listDefinitions.map(l => l.targetClass),
                  targetMaxQuantity: maxQ
                }
                return fieldDefinition;
              })
            )
          }
          )
        )
    }
  }

  /**
   * Gets the property of origin, if existing in the data, else take
   * the fkProperty
   *
   * @param fkOropertyOfOrigin: this always references an original property
   * @param fkProperty: this can reference an original or an inherited property
   *
   * TODO this function will become superflous, once identity of properties is changed. This will be enough:
   * - this.p.dfh$.property_view$.by_dfh_pk_property$.key(field.fk_property_of_origin)
   */
  pipePropertyOfOriginOrInherited(fkOropertyOfOrigin: number, fkProperty: number): Observable<DfhPropertyView> {
    return this.p.dfh$.property_view$.by_fk_property$.key(fkOropertyOfOrigin)
      .pipe(
        map(ps => {
          // if original property exists, return this one
          if (ps[fkOropertyOfOrigin]) return ps[fkOropertyOfOrigin];
          // else return the first
          else return ps[fkProperty]
        })
      )
  }

  /**
   * Pipe the fields of given class and app context
   * TODO: DELETE THIS
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
            targetClass: undefined,
            targetMaxQuantity,
            fkClassField: undefined,
            fkPropertyOfOrigin: undefined,
            isIdentiyDefining: undefined,
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


  pipeList(l: ListDefinition, pkEntity): Observable<ItemList> {
    if (l.listType === 'appellation') return this.pipeAppellationList(l, pkEntity)
    else if (l.listType === 'entity-preview') return this.pipeEntityPreviewList(l, pkEntity)
    else if (l.listType === 'language') return this.pipeLanguageList(l, pkEntity)
    else if (l.listType === 'place') return this.pipePlaceList(l, pkEntity)
    else if (l.listType === 'temporal-entity') return this.pipeEntityPreviewList(l, pkEntity)
    else if (l.listType === 'text-property') return this.pipeTextPropertyList(l, pkEntity)
    else if (l.listType === 'time-span') return this.pipeTimeSpanItem(pkEntity).pipe(map((ts) => [ts]))
  }

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
    return this.p.pkProject$.pipe(
      mergeMap(pkProject => this.p.inf$.text_property$.by_fk_concerned_entity__fk_class_field$.key(pkEntity + '_' + listDefinition.fkClassField)
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
        this.pipeFieldDefinitions(targetClass, appContext).pipe(
          tap((x) => {

          }),
          mergeMap((fieldDefinitions) => this.pipeTemporalEntityCellDefinitions(fieldDefinitions, targetInstance)),
          tap((x) => {

          }),
        )
      )
    }).pipe(

      map(([
        projRel,
        cellDefinitions,
      ]) => {
        const node: TemporalEntityItem = {
          role,
          projRel,
          ordNum: projRel.ord_num_of_domain,
          cellDefinitions,
          label: pathOr('', ['0', 'items', '0', 'label'], cellDefinitions)
        }
        return node
      }))
  }


  pipeTemporalEntityCellDefinitions(fieldDefinitions: FieldDefinition[], fkEntity: number): Observable<TemporalEntityCellDefinition[]> {
    return combineLatest(fieldDefinitions.map(fieldDef => combineLatest(fieldDef.listDefinitions
      .map(listDef => this.pipeTemporalEntityProperties(listDef, fkEntity)))
      .pipe(
        map(lists => ({
          fieldDefinition: fieldDef,
          lists,
          cellValue: {
            label: lists.length && lists[0].items.length ? lists[0].items[0].label : undefined,
            entityPreview: lists.length && lists[0].items.length && lists[0].listDefinition.listType === 'entity-preview' ? (lists[0].items[0] as EntityPreviewItem).preview : undefined,
            itemsCount: sum(lists.map(l => l.items.length)),
            pkProperty: fieldDef.pkProperty
          }
        }))
      )
    ))

  }

  pipeTemporalEntityProperties(listDef: ListDefinition, fkEntity: number): Observable<TemporalEntityProperties> {
    if (listDef.listType === 'appellation') return this.pipeAppellationList(listDef, fkEntity)
      .pipe(
        tap((x) => {

        }),
        map((items) => this.getTemporalEntityProperties(listDef, items)))

    else if (listDef.listType === 'language') return this.pipeLanguageList(listDef, fkEntity)
      .pipe(
        tap((x) => {

        }),
        map((items) => this.getTemporalEntityProperties(listDef, items)))

    else if (listDef.listType === 'place') return this.pipePlaceList(listDef, fkEntity)
      .pipe(
        tap((x) => {

        }),
        map((items) => this.getTemporalEntityProperties(listDef, items)))

    else if (listDef.listType === 'entity-preview' || listDef.listType === 'temporal-entity') return this.pipeEntityPreviewList(listDef, fkEntity)
      .pipe(
        tap((x) => {

        }),
        map((items) => this.getTemporalEntityProperties(listDef, items)))


    else if (listDef.listType === 'time-span') return this.pipeTimeSpanItem(fkEntity)
      .pipe(
        tap((x) => {

        }),
        map((item) => {
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

  pipeTemporalEntityRemoveProperties(pkEntity: number): Observable<TemporalEntityRemoveProperties> {
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

  getTemporalEntityProperties(listDefinition: ListDefinition, items): TemporalEntityProperties {
    return {
      listDefinition,
      items,
    }
  }

  /*********************************************************************
  * Pipe alternatives (not in project)
  *********************************************************************/

  pipeAlternativeList(l: ListDefinition, pkEntity): Observable<ItemList> {
    if (l.listType === 'appellation') return this.pipeAlternativeAppellationList(l, pkEntity)
    else if (l.listType === 'entity-preview') return this.pipeAlternativeEntityPreviewList(l, pkEntity)
    else if (l.listType === 'language') return this.pipeAlternativeLanguageList(l, pkEntity)
    else if (l.listType === 'place') return this.pipeAlternativePlaceList(l, pkEntity)
    else if (l.listType === 'temporal-entity') return this.pipeAlternativeEntityPreviewList(l, pkEntity)
    else if (l.listType === 'text-property') return this.pipeAlternativeTextPropertyList(l, pkEntity)
    // else if (l.listType === 'time-span') return this.pipeAlternativeTimeSpanItem(pkEntity).pipe(map((ts) => [ts]))
  }


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
  * Pipe the items in entity preview field
  */
  pipeAlternativeEntityPreviewList<T>(listDefinition: ListDefinition, pkEntity): Observable<EntityPreviewItem[]> {

    return (listDefinition.isOutgoing ?
      this.pipeAlternativeOutgoingRoles(listDefinition.pkProperty, pkEntity) :
      this.pipeAlternativeIngoingRoles(listDefinition.pkProperty, pkEntity)
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
   * Pipe the alternative items in place list
   */
  pipeAlternativePlaceList<T>(listDefinition: ListDefinition, pkEntity): Observable<PlaceItem[]> {

    if (listDefinition.isOutgoing) {
      return this.pipeAlternativeOutgoingRoles(listDefinition.pkProperty, pkEntity).pipe(
        mergeMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipePlaceItem(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  /**
   * Pipe the alternative items in appellation field
   */
  pipeAlternativeAppellationList<T>(listDefinition: ListDefinition, pkEntity): Observable<AppellationItem[]> {

    if (listDefinition.isOutgoing) {
      return this.pipeAlternativeOutgoingRoles(listDefinition.pkProperty, pkEntity).pipe(
        mergeMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeAppellationItem(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  /**
   * Pipe the alternative items in language field
   */
  pipeAlternativeLanguageList<T>(listDefinition: ListDefinition, pkEntity): Observable<LanguageItem[]> {

    if (listDefinition.isOutgoing) {
      return this.pipeAlternativeOutgoingRoles(listDefinition.pkProperty, pkEntity).pipe(
        mergeMap((roles) => {
          return combineLatest(roles.map((r, i) => this.pipeLanguageItem(r)))
            .pipe(
              map(nodes => nodes.filter(node => !!node)),
              startWith([]))
        }))
    }
  }

  pipeAlternativeTextPropertyList<T>(listDefinition: ListDefinition, pkEntity): Observable<TextPropertyItem[]> {

    const key = pkEntity + '_' + listDefinition.fkClassField;
    return combineLatest(
      this.infRepo.text_property$.by_fk_concerned_entity__fk_class_field$.key(key).filter(x => !!x),
      this.p.inf$.text_property$.by_fk_concerned_entity__fk_class_field$.key(key).pipe(startWith({}))
    ).pipe(
      map(([inrepo, inproject]) => omit(Object.keys(inproject || {}), inrepo)),
      map(ds => values(ds).map(textProperty => {
        const item: TextPropertyItem = {
          ordNum: undefined,
          projRel: undefined,
          textProperty,
          label: textProperty.string,
        }
        return item
      })),
    )

  }

  /**
     * Pipe alternative ingoing roles (= roles not in active project)
     */
  pipeAlternativeIngoingRoles(pkProperty, pkEntity): Observable<InfRole[]> {
    return combineLatest(
      this.infRepo.role$.by_fk_property__fk_entity$.key(pkProperty + '_' + pkEntity).filter(x => !!x),
      this.p.inf$.role$.by_fk_property__fk_entity$.key(pkProperty + '_' + pkEntity).pipe(startWith({})),
    ).pipe(
      map(([inrepo, inproject]) => omit(Object.keys(inproject || {}), inrepo)),
      map(roles => values(roles))
    )
  }


  /**
   * Pipe alternative outgoing roles (= roles not in active project)
   */
  pipeAlternativeOutgoingRoles(pkProperty, pkEntity): Observable<InfRole[]> {
    return combineLatest(
      this.infRepo.role$.by_fk_property__fk_temporal_entity$.key(pkProperty + '_' + pkEntity).pipe(filter(x => !!x)),
      this.p.inf$.role$.by_fk_property__fk_temporal_entity$.key(pkProperty + '_' + pkEntity).pipe(startWith({}))
    ).pipe(
      map(([inrepo, inproject]) => omit(Object.keys(inproject || {}), inrepo)),
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
      return combineLatest(
        this.pipeFieldDefinitions(targetClass, appContext).mergeMap((fieldDefinitions) => this.pipeRepoTemporalEntityCellDefinitions(fieldDefinitions, targetInstance))
      )
    }).pipe(

      map(([
        cellDefinitions,
      ]) => {
        const node: TemporalEntityItem = {
          role,
          projRel: undefined,
          ordNum: undefined,
          cellDefinitions,
          label: pathOr('', ['0', 'items', '0', 'label'], cellDefinitions)
        }
        return node
      }))
  }


  pipeRepoTemporalEntityCellDefinitions(fieldDefinitions: FieldDefinition[], fkEntity: number): Observable<TemporalEntityCellDefinition[]> {
    return combineLatest(fieldDefinitions.map(fieldDef => combineLatest(fieldDef.listDefinitions
      .map(listDef => this.pipeRepoTemporalEntityProperties(listDef, fkEntity)))
      .pipe(
        map(lists => ({
          fieldDefinition: fieldDef,
          lists,
          cellValue: {
            label: lists.length && lists[0].items.length ? lists[0].items[0].label : undefined,
            entityPreview: lists.length && lists[0].items.length && lists[0].listDefinition.listType === 'entity-preview' ? (lists[0].items[0] as EntityPreviewItem).preview : undefined,
            itemsCount: sum(lists.map(l => l.items.length)),
            pkProperty: fieldDef.pkProperty
          }
        }))
      )
    ))

  }

  pipeRepoTemporalEntityProperties(listDef: ListDefinition, fkEntity: number): Observable<TemporalEntityProperties> {
    if (listDef.listType === 'appellation') return this.pipeRepoAppellationList(listDef, fkEntity)
      .pipe(map((items) => this.getTemporalEntityProperties(listDef, items)))

    else if (listDef.listType === 'language') return this.pipeRepoLanguageList(listDef, fkEntity)
      .pipe(map((items) => this.getTemporalEntityProperties(listDef, items)))

    else if (listDef.listType === 'place') return this.pipeRepoPlaceList(listDef, fkEntity)
      .pipe(map((items) => this.getTemporalEntityProperties(listDef, items)))

    else if (listDef.listType === 'entity-preview' || listDef.listType === 'temporal-entity') return this.pipeRepoEntityPreviewList(listDef, fkEntity)
      .pipe(map((items) => this.getTemporalEntityProperties(listDef, items)))


    else if (listDef.listType === 'time-span') return this.pipeRepoTimeSpanItem(fkEntity)
      .pipe(
        map((item) => {
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
