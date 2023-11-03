import { Injectable } from '@angular/core';
import { DatChunkFacade } from './chunk/dat-chunk.facade';
import { DatClassColumnMappingFacade } from './class_column_mapping/dat-class-column-mapping.facade';
import { DatColumnFacade } from './column/dat-column.facade';
import { DatDigitalFacade } from './digital/dat-digital.facade';
import { DatNamespaceFacade } from './namespace/dat-namespace.facade';
import { DatTextPropertyFacade } from './text_property/dat-text-property.facade';

@Injectable({
  providedIn: 'root'
})
export class DatFacade {
  constructor(
    public digital: DatDigitalFacade,
    public chunk: DatChunkFacade,
    public classColumnMapping: DatClassColumnMappingFacade,
    public column: DatColumnFacade,
    public namespace: DatNamespaceFacade,
    public textProperty: DatTextPropertyFacade,
  ) { }
}
