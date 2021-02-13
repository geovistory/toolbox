import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'projects/app-toolbox/src/app/core/material/material.module';
import { FeedbackDialogComponent } from './components/feedback-dialog/feedback-dialog.component';
let UserFeedbackModule = class UserFeedbackModule {
};
UserFeedbackModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MaterialModule
        ],
        declarations: [FeedbackDialogComponent],
        entryComponents: [FeedbackDialogComponent]
    })
], UserFeedbackModule);
export { UserFeedbackModule };
//# sourceMappingURL=user-feedback.module.js.map