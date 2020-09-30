import {createInfAppellation} from '../atomic/inf-appellation.helper';
import {createInfPersistentItem} from '../atomic/inf-persistent-item.helper';
import {createInfStatement} from '../atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../atomic/inf-temporal-entity.helper';
import {createProInfoProjRel, addEntitiesToProject} from '../atomic/pro-info-proj-rel.helper';
import {InfAppellationMock} from '../data/gvDB/InfAppellationMock';
import {InfPersistentItemMock} from '../data/gvDB/InfPersistentItemMock';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';
import {InfTemporalEntityMock} from '../data/gvDB/InfTemporalEntityMock';
import {ProInfoProjRelMock} from '../data/gvDB/ProInfoProjRelMock';
import {ProProjectMock} from '../data/gvDB/ProProjectMock';

export async function createAlbertAndRudolfInSandBoxProject() {
    const pkProject = ProProjectMock.SANDBOX_PROJECT.pk_entity ?? -1;
    // TODO X remove commented section
    // //create classes
    // await createDfhApiClass(DfhApiClassMock.EN_365_NAMING);
    // await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);

    // //link classes to sandbox project
    // await createProDfhClassProjRel(ProDfhClassProjRelMock.SANDBOX_NAMING);
    // await createProDfhClassProjRel(ProDfhClassProjRelMock.SANDBOX_PERSON);

    // //create properties
    // await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF);
    // await createDfhApiProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME);

    //create entities - teen
    const teens = await Promise.all([
        await createInfTemporalEntity(InfTemporalEntityMock.ALBERT_IV_NAMING),
        await createInfTemporalEntity(InfTemporalEntityMock.RUDOLF_NAMING)
    ])
    //link teens to sandbox project
    await addEntitiesToProject(pkProject, teens.map(x => x.pk_entity))

    //create entities - peit
    const peits = await Promise.all([
        await createInfPersistentItem(InfPersistentItemMock.ALBERT_IV),
        await createInfPersistentItem(InfPersistentItemMock.RUDOLF)
    ])
    //link peits to sandbox project
    await addEntitiesToProject(pkProject, peits.map(x => x.pk_entity))

    // await createProInfoProjRel(ProInfoProjRelMock.SANDBOX_ALBERT_IV_NAMING);
    // await createProInfoProjRel(ProInfoProjRelMock.SANDBOX_RUDOLF_NAMING);
    // await createProInfoProjRel(ProInfoProjRelMock.SANDBOX_ALBERT_IV);
    // await createProInfoProjRel(ProInfoProjRelMock.SANDBOX_RUDOLF);

    //create appellation
    await createInfAppellation(InfAppellationMock.ALERT_IV);
    await createInfAppellation(InfAppellationMock.RUDOLF);

    //statements between appellation and naming
    const stmts = await Promise.all([
        await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_PEIT_ALBERT),
        await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_APPE_ALBERT),
        await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_PEIT_RUDOLF),
        await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_APPE_RUDOLF),
    ])
    await addEntitiesToProject(pkProject, stmts.map(x => x.pk_entity))

}

