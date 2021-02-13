export const tabRoot = 'tab';
export const tabDefinitions = {
    cell: {
        indexBy: {
            keyInStore: 'pk_cell',
            indexByFn: (item) => item.pk_cell.toString()
        },
        groupBy: [
            {
                keyInStore: 'fk_column_fk_row',
                groupByFn: (item) => item.fk_column + '_' + item.fk_row
            }
        ]
    }
};
//# sourceMappingURL=tab.config.js.map