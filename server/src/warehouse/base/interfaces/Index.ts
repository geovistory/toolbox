import {ReplaySubject} from 'rxjs';

export interface Index<KeyModel, ValueModel> {

  ready$: ReplaySubject<boolean>

  addToIdx(keyModel: KeyModel, val: ValueModel): Promise<void>

  removeFromIdx(keyModel: KeyModel): Promise<void>


  /**
   * Returns value of key. If key not exists, returns undefined.
   * @param key
   */
  getFromIdx(keyModel: KeyModel): Promise<ValueModel | undefined>


  forEachKey<M>(cb: (key: KeyModel) => Promise<M>): Promise<void>

  forEachKeyStartingWith<M>(str: string, cb: (key: KeyModel) => Promise<M>): Promise<void>

  forEachItemStartingWith<M>(str: string, cb: (item: {key: KeyModel, value: ValueModel}) => Promise<M>): Promise<void>

  forEachValue(cb: (val: ValueModel) => void): Promise<void>

  clearIdx(): Promise<void>

  keyExists(key: string): Promise<boolean>


  getKeys(): Promise<KeyModel[]>

  getValues(): Promise<ValueModel[]>


  getLength(): Promise<number>


  keyToString(key: KeyModel): string;
  stringToKey(str: string): KeyModel;

}
