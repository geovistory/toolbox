import {model, property} from '@loopback/repository';
import {GvFieldTargetViewType} from '../field/gv-field-target-view-type';
import {SysConfigFormCtrlType} from './sys-config-form-ctrl-type';
import {ProjectVisibilityOptions} from './sys-config-project-visibility-options';
import {SysConfigValueObjectType} from './sys-config-value-obect-type';
import {CommunityVisibilityOptions} from './sys-config-community-visibility-options';
import {VisibilityRange} from './sys-config-visibility-range';

@model({
  jsonSchema: {
    description: "System wide configuration for the class."
  }
})
export class ClassConfig {
  @property({type: GvFieldTargetViewType}) viewType?: GvFieldTargetViewType;
  @property({type: SysConfigFormCtrlType}) formControlType?: SysConfigFormCtrlType;
  @property({type: SysConfigValueObjectType}) valueObjectType?: SysConfigValueObjectType;
  @property() excludedFromEntities?: boolean;
  @property({type: VisibilityRange}) communityVisibilityRange?: VisibilityRange;
  @property({type: VisibilityRange}) communityVisibilityDefault?: CommunityVisibilityOptions;
  @property({type: VisibilityRange}) projectVisibilityDefault?: ProjectVisibilityOptions;

}

