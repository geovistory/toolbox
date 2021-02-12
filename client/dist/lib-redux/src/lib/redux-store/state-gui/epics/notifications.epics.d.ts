import { ToastyConfig, ToastyService } from '@cime/ngx-toasty';
import { Epic } from 'redux-observable-es6-compat';
export declare class NotificationsAPIEpics {
    private toastyService;
    private toastyConfig;
    constructor(toastyService: ToastyService, toastyConfig: ToastyConfig);
    createEpics(): Epic;
    private createAddToastEpic;
}
