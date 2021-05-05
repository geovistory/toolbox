import { createInfAppellation } from '../atomic/inf-appellation.helper';
import { createInfStatement } from '../atomic/inf-statement.helper';
import { createInfResource } from '../atomic/inf-resource.helper';
import { InfAppellationMock } from '../data/gvDB/InfAppellationMock';
import { InfResourceMock } from '../data/gvDB/InfResourceMock';
import { InfStatementMock } from '../data/gvDB/InfStatementMock';

export async function createSourceHabsbourgEmpire() {
    //create appellation
    const appes = await Promise.all([
        await createInfAppellation(InfAppellationMock.SOURCE_HABSBOURG_EMPIRE)
    ])

    //create entities - teen
    const teens = await Promise.all([
        await createInfResource(InfResourceMock.HABSBOURG_EMPIRE_NAMING),
    ])

    //create entities - peit
    const peits = await Promise.all([
        await createInfResource(InfResourceMock.HABS_EMP_MANIF_PROD_TYPE),
        await createInfResource(InfResourceMock.HABS_EMP_EXPR)
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

export async function createBunchOfSources() {
    //create appellation
    const appes = await Promise.all([
        await createInfAppellation(InfAppellationMock.SOURCE_HABSBOURG_EMPIRE),
        await createInfAppellation(InfAppellationMock.SOURCE_UNIONS)
    ])

    //create entities - teen
    const teens = await Promise.all([
        await createInfResource(InfResourceMock.HABSBOURG_EMPIRE_NAMING),
        await createInfResource(InfResourceMock.UNIONS_NAMING)
    ])

    //create entities - peit
    const peits = await Promise.all([
        await createInfResource(InfResourceMock.HABS_EMP_MANIF_PROD_TYPE),
        await createInfResource(InfResourceMock.HABS_EMP_EXPR),
        await createInfResource(InfResourceMock.UNIONS_MANIF_PROD_TYPE),
        await createInfResource(InfResourceMock.UNIONS_EXPR)
    ])

    //statements between appellation and naming
    const stmts = await Promise.all([
        await createInfStatement(InfStatementMock.NAMING_HABS_EMP_TO_PEIT_HABS_EMP),
        await createInfStatement(InfStatementMock.NAMING_HABS_EMP_TO_APPE_HABS_EMP),
        await createInfStatement(InfStatementMock.HABS_EMP_CARRIERS_PROVIDED_BY),

        await createInfStatement(InfStatementMock.DIGITAL_BIRTHDATES_IS_REPRODUCTION_OF_HABS_EMP),
        await createInfStatement(InfStatementMock.DIGITAL_RANDOM_IS_REPRODUCTION_OF_HABS_EMP),

        await createInfStatement(InfStatementMock.NAMING_UNIONS_TO_PEIT_UNIONS),
        await createInfStatement(InfStatementMock.NAMING_UNIONS_TO_APPE_UNIONS),
        await createInfStatement(InfStatementMock.UNIONS_CARRIERS_PROVIDED_BY),
        await createInfStatement(InfStatementMock.DIGITAL_UNIONS_IS_REPRODUCTION_OF_UNIONS),
    ])

    return { appes, teens, peits, stmts }
}
