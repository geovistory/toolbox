import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
} from '@angular/material';
import { CoreTableMenuComponent } from './menu.component';

const components = [CoreTableMenuComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
})
export class CoreTableMenuModule {}
