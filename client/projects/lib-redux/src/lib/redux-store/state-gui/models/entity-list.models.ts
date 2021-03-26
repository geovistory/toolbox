import { List } from './list';

export class Information {

  // search results
  items?: List;

  loading?: boolean;

  constructor(data?: Information) {
    Object.assign(this, data);
  }
}
