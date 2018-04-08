import { InfPersistentItem, InfRole } from "app/core";

/**
 * Interface of the selected peIt 
 */
export interface IPeIt{
    recordFromServer: InfPersistentItem,
    roles: InfRole[],
    pkEntity?: number,
    loading?: boolean,
    error?: any
}

export const fromServer = (record: InfPersistentItem): IPeIt => ({
    recordFromServer: record,
    roles: record.pi_roles || undefined
  });
  