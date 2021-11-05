import {model, property} from '@loopback/repository';

@model()
export class StatementTargetEntity {
  @property({required: true}) pkEntity: number;
  @property({required: true}) fkClass: number;
}
