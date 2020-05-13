import { EntityPreview, InfStatement } from 'app/core';

export interface EntitySearchHit extends EntityPreview {
  full_text_headline?: string;
  class_label_headline?: string;
  entity_label_headline?: string;
  type_label_headline?: string;
  projects?: number[]
  related_statements?: InfStatement[]
}

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
