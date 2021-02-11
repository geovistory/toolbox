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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RLTW9kZWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsic2VydmljZXMvY3VzdG9tL1NES01vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3JELDBEQUEwRDtBQUMxRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENB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QUNBLFNBQVMsQ0FrRHJCO1NBbERZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0Q2h1bmsgfSBmcm9tICcuLi8uLi9tb2RlbHMvRGF0Q2h1bmsnO1xuaW1wb3J0IHsgRGF0Q29sdW1uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0RhdENvbHVtbic7XG5pbXBvcnQgeyBEYXREaWdpdGFsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0RhdERpZ2l0YWwnO1xuaW1wb3J0IHsgRGF0TmFtZXNwYWNlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0RhdE5hbWVzcGFjZSc7XG5pbXBvcnQgeyBEYXRUZXh0UHJvcGVydHkgfSBmcm9tICcuLi8uLi9tb2RlbHMvRGF0VGV4dFByb3BlcnR5JztcbmltcG9ydCB7IERmaExhYmVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0RmaExhYmVsJztcbmltcG9ydCB7IERmaFByb2ZpbGUgfSBmcm9tICcuLi8uLi9tb2RlbHMvRGZoUHJvZmlsZSc7XG4vLyBpbXBvcnQgeyBEZmhQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL21vZGVscy9EZmhQcm9wZXJ0eSc7XG5pbXBvcnQgeyBFbWFpbCB9IGZyb20gJy4uLy4uL21vZGVscy9FbWFpbCc7XG5pbXBvcnQgeyBJbmZBcHBlbGxhdGlvbiB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZBcHBlbGxhdGlvbic7XG5pbXBvcnQgeyBJbmZEaW1lbnNpb24gfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mRGltZW5zaW9uJztcbmltcG9ydCB7IEluZkxhbmdTdHJpbmcgfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mTGFuZ1N0cmluZyc7XG5pbXBvcnQgeyBJbmZMYW5ndWFnZSB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZMYW5ndWFnZSc7XG5pbXBvcnQgeyBJbmZQZXJzaXN0ZW50SXRlbSB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZQZXJzaXN0ZW50SXRlbSc7XG5pbXBvcnQgeyBJbmZQbGFjZSB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZQbGFjZSc7XG5pbXBvcnQgeyBJbmZTdGF0ZW1lbnQgfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mU3RhdGVtZW50JztcbmltcG9ydCB7IEluZlRlbXBvcmFsRW50aXR5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZlRlbXBvcmFsRW50aXR5JztcbmltcG9ydCB7IEluZlRleHRQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZUZXh0UHJvcGVydHknO1xuaW1wb3J0IHsgSW5mVGltZVByaW1pdGl2ZSB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZUaW1lUHJpbWl0aXZlJztcbmltcG9ydCB7IFByb0NsYXNzRmllbGRDb25maWcgfSBmcm9tICcuLi8uLi9tb2RlbHMvUHJvQ2xhc3NGaWVsZENvbmZpZyc7XG5pbXBvcnQgeyBQcm9EZmhDbGFzc1Byb2pSZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvUHJvRGZoQ2xhc3NQcm9qUmVsJztcbmltcG9ydCB7IFByb0RmaFByb2ZpbGVQcm9qUmVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1Byb0RmaFByb2ZpbGVQcm9qUmVsJztcbmltcG9ydCB7IFByb0luZm9Qcm9qUmVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1Byb0luZm9Qcm9qUmVsJztcbmltcG9ydCB7IFByb1Byb2plY3QgfSBmcm9tICcuLi8uLi9tb2RlbHMvUHJvUHJvamVjdCc7XG5pbXBvcnQgeyBQcm9UZXh0UHJvcGVydHkgfSBmcm9tICcuLi8uLi9tb2RlbHMvUHJvVGV4dFByb3BlcnR5JztcbmltcG9ydCB7IFB1YkFjY291bnQgfSBmcm9tICcuLi8uLi9tb2RlbHMvUHViQWNjb3VudCc7XG5pbXBvcnQgeyBQdWJBY2NvdW50UHJvamVjdFJlbCB9IGZyb20gJy4uLy4uL21vZGVscy9QdWJBY2NvdW50UHJvamVjdFJlbCc7XG5pbXBvcnQgeyBTY2hlbWFPYmplY3QgfSBmcm9tICcuLi8uLi9tb2RlbHMvU2NoZW1hT2JqZWN0JztcbmltcG9ydCB7IFN5c0FwcENvbnRleHQgfSBmcm9tICcuLi8uLi9tb2RlbHMvU3lzQXBwQ29udGV4dCc7XG5pbXBvcnQgeyBTeXNDbGFzc0ZpZWxkIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1N5c0NsYXNzRmllbGQnO1xuaW1wb3J0IHsgU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1N5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbCc7XG5pbXBvcnQgeyBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL21vZGVscy9TeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eSc7XG5pbXBvcnQgeyBTeXNTeXN0ZW1SZWxldmFudENsYXNzIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1N5c1N5c3RlbVJlbGV2YW50Q2xhc3MnO1xuaW1wb3J0IHsgU3lzU3lzdGVtVHlwZSB9IGZyb20gJy4uLy4uL21vZGVscy9TeXNTeXN0ZW1UeXBlJztcblxuZXhwb3J0IGludGVyZmFjZSBNb2RlbHMgeyBbbmFtZTogc3RyaW5nXTogYW55IH1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNES01vZGVscyB7XG5cbiAgcHJpdmF0ZSBtb2RlbHM6IE1vZGVscyA9IHtcbiAgICBTY2hlbWFPYmplY3Q6IFNjaGVtYU9iamVjdCxcbiAgICBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWw6IFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbCxcbiAgICBTeXNDbGFzc0ZpZWxkOiBTeXNDbGFzc0ZpZWxkLFxuICAgIFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5OiBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eSxcbiAgICBTeXNTeXN0ZW1SZWxldmFudENsYXNzOiBTeXNTeXN0ZW1SZWxldmFudENsYXNzLFxuICAgIFB1YkFjY291bnQ6IFB1YkFjY291bnQsXG4gICAgRW1haWw6IEVtYWlsLFxuICAgIFByb1Byb2plY3Q6IFByb1Byb2plY3QsXG4gICAgUHViQWNjb3VudFByb2plY3RSZWw6IFB1YkFjY291bnRQcm9qZWN0UmVsLFxuICAgIFByb1RleHRQcm9wZXJ0eTogUHJvVGV4dFByb3BlcnR5LFxuICAgIFByb0luZm9Qcm9qUmVsOiBQcm9JbmZvUHJvalJlbCxcbiAgICBEZmhQcm9maWxlOiBEZmhQcm9maWxlLFxuICAgIERmaExhYmVsOiBEZmhMYWJlbCxcbiAgICBEYXRDaHVuazogRGF0Q2h1bmssXG4gICAgRGF0Q29sdW1uOiBEYXRDb2x1bW4sXG4gICAgRGF0VGV4dFByb3BlcnR5OiBEYXRUZXh0UHJvcGVydHksXG4gICAgRGF0RGlnaXRhbDogRGF0RGlnaXRhbCxcbiAgICBTeXNBcHBDb250ZXh0OiBTeXNBcHBDb250ZXh0LFxuICAgIFByb0NsYXNzRmllbGRDb25maWc6IFByb0NsYXNzRmllbGRDb25maWcsXG4gICAgUHJvRGZoQ2xhc3NQcm9qUmVsOiBQcm9EZmhDbGFzc1Byb2pSZWwsXG4gICAgUHJvRGZoUHJvZmlsZVByb2pSZWw6IFByb0RmaFByb2ZpbGVQcm9qUmVsLFxuICAgIEluZkFwcGVsbGF0aW9uOiBJbmZBcHBlbGxhdGlvbixcbiAgICBJbmZMYW5nU3RyaW5nOiBJbmZMYW5nU3RyaW5nLFxuICAgIEluZkRpbWVuc2lvbjogSW5mRGltZW5zaW9uLFxuICAgIEluZlRlbXBvcmFsRW50aXR5OiBJbmZUZW1wb3JhbEVudGl0eSxcbiAgICBJbmZTdGF0ZW1lbnQ6IEluZlN0YXRlbWVudCxcbiAgICBJbmZMYW5ndWFnZTogSW5mTGFuZ3VhZ2UsXG4gICAgSW5mUGVyc2lzdGVudEl0ZW06IEluZlBlcnNpc3RlbnRJdGVtLFxuICAgIEluZlRpbWVQcmltaXRpdmU6IEluZlRpbWVQcmltaXRpdmUsXG4gICAgSW5mUGxhY2U6IEluZlBsYWNlLFxuICAgIERhdE5hbWVzcGFjZTogRGF0TmFtZXNwYWNlLFxuICAgIEluZlRleHRQcm9wZXJ0eTogSW5mVGV4dFByb3BlcnR5LFxuICAgIFN5c1N5c3RlbVR5cGU6IFN5c1N5c3RlbVR5cGUsXG5cbiAgfTtcblxuICBwdWJsaWMgZ2V0KG1vZGVsTmFtZTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbHNbbW9kZWxOYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBbGwoKTogTW9kZWxzIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbHM7XG4gIH1cblxuICBwdWJsaWMgZ2V0TW9kZWxOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMubW9kZWxzKTtcbiAgfVxufVxuIl19