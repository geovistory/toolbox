import { createDfhApiProperty } from '../atomic/dfh-api-property.helper';
import { DfhApiPropertyMock } from '../data/gvDB/DfhApiPropertyMock';

export async function createApiProperties() {
    return Promise.all([
        await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF),
        await createDfhApiProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME),
        await createDfhApiProperty(DfhApiPropertyMock.EN_979_CARRIERS_PROVIDED_BY),
        await createDfhApiProperty(DfhApiPropertyMock.EN_1206_HAS_TYPE_OF_MANIFESTATION_PRODUCT_TYPE),
        await createDfhApiProperty(DfhApiPropertyMock.EN_152_BEGIN_OF_THE_BEGIN),
        await createDfhApiProperty(DfhApiPropertyMock.EN_153_END_OF_THE_END),
    ]);
}
