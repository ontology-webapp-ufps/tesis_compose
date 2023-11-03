export interface User {
    name: string;
    email: string;
    rol: number;
    id: number;
}

export interface UserData{
    id: number;
    email: string;
    contrasena: string;
    rol: number;
    name: string;
}

export interface UpdateUserRq {
    id: number;
    email: string;
    contrasena: string;
    rol: number;
    name: string;
    cambio_contrasena: boolean;
}

export interface UpdateUserRs {
    api_code: number;
    mensaje: string;
    user: UserData;
}