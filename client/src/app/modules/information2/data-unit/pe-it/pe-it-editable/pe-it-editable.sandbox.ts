import { sandboxOf } from "angular-playground";
import { PeItEditableComponent } from "./pe-it-editable.component";




export default sandboxOf(PeItEditableComponent, {
  imports: [

  ],
  declarations: [
 
  ],
  providers: [
  
  ]
})
  .add('View ', {
    context: {
      
    },
    template: `
    <div class="d-flex justify-content-center mt-5">
      <div style="width:430px;height:400px" class="d-flex">
        <gv-pe-it-editable></gv-pe-it-editable>
      </div>
    </div>
        `
  })