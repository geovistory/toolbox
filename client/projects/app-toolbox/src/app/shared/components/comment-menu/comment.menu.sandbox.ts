import { sandboxOf } from 'angular-playground';
import { InitStateModule } from '../init-state/init-state.module';
import { CommentMenuComponent } from './comment-menu.component';
import { CommentMenuModule } from './comment-menu.module';

/*****************************************************************************
 * MOCK services
 *****************************************************************************/
/*****************************************************************************
 * Sandboxes
 *****************************************************************************/
export default sandboxOf(CommentMenuComponent, {
    declareComponent: false,
    imports: [
        CommentMenuModule,
        InitStateModule,
    ],
    providers: [
    ]
})
    .add('CommentMenuComponent', {
        context: {},
        template: `
    <gv-init-state [initState]="initState" [schemaObjects]="schemaObjects"></gv-init-state>
    <div style="display:flex;flex-direction:row;justify-content:center">
        <gv-comment-menu></gv-comment-menu>
    </div>
    `
    })
