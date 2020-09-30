import { ProDfhClassProjRel } from '../../../models';
/* eslint-disable @typescript-eslint/camelcase */

import { createDfhApiClass } from '../atomic/dfh-api-class.helper';
import { createDfhApiProperty } from '../atomic/dfh-api-property.helper';
import { createInfAppellation } from '../atomic/inf-appellation.helper';
import { createInfPersistentItem } from '../atomic/inf-persistent-item.helper';
import { createInfStatement } from '../atomic/inf-statement.helper';
import { createInfTemporalEntity } from '../atomic/inf-temporal-entity.helper';
import { createProDfhClassProjRel } from '../atomic/pro-dfh-class-proj-rel.helper';
import { createProInfoProjRel } from '../atomic/pro-info-proj-rel.helper';
import { DfhApiClassMock } from '../data/gvDB/DfhApiClassMock';
import { DfhApiPropertyMock } from '../data/gvDB/DfhApiPropertyMock';
import { InfAppellationMock } from '../data/gvDB/InfAppellationMock';
import { InfPersistentItemMock } from '../data/gvDB/InfPersistentItemMock';
import { InfStatementMock } from '../data/gvDB/InfStatementMock';
import { InfTemporalEntityMock } from '../data/gvDB/InfTemporalEntityMock';
import { ProDfhClassProjRelMock } from '../data/gvDB/ProDfhClassProjRelMock';
import { ProInfoProjRelMock } from '../data/gvDB/ProInfoProjRelMock';

export async function createAlbertAndRudolfInSandBoxProject() {
    //create classes
    await createDfhApiClass(DfhApiClassMock.EN_365_NAMING);
    await createDfhApiClass(DfhApiClassMock.EN_21_PERSON);

    //link classes to sandbox project
    await createProDfhClassProjRel(ProDfhClassProjRelMock.SANDBOX_NAMING);
    await createProDfhClassProjRel(ProDfhClassProjRelMock.SANDBOX_PERSON);

    //create properties
    await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF);
    await createDfhApiProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME);

    //create entities - teen
    await createInfTemporalEntity(InfTemporalEntityMock.ALBERT_IV_NAMING);
    await createInfTemporalEntity(InfTemporalEntityMock.RUDOLF_NAMING);

    //create entities - peit
    await createInfPersistentItem(InfPersistentItemMock.ALBERT_IV);
    await createInfPersistentItem(InfPersistentItemMock.RUDOLF);

    //link entities to sandbox project
    await createProInfoProjRel(ProInfoProjRelMock.SANDBOX_ALBERT_IV_NAMING);
    await createProInfoProjRel(ProInfoProjRelMock.SANDBOX_RUDOLF_NAMING);
    await createProInfoProjRel(ProInfoProjRelMock.SANDBOX_ALBERT_IV);
    await createProInfoProjRel(ProInfoProjRelMock.SANDBOX_RUDOLF);

    //create appellation
    await createInfAppellation(InfAppellationMock.ALERT_IV);
    await createInfAppellation(InfAppellationMock.RUDOLF);

    //statements between appellation and naming
    await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_APPE_ALBERT);
    await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_APPE_RUDOLF);

    //statements between naming and peit
    await createInfStatement(InfStatementMock.NAMING_ALBERT_TO_PEIT_ALBERT);
    await createInfStatement(InfStatementMock.NAMING_RUDOLF_TO_PEIT_RUDOLF);
}
