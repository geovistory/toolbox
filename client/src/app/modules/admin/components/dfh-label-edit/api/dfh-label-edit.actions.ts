import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { DfhLabelEditI } from './dfh-label-edit.models';
import { DfhLabel } from 'app/core';

type Payload = DfhLabelEditI;
interface MetaData {
  dfhLabel?: DfhLabel,
  pkEntity?: number
};
export type DfhLabelEditAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class DfhLabelEditAPIActions {
  static readonly START_EDIT = 'DfhLabelEdit::START_EDIT';
  static readonly STOP_EDIT = 'DfhLabelEdit::STOP_EDIT';

  static readonly SAVE = 'DfhLabelEdit::SAVE';
  static readonly SAVE_SUCCEEDED = 'DfhLabelEdit::SAVE_SUCCEEDED';
  static readonly SAVE_FAILED = 'DfhLabelEdit::SAVE_FAILED';


  static readonly DESTROY = 'DfhLabelEdit::DESTROY';

  @dispatch()
  startEdit = (): DfhLabelEditAPIAction => ({
    type: DfhLabelEditAPIActions.START_EDIT,
    meta: {},
    payload: null,
  });

  @dispatch()
  stopEdit = (): DfhLabelEditAPIAction => ({
    type: DfhLabelEditAPIActions.STOP_EDIT,
    meta: {},
    payload: null,
  });


  @dispatch()
  save = (dfhLabel: DfhLabel): DfhLabelEditAPIAction => ({
    type: DfhLabelEditAPIActions.SAVE,
    meta: { dfhLabel },
    payload: null,
  });

  saveSucceeded = (dfhLabel: DfhLabel): DfhLabelEditAPIAction => ({
    type: DfhLabelEditAPIActions.SAVE_SUCCEEDED,
    meta: {
      dfhLabel
    },
    payload: null
  })

  saveFailed = (error): DfhLabelEditAPIAction => ({
    type: DfhLabelEditAPIActions.SAVE_FAILED,
    meta: null,
    payload: null,
    error,
  })


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): DfhLabelEditAPIAction => ({
    type: DfhLabelEditAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
