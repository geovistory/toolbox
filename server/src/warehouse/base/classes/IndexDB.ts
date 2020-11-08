
/**
 * Abstract base class for indexes
 *
 * Derived classes are responsible for the handling of an index
 *
 * Methods
 * - add item
 * - remove item
 *
 * - get item and save dependency of requester
 *
 * - add update request
 */

import {Warehouse} from '../../Warehouse';
import {IndexPostgres} from './IndexPostgres';

export abstract class IndexDB<KeyModel, ValueModel> extends IndexPostgres<KeyModel, ValueModel> {
  constructor(
    name = 'default',
    wh: Warehouse
  ) {
    super(name, wh)
  }
}


