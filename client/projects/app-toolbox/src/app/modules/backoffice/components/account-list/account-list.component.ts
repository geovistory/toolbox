import { Component, OnInit } from '@angular/core';
import { AccountInfo, BackofficeService } from '@kleiolab/lib-sdk-lb4';
import { KeysPipe } from 'projects/app-toolbox/src/app/shared/pipes/keys.pipe';
import { Observable } from 'rxjs';


@Component({
  selector: 'gv-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
  providers: [KeysPipe]
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
