import {GvFieldPageReq, GvFieldPageScope} from '../../../../models'
import {TrueEnum} from '../../../../models/enums/TrueEnum'
import {DfhApiClassMock} from '../gvDB/DfhApiClassMock'
import {DfhApiPropertyMock} from '../gvDB/DfhApiPropertyMock'
import {InfResourceMock} from '../gvDB/InfResourceMock'
import {InfStatementMock} from '../gvDB/InfStatementMock'
import {ProProjectMock} from '../gvDB/ProProjectMock'
import {GvSubentityFieldPageReqMock} from './GvSubentityFieldPageReq'

export namespace GvFieldPageReqMock {


  export const person1HasAppeTeEn: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    page: {
      source: {fkInfo: InfStatementMock.NAME_1_TO_PERSON.fk_object_info},
      property: {fkProperty: InfStatementMock.NAME_1_TO_PERSON.fk_property},
      isOutgoing: false,

      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    },
    targets: {
      [DfhApiClassMock.EN_365_NAMING.dfh_pk_class]: {
        nestedResource: [
          {
            ...GvSubentityFieldPageReqMock.appeTeEnRefersToName,
            page: {
              ...GvSubentityFieldPageReqMock.appeTeEnRefersToName.page,
              ...{limit: 1, offset: 0}
            }
          }
        ]
      }
    },
  }

  export const appeTeEnRefersToName: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class]: {
        appellation: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfStatementMock.NAME_1_TO_APPE.fk_subject_info},
      property: {fkProperty: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }

  export const appeTeEn2RefersToName: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class]: {
        appellation: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfStatementMock.NAME_2_TO_APPE.fk_subject_info},
      property: {fkProperty: DfhApiPropertyMock.EN_1113_REFERS_TO_NAME.dfh_pk_property},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }
  export const appeTeEnIsAppeOfPerson: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_21_PERSON.dfh_pk_class]: {
        entityPreview: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfStatementMock.NAME_1_TO_APPE.fk_subject_info},
      property: {fkProperty: DfhApiPropertyMock.EN_1111_IS_APPE_OF_PERSON.dfh_pk_property},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 1,
      offset: 0,
    }
  }

  export const madridsPresenceWasAtPlace: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_51_PLACE.dfh_pk_class]: {
        place: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfResourceMock.MADRIDS_PRESENCE.pk_entity},
      property: {fkProperty: DfhApiPropertyMock.EN_148_WAS_AT.dfh_pk_property},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }


  export const journyeHasDuration: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_689_DURATION.dfh_pk_class]: {
        dimension: {
          measurementUnitClass: DfhApiClassMock.EN_689_DURATION.dfh_pk_class
        }
      }
    },
    page: {
      source: {fkInfo: InfResourceMock.ACCOUNT_OF_JOURNEY.pk_entity},
      property: {fkProperty: DfhApiPropertyMock.EN_1613_HAS_DURATION.dfh_pk_property},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }
  export const manifSingletonHasShortTitleMurderer: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_784_SHORT_TITLE.dfh_pk_class]: {
        langString: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfResourceMock.MANIF_SINGLETON_THE_MURDERER.pk_entity},
      property: {fkProperty: DfhApiPropertyMock.EN_1761_MANIFESTATION_SINGLETON_HAS_SHORT_TITLE.dfh_pk_property},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }


  export const appeTeEnUsedInLanguage: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_54_LANGUAGE.dfh_pk_class]: {
        language: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfResourceMock.NAMING_1.pk_entity},
      property: {fkProperty: DfhApiPropertyMock.EN_1112_USED_IN_LANGUAGE.dfh_pk_property},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }


  export const shipVoyageAtSomeTimeWithin: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_335_TIME_PRIMITIVE.dfh_pk_class]: {
        timePrimitive: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfResourceMock.SHIP_VOYAGE.pk_entity},
      property: {fkProperty: DfhApiPropertyMock.EN_72_AT_SOME_TIME_WITHIN.dfh_pk_property},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }
  export const definitionHasValueVersion: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_339_STRING.dfh_pk_class]: {
        appellation: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfStatementMock.DEFINITION_1_HAS_VALUE_VERSION_2.fk_subject_info},
      property: {fkProperty: DfhApiPropertyMock.EN_99001_DEFINITION_HAS_VALUE_VERSION.dfh_pk_property},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 1,
      offset: 0
    }
  }


  export const statementOfStatementHasExactReference: GvFieldPageReq = {
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    targets: {
      [DfhApiClassMock.EN_785_TEXT.dfh_pk_class]: {
        langString: TrueEnum.true
      }
    },
    page: {
      source: {fkInfo: InfStatementMock.EXPRESSION_MENTIONS_RUDOLF.pk_entity},
      property: {fkPropertyOfProperty: 1},
      isOutgoing: true,
      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 7,
      offset: 0
    }
  }


  /**
   * EXAMPLE FOR A RECURSIVE QUERY DEFINITION
   * joined target of subReqsRecursiveTargets will be joined with the field page
   * of the class matched by the parent's target.
   * E.G. if the transcription has a statement in the page of '1216 is repro of'.
   *      and the tatget of that statement is a 503 Expression Portion,
   *      the recursive query finds the class in the parent's targets and
   *      joins the page '1317 is part of' etc.
   * In the GUI this can be used to build a 'Path-like-UI' that even listens for
   * the pages and updates in real-time.
   */
  export const pathTextToSource: GvFieldPageReq = {
    /**************************************
     * From Entity to Annotation
     *************************************/
    pkProject: ProProjectMock.PROJECT_1.pk_entity,
    page: {
      source: {fkInfo: 1},
      property: {fkProperty: DfhApiPropertyMock.EN_99004_TEXT_ANNOTATION_IS_ANNOTATION_IN.dfh_pk_property},
      isOutgoing: false,

      scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
      limit: 10000,
      offset: 0
    },
    targets: {

      [DfhApiClassMock.EN_9902_TEXT_ANNOTATION.dfh_pk_class]: {
        nestedResource: [
          /**************************************
           * From Annotation to chunk
           *************************************/
          {
            page: {
              isCircular: false,
              property: {fkProperty: DfhApiPropertyMock.EN_99005_TEXT_ANNOTATION_HAS_SPOT.dfh_pk_property},
              isOutgoing: true,
              limit: 1,
              offset: 0
            },
            targets: {
              [DfhApiClassMock.EN_456_CHUNK.dfh_pk_class]: {appellation: TrueEnum.true}
            }
          },
          /**************************************
           * From Annotation to digital
           *************************************/
          {
            page: {
              isCircular: false,
              property: {fkProperty: DfhApiPropertyMock.EN_99004_TEXT_ANNOTATION_IS_ANNOTATION_IN.dfh_pk_property},
              isOutgoing: true,
              limit: 1,
              offset: 0
            },
            targets: {
              /**************************************
               * Path from transcription to source
               *************************************/
              [DfhApiClassMock.EN_9903_TRANSCRIPTION.dfh_pk_class]: {
                subReqsRecursiveTargets: [
                  {
                    isCircular: false,
                    property: {fkProperty: DfhApiPropertyMock.EN_1216_IS_REPRODUCTION_OF.dfh_pk_property},
                    isOutgoing: true,
                    limit: 1,
                    offset: 0
                  }
                ]
              },
              [DfhApiClassMock.EN_503_EXPRESSION_PORTION.dfh_pk_class]: {
                subReqsRecursiveTargets: [
                  {
                    isCircular: false,
                    property: {fkProperty: DfhApiPropertyMock.EN_1317_IS_PART_OF.dfh_pk_property},
                    isOutgoing: true,
                    limit: 1,
                    offset: 0
                  }
                ]
              },
              [DfhApiClassMock.EN_218_EXPRESSION.dfh_pk_class]: {
                subReqsRecursiveTargets: [
                  {
                    isCircular: false,
                    property: {fkProperty: DfhApiPropertyMock.EN_1016_MANIFESTATION_SINGLETON_IS_REPRESENTATIVE_FOR.dfh_pk_property},
                    isOutgoing: false,
                    limit: 1,
                    offset: 0
                  },
                  {
                    isCircular: false,
                    property: {fkProperty: DfhApiPropertyMock.EN_979_CARRIERS_PROVIDED_BY.dfh_pk_property},
                    isOutgoing: true,
                    limit: 1,
                    offset: 0
                  }
                  // TODO: Add props to item, webrequest, ...?
                ]
              },
              [DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON.dfh_pk_class]: {
                entityPreview: TrueEnum.true
              },
              [DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE.dfh_pk_class]: {
                entityPreview: TrueEnum.true
              },
              // TODO: Add item, webrequest, ...?

              /**************************************
               * Path from definition to entity
               *************************************/
              [DfhApiClassMock.EN_9901_DEFINITION.dfh_pk_class]: {
                nestedResource: [
                  {
                    page: {
                      isCircular: false,
                      property: {fkProperty: DfhApiPropertyMock.EN_99003_HAS_DEFINITION_NEW.dfh_pk_property},
                      isOutgoing: false,
                      limit: 1,
                      offset: 0
                    },
                    targets: {
                      '-1': {entityPreview: TrueEnum.true}
                    }
                  }
                ]
              },

            }
          },

        ]
      },

    }

  }
}
// export const shipVoyageHasTimeSpan: GvFieldPageReq = {
//   pkProject: ProProjectMock.PROJECT_1.pk_entity,
//   targets: {
//     [DfhApiClassMock.EN_50_TIME_SPAN.dfh_pk_class]: {
//       timeSpan: TrueEnum.true
//     }
//   },
//   page: {
//     source: {fkInfo: InfResourceMock.SHIP_VOYAGE.pk_entity},
//     property: {fkProperty: DfhApiPropertyMock.EN_4_HAS_TIME_SPAN.dfh_pk_property},
//     isOutgoing: true,
//     scope: {inProject: ProProjectMock.PROJECT_1.pk_entity},
//     limit: 1,
//     offset: 0
//   }
// }


/**
 * returns a copy of GvFieldPageReq with differen scope
 * @param req
 * @param scope
 * @returns
 */
export function modifiedScope(req: GvFieldPageReq, scope: GvFieldPageScope): GvFieldPageReq {
  return {...req, page: {...req.page, scope}}
}
