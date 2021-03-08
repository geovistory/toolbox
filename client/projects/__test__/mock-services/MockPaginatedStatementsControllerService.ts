import { GvLoadSubfieldPageReq, GvPaginationObject } from '@kleiolab/lib-sdk-lb4';
import { GvPaginationObjectMock } from 'projects/__test__/data/auto-gen/api-responses/GvPaginationObjectMock';
import { BehaviorSubject, Observable } from 'rxjs';
export class MockPaginatedStatementsControllerService {
  subfieldPageControllerLoadSubfieldPage(gvLoadSubfieldPageReq?: GvLoadSubfieldPageReq): Observable<GvPaginationObject> {
    if (gvLoadSubfieldPageReq.subfieldType.appellation) {
      return new BehaviorSubject(GvPaginationObjectMock.appeTeEnHasAppeVt);
    }
    else if (gvLoadSubfieldPageReq.subfieldType.place) {
      return new BehaviorSubject(GvPaginationObjectMock.madridsPresenceWasAtPlace);
    }
    else if (gvLoadSubfieldPageReq.subfieldType.temporalEntity) {
      return new BehaviorSubject(GvPaginationObjectMock.personHasAppeTeEn);
    }

    else if (gvLoadSubfieldPageReq.subfieldType.dimension) {
      return new BehaviorSubject(GvPaginationObjectMock.journeyHasDuration);
    }
    else if (gvLoadSubfieldPageReq.subfieldType.langString) {
      return new BehaviorSubject(GvPaginationObjectMock.manifSingletonHasShortTitleMurderer);
    }

    else if (gvLoadSubfieldPageReq.subfieldType.language) {
      return new BehaviorSubject(GvPaginationObjectMock.appeTeEnUsedInLanguage);
    }
    else if (gvLoadSubfieldPageReq.subfieldType.timePrimitive) {
      return new BehaviorSubject(GvPaginationObjectMock.shipVoyageAtSomeTimeWithin);
    }
    else if (gvLoadSubfieldPageReq.subfieldType.timeSpan) {
      return new BehaviorSubject(GvPaginationObjectMock.shipVoyageHasTimeSpan);
    }

    throw new Error('mock not implemented for this request');

  }
}
