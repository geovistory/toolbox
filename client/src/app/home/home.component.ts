import { Component, OnInit } from '@angular/core';
import { LoopBackAuth } from '../shared/sdk/services/core/auth.service';
import { Account } from '../shared/sdk/models/Account';

@Component({
  selector: 'gv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  account: Account;

  constructor(
    private authService: LoopBackAuth
  ) { }

  ngOnInit() {
    this.account = this.authService.getCurrentUserData();
  }

}
