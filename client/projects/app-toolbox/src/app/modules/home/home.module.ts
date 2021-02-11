import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavbarModule } from '../../shared/components/navbar/navbar.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home.component';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
