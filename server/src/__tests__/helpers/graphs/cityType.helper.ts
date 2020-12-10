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
    const naming1 = await createInfTemporalEntity(InfTemporalEntityMock.NAMING_1_CITY);
    const naming1RefersTo = await createInfStatement(InfStatementMock.NAMING_CITY_TO_APPE_CITY);
    const naming1IsAppeOf = await createInfStatement(InfStatementMock.NAMING_CITY_TO_GEO_PLACE_TYPE);

    // teEn naming 2
    const naming2 = await createInfTemporalEntity(InfTemporalEntityMock.NAMING_2_STADT);
    const naming2RefersTo = await createInfStatement(InfStatementMock.NAMING_2_STADT_TO_APPE_STADT);
    const naming2IsAppeOf = await createInfStatement(InfStatementMock.NAMING_2_STADT_TO_GEO_PLACE_TYPE);
    return { cityType, appeCity, appeStadt, naming1, naming1RefersTo, naming1IsAppeOf, naming2, naming2RefersTo, naming2IsAppeOf };
}