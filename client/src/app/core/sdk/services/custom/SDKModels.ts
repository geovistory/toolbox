/* tslint:disable */
import { Injectable } from '@angular/core';
import { SysClassFieldPropertyRel } from '../../models/SysClassFieldPropertyRel';
import { SysClassField } from '../../models/SysClassField';
import { SysClassHasTypeProperty } from '../../models/SysClassHasTypeProperty';
import { SysSystemRelevantClass } from '../../models/SysSystemRelevantClass';
import { ProQuery } from '../../models/ProQuery';
import { ProVisual } from '../../models/ProVisual';
import { ProPropertyLabel } from '../../models/ProPropertyLabel';
import { PubAccount } from '../../models/PubAccount';
import { Email } from '../../models/Email';
import { ProProject } from '../../models/ProProject';
import { PubAccountProjectRel } from '../../models/PubAccountProjectRel';
import { ProTextProperty } from '../../models/ProTextProperty';
import { ProInfoProjRel } from '../../models/ProInfoProjRel';
import { DfhClass } from '../../models/DfhClass';
import { DfhProperty } from '../../models/DfhProperty';
import { DfhPropertyView } from '../../models/DfhPropertyView';
import { DfhLabel } from '../../models/DfhLabel';
import { DfhTextProperty } from '../../models/DfhTextProperty';
import { DatChunk } from '../../models/DatChunk';
import { DatDigital } from '../../models/DatDigital';
import { WarEntityPreview } from '../../models/WarEntityPreview';
import { DfhClassProfileView } from '../../models/DfhClassProfileView';
import { DfhPropertyProfileView } from '../../models/DfhPropertyProfileView';
import { SysAppContext } from '../../models/SysAppContext';
import { ProClassFieldConfig } from '../../models/ProClassFieldConfig';
import { ProDfhClassProjRel } from '../../models/ProDfhClassProjRel';
import { InfAppellation } from '../../models/InfAppellation';
import { InfTemporalEntity } from '../../models/InfTemporalEntity';
import { InfRole } from '../../models/InfRole';
import { InfLanguage } from '../../models/InfLanguage';
import { InfPersistentItem } from '../../models/InfPersistentItem';
import { InfTimePrimitive } from '../../models/InfTimePrimitive';
import { InfEntityAssociation } from '../../models/InfEntityAssociation';
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
    ProQuery: ProQuery,
    ProVisual: ProVisual,
    ProPropertyLabel: ProPropertyLabel,
    PubAccount: PubAccount,
    Email: Email,
    ProProject: ProProject,
    PubAccountProjectRel: PubAccountProjectRel,
    ProTextProperty: ProTextProperty,
    ProInfoProjRel: ProInfoProjRel,
    DfhClass: DfhClass,
    DfhProperty: DfhProperty,
    DfhPropertyView: DfhPropertyView,
    DfhLabel: DfhLabel,
    DfhTextProperty: DfhTextProperty,
    DatChunk: DatChunk,
    DatDigital: DatDigital,
    WarEntityPreview: WarEntityPreview,
    DfhClassProfileView: DfhClassProfileView,
    DfhPropertyProfileView: DfhPropertyProfileView,
    SysAppContext: SysAppContext,
    ProClassFieldConfig: ProClassFieldConfig,
    ProDfhClassProjRel: ProDfhClassProjRel,
    InfAppellation: InfAppellation,
    InfTemporalEntity: InfTemporalEntity,
    InfRole: InfRole,
    InfLanguage: InfLanguage,
    InfPersistentItem: InfPersistentItem,
    InfTimePrimitive: InfTimePrimitive,
    InfEntityAssociation: InfEntityAssociation,
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
