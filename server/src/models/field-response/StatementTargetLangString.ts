import {model, property} from '@loopback/repository';
import {InfLangString, InfLanguage} from '..';


@model()
export class StatementTargetLangString {
  @property({type: InfLangString, required: true}) langString: InfLangString;
  @property({type: InfLanguage, required: true}) language: InfLanguage;
}
