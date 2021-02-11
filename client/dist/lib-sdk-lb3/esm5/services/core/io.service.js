/* tslint:disable */
import { Subject } from 'rxjs';
var IO = /** @class */ (function () {
    function IO(socket) {
        this.observables = {};
        this.socket = socket;
    }
    IO.prototype.emit = function (event, data) {
        this.socket.emit('ME:RT:1://event', {
            event: event,
            data: data
        });
    };
    IO.prototype.on = function (event) {
        if (this.observables[event]) {
            return this.observables[event];
        }
        var subject = new Subject();
        this.socket.on(event, function (res) { return subject.next(res); });
        this.observables[event] = subject.asObservable();
        return this.observables[event];
    };
    return IO;
}());
export { IO };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2NvcmUvaW8uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFDcEIsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQztJQUtFLFlBQVksTUFBVztRQUZmLGdCQUFXLEdBQVEsRUFBRSxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFBQyxDQUFDO0lBRWxELGlCQUFJLEdBQUosVUFBSyxLQUFhLEVBQUUsSUFBUztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUNoQyxLQUFLLEVBQUcsS0FBSztZQUNiLElBQUksRUFBSSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGVBQUUsR0FBRixVQUFHLEtBQWE7UUFDZCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FBRTtRQUNoRSxJQUFJLE9BQU8sR0FBaUIsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBQyxHQUFRLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFqQixDQUFpQixDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDSCxTQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBjbGFzcyBJTyB7XG5cbiAgcHJpdmF0ZSBzb2NrZXQ6IGFueTtcbiAgcHJpdmF0ZSBvYnNlcnZhYmxlczogYW55ID0ge307XG5cbiAgY29uc3RydWN0b3Ioc29ja2V0OiBhbnkpIHsgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7IH1cblxuICBlbWl0KGV2ZW50OiBzdHJpbmcsIGRhdGE6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc29ja2V0LmVtaXQoJ01FOlJUOjE6Ly9ldmVudCcsIHtcbiAgICAgICAgZXZlbnQgOiBldmVudCxcbiAgICAgICAgZGF0YSAgOiBkYXRhXG4gICAgfSk7XG4gIH1cblxuICBvbihldmVudDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAodGhpcy5vYnNlcnZhYmxlc1tldmVudF0pIHsgcmV0dXJuIHRoaXMub2JzZXJ2YWJsZXNbZXZlbnRdOyB9XG4gICAgbGV0IHN1YmplY3Q6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICB0aGlzLnNvY2tldC5vbihldmVudCwgKHJlczogYW55KSA9PiBzdWJqZWN0Lm5leHQocmVzKSk7XG4gICAgdGhpcy5vYnNlcnZhYmxlc1tldmVudF0gPSBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIHJldHVybiB0aGlzLm9ic2VydmFibGVzW2V2ZW50XTtcbiAgfVxufVxuIl19