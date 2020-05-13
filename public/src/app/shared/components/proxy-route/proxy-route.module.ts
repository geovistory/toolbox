import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProxyRouteComponent } from './proxy-route.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ProxyRouteComponent
  ],
  exports: [
    ProxyRouteComponent
  ]
})
export class ProxyRouteModule { }
