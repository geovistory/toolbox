import { Component, OnInit } from '@angular/core';
import { AccountInfo, BackofficeService } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';


@Component({
  selector: 'gv-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements OnInit {

  accounts$: Observable<AccountInfo[]>;
  constructor(
    private backofficeApi: BackofficeService
  ) { }

  ngOnInit() {
    this.accounts$ = this.backofficeApi.findAccountDataControllerGetAccounts()
  }

}
