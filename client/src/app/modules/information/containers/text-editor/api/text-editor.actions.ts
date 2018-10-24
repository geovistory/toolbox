import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TextEditor } from './text-editor.models';

type Payload = TextEditor;
interface MetaData {
  itemsArray?: any[]
};
export type TextEditorAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TextEditorAPIActions {
  static readonly LOAD = 'TextEditor::LOAD';
  static readonly LOAD_SUCCEEDED = 'TextEditor::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'TextEditor::LOAD_FAILED';

  static readonly DESTROY = 'TextEditor::DESTROY';

  @dispatch()
  load = (): TextEditorAPIAction => ({
    type: TextEditorAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadSucceeded = (itemsArray: any[]): TextEditorAPIAction => ({
    type: TextEditorAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): TextEditorAPIAction => ({
    type: TextEditorAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
 @dispatch()
 destroy = (): TextEditorAPIAction => ({
   type: TextEditorAPIActions.DESTROY,
   meta: null,
   payload: null
 })
}
