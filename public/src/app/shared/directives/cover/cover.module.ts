import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoverDirective } from './cover.directive';

@NgModule({
  imports: [
    CommonModule,
    PortalModule
  ],
  declarations: [
    CoverDirective
  ],
  exports: [
    CoverDirective
  ]
})
export class CoverModule { }
