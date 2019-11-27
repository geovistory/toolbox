import { sandboxOf } from 'angular-playground';
import { EntityPreviewsPaginatedComponent } from './entity-previews-paginated.component';
import { EntityPreviewsPaginatedModule } from './entity-previews-paginated.module';


export default sandboxOf(EntityPreviewsPaginatedComponent, {
  declareComponent: false,
  imports: [EntityPreviewsPaginatedModule]
})
  .add('EntityPreviewsPaginatedComponent ', {
    context: {
      pkEntities: [150432, 153070, 153505, 155567, 156083, 156870],
      pkProject: 84760
    },
    template: `
        <div style="width:360;height:400px; margin: 30px;">
          <gv-entity-previews-paginated [pkProject]="pkProject" [pkEntities]="pkEntities">
          </gv-entity-previews-paginated>
        </div>
        `
  })
