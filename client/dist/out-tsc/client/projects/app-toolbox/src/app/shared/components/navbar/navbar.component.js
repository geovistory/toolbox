import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { FeedbackDialogComponent } from 'projects/app-toolbox/src/app/modules/user-feedback/components/feedback-dialog/feedback-dialog.component';
import { environment } from 'projects/app-toolbox/src/environments/environment';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
let NavbarComponent = class NavbarComponent {
    constructor(activeAccountService, router, dialog) {
        this.activeAccountService = activeAccountService;
        this.router = router;
        this.dialog = dialog;
        this.isNavbarCollapsed = true;
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
    }
    ngOnInit() {
        this.subscription = this.activeAccountService.getAccount().subscribe(account => {
            this.account = account;
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    logout() {
        this.activeAccountService.logout()
            .subscribe(data => {
            this.router.navigate(['/']);
        }, error => {
            this.router.navigate(['/']);
        });
    }
    openFeedbackDialog() {
        const dialogRef = this.dialog.open(FeedbackDialogComponent, {
            width: '470px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }
};
NavbarComponent = tslib_1.__decorate([
    AutoUnsubscribe(),
    Component({
        selector: 'gv-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.scss']
    })
], NavbarComponent);
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map