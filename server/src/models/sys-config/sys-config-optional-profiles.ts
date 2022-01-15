import {model, property} from '@loopback/repository';
import {SysConfigOptionalProfiles} from './sys-config-optional-profiles.1';





@model()
export class SysConfigOntomeProfiles {
  @property.array(Number, {required: true}) requiredOntomeProfiles: number[];
  @property.array(SysConfigOptionalProfiles) optionalOntomeProfiles?: SysConfigOptionalProfiles[];
}
