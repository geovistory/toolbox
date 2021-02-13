var TypesAPIActions_1;
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
let TypesAPIActions = TypesAPIActions_1 = class TypesAPIActions {
    constructor() {
        // static readonly LOAD = 'Types::LOAD';
        // static readonly LOAD_STARTED = 'Types::LOAD_STARTED';
        // static readonly LOAD_SUCCEEDED = 'Types::LOAD_SUCCEEDED';
        // static readonly LOAD_FAILED = 'Types::LOAD_FAILED';
        //   @dispatch()
        //   load = (pkProject: number, pkTypeClass: number): TypesAPIAction => ({
        //     type: TypesAPIActions.LOAD,
        //     meta: { pkProject, pkTypeClass },
        //     payload: null,
        //   });
        //   loadSucceeded = (types: InfPersistentItem[]): TypesAPIAction => ({
        //     type: TypesAPIActions.LOAD_SUCCEEDED,
        //     meta: { types },
        //     payload: null
        //   })
        //   loadFailed = (error): TypesAPIAction => ({
        //     type: TypesAPIActions.LOAD_FAILED,
        //     meta: null,
        //     payload: null,
        //     error,
        //   })
        //   /*********************************************************************
        //  *  Methods related to the add form
        //  *********************************************************************/
        //   @dispatch()
        //   openAddForm = (create: CreateOrAddEntity): TypesAPIAction => ({
        //     type: TypesAPIActions.OPEN_ADD_FORM,
        //     meta: { create },
        //     payload: null
        //   })
        //   @dispatch()
        //   closeAddForm = (): TypesAPIAction => ({
        //     type: TypesAPIActions.CLOSE_ADD_FORM,
        //     meta: null,
        //     payload: null
        //   })
        //   @dispatch()
        //   createSucceeded = (type: InfPersistentItem): TypesAPIAction => ({
        //     type: TypesAPIActions.CREATE_SUCCEEDED,
        //     meta: { type },
        //     payload: null
        //   })
        //   /*********************************************************************
        //    *  Methods related to the edit form
        //    *********************************************************************/
        //   @dispatch()
        //   openEditForm = (pkProject: number, type: InfPersistentItem): TypesAPIAction => ({
        //     type: TypesAPIActions.OPEN_EDIT_FORM,
        //     meta: { pkProject, type },
        //     payload: null
        //   })
        //   openEditFormSucceeded = (peItDetail: PeItDetail): TypesAPIAction => ({
        //     type: TypesAPIActions.OPEN_EDIT_FORM_SUCCEEDED,
        //     meta: { peItDetail },
        //     payload: null
        //   })
        //   openEditFormFailed = (error): TypesAPIAction => ({
        //     type: TypesAPIActions.OPEN_EDIT_FORM_FAILED,
        //     meta: null,
        //     payload: null,
        //     error
        //   })
        //   @dispatch()
        //   closeEditForm = (): TypesAPIAction => ({
        //     type: TypesAPIActions.CLOSE_EDIT_FORM,
        //     meta: null,
        //     payload: null
        //   })
        /*********************************************************************
        *  Set the tab title
        *********************************************************************/
        this.setTabTitle = (tabTitle) => ({
            type: TypesAPIActions_1.SET_TAB_TITLE,
            meta: { tabTitle },
            payload: null
        });
        /*********************************************************************
        *  Method to distroy the slice of store
        *********************************************************************/
        this.destroy = () => ({
            type: TypesAPIActions_1.DESTROY,
            meta: null,
            payload: null
        });
    }
};
// static readonly OPEN_ADD_FORM = 'Types::OPEN_ADD_FORM';
// static readonly CLOSE_ADD_FORM = 'Types::CLOSE_ADD_FORM';
// static readonly CREATE = 'Types::CREATE';
// static readonly CREATE_STARTED = 'Types::CREATE_STARTED';
// static readonly CREATE_SUCCEEDED = 'Types::CREATE_SUCCEEDED';
// static readonly CREATE_FAILED = 'Types::CREATE_FAILED';
// static readonly OPEN_EDIT_FORM = 'Types::OPEN_EDIT_FORM';
// static readonly OPEN_EDIT_FORM_SUCCEEDED = 'Types::OPEN_EDIT_FORM_SUCCEEDED';
// static readonly OPEN_EDIT_FORM_FAILED = 'Types::OPEN_EDIT_FORM_FAILED';
// static readonly CLOSE_EDIT_FORM = 'Types::CLOSE_EDIT_FORM';
TypesAPIActions.SET_TAB_TITLE = 'Types::SET_TAB_TITLE';
TypesAPIActions.DESTROY = 'Types::DESTROY';
tslib_1.__decorate([
    dispatch()
], TypesAPIActions.prototype, "setTabTitle", void 0);
tslib_1.__decorate([
    dispatch()
], TypesAPIActions.prototype, "destroy", void 0);
TypesAPIActions = TypesAPIActions_1 = tslib_1.__decorate([
    Injectable()
], TypesAPIActions);
export { TypesAPIActions };
//# sourceMappingURL=types.actions.js.map