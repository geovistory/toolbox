import {model, property} from '@loopback/repository';


@model()
export class AllowedCommunityVisibility {
  @property.array(Boolean, {required: true}) toolbox: boolean[];
  @property.array(Boolean, {required: true}) dataApi: boolean[];
  @property.array(Boolean, {required: true}) website: boolean[];
}
