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
export class SocketBrowser {
    /**
     * @method connect
     * @param {string} url URL path to connect with the server.
     * @param {any} options Any socket.io v1 =< valid options
     * @return {any} Not currently a socket.io-client for web Typings implemented.
     * @description
     * This method will return a valid socket connection.
     **/
    connect(url, options) {
        return io(url, options);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmJyb3dzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL3NvY2tldHMvc29ja2V0LmJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLGdEQUFnRDtBQUNoRCwyQ0FBMkM7QUFDM0MsOEJBQThCO0FBQzlCLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xDOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxPQUFPLGFBQWE7SUFDeEI7Ozs7Ozs7UUFPSTtJQUNKLE9BQU8sQ0FBQyxHQUFXLEVBQUUsT0FBWTtRQUMvQixPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbi8vIGFkZCB0aGlzIHRvIGNvbXBpbGVyT3B0aW9ucyBpbiB0c2NvbmZpZy5qc29uOlxuLy8gICAgXCJhbGxvd1N5bnRoZXRpY0RlZmF1bHRJbXBvcnRzXCI6IHRydWUsXG4vLyAgICBcImVzTW9kdWxlSW50ZXJvcFwiOiB0cnVlIFxuaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnOyBcbi8qKlxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0d2l0dGVyOkBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6QG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxuKiBAbW9kdWxlIFNvY2tldEJyb3dzZXJcbiogQGxpY2Vuc2UgTUlUXG4qIEBkZXNjcmlwdGlvblxuKiBUaGlzIG1vZHVsZSBoYW5kbGUgc29ja2V0IGNvbm5lY3Rpb25zIGZvciB3ZWIgYnJvd3NlcnMsIGl0IHdpbGwgYmUgREkgU3dhcHBlZFxuKiBkZXBlbmRpbmcgb24gdGhlIHBsYXRmb3JtIGVudmlyb25tZW50LlxuKiBUaGlzIG1vZHVsZSB3aWxsIGJlIGdlbmVyYXRlZCB3aGVuIHRoZSAtZCBuZzJ3ZWIgZmxhZyBpcyBzZXRcbioqL1xuZXhwb3J0IGNsYXNzIFNvY2tldEJyb3dzZXIge1xuICAvKipcbiAgICogQG1ldGhvZCBjb25uZWN0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVVJMIHBhdGggdG8gY29ubmVjdCB3aXRoIHRoZSBzZXJ2ZXIuXG4gICAqIEBwYXJhbSB7YW55fSBvcHRpb25zIEFueSBzb2NrZXQuaW8gdjEgPTwgdmFsaWQgb3B0aW9uc1xuICAgKiBAcmV0dXJuIHthbnl9IE5vdCBjdXJyZW50bHkgYSBzb2NrZXQuaW8tY2xpZW50IGZvciB3ZWIgVHlwaW5ncyBpbXBsZW1lbnRlZC5cbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGEgdmFsaWQgc29ja2V0IGNvbm5lY3Rpb24uICBcbiAgICoqL1xuICBjb25uZWN0KHVybDogc3RyaW5nLCBvcHRpb25zOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBpbyh1cmwsIG9wdGlvbnMpO1xuICB9XG59XG4iXX0=