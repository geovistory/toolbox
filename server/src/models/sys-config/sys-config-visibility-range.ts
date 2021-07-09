import {model, property} from '@loopback/repository';
import {VisibilityOptions} from "./sys-config-visibility-options";


@model({
  jsonSchema: {
    description: "If present, defines a visibility range for class instances.",
    maxProperties: 1,
    minProperties: 1,
  }
})
export class VisibilityRange {
  @property({type: VisibilityOptions, required: true}) min: VisibilityOptions;
  @property({type: VisibilityOptions, required: true}) max: VisibilityOptions;
}
