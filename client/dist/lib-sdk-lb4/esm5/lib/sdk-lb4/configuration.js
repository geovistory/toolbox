/**
 * @fileoverview added by tsickle
 * Generated from: lib/sdk-lb4/configuration.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function ConfigurationParameters() { }
if (false) {
    /**
     * @deprecated Since 5.0. Use credentials instead
     * @type {?|undefined}
     */
    ConfigurationParameters.prototype.apiKeys;
    /** @type {?|undefined} */
    ConfigurationParameters.prototype.username;
    /** @type {?|undefined} */
    ConfigurationParameters.prototype.password;
    /**
     * @deprecated Since 5.0. Use credentials instead
     * @type {?|undefined}
     */
    ConfigurationParameters.prototype.accessToken;
    /** @type {?|undefined} */
    ConfigurationParameters.prototype.basePath;
    /** @type {?|undefined} */
    ConfigurationParameters.prototype.withCredentials;
    /** @type {?|undefined} */
    ConfigurationParameters.prototype.encoder;
    /**
     * The keys are the names in the securitySchemes section of the OpenAPI
     * document. They should map to the value used for authentication
     * minus any standard prefixes such as 'Basic' or 'Bearer'.
     * @type {?|undefined}
     */
    ConfigurationParameters.prototype.credentials;
}
var Configuration = /** @class */ (function () {
    function Configuration(configurationParameters) {
        var _this = this;
        if (configurationParameters === void 0) { configurationParameters = {}; }
        this.apiKeys = configurationParameters.apiKeys;
        this.username = configurationParameters.username;
        this.password = configurationParameters.password;
        this.accessToken = configurationParameters.accessToken;
        this.basePath = configurationParameters.basePath;
        this.withCredentials = configurationParameters.withCredentials;
        this.encoder = configurationParameters.encoder;
        if (configurationParameters.credentials) {
            this.credentials = configurationParameters.credentials;
        }
        else {
            this.credentials = {};
        }
        // init default accesstoken credential
        if (!this.credentials['accesstoken']) {
            this.credentials['accesstoken'] = (/**
             * @return {?}
             */
            function () {
                return _this.apiKeys['accesstoken'] || _this.apiKeys['authorization'];
            });
        }
        // init default jwt credential
        if (!this.credentials['jwt']) {
            this.credentials['jwt'] = (/**
             * @return {?}
             */
            function () {
                return typeof _this.accessToken === 'function'
                    ? _this.accessToken()
                    : _this.accessToken;
            });
        }
    }
    /**
     * Select the correct content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param contentTypes - the array of content types that are available for selection
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    /**
     * Select the correct content-type to use for a request.
     * Uses {\@link Configuration#isJsonMime} to determine the correct content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param {?} contentTypes - the array of content types that are available for selection
     * @return {?} the selected content-type or <code>undefined</code> if no selection could be made.
     */
    Configuration.prototype.selectHeaderContentType = /**
     * Select the correct content-type to use for a request.
     * Uses {\@link Configuration#isJsonMime} to determine the correct content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param {?} contentTypes - the array of content types that are available for selection
     * @return {?} the selected content-type or <code>undefined</code> if no selection could be made.
     */
    function (contentTypes) {
        var _this = this;
        if (contentTypes.length === 0) {
            return undefined;
        }
        /** @type {?} */
        var type = contentTypes.find((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.isJsonMime(x); }));
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    };
    /**
     * Select the correct accept content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param accepts - the array of content types that are available for selection.
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    /**
     * Select the correct accept content-type to use for a request.
     * Uses {\@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param {?} accepts - the array of content types that are available for selection.
     * @return {?} the selected content-type or <code>undefined</code> if no selection could be made.
     */
    Configuration.prototype.selectHeaderAccept = /**
     * Select the correct accept content-type to use for a request.
     * Uses {\@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param {?} accepts - the array of content types that are available for selection.
     * @return {?} the selected content-type or <code>undefined</code> if no selection could be made.
     */
    function (accepts) {
        var _this = this;
        if (accepts.length === 0) {
            return undefined;
        }
        /** @type {?} */
        var type = accepts.find((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.isJsonMime(x); }));
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    };
    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param mime - MIME (Multipurpose Internet Mail Extensions)
     * @return True if the given MIME is JSON, false otherwise.
     */
    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param {?} mime - MIME (Multipurpose Internet Mail Extensions)
     * @return {?} True if the given MIME is JSON, false otherwise.
     */
    Configuration.prototype.isJsonMime = /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param {?} mime - MIME (Multipurpose Internet Mail Extensions)
     * @return {?} True if the given MIME is JSON, false otherwise.
     */
    function (mime) {
        /** @type {?} */
        var jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Configuration.prototype.lookupCredential = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var value = this.credentials[key];
        return typeof value === 'function'
            ? value()
            : value;
    };
    return Configuration;
}());
export { Configuration };
if (false) {
    /**
     * @deprecated Since 5.0. Use credentials instead
     * @type {?}
     */
    Configuration.prototype.apiKeys;
    /** @type {?} */
    Configuration.prototype.username;
    /** @type {?} */
    Configuration.prototype.password;
    /**
     * @deprecated Since 5.0. Use credentials instead
     * @type {?}
     */
    Configuration.prototype.accessToken;
    /** @type {?} */
    Configuration.prototype.basePath;
    /** @type {?} */
    Configuration.prototype.withCredentials;
    /** @type {?} */
    Configuration.prototype.encoder;
    /**
     * The keys are the names in the securitySchemes section of the OpenAPI
     * document. They should map to the value used for authentication
     * minus any standard prefixes such as 'Basic' or 'Bearer'.
     * @type {?}
     */
    Configuration.prototype.credentials;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiNC8iLCJzb3VyY2VzIjpbImxpYi9zZGstbGI0L2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQSw2Q0FvQkM7Ozs7OztJQWhCRywwQ0FBb0M7O0lBQ3BDLDJDQUFrQjs7SUFDbEIsMkNBQWtCOzs7OztJQUlsQiw4Q0FBc0M7O0lBQ3RDLDJDQUFrQjs7SUFDbEIsa0RBQTBCOztJQUMxQiwwQ0FBNkI7Ozs7Ozs7SUFNN0IsOENBQXFFOztBQUd6RTtJQXFCSSx1QkFBWSx1QkFBcUQ7UUFBakUsaUJBOEJDO1FBOUJXLHdDQUFBLEVBQUEsNEJBQXFEO1FBQzdELElBQUksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUMsT0FBTyxDQUFDO1FBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsdUJBQXVCLENBQUMsUUFBUSxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsdUJBQXVCLENBQUMsUUFBUSxDQUFDO1FBQ2pELElBQUksQ0FBQyxXQUFXLEdBQUcsdUJBQXVCLENBQUMsV0FBVyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsdUJBQXVCLENBQUMsUUFBUSxDQUFDO1FBQ2pELElBQUksQ0FBQyxlQUFlLEdBQUcsdUJBQXVCLENBQUMsZUFBZSxDQUFDO1FBQy9ELElBQUksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUMsT0FBTyxDQUFDO1FBQy9DLElBQUksdUJBQXVCLENBQUMsV0FBVyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsdUJBQXVCLENBQUMsV0FBVyxDQUFDO1NBQzFEO2FBQ0k7WUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztTQUN6QjtRQUVELHNDQUFzQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQzs7O1lBQUc7Z0JBQzlCLE9BQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3hFLENBQUMsQ0FBQSxDQUFDO1NBQ0w7UUFFRCw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7OztZQUFHO2dCQUN0QixPQUFPLE9BQU8sS0FBSSxDQUFDLFdBQVcsS0FBSyxVQUFVO29CQUN6QyxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsRUFBRTtvQkFDcEIsQ0FBQyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUM7WUFDM0IsQ0FBQyxDQUFBLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7O0lBQ0ksK0NBQXVCOzs7Ozs7O0lBQTlCLFVBQWdDLFlBQXNCO1FBQXRELGlCQVVDO1FBVEcsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMzQixPQUFPLFNBQVMsQ0FBQztTQUNwQjs7WUFFSyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUk7Ozs7UUFBQyxVQUFDLENBQVMsSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQWxCLENBQWtCLEVBQUM7UUFDakUsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BCLE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRzs7Ozs7Ozs7SUFDSSwwQ0FBa0I7Ozs7Ozs7SUFBekIsVUFBMEIsT0FBaUI7UUFBM0MsaUJBVUM7UUFURyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sU0FBUyxDQUFDO1NBQ3BCOztZQUVLLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSTs7OztRQUFDLFVBQUMsQ0FBUyxJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBbEIsQ0FBa0IsRUFBQztRQUM1RCxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDcEIsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHOzs7Ozs7Ozs7OztJQUNJLGtDQUFVOzs7Ozs7Ozs7O0lBQWpCLFVBQWtCLElBQVk7O1lBQ3BCLFFBQVEsR0FBVyxJQUFJLE1BQU0sQ0FBQywrREFBK0QsRUFBRSxHQUFHLENBQUM7UUFDekcsT0FBTyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssNkJBQTZCLENBQUMsQ0FBQztJQUMxRyxDQUFDOzs7OztJQUVNLHdDQUFnQjs7OztJQUF2QixVQUF3QixHQUFXOztZQUN6QixLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDbkMsT0FBTyxPQUFPLEtBQUssS0FBSyxVQUFVO1lBQzlCLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDVCxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2hCLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFoSEQsSUFnSEM7Ozs7Ozs7SUE1R0csZ0NBQW9DOztJQUNwQyxpQ0FBa0I7O0lBQ2xCLGlDQUFrQjs7Ozs7SUFJbEIsb0NBQXNDOztJQUN0QyxpQ0FBa0I7O0lBQ2xCLHdDQUEwQjs7SUFDMUIsZ0NBQTZCOzs7Ozs7O0lBTTdCLG9DQUFvRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBQYXJhbWV0ZXJDb2RlYyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuZXhwb3J0IGludGVyZmFjZSBDb25maWd1cmF0aW9uUGFyYW1ldGVycyB7XG4gICAgLyoqXG4gICAgICogIEBkZXByZWNhdGVkIFNpbmNlIDUuMC4gVXNlIGNyZWRlbnRpYWxzIGluc3RlYWRcbiAgICAgKi9cbiAgICBhcGlLZXlzPzoge1sga2V5OiBzdHJpbmcgXTogc3RyaW5nfTtcbiAgICB1c2VybmFtZT86IHN0cmluZztcbiAgICBwYXNzd29yZD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiAgQGRlcHJlY2F0ZWQgU2luY2UgNS4wLiBVc2UgY3JlZGVudGlhbHMgaW5zdGVhZFxuICAgICAqL1xuICAgIGFjY2Vzc1Rva2VuPzogc3RyaW5nIHwgKCgpID0+IHN0cmluZyk7XG4gICAgYmFzZVBhdGg/OiBzdHJpbmc7XG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgICBlbmNvZGVyPzogSHR0cFBhcmFtZXRlckNvZGVjO1xuICAgIC8qKlxuICAgICAqIFRoZSBrZXlzIGFyZSB0aGUgbmFtZXMgaW4gdGhlIHNlY3VyaXR5U2NoZW1lcyBzZWN0aW9uIG9mIHRoZSBPcGVuQVBJXG4gICAgICogZG9jdW1lbnQuIFRoZXkgc2hvdWxkIG1hcCB0byB0aGUgdmFsdWUgdXNlZCBmb3IgYXV0aGVudGljYXRpb25cbiAgICAgKiBtaW51cyBhbnkgc3RhbmRhcmQgcHJlZml4ZXMgc3VjaCBhcyAnQmFzaWMnIG9yICdCZWFyZXInLlxuICAgICAqL1xuICAgIGNyZWRlbnRpYWxzPzoge1sga2V5OiBzdHJpbmcgXTogc3RyaW5nIHwgKCgpID0+IHN0cmluZyB8IHVuZGVmaW5lZCl9O1xufVxuXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvbiB7XG4gICAgLyoqXG4gICAgICogIEBkZXByZWNhdGVkIFNpbmNlIDUuMC4gVXNlIGNyZWRlbnRpYWxzIGluc3RlYWRcbiAgICAgKi9cbiAgICBhcGlLZXlzPzoge1sga2V5OiBzdHJpbmcgXTogc3RyaW5nfTtcbiAgICB1c2VybmFtZT86IHN0cmluZztcbiAgICBwYXNzd29yZD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiAgQGRlcHJlY2F0ZWQgU2luY2UgNS4wLiBVc2UgY3JlZGVudGlhbHMgaW5zdGVhZFxuICAgICAqL1xuICAgIGFjY2Vzc1Rva2VuPzogc3RyaW5nIHwgKCgpID0+IHN0cmluZyk7XG4gICAgYmFzZVBhdGg/OiBzdHJpbmc7XG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgICBlbmNvZGVyPzogSHR0cFBhcmFtZXRlckNvZGVjO1xuICAgIC8qKlxuICAgICAqIFRoZSBrZXlzIGFyZSB0aGUgbmFtZXMgaW4gdGhlIHNlY3VyaXR5U2NoZW1lcyBzZWN0aW9uIG9mIHRoZSBPcGVuQVBJXG4gICAgICogZG9jdW1lbnQuIFRoZXkgc2hvdWxkIG1hcCB0byB0aGUgdmFsdWUgdXNlZCBmb3IgYXV0aGVudGljYXRpb25cbiAgICAgKiBtaW51cyBhbnkgc3RhbmRhcmQgcHJlZml4ZXMgc3VjaCBhcyAnQmFzaWMnIG9yICdCZWFyZXInLlxuICAgICAqL1xuICAgIGNyZWRlbnRpYWxzOiB7WyBrZXk6IHN0cmluZyBdOiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nIHwgdW5kZWZpbmVkKX07XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWd1cmF0aW9uUGFyYW1ldGVyczogQ29uZmlndXJhdGlvblBhcmFtZXRlcnMgPSB7fSkge1xuICAgICAgICB0aGlzLmFwaUtleXMgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5hcGlLZXlzO1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMudXNlcm5hbWU7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5wYXNzd29yZDtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbiA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmFjY2Vzc1Rva2VuO1xuICAgICAgICB0aGlzLmJhc2VQYXRoID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMuYmFzZVBhdGg7XG4gICAgICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICB0aGlzLmVuY29kZXIgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5lbmNvZGVyO1xuICAgICAgICBpZiAoY29uZmlndXJhdGlvblBhcmFtZXRlcnMuY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5jcmVkZW50aWFscztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluaXQgZGVmYXVsdCBhY2Nlc3N0b2tlbiBjcmVkZW50aWFsXG4gICAgICAgIGlmICghdGhpcy5jcmVkZW50aWFsc1snYWNjZXNzdG9rZW4nXSkge1xuICAgICAgICAgICAgdGhpcy5jcmVkZW50aWFsc1snYWNjZXNzdG9rZW4nXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hcGlLZXlzWydhY2Nlc3N0b2tlbiddIHx8IHRoaXMuYXBpS2V5c1snYXV0aG9yaXphdGlvbiddO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluaXQgZGVmYXVsdCBqd3QgY3JlZGVudGlhbFxuICAgICAgICBpZiAoIXRoaXMuY3JlZGVudGlhbHNbJ2p3dCddKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWRlbnRpYWxzWydqd3QnXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuYWNjZXNzVG9rZW4gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmFjY2Vzc1Rva2VuKClcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmFjY2Vzc1Rva2VuO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCB0aGUgY29ycmVjdCBjb250ZW50LXR5cGUgdG8gdXNlIGZvciBhIHJlcXVlc3QuXG4gICAgICogVXNlcyB7QGxpbmsgQ29uZmlndXJhdGlvbiNpc0pzb25NaW1lfSB0byBkZXRlcm1pbmUgdGhlIGNvcnJlY3QgY29udGVudC10eXBlLlxuICAgICAqIElmIG5vIGNvbnRlbnQgdHlwZSBpcyBmb3VuZCByZXR1cm4gdGhlIGZpcnN0IGZvdW5kIHR5cGUgaWYgdGhlIGNvbnRlbnRUeXBlcyBpcyBub3QgZW1wdHlcbiAgICAgKiBAcGFyYW0gY29udGVudFR5cGVzIC0gdGhlIGFycmF5IG9mIGNvbnRlbnQgdHlwZXMgdGhhdCBhcmUgYXZhaWxhYmxlIGZvciBzZWxlY3Rpb25cbiAgICAgKiBAcmV0dXJucyB0aGUgc2VsZWN0ZWQgY29udGVudC10eXBlIG9yIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4gaWYgbm8gc2VsZWN0aW9uIGNvdWxkIGJlIG1hZGUuXG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdEhlYWRlckNvbnRlbnRUeXBlIChjb250ZW50VHlwZXM6IHN0cmluZ1tdKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGNvbnRlbnRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0eXBlID0gY29udGVudFR5cGVzLmZpbmQoKHg6IHN0cmluZykgPT4gdGhpcy5pc0pzb25NaW1lKHgpKTtcbiAgICAgICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlc1swXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgdGhlIGNvcnJlY3QgYWNjZXB0IGNvbnRlbnQtdHlwZSB0byB1c2UgZm9yIGEgcmVxdWVzdC5cbiAgICAgKiBVc2VzIHtAbGluayBDb25maWd1cmF0aW9uI2lzSnNvbk1pbWV9IHRvIGRldGVybWluZSB0aGUgY29ycmVjdCBhY2NlcHQgY29udGVudC10eXBlLlxuICAgICAqIElmIG5vIGNvbnRlbnQgdHlwZSBpcyBmb3VuZCByZXR1cm4gdGhlIGZpcnN0IGZvdW5kIHR5cGUgaWYgdGhlIGNvbnRlbnRUeXBlcyBpcyBub3QgZW1wdHlcbiAgICAgKiBAcGFyYW0gYWNjZXB0cyAtIHRoZSBhcnJheSBvZiBjb250ZW50IHR5cGVzIHRoYXQgYXJlIGF2YWlsYWJsZSBmb3Igc2VsZWN0aW9uLlxuICAgICAqIEByZXR1cm5zIHRoZSBzZWxlY3RlZCBjb250ZW50LXR5cGUgb3IgPGNvZGU+dW5kZWZpbmVkPC9jb2RlPiBpZiBubyBzZWxlY3Rpb24gY291bGQgYmUgbWFkZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0SGVhZGVyQWNjZXB0KGFjY2VwdHM6IHN0cmluZ1tdKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGFjY2VwdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHlwZSA9IGFjY2VwdHMuZmluZCgoeDogc3RyaW5nKSA9PiB0aGlzLmlzSnNvbk1pbWUoeCkpO1xuICAgICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gYWNjZXB0c1swXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgZ2l2ZW4gTUlNRSBpcyBhIEpTT04gTUlNRS5cbiAgICAgKiBKU09OIE1JTUUgZXhhbXBsZXM6XG4gICAgICogICBhcHBsaWNhdGlvbi9qc29uXG4gICAgICogICBhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURjhcbiAgICAgKiAgIEFQUExJQ0FUSU9OL0pTT05cbiAgICAgKiAgIGFwcGxpY2F0aW9uL3ZuZC5jb21wYW55K2pzb25cbiAgICAgKiBAcGFyYW0gbWltZSAtIE1JTUUgKE11bHRpcHVycG9zZSBJbnRlcm5ldCBNYWlsIEV4dGVuc2lvbnMpXG4gICAgICogQHJldHVybiBUcnVlIGlmIHRoZSBnaXZlbiBNSU1FIGlzIEpTT04sIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNKc29uTWltZShtaW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QganNvbk1pbWU6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14oYXBwbGljYXRpb25cXC9qc29ufFteOy8gXFx0XStcXC9bXjsvIFxcdF0rWytdanNvbilbIFxcdF0qKDsuKik/JCcsICdpJyk7XG4gICAgICAgIHJldHVybiBtaW1lICE9PSBudWxsICYmIChqc29uTWltZS50ZXN0KG1pbWUpIHx8IG1pbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24tcGF0Y2granNvbicpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb29rdXBDcmVkZW50aWFsKGtleTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmNyZWRlbnRpYWxzW2tleV07XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gdmFsdWUoKVxuICAgICAgICAgICAgOiB2YWx1ZTtcbiAgICB9XG59XG4iXX0=