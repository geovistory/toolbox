import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { AccountActions } from '../../../modules/account/api/actions';


@NgModule({
  imports: [
    RouterModule,
    NgbModule,
    CommonModule
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
