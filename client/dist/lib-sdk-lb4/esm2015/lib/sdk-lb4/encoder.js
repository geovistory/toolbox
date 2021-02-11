/**
 * @fileoverview added by tsickle
 * Generated from: lib/sdk-lb4/encoder.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Custom HttpParameterCodec
 * Workaround for https://github.com/angular/angular/issues/18261
 */
export class CustomHttpParameterCodec {
    /**
     * @param {?} k
     * @return {?}
     */
    encodeKey(k) {
        return encodeURIComponent(k);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    encodeValue(v) {
        return encodeURIComponent(v);
    }
    /**
     * @param {?} k
     * @return {?}
     */
    decodeKey(k) {
        return decodeURIComponent(k);
    }
    /**
     * @param {?} v
     * @return {?}
     */
    decodeValue(v) {
        return decodeURIComponent(v);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2Rlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiNC8iLCJzb3VyY2VzIjpbImxpYi9zZGstbGI0L2VuY29kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7SUFDakMsU0FBUyxDQUFDLENBQVM7UUFDZixPQUFPLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBQ0QsV0FBVyxDQUFDLENBQVM7UUFDakIsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUNELFNBQVMsQ0FBQyxDQUFTO1FBQ2YsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUNELFdBQVcsQ0FBQyxDQUFTO1FBQ2pCLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cFBhcmFtZXRlckNvZGVjIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG4vKipcbiAqIEN1c3RvbSBIdHRwUGFyYW1ldGVyQ29kZWNcbiAqIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE4MjYxXG4gKi9cbmV4cG9ydCBjbGFzcyBDdXN0b21IdHRwUGFyYW1ldGVyQ29kZWMgaW1wbGVtZW50cyBIdHRwUGFyYW1ldGVyQ29kZWMge1xuICAgIGVuY29kZUtleShrOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGspO1xuICAgIH1cbiAgICBlbmNvZGVWYWx1ZSh2OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHYpO1xuICAgIH1cbiAgICBkZWNvZGVLZXkoazogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChrKTtcbiAgICB9XG4gICAgZGVjb2RlVmFsdWUodjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh2KTtcbiAgICB9XG59XG4iXX0=