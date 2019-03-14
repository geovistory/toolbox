/* tslint:disable */
import { Injectable } from '@angular/core';
import { ComClassFieldPropertyRel } from '../../models/ComClassFieldPropertyRel';
import { ComClassField } from '../../models/ComClassField';
import { ComClassHasTypeProperty } from '../../models/ComClassHasTypeProperty';
import { ComLabel } from '../../models/ComLabel';
import { ComQuery } from '../../models/ComQuery';
import { PubAccount } from '../../models/PubAccount';
import { Email } from '../../models/Email';
import { ComProject } from '../../models/ComProject';
import { PubAccountProjectRel } from '../../models/PubAccountProjectRel';
import { ComLanguage } from '../../models/ComLanguage';
import { ComTextProperty } from '../../models/ComTextProperty';
import { InfAppellation } from '../../models/InfAppellation';
import { InfTemporalEntity } from '../../models/InfTemporalEntity';
import { InfRole } from '../../models/InfRole';
import { InfLanguage } from '../../models/InfLanguage';
import { InfPersistentItem } from '../../models/InfPersistentItem';
import { InfEntityProjectRel } from '../../models/InfEntityProjectRel';
import { DfhClass } from '../../models/DfhClass';
import { DfhProperty } from '../../models/DfhProperty';
import { DfhLabel } from '../../models/DfhLabel';
import { DfhTextProperty } from '../../models/DfhTextProperty';
import { InfTimePrimitive } from '../../models/InfTimePrimitive';
import { InfChunk } from '../../models/InfChunk';
import { InfEntityAssociation } from '../../models/InfEntityAssociation';
import { InfDigitalObject } from '../../models/InfDigitalObject';
import { InfPlace } from '../../models/InfPlace';
import { WarEntityPreview } from '../../models/WarEntityPreview';
import { DfhClassProfileView } from '../../models/DfhClassProfileView';
import { DfhPropertyProfileView } from '../../models/DfhPropertyProfileView';
import { ComUiContext } from '../../models/ComUiContext';
import { ComUiContextConfig } from '../../models/ComUiContextConfig';
import { DfhProjRel } from '../../models/DfhProjRel';
import { InfNamespace } from '../../models/InfNamespace';
import { InfTypeNamespaceRel } from '../../models/InfTypeNamespaceRel';
import { InfTextProperty } from '../../models/InfTextProperty';
import { ComSystemType } from '../../models/ComSystemType';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    ComClassFieldPropertyRel: ComClassFieldPropertyRel,
    ComClassField: ComClassField,
    ComClassHasTypeProperty: ComClassHasTypeProperty,
    ComLabel: ComLabel,
    ComQuery: ComQuery,
    PubAccount: PubAccount,
    Email: Email,
    ComProject: ComProject,
    PubAccountProjectRel: PubAccountProjectRel,
    ComLanguage: ComLanguage,
    ComTextProperty: ComTextProperty,
    InfAppellation: InfAppellation,
    InfTemporalEntity: InfTemporalEntity,
    InfRole: InfRole,
    InfLanguage: InfLanguage,
    InfPersistentItem: InfPersistentItem,
    InfEntityProjectRel: InfEntityProjectRel,
    DfhClass: DfhClass,
    DfhProperty: DfhProperty,
    DfhLabel: DfhLabel,
    DfhTextProperty: DfhTextProperty,
    InfTimePrimitive: InfTimePrimitive,
    InfChunk: InfChunk,
    InfEntityAssociation: InfEntityAssociation,
    InfDigitalObject: InfDigitalObject,
    InfPlace: InfPlace,
    WarEntityPreview: WarEntityPreview,
    DfhClassProfileView: DfhClassProfileView,
    DfhPropertyProfileView: DfhPropertyProfileView,
    ComUiContext: ComUiContext,
    ComUiContextConfig: ComUiContextConfig,
    DfhProjRel: DfhProjRel,
    InfNamespace: InfNamespace,
    InfTypeNamespaceRel: InfTypeNamespaceRel,
    InfTextProperty: InfTextProperty,
    ComSystemType: ComSystemType,
    
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
