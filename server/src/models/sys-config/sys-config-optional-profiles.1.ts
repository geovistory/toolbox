import {model, property} from '@loopback/repository';






@model()
export class SysConfigOptionalProfiles {
  @property.array(Number, {required: true}) profilesAvailableByOmProjects: number[];
  @property.array(Number, {required: false}) restrictedToGvProjects?: number[];
}
