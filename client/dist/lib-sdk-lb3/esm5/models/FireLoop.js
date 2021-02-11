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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZUxvb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJtb2RlbHMvRmlyZUxvb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFdEM7SUFJRSxrQkFBb0IsTUFBVyxFQUFVLE1BQXlCO1FBQTlDLFdBQU0sR0FBTixNQUFNLENBQUs7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUYxRCxlQUFVLEdBQVEsRUFBRSxDQUFDO0lBRXdDLENBQUM7SUFFL0Qsc0JBQUcsR0FBVixVQUFjLEtBQVU7UUFDdEIsSUFBSSxJQUFJLEdBQVcsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFJLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQVpELElBWUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHsgRmlyZUxvb3BSZWYgfSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGNsYXNzIEZpcmVMb29wIHtcblxuICBwcml2YXRlIHJlZmVyZW5jZXM6IGFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc29ja2V0OiBhbnksIHByaXZhdGUgbW9kZWxzOiB7IGdldDogRnVuY3Rpb24gfSkge31cblxuICBwdWJsaWMgcmVmPFQ+KG1vZGVsOiBhbnkpOiBGaXJlTG9vcFJlZjxUPiB7XG4gICAgbGV0IG5hbWU6IHN0cmluZyA9IG1vZGVsLmdldE1vZGVsTmFtZSgpO1xuICAgIG1vZGVsLm1vZGVscyA9IHRoaXMubW9kZWxzO1xuICAgIHRoaXMucmVmZXJlbmNlc1tuYW1lXSA9IG5ldyBGaXJlTG9vcFJlZjxUPihtb2RlbCwgdGhpcy5zb2NrZXQpO1xuICAgIHJldHVybiB0aGlzLnJlZmVyZW5jZXNbbmFtZV07XG4gIH1cbn1cbiJdfQ==