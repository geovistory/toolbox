/* eslint-disable @typescript-eslint/camelcase */

import {PubRoleMapping} from '@kleiolab/lib-sdk-lb4';
import {PubAccountMock} from './PubAccountMock';
import {PubRoleMock} from './PubRoleMock';


export class PubRoleMappingMock {

    static readonly GAETAN_SYS_ADMIN: Partial<PubRoleMapping> = ({
        id: 1,
        principalType: 'USER',
        principalId: PubAccountMock.GAETAN_VERIFIED.id + '',
        roleId: PubRoleMock.SYS_ADMIN.id
    })

    static readonly JONAS_SYS_ADMIN: Partial<PubRoleMapping> = ({
        id: 1,
        principalType: 'USER',
        principalId: PubAccountMock.JONAS.id + '',
        roleId: PubRoleMock.SYS_ADMIN.id
    })
}
