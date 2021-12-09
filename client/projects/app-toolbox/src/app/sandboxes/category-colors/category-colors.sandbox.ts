import { sandboxOf } from 'angular-playground';
import { CategoryColorsComponent } from './category-colors.component';

export default sandboxOf(CategoryColorsComponent)
  .add('Category Colors', {
    template: `<gv-category-colors></gv-category-colors>`
  })
