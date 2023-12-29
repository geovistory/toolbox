import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../../components/layout/navbar/navbar.component';

@Component({
  selector: 'gv-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss'],
  standalone: true,
  imports: [NavbarComponent, RouterLink]
})
export class AccessDeniedComponent { }
