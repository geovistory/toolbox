
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '@kleiolab/lib-redux';
import { GvFieldPage, InfStatement, SysConfigClassCategoryBelonging, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty, sortAbc, TimePrimitivePipe, TimeSpanPipe } from '@kleiolab/lib-utils';
import { equals, flatten, uniq, values } from 'ramda';
import { combineLatest, empty, iif, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { InfSelector } from '../../../../../lib-redux/src/lib/redux-store/data/inf/inf.selectors';
import { AddMenuClassOrTypeItem } from '../models/AddMenuClassOrTypeItem';
import { ClassAndTypeNode } from '../models/ClassAndTypeNode';
import { ClassAndTypeSelectModel } from '../models/ClassAndTypeSelectModel';
import { FieldPage } from '../models/FieldPage';
import { GvFieldTargets } from '../models/FieldTargets';
import { PropertyOption } from '../models/PropertyOption';
import { PropertySelectModel } from '../models/PropertySelectModel';
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

  /**
   * Pipes the label of given entity
   * This will use entity previews for getting strings of related temporal entities
   * So this may take a little while
   */
  pipeLabelOfEntity(fkEntity: number): Observable<string> {
    return this.p.streamEntityPreview(fkEntity).pipe(map(p => p.entity_label))
  }


  /**
   * Pipes the class label of given entity
   */
  pipeClassLabelOfEntity(fkEntity: number): Observable<string> {
    return this.b.pipeClassOfEntity(fkEntity).pipe(
      switchMap(pkClass => this.c.pipeClassLabel(pkClass))
    )
  }

  /**
   * Pipes the pk_entity of the type of an entity
   */
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

  pipeClassesAndTypesOfClasses(classes: number[]) {
    const obs$ = this.c.pipeTypeAndTypedClassesOfTypedClasses(classes).pipe(
      switchMap(items => this.pipeClassAndTypeNodes(items)),
    )
    return this.cache('pipeClassesAndTypesOfClasses', obs$, ...arguments)
  }

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

