import { Injectable } from '@angular/core';
import { ActiveProjectService, U } from 'app/core';
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

}
