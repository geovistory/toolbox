import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {SysConfigController} from '.';
import {DfhClass} from '../models/dfh-class.model';
import {SysConfigValue} from '../models/sys-config';
import {CommunityVisibilityOptions} from '../models/sys-config/sys-config-community-visibility-options';
import {ProjectVisibilityOptions} from '../models/sys-config/sys-config-project-visibility-options';
import {VisibilityRange} from '../models/sys-config/sys-config-visibility-range';
import {DfhClassRepository} from '../repositories';

interface ClassLookup {[pkClass: number]: DfhClass};

/**
 * this is a controller without api endpoints that can be injected in
 * other controllers, if visibility information for a class is needed
 */
export class VisibilityController {

  systemConfig?: SysConfigValue;
  classLookup?: ClassLookup;
  allClasses?: DfhClass[];

  constructor(
    @inject('controllers.SysConfigController')
    public sysConfigController: SysConfigController,
    @repository(DfhClassRepository)
    public dfhClass: DfhClassRepository,
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

  async initializeConfiguration() {
    this.systemConfig = await this.sysConfigController.getSystemConfig()
    this.classLookup = await this.getClassLookup()
  }

  getCommunityVisibilityDefault(fkClass = -1): CommunityVisibilityOptions {
    if (!this.classLookup) throw new Error('classLookup is not set')
    if (!this.systemConfig) throw new Error('systemConfig is not set')
    const basicType = this.classLookup[fkClass]?.basic_type ?? -1;
    // if (fkClass === -1) console.warn('no fkClass given to get community visibility')
    // if (basicType === -1) console.warn('no basicType found to get community visibility')
    return getCommunityVisibilityDefault(this.systemConfig, fkClass, basicType)
  }

  getCommunityVisibilityRange(fkClass = -1): VisibilityRange {
    if (!this.classLookup) throw new Error('classLookup is not set')
    if (!this.systemConfig) throw new Error('systemConfig is not set')
    const basicType = this.classLookup[fkClass]?.basic_type ?? -1;
    return getCommunityVisibilityRange(this.systemConfig, fkClass, basicType)
  }

  getProjectVisibilityDefault(fkClass = -1): ProjectVisibilityOptions {
    if (!this.classLookup) throw new Error('classLookup is not set')
    if (!this.systemConfig) throw new Error('systemConfig is not set')
    const basicType = this.classLookup[fkClass]?.basic_type ?? -1;
    // if (fkClass === -1) console.warn('no fkClass given to get project visibility')
    // if (basicType === -1) console.warn('no basicType found to get project visibility')
    return getProjectVisibilityDefault(this.systemConfig, fkClass, basicType)
  }

}

/**
 * Gets the community visibility default for a class according to system config.
 * @param sysConfig system configuration
 * @param pkClass the pk_class of the class
 * @param basicTypeId the basic_type of the class
 * @returns the community visibility according to system config or a fallback value.
 */
export function getCommunityVisibilityDefault(sysConfig: SysConfigValue, pkClass: number, basicTypeId: number): CommunityVisibilityOptions {

  return sysConfig?.classes?.[pkClass]?.communityVisibilityDefault ??
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
export function getCommunityVisibilityRange(sysConfig: SysConfigValue, pkClass: number, basicTypeId: number): VisibilityRange {

  return sysConfig?.classes?.[pkClass]?.communityVisibilityRange ??
    sysConfig?.classesByBasicType?.[basicTypeId]?.communityVisibilityRange ??
    sysConfig?.classesDefault?.communityVisibilityRange ??
  {
    min: {toolbox: true, dataApi: true, website: true},
    max: {toolbox: true, dataApi: true, website: true}
  };
}


/**
 * Gets the project visibility default for a class according to system config.
 * @param sysConfig system configuration
 * @param pkClass the pk_class of the class
 * @param basicTypeId the basic_type of the class
 * @returns the project visibility according to system config or a fallback value.
 */
export function getProjectVisibilityDefault(sysConfig: SysConfigValue, pkClass: number, basicTypeId: number): ProjectVisibilityOptions {

  return sysConfig?.classes?.[pkClass]?.projectVisibilityDefault ??
    sysConfig?.classesByBasicType?.[basicTypeId]?.projectVisibilityDefault ??
    sysConfig?.classesDefault?.projectVisibilityDefault ??
    {dataApi: false, website: false};
}
