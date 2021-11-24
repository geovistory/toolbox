import {model, property} from '@loopback/repository';


@model()
export class ProjectVisibilityOptions {
  @property({required: true}) dataApi: boolean;
  @property({required: true}) website: boolean;
}

