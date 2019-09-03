import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CoreTableMenuComponent } from './menu.component';

const components = [CoreTableMenuComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
})
export class CoreTableMenuModule {}
