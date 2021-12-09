import { sandboxOf } from 'angular-playground';
import { CommentMenuModule } from 'projects/app-toolbox/src/app/shared/components/comment-menu/comment-menu.module';
import { InitStateModule } from 'projects/app-toolbox/src/app/shared/components/init-state/init-state.module';
import { DataModule } from '../../../data.module';
import { FactoidPropertyMappingComponent } from './factoid-property-mapping.component';

/*****************************************************************************
 * MOCK services
 *****************************************************************************/

/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(FactoidPropertyMappingComponent, {
    declareComponent: false,
    imports: [
        CommentMenuModule,
        DataModule,
        InitStateModule,
    ],
    providers: [
    ]
})
    .add('FactoidPropertyMappingComponent', {
        context: {},
        template: `
        <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
        <div style="display:flex; flex-direction:row; justify-content:center">
            <gv-factoid-property-mapping></gv-factoid-property-mapping>
        <div>
    `
    })
