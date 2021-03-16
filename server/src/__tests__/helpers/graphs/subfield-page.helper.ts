import {createInfAppellation} from '../atomic/inf-appellation.helper';
import {createInfLanguage} from '../atomic/inf-language.helper';
import {createInfStatement} from '../atomic/inf-statement.helper';
import {createProInfoProjRel} from '../atomic/pro-info-proj-rel.helper';
import {InfAppellationMock} from '../data/gvDB/InfAppellationMock';
import {InfLanguageMock} from '../data/gvDB/InfLanguageMock';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';
import {ProInfoProjRelMock} from '../data/gvDB/ProInfoProjRelMock';
import {addAccountToProject, createAccountVerified} from '../generic/account.helper';
import {createProject1} from './project.helper';
import {InfPlaceMock} from '../data/gvDB/InfPlaceMock';
import {createInfPlace} from '../atomic/inf-place.helper';
import {InfDimensionMock} from '../data/gvDB/InfDimensionMock';
import {createInfDimension} from '../atomic/inf-dimension.helper';
import {createWarEntityPreview} from '../atomic/war-entity-preview.helper';
import {WarEntityPreviewMock} from '../data/gvDB/WarEntityPreviewMock';
import {createInfLangString} from '../atomic/inf-lang-string.helper';
import {InfLangStringMock} from '../data/gvDB/InfLangStringMock';
import {InfTimePrimitiveMock} from '../data/gvDB/InfTimePrimitiveMock';
import {createInfTimePrimitive} from '../atomic/inf-time-primitive.helper';
import {createInfPersistentItem} from '../atomic/inf-persistent-item.helper';
import {createInfTemporalEntity} from '../atomic/inf-temporal-entity.helper';
import {InfTemporalEntityMock} from '../data/gvDB/InfTemporalEntityMock';
import {InfPersistentItemMock} from '../data/gvDB/InfPersistentItemMock';

/**
 * mock data for testing subgield page queries
 */
export namespace SubfieldHelper {
  // Data to test subfield-page-query for AppeTeEn->refers to name->Appellation
  export async function appeTeEnRefersToName() {
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
    await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
  }

  // Data to test subfield-page-query for AppeTeEn->refers to name->Language
  export async function appeTeEnUsedInLanguage() {
    await createInfStatement(InfStatementMock.NAME_1_TO_LANG)
    await createInfLanguage(InfLanguageMock.ENGLISH)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_LANG)
  }

  // Data to test subfield-page-query for AppeTeEn->is appe. for lang. of->Person
  export async function appeTeEnIsAppeOfPerson() {
    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
    await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    await createWarEntityPreview(WarEntityPreviewMock.PERSON_1)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)
  }


  // Data to test subfield-page-query for Presence->was at->Place
  export async function madridsPresenceWasAtPlace() {
    await createInfStatement(InfStatementMock.MADRIDS_PRESENCE_WAS_AT_PLACE_123)
    await createInfPlace(InfPlaceMock.PLACE_123)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_MADRIDS_PRESENCE_WAS_AT_PLACE_123)
  }

  // Data to test subfield-page-query for Journey->has duration->Duration
  export async function journeyHasDuration() {
    await createInfStatement(InfStatementMock.ACCOUNT_OF_JOURNEY_HAS_DURATION)
    await createInfPersistentItem(InfPersistentItemMock.TIME_UNIT_MONTH)
    await createInfDimension(InfDimensionMock.ONE_MONTH)
    await createWarEntityPreview(WarEntityPreviewMock.TIME_UNIT_ONE_MONTH)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_ACCOUNT_OF_JOURNEY_HAS_DURATION)
  }

  // Data to test subfield-page-query for Man.singleton->has short title->ShortTitle
  export async function manifSingletonHasShortTitleMurderer() {
    await createInfLanguage(InfLanguageMock.ENGLISH)
    await createInfStatement(InfStatementMock.MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER)
    await createInfLangString(InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_MANIF_SINGLETON_HAS_SHORT_TITLE_MURDERER)
  }

  // Data to test subfield-page-query for ShipVoyage->at some time within->TimePrimitive
  export async function shipVoyageAtSomeTimeWithin() {
    await createInfStatement(InfStatementMock.SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2)
    await createInfTimePrimitive(InfTimePrimitiveMock.TP_2)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_AT_SOME_TIME_WITHIN_TP_2)
  }

  // Data to test subfield-page-query for ShipVoyage->begin of begin->TimePrimitive
  //                                                ->begin of end  ->TimePrimitive
  export async function shipVoyageHasTimeSpan() {
    await createInfStatement(InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4)
    await createInfStatement(InfStatementMock.SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5)
    await createInfTimePrimitive(InfTimePrimitiveMock.TP_4)
    await createInfTimePrimitive(InfTimePrimitiveMock.TP_5)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_END_TP_4)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_SHIP_VOYAGE_BEGIN_OF_THE_BEGIN_TP_5)
  }

  // Data to test subfield-page-query for          Person -> has appellation -> AppellationTeEn
  //                                      AppellationTeEn -> refers to name  -> appellation
  export async function personHasAppeTeEn() {
    await createInfStatement(InfStatementMock.NAME_1_TO_PERSON)
    await createInfStatement(InfStatementMock.NAME_1_TO_APPE)
    await createInfPersistentItem(InfPersistentItemMock.PERSON_1)
    await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1)
    await createInfAppellation(InfAppellationMock.JACK_THE_FOO)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_APPE)
    await createProInfoProjRel(ProInfoProjRelMock.PROJ_1_STMT_NAME_1_TO_PERSON)
  }

  export async function makeProject1() {
    const accountId = await createAccountVerified('gaetan.muck@kleiolab.ch', 'testtest1');
    await createInfLanguage(InfLanguageMock.GERMAN);
    const {project1} = await createProject1();
    await addAccountToProject(accountId, project1.pk_entity);
    return project1
  }
}



