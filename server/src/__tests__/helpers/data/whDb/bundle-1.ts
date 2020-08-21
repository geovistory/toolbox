import {PrimaryDataServices} from '../../../../warehouse/ds-bundles/PrimaryDataServices'
import {DfhClassLabelMock} from './DfhClassLabelMock'
import {EdgeMock} from './EdgeMock'
import {EntityLabelConfigMock} from './EntityLabelConfigMock'
import {EntityMock} from './EntityMock'
import {FieldMock} from './FieldMock'
import {FieldsConfigMock} from './FieldsConfigMock'



export async function createMockBundle1(prim: PrimaryDataServices) {


    /**
     * Configurations
     */
    await prim.dfhClassLabel.put(DfhClassLabelMock.NAMING_EN_ID, DfhClassLabelMock.NAMING_EN_LABEL)
    await prim.dfhClassLabel.put(DfhClassLabelMock.PERSON_EN_ID, DfhClassLabelMock.PERSON_EN_LABEL)

    await prim.createFieldsConfig(FieldsConfigMock.NAMING_ID, FieldsConfigMock.NAMING_VAL)

    await prim.createEntityLabelConfig(EntityLabelConfigMock.PERSON_ID, EntityLabelConfigMock.PERSON_1_STMT_VAL)
    await prim.createEntityLabelConfig(EntityLabelConfigMock.NAMING_ID, EntityLabelConfigMock.NAMING_1_STMT_VAL)

    await prim.createFieldLabel(FieldMock.FIELD_HAS_SPELLING_ID, FieldMock.FIELD_HAS_SPELLING)
    await prim.createFieldLabel(FieldMock.FIELD_IS_APPE_OF_ID, FieldMock.FIELD_IS_APPE_OF)
    await prim.createFieldLabel(FieldMock.FIELD_HAS_APPE_ID, FieldMock.FIELD_HAS_APPE)


    /**
     * Add Entities
     */
    await prim.createEntity(EntityMock.NAME_1_ID, EntityMock.NAME_1)
    await prim.createEntity(EntityMock.NAME_2_ID, EntityMock.NAME_2)
    await prim.createEntity(EntityMock.PERS_1_ID, EntityMock.PERS_1)


    /**
     * Add Edges
     */
    await prim.indexateEdges([
        EdgeMock.EDGE_NAME_1_TO_APPE,
        EdgeMock.EDGE_NAME_1_TO_PERSON,
        EdgeMock.EDGE_NAME_2_TO_APPE,
        EdgeMock.EDGE_NAME_2_TO_PERSON
    ])

}




