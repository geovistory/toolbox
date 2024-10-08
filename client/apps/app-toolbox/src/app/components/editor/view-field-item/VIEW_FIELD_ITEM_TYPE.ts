import { InjectionToken } from '@angular/core';
import type { ViewFieldItemTypeFn } from './view-field-item.component';

export const VIEW_FIELD_ITEM_TYPE = new InjectionToken<ViewFieldItemTypeFn>('ViewFieldItemType');
