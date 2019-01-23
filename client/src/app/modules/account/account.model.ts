import { Account } from 'app/core';

export interface AccountRole {
    id: number
    name: string
}
export interface IAccount {
    account: Account,
    roles: AccountRole[]
}
