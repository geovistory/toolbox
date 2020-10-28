import { createDfhApiClass } from '../atomic/dfh-api-class.helper';
import { DfhApiClassMock } from '../data/gvDB/DfhApiClassMock';

export async function createApiClasses() {
    return Promise.all([
        await createDfhApiClass(DfhApiClassMock.EN_365_NAMING),
        await createDfhApiClass(DfhApiClassMock.EN_21_PERSON),
        await createDfhApiClass(DfhApiClassMock.EN_218_EXPRESSION),
        await createDfhApiClass(DfhApiClassMock.EN_219_MANIFESTATION_PRODUCT_TYPE),
        await createDfhApiClass(DfhApiClassMock.EN_61_BIRTH)
    ]);
}
