import {model, property} from '@loopback/repository';
import {registerType} from '../components/spec-enhancer/model.spec.enhancer';


@model()
export class WarFieldChangeId {

  @property({
    type: 'number',
    required: true
  })
  fk_project: number;

  @property({
    type: 'number',
    required: true
  })
  fk_source_info: number;

  @property({
    type: 'number',
    required: true
  })
  fk_property: number;

  @property({
    type: 'number',
    required: true
  })
  fk_property_of_property: number;

  @property({
    type: 'boolean',
    required: true
  })
  is_outgoing: boolean;

}
registerType(WarFieldChangeId)


@model()
export class WarFieldChangeAddToStream {

  @property({
    type: 'number',
    required: true
  })
  pkProject: number;

  @property.array(WarFieldChangeId, {required: true})
  fieldIds: WarFieldChangeId[];

}

registerType(WarFieldChangeAddToStream)
