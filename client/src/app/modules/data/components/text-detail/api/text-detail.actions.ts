import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { TextDetail } from './text-detail.models';

type Payload = TextDetail;
interface MetaData {
  tabTitle?: string
};
export type TextDetailAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TextDetailAPIActions {
  static readonly SET_TAB_TITLE = 'TextDetail::SET_TAB_TITLE';

  static readonly DESTROY = 'TextDetail::DESTROY';

  /*********************************************************************
  *  Set tab title
  *********************************************************************/
  @dispatch()
  setTabTitle = (tabTitle: string): TextDetailAPIAction => ({
    type: TextDetailAPIActions.SET_TAB_TITLE,
    meta: { tabTitle },
    payload: null,
  });

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): TextDetailAPIAction => ({
    type: TextDetailAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
