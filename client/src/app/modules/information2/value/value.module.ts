import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppellationViewModule } from './appellation-view/appellation-view.module';
import { AppellationCtrlModule } from './appellation-ctrl/appellation-ctrl.module';
import { LanguageViewModule } from './language-view/language-view.module';
import { LanguageCtrlModule } from './language-ctrl/language-ctrl.module';
import { LeafPeItCtrlModule } from './leaf-pe-it-ctrl/leaf-pe-it-ctrl.module';
import { LeafPeItViewModule } from './leaf-pe-it-view/leaf-pe-it-view.module';

@NgModule({
  imports: [
    CommonModule,
    AppellationViewModule,
    AppellationCtrlModule,
    LanguageViewModule,
    LanguageCtrlModule,
    LeafPeItCtrlModule,
    LeafPeItViewModule
  ],
  declarations: [
   
  ],
  providers: [
      
  ],
  exports:[
        
  ]
})
export class ValueModule { }
