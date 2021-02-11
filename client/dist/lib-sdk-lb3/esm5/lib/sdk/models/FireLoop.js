/* tslint:disable */
import { FireLoopRef } from './index';
var FireLoop = /** @class */ (function () {
    function FireLoop(socket, models) {
        this.socket = socket;
        this.models = models;
        this.references = {};
    }
    FireLoop.prototype.ref = function (model) {
        var name = model.getModelName();
        model.models = this.models;
        this.references[name] = new FireLoopRef(model, this.socket);
        return this.references[name];
    };
    return FireLoop;
}());
export { FireLoop };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZUxvb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9GaXJlTG9vcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV0QztJQUlFLGtCQUFvQixNQUFXLEVBQVUsTUFBeUI7UUFBOUMsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUFVLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBRjFELGVBQVUsR0FBUSxFQUFFLENBQUM7SUFFd0MsQ0FBQztJQUUvRCxzQkFBRyxHQUFWLFVBQWMsS0FBVTtRQUN0QixJQUFJLElBQUksR0FBVyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUksS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBGaXJlTG9vcFJlZiB9IGZyb20gJy4vaW5kZXgnO1xuXG5leHBvcnQgY2xhc3MgRmlyZUxvb3Age1xuXG4gIHByaXZhdGUgcmVmZXJlbmNlczogYW55ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzb2NrZXQ6IGFueSwgcHJpdmF0ZSBtb2RlbHM6IHsgZ2V0OiBGdW5jdGlvbiB9KSB7fVxuXG4gIHB1YmxpYyByZWY8VD4obW9kZWw6IGFueSk6IEZpcmVMb29wUmVmPFQ+IHtcbiAgICBsZXQgbmFtZTogc3RyaW5nID0gbW9kZWwuZ2V0TW9kZWxOYW1lKCk7XG4gICAgbW9kZWwubW9kZWxzID0gdGhpcy5tb2RlbHM7XG4gICAgdGhpcy5yZWZlcmVuY2VzW25hbWVdID0gbmV3IEZpcmVMb29wUmVmPFQ+KG1vZGVsLCB0aGlzLnNvY2tldCk7XG4gICAgcmV0dXJuIHRoaXMucmVmZXJlbmNlc1tuYW1lXTtcbiAgfVxufVxuIl19