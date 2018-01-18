import { Injectable } from '@angular/core';
import { PersistentItemVersion } from '../sdk/models/PersistentItemVersion';
import { AppellationLabel } from '../classes/appellation-label/appellation-label';
import { ActiveProjectService } from './active-project.service';

@Injectable()
export class ActivePeItService {

  pkEntity:number; // pk_entity of the active persistent item

  peIt:PersistentItemVersion; // active persistent item

  constructor(
    private activeProjectService:ActiveProjectService
  ) { }


  /**
  * getStandardAppellationLabelOfProject - returns the standard appellation of
  * the active PeIt of the active project
  *
  * @return {type}  description
  */
  getStandardAppellationLabelOfProject():AppellationLabel{
    // TODO
    // use: this.activeProjectService
    return;
  }

  /**
  * getAppellationLabelToString - converts an AppellationLabel to a string
  *
  * @return {string}  standard appellation as string
  */
  getAppellationLabelToString():string{
    // TODO
    return '';
  }
}
