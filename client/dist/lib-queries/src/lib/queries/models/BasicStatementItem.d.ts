import { InfStatement } from '@kleiolab/lib-sdk-lb4';
import { ItemBasics } from './ItemBasics';
export interface BasicStatementItem extends ItemBasics {
    statement: InfStatement;
    isOutgoing?: boolean;
    error?: string;
}
