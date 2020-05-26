import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.models';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

usuario: UsuarioModel;
recordarme= false;
visible= true;

  constructor( private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
    if(localStorage.getItem('email')){
        this.usuario.email=localStorage.getItem('email');
        this.recordarme= true;
        
    }
    if(localStorage.getItem('token')){
      this.visible= false;
        this.router.navigateByUrl('/home');

    }

  }

  login(form: NgForm){
    if(form.invalid){
      return;
    }
    Swal.fire({
        allowOutsideClick:false,
        icon: 'info',
        text:'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(resp => {

      // login valido

      Swal.close();
      if(this.recordarme){
        localStorage.setItem('email',this.usuario.email);
      }else{
        localStorage.removeItem('email');
        this.recordarme= false;
      }
      this.router.navigateByUrl('/home');

  }, (err) => {

    // Datos incorectos
      console.log(err.error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.message
    });

  });
  }

}
