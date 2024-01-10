import {model} from '@loopback/repository';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';
import {ProjectClassConfig} from './pro-class-config';

@model({
  jsonSchema: {
    additionalProperties: {$ref: registerType(ProjectClassConfig)},
  }
})
export class ProjectClassesIndex {
  [key: string]: ProjectClassConfig | undefined;
}
