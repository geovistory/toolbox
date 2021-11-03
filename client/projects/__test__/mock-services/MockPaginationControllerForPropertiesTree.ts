import { GvFieldPage, GvFieldPageReq, GvPaginationObject, GvSubfieldPageInfo, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfStatement, InfTimePrimitive, ProInfoProjRel, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { concat, keys, mergeDeepWith, values } from 'ramda';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DfhApiClassMock } from '../data/auto-gen/gvDB/DfhApiClassMock';
import { DfhApiPropertyMock } from '../data/auto-gen/gvDB/DfhApiPropertyMock';
import { InfLanguageMock } from '../data/auto-gen/gvDB/InfLanguageMock';
import { InfResourceMock } from '../data/auto-gen/gvDB/InfResourceMock';
import { InfTimePrimitiveMock } from '../data/auto-gen/gvDB/InfTimePrimitiveMock';
import { OmitEntity } from '../data/auto-gen/gvDB/local-model.helpers';
import { ProProjectMock } from '../data/auto-gen/gvDB/ProProjectMock';
import { PubAccountMock } from '../data/auto-gen/gvDB/PubAccountMock';
import { WarEntityPreviewMock } from '../data/auto-gen/gvDB/WarEntityPreviewMock';
import { transformDfhApiClassToDfhClass } from '../helpers/transformers';

/**
 * This Mock Service returns many statements targeting appellations
 * this is useful for testing pagination
 */
export class MockPaginationControllerForPropertiesTree {
  pkEntitySequence = 0

  warEntityPreviewSerial: number;
  proInfoProjRelSerial: number;
  infStatementSerial: number;
  infNestedResourceSerial: number;
  infAppellationSerial: number;
  infPlaceSerial: number;
  infDimensionSerial: number
  infTimePrimitiveSerial: number;
  constructor() {
    this.resetIdBase()
  }
  nextPkEntity() {
    this.pkEntitySequence = this.pkEntitySequence + 1
    return this.pkEntitySequence;
  }
  subfieldPageControllerLoadSubfieldPage(gvLoadSubfieldPageReq?: GvFieldPageReq): Observable<GvPaginationObject> {
    // this.resetIdBase();
    console.log('REST API called: subfieldPageControllerLoadSubfieldPage')
    return new BehaviorSubject(this.generateData(gvLoadSubfieldPageReq)).pipe(delay(500 + Math.random() * 500))

  }
  private resetIdBase() {
    this.warEntityPreviewSerial = 1000;
    this.proInfoProjRelSerial = 2000;
    this.infStatementSerial = 3000;
    this.infNestedResourceSerial = 4000;
    this.infAppellationSerial = 5000;
    this.infPlaceSerial = 7000;
    this.infDimensionSerial = 8000;
    this.infTimePrimitiveSerial = 9000;

  }

  private increaseIdBase(amount = 100000) {
    this.warEntityPreviewSerial += amount;
    this.proInfoProjRelSerial += amount;
    this.infStatementSerial += amount;
    this.infNestedResourceSerial += amount
    this.infAppellationSerial += amount;
    this.infPlaceSerial += amount;
    this.infDimensionSerial += amount;
    this.infTimePrimitiveSerial += amount;
  }

