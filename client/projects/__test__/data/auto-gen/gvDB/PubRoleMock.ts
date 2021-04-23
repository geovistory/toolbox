/* eslint-disable @typescript-eslint/camelcase */

import {PubRole} from '@kleiolab/lib-sdk-lb4';


export class PubRoleMock {

    static readonly SYS_ADMIN: Partial<PubRole> = ({
        id: 1,
        name: "system_admin",
        description: "System Administrators have the widest permissions of all roles. They can configure Geovistory through the backoffice. Usually they are team members of KleioLab."
    })

}
