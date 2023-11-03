/* eslint-disable @typescript-eslint/no-explicit-any */

export interface GetFuentesRs{
    statusCode: number;
    method: string; 
    headers: any;
    body: body;
}

export interface body {
    message: string;
    type: string;
    result: string[];
}

export interface SearchRq {
    keyWords: string;
    formato: string;
    lang: string;
    umbral: number;
}

export interface BodySearch {
    message: string;
    type: string;
    result: string;
}

export interface GetSearchRs{
    statusCode: number;
    method: string; 
    headers: any;
    body: BodySearch;
}
