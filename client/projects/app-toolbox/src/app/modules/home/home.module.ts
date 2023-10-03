import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { NavbarModule } from '../../shared/components/navbar/navbar.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home.component';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    HomeRoutingModule,
    MaterialModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
