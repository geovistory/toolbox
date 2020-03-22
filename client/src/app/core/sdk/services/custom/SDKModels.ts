/* tslint:disable */
import { Injectable } from '@angular/core';
import { SysClassFieldPropertyRel } from '../../models/SysClassFieldPropertyRel';
import { SysClassField } from '../../models/SysClassField';
import { SysClassHasTypeProperty } from '../../models/SysClassHasTypeProperty';
import { SysSystemRelevantClass } from '../../models/SysSystemRelevantClass';
import { SysAnalysisType } from '../../models/SysAnalysisType';
import { ProAnalysis } from '../../models/ProAnalysis';
import { PubAccount } from '../../models/PubAccount';
import { Email } from '../../models/Email';
import { ProProject } from '../../models/ProProject';
import { PubAccountProjectRel } from '../../models/PubAccountProjectRel';
import { ProTextProperty } from '../../models/ProTextProperty';
import { ProInfoProjRel } from '../../models/ProInfoProjRel';
import { DfhProfile } from '../../models/DfhProfile';
import { DfhClass } from '../../models/DfhClass';
import { DfhProperty } from '../../models/DfhProperty';
import { DfhLabel } from '../../models/DfhLabel';
import { DatChunk } from '../../models/DatChunk';
import { DatColumn } from '../../models/DatColumn';
import { DatTextProperty } from '../../models/DatTextProperty';
import { DatDigital } from '../../models/DatDigital';
import { WarEntityPreview } from '../../models/WarEntityPreview';
import { SysAppContext } from '../../models/SysAppContext';
import { ProClassFieldConfig } from '../../models/ProClassFieldConfig';
import { ProDfhClassProjRel } from '../../models/ProDfhClassProjRel';
import { ProDfhProfileProjRel } from '../../models/ProDfhProfileProjRel';
import { InfAppellation } from '../../models/InfAppellation';
import { InfTemporalEntity } from '../../models/InfTemporalEntity';
import { InfRole } from '../../models/InfRole';
import { InfLanguage } from '../../models/InfLanguage';
import { InfPersistentItem } from '../../models/InfPersistentItem';
import { InfTimePrimitive } from '../../models/InfTimePrimitive';
import { InfPlace } from '../../models/InfPlace';
import { DatNamespace } from '../../models/DatNamespace';
import { InfTextProperty } from '../../models/InfTextProperty';
import { SysSystemType } from '../../models/SysSystemType';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    SysClassFieldPropertyRel: SysClassFieldPropertyRel,
    SysClassField: SysClassField,
    SysClassHasTypeProperty: SysClassHasTypeProperty,
    SysSystemRelevantClass: SysSystemRelevantClass,
    SysAnalysisType: SysAnalysisType,
    ProAnalysis: ProAnalysis,
    PubAccount: PubAccount,
    Email: Email,
    ProProject: ProProject,
    PubAccountProjectRel: PubAccountProjectRel,
    ProTextProperty: ProTextProperty,
    ProInfoProjRel: ProInfoProjRel,
    DfhProfile: DfhProfile,
    DfhClass: DfhClass,
    DfhProperty: DfhProperty,
    DfhLabel: DfhLabel,
    DatChunk: DatChunk,
    DatColumn: DatColumn,
    DatTextProperty: DatTextProperty,
    DatDigital: DatDigital,
    WarEntityPreview: WarEntityPreview,
    SysAppContext: SysAppContext,
    ProClassFieldConfig: ProClassFieldConfig,
    ProDfhClassProjRel: ProDfhClassProjRel,
    ProDfhProfileProjRel: ProDfhProfileProjRel,
    InfAppellation: InfAppellation,
    InfTemporalEntity: InfTemporalEntity,
    InfRole: InfRole,
    InfLanguage: InfLanguage,
    InfPersistentItem: InfPersistentItem,
    InfTimePrimitive: InfTimePrimitive,
    InfPlace: InfPlace,
    DatNamespace: DatNamespace,
    InfTextProperty: InfTextProperty,
    SysSystemType: SysSystemType,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
