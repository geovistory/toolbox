import {model, property} from '@loopback/repository';


@model({jsonSchema: {additionalProperties: true}})
export class QuillAttributes {
  @property() charid?: string;
  @property() blockid?: string;
  @property() size?: string;
  @property() bold?: boolean;
  @property() italic?: boolean;
  @property() underline?: boolean;
  @property() header?: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
