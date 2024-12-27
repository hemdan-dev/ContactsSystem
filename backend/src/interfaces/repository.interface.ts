import { RootFilterQuery } from "mongoose";

export interface Repository<T> {
    find?(filter?: RootFilterQuery<T>): unknown;
    findOne?(filter?: RootFilterQuery<T>): unknown;
    create?(entity: Partial<T>): Promise<T>;
    count?(filter?: RootFilterQuery<T>): Promise<number>;
    updateById?(id: string, entity: Partial<T>): unknown;
    deleteById?(id: string): unknown;
}