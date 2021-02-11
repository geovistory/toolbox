import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { AccountActions } from '../../../modules/account/api/account.actions';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';


@NgModule({
  imports: [
    RouterModule,
    NgbModule,
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
