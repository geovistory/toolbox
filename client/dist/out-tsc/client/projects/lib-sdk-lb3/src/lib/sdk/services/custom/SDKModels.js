import * as tslib_1 from "tslib";
/* tslint:disable */
import { Injectable } from '@angular/core';
import { DatChunk } from '../../models/DatChunk';
import { DatColumn } from '../../models/DatColumn';
import { DatDigital } from '../../models/DatDigital';
import { DatNamespace } from '../../models/DatNamespace';
import { DatTextProperty } from '../../models/DatTextProperty';
import { DfhLabel } from '../../models/DfhLabel';
import { DfhProfile } from '../../models/DfhProfile';
// import { DfhProperty } from '../../models/DfhProperty';
import { Email } from '../../models/Email';
import { InfAppellation } from '../../models/InfAppellation';
import { InfDimension } from '../../models/InfDimension';
import { InfLangString } from '../../models/InfLangString';
import { InfLanguage } from '../../models/InfLanguage';
import { InfPersistentItem } from '../../models/InfPersistentItem';
import { InfPlace } from '../../models/InfPlace';
import { InfStatement } from '../../models/InfStatement';
import { InfTemporalEntity } from '../../models/InfTemporalEntity';
import { InfTextProperty } from '../../models/InfTextProperty';
import { InfTimePrimitive } from '../../models/InfTimePrimitive';
import { ProClassFieldConfig } from '../../models/ProClassFieldConfig';
import { ProDfhClassProjRel } from '../../models/ProDfhClassProjRel';
import { ProDfhProfileProjRel } from '../../models/ProDfhProfileProjRel';
import { ProInfoProjRel } from '../../models/ProInfoProjRel';
import { ProProject } from '../../models/ProProject';
import { ProTextProperty } from '../../models/ProTextProperty';
import { PubAccount } from '../../models/PubAccount';
import { PubAccountProjectRel } from '../../models/PubAccountProjectRel';
import { SchemaObject } from '../../models/SchemaObject';
import { SysAppContext } from '../../models/SysAppContext';
import { SysClassField } from '../../models/SysClassField';
import { SysClassFieldPropertyRel } from '../../models/SysClassFieldPropertyRel';
import { SysClassHasTypeProperty } from '../../models/SysClassHasTypeProperty';
import { SysSystemRelevantClass } from '../../models/SysSystemRelevantClass';
import { SysSystemType } from '../../models/SysSystemType';
let SDKModels = class SDKModels {
    constructor() {
        this.models = {
            SchemaObject: SchemaObject,
            SysClassFieldPropertyRel: SysClassFieldPropertyRel,
            SysClassField: SysClassField,
            SysClassHasTypeProperty: SysClassHasTypeProperty,
            SysSystemRelevantClass: SysSystemRelevantClass,
            PubAccount: PubAccount,
            Email: Email,
            ProProject: ProProject,
            PubAccountProjectRel: PubAccountProjectRel,
            ProTextProperty: ProTextProperty,
            ProInfoProjRel: ProInfoProjRel,
            DfhProfile: DfhProfile,
            DfhLabel: DfhLabel,
            DatChunk: DatChunk,
            DatColumn: DatColumn,
            DatTextProperty: DatTextProperty,
            DatDigital: DatDigital,
            SysAppContext: SysAppContext,
            ProClassFieldConfig: ProClassFieldConfig,
            ProDfhClassProjRel: ProDfhClassProjRel,
            ProDfhProfileProjRel: ProDfhProfileProjRel,
            InfAppellation: InfAppellation,
            InfLangString: InfLangString,
            InfDimension: InfDimension,
            InfTemporalEntity: InfTemporalEntity,
            InfStatement: InfStatement,
            InfLanguage: InfLanguage,
            InfPersistentItem: InfPersistentItem,
            InfTimePrimitive: InfTimePrimitive,
            InfPlace: InfPlace,
            DatNamespace: DatNamespace,
            InfTextProperty: InfTextProperty,
            SysSystemType: SysSystemType,
        };
    }
    get(modelName) {
        return this.models[modelName];
    }
    getAll() {
        return this.models;
    }
    getModelNames() {
        return Object.keys(this.models);
    }
};
SDKModels = tslib_1.__decorate([
    Injectable()
], SDKModels);
export { SDKModels };
//# sourceMappingURL=SDKModels.js.map