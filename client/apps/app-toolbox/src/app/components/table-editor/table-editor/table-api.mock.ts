import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatClassColumnMappingMock, DatColumnMock, DatTextPropertyMock } from '@kleiolab/lib-redux';
import { GetTablePageOptions, GvPositiveSchemaObject, GvSchemaModifier, TablePageResponse, TableRow, TableService } from '@kleiolab/lib-sdk-lb4';
import { Observable, of } from 'rxjs';

@Injectable()
export class TableApiMock extends TableService {

  // tableControllerGetTableColumns
  override tableControllerGetTableColumns(pkProject: number, pkDigital: number, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<GvPositiveSchemaObject>;
  override tableControllerGetTableColumns(pkProject: number, pkDigital: number, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpResponse<GvPositiveSchemaObject>>;
  override tableControllerGetTableColumns(pkProject: number, pkDigital: number, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpEvent<GvPositiveSchemaObject>>;
  override tableControllerGetTableColumns(pkProject: number, pkDigital: number, observe: any = 'body', reportProgress = false, options?: { httpHeaderAccept?: 'application/json' }): Observable<any> {

    const o: GvPositiveSchemaObject = {
      dat: {
        column: [
          DatColumnMock.COL_PEOPLE
        ],
        class_column_mapping: [
          DatClassColumnMappingMock.MAPPING_COL_PEOPLE_TO_CLASS_PERSON
        ],
        text_property: [
          DatTextPropertyMock.PEOPLE
        ],
      }
    }
    return of(o)
  }


  // tableControllerGetTableConfig
  override tableControllerGetTableConfig(pkProject: number, pkDataEntity: number, accountId?: number, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<GvSchemaModifier>;
  override tableControllerGetTableConfig(pkProject: number, pkDataEntity: number, accountId?: number, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpResponse<GvSchemaModifier>>;
  override tableControllerGetTableConfig(pkProject: number, pkDataEntity: number, accountId?: number, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpEvent<GvSchemaModifier>>;
  override tableControllerGetTableConfig(pkProject: number, pkDataEntity: number, accountId?: number, observe: any = 'body', reportProgress = false, options?: { httpHeaderAccept?: 'application/json' }): Observable<any> {

    const o: GvSchemaModifier = {
      positive: {
        pro: {
          table_config: [
            {
              account_id: accountId,
              config: {
                columns: [{
                  fkColumn: DatColumnMock.COL_PEOPLE.pk_entity,
                  visible: true
                }]
              },
              fk_digital: pkDataEntity,
              fk_project: pkProject,
              pk_entity: 123
            }
          ]
        }
      }
    }
    return of(o)
  }

  override tableControllerGetTablePage(pkProject: number, pkEntity: number, getTablePageOptions?: GetTablePageOptions, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<TablePageResponse>;
  override tableControllerGetTablePage(pkProject: number, pkEntity: number, getTablePageOptions?: GetTablePageOptions, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpResponse<TablePageResponse>>;
  override tableControllerGetTablePage(pkProject: number, pkEntity: number, getTablePageOptions?: GetTablePageOptions, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpEvent<TablePageResponse>>;
  override tableControllerGetTablePage(pkProject: number, pkEntity: number, getTablePageOptions?: GetTablePageOptions, observe: any = 'body', reportProgress = false, options?: { httpHeaderAccept?: 'application/json' }): Observable<any> {
    const rows: Array<TableRow> = [
      {
        pk_row: 100,
        index: 1,
        [DatColumnMock.COL_PEOPLE.pk_entity]: {
          string_value: 'Lara',
          pk_cell: 20001
        }
      }
    ]
    const columns: Array<string> = [
      DatColumnMock.COL_PEOPLE.pk_entity.toString()
    ]
    const res: TablePageResponse = {
      length: 1,
      columns,
      rows
    }
    return of(res)
  }

}
