import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './pages/home.component';
import { NavbarModule } from '../../shared/components/navbar/navbar.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    HomeRoutingModule
  ],
  declarations: [  
    HomeComponent
  ]
})
export class HomeModule { }
