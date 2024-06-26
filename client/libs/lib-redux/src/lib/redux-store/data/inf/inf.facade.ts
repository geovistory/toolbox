import { Injectable } from '@angular/core';
import { InfAppellationFacade } from './appellation/inf-appellation.facade';
import { InfDimensionFacade } from './dimension/inf-dimension.facade';
import { InfLanguageFacade } from './language/inf-language.facade';
import { InfLangStringFacade } from './lang_string/inf-lang-string.facade';
import { InfPlaceFacade } from './place/inf-place.facade';
import { InfResourceFacade } from './resource/inf-resource.facade';
import { InfStatementFacade } from './statement/inf-statement.facade';
import { InfTimePrimitiveFacade } from './time_primitive/inf-time-primitive.facade';

@Injectable({
  providedIn: 'root'
})
export class InfFacade {
  constructor(
    public appellation: InfAppellationFacade,
    public dimension: InfDimensionFacade,
    public langString: InfLangStringFacade,
    public language: InfLanguageFacade,
    public place: InfPlaceFacade,
    public resource: InfResourceFacade,
    public statement: InfStatementFacade,
    public timePrimitive: InfTimePrimitiveFacade,
  ) { }
}
