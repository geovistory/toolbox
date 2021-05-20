import {model,property} from '@loopback/repository';

@model({jsonSchema:{additionalProperties:true}})
export class AttributeMap {
  [key: string]: any;
}
@model()
export class QuillOperation {
  // TODO: actually insert can also be an object:
  //  read: https://quilljs.com/docs/delta/#embeds
  //  the following line should be compatible with the code below
  //  at the moment it isn't
  // insert?: string | object;
 @property() insert?: string;
 @property() delete?: number;
 @property() retain?: number;
 @property() attributes?: AttributeMap;
}

@model()
export class QuillDoc {
  @property() latestId: number
  @property.array(QuillOperation) ops: QuillOperation[];
}



