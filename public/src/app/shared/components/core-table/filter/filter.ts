export interface CoreTableFilter<T> {
  key: string;
  predicate: (value: any) => boolean;
  valueFn: (item: T) => any;
}
