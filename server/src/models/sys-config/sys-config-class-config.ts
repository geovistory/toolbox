import {model, property} from '@loopback/repository';
import {GvFieldTargetViewType} from '../field/gv-field-target-view-type';
import {SysConfigClassCategoryBelonging} from './sys-config-class-category-belonging';
import {CommunityVisibilityOptions} from './sys-config-community-visibility-options';
import {SysConfigFormCtrlType} from './sys-config-form-ctrl-type';
import {ProjectVisibilityOptions} from './sys-config-project-visibility-options';
import {SysConfigValueObjectType} from './sys-config-value-obect-type';
import {AllowedCommunityVisibility} from './sys-config-visibility-range';

@model({
  jsonSchema: {
    description: "System wide configuration for the class."
  }
})
export class ClassConfig {
  @property({type: GvFieldTargetViewType}) viewType?: GvFieldTargetViewType;
  @property({type: SysConfigFormCtrlType}) formControlType?: SysConfigFormCtrlType;
  @property({type: SysConfigValueObjectType}) valueObjectType?: SysConfigValueObjectType;

  // defines to what category the class belongs.
  // If none provided, it goes to entities.
  @property({type: SysConfigClassCategoryBelonging}) belongsToCategory?: SysConfigClassCategoryBelonging

  // @property() excludedFromEntities?: boolean;
  @property({type: AllowedCommunityVisibility}) communityVisibilityRange?: AllowedCommunityVisibility;
  @property({type: CommunityVisibilityOptions}) communityVisibilityDefault?: CommunityVisibilityOptions;
  @property({type: ProjectVisibilityOptions}) projectVisibilityDefault?: ProjectVisibilityOptions;

  // (optional) url pointing to the documentaion of the class
  @property() docUrl?: string;
}

