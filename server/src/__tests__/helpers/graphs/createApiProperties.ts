import {createDfhApiProperty} from '../atomic/dfh-api-property.helper';
import {DfhApiPropertyMock} from '../data/gvDB/DfhApiPropertyMock';

export async function createApiProperties() {
    return Promise.all([
        await createDfhApiProperty(DfhApiPropertyMock.EN_1111_IS_APPE_OF),
        await createDfhApiProperty(DfhApiPropertyMock.EN_1113_REFERS_TO_NAME)
    ]);
}
