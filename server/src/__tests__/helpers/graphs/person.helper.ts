import {createInfAppellation} from '../atomic/inf-appellation.helper';
import {createInfPersistentItem} from '../atomic/inf-persistent-item.helper';
import {createInfStatement} from '../atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../atomic/inf-temporal-entity.helper';
import {InfAppellationMock} from '../data/gvDB/InfAppellationMock';
import {InfPersistentItemMock} from '../data/gvDB/InfPersistentItemMock';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';
import {InfTemporalEntityMock} from '../data/gvDB/InfTemporalEntityMock';

export async function createAlbertAndRudolf() {
    //create appellation
    const appes = await Promise.all([
        await createInfAppellation(InfAppellationMock.ALERT_IV),
        await createInfAppellation(InfAppellationMock.RUDOLF)
    ])

    //create entities - teen
    const teens = await Promise.all([
        await createInfTemporalEntity(InfTemporalEntityMock.ALBERT_IV_NAMING),
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
            await createInfTemporalEntity(InfTemporalEntityMock.ALBERT_IV_NAMING),
            await createInfTemporalEntity(InfTemporalEntityMock.RUDOLF_NAMING),
            await createInfTemporalEntity(InfTemporalEntityMock.JEAN_NAMING),
            await createInfTemporalEntity(InfTemporalEntityMock.HANS_NAMING),
            await createInfTemporalEntity(InfTemporalEntityMock.PIERRE_NAMING),
            await createInfTemporalEntity(InfTemporalEntityMock.ANGELA_NAMING),
        ])
    
        //create entities - peit
        const peits = await Promise.all([
            await createInfPersistentItem(InfPersistentItemMock.ALBERT_IV),
            await createInfPersistentItem(InfPersistentItemMock.RUDOLF),
            await createInfPersistentItem(InfPersistentItemMock.JEAN),
            await createInfPersistentItem(InfPersistentItemMock.HANS),
            await createInfPersistentItem(InfPersistentItemMock.PIERRE),
            await createInfPersistentItem(InfPersistentItemMock.ANGELA),
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