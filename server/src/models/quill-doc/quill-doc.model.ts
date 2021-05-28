import {model,property, ValueObject} from '@loopback/repository';
import {QuillOperation} from './quill-operation.model';

@model()
export class QuillDoc extends ValueObject {
  @property() latestId: number
  @property.array(QuillOperation) ops: QuillOperation[];
}



