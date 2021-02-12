import { AppellationItem } from './AppellationItem';
import { LanguageItem } from './LanguageItem';
import { PlaceItem } from './PlaceItem';
import { TimePrimitiveItem } from './TimePrimitiveItem';
import { EntityPreviewItem } from './EntityPreviewItem';
export type StatementItem = AppellationItem | EntityPreviewItem | LanguageItem | PlaceItem | TimePrimitiveItem;
