import { InfStatement } from '@kleiolab/lib-sdk-lb4';
import { ItemBasics } from './ItemBasics';
// Items connected through a statement
export interface BasicStatementItem extends ItemBasics {
  statement: InfStatement;
  isOutgoing?: boolean;
  error?: string;
}



