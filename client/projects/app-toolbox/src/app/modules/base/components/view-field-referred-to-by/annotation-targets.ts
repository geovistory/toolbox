import { GvFieldPageReq, GvFieldTargetViewType } from '@kleiolab/lib-sdk-lb4';
import { TrueEnum } from 'projects/__test__/data/auto-gen/enums/TrueEnum';
import { DfhApiClassMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiClassMock';
import { DfhApiPropertyMock } from 'projects/__test__/data/auto-gen/gvDB/DfhApiPropertyMock';
import { ProProjectMock } from 'projects/__test__/data/auto-gen/gvDB/ProProjectMock';

export const annotationTargets: { [key: string]: GvFieldTargetViewType } = {
  [DfhApiClassMock.EN_9902_TEXT_ANNOTATION.dfh_pk_class]: {
    nestedResource: [
      /**************************************
       * From Annotation to chunk
       *************************************/
      {
        page: {
          isCircular: false,
          property: { fkProperty: DfhApiPropertyMock.EN_99005_TEXT_ANNOTATION_HAS_SPOT.dfh_pk_property },
          isOutgoing: true,
          limit: 1,
          offset: 0
        },
        targets: {
          [DfhApiClassMock.EN_456_CHUNK.dfh_pk_class]: { appellation: TrueEnum.true }
        }
      },
      /**************************************
       * From Annotation to digital
       *************************************/
      {
        page: {
          isCircular: false,
          property: { fkProperty: DfhApiPropertyMock.EN_99004_TEXT_ANNOTATION_IS_ANNOTATION_IN.dfh_pk_property },
          isOutgoing: true,
          limit: 1,
          offset: 0
        },
        targets: {
          [DfhApiClassMock.EN_9903_TRANSCRIPTION.dfh_pk_class]: {
            entityPreview: TrueEnum.true
          },
          [DfhApiClassMock.EN_9901_DEFINITION.dfh_pk_class]: {
            entityPreview: TrueEnum.true
          },
        }
      },
    ]
  },
};
export const pathTextToSource: GvFieldPageReq = {
  /**************************************
   * From Entity to Annotation
   *************************************/
  pkProject: ProProjectMock.PROJECT_1.pk_entity,
  page: {
    source: { fkInfo: 1 },
    property: { fkProperty: DfhApiPropertyMock.EN_99004_TEXT_ANNOTATION_IS_ANNOTATION_IN.dfh_pk_property },
    isOutgoing: false,

    scope: { inProject: ProProjectMock.PROJECT_1.pk_entity },
    limit: 10000,
    offset: 0
  },
  targets: annotationTargets

}
