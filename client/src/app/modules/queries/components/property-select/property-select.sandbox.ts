import { sandboxOf } from 'angular-playground';
import { TreeNodeData } from 'app/modules/queries/components/class-and-type-select/class-and-type-select.component';
import { BehaviorSubject } from 'rxjs';

import { PropertySelectComponent, PropertyOption } from './property-select.component';
import { QueriesModule } from '../../queries.module';
import { FilterTree } from '../../containers/query-detail/query-detail.component';
import { propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';





export default sandboxOf(PropertySelectComponent, {
    imports: [
        QueriesModule
    ],
    declareComponent: false
})
    .add('Checklist Select', {
        context: {
            qtree: new FilterTree({
                outgoingProperties: [123]
            }),
            options$: new BehaviorSubject([
                {
                    label: 'A',
                    isOutgoing: true,
                    pk: 123,
                    propertyFieldKey: propertyFieldKeyFromParams(123, true)
                }
            ] as PropertyOption[])
        },
        template: `

            <div class="d-flex justify-content-center mt-5">
                <div style="width:430px;height:400px" class="d-flex">
                <gv-property-select [qtree]="qtree" [options$]="options$"></gv-property-select>
                </div>

            </div>
        `
    })
