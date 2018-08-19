import { sandboxOf } from 'angular-playground';

import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { Information2Module } from '../../information2.module';
import { TimePrimitiveViewComponent } from './time-primitive-view.component';




export default sandboxOf(TimePrimitiveViewComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('TimePrimitve | View with cal from Epr ', {
        context: {
            role: {
                fk_property: 152,
                time_primitive: {
                    fk_class: 335,
                    duration: '1 year',
                    julian_day: 2451558
                },
                entity_version_project_rels: [
                    {
                        calendar: 'julian'
                    }
                ]
            }
        },
        template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">

            <gv-time-primitive-view [role]="role" show="duration"></gv-time-primitive-view>
      
            </div>
        </div>`
    })