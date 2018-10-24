import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { TextEditor } from './text-editor.models';
import { TextEditorAPIAction, TextEditorAPIActions } from './text-editor.actions';

const INITIAL_STATE = new TextEditor();

export function textEditorReducer(state: TextEditor = INITIAL_STATE, a: Action): TextEditor {

  const action = a as TextEditorAPIAction;

  switch (action.type) {
    case TextEditorAPIActions.LOAD:
      state = {
        ...state,
        items: {}
      };
      break;
    case TextEditorAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray)
      };
      break;

    case TextEditorAPIActions.LOAD_FAILED:
      state = {
        ...state,
        items: {}
      };
      break;



    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case TextEditorAPIActions.DESTROY:
      state = undefined;
      break;

  }

  return state;
};

