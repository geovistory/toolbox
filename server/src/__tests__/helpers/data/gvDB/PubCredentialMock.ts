/* eslint-disable @typescript-eslint/camelcase */

import { PubCredential } from '../../../../models/pub-credential.model';
import { PubAccountMock } from './PubAccountMock';

/**
 * pk_entity prefix: 200
 */
export class PubCredentialMock {

    static readonly GAETAN_PASSWORD = new PubCredential({
        id: 2001,
        accountId: PubAccountMock.GAETAN_VERIFIED.id,
        password: 'test1234',
    })

    static readonly JONAS_PASSWORD = new PubCredential({
        id: 2002,
        accountId: PubAccountMock.JONAS.id,
        password: 'test1234',
    })

}