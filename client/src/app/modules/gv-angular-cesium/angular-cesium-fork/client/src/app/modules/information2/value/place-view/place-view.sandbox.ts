import { sandboxOf } from 'angular-playground';

import { InitStateModule } from '../../../../shared/components/init-state/init-state.module';
import { Information2Module } from '../../information2.module';
import { PlaceViewComponent } from './place-view.component';




export default sandboxOf(PlaceViewComponent, {
    imports: [
        InitStateModule,
        Information2Module
    ],
    declareComponent: false
})
    .add('Place | View ', {
        context: {
            role: {
                fk_property: 152,
                place: {
                    fk_class: 51,
                    lat: 24.234,
                    long: 110.99
                }
            }
        },
        template: `
        <div class="d-flex justify-content-center mt-5">
            <div style="width:430px;height:400px" class="d-flex">

            <gv-place-view [role]="role"></gv-place-view>
      
            </div>
        </div>`
    })