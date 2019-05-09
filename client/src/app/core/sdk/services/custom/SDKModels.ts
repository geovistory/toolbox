/* tslint:disable */
import { Injectable } from '@angular/core';
import { SysClassFieldPropertyRel } from '../../models/ComClassFieldPropertyRel';
import { SysClassField } from '../../models/ComClassField';
import { SysClassHasTypeProperty } from '../../models/ComClassHasTypeProperty';
import { ComLabel } from '../../models/ComLabel';
import { ProQuery } from '../../models/ComQuery';
import { ProVisual } from '../../models/ComVisual';
import { PubAccount } from '../../models/PubAccount';
import { Email } from '../../models/Email';
import { ProProject } from '../../models/ComProject';
import { PubAccountProjectRel } from '../../models/PubAccountProjectRel';
import { ComLanguage } from '../../models/ComLanguage';
import { ProTextProperty } from '../../models/ComTextProperty';
import { InfAppellation } from '../../models/InfAppellation';
import { InfTemporalEntity } from '../../models/InfTemporalEntity';
import { InfRole } from '../../models/InfRole';
import { InfLanguage } from '../../models/InfLanguage';
import { InfPersistentItem } from '../../models/InfPersistentItem';
import { ProInfoProjRel } from '../../models/InfEntityProjectRel';
import { DfhClass } from '../../models/DfhClass';
import { DfhProperty } from '../../models/DfhProperty';
import { DfhLabel } from '../../models/DfhLabel';
import { DfhTextProperty } from '../../models/DfhTextProperty';
import { InfTimePrimitive } from '../../models/InfTimePrimitive';
import { DatChunk } from '../../models/InfChunk';
import { InfEntityAssociation } from '../../models/InfEntityAssociation';
import { DatDigital } from '../../models/InfDigitalObject';
import { InfPlace } from '../../models/InfPlace';
import { WarEntityPreview } from '../../models/WarEntityPreview';
import { DfhClassProfileView } from '../../models/DfhClassProfileView';
import { DfhPropertyProfileView } from '../../models/DfhPropertyProfileView';
import { SysAppContext } from '../../models/ComUiContext';
import { ProClassFieldConfig } from '../../models/ComUiContextConfig';
import { DfhProjRel } from '../../models/DfhProjRel';
import { DatNamespace } from '../../models/InfNamespace';
import { InfTypeNamespaceRel } from '../../models/InfTypeNamespaceRel';
import { InfTextProperty } from '../../models/InfTextProperty';
import { SysSystemType } from '../../models/ComSystemType';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    ComClassFieldPropertyRel: SysClassFieldPropertyRel,
    ComClassField: SysClassField,
    ComClassHasTypeProperty: SysClassHasTypeProperty,
    ComLabel: ComLabel,
    ComQuery: ProQuery,
    ComVisual: ProVisual,
    PubAccount: PubAccount,
    Email: Email,
    ComProject: ProProject,
    PubAccountProjectRel: PubAccountProjectRel,
    ComLanguage: ComLanguage,
    ComTextProperty: ProTextProperty,
    InfAppellation: InfAppellation,
    InfTemporalEntity: InfTemporalEntity,
    InfRole: InfRole,
    InfLanguage: InfLanguage,
    InfPersistentItem: InfPersistentItem,
    InfEntityProjectRel: ProInfoProjRel,
    DfhClass: DfhClass,
    DfhProperty: DfhProperty,
    DfhLabel: DfhLabel,
    DfhTextProperty: DfhTextProperty,
    InfTimePrimitive: InfTimePrimitive,
    InfChunk: DatChunk,
    InfEntityAssociation: InfEntityAssociation,
    InfDigitalObject: DatDigital,
    InfPlace: InfPlace,
    WarEntityPreview: WarEntityPreview,
    DfhClassProfileView: DfhClassProfileView,
    DfhPropertyProfileView: DfhPropertyProfileView,
    ComUiContext: SysAppContext,
    ComUiContextConfig: ProClassFieldConfig,
    DfhProjRel: DfhProjRel,
    InfNamespace: DatNamespace,
    InfTypeNamespaceRel: InfTypeNamespaceRel,
    InfTextProperty: InfTextProperty,
    ComSystemType: SysSystemType,
    
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
