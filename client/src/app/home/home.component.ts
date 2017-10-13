import { Component, OnInit } from '@angular/core';
import { Account } from '../shared/sdk/models/Account';
import { ActiveAccountService } from '../shared/services/active-account.service';

@Component({
  selector: 'gv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  account: Account;

  constructor(
    private activeAccountService: ActiveAccountService,
  ) { }

  ngOnInit() {
    this.activeAccountService.getAccount().subscribe(account => {
      this.account = account;
    })
  }

}
