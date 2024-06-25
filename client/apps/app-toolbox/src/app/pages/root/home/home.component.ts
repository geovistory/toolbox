import { Component, OnInit } from '@angular/core';
import { PubAccount } from "@kleiolab/lib-sdk-lb4";
import { ActiveAccountService } from "../../../services/active-account.service";

import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DatChunk } from "@kleiolab/lib-sdk-lb4";
import { NavbarComponent } from '../../../components/layout/navbar/navbar.component';

@Component({
  selector: 'gv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [NavbarComponent, NgIf, MatButtonModule, RouterLink, NgTemplateOutlet, MatIconModule]
})
export class HomeComponent implements OnInit {

  account: PubAccount;

  // temp
  chunk: DatChunk;

  constructor(
    public activeAccountService: ActiveAccountService,
  ) { }

  ngOnInit() {
    this.activeAccountService.getAccount().subscribe(account => {
      this.account = account;
    })

  }


}
