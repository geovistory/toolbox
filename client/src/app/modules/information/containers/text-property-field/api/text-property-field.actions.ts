import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TextPropertyField } from './text-property-field.models';

type Payload = TextPropertyField;
interface MetaData {
  itemsArray?: any[]
};
export type TextPropertyFieldAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TextPropertyFieldAPIActions {
  static readonly LOAD = 'TextPropertyField::LOAD';
  static readonly LOAD_SUCCEEDED = 'TextPropertyField::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'TextPropertyField::LOAD_FAILED';

  static readonly DESTROY = 'TextPropertyField::DESTROY';

  @dispatch()
  load = (): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): TextPropertyFieldAPIAction => ({
    type: TextPropertyFieldAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): TextPropertyFieldAPIAction => ({
   type: TextPropertyFieldAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
