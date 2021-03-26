import {model, property} from '@loopback/repository';

@model()
export class SysConfigFieldPosition {
  @property() position?: number;
}
