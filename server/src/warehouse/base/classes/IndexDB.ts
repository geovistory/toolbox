
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

import {IndexLeveldb} from './IndexLeveldb';
import {Warehouse} from '../../Warehouse';

export abstract class IndexDB<KeyModel, ValueModel> extends IndexLeveldb<KeyModel, ValueModel> {
  constructor(
    name = 'default',
    wh: Warehouse
  ) {
    super(name, wh)
  }
}


