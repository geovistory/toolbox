/* eslint-disable @typescript-eslint/camelcase */
import {PubAccount} from '../../../../models';

/**
 * pk_entity prefix: 100
 */
export class PubAccountMock {

  static readonly GAETAN_VERIFIED = new PubAccount({
    id: 1001,
    email: 'gaetan.muck@kleiolab.ch',
    username: 'gaetanmuck',
    emailVerified:true
  })

}
