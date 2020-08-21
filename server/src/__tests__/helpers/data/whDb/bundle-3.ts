import {PrimaryDataServices} from '../../../../warehouse/ds-bundles/PrimaryDataServices'
import {DfhClassLabelMock} from './DfhClassLabelMock'
import {EdgeMock} from './EdgeMock'
import {EntityLabelConfigMock} from './EntityLabelConfigMock'
import {EntityMock} from './EntityMock'
import {FieldMock} from './FieldMock'
import {FieldsConfigMock} from './FieldsConfigMock'


export async function createMockBundle3(prim: PrimaryDataServices) {


    /**
     * Class Labels
     */
    await prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
    await prim.dfhClassLabel.put(DfhClassLabelMock.PERSON_EN_ID, DfhClassLabelMock.PERSON_EN_LABEL)
    await prim.dfhClassLabel.put(DfhClassLabelMock.UNION_EN_ID, DfhClassLabelMock.UNION_EN_LABEL)
    await prim.dfhClassLabel.put(DfhClassLabelMock.BIRTH_EN_ID, DfhClassLabelMock.BIRTH_EN_LABEL)


    /**
     * Class Field Config (for fulltext)
     */
    await prim.createFieldsConfig(FieldsConfigMock.NAMING_ID, FieldsConfigMock.NAMING_VAL)
    await prim.createFieldsConfig(FieldsConfigMock.UNION_ID, FieldsConfigMock.UNION_VAL)

    /**
     * Entity Label Config
     */
    await prim.createEntityLabelConfig(EntityLabelConfigMock.PERSON_ID, EntityLabelConfigMock.PERSON_2_STMT_VAL)
    await prim.createEntityLabelConfig(EntityLabelConfigMock.NAMING_ID, EntityLabelConfigMock.NAMING_1_STMT_VAL)
    await prim.createEntityLabelConfig(EntityLabelConfigMock.BIRTH_ID, EntityLabelConfigMock.BIRTH_VAL)
    await prim.createEntityLabelConfig(EntityLabelConfigMock.UNION_ID, EntityLabelConfigMock.UNION_VAL)

    /**
    * Field Labels
    */
    await prim.createFieldLabel(FieldMock.FIELD_HAS_SPELLING_ID, FieldMock.FIELD_HAS_SPELLING)
    await prim.createFieldLabel(FieldMock.FIELD_IS_APPE_OF_ID, FieldMock.FIELD_IS_APPE_OF)
    await prim.createFieldLabel(FieldMock.FIELD_HAS_APPE_ID, FieldMock.FIELD_HAS_APPE)
    await prim.createFieldLabel(FieldMock.FIELD_BROUGH_INTO_LIFE_ID, FieldMock.FIELD_BROUGH_INTO_LIFE)
    await prim.createFieldLabel(FieldMock.FIELD_STEMS_FROM_ID, FieldMock.FIELD_STEMS_FROM)
    await prim.createFieldLabel(FieldMock.FIELD_RESULTED_IN_ID, FieldMock.FIELD_RESULTED_IN)
    await prim.createFieldLabel(FieldMock.FIELD_HAS_PARTNER_ID, FieldMock.FIELD_HAS_PARTNER)


    /**
     * Add Entities
     */
    await prim.createEntity(EntityMock.NAME_1_ID, EntityMock.NAME_1)
    await prim.createEntity(EntityMock.NAME_2_ID, EntityMock.NAME_2)
    await prim.createEntity(EntityMock.NAME_3_ID, EntityMock.NAME_3)
    await prim.createEntity(EntityMock.PERS_1_ID, EntityMock.PERS_1)
    await prim.createEntity(EntityMock.PERS_2_ID, EntityMock.PERS_2)
    await prim.createEntity(EntityMock.PERS_3_ID, EntityMock.PERS_3)
    await prim.createEntity(EntityMock.BIRTH_1_ID, EntityMock.BIRTH_1)
    await prim.createEntity(EntityMock.UNION_1_ID, EntityMock.UNION_1)


    /**
     * Add Edges
     */
    await prim.indexateEdges([
        EdgeMock.EDGE_NAME_1_TO_APPE,
        EdgeMock.EDGE_NAME_1_TO_PERSON,
        EdgeMock.EDGE_NAME_2_TO_APPE,
        EdgeMock.EDGE_NAME_2_TO_PERSON,
        EdgeMock.EDGE_NAME_3_TO_APPE,
        EdgeMock.EDGE_NAME_3_TO_PERSON,
        EdgeMock.EDGE_BIRTH_1_BROUGHT_INTO_LIFE,
        EdgeMock.EDGE_BIRTH_1_STEMS_FROM,
        EdgeMock.EDGE_UNION_1_HAS_PARTNER_1,
        EdgeMock.EDGE_UNION_1_HAS_PARTNER_2
    ])

}




