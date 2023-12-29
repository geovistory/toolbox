import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../../components/misc/navbar/navbar.component';

@Component({
  selector: 'gv-logout-confirmation',
  templateUrl: './logout-confirmation.component.html',
  styleUrls: ['./logout-confirmation.component.scss'],
  standalone: true,
  imports: [NavbarComponent, RouterLink]
})
export class LogoutConfirmationComponent { }
