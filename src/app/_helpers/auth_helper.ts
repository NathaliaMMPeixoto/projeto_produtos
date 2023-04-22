import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
}

)
export class AuthHelper{
    //metodo para verificar se o usuario esta autenticado
    isAuthenticated() : boolean {
        
        return localStorage.getItem('access_token') != null &&
        localStorage.getItem('login_usuario') != null;
    }
}