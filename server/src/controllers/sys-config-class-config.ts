import {model, property} from '@loopback/repository';
import {SysConfigValueObjectType} from '../models/sys-config/sys-config-value-obect-type';

@model({
  jsonSchema: {
    description: "System wide configuration for the class."
  }
})
export class ClassConfig {
  @property({type: SysConfigValueObjectType}) valueObjectType?: SysConfigValueObjectType;
  @property() excludedFromEntities?: boolean;
}
