import { Component, OnInit } from '@angular/core';
import { LoopBackAuth } from '@kleiolab/lib-sdk-lb3';

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
