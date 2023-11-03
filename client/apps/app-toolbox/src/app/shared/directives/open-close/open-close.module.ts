import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OpenCloseChildDirective } from './open-close-child.directive';
import { OpenCloseContainerDirective } from './open-close-container.directive';



@NgModule({
  declarations: [OpenCloseContainerDirective, OpenCloseChildDirective],
  exports: [OpenCloseContainerDirective, OpenCloseChildDirective],
  imports: [
    CommonModule
  ]
})
export class OpenCloseModule { }
