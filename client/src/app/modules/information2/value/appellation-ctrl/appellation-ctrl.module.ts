import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppellationCtrlComponent } from './appellation-ctrl.component';
import { AppellationLabelEditorComponent } from './appellation-label-editor/appellation-label-editor.component';
import { AppellationLabelTokenComponent } from './appellation-label-token/appellation-label-token.component';
import { AppellationService } from '../../shared/appellation.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AppellationCtrlComponent,
    AppellationLabelEditorComponent,
    AppellationLabelTokenComponent
  ],
  providers: [
      AppellationService
  ],
  exports:[
    AppellationCtrlComponent    
  ]
})
export class AppellationCtrlModule { }
