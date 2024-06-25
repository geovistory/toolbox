import { ClassConfig, DfhClass, ProDfhClassProjRel, SysConfigClassCategoryBelonging } from '@kleiolab/lib-sdk-lb4';


export interface DfhClassEnriched {
    icon: ClassConfig.IconEnum;
    detailPage: ClassConfig.DetailPageEnum;
    belongsToCategory: SysConfigClassCategoryBelonging;
    dfhClass: DfhClass;
    classConfig: ClassConfig;
    restrictedToOtherProjects?: boolean; // in case of a platform vocabulary class managed by another project
    projectRel?: ProDfhClassProjRel;
}
