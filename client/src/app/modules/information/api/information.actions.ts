import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Project } from 'app/core';

interface MetaData { };
export type InformationAction = FluxStandardAction<any, MetaData>;


@Injectable()
export class InformationActions {

    // static SET_ENTITY_PK = 'SET_ENTITY_PK';

    // setEntityPk():InformationAction {
    //     return 
    // } 

}