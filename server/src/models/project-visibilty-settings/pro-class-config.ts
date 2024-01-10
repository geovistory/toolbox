import {model, property} from '@loopback/repository';
import {CommunityVisibilityOptions} from '../sys-config/sys-config-community-visibility-options';
import {ProjectVisibilityOptions} from '../sys-config/sys-config-project-visibility-options';

@model()
export class ProjectClassConfig {
  @property({type: CommunityVisibilityOptions}) communityVisibilityDefault?: CommunityVisibilityOptions;
  @property({type: ProjectVisibilityOptions}) projectVisibilityDefault?: ProjectVisibilityOptions;
}
