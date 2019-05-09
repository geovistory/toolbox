/* tslint:disable */
import { Injectable } from '@angular/core';
import { SysClassFieldPropertyRel } from '../../models/SysClassFieldPropertyRel';
import { SysClassField } from '../../models/SysClassField';
import { SysClassHasTypeProperty } from '../../models/SysClassHasTypeProperty';
import { ProQuery } from '../../models/ProQuery';
import { ProVisual } from '../../models/ProVisual';
import { PubAccount } from '../../models/PubAccount';
import { Email } from '../../models/Email';
import { ProProject } from '../../models/ProProject';
import { PubAccountProjectRel } from '../../models/PubAccountProjectRel';
import { ProTextProperty } from '../../models/ProTextProperty';
import { InfAppellation } from '../../models/InfAppellation';
import { InfTemporalEntity } from '../../models/InfTemporalEntity';
import { InfRole } from '../../models/InfRole';
import { InfLanguage } from '../../models/InfLanguage';
import { InfPersistentItem } from '../../models/InfPersistentItem';
import { ProInfoProjRel } from '../../models/ProInfoProjRel';
import { DfhClass } from '../../models/DfhClass';
import { DfhProperty } from '../../models/DfhProperty';
import { DfhLabel } from '../../models/DfhLabel';
import { DfhTextProperty } from '../../models/DfhTextProperty';
import { InfTimePrimitive } from '../../models/InfTimePrimitive';
import { DatChunk } from '../../models/DatChunk';
import { InfEntityAssociation } from '../../models/InfEntityAssociation';
import { DatDigital } from '../../models/DatDigital';
import { InfPlace } from '../../models/InfPlace';
import { WarEntityPreview } from '../../models/WarEntityPreview';
import { DfhClassProfileView } from '../../models/DfhClassProfileView';
import { DfhPropertyProfileView } from '../../models/DfhPropertyProfileView';
import { SysAppContext } from '../../models/SysAppContext';
import { ProClassFieldConfig } from '../../models/ProClassFieldConfig';
import { DfhProjRel } from '../../models/DfhProjRel';
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
    ProQuery: ProQuery,
    ProVisual: ProVisual,
    PubAccount: PubAccount,
    Email: Email,
    ProProject: ProProject,
    PubAccountProjectRel: PubAccountProjectRel,
    ProTextProperty: ProTextProperty,
    InfAppellation: InfAppellation,
    InfTemporalEntity: InfTemporalEntity,
    InfRole: InfRole,
    InfLanguage: InfLanguage,
    InfPersistentItem: InfPersistentItem,
    ProInfoProjRel: ProInfoProjRel,
    DfhClass: DfhClass,
    DfhProperty: DfhProperty,
    DfhLabel: DfhLabel,
    DfhTextProperty: DfhTextProperty,
    InfTimePrimitive: InfTimePrimitive,
    DatChunk: DatChunk,
    InfEntityAssociation: InfEntityAssociation,
    DatDigital: DatDigital,
    InfPlace: InfPlace,
    WarEntityPreview: WarEntityPreview,
    DfhClassProfileView: DfhClassProfileView,
    DfhPropertyProfileView: DfhPropertyProfileView,
    SysAppContext: SysAppContext,
    ProClassFieldConfig: ProClassFieldConfig,
    DfhProjRel: DfhProjRel,
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
