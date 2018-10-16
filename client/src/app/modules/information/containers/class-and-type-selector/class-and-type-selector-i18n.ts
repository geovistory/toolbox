import { TreeviewI18nDefault, TreeviewItem, TreeviewSelection } from 'ngx-treeview';

export class ClassAndTypeSelectorI18n extends TreeviewI18nDefault {
    private internalSelectedItem: TreeviewItem;

    set selectedItem(value: TreeviewItem) {
        if (value && value.children === undefined) {
            this.internalSelectedItem = value;
        }
    }

    get selectedItem(): TreeviewItem {
        return this.internalSelectedItem;
    }

    getText(selection: TreeviewSelection): string {
        return 'Select Type';
    }
}
