import {model, property} from '@loopback/repository';


@model({jsonSchema: {additionalProperties: true}})
export class QuillAttributes {
  @property() charid: string;
  @property() blockid: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
