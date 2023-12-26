import { sandboxOf } from 'angular-playground';
import { SettingsModule } from '../../../modules/settings/settings.module';
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
  })
