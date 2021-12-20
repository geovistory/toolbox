import { ClassAndTypePk } from './ClassAndTypePk';


export interface AddMenuClassOrTypeItem {
  label: string;
  data: ClassAndTypePk;
  helpUrl?: string
  children?: AddMenuClassOrTypeItem[];
}
