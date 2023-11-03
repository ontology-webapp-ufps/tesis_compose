export interface User {
    name: string;
    email: string;
    rol: number;
    id: number;
}

export interface LoginRq {
    email: string;
    contrasena: string;
}

export interface LoginRs{
    api_code: number;
    mensaje: string;
    token?: string;
    user?: User;
}