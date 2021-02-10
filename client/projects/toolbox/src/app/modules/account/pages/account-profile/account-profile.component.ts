import { Component, OnInit } from '@angular/core';
import { LoopBackAuth } from "projects/toolbox/src/app/core/sdk";

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
