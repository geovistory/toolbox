import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
export class CoreTableVirtualScrollStrategy {
    constructor(itemHeight, headerOffset) {
        this.itemHeight = itemHeight;
        this.headerOffset = headerOffset;
        this.dataLength = 0;
        this.indexChange = new Subject();
        this.scrolledIndexChange = this.indexChange.pipe(distinctUntilChanged());
    }
    attach(viewport) {
        this.viewport = viewport;
        this.onDataLengthChanged();
    }
    onContentScrolled() {
        this.updateContent();
    }
    onDataLengthChanged() {
        if (this.viewport) {
            this.viewport.setTotalContentSize(this.dataLength * this.itemHeight);
            this.updateContent();
        }
    }
    setDataLength(length) {
        this.dataLength = length;
        this.onDataLengthChanged();
    }
    setScrollHeight(rowHeight, headerOffset) {
        this.itemHeight = rowHeight;
        this.headerOffset = headerOffset;
        this.updateContent();
    }
    detach() { }
    onContentRendered() { }
    onRenderedOffsetChanged() { }
    scrollToIndex(index, behavior) { }
    updateContent() {
        if (!this.viewport) {
            return;
        }
        const amount = Math.ceil(this.viewport.getViewportSize() / this.itemHeight);
        const offset = this.viewport.measureScrollOffset() - this.headerOffset;
        const buffer = Math.ceil(amount / 2);
        const skip = Math.round(offset / this.itemHeight);
        const index = Math.max(0, skip);
        const start = Math.max(0, index - buffer);
        const end = Math.min(this.dataLength, index + amount + buffer);
        this.viewport.setRenderedContentOffset(this.itemHeight * start);
        this.viewport.setRenderedRange({ start, end });
        this.indexChange.next(index);
    }
}
//# sourceMappingURL=virtual-scroll.strategy.js.map