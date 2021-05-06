import { GvFieldPageReq, GvPaginationObject } from '@kleiolab/lib-sdk-lb4';
import { GvPaginationObjectMock } from 'projects/__test__/data/auto-gen/api-responses/GvPaginationObjectMock';
import { values } from 'ramda';
import { BehaviorSubject, Observable } from 'rxjs';
export class MockPaginatedStatementsControllerService {
  subfieldPageControllerLoadSubfieldPage(gvLoadSubfieldPageReq?: GvFieldPageReq): Observable<GvPaginationObject> {
    if (values(gvLoadSubfieldPageReq.targets)[0].appellation) {
      return new BehaviorSubject(GvPaginationObjectMock.appeTeEnHasAppeVt);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].place) {
      return new BehaviorSubject(GvPaginationObjectMock.madridsPresenceWasAtPlace);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].nestedResource) {
      return new BehaviorSubject(GvPaginationObjectMock.personHasAppeTeEn);
    }

    else if (values(gvLoadSubfieldPageReq.targets)[0].dimension) {
      return new BehaviorSubject(GvPaginationObjectMock.journeyHasDuration);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].langString) {
      return new BehaviorSubject(GvPaginationObjectMock.manifSingletonHasShortTitleMurderer);
    }

    else if (values(gvLoadSubfieldPageReq.targets)[0].language) {
      return new BehaviorSubject(GvPaginationObjectMock.appeTeEnUsedInLanguage);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].timePrimitive) {
      return new BehaviorSubject(GvPaginationObjectMock.shipVoyageAtSomeTimeWithin);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].timeSpan) {
      return new BehaviorSubject(GvPaginationObjectMock.shipVoyageHasTimeSpan);
    }

    throw new Error('mock not implemented for this request');

  }
}
