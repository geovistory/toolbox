import {model, property} from '@loopback/repository';
import {SysConfigClassCategory} from './sys-config-class-category';


@model({
  jsonSchema: {
    description: "Defines the belonging of a class to a category.",
    maxProperties: 1,
    minProperties: 1,
  }
})
export class SysConfigClassCategoryBelonging {
  @property({type: SysConfigClassCategory}) digitals?: SysConfigClassCategory;
  @property({type: SysConfigClassCategory}) sources?: SysConfigClassCategory;
  @property({type: SysConfigClassCategory}) entities?: SysConfigClassCategory;
  @property({type: SysConfigClassCategory}) stories?: SysConfigClassCategory;
}
