import { Action } from 'redux';
import { TextEditor } from './text-editor.models';
import { TextEditorAPIAction, TextEditorAPIActions } from './text-editor.actions';
import { DatDigital } from 'app/core';
import { clone } from 'ramda';

const INITIAL_STATE = new TextEditor();

export function textEditorReducer(state: TextEditor = INITIAL_STATE, a: Action): TextEditor {

  const action = a as TextEditorAPIAction;

    /*****************************************************
    * Reducers to manage initial loading
    *****************************************************/
  switch (action.type) {
    case TextEditorAPIActions.LOAD:
      state = {
        ...state,
        loading: true
      };
      break;
    case TextEditorAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        quillDoc: (!action.meta.entityAssociation || !action.meta.entityAssociation.domain_digital) ? {} as DatDigital : action.meta.entityAssociation.domain_digital.js_quill_data,
        digitalObject: !action.meta.entityAssociation ? {} as DatDigital : action.meta.entityAssociation.domain_digital,
        entityAssociation: action.meta.entityAssociation,
        readOnly: action.meta.entityAssociation ? true : false,
        annotationsVisible: true,
        loading: false
      };
      break;

    case TextEditorAPIActions.LOAD_FAILED:
      state = {
        ...state,
        quillDoc: undefined
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
        readOnly: true,
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


    /*********************************************************************
    *  Method to load version list
    *********************************************************************/

    case TextEditorAPIActions.LOAD_VERSION_LIST:
      state = {
        ...state,
        loading: true
      };
      break;


    case TextEditorAPIActions.LOAD_VERSION_LIST_SUCCEEDED:
      state = {
        ...state,
        versionList: action.meta.versionList,
        loading: false
      };
      break;

    case TextEditorAPIActions.LOAD_VERSION_LIST_FAILED:
      state = {
        ...state,
        loading: false,
        error: action.error
      };
      break;


    /*********************************************************************
    *  Method to change version
    *********************************************************************/

    case TextEditorAPIActions.CHANGE_VERSION:
      state = {
        ...state,
        loading: true
      };
      break;


    case TextEditorAPIActions.CHANGE_VERSION_SUCCEEDED:
      state = {
        ...state,
        loading: false
      };
      break;

    case TextEditorAPIActions.CHANGE_VERSION_FAILED:
      state = {
        ...state,
        loading: false,
        error: action.error
      };
      break;

    /*****************************************************
    * Reducers to switch booleans
    *****************************************************/
    case TextEditorAPIActions.SET_READONLY:
      state = {
        ...state,
        ...action.payload
      }
      break;

    case TextEditorAPIActions.SET_SELECTED_DELTA:
      state = {
        ...state,
        ...action.payload
      }
      break;

    case TextEditorAPIActions.SET_ANNOTATIONS_VISIBLE:
      state = {
        ...state,
        ...action.payload
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

