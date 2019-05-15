import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DatDigital, InfEntityAssociation } from 'app/core';
import { IVersion } from 'app/modules/information/components/version-picker/version-picker.component';
import { FluxStandardAction } from 'flux-standard-action';
import { TextEditor } from './text-editor.models';
import { Ops } from '../../../../quill/quill.models';

type Payload = TextEditor;
interface MetaData {
  itemsArray?: any[];
  entityAssociation?: InfEntityAssociation;
  digitalObject?: DatDigital;
  pkProject?: number;
  fkRangeEntity?: number;
  fkProperty?: number;
  versionList?: IVersion[];
  version?: IVersion;
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

  static readonly LOAD_VERSION_LIST = 'TextEditor::LOAD_VERSION_LIST';
  static readonly LOAD_VERSION_LIST_SUCCEEDED = 'TextEditor::LOAD_VERSION_LIST_SUCCEEDED';
  static readonly LOAD_VERSION_LIST_FAILED = 'TextEditor::LOAD_VERSION_LIST_FAILED';

  static readonly CHANGE_VERSION = 'TextEditor::CHANGE_VERSION';
  static readonly CHANGE_VERSION_SUCCEEDED = 'TextEditor::CHANGE_VERSION_SUCCEEDED';
  static readonly CHANGE_VERSION_FAILED = 'TextEditor::CHANGE_VERSION_FAILED';

  static readonly SET_READONLY = 'TextEditor::SET_READONLY';
  static readonly SET_SELECTED_DELTA = 'TextEditor::SET_SELECTED_DELTA';
  static readonly SET_ANNOTATIONS_VISIBLE = 'TextEditor::SET_ANNOTATIONS_VISIBLE';


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
  @dispatch() save = (pkProject: number, digitalObject: DatDigital): TextEditorAPIAction => ({
    type: TextEditorAPIActions.SAVE,
    meta: { pkProject, digitalObject },
    payload: null,
  });

  saveSucceeded = (digitalObject: DatDigital): TextEditorAPIAction => ({
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

  createEntityAssociationSucceeded = (entityAssociation: InfEntityAssociation): TextEditorAPIAction => ({
    type: TextEditorAPIActions.CREATE_ENTITY_ASSOCIATION_SUCCEEDED,
    meta: {
      entityAssociation
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
  *  Method to load version list
  *********************************************************************/
  loadVersionList = (): TextEditorAPIAction => ({
    type: TextEditorAPIActions.LOAD_VERSION_LIST,
    meta: null,
    payload: null,
  });

  loadVersionListSucceeded = (versionList: IVersion[]): TextEditorAPIAction => ({
    type: TextEditorAPIActions.LOAD_VERSION_LIST_SUCCEEDED,
    meta: {
      versionList
    },
    payload: null
  })

  loadVersionListFailed = (error): TextEditorAPIAction => ({
    type: TextEditorAPIActions.LOAD_VERSION_LIST_FAILED,
    meta: null,
    payload: null,
    error,
  })


  /*********************************************************************
  *  Method to change version
  *********************************************************************/
  @dispatch() changeVersion = (version: IVersion): TextEditorAPIAction => ({
    type: TextEditorAPIActions.CHANGE_VERSION,
    meta: { version },
    payload: null,
  });

  changeVersionSucceeded = (): TextEditorAPIAction => ({
    type: TextEditorAPIActions.CHANGE_VERSION_SUCCEEDED,
    meta: null,
    payload: null
  })

  changeVersionFailed = (error): TextEditorAPIAction => ({
    type: TextEditorAPIActions.CHANGE_VERSION_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Boolean methods
  *********************************************************************/

  @dispatch() setReadOnly = (readOnly: boolean): TextEditorAPIAction => ({
    type: TextEditorAPIActions.SET_READONLY,
    meta: null,
    payload: { readOnly }
  })

  @dispatch() selectDelta = (selectedDelta: Ops): TextEditorAPIAction => ({
    type: TextEditorAPIActions.SET_SELECTED_DELTA,
    meta: null,
    payload: { selectedDelta }
  })

  @dispatch() setAnnotationsVisible = (annotationsVisible: boolean): TextEditorAPIAction => ({
    type: TextEditorAPIActions.SET_ANNOTATIONS_VISIBLE,
    meta: null,
    payload: { annotationsVisible }
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
