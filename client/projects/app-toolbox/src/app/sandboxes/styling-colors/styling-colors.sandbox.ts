import { sandboxOf } from 'angular-playground';
import { StylingColorsComponent } from './styling-colors.component';

export default sandboxOf(StylingColorsComponent)
  .add('Colors', {
    template: `<gv-styling-colors></gv-styling-colors>`
  })
