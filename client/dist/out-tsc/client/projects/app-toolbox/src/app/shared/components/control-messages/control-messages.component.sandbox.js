import { sandboxOf } from 'angular-playground';
import { FormControl } from '@angular/forms';
import { ControlMessagesComponent } from './control-messages.component';
let minError = new FormControl();
minError.setErrors({ min: { min: 12 } });
minError.markAsTouched();
export default sandboxOf(ControlMessagesComponent)
    .add('from min error', {
    template: `<gv-control-messages [control]="control">Hey playground!</gv-control-messages>`,
    context: {
        control: minError
    }
});
//# sourceMappingURL=control-messages.component.sandbox.js.map