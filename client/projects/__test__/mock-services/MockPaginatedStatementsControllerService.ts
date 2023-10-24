import { GvFieldPageReq, GvPaginationObject } from '@kleiolab/lib-sdk-lb4';
import { GvPaginationObjectMock } from 'projects/__test__/data/auto-gen/api-responses/GvPaginationObjectMock';
import { values } from 'ramda';
import { Observable, of } from 'rxjs';
export class MockPaginatedStatementsControllerService {
  subfieldPageControllerLoadSubfieldPages(gvLoadSubfieldPageReq?: GvFieldPageReq[]): Observable<GvPaginationObject> {
    if (values(gvLoadSubfieldPageReq[0].targets)[0].appellation) {
      return of(GvPaginationObjectMock.appeTeEnHasAppeVt);
    }
    else if (values(gvLoadSubfieldPageReq[0].targets)[0].place) {
      return of(GvPaginationObjectMock.madridsPresenceWasAtPlace);
    }
    else if (values(gvLoadSubfieldPageReq[0].targets)[0].nestedResource) {
      return of(GvPaginationObjectMock.personHasAppeTeEn);
    }

    else if (values(gvLoadSubfieldPageReq[0].targets)[0].dimension) {
      return of(GvPaginationObjectMock.journeyHasDuration);
    }
    else if (values(gvLoadSubfieldPageReq[0].targets)[0].langString) {
      return of(GvPaginationObjectMock.manifSingletonHasShortTitleMurderer);
    }

    else if (values(gvLoadSubfieldPageReq[0].targets)[0].language) {
      return of(GvPaginationObjectMock.appeTeEnUsedInLanguage);
    }
    else if (values(gvLoadSubfieldPageReq[0].targets)[0].timePrimitive) {
      return of(GvPaginationObjectMock.shipVoyageAtSomeTimeWithin);
    }
    // else if (values(gvLoadSubfieldPageReq[0].targets)[0].timeSpan) {
    //   return of(GvPaginationObjectMock.shipVoyageHasTimeSpan);
    // }

    throw new Error('mock not implemented for this request');

  }
}
