import { sandboxOf } from 'angular-playground';
import { BaseModule } from '../../base.module';
import { SliderComponent } from './slider.component';


/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(SliderComponent, {
    declareComponent: false,
    imports: [BaseModule],
    providers: []
})
    .add('SliderComponent ', {
        context: { slide: 'left' },
        template: `
        <gv-slider [slide]="slide">

            <div left-header>HEADER left</div>
            <div left-body>BODY left</div>
            <div left-footer>FOOTER left</div>

            <div center-header>HEADER center</div>
            <div center-body>BODY center</div>
            <div center-footer>
                FOOTER center
                <br/>
                <button (click)="slide='left'">GO LEFT</button>
                <button (click)="slide='right'">GO RIGHT</button>
            </div>

            <div right-header>HEADER right</div>
            <div right-body>BODY right</div>
            <div right-footer>FOOTER right</div>

        </gv-slider>
        `
    })
