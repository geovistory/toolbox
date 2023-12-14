import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'gv-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  imports: [NavbarComponent, RouterLink, MatCardModule, MatListModule, MatDividerModule, RouterLinkActive, RouterOutlet]
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
