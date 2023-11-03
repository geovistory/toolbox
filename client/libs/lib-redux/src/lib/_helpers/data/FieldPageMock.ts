import { FieldPage } from '../../queries/configuration/models/FieldPage';
import { StatementWithTargetMock } from './StatementWithTargetMock';

export const appeTeEnHasAppe: FieldPage = {
  count: 1,
  statements: [StatementWithTargetMock.appeTeEnHasAppeVtWithTarget]
}
export const person1HasAppeTeEn: FieldPage = {
  count: 1,
  statements: [StatementWithTargetMock.person1HasAppeTeEnWithTarget]
}

export const madridsPresenceWasAtPlace: FieldPage = {
  count: 1,
  statements: [StatementWithTargetMock.madridsPresenceWasAtPlace]
}

export const journyeHasDuration: FieldPage = {
  count: 1,
  statements: [StatementWithTargetMock.journeyHasDuration]
}

export const manifSingletonHasShortTitleMurderer: FieldPage = {
  count: 1,
  statements: [StatementWithTargetMock.manifSingletonHasShortTitleMurderer]
}

export const appeTeEnUsedInLanguage: FieldPage = {
  count: 1,
  statements: [StatementWithTargetMock.appeTeEnUsedInLanguage]
}
export const shipVoyageAtSomeTimeWithin: FieldPage = {
  count: 1,
  statements: [StatementWithTargetMock.shipVoyageAtSomeTimeWithin]
}


export const FieldPageMock = {
  appeTeEnHasAppe,
  person1HasAppeTeEn,
  madridsPresenceWasAtPlace,
  journyeHasDuration,
  manifSingletonHasShortTitleMurderer,
  appeTeEnUsedInLanguage,
  shipVoyageAtSomeTimeWithin
}
