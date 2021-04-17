import {model, property} from '@loopback/repository';
@model()
export class SysConfigAddPropertyForClass {
  @property() all?: boolean;


  @property.array(Number) whereBasicTypeIn?: number[];
  @property.array(Number) whereBasicTypeNotIn?: number[];


  @property.array(Number) wherePkClassIn?: number[];
  @property.array(Number) wherePkClassNotIn?: number[];
}
