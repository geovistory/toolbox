import { Component, OnInit } from '@angular/core';
import { AccountInfo, BackofficeService } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { NgFor, AsyncPipe } from '@angular/common';


@Component({
    selector: 'gv-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.css'],
    standalone: true,
    imports: [NgFor, AsyncPipe],
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
