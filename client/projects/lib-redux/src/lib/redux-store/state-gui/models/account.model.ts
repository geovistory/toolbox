import { PubAccount } from '@kleiolab/lib-sdk-lb4';

export interface AccountRole {
  id: number
  name: string
}
export interface IAccount {
  account: PubAccount,
  roles?: AccountRole[]
}
