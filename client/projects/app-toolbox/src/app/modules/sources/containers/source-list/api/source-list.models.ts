import { List } from 'projects/app-toolbox/src/app/shared/components/list/api/list.models';

// Class of this slice of store
export class SourceList implements SourceList {

  // the list of sources (search result)
  list?: List;

  // // class and type selector
  // classAndTypeSelector?: ClassAndTypeSelector;

  loading?: boolean;

  constructor(data?: SourceList) {
    Object.assign(this, data);
  }
}
