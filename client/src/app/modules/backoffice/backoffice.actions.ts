import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Backoffice, ClassList } from './backoffice.models';

interface MetaData { };
export type BackofficeAction = FluxStandardAction<Backoffice, MetaData>;


@Injectable()
export class BackofficeActions {

}
