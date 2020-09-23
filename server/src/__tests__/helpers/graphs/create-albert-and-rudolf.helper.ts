/* eslint-disable @typescript-eslint/camelcase */

import {createDfhApiClass} from '../atomic/dfh-api-class.helper';
import {createDfhApiProperty} from '../atomic/dfh-api-property.helper';
import {createInfAppellation} from '../atomic/inf-appellation.helper';
import {createInfPersistentItem} from '../atomic/inf-persistent-item.helper';
import {createInfStatement} from '../atomic/inf-statement.helper';
import {createInfTemporalEntity} from '../atomic/inf-temporal-entity.helper';
import {DfhApiClassMock} from '../data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../data/gvDB/DfhApiPropertyMock';
import {InfAppellationMock} from '../data/gvDB/InfAppellationMock';
import {InfPersistentItemMock} from '../data/gvDB/InfPersistentItemMock';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';
import {InfTemporalEntityMock} from '../data/gvDB/InfTemporalEntityMock';

export async function createAlbertAndRudolf() {
    await createDfhApiClass(DfhApiClassMock.EN_365_NAMING);
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);
    await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF);
    await createDfhApiProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME);

    await createInfTemporalEntity(InfTemporalEntityMock.ALBERT_IV_NAMING);
    await createInfTemporalEntity(InfTemporalEntityMock.RUDOLF_NAMING);

    await createInfPersistentItem(InfPersistentItemMock.ALBERT_IV);
    await createInfPersistentItem(InfPersistentItemMock.RUDOLF);

    await createInfAppellation(InfAppellationMock.ALERT_IV);
    await createInfAppellation(InfAppellationMock.RUDOLF);

    await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_APPE_ALBERT);
    await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_PEIT_ALBERT);
    await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_APPE_RUDOLF);
    await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_PEIT_RUDOLF);
}
