import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {SysConfigController} from '..';
import {DfhClass} from '../../models/dfh-class.model';
import {ProVisibilitySettingsValue} from '../../models/project-visibilty-settings/pro-visibility-settings-value';
import {SysConfigValue} from '../../models/sys-config';
import {CommunityVisibilityOptions} from '../../models/sys-config/sys-config-community-visibility-options';
import {ProjectVisibilityOptions} from '../../models/sys-config/sys-config-project-visibility-options';
import {AllowedCommunityVisibility} from '../../models/sys-config/sys-config-visibility-range';
import {DfhClassRepository, ProVisibilitySettingsRepository} from '../../repositories';

interface ClassLookup {[pkClass: number]: DfhClass};

/**
 * this is a controller without api endpoints that can be injected in
 * other controllers, if visibility information for a class is needed
 */
export class VisibilityController {

  systemConfig?: SysConfigValue;
  classLookup?: ClassLookup;
  allClasses?: DfhClass[];
  projectVisibilitySettings?: ProVisibilitySettingsValue;

  constructor(
    @inject('controllers.SysConfigController')
    public sysConfigController: SysConfigController,
    @repository(DfhClassRepository)
    public dfhClass: DfhClassRepository,
    @repository(ProVisibilitySettingsRepository)
    public proVisibilitySettingsRepository: ProVisibilitySettingsRepository,
  ) { }




  /**
   * queries all classes and creates a look-up for pkClass -> basic type
   */
  async getClassLookup(): Promise<ClassLookup> {
    const res: ClassLookup = {}
    this.allClasses = await this.dfhClass.find();
    for (const k of this.allClasses) {
      if (k.pk_class) res[k.pk_class] = k
    }
    return res
  }

  /**
   * Initialize settings including settings of given project
   */

  async initializeSettings(projectId: number) {
    await this.initializeSystemSettings()
    this.projectVisibilitySettings = (await this.proVisibilitySettingsRepository.findByProjectId(projectId))?.settings;
  }

  /**
   * Initialize settings without considering projects
   */
  async initializeSystemSettings() {
    this.systemConfig = await this.sysConfigController.getSystemConfig()
    this.classLookup = await this.getClassLookup()
  }

  /**
  * Get default community visibility
  */
  getDefaultCommunityVisibility(fkClass: number): CommunityVisibilityOptions {
    if (!this.classLookup) throw new Error('classLookup is not set')
    if (!this.systemConfig) throw new Error('systemConfig is not set')
    const basicType = this.classLookup[fkClass]?.basic_type ?? -1;
    return getCommunityVisibilityDefault(this.systemConfig, fkClass, basicType, this.projectVisibilitySettings)
  }


  /**
  * Get default project visibility
  */
  getProjectVisibilityDefault(fkClass: number): ProjectVisibilityOptions {
    if (!this.classLookup) throw new Error('classLookup is not set')
    if (!this.systemConfig) throw new Error('systemConfig is not set')
    const basicType = this.classLookup[fkClass]?.basic_type ?? -1;
    return getProjectVisibilityDefault(this.systemConfig, fkClass, basicType, this.projectVisibilitySettings)
  }

  /**
    * Get allowed community visibility (this is always a system level config)
    */
  getAllowedCommunityVisibility(fkClass: number): AllowedCommunityVisibility {
    if (!this.classLookup) throw new Error('classLookup is not set')
    if (!this.systemConfig) throw new Error('systemConfig is not set')
    const basicType = this.classLookup[fkClass]?.basic_type ?? -1;
    return getCommunityVisibilityRange(this.systemConfig, fkClass, basicType)
  }

  /**
    * Get default community visibility without considering projects
    */
  getSystemDefaultCommunityVisibility(fkClass: number): CommunityVisibilityOptions {
    if (!this.classLookup) throw new Error('classLookup is not set')
    if (!this.systemConfig) throw new Error('systemConfig is not set')
    const basicType = this.classLookup[fkClass]?.basic_type ?? -1;
    return getCommunityVisibilityDefault(this.systemConfig, fkClass, basicType)
  }

}

/**
 * Gets the community visibility default for a class according to project or system config.
 * @param sysConfig system configuration
 * @param pkClass the pk_class of the class
 * @param basicTypeId the basic_type of the class
 * @param projectVisibilitySettings settings for the visibility on project level
 * @returns the community visibility according to system config or a fallback value.
 */
export function getCommunityVisibilityDefault(sysConfig: SysConfigValue, pkClass: number, basicTypeId: number, projectVisibilitySettings?: ProVisibilitySettingsValue): CommunityVisibilityOptions {

  return projectVisibilitySettings?.classes?.[pkClass]?.communityVisibilityDefault ??
    projectVisibilitySettings?.classesByBasicType?.[basicTypeId]?.communityVisibilityDefault ??
    projectVisibilitySettings?.classesDefault?.communityVisibilityDefault ??
    sysConfig?.classes?.[pkClass]?.communityVisibilityDefault ??
    sysConfig?.classesByBasicType?.[basicTypeId]?.communityVisibilityDefault ??
    sysConfig?.classesDefault?.communityVisibilityDefault ??
    {toolbox: true, dataApi: true, website: true};
}

/**
 * Gets the community visibility ramge for a class according to system config.
 * @param sysConfig system configuration
 * @param pkClass the pk_class of the class
 * @param basicTypeId the basic_type of the class
 * @returns the community visibility range according to system config or a fallback value.
 */
export function getCommunityVisibilityRange(sysConfig: SysConfigValue, pkClass: number, basicTypeId: number): AllowedCommunityVisibility {

  return sysConfig?.classes?.[pkClass]?.communityVisibilityRange ??
    sysConfig?.classesByBasicType?.[basicTypeId]?.communityVisibilityRange ??
    sysConfig?.classesDefault?.communityVisibilityRange ??
    {toolbox: [true], dataApi: [true], website: [true]};
}


/**
 * Gets the project visibility default for a class according to  project or system config.
 * @param sysConfig system configuration
 * @param pkClass the pk_class of the class
 * @param basicTypeId the basic_type of the class
 * @param projectVisibilitySettings settings for the visibility on project level
 * @returns the project visibility according to system config or a fallback value.
 */
export function getProjectVisibilityDefault(sysConfig: SysConfigValue, pkClass: number, basicTypeId: number, projectVisibilitySettings?: ProVisibilitySettingsValue): ProjectVisibilityOptions {

  return projectVisibilitySettings?.classes?.[pkClass]?.projectVisibilityDefault ??
    projectVisibilitySettings?.classesByBasicType?.[basicTypeId]?.projectVisibilityDefault ??
    projectVisibilitySettings?.classesDefault?.projectVisibilityDefault ??
    sysConfig?.classes?.[pkClass]?.projectVisibilityDefault ??
    sysConfig?.classesByBasicType?.[basicTypeId]?.projectVisibilityDefault ??
    sysConfig?.classesDefault?.projectVisibilityDefault ??
    {dataApi: false, website: false};
}
