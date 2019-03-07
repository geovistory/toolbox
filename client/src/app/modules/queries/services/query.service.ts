import { Injectable } from '@angular/core';
import { ActiveProjectService, PropertyField, ComConfig } from 'app/core';
import { uniq, indexBy } from 'ramda';
import { filter, map, mergeMap } from 'rxjs/operators';
import { PropertyOption } from '../components/property-select/property-select.component';
import { ClassesAndTypes } from '../components/class-and-type-filter/class-and-type-filter.component';
import { combineLatest } from 'rxjs';

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

  propertiesOfClassesAndTypes() {
    return mergeMap((classesAndTypes: ClassesAndTypes) => combineLatest(this.p.crm$, this.p.typesByPk$).pipe(
      filter(([crm, typesByPk]) => (!!crm && !!typesByPk)),
      map(([crm, typesByPk]) => {
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
}
