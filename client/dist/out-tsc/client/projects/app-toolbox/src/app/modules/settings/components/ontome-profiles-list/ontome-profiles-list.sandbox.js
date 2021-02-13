import { sandboxOf } from 'angular-playground';
import { SettingsModule } from '../../settings.module';
import { OntomeProfilesListComponent } from './ontome-profiles-list.component';
export default sandboxOf(OntomeProfilesListComponent, {
    declareComponent: false,
    imports: [
        SettingsModule
    ]
})
    .add('OntomeProfilesListComponent', {
    context: {
        pkProject: 24,
        f: {},
    },
    template: `
    <gv-ontome-profiles-list></gv-ontome-profiles-list>
    `
});
//# sourceMappingURL=ontome-profiles-list.sandbox.js.map