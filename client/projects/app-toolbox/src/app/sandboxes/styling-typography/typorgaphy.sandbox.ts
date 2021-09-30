import { sandboxOf } from 'angular-playground';
import { TypographyComponent } from './typography.component';

export default sandboxOf(TypographyComponent)
  .add('Typography', {
    template: `<gv-typography></gv-typography>`
  })
