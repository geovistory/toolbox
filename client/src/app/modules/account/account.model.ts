import { PubAccount } from 'app/core';

export interface AccountRole {
    id: number
    name: string
}
export interface IAccount {
    account: PubAccount,
    roles: AccountRole[]
}
