import {model, property} from '@loopback/repository';
import {IconType} from '../enums/IconType';
import {TabComponent} from '../enums/TabComponent';
import {SysConfigClassCategoryBelonging} from './sys-config-class-category-belonging';
import {CommunityVisibilityOptions} from './sys-config-community-visibility-options';
import {SysConfigFormCtrlType} from './sys-config-form-ctrl-type';
import {ProjectVisibilityOptions} from './sys-config-project-visibility-options';
import {SysConfigValueObjectType} from './sys-config-value-obect-type';
import {SysConfigViewType} from './sys-config-view-type';
import {AllowedCommunityVisibility} from './sys-config-visibility-range';

@model({
  jsonSchema: {
    description: "System wide configuration for the class."
  }
})
export class ClassConfig {
  @property({type: SysConfigViewType}) viewType?: SysConfigViewType;
  @property({type: SysConfigFormCtrlType}) formControlType?: SysConfigFormCtrlType;
  @property({type: SysConfigValueObjectType}) valueObjectType?: SysConfigValueObjectType;

  // defines to what category the class belongs.
  // If none provided, it goes to entities.
  @property({type: SysConfigClassCategoryBelonging}) belongsToCategory?: SysConfigClassCategoryBelonging

  @property({type: 'string', jsonSchema: {enum: Object.values(IconType)}}) icon?: IconType;
  @property({type: 'string', jsonSchema: {enum: Object.values(TabComponent)}}) detailPage?: TabComponent;

  @property({type: AllowedCommunityVisibility}) communityVisibilityRange?: AllowedCommunityVisibility;
  @property({type: CommunityVisibilityOptions}) communityVisibilityDefault?: CommunityVisibilityOptions;
  @property({type: ProjectVisibilityOptions}) projectVisibilityDefault?: ProjectVisibilityOptions;

  // (optional) url pointing to the documentaion of the class
  @property() docUrl?: string;
}

