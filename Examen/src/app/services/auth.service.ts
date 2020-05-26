import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000/api/usuario/';

  userToken: string;

  constructor( private http: HttpClient) {
    this.leerToken();
   }

  logout() { 
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) { 
    const authData = {
      ...usuario
    };
    return this.http.post(
      `${this.url}/login`,
      authData
    ).pipe(
        map( resp =>{
          console.log('Entro al rxjs');
            this.guardarToken(resp['tokenReturn']);
            return resp;
          })
    );
  }

  nuevoUsuario(usuario: UsuarioModel) {      
    const authData = {
      ...usuario
    };

    return this.http.post(
      `${this.url}/add`,
      authData
    );
  }

  queryUsuario(usuario: UsuarioModel) {      
    const authData = {
      ...usuario
    };
    return this.http.get(
      `${this.url}/query/?email=${authData.email}`
    );
  }

  private guardarToken(idToken: string){
      
    this.userToken=idToken;
    localStorage.setItem('token', idToken);
    
  }

  leerToken() {
    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token');
    } else{
      this.userToken= '';
    }
    
    return this.userToken;
  }

  estaAutenticado(): boolean{
      
    return this.userToken.length > 2;
  }

}
