import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActiveProjectPipesService } from '../services/active-project-pipes.service';
import { ConfigurationPipesService } from '../services/configuration-pipes.service';
import { InformationBasicPipesService } from '../services/information-basic-pipes.service';
import { InformationPipesService } from '../services/information-pipes.service';
import { SchemaSelectorsService } from '../services/schema-selectors.service';
import { ReduxStoreModule } from '@kleiolab/lib-redux';
import { SocketsModule } from '@kleiolab/lib-sockets';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReduxStoreModule,
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
