import { Injectable } from '@angular/core';
import { U } from 'app/core';
import { ActiveProjectService } from 'app/core/active-project/active-project.service';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryPathSegment } from '../../../../../../src/common/interfaces';
import { PropertyOption, PropertySelectModel } from '../components/property-select/property-select.component';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(public p: ActiveProjectService) { }


  // targetClassesOfPropertyOptions() {
  //   return mergeMap((propertyOptions: PropertyOption[]) => this.p.crm$.pipe(
  //     filter(crm => !!crm),
  //     map((crm) => {
  //       if (propertyOptions === null) return null;
  //       return uniq((propertyOptions.map(propOption => (crm.fieldList[propOption.propertyFieldKey] as PropertyField).targetClassPk)))
  //     })
  //   ))
  // }

  // propertiesOfClassesAndTypes(level?: number) {
  //   return switchMap((classesAndTypes: ClassAndTypeSelectModel) => combineLatest(this.p.crm$, this.p.typesByPk$).pipe(
  //     filter(([crm, typesByPk]) => (!!crm && !!typesByPk)),
  //     map(([crm, typesByPk]) => {
  //       const l = level;
  //       if (classesAndTypes === null) return null;
  //       const props: PropertyOption[] = []
  //       const classPks = indexBy((pk) => pk.toString(), classesAndTypes.classes);
  //       classesAndTypes.types.forEach(typePk => {
  //         const typedClassPk = typesByPk[typePk].fk_typed_class;
  //         if (typedClassPk && !classPks[typedClassPk]) {
  //           classPks[typedClassPk] = typedClassPk;
  //         }
  //       })

  //       Object.keys(classPks).forEach(pkClass => {
  //         const classConfig = crm.classes[pkClass];
  //         const uiContext = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
  //         if (classConfig.uiContexts && classConfig.uiContexts[uiContext]) {
  //           (classConfig.uiContexts[uiContext].uiElements || []).forEach(ele => {
  //             if (ele.propertyFieldKey) {
  //               props.push({
  //                 propertyFieldKey: ele.propertyFieldKey,
  //                 isOutgoing: ele.property_is_outgoing,
  //                 pk: ele.fk_property,
  //                 label: classConfig.propertyFields[ele.propertyFieldKey].label.default
  //               })
  //             }
  //           })
  //         }
  //       })

  //       // add sorting here

  //       return props
  //     })
  //   ))
  // }

  // classesFromClassesAndTypes() {
  //   return switchMap((classesAndTypes: ClassAndTypeSelectModel) => combineLatest(this.p.crm$, this.p.typesByPk$).pipe(
  //     filter(([crm, typesByPk]) => (!!crm && !!typesByPk)),
  //     map(([crm, typesByPk]) => {
  //       if (classesAndTypes === null) return null;
  //       const classPks = indexBy((pk) => pk.toString(), classesAndTypes.classes);
  //       classesAndTypes.types.forEach(typePk => {
  //         const typedClassPk = typesByPk[typePk].fk_typed_class;
  //         if (typedClassPk && !classPks[typedClassPk]) {
  //           classPks[typedClassPk] = typedClassPk;
  //         }
  //       })
  //       return values(classPks)
  //     })
  //   ))
  // }

  propertyModelToPropertyOptions(model: PropertySelectModel): PropertyOption[] {
    return [
      ...((model || {}).ingoingProperties || []).map((pk) => ({
        propertyFieldKey: U.propertyFieldKeyFromParams(pk, false),
        isOutgoing: false,
        label: '',
        pk: pk
      })),
      ...((model || {}).outgoingProperties || []).map((pk) => ({
        propertyFieldKey: U.propertyFieldKeyFromParams(pk, true),
        isOutgoing: true,
        label: '',
        pk: pk
      }))
    ]
  }

  pathSegmentIsE93Presence(s: QueryPathSegment): boolean {

    if (!s || !s.data) return false;

    const classes = s.data.classes || [];
    const types = s.data.types || [];

    const presences = classes.filter(pk => (pk === DfhConfig.CLASS_PK_PRESENCE));
    const noTypes = (!types || !types.length);

    // if all selected classes are E93 Presence and no types are selected
    if (presences.length > 0 && presences.length === classes.length && noTypes) {
      return true
    }

    return false;
  }

  pathSegmentIsGeo$(segment$: Observable<QueryPathSegment>): Observable<boolean> {
    return segment$.pipe(map(s => this.pathSegmentIsGeo(s)))
  }

  pathSegmentIsGeo(s: QueryPathSegment): boolean {
    const geo1 = DfhConfig.CLASS_PK_GEOGRAPHICAL_PLACE
    const geo2 = DfhConfig.CLASS_PK_BUILT_WORK
    const geoClasses = { [geo1]: geo1, [geo2]: geo2 }

    if (!s || !s.data) return false;

    const classes = s.data.classes || [];

    const presences = classes.filter(pk => (!!geoClasses[pk]));

    // if all selected classes are E93 Presence and no types are selected
    if (presences.length > 0 && presences.length === classes.length) {
      return true
    }

    return false;
  }

  /**
   * returns an Observable emitting true if all defined classes are temporal
   * in the sense of being stored in temporal_entity table. As an effect,
   * E93 Presence is also regarded as temporal, although is no subclass of E2 Temporal Entity
   */
  // pathSegmentIsTemporal$(segment$: Observable<QueryPathSegment>): Observable<boolean> {

  //   return combineLatest(segment$, this.p.crm$).pipe(
  //     filter(([s, crm]) => (!!crm && !!crm.classes)),
  //     map(([s, crm]) => this.pathSegmentIsTemporal(s, crm))
  //   )
  // }

  // pathSegmentIsTemporal(s: QueryPathSegment, crm: ProjectCrm): boolean {

  //   if (!s || !s.data) return false;
  //   const classes = s.data.classes || [];

  //   const temporal = classes.filter(pk => (
  //     crm.classes[pk] && crm.classes[pk].subclassOf === 'teEnt'
  //   ));

  //   // if all selected classes are temporal
  //   if (temporal.length > 0 && temporal.length === classes.length) {
  //     return true
  //   }

  //   return false;
  // }


  /**
   * Operator function returning true if all defined classes are temporal
   * in the sense of being stored in temporal_entity table. As an effect,
   * E93 Presence is also regarded as temporal, although is no subclass of E2 Temporal Entity
   */
  // classesAreTemporal() {

  //   return switchMap((classes: number[]) => this.p.crm$.pipe(
  //     filter((crm) => (!!crm && !!crm.classes)),
  //     map((crm) => {

  //       if (!classes || !classes.length) return false;

  //       const temporal = classes.filter(pk => (
  //         crm.classes[pk] && crm.classes[pk].subclassOf === 'teEnt'
  //       ));

  //       // if all selected classes are temporal
  //       if (temporal.length > 0 && temporal.length === classes.length) {
  //         return true
  //       }

  //       return false;
  //     })
  //   ))

  // }

  /**
   * Operator function returning true if all defined classes are temporal
   * in the sense of being stored in temporal_entity table. As an effect,
   * E93 Presence is also regarded as temporal, although is no subclass of E2 Temporal Entity
   */
  // classesAreGeo() {

  //   return map((classes: number[]) => {
  //     const geo1 = DfhConfig.CLASS_PK_GEOGRAPHICAL_PLACE
  //     const geo2 = DfhConfig.CLASS_PK_BUILT_WORK
  //     const geoClasses = { [geo1]: geo1, [geo2]: geo2 }

  //     if (!classes || !classes.length) return false;

  //     const presences = classes.filter(pk => (!!geoClasses[pk]));

  //     // if all selected classes are E93 Presence and no types are selected
  //     if (presences.length > 0 && presences.length === classes.length) {
  //       return true
  //     }

  //     return false;
  //   })

  // }


}
