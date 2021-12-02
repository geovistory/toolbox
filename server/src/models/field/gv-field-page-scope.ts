import {model, property} from '@loopback/repository';
@model({
  jsonSchema: {
    description: "If present, defines a specific list type for the class.",
    maxProperties: 1,
    minProperties: 1,
  }
})
export class GvFieldPageScope {
  @property() inProject?: number;
  @property() notInProject?: number;
  @property() inRepo?: boolean; // in one project
  @property() noContraint?: boolean; // all
}
