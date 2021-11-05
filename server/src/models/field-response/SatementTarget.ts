import {model, property} from '@loopback/repository';
import {InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, WarEntityPreview} from '..';
import {TimePrimitiveWithCal} from '../entity-preview/TimePrimitiveWithCal';
import {StatementTargetEntity} from "./StatementTargetEntity";
import {StatementTargetTimeSpan} from "./StatementTargetTimeSpan";





@model()
export class SatementTarget {
  @property({type: WarEntityPreview}) entityPreview?: WarEntityPreview;
  @property({type: InfAppellation}) appellation?: InfAppellation;
  @property({type: InfDimension}) dimension?: InfDimension;
  @property({type: InfLangString}) langString?: InfLangString;
  @property({type: InfLanguage}) language?: InfLanguage;
  @property({type: TimePrimitiveWithCal}) timePrimitive?: TimePrimitiveWithCal;
  @property({type: InfPlace}) place?: InfPlace;
  @property({type: StatementTargetTimeSpan}) timeSpan?: StatementTargetTimeSpan;
  @property({type: StatementTargetEntity}) entity?: StatementTargetEntity;
}
