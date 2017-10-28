import { Component, OnInit } from '@angular/core';
import { Account } from '../shared/sdk/models/Account';
import { LoopBackAuth } from '../shared/sdk/services/core/auth.service';

@Component({
  selector: 'gv-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {
  model: Account;
  edit: boolean = false;

  constructor(
    private authService: LoopBackAuth
  ) { }

  ngOnInit() {
    this.model = this.authService.getCurrentUserData();
  }

}
