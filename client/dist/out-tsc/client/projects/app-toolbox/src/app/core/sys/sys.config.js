export const sysRoot = 'sys';
export const sysDefinitions = {
    system_relevant_class: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (item) => {
                return item.pk_entity.toString();
            }
        },
        groupBy: [
            {
                keyInStore: 'fk_class',
                groupByFn: (d) => d.fk_class.toString()
            },
            {
                keyInStore: 'required_by_sources',
                groupByFn: (d) => d.required_by_sources.toString()
            },
            {
                keyInStore: 'required',
                groupByFn: (d) => (d.required_by_sources || d.required_by_entities || d.required_by_basics) ? 'true' : 'false'
            }
        ]
    },
    config: {
        indexBy: {
            keyInStore: 'main',
            indexByFn: () => 'main'
        }
    }
};
//# sourceMappingURL=sys.config.js.map