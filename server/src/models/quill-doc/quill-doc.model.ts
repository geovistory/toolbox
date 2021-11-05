import {model, property} from '@loopback/repository';
import {QuillOperation} from './quill-operation.model';

@model()
export class QuillDoc {
  @property() latestId: number
  @property.array(QuillOperation) ops: QuillOperation[];
}



