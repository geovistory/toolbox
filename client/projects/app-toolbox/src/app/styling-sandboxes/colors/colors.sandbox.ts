import { sandboxOf } from 'angular-playground';
import { ColorsComponent } from './colors.component';

export default sandboxOf(ColorsComponent)
  .add('Colors', {
    template: `<gv-colors></gv-colors>`
  })
