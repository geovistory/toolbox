import {model} from '@loopback/repository';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';
import {ClassConfig} from './sys-config-class-config';
@model({jsonSchema: {additionalProperties: {$ref: registerType(ClassConfig)}, }})
export class ClassesIndex {
  [key: number]: ClassConfig | undefined;
}
