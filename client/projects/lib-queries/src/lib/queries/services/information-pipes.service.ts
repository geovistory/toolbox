
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '@kleiolab/lib-redux';
import { GvFieldPage, InfStatement, SysConfigClassCategoryBelonging, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty, sortAbc, TimePrimitivePipe, TimeSpanPipe } from '@kleiolab/lib-utils';
import { equals, flatten, uniq, values } from 'ramda';
import { combineLatest, empty, iif, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { spyTag } from '../decorators/method-decorators';
import { AddMenuClassOrTypeItem } from '../models/AddMenuClassOrTypeItem';
import { ClassAndTypeNode } from '../models/ClassAndTypeNode';
import { ClassAndTypeSelectModel } from '../models/ClassAndTypeSelectModel';
import { FieldPage } from '../models/FieldPage';
import { GvFieldTargets } from '../models/FieldTargets';
import { PropertyOption } from '../models/PropertyOption';
import { PropertySelectModel } from '../models/PropertySelectModel';
import { InfSelector } from '../selectors/inf.service';
import { ActiveProjectPipesService } from './active-project-pipes.service';
import { AddMenuClassItem, ConfigurationPipesService, HasTypePropertyInfo } from './configuration-pipes.service';
import { InformationBasicPipesService } from './information-basic-pipes.service';
import { PipeCache } from './PipeCache';
import { SchemaSelectorsService } from './schema-selectors.service';







@Injectable({
  providedIn: 'root'
})
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
export class InformationPipesService extends PipeCache<InformationPipesService> {

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
    super()
    this.infRepo = new InfSelector(ngRedux, of('repo'))
  }


  // /**
  //  * pipe the project relation of given statment, if the scope of this page is inProject
  //  * @param stmt InfStatement to be completed with projRel
  //  * @param page page for which we are piping this stuff
  //  */
  // pipeProjRelOfStatement(stmt: InfStatement, page: GvFieldPage): Observable<StatementProjRel> {
  //   if (page.scope.inProject) {
  //     return this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$
  //       .key(page.scope.inProject + '_' + stmt.pk_entity).pipe(
  //         map(
  //           projRel => ({
  //             projRel,
  //             ordNum: page.isOutgoing ? projRel.ord_num_of_range : projRel.ord_num_of_domain
  //           })
  //         )
  //       )
  //   } else {
  //     return new BehaviorSubject({
  //       projRel: undefined,
  //       ordNum: 0
  //     })
  //   }
  // }
  // /**
  //  * pipe the target of given statment
  //  * @param stmt InfStatement to be completed with target
  //  * @param page page for which we are piping this stuff
  //  * @param subfieldType type of subfield for which we pipe this stuff
  //  */
  // pipeTargetOfStatement(stmt: InfStatement, page: GvFieldPage, targets: GvFieldTargets): Observable<StatementTarget> {
  //   const isOutgoing = page.isOutgoing
  //   const targetInfo = isOutgoing ? stmt.fk_object_info : stmt.fk_subject_info;
  //   // here you could add targetData or targetCell


  //   return this.s.inf$.getModelOfEntity$(targetInfo).pipe(
  //     filter(x => !!x),
  //     switchMap(item => {
  //       const subfieldType: GvFieldTargetViewType = targets[item.fkClass]
  //       if (subfieldType.appellation) {
  //         return this.s.inf$.appellation$.by_pk_entity$.key(targetInfo).pipe(
  //           filter(x => !!x),
  //           map(appellation => {
  //             const stmtTarget: StatementTarget = {
  //               statement: stmt,
  //               isOutgoing,
  //               targetLabel: appellation.string,
  //               targetClass: appellation.fk_class,
  //               target: {
  //                 appellation
  //               }
  //             }
  //             return stmtTarget
  //           })
  //         )
  //       }
  //       else if (subfieldType.place) {
  //         return this.s.inf$.place$.by_pk_entity$.key(targetInfo).pipe(
  //           filter(x => !!x),
  //           map(place => {
  //             const stmtTarget: StatementTarget = {
  //               statement: stmt,
  //               isOutgoing,
  //               targetLabel: `WGS84: ${place.lat}°, ${place.long}°`,
  //               targetClass: place.fk_class,
  //               target: {
  //                 place
  //               }
  //             }
  //             return stmtTarget
  //           })
  //         )
  //       }
  //       else if (subfieldType.dimension) {
  //         return this.s.inf$.dimension$.by_pk_entity$.key(targetInfo).pipe(
  //           filter(x => !!x),
  //           switchMap(dimension => {
  //             return this.p.streamEntityPreview(dimension.fk_measurement_unit)
  //               .pipe(
  //                 map(
  //                   unitPreview => {
  //                     const stmtTarget: StatementTarget = {
  //                       statement: stmt,
  //                       isOutgoing,
  //                       targetLabel: `${dimension.numeric_value} ${unitPreview.entity_label}`,
  //                       targetClass: dimension.fk_class,
  //                       target: {
  //                         dimension
  //                       }
  //                     }
  //                     return stmtTarget

  //                   }
  //                 )
  //               )
  //           })
  //         )
  //       }
  //       else if (subfieldType.langString) {
  //         return this.s.inf$.lang_string$.by_pk_entity$.key(targetInfo).pipe(
  //           filter(x => !!x),
  //           switchMap(langString => {
  //             return this.s.inf$.language$.by_pk_entity$.key(langString.fk_language)
  //               .pipe(
  //                 map(
  //                   language => {
  //                     const stmtTarget: StatementTarget = {
  //                       statement: stmt,
  //                       isOutgoing,
  //                       targetLabel: `${langString.string} (${language.iso6391})`,
  //                       targetClass: langString.fk_class,
  //                       target: {
  //                         langString
  //                       }
  //                     }
  //                     return stmtTarget

  //                   }
  //                 )
  //               )
  //           })
  //         )
  //       }
  //       else if (subfieldType.language) {
  //         return this.s.inf$.language$.by_pk_entity$.key(targetInfo).pipe(
  //           filter(x => !!x),
  //           map(language => {
  //             const stmtTarget: StatementTarget = {
  //               statement: stmt,
  //               isOutgoing,
  //               targetLabel: `${language.notes || language.iso6391}`,
  //               targetClass: language.fk_class,
  //               target: {
  //                 language
  //               }
  //             }
  //             return stmtTarget
  //           })
  //         )
  //       }
  //       else if (subfieldType.entityPreview || subfieldType.typeItem) {
  //         return this.p.streamEntityPreview(targetInfo).pipe(
  //           filter(x => !!x),
  //           map(entityPreview => {
  //             const stmtTarget: StatementTarget = {
  //               statement: stmt,
  //               isOutgoing,
  //               targetLabel: `${entityPreview.entity_label}`,
  //               targetClass: entityPreview.fk_class,
  //               target: {
  //                 entityPreview
  //               }
  //             }
  //             return stmtTarget
  //           })
  //         )
  //       }

  //       else if (subfieldType.nestedResource) {

  //         return this.s.inf$.resource$._by_pk_entity$.key(targetInfo).pipe(
  //           filter(x => !!x),
  //           map(temporalEntity => {
  //             const stmtTarget: StatementTarget = {
  //               statement: stmt,
  //               isOutgoing,
  //               targetLabel: ``,
  //               targetClass: temporalEntity.fk_class,
  //               target: {
  //                 entity: {
  //                   pkEntity: temporalEntity.pk_entity,
  //                   fkClass: temporalEntity.fk_class
  //                 }
  //               }
  //             }
  //             return stmtTarget
  //           })
  //         )
  //       }

  //       else if (subfieldType.timePrimitive) {
  //         return this.s.inf$.time_primitive$.by_pk_entity$.key(targetInfo).pipe(
  //           filter(x => !!x),
  //           switchMap(timePrimitive => {
  //             // get calendar
  //             let cal$: Observable<TimePrimitiveWithCal.CalendarEnum>
  //             if (page.scope.inProject) {
  //               cal$ = this.s.pro$.info_proj_rel$.by_fk_project__fk_entity$.key(page.scope.inProject + '_' + stmt.pk_entity)
  //                 .pipe(
  //                   map(
  //                     infoProjRel => infoProjRel.calendar as TimePrimitiveWithCal.CalendarEnum
  //                   )
  //                 )
  //             }
  //             else {
  //               cal$ = new BehaviorSubject(stmt.community_favorite_calendar as TimePrimitiveWithCal.CalendarEnum)
  //             }
  //             // pipe target time primitive of stmt
  //             return cal$.pipe(
  //               map(
  //                 cal => {
  //                   const timePrimWithCal = infTimePrimToTimePrimWithCal(timePrimitive, cal)
  //                   const stmtTarget: StatementTarget = {
  //                     statement: stmt,
  //                     isOutgoing,
  //                     targetLabel: this.timePrimitivePipe.transform(timePrimWithCal),
  //                     targetClass: timePrimitive.fk_class,
  //                     target: {
  //                       timePrimitive: timePrimWithCal
  //                     }
  //                   }
  //                   return stmtTarget

  //                 }
  //               )
  //             )
  //           })
  //         )
  //       }

  //       throw new Error(`No implementation found for subfieldType ${JSON.stringify(subfieldType)}`);
  //     })
  //   )


  // }

  // /**
  //  * pipe target and projRel of the given statement
  //  */
  // pipeStatementWithTarget(stmt: InfStatement, page: GvFieldPage, targets: GvFieldTargets): Observable<StatementWithTarget> {

  //   return combineLatest(
  //     this.pipeTargetOfStatement(stmt, page, targets),
  //     this.pipeProjRelOfStatement(stmt, page)
  //   ).pipe(
  //     map(([target, projRel]) => ({ ...target, ...projRel }))
  //   )
  // }

  pipeFieldPage(page: GvFieldPage, targets: GvFieldTargets, isTimeSpanShortCutField: boolean): Observable<FieldPage> {
    if (isTimeSpanShortCutField) {
      // if timeSpan make a short cut: produce a virtual statementWithTarget from entity to timeSpan
      // return this.pipeTimeSpan(page)
      return of({ count: 0, statements: [] })
    }
    else {
      // get the statments of that page
      return combineLatest([
        this.s.inf$.statement$.pagination$.pipeCount(page),
        this.s.inf$.statement$.pagination$.pipePage(page)]
      ).pipe(
        map(([count, statements]) => ({ count, statements }))
      )
    }

  }

  // private pipeTimeSpan(page: GvFieldPage): Observable<GvSubfieldPageInfo[]> {
  //   const virtualStatementToTimeSpan = { fk_object_info: page.source.fkInfo };
  //   // const targets: GvFieldTargets = { [DfhConfig.ClASS_PK_TIME_SPAN]: { timeSpan: 'true' } }

  //   // console.log('subfieldType.temporalEntity.length', subfieldType.temporalEntity.length)

  //   // for each of these subfields
  //   const subentityPages$ = DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE
  //     .map(fkProperty => {

  //       // console.log('subentity subfield for targetInfo', targetInfo)

  //       // create page:GvSubfieldPage
  //       const scope = page.scope.notInProject ? { inRepo: true } : page.scope

  //       const nestedPage: GvFieldPage = {
  //         property: { fkProperty },
  //         isOutgoing: true,
  //         limit: 1,
  //         offset: 0,
  //         source: page.source,
  //         scope,
  //       }
  //       const subfType: GvFieldTargetViewType = {
  //         timePrimitive: 'true'
  //       }
  //       const trgts = {
  //         [DfhConfig.CLASS_PK_TIME_PRIMITIVE]: subfType
  //       }
  //       return this.pipeFieldPage(nestedPage, trgts, false).pipe(
  //         map(({ count, statements }) => {
  //           const subentitySubfieldPage: GvSubfieldPageInfo = {
  //             page: nestedPage,
  //             count,
  //             paginatedStatements: statements
  //           }
  //           return subentitySubfieldPage
  //         })
  //       )
  //     })
  //   return combineLatestOrEmpty(subentityPages$);


  //   // return combineLatestOrEmpty(subentityPages$)
  //   //   .pipe(
  //   //     map(
  //   //       subfields => {
  //   //         const timeSpanPreview: WarEntityPreviewTimeSpan = {}
  //   //         subfields.forEach(s => {
  //   //           if (s.paginatedStatements[0]) {
  //   //             const st = s.paginatedStatements[0]
  //   //             const key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[st.statement.fk_property]
  //   //             timeSpanPreview[key] = st.target.timePrimitive
  //   //           }
  //   //         })
  //   //         const stmtTarget: StatementWithTarget = {
  //   //           statement: virtualStatementToTimeSpan,
  //   //           isOutgoing: page.isOutgoing,
  //   //           targetLabel: this.timeSpanPipe.transform(new TimeSpanUtil(timeSpanPreview)),
  //   //           targetClass: DfhConfig.ClASS_PK_TIME_SPAN,
  //   //           target: {
  //   //             timeSpan: {
  //   //               preview: timeSpanPreview,
  //   //               subfields
  //   //             }
  //   //           }
  //   //         }
  //   //         return stmtTarget
  //   //       }
  //   //     )
  //   //   ).pipe(map(stmtTarget => {
  //   //     const stmtWT: StatementWithTarget = {
  //   //       ...stmtTarget,
  //   //       projRel: undefined,
  //   //       ordNum: undefined
  //   //     };
  //   //     return { count: 1, statements: [stmtWT] };
  //   //   }));
  // }



  /**
   * Pipes the label of given entity
   * This will use entity previews for getting strings of related temporal entities
   * So this may take a little while
   */
  // @spyTag
  pipeLabelOfEntity(fkEntity: number): Observable<string> {
    return this.p.streamEntityPreview(fkEntity).pipe(map(p => p.entity_label))
  }


  /**
   * Pipes the class label of given entity
   */
  // @spyTag
  pipeClassLabelOfEntity(fkEntity: number): Observable<string> {
    return this.b.pipeClassOfEntity(fkEntity).pipe(
      switchMap(pkClass => this.c.pipeClassLabel(pkClass))
    )
  }

  /**
   * Pipes the pk_entity of the type of an entity
   */
  // @spyTag
  pipeTypeOfEntity(pkEntity: number, hasTypeProperty: number, isOutgoing: boolean): Observable<InfStatement> {
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

  /**
   * used by add menu
   */
  pipeClassesAndTypesOfAddMenu(enabledIn: keyof SysConfigClassCategoryBelonging): Observable<AddMenuClassOrTypeItem[]> {
    const obs$ = this.c.pipeTypeAndTypedClassesShownInAddMenu(enabledIn).pipe(
      switchMap(items => this.pipeClassAndTypeOfAddMenu(items)),
    )
    return this.cache('pipeClassesAndTypesOfAddMenu', obs$, ...arguments)
  }

  pipeClassAndTypeOfAddMenu(typeAndTypedClasses: AddMenuClassItem[]): Observable<AddMenuClassOrTypeItem[]> {
    const obs$ = combineLatestOrEmpty(
      typeAndTypedClasses.map(node => iif(

        () => !!node.typeClass,

        // if we have a type class pipe types
        this.b.pipePersistentItemPksByClass(node.typeClass).pipe(
          switchMap(typePks => combineLatestOrEmpty(
            typePks.map(pkType => this.p.streamEntityPreview(pkType).pipe(
              map<WarEntityPreview, AddMenuClassOrTypeItem>(preview => ({
                label: preview.entity_label,
                data: {
                  pkClass: node.typedClass.dfhClass.pk_class,
                  pkHasTypeProperty: node.hasTypeProperty,
                  pkType
                }
              }))
            ))
          ).pipe(
            sortAbc(n => n.label),
          )),
          map(children => ({ node, children }))
        ),
        // else no children
        of({ node, children: [] }),
      ).pipe(
        map((item) => {
          const x: AddMenuClassOrTypeItem = {
            label: item.node.typedClass.classLabel,
            helpUrl: item.node.typedClass.classConfig?.docUrl,
            data: {
              pkClass: item.node.typedClass.dfhClass.pk_class,
              pkHasTypeProperty: item.node.hasTypeProperty,
            },
            children: item.children
          }
          return x
        })
      )

      )
    )

    return this.cache('pipeClassAndTypeNodes', obs$, ...arguments)

  }

  @spyTag
  // @cache({ refCount: false })
  pipeClassesAndTypesOfClasses(classes: number[]) {
    const obs$ = this.c.pipeTypeAndTypedClassesOfTypedClasses(classes).pipe(
      switchMap(items => this.pipeClassAndTypeNodes(items)),
    )
    return this.cache('pipeClassesAndTypesOfClasses', obs$, ...arguments)
  }

  // @spyTag
  // @cache({ refCount: false })
  pipeClassAndTypeNodes(typeAndTypedClasses: HasTypePropertyInfo[]): Observable<ClassAndTypeNode[]> {
    const obs$ = combineLatestOrEmpty(
      typeAndTypedClasses.map(item => this.c.pipeClassLabel(item.typedClass).pipe(
        map<string, ClassAndTypeNode>(label => ({
          label,
          data: {
            pkClass: item.typedClass,
            pkHasTypeProperty: item.hasTypeProperty,
            pkType: null
          }
        })),
        switchMap(node => iif(
          () => !!item.typeClass,
          this.b.pipePersistentItemPksByClass(item.typeClass).pipe(
            switchMap(typePks => combineLatestOrEmpty(
              typePks.map(pkType => this.p.streamEntityPreview(pkType).pipe(
                map<WarEntityPreview, ClassAndTypeNode>(preview => ({
                  label: preview.entity_label,
                  data: {
                    pkClass: item.typedClass,
                    pkHasTypeProperty: item.hasTypeProperty,
                    pkType
                  }
                }))
              ))
            ).pipe(
              sortAbc(n => n.label),
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
    )
    return this.cache('pipeClassAndTypeNodes', obs$, ...arguments)

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

  // @cache({ refCount: false })
  pipePropertyOptionsFormClasses(classes: number[]): Observable<PropertyOption[]> {
    const obs$ = combineLatestOrEmpty(classes.map(pkClass => this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(
      map(c => c.basic_type === 9),
      switchMap(isTeEn => this.c.pipeFields(pkClass)
        .pipe(
          map(classFields => classFields
            .filter(f => !!f.property.fkProperty)
            .map(f => ({
              isOutgoing: f.isOutgoing,
              sourceClass: f.sourceClass,
              pkProperty: f.property.fkProperty
            }))),
          switchMap(items => {
            // if (isTeEn) {
            //   // add time properties (at some time within, ...)
            //   DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.map(pkProperty => {
            //     items.push({
            //       pkProperty,
            //       sourceClass: pkClass,
            //       isOutgoing: true
            //     })
            //   })
            // }

            return combineLatestOrEmpty(items.map(item => this.c.pipeFieldLabel(
              item.sourceClass,
              item.isOutgoing,
              item.pkProperty,
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

    return this.cache('pipePropertyOptionsFormClasses', obs$, ...arguments)
  }

  // @cache({ refCount: false })
  pipePkClassesFromPropertySelectModel(model: PropertySelectModel): Observable<number[]> {
    const obs$ = combineLatestOrEmpty(
      [
        this.c.pipeTargetClassesOfProperties(model.outgoingProperties, true),
        this.c.pipeTargetClassesOfProperties(model.ingoingProperties, false),
      ]
    ).pipe(
      map(([out, ing]) => uniq([...out, ...ing]))
    )

    return this.cache('pipePkClassesFromPropertySelectModel', obs$, ...arguments)
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

