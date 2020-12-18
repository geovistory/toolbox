import { createInfAppellation } from '../atomic/inf-appellation.helper';
import { createInfPersistentItem } from '../atomic/inf-persistent-item.helper';
import { createInfStatement } from '../atomic/inf-statement.helper';
import { createInfTemporalEntity } from '../atomic/inf-temporal-entity.helper';
import { InfAppellationMock } from '../data/gvDB/InfAppellationMock';
import { InfPersistentItemMock } from '../data/gvDB/InfPersistentItemMock';
import { InfStatementMock } from '../data/gvDB/InfStatementMock';
import { InfTemporalEntityMock } from '../data/gvDB/InfTemporalEntityMock';

export async function createInstancesForCityType() {
    const cityType = await createInfPersistentItem(InfPersistentItemMock.GEO_PLACE_TYPE_CITY);

    // appeVT
    const appeCity = await createInfAppellation(InfAppellationMock.CITY);
    const appeStadt = await createInfAppellation(InfAppellationMock.STADT);

    // teEn naming 1
    const namingCity1 = await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1_CITY);
    const namingCity1RefersTo = await createInfStatement(InfStatementMock.NAMING_CITY_TO_APPE_CITY);
    const namingCity1IsAppeOf = await createInfStatement(InfStatementMock.NAMING_CITY_TO_GEO_PLACE_TYPE);

    // teEn naming 2
    const namingStadt2 = await createInfTemporalEntity(InfTemporalEntityMock.NAMING_2_STADT);
    const namingStadt2RefersTo = await createInfStatement(InfStatementMock.NAMING_2_STADT_TO_APPE_STADT);
    const namingStadt2IsAppeOf = await createInfStatement(InfStatementMock.NAMING_2_STADT_TO_GEO_PLACE_TYPE);
    return {
        cityType,
        appeCity,
        appeStadt,
        namingCity1,
        namingCity1RefersTo,
        namingCity1IsAppeOf,
        namingStadt2,
        namingStadt2RefersTo,
        namingStadt2IsAppeOf
    };
}
