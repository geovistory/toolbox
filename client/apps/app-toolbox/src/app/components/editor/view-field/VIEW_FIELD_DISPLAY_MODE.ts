import { InjectionToken } from '@angular/core';

export type ViewFieldDisplayMode = 'flat' | 'tree';
export const VIEW_FIELD_DISPLAY_MODE = new InjectionToken<ViewFieldDisplayMode>('ViewFieldDisplayMode');
