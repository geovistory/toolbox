import { Injectable } from '@angular/core';
import { ActiveProjectService, PropertyField, ComConfig } from 'app/core';
import { uniq, indexBy } from 'ramda';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { PropertyOption, PropertySelectModel } from '../components/property-select/property-select.component';
import { combineLatest, OperatorFunction } from 'rxjs';
import { ClassAndTypeSelectModel } from '../components/class-and-type-select/class-and-type-select.component';
import { propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';
import { QueryPathSegment } from '../components/col-def-editor/col-def-editor.component';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(public p: ActiveProjectService) { }


  targetClassesOfPropertyOptions() {
    return mergeMap((propertyOptions: PropertyOption[]) => this.p.crm$.pipe(
      filter(crm => !!crm),
      map((crm) => {
        if (propertyOptions === null) return null;
        return uniq((propertyOptions.map(propOption => (crm.fieldList[propOption.propertyFieldKey] as PropertyField).targetClassPk)))
      })
    ))
  }

  propertiesOfClassesAndTypes(level?: number) {
    return switchMap((classesAndTypes: ClassAndTypeSelectModel) => combineLatest(this.p.crm$, this.p.typesByPk$).pipe(
      filter(([crm, typesByPk]) => (!!crm && !!typesByPk)),
      map(([crm, typesByPk]) => {
        const l = level;
        if (classesAndTypes === null) return null;
        const props: PropertyOption[] = []
        const classPks = indexBy((pk) => pk.toString(), classesAndTypes.classes);
        classesAndTypes.types.forEach(typePk => {
          const typedClassPk = typesByPk[typePk].fk_typed_class;
          if (typedClassPk && !classPks[typedClassPk]) {
            classPks[typedClassPk] = typedClassPk;
          }
        })

        Object.keys(classPks).forEach(pkClass => {
          const classConfig = crm.classes[pkClass];
          const uiContext = ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
          if (classConfig.uiContexts && classConfig.uiContexts[uiContext]) {
            (classConfig.uiContexts[uiContext].uiElements || []).forEach(ele => {
              if (ele.propertyFieldKey) {
                props.push({
                  propertyFieldKey: ele.propertyFieldKey,
                  isOutgoing: ele.property_is_outgoing,
                  pk: ele.fk_property,
                  label: classConfig.propertyFields[ele.propertyFieldKey].label.default
                })
              }
            })
          }
        })

        // add sorting here

        return props
      })
    ))
  }

  propertyModelToPropertyOptions(model: PropertySelectModel): PropertyOption[] {
    return [
      ...((model || {}).ingoingProperties || []).map((pk) => ({
        propertyFieldKey: propertyFieldKeyFromParams(pk, false),
        isOutgoing: false,
        label: '',
        pk: pk
      })),
      ...((model || {}).outgoingProperties || []).map((pk) => ({
        propertyFieldKey: propertyFieldKeyFromParams(pk, true),
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
}
