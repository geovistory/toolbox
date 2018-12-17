/* tslint:disable */
import { Injectable } from '@angular/core';
import { Account } from '../../models/Account';
import { Email } from '../../models/Email';
import { Project } from '../../models/Project';
import { ProjectAccountAssociation } from '../../models/ProjectAccountAssociation';
import { Language } from '../../models/Language';
import { ComLabel } from '../../models/ComLabel';
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
import { InfDataUnitPreview } from '../../models/InfDataUnitPreview';
import { DfhClassProfileView } from '../../models/DfhClassProfileView';
import { DfhPropertyProfileView } from '../../models/DfhPropertyProfileView';
import { ComUiContext } from '../../models/ComUiContext';
import { ComUiContextConfig } from '../../models/ComUiContextConfig';
import { ComClassField } from '../../models/ComClassField';
import { DfhProjRel } from '../../models/DfhProjRel';
import { InfNamespace } from '../../models/InfNamespace';
import { InfTypeNamespaceRel } from '../../models/InfTypeNamespaceRel';
import { InfTextProperty } from '../../models/InfTextProperty';
import { ComSystemType } from '../../models/ComSystemType';
import { ComClassFieldPropertyRel } from '../../models/ComClassFieldPropertyRel';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Account: Account,
    Email: Email,
    Project: Project,
    ProjectAccountAssociation: ProjectAccountAssociation,
    Language: Language,
    ComLabel: ComLabel,
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
    InfDataUnitPreview: InfDataUnitPreview,
    DfhClassProfileView: DfhClassProfileView,
    DfhPropertyProfileView: DfhPropertyProfileView,
    ComUiContext: ComUiContext,
    ComUiContextConfig: ComUiContextConfig,
    ComClassField: ComClassField,
    DfhProjRel: DfhProjRel,
    InfNamespace: InfNamespace,
    InfTypeNamespaceRel: InfTypeNamespaceRel,
    InfTextProperty: InfTextProperty,
    ComSystemType: ComSystemType,
    ComClassFieldPropertyRel: ComClassFieldPropertyRel,
    
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
