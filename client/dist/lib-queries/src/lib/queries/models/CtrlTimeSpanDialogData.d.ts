import { Observable } from 'rxjs';
import { CtrlTimeSpanDialogResult } from './CtrlTimeSpanDialogResult';
export interface CtrlTimeSpanDialogData {
    timePrimitives: CtrlTimeSpanDialogResult;
    beforeCloseCallback?: (timePrimitives: CtrlTimeSpanDialogResult) => Observable<boolean>;
}
