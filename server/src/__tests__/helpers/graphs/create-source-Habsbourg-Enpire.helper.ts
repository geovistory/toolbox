import { createInfAppellation } from '../atomic/inf-appellation.helper';
import { createInfPersistentItem } from '../atomic/inf-persistent-item.helper';
import { createInfStatement } from '../atomic/inf-statement.helper';
import { createInfTemporalEntity } from '../atomic/inf-temporal-entity.helper';
import { InfAppellationMock } from '../data/gvDB/InfAppellationMock';
import { InfPersistentItemMock } from '../data/gvDB/InfPersistentItemMock';
import { InfStatementMock } from '../data/gvDB/InfStatementMock';
import { InfTemporalEntityMock } from '../data/gvDB/InfTemporalEntityMock';

export async function createSourceHabsbourgEmpire() {
    //create appellation
    const appes = await Promise.all([
        await createInfAppellation(InfAppellationMock.SOURCE_HABSBOURG_EMPIRE)
    ])

    //create entities - teen
    const teens = await Promise.all([
        await createInfTemporalEntity(InfTemporalEntityMock.HABSBOURG_EMPIRE_NAMING),
    ])

    //create entities - peit
    const peits = await Promise.all([
        await createInfPersistentItem(InfPersistentItemMock.HABS_EMP_MANIF_PROD_TYPE),
        await createInfPersistentItem(InfPersistentItemMock.HABS_EMP_EXPR)
    ])

    //statements between appellation and naming
    const stmts = await Promise.all([
        await createInfStatement(InfStatementMock.NAMING_HABS_EMP_TO_PEIT_HABS_EMP),
        await createInfStatement(InfStatementMock.NAMING_HABS_EMP_TO_APPE_HABS_EMP),
        await createInfStatement(InfStatementMock.HABS_EMP_CARRIERS_PROVIDED_BY),
        await createInfStatement(InfStatementMock.DIGITAL_BIRTHDATES_IS_REPRODUCTION_OF_HABS_EMP),
        await createInfStatement(InfStatementMock.DIGITAL_RANDOM_IS_REPRODUCTION_OF_HABS_EMP)
    ])

    return { appes, teens, peits, stmts }
}

