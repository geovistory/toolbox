import {model, property} from '@loopback/repository';


@model()
export class GvFieldSourceEntity {
  @property() fkInfo?: number;
  @property() fkData?: number;
  @property() fkTablesRow?: number;
  @property() fkTablesCell?: number;
}
