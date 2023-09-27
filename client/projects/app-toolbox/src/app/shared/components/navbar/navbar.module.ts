import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountActions } from '@kleiolab/lib-redux';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
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
  providers: [
    AccountActions
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
