import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ClassAndTypeSelector } from './class-and-type-selector.models';
import { TreeviewItem } from 'ngx-treeview';

type Payload = ClassAndTypeSelector;
interface MetaData {
  pkClasses?: number[];
  pkProject?: number;
  items?: TreeviewItem[]
};
export type ClassAndTypeSelectorAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ClassAndTypeSelectorAPIActions {
  static readonly LOAD = 'ClassAndTypeSelector::LOAD';
  static readonly LOAD_SUCCEEDED = 'ClassAndTypeSelector::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'ClassAndTypeSelector::LOAD_FAILED';

  static readonly DESTROY = 'ClassAndTypeSelector::DESTROY';

  @dispatch()
  load = (pkClasses: number[], pkProject: number): ClassAndTypeSelectorAPIAction => ({
    type: ClassAndTypeSelectorAPIActions.LOAD,
    meta: { pkClasses, pkProject },
    payload: null,
  });

  loadSucceeded = (items: TreeviewItem[]): ClassAndTypeSelectorAPIAction => ({
    type: ClassAndTypeSelectorAPIActions.LOAD_SUCCEEDED,
    meta: {
      items
    },
    payload: null
  })

  loadFailed = (error): ClassAndTypeSelectorAPIAction => ({
    type: ClassAndTypeSelectorAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): ClassAndTypeSelectorAPIAction => ({
    type: ClassAndTypeSelectorAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
