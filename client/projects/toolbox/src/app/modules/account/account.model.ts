import { PubAccount } from 'projects/toolbox/src/app/core/sdk-lb4/model/pubAccount';

export interface AccountRole {
  id: number
  name: string
}
export interface IAccount {
  account: PubAccount,
  roles?: AccountRole[]
}
