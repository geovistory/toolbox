import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InfEntityAssociation, InfDigitalObject } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TextEditor } from './text-editor.models';
import { QuillDoc } from 'app/modules/quill';

type Payload = TextEditor;
interface MetaData {
  itemsArray?: any[];
  entityAssociation?: InfEntityAssociation;
  // quillDoc?: QuillDoc;
  digitalObject?: InfDigitalObject;
  pkProject?: number;
  fkRangeEntity?: number;
  fkProperty?: number;
};
export type TextEditorAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TextEditorAPIActions {
  static readonly LOAD = 'TextEditor::LOAD';
  static readonly LOAD_SUCCEEDED = 'TextEditor::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'TextEditor::LOAD_FAILED';

  static readonly SAVE = 'TextEditor::SAVE';
  static readonly SAVE_SUCCEEDED = 'TextEditor::SAVE_SUCCEEDED';
  static readonly SAVE_FAILED = 'TextEditor::SAVE_FAILED';

  static readonly CREATE_ENTITY_ASSOCIATION = 'TextEditor::CREATE_ENTITY_ASSOCIATION';
  static readonly CREATE_ENTITY_ASSOCIATION_SUCCEEDED = 'TextEditor::CREATE_ENTITY_ASSOCIATION_SUCCEEDED';
  static readonly CREATE_ENTITY_ASSOCIATION_FAILED = 'TextEditor::CREATE_ENTITY_ASSOCIATION_FAILED';


  // static readonly QUILL_DOC_CHANGE = 'TextEditor::QUILL_DOC_CHANGE';

  static readonly DESTROY = 'TextEditor::DESTROY';

  @dispatch() load = (pkProject: number, fkRangeEntity: number, fkProperty: number): TextEditorAPIAction => ({
    type: TextEditorAPIActions.LOAD,
    meta: { pkProject, fkRangeEntity, fkProperty },
    payload: null,
  });

  loadSucceeded = (entityAssociation: InfEntityAssociation): TextEditorAPIAction => ({
    type: TextEditorAPIActions.LOAD_SUCCEEDED,
    meta: {
      entityAssociation
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
  *  Method to save
  *********************************************************************/
  @dispatch() save = (pkProject: number, digitalObject: InfDigitalObject): TextEditorAPIAction => ({
    type: TextEditorAPIActions.SAVE,
    meta: { pkProject, digitalObject },
    payload: null,
  });

  saveSucceeded = (digitalObject: InfDigitalObject): TextEditorAPIAction => ({
    type: TextEditorAPIActions.SAVE_SUCCEEDED,
    meta: {
      digitalObject
    },
    payload: null
  })

  saveFailed = (error): TextEditorAPIAction => ({
    type: TextEditorAPIActions.SAVE_FAILED,
    meta: null,
    payload: null,
    error,
  })


  /*********************************************************************
  *  Method to create the entity associations when saved for the first time
  *********************************************************************/

  createEntityAssociation = (): TextEditorAPIAction => ({
    type: TextEditorAPIActions.CREATE_ENTITY_ASSOCIATION,
    meta: null,
    payload: null
  })

  createEntityAssociationSucceeded = (digitalObject: InfDigitalObject): TextEditorAPIAction => ({
    type: TextEditorAPIActions.CREATE_ENTITY_ASSOCIATION_SUCCEEDED,
    meta: {
      digitalObject
    },
    payload: null
  })

  createEntityAssociationFailed = (error): TextEditorAPIAction => ({
    type: TextEditorAPIActions.CREATE_ENTITY_ASSOCIATION_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to handle quill doc changes
  *********************************************************************/
  // @dispatch() quillDocChange = (quillDoc: QuillDoc): TextEditorAPIAction => ({
  //   type: TextEditorAPIActions.QUILL_DOC_CHANGE,
  //   meta: { quillDoc },
  //   payload: null
  // })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch() destroy = (): TextEditorAPIAction => ({
    type: TextEditorAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
