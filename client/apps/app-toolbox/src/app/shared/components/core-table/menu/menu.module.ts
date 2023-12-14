import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../core/material/material.module';
import { CoreTableMenuComponent } from './menu.component';

const components = [CoreTableMenuComponent];

@NgModule({
    exports: components,
    imports: [MaterialModule, ...components],
})
export class CoreTableMenuModule { }
