import {deleting, get, post} from './Http';

export const loginApi = (data: any) => post(`login`, JSON.stringify(data) )
export const registerApi = (data: any) => post(`register`, JSON.stringify(data) )

export const updateUserApi = (id: any, data: any) => post(`users/${id}`, data, {}, true);
