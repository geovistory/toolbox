import { Component, OnInit } from '@angular/core';
import { ActiveAccountService } from "projects/app-toolbox/src/app/core/active-account";
import { DatChunk, PubAccount } from 'projects/app-toolbox/src/app/core/sdk-lb4';

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
