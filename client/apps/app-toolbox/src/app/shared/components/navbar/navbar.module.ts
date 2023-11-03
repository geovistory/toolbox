import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../core/material/material.module';
import { NavbarComponent } from './navbar.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
