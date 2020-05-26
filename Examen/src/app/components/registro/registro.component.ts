import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  visible=true;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();

    if(localStorage.getItem('token')){
      this.visible= false;
        this.router.navigateByUrl('/home');

    }
}
    onSubmit(form: NgForm) {
  if(form.invalid){
    return;
  }
  Swal.fire({
    allowOutsideClick:false,
    icon: 'info',
    text:'Espere por favor...'
});
  Swal.showLoading();

  this.auth.nuevoUsuario(this.usuario).subscribe(resp => {
      console.log(resp);
      Swal.close();
      this.router.navigateByUrl('/login');

  }, (err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error en los datos',
        text: err.error.message
    });
  });
    }
}
