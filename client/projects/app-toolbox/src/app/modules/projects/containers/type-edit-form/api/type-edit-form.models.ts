import { EntityDetail } from '@kleiolab/lib-redux';

// Interface of this slice of store
export interface TypeEditFormI {
  peItDetail?: EntityDetail;
  loading?: boolean;
  error?: any;
}

// Class of this slice of store
export class TypeEditForm implements TypeEditFormI {
  peItDetail?: EntityDetail;
  loading?: boolean;
  error?: any;

  constructor(data?: TypeEditFormI) {
    Object.assign(this, data);
  }
}
