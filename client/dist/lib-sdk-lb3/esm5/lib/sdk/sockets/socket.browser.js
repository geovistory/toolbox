/* tslint:disable */
// add this to compilerOptions in tsconfig.json:
//    "allowSyntheticDefaultImports": true,
//    "esModuleInterop": true 
import io from 'socket.io-client';
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketBrowser
* @license MIT
* @description
* This module handle socket connections for web browsers, it will be DI Swapped
* depending on the platform environment.
* This module will be generated when the -d ng2web flag is set
**/
var SocketBrowser = /** @class */ (function () {
    function SocketBrowser() {
    }
    /**
     * @method connect
     * @param {string} url URL path to connect with the server.
     * @param {any} options Any socket.io v1 =< valid options
     * @return {any} Not currently a socket.io-client for web Typings implemented.
     * @description
     * This method will return a valid socket connection.
     **/
    SocketBrowser.prototype.connect = function (url, options) {
        return io(url, options);
    };
    return SocketBrowser;
}());
export { SocketBrowser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmJyb3dzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL3NvY2tldHMvc29ja2V0LmJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLGdEQUFnRDtBQUNoRCwyQ0FBMkM7QUFDM0MsOEJBQThCO0FBQzlCLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xDOzs7Ozs7OztHQVFHO0FBQ0g7SUFBQTtJQVlBLENBQUM7SUFYQzs7Ozs7OztRQU9JO0lBQ0osK0JBQU8sR0FBUCxVQUFRLEdBQVcsRUFBRSxPQUFZO1FBQy9CLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG4vLyBhZGQgdGhpcyB0byBjb21waWxlck9wdGlvbnMgaW4gdHNjb25maWcuanNvbjpcbi8vICAgIFwiYWxsb3dTeW50aGV0aWNEZWZhdWx0SW1wb3J0c1wiOiB0cnVlLFxuLy8gICAgXCJlc01vZHVsZUludGVyb3BcIjogdHJ1ZSBcbmltcG9ydCBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JzsgXG4vKipcbiogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dHdpdHRlcjpAam9obmNhc2FycnViaWFzPiA8Z2l0aHViOkBtZWFuLWV4cGVydC1vZmZpY2lhbD5cbiogQG1vZHVsZSBTb2NrZXRCcm93c2VyXG4qIEBsaWNlbnNlIE1JVFxuKiBAZGVzY3JpcHRpb25cbiogVGhpcyBtb2R1bGUgaGFuZGxlIHNvY2tldCBjb25uZWN0aW9ucyBmb3Igd2ViIGJyb3dzZXJzLCBpdCB3aWxsIGJlIERJIFN3YXBwZWRcbiogZGVwZW5kaW5nIG9uIHRoZSBwbGF0Zm9ybSBlbnZpcm9ubWVudC5cbiogVGhpcyBtb2R1bGUgd2lsbCBiZSBnZW5lcmF0ZWQgd2hlbiB0aGUgLWQgbmcyd2ViIGZsYWcgaXMgc2V0XG4qKi9cbmV4cG9ydCBjbGFzcyBTb2NrZXRCcm93c2VyIHtcbiAgLyoqXG4gICAqIEBtZXRob2QgY29ubmVjdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIFVSTCBwYXRoIHRvIGNvbm5lY3Qgd2l0aCB0aGUgc2VydmVyLlxuICAgKiBAcGFyYW0ge2FueX0gb3B0aW9ucyBBbnkgc29ja2V0LmlvIHYxID08IHZhbGlkIG9wdGlvbnNcbiAgICogQHJldHVybiB7YW55fSBOb3QgY3VycmVudGx5IGEgc29ja2V0LmlvLWNsaWVudCBmb3Igd2ViIFR5cGluZ3MgaW1wbGVtZW50ZWQuXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBhIHZhbGlkIHNvY2tldCBjb25uZWN0aW9uLiAgXG4gICAqKi9cbiAgY29ubmVjdCh1cmw6IHN0cmluZywgb3B0aW9uczogYW55KTogYW55IHtcbiAgICByZXR1cm4gaW8odXJsLCBvcHRpb25zKTtcbiAgfVxufVxuIl19