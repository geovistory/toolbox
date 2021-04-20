import {model, property} from '@loopback/repository';
import {SysConfigAddPropertyForClass} from './sys-config-add-property-for-class';
@model()
export class SysConfigAddProperty {
  @property()
  comment?: string;
  @property({required: true})
  wherePkProperty: number;
  @property()
  whereFkDomain?: number;
  @property()
  whereFkRange?: number;

  @property({type: SysConfigAddPropertyForClass})
  toSourceClass?: SysConfigAddPropertyForClass;

  @property({required: true})
  isOutgoing: boolean

  @property()
  replaceTargetClassWithSourceClass?: boolean;

}
