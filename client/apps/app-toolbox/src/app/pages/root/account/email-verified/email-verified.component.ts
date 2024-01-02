import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../../components/layout/navbar/navbar.component';

@Component({
  selector: 'gv-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.scss'],
  standalone: true,
  imports: [NavbarComponent, RouterLink]
})
export class EmailVerifiedComponent { }

