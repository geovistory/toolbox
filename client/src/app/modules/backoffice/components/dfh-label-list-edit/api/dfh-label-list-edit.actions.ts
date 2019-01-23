import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { DfhLabelListEditI } from './dfh-label-list-edit.models';
import { DfhLabel } from 'app/core';

type Payload = DfhLabelListEditI;
interface MetaData {
  dfhLabel?: DfhLabel
};
export type DfhLabelListEditAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class DfhLabelListEditAPIActions {
  static readonly START_CREATE = 'DfhLabelEdit::START_CREATE';
  static readonly STOP_CREATE = 'DfhLabelEdit::STOP_CREATE';

  static readonly CREATE = 'DfhLabelListEdit::CREATE';
  static readonly CREATE_SUCCEEDED = 'DfhLabelListEdit::CREATE_SUCCEEDED';
  static readonly CREATE_FAILED = 'DfhLabelListEdit::CREATE_FAILED';

  static readonly DELETE = 'DfhLabelEdit::DELETE';
  static readonly DELETE_SUCCEEDED = 'DfhLabelEdit::DELETE_SUCCEEDED';
  static readonly DELETE_FAILED = 'DfhLabelEdit::DELETE_FAILED';


  static readonly DESTROY = 'DfhLabelListEdit::DESTROY';

  @dispatch()
  startCreate = (): DfhLabelListEditAPIAction => ({
    type: DfhLabelListEditAPIActions.START_CREATE,
    meta: {},
    payload: null,
  });

  @dispatch()
  stopCreate = (): DfhLabelListEditAPIAction => ({
    type: DfhLabelListEditAPIActions.STOP_CREATE,
    meta: {},
    payload: null,
  });


  @dispatch()
  create = (dfhLabel): DfhLabelListEditAPIAction => ({
    type: DfhLabelListEditAPIActions.CREATE,
    meta: { dfhLabel },
    payload: null,
  });

  createSucceeded = (dfhLabel: DfhLabel): DfhLabelListEditAPIAction => ({
    type: DfhLabelListEditAPIActions.CREATE_SUCCEEDED,
    meta: { dfhLabel },
    payload: null
  })

  createFailed = (error): DfhLabelListEditAPIAction => ({
    type: DfhLabelListEditAPIActions.CREATE_FAILED,
    meta: null,
    payload: null,
    error,
  })


  @dispatch()
  delete = (dfhLabel: DfhLabel): DfhLabelListEditAPIAction => ({
    type: DfhLabelListEditAPIActions.DELETE,
    meta: { dfhLabel },
    payload: null,
  });

  deleteSucceeded = (dfhLabel: DfhLabel): DfhLabelListEditAPIAction => ({
    type: DfhLabelListEditAPIActions.DELETE_SUCCEEDED,
    meta: { dfhLabel },
    payload: null
  })

  deleteFailed = (error): DfhLabelListEditAPIAction => ({
    type: DfhLabelListEditAPIActions.DELETE_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): DfhLabelListEditAPIAction => ({
    type: DfhLabelListEditAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
