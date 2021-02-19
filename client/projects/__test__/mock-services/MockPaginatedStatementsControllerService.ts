import { GvLoadSubfieldPageReq, GvPaginationObject } from '@kleiolab/lib-sdk-lb4';
import { GvPaginationObjectMock } from 'projects/__test__/data/GvPaginationObjectMock';
import { BehaviorSubject, Observable } from 'rxjs';
export class MockPaginatedStatementsControllerService {
  paginatedStatementsControllerLoadSubfieldPage(gvLoadSubfieldPageReq?: GvLoadSubfieldPageReq): Observable<GvPaginationObject> {
    if (gvLoadSubfieldPageReq.subfieldType.appellation) {
      return new BehaviorSubject(GvPaginationObjectMock.appeTeEnHasAppeVt);
    }
    else if (gvLoadSubfieldPageReq.subfieldType.temporalEntity) {
      return new BehaviorSubject(GvPaginationObjectMock.personHasAppeTeEn);
    }

    throw new Error('mock not implemented for this request');

  }
}
