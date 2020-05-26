import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario = new UsuarioModel();
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    
    if(!localStorage.getItem('token')){
        this.router.navigateByUrl('/login');

    }
      else{
        this.usuario.email=localStorage.getItem('email');
        this.auth.queryUsuario(this.usuario).subscribe((resp: UsuarioModel) => {
          this.usuario = resp;
        });
      }

  }

}
