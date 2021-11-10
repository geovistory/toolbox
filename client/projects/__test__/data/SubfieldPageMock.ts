import { SubfieldPage } from 'projects/lib-queries/src/lib/queries/models/StatementWithTarget';
import { StatementWithTargetMock } from './StatementWithTargetMock';

export namespace SubfieldPageMock {
  export const appeTeEnHasAppe: SubfieldPage = {
    count: 1,
    statements: [StatementWithTargetMock.appeTeEnHasAppeVtWithTarget]
  }
  export const person1HasAppeTeEn: SubfieldPage = {
    count: 1,
    statements: [StatementWithTargetMock.person1HasAppeTeEnWithTarget]
  }

  export const madridsPresenceWasAtPlace: SubfieldPage = {
    count: 1,
    statements: [StatementWithTargetMock.madridsPresenceWasAtPlace]
  }

  export const journyeHasDuration: SubfieldPage = {
    count: 1,
    statements: [StatementWithTargetMock.journeyHasDuration]
  }

  export const manifSingletonHasShortTitleMurderer: SubfieldPage = {
    count: 1,
    statements: [StatementWithTargetMock.manifSingletonHasShortTitleMurderer]
  }

  export const appeTeEnUsedInLanguage: SubfieldPage = {
    count: 1,
    statements: [StatementWithTargetMock.appeTeEnUsedInLanguage]
  }
  export const shipVoyageAtSomeTimeWithin: SubfieldPage = {
    count: 1,
    statements: [StatementWithTargetMock.shipVoyageAtSomeTimeWithin]
  }

  // export const shipVoyageHasTimeSpan: SubfieldPage = {
  //   count: 1,
  //   statements: [StatementWithTargetMock.shipVoyageHasTimeSpan]
  // }

}
