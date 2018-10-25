import { Action } from 'redux';
import { TextEditor } from './text-editor.models';
import { TextEditorAPIAction, TextEditorAPIActions } from './text-editor.actions';
import { InfDigitalObject } from 'app/core';
import { clone } from 'ramda';

const INITIAL_STATE = new TextEditor();

export function textEditorReducer(state: TextEditor = INITIAL_STATE, a: Action): TextEditor {

  const action = a as TextEditorAPIAction;

  switch (action.type) {
    case TextEditorAPIActions.LOAD:
      state = {
        ...state,
        edit: false,
        annotate: false,
        view: false,
        loading: true
      };
      break;
    case TextEditorAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        quillDoc: (!action.meta.entityAssociation || !action.meta.entityAssociation.digital_object ) ? {} as InfDigitalObject : action.meta.entityAssociation.digital_object.js_quill_data,
        digitalObject: !action.meta.entityAssociation ? {} as InfDigitalObject : action.meta.entityAssociation.digital_object,
        entityAssociation: action.meta.entityAssociation,
        edit: true,
        annotate: false,
        view: false,
        loading: false
      };
      break;

    case TextEditorAPIActions.LOAD_FAILED:
      state = {
        ...state,
        quillDoc: undefined,
        edit: false,
        annotate: false,
        view: false
      };
      break;



    /*****************************************************
    * Reducers to manage saving
    *****************************************************/

    case TextEditorAPIActions.SAVE:
      state = {
        ...state,
        loading: true
      };
      break;
    case TextEditorAPIActions.SAVE_SUCCEEDED:
      state = {
        ...state,
        quillDoc: action.meta.digitalObject.js_quill_data,
        digitalObject: action.meta.digitalObject,
        loading: false
      };
      break;

    case TextEditorAPIActions.SAVE_FAILED:
      state = {
        ...state,
        quillDoc: null,
        digitalObject: null,
        loading: false
      };
      break;

      case TextEditorAPIActions.CREATE_ENTITY_ASSOCIATION:
      state = {
        ...state,
        loading: true
      };
      break;


      case TextEditorAPIActions.CREATE_ENTITY_ASSOCIATION_SUCCEEDED:
      state = {
        ...state,
        entityAssociation: action.meta.entityAssociation,
        loading: false
      };
      break;

      case TextEditorAPIActions.CREATE_ENTITY_ASSOCIATION_FAILED:
      state = {
        ...state,
        loading: false
      };
      break;


    /*****************************************************
    * Reducers called when user edits the text
    *****************************************************/
    case TextEditorAPIActions.QUILL_DOC_CHANGE:
      state = {
        ...state,
        quillDoc: clone(action.meta.quillDoc)
      }
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

