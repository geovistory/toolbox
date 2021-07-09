import {model, property} from '@loopback/repository';
import {GvFieldTargetViewType} from '../models/field/gv-field-target-view-type';
import {SysConfigFormCtrlType} from '../models/sys-config/sys-config-form-ctrl-type';
import {SysConfigValueObjectType} from '../models/sys-config/sys-config-value-obect-type';

@model({
  jsonSchema: {
    description: "System wide configuration for the class."
  }
})
export class ClassConfig {
  @property({ type: GvFieldTargetViewType }) viewType?: GvFieldTargetViewType;
  @property({ type: SysConfigFormCtrlType }) formControlType?: SysConfigFormCtrlType;
  @property({ type: SysConfigValueObjectType }) valueObjectType?: SysConfigValueObjectType;
  @property() excludedFromEntities?: boolean;
}
