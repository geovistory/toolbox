import { GvFieldPage, GvFieldPageReq, GvPaginationObject, GvSubfieldPageInfo, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive, ProInfoProjRel, StatementTargetDimension, StatementTargetEntity, StatementTargeTimePrimitive, StatementTargetLangString, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { concat, keys, mergeDeepWith, values } from 'ramda';
import { Observable, of } from 'rxjs';
import { createStatementWithTarget } from '../data/auto-gen/api-responses/GvPaginationObjectMock';
import { CalendarType } from '../data/auto-gen/enums/CalendarType';
import { DfhApiClassMock } from '../data/auto-gen/gvDB/DfhApiClassMock';
import { DfhApiPropertyMock } from '../data/auto-gen/gvDB/DfhApiPropertyMock';
import { InfLanguageMock } from '../data/auto-gen/gvDB/InfLanguageMock';
import { InfResourceMock } from '../data/auto-gen/gvDB/InfResourceMock';
import { InfTimePrimitiveMock } from '../data/auto-gen/gvDB/InfTimePrimitiveMock';
import { OmitEntity } from '../data/auto-gen/gvDB/local-model.helpers';
import { ProProjectMock } from '../data/auto-gen/gvDB/ProProjectMock';
import { PubAccountMock } from '../data/auto-gen/gvDB/PubAccountMock';

/**
 * This Mock Service returns many statements targeting appellations
 * this is useful for testing pagination
 */
export class MockPaginationControllerForSandboxes {
  warEntityPreviewSerial: number;
  proInfoProjRelSerial: number;
  infStatementSerial: number;
  infTemporalEntitySerial: number;
  infAppellationSerial: number;
  infPlaceSerial: number;
  infDimensionSerial: number
  infTimePrimitiveSerial: number;

  subfieldPageControllerLoadSubfieldPages(gvLoadSubfieldPageReqs?: GvFieldPageReq[]): Observable<GvPaginationObject> {
    this.resetIdBase();
    console.log('REST API called: subfieldPageControllerLoadSubfieldPage')
    return of(this.handleRequests(gvLoadSubfieldPageReqs))

  }
  private resetIdBase() {
    this.warEntityPreviewSerial = 1000;
    this.proInfoProjRelSerial = 2000;
    this.infStatementSerial = 3000;
    this.infTemporalEntitySerial = 4000;
    this.infAppellationSerial = 5000;
    this.infPlaceSerial = 7000;
    this.infDimensionSerial = 8000;
    this.infTimePrimitiveSerial = 9000;

  }

  private increaseIdBase(amount = 100000) {
    this.warEntityPreviewSerial += amount;
    this.proInfoProjRelSerial += amount;
    this.infStatementSerial += amount;
    this.infTemporalEntitySerial += amount
    this.infAppellationSerial += amount;
    this.infPlaceSerial += amount;
    this.infDimensionSerial += amount;
    this.infTimePrimitiveSerial += amount;
  }

  handleRequests(gvLoadSubfieldPageReqs?: GvFieldPageReq[]): GvPaginationObject {
    const results = gvLoadSubfieldPageReqs.map(req => this.generateData(req))
    let result: GvPaginationObject = { subfieldPages: [] };
    for (const obj of results) {
      result = mergeDeepWith(concat, result, obj);
    }
    return result;
  }

  generateData(gvLoadSubfieldPageReq?: GvFieldPageReq): GvPaginationObject {

    // generate response with emtpy field for some properties
    if ([1842, 1499, 1429, 133, 188, 1344, 1409].includes(gvLoadSubfieldPageReq?.page?.property.fkProperty)) {
      return this.generateEmptyField(gvLoadSubfieldPageReq)
    }

    if (values(gvLoadSubfieldPageReq.targets)[0].appellation) {
      return this.generateDataForAppe(gvLoadSubfieldPageReq);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].place) {
      return this.generateDataForPlace(gvLoadSubfieldPageReq);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].dimension) {
      return this.generateDataForDimension(gvLoadSubfieldPageReq);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].langString) {
      return this.generateDataForLangString(gvLoadSubfieldPageReq);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].language) {
      return this.generateDataForLanguage(gvLoadSubfieldPageReq);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].nestedResource) {
      return this.generateDataForEntity(gvLoadSubfieldPageReq);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].entityPreview) {
      return this.generateDataForEntity(gvLoadSubfieldPageReq);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].timePrimitive) {
      return this.generateDataForTimePrimitive(gvLoadSubfieldPageReq);
    }
    throw new Error('mock not implemented for this request');

  }


  generateEmptyField(req: GvFieldPageReq) {
    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          req,
          count: 0,
          paginatedStatements: []
        }
      ]
    }
    return paginationObject
  }
  generateDataForAppe(req: GvFieldPageReq): GvPaginationObject {
    const page = req.page
    const limit = page.limit
    const offset = page.offset
    const count = 46;
    const paginatedStatements: StatementWithTarget[] = []

    for (let i = offset; i < (offset + limit); i++) {
      const appellation: OmitEntity<InfAppellation> = {
        pk_entity: this.infAppellationSerial + i,
        fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
        string: 'Jack the foo ' + (this.infAppellationSerial + i),
      }

      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.infStatementSerial + i,
        fk_subject_info: page.source.fkInfo,
        fk_property: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property,
        fk_object_info: appellation.pk_entity,
      }
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.proInfoProjRelSerial + i,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      paginatedStatements.push(
        createStatementWithTarget(statement, 1, { appellation }, page.isOutgoing, projRel)
      )
    }

    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          req,
          count: count,
          paginatedStatements
        }
      ]
    }
    return paginationObject
  }


  generateDataForPlace(req: GvFieldPageReq): GvPaginationObject {
    const page = req.page
    const limit = page.limit
    const offset = page.offset
    const count = 46;
    const paginatedStatements: StatementWithTarget[] = []
    const statements: OmitEntity<InfStatement>[] = []
    const places: OmitEntity<InfPlace>[] = []

    for (let i = offset; i < (offset + limit); i++) {
      const place: OmitEntity<InfPlace> = {
        pk_entity: this.infPlaceSerial + i,
        fk_class: DfhApiClassMock.EN_51_PLACE.dfh_pk_class,
        lat: i + 1,
        long: 47.1221
      }
      places.push(place)

      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.infStatementSerial + i,
        fk_subject_info: page.source.fkInfo,
        fk_property: DfhApiPropertyMock.EN_148_WAS_AT.dfh_pk_property,
        fk_object_info: place.pk_entity,
      }
      statements.push(statement)
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.proInfoProjRelSerial + i,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      paginatedStatements.push(createStatementWithTarget(statement, 1, { place }, page.isOutgoing, projRel))
    }


    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          req,
          count: count,
          paginatedStatements
        }
      ]
    }
    return paginationObject
  }


  generateDataForTimePrimitive(req: GvFieldPageReq): GvPaginationObject {
    const page = req.page
    const limit = page.limit
    const offset = page.offset
    const count = 46;
    const paginatedStatements: StatementWithTarget[] = []
    function isOdd(num: number) { return num % 2; }
    for (let i = offset; i < (offset + limit); i++) {
      const tp = isOdd(i) ? InfTimePrimitiveMock.TP_1 : InfTimePrimitiveMock.TP_2;
      const infTimePrimitive: OmitEntity<InfTimePrimitive> = {
        ...tp,
        pk_entity: this.infTimePrimitiveSerial + i,

      }
      const timePrimitive: StatementTargeTimePrimitive = {
        infTimePrimitive,
        timePrimitive: {
          julianDay: infTimePrimitive.julian_day,
          duration: infTimePrimitive.duration,
          calendar: CalendarType.gregorian
        }
      }
      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.infStatementSerial + i,
        fk_subject_info: page.source.fkInfo,
        fk_property: page.property.fkProperty,
        fk_object_info: infTimePrimitive.pk_entity,
      }
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.proInfoProjRelSerial + i,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      paginatedStatements.push(createStatementWithTarget(statement, 1, { timePrimitive }, page.isOutgoing, projRel))
    }


    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          req,
          count: count,
          paginatedStatements
        }
      ]
    }
    return paginationObject
  }

  generateDataForDimension(req: GvFieldPageReq): GvPaginationObject {
    const page = req.page
    const limit = page.limit
    const offset = page.offset
    const count = 46;
    const paginatedStatements: StatementWithTarget[] = []


    for (let i = offset; i < (offset + limit); i++) {
      const infDimension: OmitEntity<InfDimension> = {
        pk_entity: this.infDimensionSerial + i,
        fk_class: DfhApiClassMock.EN_689_DURATION.dfh_pk_class,
        numeric_value: i + 1,
        fk_measurement_unit: InfResourceMock.TIME_UNIT_MONTH.pk_entity
      }
      const dimension: StatementTargetDimension = {
        dimension: infDimension,
      }

      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.infStatementSerial + i,
        fk_subject_info: page.source.fkInfo,
        fk_property: DfhApiPropertyMock.EN_1613_HAS_DURATION.dfh_pk_property,
        fk_object_info: infDimension.pk_entity,
      }
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.proInfoProjRelSerial + i,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      paginatedStatements.push(createStatementWithTarget(statement, 1, { dimension }, page.isOutgoing, projRel))
    }


    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          req,
          count: count,
          paginatedStatements
        }
      ]
    }
    return paginationObject
  }

  generateDataForLangString(req: GvFieldPageReq): GvPaginationObject {
    const page = req.page
    const limit = page.limit
    const offset = page.offset
    const count = 46;
    const paginatedStatements: StatementWithTarget[] = []

    for (let i = offset; i < (offset + limit); i++) {
      const infLangString: OmitEntity<InfLangString> = {
        pk_entity: 9000 + i,
        fk_class: DfhApiClassMock.EN_689_DURATION.dfh_pk_class,
        fk_language: InfLanguageMock.ENGLISH.pk_entity,
        string: `«The Murderer» ${i + 1}`
      }

      const langString: StatementTargetLangString = {
        langString: infLangString,
        language: InfLanguageMock.ENGLISH
      }
      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.infStatementSerial + i,
        fk_subject_info: page.source.fkInfo,
        fk_property: DfhApiPropertyMock.EN_1761_MANIFESTATION_SINGLETON_HAS_SHORT_TITLE.dfh_pk_property,
        fk_object_info: infLangString.pk_entity,
      }
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.proInfoProjRelSerial + i,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      paginatedStatements.push(createStatementWithTarget(statement, 1, { langString }, page.isOutgoing, projRel))
    }


    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          req,
          count: count,
          paginatedStatements
        }
      ],

    }
    return paginationObject
  }

  generateDataForLanguage(req: GvFieldPageReq): GvPaginationObject {
    const page = req.page
    const limit = page.limit
    const offset = page.offset
    const count = 46;
    const paginatedStatements: StatementWithTarget[] = []

    for (let i = offset; i < (offset + limit); i++) {
      const language: OmitEntity<InfLanguage> = {
        pk_entity: 99000 + i,
        fk_class: DfhApiClassMock.EN_54_LANGUAGE.dfh_pk_class,
        notes: `Language ${i + 1}`,
        iso6391: `L${i + 1}`
      }

      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.infStatementSerial + i,
        fk_subject_info: page.source.fkInfo,
        fk_property: DfhApiPropertyMock.EN_1112_USED_IN_LANGUAGE.dfh_pk_property,
        fk_object_info: language.pk_entity,
      }
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.proInfoProjRelSerial + i,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      paginatedStatements.push(createStatementWithTarget(statement, 1, { language }, page.isOutgoing, projRel))
    }


    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          req,
          count: count,
          paginatedStatements
        }
      ]
    }
    return paginationObject
  }


  generateDataForEntity(
    req: GvFieldPageReq,
  ): GvPaginationObject {
    const page = req.page
    const limit = page.limit
    const offset = page.offset
    const count = 46;
    const paginatedStatements: StatementWithTarget[] = []
    const subfieldPages: GvSubfieldPageInfo[] = [
      {
        req,
        count: count,
        paginatedStatements
      }
    ]

    let paginationObject: GvPaginationObject = { subfieldPages }

    for (let i = offset; i < (offset + limit); i++) {
      const resource: OmitEntity<InfResource> = {
        pk_entity: this.infTemporalEntitySerial + i,
        fk_class: parseInt(keys(req.targets)[0].toString())
        // fk_class: DfhApiClassMock.EN_365_NAMING.dfh_pk_class,
      }
      const entity: StatementTargetEntity = {
        resource: resource,
        entityPreview: {
          ...resource,
          project_id: ProProjectMock.PROJECT_1.pk_entity,
          entity_label: 'Label of entity ' + resource.pk_entity
        }
      }

      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.infStatementSerial + i,
        fk_subject_info: resource.pk_entity,
        fk_property: req.page.property.fkProperty,
        // fk_property: DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON.dfh_pk_property,
        fk_object_info: page.source.fkInfo,
      }
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.proInfoProjRelSerial + i,
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      paginatedStatements.push(createStatementWithTarget(statement, 1, { entity }, page.isOutgoing, projRel))


    }

    // Do the subfields
    for (const resource of paginatedStatements.filter(s => s.target.entity).map(s => s.target.entity.resource)) {
      const nestedResource = req.targets[resource.fk_class]?.nestedResource ?? []
      for (const teEnSubfield of nestedResource) {
        // increase the id base for subfields
        this.increaseIdBase(100000 + offset)

        const p: GvFieldPage = {
          ...teEnSubfield.page,
          source: { fkInfo: resource.pk_entity },
          scope: page.scope
        }
        const subReq: GvFieldPageReq = {
          pkProject: req.pkProject,
          page: p,
          targets: teEnSubfield.targets
        }
        const subPagObject = this.generateData(subReq)
        paginationObject = mergeDeepWith(concat, paginationObject, subPagObject)
      }
    }

    return paginationObject
  }

}
