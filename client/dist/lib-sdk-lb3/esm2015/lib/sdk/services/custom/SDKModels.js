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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RLTW9kZWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9zZXJ2aWNlcy9jdXN0b20vU0RLTW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsMERBQTBEO0FBQzFELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxn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VSxFQUFFO0dBQ0EsU0FBUyxDQWtEckI7U0FsRFksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRDaHVuayB9IGZyb20gJy4uLy4uL21vZGVscy9EYXRDaHVuayc7XG5pbXBvcnQgeyBEYXRDb2x1bW4gfSBmcm9tICcuLi8uLi9tb2RlbHMvRGF0Q29sdW1uJztcbmltcG9ydCB7IERhdERpZ2l0YWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvRGF0RGlnaXRhbCc7XG5pbXBvcnQgeyBEYXROYW1lc3BhY2UgfSBmcm9tICcuLi8uLi9tb2RlbHMvRGF0TmFtZXNwYWNlJztcbmltcG9ydCB7IERhdFRleHRQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL21vZGVscy9EYXRUZXh0UHJvcGVydHknO1xuaW1wb3J0IHsgRGZoTGFiZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvRGZoTGFiZWwnO1xuaW1wb3J0IHsgRGZoUHJvZmlsZSB9IGZyb20gJy4uLy4uL21vZGVscy9EZmhQcm9maWxlJztcbi8vIGltcG9ydCB7IERmaFByb3BlcnR5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL0RmaFByb3BlcnR5JztcbmltcG9ydCB7IEVtYWlsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0VtYWlsJztcbmltcG9ydCB7IEluZkFwcGVsbGF0aW9uIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZkFwcGVsbGF0aW9uJztcbmltcG9ydCB7IEluZkRpbWVuc2lvbiB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZEaW1lbnNpb24nO1xuaW1wb3J0IHsgSW5mTGFuZ1N0cmluZyB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZMYW5nU3RyaW5nJztcbmltcG9ydCB7IEluZkxhbmd1YWdlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZkxhbmd1YWdlJztcbmltcG9ydCB7IEluZlBlcnNpc3RlbnRJdGVtIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZlBlcnNpc3RlbnRJdGVtJztcbmltcG9ydCB7IEluZlBsYWNlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZlBsYWNlJztcbmltcG9ydCB7IEluZlN0YXRlbWVudCB9IGZyb20gJy4uLy4uL21vZGVscy9JbmZTdGF0ZW1lbnQnO1xuaW1wb3J0IHsgSW5mVGVtcG9yYWxFbnRpdHkgfSBmcm9tICcuLi8uLi9tb2RlbHMvSW5mVGVtcG9yYWxFbnRpdHknO1xuaW1wb3J0IHsgSW5mVGV4dFByb3BlcnR5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZlRleHRQcm9wZXJ0eSc7XG5pbXBvcnQgeyBJbmZUaW1lUHJpbWl0aXZlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0luZlRpbWVQcmltaXRpdmUnO1xuaW1wb3J0IHsgUHJvQ2xhc3NGaWVsZENvbmZpZyB9IGZyb20gJy4uLy4uL21vZGVscy9Qcm9DbGFzc0ZpZWxkQ29uZmlnJztcbmltcG9ydCB7IFByb0RmaENsYXNzUHJvalJlbCB9IGZyb20gJy4uLy4uL21vZGVscy9Qcm9EZmhDbGFzc1Byb2pSZWwnO1xuaW1wb3J0IHsgUHJvRGZoUHJvZmlsZVByb2pSZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvUHJvRGZoUHJvZmlsZVByb2pSZWwnO1xuaW1wb3J0IHsgUHJvSW5mb1Byb2pSZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvUHJvSW5mb1Byb2pSZWwnO1xuaW1wb3J0IHsgUHJvUHJvamVjdCB9IGZyb20gJy4uLy4uL21vZGVscy9Qcm9Qcm9qZWN0JztcbmltcG9ydCB7IFByb1RleHRQcm9wZXJ0eSB9IGZyb20gJy4uLy4uL21vZGVscy9Qcm9UZXh0UHJvcGVydHknO1xuaW1wb3J0IHsgUHViQWNjb3VudCB9IGZyb20gJy4uLy4uL21vZGVscy9QdWJBY2NvdW50JztcbmltcG9ydCB7IFB1YkFjY291bnRQcm9qZWN0UmVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1B1YkFjY291bnRQcm9qZWN0UmVsJztcbmltcG9ydCB7IFNjaGVtYU9iamVjdCB9IGZyb20gJy4uLy4uL21vZGVscy9TY2hlbWFPYmplY3QnO1xuaW1wb3J0IHsgU3lzQXBwQ29udGV4dCB9IGZyb20gJy4uLy4uL21vZGVscy9TeXNBcHBDb250ZXh0JztcbmltcG9ydCB7IFN5c0NsYXNzRmllbGQgfSBmcm9tICcuLi8uLi9tb2RlbHMvU3lzQ2xhc3NGaWVsZCc7XG5pbXBvcnQgeyBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsJztcbmltcG9ydCB7IFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5IH0gZnJvbSAnLi4vLi4vbW9kZWxzL1N5c0NsYXNzSGFzVHlwZVByb3BlcnR5JztcbmltcG9ydCB7IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MgfSBmcm9tICcuLi8uLi9tb2RlbHMvU3lzU3lzdGVtUmVsZXZhbnRDbGFzcyc7XG5pbXBvcnQgeyBTeXNTeXN0ZW1UeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL1N5c1N5c3RlbVR5cGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVscyB7IFtuYW1lOiBzdHJpbmddOiBhbnkgfVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU0RLTW9kZWxzIHtcblxuICBwcml2YXRlIG1vZGVsczogTW9kZWxzID0ge1xuICAgIFNjaGVtYU9iamVjdDogU2NoZW1hT2JqZWN0LFxuICAgIFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbDogU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsLFxuICAgIFN5c0NsYXNzRmllbGQ6IFN5c0NsYXNzRmllbGQsXG4gICAgU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHk6IFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5LFxuICAgIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3M6IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MsXG4gICAgUHViQWNjb3VudDogUHViQWNjb3VudCxcbiAgICBFbWFpbDogRW1haWwsXG4gICAgUHJvUHJvamVjdDogUHJvUHJvamVjdCxcbiAgICBQdWJBY2NvdW50UHJvamVjdFJlbDogUHViQWNjb3VudFByb2plY3RSZWwsXG4gICAgUHJvVGV4dFByb3BlcnR5OiBQcm9UZXh0UHJvcGVydHksXG4gICAgUHJvSW5mb1Byb2pSZWw6IFByb0luZm9Qcm9qUmVsLFxuICAgIERmaFByb2ZpbGU6IERmaFByb2ZpbGUsXG4gICAgRGZoTGFiZWw6IERmaExhYmVsLFxuICAgIERhdENodW5rOiBEYXRDaHVuayxcbiAgICBEYXRDb2x1bW46IERhdENvbHVtbixcbiAgICBEYXRUZXh0UHJvcGVydHk6IERhdFRleHRQcm9wZXJ0eSxcbiAgICBEYXREaWdpdGFsOiBEYXREaWdpdGFsLFxuICAgIFN5c0FwcENvbnRleHQ6IFN5c0FwcENvbnRleHQsXG4gICAgUHJvQ2xhc3NGaWVsZENvbmZpZzogUHJvQ2xhc3NGaWVsZENvbmZpZyxcbiAgICBQcm9EZmhDbGFzc1Byb2pSZWw6IFByb0RmaENsYXNzUHJvalJlbCxcbiAgICBQcm9EZmhQcm9maWxlUHJvalJlbDogUHJvRGZoUHJvZmlsZVByb2pSZWwsXG4gICAgSW5mQXBwZWxsYXRpb246IEluZkFwcGVsbGF0aW9uLFxuICAgIEluZkxhbmdTdHJpbmc6IEluZkxhbmdTdHJpbmcsXG4gICAgSW5mRGltZW5zaW9uOiBJbmZEaW1lbnNpb24sXG4gICAgSW5mVGVtcG9yYWxFbnRpdHk6IEluZlRlbXBvcmFsRW50aXR5LFxuICAgIEluZlN0YXRlbWVudDogSW5mU3RhdGVtZW50LFxuICAgIEluZkxhbmd1YWdlOiBJbmZMYW5ndWFnZSxcbiAgICBJbmZQZXJzaXN0ZW50SXRlbTogSW5mUGVyc2lzdGVudEl0ZW0sXG4gICAgSW5mVGltZVByaW1pdGl2ZTogSW5mVGltZVByaW1pdGl2ZSxcbiAgICBJbmZQbGFjZTogSW5mUGxhY2UsXG4gICAgRGF0TmFtZXNwYWNlOiBEYXROYW1lc3BhY2UsXG4gICAgSW5mVGV4dFByb3BlcnR5OiBJbmZUZXh0UHJvcGVydHksXG4gICAgU3lzU3lzdGVtVHlwZTogU3lzU3lzdGVtVHlwZSxcblxuICB9O1xuXG4gIHB1YmxpYyBnZXQobW9kZWxOYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLm1vZGVsc1ttb2RlbE5hbWVdO1xuICB9XG5cbiAgcHVibGljIGdldEFsbCgpOiBNb2RlbHMge1xuICAgIHJldHVybiB0aGlzLm1vZGVscztcbiAgfVxuXG4gIHB1YmxpYyBnZXRNb2RlbE5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5tb2RlbHMpO1xuICB9XG59XG4iXX0=