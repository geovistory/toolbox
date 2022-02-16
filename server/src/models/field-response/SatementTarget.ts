import {model, property} from '@loopback/repository';
import {InfAppellation, InfLanguage, InfPlace, TabCell} from '..';
import {StatementTargetDimension} from './StatementTargetDimension';
import {StatementTargetEntity} from './StatementTargetEntity';
import {StatementTargeTimePrimitive} from './StatementTargeTimePrimitive';
import {StatementTargetLangString} from './StatementTargetLangString';


@model()
export class SatementTarget {
  @property({type: InfAppellation}) appellation?: InfAppellation;
  @property({type: StatementTargetDimension}) dimension?: StatementTargetDimension;
  @property({type: StatementTargetLangString}) langString?: StatementTargetLangString;
  @property({type: InfLanguage}) language?: InfLanguage;
  @property({type: StatementTargeTimePrimitive}) timePrimitive?: StatementTargeTimePrimitive;
  @property({type: InfPlace}) place?: InfPlace;
  @property({type: TabCell}) cell?: TabCell;
  @property({type: StatementTargetEntity}) entity?: StatementTargetEntity;
}
