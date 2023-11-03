// generic interfaces used by different store modules

export interface ByPk<T> {
    [pk: string]: T;
}
