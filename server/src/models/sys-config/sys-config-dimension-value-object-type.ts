import {model, property} from '@loopback/repository';

@model({
  jsonSchema: {
    description: "This list type allows to create / view / edit a numeric value with a measurement unit.",
  }
})
export class DimensionValueObjectType {
  @property({required: true}) measurementUnitClass: number;
}
