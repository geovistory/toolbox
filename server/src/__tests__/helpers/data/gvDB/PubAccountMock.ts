/* eslint-disable @typescript-eslint/camelcase */
import {PubAccount} from '../../../../models';

/**
 * pk_entity prefix: 100
 */
export class PubAccountMock {

  static readonly GAETAN_VERIFIED = new PubAccount({
    id: 1001,
    email: 'gaetan.muck@kleiolab.ch',
    username: 'gaetan.muck@kleiolab.ch',
    emailVerified:true
  })
  static readonly JONAS = new PubAccount({
    id: 1002,
    email: 'jonas.schneider@kleiolab.ch',
    username: 'jonas.schneider@kleiolab.ch',
    emailVerified:true
  })

}
