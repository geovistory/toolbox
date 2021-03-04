import { Field, SpecialFieldType } from '@kleiolab/lib-queries';
import { GvSubfieldType } from '@kleiolab/lib-sdk-lb4';
import { DfhApiClassMock } from 'projects/__test__/data/auto-gen/DfhApiClassMock';
import { DfhApiPropertyMock } from 'projects/__test__/data/auto-gen/DfhApiPropertyMock';
import { DfhApiClass, DfhApiProperty } from './auto-gen/local-model.helpers';
import { createFieldBase, createSubfield } from './SubfieldMock';





export namespace FieldMock {

  export const manifestationSingletonHasDefinition: Field = createField(
    DfhApiClassMock.EN_220_MANIFESTATION_SINGLETON,
    DfhApiPropertyMock.EN_1762_HAS_DEFINITION,
    [{
      class: DfhApiClassMock.EN_785_TEXT,
      subfieldType: { langString: 'true' }
    }],
    true
  )

}

function createField(
  source: DfhApiClass,
  property: DfhApiProperty,
  targets: {
    class: DfhApiClass,
    subfieldType: GvSubfieldType
  }[],
  isOutgoing: boolean,
  isSpecialField: SpecialFieldType = false
): Field {


  const base = createFieldBase(source, property, isOutgoing)
  const field: Field = {
    ...base,
    placeOfDisplay: {
      specificFields: {
        position: 1
      }
    },
    targetClasses: targets.map(t => t.class.dfh_pk_class),
    listDefinitions: targets.map(t => createSubfield(source, property, t.class, isOutgoing, t.subfieldType)),
    allSubfieldsRemovedFromAllProfiles: false,
    isSpecialField,
  }
  return field
}
