import {model} from '@loopback/repository';
import {QuillOperation} from './quill-operation.model';
// Hack to create correct openapi.json
@model()
export class QuillOperationWithRelations extends QuillOperation {

}
