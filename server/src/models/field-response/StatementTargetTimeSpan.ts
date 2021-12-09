import {model, property} from '@loopback/repository';
import {WarEntityPreviewTimeSpan} from '../entity-preview/WarEntityPreviewTimeSpan';
import {SubentitySubfieldPage} from './SubentitySubfieldPage';


@model()
export class StatementTargetTimeSpan {
  @property.array(SubentitySubfieldPage, {required: true}) subfields: SubentitySubfieldPage[];
  @property({type: WarEntityPreviewTimeSpan, required: true}) preview: WarEntityPreviewTimeSpan;
}
