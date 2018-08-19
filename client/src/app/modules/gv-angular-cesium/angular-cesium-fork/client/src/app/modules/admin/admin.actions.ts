import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Admin, ClassList } from './admin.models';

interface MetaData { };
export type AdminAction = FluxStandardAction<Admin, MetaData>;


@Injectable()
export class AdminActions {
   
}