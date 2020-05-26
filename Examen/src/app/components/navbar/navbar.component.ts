import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    @Input()  usuarioLogin: UsuarioModel;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
