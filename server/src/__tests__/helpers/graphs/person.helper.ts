import {createInfAppellation} from '../atomic/inf-appellation.helper';
import {createInfStatement} from '../atomic/inf-statement.helper';
import {createInfResource} from '../atomic/inf-resource.helper';
import {InfAppellationMock} from '../data/gvDB/InfAppellationMock';
import {InfResourceMock} from '../data/gvDB/InfResourceMock';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';

export async function createAlbertAndRudolf() {
    //create appellation
    const appes = await Promise.all([
        await createInfAppellation(InfAppellationMock.ALERT_IV),
        await createInfAppellation(InfAppellationMock.RUDOLF)
    ])

    //create entities - teen
    const teens = await Promise.all([
        await createInfResource(InfResourceMock.ALBERT_IV_NAMING),
        await createInfResource(InfResourceMock.RUDOLF_NAMING)
    ])

    //create entities - peit
    const peits = await Promise.all([
        await createInfResource(InfResourceMock.ALBERT_IV),
        await createInfResource(InfResourceMock.RUDOLF)
    ])

    //statements between appellation and naming
    const stmts = await Promise.all([
        await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_PEIT_ALBERT),
        await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_APPE_ALBERT),
        await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_PEIT_RUDOLF),
        await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_APPE_RUDOLF),
    ])

    return {appes, teens, peits, stmts}
}

export async function createBunchOfPersons() {
        //create appellation
        const appes = await Promise.all([
            await createInfAppellation(InfAppellationMock.ALERT_IV),
            await createInfAppellation(InfAppellationMock.RUDOLF),
            await createInfAppellation(InfAppellationMock.JEAN),
            await createInfAppellation(InfAppellationMock.HANS),
            await createInfAppellation(InfAppellationMock.PIERRE),
            await createInfAppellation(InfAppellationMock.ANGELA)
        ])

        //create entities - teen
        const teens = await Promise.all([
            await createInfResource(InfResourceMock.ALBERT_IV_NAMING),
            await createInfResource(InfResourceMock.RUDOLF_NAMING),
            await createInfResource(InfResourceMock.JEAN_NAMING),
            await createInfResource(InfResourceMock.HANS_NAMING),
            await createInfResource(InfResourceMock.PIERRE_NAMING),
            await createInfResource(InfResourceMock.ANGELA_NAMING),
        ])

        //create entities - peit
        const peits = await Promise.all([
            await createInfResource(InfResourceMock.ALBERT_IV),
            await createInfResource(InfResourceMock.RUDOLF),
            await createInfResource(InfResourceMock.JEAN),
            await createInfResource(InfResourceMock.HANS),
            await createInfResource(InfResourceMock.PIERRE),
            await createInfResource(InfResourceMock.ANGELA),
        ])

        //statements between appellation and naming
        const stmts = await Promise.all([
            await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_PEIT_ALBERT),
            await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_APPE_ALBERT),
            await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_PEIT_RUDOLF),
            await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_APPE_RUDOLF),
            await createInfStatement(InfStatementMock.NAMING_JEAN_TO_PEIT_JEAN),
            await createInfStatement(InfStatementMock.NAMING_JEAN_TO_APPE_JEAN),
            await createInfStatement(InfStatementMock.NAMING_HANS_TO_PEIT_HANS),
            await createInfStatement(InfStatementMock.NAMING_HANS_TO_APPE_HANS),
            await createInfStatement(InfStatementMock.NAMING_PIERRE_TO_PEIT_PIERRE),
            await createInfStatement(InfStatementMock.NAMING_PIERRE_TO_APPE_PIERRE),
            await createInfStatement(InfStatementMock.NAMING_ANGELA_TO_PEIT_ANGELA),
            await createInfStatement(InfStatementMock.NAMING_ANGELA_TO_APPE_ANGELA),
        ])

        return {appes, teens, peits, stmts}
}
