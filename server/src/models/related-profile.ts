import {model, property} from '@loopback/repository';
/**
 * this model is only used by queries (currently in lb3)
 * that aggregate the profiles for each dfh class or property.
 * in other words, there is no corresponding database table
 */

@model()
export class RelatedProfile {
  @property() fk_profile: number;
  @property() removed_from_api: boolean;
}
