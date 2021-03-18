import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { CoreTableMenuComponent } from './menu.component';

const components = [CoreTableMenuComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [MaterialModule],
})
export class CoreTableMenuModule { }
