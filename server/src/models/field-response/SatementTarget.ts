import {model, property} from '@loopback/repository';
import {InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfResource, InfTimePrimitive, WarEntityPreview} from '..';
import {TimePrimitiveWithCal} from '../entity-preview/TimePrimitiveWithCal';
import {StatementTargetEntity} from "./StatementTargetEntity";





@model()
export class SatementTargetDimension {
  @property({type: InfDimension, required: true}) dimension: InfDimension;
  @property({type: WarEntityPreview}) unitPreview?: WarEntityPreview;
}

@model()
export class SatementTargetLangString {
  @property({type: InfLangString, required: true}) langString: InfLangString;
  @property({type: InfLanguage, required: true}) language: InfLanguage;
}

@model()
export class SatementTargeTimePrimitive {
  @property({type: InfLangString, required: true}) infTimePrimitive: InfTimePrimitive;
  @property({type: TimePrimitiveWithCal, required: true}) timePrimitive?: TimePrimitiveWithCal;
}

@model()
export class SatementTargetEntity {
  @property({type: InfResource, required: true}) resource: InfResource;
  @property({type: WarEntityPreview, required: true}) entityPreview?: WarEntityPreview;
}

@model()
export class SatementTarget {
  @property({type: InfAppellation}) appellation?: InfAppellation;
  @property({type: SatementTargetDimension}) dimension?: SatementTargetDimension;
  @property({type: InfLangString}) langString?: SatementTargetLangString;
  @property({type: InfLanguage}) language?: InfLanguage;
  @property({type: TimePrimitiveWithCal}) timePrimitive?: SatementTargeTimePrimitive;
  @property({type: InfPlace}) place?: InfPlace;
  // @property({type: StatementTargetTimeSpan}) timeSpan?: StatementTargetTimeSpan;
  // @property({type: Object}) timeSpan?: object;
  @property({type: StatementTargetEntity}) entity?: SatementTargetEntity;
}
