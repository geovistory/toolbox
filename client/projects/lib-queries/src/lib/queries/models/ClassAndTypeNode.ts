import { ClassAndTypePk } from './ClassAndTypePk';
export interface ClassAndTypeNode {
  label: string;
  data: ClassAndTypePk;
  children?: ClassAndTypeNode[];
}


