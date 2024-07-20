import { Repository } from 'typeorm';

export interface IUnkownObjectKeys {
    [key: string]: any;
}
export interface IOptions {
    relations: string[];
    where?: IUnkownObjectKeys | IUnkownObjectKeys[];
    skip?: any;
    take?: any;
    order?: any;
}

export interface IFilter {
    query: IUnkownObjectKeys;
    condition: IFilterCondition;
}
export interface IFilterCondition {
    criteria?: ICriteria;
    normal?: boolean;
    or?: IOrCondition[]; // reveer el OR, todavia no aplicado
}
export interface ICriteria {
    operator: TypeCriteriaCondition;
    value: string | string[] | number | number[];
}

export interface IOrCondition {
    [key: string]: any;
}
export interface IGenericSort {
    type: TypeOrder;
    by: string | IUnkownObjectKeys;
}
export type TypeOrder = 'ASC' | 'DESC';

export type TypeCondition = 'criteria' | 'normal' | 'or';

export type TypeCriteriaCondition = '!E' | '!=' | '>' | '<' | 'in=' | 'btw=' | 'co=';





