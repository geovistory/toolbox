import {createDfhApiProfile} from '../atomic/dfh-api-profile.helper';
import {DfhApiProfileMock} from '../data/gvDB/DfhApiProfileMock';

export default async function createApiProfiles() {
    return Promise.all(
        [
            await createDfhApiProfile(DfhApiProfileMock.GEOVISTORY_BASIC),
            await createDfhApiProfile(DfhApiProfileMock.MARITIME_HISTORY),
            await createDfhApiProfile(DfhApiProfileMock.BIOGRAPHY_AND_FAMILY),
            await createDfhApiProfile(DfhApiProfileMock.GEOVISTORY_GENERIC_HIST)
        ]);
}
