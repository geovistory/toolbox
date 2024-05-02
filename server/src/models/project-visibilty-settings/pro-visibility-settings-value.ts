import {model, property} from '@loopback/repository';
import {ProjectClassConfig} from './pro-class-config';
import {ProjectClassesIndex} from './pro-config-classes-index';
@model()
export class ProVisibilitySettingsValue {
  @property({type: ProjectClassConfig})
  classesDefault?: ProjectClassConfig;

  @property({type: ProjectClassesIndex})
  classesByBasicType?: ProjectClassesIndex;

  @property({type: ProjectClassesIndex})
  classes?: ProjectClassesIndex;
}