  generateData(gvLoadSubfieldPageReq?: GvFieldPageReq): GvPaginationObject {
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
      return this.generateDataForNestedResource(gvLoadSubfieldPageReq);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].entityPreview) {
      return this.generateDataForEntityPreview(gvLoadSubfieldPageReq);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].timeSpan) {
      return this.generateDataForTimeSpan(gvLoadSubfieldPageReq);
    }
    else if (values(gvLoadSubfieldPageReq.targets)[0].typeItem) {
      return this.generateDataForEntityPreview(gvLoadSubfieldPageReq);
    }
    throw new Error('mock not implemented for this request');

  }


  generateDataForAppe(mainReq: GvFieldPageReq,
  ): GvPaginationObject {
    const page = mainReq.page
    const limit = page.limit
    const offset = page.offset
    const count = 3;
    const paginatedStatements: number[] = []
    const statements: OmitEntity<InfStatement>[] = []
    const appellations: OmitEntity<InfAppellation>[] = []
    const projRels: OmitEntity<ProInfoProjRel>[] = []

    for (let i = offset; i < (offset + limit); i++) {
      const pkEntity = this.nextPkEntity()
      const appellation: OmitEntity<InfAppellation> = {
        pk_entity: pkEntity,
        fk_class: getFirstTargetClassOfPageReq(mainReq),
        string: 'Jack the foo ' + (pkEntity),
      }
      appellations.push(appellation)

      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.nextPkEntity(),
        fk_subject_info: page.source.fkInfo,
        fk_property: page.property.fkProperty,
        fk_object_info: appellation.pk_entity,
      }
      statements.push(statement)
      paginatedStatements.push(statement.pk_entity)
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.nextPkEntity(),
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      projRels.push(projRel)
    }

    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          page,
          count: count,
          paginatedStatements
        }
      ],
      schemas: {
        inf: {
          statement: statements,
          appellation: appellations
        },
        pro: {
          info_proj_rel: projRels
        },
        dfh: {
          klass: [
            transformDfhApiClassToDfhClass(DfhApiClassMock.EN_40_APPELLATION)
          ]
        }
      }
    }
    return paginationObject
  }


  generateDataForPlace(mainReq: GvFieldPageReq,
  ): GvPaginationObject {
    const page = mainReq.page
    const limit = page.limit
    const offset = page.offset
    const count = 3;
    const paginatedStatements: number[] = []
    const statements: OmitEntity<InfStatement>[] = []
    const places: OmitEntity<InfPlace>[] = []
    const projRels: OmitEntity<ProInfoProjRel>[] = []

    for (let i = offset; i < (offset + limit); i++) {
      const place: OmitEntity<InfPlace> = {
        pk_entity: this.nextPkEntity(),
        fk_class: getFirstTargetClassOfPageReq(mainReq),
        lat: i + 1,
        long: 47.1221
      }
      places.push(place)

      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.nextPkEntity(),
        fk_subject_info: page.source.fkInfo,
        fk_property: page.property.fkProperty,
        fk_object_info: place.pk_entity,
      }
      statements.push(statement)
      paginatedStatements.push(statement.pk_entity)
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.nextPkEntity(),
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      projRels.push(projRel)
    }


    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          page,
          count: count,
          paginatedStatements
        }
      ],
      schemas: {
        inf: {
          statement: statements,
          place: places
        },
        pro: {
          info_proj_rel: projRels
        },
        dfh: {
          klass: [
            transformDfhApiClassToDfhClass(DfhApiClassMock.EN_51_PLACE)
          ]
        }
      }
    }
    return paginationObject
  }

  generateDataForDimension(mainReq: GvFieldPageReq,
  ): GvPaginationObject {
    const page = mainReq.page
    const limit = page.limit
    const offset = page.offset
    const count = 3;
    const paginatedStatements: number[] = []
    const statements: OmitEntity<InfStatement>[] = []
    const dimensions: OmitEntity<InfDimension>[] = []
    const projRels: OmitEntity<ProInfoProjRel>[] = []

    for (let i = offset; i < (offset + limit); i++) {
      const dimension: OmitEntity<InfDimension> = {
        pk_entity: this.nextPkEntity(),
        fk_class: getFirstTargetClassOfPageReq(mainReq),
        numeric_value: i + 1,
        fk_measurement_unit: InfResourceMock.TIME_UNIT_MONTH.pk_entity
      }
      dimensions.push(dimension)

      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.nextPkEntity(),
        fk_subject_info: page.source.fkInfo,
        fk_property: page.property.fkProperty,
        fk_object_info: dimension.pk_entity,
      }
      statements.push(statement)
      paginatedStatements.push(statement.pk_entity)
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.nextPkEntity(),
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      projRels.push(projRel)
    }


    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          page,
          count: count,
          paginatedStatements
        }
      ],
      schemas: {
        inf: {
          statement: statements,
          dimension: dimensions
        },
        pro: {
          info_proj_rel: projRels
        },
        dfh: {
          klass: [
            transformDfhApiClassToDfhClass(DfhApiClassMock.EN_689_DURATION)
          ]
        },
        war: {
          entity_preview: [
            WarEntityPreviewMock.TIME_UNIT_ONE_MONTH
          ]
        }
      }
    }
    return paginationObject
  }

  generateDataForLangString(mainReq: GvFieldPageReq,
  ): GvPaginationObject {
    const page = mainReq.page
    const limit = page.limit
    const offset = page.offset
    const count = 3;
    const paginatedStatements: number[] = []
    const statements: OmitEntity<InfStatement>[] = []
    const langStrings: OmitEntity<InfLangString>[] = []
    const projRels: OmitEntity<ProInfoProjRel>[] = []

    for (let i = offset; i < (offset + limit); i++) {
      const langString: OmitEntity<InfLangString> = {
        pk_entity: this.nextPkEntity(),
        fk_class: getFirstTargetClassOfPageReq(mainReq),
        fk_language: InfLanguageMock.ENGLISH.pk_entity,
        string: `«The Murderer» ${i + 1}`
      }
      langStrings.push(langString)

      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.nextPkEntity(),
        fk_subject_info: page.source.fkInfo,
        fk_property: page.property.fkProperty,
        fk_object_info: langString.pk_entity,
      }
      statements.push(statement)
      paginatedStatements.push(statement.pk_entity)
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.nextPkEntity(),
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      projRels.push(projRel)
    }


    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          page,
          count: count,
          paginatedStatements
        }
      ],
      schemas: {
        inf: {
          statement: statements,
          lang_string: langStrings,
          language: [
            InfLanguageMock.ENGLISH
          ]
        },
        pro: {
          info_proj_rel: projRels
        },
        dfh: {
          klass: [
            transformDfhApiClassToDfhClass(DfhApiClassMock.EN_784_SHORT_TITLE)
          ]
        },
      }
    }
    return paginationObject
  }

  generateDataForLanguage(mainReq: GvFieldPageReq,
  ): GvPaginationObject {
    const page = mainReq.page
    const limit = page.limit
    const offset = page.offset
    const count = 3;
    const paginatedStatements: number[] = []
    const statements: OmitEntity<InfStatement>[] = []
    const languages: OmitEntity<InfLanguage>[] = []
    const projRels: OmitEntity<ProInfoProjRel>[] = []

    for (let i = offset; i < (offset + limit); i++) {
      const pkEntity = this.nextPkEntity()
      const language: OmitEntity<InfLanguage> = {
        pk_entity: pkEntity,
        fk_class: getFirstTargetClassOfPageReq(mainReq),
        notes: `Language ${pkEntity}`,
        iso6391: `L${pkEntity}`
      }
      languages.push(language)

      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.nextPkEntity(),
        fk_subject_info: page.source.fkInfo,
        fk_property: page.property.fkProperty,
        fk_object_info: language.pk_entity,
      }
      statements.push(statement)
      paginatedStatements.push(statement.pk_entity)
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.nextPkEntity(),
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      projRels.push(projRel)
    }


    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          page,
          count: count,
          paginatedStatements
        }
      ],
      schemas: {
        inf: {
          statement: statements,
          language: languages,
        },
        pro: {
          info_proj_rel: projRels
        },
        dfh: {
          klass: [
            transformDfhApiClassToDfhClass(DfhApiClassMock.EN_54_LANGUAGE)
          ]
        },
      }
    }
    return paginationObject
  }


  generateDataForNestedResource(
    mainReq: GvFieldPageReq,
  ): GvPaginationObject {
    const targetClass = getFirstTargetClassOfPageReq(mainReq)
    const page = mainReq.page
    if (targetClass !== 365) {
      const empty: GvPaginationObject = {
        subfieldPages: [{
          page,
          count: 0,
          paginatedStatements: []
        }],
        schemas: {}
      }
      return empty
    }
    const limit = page.limit
    const offset = page.offset
    const count = 3;
    const paginatedStatements: number[] = []
    const statements: OmitEntity<InfStatement>[] = []
    const resources: OmitEntity<InfResource>[] = []
    const projRels: OmitEntity<ProInfoProjRel>[] = []
    const subfieldPages: GvSubfieldPageInfo[] = [
      {
        page,
        count: count,
        paginatedStatements
      }
    ]

    let paginationObject: GvPaginationObject = {
      subfieldPages,
      schemas: {
        inf: {
          statement: statements,
          resource: resources,
          language: [
            InfLanguageMock.GERMAN
          ]
        },
        pro: {
          info_proj_rel: projRels,
          project: [
            ProProjectMock.PROJECT_1
          ]
        }
      }
    }

    for (let i = offset; i < (offset + limit); i++) {
      const nestedResource: OmitEntity<InfResource> = {
        pk_entity: this.nextPkEntity(),
        fk_class: targetClass,
      }
      resources.push(nestedResource)

      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.nextPkEntity(),
        fk_subject_info: nestedResource.pk_entity,
        fk_property: page.property.fkProperty,
        fk_object_info: page.source.fkInfo,
      }
      statements.push(statement)
      paginatedStatements.push(statement.pk_entity)
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.nextPkEntity(),
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      projRels.push(projRel)


    }

    // Do the subfields
    for (const nestedResource of resources) {
      for (const subfield of mainReq.targets[targetClass].nestedResource) {
        // increase the id base for subfields
        this.increaseIdBase(100000 + offset)

        const p: GvFieldPage = {
          ...subfield.page,
          source: { fkInfo: nestedResource.pk_entity },
          scope: page.scope
        }
        const subReq: GvFieldPageReq = {
          pkProject: mainReq.pkProject,
          page: p,
          targets: subfield.targets
        }
        const subPagObject = this.generateData(subReq)
        paginationObject = mergeDeepWith(concat, paginationObject, subPagObject)
      }
    }

    return paginationObject
  }


  generateDataForEntityPreview(mainReq: GvFieldPageReq,
  ): GvPaginationObject {
    const page = mainReq.page
    const limit = page.limit
    const offset = page.offset
    const count = 3;
    const paginatedStatements: number[] = []
    const statements: OmitEntity<InfStatement>[] = []
    const entityPreviews: OmitEntity<WarEntityPreview>[] = []
    const resources: OmitEntity<InfResource>[] = []
    const projRels: OmitEntity<ProInfoProjRel>[] = []

    for (let i = offset; i < (offset + limit); i++) {
      const pkEntity = this.nextPkEntity()
      const resource: OmitEntity<InfResource> = {
        pk_entity: pkEntity,
        fk_class: getFirstTargetClassOfPageReq(mainReq),
      }
      resources.push(resource)
      const projRel1: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.nextPkEntity(),
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: resource.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      projRels.push(projRel1)
      const entityPreview: OmitEntity<WarEntityPreview> = {
        pk_entity: pkEntity,
        fk_class: getFirstTargetClassOfPageReq(mainReq),
        entity_label: 'Jack the foo ' + (pkEntity),
        class_label: 'Person',
        entity_type: 'peIt',
        project: page.scope.inProject ?? 0,
        fk_project: page.scope.inProject ?? 0
      }
      entityPreviews.push(entityPreview)


      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.nextPkEntity(),
        fk_subject_info: page.source.fkInfo,
        fk_property: page.property.fkProperty,
        fk_object_info: entityPreview.pk_entity,
      }
      statements.push(statement)
      paginatedStatements.push(statement.pk_entity)
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.nextPkEntity(),
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }

      projRels.push(projRel)
    }

    const paginationObject: GvPaginationObject = {
      subfieldPages: [
        {
          page,
          count: count,
          paginatedStatements
        }
      ],
      schemas: {
        inf: {
          statement: statements,
          resource: resources
        },
        pro: {
          info_proj_rel: projRels
        },
        dfh: {
          klass: [
            transformDfhApiClassToDfhClass(DfhApiClassMock.EN_21_PERSON)
          ]
        },
        war: {
          entity_preview: entityPreviews
        }
      }
    }
    return paginationObject
  }

  generateDataForTimeSpan(mainReq: GvFieldPageReq,
  ): GvPaginationObject {
    const page = mainReq.page
    const limit = page.limit
    const offset = page.offset
    const statements: OmitEntity<InfStatement>[] = []
    const timePrimitives: OmitEntity<InfTimePrimitive>[] = []
    const projRels: OmitEntity<ProInfoProjRel>[] = []
    function isOdd(num: number) { return num % 2; }

    const paginationObject: GvPaginationObject = {
      subfieldPages: [],
      schemas: {
        inf: {
          statement: statements,
          time_primitive: timePrimitives,
        },
        pro: {
          info_proj_rel: projRels
        },
        dfh: {
          klass: [
            transformDfhApiClassToDfhClass(DfhApiClassMock.EN_335_TIME_PRIMITIVE)
          ]
        },
      }
    }


    const props = [
      DfhApiPropertyMock.EN_71_ONGOING_THROUGHOUT,
      DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN,
      DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN,
      DfhApiPropertyMock.EN_150_END_OF_THE_BEGIN,
      DfhApiPropertyMock.EN_151_BEGIN_OF_THE_END,
      DfhApiPropertyMock.EN_153_END_OF_THE_END
    ]

    props.forEach((prop, i) => {
      const tp = isOdd(i) ? InfTimePrimitiveMock.TP_1 : InfTimePrimitiveMock.TP_2;
      const timePrimitive: OmitEntity<InfTimePrimitive> = {
        ...tp,
        pk_entity: this.nextPkEntity(),

      }
      timePrimitives.push(timePrimitive)


      const statement: OmitEntity<InfStatement> = {
        pk_entity: this.nextPkEntity(),
        fk_subject_info: page.source.fkInfo,
        fk_property: prop.dfh_pk_property,
        fk_object_info: timePrimitive.pk_entity,
      }
      statements.push(statement)
      paginationObject.subfieldPages.push({
        page: {
          property: { fkProperty: prop.dfh_pk_property },
          source: page.source,
          isOutgoing: true,
          limit: 1,
          offset: 0,
          scope: page.scope,
        },
        count: 1,
        paginatedStatements: [
          statement.pk_entity
        ]
      })
      const projRel: OmitEntity<ProInfoProjRel> = {
        pk_entity: this.nextPkEntity(),
        fk_project: ProProjectMock.PROJECT_1.pk_entity,
        fk_entity: statement.pk_entity,
        calendar: 'gregorian',
        fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
        is_in_project: true
      }
      projRels.push(projRel)

    })



    return paginationObject
  }


}
function getFirstTargetClassOfPageReq(mainReq: GvFieldPageReq) {
  return parseInt(keys(mainReq.targets)[0].toString(), 10);
}

