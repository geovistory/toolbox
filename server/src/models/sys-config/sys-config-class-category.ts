import {model, property} from '@loopback/repository';


@model()
export class SysConfigClassCategory {
  // if false, the class is not shown in the add menu
  @property({required: true}) showInAddMenu: boolean;

  // (optional) position of the class in the add menu
  // if undefined, class is appended to the list, ordered A-Z
  @property() positionInAddMenu?: number;

}
