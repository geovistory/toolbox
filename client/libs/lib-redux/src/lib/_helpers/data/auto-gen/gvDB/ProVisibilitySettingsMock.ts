import {ProVisibilitySettings} from '@kleiolab/lib-sdk-lb4';
import {ProProjectMock} from './ProProjectMock';

/**
 * pk_entity prefix: 900
 */
export class ProVisibilitySettingsMock {


  static readonly EXAMPLE_1: Partial<ProVisibilitySettings> = ({
    pk_entity: 9001,
    fk_project: ProProjectMock.PROJECT_1.pk_entity,
    settings: {
      classesDefault: {
        communityVisibilityDefault: {toolbox: true, dataApi: true, website: true},
        projectVisibilityDefault: {dataApi: true, website: true},
      },
      classesByBasicType: {
        9: {
          communityVisibilityDefault: {toolbox: true, dataApi: true, website: false},
        }
      },
      classes: {
        123: {
          communityVisibilityDefault: {toolbox: true, dataApi: false, website: false},
        }
      }
    }
  })

}
