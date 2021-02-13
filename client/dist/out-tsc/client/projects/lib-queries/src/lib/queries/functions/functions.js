import { TimeSpanUtil } from '@kleiolab/lib-utils';
import { DfhConfig } from '@kleiolab/lib-config';
export function timeSpanItemToTimeSpan(timeSpanItem) {
    const t = new TimeSpanUtil();
    timeSpanItem.properties.forEach(p => {
        const key = DfhConfig.PROPERTY_PK_TO_EXISTENCE_TIME_KEY[p.listDefinition.property.pkProperty];
        if (p.items && p.items.length)
            t[key] = p.items[0].timePrimitive;
    });
    return t;
}
//# sourceMappingURL=functions.js.map