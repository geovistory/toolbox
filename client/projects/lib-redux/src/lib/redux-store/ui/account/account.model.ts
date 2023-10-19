import { PubAccount, PubRole } from '@kleiolab/lib-sdk-lb4';

export interface AccountState {
  account: PubAccount,
  roles?: PubRole[]
}
