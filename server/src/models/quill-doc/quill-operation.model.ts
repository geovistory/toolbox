import {model, property, ValueObject} from '@loopback/repository';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';
import {QuillAttributes} from "./quill-attributes.model";

@model()
export class QuillOperation extends ValueObject {
  // TODO: actually insert can also be an object:
  //  read: https://quilljs.com/docs/delta/#embeds
  //  the following line should be compatible with the code below
  //  at the moment it isn't
  // insert?: string | object;
  @property() insert?: string;
  @property() delete?: number;
  @property() retain?: number;
  @property() attributes?: QuillAttributes;
}
@model()
export class  QuillOperationWithRelations extends QuillOperation{}
registerType(QuillOperationWithRelations)
