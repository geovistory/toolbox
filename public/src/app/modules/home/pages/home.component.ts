import { Component, OnInit } from '@angular/core';
import { ActiveAccountService, PubAccount } from 'app/core';

@Component({
  selector: 'gv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  account: PubAccount;

  constructor(
    private activeAccountService: ActiveAccountService,
  ) { }

  ngOnInit() {
    this.activeAccountService.getAccount().subscribe(account => {
      this.account = account;
    })
  }

}
