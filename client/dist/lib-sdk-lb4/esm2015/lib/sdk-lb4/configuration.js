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
export class Configuration {
    /**
     * @param {?=} configurationParameters
     */
    constructor(configurationParameters = {}) {
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
            () => {
                return this.apiKeys['accesstoken'] || this.apiKeys['authorization'];
            });
        }
        // init default jwt credential
        if (!this.credentials['jwt']) {
            this.credentials['jwt'] = (/**
             * @return {?}
             */
            () => {
                return typeof this.accessToken === 'function'
                    ? this.accessToken()
                    : this.accessToken;
            });
        }
    }
    /**
     * Select the correct content-type to use for a request.
     * Uses {\@link Configuration#isJsonMime} to determine the correct content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param {?} contentTypes - the array of content types that are available for selection
     * @return {?} the selected content-type or <code>undefined</code> if no selection could be made.
     */
    selectHeaderContentType(contentTypes) {
        if (contentTypes.length === 0) {
            return undefined;
        }
        /** @type {?} */
        const type = contentTypes.find((/**
         * @param {?} x
         * @return {?}
         */
        (x) => this.isJsonMime(x)));
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    }
    /**
     * Select the correct accept content-type to use for a request.
     * Uses {\@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param {?} accepts - the array of content types that are available for selection.
     * @return {?} the selected content-type or <code>undefined</code> if no selection could be made.
     */
    selectHeaderAccept(accepts) {
        if (accepts.length === 0) {
            return undefined;
        }
        /** @type {?} */
        const type = accepts.find((/**
         * @param {?} x
         * @return {?}
         */
        (x) => this.isJsonMime(x)));
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    }
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
    isJsonMime(mime) {
        /** @type {?} */
        const jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    }
    /**
     * @param {?} key
     * @return {?}
     */
    lookupCredential(key) {
        /** @type {?} */
        const value = this.credentials[key];
        return typeof value === 'function'
            ? value()
            : value;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiNC8iLCJzb3VyY2VzIjpbImxpYi9zZGstbGI0L2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQSw2Q0FvQkM7Ozs7OztJQWhCRywwQ0FBb0M7O0lBQ3BDLDJDQUFrQjs7SUFDbEIsMkNBQWtCOzs7OztJQUlsQiw4Q0FBc0M7O0lBQ3RDLDJDQUFrQjs7SUFDbEIsa0RBQTBCOztJQUMxQiwwQ0FBNkI7Ozs7Ozs7SUFNN0IsOENBQXFFOztBQUd6RSxNQUFNLE9BQU8sYUFBYTs7OztJQXFCdEIsWUFBWSwwQkFBbUQsRUFBRTtRQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDLE9BQU8sQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsQ0FBQztRQUNqRCxJQUFJLENBQUMsV0FBVyxHQUFHLHVCQUF1QixDQUFDLFdBQVcsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsQ0FBQztRQUNqRCxJQUFJLENBQUMsZUFBZSxHQUFHLHVCQUF1QixDQUFDLGVBQWUsQ0FBQztRQUMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDLE9BQU8sQ0FBQztRQUMvQyxJQUFJLHVCQUF1QixDQUFDLFdBQVcsRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLHVCQUF1QixDQUFDLFdBQVcsQ0FBQztTQUMxRDthQUNJO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7U0FDekI7UUFFRCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7OztZQUFHLEdBQUcsRUFBRTtnQkFDbkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDeEUsQ0FBQyxDQUFBLENBQUM7U0FDTDtRQUVELDhCQUE4QjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQzs7O1lBQUcsR0FBRyxFQUFFO2dCQUMzQixPQUFPLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxVQUFVO29CQUN6QyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDM0IsQ0FBQyxDQUFBLENBQUM7U0FDTDtJQUNMLENBQUM7Ozs7Ozs7O0lBU00sdUJBQXVCLENBQUUsWUFBc0I7UUFDbEQsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMzQixPQUFPLFNBQVMsQ0FBQztTQUNwQjs7Y0FFSyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBQztRQUNqRSxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDcEIsT0FBTyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7OztJQVNNLGtCQUFrQixDQUFDLE9BQWlCO1FBQ3ZDLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxTQUFTLENBQUM7U0FDcEI7O2NBRUssSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUM7UUFDNUQsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BCLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7Ozs7Ozs7SUFZTSxVQUFVLENBQUMsSUFBWTs7Y0FDcEIsUUFBUSxHQUFXLElBQUksTUFBTSxDQUFDLCtEQUErRCxFQUFFLEdBQUcsQ0FBQztRQUN6RyxPQUFPLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzFHLENBQUM7Ozs7O0lBRU0sZ0JBQWdCLENBQUMsR0FBVzs7Y0FDekIsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO1FBQ25DLE9BQU8sT0FBTyxLQUFLLEtBQUssVUFBVTtZQUM5QixDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ1QsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNoQixDQUFDO0NBQ0o7Ozs7OztJQTVHRyxnQ0FBb0M7O0lBQ3BDLGlDQUFrQjs7SUFDbEIsaUNBQWtCOzs7OztJQUlsQixvQ0FBc0M7O0lBQ3RDLGlDQUFrQjs7SUFDbEIsd0NBQTBCOztJQUMxQixnQ0FBNkI7Ozs7Ozs7SUFNN0Isb0NBQW9FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFBhcmFtZXRlckNvZGVjIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzIHtcbiAgICAvKipcbiAgICAgKiAgQGRlcHJlY2F0ZWQgU2luY2UgNS4wLiBVc2UgY3JlZGVudGlhbHMgaW5zdGVhZFxuICAgICAqL1xuICAgIGFwaUtleXM/OiB7WyBrZXk6IHN0cmluZyBdOiBzdHJpbmd9O1xuICAgIHVzZXJuYW1lPzogc3RyaW5nO1xuICAgIHBhc3N3b3JkPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqICBAZGVwcmVjYXRlZCBTaW5jZSA1LjAuIFVzZSBjcmVkZW50aWFscyBpbnN0ZWFkXG4gICAgICovXG4gICAgYWNjZXNzVG9rZW4/OiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKTtcbiAgICBiYXNlUGF0aD86IHN0cmluZztcbiAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICAgIGVuY29kZXI/OiBIdHRwUGFyYW1ldGVyQ29kZWM7XG4gICAgLyoqXG4gICAgICogVGhlIGtleXMgYXJlIHRoZSBuYW1lcyBpbiB0aGUgc2VjdXJpdHlTY2hlbWVzIHNlY3Rpb24gb2YgdGhlIE9wZW5BUElcbiAgICAgKiBkb2N1bWVudC4gVGhleSBzaG91bGQgbWFwIHRvIHRoZSB2YWx1ZSB1c2VkIGZvciBhdXRoZW50aWNhdGlvblxuICAgICAqIG1pbnVzIGFueSBzdGFuZGFyZCBwcmVmaXhlcyBzdWNoIGFzICdCYXNpYycgb3IgJ0JlYXJlcicuXG4gICAgICovXG4gICAgY3JlZGVudGlhbHM/OiB7WyBrZXk6IHN0cmluZyBdOiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nIHwgdW5kZWZpbmVkKX07XG59XG5cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uIHtcbiAgICAvKipcbiAgICAgKiAgQGRlcHJlY2F0ZWQgU2luY2UgNS4wLiBVc2UgY3JlZGVudGlhbHMgaW5zdGVhZFxuICAgICAqL1xuICAgIGFwaUtleXM/OiB7WyBrZXk6IHN0cmluZyBdOiBzdHJpbmd9O1xuICAgIHVzZXJuYW1lPzogc3RyaW5nO1xuICAgIHBhc3N3b3JkPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqICBAZGVwcmVjYXRlZCBTaW5jZSA1LjAuIFVzZSBjcmVkZW50aWFscyBpbnN0ZWFkXG4gICAgICovXG4gICAgYWNjZXNzVG9rZW4/OiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKTtcbiAgICBiYXNlUGF0aD86IHN0cmluZztcbiAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICAgIGVuY29kZXI/OiBIdHRwUGFyYW1ldGVyQ29kZWM7XG4gICAgLyoqXG4gICAgICogVGhlIGtleXMgYXJlIHRoZSBuYW1lcyBpbiB0aGUgc2VjdXJpdHlTY2hlbWVzIHNlY3Rpb24gb2YgdGhlIE9wZW5BUElcbiAgICAgKiBkb2N1bWVudC4gVGhleSBzaG91bGQgbWFwIHRvIHRoZSB2YWx1ZSB1c2VkIGZvciBhdXRoZW50aWNhdGlvblxuICAgICAqIG1pbnVzIGFueSBzdGFuZGFyZCBwcmVmaXhlcyBzdWNoIGFzICdCYXNpYycgb3IgJ0JlYXJlcicuXG4gICAgICovXG4gICAgY3JlZGVudGlhbHM6IHtbIGtleTogc3RyaW5nIF06IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcgfCB1bmRlZmluZWQpfTtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzOiBDb25maWd1cmF0aW9uUGFyYW1ldGVycyA9IHt9KSB7XG4gICAgICAgIHRoaXMuYXBpS2V5cyA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmFwaUtleXM7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy51c2VybmFtZTtcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLnBhc3N3b3JkO1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMuYWNjZXNzVG9rZW47XG4gICAgICAgIHRoaXMuYmFzZVBhdGggPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5iYXNlUGF0aDtcbiAgICAgICAgdGhpcy53aXRoQ3JlZGVudGlhbHMgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy53aXRoQ3JlZGVudGlhbHM7XG4gICAgICAgIHRoaXMuZW5jb2RlciA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmVuY29kZXI7XG4gICAgICAgIGlmIChjb25maWd1cmF0aW9uUGFyYW1ldGVycy5jcmVkZW50aWFscykge1xuICAgICAgICAgICAgdGhpcy5jcmVkZW50aWFscyA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmNyZWRlbnRpYWxzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jcmVkZW50aWFscyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW5pdCBkZWZhdWx0IGFjY2Vzc3Rva2VuIGNyZWRlbnRpYWxcbiAgICAgICAgaWYgKCF0aGlzLmNyZWRlbnRpYWxzWydhY2Nlc3N0b2tlbiddKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWRlbnRpYWxzWydhY2Nlc3N0b2tlbiddID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFwaUtleXNbJ2FjY2Vzc3Rva2VuJ10gfHwgdGhpcy5hcGlLZXlzWydhdXRob3JpemF0aW9uJ107XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW5pdCBkZWZhdWx0IGp3dCBjcmVkZW50aWFsXG4gICAgICAgIGlmICghdGhpcy5jcmVkZW50aWFsc1snand0J10pIHtcbiAgICAgICAgICAgIHRoaXMuY3JlZGVudGlhbHNbJ2p3dCddID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5hY2Nlc3NUb2tlbiA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuYWNjZXNzVG9rZW4oKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuYWNjZXNzVG9rZW47XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IHRoZSBjb3JyZWN0IGNvbnRlbnQtdHlwZSB0byB1c2UgZm9yIGEgcmVxdWVzdC5cbiAgICAgKiBVc2VzIHtAbGluayBDb25maWd1cmF0aW9uI2lzSnNvbk1pbWV9IHRvIGRldGVybWluZSB0aGUgY29ycmVjdCBjb250ZW50LXR5cGUuXG4gICAgICogSWYgbm8gY29udGVudCB0eXBlIGlzIGZvdW5kIHJldHVybiB0aGUgZmlyc3QgZm91bmQgdHlwZSBpZiB0aGUgY29udGVudFR5cGVzIGlzIG5vdCBlbXB0eVxuICAgICAqIEBwYXJhbSBjb250ZW50VHlwZXMgLSB0aGUgYXJyYXkgb2YgY29udGVudCB0eXBlcyB0aGF0IGFyZSBhdmFpbGFibGUgZm9yIHNlbGVjdGlvblxuICAgICAqIEByZXR1cm5zIHRoZSBzZWxlY3RlZCBjb250ZW50LXR5cGUgb3IgPGNvZGU+dW5kZWZpbmVkPC9jb2RlPiBpZiBubyBzZWxlY3Rpb24gY291bGQgYmUgbWFkZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0SGVhZGVyQ29udGVudFR5cGUgKGNvbnRlbnRUeXBlczogc3RyaW5nW10pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoY29udGVudFR5cGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHR5cGUgPSBjb250ZW50VHlwZXMuZmluZCgoeDogc3RyaW5nKSA9PiB0aGlzLmlzSnNvbk1pbWUoeCkpO1xuICAgICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGVudFR5cGVzWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCB0aGUgY29ycmVjdCBhY2NlcHQgY29udGVudC10eXBlIHRvIHVzZSBmb3IgYSByZXF1ZXN0LlxuICAgICAqIFVzZXMge0BsaW5rIENvbmZpZ3VyYXRpb24jaXNKc29uTWltZX0gdG8gZGV0ZXJtaW5lIHRoZSBjb3JyZWN0IGFjY2VwdCBjb250ZW50LXR5cGUuXG4gICAgICogSWYgbm8gY29udGVudCB0eXBlIGlzIGZvdW5kIHJldHVybiB0aGUgZmlyc3QgZm91bmQgdHlwZSBpZiB0aGUgY29udGVudFR5cGVzIGlzIG5vdCBlbXB0eVxuICAgICAqIEBwYXJhbSBhY2NlcHRzIC0gdGhlIGFycmF5IG9mIGNvbnRlbnQgdHlwZXMgdGhhdCBhcmUgYXZhaWxhYmxlIGZvciBzZWxlY3Rpb24uXG4gICAgICogQHJldHVybnMgdGhlIHNlbGVjdGVkIGNvbnRlbnQtdHlwZSBvciA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IGlmIG5vIHNlbGVjdGlvbiBjb3VsZCBiZSBtYWRlLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZWxlY3RIZWFkZXJBY2NlcHQoYWNjZXB0czogc3RyaW5nW10pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoYWNjZXB0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0eXBlID0gYWNjZXB0cy5maW5kKCh4OiBzdHJpbmcpID0+IHRoaXMuaXNKc29uTWltZSh4KSk7XG4gICAgICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBhY2NlcHRzWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlbiBNSU1FIGlzIGEgSlNPTiBNSU1FLlxuICAgICAqIEpTT04gTUlNRSBleGFtcGxlczpcbiAgICAgKiAgIGFwcGxpY2F0aW9uL2pzb25cbiAgICAgKiAgIGFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGOFxuICAgICAqICAgQVBQTElDQVRJT04vSlNPTlxuICAgICAqICAgYXBwbGljYXRpb24vdm5kLmNvbXBhbnkranNvblxuICAgICAqIEBwYXJhbSBtaW1lIC0gTUlNRSAoTXVsdGlwdXJwb3NlIEludGVybmV0IE1haWwgRXh0ZW5zaW9ucylcbiAgICAgKiBAcmV0dXJuIFRydWUgaWYgdGhlIGdpdmVuIE1JTUUgaXMgSlNPTiwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIHB1YmxpYyBpc0pzb25NaW1lKG1pbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBqc29uTWltZTogUmVnRXhwID0gbmV3IFJlZ0V4cCgnXihhcHBsaWNhdGlvblxcL2pzb258W147LyBcXHRdK1xcL1teOy8gXFx0XStbK11qc29uKVsgXFx0XSooOy4qKT8kJywgJ2knKTtcbiAgICAgICAgcmV0dXJuIG1pbWUgIT09IG51bGwgJiYgKGpzb25NaW1lLnRlc3QobWltZSkgfHwgbWltZS50b0xvd2VyQ2FzZSgpID09PSAnYXBwbGljYXRpb24vanNvbi1wYXRjaCtqc29uJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvb2t1cENyZWRlbnRpYWwoa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY3JlZGVudGlhbHNba2V5XTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyB2YWx1ZSgpXG4gICAgICAgICAgICA6IHZhbHVlO1xuICAgIH1cbn1cbiJdfQ==