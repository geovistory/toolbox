import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReduxStoreModule } from '../redux-store/redux-store.module';
import { SchemaSelectorsService } from './services/schema-selectors.service';
import { ConfigurationPipesService } from './services/configuration-pipes.service';
import { ActiveProjectPipesService } from './services/active-project-pipes.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReduxStoreModule
  ],
  providers: [
    SchemaSelectorsService,
    ActiveProjectPipesService,
    ConfigurationPipesService
  ]
})
export class ReduxQueriesModule { }
