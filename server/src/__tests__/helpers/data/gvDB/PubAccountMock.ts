import {PubAccount} from '../../../../models';
import {OmitEntity} from './local-model.helpers';

/**
 * pk_entity prefix: 100
 */
export class PubAccountMock {

  static readonly GAETAN_VERIFIED: OmitEntity<PubAccount> = ({
    id: 1001,
    email: 'gaetan.muck@kleiolab.ch',
    username: 'gaetan.muck@kleiolab.ch',
    emailVerified: true
  })
  static readonly JONAS: OmitEntity<PubAccount> = ({
    id: 1002,
    email: 'jonas.schneider@kleiolab.ch',
    username: 'jonas.schneider@kleiolab.ch',
    emailVerified: true
  })

}
