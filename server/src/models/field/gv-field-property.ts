import {model, property} from '@loopback/repository';


@model()
export class GvFieldProperty {
  @property() fkProperty?: number;
  @property() fkPropertyOfProperty?: number;
}
