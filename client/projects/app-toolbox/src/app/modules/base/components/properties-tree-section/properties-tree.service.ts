import { Injectable } from '@angular/core';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';


@Injectable()
export class PropertiesTreeService {

  constructor(
    private p: ActiveProjectService
  ) { }

}
