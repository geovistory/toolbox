import { Component, OnInit } from '@angular/core';
import { ActiveAccountService } from "../../../core/active-account";
import { PubAccount } from "@kleiolab/lib-sdk-lb4";

import { DatChunk } from "@kleiolab/lib-sdk-lb4";

@Component({
  selector: 'gv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
