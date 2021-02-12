import { ClassAndTypePk } from './ClassAndTypePk';
// end:ng42.barrel
export interface ClassAndTypeNode {
    label: string;
    data: ClassAndTypePk;
    children?: ClassAndTypeNode[];
}
