export interface ReadableList {
    pk_typed_class: number,
    typed_class_label: string,
    dfh_pk_property: number,
    property_label: string,
    pk_type_class: number,
    type_class_label: string
  }

  
// Class of this slice of store
export class HasType implements HasType {
    items?: ReadableList[];
    loading?: boolean;
    error?: any;

    constructor(data?: HasType) {
        Object.assign(this, data);
    }
}
