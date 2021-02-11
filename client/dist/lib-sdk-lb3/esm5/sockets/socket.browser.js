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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmJyb3dzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJzb2NrZXRzL3NvY2tldC5icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQUNwQixnREFBZ0Q7QUFDaEQsMkNBQTJDO0FBQzNDLDhCQUE4QjtBQUM5QixPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsQzs7Ozs7Ozs7R0FRRztBQUNIO0lBQUE7SUFZQSxDQUFDO0lBWEM7Ozs7Ozs7UUFPSTtJQUNKLCtCQUFPLEdBQVAsVUFBUSxHQUFXLEVBQUUsT0FBWTtRQUMvQixPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQVpELElBWUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLy8gYWRkIHRoaXMgdG8gY29tcGlsZXJPcHRpb25zIGluIHRzY29uZmlnLmpzb246XG4vLyAgICBcImFsbG93U3ludGhldGljRGVmYXVsdEltcG9ydHNcIjogdHJ1ZSxcbi8vICAgIFwiZXNNb2R1bGVJbnRlcm9wXCI6IHRydWUgXG5pbXBvcnQgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7IFxuLyoqXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHR3aXR0ZXI6QGpvaG5jYXNhcnJ1Ymlhcz4gPGdpdGh1YjpAbWVhbi1leHBlcnQtb2ZmaWNpYWw+XG4qIEBtb2R1bGUgU29ja2V0QnJvd3NlclxuKiBAbGljZW5zZSBNSVRcbiogQGRlc2NyaXB0aW9uXG4qIFRoaXMgbW9kdWxlIGhhbmRsZSBzb2NrZXQgY29ubmVjdGlvbnMgZm9yIHdlYiBicm93c2VycywgaXQgd2lsbCBiZSBESSBTd2FwcGVkXG4qIGRlcGVuZGluZyBvbiB0aGUgcGxhdGZvcm0gZW52aXJvbm1lbnQuXG4qIFRoaXMgbW9kdWxlIHdpbGwgYmUgZ2VuZXJhdGVkIHdoZW4gdGhlIC1kIG5nMndlYiBmbGFnIGlzIHNldFxuKiovXG5leHBvcnQgY2xhc3MgU29ja2V0QnJvd3NlciB7XG4gIC8qKlxuICAgKiBAbWV0aG9kIGNvbm5lY3RcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCBVUkwgcGF0aCB0byBjb25uZWN0IHdpdGggdGhlIHNlcnZlci5cbiAgICogQHBhcmFtIHthbnl9IG9wdGlvbnMgQW55IHNvY2tldC5pbyB2MSA9PCB2YWxpZCBvcHRpb25zXG4gICAqIEByZXR1cm4ge2FueX0gTm90IGN1cnJlbnRseSBhIHNvY2tldC5pby1jbGllbnQgZm9yIHdlYiBUeXBpbmdzIGltcGxlbWVudGVkLlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gYSB2YWxpZCBzb2NrZXQgY29ubmVjdGlvbi4gIFxuICAgKiovXG4gIGNvbm5lY3QodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIGlvKHVybCwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==