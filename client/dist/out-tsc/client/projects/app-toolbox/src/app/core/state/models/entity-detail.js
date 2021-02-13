;
export class EntityDetail {
    constructor(data) {
        /** Left Panel Visibility */
        // the properties with information about the peIt
        this.showProperties = false;
        // the right area
        this.showRightArea = true;
        /** Right panel */
        this.rightPanelTabs = [];
        this.rightPanelActiveTab = 0; // index of the active tab
        // the bar to above the properties
        // showPropertiesHeader?= true;
        // the header with name of peIt
        this.showHeader = true;
        Object.assign(this, data);
    }
}
//# sourceMappingURL=entity-detail.js.map