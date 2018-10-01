/*
* Class Decorator
* Allow to implement static members of a class.
* Read more: https://stackoverflow.com/a/43674389
*/
export function StaticImplements<T>() {
    return (constructor: T) => {}
}
