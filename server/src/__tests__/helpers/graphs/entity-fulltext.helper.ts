import {createInfStatement} from '../atomic/inf-statement.helper';
import {addProfilesToProject} from '../atomic/pro-dfh-profile-proj-rel.helper';
import {addInfosToProject} from '../atomic/pro-info-proj-rel.helper';
import {linkAccountProject} from '../atomic/pub-account_project_rel.helper';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';
import {ProProjectMock} from '../data/gvDB/ProProjectMock';
import {PubAccountMock} from '../data/gvDB/PubAccountMock';
import {createGaetanMuck} from './account.helper';

import {createInfAppellation} from '../atomic/inf-appellation.helper';
import {InfAppellationMock} from '../data/gvDB/InfAppellationMock';
import {createInfTemporalEntity} from '../atomic/inf-temporal-entity.helper';
import {InfTemporalEntityMock} from '../data/gvDB/InfTemporalEntityMock';
import {createInfPersistentItem} from '../atomic/inf-persistent-item.helper';
import {InfPersistentItemMock} from '../data/gvDB/InfPersistentItemMock';
import {createProClassFieldConfig} from '../atomic/pro-class-field-config.helper';
import {ProClassFieldConfigMock} from '../data/gvDB/ProClassFieldConfigMock';
import {createProProject} from '../atomic/pro-project.helper';
import {createTypes, createModel} from '../meta/model.helper';
import {createSourceHabsbourgEmpire} from './source.helper';
import {createSandBoxProject} from './project.helper';
import {createTextAndAnnotation} from './feature-X.helper';

/**
 * This function creates mockdata useful for developing the
 * warehouse to produce full texts for entities
 */
export async function forFullText() {
    const pkProject = ProProjectMock.SANDBOX_PROJECT.pk_entity ?? -1;

    await createTypes();

    //create account, namespace and project
    await createSandBoxProject();
    await createProProject(ProProjectMock.DEFAULT_PROJECT);
    await createGaetanMuck();
    await linkAccountProject(PubAccountMock.GAETAN_VERIFIED, ProProjectMock.SANDBOX_PROJECT);

    //create the model
    const { profiles } = await createModel()

    // add profiles to project
    await addProfilesToProject(pkProject, profiles.map(p => p.dfh_pk_profile))

    await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1111_IS_APPE_OF)
    await createProClassFieldConfig(ProClassFieldConfigMock.PROJ_DEF_C365_NAMING_P1113_REFERS_TO_NAME)


    //create the info
    const entities = await createAlbertAndRudolf();
    const source = await createSourceHabsbourgEmpire();

    //create a text, a chunk and annotate rudolf
    const txtAnnot = await createTextAndAnnotation()

    // add info to project
    await addInfosToProject(pkProject, [
        ...entities.teens, ...entities.peits, ...entities.stmts,
        ...source.teens, ...source.peits, ...source.stmts,
        ...txtAnnot.stmts,]
        .map(x => x.pk_entity));
}


export async function createAlbertAndRudolf() {
    //create appellation
    const appes = await Promise.all([
        await createInfAppellation(InfAppellationMock.ALERT_IV),
        await createInfAppellation(InfAppellationMock.ALBERT),
        await createInfAppellation(InfAppellationMock.RUDOLF)
    ])

    //create entities - teen
    const teens = await Promise.all([
        await createInfTemporalEntity(InfTemporalEntityMock.ALBERT_IV_NAMING),
        await createInfTemporalEntity(InfTemporalEntityMock.ALBERT_IV_NAMING_2),
        await createInfTemporalEntity(InfTemporalEntityMock.RUDOLF_NAMING)
    ])

    //create entities - peit
    const peits = await Promise.all([
        await createInfPersistentItem(InfPersistentItemMock.ALBERT_IV),
        await createInfPersistentItem(InfPersistentItemMock.RUDOLF)
    ])

    //statements between appellation and naming
    const stmts = await Promise.all([
        await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_PEIT_ALBERT),
        await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_APPE_ALBERT),
        await createInfStatement(InfStatementMock.NAMING_ALBERT_2_TO_PEIT_ALBERT),
        await createInfStatement(InfStatementMock.NAMING_ALBERT_2_TO_APPE_ALBERT),
        await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_PEIT_RUDOLF),
        await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_APPE_RUDOLF),
    ])

    return {appes, teens, peits, stmts}
}

