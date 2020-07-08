import {model, property} from '@loopback/repository';

@model()
export class Header {
  @property()
  colLabel: string;

  @property()
  comment: string;

  @property()
  type: 'number' | 'string'
}


