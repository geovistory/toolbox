import {model, property} from '@loopback/repository';


@model()
export class VisibilityOptions {
  @property({required: true}) toolbox: boolean;
  @property({required: true}) dataApi: boolean;
  @property({required: true}) website: boolean;
}
