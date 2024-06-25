import { NgModule } from '@angular/core';
import { ActiveProjectPipesService } from './active-project/active-project-pipes.service';
import { ConfigurationPipesService } from './configuration/configuration-pipes.service';
import { InformationBasicPipesService } from './information-basic-pipes.service';
import { InformationPipesService } from './information/information-pipes.service';

@NgModule({
  imports: [],
  providers: [
    ActiveProjectPipesService,
    InformationPipesService,
    ConfigurationPipesService,
    InformationBasicPipesService
  ]
})
export class QueriesModule { }
