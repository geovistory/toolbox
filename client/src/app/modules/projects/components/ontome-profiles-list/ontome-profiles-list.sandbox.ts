import { sandboxOf } from 'angular-playground';
import { ProjectsModule } from '../../projects.module';
import { OntomeProfilesListComponent } from './ontome-profiles-list.component';

export default sandboxOf(OntomeProfilesListComponent, {
  declareComponent: false,
  imports: [
    ProjectsModule
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
