import { PubAccount, PubRole } from '@kleiolab/lib-sdk-lb4';

export interface IAccount {
  account: PubAccount,
  roles?: PubRole[]
}
