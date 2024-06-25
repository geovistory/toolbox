import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatColumnMock } from '@kleiolab/lib-redux';
import { DigitalFactoidMapping, FactoidControllerService } from '@kleiolab/lib-sdk-lb4';
import { Observable, of } from 'rxjs';

@Injectable()
export class FactoidControllerMock extends FactoidControllerService {
  override factoidControllerGetDigitalFactoidMapping(pkProject: string, pkTable: number, observe?: 'body', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<DigitalFactoidMapping>;
  override factoidControllerGetDigitalFactoidMapping(pkProject: string, pkTable: number, observe?: 'response', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpResponse<DigitalFactoidMapping>>;
  override factoidControllerGetDigitalFactoidMapping(pkProject: string, pkTable: number, observe?: 'events', reportProgress?: boolean, options?: { httpHeaderAccept?: 'application/json' }): Observable<HttpEvent<DigitalFactoidMapping>>;
  override factoidControllerGetDigitalFactoidMapping(pkProject: string, pkTable: number, observe: any = 'body', reportProgress = false, options?: { httpHeaderAccept?: 'application/json' }): Observable<any> {
    const res: DigitalFactoidMapping = {
      pkTable: pkTable,
      mappings: [
        {
          pkEntity: 123123,
          pkDigital: pkTable,
          pkClass: 61,
          title: 'Birth of a Person',
          comment: 'I added this mapping in order to do great stuff.',
          properties: [{
            pkEntity: 321232,
            pkFactoidMapping: 321232,
            pkProperty: 86,
            isOutgoing: true,
            pkColumn: DatColumnMock.COL_PEOPLE.pk_entity,
            comment: 'The path to the person brought into life',
            default: undefined,
          }]
        }
      ]
    }
    return of(res)
  }
}
