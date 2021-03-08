/* eslint-disable @typescript-eslint/camelcase */
import { PubAccount } from '@kleiolab/lib-sdk-lb4';

/**
 * pk_entity prefix: 100
 */
export class PubAccountMock {

  static readonly GAETAN_VERIFIED: Partial<PubAccount> = ({
    id: 1001,
    email: 'gaetan.muck@kleiolab.ch',
    username: 'gaetan.muck@kleiolab.ch',
    emailVerified: true
  })
  static readonly JONAS: Partial<PubAccount> = ({
    id: 1002,
    email: 'jonas.schneider@kleiolab.ch',
    username: 'jonas.schneider@kleiolab.ch',
    emailVerified: true
  })

}
