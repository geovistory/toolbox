import { Injectable } from '@angular/core';
import { ActiveProjectPipesService } from './active-project/active-project-pipes.service';
import { ConfigurationPipesService } from './configuration/configuration-pipes.service';
import { InformationBasicPipesService } from './information-basic-pipes.service';
import { InformationPipesService } from './information/information-pipes.service';

@Injectable({
  providedIn: 'root'
})
export class QueriesFacade {
  constructor(
    public activeProject: ActiveProjectPipesService,
    public information: InformationPipesService,
    public configuration: ConfigurationPipesService,
    public informationBasic: InformationBasicPipesService
  ) { }
}
