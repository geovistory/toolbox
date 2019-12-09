import { sandboxOf } from 'angular-playground';
import { VisualsModule } from '../../visuals.module';
import { MapVisualDemoComponent } from './map-visual-demo.component';
import { InitStateModule } from 'app/shared/components/init-state/init-state.module';

export default sandboxOf(MapVisualDemoComponent, {
  declareComponent: false,
  imports: [
    VisualsModule,
  ]
})
  .add('MapVisualDemo | New ', {
    context: {
    },
    template: `

      <gv-map-visual-demo></gv-map-visual-demo>
       `
  })
