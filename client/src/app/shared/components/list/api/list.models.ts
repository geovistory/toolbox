import { EntitySearchHit } from 'app/core/sdk-lb4';



export interface SearchResponse { data: EntitySearchHit[], totalCount: number };

// Class of this slice of store
export class List implements List {
  searchString?: string;

  // Array of dfh_pk_class of those classes that may appear in the list
  pkAllowedClasses?: number[];

  collectionSize?: number;

  items?: EntitySearchHit[];

  loading?: boolean;
  error?: any;

  constructor(data?: List) {
    Object.assign(this, data);

    if (true) {

    } else {

    }
  }
}
