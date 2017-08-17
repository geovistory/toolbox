import { Component, OnInit } from '@angular/core';

import {LoopBackAuth} from './../shared/sdk/services/core/auth.service';
import {User} from './../shared/sdk/models/User';


@Component({
  selector: 'gv-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  user: User;

  constructor(
    private authService: LoopBackAuth
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUserData();
  }

}
