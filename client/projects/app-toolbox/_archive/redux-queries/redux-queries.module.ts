import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReduxModule } from "@kleiolab/lib-redux";
import { ActiveProjectPipesService } from './services/active-project-pipes.service';
import { ConfigurationPipesService } from './services/configuration-pipes.service';
import { InformationBasicPipesService } from './services/information-basic-pipes.service';
import { InformationPipesService } from './services/information-pipes.service';
import { SchemaSelectorsService } from './services/schema-selectors.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReduxModule
  ],
  providers: [
    SchemaSelectorsService,
    ActiveProjectPipesService,
    ConfigurationPipesService,
    InformationBasicPipesService,
    InformationPipesService
  ]
})
export class ReduxQueriesModule { }
